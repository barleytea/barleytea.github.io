---
title: "職務経歴書を GitHub で管理し CI を回す"
created: "2024-09-10"
path: "/resume-git"
eyecatcher: "../../images/barleytea.png"
tags: ["職務経歴書", "GitHub Actions", "textlint"]
---

```toc
```

いざ必要になってから更新しようとするとまごついてしまうのが職務経歴書というもの。CI を回すことで更新→提出までをスムーズに行うことができるようになった。

トピックとしては N 番煎じではあるけれども、自分で実践した結果ワークしているので記録として残しておく。

## TL;DL

* 履歴書をマークダウンで記述して GitHub で管理するようにした
* GitHub Pages を利用して職務経歴書を Web ページとして公開した
* GitHub Actions を利用して下記の自動化を実現した
    * textlint/markdownlint による文法・誤字脱字のチェック
    * マークダウンファイル → PDF ファイルへの変換・アップロード
    * 履歴書 PDF のバージョン管理


## 成果物

* [GitHub Repository](https://github.com/barleytea/barleytea)
* [PDF Download](https://github.com/barleytea/barleytea/releases)
* [Web Page](https://barlog.tech/barleytea/)

## 1. マークダウンファイルを作成する

GitHub Pages を利用して Web ページとして公開するため、プロジェクトルートに `docs` ディレクトリを作成してそこに `README.md` を作成する。

最も難しい部分である「職務経歴書」の内容については本記事では触れないので、各自で調べて書き上げること（これに関しては誰か教えてほしい）。

## 2. Lint を導入する

職務経歴書をマークダウンで書くことのメリットの一つは、機械的に Lint をかけられるようになるという点だ。
これにより誤字脱字や技術用語のミススペル（大文字・小文字など）を防ぐことができる。

### textlint を導入する

```sh
npm install --save-dev textlint
```

#### textlint のルールを設定する

WIP

### markdownlint を導入する

```sh
npm install --save-dev markdownlint-cli
```

#### markdownlint のルールを設定する

WIP

### Lint 用のコマンドを設定する

```json:package.json
"scripts": {
    "lint": "textlint -c ./config/.textlintrc . && markdownlint -c ./config/.markdownlint.jsonc docs/*.md",
    "lintfix": "textlint --fix -c ./config/.textlintrc . && markdownlint -c ./config/.markdownlint.jsonc docs/*.md",
},
```

#### 実行

```sh
npm run lint
```

または

```sh
npm run lintfix
```

### PDF ファイルへの変換

実際に職務経歴書を提出する際には PDF 形式が望ましい場合が多い。  
そこで [md-to-pdf](https://github.com/simonhaenisch/md-to-pdf) を利用して Markdown から PDF に変換できるようにする。

#### md-to-pdf の導入手順

1. インストール

    ```sh
    npm install --save-dev md-to-pdf
    ```

1. プロジェクト直下に pdf-configs フォルダを作成し、`config.js` と `style.css` を作成する

    - 設定例:

        - [config.js](https://github.com/barleytea/barleytea/blob/main/pdf-configs/config.js)
        - [style.css](https://github.com/barleytea/barleytea/blob/main/pdf-configs/style.css)

1. `package.json` に Markdown → PDF 変換用のコマンドを設定する

    ```json:package.json
    "scripts": {
        ... 中略
        "build:pdf": "md-to-pdf docs/README.md --config-file ./pdf-configs/config.js"
    },
    ```

1. 実行

```sh
npm run build:pdf
```

### GitHub Actions の設定

WIP

### 履歴書への対応

WIP
