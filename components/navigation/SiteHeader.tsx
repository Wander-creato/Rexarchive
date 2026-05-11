import Link from "next/link";
import { Archive, Sparkles } from "lucide-react";

const links = [
  { href: "#vault", label: "Upload Vault" },
  { href: "#fresco", label: "AI Fresco" },
  { href: "#gallery", label: "Gallery" },
];

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-4 z-40 px-4">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/12 bg-slate-950/45 px-4 py-3 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl md:px-5"
      >
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/30 transition group-hover:scale-105 group-hover:bg-amber-300/25">
            <Archive aria-hidden="true" className="size-5" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg text-white">Rex-Archives</span>
            <span className="text-xs uppercase tracking-[0.28em] text-slate-300/80">ADAMIC</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full bg-white/5 p-1 text-sm text-slate-200 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="#vault"
          className="group inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
        >
          <Sparkles aria-hidden="true" className="size-4 transition group-hover:rotate-12" />
          Contribute
        </Link>
      </nav>
    </header>
  );
}
