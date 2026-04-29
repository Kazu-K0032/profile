import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { NAVIGATION_TABS } from "@/constants/globals.constants";
import type { NavigationTabKey } from "@/types/globals.types";

interface UseTabStateProps {
  initialTab: NavigationTabKey;
}

interface UseTabStateReturn {
  currentPage: NavigationTabKey;
  isInitialized: boolean;
  handleNavClick: (page: NavigationTabKey) => void;
}

/**
 * タブ状態管理フック
 * タブの切り替え、初期化、URLパラメータとの同期を管理
 * @returns {UseTabStateReturn} タブ状態管理フックの戻り値
 * @property {NavigationTabKey} currentPage 現在のタブ
 * @property {boolean} isInitialized 初期化状態
 * @property {function} handleNavClick ナビゲーションクリックハンドラー
 */
export const useTabState = ({
  initialTab,
}: UseTabStateProps): UseTabStateReturn => {
  // 現在のタブ
  const [currentPage, setCurrentPage] = useState<NavigationTabKey>(initialTab);
  // 初期化状態
  const [isInitialized, setIsInitialized] = useState(false);
  // ルーター
  const router = useRouter();
  // 検索パラメータ
  const searchParams = useSearchParams();

  /**
   * ナビゲーションクリックハンドラー
   * URLパラメータを更新
   */
  const handleNavClick = useCallback(
    (page: NavigationTabKey) => {
      setCurrentPage(page);

      // URLパラメータを更新
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", page);
      router.push(`/?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  /**
   * コンポーネントマウント時の初期化処理
   * URLパラメータのみを使用
   */
  useEffect(() => {
    const urlTab = searchParams.get("tab") as NavigationTabKey;

    // URLクエリパラメータからタブ状態を同期（外部状態 → React stateの同期）
    // ブラウザの戻る/進むなど外部要因の URL 変化にも追従する必要があるため effect で同期
    if (urlTab && NAVIGATION_TABS.some((tab) => tab.key === urlTab)) {
      // URLパラメータが有効な場合はそれを使用
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(urlTab);
    } else {
      // URLパラメータがない場合はデフォルトタブを使用
      setCurrentPage(initialTab);
    }

    // 初期化フラグは1度だけ立てる（命名と挙動の整合性確保）
    if (!isInitialized) setIsInitialized(true);
  }, [searchParams, initialTab, isInitialized]);

  return {
    currentPage,
    isInitialized,
    handleNavClick,
  };
};
