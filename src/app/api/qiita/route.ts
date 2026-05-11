import { NextResponse } from "next/server";
import { QIITA_API_URL } from "@/constants/qiita.constants";
import { qiitaArticleListSchema } from "@/schemas/qiita.schemas";
import { validateEnvironment } from "@/utils/env.utils";

export async function GET() {
  try {
    // 環境変数の検証と取得
    const env = validateEnvironment();

    const res = await fetch(QIITA_API_URL, {
      headers: {
        Authorization: `Bearer ${env.QIITA_TOKEN}`,
      },
    });

    if (!res.ok) {
      console.error(`Qiita API HTTP error: status=${res.status}`);
      return NextResponse.json(
        { error: "Qiita APIの呼び出しに失敗しました" },
        { status: 502 }
      );
    }

    const raw = await res.json();
    const parsed = qiitaArticleListSchema.safeParse(raw);

    if (!parsed.success) {
      console.error("Qiita API schema validation error:", parsed.error.issues);
      return NextResponse.json(
        { error: "Qiita APIからの応答が不正です" },
        { status: 502 }
      );
    }

    const qiitaList = parsed.data.map((item) => ({ ...item, site: "Qiita" }));

    return NextResponse.json(qiitaList);
  } catch (error: unknown) {
    console.error("Qiita API Error:", error);
    return NextResponse.json(
      { error: "Qiita APIの呼び出しに失敗しました" },
      { status: 500 }
    );
  }
}
