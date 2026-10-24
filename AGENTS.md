# 楊心門 ホームページ プロジェクト設定

このファイルは Claude Code・Codex など、すべてのコーディングエージェント共通の指示書。
Claude Code は `CLAUDE.md` から、Codex はこのファイルを直接読み込む。
ルールを変えるときはこのファイルだけを編集する。

## 概要
- 空手道場「楊心門」（真道無限流 総合武術協会）の公式サイト
- 静的HTML/CSS/JSで構築（ビルドツール不使用）
- GitHub管理: bussan-ppb/yoshinmonlp

## 言語
- 指示・出力はすべて日本語で行う
- コード内のコメントも日本語で記述する

## デザイン方針
- ダーク基調（黒/濃紺）+ アクセント（深紅 #c41e3a）
- Noto Sans JP（本文）+ Noto Serif JP（見出し）
- モバイルファーストのレスポンシブデザイン
- CSS変数（variables.css）でデザイントークンを一元管理

## コーディングルール
- CSSはコンポーネント単位に分割（assets/css/components/）
- JavaScriptはバニラJS（フレームワーク不使用）
- コードには必ず日本語コメントを入れる
- 専門用語には注釈を添える

## ファイル命名規則
- HTMLページ: 英語小文字（例: about.html, contact.html）
- CSS: コンポーネント名.css（例: header.css, card.css）
- 画像: カテゴリ別フォルダで管理（assets/images/hero/, gallery/等）

## 文章のルール
- 「押忍」「— 押忍」「押忍。」のような掛け声・語尾は、お知らせ・大会報告・挨拶文など
  すべての本文で使わない（ユーザーからの明示的な指示）。「〜参ります。」「〜に向けて。」など
  落ち着いた語尾でまとめる。
- お知らせ記事は、提供された原文（寄稿・SNS投稿など）を丸写ししない。内容を地の文として
  再構成し、既存のお知らせ記事のトンマナに揃える。
  - 敬体・簡潔・落ち着いた、協会としての報告調
  - 絵文字、過剰な「！」、一人称の語りかけ（「一生懸命考えました！」等）は避ける
  - 書く前に `news/` 配下の既存記事（特に `news/2026-04-26-kentaikai.html`）を読み、
    語彙・文体・構成を把握する
  - 原文の事実（日付・氏名・段位・出来事）は正確に保つ

## 公開フロー（必ず守る）
- サイトを更新したら、本番公開の前に必ず `/preview/` に出して師範代のレビューを受ける。
  門下生（未成年を含む）の写真や大会結果を扱うため、人の目での確認が必須。
- `main` への push では何も公開されない。`git push origin main:preview` で
  `https://yoshinmon-official.jp/preview/` が更新される（`.github/workflows/deploy.yml`）。
- 本番公開は、ユーザーから「レビューOK」「公開して」の指示を受けてから行う。
- レビュー済み記事のプレビューは `/preview/` に残さない。
- 公開はミラー方式（`.github/scripts/sync-site.sh`）。main から消したファイルは本番からも消える。
  本番の `/preview/`・`/option2/`・`CNAME`・`.nojekyll` はスクリプトが保護する。
- 具体的な手順は `preview-review` スキル（`.agents/skills/preview-review/SKILL.md`）にある。

## ブランチ
- `main`: ソース管理用。push しても公開されない
- `preview`: push すると `/preview/` にデプロイされる（レビュー用）
- `gh-pages`: 公開物。GitHub Actions または公開手順が書き込む。手で直接編集しない
- `design-option-*`: 過去のデザイン案。通常の作業では触らない

## ローカル確認
`python3 -m http.server 8080` をリポジトリ直下で起動し、`http://localhost:8080/` を開く。

## 作業時の注意
- `git add` はパスを明示する。作業ツリーに元からある未コミットの変更
  （例: `assets/images/instructors/` の削除）を巻き込まない。
- コミットメッセージは日本語で `種別: 要約` の形にする
  （種別: `content:` `fix:` `feature:` `optimize:` `chore:`）。
