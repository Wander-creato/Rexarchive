"use client";

import { motion } from "framer-motion";
import { AudioLines, ImageIcon, Play, SlidersHorizontal, Video } from "lucide-react";
import type { MemoryContribution } from "@/types/memory";

type MediaGalleryPreviewProps = {
  memories: MemoryContribution[];
};

const filters = ["All", "Photos", "Videos", "Audio"];

const iconByKind = {
  photo: ImageIcon,
  video: Video,
  audio: AudioLines,
};

function Waveform() {
  const bars = [38, 64, 46, 78, 55, 90, 42, 70, 52, 84, 44, 68, 58, 76];

  return (
    <div className="flex h-16 items-center gap-1.5">
      {bars.map((height, index) => (
        <motion.span
          key={`${height}-${index}`}
          animate={{ height: [`${height * 0.55}%`, `${height}%`, `${height * 0.68}%`] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.06, ease: "easeInOut" }}
          className="w-1.5 rounded-full bg-gradient-to-t from-teal-300 to-amber-300"
        />
      ))}
    </div>
  );
}

export function MediaGalleryPreview({ memories }: MediaGalleryPreviewProps) {
  return (
    <section id="gallery" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.34em] text-amber-300">
              Media Gallery
            </p>
            <h2 className="font-display text-4xl tracking-[-0.04em] text-white md:text-6xl">
              Filterable by format, unified by feeling.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-white/[0.05] p-1">
            {filters.map((filter) => (
              <button
                key={filter}
                className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {memories.map((memory, index) => {
            const Icon = iconByKind[memory.mediaKind];
            const isFeature = index === 0;

            return (
              <motion.article
                key={memory.id}
                whileHover={{ y: -7 }}
                className={`glass-panel relative overflow-hidden rounded-[2rem] p-5 ${
                  isFeature ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_10%,rgba(245,158,11,0.22),transparent_13rem)]" />
                <div className="relative flex min-h-64 flex-col">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                      {memory.mediaKind}
                    </span>
                    <Icon aria-hidden="true" className="size-5 text-amber-200" />
                  </div>

                  <div className="my-8 grid flex-1 place-items-center rounded-[1.5rem] bg-slate-950/45 ring-1 ring-white/10">
                    {memory.mediaKind === "audio" ? (
                      <div className="flex items-center gap-5 px-4">
                        <button
                          type="button"
                          aria-label={`Play ${memory.title}`}
                          className="grid size-12 place-items-center rounded-full bg-amber-300 text-slate-950 transition hover:scale-105"
                        >
                          <Play aria-hidden="true" className="ml-0.5 size-5 fill-current" />
                        </button>
                        <Waveform />
                      </div>
                    ) : (
                      <div className="relative size-28 rounded-[2rem] bg-gradient-to-br from-teal-300/30 to-amber-300/30">
                        <div className="absolute inset-4 rounded-3xl border border-white/18" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-white">{memory.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {memory.year} · {memory.location}
                  </p>
                </div>
              </motion.article>
            );
          })}

          <div className="glass-panel rounded-[2rem] p-5 md:col-span-2">
            <SlidersHorizontal aria-hidden="true" className="mb-4 size-5 text-teal-200" />
            <h3 className="text-xl font-semibold text-white">Gallery system scaffold</h3>
            <p className="mt-2 leading-7 text-slate-400">
              The next pass can bind filters to Supabase metadata, stream signed media URLs,
              and replace preview tiles with optimized Next media renderers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
