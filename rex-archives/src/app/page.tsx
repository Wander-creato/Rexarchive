import { FrescoRibbon } from "@/components/landing/fresco-ribbon";
import { ImmersiveHero } from "@/components/landing/immersive-hero";
import { MediaGalleryPreview } from "@/components/landing/media-gallery-preview";
import { UploadVaultPreview } from "@/components/landing/upload-vault-preview";
import { SiteHeader } from "@/components/layout/site-header";
import { GlassCard } from "@/components/ui/glass-card";
import { mockContributions, seededStoryline, seededThemes } from "@/data/mock-memories";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0f172a]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(17,94,89,0.25),transparent_45%),radial-gradient(circle_at_90%_20%,rgba(245,158,11,0.18),transparent_40%)]" />

      <SiteHeader />

      <main className="pb-14">
        <ImmersiveHero />
        <FrescoRibbon contributions={mockContributions} storyline={seededStoryline} themes={seededThemes} />

        <section className="mx-auto mt-10 grid w-[min(100%,76rem)] gap-4 px-5 md:grid-cols-2 md:px-8">
          <UploadVaultPreview />
          <MediaGalleryPreview items={mockContributions} />
        </section>

        <section className="mx-auto mt-10 w-[min(100%,76rem)] px-5 md:px-8">
          <GlassCard className="p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-teal-200/80">Platform Blueprint</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100 md:text-3xl">
              Built for trust, velocity, and emotional clarity
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200/85 md:text-base">
              This scaffold introduces the visual and architectural foundation for Supabase-backed uploads,
              AI-powered narrative generation, and fluid archival exploration. The next step is wiring real auth,
              storage, and live synthesis pipelines into this UI shell.
            </p>
          </GlassCard>
        </section>
      </main>
    </div>
  );
}
