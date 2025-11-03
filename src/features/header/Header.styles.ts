import { cn } from "@/utils/cn.utils";

/**
 * ヘッダー関連のスタイルクラス
 */
export const headerStyles = {
  container: "relative",
  header: cn(
    "w-full c-bg-header transition-colors duration-300",
    "text-black dark:text-white"
  ),
  content: "relative flex h-full items-center justify-center",
  section: "flex flex-col items-center",
} as const;

/**
 * ナビゲーションのスタイル
 */
export const navigationStyles = {
  nav: "flex items-center justify-center",
  list: "flex list-none gap-x-5 text-center text-xl md:text-3xl",
  button: {
    base: "relative select-none px-3 py-1 transition-all duration-200 cursor-pointer min-h-[2.5rem] flex items-center justify-center font-medium",
    active: cn(
      "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-2 after:border-dotted after:border-teal-600",
      "dark:text-white dark:after:border-teal-400"
    ),
    inactive: cn(
      "text-gray-600 hover:text-black",
      "dark:text-gray-200 dark:hover:text-white"
    ),
  },
} as const;

/**
 * ポートフォリオタイトルのスタイル
 */
export const portfolioTitleStyles = {
  title: cn(
    "c-bg-header absolute top-2 flex max-w-full select-none items-center justify-center break-words px-4 py-2 text-center text-2xl md:text-3xl font-bold md:px-0",
    "text-black dark:text-white"
  ),
} as const;

/**
 * ナビゲーションボタンのスタイル
 * @param isActive ナビゲーションボタンがアクティブかどうか
 * @returns ナビゲーションボタンのスタイル
 */
export const getNavigationButtonClasses = (isActive: boolean) => {
  return cn(
    navigationStyles.button.base,
    isActive ? navigationStyles.button.active : navigationStyles.button.inactive
  );
};
