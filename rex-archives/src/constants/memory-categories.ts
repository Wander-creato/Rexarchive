export const MEMORY_CATEGORIES = [
  "Événements",
  "Ateliers",
  "Vie Associative",
  "Témoignages",
  "Patrimoine",
] as const;

export type MemoryCategory = (typeof MEMORY_CATEGORIES)[number];

export const DEFAULT_MEMORY_CATEGORY: MemoryCategory = "Patrimoine";

export function normalizeMemoryCategory(value: string | null | undefined): MemoryCategory {
  if (!value) {
    return DEFAULT_MEMORY_CATEGORY;
  }

  const match = MEMORY_CATEGORIES.find((category) => category === value);
  return match ?? DEFAULT_MEMORY_CATEGORY;
}
