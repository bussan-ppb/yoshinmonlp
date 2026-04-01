# 楊心門 ホームページ プロジェクト設定

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
