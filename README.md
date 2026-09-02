# neMui Works

AIキャラクターチャット、物語、対話体験、Web制作などをまとめる
neMuiのポートフォリオサイトです。

- 公開サイト: https://nemuiaicontact-web.github.io/nemuicontact-web.github.io/
- デザイン: 黒背景＋黄色アクセント
- 公開方法: GitHub Pages

## サイト構成

現在のページは、上から次の順番で構成されています。

1. HOME — ロゴとメインビジュアル
2. ABOUT — neMuiの活動内容
3. WORKS — AIキャラクターチャット作品
4. LAB — Web実験と制作記録

LABは次の2カテゴリに分かれています。

- PROJECT — Webツール、UI、プロトタイプなど、実際に触れられるもの
- CASE STUDY — 制作裏話、対話設計、UI実験、制作プロセスなどの記録

SUPPORTや外部支援リンクは、現時点ではLABに含めていません。

## ファイルの役割

| ファイル | 役割 |
| --- | --- |
| `index.html` | ページ全体の構造と文章 |
| `style.css` | 色、文字サイズ、カード、スマホ表示などの見た目 |
| `works.js` | WORKSの作品データ、タグ絞り込み、スポイラー |
| `lab.js` | LABのPROJECT / CASE STUDYデータ |
| `assets/` | ロゴや作品サムネイルなどの画像 |

## WORKSへ作品を追加する

`works.js` の `works` 配列へ、次の形で追加します。

```js
{
  title: "作品タイトル",
  genres: ["恋愛", "BL"],
  platforms: [
    { name: "キャラぷ", url: "https://example.com/" }
  ],
  sensitive: false,
  image: "./assets/画像ファイル名.png",
  description: "作品の短い紹介文。"
}
```

センシティブ作品は、次の値に変更します。

```js
sensitive: true
```

これにより、該当作品のサムネイルへスポイラーが自動で表示されます。

## LABへ項目を追加する

`lab.js` の `labItems` 配列へ追加します。

```js
{
  category: "PROJECT",
  title: "プロジェクト名",
  description: [
    "説明の1行目。",
    "説明の2行目。"
  ],
  tags: ["WEB TOOL", "UI"],
  links: [
    {
      label: "OPEN PROJECT",
      url: "https://example.com/",
      external: true
    }
  ]
}
```

CASE STUDYの場合は、カテゴリを変更します。

```js
category: "CASE STUDY"
```

説明文を改行したい場合は、`description` の中へ1行ずつ追加します。

複数のリンクを表示したい場合は、`links` の中へリンクを追加します。

```js
links: [
  {
    label: "READ NOTE",
    url: "https://note.com/example/",
    external: true
  },
  {
    label: "VIEW ARCHIVE",
    url: "https://example.com/archive/",
    external: true
  }
]
```

サイト内のページへ移動させるリンクは、次のように指定します。

```js
{
  label: "OPEN PAGE",
  url: "./lab/example.html",
  external: false
}
```

## GitHub Pagesへ反映する

1. GitHubのリポジトリを開く
2. `Add file` → `Upload files` を選ぶ
3. 更新したファイルをアップロードする
4. `Commit changes` を押す
5. 数分待って公開サイトを再読み込みする

ZIPファイルはそのままアップロードせず、必ず展開して中のファイルを使います。

## 更新時のルール

サイトの機能、ファイル構成、編集方法を変更したときは、このREADMEも同時に更新します。
主な変更は、下の更新履歴へ日付と内容を追記します。

## 更新履歴

### 2026-09-02

- LABセクションを追加
- LABをPROJECT / CASE STUDYの2カテゴリに分割
- `lab.js` によるデータ管理を追加
- WORKSのタグ絞り込みとセンシティブ作品スポイラーを実装
- プラットフォームリンクをチップ表示に変更
- 日本語フォントをNoto Sans JPへ変更
- READMEをサイト運用ガイドとして更新
- LABの説明文の改行と複数リンクに対応
