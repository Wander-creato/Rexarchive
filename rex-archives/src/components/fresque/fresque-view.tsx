"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { MEMORY_CATEGORIES, type MemoryCategory } from "@/constants/memory-categories";
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
  const [activeCategory, setActiveCategory] = useState<MemoryCategory | "Toutes">("Toutes");
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

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    const channel = supabase
      .channel("fresque-memories-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "memories" },
        () => void loadMemories(),
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [loadMemories]);

  const filteredMemories = useMemo(() => {
    if (activeCategory === "Toutes") {
      return memories;
    }
    return memories.filter((memory) => memory.category === activeCategory);
  }, [activeCategory, memories]);

  if (isLoading) {
    return (
      <section className="mt-8">
        <GlassCard className="p-6">
          <p className="text-sm text-slate-300">Chargement des souvenirs pour la fresque...</p>
        </GlassCard>
      </section>
    );
  }

  if (filteredMemories.length === 0) {
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
      <section className="mt-8">
        <GlassCard className="p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Filtrer la fresque par catégorie</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory("Toutes")}
              className={[
                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                activeCategory === "Toutes"
                  ? "border-amber-300/70 bg-amber-500/25 text-amber-100"
                  : "border-white/10 bg-white/5 text-slate-200 hover:border-amber-300/45",
              ].join(" ")}
            >
              Toutes
            </button>
            {MEMORY_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={[
                  "rounded-full border px-3 py-1.5 text-xs transition-colors",
                  activeCategory === category
                    ? "border-amber-300/70 bg-amber-500/25 text-amber-100"
                    : "border-white/10 bg-white/5 text-slate-200 hover:border-amber-300/45",
                ].join(" ")}
              >
                {category}
              </button>
            ))}
          </div>
        </GlassCard>
      </section>
      <FrescoRibbon memories={filteredMemories} onHighlightMedia={setActiveMediaIds} category={activeCategory} />
      <section className="mt-8">
        <MediaGalleryPreview items={filteredMemories} highlightedMediaIds={activeMediaIds} showHeader={false} />
      </section>
    </>
  );
}
