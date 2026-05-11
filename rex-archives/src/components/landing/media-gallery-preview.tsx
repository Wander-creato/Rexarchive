"use client";

import { motion } from "framer-motion";
import { Camera, Filter, Mic, PlayCircle } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";
import type { MediaType, MemoryContribution } from "@/types/narrative";

interface MediaGalleryPreviewProps {
  items: MemoryContribution[];
}

const filters: { id: MediaType | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "photo", label: "Photos" },
  { id: "video", label: "Videos" },
  { id: "audio", label: "Audio" },
];

function MediaIcon({ mediaType }: { mediaType: MediaType }) {
  if (mediaType === "audio") return <Mic className="size-4" />;
  if (mediaType === "video") return <PlayCircle className="size-4" />;
  return <Camera className="size-4" />;
}

function WaveformBars() {
  return (
    <div className="mt-3 flex h-8 items-end gap-1.5">
      {[34, 60, 28, 72, 48, 58, 36, 66, 24, 54].map((height, index) => (
        <motion.span
          key={`${height}-${index}`}
          initial={{ scaleY: 0.7 }}
          animate={{ scaleY: [0.7, 1, 0.72] }}
          transition={{ duration: 1.1 + index * 0.06, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
          className="w-1.5 origin-bottom rounded-full bg-teal-300/70"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

export function MediaGalleryPreview({ items }: MediaGalleryPreviewProps) {
  return (
    <GlassCard className="h-full p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-teal-200/80">Media Gallery</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-100">Filtered bento media grid</h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          <Filter className="size-3.5" />
          Smart Filters
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:border-amber-300/45 hover:text-amber-100"
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.slice(0, 4).map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.06, duration: 0.35 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-3"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-teal-300/15 px-2 py-1 text-[11px] text-teal-100 uppercase">
                <MediaIcon mediaType={item.mediaType} />
                {item.mediaType}
              </span>
              <span className="text-xs text-slate-300/80">{new Date(item.submittedAt).getFullYear()}</span>
            </div>
            <h4 className="mt-2 text-sm font-semibold text-slate-100">{item.title}</h4>
            <p className="mt-1 text-xs text-slate-300/85">{item.contributor}</p>
            {item.mediaType === "audio" ? <WaveformBars /> : null}
          </motion.article>
        ))}
      </div>
    </GlassCard>
  );
}
