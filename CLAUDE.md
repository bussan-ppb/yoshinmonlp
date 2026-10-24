# 楊心門 ホームページ プロジェクト設定

プロジェクトのルールは Codex と共通化するため `AGENTS.md` に集約している。
ルールを変えるときは `AGENTS.md` を編集する。

@AGENTS.md

## Claude Code 固有
- ローカル確認は `.claude/launch.json` の `yoshinmon-site` を preview_start で起動する
- スキルの実体は `.claude/skills/` にあり、Codex からは `.agents/skills/` のシンボリックリンク経由で参照される
