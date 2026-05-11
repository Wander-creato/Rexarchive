import Link from "next/link";

import { ImmersiveHero } from "@/components/landing/immersive-hero";
import { SitePage } from "@/components/layout/site-page";
import { GlassCard } from "@/components/ui/glass-card";

export default function HomePage() {
  return (
    <SitePage
      title="Plateforme patrimoniale vivante"
      subtitle="Chaque route est opérationnelle : la fresque IA, le coffre d'importation et les archives connectées à Supabase."
    >
      <section className="pb-14">
        <ImmersiveHero />

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <GlassCard className="p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-teal-200/80">Route</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-100">/fresque</h2>
            <p className="mt-2 text-sm text-slate-300/85">Narration IA immersive avec effet machine à écrire.</p>
            <Link
              href="/fresque"
              className="mt-4 inline-flex rounded-xl border border-amber-300/35 px-3 py-2 text-xs font-medium text-amber-100 transition-colors hover:bg-amber-500/15"
            >
              Ouvrir la fresque
            </Link>
          </GlassCard>
          <GlassCard className="p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-teal-200/80">Route</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-100">/le-coffre</h2>
            <p className="mt-2 text-sm text-slate-300/85">Centre d&apos;importation multi-étapes connecté au bucket Supabase.</p>
            <Link
              href="/le-coffre"
              className="mt-4 inline-flex rounded-xl border border-amber-300/35 px-3 py-2 text-xs font-medium text-amber-100 transition-colors hover:bg-amber-500/15"
            >
              Ouvrir le coffre
            </Link>
          </GlassCard>
          <GlassCard className="p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-teal-200/80">Route</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-100">/archives</h2>
            <p className="mt-2 text-sm text-slate-300/85">Galerie recherchable en temps réel, filtrée par type de média.</p>
            <Link
              href="/archives"
              className="mt-4 inline-flex rounded-xl border border-amber-300/35 px-3 py-2 text-xs font-medium text-amber-100 transition-colors hover:bg-amber-500/15"
            >
              Explorer les archives
            </Link>
          </GlassCard>
        </section>
      </section>
    </SitePage>
  );
}
