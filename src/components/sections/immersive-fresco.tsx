"use client";

import { useMemo, useRef } from "react";
import { AudioLines, Camera, ChevronRight, Clapperboard, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { GeneratedNarrative, MemoryContribution } from "@/types/memory";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";

type ImmersiveFrescoProps = {
  memories: MemoryContribution[];
  narrative: GeneratedNarrative;
};

const mediaIcons = {
  photo: Camera,
  video: Clapperboard,
  audio: AudioLines,
};

export function ImmersiveFresco({ memories, narrative }: ImmersiveFrescoProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollerRef });
  const glowX = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  const memoryById = useMemo(
    () => new Map(memories.map((memory) => [memory.id, memory])),
    [memories],
  );

  return (
    <section id="fresco" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200">
              <Sparkles size={16} className="text-memory-amber" aria-hidden="true" />
              AI Narrative Fresco
            </div>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              {narrative.title}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-300 md:text-base">
            {narrative.synopsis}
          </p>
        </div>
      </div>

      <div className="relative">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 z-0 h-64 w-64 -translate-y-1/2 rounded-full bg-memory-amber/25 blur-3xl"
          style={{ x: glowX }}
        />
        <div
          ref={scrollerRef}
          className="fresco-scroll relative z-10 flex snap-x gap-5 overflow-x-auto px-4 pb-8 md:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {narrative.segments.length === 0 ? (
            <EmptyFresco />
          ) : (
            narrative.segments.map((segment, index) => {
              const segmentMemories = segment.memoryIds
                .map((id) => memoryById.get(id))
                .filter(Boolean) as MemoryContribution[];

              return (
                <motion.article
                  className="grid min-w-[88vw] snap-center grid-cols-1 gap-4 md:min-w-[42rem] md:grid-cols-[0.84fr_1.16fr]"
                  key={segment.id}
                  layout
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <GlassCard className="relative overflow-hidden p-5">
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-memory-amber to-transparent" />
                    <p className="text-sm uppercase tracking-[0.28em] text-memory-amber">
                      {segment.era}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                      {segment.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      {segment.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {segment.themes.map((theme) => (
                        <span
                          className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200"
                          key={theme.label}
                        >
                          {theme.label} · {Math.round(theme.confidence * 100)}%
                        </span>
                      ))}
                    </div>
                  </GlassCard>

                  <div className="relative">
                    <div
                      className="absolute left-[-1.35rem] top-1/2 hidden h-px w-10 bg-gradient-to-r from-memory-amber to-transparent md:block"
                      aria-hidden="true"
                    />
                    <div className="grid h-full gap-4">
                      {segmentMemories.map((memory) => (
                        <MemoryNode key={memory.id} memory={memory} />
                      ))}
                    </div>
                  </div>

                  {index < narrative.segments.length - 1 && (
                    <div className="absolute -right-8 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-2 text-memory-amber md:block">
                      <ChevronRight size={18} aria-hidden="true" />
                    </div>
                  )}
                </motion.article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

function MemoryNode({ memory }: { memory: MemoryContribution }) {
  const Icon = mediaIcons[memory.mediaKind];

  return (
    <motion.div
      className={cn(
        "group relative min-h-64 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-5",
        memory.accent === "amber" && "shadow-[0_0_60px_rgba(245,158,11,0.16)]",
        memory.accent === "teal" && "shadow-[0_0_60px_rgba(17,94,89,0.24)]",
      )}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_22%),linear-gradient(135deg,rgba(245,158,11,0.18),rgba(17,94,89,0.28),transparent)] opacity-80 transition duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-200">
            {memory.location}
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white">
            <Icon size={19} aria-hidden="true" />
          </span>
        </div>
        <div>
          <p className="text-sm text-memory-amber">{memory.contributor}</p>
          <h4 className="mt-2 text-2xl font-semibold text-white">
            {memory.title}
          </h4>
          <p className="mt-3 text-sm leading-6 text-slate-200/85">
            {memory.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyFresco() {
  return (
    <GlassCard className="grid min-w-[88vw] gap-4 p-5 md:min-w-[42rem]">
      <Skeleton className="h-8 w-52" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-24 w-4/5" />
    </GlassCard>
  );
}
