// Every reply belongs to a numbered workbook phrase and has an authored teacher response.
// Reply tuples: workbook number, English, Japanese, teacher English, teacher Japanese.
globalThis.WORKBOOK_SCENES = [
  {
    id: 'weekend-trip', title: '先生の小旅行',
    turns: [
      { prompt: ['I went to Kyoto last weekend.', '先週末、京都に行ったよ。'], replies: [
        [101, 'Tell me more about it.', 'もっと詳しく聞かせて。', 'I visited two temples and a small cafe.', 'お寺を二つと小さなカフェに行ったよ。'],
        [104, 'What was the best part?', '一番よかったのは？', 'Walking by the river was my favorite part.', '川沿いを歩いたのが一番よかった。'],
        [105, 'Who did you go with?', '誰と行ったの？', 'I went with my wife.', '妻と行ったよ。'],
        [106, 'How long did you stay?', 'どのくらい滞在したの？', 'We stayed for two nights.', '2泊したよ。'],
        [110, 'Would you recommend it?', 'おすすめする？', 'Yes. It is a nice place for a short trip.', 'うん。短い旅行にいい場所だよ。']
      ]},
      { prompt: ['How was your last trip?', 'あなたの前回の旅行はどうだった？'], replies: [
        [133, 'It was better than I thought.', '思っていたよりよかった。', 'What a nice surprise.', 'それはうれしいね。'],
        [136, 'I had a great time.', 'すごく楽しかった。', 'That is good to hear.', 'それはよかった。'],
        [134, 'I was disappointed.', 'がっかりした。', 'Oh, I am sorry it was not a good trip.', 'そうか、残念な旅行だったんだね。'],
        [177, 'What surprised me was the price.', '驚いたのは値段だった。', 'Travel can cost a lot.', '旅行はお金がかかることもあるね。'],
        [132, "It didn't go as planned.", '予定どおりにはいかなかった。', 'Oh, travel plans can change.', 'そうか、旅行の予定は変わることもあるね。']
      ]}
    ]
  },
  {
    id: 'bread-hobby', title: '新しい趣味',
    turns: [
      { prompt: ['I have started making bread at home.', '家でパン作りを始めたよ。'], replies: [
        [107, 'When did you start?', 'いつ始めたの？', 'About a month ago.', '1か月くらい前だよ。'],
        [108, 'How often do you do that?', 'どのくらいの頻度でやるの？', 'I make bread every Sunday.', '毎週日曜日に作っているよ。'],
        [109, 'What made you decide to try it?', 'どうしてやってみようと思ったの？', 'My friend made some for me. It was so good.', '友達が作ってくれてね。とてもおいしかったんだ。'],
        [103, 'How come?', 'どうして？', 'I wanted a hobby I could do at home.', '家でできる趣味が欲しかったんだ。'],
        [101, 'Tell me more about it.', 'もっと詳しく聞かせて。', 'I use flour, water, salt, and yeast.', '小麦粉、水、塩、イーストを使うよ。']
      ]},
      { prompt: ['Would you like to try making bread?', 'パン作りをやってみたい？'], replies: [
        [120, "I've never made bread before.", '今までパンを作ったことがない。', 'You could start with a simple recipe.', '簡単なレシピから始めるといいよ。'],
        [167, "I'll give it a try.", '試しにやってみる。', 'I can send you my recipe.', '私のレシピを送れるよ。'],
        [161, "I haven't decided yet.", 'まだ決めていない。', 'You can think about it.', '考えてみればいいよ。'],
        [146, "I'd rather buy some bread.", 'どちらかというと買いたい。', 'That is easier, of course.', 'もちろん、そのほうが簡単だね。'],
        [168, "I'll see how it goes.", '様子を見てみる。', 'Sure. There is no rush.', 'うん、急がなくていいよ。']
      ]}
    ]
  },
  {
    id: 'busy-morning', title: '朝の出来事',
    turns: [
      { prompt: ['How was your morning?', '今朝はどうだった？'], replies: [
        [112, 'I almost missed my train.', '危うく電車に乗り遅れるところだった。', 'Good thing you caught it.', '間に合ってよかったね。'],
        [115, 'I forgot to set my alarm.', '目覚ましをかけるのを忘れた。', 'Oh, that can make mornings hard.', 'それは朝が大変になるね。'],
        [117, 'I had to leave early.', '早く出なければならなかった。', 'That sounds like an early start.', '早い朝だったんだね。'],
        [118, 'I was about to leave when it started raining.', '出かけようとしたら雨が降ってきた。', 'That was bad timing.', 'タイミングが悪かったね。'],
        [119, 'I happened to see my friend.', 'たまたま友達に会った。', 'What a nice way to start the day.', 'いい一日の始まりだね。']
      ]},
      { prompt: ['What did you do after you got to work?', '仕事に着いてから何をした？'], replies: [
        [114, 'I managed to finish my work early.', 'なんとか仕事を早く終えられた。', 'That must have felt good.', '気持ちがよかっただろうね。'],
        [113, 'I accidentally deleted a file.', 'うっかりファイルを削除してしまった。', 'Oh no. I hope you had a copy.', 'あらら。コピーがあるといいね。'],
        [116, 'I decided to take a short break.', '少し休憩することにした。', 'A short break can help.', '少し休むのもいいね。'],
        [129, 'I keep forgetting names.', '何度も名前を忘れてしまう。', 'Names can be hard to remember.', '名前を覚えるのは難しいこともあるね。'],
        [135, 'I was relieved.', 'ほっとした。', 'It is nice to have a quiet moment.', '一息つけるといいね。']
      ]}
    ]
  },
  {
    id: 'evening-habits', title: '家での過ごし方',
    turns: [
      { prompt: ['How do you usually spend your evenings?', '普段、夜はどう過ごす？'], replies: [
        [121, 'I tend to stay up late.', '夜更かししがち。', 'It can be hard to go to bed early.', '早く寝るのは難しいこともあるね。'],
        [122, 'I usually end up watching videos.', '結局いつも動画を見てしまう。', 'It is easy to watch one more.', 'ついもう一本見てしまうね。'],
        [130, 'I spend a lot of time drawing.', '絵を描くことにかなり時間を使っている。', 'That sounds like a nice hobby.', 'いい趣味だね。'],
        [126, 'I rarely go out at night.', '夜はめったに出かけない。', 'A quiet evening at home can be nice.', '家で静かに過ごす夜もいいね。'],
        [111, 'I used to play games every night.', '以前は毎晩ゲームをしていた。', 'So your evenings are different now.', '今は夜の過ごし方が違うんだね。']
      ]},
      { prompt: ['Have you changed any habits lately?', '最近変えた習慣はある？'], replies: [
        [123, "I'm trying to eat healthier.", 'もっと健康的に食べようとしている。', 'Small changes are a good start.', '少しずつ変えるのもいいね。'],
        [124, "I'm getting used to going to bed early.", '早く寝ることに慣れてきた。', 'That sounds good for your mornings.', '朝も楽になりそうだね。'],
        [125, "I'm not used to waking up early.", '早起きには慣れていない。', 'It can take some time.', '時間がかかることもあるね。'],
        [127, "I've started learning English.", '英語を学び始めた。', 'It is good to practice a little each day.', '毎日少しずつ練習するといいね。'],
        [128, "I've stopped drinking soda.", '炭酸飲料を飲むのをやめた。', 'That is quite a change.', 'けっこう大きな変化だね。']
      ]}
    ]
  },
  {
    id: 'work-event', title: '仕事のイベント',
    turns: [
      { prompt: ['How was the event at work?', '仕事のイベントはどうだった？'], replies: [
        [131, 'It turned out great.', '結果的にすごくよかった。', 'I am glad it went well.', 'うまくいってよかった。'],
        [132, "It didn't go as planned.", '予定どおりにはいかなかった。', 'Oh, some days are like that.', 'そういう日もあるね。'],
        [134, 'I was disappointed.', 'がっかりした。', 'I am sorry it was not what you hoped.', '期待どおりではなかったんだね。'],
        [135, 'I was relieved.', 'ほっとした。', 'It is nice to have it done.', '終わるとほっとするね。'],
        [140, 'It caught me off guard.', '不意を突かれた。', 'Sounds like you were not ready for it.', '予想していなかったんだね。']
      ]},
      { prompt: ['How do you feel about the work your team did?', 'チームの仕事をどう思う？'], replies: [
        [137, "I'm proud of what we made.", '自分たちが作ったものを誇りに思う。', 'You put a lot of work into it.', 'たくさん頑張ったんだね。'],
        [138, "I'm happy with the result.", '結果に満足している。', 'That is a good feeling.', 'それはうれしいね。'],
        [139, "I'm not happy with the result.", '結果に満足していない。', 'There may be something to change next time.', '次に変えられるところがあるかもしれないね。'],
        [143, 'To be fair, we had very little time.', '公平に言うと、時間がほとんどなかった。', 'That does make the job harder.', 'それだと難しくなるよね。'],
        [157, "I'm still working on the report.", '報告書はまだ取り組んでいる途中。', 'So there is a little more to do.', 'まだ少し仕事が残っているんだね。']
      ]}
    ]
  },
  {
    id: 'movie-choice', title: '映画を選ぶ',
    turns: [
      { prompt: ['Shall we watch a movie or stay home?', '映画を観に行く？それとも家にいる？'], replies: [
        [146, "I'd rather stay home.", 'どちらかというと家にいたい。', 'Sure. We can watch something here.', 'うん。ここで何か観よう。'],
        [148, "I'm okay with either option.", 'どちらでも問題ない。', 'Then let us check what is showing.', 'それなら上映中の映画を調べよう。'],
        [150, "It's up to you.", 'あなたに任せるよ。', 'Let us stay home tonight.', '今夜は家にいよう。'],
        [161, "I haven't decided yet.", 'まだ決めていない。', 'Take a moment to think.', '少し考えてみて。'],
        [165, 'I changed my mind.', '考えが変わった。', 'That is fine. We do not have to go out.', 'いいよ。出かけなくても大丈夫。']
      ]},
      { prompt: ['I think a comedy would be fun tonight.', '今夜はコメディーが楽しそうだと思う。'], replies: [
        [144, 'I agree with you.', '賛成。', 'Great. Let us find one.', 'いいね。一つ探そう。'],
        [145, 'I see your point.', '言いたいことはわかる。', 'I could use a good laugh.', '思いきり笑いたい気分なんだ。'],
        [149, "I'm not a fan of horror movies.", 'ホラー映画はあまり好みじゃない。', 'Then a comedy sounds like a better choice.', 'それならコメディーのほうがよさそうだね。'],
        [141, 'I guess a comedy would be nice.', 'たぶんコメディーがよさそう。', 'We can look for a short one.', '短いものを探そう。'],
        [147, "I don't mind watching a comedy.", 'コメディーを観るのは構わない。', 'Okay. Let us try one.', 'わかった。一つ観てみよう。']
      ]}
    ]
  },
  {
    id: 'new-game', title: '新しいゲーム',
    turns: [
      { prompt: ['What is the new game like?', '新しいゲームはどんな感じ？'], replies: [
        [151, 'This game is easier than the old one.', 'このゲームは前のものより簡単。', 'That should make it easy to start.', 'それなら始めやすそうだね。'],
        [152, 'This game is similar to chess.', 'このゲームはチェスに似ている。', 'Oh, I know how to play chess.', 'ああ、チェスならできるよ。'],
        [153, 'This game is different from the old one.', 'このゲームは前のものと違う。', 'So there is something new to learn.', '新しく覚えることがあるんだね。'],
        [154, "It's not as hard as I thought.", '思っていたほど難しくない。', 'That is good to know.', 'それを聞いて安心した。'],
        [133, 'It was better than I thought.', '思っていたよりよかった。', 'Sounds like it was a good choice.', 'いいものを選べたみたいだね。']
      ]},
      { prompt: ['Do you think practice helps with this game?', 'このゲームは練習すると上達すると思う？'], replies: [
        [156, "I'm getting better at it.", 'だんだん上達してきた。', 'Your practice is helping.', '練習が役立っているね。'],
        [158, 'It makes a big difference.', 'それで大きく変わる。', 'A little practice each day can help.', '毎日少しずつ練習するといいね。'],
        [160, 'The more practice, the better.', '練習は多いほどいい。', 'Yes, as long as you enjoy it.', 'うん、楽しみながらならいいね。'],
        [159, "It's not worth spending hours on it.", '何時間もかける価値はない。', 'Sure. It should still be fun.', 'そうだね。楽しめることが大切だね。'],
        [166, "I'll figure it out.", 'なんとか考えるよ。', 'You can take it one step at a time.', '一歩ずつやればいいよ。']
      ]}
    ]
  },
  {
    id: 'park-weather', title: '公園へ行く相談',
    turns: [
      { prompt: ['Would today be a good day for the park?', '今日は公園に行くのによさそう？'], replies: [
        [155, "It's getting colder.", 'だんだん寒くなってきた。', 'Then we should wear warm jackets.', 'それなら暖かい上着が必要だね。'],
        [142, 'As far as I know, it is open today.', '私の知る限り、今日は開いている。', 'Good. We can check the weather too.', 'よかった。天気も確認しよう。'],
        [176, "The bad news is it's raining.", '悪い知らせは、雨が降っていること。', 'Then we can go another day.', 'それなら別の日に行こう。'],
        [141, 'I guess it will be sunny later.', 'たぶんあとで晴れると思う。', 'We can check again after lunch.', '昼食のあとにもう一度確認しよう。'],
        [154, "It's not as cold as I thought.", '思っていたほど寒くない。', 'A short walk might be nice.', '短い散歩ならよさそうだね。']
      ]},
      { prompt: ['We could walk there or take the bus.', '歩いて行っても、バスで行ってもいいよ。'], replies: [
        [147, "I don't mind walking.", '歩くのは構わない。', 'Great. It is about twenty minutes.', 'いいね。20分くらいだよ。'],
        [148, "I'm okay with taking the bus.", 'バスで行くので問題ない。', 'The stop is right over there.', 'バス停はすぐそこだよ。'],
        [169, "I'd better get my jacket.", '上着を取ってきたほうがよさそう。', 'Good idea. I will wait here.', 'いい考えだね。ここで待つよ。'],
        [150, "It's up to you.", 'あなたに任せるよ。', 'Let us walk if it stays dry.', '雨が降らなければ歩こう。'],
        [146, "I'd rather take the bus.", 'どちらかというとバスで行きたい。', 'Sure. The next one comes soon.', 'うん。もうすぐ次のバスが来るよ。']
      ]}
    ]
  },
  {
    id: 'weekend-plans', title: '週末の予定',
    turns: [
      { prompt: ['Do you have any plans for the weekend?', '週末は何か予定がある？'], replies: [
        [162, "I'm planning on visiting my parents.", '両親を訪ねる計画を立てている。', 'That sounds like a nice visit.', 'いい時間になりそうだね。'],
        [163, "I'm supposed to meet a friend.", '友達と会うことになっている。', 'I hope you have a good time.', '楽しい時間になるといいね。'],
        [161, "I haven't decided yet.", 'まだ決めていない。', 'A free weekend can be nice too.', '自由な週末もいいね。'],
        [164, "I'm considering a day trip.", '日帰り旅行を検討している。', 'There are some nice places nearby.', '近くにもいい場所があるよ。'],
        [170, "I can't wait to see my family.", '家族に会うのが待ちきれない。', 'Sounds like you miss them.', '家族に会いたいんだね。']
      ]},
      { prompt: ['Would you like to make a plan for next week?', '来週の予定を立ててみる？'], replies: [
        [165, 'I changed my mind.', '考えが変わった。', 'That is okay. We can leave it for now.', '大丈夫。今は決めなくてもいいよ。'],
        [168, "I'll see how it goes.", '様子を見てみる。', 'Sure. We can talk about it later.', 'うん。またあとで相談しよう。'],
        [167, "I'll give it a try.", '試しにやってみる。', 'Let us start with one simple plan.', '簡単な予定を一つ考えよう。'],
        [191, 'That works for me.', 'それで都合がいいよ。', 'Great. Let us look at our calendars.', 'いいね。予定表を見よう。'],
        [166, "I'll figure it out.", 'なんとか考えるよ。', 'Let me know when you have an idea.', '何か思いついたら教えて。']
      ]}
    ]
  },
  {
    id: 'small-project', title: '作っているもの',
    turns: [
      { prompt: ['How is your project going?', '作っているものはどう？'], replies: [
        [157, "I'm still working on the design.", 'デザインはまだ取り組んでいる途中。', 'It is fine to take your time with it.', '時間をかけても大丈夫だよ。'],
        [175, 'The good news is we finished early.', 'いい知らせは、早く終わったこと。', 'That leaves you some free time.', '自由な時間ができるね。'],
        [137, "I'm proud of what we made.", '自分たちが作ったものを誇りに思う。', 'You worked hard on it.', '頑張ったんだね。'],
        [138, "I'm happy with the design.", 'デザインに満足している。', 'That is a nice feeling.', 'それはうれしいね。'],
        [139, "I'm not happy with the colors.", '色に満足していない。', 'You could try a few different colors.', 'いくつか違う色を試すのもいいね。']
      ]},
      { prompt: ['I find practice and good tools helpful.', '私は練習と使いやすい道具が役立つと思う。'], replies: [
        [151, 'This app is easier than the old one.', 'このアプリは以前のものより使いやすい。', 'Good tools can save time.', '使いやすい道具は時間の節約になるね。'],
        [156, "I'm getting better at drawing.", '絵を描くのが上達してきた。', 'You are learning a lot.', 'たくさん身についているね。'],
        [160, 'The more practice, the better.', '練習は多いほどいい。', 'Little by little, you learn more.', '少しずつ身につくね。'],
        [158, 'It makes a big difference.', 'それで大きく変わる。', 'It sounds like you found something useful.', '役立つものが見つかったんだね。'],
        [130, 'I spend a lot of time trying new ideas.', '新しいアイデアを試すことに時間を使っている。', 'That is a good way to learn.', 'いい学び方だね。']
      ]}
    ]
  },
  {
    id: 'weekend-story', title: '週末の出来事を話す',
    turns: [
      { prompt: ['You played games last weekend. Any other news?', '週末はゲームをしたんだね。ほかにも何かあった？'], replies: [
        [171, 'Speaking of games, I made a new one.', 'ゲームといえば、新しいものを一つ作った。', 'Oh, I would like to hear about it.', 'へえ、その話を聞きたいな。'],
        [172, 'That reminds me, I got a new job.', 'それで思い出したんだけど、新しい仕事が決まった。', 'Congratulations! I hope you enjoy it.', 'おめでとう。楽しく働けるといいね。'],
        [173, 'Anyway, I had a good weekend.', 'とにかく、いい週末だった。', 'I am glad you enjoyed it.', '楽しめたならよかった。'],
        [174, 'To make a long story short, we won.', '手短に言うと、私たちが勝った。', 'You won your game? Well done.', '試合に勝ったんだね。おめでとう。'],
        [180, 'Long story short, I got the job.', '要するに、その仕事に採用された。', 'Congratulations! That is great news.', 'おめでとう。それはうれしい知らせだね。']
      ]},
      { prompt: ['What else would you like to tell me?', 'ほかに話したいことはある？'], replies: [
        [175, 'The good news is I have a day off.', 'いい知らせは、休みが取れたこと。', 'I hope you get some rest.', 'ゆっくり休めるといいね。'],
        [176, 'The bad news is my train was late.', '悪い知らせは、電車が遅れたこと。', 'Oh, that can be stressful.', 'それは大変だったね。'],
        [177, 'What surprised me was the price.', '驚いたのは値段だった。', 'Prices can be a surprise these days.', '最近は値段に驚くこともあるね。'],
        [179, 'Not only that, I met an old friend.', 'それだけじゃなく、昔の友達にも会った。', 'That must have been nice.', 'それはうれしかっただろうね。'],
        [136, 'I had a great time.', 'すごく楽しかった。', 'It sounds like a good weekend.', 'いい週末だったんだね。']
      ]}
    ]
  },
  {
    id: 'late-work', title: '遅くなった仕事',
    turns: [
      { prompt: ['I worked all weekend. I am very tired.', '週末ずっと働いていた。とても疲れたよ。'], replies: [
        [197, 'That sounds tough.', 'それは大変そうだね。', 'Thanks. I will rest this evening.', 'ありがとう。今夜は休むよ。'],
        [103, 'How come?', 'どうして？', 'We had to finish a big job by Monday.', '月曜日までに大きな仕事を終える必要があったんだ。'],
        [102, 'What happened next?', 'そのあとどうなったの？', 'We finished on Sunday night. Then I went home.', '日曜の夜に終わった。それから帰ったよ。'],
        [101, 'Tell me more about it.', 'もっと詳しく聞かせて。', 'We had a lot to do and only a few people.', '仕事がたくさんあって、人が少なかったんだ。'],
        [104, 'What was the best part?', '一番よかったのは？', 'Finishing it with my team felt good.', 'チームで終わらせたときはうれしかったよ。']
      ]},
      { prompt: ['You said you were busy too. Why was that?', 'あなたも忙しかったと言っていたね。どうして？'], replies: [
        [178, "That's because I had a lot of work.", '仕事がたくさんあったから。', 'I hope this week is easier for you.', '今週は楽になるといいね。'],
        [117, 'I had to help my family.', '家族を手伝わなければならなかった。', 'That was kind of you.', '家族思いだね。'],
        [114, 'I managed to finish everything.', 'なんとか全部終えることができた。', 'Good. Now you can take a break.', 'よかった。これで休めるね。'],
        [143, 'To be fair, I started too late.', '公平に言うと、始めるのが遅すぎた。', 'It happens. You can start earlier next time.', 'そういうこともあるよ。次は早めに始めよう。'],
        [116, 'I decided to clean my room.', '部屋を片付けることにした。', 'That can take a long time.', 'けっこう時間がかかることもあるね。']
      ]}
    ]
  },
  {
    id: 'english-lesson', title: '英語のレッスン',
    turns: [
      { prompt: ["Today, let's practice 'book a table'.", '今日はbook a tableを練習しよう。'], replies: [
        [183, 'Could you give me an example?', '例を挙げてもらえる？', "Sure. 'I would like to book a table for two.'", 'もちろん。「2人分の席を予約したいです」だよ。'],
        [185, 'Is there a simpler way to say it?', 'もっと簡単な言い方はある？', "Try 'Can I book a table?'", 'Can I book a table?と言ってみよう。'],
        [188, "I'm not following.", '話についていけていない。', "Here, 'book' means to reserve a seat or a table.", 'ここでのbookは、席を予約するという意味だよ。'],
        [189, 'Could you write that down?', 'それを書いてもらえる？', "Of course: 'book a table'.", 'もちろん。book a tableだよ。'],
        [186, "What's the difference between book and reserve?", 'bookとreserveは何が違う？', 'For a restaurant table, they mean the same thing.', 'レストランの席なら同じ意味だよ。']
      ]},
      { prompt: ["Try saying, 'I booked a table for Tuesday'.", 'I booked a table for Tuesdayと言ってみよう。'], replies: [
        [181, 'Did you mean next Tuesday?', '来週の火曜日という意味？', 'Yes, next Tuesday.', 'そう、来週の火曜日だよ。'],
        [182, 'Do you mean I have a booking?', '予約があるということ？', 'Yes. The restaurant has a table ready for you.', 'そう。レストランに席を予約してあるということ。'],
        [184, 'Does that sound natural?', 'それって自然な言い方？', 'Yes, it is a natural way to say it.', 'うん、自然な言い方だよ。'],
        [187, "I'm trying to say I need a table.", '席が必要だと言おうとしている。', "Then you can ask, 'Do you have a table for two?'", 'それなら「2人座れる席はありますか？」と聞けるよ。'],
        [190, 'Let me try again.', 'もう一度言ってみるね。', "Sure. Say it slowly: 'I booked a table.'", 'いいよ。ゆっくりI booked a tableと言ってみよう。']
      ]}
    ]
  },
  {
    id: 'meeting-at-station', title: '駅で待ち合わせ',
    turns: [
      { prompt: ['Shall we meet at the station at six?', '6時に駅で会おうか？'], replies: [
        [191, 'That works for me.', 'それで都合がいいよ。', 'Great. I will be by the main entrance.', 'いいね。正面入口にいるよ。'],
        [192, "I'm on my way.", '今向かっているよ。', 'Okay. I will wait by the entrance.', 'わかった。入口で待つよ。'],
        [193, "I'm running late.", '遅れそう。', 'No problem. Send me a message when you arrive.', '大丈夫。着いたらメッセージして。'],
        [163, "I'm supposed to finish work at six.", '6時に仕事が終わることになっている。', 'Then we can meet a little later.', 'それなら少しあとに会おう。'],
        [169, "I'd better leave now.", '今出たほうがよさそう。', 'Take care on the way.', '気をつけて来てね。']
      ]},
      { prompt: ['Sorry, I need a few more minutes to get ready.', 'ごめん、準備にあと数分かかる。'], replies: [
        [194, 'Take your time.', 'ゆっくりでいいよ。', 'Thanks. I will be ready soon.', 'ありがとう。もうすぐ準備できるよ。'],
        [195, "It's no big deal.", 'たいしたことじゃないよ。', 'Thanks for being so kind.', '気にしないでくれてありがとう。'],
        [147, "I don't mind waiting.", '待つのは構わない。', 'Thank you. I will hurry.', 'ありがとう。急ぐね。'],
        [148, "I'm okay with meeting later.", 'あとで会うので問題ない。', 'Thanks. That helps.', 'ありがとう。助かるよ。'],
        [150, "It's up to you.", 'あなたに任せるよ。', 'Let us meet ten minutes later, then.', 'それなら10分あとに会おう。']
      ]}
    ]
  },
  {
    id: 'friend-news', title: '先生のうれしい知らせ',
    turns: [
      { prompt: ['I visited a school and got a job there!', '学校を見学して、そこでの仕事が決まったよ。'], replies: [
        [198, "I'm happy for you.", '自分のことのようにうれしいよ。', 'Thank you. I am really excited.', 'ありがとう。とても楽しみなんだ。'],
        [104, 'What was the best part?', '一番よかったのは？', 'The teachers were very friendly when I visited.', '見学したとき、先生たちがとても親切だったよ。'],
        [109, 'What made you decide to work there?', 'どうしてそこで働こうと思ったの？', 'It is near my home, and I like the school.', '家に近いし、学校も気に入ったんだ。'],
        [101, 'Tell me more about it.', 'もっと詳しく聞かせて。', 'I will teach small groups in the mornings.', '午前中に少人数のクラスを教えるよ。'],
        [105, 'Who did you go with?', '誰と行ったの？', 'I went to visit with another teacher.', '別の先生と一緒に見学に行ったよ。']
      ]},
      { prompt: ['I will tell you how my first week goes.', '最初の1週間がどうだったか知らせるね。'], replies: [
        [200, 'Keep me posted.', '進展があったら教えて。', 'I will. I start on Monday.', 'そうするよ。月曜日からなんだ。'],
        [199, "Let's catch up soon.", '近いうちにゆっくり話そう。', 'Yes. Let us talk next week.', 'うん。来週また話そう。'],
        [196, 'I appreciate it.', 'ありがたいよ。', 'It will be nice to share the news with you.', 'あなたに報告できるのはうれしいよ。'],
        [170, "I can't wait to hear about it.", 'その話を聞くのが待ちきれない。', 'I hope I will have some good stories.', 'いい話ができるといいな。'],
        [194, 'Take your time.', 'ゆっくりでいいよ。', 'Thanks. I will tell you when things settle down.', 'ありがとう。落ち着いたら話すね。']
      ]}
    ]
  },
  {
    id: 'trying-a-cafe', title: '新しいカフェ',
    turns: [
      { prompt: ['I tried the new cafe by the station.', '駅のそばの新しいカフェに行ってみたよ。'], replies: [
        [110, 'Would you recommend it?', 'おすすめする？', 'Yes. The coffee was good and not too expensive.', 'うん。コーヒーがおいしくて、高すぎなかったよ。'],
        [106, 'How long did you stay?', 'どのくらい滞在したの？', 'About an hour. I read a book there.', '1時間くらい。本を読んでいたよ。'],
        [105, 'Who did you go with?', '誰と行ったの？', 'I went on my own this time.', '今回は一人で行ったよ。'],
        [104, 'What was the best part?', '一番よかったのは？', 'The window seat was very comfortable.', '窓際の席がとても居心地よかったよ。'],
        [142, 'As far as I know, it is open late.', '私の知る限り、遅くまで開いている。', 'Yes, it closes at nine.', 'うん。9時までだよ。']
      ]},
      { prompt: ['Would you like to try it this week?', '今週行ってみたい？'], replies: [
        [126, 'I rarely eat out.', 'めったに外食しない。', 'You could just have a cup of coffee.', 'コーヒーだけでもいいんだよ。'],
        [149, "I'm not a fan of busy cafes.", '混んでいるカフェはあまり好みじゃない。', 'It was quiet when I went in the morning.', '朝に行ったときは静かだったよ。'],
        [159, "It's not worth waiting in line.", '並んで待つ価値はない。', 'We can go when it is not busy.', '混んでいないときに行けばいいね。'],
        [164, "I'm considering going on Friday.", '金曜日に行くことを考えている。', 'Friday morning might be a good time.', '金曜日の朝ならいいかもしれないね。'],
        [120, "I've never been there before.", 'まだ行ったことがない。', 'I can show you where it is.', '場所を教えられるよ。']
      ]}
    ]
  },
  {
    id: 'learning-progress', title: '英語の勉強の近況',
    turns: [
      { prompt: ['How is your English practice going?', '英語の練習はどう？'], replies: [
        [127, "I've started listening to short stories.", '短い話を聞き始めた。', 'That is a good way to practice listening.', 'リスニングのいい練習になるね。'],
        [156, "I'm getting better at listening.", '聞き取りが上達してきた。', 'It is nice to notice a change.', '変化を感じられるとうれしいね。'],
        [124, "I'm getting used to speaking English.", '英語を話すことに慣れてきた。', 'Little by little, it feels easier.', '少しずつ楽になるね。'],
        [125, "I'm not used to speaking every day.", '毎日話すことには慣れていない。', 'Even a few minutes is a good start.', '数分だけでもいいスタートだよ。'],
        [129, 'I keep forgetting new words.', '新しい単語を何度も忘れてしまう。', 'That happens. You can meet them again in a story.', 'そういうものだよ。話の中でまた出会えるよ。']
      ]},
      { prompt: ['I think short practice every day is better than one long lesson.', '長いレッスンを1回するより、毎日短く練習するのがいいと思う。'], replies: [
        [144, 'I agree with you.', '賛成。', 'It is easier to make it a habit.', '習慣にしやすいよね。'],
        [145, 'I see your point.', '言いたいことはわかる。', 'It does not have to take much time.', 'たくさん時間をかけなくてもいいんだ。'],
        [123, "I'm trying to practice every day.", '毎日練習しようとしている。', 'That is a good goal.', 'いい目標だね。'],
        [122, 'I usually end up studying at night.', '結局いつも夜に勉強している。', 'Find a time that works for you.', '自分に合う時間を見つけよう。'],
        [121, 'I tend to forget when I am busy.', '忙しいと忘れがち。', 'A small reminder might help.', '小さなリマインダーが役立つかもしれないね。']
      ]}
    ]
  },
  {
    id: 'moving-home', title: '引っ越しの話',
    turns: [
      { prompt: ['How is your new place?', '新しい住まいはどう？'], replies: [
        [153, 'My new place is different from the old one.', '新しい住まいは以前の住まいと違う。', 'It takes time to get used to a new home.', '新しい家に慣れるには時間がかかるね。'],
        [154, "It's not as small as I thought.", '思っていたほど狭くない。', 'That is a nice surprise.', 'それはうれしいね。'],
        [138, "I'm happy with the kitchen.", '台所に満足している。', 'A good kitchen makes cooking easier.', '使いやすい台所だと料理しやすいね。'],
        [139, "I'm not happy with the noise.", '騒音に満足していない。', 'Oh, I hope it gets quieter.', 'そうか。静かになるといいね。'],
        [177, 'What surprised me was the size.', '驚いたのは広さだった。', 'It can be hard to tell from photos.', '写真ではわかりにくいこともあるね。']
      ]},
      { prompt: ['Do you still have things to do after the move?', '引っ越しのあと、まだやることはある？'], replies: [
        [115, 'I forgot to change my address.', '住所変更を忘れた。', 'You can put that on your list.', 'やることのリストに入れておこう。'],
        [118, 'I was about to unpack my books.', 'ちょうど本を荷ほどきしようとしていた。', 'Finding a place for everything takes time.', '物の置き場所を決めるのは時間がかかるね。'],
        [113, 'I accidentally broke a cup.', 'うっかりカップを割ってしまった。', 'Oh no. I hope you did not hurt yourself.', 'あらら。けがをしていないといいけど。'],
        [128, "I've stopped buying new things for now.", '今は新しいものを買うのをやめた。', 'That gives you time to sort things out.', 'まず片付ける時間ができるね。'],
        [111, 'I used to have a lot more furniture.', '以前はもっとたくさん家具があった。', 'You might have more space now.', '今は空間に余裕がありそうだね。']
      ]}
    ]
  }
];
