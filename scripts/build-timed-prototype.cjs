const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const context = vm.createContext({});
for (const file of ['phrase-additions.js', 'phrase-explanations.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, {filename: file});
}
const dataScript = (name, data) => '<script>globalThis.' + name + '=' + JSON.stringify(data).replace(/</g, '\\u003c') + ';</script>';
const portrait = fs.readFileSync(path.join(root, 'assets/teacher-cutout.png')).toString('base64');
const html = fs.readFileSync(path.join(root, 'timed-quiz-prototype.html'), 'utf8')
  .replace('src="assets/teacher-cutout.png"', 'src="data:image/png;base64,' + portrait + '"')
  .replace('<script src="phrase-additions.js"></script>', dataScript('PHRASE_ADDITIONS', context.PHRASE_ADDITIONS))
  .replace('<script src="phrase-explanations.js"></script>', dataScript('PHRASE_EXPLANATIONS', context.PHRASE_EXPLANATIONS));
if (/<script\b[^>]*\bsrc=/.test(html) || /src="assets\//.test(html)) throw new Error('External dependency left in standalone prototype');
new vm.Script(html.match(/<script id="prototype-app">([\s\S]*?)<\/script>/)[1]);
const output = path.join(root, 'prototypes', 'timed-quiz.html');
fs.mkdirSync(path.dirname(output), {recursive: true});
fs.writeFileSync(output, html, 'utf8');
console.log('Standalone local prototype: ' + output);
