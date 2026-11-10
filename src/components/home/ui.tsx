import type React from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("font-mono text-xs font-normal uppercase tracking-[0.1em] text-foreground", className)}>{children}</p>;
}

export function Title({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("mt-3 text-[clamp(2.25rem,5vw,4.5rem)] font-light leading-[1.04]", className)}>{children}</h2>;
}

export function Pill({ children, href = "#contact", variant = "dark", className, showArrow = true, onClick }: { onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; children: ReactNode; href?: string; variant?: "dark" | "light" | "outline"; className?: string; showArrow?: boolean }) {
  const styles = {
    dark: "bg-primary text-primary-foreground hover:bg-primary/85",
    light: "bg-ink-foreground text-ink hover:bg-ink-foreground/85",
    outline: "border border-foreground/25 hover:bg-foreground/5",
  }[variant];
  return (
    <a href={href} onClick={onClick} className={cn("inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors", styles, className)}>
      {children} {showArrow && <span aria-hidden>→</span>}
    </a>
  );
}

export function Section({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("px-5", !/(^|\s)(min-\[\d+px\]:)?p[ytb]-/.test(className ?? "") && "py-20 md:py-28", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
