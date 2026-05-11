import { normalizeMemoryCategory } from "@/constants/memory-categories";
import type { Database } from "@/types/database";
import type { MemoryContribution } from "@/types/narrative";

type MemoryRow = Database["public"]["Tables"]["memories"]["Row"];

export function mapMemoryRowToContribution(row: MemoryRow): MemoryContribution {
  return {
    id: row.id,
    createdAt: row.created_at,
    type: row.type ?? "photo",
    url: row.url ?? "",
    title: row.title,
    description: row.description,
    category: normalizeMemoryCategory(row.category),
  };
}
