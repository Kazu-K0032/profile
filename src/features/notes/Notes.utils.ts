import { DateTime } from "luxon";
import type { QiitaArticle } from "@/schemas/qiita.schemas";
import type { SortOption } from "./Notes.types";

/**
 * 記事をソートする
 * @param {QiitaArticle[]} articles - ソートする記事の配列
 * @param {SortOption} sortOption - ソートオプション
 * @returns {QiitaArticle[]} ソートされた記事の配列
 */
export const sortArticles = (
  articles: QiitaArticle[],
  sortOption: SortOption
): QiitaArticle[] => {
  const sortedArticles = [...articles].sort((a, b) => {
    switch (sortOption) {
      case "created_at":
        const aDate = DateTime.fromISO(a.created_at).setZone("Asia/Tokyo");
        const bDate = DateTime.fromISO(b.created_at).setZone("Asia/Tokyo");
        return bDate.toMillis() - aDate.toMillis();
      case "likes_count":
        const aLikes = a.likes_count || 0;
        const bLikes = b.likes_count || 0;
        return bLikes - aLikes;
      default:
        return 0;
    }
  });

  return sortedArticles;
};

/**
 * ページネーション用の記事を取得する
 * @param {QiitaArticle[]} articles - 全記事の配列
 * @param {number} currentPage - 現在のページ
 * @param {number} articlesPerPage - 1ページあたりの記事数
 * @returns {QiitaArticle[]} 現在のページの記事の配列
 */
export const getCurrentPageArticles = (
  articles: QiitaArticle[],
  currentPage: number,
  articlesPerPage: number
): QiitaArticle[] => {
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  return articles.slice(startIndex, endIndex);
};

/**
 * 総ページ数を計算する
 * @param {number} totalArticles - 総記事数
 * @param {number} articlesPerPage - 1ページあたりの記事数
 * @returns {number} 総ページ数
 */
export const calculateTotalPages = (
  totalArticles: number,
  articlesPerPage: number
): number => {
  return Math.ceil(totalArticles / articlesPerPage);
};

/**
 * ロードテキストを更新する
 * @param {string} currentText - 現在のロードテキスト
 * @returns {string} 次のロードテキスト
 */
export const getNextLoadingText = (currentText: string): string => {
  switch (currentText) {
    case ".":
      return "..";
    case "..":
      return "...";
    default:
      return ".";
  }
};

/**
 * エラーメッセージを取得する
 * @param {unknown} error - エラーオブジェクト
 * @returns {string} エラーメッセージ
 */
export const getErrorMessage = (error: unknown): string => {
  return error instanceof Error
    ? error.message
    : "予期せぬエラーが発生しました";
};
