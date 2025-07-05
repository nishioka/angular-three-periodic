# Angular Three.js Periodic Table

インタラクティブな3D周期表をAngular、angular-three、angular-three-sobaを使用して構築したプロジェクトです。各元素は3Dキューブとして表示され、カテゴリ別に色分けされています。

🌐 **[ライブデモを見る](https://nishioka.github.io/angular-three-periodic/)**

## 機能

- 🧪 全118元素の3D表示
- 🎨 元素カテゴリ別の色分け
- 🎮 マウス/タッチでの3Dナビゲーション（OrbitControls）
- 🔗 **PeerJSを使用したリアルタイム P2P 通信**
- 👥 **複数ブラウザ間での元素クリックの同期**

## P2P機能

このアプリケーションはPeerJSを使用して複数のブラウザ間でリアルタイム通信を提供します：

- **接続共有**: 右上のパネルに表示されるPeer IDを他のユーザーと共有
- **リアルタイム同期**: 元素をクリックすると、接続されたピアに通知が送信
- **接続状態の表示**: 現在接続されているピアの一覧を表示

### P2P使用方法

1. アプリケーションを開くと、右上に自動生成されたPeer IDが表示されます
2. "Copy"ボタンでPeer IDをクリップボードにコピー
3. 他のユーザーとPeer IDを共有
4. 相手のPeer IDを入力フィールドに入力して"Connect"をクリック
5. 接続後、元素をクリックすると相手のブラウザにも通知されます

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

### P2Pローカル開発

ローカルでP2P機能をテストする場合は、PeerJSサーバーを起動できます：

```bash
# 別のターミナルでPeerJSサーバーを起動
npm run peer-server

# その後、通常通りAngularアプリを起動
npm start
```

**注意**: 本番環境では、PeerJSは公開サーバーを使用してフォールバックします。

## 技術スタック

- Angular 19
- Angular Three v3
- THREE.js 0.171
- angular-three-soba (コントロール)
- **PeerJS (P2P通信)**
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
│   │   ├── experience.component.html
│   │   └── peer-connection.component.ts  # P2P接続UI
│   ├── services/           # サービス
│   │   └── peer.service.ts # P2P通信サービス
│   ├── data/               # 元素データ
│   │   └── periodic-elements.ts
│   └── app.component.ts    # ルートコンポーネント
├── styles.css             # グローバルスタイル
└── index.html             # メインHTMLファイル
```

## 初回セットアップ

1. **リポジトリをGitHubにプッシュ**
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

2. **GitHubリポジトリの設定**
   - GitHubリポジトリページで「Settings」タブをクリック
   - 左サイドバーで「Pages」をクリック
   - 「Source」を「GitHub Actions」に設定

### 手動ビルド

GitHub Pages用のビルドを手動で実行する場合：
```bash
npm run build:github-pages
```

## トラブルシューティング

### GitHub Pagesデプロイメントのエラー

**エラー**: "Get Pages site failed" または "Resource not accessible by integration"

**解決方法**:
1. GitHubリポジトリの Settings > Pages に移動
2. Source を「GitHub Actions」に設定
3. リポジトリが Public になっていることを確認
4. Actions タブでワークフローの実行ログを確認

**エラー**: "For root URLs you must provide an index.html file"

**解決方法**: 
- ワークフローが `dist/ngt-template/browser` ディレクトリをアップロードしていることを確認
- ビルド後の出力ディレクトリに `index.html` が存在することを確認

### P2P接続のトラブルシューティング

**接続できない場合**:
1. ブラウザのコンソールでエラーを確認
2. ファイアウォールやネットワーク設定を確認
3. HTTPSでホストされているサイトでテスト（本番環境推奨）

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
