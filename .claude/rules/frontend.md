---
paths:
  - "**/*.ts"
  - "**/*.tsx"
docs-type: ai-doc
---

# TypeScript・React の実装規約

整形（インデント・クォート・セミコロン）は Prettier、import の順序は ESLint に任せる。ここには、ツールでは検出できない規約だけを書く。

## 命名

| 対象                     | 形                    | 例                                |
| ------------------------ | --------------------- | --------------------------------- |
| 変数・関数               | camelCase             | `navigationLinks`・`getIconSize`  |
| 真偽値                   | `is` / `has` で始める | `isOpen`・`isLoading`             |
| 定数                     | UPPER_SNAKE_CASE      | `SITE_TITLE`・`NAVIGATION_TABS`   |
| 配列・オブジェクトの集合 | 複数形                | `navigationLinks`                 |
| コンポーネント・型       | PascalCase            | `ProductionModal`・`QiitaArticle` |

関数名は動詞 + 名詞にする。切り替えは `toggleXxx`、イベント処理は `handleXxx`、取得は `getXxx` を使う。

## 書き方

- `const` を使い、再代入するときだけ `let` を使う。`var` は使わない
- 比較は `===` / `!==` を使う
- 配列・オブジェクトはリテラルで作り、コピーはスプレッド構文、取り出しは分割代入を使う
- 外部 API の通信は `fetch` と `async` / `await` で書き、失敗は `try` / `catch` で扱う
- 外部入力（API のレスポンス・環境変数）は `src/schemas/` の zod スキーマで検証してから使う。型は `z.infer` で取り、手で二重に書かない
- 関数には JSDoc（1 行目に説明、`@param`・`@returns`）を付ける。コンポーネントには付けなくてよい

## マークアップ

- `section`・`nav`・`header`・`footer` などの意味のある要素を使い、`div` を重ねすぎない
- `h1` はページに 1 つにし、見出しの階層を飛ばさない
- 画像は `next/image` を使い、内容を表す `alt` を付ける。装飾だけの画像は `alt=""` にする
- 外部リンクを新しいタブで開くときは `target="_blank"` と `rel="noopener noreferrer"` を付ける
- フォームの入力欄には `label` を関連付ける
