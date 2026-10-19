const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.join(__dirname, '..');
const input = fs.readFileSync(path.join(root, '日常英会話フレーズ300選.md'), 'utf8');

// Each pair is a complete English slot (including -ing) and its Japanese equivalent.
const fills = {
  8: [['my weekend', '週末'], ['my new job', '新しい仕事'], ['my trip', '旅行']],
  11: [['work', '仕事'], ['cooking', '料理'], ['my English class', '英語の授業']],
  12: [['my English', '自分の英語'], ['a new design', '新しいデザイン'], ['a small project', '小さなプロジェクト']],
  13: [['cooking', '料理を'], ['reading', '読書を'], ['walking', '散歩を']],
  19: [['my new job', '新しい仕事'], ['speaking English', '英語を話すこと'], ['getting up early', '早起き']],
  20: [['read', '読書'], ['walk', '散歩'], ['cook', '料理']],
  21: [['visited my family', '家族を訪ね'], ['went to the park', '公園に行き'], ['watched a movie', '映画を観']],
  22: [['reading', '読書'], ['cooking', '料理'], ['walking', '散歩']],
  24: [['my sister', '姉'], ['a friend', '友人'], ['my family', '家族']],
  25: [['a new cafe', '新しいカフェ'], ['a small museum', '小さな美術館'], ['the new park', '新しい公園']],
  27: [['read a book', '本を読む'], ['cook dinner', '夕食を作る'], ['take a walk', '散歩する']],
  28: [['staying home', '家で過ごす'], ['watching a movie', '映画を観る'], ['cooking dinner', '夕食を作る']],
  31: [['two', '2'], ['three', '3'], ['five', '5']],
  32: [['Friday', '金曜日'], ['Saturday', '土曜日'], ['Sunday', '日曜日']],
  33: [['a cafe', 'カフェ'], ['the park', '公園'], ['the station', '駅']],
  34: [['a friend', '友人'], ['my brother', '兄'], ['my family', '家族']],
  36: [['an old friend', '昔からの友人'], ['my sister', '姉'], ['a coworker', '同僚']],
  37: [['the station', '駅'], ['my home', '自宅'], ['the park', '公園']],
  38: [['two', '2'], ['three', '3'], ['four', '4']],
  39: [['noon', 'お昼'], ['three', '3'], ['six', '6']],
  41: [['had breakfast', '朝食を食べ'], ['left home', '家を出'], ['called a friend', '友人に電話し']],
  42: [['went shopping', '買い物に行き'], ['took a walk', '散歩し'], ['met my family', '家族に会い']],
  43: [['had lunch', '昼食を食べ'], ['went home', '家に帰り'], ['watched a movie', '映画を観']],
  44: [['had breakfast', '朝食を食べ'], ['checked the time', '時間を確認し'], ['called my friend', '友人に電話し']],
  45: [
    [['cooking', '料理を'], ['something funny', '面白いこと']],
    [['walking', '散歩を'], ['something strange', '不思議なこと']],
    [['shopping', '買い物を'], ['something nice', 'うれしいこと']]
  ],
  46: [['my friend called me', '友人から電話があり'], ['I saw my family', '家族に会い'], ['it started raining', '雨が降り始め']],
  47: [['it was easy', '簡単だ'], ['the shop was closed', '店が閉まっている'], ['I was late', '遅刻した']],
  48: [['something funny', '面白いこと'], ['something nice', 'うれしいこと'], ['something strange', '不思議なこと']],
  49: [['went home', '家に帰り'], ['took a break', '休憩し'], ['went to bed', '寝']],
  51: [
    [['learn to cook', '料理を学ぶ'], ['I like food', '食べ物が好きだ']],
    [['make pasta', 'パスタを作る'], ['it looked easy', '簡単そうだった']],
    [['bake bread', 'パンを焼く'], ['my friend enjoys it', '友人が楽しんでいる']]
  ],
  52: [['the price', '値段'], ['the weather', '天気'], ['my friend', '友人']],
  54: [['a cooking class', '料理教室'], ['a simple cookbook', '簡単な料理の本'], ['a cooking show', '料理番組']],
  55: [['a recipe', 'レシピ'], ['a cooking video', '料理の動画'], ['a cooking class', '料理教室']],
  56: [['a cooking class', '料理教室'], ['a new recipe', '新しいレシピ'], ['a cookbook', '料理の本']],
  57: [['cooking', '料理'], ['this book', 'この本'], ['that cafe', 'あのカフェ']],
  58: [['my friend called me', '友人から電話があったこと'], ['I saw a video', '動画を観たこと'], ['I tried a new recipe', '新しいレシピを試したこと']],
  59: [['cook', '料理をし'], ['make pasta', 'パスタを作り'], ['bake bread', 'パンを焼き']],
  60: [['tried it', '試し'], ['asked a friend', '友人に聞き'], ['made a plan', '計画を立て']],
  62: [['design', 'デザイン'], ['the website', 'ウェブサイト'], ['the new project', '新しいプロジェクト']],
  63: [['website', 'ウェブサイト'], ['poster', 'ポスター'], ['product', '製品']],
  65: [['a new project', '新しいプロジェクト'], ['the website', 'ウェブサイト'], ['our plans', '自分たちの計画']],
  66: [['the plan', '計画'], ['the design', 'デザイン'], ['the date', '日程']],
  67: [['the website', 'ウェブサイト'], ['the design', 'デザイン'], ['my work', '仕事']],
  71: [['a poster', 'ポスター'], ['a logo', 'ロゴ'], ['a website', 'ウェブサイト']],
  72: [['a small table', '小さなテーブル'], ['a bag', 'バッグ'], ['a website', 'ウェブサイト']],
  75: [['the design', 'デザイン'], ['the letters', '文字'], ['the pictures', '絵']],
  76: [['simple', 'シンプル'], ['colorful', 'カラフル'], ['modern', '現代的']],
  78: [['the colors', '色'], ['the design', 'デザイン'], ['the size', '大きさ']],
  81: [['cooking', '料理'], ['reading', '読書'], ['drawing', '絵を描くこと']],
  82: [['reading', '読書'], ['cooking', '料理'], ['drawing', '絵を描くこと']],
  83: [['bread', 'パン'], ['small bags', '小さなバッグ'], ['simple games', '簡単なゲーム']],
  84: [['yoga', 'ヨガ'], ['baking', 'パン作り'], ['painting', '絵を描くこと']],
  85: [['cook', '料理'], ['draw', '絵'], ['play the guitar', 'ギター']],
  86: [['cooking', '料理'], ['drawing', '絵を描くことを'], ['making things', 'もの作りを']],
  91: [['an art show', '作品展'], ['a local fair', '地元のイベント'], ['a craft market', '手作り市']],
  92: [['a local fair', '地元のイベント'], ['an art show', '作品展'], ['a craft market', '手作り市']],
  95: [['my game', '自作のゲーム'], ['my bread', '自作のパン'], ['my app', '自作のアプリ']],
  102: [['my family', '家族'], ['an old friend', '昔からの友人'], ['my sister', '姉']],
  105: [['a cafe', 'カフェ'], ['the park', '公園'], ['the beach', '海辺']],
  106: [['My sister', '姉'], ['A friend', '友人'], ['My neighbor', '近所の人']],
  108: [
    [['my sister', '姉'], ['her homework', '宿題']],
    [['a friend', '友人'], ['cooking', '料理']],
    [['my father', '父'], ['shopping', '買い物']]
  ],
  112: [['pasta', 'パスタ'], ['curry', 'カレー'], ['soup', 'スープ']],
  113: [['pasta', 'パスタ'], ['chicken', '鶏肉'], ['soup', 'スープ']],
  116: [['bread', 'パン'], ['curry', 'カレー'], ['pasta', 'パスタ']],
  117: [['the station', '駅'], ['my home', '自宅'], ['the park', '公園']],
  118: [['rice', 'ご飯'], ['vegetables', '野菜'], ['fish', '魚']],
  121: [['book', '本'], ['bag', 'バッグ'], ['lamp', 'ランプ']],
  130: [['a new bag', '新しいバッグ'], ['a book', '本'], ['a new phone', '新しい携帯電話']],
  138: [['fifteen', '15'], ['thirty', '30'], ['forty-five', '45']],
  141: [['a funny movie', '面白い映画'], ['a cooking show', '料理番組'], ['an old movie', '昔の映画']],
  143: [['a short story', '短い物語'], ['a new book', '新しい本'], ['a novel', '小説']],
  145: [['the music', '音楽'], ['the ending', '結末'], ['the funny scenes', '面白い場面']],
  147: [['my hometown', '故郷'], ['my family', '家族'], ['an old friend', '昔からの友人']],
  150: [['this movie', 'この映画'], ['that show', 'あの番組'], ['this new series', 'この新しいシリーズ']],
  151: [['walking', '散歩'], ['walking after dinner', '夕食後の散歩'], ['walking with a friend', '友人との散歩']],
  154: [['take a walk', '散歩する'], ['drink water', '水を飲む'], ['bring my shoes', '靴を持ってくる']],
  155: [['walking up hills', '坂道を歩くこと'], ['walking longer', '長く歩くこと'], ['walking fast', '速く歩くこと']],
  158: [['staying up late', '夜更かし'], ['drinking coffee at night', '夜にコーヒーを飲むこと'], ['eating late', '遅い時間の食事']],
  162: [['bring my keys', '鍵を持ってくる'], ['charge my phone', '携帯電話を充電する'], ['send an email', 'メールを送る']],
  163: [['lost my ticket', 'チケットをなくして'], ['broke a cup', 'カップを割って'], ['deleted a photo', '写真を消して']],
  173: [['an old friend', '昔からの友人'], ['so many people', 'たくさんの人'], ['a new shop', '新しい店']],
  174: [['the shop was closed', '店が休み'], ['my friend was there', '友人がそこにいた'], ['it was free', '無料']],
  175: [['it was free', '無料'], ['my friend knew him', '友人が彼を知っていた'], ['the shop was open', '店が開いていた']],
  179: [['we had the same bag', '同じバッグを持っていた'], ['we both forgot', '二人とも忘れていた'], ['I was at the wrong cafe', '違うカフェにいた']],
  186: [['the food', '食事'], ['the music', '音楽'], ['the walk', '散歩']],
  187: [['the food', '食事'], ['the music', '音楽'], ['meeting new people', '新しい人に会うこと']],
  188: [['getting up early', '早起き'], ['finding the place', '場所を見つけること'], ['speaking English', '英語を話すこと']],
  193: [['the weather', '天気'], ['the price', '値段'], ['my English', '自分の英語']],
  196: [['the slow train', '遅い電車'], ['my computer', '自分のパソコン'], ['the long wait', '長い待ち時間']],
  197: [['being late', '遅刻したこと'], ["forgetting my friend's name", '友人の名前を忘れたこと'], ['breaking the cup', 'カップを割ったこと']],
  198: [['my friend came', '友人が来たこと'], ['everyone liked it', 'みんなが気に入ってくれたこと'], ['the weather was nice', '天気がよかったこと']],
  199: [['happy', 'うれしい'], ['calm', '落ち着いた'], ['excited', 'ワクワクした']],
  201: [
    [['Online shopping', 'ネットでの買い物'], ['shopping in stores', 'お店での買い物']],
    [['Shopping in stores', 'お店での買い物'], ['shopping online', 'ネットでの買い物']],
    [['A small shop', '小さなお店'], ['a big shop', '大きなお店']]
  ],
  202: [['expensive', '高価'], ['useful', '便利'], ['fun', '楽しい']],
  203: [['expensive', '高価'], ['busy', '混んでいる'], ['difficult', '難しい']],
  204: [['my old job', '前の仕事'], ['my hometown', '故郷'], ['the photo', '写真']],
  205: [['a small shop', '小さなお店'], ['a cafe', 'カフェ'], ['much quieter', 'ずっと静か']],
  207: [['warmer', '暖かく'], ['colder', '寒く'], ['easier', '簡単']],
  208: [
    [['shopping online', 'ネットでの買い物'], ['shopping in stores', 'お店での買い物']],
    [['shopping in stores', 'お店での買い物'], ['shopping online', 'ネットでの買い物']],
    [['small shops', '小さなお店'], ['big shops', '大きなお店']]
  ],
  209: [['the price', '値段'], ['the size', '大きさ'], ['the color', '色']],
  211: [['practice helps', '練習は役に立つ'], ['small steps help', '小さな一歩は役に立つ'], ['rest is important', '休息は大切だ']],
  212: [['family', '家族'], ['free time', '自由な時間'], ['health', '健康']],
  213: [['quality', '品質'], ['the price', '値段'], ['saving time', '時間を節約すること']],
  214: [['brands', 'ブランド'], ['the color', '色'], ['the box', '箱']],
  215: [['the price', '値段'], ['the time', '時間'], ['the size', '大きさ']],
  217: [['I need more time', 'もっと時間が必要です'], ['the price is high', '値段が高いです'], ['I want to try', 'やってみたいです']],
  218: [['English was hard', '英語は難しい'], ['cooking was easy', '料理は簡単'], ['I had no time', '自分には時間がない']],
  219: [['practice helps', '練習は役に立つ'], ['rest is important', '休息は大切だ'], ['I can do it', '自分にもできる']],
  221: [['practice helps', '練習は役に立つ'], ['I need more rest', 'もっと休息が必要だ'], ['small steps help', '小さな一歩は役に立つ']],
  222: [['planning helps', '計画は役に立つ'], ['it is okay to ask', '質問してもいい'], ['small steps matter', '小さな一歩が大切だ']],
  223: [['the cafe was open', 'カフェが開いていた'], ['the class was free', '授業が無料'], ['my friend lived nearby', '友人が近くに住んでいた']],
  224: [['my future', '将来'], ['my family', '家族'], ['my health', '健康']],
  225: [['studying alone', '一人で勉強すること'], ['working at home', '家で働くこと'], ['getting up early', '早起き']],
  227: [['learning English', '英語を学ぶこと'], ['my work', '自分の仕事'], ['daily life', '毎日の生活']],
  230: [['check my bag', 'バッグを確認'], ['make a plan', '計画を立て'], ['ask for help', '助けを求め']],
  231: [['speak English every day', '毎日英語を話す'], ['learn ten new words', '新しい単語を10個覚える'], ['speak more clearly', 'もっとはっきり話す']],
  232: [['English', '英語'], ['speaking', '話すこと'], ['listening', '聞くこと']],
  233: [['practice English today', '今日英語を練習'], ['talk to a friend', '友人と話'], ['learn a new phrase', '新しいフレーズを学']],
  234: [['yoga', 'ヨガ'], ['painting', '絵を描くこと'], ['baking bread', 'パン作り']],
  235: [
    [['practice English', '英語を練習'], ['week', '週']],
    [['take a class', '授業に参加'], ['month', '月']],
    [['visit America', 'アメリカを訪問'], ['year', '年']]
  ],
  236: [['my English', '自分の英語'], ['my speaking', '話す力'], ['my listening', '聞く力']],
  242: [['yoga', 'ヨガ'], ['cooking curry', 'カレー作り'], ['painting', '絵を描くこと']],
  248: [['walking', '散歩'], ['cooking', '料理'], ['reading', '読書']],
  249: [['this cafe', 'このカフェ'], ['this book', 'この本'], ['this park', 'この公園']],
  250: [['your town', 'あなたの町'], ['your hobbies', 'あなたの趣味'], ['your work', 'あなたの仕事']],
  273: [["'fresh'", 'fresh'], ["'nearby'", 'nearby'], ["'tasty'", 'tasty']],
  274: [["'arigato'", 'ありがとう'], ["'oishii'", 'おいしい'], ["'ohayo'", 'おはよう']],
  276: [['the new cafe', '新しいカフェ'], ['this weekend', '今週末'], ['the shop near the station', '駅の近くのお店']],
  284: [['I need more time', 'もっと時間が必要'], ['I like both', 'どちらも好き'], ['I want to try again', 'もう一度試したい']],
  287: [
    [['Saturday', '土曜日'], ['Sunday', '日曜日']],
    [['the park', '公園'], ['the station', '駅']],
    [['tea', '紅茶'], ['coffee', 'コーヒー']]
  ],
  288: [['a small cafe', '小さなカフェ'], ['a short story', '短い物語'], ['a simple game', '簡単なゲーム']],
  295: [['speaking', '話すこと'], ['listening', '聞くこと'], ['English', '英語']]
};

