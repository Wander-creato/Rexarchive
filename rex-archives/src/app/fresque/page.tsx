import { FresqueView } from "@/components/fresque/fresque-view";
import { SitePage } from "@/components/layout/site-page";

export default function FresquePage() {
  return (
    <SitePage
      title="Fresque narrative"
      subtitle="L'expérience immersive du Rex : la narration IA se nourrit exclusivement des souvenirs présents dans la base Supabase."
    >
      <FresqueView />
    </SitePage>
  );
}
