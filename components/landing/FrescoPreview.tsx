"use client";

import { motion } from "framer-motion";
import { AudioLines, ImageIcon, Sparkles, Video } from "lucide-react";
import type { GeneratedNarrativeFresco, MemoryContribution } from "@/types/memory";

type FrescoPreviewProps = {
  memories: MemoryContribution[];
  fresco: GeneratedNarrativeFresco;
};

const mediaIcon = {
  photo: ImageIcon,
  video: Video,
  audio: AudioLines,
};

export function FrescoPreview({ memories, fresco }: FrescoPreviewProps) {
  return (
    <section id="fresco" className="relative px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.34em] text-amber-300">
              AI Narrative Fresco
            </p>
            <h2 className="font-display text-4xl tracking-[-0.04em] text-white md:text-6xl">
              A living organism of memories.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-300">
            AI-generated summaries act as connective tissue between real contributions,
            creating a horizontal storyline that feels archival, cinematic, and alive.
          </p>
        </div>

        <div className="glass-panel overflow-hidden rounded-[2.5rem] p-4 md:p-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            {fresco.themes.map((theme) => (
              <span
                key={theme.name}
                className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-slate-200"
              >
                {theme.name}
                <span className="ml-2 text-amber-300">{Math.round(theme.confidence * 100)}%</span>
              </span>
            ))}
          </div>

          <div className="fresco-scroll flex snap-x gap-5 overflow-x-auto pb-4">
            {fresco.storyline.map((node, index) => {
              const related = memories.find((memory) =>
                node.relatedContributionIds.includes(memory.id),
              );
              const Icon = related ? mediaIcon[related.mediaKind] : Sparkles;

              return (
                <div key={node.id} className="flex min-w-[19rem] snap-center items-center gap-5 md:min-w-[28rem]">
                  <motion.article
                    layout
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                    className="relative min-h-[25rem] flex-1 overflow-hidden rounded-[2rem] border border-white/12 bg-slate-950/55 p-5 shadow-2xl shadow-slate-950/35"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(245,158,11,0.24),transparent_12rem)]" />
                    <div className="absolute -right-16 -top-16 size-44 rounded-full bg-teal-400/15 blur-2xl" />

                    <div className="relative flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <span className="rounded-full bg-amber-300/14 px-3 py-1 text-sm text-amber-200">
                          {node.period}
                        </span>
                        <span className="grid size-11 place-items-center rounded-full bg-white/10 text-slate-100">
                          <Icon aria-hidden="true" className="size-5" />
                        </span>
                      </div>

                      <div className="mt-12">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-teal-200">
                          {node.theme}
                        </p>
                        <h3 className="font-display text-3xl leading-tight text-white">{node.title}</h3>
                        <p className="mt-5 leading-7 text-slate-300">{node.summary}</p>
                      </div>

                      {related ? (
                        <div className="mt-auto rounded-2xl border border-white/10 bg-white/8 p-4">
                          <p className="text-sm font-semibold text-white">{related.title}</p>
                          <p className="mt-1 text-sm text-slate-400">
                            {related.contributor} · {related.location}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </motion.article>

                  {index < fresco.storyline.length - 1 ? (
                    <motion.div
                      aria-hidden="true"
                      animate={{ opacity: [0.35, 1, 0.35], scaleX: [0.9, 1, 0.9] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                      className="hidden h-px w-20 origin-left bg-gradient-to-r from-amber-300 via-teal-200 to-transparent md:block"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-[1.75rem] border border-teal-200/15 bg-teal-300/8 p-5 text-slate-200">
            <div className="mb-2 flex items-center gap-2 text-amber-200">
              <Sparkles aria-hidden="true" className="size-4" />
              Narrative synthesis
            </div>
            {fresco.narrativeSummary}
          </div>
        </div>
      </div>
    </section>
  );
}
