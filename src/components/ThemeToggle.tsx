"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { THEME_MODES } from "@/constants/globals.constants";
import { cn } from "@/utils/cn.utils";

/**
 * テーマ切り替えボタンのスタイル
 */
const themeToggleStyles = {
  base: "fixed z-50 flex select-none items-center gap-2 rounded-full px-3 py-2 font-medium backdrop-blur-md transition-all duration-300 w-10 h-10 justify-center cursor-pointer",
  // SP版: 右下、PC版: 右上
  position: "right-4 bottom-4 md:right-4 md:top-2",
  dark: "bg-gray-800/70 text-gray-200 shadow-lg shadow-gray-800/50 hover:bg-gray-700/70 border border-teal-300/50",
  light:
    "bg-white/70 text-gray-800 shadow-lg shadow-gray-300/50 hover:bg-gray-50/70",
  placeholder:
    "invisible fixed right-4 bottom-4 md:right-4 md:top-2 z-50 flex items-center gap-2 rounded-full px-3 py-2 font-medium w-10 h-10 justify-center",
} as const;

/**
 * テーマトグルボタンのスタイル
 * @param isDark テーマがダークかどうか
 * @returns テーマトグルボタンのスタイル
 */
const getThemeToggleClasses = (isDark: boolean) => {
  return cn(
    themeToggleStyles.base,
    themeToggleStyles.position,
    isDark ? themeToggleStyles.dark : themeToggleStyles.light
  );
};

/**
 * テーマ切り替えボタン
 */
export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // next-themes 公式のSSRハイドレーション回避パターン
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  /**
   * テーマ切り替え
   */
  const toggleTheme = () => {
    setTheme(theme === THEME_MODES.DARK ? THEME_MODES.LIGHT : THEME_MODES.DARK);
  };

  // マウント前のプレースホルダー
  if (!mounted) {
    return (
      <button className={themeToggleStyles.placeholder}>
        <span className="text-lg">☀️</span>
      </button>
    );
  }

  const isDark = resolvedTheme === THEME_MODES.DARK;

  return (
    <button onClick={toggleTheme} className={getThemeToggleClasses(isDark)}>
      <span className="text-lg">{isDark ? "🌙" : "☀️"}</span>
    </button>
  );
}
