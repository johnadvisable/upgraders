import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-xs font-semibold uppercase tracking-[0.2em] text-accent", className)}>{children}</p>;
}

export function Title({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("mt-3 font-display text-4xl leading-tight md:text-5xl", className)}>{children}</h2>;
}

export function Pill({ children, href = "#contact", variant = "dark", className }: { children: ReactNode; href?: string; variant?: "dark" | "light" | "outline"; className?: string }) {
  const styles = {
    dark: "bg-primary text-primary-foreground hover:bg-primary/85",
    light: "bg-ink-foreground text-ink hover:bg-ink-foreground/85",
    outline: "border border-foreground/25 hover:bg-foreground/5",
  }[variant];
  return (
    <a href={href} className={cn("inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors", styles, className)}>
      {children} <span aria-hidden>→</span>
    </a>
  );
}

export function Section({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("px-5 py-20 md:py-28", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
