import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { NAVIGATION_TABS } from "@/constants/globals.constants";
import { SKILLS } from "./About.constants";

/**
 * Aboutコンポーネント用のカスタムフック
 */
export const useAbout = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // next-themes 公式のSSRハイドレーション回避パターン
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const aboutTab = NAVIGATION_TABS.find((tab) => tab.key === "About");
  const mainTitle = aboutTab?.title || "About";
  const subTitle = aboutTab?.subtitle || "私について";

  // スキルをカテゴリ別にフィルタリング
  const professionalSkills = SKILLS.filter(
    (skill) => skill.category === "professional"
  );
  const productSkills = SKILLS.filter((skill) => skill.category === "product");
  const hobbySkills = SKILLS.filter((skill) => skill.category === "hobby");

  return {
    resolvedTheme,
    mounted,
    mainTitle,
    subTitle,
    professionalSkills,
    productSkills,
    hobbySkills,
  };
};
