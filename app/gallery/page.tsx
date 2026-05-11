import { MediaGalleryPreview } from "@/components/landing/MediaGalleryPreview";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { demoMemories } from "@/data/demo-memories";

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-20">
      <SiteHeader />
      <MediaGalleryPreview memories={demoMemories} />
    </main>
  );
}
