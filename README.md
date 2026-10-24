# My Phrase

スマホを中心に使う、英会話フレーズの練習用Webアプリです。

## ローカルで使う

`index.html` をブラウザで開きます。`phrase-library.js` と `assets/` は同じフォルダ構成で配置してください。

`beginner-dialogues.js` も同じフォルダに置いてください。練習の初期教材は、このファイルの12テーマ・36場面です。質問、返事、選択肢ごとの相づち、先生の話、聞き返したときの説明をセットで管理しています。未編集の旧教材はランダム練習から外し、フレーズ一覧と利用者が編集した会話は保持します。

Excelのフレーズ用の `phrase-additions.js` も必要です。一覧は指定された `日常会話フレーズ_追加100.xlsx` のNo.101〜200の100件だけで構成します。旧307件・398件の一覧には追加せず、一度だけ全件を置き換えます。「厳選100」や「最近学んだ表現」は含めません。英語が一致する項目の学習記録だけを引き継ぎ、訳・カテゴリ・例文は指定Excelを優先します。置き換え後の追加・編集・削除は再読込しても保持します。練習の会話セットは今回変更していません。

## 教材とテスト

Node.jsが利用できる環境で実行します。追加パッケージは不要です。

```sh
node scripts/build-phrase-library.cjs
node scripts/build-phrase-library.cjs --check
node scripts/build-phrase-additions.cjs --check
node tests/practice.test.cjs
node scripts/build-static.cjs
```

教材の原本は `日常英会話フレーズ300選.md`、語句と翻訳の例は `scripts/build-phrase-library.cjs` で管理します。

一覧の原本は `日常会話フレーズ_追加100.xlsx` です。Python標準ライブラリだけで `python scripts/import-phrase-workbook.py 日常会話フレーズ_追加100.xlsx` を実行し、`data/phrase-additions.json` を更新できます。`--check` を付けるとExcelとの一致だけを検証します。続いて `node scripts/build-phrase-additions.cjs` で配信用データを生成します。置き換え済みの端末内フラグは `my-phrase-workbook-replacement-20261024-v1` です。置き換え前の一覧は `my-phrase-before-workbook-replacement-20261024-v1` に退避し、通常の一覧・検索には出しません。将来別の教材に置き換える場合は、データとこのフラグを更新してください。Excel自体はGitに含めません。

## 公開

配信対象は `dist/` のアプリ本体・教材データ・アイコン画像のみです。開発資料や原本、テスト、不要な画像は配信しません。

GitHubの `main` ブランチにpushすると、GitHub Actionsで教材の整合性確認・テスト・ビルドを実行し、成功した場合だけGitHub Pagesに公開します。

## 保存について

追加・編集した内容と学習記録は、利用しているブラウザの `localStorage` に保存されます。サーバーへの同期や、スマホとPCの自動共有はまだ実装していません。

ローカルHTMLと公開URLでは保存場所が異なります。公開URLを初めて開くと初期教材から始まり、既存のローカルデータは自動では移りません。
