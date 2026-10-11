---
status: "承認済み"
date: 2026-10-11
type: "既存の判断の変更"
---

# ADR 2026-10-11: ai-rules-location: AI 向けの規約は .claude/rules と CLAUDE.md に置き、claude-plugins の init-repo を土台にする

AI 向けの規約は `.cursor/rules/` に置いていたが、開発は Claude Code と aidd プラグインのスキルで進める運用に移った。また `.cursor/rules/` には、素の CSS・SCSS を前提にした規約や、存在しない `src/context/` の説明など、Tailwind CSS v4・Next.js 16 の今の構成と合わない記述が多かった（[Issue #67](https://github.com/Kazu-K0032/profile/issues/67)）。

規約は Claude Code が読む `.claude/rules/` と `CLAUDE.md` に置くことにした。土台には [claude-plugins](https://github.com/Kazu-K0032/claude-plugins) の `/project:init-repo` が配る構成を使い、ほかのリポジトリと同じハーネス設定・テンプレートにそろえる。`.cursor/rules/` のうち今の構成に合う規約だけを `.claude/rules/directory.md`・`.claude/rules/frontend.md`・`CLAUDE.md` に移し、`css.mdc`・`scss.mdc`・`mcp/` 配下は移さずに `.cursor/` ごと削除する。

`.cursor/` を残して併用する案は、同じ規約を 2 か所で直すことになるため採らなかった。移さずに残す案は、Claude Code が `.cursor/rules/` を読まないため採らなかった。
