import { NextResponse } from "next/server";
import { QIITA_API_URL } from "@/constants/qiita.constants";
import { qiitaArticleListSchema } from "@/schemas/qiita.schemas";
import { validateEnvironment, getRequiredEnvVariable } from "@/utils/env.utils";

export async function GET() {
  try {
    // 環境変数の検証
    validateEnvironment();

    const qiitaToken = getRequiredEnvVariable("QIITA_TOKEN");

    const res = await fetch(QIITA_API_URL, {
      headers: {
        Authorization: `Bearer ${qiitaToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const raw = await res.json();
    const parsed = qiitaArticleListSchema.safeParse(raw);

    if (!parsed.success) {
      console.error("Qiita API schema validation error:", parsed.error.issues);
      return NextResponse.json(
        { error: "Qiita APIからの応答が不正です" },
        { status: 500 }
      );
    }

    const qiitaList = parsed.data.map((item) => ({ ...item, site: "Qiita" }));

    return NextResponse.json(qiitaList);
  } catch (error: unknown) {
    console.error("Qiita API Error:", error);
    const message =
      error instanceof Error ? error.message : "予期せぬエラーが発生しました";
    return NextResponse.json(
      { error: `Qiita API Error: ${message}` },
      { status: 500 }
    );
  }
}
