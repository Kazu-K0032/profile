import { STORAGE_KEY } from "@/constants/globals.constants";
import {
  qiitaArticleListSchema,
  type QiitaArticle,
} from "@/schemas/qiita.schemas";

const QIITA_ENDPOINT = "/api/qiita";

/**
 * Qiita APIから記事を取得する
 * @returns {Promise<QiitaArticle[]>} 投稿順でソートされたQiita記事の配列
 * @throws {Error} API呼び出しに失敗した場合
 */
export const fetchQiitaArticles = async () => {
  const res = await fetch(QIITA_ENDPOINT);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "記事の取得に失敗しました");
  }

  // 内部APIだが中間者改竄や不整合への防御として外部入力扱いでZod検証する
  const validation = qiitaArticleListSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("データの形式が不正です");
  }

  // 検証対象外のsiteフィールドを保持するため元データをソート対象にする
  const sortedData = (data as QiitaArticle[]).sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  return sortedData;
};

/**
 * セッションストレージからキャッシュされた記事を取得する
 * sessionStorageは外部入力扱い（DevTools・拡張機能等で書き換え可能）のため、
 * 取り出した値はZodスキーマで形状検証する
 * @returns {QiitaArticle[] | null} キャッシュされた記事の配列、キャッシュが無効または存在しない場合はnull
 */
export const getCachedArticles = (): QiitaArticle[] | null => {
  const cachedData = sessionStorage.getItem(STORAGE_KEY);
  if (!cachedData) return null;

  try {
    const parsed = JSON.parse(cachedData);

    if (typeof parsed?.timestamp !== "number") return null;

    // 1時間
    const oneHour = 3600000;
    // 1時間以内の場合はキャッシュされた記事を返す
    if (Date.now() - parsed.timestamp >= oneHour) return null;

    const validation = qiitaArticleListSchema.safeParse(parsed.articles);
    if (!validation.success) return null;

    // siteフィールド等の検証対象外プロパティを保持するため、検証成功時は元データを返す
    return parsed.articles as QiitaArticle[];
  } catch {
    return null;
  }
};

/**
 * 記事をセッションストレージにキャッシュする
 * @param {QiitaArticle[]} articles - キャッシュする記事の配列
 * @returns {void}
 */
export const cacheArticles = (articles: QiitaArticle[]) => {
  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      articles,
      timestamp: Date.now(),
    })
  );
};
