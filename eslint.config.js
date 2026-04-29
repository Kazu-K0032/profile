import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  // Next.js Core Web Vitals 用ルールセット（パフォーマンス・SEOに関わる必須ルール）
  ...nextVitals,
  // Next.js + TypeScript 用ルールセット（@typescript-eslint の推奨ルールを含む）
  ...nextTs,
  {
    plugins: {
      // import 文の検証用プラグイン（順序・未解決パスの検出など）
      import: importPlugin,
    },
    rules: {
      // インポート順序の設定
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js 組み込みモジュール
            "external", // npm パッケージ
            "internal", // 内部モジュール（パスエイリアスなど）
            "parent", // 親ディレクトリからのインポート
            "sibling", // 同一ディレクトリからのインポート
            "index", // index ファイルからのインポート
          ],
          // グループ間に空行を入れない
          "newlines-between": "never",
          alphabetize: {
            // アルファベット昇順でソート
            order: "asc",
            // 大文字小文字を区別しない
            caseInsensitive: true,
          },
          pathGroups: [
            {
              // react は external の先頭に配置
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              // next/* は external の先頭側（react の次）に配置
              pattern: "next/**",
              group: "external",
              position: "before",
            },
            {
              // @/* （プロジェクト内エイリアス）は internal の先頭に配置
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
          // react / next は pathGroups の対象から除外しないよう明示
          pathGroupsExcludedImportTypes: ["react", "next"],
        },
      ],
      // 未使用の変数・インポートをエラー化（先頭 _ の変数は許容）
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // 一貫性のあるクォート使用（ダブルクォート、エスケープ回避時のみシングル許可）
      quotes: ["error", "double", { avoidEscape: true }],
      // セミコロンの強制
      semi: ["error", "always"],
    },
  },
  // lint 対象から除外するパス（ビルド成果物・自動生成ファイル）
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
