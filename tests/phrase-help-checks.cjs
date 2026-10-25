module.exports = ({test, assert, loadApp, plain, Element}) => {
  const load = () => loadApp({}, 12345, true);
  const controls = app => {
    const body = new Element();
    const target = new Element();
    target.textContent = 'I usually end up';
    target.isConnected = true;
    target.closest = () => target;
    body.contains = element => element === target;
    body.querySelectorAll = () => [target];
    app.api.bindPhraseHelp(body, 'I usually end up watching videos.', '結局いつも動画を見てしまう。', '');
    return {body, target, event: {target, isPrimary: true, button: 0, clientX: 20, clientY: 20, pointerType: 'touch', detail: 1}};
  };

  test('All 100 workbook phrases have meaning, usage, a similar expression and a usage distinction', () => {
    const app = load();
    for (const entry of app.api.additions()) {
      const example = entry.examples[0];
      const info = app.api.getPhraseExplanation(example.text, '', example.parts.find(p => !p.variable).text, example.ja);
      assert.equal(info.source, entry.id, example.text);
      assert(info.title && info.meaning && info.usage && info.similar.en && info.similar.ja && info.similar.note, entry.en);
      assert(!info.fallback);
      assert(!/[○△]/.test(info.meaning + info.title));
    }
  });

  test('A substituted example explains its whole reusable pattern, including either end of a split pattern', () => {
    const app = load();
    const first = app.api.getPhraseExplanation("It's not as cold as I thought.", '', "It's not as", '思っていたほど寒くない。');
    const last = app.api.getPhraseExplanation("It's not as cold as I thought.", '', 'as I thought.', '思っていたほど寒くない。');
    assert.equal(first.source, 'excel-20261024-154');
    assert.equal(last.source, first.source);
    assert(first.similar.note.includes('not as'));
    assert.equal(first.example, "It's not as cold as I thought.");
    const basic = app.api.getPhraseExplanation('I think short practice every day is better than one long lesson.', '', 'is better than', '毎日短く練習するほうがよい。');
    assert(basic.similar);
    assert.equal(basic.meaning, '〜は…よりよい');
  });

  test('Touch opens help after a 500ms hold without sending a reply or changing the conversation', () => {
    const app = load();
    app.api.init();
    const {body, target, event} = controls(app);
    const before = plain(app.api.practice());
    const coverage = plain(app.api.coverage());
    assert.equal(target.attributes.role, 'button');
    assert.equal(target.attributes.tabindex, '0');
    body.events.pointerdown(event);
    assert(app.pendingDelays().includes(500));
    assert.equal(app.element('#phraseHelp').open, false);
    assert(app.flush());
    assert.equal(app.element('#phraseHelp').open, true);
    assert.equal(app.element('#phraseHelpContent').children.length, 4);
    assert.deepEqual(plain(app.api.practice()), before);
    assert.deepEqual(plain(app.api.coverage()), coverage);
    body.events.pointerup(event);
    body.events.click(event);
    assert.equal(app.element('#phraseHelp').open, true);
    app.element('#closePhraseHelp').events.click();
    assert.equal(app.element('#phraseHelp').open, false);
    assert(target.focused);
  });

  test('Short taps, vertical scrolling, cancellation and detached message targets do not open help', () => {
    for (const cancellation of ['pointerup', 'pointercancel', 'pointerleave', 'focusout', 'scroll', 'detached']) {
      const app = load();
      const {body, target, event} = controls(app);
      body.events.pointerdown(event);
      if (cancellation === 'scroll') body.events.pointermove({...event, clientY: 45});
      else if (cancellation === 'detached') target.isConnected = false;
      else body.events[cancellation](event);
      app.flush();
      body.events.click(event);
      assert.equal(app.element('#phraseHelp').open, false, cancellation);
    }
  });

  test('Mouse click, Enter and Space can open the same help panel', () => {
    for (const mode of ['mouse', 'Enter', ' ']) {
      const app = load();
      const {body, event} = controls(app);
      if (mode === 'mouse') body.events.click({...event, pointerType: 'mouse'});
      else body.events.keydown({...event, key: mode, preventDefault() {}});
      assert.equal(app.element('#phraseHelp').open, true, mode);
    }
  });

  test('A release from the opening long press does not close the dialog; a real backdrop click does', () => {
    const app = load();
    app.api.init();
    const {body, event} = controls(app);
    const dialog = app.element('#phraseHelp');
    body.events.pointerdown(event);
    app.flush();
    dialog.events.click({target: dialog});
    assert(dialog.open);
    dialog.events.pointerdown({target: dialog});
    dialog.events.click({target: dialog});
    assert(!dialog.open);
  });

  test('Help content uses text nodes, so user-supplied English cannot inject markup', () => {
    const app = load();
    const text = 'I keep <img src=x onerror=alert(1)>.';
    const info = app.api.getPhraseExplanation(text, '', 'I keep', '<script>bad</script>');
    app.api.openPhraseHelp(info, new Element());
    const sections = app.element('#phraseHelpContent').children;
    assert.equal(sections[2].children[1].textContent, text);
    assert.equal(sections[2].children[2].textContent, '<script>bad</script>');
    assert(!sections[2].children[1].innerHTML);
  });

  test('Standalone punctuation is not focusable and does not open an explanation', () => {
    const app = load();
    const body = new Element();
    const dot = new Element();
    dot.textContent = '.';
    dot.closest = () => dot;
    body.contains = target => target === dot;
    body.querySelectorAll = () => [dot];
    app.api.bindPhraseHelp(body, "It's getting colder.", '寒くなってきた。', '');
    assert(!dot.attributes.role);
    body.events.click({target: dot, pointerType: 'mouse'});
    assert.equal(app.element('#phraseHelp').open, false);
  });
};
