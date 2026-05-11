import { NextResponse } from "next/server";
import { generateNarrativeFresco } from "@/services/ai";

export async function POST(request: Request) {
  const body = (await request.json()) as { testimonials?: unknown };

  if (!Array.isArray(body.testimonials)) {
    return NextResponse.json({ error: "Expected testimonials array." }, { status: 400 });
  }

  const fresco = await generateNarrativeFresco(
    body.testimonials.map((testimonial) => {
      const item = testimonial as Record<string, unknown>;

      return {
        id: String(item.id ?? crypto.randomUUID()),
        title: String(item.title ?? "Untitled memory"),
        year: String(item.year ?? "Undated"),
        location: String(item.location ?? "Unknown location"),
        transcript: String(item.transcript ?? ""),
        tags: Array.isArray(item.tags)
          ? item.tags.filter((tag): tag is string => typeof tag === "string")
          : [],
      };
    }),
  );

  return NextResponse.json(fresco);
}
