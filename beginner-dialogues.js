// Each turn keeps its question, learner replies, and teacher answer together.
// Reply tuples: English, Japanese, reusable phrase, teacher acknowledgement.
globalThis.BEGINNER_DIALOGUES = {
  "topic-food": [
    {
      prompt: ["What food do you like?", "どんな食べ物が好き？"],
      openings: [["What do you like to eat?", "何を食べるのが好き？"], ["What's your favorite food?", "好きな食べ物は何？"]],
      explain: ["Tell me one food you like.", "好きな食べ物を一つ教えて。"],
      replies: [
        ["I like pasta.", "パスタが好き。", "I like", ["Pasta is good.", "パスタはいいね。"]],
        ["I love sushi.", "お寿司が大好き。", "I love", ["Sushi is good.", "お寿司はいいね。"]],
        ["I like pizza.", "ピザが好き。", "I like", ["Pizza is good.", "ピザはいいね。"]],
        ["I really like curry.", "カレーがとても好き。", "I really like", ["Curry is good.", "カレーはいいね。"]],
        ["I like chicken.", "鶏肉が好き。", "I like", ["Chicken is good.", "鶏肉はいいね。"]]
      ],
      teacher: ["I like soup. I often have it for lunch.", "私はスープが好き。よく昼に食べるよ。", "I like tomato soup with bread.", "パンと一緒にトマトスープを食べるのが好き。"]
    },
    {
      prompt: ["Do you usually eat breakfast?", "普段、朝ご飯は食べる？"],
      explain: ["Do you eat in the morning?", "朝、食事をする？"],
      replies: [
        ["I usually eat toast.", "普段はトーストを食べるよ。", "I usually", ["That's a quick breakfast.", "すぐに食べられる朝ご飯だね。"]],
        ["I usually eat rice.", "普段はご飯を食べるよ。", "I usually", ["Rice is a good breakfast.", "ご飯の朝食もいいね。"]],
        ["I don't eat breakfast.", "朝ご飯は食べないよ。", "I don't", ["Oh, I see.", "ああ、そうなんだ。"]],
        ["I usually have eggs.", "普段は卵を食べるよ。", "I usually", ["Eggs are a good breakfast.", "卵の朝食もいいね。"]],
        ["I usually have fruit.", "普段は果物を食べるよ。", "I usually", ["That sounds good.", "それはいいね。"]]
      ],
      teacher: ["I usually have toast and an egg.", "私は普段、トーストと卵を食べるよ。", "I have a cup of tea with breakfast too.", "朝食と一緒にお茶も飲むよ。"]
    },
    {
      prompt: ["Do you like eating at home?", "家で食べるのは好き？"],
      explain: ["Do you enjoy having meals at home?", "家で食事をするのは好き？"],
      replies: [
        ["I like eating at home.", "家で食べるのが好き。", "I like", ["It's nice to eat at home.", "家での食事はいいね。"]],
        ["I prefer eating out.", "外食するほうが好き。", "I prefer", ["There are lots of places to try.", "いろいろなお店を試せるね。"]],
        ["I like both.", "どちらも好き。", "I like", ["It's nice to have a choice.", "選べるのはいいね。"]],
        ["I usually eat with my family.", "普段は家族と食べるよ。", "I usually", ["That sounds nice.", "それはいいね。"]],
        ["I usually eat at home.", "普段は家で食べるよ。", "I usually", ["Oh, I see.", "ああ、そうなんだ。"]]
      ],
      teacher: ["I like eating at home. I can relax.", "私は家で食べるのが好き。ゆっくりできるからね。", "I sometimes eat out on Sundays.", "日曜日には外食することもあるよ。"]
    }
  ],
  "source-scene-home-cooking": [
    {
      prompt: ["What did you cook last night?", "昨夜は何を作った？"],
      openings: [["What did you make for dinner last night?", "昨夜の夕食には何を作った？"], ["Did you cook anything last night?", "昨夜は何か料理した？"]],
      explain: ["Tell me about the food you made yesterday evening.", "昨日の夜に作った料理を教えて。"],
      replies: [
        ["I cooked pasta at home.", "家でパスタを作った。", "I cooked", ["Pasta sounds good.", "パスタはいいね。"]],
        ["I cooked soup at home.", "家でスープを作った。", "I cooked", ["Soup sounds good.", "スープはいいね。"]],
        ["I cooked curry at home.", "家でカレーを作った。", "I cooked", ["Curry sounds good.", "カレーはいいね。"]],
        ["I made a sandwich.", "サンドイッチを作った。", "I made", ["That sounds good.", "それはいいね。"]],
        ["I didn't cook yesterday.", "昨日は料理しなかった。", "I didn't", ["Oh, I see.", "ああ、そうなんだ。"]]
      ],
      teacher: ["I made soup last night.", "私は昨夜スープを作ったよ。", "I used carrots and potatoes. It was easy.", "ニンジンとジャガイモを使ったよ。簡単だった。"]
    },
    {
      prompt: ["How often do you cook?", "どのくらいの頻度で料理する？"],
      explain: ["Do you cook every day or just sometimes?", "毎日料理する？それとも、ときどき？"],
      replies: [
        ["I usually cook every day.", "普段は毎日料理する。", "I usually", ["You cook a lot.", "よく料理するんだね。"]],
        ["I usually cook on weekends.", "普段は週末に料理する。", "I usually", ["Weekends are a good time to cook.", "週末は料理するのにいいね。"]],
        ["I don't cook much.", "あまり料理しない。", "I don't", ["Oh, I see.", "ああ、そうなんだ。"]],
        ["I cook twice a week.", "週に2回料理する。", "I cook", ["Oh, twice a week.", "そう、週に2回なんだね。"]],
        ["I cook when I have time.", "時間があるときに料理する。", "I cook", ["That makes sense.", "なるほどね。"]]
      ],
      teacher: ["I cook most evenings. I make simple meals.", "私はたいてい夕方に料理するよ。簡単なものを作るんだ。", "I often make soup or pasta.", "よくスープやパスタを作るよ。"]
    },
    {
      prompt: ["Do you enjoy cooking?", "料理するのは好き？"],
      explain: ["Is cooking fun for you?", "料理は楽しい？"],
      replies: [
        ["I like cooking.", "料理が好き。", "I like", ["It's a useful hobby.", "役に立つ趣味だね。"]],
        ["I don't enjoy cooking much.", "料理はあまり好きじゃない。", "I don't", ["That's okay. Not everyone enjoys it.", "そうなんだ。好きではない人もいるよね。"]],
        ["I like trying new recipes.", "新しいレシピを試すのが好き。", "I like", ["That can be fun.", "それは楽しそうだね。"]],
        ["I prefer simple meals.", "簡単な料理のほうが好き。", "I prefer", ["Simple meals are good too.", "簡単な料理もいいね。"]],
        ["I want to learn to cook.", "料理を覚えたい。", "I want to", ["You could start with eggs.", "卵料理から始めるのもいいね。"]]
      ],
      teacher: ["I enjoy cooking, but I don't like washing dishes.", "私は料理が好き。でも皿洗いは好きじゃないんだ。", "I wash the dishes right after dinner.", "夕食のすぐあとに皿を洗うよ。"],
      tone: "neutral"
    }
  ],
  "topic-work": [
    {
      prompt: ["How is work today?", "今日の仕事はどう？"],
      openings: [["How's work going?", "仕事の調子はどう？"], ["Are you busy at work today?", "今日は仕事が忙しい？"]],
      explain: ["Is work busy or quiet today?", "今日の仕事は忙しい？それとも落ち着いている？"],
      replies: [
        ["I'm busy today.", "今日は忙しい。", "I'm busy", ["I hope you can take a break.", "休憩できるといいね。"]],
        ["I'm doing okay.", "まあ大丈夫だよ。", "I'm doing okay", ["That's good.", "それはよかった。"]],
        ["I'm tired today.", "今日は疲れている。", "I'm tired", ["I hope you can rest later.", "あとで休めるといいね。"]],
        ["I have a lot to do.", "することがたくさんある。", "I have", ["That sounds busy.", "忙しそうだね。"]],
        ["I'm not very busy today.", "今日はあまり忙しくない。", "I'm not", ["That's good.", "それはよかった。"]]
      ],
      teacher: ["I have two classes today.", "私は今日、授業が2つあるよ。", "One is in the morning. One is after lunch.", "一つは午前中。もう一つは昼食のあとだよ。"],
      tone: "neutral"
    },
    {
      prompt: ["How do you get to work?", "どうやって職場に行く？"],
      explain: ["Do you take a train, drive, or walk?", "電車で行く？車？それとも歩く？"],
      replies: [
        ["I usually take the train.", "普段は電車で行く。", "I usually", ["Oh, you take the train.", "そう、電車で行くんだね。"]],
        ["I usually drive to work.", "普段は車で仕事に行く。", "I usually", ["Oh, you drive.", "そう、車で行くんだね。"]],
        ["I usually walk to work.", "普段は歩いて仕事に行く。", "I usually", ["That's a good way to get some exercise.", "運動にもなっていいね。"]],
        ["I work at home.", "家で仕事をしている。", "I work", ["Oh, you work at home.", "そう、在宅なんだね。"]],
        ["I usually take the bus.", "普段はバスで行く。", "I usually", ["Oh, you take the bus.", "そう、バスで行くんだね。"]]
      ],
      teacher: ["I usually take the bus to work.", "私は普段、バスで職場に行くよ。", "The bus stop is near my house.", "バス停は家の近くにあるんだ。"]
    },
    {
      prompt: ["What do you do after work?", "仕事のあとは何をする？"],
      explain: ["How do you spend your evenings after work?", "仕事が終わったあとの夜はどう過ごす？"],
      replies: [
        ["I usually watch TV.", "普段はテレビを観る。", "I usually", ["That's one way to relax.", "それも気分転換になるね。"]],
        ["I like taking a walk.", "散歩するのが好き。", "I like", ["A walk can be nice.", "散歩はいいね。"]],
        ["I usually make dinner.", "普段は夕食を作る。", "I usually", ["Oh, you cook after work.", "そう、仕事のあとに料理するんだね。"]],
        ["I like reading.", "読書するのが好き。", "I like", ["That sounds relaxing.", "ゆっくりできそうだね。"]],
        ["I usually go straight home.", "普段はまっすぐ家に帰る。", "I usually", ["It's nice to get home.", "家に帰ると落ち着くね。"]]
      ],
      teacher: ["I read after dinner. It helps me relax.", "私は夕食のあとに本を読むよ。気持ちが落ち着くんだ。", "I read for about twenty minutes.", "20分くらい読むよ。"]
    }
  ],
  "topic-weekend": [
    {
      prompt: ["What do you want to do this weekend?", "今週末は何をしたい？"],
      openings: [["Any plans for the weekend?", "週末の予定はある？"], ["What are your plans for this weekend?", "今週末の予定は？"]],
      explain: ["What would you like to do on Saturday or Sunday?", "土曜日か日曜日に何をしたい？"],
      replies: [
        ["I'd like to stay home.", "家で過ごしたい。", "I'd like to", ["A quiet weekend sounds nice.", "静かな週末もいいね。"]],
        ["I want to see my friends.", "友達に会いたい。", "I want to", ["That sounds fun.", "楽しそうだね。"]],
        ["I'd like to take a walk.", "散歩したい。", "I'd like to", ["A walk sounds nice.", "散歩はいいね。"]],
        ["I want to watch a movie.", "映画を観たい。", "I want to", ["That sounds fun.", "楽しそうだね。"]],
        ["I'd like to go shopping.", "買い物に行きたい。", "I'd like to", ["I hope you find something nice.", "いいものが見つかるといいね。"]]
      ],
      teacher: ["I want to have lunch with a friend.", "私は友達とランチを食べたいな。", "We want to try a cafe near the park.", "公園の近くのカフェに行ってみたいんだ。"]
    },
    {
      prompt: ["Do you like busy weekends?", "予定がたくさんある週末は好き？"],
      explain: ["Do you like having lots of plans on weekends?", "週末に予定をたくさん入れるのは好き？"],
      replies: [
        ["I like being busy.", "忙しくしているのが好き。", "I like", ["You like having things to do.", "することがあるのが好きなんだね。"]],
        ["I prefer quiet weekends.", "静かな週末のほうが好き。", "I prefer", ["It's good to have time to rest.", "休む時間があるのはいいね。"]],
        ["I like a little of both.", "どちらも少しずつあるのが好き。", "I like", ["That sounds good.", "それはいいね。"]],
        ["It depends on the week.", "その週によるね。", "It depends on", ["Some weeks are busier than others.", "忙しい週もあるもんね。"]],
        ["I need time to relax.", "ゆっくりする時間が必要。", "I need", ["Rest is important.", "休むことは大切だね。"]]
      ],
      teacher: ["I like having one plan and some free time.", "私は予定を一つ入れて、あとは自由に過ごすのが好き。", "I leave Sunday morning free so I can rest.", "日曜の朝は休めるように予定を入れないんだ。"],
      tone: "neutral"
    },
    {
      prompt: ["Do you get up early on weekends?", "週末は早起きする？"],
      explain: ["What time do you wake up on Saturdays?", "土曜日は何時に起きる？"],
      replies: [
        ["I usually get up at seven.", "普段は7時に起きる。", "I usually", ["That's quite early.", "けっこう早いね。"]],
        ["I like sleeping late.", "朝遅くまで寝るのが好き。", "I like", ["It's nice not to rush.", "急がなくていいのはいいね。"]],
        ["I usually get up at nine.", "普段は9時に起きる。", "I usually", ["Oh, around nine.", "そう、9時くらいなんだね。"]],
        ["It depends on my plans.", "予定によるね。", "It depends on", ["That makes sense.", "なるほどね。"]],
        ["I don't set an alarm.", "目覚ましをかけない。", "I don't", ["That sounds relaxing.", "ゆっくりできそうだね。"]]
      ],
      teacher: ["I usually wake up at seven, even on Sundays.", "私は日曜日でも、普段は7時に目が覚めるよ。", "I make tea and read the news.", "お茶を入れてニュースを読むんだ。"]
    }
  ],
  "source-scene-last-weekend": [
    {
      prompt: ["What did you do last weekend?", "先週末は何をした？"],
      openings: [["How did you spend last weekend?", "先週末はどう過ごした？"], ["What did you do on Sunday?", "日曜日は何をした？"]],
      explain: ["Tell me one thing you did on the weekend.", "週末にしたことを一つ教えて。"],
      replies: [
        ["I stayed home.", "家にいた。", "I stayed", ["A quiet weekend can be nice.", "静かな週末もいいね。"]],
        ["I went to a cafe.", "カフェに行った。", "I went to", ["That sounds nice.", "それはいいね。"]],
        ["I watched a movie.", "映画を観た。", "I watched", ["That sounds fun.", "楽しそうだね。"]],
        ["I met a friend.", "友達に会った。", "I met", ["It's nice to see friends.", "友達に会うのはいいね。"]],
        ["I went for a walk.", "散歩に行った。", "I went for", ["That sounds nice.", "それはいいね。"]]
      ],
      teacher: ["I visited a friend on Sunday.", "私は日曜日に友達を訪ねたよ。", "We had lunch and talked for a while.", "一緒にランチを食べて、しばらく話したよ。"]
    },
    {
      prompt: ["Did you have a good weekend?", "いい週末だった？"],
      explain: ["Did you enjoy your weekend?", "週末は楽しかった？"],
      replies: [
        ["I had a good time.", "楽しく過ごした。", "I had", ["I'm glad to hear that.", "それはよかったね。"]],
        ["I had a quiet weekend.", "静かな週末だった。", "I had", ["It's nice to have a quiet weekend.", "静かな週末もいいね。"]],
        ["I was busy all weekend.", "週末はずっと忙しかった。", "I was", ["I hope you can rest soon.", "早く休めるといいね。"]],
        ["I enjoyed my weekend.", "週末を楽しめた。", "I enjoyed", ["That's good to hear.", "それはよかったね。"]],
        ["I didn't have much time to rest.", "あまり休む時間がなかった。", "I didn't", ["That sounds tiring.", "それは疲れそうだね。"]]
      ],
      teacher: ["I had a nice weekend. It was good to see my friend.", "私はいい週末だったよ。友達に会えてよかった。", "We don't see each other often, so we had lots to talk about.", "あまり会えないから、話すことがたくさんあったんだ。"]
    },
    {
      prompt: ["Do weekends feel too short?", "週末は短すぎると感じる？"],
      explain: ["Does the weekend feel too short?", "週末は短すぎると感じる？"],
      replies: [
        ["I think so.", "そう思う。", "I think", ["Two days can feel short.", "2日間は短く感じることもあるね。"]],
        ["I'd like a longer weekend.", "週末がもっと長いとうれしいな。", "I'd like", ["An extra day would be nice.", "もう1日あったらいいね。"]],
        ["It depends on my plans.", "予定によるね。", "It depends on", ["That makes sense.", "なるほどね。"]],
        ["I usually have enough time.", "普段は十分に時間がある。", "I usually", ["That's good.", "それはいいね。"]],
        ["I try to enjoy each day.", "毎日を楽しむようにしている。", "I try to", ["That's a nice way to think.", "いい考え方だね。"]]
      ],
      teacher: ["My weekends often feel short.", "私は週末が短く感じることが多いよ。", "I try to do one thing I enjoy each day.", "毎日、好きなことを一つするようにしているよ。"],
      tone: "neutral"
    }
  ],
  "topic-hobbies": [
    {
      prompt: ["What do you like to do in your free time?", "自由な時間には何をするのが好き？"],
      openings: [["What do you do for fun?", "どんなことをして楽しむ？"], ["What do you enjoy doing?", "何をするのが好き？"]],
      explain: ["Tell me something you do for fun.", "楽しみでしていることを教えて。"],
      replies: [
        ["I like reading.", "読書が好き。", "I like", ["Books can be fun.", "本は楽しいね。"]],
        ["I enjoy cooking.", "料理が好き。", "I enjoy", ["That's a useful hobby.", "役に立つ趣味だね。"]],
        ["I like walking.", "散歩が好き。", "I like", ["A walk can be relaxing.", "散歩は気分転換になるね。"]],
        ["I love listening to music.", "音楽を聴くのが大好き。", "I love", ["Music is a nice way to relax.", "音楽はいい気分転換になるね。"]],
        ["I like playing games.", "ゲームをするのが好き。", "I like", ["That sounds fun.", "楽しそうだね。"]]
      ],
      teacher: ["I like reading short stories.", "私は短い物語を読むのが好き。", "I borrow books from the library near my house.", "家の近くの図書館で本を借りるんだ。"]
    },
    {
      prompt: ["Do you have much free time?", "自由な時間はたくさんある？"],
      explain: ["Do you have time to do things you enjoy?", "好きなことをする時間はある？"],
      replies: [
        ["I have some time after dinner.", "夕食のあとに少し時間がある。", "I have", ["Evenings can be a good time.", "夜はいい時間になりそうだね。"]],
        ["I don't have much free time.", "自由な時間はあまりない。", "I don't", ["I hope you can find some time.", "少し時間を作れるといいね。"]],
        ["I'm usually free on Sundays.", "普段は日曜日に時間がある。", "I'm usually free", ["It's nice to have a free day.", "自由な日があるのはいいね。"]],
        ["I have a little time in the morning.", "朝に少し時間がある。", "I have", ["Mornings can be quiet.", "朝は静かに過ごせるね。"]],
        ["It depends on the week.", "その週によるね。", "It depends on", ["Some weeks are busier than others.", "忙しい週もあるもんね。"]]
      ],
      teacher: ["I have some free time after dinner.", "私は夕食のあとに少し自由な時間があるよ。", "I turn off the TV and read for a while.", "テレビを消して、しばらく本を読むんだ。"]
    },
    {
      prompt: ["Is there a hobby you'd like to try?", "やってみたい趣味はある？"],
      explain: ["Is there something new you want to do for fun?", "新しく楽しみでやってみたいことはある？"],
      replies: [
        ["I'd like to try painting.", "絵を描いてみたい。", "I'd like to", ["That could be fun.", "それは楽しそうだね。"]],
        ["I want to learn the guitar.", "ギターを習いたい。", "I want to", ["Music can be a fun hobby.", "音楽は楽しい趣味になりそうだね。"]],
        ["I'd like to try gardening.", "園芸をやってみたい。", "I'd like to", ["It's nice to grow things.", "植物を育てるのはいいね。"]],
        ["I want to take more photos.", "もっと写真を撮りたい。", "I want to", ["You can start with your phone.", "スマホから始められるね。"]],
        ["I haven't decided yet.", "まだ決めていない。", "I haven't", ["You can take your time.", "ゆっくり考えればいいよ。"]]
      ],
      teacher: ["I'd like to try painting.", "私は絵を描いてみたいな。", "I'd like to paint the flowers in my garden.", "庭の花を描いてみたいんだ。"]
    }
  ],
  "topic-movies": [
    {
      prompt: ["What kind of movies do you like?", "どんな映画が好き？"],
      openings: [["What movies do you enjoy?", "どんな映画を観るのが好き？"], ["Do you have a favorite kind of movie?", "好きな映画のジャンルはある？"]],
      explain: ["Do you like funny movies, action movies, or something else?", "コメディやアクション、それともほかの映画が好き？"],
      replies: [
        ["I like funny movies.", "面白い映画が好き。", "I like", ["It's nice to have a laugh.", "笑えるのはいいね。"]],
        ["I love action movies.", "アクション映画が大好き。", "I love", ["They can be exciting.", "わくわくするよね。"]],
        ["I like love stories.", "恋愛映画が好き。", "I like", ["There are some good ones.", "いい作品もあるね。"]],
        ["I enjoy old movies.", "昔の映画が好き。", "I enjoy", ["There are lots of good old movies.", "昔の映画にもいい作品がたくさんあるね。"]],
        ["I don't watch many movies.", "あまり映画を観ない。", "I don't", ["Oh, I see.", "ああ、そうなんだ。"]]
      ],
      teacher: ["I like funny movies. I enjoy a good laugh.", "私はコメディが好き。たくさん笑えるのがいいね。", "I often watch a movie on Friday night.", "金曜の夜によく映画を観るよ。"]
    },
    {
      prompt: ["Do you watch movies at home or at a theater?", "映画は家で観る？映画館で観る？"],
      explain: ["Where do you usually watch movies?", "普段はどこで映画を観る？"],
      replies: [
        ["I usually watch at home.", "普段は家で観る。", "I usually", ["It's nice to watch at home.", "家で観るのはいいね。"]],
        ["I prefer the movie theater.", "映画館のほうが好き。", "I prefer", ["The big screen is great.", "大きな画面はいいね。"]],
        ["I like both.", "どちらも好き。", "I like", ["Both can be fun.", "どちらも楽しめるね。"]],
        ["It depends on the movie.", "映画によるね。", "It depends on", ["That makes sense.", "なるほどね。"]],
        ["I don't watch movies very often.", "あまり映画は観ない。", "I don't", ["Oh, I see.", "ああ、そうなんだ。"]]
      ],
      teacher: ["I usually watch at home. It's comfortable.", "私は普段、家で観るよ。くつろげるからね。", "I sit in my favorite chair with some tea.", "好きな椅子に座って、お茶を飲みながら観るよ。"]
    },
    {
      prompt: ["Do you watch movies in English?", "英語で映画を観る？"],
      explain: ["Do you choose English when you watch a movie?", "映画を観るときに英語を選ぶ？"],
      replies: [
        ["I usually watch in Japanese.", "普段は日本語で観る。", "I usually", ["That can make the story easier to follow.", "そのほうが話を追いやすいね。"]],
        ["I try to watch in English.", "英語で観るようにしている。", "I try to", ["That's good listening practice.", "いい聞き取りの練習になるね。"]],
        ["I need Japanese subtitles.", "日本語字幕が必要。", "I need", ["Subtitles can help.", "字幕があると助かるね。"]],
        ["I like watching in English.", "英語で観るのが好き。", "I like", ["You can hear lots of everyday English.", "日常の英語をたくさん聞けるね。"]],
        ["I want to try that.", "やってみたい。", "I want to", ["You could start with a short scene.", "短い場面から始めるのもいいね。"]]
      ],
      teacher: ["I watch movies in English.", "私は英語で映画を観るよ。", "I turn on subtitles if the voices are hard to hear.", "声が聞き取りにくいときは字幕をつけるよ。"],
      tone: "neutral"
    }
  ],
  "topic-travel": [
    {
      prompt: ["Where would you like to go?", "どこに行ってみたい？"],
      openings: [["Where do you want to travel?", "どこに旅行したい？"], ["Where would you like to go on a trip?", "旅行でどこに行ってみたい？"]],
      explain: ["Tell me a place you'd like to visit.", "訪ねてみたい場所を教えて。"],
      replies: [
        ["I'd like to go to Italy.", "イタリアに行きたい。", "I'd like to", ["Italy sounds interesting.", "イタリアは面白そうだね。"]],
        ["I want to go to the beach.", "海辺に行きたい。", "I want to", ["A beach trip sounds nice.", "海への旅行はいいね。"]],
        ["I'd like to visit Kyoto.", "京都に行ってみたい。", "I'd like to", ["There are lots of places to see there.", "見どころがたくさんあるね。"]],
        ["I want to visit my friend.", "友達を訪ねたい。", "I want to", ["It's nice to travel to see a friend.", "友達に会いに行く旅もいいね。"]],
        ["I'd like to go to Korea.", "韓国に行きたい。", "I'd like to", ["That sounds like a nice trip.", "いい旅行になりそうだね。"]]
      ],
      teacher: ["I'd like to visit Japan.", "私は日本に行ってみたいな。", "I'd like to visit Kyoto and try some local food.", "京都に行って、地元の料理を食べてみたいよ。"]
    },
    {
      prompt: ["What do you like to do on a trip?", "旅行では何をするのが好き？"],
      explain: ["What do you enjoy doing when you travel?", "旅行先では何をして楽しむ？"],
      replies: [
        ["I like trying new food.", "新しい食べ物を試すのが好き。", "I like", ["Food can be a fun part of a trip.", "食事も旅の楽しみになるね。"]],
        ["I enjoy walking around.", "歩いて回るのが好き。", "I enjoy", ["You can see a lot on foot.", "歩くといろいろなものを見られるね。"]],
        ["I like taking photos.", "写真を撮るのが好き。", "I like", ["Photos help you remember the trip.", "写真は旅の思い出になるね。"]],
        ["I love shopping.", "買い物が大好き。", "I love", ["It's fun to visit different shops.", "いろいろなお店に行くのは楽しいね。"]],
        ["I like meeting people.", "人に会うのが好き。", "I like", ["You can learn a lot from people.", "人から学べることも多いね。"]]
      ],
      teacher: ["I like walking around new places.", "私は初めての場所を歩いて回るのが好き。", "I often stop at a small cafe for a drink.", "よく小さなカフェに立ち寄って飲み物を飲むよ。"]
    },
    {
      prompt: ["Do you like short trips or long trips?", "短い旅行と長い旅行、どちらが好き？"],
      explain: ["Do you prefer a few days away or a longer trip?", "数日の旅行と、それより長い旅行ならどちらが好き？"],
      replies: [
        ["I prefer short trips.", "短い旅行のほうが好き。", "I prefer", ["A few days away can be nice.", "数日のお出かけもいいね。"]],
        ["I like long trips.", "長い旅行が好き。", "I like", ["You have more time to explore.", "ゆっくり見て回れるね。"]],
        ["I like both.", "どちらも好き。", "I like", ["Both can be fun.", "どちらも楽しめるね。"]],
        ["It depends on the place.", "場所によるね。", "It depends on", ["That makes sense.", "なるほどね。"]],
        ["I don't travel much.", "あまり旅行しない。", "I don't", ["Oh, I see.", "ああ、そうなんだ。"]]
      ],
      teacher: ["I prefer short trips close to home.", "私は家の近くへの短い旅行のほうが好き。", "I can take a train and be home by evening.", "電車で出かけて、夕方には家に戻れるからね。"]
    }
  ],
  "topic-weather": [
    {
      prompt: ["What's the weather like where you are?", "そちらの天気はどう？"],
      openings: [["How's the weather there today?", "今日、そちらの天気はどう？"], ["Is it sunny where you are?", "そちらは晴れている？"]],
      explain: ["Is it sunny, rainy, hot, or cold there?", "そちらは晴れ？雨？暑い？寒い？"],
      replies: [
        ["It's sunny today.", "今日は晴れている。", "It's sunny", ["That sounds nice.", "それはいいね。"]],
        ["It's raining today.", "今日は雨が降っている。", "It's raining", ["Oh, a rainy day.", "そう、雨の日なんだね。"]],
        ["It's cold today.", "今日は寒い。", "It's cold", ["I hope you're staying warm.", "暖かくして過ごしてね。"]],
        ["It's warm today.", "今日は暖かい。", "It's warm", ["That sounds nice.", "気持ちよさそうだね。"]],
        ["It's hot today.", "今日は暑い。", "It's hot", ["I hope you can stay cool.", "涼しく過ごせるといいね。"]]
      ],
      teacher: ["It's sunny here today.", "こちらは今日は晴れているよ。", "It's warm, so I have the window open.", "暖かいから、窓を開けているんだ。"]
    },
    {
      prompt: ["What do you like to do on rainy days?", "雨の日は何をするのが好き？"],
      explain: ["How do you spend your time when it rains?", "雨が降るときはどう過ごす？"],
      replies: [
        ["I like reading at home.", "家で本を読むのが好き。", "I like", ["That sounds relaxing.", "ゆっくりできそうだね。"]],
        ["I usually watch movies.", "普段は映画を観る。", "I usually", ["A movie is nice on a rainy day.", "雨の日に映画もいいね。"]],
        ["I like listening to music.", "音楽を聴くのが好き。", "I like", ["That sounds nice.", "それはいいね。"]],
        ["I usually go to a cafe.", "普段はカフェに行く。", "I usually", ["A warm drink can be nice.", "温かい飲み物もいいね。"]],
        ["I like cooking at home.", "家で料理するのが好き。", "I like", ["That's a nice way to spend the day.", "いい過ごし方だね。"]]
      ],
      teacher: ["I like reading with a cup of tea.", "私はお茶を飲みながら本を読むのが好き。", "I sit by the window and listen to the rain.", "窓のそばに座って、雨の音を聞くんだ。"]
    },
    {
      prompt: ["Do you prefer summer or winter?", "夏と冬ならどちらが好き？"],
      explain: ["Which do you like more: summer or winter?", "夏と冬、どちらのほうが好き？"],
      replies: [
        ["I prefer summer.", "夏のほうが好き。", "I prefer", ["Long summer days can be nice.", "夏は日が長くていいね。"]],
        ["I like winter more.", "冬のほうが好き。", "I like", ["Cold days can be nice too.", "寒い日もいいところがあるね。"]],
        ["I like both.", "どちらも好き。", "I like", ["Each season has something nice.", "それぞれの季節によさがあるね。"]],
        ["I prefer spring.", "春のほうが好き。", "I prefer", ["Spring weather can be lovely.", "春の天気は気持ちがいいね。"]],
        ["I don't like very hot weather.", "とても暑いのは好きじゃない。", "I don't", ["Very hot days can be hard.", "とても暑い日は大変だね。"]]
      ],
      teacher: ["I prefer spring. I like seeing the flowers.", "私は春が好き。花を見るのが好きなんだ。", "I often take walks in the park in spring.", "春はよく公園を散歩するよ。"]
    }
  ],
  "topic-shopping": [
    {
      prompt: ["Is there anything you'd like to buy?", "何か買いたいものはある？"],
      openings: [["What would you like to buy?", "何を買いたい？"], ["Are you looking for something to buy?", "何か買うものを探している？"]],
      explain: ["Do you want a new book, clothes, or something else?", "本や服など、欲しいものはある？"],
      replies: [
        ["I'd like to buy a book.", "本を買いたい。", "I'd like to", ["It's nice to find a good book.", "いい本が見つかるといいね。"]],
        ["I want to buy shoes.", "靴を買いたい。", "I want to", ["I hope you find a good pair.", "いい靴が見つかるといいね。"]],
        ["I'd like a new bag.", "新しいバッグが欲しい。", "I'd like", ["I hope you find one you like.", "気に入るものが見つかるといいね。"]],
        ["I'm looking for a gift.", "プレゼントを探している。", "I'm looking for", ["I hope you find something nice.", "いいものが見つかるといいね。"]],
        ["I don't need anything right now.", "今は何も必要ない。", "I don't", ["Oh, I see.", "ああ、そうなんだ。"]]
      ],
      teacher: ["I'd like a new bag for my books.", "私は本を入れる新しいバッグが欲しいな。", "My old bag has a small hole.", "今のバッグには小さな穴があるんだ。"]
    },
    {
      prompt: ["Do you prefer shopping online or in stores?", "ネットとお店、どちらで買うのが好き？"],
      explain: ["Do you buy things on your phone or in a shop?", "スマホで買う？それともお店で買う？"],
      replies: [
        ["I usually shop online.", "普段はネットで買う。", "I usually", ["You can shop without going out.", "出かけずに買い物できるね。"]],
        ["I prefer shopping in stores.", "お店で買うほうが好き。", "I prefer", ["It's nice to see things before buying.", "買う前に実物を見られるのはいいね。"]],
        ["I like both.", "どちらも好き。", "I like", ["It's good to have a choice.", "選べるのはいいね。"]],
        ["It depends on what I need.", "必要なものによるね。", "It depends on", ["That makes sense.", "なるほどね。"]],
        ["I don't shop very often.", "あまり買い物しない。", "I don't", ["Oh, I see.", "ああ、そうなんだ。"]]
      ],
      teacher: ["I like going to small shops.", "私は小さなお店に行くのが好き。", "I like talking to the people who work there.", "そこで働く人たちと話すのが好きなんだ。"]
    },
    {
      prompt: ["Do you check the price before you buy?", "買う前に値段を確認する？"],
      explain: ["Do you look at how much something costs first?", "先にいくらするか見る？"],
      replies: [
        ["I always check the price.", "いつも値段を確認する。", "I always", ["That helps you choose.", "選ぶときの参考になるね。"]],
        ["I usually compare prices.", "普段は値段を比べる。", "I usually", ["That can save money.", "節約になることもあるね。"]],
        ["I try to save money.", "節約するようにしている。", "I try to", ["Checking prices can help.", "値段を確認すると役に立つね。"]],
        ["It depends on what I buy.", "買うものによるね。", "It depends on", ["That makes sense.", "なるほどね。"]],
        ["I don't always check.", "いつも確認するわけではない。", "I don't", ["Oh, I see.", "ああ、そうなんだ。"]]
      ],
      teacher: ["I usually check prices in two shops.", "私は普段、2つのお店で値段を確認するよ。", "I compare the prices before I choose.", "選ぶ前に値段を比べるんだ。"],
      tone: "neutral"
    }
  ],
  "topic-exercise": [
    {
      prompt: ["What do you do for exercise?", "どんな運動をしている？"],
      openings: [["What exercise do you enjoy?", "どんな運動が好き？"], ["Do you have a favorite way to exercise?", "好きな運動はある？"]],
      explain: ["Do you walk, run, swim, or do something else?", "歩く？走る？泳ぐ？それともほかの運動？"],
      replies: [
        ["I like walking.", "散歩が好き。", "I like", ["Walking is good exercise.", "歩くのはいい運動になるね。"]],
        ["I enjoy running.", "走るのが好き。", "I enjoy", ["That can be good exercise.", "いい運動になるね。"]],
        ["I love swimming.", "泳ぐのが大好き。", "I love", ["Swimming can be fun.", "泳ぐのは楽しいね。"]],
        ["I like dancing.", "ダンスが好き。", "I like", ["That sounds fun.", "楽しそうだね。"]],
        ["I don't exercise much.", "あまり運動しない。", "I don't", ["Oh, I see.", "ああ、そうなんだ。"]]
      ],
      teacher: ["I like walking in the morning.", "私は朝に歩くのが好き。", "I walk to the park before breakfast.", "朝食の前に公園まで歩くよ。"]
    },
    {
      prompt: ["Do you enjoy being outside?", "外で過ごすのは好き？"],
      explain: ["Do you like going outside?", "外に出るのは好き？"],
      replies: [
        ["I like being outside.", "外で過ごすのが好き。", "I like", ["Fresh air can feel good.", "外の空気は気持ちがいいね。"]],
        ["I prefer staying inside.", "室内にいるほうが好き。", "I prefer", ["Being at home can be comfortable.", "家の中はくつろげるね。"]],
        ["It depends on the weather.", "天気によるね。", "It depends on", ["That makes sense.", "なるほどね。"]],
        ["I like going to the park.", "公園に行くのが好き。", "I like", ["A park is a nice place to spend time.", "公園は過ごしやすい場所だね。"]],
        ["I don't like being outside when it's hot.", "暑いときは外にいたくない。", "I don't", ["Hot weather can be tiring.", "暑いと疲れるよね。"]]
      ],
      teacher: ["I like being outside when it's not too hot.", "私は暑すぎないときに外で過ごすのが好き。", "I sit in the park and read sometimes.", "ときどき公園に座って本を読むよ。"]
    },
    {
      prompt: ["Would you like to walk more?", "もっと歩きたいと思う？"],
      explain: ["Do you want to spend more time walking?", "歩く時間をもっと増やしたい？"],
      replies: [
        ["I'd like to walk every day.", "毎日歩きたい。", "I'd like to", ["A short walk is a good start.", "短い散歩から始めるのもいいね。"]],
        ["I want to walk with a friend.", "友達と歩きたい。", "I want to", ["It's nice to have someone to talk to.", "話せる相手がいるのはいいね。"]],
        ["I already walk a lot.", "もうたくさん歩いている。", "I already", ["Oh, walking is part of your day.", "そう、日々の生活で歩いているんだね。"]],
        ["I need to find more time.", "もっと時間を作る必要がある。", "I need to", ["Even a few minutes can be a start.", "数分からでも始められるね。"]],
        ["I prefer other kinds of exercise.", "ほかの運動のほうが好き。", "I prefer", ["It's good to find something you enjoy.", "自分が楽しめるものがあるといいね。"]]
      ],
      teacher: ["I'd like to take a short walk after lunch too.", "私は昼食のあとにも少し歩きたいな。", "I sit a lot at work, so I like to move.", "仕事で座る時間が長いから、体を動かしたいんだ。"]
    }
  ],
  "source-scene-english-goals": [
    {
      prompt: ["Why do you want to learn English?", "どうして英語を学びたい？"],
      openings: [["What would you like to do with your English?", "英語でどんなことをしたい？"], ["What is your goal for English?", "英語の目標は？"]],
      explain: ["Do you want to use English for travel, work, or fun?", "旅行、仕事、楽しみなど、何のために英語を使いたい？"],
      replies: [
        ["I want to talk to more people.", "もっといろいろな人と話したい。", "I want to", ["That's a good reason to learn.", "いい目標だね。"]],
        ["I'd like to use English at work.", "仕事で英語を使いたい。", "I'd like to", ["English can be useful at work.", "仕事で英語が役立つこともあるね。"]],
        ["I want to travel.", "旅行をしたい。", "I want to", ["English can help when you travel.", "旅行で英語が役立つね。"]],
        ["I want to watch movies in English.", "英語で映画を観たい。", "I want to", ["That sounds like a fun goal.", "楽しそうな目標だね。"]],
        ["I enjoy learning languages.", "言語を学ぶのが好き。", "I enjoy", ["It's nice to enjoy learning.", "学ぶことを楽しめるのはいいね。"]]
      ],
      teacher: ["I'm learning Japanese. I'd like to talk to more people.", "私は日本語を勉強しているよ。もっといろいろな人と話したいんだ。", "I'd like to use Japanese when I visit Japan.", "日本を訪ねるときに日本語を使いたいんだ。"]
    },
    {
      prompt: ["What is hard for you in English?", "英語のどんなところが難しい？"],
      explain: ["Is speaking, listening, reading, or writing difficult for you?", "話す、聞く、読む、書くのうち、何が難しい？"],
      replies: [
        ["I find listening difficult.", "聞き取りが難しいと感じる。", "I find", ["Fast speech can be hard to follow.", "速い話し方は聞き取りにくいね。"]],
        ["I need more speaking practice.", "もっと話す練習が必要。", "I need", ["We can practice a little at a time.", "少しずつ練習していこう。"]],
        ["I don't know many words yet.", "まだ知っている単語が少ない。", "I don't", ["You can learn a few words each day.", "毎日、少しずつ覚えていけるよ。"]],
        ["I get nervous when I speak.", "話すときに緊張する。", "I get", ["That's common. Take your time.", "よくあることだよ。ゆっくりで大丈夫。"]],
        ["I find writing difficult.", "書くのが難しいと感じる。", "I find", ["Short sentences are a good place to start.", "短い文から始めるといいよ。"]]
      ],
      teacher: ["English spelling can be hard, even for me.", "英語の綴りは私でも難しいときがあるよ。", "I sometimes check how to spell a word.", "私もときどき単語の綴りを確認するよ。"],
      tone: "neutral"
    },
    {
      prompt: ["When do you like to study?", "いつ勉強するのが好き？"],
      explain: ["Do you like studying in the morning or at night?", "朝と夜なら、どちらに勉強するのが好き？"],
      replies: [
        ["I like studying in the morning.", "朝に勉強するのが好き。", "I like", ["Mornings can be quiet.", "朝は静かに過ごせるね。"]],
        ["I usually study at night.", "普段は夜に勉強する。", "I usually", ["Evenings can be a good time.", "夜もいい時間になりそうだね。"]],
        ["I study when I have time.", "時間があるときに勉強する。", "I study", ["A few minutes is a good start.", "数分からでも始められるよ。"]],
        ["I like studying after dinner.", "夕食のあとに勉強するのが好き。", "I like", ["That sounds like a good time.", "いい時間になりそうだね。"]],
        ["I try to study a little every day.", "毎日少し勉強するようにしている。", "I try to", ["A little practice each day can help.", "毎日の少しずつの練習が役立つね。"]]
      ],
      teacher: ["I study Japanese for ten minutes after breakfast.", "私は朝食のあとに10分、日本語を勉強するよ。", "I read a short sentence and say it out loud.", "短い文を読んで、声に出すんだ。"]
    }
  ]
};
