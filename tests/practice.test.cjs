const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const source = html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/^    init\(\);\s*$/m, '');
const conversationKey = 'my-phrase-conversations-v1';
const libraryKey = 'my-phrase-topic-library-v1';
const replyLanguageKey = 'my-phrase-reply-language-v1';
const plain = value => JSON.parse(JSON.stringify(value));

class Element {
  constructor() {
    this.children = [];
    this.attributes = {};
    this.events = {};
    const classes = new Set();
    this.classList = {
      add: (...values) => values.forEach(value => classes.add(value)),
      remove: (...values) => values.forEach(value => classes.delete(value)),
      contains: value => classes.has(value)
    };
    this.options = this.children;
    this.disabled = false;
    this.value = '';
  }
  set innerHTML(value) { this.html = value; this.children.length = 0; }
  get innerHTML() { return this.html || ''; }
  get firstElementChild() { return this.children[0]; }
  get scrollHeight() { return this.children.length * 80; }
  appendChild(child) { this.children.push(child); return child; }
  removeChild(child) { this.children.splice(this.children.indexOf(child), 1); }
  setAttribute(key, value) { this.attributes[key] = value; }
  addEventListener(key, handler) { this.events[key] = handler; }
}

function loadApp(saved = {}, seed = 12345) {
  const storage = new Map(Object.entries(saved));
  const elements = new Map();
  const timers = new Map();
  let timerId = 0;
  const randomMath = Object.create(Math);
  randomMath.random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const element = selector => {
    if (!elements.has(selector)) elements.set(selector, new Element());
    return elements.get(selector);
  };
  const context = vm.createContext({
    console, Math: randomMath, Date,
    localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, String(value)) },
    document: { querySelector: element, querySelectorAll: () => [], createElement: () => new Element() },
    window: {
      setTimeout: handler => { timers.set(++timerId, handler); return timerId; },
      clearTimeout: id => timers.delete(id)
    }
  });
  element('#categoryFilter').value = 'all';
  element('#statusFilter').value = 'all';
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'phrase-library.js'), 'utf8'), context);
  vm.runInContext(source + `
    globalThis.api = {
      conversations: () => conversations,
      legacyTopics: () => legacyTopicConversations,
      topics: () => topicConversations,
      practice: () => practice,
      nodes: () => simulationNodes,
      setPractice: value => { practice = value; },
      buildSimulation, buildOptions, findCorePatterns, startConversation, pickStartConversation, teacherReceipt,
      chooseReply, showMessageTranslation, hideMessageTranslation, formatEnglish, init,
      setReplyLanguage, paintReplyOptions, replyLanguage: () => replyLanguage,
      helpers: () => commonReplies,
      supplied: () => suppliedLibrary,
      suppliedConversations: () => suppliedConversations,
      phrases: () => phrases
    };
  `, context);
  return { api: context.api, storage, element, flush: () => {
    const first = timers.entries().next().value;
    if (!first) return false;
    timers.delete(first[0]);
    first[1]();
    return true;
  } };
}

test('Every built-in node samples four unique phrase replies with varied content and positions', () => {
  const { api } = loadApp();
  let states = 0;
  for (const c of api.conversations()) {
    const nodes = api.buildSimulation(c);
    for (const [id, node] of Object.entries(nodes)) {
      states++;
      api.setPractice({ conversationId: c.id, nodeId: id });
      const sets = new Set();
      const positions = new Map();
      let lastSet;
      for (let run = 0; run < 500; run++) {
        const options = api.buildOptions(node);
        assert.equal(options.length, 4);
        assert.equal(new Set(options.map(o => o.text.toLowerCase())).size, 4);
        assert(options.some(o => !o.action));
        options.forEach((o, i) => {
          assert(api.findCorePatterns(o.text, o.core || '').length > 0, o.text);
          assert(o.ja);
          assert(o.next === null || nodes[o.next], `${c.id}/${id}: invalid next ${o.next}`);
          if (!positions.has(o.text)) positions.set(o.text, new Set());
          positions.get(o.text).add(i);
        });
        const signature = options.map(o => o.text).sort().join('|');
        assert.notEqual(signature, lastSet);
        lastSet = signature;
        sets.add(signature);
      }
      assert(sets.size >= 8, `${c.id}/${id}: not enough variety`);
      for (const [text, slots] of positions) assert.equal(slots.size, 4, `${c.id}/${id}: ${text}`);
    }
  }
  assert(states >= 35);
});

