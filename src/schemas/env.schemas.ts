import * as z from "zod";

/**
 * 環境変数のスキーマ
 * - QIITA_TOKEN: 非空文字列
 */
export const environmentVariablesSchema = z
  .object({
    QIITA_TOKEN: z.string().min(1).describe("Qiita APIの認証トークン"),
  })
  .describe("アプリケーションの必須環境変数");

export type EnvironmentVariables = z.infer<typeof environmentVariablesSchema>;
