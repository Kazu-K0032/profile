---
status: "承認済み"
date: 2026-10-11
type: "新規の選定・方針"
---

# ADR 2026-10-11: production-material-embed: 制作物の資料はモーダルのページに iframe で埋め込む

制作物の紹介資料（Google スライドなど）は、モーダルのページの `embedUrl` に埋め込み用の URL を書き、iframe で表示する。別タブで開くリンクだけより、サイト内でそのままめくれて内容が伝わるため。サムネイルをスライドから自動で取る案は、外部画像のドメイン許可が要るため見送った（[Issue #70](https://github.com/Kazu-K0032/profile/issues/70)）。
