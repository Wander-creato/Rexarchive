import { ArchivesExplorer } from "@/components/archives/archives-explorer";
import { SitePage } from "@/components/layout/site-page";

export default function ArchivesPage() {
  return (
    <SitePage
      title="Archives"
      subtitle="Recherchez en temps réel dans la base Supabase par type, titre, description ou catégorie."
    >
      <ArchivesExplorer />
    </SitePage>
  );
}
