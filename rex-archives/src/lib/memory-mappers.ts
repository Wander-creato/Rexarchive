import { normalizeMemoryCategory } from "@/constants/memory-categories";
import type { MemoryContribution } from "@/types/narrative";

type UnknownRecord = Record<string, unknown>;

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function asObject(value: unknown): UnknownRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as UnknownRecord;
}

function normalizeMemoryType(value: unknown): MemoryContribution["type"] {
  if (value === "video") return "video";
  if (value === "audio") return "audio";
  if (value === "image") return "photo";
  if (value === "photo") return "photo";
  return "photo";
}

function pickBestTitle(row: UnknownRecord) {
  const metadata = asObject(row.metadata);
  return asString(row.title) ?? asString(metadata?.title) ?? null;
}

function pickBestDescription(row: UnknownRecord) {
  return asString(row.description) ?? asString(row.user_text_testimonial) ?? asString(row.transcript) ?? null;
}

function pickBestCategory(row: UnknownRecord) {
  const metadata = asObject(row.metadata);
  return normalizeMemoryCategory(asString(row.category) ?? asString(metadata?.category));
}

function pickBestUrl(row: UnknownRecord) {
  return asString(row.url) ?? asString(row.media_url) ?? asString(row.thumbnail_url) ?? "";
}

export function mapMemoryRowToContribution(row: unknown): MemoryContribution {
  const safeRow = asObject(row) ?? {};
  return {
    id: asString(safeRow.id) ?? "unknown-memory",
    createdAt: asString(safeRow.created_at) ?? new Date(0).toISOString(),
    type: normalizeMemoryType(safeRow.type),
    url: pickBestUrl(safeRow),
    title: pickBestTitle(safeRow),
    description: pickBestDescription(safeRow),
    category: pickBestCategory(safeRow),
  };
}
