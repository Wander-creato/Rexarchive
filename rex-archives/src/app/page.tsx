import { ImmersiveHero } from "@/components/landing/immersive-hero";
import { LandingShell } from "@/components/landing/landing-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { GlassCard } from "@/components/ui/glass-card";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0f172a]">
      <div className="film-grain-layer" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(17,94,89,0.25),transparent_45%),radial-gradient(circle_at_90%_20%,rgba(245,158,11,0.18),transparent_40%)]" />

      <SiteHeader />

      <main className="pb-14">
        <ImmersiveHero />
        <LandingShell />

        <section className="mx-auto mt-10 w-[min(100%,76rem)] px-5 md:px-8">
          <GlassCard className="p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-teal-200/80">Vision de la plateforme</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100 md:text-3xl">
              Conçue pour la confiance, la fluidité et l&apos;émotion
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200/85 md:text-base">
              La plateforme prend désormais en charge l&apos;importation en direct via Supabase, les mises à jour
              optimistes de la galerie et la génération dynamique d&apos;une fresque IA à partir de témoignages réels.
            </p>
          </GlassCard>
        </section>
      </main>
    </div>
  );
}
