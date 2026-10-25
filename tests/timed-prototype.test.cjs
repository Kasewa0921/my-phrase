const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {test} = require('node:test');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'prototypes/timed-quiz.html'), 'utf8');
const source = html.match(/<script id="prototype-app">([\s\S]*?)<\/script>/)[1];
const productionHtml=fs.readFileSync(path.join(root,'timed-quiz.html'),'utf8');
const productionSource=productionHtml.match(/<script id="timed-quiz-app">([\s\S]*?)<\/script>/)[1];
const data = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const KEY = 'my-phrase-timed-quiz-prototype-v1';
const plain = value => JSON.parse(JSON.stringify(value));
const documentIds=new Set([...html.slice(0,html.indexOf('<script>')).matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));

class Element {
  constructor() {
    this.children=[]; this.events={}; this.attributes={}; this.dataset={}; this.style={setProperty(name,value){this[name]=value;}};
    this.hidden=false; this.disabled=false; this.open=false; this.value=''; this.nodes=new Map();
    const classes=new Set();
    this.classList={add:c=>classes.add(c),remove:c=>classes.delete(c),toggle:(c,yes)=>yes?classes.add(c):classes.delete(c),contains:c=>classes.has(c)};
  }
  set innerHTML(value) {this.html=value;this.children=[];}
  get innerHTML() {return this.html||'';}
  appendChild(child) {this.children.push(child);}
  addEventListener(name,handler) {this.events[name]=handler;}
  setAttribute(name,value) {this.attributes[name]=String(value);}
  querySelector(selector) {if(!this.nodes.has(selector)) this.nodes.set(selector,new Element());return this.nodes.get(selector);}
  focus() {this.focused=true;}
  showModal() {this.open=true;}
  close() {this.open=false;}
}
function load(saved = {}, randomSeed = 12345, storageBlocked = false, reducedMotion = false, production = false) {
  const elements=new Map(), storage=new Map(Object.entries(saved)), reads=[], writes=[], timers=new Map(), frames=new Map();
  let now=100, id=0, seed=randomSeed;
  const randomMath=Object.create(Math);
  randomMath.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const element=name=>{if(!elements.has(name))elements.set(name,new Element());return elements.get(name);};
  const modes=['en-ja','ja-en'].map(mode=>{const button=new Element();button.dataset.mode=mode;return button;});
  const host={},hostEvents={};
  const homeModes=['en-ja','ja-en'].map(mode=>{const button=new Element();button.dataset.homeMode=mode;return button;});
  const document={hidden:false,events:{},getElementById:name=>documentIds.has(name)?element(name):null,createElement:()=>new Element(),querySelectorAll:selector=>selector==='[data-home-mode]'?homeModes:selector==='[data-mode]'?modes:[],addEventListener(name,handler){this.events[name]=handler;}};
  const context=vm.createContext({console,Math:randomMath,document,performance:{now:()=>now},matchMedia:()=>({matches:reducedMotion}),
    parent:host,location:{protocol:'https:',origin:'https://example.test'},addEventListener:(name,handler)=>{hostEvents[name]=handler;},
    localStorage:{getItem(key){reads.push(key);if(storageBlocked && storageBlocked!=='write')throw new Error('blocked');return storage.get(key)||null;},setItem(key,value){writes.push(key);if(storageBlocked)throw new Error('blocked');storage.set(key,value);}},
    requestAnimationFrame:callback=>{frames.set(++id,callback);return id;},cancelAnimationFrame:key=>frames.delete(key),
    setTimeout:(callback,delay)=>{timers.set(++id,{callback,at:now+delay});return id;},clearTimeout:key=>timers.delete(key)});
  for (const script of data)vm.runInContext(script,context);
  vm.runInContext(production?productionSource:source,context);
  function advance(ms) {
    now+=ms;
    const due=[...timers.entries()].filter(([,timer])=>timer.at<=now);
    for(const [key,timer] of due){timers.delete(key);timer.callback();}
    const callbacks=[...frames.entries()];
    for(const [key,callback] of callbacks){frames.delete(key);callback(now);}
  }
  return {api:context.TimedQuizPrototype||context.TimedQuiz,element,document,storage,reads,writes,modes,homeModes,advance,
    hostActivity:(active,origin='https://example.test',sender=host)=>hostEvents.message?.({source:sender,origin,data:{type:'my-phrase:quiz-activity',active}}),
    pending:()=>({timers:timers.size,frames:frames.size})};
}
function countIn(app) {for(let i=0;i<3;i++)app.advance(600);}
function ready(app,index=0) {app.api.start(index);countIn(app);}
function complete(app,correctCount) {
  if(app.api.snapshot().phase==='countdown')countIn(app);
  for(let i=0;i<10;i++){
    const q=app.api.snapshot().round.current;
    app.api.submit(i<correctCount?q.phrase.id:q.choices.find(p=>p.id!==q.phrase.id).id);
    app.advance(i<correctCount?650:1200);
  }
}

