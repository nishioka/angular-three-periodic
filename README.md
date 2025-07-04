# Angular Three.js Periodic Table

インタラクティブな3D周期表をAngular、angular-three、angular-three-sobaを使用して構築したプロジェクトです。各元素は3Dキューブとして表示され、カテゴリ別に色分けされています。

🌐 **[ライブデモを見る](https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/)**

> **注意**: 上記のリンクは、実際のGitHubユーザー名とリポジトリ名に置き換えてください。

## 機能

- 🧪 全118元素の3D表示
- 🎨 元素カテゴリ別の色分け
- 🎮 マウス/タッチでの3Dナビゲーション（OrbitControls）
- 📱 レスポンシブデザイン
- ⚡ リアルタイムレンダリング

## 開発環境のセットアップ

1. リポジトリをクローンし、依存関係をインストール：
```bash
git clone <repository-url>
cd angular-three-periodic
npm install
```

2. 開発サーバーを起動：
```bash
npm start
```

3. ブラウザで `http://localhost:4200` にアクセス

## GitHub Pagesへのデプロイ

このプロジェクトはGitHub Pagesに自動デプロイするよう設定されています。

### 初回セットアップ

1. **リポジトリをGitHubにプッシュ**
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

2. **GitHubリポジトリの設定**
   - GitHubリポジトリページで「Settings」タブをクリック
   - 左サイドバーで「Pages」をクリック
   - 「Source」を「GitHub Actions」に設定
   - 保存すると自動的にワークフローが実行されます

3. **デプロイの確認**
   - 「Actions」タブでデプロイメントの進行状況を確認
   - 完了後、`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/` でアクセス可能

### トラブルシューティング

- **"Get Pages site failed" エラーが出る場合**: 
  1. リポジトリの「Settings」→「Pages」でGitHub Actionsが選択されていることを確認
  2. リポジトリがパブリックであることを確認（プライベートリポジトリの場合はGitHub Pro が必要）
  3. 「Actions」タブでワークフローの権限が有効になっていることを確認
- **ワークフローが失敗する場合**: Actions タブでエラーログを確認してください
- **アクセスできない場合**: DNS の反映に数分かかる場合があります
- **404エラーが出る場合**: `base-href` の設定がリポジトリ名と一致していることを確認してください

### 手動ビルド

GitHub Pages用のビルドを手動で実行する場合：
```bash
npm run build:github-pages
```

## 技術スタック

- Angular 19
- Angular Three v3
- THREE.js 0.171
- angular-three-soba (コントロール)
- `.glsl` ローダー対応
- Tailwind CSS
- TypeScript

## プロジェクト構造

```
src/
├── app/
│   ├── components/          # 再利用可能なコンポーネント
│   │   ├── element-cube.component.ts
│   │   ├── element-cube.component.html
│   │   ├── experience.component.ts
│   │   └── experience.component.html
│   ├── data/               # 元素データ
│   │   └── periodic-elements.ts
│   └── app.component.ts    # ルートコンポーネント
├── styles.css             # グローバルスタイル
└── index.html             # メインHTMLファイル
```
