/**
 * 環境変数ユーティリティ関数
 * 環境変数のスキーマ検証と型安全な取得を行う
 */

import {
  environmentVariablesSchema,
  type EnvironmentVariables,
} from "@/schemas/env.schemas";

/**
 * 環境変数のスキーマ検証を行い、検証済みの値を返す
 * 検証失敗時は、内部のZodErrorをそのままthrowするとレスポンスに環境変数名・期待型などの
 * 詳細が漏出するため、フィールド名のみを含む固定文言のErrorに詰め替えてthrowする
 * @returns 検証済みの環境変数オブジェクト
 * @throws {Error} 環境変数の設定に問題がある場合
 */
export function validateEnvironment(): EnvironmentVariables {
  const result = environmentVariablesSchema.safeParse(process.env);
  if (!result.success) {
    const invalidKeys = Array.from(
      new Set(result.error.issues.map((issue) => issue.path.join(".")))
    ).join(", ");
    throw new Error(
      `Required environment variables are missing or invalid: ${invalidKeys}`
    );
  }
  return result.data;
}
