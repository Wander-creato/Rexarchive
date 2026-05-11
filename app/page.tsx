import { FrescoPreview } from "@/components/landing/FrescoPreview";
import { ImmersiveHero } from "@/components/landing/ImmersiveHero";
import { MediaGalleryPreview } from "@/components/landing/MediaGalleryPreview";
import { PlatformBento } from "@/components/landing/PlatformBento";
import { UploadVaultPreview } from "@/components/landing/UploadVaultPreview";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { demoFresco, demoMemories } from "@/data/demo-memories";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <ImmersiveHero />
      <PlatformBento />
      <UploadVaultPreview />
      <FrescoPreview memories={demoMemories} fresco={demoFresco} />
      <MediaGalleryPreview memories={demoMemories} />
    </main>
  );
}
