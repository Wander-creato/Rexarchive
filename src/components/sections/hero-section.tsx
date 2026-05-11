"use client";

import { useRef } from "react";
import { ArrowRight, LockKeyhole, Play, UploadCloud } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MemoryContribution } from "@/types/memory";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";

type HeroSectionProps = {
  memories: MemoryContribution[];
};

export function HeroSection({ memories }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.78], [1, 0.32]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden px-4 pb-16 pt-5 md:px-8"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[78vh]"
        style={{ y, opacity }}
      >
        <ArchivePhotoCloud memories={memories} />
      </motion.div>

      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-2xl">
        <a className="flex items-center gap-3" href="#top" aria-label="Rex-Archives home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-memory-amber text-sm font-black text-slate-950">
            R
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.28em] text-white">
              Rex-Archives
            </span>
            <span className="text-xs text-slate-400">for ADAMIC</span>
          </span>
        </a>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <a className="transition hover:text-white" href="#fresco">
            Fresco
          </a>
          <a className="transition hover:text-white" href="#vault">
            Upload vault
          </a>
          <a className="transition hover:text-white" href="#gallery">
            Gallery
          </a>
        </div>
      </nav>

      <div className="relative z-10 mx-auto grid min-h-[82vh] max-w-7xl items-center gap-10 py-16 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-memory-amber/30 bg-memory-amber/10 px-4 py-2 text-sm text-amber-100">
            <LockKeyhole size={16} aria-hidden="true" />
            Consent-first memories, AI-assisted storytelling
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
            Preserve the glow of every shared memory.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            Rex-Archives transforms photos, videos, audio testimonials, and
            written recollections into a living AI Narrative Fresco: immersive,
            trustworthy, and designed for modern heritage work.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton onClick={() => document.getElementById("vault")?.scrollIntoView()}>
              Start a memory upload
              <UploadCloud className="ml-2 inline" size={17} aria-hidden="true" />
            </MagneticButton>
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              href="#fresco"
            >
              Explore the fresco
              <ArrowRight className="ml-2" size={17} aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard className="relative overflow-hidden p-4 md:p-5">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-memory-amber/30 blur-3xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-950/60">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(245,158,11,0.36),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(17,94,89,0.72),transparent_38%)]" />
              <div className="absolute inset-4 grid grid-cols-6 grid-rows-6 gap-3">
                {memories.map((memory, index) => (
                  <motion.article
                    className="glass-panel col-span-3 row-span-3 flex flex-col justify-between rounded-[1.25rem] p-4"
                    key={memory.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.08 }}
                  >
                    <div>
                      <div className="mb-3 h-20 rounded-2xl bg-gradient-to-br from-white/30 via-white/10 to-transparent" />
                      <p className="text-xs uppercase tracking-[0.24em] text-memory-amber">
                        {memory.year}
                      </p>
                      <h2 className="mt-1 text-base font-semibold text-white">
                        {memory.title}
                      </h2>
                    </div>
                    <span className="mt-4 inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                      {memory.mediaKind === "video" && (
                        <Play className="mr-1.5" size={12} aria-hidden="true" />
                      )}
                      {memory.mediaKind}
                    </span>
                  </motion.article>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

function ArchivePhotoCloud({ memories }: HeroSectionProps) {
  return (
    <div className="absolute inset-0 scale-110 opacity-70 blur-[2px]">
      {memories.concat(memories).map((memory, index) => (
        <motion.div
          aria-hidden="true"
          className="absolute h-44 w-36 rounded-[1.5rem] border border-white/10 bg-white/10 shadow-2xl"
          key={`${memory.id}-${index}`}
          style={{
            left: `${8 + ((index * 17) % 82)}%`,
            top: `${8 + ((index * 23) % 66)}%`,
            rotate: `${-16 + index * 7}deg`,
          }}
          animate={{ y: [0, -18, 0], rotate: [-4, 2, -4] }}
          transition={{
            duration: 8 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="h-full rounded-[1.4rem] bg-gradient-to-br from-slate-200/25 via-slate-300/10 to-slate-950/50" />
        </motion.div>
      ))}
    </div>
  );
}
