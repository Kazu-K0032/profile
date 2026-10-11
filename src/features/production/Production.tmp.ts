import type { ProductionItem } from "./Production.types";

// 手動追加する場合はこちらのフォーマットに合わせる
export const PRODUCTION_ITEM_FORMAT: ProductionItem = {
  id: "",
  title: "",
  description: "",
  url: "",
  publishedAt: "",
  thumbnailUrl: "",
  tags: [""],
  features: [""],
  otherSite: [
    {
      siteTtl: "",
      siteIconPath: "",
      siteUrl: "",
    },
  ],
  modal: {
    longDescription: "",
    images: [""],
    demoUrl: "",
    repoUrl: "",
    pages: [
      {
        title: "",
        content: [""],
        embedUrl: "",
      },
    ],
  },
};
