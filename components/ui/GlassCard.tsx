import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type GlassCardProps<TElement extends ElementType> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

export function GlassCard<TElement extends ElementType = "div">({
  as,
  children,
  className = "",
  ...props
}: GlassCardProps<TElement>) {
  const Component = as ?? "div";

  return (
    <Component className={`glass-panel rounded-[2rem] ${className}`} {...props}>
      {children}
    </Component>
  );
}