test('Standalone HTML embeds its 100 phrases, explanation notes and portrait without network dependencies',()=>{
  const {api}=load();
  assert.equal(api.phrases.length,100);assert.equal(api.stages.length,10);
  assert(api.stages.every(s=>s.phrases.length===10));
  assert.equal(new Set(api.stages.flatMap(s=>s.phrases.map(p=>p.id))).size,100);
  assert(!/<script\b[^>]*\bsrc=/.test(html));
  assert(html.includes('src="data:image/png;base64,'));
  assert(!/fetch\(|XMLHttpRequest|https?:\/\//.test(source));
});

test('Every question has four distinct meaningful options and a single correct answer in both directions',()=>{
  const {api}=load();
  for(const direction of ['en-ja','ja-en'])for(const p of api.phrases){
    const q=api.makeQuestion(p,direction),field=direction==='ja-en'?'en':'ja';
    assert.equal(q.choices.length,4);assert.equal(new Set(q.choices.map(c=>c[field])).size,4);
    assert.equal(q.choices.filter(c=>c.id===p.id).length,1);
    assert(!q.choices.some(c=>/[○△]/.test(c.en+c.ja)));
    if([174,180].includes(p.number))assert(!q.choices.some(c=>c.number===(p.number===174?180:174)));
  }
});

test('Retry question order and correct-answer positions are randomized',()=>{
  const {api}=load(),orders=new Set(),positions=new Map();
  for(let run=0;run<100;run++){
    const round=new api.Round(0,{seconds:8,direction:'en-ja'});
    orders.add(round.questions.map(q=>q.phrase.id).join('|'));
    assert.equal(new Set(round.questions.map(q=>q.phrase.id)).size,10);
    for(const q of round.questions){if(!positions.has(q.phrase.id))positions.set(q.phrase.id,new Set());positions.get(q.phrase.id).add(q.choices.findIndex(p=>p.id===q.phrase.id));}
  }
  assert(orders.size>90);for(const set of positions.values())assert.equal(set.size,4);
});

test('Only stage 1 starts unlocked, and passing at exactly 80 percent unlocks the next stage',()=>{
  const app=load();
  assert(app.api.isUnlocked(0,app.api.snapshot().progress));assert(!app.api.isUnlocked(1,app.api.snapshot().progress));
  app.api.start(1);assert.equal(app.api.snapshot().phase,'home');
  app.api.start(0);complete(app,8);
  assert.equal(app.api.snapshot().phase,'result');assert.equal(app.api.snapshot().round.result().percent,80);
  assert(app.api.isUnlocked(1,app.api.snapshot().progress));assert(!app.api.isUnlocked(2,app.api.snapshot().progress));
  app.element('resultAction').onclick();assert.equal(app.api.snapshot().round.stageIndex,1);
  assert.equal(app.api.snapshot().phase,'countdown');countIn(app);
  assert.equal(app.api.snapshot().phase,'question');
});

test('Failing below 80 percent does not unlock anything, and retry does not erase a previous best',()=>{
  const app=load();app.api.start(0);complete(app,7);
  assert(!app.api.snapshot().round.result().passed);assert(!app.api.isUnlocked(1,app.api.snapshot().progress));
  assert.equal(app.api.snapshot().progress.best[0],70);
  app.element('resultAction').onclick();complete(app,3);
  assert.equal(app.api.snapshot().progress.best[0],70);
  const reloaded=load(Object.fromEntries(app.storage));assert.equal(reloaded.api.snapshot().progress.best[0],70);
});

test('Time expiration counts as wrong even when a correct answer arrives at the deadline',()=>{
  const {api}=load();
  const round=new api.Round(0,{seconds:8,direction:'en-ja'});
  assert.equal(round.record(round.current.phrase.id,7999).correct,true);
  const late=round.record(round.current.phrase.id,8000);
  assert(!late.correct);assert(late.timeout);assert.equal(late.selected,null);
  const app=load();ready(app);app.advance(8000);
  assert.equal(app.api.snapshot().round.answers.length,1);assert(app.api.snapshot().round.answers[0].timeout);
  assert.equal(app.api.snapshot().phase,'feedback');
});

test('Rapid double answers cannot score twice and invalid answer IDs cannot progress',()=>{
  const app=load();ready(app);
  app.api.submit('missing');assert.equal(app.api.snapshot().round.answers.length,0);
  const id=app.api.snapshot().round.current.phrase.id;
  app.api.submit(id);app.api.submit(id);
  assert.equal(app.api.snapshot().round.answers.length,1);
  assert(app.element('answerList').children.every(b=>b.disabled));
  app.advance(650);assert.equal(app.api.snapshot().phase,'question');
});

test('Pause and hidden-tab protection preserve remaining time without penalties',()=>{
  const app=load();ready(app);app.advance(2500);app.api.pause();
  const left=app.api.snapshot().remaining;assert.equal(left,5500);
  app.advance(60000);assert.equal(app.api.snapshot().round.answers.length,0);
  app.api.resume();app.advance(1000);assert.equal(app.api.snapshot().remaining,4500);
  app.document.hidden=true;app.document.events.visibilitychange();assert.equal(app.api.snapshot().phase,'paused');
  app.advance(60000);assert.equal(app.api.snapshot().round.answers.length,0);
});

test('A next question reached while the tab is hidden starts paused rather than timing out',()=>{
  const app=load();ready(app);app.api.submit(app.api.snapshot().round.current.phrase.id);
  app.document.hidden=true;app.document.events.visibilitychange();app.advance(650);
  assert.equal(app.api.snapshot().phase,'paused');assert.equal(app.api.snapshot().remaining,8000);
  app.advance(60000);assert.equal(app.api.snapshot().round.answers.length,1);
});

test('Changing settings supports reverse questions and a different deadline',()=>{
  const app=load();app.element('settingsButton').events.click();
  app.modes[1].events.click();app.element('limitSlider').value='12';app.element('applySettings').events.click();
  assert.equal(app.api.snapshot().progress.settings.seconds,12);
  ready(app);assert.equal(app.api.snapshot().round.current.direction,'ja-en');
  assert.equal(app.element('questionText').attributes.lang,'ja');
  assert(app.element('answerList').children.every(b=>b.attributes.lang==='en'));
  app.advance(8000);assert.equal(app.api.snapshot().round.answers.length,0);
  app.advance(4000);assert(app.api.snapshot().round.answers[0].timeout);
});

test('A full ten-stage run can finish, while incorrect runs cannot revoke unlocked stages',()=>{
  const app=load();
  for(let index=0;index<10;index++){app.api.start(index);complete(app,10);assert(app.api.snapshot().round.result().passed);}
  assert(app.api.snapshot().progress.best.every(n=>n===100));
  app.api.start(0);complete(app,0);assert(app.api.isUnlocked(9,app.api.snapshot().progress));
});

test('Prototype storage is isolated from all production phrase, conversation and progress keys',()=>{
  const saved={'my-phrase-mvp-v1':'do not touch','my-phrase-conversations-v1':'do not touch','my-phrase-practice-coverage-20261025-v1':'do not touch'};
  const app=load(saved);app.api.start(0);complete(app,8);
  assert(app.reads.every(k=>k===KEY));assert(app.writes.every(k=>k===KEY));
  for(const [key,value] of Object.entries(saved))assert.equal(app.storage.get(key),value);
});

test('Malformed progress, impossible scores and blocked browser storage do not break play',()=>{
  const app=load({[KEY]:'not json'});assert.equal(app.api.snapshot().progress.settings.seconds,8);
  const bad=app.api.cleanProgress({best:[-1,101,88],settings:{seconds:0,direction:'bad'}});
  assert.deepEqual(plain(bad.best.slice(0,3)),[0,0,0]);assert.equal(bad.settings.seconds,8);
  const blocked=load({},123,true);blocked.api.start(0);complete(blocked,10);
  assert.equal(blocked.api.snapshot().phase,'result');assert.equal(blocked.element('storageError').hidden,false);
});

test('Start countdown cannot accept answers or consume any question time',()=>{
  const app=load();app.api.start(0);
  assert.equal(app.api.snapshot().phase,'countdown');
  assert.equal(app.element('countdownValue').textContent,3);
  app.api.submit(app.api.snapshot().round.current.phrase.id);
  assert.equal(app.api.snapshot().round.answers.length,0);
  app.advance(600);assert.equal(app.element('countdownValue').textContent,2);
  app.advance(600);assert.equal(app.element('countdownValue').textContent,1);
  app.advance(600);assert.equal(app.api.snapshot().phase,'question');
  assert.equal(app.api.snapshot().remaining,8000);
  assert.equal(app.element('countdownOverlay').hidden,true);
  app.advance(7999);assert.equal(app.api.snapshot().round.answers.length,0);
});

test('Hiding or pausing during the countdown protects the run and restarts the count-in',()=>{
  const app=load();app.api.start(0);app.advance(600);
  app.document.hidden=true;app.document.events.visibilitychange();
  assert.equal(app.api.snapshot().phase,'paused');
  app.advance(60000);assert.equal(app.api.snapshot().round.answers.length,0);
  app.document.hidden=false;app.api.resume();
  assert.equal(app.element('countdownValue').textContent,3);
  countIn(app);assert.equal(app.api.snapshot().remaining,8000);
});

test('Answering updates the correct tally without adding commentary or changing scoring',()=>{
  const app=load();ready(app);
  for(let i=0;i<3;i++){app.api.submit(app.api.snapshot().round.current.phrase.id);app.advance(650);}
  assert.equal(app.element('correctTally').textContent,3);
  const q=app.api.snapshot().round.current;
  app.api.submit(q.choices.find(p=>p.id!==q.phrase.id).id);
  assert.equal(app.element('correctTally').textContent,3);
  assert.equal(app.api.snapshot().round.result().percent,30);
});

test('Passing celebrates, animates the result ring, and navigation cleans all effects',()=>{
  const app=load();app.api.start(0);complete(app,10);
  assert(app.element('effects').innerHTML.includes('confetti'));
  assert.equal(app.element('resultTitle').textContent,'合格');
  assert.equal(app.element('resultSeal').textContent,'S');
  app.advance(700);assert.equal(app.element('scoreRing').style['--score'],100);
  app.api.renderHome();
  assert.equal(app.element('effects').innerHTML,'');
  assert.deepEqual(app.pending(),{timers:0,frames:0});
  app.api.start(0);app.api.renderHome();app.advance(10000);
  assert.equal(app.api.snapshot().phase,'home');
  assert.equal(app.element('countdownOverlay').hidden,true);
});

test('Reduced-motion mode omits confetti and immediately renders the final result ring',()=>{
  const app=load({},12345,false,true);app.api.start(0);complete(app,8);
  assert.equal(app.element('effects').innerHTML,'');
  assert.equal(app.element('scoreRing').style['--score'],80);
  assert.deepEqual(app.pending(),{timers:0,frames:0});
});

test('Result confetti cleans itself up and a failed attempt does not celebrate',()=>{
  const app=load();app.api.start(0);complete(app,8);app.advance(2500);
  assert.equal(app.element('effects').innerHTML,'');
  assert.deepEqual(app.pending(),{timers:0,frames:0});
  app.api.start(0);complete(app,7);
  assert.equal(app.element('effects').innerHTML,'');
  assert.equal(app.element('resultSeal').textContent,'C');
});

test('Correct answers show a large circle without praise and clear it before the next question',()=>{
  const app=load();ready(app);
  app.api.submit(app.api.snapshot().round.current.phrase.id);
  assert.equal(app.element('judgeOverlay').hidden,false);
  assert(app.element('judgeSymbol').innerHTML.includes('<circle'));
  assert.equal(app.element('feedback').textContent,'正解');
  assert(!/NICE!|GREAT!|AMAZING!|次は、いける|お見事|この調子/.test(source));
  assert(html.includes('class="sr-only" id="feedback"'));
  app.advance(500);assert.equal(app.element('judgeOverlay').hidden,true);
  assert.equal(app.api.snapshot().phase,'feedback');
  app.advance(150);assert.equal(app.api.snapshot().phase,'question');
  assert.equal(app.api.snapshot().remaining,8000);
});

test('Judgment symbols appear statically without drawing, scaling, or fading animations',()=>{
  const css=html.match(/<style>([\s\S]*?)<\/style>/)[1];
  for(const rule of css.matchAll(/\.judge[^{}]*\{([^{}]*)\}/g)) {
    assert(!/animation|transition|transform|stroke-dash/.test(rule[1]));
  }
  assert(!/@keyframes\s+(judge-pop|judge-fade|cross-pop|circle-draw)/.test(css));
});

test('Prototype uses the conversation app palette, typeface, and button shape',()=>{
  const production=fs.readFileSync(path.join(root,'index.html'),'utf8').match(/<style>([\s\S]*?)<\/style>/)[1];
  const css=html.match(/<style>([\s\S]*?)<\/style>/)[1];
  const value=(text,name)=>text.match(new RegExp('--'+name+'\\s*:\\s*([^;}]+)'))?.[1].trim();
  for(const name of ['bg','surface','surface-soft','ink','muted','line','brand','brand-strong','brand-soft','self-bg','self-ink','rose','success','focus']) {
    assert.equal(value(css,name),value(production,name),'Mismatched theme token '+name);
  }
  const typeface=text=>text.match(/font-family:([^;]+);/)[1].replace(/\s+/g,'');
  assert.equal(typeface(css),typeface(production));
  assert(/\.answer\s*\{[^}]*border-radius:8px/.test(css));
  assert(/\.question \.phrase-core\s*\{[^}]*color:var\(--rose\)/.test(css));
  assert(/\.question \.phrase-variable\s*\{[^}]*color:var\(--ink\)/.test(css));
  const app=load();assert.equal(app.element('headerTitle').textContent,'My Phrase.');
});

test('Wrong answers show a cross then reveal the prompt while leaving the correct choice marked',()=>{
  const app=load();ready(app);
  const q=app.api.snapshot().round.current;
  app.api.submit(q.choices.find(p=>p.id!==q.phrase.id).id);
  assert.equal(app.element('judgeOverlay').hidden,false);
  assert.equal(app.element('judgeSymbol').className,'judge-symbol is-wrong');
  assert(app.element('judgeSymbol').innerHTML.includes('<path'));
  const correct=app.element('answerList').children.find(b=>b.dataset.id===q.phrase.id);
  assert(correct.classList.contains('is-correct'));
  assert(correct.attributes['aria-label'].endsWith('（正解）'));
  app.advance(650);assert.equal(app.element('judgeOverlay').hidden,true);
  assert.equal(app.api.snapshot().phase,'feedback');
  assert(correct.classList.contains('is-correct'));
  app.advance(550);assert.equal(app.api.snapshot().phase,'question');
});

test('Timeouts use a cross and canceling play removes the judgment and its timers',()=>{
  const app=load();ready(app);app.advance(8000);
  assert.equal(app.element('judgeSymbol').className,'judge-symbol is-wrong');
  assert.equal(app.element('feedback').textContent,'時間切れ。不正解');
  app.api.renderHome();
  assert.equal(app.element('judgeOverlay').hidden,true);
  assert.deepEqual(app.pending(),{timers:0,frames:0});
  app.advance(2000);assert.equal(app.api.snapshot().phase,'home');
});

test('Reduced-motion mode still clears the static judgment so it cannot obscure the next prompt',()=>{
  const app=load({},12345,false,true);ready(app);
  app.api.submit(app.api.snapshot().round.current.phrase.id);
  assert.equal(app.element('judgeOverlay').hidden,false);
  app.advance(500);assert.equal(app.element('judgeOverlay').hidden,true);
  app.advance(150);assert.equal(app.api.snapshot().phase,'question');
});

test('All referenced UI elements exist, with judgment placed above the answers rather than the prompt',()=>{
  for(const match of source.matchAll(/\$\('([^']+)'\)/g))assert(documentIds.has(match[1]),'Missing UI element '+match[1]);
  assert(html.includes('class="answers-area"><div class="answers" id="answerList"'));
  assert(html.indexOf('id="judgeOverlay"')>html.indexOf('id="answerList"'));
  assert(!html.includes('class="answer-number"'));
});

test('Home direction controls immediately update, persist, and generate the selected question type',()=>{
  const app=load();app.homeModes[1].events.click();
  assert.equal(app.api.snapshot().progress.settings.direction,'ja-en');
  assert.equal(app.homeModes[1].attributes['aria-pressed'],'true');
  assert.equal(app.homeModes[0].attributes['aria-pressed'],'false');
  const reloaded=load(Object.fromEntries(app.storage));
  assert.equal(reloaded.homeModes[1].attributes['aria-pressed'],'true');
  ready(app);assert.equal(app.api.snapshot().round.current.direction,'ja-en');
  assert.equal(app.element('headerTitle').textContent,'Section 1');
  assert.equal(app.element('skipButton').disabled,false);
});

test('The unknown-answer button records a skip, not a timeout, and includes it in review',()=>{
  const app=load();ready(app);app.element('skipButton').events.click();
  const answer=app.api.snapshot().round.answers[0];
  assert.equal(answer.skipped,true);assert.equal(answer.timeout,false);assert.equal(answer.correct,false);
  assert.equal(app.element('skipButton').disabled,true);
  assert.equal(app.element('judgeSymbol').className,'judge-symbol is-wrong');
  app.element('skipButton').events.click();assert.equal(app.api.snapshot().round.answers.length,1);
  app.advance(1200);
  for(let i=1;i<10;i++){app.api.submit(app.api.snapshot().round.current.phrase.id);app.advance(650);}
  assert.equal(app.element('timeoutValue').textContent,'0 問');
  assert.equal(app.element('skipValue').textContent,'1 問');
  assert(app.element('reviewList').children[0].innerHTML.includes('わからない'));
  assert(!app.element('reviewList').children[0].innerHTML.includes('undefined'));
});

test('Ranks are derived from accuracy and a zero-score attempt remains distinguishable from unplayed',()=>{
  const app=load();
  assert.deepEqual([0,50,60,70,80,90,100].map(app.api.rankFor),['D','D','C','C','B','A','S']);
  assert.equal(app.api.snapshot().progress.played[0],false);
  assert(app.element('stageList').children[0].innerHTML.includes('stage-rank'));
  app.api.start(0);complete(app,0);
  assert.equal(app.element('resultSeal').textContent,'D');
  const reloaded=load(Object.fromEntries(app.storage));
  assert.equal(reloaded.api.snapshot().progress.played[0],true);
  assert(reloaded.element('stageList').children[0].innerHTML.includes('rank-D'));
  assert(!reloaded.api.isUnlocked(1,reloaded.api.snapshot().progress));
  const old=load({[KEY]:JSON.stringify({best:[90]})});
  assert(old.element('stageList').children[0].innerHTML.includes('rank-A'));
  assert(old.element('stageList').children[1].disabled===false);
});

test('Production game imports a trial record once, preserves the original, and saves under its own key',()=>{
  const trial=JSON.stringify({best:[90],settings:{seconds:12,direction:'ja-en'}});
  const app=load({[KEY]:trial},12345,false,false,true);
  assert.equal(app.api.KEY,'my-phrase-timed-quiz-v1');
  assert.equal(app.api.snapshot().progress.best[0],90);
  assert.equal(app.api.snapshot().progress.settings.seconds,12);
  assert.equal(app.storage.get(KEY),trial);
  assert(app.writes.every(k=>k==='my-phrase-timed-quiz-v1'));
  app.hostActivity(true);app.api.start(1);complete(app,10);
  assert.equal(app.api.snapshot().round.result().percent,100);
  const existing=load({[KEY]:trial,'my-phrase-timed-quiz-v1':JSON.stringify({best:[80],settings:{seconds:4}})},12345,false,false,true);
  assert.equal(existing.api.snapshot().progress.best[0],80);
  assert.equal(existing.api.snapshot().progress.settings.seconds,4);
});

test('The production frame suspends timing when its menu or another view is active',()=>{
  const app=load({},12345,false,false,true);app.hostActivity(true);ready(app);app.advance(2500);
  app.hostActivity(false);
  assert.equal(app.api.snapshot().phase,'paused');assert.equal(app.api.snapshot().remaining,5500);
  app.advance(60000);app.api.resume();assert.equal(app.api.snapshot().phase,'paused');
  app.hostActivity(true);app.api.resume();app.advance(1000);
  assert.equal(app.api.snapshot().remaining,4500);
});

test('A failed migration write does not discard the loaded trial progress',()=>{
  const app=load({[KEY]:JSON.stringify({best:[90]})},12345,'write',false,true);
  assert.equal(app.api.snapshot().progress.best[0],90);
  assert.equal(app.element('storageError').hidden,false);
  app.hostActivity(true);ready(app,1);
  assert.equal(app.api.snapshot().phase,'question');
});

test('Only messages from the same-origin host may suspend the production frame',()=>{
  const app=load({},12345,false,false,true);app.hostActivity(true);ready(app);
  app.hostActivity(false,'https://untrusted.test');assert.equal(app.api.snapshot().phase,'question');
  app.hostActivity(false,'https://example.test',{});assert.equal(app.api.snapshot().phase,'question');
  app.hostActivity(false);assert.equal(app.api.snapshot().phase,'paused');
});

test('Leaving the production frame during feedback cannot start a hidden question timer',()=>{
  const app=load({},12345,false,false,true);app.hostActivity(true);ready(app);
  app.api.submit(app.api.snapshot().round.current.phrase.id);app.hostActivity(false);app.advance(650);
  assert.equal(app.api.snapshot().phase,'paused');assert.equal(app.api.snapshot().remaining,8000);
  app.advance(60000);assert.equal(app.api.snapshot().round.answers.length,1);
});
