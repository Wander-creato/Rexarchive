import type { Database, Json } from "@/types/database";
import type { MemoryContribution } from "@/types/narrative";

type MemoryRow = Database["public"]["Tables"]["memories"]["Row"];

function jsonToObject(value: Json): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

export function mapMemoryRowToContribution(row: MemoryRow): MemoryContribution {
  return {
    id: row.id,
    createdAt: row.created_at,
    mediaType: row.type,
    mediaUrl: row.media_url,
    thumbnailUrl: row.thumbnail_url,
    transcript: row.transcript,
    userTextTestimonial: row.user_text_testimonial,
    metadata: jsonToObject(row.metadata),
  };
}
