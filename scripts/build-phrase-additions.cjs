const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const source = JSON.parse(fs.readFileSync(path.join(root, 'data/phrase-additions.json'), 'utf8'));
const normalize = text => text.replace(/[\u2018\u2019]/g, "'");

// The workbook gives English examples; these translations fill the same slots.
const japaneseExamples = {
  109: 'どうして引っ越そうと思ったの？',
  111: '以前はサッカーをしていた。',
  112: '危うく電車に乗り遅れるところだった。',
  113: 'うっかりファイルを削除してしまった。',
  114: 'なんとか終わらせることができた。',
  115: '彼に電話するのを忘れた。',
  116: '休憩することに決めた。',
  117: '遅くまで働かなければならなかった。',
  118: 'ちょうど出かけるところだった。',
  119: 'たまたま友達に会った。',
  120: '今までサーフィンをしたことがない。',
  121: '夜更かししがちだ。',
  122: '結局いつも動画を見てしまう。',
  123: 'もっと健康的な食事にしようと頑張っている。',
  124: '新しい仕事に慣れてきている。',
  125: '早起きには慣れていない。',
  126: 'めったに外食しない。',
  127: '英語を学び始めた。',
  128: '炭酸飲料を飲むのをやめた。',
  129: '何度も名前を忘れてしまう。',
  130: '絵を描くことにかなり時間を使っている。',
  137: '自分たちが作ったものを誇りに思う。',
  138: 'デザインに満足している。',
  139: '結果に満足していない。',
  141: 'たぶん彼は忙しいんだと思う。',
  142: '私の知る限り、それは無料だ。',
  143: '公平に言うと、それは難しかった。',
  146: 'どちらかというと家にいたい。',
  147: '待つのは構わない。',
  148: 'どちらの選択肢でも問題ない。',
  149: 'ホラー映画はあまり好みじゃない。',
  151: 'このアプリは以前のものより使いやすい。',
  152: 'このゲームはチェスに似ている。',
  153: '新しい住まいは以前の住まいと違う。',
  154: '思っていたほど高くない。',
  155: 'だんだん寒くなってきた。',
  156: '料理が上達してきた。',
  157: 'デザインにはまだ取り組んでいる。',
  159: '待つ価値はない。',
  160: '練習は多いほどいい。',
  162: '両親を訪ねる計画を立てている。',
  163: '6時に彼と会うことになっている。',
  164: '新しいノートパソコンの購入を検討している。',
  169: 'そろそろ行ったほうがよさそうだ。',
  170: 'それを見るのが待ちきれない。',
  171: 'ゲームといえば、新しいものを一つ作ったよ。',
  172: 'それで思い出したんだけど、質問があるんだ。',
  173: 'とにかく、いい週末だったよ。',
  174: '手短に言うと、私たちが勝った。',
  175: 'いい知らせは、早く終わったということだ。',
  176: '悪い知らせは、雨が降っているということだ。',
  177: '驚いたのは値段だった。',
  178: 'それは私が忙しかったからだ。',
  179: 'それだけじゃなくて、安かった。',
  180: '要するに、その仕事に採用された。',
  181: '来週の火曜日という意味だった？',
  182: 'これのこと？',
  186: 'sayとtellは何が違う？',
  187: '思いがけなかったと言おうとしている。'
};

function makeParts(template, text) {
  // -ing is part of a replaceable verb phrase, including its object.
  const pieces = template.split(/([○△]+(?:ing)?|\.{3})/g).filter(Boolean);
  const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const isSlot = piece => /^[○△]/.test(piece) || piece === '...';
  const pattern = pieces.map(piece => isSlot(piece) ? '(.+?)' : escape(piece)).join('');
  const match = text.match(new RegExp('^' + pattern + '$', 'i'));
  if (!match) throw new Error('Example does not match template: ' + template + ' / ' + text);
  let group = 1;
  let offset = 0;
  return pieces.map(piece => {
    const variable = isSlot(piece);
    const length = variable ? match[group++].length : piece.length;
    const part = { text: text.slice(offset, offset + length), variable };
    offset += length;
    return part;
  });
}

if (source.records.length !== 100) throw new Error('Expected 100 workbook phrases');
if (source.records.some((row, i) => row.number !== 101 + i)) throw new Error('Expected phrase numbers 101 through 200 in order');
const catalog = source.records.map(row => {
  const template = normalize(row.en);
  const variable = /[○△]|\.{3}/.test(template);
  const text = variable ? normalize(row.example) : template;
  const ja = variable ? japaneseExamples[row.number] : row.ja;
  if (!ja || /[○△]/.test(text + ja)) throw new Error('Missing completed example for ' + row.number);
  return { id: 'excel-20261024-' + row.number, number: row.number, en: template, ja: row.ja,
    category: row.category, sourceExample: normalize(row.example),
    examples: [{ text, ja, parts: makeParts(template, text) }] };
});
const output = '// Generated from data/phrase-additions.json by scripts/build-phrase-additions.cjs.\n'
  + 'globalThis.PHRASE_ADDITIONS = ' + JSON.stringify(catalog, null, 2) + ';\n';
const target = path.join(root, 'phrase-additions.js');
if (process.argv.includes('--check')) {
  if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== output) throw new Error('phrase-additions.js is out of date');
} else fs.writeFileSync(target, output, 'utf8');
console.log(catalog.length + ' workbook phrases with complete examples');
