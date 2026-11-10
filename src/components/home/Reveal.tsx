import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Fades/slides a block in once when it first scrolls into view. Hidden state lives in CSS
 * under prefers-reduced-motion: no-preference, so reduced-motion users never get any override. */
export function Reveal({ children, className, as: Tag = "div", ...rest }: { children: ReactNode; className?: string; as?: ElementType } & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setShown(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} data-reveal="" className={cn(shown && "is-revealed", className)} {...rest}>{children}</Tag>;
}