// Japanese word order and verb endings cannot be inferred from the English slots.
const japaneseOverrides = {
  21: ['先週末、家族を訪ねました。', '先週末、公園に行きました。', '先週末、映画を観ました。'],
  27: ['ようやく本を読む時間ができました。', 'ようやく夕食を作る時間ができました。', 'ようやく散歩する時間ができました。'],
  28: ['結局家で過ごすことになりました。', '結局映画を観ることになりました。', '結局夕食を作ることになりました。'],
  39: ['お昼ごろ着きました。', '3時ごろ着きました。', '6時ごろ着きました。'],
  41: ['まず朝食を食べました。', 'まず家を出ました。', 'まず友人に電話しました。'],
  42: ['それから買い物に行きました。', 'それから散歩しました。', 'それから家族に会いました。'],
  43: ['その後昼食を食べました。', 'その後家に帰りました。', 'その後映画を観ました。'],
  44: ['その前に朝食を食べました。', 'その前に時間を確認しました。', 'その前に友人に電話しました。'],
  46: ['そこに着くとすぐ友人から電話がありました。', 'そこに着くとすぐ家族に会いました。', 'そこに着くとすぐ雨が降り始めました。'],
  49: ['最終的に家に帰りました。', '最終的に休憩しました。', '最終的に寝ました。'],
  51: ['食べ物が好きなので料理を学ぶことにしました。', '簡単そうだったのでパスタを作ることにしました。', '友人が楽しんでいるのでパンを焼くことにしました。'],
  59: ['ずっと料理をしたいと思っていました。', 'ずっとパスタを作りたいと思っていました。', 'ずっとパンを焼きたいと思っていました。'],
  60: ['だから試しました。', 'だから友人に聞きました。', 'だから計画を立てました。'],
  86: ['料理する過程が好きです。', '絵を描く過程が好きです。', 'ものを作る過程が好きです。'],
  154: ['ときどき散歩するのを忘れます。', 'ときどき水を飲むのを忘れます。', 'ときどき靴を持ってくるのを忘れます。'],
  158: ['夜更かしをやめました。', '夜にコーヒーを飲むのをやめました。', '遅い時間に食事をするのをやめました。'],
  162: ['鍵を持ってくるのを忘れました。', '携帯電話を充電するのを忘れました。', 'メールを送るのを忘れました。'],
  163: ['うっかりチケットをなくしてしまいました。', 'うっかりカップを割ってしまいました。', 'うっかり写真を消してしまいました。'],
  174: ['店が休みだとは知りませんでした。', '友人がそこにいたとは知りませんでした。', '無料だとは知りませんでした。'],
  175: ['結果的に無料だとわかりました。', '結果的に友人が彼を知っていたとわかりました。', '結果的に店が開いていたとわかりました。'],
  179: ['面白いことに、同じバッグを持っていたんです。', '面白いことに、二人とも忘れていたんです。', '面白いことに、違うカフェにいたんです。'],
  199: ['それでうれしい気持ちになりました。', 'それで気持ちが落ち着きました。', 'それでワクワクしました。'],
  203: ['思ったほど高くありません。', '思ったほど混んでいません。', '思ったほど難しくありません。'],
  211: ['練習は役に立つと考えています。', '小さな一歩は役に立つと考えています。', '休息は大切だと考えています。'],
  218: ['以前は英語は難しいと思っていました。', '以前は料理は簡単だと思っていました。', '以前は自分には時間がないと思っていました。'],
  219: ['今は練習が役に立つと思います。', '今は休息が大切だと思います。', '今は自分にもできると思います。'],
  221: ['練習は役に立つと気づきました。', 'もっと休息が必要だと気づきました。', '小さな一歩は役に立つと気づきました。'],
  222: ['計画は役に立つと学びました。', '質問してもいいと学びました。', '小さな一歩が大切だと学びました。'],
  223: ['カフェが開いていたとわかりました。', '授業が無料だとわかりました。', '友人が近くに住んでいたとわかりました。'],
  230: ['次はバッグを確認します。', '次は計画を立てます。', '次は助けを求めます。'],
  231: ['目標は毎日英語を話すことです。', '目標は新しい単語を10個覚えることです。', '目標はもっとはっきり話すことです。'],
  233: ['今日英語を練習できたらと思っています。', '友人と話せたらと思っています。', '新しいフレーズを学べたらと思っています。'],
  235: ['来週は英語を練習する予定です。', '来月は授業に参加する予定です。', '来年はアメリカを訪問する予定です。']
};

