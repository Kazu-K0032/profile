"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/utils/cn.utils";
import type { ProductionMarkdownPage } from "../Production.types";

/**
 * インラインリンクをレンダリング
 * - Markdown記法のリンクをレンダリング
 * @param text
 * @returns
 * @example
 * ```
 * [リンク](URL)
 * ```
 * → <a href="URL">リンク</a>
 */
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  // リンクにあたる正規表現
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  // 最後のインデックス
  let lastIndex = 0;
  // マッチング結果
  let regexResult: RegExpExecArray | null;
  //文字列中の Markdown リンクを順次にリンクタグに変換する
  while ((regexResult = linkRe.exec(text)) !== null) {
    if (regexResult.index > lastIndex) {
      parts.push(text.slice(lastIndex, regexResult.index));
    }
    parts.push(
      <a
        key={`a-${parts.length}`}
        href={regexResult[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        {regexResult[1]}
      </a>
    );
    lastIndex = regexResult.index + regexResult[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

/**
 * マークダウン風のコンテンツをレンダリング
 * @param content
 * @returns
 * @example
 * ```
 * [リンク](URL)
 * ## 見出し
 * - 箇条書き
 * ### サブ見出し
 * - サブ箇条書き
 * ```
 * → <a href="URL">リンク</a>
 * <h2>見出し</h2>
 * <ul>
 *   <li>箇条書き</li>
 * </ul>
 * <h3>サブ見出し</h3>
 * <ul>
 *   <li>サブ箇条書き</li>
 * </ul>
 */
function renderMarkdownLikeContent(content?: string[]) {
  if (!content) return null;
  // 行単位で解釈
  const lines = content;
  // 要素
  const elements: React.ReactNode[] = [];
  // 段落
  let paragraph: string[] = [];
  // 箇条書き
  let listItems: string[] = [];

  const flush = () => {
    // 段落があれば、パラグラフ要素としてレンダリング
    if (paragraph.length) {
      elements.push(
        <p
          key={`p-${elements.length}`}
          className="text-sm leading-7 text-gray-700 dark:text-gray-200"
        >
          {renderInline(paragraph.join("\n"))}
        </p>
      );
      paragraph = [];
    }
    // 箇条書きがあれば、リスト要素としてレンダリング
    if (listItems.length) {
      elements.push(
        <ul
          key={`ul-${elements.length}`}
          className="ml-5 list-disc space-y-1 text-sm text-gray-700 dark:text-gray-200"
        >
          {listItems.map((t, i) => (
            <li key={`li-${i}`}>{renderInline(t)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  // 行単位で解釈
  lines.forEach((raw) => {
    const line = raw.replace(/\s+$/, "");
    if (line.trim() === "") {
      // 空行の場合は、フラッシュ
      flush();
      return;
    }
    // 箇条書きの場合
    const li = line.match(/^\s*[-*]\s+(.+)/);
    if (li) {
      // 段落があれば、フラッシュ
      if (paragraph.length) flush();
      listItems.push(li[1]);
      return;
    } else if (listItems.length) {
      // 箇条書きがあれば、フラッシュ
      flush();
    }

    // 見出し2の場合
    const h2 = line.match(/^##\s+(.+)/);
    if (h2) {
      // 見出し2があれば、フラッシュ
      flush();
      elements.push(
        <h2
          key={`h2-${elements.length}`}
          className="mt-6 mb-2 text-lg font-bold text-black dark:text-white"
        >
          {h2[1]}
        </h2>
      );
      return;
    }
    // 見出し3の場合
    const h3 = line.match(/^###\s+(.+)/);
    if (h3) {
      // 見出し3があれば、フラッシュ
      flush();
      elements.push(
        <h3
          key={`h3-${elements.length}`}
          className="mt-4 mb-2 text-base font-semibold text-black dark:text-white"
        >
          {h3[1]}
        </h3>
      );
      return;
    }
    // 見出し4の場合
    const h4 = line.match(/^####\s+(.+)/);
    if (h4) {
      // 見出し4があれば、フラッシュ
      flush();
      elements.push(
        <h4
          key={`h4-${elements.length}`}
          className="mt-3 mb-1 text-sm font-semibold text-black dark:text-white"
        >
          {h4[1]}
        </h4>
      );
      return;
    }
    // 段落の場合
    paragraph.push(line);
  });

  // フラッシュ
  flush();
  return <div className="space-y-3">{elements}</div>;
}

interface ProductionModalProps {
  isOpen: boolean; // モーダルが開いているかどうか
  onClose: () => void; // モーダルを閉じる
  title?: string; // モーダルのタイトル
  leftSlot?: React.ReactNode; // モーダルの左側のコンテンツ
  rightSlot?: React.ReactNode; // モーダルの右側のコンテンツ
  pages?: ProductionMarkdownPage[]; // モーダルのページ
}

/**
 * モーダル
 */
export default function ProductionModal({
  isOpen,
  onClose,
  title,
  leftSlot,
  rightSlot,
  pages = [],
}: ProductionModalProps) {
  // モーダルが開いているかどうか
  const [visible, setVisible] = useState(false);
  // ページインデックス
  const [pageIndex, setPageIndex] = useState(0);

  // モーダルを閉じる（アニメーション後に実行）
  const handleClose = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  /**
   * モーダルを開く
   */
  useEffect(() => {
    if (!isOpen) return;

    // サーバーサイドレンダリング時の考慮
    if (typeof window === "undefined" || !document.body) return;

    // 背景のスクロールを無効化
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // エスケープキーでモーダルを閉じる
    const controller = new AbortController();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey, { signal: controller.signal });

    // モーダルを開く
    const raf = window.requestAnimationFrame(() => setVisible(true));

    return () => {
      // 背景のスクロールを復元
      if (typeof window !== "undefined" && document.body) {
        document.body.style.overflow = originalStyle;
      }
      controller.abort();
      window.cancelAnimationFrame(raf);
      setVisible(false);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  // 1ページ目は rightSlot（概要）
  const totalPages = pages.length + 1;
  // 現在のページ
  const currentPage = pageIndex > 0 ? pages[pageIndex - 1] : undefined;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-black/50 backdrop-blur-sm",
        "transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0"
      )}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Modal dialog"}
      onClick={handleClose}
    >
      <div
        className={cn(
          "flex h-5/6 w-11/12 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl",
          "dark:bg-neutral-900",
          "transition-all duration-300 ease-out",
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-6">
          <h2
            className={cn(
              "text-2xl leading-tight font-extrabold md:text-3xl",
              "text-black dark:text-white"
            )}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
              "text-black hover:bg-gray-100 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:outline-none",
              "dark:text-white dark:hover:bg-gray-800 dark:focus:ring-offset-0"
            )}
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden md:inline">閉じる</span>
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col px-4 pb-6 md:grid md:h-[calc(80vh-75px)] md:grid-cols-2 md:gap-8 md:overflow-hidden md:px-8">
          <div className="flex shrink-0 items-center justify-center md:h-full">
            <div className="w-full max-w-[350px] md:max-w-none">{leftSlot}</div>
          </div>
          <div className="relative flex min-h-0 flex-1 flex-col pt-2 md:border-l md:border-gray-200 md:pt-0 md:pl-8 dark:md:border-neutral-800">
            <div className="scrollbar-custom flex min-h-0 flex-1 flex-col overflow-y-auto md:overflow-hidden">
              <div className="scrollbar-custom min-h-0 flex-1 overflow-x-hidden md:max-h-[calc(70vh-120px)] md:flex-1 md:overflow-y-auto">
                {pageIndex === 0 || pages.length === 0 ? (
                  rightSlot
                ) : currentPage ? (
                  <div className="max-w-none space-y-4">
                    {currentPage.title && (
                      <h2 className="text-lg font-bold text-black dark:text-white">
                        {currentPage.title}
                      </h2>
                    )}
                    {renderMarkdownLikeContent(currentPage.content)}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="shrink-0 pt-2 md:sticky md:bottom-0 md:z-10 md:backdrop-blur dark:md:border-neutral-800 dark:md:bg-neutral-900/80">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  // 前のページに移動
                  onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
                  disabled={pageIndex === 0}
                  className={cn(
                    "w-max rounded-lg px-4 py-2 text-sm font-medium shadow-sm",
                    pageIndex === 0
                      ? "cursor-not-allowed bg-emerald-600/40 text-white/70"
                      : "cursor-pointer bg-emerald-600 text-white hover:bg-emerald-500",
                    "dark:bg-emerald-600 dark:hover:bg-emerald-500"
                  )}
                >
                  前へ
                </button>
                <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-center text-sm font-medium text-gray-600 dark:text-gray-300">
                  <span className="hidden md:inline">
                    {pageIndex === 0 ? "概要" : currentPage?.title || ""}{" "}
                  </span>
                  <span>{`(${pageIndex + 1}/${totalPages})`}</span>
                </span>
                <button
                  type="button"
                  // 次のページに移動
                  onClick={() => {
                    if (pageIndex >= totalPages - 1) {
                      // 最後のページの場合は、モーダルを閉じる
                      handleClose();
                    } else {
                      // 次のページに移動
                      setPageIndex((p) => Math.min(totalPages - 1, p + 1));
                    }
                  }}
                  className={cn(
                    "w-max rounded-lg px-4 py-2 text-sm font-medium shadow-sm",
                    pageIndex >= pages.length
                      ? "cursor-pointer bg-rose-600 text-white hover:bg-rose-500"
                      : "cursor-pointer bg-emerald-600 text-white hover:bg-emerald-500",
                    "dark:bg-emerald-600 dark:hover:bg-emerald-500"
                  )}
                >
                  {pageIndex >= pages.length ? "閉じる" : "次へ"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
