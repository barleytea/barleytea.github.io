# 開発環境セットアップ

## 前提条件

### 必要なソフトウェア
- **Node.js**: v20.x 以上
- **Yarn**: v1.22.x 以上（推奨）または npm
- **Git**: バージョン管理
- **エディター**: VS Code（推奨）

### 推奨環境
- **OS**: macOS, Linux, Windows (WSL2推奨)
- **メモリ**: 8GB以上
- **ストレージ**: 2GB以上の空き容量

## プロジェクトセットアップ

### 1. リポジトリクローン
```bash
git clone https://github.com/barleytea/barleytea.github.io.git
cd barleytea.github.io
```

### 2. 依存関係インストール
```bash
yarn install
# または
npm install
```

### 3. 開発サーバー起動
```bash
yarn develop
# → http://localhost:8000 でアクセス可能
```

### 4. GraphQL Playground（オプション）
```bash
# http://localhost:8000/___graphql でGraphQLクエリのテスト可能
```

## 開発コマンド

### 基本コマンド
```bash
yarn develop    # 開発サーバー起動（ホットリロード有効）
yarn build      # 本番ビルド
yarn serve      # ビルド済みサイトのプレビュー
yarn clean      # Gatsbyキャッシュクリア
```

### 品質管理コマンド
```bash
yarn typecheck  # TypeScript型チェック
yarn fmt        # Prettierによるコードフォーマット
yarn lint       # textlintによる日本語文章校正
yarn lintfix    # textlintの自動修正
```

### Storybook コマンド
```bash
yarn storybook        # Storybook開発サーバー起動
yarn build-storybook  # Storybookビルド
```

## 開発ワークフロー

### 1. 記事作成ワークフロー
```bash
# 1. 記事ディレクトリ作成
mkdir src/contents/YYYYMMDD-article-title

# 2. 記事ファイル作成
touch src/contents/YYYYMMDD-article-title/index.md

# 3. アイキャッチ画像配置（オプション）
cp eyecatcher.png src/contents/YYYYMMDD-article-title/

# 4. 記事執筆・プレビュー
yarn develop  # → http://localhost:8000

# 5. 文章校正
yarn lint

# 6. 自動修正
yarn lintfix
```

### 2. コンポーネント開発ワークフロー
```bash
# 1. コンポーネント作成
touch src/components/new-component.tsx
touch src/components/new-component.stories.ts

# 2. Storybook での開発
yarn storybook  # → http://localhost:6006

# 3. 型チェック・フォーマット
yarn typecheck
yarn fmt

# 4. 実際のページでのテスト
yarn develop
```

### 3. Git ワークフロー
```bash
# 1. 機能ブランチ作成
git checkout -b feature/new-feature

# 2. 開発・コミット
git add .
git commit -m "feat: add new feature"

# 3. メインブランチに統合
git checkout main
git merge feature/new-feature

# 4. デプロイ（main ブランチへのpushで自動実行）
git push origin main
```

## エディター設定

### VS Code 推奨拡張機能
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "yzhang.markdown-all-in-one",
    "ms-vscode.vscode-json"
  ]
}
```

### VS Code 設定（.vscode/settings.json）
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

## トラブルシューティング

### よくある問題と解決方法

#### 1. 依存関係エラー
```bash
# キャッシュクリア
yarn clean
rm -rf node_modules yarn.lock
yarn install
```

#### 2. TypeScript エラー
```bash
# 型チェック実行
yarn typecheck

# 自動生成型ファイルの再生成
rm -rf .gatsby-types.d.ts
yarn develop
```

#### 3. Gatsby ビルドエラー
```bash
# Gatsbyキャッシュクリア
yarn clean

# プラグインキャッシュクリア
rm -rf .cache public
yarn develop
```

#### 4. 画像最適化エラー
```bash
# Sharp再インストール
yarn remove sharp
yarn add sharp
```

#### 5. メモリ不足エラー
```bash
# Node.jsメモリ制限を増加
export NODE_OPTIONS="--max-old-space-size=4096"
yarn build
```

## デバッグ

### 開発ツール

#### 1. Gatsby デバッグ
```bash
# 詳細ログ出力
DEBUG=gatsby:* yarn develop

# GraphQL スキーマ確認
# http://localhost:8000/___graphql
```

#### 2. React Developer Tools
- ブラウザ拡張機能をインストール
- コンポーネント階層の確認
- Props/State の検査

#### 3. Lighthouse 監査
- Chrome DevTools の Lighthouse タブ
- パフォーマンス・アクセシビリティ監査

### ログ出力
```typescript
// デバッグ用コンソール出力
console.log('Debug:', variable)

// GraphQL クエリ結果の確認
console.log('GraphQL data:', data)
```

## パフォーマンス最適化

### 開発時の最適化
- **増分ビルド**: ファイル変更時の部分ビルド
- **ホットリロード**: CSS・JSの即座反映
- **GraphQL キャッシュ**: クエリ結果のキャッシュ

### ビルド時の最適化
- **コード分割**: ページ単位でのバンドル分割
- **画像最適化**: Sharp による自動最適化
- **CSS最適化**: 未使用スタイルの除去

## テスト

### 現在のテスト構成
- **Storybook**: コンポーネントの視覚的テスト
- **TypeScript**: 型による静的テスト
- **textlint**: 文章品質のテスト

### 今後の拡張可能なテスト
- **Jest**: ユニットテスト
- **Testing Library**: React コンポーネントテスト
- **Cypress**: E2Eテスト
- **Chromatic**: 視覚回帰テスト

## 設定ファイル

### 主要設定ファイル一覧
```
├── gatsby-config.ts       # Gatsby メイン設定
├── gatsby-node.ts         # ページ生成ロジック
├── tailwind.config.js     # Tailwind CSS 設定
├── postcss.config.js      # PostCSS 設定
├── tsconfig.json          # TypeScript 設定
├── .textlintrc.json       # textlint 設定
├── package.json           # プロジェクト設定
└── yarn.lock              # 依存関係バージョン固定
```

### 環境変数（オプション）
```bash
# .env.development
GATSBY_ENABLE_ANALYTICS=false

# .env.production  
GATSBY_ENABLE_ANALYTICS=true
```