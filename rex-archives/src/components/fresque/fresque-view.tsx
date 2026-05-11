"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { FrescoRibbon } from "@/components/landing/fresco-ribbon";
import { MediaGalleryPreview } from "@/components/landing/media-gallery-preview";
import { GlassCard } from "@/components/ui/glass-card";
import { mapMemoryRowToContribution } from "@/lib/memory-mappers";
import { getSupabaseBrowserClient } from "@/lib/supabase/supabase-client";
import type { Database } from "@/types/database";
import type { MemoryContribution } from "@/types/narrative";

type MemoryRow = Database["public"]["Tables"]["memories"]["Row"];

export function FresqueView() {
  const [memories, setMemories] = useState<MemoryContribution[]>([]);
  const [activeMediaIds, setActiveMediaIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMemories = useCallback(async () => {
    try {
      setIsLoading(true);
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("memories")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(24);

      if (error) {
        throw error;
      }

      setMemories(((data ?? []) as MemoryRow[]).map(mapMemoryRowToContribution));
    } catch {
      setMemories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMemories();
  }, [loadMemories]);

  if (isLoading) {
    return (
      <section className="mt-8">
        <GlassCard className="p-6">
          <p className="text-sm text-slate-300">Chargement des souvenirs pour la fresque...</p>
        </GlassCard>
      </section>
    );
  }

  if (memories.length === 0) {
    return (
      <section className="mt-10">
        <GlassCard className="border-amber-300/25 bg-amber-500/10 p-6">
          <p className="text-sm text-amber-100">Emplacement vide - En attente de contenu</p>
          <Link
            href="/le-coffre"
            className="mt-3 inline-flex rounded-xl border border-amber-300/45 px-3 py-2 text-xs font-medium text-amber-100 transition-colors hover:bg-amber-500/20"
          >
            Alimenter la fresque via Le Coffre
          </Link>
        </GlassCard>
      </section>
    );
  }

  return (
    <>
      <FrescoRibbon memories={memories} onHighlightMedia={setActiveMediaIds} />
      <section className="mt-8">
        <MediaGalleryPreview items={memories} highlightedMediaIds={activeMediaIds} showHeader={false} />
      </section>
    </>
  );
}
