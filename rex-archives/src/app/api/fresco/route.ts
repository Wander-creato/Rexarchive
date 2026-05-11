import { NextResponse } from "next/server";

import { generateNarrativeFresco } from "@/services/ai";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category") ?? undefined;
    const { fresco, sourceRows } = await generateNarrativeFresco({ category });
    return NextResponse.json({
      fresco,
      sourceMemoryIds: sourceRows.map((row) => row.id),
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