test('Startup varies across all scenarios and excludes the previous session start', () => {
  const { api, storage } = loadApp();
  const starts = new Set();
  let previous;
  for (let i = 0; i < 200; i++) {
    const id = api.pickStartConversation();
    assert.notEqual(id, previous);
    api.startConversation(id);
    assert.equal(api.practice().conversationId, id);
    starts.add(id);
    previous = id;
  }
  assert.equal(starts.size, api.conversations().length);
  const reloaded = loadApp(Object.fromEntries(storage));
  assert.notEqual(reloaded.api.pickStartConversation(), previous);
});

test('The real init path renders four choices and does not force the morning conversation', () => {
  const { api, element } = loadApp({ 'my-phrase-last-start-v1': 'morning' });
  api.init();
  assert.notEqual(api.practice().conversationId, 'morning');
  assert.equal(element('#replyOptions').children.length, 4);
  assert.equal(element('#chatLog').children.length, 1);
});

test('Choices default to Japanese while the teacher continues speaking English', () => {
  const { api, element } = loadApp();
  api.init();
  assert.equal(api.replyLanguage(), 'ja');
  const choices = element('#replyOptions').children;
  api.practice().options.forEach((option, i) => {
    assert(choices[i].innerHTML.includes('lang="ja"'));
    assert(choices[i].innerHTML.includes(option.ja));
    assert(!choices[i].innerHTML.includes('lang="en"'));
  });
  assert.equal(element('#replyJapaneseBtn').attributes['aria-pressed'], 'true');
  assert.equal(element('#replyEnglishBtn').attributes['aria-pressed'], 'false');
  const message = element('#chatLog').children[0];
  assert.equal(message.children[1].children[1].children[0].children[0].attributes.lang, 'en');
});

test('Selecting a Japanese choice posts its paired English and keeps the eye translation', () => {
  const { api, element } = loadApp();
  api.startConversation('source-scene-home-cooking');
  const index = api.practice().options.findIndex(option => !option.action);
  const option = api.practice().options[index];
  element('#replyOptions').children[index].events.click();
  const user = element('#chatLog').children[1];
  const line = user.children[1].children[1];
  const text = line.children[0].children[0];
  assert.equal(text.attributes.lang, 'en');
  assert.equal(text.innerHTML, api.formatEnglish(option.text, option.core || ''));
  assert(text.innerHTML.includes('phrase-core'));
  assert.equal(api.practice().log[0].text, option.text);
  assert.equal(api.practice().log[0].ja, option.ja);
  line.children[1].events.click();
  assert.equal(text.attributes.lang, 'ja');
  assert.equal(text.innerHTML, option.ja);
});

test('Language controls preserve the exact choices, order, chat and progress', () => {
  const { api, element } = loadApp();
  api.init();
  const before = plain(api.practice());
  const options = api.practice().options;
  const chat = [...element('#chatLog').children];
  element('#replyEnglishBtn').events.click();
  assert.equal(api.replyLanguage(), 'en');
  assert.equal(api.practice().options, options);
  assert.deepEqual(plain(api.practice()), before);
  assert.deepEqual(element('#chatLog').children, chat);
  element('#replyOptions').children.forEach((button, index) => {
    assert(button.innerHTML.includes('lang="en"'));
    assert(button.innerHTML.includes(api.formatEnglish(options[index].text, options[index].core || '')));
  });
  assert.equal(element('#replyEnglishBtn').attributes['aria-pressed'], 'true');
  element('#replyJapaneseBtn').events.click();
  assert.equal(api.replyLanguage(), 'ja');
  assert.equal(api.practice().options, options);
  assert.deepEqual(plain(api.practice()), before);
});

test('Choice language preference survives reload and invalid values fall back to Japanese', () => {
  const { api, storage } = loadApp();
  api.init();
  api.setReplyLanguage('en');
  assert.equal(storage.get(replyLanguageKey), 'en');
  const reloaded = loadApp(Object.fromEntries(storage));
  reloaded.api.init();
  assert.equal(reloaded.api.replyLanguage(), 'en');
  assert(reloaded.element('#replyOptions').children.every(b => b.innerHTML.includes('lang="en"')));
  reloaded.api.setReplyLanguage('ja');
  assert.equal(loadApp(Object.fromEntries(reloaded.storage)).api.replyLanguage(), 'ja');
  assert.equal(loadApp({ [replyLanguageKey]: 'invalid' }).api.replyLanguage(), 'ja');
  reloaded.api.setReplyLanguage('invalid');
  assert.equal(reloaded.storage.get(replyLanguageKey), 'ja');
});

