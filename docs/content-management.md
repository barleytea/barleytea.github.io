# コンテンツ管理

## 記事作成ガイド

### ディレクトリ構造
```
src/contents/
├── YYYYMMDD-article-slug/
│   ├── index.md           # 記事本文
│   ├── eyecatcher.png     # アイキャッチ画像（オプション）
│   └── image1.png         # 記事内画像（オプション）
└── another-article/
    └── index.md
```

### ファイル命名規則
- **ディレクトリ名**: `YYYYMMDD-article-slug` 形式
  - 例: `20220111-java8-exponential-backoff-retry`
- **記事ファイル**: `index.md` 固定
- **画像ファイル**: 小文字英数字、ハイフン区切り

## Frontmatter 仕様

### 必須フィールド
```yaml
---
title: "記事タイトル"
created: "2022-01-11"
path: "/article-path"
category: "Tech"
---
```

### オプションフィールド
```yaml
---
eyecatcher: "./eyecatcher.png"    # アイキャッチ画像
tags: ["Java", "Spring"]          # タグ配列
draft: true                       # 下書きフラグ
---
```

### フィールド詳細

#### title（必須）
- **型**: String
- **説明**: 記事タイトル
- **例**: `"Java8 で Exponential Backoff な retry を実装してみる"`

#### created（必須）
- **型**: String (YYYY-MM-DD)
- **説明**: 記事作成日
- **例**: `"2022-01-11"`

#### path（必須）
- **型**: String
- **説明**: 記事のURLパス（先頭に/を付ける）
- **例**: `"/java8-exponential-backoff-retry"`

#### category（必須）
- **型**: String
- **説明**: 記事カテゴリ
- **使用可能値**: `"Tech"`, `"About Me"`

#### eyecatcher（オプション）
- **型**: String
- **説明**: アイキャッチ画像の相対パス
- **例**: `"./eyecatcher.png"`

#### tags（オプション）
- **型**: Array[String]
- **説明**: 記事に付けるタグ
- **例**: `["Java", "Spring", "並行処理"]`

#### draft（オプション）
- **型**: Boolean
- **説明**: 下書きフラグ（trueで非公開）
- **デフォルト**: false

## Markdown 記法

### 基本記法
```markdown
# 見出し1
## 見出し2
### 見出し3

**太字**
*斜体*

- リスト項目1
- リスト項目2

1. 番号付きリスト1
2. 番号付きリスト2

[リンクテキスト](https://example.com)
```

### 目次生成
```markdown
## 目次

\`\`\`toc
\`\`\`
```
※ h2〜h6要素から自動生成

### コードブロック
````markdown
```javascript
const hello = "world";
console.log(hello);
```

```java:title=RetryCommand.java
public class RetryCommand {
    // コード内容
}
```
````

### 画像挿入
```markdown
![代替テキスト](./image.png)
```
- 相対パス指定
- 自動的にWebP変換・最適化

### テーブル
```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| データ1 | データ2 | データ3 |
```

## 文章校正ルール

### textlint 設定
**ファイル**: `.textlintrc.json`

### 主要ルール

#### 日本語表記
- **ja-hiragana-hojodoushi**: ひらがな補助動詞の統一
- **ja-no-mixed-period**: 句読点の統一
- **ja-no-redundant-expression**: 冗長表現の検出
- **ja-space-around-code**: コード周りのスペース

#### 技術文書
- **spellcheck-tech-word**: 技術用語のスペルチェック
- **terminology**: 用語の統一
- **sentence-length**: 文章長（最大150文字）

#### その他
- **max-kanji-continuous-len**: 漢字連続（最大8文字）
- **no-doubled-joshi**: 助詞の重複チェック

### 校正コマンド
```bash
# 文章校正チェック
yarn lint

# 自動修正
yarn lintfix
```

## 画像管理

### 画像形式
- **推奨形式**: PNG, JPEG
- **サイズ制限**: 特になし（自動最適化）
- **命名**: 小文字英数字、ハイフン区切り

### アイキャッチ画像
- **サイズ推奨**: 1200x630px (OGP最適)
- **ファイル名**: `eyecatcher.png` 推奨
- **配置**: 記事ディレクトリ直下

### 記事内画像
- **配置**: 記事ディレクトリ内
- **参照**: Markdown内で相対パス指定
- **最適化**: Gatsby が自動実行

### 画像最適化機能
- **WebP変換**: 自動的に次世代フォーマットに変換
- **レスポンシブ**: デバイスサイズに応じた配信
- **遅延読み込み**: スクロール時の段階的読み込み

## SEO最適化

### メタデータ自動生成
- **title**: frontmatter の title
- **description**: 記事の最初の段落から自動抽出
- **og:image**: eyecatcher 画像
- **canonical**: サイトURL + path

### サイトマップ
- **自動生成**: `sitemap.xml`
- **更新**: ビルド時に自動更新
- **除外**: draft: true の記事は除外

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://barlog.tech/sitemap.xml
```

## カテゴリ・タグ管理

### カテゴリ
- **Tech**: 技術記事
- **About Me**: 個人的な記事

### タグ
**現在使用中のタグ**:
- プログラミング言語: Java, Go, Rust
- フレームワーク: Spring
- ツール: GitHub Actions, Google Apps Script
- 概念: 並行処理
- その他: MacOS, Notion, textlint, dotfiles

### タグ追加時の注意
1. 既存タグとの重複確認
2. 表記の統一（大文字小文字、スペース）
3. 日本語・英語の使い分け

## コンテンツ品質管理

### 執筆チェックリスト
- [ ] frontmatter の必須項目記入
- [ ] 目次の設置（長い記事の場合）
- [ ] コードブロックのタイトル設定
- [ ] 画像の代替テキスト設定
- [ ] textlint チェック実行
- [ ] プレビューでの表示確認

### 公開前チェック
- [ ] draft フラグの削除
- [ ] リンクの動作確認
- [ ] 画像の表示確認
- [ ] レスポンシブ表示の確認
- [ ] タイポ・誤字の最終チェック

## バックアップ・管理

### Git管理
- **バージョン管理**: Git によるバージョン履歴
- **ブランチ**: feature ブランチでの執筆推奨
- **コミット**: 記事単位でのコミット

### 記事の更新
1. 該当記事ファイルを編集
2. frontmatter の updated フィールド追加（オプション）
3. Git コミット・プッシュ
4. 自動デプロイ実行

### 記事の削除
1. 記事ディレクトリを削除
2. 関連する内部リンクの確認・修正
3. リダイレクト設定（必要に応じて）

### アーカイブ管理
- **下書き保存**: draft: true でのアーカイブ
- **非公開化**: frontmatter での管理
- **物理削除**: Git 履歴には残る