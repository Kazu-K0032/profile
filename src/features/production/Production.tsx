"use client";

import Image from "next/image";
import { getIconSize } from "@/styles/design.styles";
import { cn } from "@/utils/cn.utils";
import { ProductionModal, ProductionItem } from "./components";
import { productionStyles } from "./Production.styles";
import { useProduction } from "./useProduction";

export default function Production() {
  const { items, selectedItem, isOpen, openModal, closeModal } =
    useProduction();

  return (
    <section>
      <div className="mb-12 text-center">
        <h2 className="heading-2 mb-4">Production</h2>
        <p className="text-xl font-medium text-gray-700 dark:text-gray-200">
          制作物
        </p>
      </div>
      <div className="mx-auto max-w-6xl">
        <ul className="grid gap-6 md:grid-cols-1">
          {items.map((item, index) => (
            <ProductionItem
              key={item.id}
              item={item}
              index={index}
              onOpenModal={openModal}
            />
          ))}
        </ul>
      </div>
      {isOpen && selectedItem && (
        <ProductionModal
          isOpen={isOpen}
          onClose={closeModal}
          title={selectedItem.title}
          pages={selectedItem.modal?.pages}
          leftSlot={
            <Image
              src={
                selectedItem.modal?.images?.[0] ||
                selectedItem.thumbnailUrl ||
                ""
              }
              alt={selectedItem.title}
              width={1200}
              height={800}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full rounded-xl border border-gray-200/70 shadow-sm dark:border-neutral-800/70"
              priority={false}
            />
          }
          rightSlot={
            <div>
              {selectedItem.description && (
                <div>
                  <div
                    className={cn(
                      "mb-2 text-base font-bold",
                      "text-black dark:text-white"
                    )}
                  >
                    概要
                  </div>
                  <p
                    className={cn(
                      "text-sm leading-6",
                      "text-gray-700 dark:text-gray-200"
                    )}
                  >
                    {selectedItem.description}
                  </p>
                </div>
              )}
              {selectedItem.tags && selectedItem.tags.length > 0 && (
                <div className="mt-6">
                  <div
                    className={cn(
                      "mb-2 text-base font-bold",
                      "text-black dark:text-white"
                    )}
                  >
                    使用技術
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag) => (
                      <span key={tag} className={productionStyles.tagBadge}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedItem.features && selectedItem.features.length > 0 && (
                <div className="mt-6">
                  <div
                    className={cn(
                      "mb-2 text-base font-bold",
                      "text-black dark:text-white"
                    )}
                  >
                    主な機能
                  </div>
                  <ul className="space-y-2">
                    {selectedItem.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-center text-sm leading-6 text-gray-700 dark:text-gray-200"
                      >
                        <svg
                          className={`mr-2 ${getIconSize("md")} flex-shrink-0 text-green-500`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="flex-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          }
        />
      )}
    </section>
  );
}
