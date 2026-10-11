---
paths:
  - "src/**"
docs-type: ai-doc
---

# src/ のディレクトリと命名の規約

## ディレクトリの役割

| ディレクトリ           | 置くもの                                                                     |
| ---------------------- | ---------------------------------------------------------------------------- |
| `src/app/`             | App Router のページ・レイアウト・API ルート（`api/**/route.ts`）             |
| `src/features/<機能>/` | 1 つの機能に閉じたコンポーネント・フック・定数・型・スタイル・ユーティリティ |
| `src/components/`      | 複数の機能から使う共通コンポーネント                                         |
| `src/hooks/`           | 複数の機能から使うカスタムフック（`useXxx.ts`）                              |
| `src/lib/`             | 外部 API のクライアント                                                      |
| `src/schemas/`         | zod のスキーマ（`*.schemas.ts`）。外部 API のレスポンスと環境変数を検証する  |
| `src/constants/`       | 共通の定数（`*.constants.ts`）                                               |
| `src/types/`           | 共通の型（`*.types.ts`）                                                     |
| `src/styles/`          | `globals.css` と共通のスタイル定義（`*.styles.ts`）                          |
| `src/utils/`           | 共通のユーティリティ関数（`*.utils.ts`）                                     |

1 つの機能でしか使わないものは `src/features/<機能>/` に置く。2 つ以上の機能で使うようになったら、上の共通ディレクトリへ移す。

## features の構成

```text
src/features/notes/
├── index.ts               # 外へ公開するものだけを export する
├── Notes.tsx              # 機能のメインのコンポーネント
├── Notes.constants.ts
├── Notes.types.ts
├── Notes.styles.ts        # Tailwind のクラス名をまとめたもの
├── Notes.utils.ts
├── useNotes.ts
└── components/            # この機能だけで使う子コンポーネント
```

- 機能の外から読み込むときは、`index.ts` を経由する。`index.ts` で公開するものは最小限にする
- ファイル名の接尾辞は、定数 `.constants.ts`・型 `.types.ts`・スタイル `.styles.ts`・ユーティリティ `.utils.ts`・スキーマ `.schemas.ts` にそろえる

## 命名

| 対象                     | 形                             | 例                                     |
| ------------------------ | ------------------------------ | -------------------------------------- |
| コンポーネントのファイル | PascalCase                     | `Notes.tsx`・`SortSelector.tsx`        |
| フックのファイル         | `use` + PascalCase             | `useNotes.ts`                          |
| 機能のディレクトリ       | 小文字（複数語はケバブケース） | `notes/`・`production/`                |
| 接尾辞付きのファイル     | 対象名 + 接尾辞                | `Notes.constants.ts`・`env.schemas.ts` |
