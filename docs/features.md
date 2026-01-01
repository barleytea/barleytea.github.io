# ブログ機能仕様

## 基本機能

### 記事管理
- **記事作成**: Markdownファイルによる記事作成
- **記事一覧**: ページネーション付きの記事一覧表示
- **記事詳細**: 個別記事ページでの詳細表示
- **下書き機能**: frontmatterの`draft: true`で非公開記事

### 分類・検索機能
- **カテゴリ機能**: 記事のカテゴリ分類とカテゴリ別一覧
- **タグ機能**: 記事へのタグ付けとタグ別一覧
- **関連記事**: 同じタグを持つ記事の表示

### ナビゲーション
- **ページネーション**: 記事一覧での12記事/ページ表示
- **前後記事**: 記事詳細ページでの前後記事リンク
- **パンくずナビ**: カテゴリ・タグページでのナビゲーション

## ページ構成

### ホームページ（`/`）
- **機能**: 最新記事一覧の表示
- **テンプレート**: `src/templates/root.tsx`
- **ページネーション**: `/posts/2`, `/posts/3`, ... で複数ページ
- **表示件数**: 12件/ページ

### 記事詳細ページ（`/{記事のpath}`）
- **機能**: 記事本文と関連情報の表示
- **テンプレート**: `src/templates/detail.tsx`
- **URL形式**: `/java8-exponential-backoff-retry`など
- **コンテンツ**:
  - 記事タイトル・作成日
  - アイキャッチ画像
  - 記事本文（Markdown → HTML変換）
  - タグ一覧
  - 前後記事リンク
  - 関連記事リスト

### カテゴリページ（`/category/{カテゴリ名}`）
- **機能**: カテゴリ別記事一覧
- **テンプレート**: `src/templates/root.tsx` （ルートと共通）
- **URL例**: `/category/tech`, `/category/about me`
- **ページネーション**: `/category/tech/2`, `/category/tech/3`, ...

### タグページ（`/tag-list/{タグ名}`）
- **機能**: タグ別記事一覧
- **テンプレート**: `src/templates/posts-by-tag.tsx`
- **URL例**: `/tag-list/Java`, `/tag-list/Go`

### タグ一覧ページ（`/tag-list`）
- **機能**: 全タグの一覧表示
- **テンプレート**: `src/pages/tag-list.tsx`

### 404ページ（`/404`）
- **機能**: 存在しないページへのアクセス時の表示
- **テンプレート**: `src/pages/404.tsx`

## 記事データ構造

### フロントマター（記事メタデータ）
```yaml
---
title: "記事タイトル"
created: "2022-01-11"              # 作成日（YYYY-MM-DD形式）
path: "/article-path"               # URL パス
eyecatcher: "./eyecatcher.png"      # アイキャッチ画像
tags: ["Java", "Spring"]            # タグ配列
category: "Tech"                    # カテゴリ
draft: false                        # 下書きフラグ（省略時はfalse）
---
```

### Markdownコンテンツ機能
- **目次自動生成**: `\`\`\`toc\`\`\`` ブロック
- **コードハイライト**: Prism.jsによるシンタックスハイライト
- **コードタイトル**: `\`\`\`java:title=ファイル名.java` 形式
- **画像最適化**: 相対パスでの画像参照と自動最適化
- **アンカーリンク**: ヘッダーの自動アンカーリンク生成

## UI/UXコンポーネント

### ヘッダー（Header）
- **ファイル**: `src/components/header.tsx`
- **機能**: サイトロゴ、サイト名表示
- **Storybook**: header.stories.ts

### フッター（Footer）
- **ファイル**: `src/components/footer.tsx`
- **機能**: コピーライト情報
- **Storybook**: footer.stories.ts

### カード一覧（CardList）
- **ファイル**: `src/components/card-list.tsx`
- **機能**: 記事カードのグリッド表示
- **Storybook**: card-list.stories.ts

### 記事カード（Card）
- **ファイル**: `src/components/card.tsx`
- **機能**: 記事のサムネイル表示
- **情報**: タイトル、作成日、アイキャッチ、カテゴリ、タグ
- **Storybook**: card.stories.ts

### カテゴリタブ（CategoryTabs）
- **ファイル**: `src/components/category-tabs.tsx`
- **機能**: カテゴリ別フィルタリング
- **表示**: "All" + 各カテゴリタブ

### ページネーション（Pagination）
- **ファイル**: `src/components/pagination.tsx`
- **機能**: ページング制御
- **Storybook**: pagination.stories.ts

### タグ一覧（TagList）
- **ファイル**: `src/components/tag-list.tsx`
- **機能**: タグのリンク一覧表示
- **Storybook**: tag-list.stories.ts

### タグ（Tag）
- **ファイル**: `src/components/tag.tsx`
- **機能**: 個別タグの表示
- **Storybook**: tag.stories.ts

### 前後記事（NextPrevious）
- **ファイル**: `src/components/next-previous.tsx`
- **機能**: 記事詳細ページでの前後記事リンク
- **Storybook**: next-previous.stories.ts

### 関連記事一覧（RelatedPostList）
- **ファイル**: `src/components/related-post-list.tsx`
- **機能**: 同じタグを持つ記事の表示
- **Storybook**: related-post-list.stories.ts

### SEOコンポーネント（SEO）
- **ファイル**: `src/components/seo.tsx`
- **機能**: ページのメタデータ設定
- **設定項目**: title, description, og:image など

## レスポンシブデザイン

### ブレークポイント
Tailwind CSS のデフォルトブレークポイントを使用:
- **sm**: 640px以上
- **md**: 768px以上  
- **lg**: 1024px以上
- **xl**: 1280px以上
- **2xl**: 1536px以上

### レイアウト
- **メインカラム**: 記事コンテンツエリア
- **サイドカラム**: 関連情報（必要に応じて実装）
- **グリッドシステム**: CSS Grid / Flexbox

### モバイル最適化
- **タッチフレンドリー**: 適切なタップターゲットサイズ
- **読みやすさ**: フォントサイズと行間の最適化
- **画像最適化**: デバイス幅に応じた画像配信

## アクセシビリティ

### HTML セマンティクス
- **適切な見出し構造**: h1 → h2 → h3 の階層
- **ランドマーク**: header, main, footer の適切な使用
- **リスト構造**: nav, ul, li での構造化

### キーボードナビゲーション
- **フォーカス表示**: outline による視認性確保
- **Tab順序**: 論理的なフォーカス移動

### ARIA属性
- **aria-label**: 画像やアイコンの説明
- **role属性**: 必要に応じた意味付け

## パフォーマンス

### Core Web Vitals対応
- **LCP**: 画像最適化による高速ロード
- **FID**: 軽量なJavaScript
- **CLS**: レイアウトシフトの最小化

### 画像最適化
- **WebP変換**: 次世代フォーマットへの自動変換
- **レスポンシブ画像**: srcset による適切なサイズ配信
- **遅延読み込み**: Intersection Observer による遅延ロード

### JavaScript最適化  
- **コード分割**: ページ単位でのバンドル分割
- **プリフェッチ**: リンクホバー時の事前読み込み
- **Tree Shaking**: 不要コードの除去