let category = '';
const rows = [];
for (const line of input.split(/\r?\n/)) {
  if (line.startsWith('## ')) category = line.replace(/^## \d+\.\s*/, '');
  if (!line.startsWith('| ')) continue;
  const cells = line.split('|').slice(1, -1).map(value => value.trim());
  if (cells.length !== 2 || cells[0] === '英語') continue;
  rows.push({ number: rows.length + 1, en: cells[0], ja: cells[1], category });
}
if (rows.length !== 300) throw new Error(`Expected 300 source rows; found ${rows.length}`);
const catalog = rows.map(row => {
  const markers = [...row.en.matchAll(/[○△]+(?:ing)?/g)];
  if (markers.length && !fills[row.number]) throw new Error(`Missing slot examples for ${row.number}: ${row.en}`);
  const variants = markers.length ? fills[row.number] : [null];
  const examples = variants.map((variant, index) => {
    const slots = variant === null ? [] : Array.isArray(variant[0]) ? variant : [variant];
    if (slots.length !== markers.length) throw new Error(`Wrong slot count for ${row.number}`);
    const parts = [];
    let offset = 0;
    markers.forEach((marker, slotIndex) => {
      if (marker.index > offset) parts.push({ text: row.en.slice(offset, marker.index), variable: false });
      parts.push({ text: slots[slotIndex][0], variable: true });
      offset = marker.index + marker[0].length;
    });
    if (offset < row.en.length) parts.push({ text: row.en.slice(offset), variable: false });
    const english = parts.map(part => part.text).join('');
    const queues = new Map();
    markers.forEach((marker, i) => {
      const symbol = marker[0].replace(/ing$/, '');
      if (!queues.has(symbol)) queues.set(symbol, []);
      queues.get(symbol).push(slots[i][1]);
    });
    if (row.number === 235) queues.get('○○').reverse();
    const japanese = japaneseOverrides[row.number]?.[index] || row.ja.replace(/[○△]+/g, marker => queues.get(marker)?.shift() ?? marker);
    if (/[○△]/.test(english + japanese)) throw new Error(`Unfilled placeholder: ${row.number}`);
    return { id: `source-${row.number}-${index}`, text: english, ja: japanese, parts };
  });
  return { ...row, id: crypto.createHash('sha256').update(row.en).digest('hex').slice(0, 12), examples };
});
const output = '// Generated from 日常英会話フレーズ300選.md by scripts/build-phrase-library.cjs.\n'
  + 'globalThis.PHRASE_LIBRARY = ' + JSON.stringify(catalog, null, 2) + ';\n';
const target = path.join(root, 'phrase-library.js');
if (process.argv.includes('--check')) {
  if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== output) throw new Error('phrase-library.js is out of date');
} else {
  fs.writeFileSync(target, output, 'utf8');
}
console.log(`${catalog.length} source phrases; ${catalog.reduce((n, row) => n + row.examples.length, 0)} complete examples`);
