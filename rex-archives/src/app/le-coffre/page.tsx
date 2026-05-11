import Link from "next/link";

import { UploadVaultPreview } from "@/components/landing/upload-vault-preview";
import { SitePage } from "@/components/layout/site-page";

export default function LeCoffrePage() {
  return (
    <SitePage
      title="Le Coffre"
      subtitle="Déposez vos souvenirs en trois étapes : fichier, description et catégorie. Chaque publication alimente immédiatement les archives."
    >
      <section className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <UploadVaultPreview />
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.18em] text-teal-200/80">Conseil d'archiviste</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-100">Préparez un souvenir lisible et inspirant</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300/90">
            <li>Utilisez un titre clair qui situe le moment ou le lieu.</li>
            <li>Rédigez une description sensible et contextualisée.</li>
            <li>Choisissez une catégorie utile à la consultation future.</li>
          </ul>
          <Link
            href="/archives"
            className="mt-5 inline-flex rounded-xl border border-amber-300/45 px-3 py-2 text-xs font-medium text-amber-100 transition-colors hover:bg-amber-500/20"
          >
            Consulter les archives en direct
          </Link>
        </div>
      </section>
    </SitePage>
  );
}
