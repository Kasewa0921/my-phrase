// Loaded by practice.test.cjs with its DOM fixture and source accessors.
module.exports = ({test, assert, fs, path, loadApp, plain, Element, conversationKey}) => {
  const load = (saved = {}, seed = 12345) => loadApp(saved, seed, true);
  const coverageKey = 'my-phrase-practice-coverage-20261025-v1';
  const scenesKey = 'my-phrase-workbook-scenes-20261025-v1';

  function advance(app, index = 0) {
    const option = app.api.practice().options[index];
    app.api.chooseReply(index, app.element('#replyOptions').children[index]);
    assert(app.flush());
    return option;
  }

  test('Live practice uses 18 new scenes, covers all 100 workbook templates and has 180 paired replies', () => {
    const app = load();
    const entries = new Map(app.api.additions().map(p => [p.number, p]));
    const covered = new Set();
    assert.equal(app.api.active().length, 18);
    assert(app.api.active().every(c => c.id.startsWith('workbook-')));
    let replyCount = 0;
    for (const scene of app.api.workbook()) {
      assert.equal(scene.turns.length, 2);
      for (const turn of scene.turns) {
        assert.equal(turn.replies.length, 5);
        assert(turn.prompt[0] && turn.prompt[1]);
        assert(new Set(turn.replies.map(r => r[0])).size === 5);
        for (const [number, text, ja, enReceipt, jaReceipt] of turn.replies) {
          const entry = entries.get(number);
          assert(entry, 'Unknown workbook phrase ' + number);
          const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const pieces = entry.en.split(/([○△]+(?:ing)?|\.{3})/g).filter(Boolean);
          const pattern = pieces.map(p => /^[○△]/.test(p) || p === '...' ? '(.+?)' : escape(p)).join('');
          assert(new RegExp('^' + pattern + '$', 'i').test(text), number + ': ' + text);
          const match = text.match(new RegExp('^' + pattern + '$', 'i'));
          const highlights = app.api.findCorePatterns(text);
          let group = 1, offset = 0;
          for (const piece of pieces) {
            const variable = /^[○△]/.test(piece) || piece === '...';
            const length = variable ? match[group++].length : piece.length;
            if (variable) assert(!highlights.some(h => offset < h.end && offset + length > h.start), number + ': slot highlighted in ' + text);
            offset += length;
          }
          assert(text && ja && enReceipt && jaReceipt);
          assert(!/[○△]|\.{3}/.test(text + ja + enReceipt));
          assert(app.api.findCorePatterns(text).length > 0, text);
          assert(text.split(/\s+/).length <= 14, text);
          assert(turn.prompt[0].split(/\s+/).length <= 18, turn.prompt[0]);
          covered.add(number);
          replyCount++;
        }
      }
    }
    assert.equal(replyCount, 180);
    assert.equal(covered.size, 100);
    assert.equal(app.api.phrases().length, 100);
  });

  test('Every new reply receives its authored response, then advances to the next beat or scene', () => {
    const app = load();
    for (const c of app.api.active()) {
      const nodes = app.api.buildSimulation(c);
      for (const [nodeId, node] of Object.entries(nodes)) {
        for (const choice of node.choices) {
          app.api.startConversation(c.id);
          app.api.practice().nodeId = nodeId;
          app.api.practice().options = [choice];
          app.api.chooseReply(0, new Element());
          assert(app.flush());
          const messages = app.element('#chatLog').children.filter(n => n.className === 'message partner');
          const receipt = messages.find(n => n.children[1].children[1].children[0].children[0].innerHTML === app.api.formatEnglish(choice.reactionEn));
          assert(receipt, c.id + '/' + nodeId + '/' + choice.text);
          assert.equal(app.api.practice().nodeId, choice.next);
          assert.equal(app.api.practice().completed, choice.next === null);
        }
      }
    }
  });

  test('Four options are workbook phrases, not recurring generic helpers, and content and positions vary', () => {
    const app = load();
    for (const c of app.api.active()) {
      for (const [id, node] of Object.entries(app.api.buildSimulation(c))) {
        app.api.setPractice({conversationId: c.id, nodeId: id});
        const sets = new Set();
        const positions = new Map();
        let previous;
        for (let run = 0; run < 80; run++) {
          const options = app.api.buildOptions(node);
          assert.equal(options.length, 4);
          assert.equal(new Set(options.map(o => o.phraseId)).size, 4);
          assert(options.every(o => o.phraseId && o.reactionEn && !o.action));
          const signature = options.map(o => o.text).sort().join('|');
          assert.notEqual(signature, previous);
          previous = signature;
          sets.add(signature);
          options.forEach((o, i) => {
            if (!positions.has(o.phraseId)) positions.set(o.phraseId, new Set());
            positions.get(o.phraseId).add(i);
          });
        }
        assert.equal(sets.size, 5);
        for (const slots of positions.values()) assert.equal(slots.size, 4);
      }
    }
  });

  test('Balanced continuous sessions expose every workbook phrase, avoid recent scenes and continue without stopping', () => {
    for (const seed of [11, 12345, 90827]) {
      const app = load({}, seed);
      app.api.init();
      const seen = new Set();
      const sceneIds = new Set();
      const recent = [];
      for (let scene = 0; scene < 60; scene++) {
        const id = app.api.practice().conversationId;
        assert(!recent.slice(-3).includes(id), id);
        recent.push(id);
        sceneIds.add(id);
        let beats = 0;
        while (!app.api.practice().completed) {
          app.api.practice().options.forEach(o => seen.add(o.phraseId));
          advance(app, Math.floor(scene / 4) % 4);
          beats++;
          assert(beats <= 2);
        }
        assert.equal(beats, 2);
        assert(app.flush());
        assert.equal(app.element('#replyOptions').children.length, 4);
        assert.equal(app.element('#replyOptions').hidden, false);
        assert(app.element('#chatLog').children.length <= 60);
      }
      assert.equal(sceneIds.size, 18);
      assert.equal(seen.size, 100, 'Missing workbook phrases with seed ' + seed);
      const counts = Object.values(app.api.coverage().shown);
      assert(Math.min(...counts) >= 2, 'Some phrases were barely shown');
      assert(Math.max(...counts) <= Math.min(...counts) * 5, 'Exposure is too uneven');
    }
  });

  test('Rarely displayed choices are prioritized and display language changes do not count as another exposure', () => {
    const first = load();
    const c = first.api.active()[0];
    const choices = first.api.buildSimulation(c).turn0.choices;
    const shown = Object.fromEntries(choices.map((o, i) => [o.phraseId, i === 0 ? 0 : 100]));
    const app = load({[coverageKey]: JSON.stringify({shown})});
    app.api.startConversation(c.id);
    assert(app.api.practice().options.some(o => o.phraseId === choices[0].phraseId));
    const before = plain(app.api.coverage());
    const order = plain(app.api.practice().options);
    app.api.setReplyLanguage('en');
    app.api.setReplyLanguage('ja');
    assert.deepEqual(plain(app.api.coverage()), before);
    assert.deepEqual(plain(app.api.practice().options), order);
    const reloaded = load(Object.fromEntries(app.storage));
    assert.deepEqual(plain(reloaded.api.coverage()), before);
  });

  test('Selecting a slot variant credits the correct workbook phrase rather than matching exact text', () => {
    const app = load();
    const c = app.api.active().find(c => c.id === 'workbook-evening-habits');
    app.api.startConversation(c.id);
    const target = app.api.nodes().turn1.choices.find(o => o.phraseId === 'excel-20261024-124');
    app.api.practice().nodeId = 'turn1';
    app.api.practice().options = [target];
    app.api.chooseReply(0, new Element());
    assert(app.flush());
    const phrase = app.api.phrases().find(p => p.id === target.phraseId);
    assert.equal(phrase.attempts, 1);
    assert.equal(phrase.status, '練習中');
    assert.equal(app.api.coverage().used[target.phraseId], 1);
    assert.notEqual(phrase.en, target.text);
  });

  test('Upgrade keeps custom conversations and phrase edits but takes old unchanged defaults out of random practice', () => {
    const old = loadApp();
    const saved = plain(old.api.conversations());
    const custom = saved.find(c => c.id === 'source-scene-home-cooking');
    custom.turns[0].partnerEn = 'My custom question?';
    old.storage.set(conversationKey, JSON.stringify(saved));
    const app = load(Object.fromEntries(old.storage));
    assert.equal(app.api.active().length, 19);
    assert(app.api.active().some(c => c.id === custom.id));
    assert(!app.api.active().some(c => c.id === 'topic-food'));
    assert.equal(app.api.phrases().length, 100);
    const removed = app.api.conversations().filter(c => c.id !== 'workbook-weekend-trip');
    app.storage.set(conversationKey, JSON.stringify(removed));
    const reloaded = load(Object.fromEntries(app.storage));
    assert(!reloaded.api.active().some(c => c.id === 'workbook-weekend-trip'));
    assert.equal(reloaded.storage.get(scenesKey), '1');
  });

  test('Invalid coverage data recovers safely and empty conversation libraries are not recreated', () => {
    for (const value of ['not json', 'null', '{"shown":{"excel-20261024-101":-1},"scenes":[]}']) {
      const app = load({[coverageKey]: value});
      app.api.init();
      assert.equal(app.element('#replyOptions').children.length, 4);
    }
    const app = load({[conversationKey]: '[]', 'my-phrase-topic-library-v1': '1'});
    assert.equal(app.api.active().length, 0);
  });

  test('Scene changes use a small divider and preserve chat history and in-bubble Japanese hints', () => {
    const app = load();
    app.api.startConversation('workbook-weekend-trip');
    const first = app.element('#chatLog').children;
    assert.equal(first[0].className, 'scene-divider');
    assert.equal(first[1].className, 'message partner');
    const line = first[1].children[1].children[1];
    line.children[1].events.click();
    assert.equal(line.children[0].children[0].attributes.lang, 'ja');
    assert(app.flush());
    assert.equal(line.children[0].children[0].attributes.lang, 'en');
    advance(app);
    advance(app);
    assert(app.flush());
    const dividers = app.element('#chatLog').children.filter(n => n.className === 'scene-divider');
    assert.equal(dividers.length, 2);
    assert.notEqual(dividers[0].textContent, dividers[1].textContent);
    assert(!app.element('#chatLog').children.some(n => n.textContent === '話題を広げています…'));
  });
};
