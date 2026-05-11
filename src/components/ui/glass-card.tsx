import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = ComponentPropsWithoutRef<"div">;

export function GlassCard({ className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-[2rem] transition duration-300 hover:border-white/20 hover:bg-white/[0.16]",
        className,
      )}
      {...props}
    />
  );
}
