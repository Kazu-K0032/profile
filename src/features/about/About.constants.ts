import {
  ProfileInfo,
  Qualification,
  Activity,
  Hobby,
  Skill,
  Career,
} from "./About.types";

export const PROFILE_INFO: ProfileInfo = {
  name: "Kazu",
  description:
    "想像したものを形にするのが好きで、学生時代はYouTubeに様々なジャンルの動画を投稿していました。就職活動では動画編集を仕事にするか悩んでいたのですが、職業を調べる中で「プログラマー」の仕事を知りました。デジタルなツールを使ってゼロから何かを作る工程が動画編集と似ており、休学期間を経てプログラマーとして働くことを決めました。仕事では1つ1つの業務に責任と専門性を意識しながら、エンジニアとして必要なスキルを日々学び続けています。",
};

export const QUALIFICATIONS: Qualification[] = [
  {
    name: "PHP8 技術者認定初級試験",
    icon: "https://skillicons.dev/icons?i=php",
    alt: "skill_php",
  },
  {
    name: "Python3 エンジニア認定基礎試験",
    icon: "https://skillicons.dev/icons?i=python",
    alt: "skill_python",
  },
];

export const ACTIVITIES: Activity[] = [
  {
    name: "GitHub",
    icon: "https://skillicons.dev/icons?i=github",
    alt: "GitHub",
    url: "https://github.com/Kazu-K0032",
  },
  {
    name: "Qiita",
    icon: "/icon/icon_qiita.svg",
    alt: "Qiita",
    url: "https://qiita.com/Kazu-K0032",
  },
];

export const HOBBIES: Hobby[] = [
  {
    name: "プログラミング",
    icon: "/icon/icon_studying.svg",
    alt: "studying",
  },
  {
    name: "歌うこと",
    icon: "/icon/icon_microphone.svg",
    alt: "microphone",
  },
  {
    name: "音楽鑑賞",
    icon: "/icon/icon_listening.svg",
    alt: "listening",
  },
  {
    name: "アニメ観賞",
    icon: "/icon/icon_watching.svg",
    alt: "watching",
  },
  {
    name: "映画観賞",
    icon: "/icon/icon_movie.svg",
    alt: "watching",
  },
  {
    name: "友人と遊ぶ",
    icon: "/icon/icon_friend.svg",
    alt: "play",
  },
];

export const SKILLS: Skill[] = [
  // 実務経験あり - フロントエンド
  {
    name: "HTML/CSS(SCSS)",
    icon: "https://skillicons.dev/icons?i=html",
    alt: "HTML/CSS(SCSS)",
    category: "professional",
  },
  {
    name: "JavaScript(jQuery)",
    icon: "https://skillicons.dev/icons?i=javascript",
    alt: "JavaScript(jQuery)",
    category: "professional",
  },
  {
    name: "Next.js",
    icon: "https://skillicons.dev/icons?i=nextjs",
    alt: "Next.js",
    category: "professional",
  },
  {
    name: "Tailwind CSS",
    icon: "https://skillicons.dev/icons?i=tailwind",
    alt: "Tailwind CSS",
    category: "professional",
  },
  // 実務経験あり - バックエンド
  {
    name: "PHP(WordPress)",
    icon: "https://skillicons.dev/icons?i=wordpress",
    alt: "PHP(WordPress)",
    category: "professional",
  },
  {
    name: "Google Apps Script",
    icon: "https://skillicons.dev/icons?i=javascript",
    alt: "Google Apps Script",
    category: "professional",
  },
  // 実務経験あり - データベース
  {
    name: "MySQL",
    icon: "https://skillicons.dev/icons?i=mysql",
    alt: "MySQL",
    category: "professional",
  },
  {
    name: "PostgreSQL",
    icon: "https://skillicons.dev/icons?i=postgresql",
    alt: "PostgreSQL",
    category: "professional",
  },
  // 実務経験あり - インフラ・クラウド
  {
    name: "Google Cloud Platform",
    icon: "https://skillicons.dev/icons?i=gcp",
    alt: "Google Cloud Platform",
    category: "professional",
  },
  {
    name: "Firebase",
    icon: "https://skillicons.dev/icons?i=firebase",
    alt: "Firebase",
    category: "professional",
  },
  {
    name: "Docker",
    icon: "https://skillicons.dev/icons?i=docker",
    alt: "Docker",
    category: "professional",
  },
  {
    name: "Terraform",
    icon: "https://skillicons.dev/icons?i=terraform",
    alt: "Terraform",
    category: "professional",
  },
  // 実務経験あり - 開発ツール
  {
    name: "Git/GitHub",
    icon: "https://skillicons.dev/icons?i=git",
    alt: "Git/GitHub",
    category: "professional",
  },
  {
    name: "Figma",
    icon: "https://skillicons.dev/icons?i=figma",
    alt: "Figma",
    category: "professional",
  },
  // プロダクト制作経験あり
  {
    name: "JavaScript(TypeScript, Vue.js, React, Next.js)",
    icon: "https://skillicons.dev/icons?i=javascript",
    alt: "JavaScript(TypeScript, Vue.js, React, Next.js)",
    category: "product",
  },
  {
    name: "Python",
    icon: "https://skillicons.dev/icons?i=python",
    alt: "Python",
    category: "product",
  },
  {
    name: "Google Apps Script",
    icon: "https://skillicons.dev/icons?i=javascript",
    alt: "Google Apps Script",
    category: "product",
  },
  {
    name: "Go",
    icon: "https://skillicons.dev/icons?i=go",
    alt: "Go",
    category: "product",
  },
  // 趣味
  {
    name: "Python(Django)",
    icon: "https://skillicons.dev/icons?i=python",
    alt: "Python(Django)",
    category: "hobby",
  },
  {
    name: "VBA",
    icon: "/icon/icon_vba.svg",
    alt: "VBA",
    category: "hobby",
  },
];

