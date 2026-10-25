const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
let html = fs.readFileSync(path.join(root, 'timed-quiz-prototype.html'), 'utf8');
const replacements = [
  ['<title>My Phrase | Timed Quiz Prototype</title>', '<title>My Phrase | 4択トレーニング</title>'],
  ['<body>', '<body class="embedded-quiz">'],
  ["const KEY = 'my-phrase-timed-quiz-prototype-v1';", "const KEY = 'my-phrase-timed-quiz-v1';"],
  ['const LEGACY_KEY = null;', "const LEGACY_KEY = 'my-phrase-timed-quiz-prototype-v1';"],
  ['const EMBEDDED = false;', 'const EMBEDDED = true;'],
  ['id="prototype-app"', 'id="timed-quiz-app"'],
  ['globalThis.TimedQuizPrototype=', 'globalThis.TimedQuiz=']
];
for (const [from, to] of replacements) {
  if (!html.includes(from)) throw new Error('Missing quiz build marker: ' + from);
  html = html.replace(from, to);
}
new vm.Script(html.match(/<script id="timed-quiz-app">([\s\S]*?)<\/script>/)[1]);
fs.writeFileSync(path.join(root, 'timed-quiz.html'), html, 'utf8');
console.log('Production quiz ready: timed-quiz.html');
