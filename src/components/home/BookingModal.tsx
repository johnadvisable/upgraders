import { createContext, useCallback, useContext, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

const BookingContext = createContext<(e?: MouseEvent) => void>(() => {});
export const useOpenBooking = () => useContext(BookingContext);

const items = [
  "Θέλετε η ομάδα σας να χρησιμοποιεί σωστά ChatGPT, Claude και Copilot στην καθημερινή δουλειά.",
  "Ψάχνετε εκπαίδευση στημένη πάνω στις δικές σας διαδικασίες και εργαλεία.",
  "Θέλετε να δείτε ποια τμήματα θα κερδίσουν περισσότερο από το AI.",
  "Σκέφτεστε custom AI εργαλεία για την επιχείρησή σας.",
];

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const openModal = useCallback((e?: MouseEvent) => {
    e?.preventDefault();
    trigger.current = (e?.currentTarget as HTMLElement) ?? (document.activeElement as HTMLElement);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const t = trigger.current;
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      t?.focus();
    };
  }, [open, close]);

  const src = typeof window === "undefined" ? "" : "https://calendly.com/theupgraders/30min?hide_gdpr_banner=1&hide_landing_page_details=1&background_color=ffffff&text_color=1c1c1a&primary_color=1c1c1a&embed_type=Inline&embed_domain=" + encodeURIComponent(window.location.hostname);

  return (
    <BookingContext.Provider value={openModal}>
      {children}
      {open && (
        <div onClick={close} className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-foreground/45 px-[clamp(12px,3vw,32px)] py-[clamp(12px,4vh,56px)] backdrop-blur-[6px]">
          <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="booking-title" tabIndex={-1} onClick={(e) => e.stopPropagation()}
            className="booking-dialog relative my-auto w-full max-w-[1120px] rounded-[20px] p-[clamp(28px,4vw,56px)] text-foreground shadow-[0_30px_80px_-30px_rgba(0,0,0,.45)] outline-none">
            <button type="button" aria-label="Κλείσιμο" onClick={close} className="absolute right-[18px] top-[18px] flex h-10 w-10 items-center justify-center rounded-[10px] bg-transparent hover:bg-foreground/7">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden><path d="M6 6l12 12" /><path d="M18 6L6 18" /></svg>
            </button>
            <div className="booking-grid">
              <div style={{ gridArea: "intro" }}>
                <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#5F5B53]">Δωρεάν γνωριμία · 30 λεπτά</p>
                <h2 id="booking-title" className="mt-4 text-[clamp(28px,3.2vw,42px)] font-semibold leading-[1.1] tracking-[-0.025em]">Ας δούμε μαζί πώς θα αναβαθμιστεί η εταιρεία σας.</h2>
                <p className="mt-4 text-[17px] text-[#3A3833]">Σε μια σύντομη κλήση γνωρίζουμε την ομάδα σας, εντοπίζουμε πού το AI μπορεί να φέρει άμεσο αποτέλεσμα και σας προτείνουμε το κατάλληλο πακέτο. Χωρίς δέσμευση.</p>
              </div>
              <div style={{ gridArea: "list" }}>
                <p className="text-[15px] font-semibold">Είναι για εσάς αν:</p>
                <ul className="mt-4 grid gap-3">
                  {items.map((t, i) => (
                    <li key={t} className="flex gap-3 text-base"><span className="font-bold text-accent">{String(i + 1).padStart(2, "0")}.</span><span>{t}</span></li>
                  ))}
                </ul>
              </div>
              <div style={{ gridArea: "cal" }} className="min-h-[660px] overflow-hidden rounded-[16px] bg-card">
                <iframe src={src} title="Κλείστε ραντεβού" className="block h-[700px] w-full border-0" />
              </div>
            </div>
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}
