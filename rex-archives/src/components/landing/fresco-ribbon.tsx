"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { GlassCard } from "@/components/ui/glass-card";
import { playUiSound } from "@/lib/sound";
import type { MemoryContribution, NarrativeFresco } from "@/types/narrative";

interface FrescoRibbonProps {
  memories: MemoryContribution[];
  onHighlightMedia: (memoryIds: string[]) => void;
}

interface FrescoResponse {
  fresco: NarrativeFresco;
}

export function FrescoRibbon({ memories, onHighlightMedia }: FrescoRibbonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(12);
  const [fresco, setFresco] = useState<NarrativeFresco | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [typedBody, setTypedBody] = useState("");

  useEffect(() => {
    let isCancelled = false;
    const progressTimer = window.setInterval(() => {
      setLoadingProgress((current) => Math.min(current + 6, 88));
    }, 220);

    const loadFresco = async () => {
      try {
        const response = await fetch("/api/fresco", { method: "GET", cache: "no-store" });
        if (!response.ok) {
          throw new Error("Fresco generation failed.");
        }

        const payload = (await response.json()) as FrescoResponse;
        if (isCancelled) return;
        setFresco(payload.fresco);
        setLoadingProgress(100);
      } catch {
        if (isCancelled) return;
        setFresco({
          title: "Fallback Narrative Fresco",
          fullNarrative:
            "Memories continue to gather, forming a living archive where voices and visuals reconnect across generations.",
          chapters: [
            {
              id: "chapter-1",
              title: "Origins",
              body: "Early memories reveal a community archiving identity through moments of collective care.",
              mediaIds: memories.slice(0, 2).map((entry) => entry.id),
            },
            {
              id: "chapter-2",
              title: "Transmission",
              body: "Audio and visuals carry stories forward, turning individual recollections into shared testimony.",
              mediaIds: memories.slice(1, 3).map((entry) => entry.id),
            },
            {
              id: "chapter-3",
              title: "Continuity",
              body: "Each new upload extends the archive into a living narrative that remains open to future voices.",
              mediaIds: memories.slice(2, 4).map((entry) => entry.id),
            },
          ],
        });
      } finally {
        window.clearInterval(progressTimer);
        if (!isCancelled) {
          setTimeout(() => setIsLoading(false), 240);
        }
      }
    };

    void loadFresco();
    return () => {
      isCancelled = true;
      window.clearInterval(progressTimer);
    };
  }, [memories]);

  const activeChapter = useMemo(
    () => fresco?.chapters?.[activeChapterIndex] ?? null,
    [activeChapterIndex, fresco],
  );

  useEffect(() => {
    if (!activeChapter) {
      setTypedBody("");
      onHighlightMedia([]);
      return;
    }

    onHighlightMedia(activeChapter.mediaIds);
    let cursor = 0;
    setTypedBody("");
    const typeTimer = window.setInterval(() => {
      cursor = Math.min(cursor + 3, activeChapter.body.length);
      setTypedBody(activeChapter.body.slice(0, cursor));
      if (cursor >= activeChapter.body.length) {
        window.clearInterval(typeTimer);
      }
    }, 20);

    return () => window.clearInterval(typeTimer);
  }, [activeChapter, onHighlightMedia]);

  function switchChapter(direction: "prev" | "next") {
    if (!fresco) return;
    playUiSound("fresco-navigate");
    setActiveChapterIndex((current) => {
      const nextIndex = direction === "next" ? current + 1 : current - 1;
      if (nextIndex < 0) return fresco.chapters.length - 1;
      if (nextIndex >= fresco.chapters.length) return 0;
      return nextIndex;
    });
  }

  return (
    <section className="mx-auto mt-10 w-[min(100%,76rem)] px-5 md:px-8">
      <GlassCard className="p-5 md:p-7">
        {isLoading ? (
          <div className="flex min-h-56 flex-col items-center justify-center gap-4 text-center">
            <div className="relative flex size-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-amber-300/25" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-amber-300"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                style={{
                  clipPath: `inset(${Math.max(0, 100 - loadingProgress)}% 0 0 0)`,
                  boxShadow: "0 0 26px rgba(245, 158, 11, 0.6)",
                }}
              />
              <span className="text-xs font-semibold text-amber-100">{loadingProgress}%</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-teal-200/80">Synthesizing narrative</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-50">Generating your History...</h2>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-teal-200/80">Narrative Layer</p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-100 md:text-3xl">
                  {fresco?.title ?? "AI Narrative Fresco"}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchChapter("prev")}
                  className="rounded-xl border border-white/15 bg-white/5 p-2 text-slate-200 transition-colors hover:border-amber-300/50 hover:text-amber-100"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => switchChapter("next")}
                  className="rounded-xl border border-white/15 bg-white/5 p-2 text-slate-200 transition-colors hover:border-amber-300/50 hover:text-amber-100"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            <p className="mt-3 text-sm leading-7 text-slate-200/85">{fresco?.fullNarrative}</p>

            <AnimatePresence mode="wait">
              {activeChapter ? (
                <motion.article
                  key={activeChapter.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 rounded-2xl border border-white/10 bg-[#111f39]/80 p-4"
                >
                  <p className="inline-flex items-center gap-2 rounded-full border border-teal-300/35 bg-teal-300/10 px-2.5 py-1 text-xs text-teal-100">
                    <Sparkles className="size-3.5" />
                    Thematic Chapter
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-50">{activeChapter.title}</h3>
                  <p className="mt-2 min-h-20 text-sm leading-6 text-slate-200/85">
                    {typedBody}
                    <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-amber-300/90 align-middle" />
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeChapter.mediaIds.map((mediaId) => (
                      <span
                        key={mediaId}
                        className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-500/10 px-2.5 py-1 text-[11px] text-amber-100"
                      >
                        Media {mediaId.slice(0, 8)}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ) : null}
            </AnimatePresence>
          </>
        )}
      </GlassCard>
    </section>
  );
}