test('Language changes cannot reset disabled choices while a reply or topic transition is pending', () => {
  const { api, element, flush } = loadApp();
  api.startConversation('source-scene-home-cooking');
  const index = api.practice().options.findIndex(option => !option.action);
  api.chooseReply(index, element('#replyOptions').children[index]);
  const buttons = [...element('#replyOptions').children];
  api.setReplyLanguage('en');
  assert.equal(api.replyLanguage(), 'ja');
  assert.deepEqual(element('#replyOptions').children, buttons);
  assert(buttons.every(b => b.disabled));
  buttons[index].events.click();
  assert.equal(api.practice().log.length, 1);
  assert(flush());
  while (!api.practice().completed) {
    const i = api.practice().options.findIndex(option => !option.action);
    api.chooseReply(i, element('#replyOptions').children[i]);
    assert(flush());
  }
  const finalButtons = [...element('#replyOptions').children];
  api.setReplyLanguage('en');
  assert.equal(api.replyLanguage(), 'ja');
  assert.deepEqual(element('#replyOptions').children, finalButtons);
  assert(flush());
  assert(element('#replyOptions').children.every(b => b.innerHTML.includes('lang="ja"')));
  api.setReplyLanguage('en');
  assert.equal(api.replyLanguage(), 'en');
});

test('Japanese questions still trigger teacher answers rather than advancing the original question', () => {
  const { api, element, flush } = loadApp();
  api.startConversation('source-scene-home-cooking');
  const index = api.practice().options.findIndex(option => option.action === 'ask');
  assert(index >= 0);
  const question = api.practice().options[index];
  assert(element('#replyOptions').children[index].innerHTML.includes(question.ja));
  element('#replyOptions').children[index].events.click();
  assert.equal(api.practice().log[0].text, question.text);
  assert(flush());
  assert.equal(api.practice().nodeId, question.next);
  assert.equal(api.nodes()[api.practice().nodeId].kind, 'reaction');
  assert(element('#replyOptions').children.every(b => b.innerHTML.includes('lang="ja"')));
});

