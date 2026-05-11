import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FrescoPreview } from "@/components/landing/FrescoPreview";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { demoFresco, demoMemories } from "@/data/demo-memories";

export default function FrescoPage() {
  return (
    <main className="min-h-screen pt-28">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/12"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to landing
        </Link>
      </div>
      <FrescoPreview memories={demoMemories} fresco={demoFresco} />
    </main>
  );
}
