const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
require('./build-timed-quiz.cjs');

const root = path.join(__dirname, '..');
const output = path.join(root, 'dist');
const files = [
  'index.html',
  'timed-quiz.html',
  'phrase-library.js',
  'phrase-additions.js',
  'beginner-dialogues.js',
  'workbook-scenes.js',
  'phrase-explanations.js',
  'assets/teacher-cutout.png',
  'assets/learner-cutout.png'
];
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
if (!script) throw new Error('Missing application script');
new vm.Script(script, { filename: 'index.html' });
new vm.Script(fs.readFileSync(path.join(root, 'phrase-library.js'), 'utf8'), { filename: 'phrase-library.js' });
new vm.Script(fs.readFileSync(path.join(root, 'phrase-additions.js'), 'utf8'), { filename: 'phrase-additions.js' });
new vm.Script(fs.readFileSync(path.join(root, 'beginner-dialogues.js'), 'utf8'), { filename: 'beginner-dialogues.js' });
new vm.Script(fs.readFileSync(path.join(root, 'workbook-scenes.js'), 'utf8'), { filename: 'workbook-scenes.js' });
new vm.Script(fs.readFileSync(path.join(root, 'phrase-explanations.js'), 'utf8'), { filename: 'phrase-explanations.js' });

// Refuse to publish unexpected files left in an existing build directory.
function checkOutput(directory, prefix = '') {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const relative = prefix + entry.name;
    if (entry.isSymbolicLink()) throw new Error(`Unexpected symlink: dist/${relative}`);
    if (entry.isDirectory()) checkOutput(path.join(directory, entry.name), relative + '/');
    else if (!files.includes(relative)) throw new Error(`Unexpected output file: dist/${relative}`);
  }
}
checkOutput(output);
for (const file of files) {
  const source = path.join(root, file);
  const target = path.join(output, file);
  if (!fs.statSync(source).isFile()) throw new Error(`Missing asset: ${file}`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}
console.log(`Static build ready: ${files.length} public files in dist/`);