export const CAREERS: Career[] = [
  {
    year: "2025年6月-現在",
    description:
      "SNS運用システム新規開発に携わる。要件定義・設計支援・要件に沿った開発を担当。機能要件の整理、実現性調査、技術選定補助、基本設計書・詳細設計書の作成補助、非機能要件/SLAの整理補助、ER図作成支援、開発ディレクトリ構成の設計、フロントエンド・バックエンド開発、バッチ処理の設定を実施。",
  },
  {
    year: "2025年3月-2025年6月",
    description:
      "自社企業サイトのリニューアル制作。Next.jsを中心とした自社企業サイトのリニューアル制作。トップ・事業紹介の実装、表示および動作確認を担当。",
  },
  {
    year: "2024年8月-2025年6月",
    description:
      "宝飾品ECサイトの改修。WordPressベースのサイトの大幅改修実装。2025年3月末にリリースし保守フェーズに移行。PHP・SCSS・jQueryのコーディング、WordPressプラグインの導入と設定、契約サーバーの管理、VPSを使用したステージング環境の構築、表示および動作確認、バグ等不具合の修正対応、マニュアル等資料の作成、障害対応を実施。",
  },
  {
    year: "2024年7月-2025年6月",
    description:
      "総合建設会社のWebサイトの保守・運用。実装済みのWebサイトの保守。実績などの情報の追加、バグ等の修正、マニュアル等資料の作成を担当。",
  },
  {
    year: "2024年6月-2024年11月",
    description:
      "採用集客イベントサイト制作プロジェクト。HTML/CSS、JavaScript、PHP、SCSS、MySQL、WordPressを使用したフロントエンド開発を担当。",
  },
  {
    year: "2024年6月-2024年7月",
    description:
      "クリニック向けGASを使用した自動化システムの開発。スプレッドシート/GASを使用したメール送信自動化システムの開発。設定したGoogleドライブフォルダにPDFが追加されたとき、設定したアドレス宛に設定したメールを自動送信するシステムを開発。ガントチャートを使用した作業の共有・進捗管理、一連のシステムのGAS開発、業務ヒアリング、要件ヒアリング、話題抽出、シートの変更、顧客へのシステムの説明、動作確認、バグ修正を実施。",
  },
  {
    year: "2024年4月-2024年5月",
    description:
      "自社研修に参加。各種研修（ビジネスマナー、フロントエンド・バックエンド基礎学習、データベース基礎学習、Webアプリケーション基礎知識、Rest APIを用いた開発、Gitを用いた開発、SQLの学習・演習）と開発研修（個人開発演習：都道府県別の総人口推移グラフを表示するSPAの構築、グループ開発演習：複数の技術イベントサイトを統合するアプリの開発）を実施。PMとしてチーム全体のタスク管理およびミーティングにおける司会役を担当。",
  },
  {
    year: "2023年3月-2024年3月",
    description:
      "内的先企業の営業サポート業務。GASを使用した業務の効率化を中心に活動。エンドクライアント企業のリストアップ/アタック、エンジニア情報と案件情報の自動マッチングシステムの開発、スクレイピングによる複数の就職サイトから必要情報のピックアップシステムの開発、スプレッドシートのセルの更新による自動通知システム、新規エンジニアへの教育を実施。",
  },
  {
    year: "2022年8月-2023年3月",
    description:
      "プログラミングスクールのメンター業務。受講生へのオンライン授業、JavaScriptの基礎からフレームワークを使用した基礎アプリまでの授業の担当、受講生のチーム開発のサポート、受講生獲得のためのデータの作成およびイベントの主催を実施。HTML/CSS、JavaScript、Vue.js、Firebase、API、GitHub、VSCode、チーム開発の基礎を受講生に指導。",
  },
];
