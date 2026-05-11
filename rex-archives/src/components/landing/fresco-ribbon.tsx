"use client";

import { motion } from "framer-motion";
import { Mic, PlayCircle, Sparkles, Tags } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";
import type { MediaType, MemoryContribution, NarrativeTheme, StorylineSegment } from "@/types/narrative";

interface FrescoRibbonProps {
  contributions: MemoryContribution[];
  themes: NarrativeTheme[];
  storyline: StorylineSegment[];
}

function mediaTypeIcon(mediaType: MediaType) {
  if (mediaType === "audio") return <Mic className="size-4" />;
  if (mediaType === "video") return <PlayCircle className="size-4" />;
  return <Sparkles className="size-4" />;
}

export function FrescoRibbon({ contributions, storyline, themes }: FrescoRibbonProps) {
  return (
    <section className="mx-auto mt-10 w-[min(100%,76rem)] px-5 md:px-8">
      <GlassCard className="p-5 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-teal-200/80">Narrative Layer</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-100 md:text-3xl">AI Narrative Fresco</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {themes.map((theme) => (
              <span
                key={theme.id}
                className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-100"
              >
                <Tags className="size-3.5" />
                {theme.label}
              </span>
            ))}
          </div>
        </div>

        <div className="fresco-scroll relative mt-6 overflow-x-auto pb-4">
          <div className="absolute top-[5.35rem] left-4 right-4 h-px bg-gradient-to-r from-transparent via-teal-300/45 to-transparent" />
          <div className="flex min-w-max items-start gap-4">
            {storyline.map((segment, index) => {
              const firstMemoryId = segment.linkedMemoryIds[0];
              const linkedMemory = contributions.find((entry) => entry.id === firstMemoryId);

              return (
                <motion.article
                  key={segment.id}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group w-72 shrink-0 rounded-2xl border border-white/10 bg-[#111f39]/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/35"
                >
                  <p className="text-xs font-medium tracking-[0.16em] text-teal-200/90 uppercase">{segment.anchorYear}</p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-50">{segment.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-200/80">{segment.summary}</p>

                  {linkedMemory ? (
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="text-[11px] text-slate-300/80 uppercase tracking-[0.14em]">Linked Memory</p>
                      <p className="mt-1 text-sm font-medium text-slate-100">{linkedMemory.title}</p>
                      <p className="mt-1 text-xs text-slate-300/80">{linkedMemory.contributor}</p>
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-teal-300/15 px-2.5 py-1 text-[11px] text-teal-100">
                        {mediaTypeIcon(linkedMemory.mediaType)}
                        {linkedMemory.mediaType}
                      </span>
                    </div>
                  ) : null}
                </motion.article>
              );
            })}
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
