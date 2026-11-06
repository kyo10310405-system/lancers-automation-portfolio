# GitHub Pagesへの修正版反映手順（初心者向け）

## 更新するリポジトリ

https://github.com/kyo10310405-system/lancers-automation-portfolio

> 既存のサイトはそのままで、問題のあるファイルだけを差し替えます。`index.html` を別フォルダに移動しないでください。

## 手順

1. `lancers_portfolio_qa_fixed_changes.zip` をダウンロードし、Windowsで右クリック → **すべて展開**。
2. GitHubの `kyo10310405-system` でログインし、上記のリポジトリを開く。
3. **Code → Add file → Upload files** を開く。
4. 展開先を開き、`01-crm`、`02-gas`、`03-doc-ai`、`assets` の**4つのフォルダ**と、同梱されたMarkdownの説明書ファイルをGitHubのアップロード領域へドラッグする（ZIPそのものをアップロードしない）。
5. アップロード先パスが `01-crm/app.js`、`02-gas/app.js`、`03-doc-ai/app.js`、`assets/styles.css` のように**元と同じ場所**になっていることを確認する。既存ファイルは同名で更新される。
6. コミットメッセージ `Fix QA issues in portfolio demos` を入力し、**Commit changes** で保存する。
7. **Actions → pages build and deployment** が成功することを確認する。
8. 公開URLへアクセスし、`Ctrl + Shift + R` で再読み込みする。

### 最低限の確認

- 顧客管理：同じIDの2行を含むCSVは取込エラーになり、元データが消えない。
- GAS：`2026-1-2` と `2026-01-02` の同一案件は重複として除外される。
- GAS：成約のみ対象を解除すると、見出しが「集計対象売上（全ステータス）」になる。
- 文書分析：「課題：期限未定」のような同じ行の文章を抽出できる。
- スマートフォン：ページ全体は横スクロールせず、表などの部分領域だけを横スクロールできる。

### ダウンロードができない場合

GitHubのエディタから各対象ファイルを開き、対応する修正版のファイルの内容をコピーして全置換する方法もあります。特に `assets/styles.css` は末尾にモバイル対応CSSを追加する方法でも対応できます。

### 権限の注意

現在ChatGPTに接続されている別のGitHubアカウントには、このリポジトリへのpush権限がありません。公開版の書換えはまだ行われていません。
