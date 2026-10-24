#!/usr/bin/env bash
# サイトのソースを gh-pages の作業コピーへ「ミラー」する（同じ内容にそろえる）スクリプト。
# deploy.yml と、手元から本番公開するとき（preview-review スキル）の両方で使う。
#
# ソースから消したファイルは公開先からも消す（rsync --delete）。
# 以前の keep_files: true では削除が反映されず、差し替え・削除した写真が
# 公開URLに残り続けていたため、この方式にした。
#
# 使い方: sync-site.sh <ソースのディレクトリ> <gh-pagesの作業コピー> <root|preview>
#   root    : 本番ルートに反映。/preview/・/option2/・CNAME・.nojekyll には触れない
#   preview : /preview/ 以下に反映
set -euo pipefail

if [ $# -ne 3 ]; then
  echo "使い方: $0 <ソース> <gh-pagesの作業コピー> <root|preview>" >&2
  exit 1
fi

src=$1
dest=$2
mode=$3

# 開発用ファイルは公開しない（先頭の / はソース直下だけを指す）
excludes=(
  --exclude=/.git
  --exclude=/.github
  --exclude=/.claude
  --exclude=/.agents
  --exclude=/.gitignore
  --exclude=/CLAUDE.md
  --exclude=/AGENTS.md
  --exclude=/README.md
  --exclude=.DS_Store
)

case "$mode" in
  root)
    # 除外したパスは --delete の対象外になるため、本番固有のファイルはこれで保護される
    excludes+=(
      --exclude=/preview
      --exclude=/option2
      --exclude=/CNAME
      --exclude=/.nojekyll
    )
    target="$dest/"
    ;;
  preview)
    target="$dest/preview/"
    mkdir -p "$target"
    ;;
  *)
    echo "モードは root か preview を指定してください: $mode" >&2
    exit 1
    ;;
esac

rsync -a --delete "${excludes[@]}" "$src/" "$target"