test('Japanese choice text is escaped and an absent translation safely falls back to English', () => {
  const { api, element } = loadApp();
  api.setPractice({ options: [
    { text: 'Sounds good.', ja: '<img src=x onerror=alert(1)> & "test"' },
    { text: 'Could I see the menu?', ja: '' },
    { text: 'Sounds good.', ja: '   ' },
    { text: 'Sounds good.' }
  ] });
  api.paintReplyOptions();
  const choices = element('#replyOptions').children;
  assert(!choices[0].innerHTML.includes('<img'));
  assert(choices[0].innerHTML.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert(choices[0].innerHTML.includes('&amp;'));
  for (const button of choices.slice(1)) {
    assert(button.innerHTML.includes('lang="en"'));
    assert(button.innerHTML.includes('phrase-core'));
  }
});

test('Each built-in opening has at least three variants without back-to-back repetition', () => {
  const { api } = loadApp();
  for (const c of api.conversations()) {
    const openings = new Set();
    let last;
    for (let i = 0; i < 30; i++) {
      api.startConversation(c.id);
      const text = api.nodes().turn0.partnerEn;
      assert.notEqual(text, last);
      openings.add(text);
      last = text;
    }
    assert.equal(openings.size, 3, c.id);
  }
});

test('Default topic language is short and every reply has a reusable phrase', () => {
  const { api } = loadApp();
  for (const c of api.topics()) {
    assert(c.beginner);
    for (const t of c.turns) {
      assert(t.partnerEn.split(/\s+/).length <= 12, t.partnerEn);
      const replies = [{ text: t.replyEn }, ...t.alternatives];
      assert.equal(replies.length, 5);
      for (const reply of replies) {
        assert(reply.text.split(/\s+/).length <= 10, reply.text);
        assert(api.findCorePatterns(reply.text).length, reply.text);
        assert(!/unwind|convenience|unexpected|set aside|catch up|routine|stressful|recommendations/i.test(reply.text));
      }
    }
  }
});

test('Old unedited defaults migrate, while customized content and learning history remain', () => {
  const original = loadApp();
  const legacy = plain(original.api.legacyTopics());
  legacy[0].attempts = 8;
  legacy[0].successStreak = 2;
  legacy[0].status = '練習中';
  legacy[1].turns[0].partnerEn = 'My own question?';
  legacy[2].title = 'My own title';
  const custom = { id: 'custom', title: 'Custom', role: 'Friend', scene: '', closingEn: '', closingJa: '', turns: [
    { partnerEn: 'My custom opening?', partnerJa: 'Custom', replyEn: 'I like tea.', replyJa: 'Tea' }
  ] };
  const saved = { [conversationKey]: JSON.stringify([...legacy, custom]), [libraryKey]: '1', 'my-phrase-supplied-library-v1': '1' };
  const app = loadApp(saved);
  const migrated = plain(app.api.conversations());
  assert.equal(migrated[0].turns[0].partnerEn, 'How is work today?');
  assert.equal(migrated[0].attempts, 8);
  assert.equal(migrated[0].successStreak, 2);
  assert.equal(migrated[1].turns[0].partnerEn, 'My own question?');
  assert.equal(migrated[2].title, 'My own title');
  app.api.startConversation(migrated[1].id);
  assert.equal(app.api.nodes().turn0.partnerEn, 'My own question?');
  app.api.startConversation('custom');
  assert.equal(app.api.nodes().turn0.partnerEn, 'My custom opening?');
  const reloaded = loadApp(Object.fromEntries(app.storage));
  assert.deepEqual(plain(reloaded.api.conversations()), migrated);
});

test('Deleted conversations stay deleted, including an empty library', () => {
  const empty = loadApp({ [conversationKey]: '[]', [libraryKey]: '1' });
  assert.equal(empty.api.conversations().length, 0);
  empty.api.startConversation();
  assert.equal(empty.api.practice().conversationId, null);
  const onlyOne = plain(loadApp().api.topics())[0];
  const app = loadApp({ [conversationKey]: JSON.stringify([onlyOne]), [libraryKey]: '1', 'my-phrase-supplied-library-v1': '1' });
  assert.equal(app.api.conversations().length, 1);
});

test('Helper choices pause, repeat, explain or switch topics without breaking the conversation', () => {
  const { api, element, flush } = loadApp();
  for (const helper of api.helpers()) {
    api.startConversation('topic-food');
    const state = api.practice();
    state.options = [{ ...helper, next: state.nodeId }];
    api.chooseReply(0, new Element());
    assert(flush());
    if (helper.action === 'skip') {
      assert(flush());
      assert.notEqual(api.practice().conversationId, 'topic-food');
    } else {
      assert.equal(api.practice().nodeId, 'turn0');
      assert.equal(api.practice().waiting, false);
    }
    assert.equal(element('#replyOptions').children.length, 4);
  }
});

test('Sixty consecutive topic sets progress naturally and keep chat history bounded', () => {
  const { api, element, flush } = loadApp();
  api.startConversation('topic-food');
  const topics = [];
  for (let i = 0; i < 60; i++) {
    const c = api.practice().conversationId;
    topics.push(c);
    assert(!topics.slice(Math.max(0, topics.length - 4), -1).includes(c));
    while (!api.practice().completed) {
      const state = api.practice();
      const index = state.options.findIndex(o => !o.action && !o.mismatch);
      assert(index >= 0);
      api.chooseReply(index, element('#replyOptions').children[index]);
      assert(flush());
    }
    assert(flush());
    assert.equal(element('#replyOptions').children.length, 4);
    assert(element('#chatLog').children.length <= 60);
  }
  assert(new Set(topics).size >= 20);
});

test('Translation still replaces English in the same bubble and restores red phrase markup', () => {
  const { api, element, flush } = loadApp();
  api.startConversation('topic-food');
  const node = element('#chatLog').children[0];
  const line = node.children[1].children[1];
  const body = line.children[0].children[0];
  const eye = line.children[1];
  const english = body.innerHTML;
  eye.events.click();
  assert.notEqual(body.innerHTML, english);
  assert.equal(body.attributes.lang, 'ja');
  assert(flush());
  assert.equal(body.innerHTML, english);
  assert.equal(body.attributes.lang, 'en');
  assert(api.formatEnglish('I like pasta.').includes('phrase-core'));
});

test('A mismatched reply triggers clarification, then lets the learner recover', () => {
  const { api, element, flush } = loadApp();
  api.startConversation('topic-food');
  const state = api.practice();
  state.options = [{ text: 'I like swimming.', ja: 'Swimming', mismatch: true, next: 'turn0' }];
  api.chooseReply(0, new Element());
  assert(flush());
  assert.equal(api.practice().nodeId, 'turn0');
  assert(api.practice().repaired);
  assert.equal(api.practice().waiting, false);
  assert.equal(element('#replyOptions').children.length, 4);
  const index = api.practice().options.findIndex(o => !o.action);
  api.chooseReply(index, element('#replyOptions').children[index]);
  assert(flush());
  const node = api.nodes()[api.practice().nodeId];
  assert(api.practice().nodeId === 'turn1' || node.kind === 'reaction' && node.resumeNext === 'turn1');
});

test('Every enhanced turn offers a learner question and the teacher answers it instead of asking again', () => {
  const { api, element, flush } = loadApp();
  api.startConversation('source-scene-home-cooking');
  const before = api.nodes().turn0.partnerEn;
  const index = api.practice().options.findIndex(option => option.action === 'ask');
  assert(index >= 0);
  const selected = api.practice().options[index];
  const allowedAnswers = new Set(selected.stories.map(story => story.en));
  api.chooseReply(index, element('#replyOptions').children[index]);
  assert(flush());
  const reaction = api.nodes()[api.practice().nodeId];
  assert.equal(reaction.kind, 'reaction');
  assert(allowedAnswers.has(reaction.partnerEn));
  assert.notEqual(reaction.partnerEn, before);
  assert(!reaction.partnerEn.includes('?'));
  assert(api.practice().options.some(option => option.action === 'ask'));
  assert(api.practice().options.some(option => !option.action));
});

test('A follow-up question gets details of the same teacher story', () => {
  const { api, element, flush } = loadApp();
  api.startConversation('source-scene-home-cooking');
  let index = api.practice().options.findIndex(option => option.action === 'ask');
  api.chooseReply(index, element('#replyOptions').children[index]);
  assert(flush());
  const node = api.nodes()[api.practice().nodeId];
  const detail = node.story.detailEn;
  const question = node.questions.find(option => option.text === 'Can you tell me more about that?');
  api.practice().options = [question];
  api.chooseReply(0, new Element());
  assert(flush());
  const answered = api.nodes()[api.practice().nodeId];
  assert.equal(answered.partnerEn, detail);
  assert.equal(answered.resumeNext, 'turn1');
});

test('What about you gets an answer to the cooking question, not an unrelated anecdote', () => {
  const { api, flush } = loadApp();
  for (let i = 0; i < 12; i++) {
    api.startConversation('source-scene-home-cooking');
    const question = api.nodes().turn0.questions.find(option => option.text === 'What about you?');
    api.practice().options = [question];
    api.chooseReply(0, new Element());
    assert(flush());
    const answer = api.nodes()[api.practice().nodeId];
    assert(/cooked soup|made pasta/i.test(answer.partnerEn));
    assert(!/cafe|reading|guitar/i.test(answer.partnerEn));
  }
});

test('Advice can be acknowledged without treating it as happy news', () => {
  const { api, flush } = loadApp();
  api.startConversation('source-scene-home-cooking');
  const question = api.nodes().turn0.questions.find(option => option.text === 'Do you have any recommendations?');
  api.practice().options = [question];
  api.chooseReply(0, new Element());
  assert(flush());
  const node = api.nodes()[api.practice().nodeId];
  assert.equal(node.story.tone, 'neutral');
  assert(node.choices.some(option => option.text === 'That makes sense.'));
  assert(!node.choices.some(option => option.text === "I'm glad to hear that."));
});

test('Learner can react to the teacher and then continue the original conversation', () => {
  const { api, element, flush } = loadApp();
  api.startConversation('source-scene-home-cooking');
  const question = api.nodes().turn0.questions[0];
  api.practice().options = [question];
  api.chooseReply(0, new Element());
  assert(flush());
  const reaction = api.nodes()[api.practice().nodeId];
  assert.equal(reaction.kind, 'reaction');
  const index = api.practice().options.findIndex(option => !option.action);
  const reply = api.practice().options[index];
  assert(reaction.choices.some(choice => choice.text === reply.text));
  api.chooseReply(index, element('#replyOptions').children[index]);
  assert(flush());
  assert.equal(api.practice().nodeId, 'turn1');
});

test('At most two direct answers pass before the teacher shares a statement', () => {
  const { api, element, flush } = loadApp();
  for (let run = 0; run < 30; run++) {
    api.startConversation('source-scene-last-weekend');
    let directAnswers = 0;
    let shares = 0;
    for (let step = 0; step < 12 && !api.practice().completed; step++) {
      const node = api.nodes()[api.practice().nodeId];
      if (node.kind === 'conversation') directAnswers++;
      else if (node.kind === 'reaction') {
        shares++;
        assert(!node.story.en.includes('?'));
        assert(!node.partnerEn.trim().endsWith('?'));
        assert(directAnswers <= 2);
        directAnswers = 0;
      }
      const index = api.practice().options.findIndex(option => !option.action);
      assert(index >= 0);
      api.chooseReply(index, element('#replyOptions').children[index]);
      assert(flush());
    }
    assert(api.practice().completed);
    assert(shares >= 1);
  }
});

test('Teacher acknowledgements are varied and fit difficult, uncertain and happy replies', () => {
  const { api } = loadApp();
  const base = { kind: 'conversation' };
  const negative = ['I made a mistake.', 'I was a little disappointed.', "I've been busy with work."];
  for (const text of negative) {
    for (let i = 0; i < 8; i++) {
      const receipt = api.teacherReceipt({ text }, base);
      assert.equal(receipt.tone, 'tough');
      assert(!/nice|good to hear|glad/.test(receipt.en.toLowerCase()));
    }
  }
  assert.equal(api.teacherReceipt({ text: 'I had fun.' }, base).tone, 'positive');
  assert.equal(api.teacherReceipt({ text: "I haven't decided yet." }, base).tone, 'neutral');
  const lines = new Set();
  for (let i = 0; i < 12; i++) lines.add(api.teacherReceipt({ text: 'I cooked pasta.' }, base).en);
  assert(lines.size >= 3);
});

test('Runtime conversation beats do not overwrite customized scripts or saved content', () => {
  const original = loadApp();
  const saved = plain(original.api.conversations());
  const custom = saved.find(c => c.id === 'source-scene-home-cooking');
  custom.turns[0].partnerEn = 'My own question?';
  original.storage.set(conversationKey, JSON.stringify(saved));
  const { api } = loadApp(Object.fromEntries(original.storage));
  const actual = api.conversations().find(c => c.id === custom.id);
  assert.deepEqual(plain(actual.turns), custom.turns);
  const nodes = api.buildSimulation(actual);
  assert.equal(nodes.turn0.partnerEn, 'My own question?');
  assert(!nodes.turn0.questions);
  assert(!Object.keys(nodes).some(key => key.startsWith('reaction-')));
});

test('All 300 source phrases have complete examples and all 132 slot templates have three variants', () => {
  const { api } = loadApp();
  const catalog = api.supplied();
  assert.equal(catalog.length, 300);
  assert.equal(catalog.filter(entry => /[○△]/.test(entry.en)).length, 132);
  let total = 0;
  for (const entry of catalog) {
    assert.equal(entry.examples.length, /[○△]/.test(entry.en) ? 3 : 1, entry.en);
    for (const example of entry.examples) {
      total++;
      assert(!/[○△]/.test(example.text + example.ja));
      assert(!/inging\b/.test(example.text), example.text);
      assert.equal(example.parts.map(part => part.text).join(''), example.text);
      const rendered = api.formatEnglish(example.text);
      assert(rendered.includes('phrase-core'));
      const matches = api.findCorePatterns(example.text);
      let offset = 0;
      for (const part of example.parts) {
        const start = offset;
        offset += part.text.length;
        if (part.variable) {
          assert(!matches.some(match => start < match.end && offset > match.start), example.text);
        }
      }
    }
  }
  assert.equal(total, 564);
});

test('Fixed phrase pieces stay red while one or more substituted slots stay normal-weight black', () => {
  const { api } = loadApp();
  assert.equal(api.formatEnglish('I cooked pasta at home.'), '<strong class="phrase-core">I cooked </strong><span class="phrase-variable">pasta</span><strong class="phrase-core"> at home.</strong>');
  const multiple = api.formatEnglish('I decided to make pasta because it looked easy.');
  assert(multiple.includes('<span class="phrase-variable">make pasta</span>'));
  assert(multiple.includes('<strong class="phrase-core"> because </strong>'));
  assert(multiple.includes('<span class="phrase-variable">it looked easy</span>'));
  const newWord = api.formatEnglish('I cooked noodles at home.');
  assert(newWord.includes('<span class="phrase-variable">noodles</span>'));
  assert(newWord.includes('<strong class="phrase-core"> at home.</strong>'));
  const gerund = api.formatEnglish('While I was swimming, something nice happened.');
  assert(gerund.includes('<span class="phrase-variable">swimming</span>'));
  assert(gerund.includes('<span class="phrase-variable">something nice</span>'));
  const escaped = api.formatEnglish('I cooked <img src=x> at home.');
  assert(!escaped.includes('<img'));
  assert(escaped.includes('&lt;img src=x&gt;'));
  assert(html.includes('.phrase-variable { color: #24252a; font-weight: 400; }'));
});

test('Source-based scenes contain only completed source examples and have coherent ordered turns', () => {
  const { api } = loadApp();
  const examples = new Set(api.supplied().flatMap(entry => entry.examples.map(example => example.text)));
  assert(api.suppliedConversations().length >= 20);
  for (const c of api.suppliedConversations()) {
    assert.equal(c.role, '先生');
    assert(c.turns.length >= 2);
    const nodes = api.buildSimulation(c);
    for (let i = 0; i < c.turns.length; i++) {
      const node = nodes['turn' + i];
      for (const reply of node.choices) {
        assert(examples.has(reply.text), reply.text);
        assert.equal(reply.next, i === c.turns.length - 1 ? null : 'turn' + (i + 1));
      }
    }
  }
});

test('Imported phrases and scenarios are added once and edits/deletions are respected on reload', () => {
  const app = loadApp();
  const libraryPhrase = app.api.phrases().find(p => p.id.startsWith('library-'));
  const phrases = plain(app.api.phrases());
  const edited = phrases.find(p => p.id === libraryPhrase.id);
  edited.en = 'I cooked noodles at home.';
  edited.ja = '家で麺を作った。';
  edited.correct = 7;
  const kept = plain(app.api.conversations()).filter(c => c.id !== 'source-scene-home-cooking');
  app.storage.set('my-phrase-mvp-v1', JSON.stringify(phrases));
  app.storage.set(conversationKey, JSON.stringify(kept));
  const reloaded = loadApp(Object.fromEntries(app.storage));
  assert.equal(reloaded.api.phrases().length, phrases.length);
  assert.equal(reloaded.api.phrases().find(p => p.id === edited.id).en, edited.en);
  assert.equal(reloaded.api.phrases().find(p => p.id === edited.id).correct, 7);
  assert(!reloaded.api.conversations().some(c => c.id === 'source-scene-home-cooking'));
});

test('Teacher portrait is a real local PNG and the chat label is teacher rather than friend', () => {
  const { api, element } = loadApp();
  api.startConversation('source-scene-home-cooking');
  const message = element('#chatLog').children[0];
  const portrait = message.children[0].children[0];
  assert.equal(portrait.src, 'assets/teacher-cutout.png');
  assert.equal(message.children[1].children[0].textContent, '先生');
  const png = fs.readFileSync(path.join(__dirname, '..', portrait.src));
  assert.equal(png.subarray(1, 4).toString(), 'PNG');
  assert(png.readUInt32BE(16) >= 200);
  assert(png.readUInt32BE(20) >= 200);
  const index = api.practice().options.findIndex(option => !option.action);
  api.chooseReply(index, element('#replyOptions').children[index]);
  const userMessage = element('#chatLog').children[1];
  assert.equal(userMessage.children[0].children[0].src, 'assets/learner-cutout.png');
  assert.equal(userMessage.children[1].children[0].textContent, 'あなた');
  const learner = fs.readFileSync(path.join(__dirname, '..', 'assets/learner-cutout.png'));
  assert.equal(learner.subarray(1, 4).toString(), 'PNG');
});

test('Topic changes keep the choices visible and require no restart button', () => {
  const { api, element, flush } = loadApp();
  api.startConversation('source-scene-home-cooking');
  while (!api.practice().completed) {
    const index = api.practice().options.findIndex(option => !option.action);
    api.chooseReply(index, element('#replyOptions').children[index]);
    assert(flush());
  }
  assert.equal(element('#replyOptions').hidden, false);
  assert(flush());
  assert.notEqual(api.practice().conversationId, 'source-scene-home-cooking');
  assert.equal(element('#replyOptions').children.length, 4);
  assert.equal(element('#replyOptions').hidden, false);
});
