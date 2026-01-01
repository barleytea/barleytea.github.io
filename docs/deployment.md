# デプロイメント仕様

## 概要

barlog.techは GitHub Pages を使用してホスティングされており、GitHub Actions による自動デプロイメントを実装しています。

## ホスティング環境

### GitHub Pages
- **URL**: https://barlog.tech
- **カスタムドメイン**: barlog.tech
- **SSL**: 自動SSL証明書（Let's Encrypt）
- **CDN**: GitHub Pages内蔵CDN
- **ソース**: `gh-pages` ブランチ

### ドメイン設定
- **プライマリドメイン**: barlog.tech
- **CNAMEファイル**: デプロイ時に自動生成
- **DNS設定**: カスタムドメインのDNS A/CNAMEレコード

## CI/CD パイプライン

### GitHub Actions ワークフロー
**ファイル**: `.github/workflows/gh-pages.yml`

```yaml
name: GitHub Pages

on:
  push:
    branches: [main]
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-22.04
    permissions:
      contents: write
    concurrency:
      group: ${{ github.workflow }}-${{ github.ref }}
```

### トリガー条件
- **本番デプロイ**: `main` ブランチへのpush
- **プレビュービルド**: プルリクエスト作成時

### ワークフロー手順

#### 1. 環境セットアップ
```yaml
- uses: actions/checkout@v4
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: '20.x'
    cache: yarn
```

#### 2. 依存関係インストール
```yaml
- name: Install dependencies  
  run: yarn install --frozen-lockfile --silent --network-timeout 300000
  timeout-minutes: 10
```

#### 3. ビルド実行
```yaml
- name: Build
  run: yarn build
```

#### 4. デプロイ（mainブランチのみ）
```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v4
  if: github.ref == 'refs/heads/main'
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./public
    cname: barlog.tech
```

## ビルドプロセス

### ビルドコマンド
```bash
yarn build  # gatsby build の実行
```

### ビルド成果物
- **出力ディレクトリ**: `public/`
- **ファイル構成**:
  - HTML ファイル（各ページ）
  - CSS ファイル（最適化済み）
  - JavaScript バンドル（コード分割済み）
  - 最適化済み画像
  - サイトマップ（sitemap.xml）
  - robots.txt
  - PWA マニフェスト

### ビルド最適化
- **HTML圧縮**: 不要な空白文字の除去
- **CSS最適化**: 未使用スタイルの削除、圧縮
- **JavaScript最適化**: 圧縮、難読化、コード分割
- **画像最適化**: WebP変換、サイズ最適化
- **Asset最適化**: ファイルハッシュによるキャッシュ戦略

## パフォーマンス監視

### Lighthouse スコア目標
- **Performance**: 90+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+

### Core Web Vitals 目標
- **LCP (Largest Contentful Paint)**: < 2.5秒
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## セキュリティ

### GitHub Actions セキュリティ
- **権限制限**: `contents: write` の最小権限
- **シークレット管理**: `GITHUB_TOKEN` の自動生成トークン使用
- **依存関係**: 信頼できるActions（@v4 の固定バージョン）使用

### 静的サイトセキュリティ
- **HTTPS強制**: GitHub Pages での自動SSL
- **セキュリティヘッダー**: 必要に応じてさらなるヘッダー設定可能
- **依存関係監視**: GitHub Dependabot による脆弱性監視

## モニタリング・ログ

### GitHub Actions ログ
- **ビルドログ**: 各ステップの実行状況
- **エラーログ**: ビルド失敗時のエラー詳細
- **デプロイログ**: デプロイ成功/失敗の記録

### アナリティクス
- **Google Analytics**: GA4 による訪問者解析
- **トラッキングID**: G-Z6KEETN4GT

## 障害対応

### ビルド失敗時の対応
1. **ログ確認**: GitHub Actions ログの確認
2. **依存関係エラー**: package-lock.json の更新
3. **TypeScript エラー**: 型エラーの修正
4. **コンテンツエラー**: Markdownファイルの修正

### デプロイ失敗時の対応
1. **権限確認**: GitHub Pagesの設定確認
2. **ドメイン確認**: CNAME設定の確認
3. **DNS確認**: カスタムドメインのDNS設定確認

## 環境固有設定

### 本番環境（GitHub Pages）
- **ベースURL**: https://barlog.tech
- **アナリティクス**: 有効
- **サイトマップ**: 有効
- **robots.txt**: すべてのクローラーを許可

### 開発環境
```bash
yarn develop  # gatsby develop
# → http://localhost:8000
```

### Storybook環境
```bash
yarn storybook  # storybook dev
# → http://localhost:6006
```

## デプロイメント手順

### 通常のデプロイ
1. 機能開発・修正を実施
2. `main` ブランチにマージ
3. GitHub Actions が自動実行
4. ビルド・デプロイ完了（約2-3分）

### 緊急デプロイ
1. ホットフィックスブランチ作成
2. 修正コミット
3. `main` ブランチに直接マージ
4. 自動デプロイ実行

### ロールバック
1. 問題のあるコミットの特定
2. `git revert` でコミット取り消し
3. `main` ブランチにpush
4. 自動デプロイによる復旧

## パッケージ管理

### パッケージマネージャー
- **Yarn**: yarn.lock によるバージョン固定
- **Node.js**: v20.x（GitHub Actions環境）

### 依存関係更新
```bash
yarn upgrade        # 依存関係の更新
yarn upgrade --latest  # メジャーバージョンアップ含む更新
```

### セキュリティ監査
```bash
yarn audit          # セキュリティ脆弱性チェック
yarn audit --fix    # 自動修正可能な脆弱性の修正
```