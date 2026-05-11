"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, UploadCloud } from "lucide-react";

const archiveTiles = [
  "bg-[linear-gradient(135deg,rgba(17,94,89,0.85),rgba(15,23,42,0.78)),radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.7),transparent_18rem)]",
  "bg-[linear-gradient(145deg,rgba(245,158,11,0.55),rgba(15,23,42,0.9)),radial-gradient(circle_at_72%_30%,rgba(148,163,184,0.7),transparent_14rem)]",
  "bg-[linear-gradient(155deg,rgba(51,65,85,0.88),rgba(17,94,89,0.72)),radial-gradient(circle_at_20%_80%,rgba(245,158,11,0.45),transparent_16rem)]",
  "bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(17,94,89,0.62)),radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.32),transparent_10rem)]",
];

export function ImmersiveHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);
  const blur = useTransform(scrollY, [0, 600], ["blur(18px)", "blur(4px)"]);
  const opacity = useTransform(scrollY, [0, 620], [0.72, 0.28]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-32 md:px-8">
      <motion.div
        aria-hidden="true"
        style={{ y, filter: blur, opacity }}
        className="absolute inset-x-0 top-0 mx-auto grid h-[46rem] max-w-7xl grid-cols-2 gap-4 px-6 md:grid-cols-4"
      >
        {archiveTiles.map((tile, index) => (
          <motion.div
            key={tile}
            initial={{ opacity: 0, y: 48, rotate: index % 2 === 0 ? -4 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`${tile} h-72 rounded-[2rem] border border-white/10 shadow-2xl shadow-slate-950/40 md:h-[31rem] ${index % 2 === 0 ? "mt-10" : "mt-28"}`}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.22),#0f172a_72%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#0f172a] to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-sm text-amber-100 shadow-lg shadow-amber-500/10 backdrop-blur-xl">
            <ShieldCheck aria-hidden="true" className="size-4 text-amber-300" />
            Trusted digital memory vault for ADAMIC
          </div>
          <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Preserve memories as a living narrative fresco.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200/86 md:text-xl">
            Rex-Archives gathers photos, videos, audio, and testimonials into an immersive
            heritage platform where AI surfaces themes, sequences, and the warm glow between
            real human contributions.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#vault"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber-400 px-6 py-4 font-semibold text-slate-950 shadow-2xl shadow-amber-500/20 transition hover:-translate-y-1 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100"
            >
              <UploadCloud aria-hidden="true" className="size-5" />
              Upload a memory
              <ArrowRight aria-hidden="true" className="size-5 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="#fresco"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-6 py-4 font-semibold text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/14 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Explore the Fresco
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel relative overflow-hidden rounded-[2.4rem] p-4"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(245,158,11,0.26),transparent_18rem)]" />
          <div className="relative grid gap-3">
            {["Oral history", "Family archive", "Civic ritual"].map((label, index) => (
              <motion.div
                key={label}
                animate={{ x: index === 1 ? [0, 14, 0] : [0, -10, 0] }}
                transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-[1.7rem] border border-white/10 bg-slate-950/45 p-5 backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.26em] text-slate-400">
                  <span>{label}</span>
                  <span className="text-amber-300">0{index + 1}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-300 to-amber-300"
                    style={{ width: `${62 + index * 11}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
