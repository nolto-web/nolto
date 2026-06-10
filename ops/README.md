# NOLTO Ops - 運用ダッシュボード

NOLTOを継続運用するための静的Webアプリです。

## できること

- 週次チェックリスト
- 月次チェックリスト
- note記事メモ管理
- 無料テンプレート管理
- Analytics / Search Console の数字メモ
- X投稿の予定・スレッド本文・投稿URL・反応メモ管理
- 次にやること管理
- JSONバックアップ / 読み込み

## 使い方

1. このフォルダをそのまま開く
2. `index.html` をブラウザで開く
3. 入力・チェックする
4. 必要に応じて「JSONを書き出す」でバックアップする

## NOLTOサイトに置く場合

NOLTOのサイトフォルダに `ops` フォルダとして配置できます。

例：

```text
ai-syuukyaku-lp/
├─ index.html
├─ records.html
├─ templates.html
└─ ops/
   ├─ index.html
   ├─ style.css
   └─ app.js
```

公開URL：

```text
https://friendly-toffee-1c8e33.netlify.app/ops/
```

## 注意

このアプリはブラウザの localStorage に保存します。
サーバーには保存されません。

ただし、Netlifyにアップロードすると画面自体は公開されます。
個人情報や機密情報は入力しないでください。

URLを人に見せたくない場合は、ローカルPCで `index.html` を開いて使ってください。


## SNS投稿管理

`SNS投稿管理` セクションでは、Xに投稿するスレッドを管理できます。

- 下書き
- 投稿予定
- 投稿済み
- 反応確認済み

投稿本文は `---` で区切ると、スレッドごとの区切りとして使いやすくなります。
投稿後は、投稿URL、投稿日、反応メモを追記してください。
