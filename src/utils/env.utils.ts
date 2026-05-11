/**
 * 環境変数ユーティリティ関数
 * QIITA_TOKENの検証のみを行う
 */

import {
  environmentVariablesSchema,
  type EnvironmentVariables,
} from "@/schemas/env.schemas";

/**
 * 必須環境変数の型安全な取得関数
 * @param key 環境変数のキー
 * @returns 環境変数の値（undefinedの場合はエラーを投げる）
 */
export function getRequiredEnvVariable<K extends keyof EnvironmentVariables>(
  key: K
): EnvironmentVariables[K] {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value as EnvironmentVariables[K];
}

/**
 * 環境変数の設定をチェックし、問題があればエラーを投げる関数
 * 環境変数のバリデーション失敗はデプロイ設定のバグなので、
 * recoverableな検証ではなく `.parse()` で即時例外を投げる
 * @throws {z.ZodError} 環境変数の設定に問題がある場合
 */
export function validateEnvironment(): void {
  environmentVariablesSchema.parse(process.env);
}
