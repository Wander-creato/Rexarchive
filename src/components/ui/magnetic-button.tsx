"use client";

import type { MouseEvent } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = HTMLMotionProps<"button"> & {
  asChild?: never;
};

export function MagneticButton({
  className,
  children,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });

  function handleMouseMove(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
    onMouseMove?.(event);
  }

  function handleMouseLeave(event: MouseEvent<HTMLButtonElement>) {
    x.set(0);
    y.set(0);
    onMouseLeave?.(event);
  }

  return (
    <motion.button
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-3 text-sm font-semibold text-slate-950 shadow-glow outline-none transition focus-visible:ring-2 focus-visible:ring-memory-amber focus-visible:ring-offset-2 focus-visible:ring-offset-midnight",
        className,
      )}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      <span className="absolute inset-0 bg-memory-amber transition duration-300 group-hover:bg-amber-300" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
