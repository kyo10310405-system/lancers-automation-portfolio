# 業務改善ポートフォリオ（公開デモ）

架空データを使った自主制作のWebデモ3作品です。**実顧客の情報は含みません。**

- **01-crm**: 顧客管理・契約更新率／KPI可視化・CSV入出力
- **02-gas**: CSV検証・重複除外・集計レポート／別途GAS用 `Code.gs` 付属
- **03-doc-ai**: 文書検索・決定事項・ToDo・リスクの**ルールベース簡易抽出**

トップページは `index.html` です。3作品ともブラウザ内で動作し、初期データは架空のサンプルです。

### 注意

- GitHub Pages はHTML/CSS/JavaScriptの静的配信のみです。③のOpenAI API分析を利用するサーバー機能は**この公開版には含まれません**。
- ①と③の編集データは訪問者のブラウザにある `localStorage` に保存されます。機密情報は入力しないでください。
- ②はブラウザ上のJavaScriptデモです。GAS本体の実行にはGoogleスプレッドシート側への別途導入・許可が必要です。

## GitHub Pages 設定

このリポジトリを公開（Public）にし、`Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main → Folder: /(root) → Save` で公開します。

作成者が実務経験をもとに新規制作したポートフォリオ用の自主制作サンプルです。実案件での納品実績を示すものではありません。
