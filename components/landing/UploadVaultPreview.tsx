"use client";

import { motion } from "framer-motion";
import { FileAudio, FileImage, FileVideo, LockKeyhole, UploadCloud } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const steps = [
  {
    title: "Drop media",
    description: "Photos, videos, and voice notes land in a single guided vault.",
    icon: UploadCloud,
  },
  {
    title: "Add context",
    description: "Prompts capture dates, places, contributors, and emotional texture.",
    icon: FileImage,
  },
  {
    title: "Secure archive",
    description: "Supabase Auth, PostgreSQL metadata, and Storage-ready media paths.",
    icon: LockKeyhole,
  },
];

export function UploadVaultPreview() {
  return (
    <section id="vault" className="px-4 py-20 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.34em] text-amber-300">
            Unified Upload Vault
          </p>
          <h2 className="font-display text-4xl tracking-[-0.04em] text-white md:text-6xl">
            A calmer path from artifact to archive.
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-slate-300">
            The upload experience is scaffolded as a multi-step flow so future Supabase
            storage, authentication, and moderation hooks can attach without reshaping the UX.
          </p>
        </div>

        <GlassCard className="relative overflow-hidden p-5 md:p-7">
          <div className="absolute right-0 top-0 size-72 rounded-full bg-amber-400/15 blur-3xl" />
          <div className="relative rounded-[1.8rem] border border-dashed border-amber-200/28 bg-slate-950/48 p-6">
            <div className="grid min-h-56 place-items-center rounded-[1.4rem] bg-white/[0.04] text-center">
              <div>
                <div className="mx-auto mb-5 grid size-16 place-items-center rounded-2xl bg-amber-300/15 text-amber-200">
                  <UploadCloud aria-hidden="true" className="size-8" />
                </div>
                <p className="text-xl font-semibold text-white">Drag memories here</p>
                <p className="mt-2 text-sm text-slate-400">or browse from device</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[FileImage, FileVideo, FileAudio].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-white/10 bg-white/8 p-4 text-center text-slate-300"
                >
                  <Icon aria-hidden="true" className="mx-auto mb-2 size-5 text-teal-200" />
                  <span className="text-xs uppercase tracking-[0.18em]">
                    {index === 0 ? "Photo" : index === 1 ? "Video" : "Audio"}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative mt-5 grid gap-3 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.1 }}
                className="rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10"
              >
                <step.icon aria-hidden="true" className="mb-4 size-5 text-amber-200" />
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
