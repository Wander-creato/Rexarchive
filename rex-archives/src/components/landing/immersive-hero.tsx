"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, UploadCloud } from "lucide-react";
import { useRef } from "react";

const backdropImages = [
  "https://images.unsplash.com/photo-1457694587812-e8bf29a43845?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1800&q=80",
];

export function ImmersiveHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const slowParallax = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const fastParallax = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.15]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden px-5 pt-12 md:px-8 md:pt-16">
      <motion.div style={{ y: slowParallax }} className="absolute inset-0 -z-20">
        <div
          className="h-full w-full bg-cover bg-center opacity-40 blur-[2px]"
          style={{ backgroundImage: `url(${backdropImages[0]})` }}
        />
      </motion.div>
      <motion.div style={{ y: fastParallax }} className="absolute inset-0 -z-10">
        <div
          className="h-full w-full bg-cover bg-center opacity-30 blur-md"
          style={{ backgroundImage: `url(${backdropImages[1]})` }}
        />
      </motion.div>
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-20 blur-xl"
        style={{ backgroundImage: `url(${backdropImages[2]})` }}
      />

      <motion.div
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_50%_20%,rgba(245,158,11,0.30),transparent_65%)]"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,23,42,0.25),rgba(15,23,42,0.92)_72%,#0f172a)]" />

      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:p-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 text-xs font-medium tracking-[0.16em] text-teal-100 uppercase"
        >
          <Sparkles className="size-3.5" />
          Fresque narrative IA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.65 }}
          className="max-w-4xl text-3xl leading-tight font-semibold text-slate-50 md:text-5xl"
        >
          Préserver la mémoire comme une tapisserie vivante, où chaque voix, image et témoignage relie les
          générations.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.6 }}
          className="mt-5 max-w-2xl text-sm leading-7 text-slate-200/90 md:text-base"
        >
          Rex-Archives est la plateforme d&apos;héritage moderne d&apos;ADAMIC, pensée pour l&apos;archivage fiable, la
          consultation immersive et la narration assistée par IA.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.6 }}
          className="mt-7 flex flex-wrap items-center gap-3"
        >
          <button
            type="button"
            className="group inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:bg-amber-400"
          >
            Déposer un souvenir
            <UploadCloud className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-teal-300/50 hover:bg-white/10"
          >
            Explorer la fresque
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
