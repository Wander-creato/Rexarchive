import { Archive, ShieldCheck, Sparkles } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { ImmersiveFresco } from "@/components/sections/immersive-fresco";
import { MediaGallery } from "@/components/sections/media-gallery";
import { UploadVault } from "@/components/sections/upload-vault";
import { GlassCard } from "@/components/ui/glass-card";
import { demoNarrative, featuredMemories } from "@/data/mock-memories";

const trustSignals = [
  {
    icon: ShieldCheck,
    label: "Consent-first vault",
    copy: "Every contribution is prepared for Supabase Auth, privacy states, and transparent archival permissions.",
  },
  {
    icon: Sparkles,
    label: "AI narrative synthesis",
    copy: "The services layer is ready to extract themes and create chronological or thematic storylines.",
  },
  {
    icon: Archive,
    label: "Multimedia heritage",
    copy: "Photos, videos, and audio memories converge in one warm, searchable experience.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="noise-overlay" aria-hidden="true" />
      <HeroSection memories={featuredMemories} />

      <section
        className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 py-8 md:grid-cols-3 md:px-8"
        aria-label="Platform trust signals"
      >
        {trustSignals.map(({ icon: Icon, label, copy }) => (
          <GlassCard key={label} className="group p-5">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-memory-amber/15 text-memory-amber transition-transform duration-300 group-hover:scale-105">
              <Icon aria-hidden="true" size={22} />
            </div>
            <h2 className="text-lg font-semibold tracking-tight text-white">
              {label}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
          </GlassCard>
        ))}
      </section>

      <ImmersiveFresco memories={featuredMemories} narrative={demoNarrative} />
      <UploadVault />
      <MediaGallery memories={featuredMemories} />
    </main>
  );
}
