---
name: preview-review
description: サイトの変更をプレビュー環境（/preview/）に出し、師範代のレビュー依頼文までを用意する。お知らせの追加・修正、写真の差し替え、ページの変更など「サイトを更新したので確認してもらいたい」ときに使う。本番公開（workflow_dispatch）は行わない。
---

# プレビュー公開とレビュー依頼

サイトの変更は、必ずプレビュー環境に出して師範代の確認を受けてから本番公開する。
このスキルは「プレビューに出して、レビュー依頼文を渡す」までを担当する。
**本番公開（GitHub Actions の workflow_dispatch）は絶対に実行しない。** ユーザーが手動で行う。

## デプロイの仕組み

`.github/workflows/deploy.yml` の設定は次のとおり。

| 契機 | 反映先 | 実行者 |
|---|---|---|
| `main` への push | `https://yoshinmon-official.jp/preview/` | 自動（GitHub Actions） |
| Actions タブから手動実行 | `https://yoshinmon-official.jp/`（本番） | ユーザー |

`main` への push は本番公開ではなくプレビュー更新である。プレビューはサイト全体のミラーで、
`keep_files: true` のため古いファイルが残り続ける。robots.txt で検索除外はされているが、
URLを知れば誰でも閲覧できる。

## 手順

### 1. ローカルで表示を確認する

`.claude/launch.json` の `yoshinmon-site` を preview_start で起動し、変更したページを開く。
コンソールエラー・画像の読み込み・モバイル表示（1カラム、横スクロールなし）まで見る。
ユーザーに「確認してください」と丸投げせず、自分で確認して結果を伝える。

### 2. コミットする

コミットメッセージは既存の慣習に合わせ、日本語で `種別: 要約` の形にする。
種別の例は `content:`（記事・文章）、`fix:`、`feature:`、`optimize:`、`chore:`。

無関係な変更を巻き込まないよう、`git add` はパスを明示する。
特に `assets/images/instructors/` の未コミットの削除など、作業ツリーに元からある変更に注意。

### 3. push してプレビューを更新する

```bash
git push origin main
```

デプロイ完了まで30秒〜1分かかる。反映は待ってから確認する（フォアグラウンドの `sleep` は使えないので
`run_in_background` で `until` ループを回す）。

```bash
until [ "$(curl -s -o /dev/null -w '%{http_code}' 'https://yoshinmon-official.jp/preview/<変更したページ>')" = "200" ]; do sleep 10; done
```

### 4. 実URLで確認する

変更したページ・お知らせ一覧・トップページのHTTPステータス、追加した画像すべての読み込み、
実際の表示（スクリーンショット）を確認する。画像は `[...document.images].map(i => i.naturalWidth > 0)` で
全数チェックできる。

### 5. 古いプレビュー記事を掃除する

push のたびにサイト全体が再アップロードされるため、以前削除したプレビュー記事も復活する。
**確認中の記事以外のプレビュー記事は残さない。** gh-pages を worktree に出して削除し、push する。

```bash
WT="<scratchpad>/ghpages"
git worktree add -q "$WT" -b tmp-ghpages-clean origin/gh-pages
cd "$WT"
# 確認中の記事以外の preview/news/*.html を git rm する（本番の news/ には触れない）
git rm -q preview/news/<残さない記事>.html
git commit -m "chore: /preview/ からレビュー済みの過去記事を削除"
git push -q origin HEAD:gh-pages
cd - && git worktree remove "$WT" --force && git branch -D tmp-ghpages-clean -q
```

削除が反映されたか（404になったか）と、**本番側の記事が200のまま維持されているか**を必ず確認する。

### 6. レビュー依頼文を用意する

プレビューURLと、コピーしてそのまま送れるレビュー依頼文をユーザーに渡す。文中に含める要素は次のとおり。

- プレビューURL（変更したページ、必要なら一覧・トップも）
- **本番にはまだ公開していない** ことの明記
- 確認してほしい点（事実関係、写真の選定、文章表現）
- 判断を仰ぎたい点（不確かなまま書いた箇所、掲載範囲に迷った箇所）
- 修正は同じURLが更新されるので再送不要であること
- 期限は `〇月〇日頃` と空欄にして、ユーザーが埋められるようにする

文体は敬体で丁寧に。「押忍」などの掛け声は使わない。
LINE等で送る短縮版もあわせて出すと使いやすい。

## 判断に迷ったときの原則

- 写真から読み取った入賞結果・氏名・部門は、にじみや推測が混じるなら記事に断定して書かない。
  一般的な表現に留め、正式な結果をもらえば追記すると伝える。
- 楊心門以外の団体の選手が主に写る写真は採用しない。
- 事実が確認できない場面（誰が何の挨拶をしたか等）は、写真から確実に言えることだけを書き、
  レビュー依頼文で確認を求める。
