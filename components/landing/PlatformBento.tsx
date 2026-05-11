import { Database, Fingerprint, Loader2, WandSparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Skeleton } from "@/components/ui/Skeleton";

const cards = [
  {
    title: "Supabase-ready data layer",
    description: "Auth, PostgreSQL contribution metadata, and Storage buckets are separated by service boundaries.",
    icon: Database,
  },
  {
    title: "Narrative AI service",
    description: "A typed services/ai.ts module prepares testimonial text for OpenAI or Anthropic synthesis.",
    icon: WandSparkles,
  },
  {
    title: "Trust-first access",
    description: "The visual language favors clear consent moments, readable contrast, and secure contribution paths.",
    icon: Fingerprint,
  },
];

export function PlatformBento() {
  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <GlassCard key={card.title} className="p-6">
              <card.icon aria-hidden="true" className="mb-8 size-7 text-amber-200" />
              <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{card.description}</p>
            </GlassCard>
          ))}

          <GlassCard className="overflow-hidden p-6 md:col-span-3">
            <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-sm text-slate-300">
                  <Loader2 aria-hidden="true" className="size-4 animate-spin text-amber-200" />
                  Skeleton loading system
                </div>
                <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white">
                  Fast-feeling screens while the archive wakes up.
                </h3>
                <p className="mt-3 leading-7 text-slate-400">
                  Loading states are included as shared UI primitives for gallery, upload, and
                  AI Fresco fetches.
                </p>
              </div>
              <div className="grid gap-3">
                <Skeleton className="h-20" />
                <Skeleton className="h-28" />
                <div className="grid grid-cols-3 gap-3">
                  <Skeleton className="h-24" />
                  <Skeleton className="h-24" />
                  <Skeleton className="h-24" />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
