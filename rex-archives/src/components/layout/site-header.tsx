"use client";

import { motion } from "framer-motion";
import { Archive, Sparkles, UploadCloud } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Le Coffre", href: "/le-coffre", icon: UploadCloud },
  { label: "Fresque narrative", href: "/fresque", icon: Sparkles },
  { label: "Archives", href: "/archives", icon: Archive },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-4 z-50 mx-auto w-[min(96%,76rem)] rounded-2xl border border-white/15 bg-[#0f172a]/70 px-5 py-3 backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
            <Archive className="size-4" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-teal-200/80">ADAMIC</p>
            <p className="text-sm font-semibold text-slate-100">Rex-Archives</p>
          </div>
        </Link>

        <nav className="hidden gap-2 md:flex">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/40 hover:bg-white/10"
            >
              <Icon className="size-4 text-teal-300 transition-colors group-hover:text-amber-300" />
              <span className={pathname === href ? "text-amber-200" : ""}>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <nav className="mt-3 grid grid-cols-3 gap-2 md:hidden">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={`${label}-mobile`}
            href={href}
            className="inline-flex items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-xs text-slate-100"
          >
            <Icon className="size-3.5 text-teal-300" />
            <span className={pathname === href ? "text-amber-200" : ""}>{label}</span>
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
