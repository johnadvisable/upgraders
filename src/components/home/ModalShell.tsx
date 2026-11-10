import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared dialog chrome: backdrop click, Escape, body scroll lock, focus in/out, close button. */
export function ModalShell({ onClose, labelledBy, z, className, children }: { onClose: () => void; labelledBy: string; z: string; className?: string; children: ReactNode }) {
  const dialog = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close.current();
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); trigger?.focus(); };
  }, []);
  return (
    <div onClick={onClose} className={cn("fixed inset-0 flex items-start justify-center overflow-y-auto bg-foreground/45 px-[clamp(12px,3vw,32px)] py-[clamp(12px,4vh,56px)] backdrop-blur-[6px]", z)}>
      <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby={labelledBy} tabIndex={-1} onClick={(e) => e.stopPropagation()}
        className={cn("relative my-auto w-full rounded-[20px] text-foreground shadow-[0_30px_80px_-30px_rgba(0,0,0,.45)] outline-none", className)}>
        <button type="button" aria-label="Κλείσιμο" onClick={onClose} className="absolute right-[18px] top-[18px] flex h-10 w-10 items-center justify-center rounded-[10px] bg-transparent hover:bg-foreground/7">
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden><path d="M6 6l12 12" /><path d="M18 6L6 18" /></svg>
        </button>
        {children}
      </div>
    </div>
  );
}
