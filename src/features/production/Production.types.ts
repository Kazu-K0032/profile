/**
 * プロダクションアイテム（一覧・カード表示で使用）
 */
export interface ProductionItem {
  id: string; // ID
  title: string; // タイトル
  description: string; // 説明
  url: string; // デプロイ先URL（公開先が無いときは空文字にすると「アプリを見る」ボタンを出さない）
  publishedAt: string; // 作成日・公開日
  thumbnailUrl?: string; // サムネイルURL
  tags?: string[]; // 技術タグ
  features?: string[]; // 特徴
  otherSite?: Array<{
    siteTtl: string; // サイト名
    siteIconPath: string; // サイトアイコンURL
    siteUrl: string; // サイトURL
  }>;
  modal?: ProductionModalContent; // モーダルコンテンツ
}

/**
 * プロダクションモーダルコンテンツ
 * - 1ページ目は呼び出し側で概要UIを描画
 * - 2ページ目以降は pages の内容を順番に表示
 */
export interface ProductionModalContent {
  longDescription?: string; // 長文説明
  images?: string[]; // 画像（左側のギャラリー等に利用）
  demoUrl?: string; // デモURL
  repoUrl?: string; // リポジトリURL
  pages?: ProductionMarkdownPage[]; // 2ページ目以降のページ情報
}

/**
 * 2ページ目以降に表示するページ: Markdown型
 * - content に Markdown（リンク/箇条書き/見出しに対応）
 * - embedUrl を指定すると、本文の下に資料（Google スライドなど）を埋め込んで表示
 */
export interface ProductionMarkdownPage {
  title: string;
  content: string[];
  embedUrl?: string; // 埋め込む資料のURL（Google スライドなら /embed の URL）
}
