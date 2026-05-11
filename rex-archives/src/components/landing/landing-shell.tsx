"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { FrescoRibbon } from "@/components/landing/fresco-ribbon";
import { MediaGalleryPreview } from "@/components/landing/media-gallery-preview";
import { UploadVaultPreview } from "@/components/landing/upload-vault-preview";
import { mockContributions } from "@/data/mock-memories";
import { mapMemoryRowToContribution } from "@/lib/memory-mappers";
import { getSupabaseBrowserClient } from "@/lib/supabase/supabase-client";
import { useMemoryStore } from "@/store/memory-store";
import type { Database } from "@/types/database";

type MemoryRow = Database["public"]["Tables"]["memories"]["Row"];

export function LandingShell() {
  const [activeMediaIds, setActiveMediaIds] = useState<string[]>([]);
  const memories = useMemoryStore((state) => state.memories);
  const setMemories = useMemoryStore((state) => state.setMemories);

  const loadMemories = useCallback(async () => {
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("memories")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(24);

      if (error) {
        throw error;
      }

      const mapped = ((data ?? []) as MemoryRow[]).map(mapMemoryRowToContribution);
      setMemories(mapped.length > 0 ? mapped : mockContributions);
    } catch {
      setMemories(mockContributions);
    }
  }, [setMemories]);

  useEffect(() => {
    void loadMemories();
  }, [loadMemories]);

  const displayMemories = useMemo(() => (memories.length > 0 ? memories : mockContributions), [memories]);

  return (
    <>
      <FrescoRibbon memories={displayMemories} onHighlightMedia={setActiveMediaIds} />
      <section className="mx-auto mt-10 grid w-[min(100%,76rem)] gap-4 px-5 md:grid-cols-2 md:px-8">
        <UploadVaultPreview />
        <MediaGalleryPreview items={displayMemories} highlightedMediaIds={activeMediaIds} />
      </section>
    </>
  );
}
