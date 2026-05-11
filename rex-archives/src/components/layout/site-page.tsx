import type { PropsWithChildren } from "react";

import { SiteHeader } from "@/components/layout/site-header";

interface SitePageProps extends PropsWithChildren {
  title: string;
  subtitle: string;
}

export function SitePage({ title, subtitle, children }: SitePageProps) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0f172a]">
      <div className="film-grain-layer" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(17,94,89,0.25),transparent_45%),radial-gradient(circle_at_90%_20%,rgba(245,158,11,0.18),transparent_40%)]" />
      <SiteHeader />
      <main className="relative z-10 mx-auto w-[min(100%,76rem)] px-5 pb-16 md:px-8">
        <section className="pt-10 md:pt-14">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-200/80">ADAMIC · Rex-Archives</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-50 md:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200/85 md:text-base">{subtitle}</p>
        </section>
        {children}
      </main>
    </div>
  );
}
