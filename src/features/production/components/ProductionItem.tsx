"use client";

import Image from "next/image";
import Link from "next/link";
import { getIconSize } from "@/styles/design.styles";
import { cn } from "@/utils/cn.utils";
import { TOP_PRIORITY_IMAGE_COUNT } from "../Production.constants";
import { productionStyles } from "../Production.styles";
import type { ProductionItem as ProductionItemType } from "../Production.types";
import { hasModal } from "../Production.utils";

interface ProductionItemProps {
  item: ProductionItemType;
  index: number;
  onOpenModal: (itemId: string) => void;
}

export default function ProductionItem({
  item,
  index,
  onOpenModal,
}: ProductionItemProps) {
  return (
    <li
      key={item.id}
      className={cn(productionStyles.productionCard, "card-hover")}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => hasModal(item) && onOpenModal(item.id)}
        onKeyDown={(e) => {
          if (!hasModal(item)) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenModal(item.id);
          }
        }}
        className="grid cursor-pointer grid-cols-1 gap-0 md:grid-cols-12"
      >
        {/* 左：サムネイル */}
        <div className="relative h-48 md:col-span-5 md:h-auto">
          <Image
            src={item.thumbnailUrl || item.modal?.images?.[0] || ""}
            alt={item.title}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="rounded-l-xl object-cover md:rounded-l-xl md:rounded-r-none"
            priority={index < TOP_PRIORITY_IMAGE_COUNT}
          />
        </div>
        {/* 右：本文 */}
        <div className="relative flex flex-col justify-between rounded-r-xl p-5 md:col-span-7">
          <div>
            <div className="mb-2 flex justify-end">
              <span className={productionStyles.dateBadge}>
                {item.publishedAt}
              </span>
            </div>
            <h3 className={productionStyles.title}>{item.title}</h3>
            <p
              className={cn(
                "text-sm leading-7",
                "text-gray-700 dark:text-gray-200"
              )}
            >
              {item.description}
            </p>
            {item.tags && item.tags.length > 0 && (
              <p
                className={cn(
                  "mt-3 text-sm",
                  "text-gray-600 dark:text-gray-300"
                )}
              >
                使用技術: {item.tags.join(", ")}
              </p>
            )}
          </div>
          <div className="mt-6 flex items-center gap-4">
            {/* GitHub アイコン */}
            {item.modal?.repoUrl && (
              <a
                href={item.modal.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="GitHub Repository"
                className={productionStyles.iconButton}
              >
                <Image
                  src="/icon/icon_github.svg"
                  alt="GitHub"
                  width={20}
                  height={20}
                  className={`${getIconSize("lg")} dark:invert`}
                  priority={false}
                />
              </a>
            )}
            {/* 他サイトアイコン */}
            {item.otherSite && item.otherSite.length > 0 && (
              <div className="flex items-center gap-2">
                {item.otherSite.map((site) => (
                  <a
                    key={site.siteUrl}
                    href={site.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title={site.siteTtl}
                    className={productionStyles.iconButton}
                  >
                    <Image
                      src={site.siteIconPath}
                      alt={site.siteTtl}
                      width={20}
                      height={20}
                      className={getIconSize("lg")}
                      priority={false}
                    />
                  </a>
                ))}
              </div>
            )}
            {/* 外部リンクボタン（URL が無い制作物では出さない） */}
            {item.url && (
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-primary ml-auto"
              >
                アプリを見る
                <span aria-hidden>»</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
