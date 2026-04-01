# 楊心門 公式ホームページ

真道無限流 総合武術協会「楊心門」の公式ウェブサイトです。

## サイト構成

| ページ | ファイル | 内容 |
|--------|----------|------|
| トップ | `index.html` | メインビジュアル・理念概要・稽古案内・お知らせ |
| 理念・歴史 | `about.html` | 道場の理念、大切にしていること、沿革 |
| 指導者紹介 | `instructors.html` | 師範・指導員のプロフィール |
| お知らせ | `news.html` | 稽古予定・大会情報・イベント案内 |
| 活動記録 | `gallery.html` | 写真ギャラリー |
| アクセス | `access.html` | 道場情報・地図・稽古スケジュール |
| お問い合わせ | `contact.html` | お問い合わせフォーム |

## 技術スタック

- HTML5 / CSS3 / Vanilla JavaScript
- Google Fonts（Noto Sans JP / Noto Serif JP）
- CSS カスタムプロパティによるデザイントークン管理
- レスポンシブデザイン（モバイルファースト）

## ディレクトリ構造

```
assets/
├── css/
│   ├── variables.css       # デザイントークン（カラー・フォント・間隔）
│   ├── style.css           # ベーススタイル・リセット
│   └── components/         # コンポーネント別CSS
├── js/
│   ├── main.js             # 共通（ナビ・スクロールアニメーション）
│   ├── gallery.js          # ギャラリー ライトボックス
│   └── form.js             # フォームバリデーション
├── images/                 # 画像素材（カテゴリ別）
└── fonts/                  # Webフォント
```

## ローカルで確認する方法

```bash
# 方法1: npx serve を使う
npx serve .

# 方法2: Python の簡易サーバー
python3 -m http.server 8000
```

## 公開URL

https://yoshinmon-official.jp/
