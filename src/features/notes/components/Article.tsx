import Image from "next/image";
import { QIITA_ICON_PATH } from "@/constants/qiita.constants";
import type { QiitaArticle } from "@/schemas/qiita.schemas";
import { getIconSize } from "@/styles/design.styles";
import { cn } from "@/utils/cn.utils";
import { formatDate } from "@/utils/date.utils";
import { notesStyles } from "../Notes.styles";

interface ArticleProps extends QiitaArticle {
  created_at: string; // 作成日時
  url: string; // 記事URL
  title: string; // 記事タイトル
  site: string; // サイト名
  likes_count?: number; // いいね数
}

/**
 * 記事カード
 */
export default function Article({
  created_at,
  url,
  title,
  site,
  likes_count,
}: ArticleProps) {
  return (
    <div className={cn(notesStyles.articleCard, "card-hover h-full")}>
      <div className="flex h-full items-start gap-4">
        {/* アイコンと日付 */}
        <div className="flex flex-col items-center gap-3">
          <div className={notesStyles.qiitaIconBg}>
            <Image
              src={QIITA_ICON_PATH}
              alt="Qiita"
              width={24}
              height={24}
              className={getIconSize("xl")}
            />
          </div>
          <div className="badge-secondary">{formatDate(created_at)}</div>
        </div>

        {/* コンテンツ */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className={notesStyles.siteBadge}>{site}</span>
              {likes_count !== undefined && (
                <span className={notesStyles.likesBadge}>
                  <svg
                    className={getIconSize("sm")}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.834a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  {likes_count}
                </span>
              )}
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-primary block cursor-pointer"
            >
              <h3 className="mb-4 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                {title}
              </h3>
            </a>
          </div>
          <div className="flex items-center justify-between">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-primary inline-flex cursor-pointer items-center text-sm font-medium"
            >
              記事を読む
              <svg
                className={`ml-1 ${getIconSize("md")}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
