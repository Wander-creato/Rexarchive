"use client";

import { useMemo, useState } from "react";
import { AudioLines, Camera, Clapperboard, Filter } from "lucide-react";
import { motion } from "framer-motion";
import type { MediaKind, MemoryContribution } from "@/types/memory";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";

type GalleryFilter = MediaKind | "all";

type MediaGalleryProps = {
  memories: MemoryContribution[];
};

const filters: Array<{ label: string; value: GalleryFilter }> = [
  { label: "All", value: "all" },
  { label: "Photos", value: "photo" },
  { label: "Videos", value: "video" },
  { label: "Audio", value: "audio" },
];

const iconByKind = {
  photo: Camera,
  video: Clapperboard,
  audio: AudioLines,
};

export function MediaGallery({ memories }: MediaGalleryProps) {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const filteredMemories = useMemo(
    () =>
      filter === "all"
        ? memories
        : memories.filter((memory) => memory.mediaKind === filter),
    [filter, memories],
  );

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200">
            <Filter size={16} className="text-memory-amber" aria-hidden="true" />
            Filtered Media Gallery
          </div>
          <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
            Browse the archive as a living bento collection.
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition",
                filter === item.value
                  ? "border-memory-amber/60 bg-memory-amber text-slate-950"
                  : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10",
              )}
              key={item.value}
              onClick={() => setFilter(item.value)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bento-grid">
        {filteredMemories.map((memory, index) => (
          <GalleryCard index={index} key={memory.id} memory={memory} />
        ))}
      </div>
    </section>
  );
}

function GalleryCard({
  memory,
  index,
}: {
  memory: MemoryContribution;
  index: number;
}) {
  const Icon = iconByKind[memory.mediaKind];

  return (
    <motion.article
      className={cn(
        "col-span-12 md:col-span-6 lg:col-span-4",
        index === 0 && "lg:col-span-5",
        index === 1 && "lg:col-span-3",
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <GlassCard className="group h-full overflow-hidden p-4">
        <div className="relative min-h-60 overflow-hidden rounded-[1.5rem] bg-slate-950">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,158,11,0.28),rgba(17,94,89,0.34),rgba(15,23,42,0.9))]" />
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-slate-950/50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl">
            <Icon size={14} aria-hidden="true" />
            {memory.mediaKind}
          </div>
          {memory.mediaKind === "audio" && <WaveformPlayer />}
        </div>
        <div className="p-2 pt-5">
          <p className="text-sm text-memory-amber">
            {memory.year} · {memory.location}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            {memory.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {memory.description}
          </p>
        </div>
      </GlassCard>
    </motion.article>
  );
}

function WaveformPlayer() {
  const bars = [24, 42, 31, 58, 36, 68, 44, 53, 30, 62, 46, 38, 72, 56, 34, 48];

  return (
    <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-slate-950/55 p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between text-xs text-slate-300">
        <span>Voice preview</span>
        <span>01:24</span>
      </div>
      <div className="flex h-16 items-center gap-1.5" aria-hidden="true">
        {bars.map((height, index) => (
          <motion.span
            animate={{ height: [`${height * 0.55}%`, `${height}%`, `${height * 0.62}%`] }}
            className="w-full rounded-full bg-memory-amber/80"
            key={`${height}-${index}`}
            transition={{
              duration: 1.2 + index * 0.05,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
