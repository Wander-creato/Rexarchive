import { NextResponse } from "next/server";

import { generateNarrativeFresco } from "@/services/ai";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { fresco, sourceRows } = await generateNarrativeFresco();
    return NextResponse.json({
      fresco,
      sourceMemoryIds: sourceRows.map((row) => row.id),
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
