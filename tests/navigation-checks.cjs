module.exports=({test,assert,loadApp,plain})=>{
  test('Menu opens and closes, restores focus, and exposes the three real app views',()=>{
    const app=loadApp({},12345,true);app.api.init();
    app.element('#menuButton').events.click();
    assert.equal(app.element('#appMenu').open,true);
    assert.equal(app.element('#menuButton').attributes['aria-expanded'],'true');
    app.element('#closeMenuButton').events.click();
    assert.equal(app.element('#appMenu').open,false);
    assert.equal(app.element('#menuButton').attributes['aria-expanded'],'false');
    assert(app.element('#menuButton').focused);
    assert.deepEqual(app.menuItems.map(b=>b.dataset.view),['learnView','quizView','phrasesView']);
  });
  test('Training is lazy loaded and switching views or opening the menu suspends its host activity',()=>{
    const app=loadApp({},12345,true);app.api.init();
    assert.equal(app.element('#quizFrame').getAttribute('src'),null);
    app.menuItems[1].events.click();
    assert.equal(app.element('#quizFrame').getAttribute('src'),'timed-quiz.html');
    assert(app.body.classList.contains('quiz-mode'));
    assert(!app.body.classList.contains('practice-mode'));
    assert.equal(app.element('#pageHeader').hidden,true);
    assert.equal(app.element('#activeFeature').textContent,'4択トレーニング');
    assert.equal(app.menuItems[1].attributes['aria-current'],'page');
    assert.deepEqual(app.quizMessages.at(-1),{data:{type:'my-phrase:quiz-activity',active:true},origin:'https://example.test'});
    app.api.openAppMenu();assert.equal(app.quizMessages.at(-1).data.active,false);
    app.api.closeAppMenu();assert.equal(app.quizMessages.at(-1).data.active,true);
    app.api.setView('phrasesView');assert.equal(app.quizMessages.at(-1).data.active,false);
    assert.equal(app.menuItems[1].attributes['aria-current'],undefined);
    assert.equal(app.menuItems[2].attributes['aria-current'],'page');
    app.api.setView('quizView');app.element('#quizFrame').events.load();
    assert.equal(app.quizMessages.at(-1).data.active,true);
  });
  test('Menu navigation preserves the current conversation and existing phrase records',()=>{
    const app=loadApp({},12345,true);app.api.init();
    const practice=plain(app.api.practice()),phrases=plain(app.api.phrases());
    app.api.setView('quizView');app.api.setView('phrasesView');app.api.setView('learnView');
    assert.deepEqual(plain(app.api.practice()),practice);
    assert.deepEqual(plain(app.api.phrases()),phrases);
    assert(app.body.classList.contains('practice-mode'));
    assert(!app.body.classList.contains('quiz-mode'));
    app.api.openAppMenu();app.element('#menuAddPhraseBtn').events.click();
    assert.equal(app.api.activeView(),'detailView');
    assert.equal(app.element('#appMenu').open,false);
    app.api.openAppMenu();app.element('#quickAddBtn').events.click();
    assert.equal(app.api.activeView(),'conversationView');
    assert.equal(app.element('#appMenu').open,false);
  });
};
