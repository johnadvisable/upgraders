import { createContext, useCallback, useContext, useState, type MouseEvent, type ReactNode } from "react";
import { ModalShell } from "./ModalShell";

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
  const openModal = useCallback((e?: MouseEvent) => {
    e?.preventDefault();
    (e?.currentTarget as HTMLElement | undefined)?.focus();
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  const src = typeof window === "undefined" ? "" : "https://calendly.com/theupgraders/30min?hide_gdpr_banner=1&hide_landing_page_details=1&background_color=ffffff&text_color=1c1c1a&primary_color=1c1c1a&embed_type=Inline&embed_domain=" + encodeURIComponent(window.location.hostname);

  return (
    <BookingContext.Provider value={openModal}>
      {children}
      {open && (
        <ModalShell onClose={close} labelledBy="booking-title" z="z-[200]" className="booking-dialog max-w-[1120px] p-[clamp(28px,4vw,56px)]">
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
        </ModalShell>
      )}
    </BookingContext.Provider>
  );
}
