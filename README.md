# My Phrase

スマホを中心に使う、英会話フレーズの練習用Webアプリです。

## ローカルで使う

`index.html` をブラウザで開きます。`phrase-library.js` と `assets/` は同じフォルダ構成で配置してください。

`beginner-dialogues.js` も同じフォルダに置いてください。練習の初期教材は、このファイルの12テーマ・36場面です。質問、返事、選択肢ごとの相づち、先生の話、聞き返したときの説明をセットで管理しています。未編集の旧教材はランダム練習から外し、フレーズ一覧と利用者が編集した会話は保持します。

## 教材とテスト

Node.jsが利用できる環境で実行します。追加パッケージは不要です。

```sh
node scripts/build-phrase-library.cjs
node scripts/build-phrase-library.cjs --check
node tests/practice.test.cjs
node scripts/build-static.cjs
```

教材の原本は `日常英会話フレーズ300選.md`、語句と翻訳の例は `scripts/build-phrase-library.cjs` で管理します。

## 公開

配信対象は `dist/` のアプリ本体・教材データ・アイコン画像のみです。開発資料や原本、テスト、不要な画像は配信しません。

GitHubの `main` ブランチにpushすると、GitHub Actionsで教材の整合性確認・テスト・ビルドを実行し、成功した場合だけGitHub Pagesに公開します。

## 保存について

追加・編集した内容と学習記録は、利用しているブラウザの `localStorage` に保存されます。サーバーへの同期や、スマホとPCの自動共有はまだ実装していません。

ローカルHTMLと公開URLでは保存場所が異なります。公開URLを初めて開くと初期教材から始まり、既存のローカルデータは自動では移りません。
