"use client";

import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { MediaGalleryPreview } from "@/components/landing/media-gallery-preview";
import { GlassCard } from "@/components/ui/glass-card";
import { mapMemoryRowToContribution } from "@/lib/memory-mappers";
import { getSupabaseBrowserClient } from "@/lib/supabase/supabase-client";
import type { Database } from "@/types/database";
import type { MediaType, MemoryContribution } from "@/types/narrative";

type MemoryRow = Database["public"]["Tables"]["memories"]["Row"];

export function ArchivesExplorer() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<MediaType | "all">("all");
  const [memories, setMemories] = useState<MemoryContribution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMemories = useCallback(async (keyword: string, filter: MediaType | "all") => {
    try {
      setIsLoading(true);
      const supabase = getSupabaseBrowserClient();
      let query = supabase.from("memories").select("*").order("created_at", { ascending: false }).limit(50);

      if (filter !== "all") {
        query = query.eq("type", filter);
      }

      if (keyword.trim().length > 0) {
        const safeKeyword = keyword.trim().replace(/,/g, " ");
        query = query.or(
          `title.ilike.%${safeKeyword}%,description.ilike.%${safeKeyword}%,category.ilike.%${safeKeyword}%`,
        );
      }

      const { data, error } = await query;
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
    const timeout = window.setTimeout(() => {
      void loadMemories(search, activeFilter);
    }, 260);

    return () => window.clearTimeout(timeout);
  }, [activeFilter, loadMemories, search]);

  return (
    <section className="mt-8 space-y-4">
      <GlassCard className="p-4">
        <label className="text-xs uppercase tracking-[0.16em] text-slate-300">Recherche dans les archives</label>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2">
          <Search className="size-4 text-amber-300" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Titre, description ou catégorie"
            className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-400"
          />
        </div>
      </GlassCard>

      {isLoading ? (
        <GlassCard className="p-5">
          <p className="text-sm text-slate-300">Chargement des archives...</p>
        </GlassCard>
      ) : memories.length === 0 ? (
        <GlassCard className="border-amber-300/20 bg-amber-500/10 p-5">
          <p className="text-sm text-amber-100">Emplacement vide - En attente de contenu</p>
          <Link
            href="/le-coffre"
            className="mt-3 inline-flex rounded-xl border border-amber-300/45 px-3 py-2 text-xs font-medium text-amber-100 transition-colors hover:bg-amber-500/20"
          >
            Aller au Coffre
          </Link>
        </GlassCard>
      ) : (
        <MediaGalleryPreview
          items={memories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          showHeader={false}
        />
      )}
    </section>
  );
}
