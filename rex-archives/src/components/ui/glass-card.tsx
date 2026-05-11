import type { PropsWithChildren } from "react";

interface GlassCardProps extends PropsWithChildren {
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <article
      className={[
        "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_60px_-20px_rgba(0,0,0,0.65)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </article>
  );
}
