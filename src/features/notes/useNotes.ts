import { useEffect, useState, useCallback, useMemo } from "react";
import {
  fetchQiitaArticles,
  getCachedArticles,
  cacheArticles,
} from "@/lib/qiita";
import type { QiitaArticle } from "@/types/qiita.types";
import { PAGINATION_CONSTANTS } from "./Notes.constants";
import type { SortOption } from "./Notes.types";
import {
  sortArticles,
  getCurrentPageArticles,
  calculateTotalPages,
  getNextLoadingText,
  getErrorMessage,
} from "./Notes.utils";

export const useNotes = () => {
  // Qiita記事
  const [articles, setArticles] = useState<QiitaArticle[]>([]);
  // ロード状態
  const [isLoading, setIsLoading] = useState(false);
  // ロードテキスト
  const [loadingText, setLoadingText] = useState(".");
  // 現在のページ
  const [currentPage, setCurrentPage] = useState(1);
  // エラー
  const [error, setError] = useState<string | null>(null);
  // ソートオプション
  const [sortOption, setSortOption] = useState<SortOption>("created_at");

  /**
   * Qiita記事を取得する
   */
  const fetchQiitaData = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchQiitaArticles();
      setArticles(data);
      cacheArticles(data);
    } catch (error) {
      console.error(error);
      setError(getErrorMessage(error));
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Qiita記事をキャッシュから取得する
   */
  useEffect(() => {
    const cachedArticles = getCachedArticles();
    if (cachedArticles) {
      // localStorage キャッシュからの初期復元（クライアント側マウント時の一度だけ実行）
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setArticles(cachedArticles);
      return;
    }

    setIsLoading(true);
    fetchQiitaData();
  }, [fetchQiitaData]);

  /**
   * ロードテキストを更新する
   */
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isLoading) {
      intervalId = setInterval(() => {
        setLoadingText((prev) => getNextLoadingText(prev));
      }, PAGINATION_CONSTANTS.LOADING_INTERVAL);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isLoading]);

  // ソートされた記事を取得
  const sortedArticles = useMemo(() => {
    return sortArticles(articles, sortOption);
  }, [articles, sortOption]);

  const articlesPerPage = PAGINATION_CONSTANTS.ARTICLES_PER_PAGE;
  const totalPages = calculateTotalPages(
    sortedArticles.length,
    articlesPerPage
  );
  const currentArticles = getCurrentPageArticles(
    sortedArticles,
    currentPage,
    articlesPerPage
  );

  /**
   * 前のページに移動する
   */
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  /**
   * 次のページに移動する
   */
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return {
    articles,
    isLoading,
    loadingText,
    currentPage,
    error,
    currentArticles,
    totalPages,
    sortOption,
    setSortOption,
    handlePrevPage,
    handleNextPage,
    fetchQiitaData,
  };
};
