"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Upload, Video } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";

const steps = [
  { id: "step-1", title: "Upload", detail: "Drag media to secure storage", icon: Upload },
  { id: "step-2", title: "Describe", detail: "Add context and testimonial details", icon: FileText },
  { id: "step-3", title: "Review", detail: "Validate before final submission", icon: Video },
];

export function UploadVaultPreview() {
  return (
    <GlassCard className="h-full p-5 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-teal-200/80">Unified Upload Vault</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-100">Multi-step ingestion flow</h3>
        </div>
        <span className="rounded-full border border-teal-300/35 bg-teal-300/10 px-3 py-1 text-xs text-teal-100">
          RHF / Zustand Ready
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {steps.map((step, index) => (
          <motion.button
            key={step.id}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            className="group flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/40"
          >
            <span className="inline-flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-amber-400/20 text-amber-200">
                <step.icon className="size-4" />
              </span>
              <span>
                <strong className="block text-sm font-semibold text-slate-50">{step.title}</strong>
                <span className="text-xs text-slate-300/80">{step.detail}</span>
              </span>
            </span>
            <ArrowRight className="size-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-amber-300" />
          </motion.button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#0f172a]/80 p-4">
        <p className="text-xs tracking-[0.14em] text-slate-300 uppercase">Loading snapshot</p>
        <div className="mt-3 grid gap-2">
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </GlassCard>
  );
}
