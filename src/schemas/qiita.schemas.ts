import * as z from "zod";

/**
 * Qiita APIのレスポンス
 * 記事1つのスキーマ
 * @see https://qiita.com/api/v2/docs#%E6%8A%95%E7%A8%BF
 */
export const qiitaArticleSchema = z
  .object({
    id: z.string().describe("Qiita記事のID"),
    created_at: z.iso
      .datetime({ offset: true })
      .describe("ISO 8601形式の作成日時"),
    url: z
      .url({ protocol: /^https?$/ })
      .describe("Qiita記事のURL（http(s)のみ）"),
    title: z.string().describe("Qiita記事のタイトル"),
    likes_count: z.number().optional().describe("いいね数"),
  })
  .describe("Qiita記事");

export const qiitaArticleListSchema = z
  .array(qiitaArticleSchema)
  .describe("Qiita記事の配列");

export type QiitaArticle = z.infer<typeof qiitaArticleSchema>;
