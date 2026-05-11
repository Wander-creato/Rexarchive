interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={[
        "animate-pulse rounded-xl bg-gradient-to-r from-white/5 via-white/15 to-white/5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
