# システムアーキテクチャ

## 全体アーキテクチャ

barlog.techは静的サイトジェネレーター（SSG）アーキテクチャを採用しており、以下の構成になっています。

```
[Markdown記事] → [Gatsby Build Process] → [Static HTML/CSS/JS] → [GitHub Pages]
```

## 技術スタック詳細

### コアフレームワーク

#### Gatsby 5.12.4
- **役割**: 静的サイトジェネレーター
- **特徴**: 
  - React ベースのフレームワーク
  - GraphQL によるデータレイヤー
  - プラグインエコシステム
  - 画像最適化、コード分割、プリフェッチなどの最適化機能

#### React 18.2.0
- **役割**: UIライブラリ
- **特徴**: 
  - コンポーネントベースの開発
  - JSX記法によるHTML-in-JS
  - フック（Hooks）による状態管理

#### TypeScript 5.1.6
- **役割**: 型安全な開発
- **設定**: tsconfig.json で設定
- **特徴**: 
  - 静的型チェック
  - インテリセンスサポート
  - ランタイムエラーの早期発見

### スタイリング

#### Tailwind CSS 3.3.3
- **役割**: CSSフレームワーク
- **設定ファイル**: tailwind.config.js
- **使用プラグイン**:
  - @tailwindcss/typography - 記事コンテンツの Typography
  - @tailwindcss/line-clamp - テキストの行数制限

#### PostCSS 8.4.30
- **役割**: CSS後処理
- **設定ファイル**: postcss.config.js
- **機能**: Tailwind CSS の処理、Autoprefixer

### コンテンツ管理

#### Markdown + MDX
- **記事形式**: Markdown (.md)
- **プロセッサー**: gatsby-transformer-remark
- **機能**:
  - フロントマター（YAML）によるメタデータ
  - コードハイライト（Prism.js）
  - 画像最適化
  - 目次自動生成
  - アンカーリンク自動生成

#### GraphQL
- **役割**: データクエリレイヤー
- **機能**:
  - Markdownファイルのメタデータクエリ
  - 画像の最適化クエリ
  - 関連記事の取得

### 品質管理ツール

#### textlint
- **役割**: 日本語文章校正
- **設定ファイル**: .textlintrc.json
- **チェック項目**:
  - 日本語表記の統一
  - 技術用語のスペルチェック
  - 文章の長さ制限
  - 表記ゆれの検出

#### Storybook 8.4.7
- **役割**: コンポーネントカタログ
- **機能**:
  - UIコンポーネントの単体表示
  - プロパティのインタラクション
  - デザインシステムの管理

### データフロー

```
1. Markdown ファイル (src/contents/)
   ↓
2. gatsby-source-filesystem でファイル読み込み
   ↓
3. gatsby-transformer-remark で Markdown → HTML 変換
   ↓
4. GraphQL でデータクエリ
   ↓
5. React コンポーネントでレンダリング
   ↓
6. Gatsby Build で静的ファイル生成 (public/)
   ↓
7. GitHub Pages でホスティング
```

## プラグイン構成

### Gatsby プラグイン

#### 必須プラグイン
- `gatsby-plugin-postcss` - PostCSS/Tailwind CSS サポート
- `gatsby-plugin-image` - 画像最適化
- `gatsby-plugin-sharp` - 画像処理エンジン
- `gatsby-transformer-sharp` - Sharp画像変換
- `gatsby-source-filesystem` - ファイルシステムからのデータ読み込み
- `gatsby-transformer-remark` - Markdown処理

#### SEO・パフォーマンス
- `gatsby-plugin-sitemap` - サイトマップ生成
- `gatsby-plugin-robots-txt` - robots.txt 生成
- `gatsby-plugin-canonical-urls` - カノニカルURL設定
- `gatsby-plugin-offline` - Service Worker & オフライン対応
- `gatsby-plugin-manifest` - PWA マニフェスト

#### アナリティクス
- `gatsby-plugin-google-gtag` - Google Analytics

#### Markdown 拡張
- `gatsby-remark-images` - Markdown内画像の最適化
- `gatsby-remark-prismjs` - シンタックスハイライト
- `gatsby-remark-autolink-headers` - ヘッダーのアンカーリンク
- `gatsby-remark-table-of-contents` - 目次自動生成
- `gatsby-remark-code-titles` - コードブロックのタイトル

## パフォーマンス最適化

### 画像最適化
- **gatsby-plugin-image**: 次世代画像フォーマット（WebP）への自動変換
- **レスポンシブ画像**: デバイスサイズに応じた画像配信
- **遅延読み込み**: 画面内に入った時点で画像を読み込み

### JavaScript最適化
- **コード分割**: ページ単位でのJavaScriptバンドル分割
- **プリフェッチ**: リンクホバー時の事前読み込み
- **Tree Shaking**: 未使用コードの除去

### CSS最適化
- **Tailwind CSS**: 使用されたクラスのみを出力
- **CSS-in-JS**: コンポーネント単位でのスタイル管理
- **Critical CSS**: Above-the-fold CSS の最適化

## セキュリティ

### 静的サイトのセキュリティメリット
- **攻撃面の最小化**: サーバーサイド処理なし
- **DDoS耐性**: CDN経由での配信
- **SQLインジェクション対策**: データベース不使用

### 追加セキュリティ対策
- **HTTPS強制**: GitHub Pages での自動SSL証明書
- **CSP設定**: Content Security Policy（必要に応じて実装可能）
- **依存関係の脆弱性チェック**: GitHub Dependabot