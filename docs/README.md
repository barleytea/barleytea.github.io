# barlog.tech ブログシステム仕様書

## 概要

barlog.techは、Gatsbyを使用して構築された静的サイトジェネレーター（SSG）ベースのブログシステムです。ソフトウェア開発に関する技術記事を中心に、個人の学習記録やメモを公開するための個人ブログサイトです。

## 目次

- [システムアーキテクチャ](./architecture.md)
- [ブログ機能](./features.md)
- [デプロイメント](./deployment.md)
- [開発環境セットアップ](./development.md)
- [コンテンツ管理](./content-management.md)
- [技術記事執筆ワークフロー](./writing-guide.md)

## 基本情報

- **サイト名**: barlog.tech
- **サイトURL**: https://barlog.tech
- **フレームワーク**: Gatsby v5.12.4
- **言語**: TypeScript, React
- **スタイリング**: Tailwind CSS
- **ホスティング**: GitHub Pages
- **ドメイン**: barlog.tech
- **作者**: barleytea (@barlog_tech)

## プロジェクト構造

```
barleytea.github.io/
├── docs/                    # プロジェクト仕様書（本ディレクトリ）
├── src/                     # ソースコード
│   ├── components/          # Reactコンポーネント
│   ├── contents/           # ブログ記事（Markdown）
│   ├── images/             # サイトで使用する画像
│   ├── pages/              # 静的ページ
│   ├── styles/             # スタイルシート
│   └── templates/          # ページテンプレート
├── static/                 # 静的ファイル
├── public/                 # ビルド出力ディレクトリ
├── .github/workflows/      # GitHub Actions設定
├── gatsby-config.ts        # Gatsbyメイン設定
├── gatsby-node.ts          # ページ生成ロジック
├── tailwind.config.js      # Tailwind CSS設定
├── package.json            # プロジェクト設定
└── README.md               # プロジェクト説明
```

## 主要技術スタック

### フロントエンド
- **React** 18.2.0 - UIライブラリ
- **Gatsby** 5.12.4 - 静的サイトジェネレーター
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストのCSSフレームワーク

### コンテンツ管理
- **Markdown** - ブログ記事のフォーマット
- **MDX** - Reactコンポーネントを含むMarkdown
- **Remark/Rehype** - Markdownプロセッサー

### 開発・品質管理
- **Storybook** - コンポーネントカタログ
- **textlint** - 日本語文章校正
- **Prettier** - コードフォーマッター
- **TypeScript** - 型チェック

### デプロイメント・インフラ
- **GitHub Actions** - CI/CD
- **GitHub Pages** - ホスティング
- **Yarn** - パッケージマネージャー

## ライセンス

このプロジェクトは個人ブログサイトとして運営されており、ソースコードは公開されています。