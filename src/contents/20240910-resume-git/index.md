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





