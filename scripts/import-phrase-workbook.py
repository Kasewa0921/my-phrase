import argparse
import json
import pathlib
import posixpath
import xml.etree.ElementTree as ET
import zipfile


NS = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
REL = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
HEADERS = ['No.', '\u5834\u9762', '\u82f1\u8a9e\u30d5\u30ec\u30fc\u30ba', '\u65e5\u672c\u8a9e\u8a33', '\u4f8b\u6587']


def import_rows(file):
    with zipfile.ZipFile(file) as archive:
        shared = []
        if 'xl/sharedStrings.xml' in archive.namelist():
            for item in ET.fromstring(archive.read('xl/sharedStrings.xml')).findall('m:si', NS):
                shared.append(''.join(t.text or '' for t in item.findall('.//m:t', NS)))
        book = ET.fromstring(archive.read('xl/workbook.xml'))
        rels = ET.fromstring(archive.read('xl/_rels/workbook.xml.rels'))
        targets = {r.get('Id'): r.get('Target') for r in rels}
        candidates = []
        for sheet in book.findall('m:sheets/m:sheet', NS):
            target = targets[sheet.get('{' + REL + '}id')]
            target = target.lstrip('/') if target.startswith('/') else posixpath.normpath(posixpath.join('xl', target))
            xml = ET.fromstring(archive.read(target))
            rows = []
            for row in xml.findall('m:sheetData/m:row', NS):
                cells = {}
                for cell in row.findall('m:c', NS):
                    column = ''.join(c for c in cell.get('r') if c.isalpha())
                    if cell.find('m:f', NS) is not None:
                        raise ValueError('Formula cells are not accepted as phrase text')
                    value = cell.findtext('m:v', default='', namespaces=NS)
                    if cell.get('t') == 's':
                        value = shared[int(value)]
                    elif cell.get('t') == 'inlineStr':
                        value = ''.join(t.text or '' for t in cell.findall('.//m:t', NS))
                    cells[column] = value.strip()
                if any(cells.values()):
                    rows.append(cells)
            if not rows or [rows[0].get(c) for c in 'ABCDE'] != HEADERS:
                continue
            records = []
            for row in rows[1:]:
                record = dict(zip(['number', 'category', 'en', 'ja', 'example'], [row.get(c, '') for c in 'ABCDE']))
                record['number'] = int(record['number'])
                if not all(record.values()):
                    raise ValueError('Missing field in row ' + str(record['number']))
                records.append(record)
            candidates.append({'sheet': sheet.get('name'), 'records': records})
    if len(candidates) != 1:
        raise ValueError('Expected exactly one phrase sheet with the required headers')
    result = candidates[0]
    if [r['number'] for r in result['records']] != list(range(101, 201)):
        raise ValueError('Expected the 100 additional phrases numbered 101 through 200')
    return {'source': file.name, **result}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('workbook', type=pathlib.Path)
    parser.add_argument('--output', type=pathlib.Path, default=pathlib.Path(__file__).resolve().parents[1] / 'data' / 'phrase-additions.json')
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    result = import_rows(args.workbook)
    content = json.dumps(result, ensure_ascii=False, indent=2) + '\n'
    if args.check:
        if args.output.read_text(encoding='utf-8') != content:
            raise ValueError('Imported JSON differs from the workbook')
    else:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(content, encoding='utf-8')
    print('Verified 100 phrase rows from ' + result['source'])
