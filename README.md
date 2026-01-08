# 📚 Notion Book Cover Search

書籍を検索して表紙画像のURLをクリップボードにコピーするWebツールです。Notionの `/embed` 機能を使ってページに埋め込むことで、本棚データベースへの書籍表紙追加を効率化できます。

![Book Search Tool](./docs/screenshot.png)

## ✨ 機能

- 📖 書籍名で検索（日本語・英語対応）
- 🖼️ 表紙画像のサムネイル表示
- 📋 ワンクリックでURLをクリップボードにコピー
- 🌓 ライト/ダークテーマ自動対応
- 📱 レスポンシブデザイン（Notion埋め込みサイズ対応）
- ⚡ 高速な検索レスポンス

## 🚀 使用方法

### Notionへの埋め込み

1. Notionページで `/embed` を入力
2. デプロイされたURLを貼り付け（例: `https://your-deployment-url.vercel.app`）
3. 埋め込みブロック内で書籍を検索
4. 書籍カードをクリックして表紙URLをコピー
5. Notionの「ファイルとメディア」プロパティにURLを貼り付け

### ローカルでの使用

1. リポジトリをクローン:
   ```bash
   git clone https://github.com/Mei0001/notion-bookcover-search.git
   cd notion-bookcover-search
   ```

2. 依存関係をインストール:
   ```bash
   npm install
   ```

3. 開発サーバーを起動:
   ```bash
   npm run dev
   ```

4. ブラウザで http://localhost:5173 を開く

## 🛠️ 開発

### コマンド

- `npm run dev` - 開発サーバーを起動
- `npm run build` - 本番用ビルドを作成
- `npm run preview` - ビルドしたアプリをプレビュー

### プロジェクト構造

```
notion-bookcover-search/
├── index.html          # エントリーポイント
├── src/
│   ├── main.js        # メインロジック（API統合・UI制御）
│   └── style.css      # スタイルシート
├── docs/
│   └── 要件定義書.md  # 詳細な要件定義
├── CLAUDE.md          # Claude Code用プロジェクトガイド
├── todo.md            # 実装タスクリスト
└── package.json       # プロジェクト設定
```

### 技術スタック

- **フロントエンド**: バニラJavaScript（フレームワーク不使用）
- **ビルドツール**: Vite
- **API**:
  - Google Books API（国際的な書籍）
  - openBD API（日本語書籍）
- **スタイル**: CSS（カスタムプロパティ使用）

## 🌐 デプロイ

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mei0001/notion-bookcover-search)

1. Vercelアカウントでログイン
2. リポジトリをインポート
3. ビルド設定は自動検出されます
4. デプロイ完了後、URLをNotionに埋め込み

### Cloudflare Pages

1. Cloudflare Pagesダッシュボードにアクセス
2. GitHubリポジトリを接続
3. ビルド設定:
   - ビルドコマンド: `npm run build`
   - 出力ディレクトリ: `dist`
4. デプロイを実行

### GitHub Pages

1. リポジトリ設定 → Pages
2. Source: GitHub Actions
3. 自動デプロイワークフローを設定（または手動でビルド＆デプロイ）

## 🔍 API について

### Google Books API

- 認証不要で使用可能
- レート制限: 1日あたり1000リクエスト
- 国際的な書籍に対応

### openBD API

- 認証不要で完全無料
- 日本の出版社が提供する書籍情報
- ISBNベースの検索

## 📝 ライセンス

MIT License

## 🤝 コントリビューション

Issue、Pull Requestを歓迎します！

1. このリポジトリをFork
2. Feature branchを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をCommit (`git commit -m 'Add some amazing feature'`)
4. BranchにPush (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## 📮 フィードバック

バグ報告や機能リクエストは [Issues](https://github.com/Mei0001/notion-bookcover-search/issues) にお願いします。

## 🙏 謝辞

- [Google Books API](https://developers.google.com/books)
- [openBD](https://openbd.jp/)
- [Vite](https://vitejs.dev/)
