import type React from "react";
import { GrainGradient } from "@paper-design/shaders-react";
import { ClientOnly } from "@tanstack/react-router";
import { ArrowRight, MonitorPlay, UserRound, Zap, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "./Slider";
import { Reveal } from "./Reveal";
import { useOpenBooking } from "./BookingModal";
import { courses } from "./data";
import { Eyebrow, Pill, Section, Title } from "./ui";

export function Header() {
  const openBooking = useOpenBooking();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-5 py-4 border-b backdrop-blur-[14px] transition-colors duration-300 ${scrolled ? "border-foreground/8 bg-background/94" : "border-background/0"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <a href="#top" aria-label="The Upgraders"><img src={scrolled ? "/logo.svg" : "/logo-negative.svg"} alt="The Upgraders" className="h-[34px] w-auto" /></a>
        <span className="relative">
          <Pill href="#contact" onClick={openBooking} variant={scrolled ? "dark" : "light"} showArrow={false} className={`h-11 rounded-full px-5 py-0 text-[15px] font-medium ${scrolled ? "bg-ink text-ink-foreground hover:bg-ink/85" : ""}`}>
            Θέλω εκπαίδευση
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Pill>
          <span className="absolute -right-1 -top-[7px] flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground">1</span>
        </span>
      </div>
    </header>
  );
}

const NOTIF_KEY = "tu-update-notif-closed";
type Placement = "sheet" | "bottom" | "top" | "corner" | "wait";
type NotifMode = "main" | "later" | "done";

function UpdateCard({ textRef }: { textRef: React.RefObject<HTMLDivElement | null> }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<NotifMode>("main");
  const [placement, setPlacement] = useState<Placement>("wait");
  const [vw, setVw] = useState(1280);
  const [reduced, setReduced] = useState(false);
  const closing = useRef(false);

  const compute = useCallback(() => {
    const w = window.innerWidth;
    setVw(w);
    if (w < 900) { setPlacement("sheet"); return; }
    const card = cardRef.current;
    const hero = card?.offsetParent as HTMLElement | null;
    const h = card?.offsetHeight ?? 160;
    const vh = window.innerHeight;
    const right = w - Math.min(Math.max(16, w * 0.03), 32);
    const left = right - 360;
    const texts = textRef.current ? Array.from(textRef.current.children).map((el) => el.getBoundingClientRect()) : [];
    const clear = (top: number) => top >= 0 && top + h <= vh && !texts.some((r) => r.width > 0 && r.left < right && r.right > left && r.top < top + h && r.bottom > top);
    const heroBottom = hero?.getBoundingClientRect().bottom ?? 0;
    if (hero && clear(heroBottom - 20 - h)) return setPlacement("bottom");
    if (clear(88)) return setPlacement("top");
    if (clear(vh - 12 - h)) return setPlacement("corner");
    setPlacement("wait");
  }, [textRef]);

  const show = useCallback(() => {
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => { compute(); setVisible(true); }));
  }, [compute]);

  useEffect(() => {
    if (sessionStorage.getItem(NOTIF_KEY) === "1") return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (window.innerWidth < 900) {
      const onScroll = () => {
        if (window.scrollY < 24) return;
        window.removeEventListener("scroll", onScroll);
        timer = setTimeout(show, 400);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => { window.removeEventListener("scroll", onScroll); clearTimeout(timer); };
    }
    timer = setTimeout(show, 8000);
    return () => clearTimeout(timer);
  }, [show]);

  useEffect(() => {
    if (!mounted) return;
    let raf = 0;
    const onChange = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(compute); };
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onChange); window.removeEventListener("resize", onChange); };
  }, [mounted, compute]);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    sessionStorage.setItem(NOTIF_KEY, "1");
    setVisible(false);
    setTimeout(() => setMounted(false), 450);
  }, []);

  if (!mounted) return null;
  const sheet = placement === "sheet";
  const small = vw < 600;
  const rightOffset = sheet && small ? "12px" : sheet ? "clamp(20px,4vw,48px)" : "clamp(16px,3vw,32px)";
  const pos: React.CSSProperties =
    sheet ? { position: "fixed", bottom: small ? 12 : 16, right: rightOffset, left: small ? 12 : undefined, width: small ? "auto" : 360 }
    : placement === "bottom" ? { position: "absolute", bottom: 20, right: rightOffset, width: 360 }
    : placement === "top" ? { position: "fixed", top: 88, right: rightOffset, width: 360 }
    : { position: "fixed", bottom: 12, right: rightOffset, width: 360 };
  const shown = visible && placement !== "wait";
  const offset = reduced ? "none" : sheet ? "translateY(calc(100% + 24px))" : "translateY(16px)";
  const style: React.CSSProperties = {
    ...pos, zIndex: 60,
    visibility: placement === "wait" ? "hidden" : "visible",
    opacity: shown ? 1 : 0, transform: shown ? "none" : offset,
    transition: "opacity .45s ease, transform .55s cubic-bezier(.2,.8,.2,1)",
  };

  return (
    <div ref={cardRef} role="status" style={style} className="rounded-[18px] border border-ink-foreground/15 bg-ink/60 p-4 text-left text-ink-foreground shadow-2xl backdrop-blur-2xl">
      <button type="button" aria-label="Κλείσιμο" onClick={close} className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-ink-foreground/15 text-ink-foreground">
        <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      {mode === "main" && (
        <div className="flex gap-3">
          <img src="/icon.png" alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-[10px]" />
          <div className="flex-1">
            <div className="flex items-center justify-between pr-6">
              <p className="text-sm font-semibold">Update Available</p>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-foreground/60">Τώρα</span>
            </div>
            <p className="mt-1 text-[13px] leading-snug text-ink-foreground/85">Το πιο σημαντικό Upgrade είναι διαθέσιμο για την εταιρεία σας. Η εταιρεία σας 2.0.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="button" onClick={close} className="rounded-[8px] bg-ink-foreground py-1.5 text-[13px] font-medium text-ink">Εγκατάσταση τώρα</button>
              <button type="button" onClick={() => { setMode("later"); requestAnimationFrame(compute); }} className="rounded-[8px] bg-ink-foreground/15 py-1.5 text-[13px] font-medium">Αργότερα</button>
            </div>
          </div>
        </div>
      )}
      {mode === "later" && (
        <div className="animate-[tuIn_0.35s_ease_both] pr-6">
          <p className="text-sm font-semibold">Κατανοητό. Θα σας υπενθυμίσουμε.</p>
          <p className="mt-1 font-serif text-[15px] italic text-ink-foreground/85">Οι ανταγωνιστές σας πάτησαν ήδη Εγκατάσταση.</p>
          <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); setMode("done"); setTimeout(close, 2600); }}>
            <input type="email" required placeholder="email@εταιρεία.gr" aria-label="Email" className="min-w-0 flex-1 rounded-[8px] border border-ink-foreground/20 bg-ink-foreground/10 px-3 py-1.5 text-[13px] text-ink-foreground placeholder:text-ink-foreground/50 outline-none focus:border-ink-foreground/50" />
            <button type="submit" className="shrink-0 rounded-[8px] bg-ink-foreground px-3 py-1.5 text-[13px] font-medium text-ink">Ενημερώστε με</button>
          </form>
        </div>
      )}
      {mode === "done" && (
        <div className="animate-[tuIn_0.35s_ease_both] pr-6">
          <p className="text-sm font-semibold">Εγγραφήκατε ✓</p>
          <p className="mt-1 text-[13px] text-ink-foreground/85">Θα λαμβάνετε τα Patch Notes μία φορά τον μήνα.</p>
        </div>
      )}
    </div>
  );
}

export function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  return (
    <section id="top" className="relative flex overflow-hidden bg-ink min-h-screen items-center justify-center px-5 text-center text-ink-foreground">
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <ClientOnly fallback={null}>
          <GrainGradient
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            colors={["#5a3777c4", "#4d0c5f", "#4d0c5f", "#4d0c5f"]}
            colorBack="#1e0a3d"
            softness={0.81}
            intensity={0.5}
            noise={0.25}
            shape="corners"
            speed={2}
            scale={0.92}
            rotation={72}
            offsetX={-1}
            offsetY={-1}
          />
        </ClientOnly>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,20,19,.5) 0%, rgba(20,20,19,.12) 45%, rgba(20,20,19,.45) 100%)" }} />
        <div className="absolute inset-0" style={{ opacity: 0.28, mixBlendMode: "overlay", backgroundImage: "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E)" }} />
      </div>
      <div ref={textRef} className="relative z-[1] max-w-4xl">
        <h1 className="text-[clamp(2.125rem,4.4vw,4.25rem)] font-semibold leading-[1.15]">
          Βάλατε ChatGPT<br className="md:hidden" /> και Claude.
          <span className="mt-1 block md:whitespace-nowrap text-[clamp(1.75rem,3.6vw,3.4375rem)] italic">Η καθημερινότητα<br className="md:hidden" /> όμως έμεινε ίδια.</span>
        </h1>
        <p className="mx-auto mt-14 text-lg font-medium md:text-xl">Ήρθε η ώρα για αναβάθμιση. Αναλαμβάνουν οι Upgraders.</p>
        <p className="mx-auto mt-2 text-lg text-ink-foreground/85 md:text-xl">
          Μια ομάδα από <strong className="font-semibold text-ink-foreground">builders</strong>, <strong className="font-semibold text-ink-foreground">δημιουργούς</strong>, <strong className="font-semibold text-ink-foreground">tech και corporate education experts</strong>.
        </p>
        <a href="#services" className="mt-10 inline-block border-b border-ink-foreground/40 pb-1 text-sm font-medium hover:border-ink-foreground">
          Υπηρεσίες εκπαίδευσης για επιχειρήσεις →
        </a>
      </div>
      <UpdateCard textRef={textRef} />
    </section>
  );
}

function ServiceCard({ title, sub, text, cta, badge, icon, tone, modal, tooltip }: { title: string; sub?: string; text: string; cta: string; badge?: string; icon: ServiceIconName; tone: "light" | "tan"; modal?: boolean; tooltip: string }) {
  const openBooking = useOpenBooking();
  const light = tone === "light";
  const tooltipId = useId();
  const [open, setOpen] = useState(false);
  const canHover = () => window.matchMedia("(hover: hover) and (min-width: 900px)").matches;
  return (
    <div onMouseEnter={() => canHover() && setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => canHover() && setOpen(true)} onBlur={() => setOpen(false)}
      className={`relative flex flex-col rounded-[20px] p-[22px] min-[760px]:p-7 ${light ? "bg-card shadow-[0_8px_24px_-12px_rgba(28,28,26,0.18)]" : "bg-tan"}`}>
      {open && <div id={tooltipId} role="tooltip" className="pointer-events-none absolute left-7 right-7 bottom-[calc(100%+10px)] z-[5] rounded-[10px] bg-ink px-[14px] py-[10px] text-[13px] font-normal leading-[1.4] text-ink-foreground shadow-[0_12px_30px_-12px_rgba(0,0,0,0.4)]">{tooltip}</div>}
      {badge && <span className="absolute right-5 top-7 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">{badge}</span>}
      <span className={`flex h-11 w-11 items-center justify-center rounded-[4px] ${light ? "bg-tan" : "bg-background"}`}>
        <ServiceIcon name={icon} className="h-[22px] w-[22px]" />
      </span>
      <h3 className="mt-[30px] text-xl font-semibold tracking-tight">{title}</h3>
      {sub && <p className="mt-[2px] text-foreground/70">{sub}</p>}
      <p className="mt-[10px] leading-relaxed text-foreground/80">{text}</p>
      <div className="flex-1" />
      <a href={modal ? "#contact" : "#live"} onClick={modal ? openBooking : undefined} aria-describedby={open ? tooltipId : undefined} className="mt-4 inline-flex items-center gap-2 self-start rounded-[6px] bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/85 hover:text-primary-foreground">
        {cta} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function GroupLabel({ title, sub }: { title: string; sub: string }) {
  return (
    <p className="mb-4 border-b border-border pb-3 text-sm">
      <span className="mr-2 font-semibold uppercase tracking-[0.12em]">{title}</span>
      <span className="text-muted-foreground">{sub}</span>
    </p>
  );
}

export function Services() {
  return (
    <Section id="services" className="py-[clamp(72px,9vw,128px)]">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow className="text-foreground">Υπηρεσίες εκπαίδευσης</Eyebrow>
          <Title className="mt-6 text-5xl md:text-7xl">
            Επιλέξτε πώς θα
            <span className="block font-serif italic !font-normal">αναβαθμιστείτε.</span>
          </Title>
        </div>
        <Pill>Θέλω εκπαίδευση</Pill>
      </Reveal>
      <Reveal className="mt-12 grid gap-4 lg:grid-cols-2">
        <div className="min-w-0">
          <GroupLabel title="Σε τμήματα" sub="Ανοιχτά μαθήματα & βιβλιοθήκη εκπαιδεύσεων" />
          <Slider className="lg:h-[calc(100%-3rem)]" sliderClassName="service-slider h-full min-[760px]:grid min-[760px]:grid-cols-2 min-[760px]:gap-4">
            <ServiceCard tone="light" icon="live" title="Live Εκπαίδευση" sub="(σε μικρά τμήματα)" text="Μικρά groups, σε δική μας αίθουσα ή livestream." cta="Επόμενα μαθήματα" tooltip="Ζωντανή εκπαίδευση σε μικρή ομάδα, σε προσιτό κόστος." />
            <ServiceCard tone="light" icon="demand" title="On Demand εκπαίδευση" text="Δείτε σε μαγνητοσκόπηση κρίσιμες εκπαιδεύσεις για τα σημαντικότερα εργαλεία AI." cta="Περισσότερα" tooltip="Η πιο οικονομική, Do-it-Yourself επιλογή." />
          </Slider>
        </div>
        <div className="min-w-0">
          <GroupLabel title="Εξατομικευμένη" sub="Στημένη αποκλειστικά για την ομάδα σας" />
          <Slider className="lg:h-[calc(100%-3rem)]" sliderClassName="service-slider h-full min-[760px]:grid min-[760px]:grid-cols-2 min-[760px]:gap-4">
            <ServiceCard modal tone="tan" icon="corporate" title="Εταιρικό AI Upgrade" text="Tailor-made εκπαίδευση, στημένη πάνω στην εταιρεία σας." cta="Δείτε πώς γίνεται" tooltip="Η πιο εξατομικευμένη αλλά και ακριβή επιλογή." />
            <ServiceCard modal tone="tan" icon="sprint" badge="Δημοφιλές" title="8ώρο AI Sprint" text="Δύο 4ωρα μέσα στην εταιρεία σας, εκπαίδευση στα εργαλεία που θα κάνουν τη διαφορά." cta="Κλείστε Sprint" tooltip="Υψηλή εξατομίκευση, ελκυστικό κόστος." />
          </Slider>
        </div>
      </Reveal>
    </Section>
  );
}

export function LiveCourses() {
  return (
    <Section id="live" className="pt-[clamp(40px,5vw,72px)] pb-0">
      <Reveal className="max-w-[51.25rem]">
        <Eyebrow>Live Upgrades</Eyebrow>
        <Title>Τα επόμενα <span className="font-serif italic font-normal!">live<br className="hidden lg:block" /> μαθήματα.</span></Title>
        <p className="mt-4 text-lg text-muted-foreground">Μικρά groups, σε αίθουσα ή livestream. Κάθε μάθημα έχει τη δική του σελίδα με αναλυτική ύλη, κράτηση θέσης και πληρωμή.</p>
      </Reveal>
      <Reveal className="mt-10 rounded-[20px] border border-live-table-border bg-card">
        <div className="live-course-grid hidden border-b border-live-header-divider px-7 py-[18px] font-mono text-[11px] uppercase text-muted-foreground min-[900px]:grid">
          <span>ΜΑΘΗΜΑ</span><span>ΗΜΕΡΟΜΗΝΙΑ</span><span>ΩΡΕΣ</span><span>ΤΡΟΠΟΣ</span><span>ΤΙΜΗ</span>
          <span aria-hidden />
        </div>
        {courses.map((c, i) => {
          const done = c.status === "done";
          return (
            <div key={i} className={`live-course-grid grid items-center gap-3 min-[900px]:gap-5 px-7 py-[22px] ${i > 0 ? "border-t border-live-row-divider" : ""} ${done ? "opacity-55" : ""}`}>
              <div>
                <div className="text-[17px] font-medium">{c.title}</div>
                <p className="mt-1 text-[13px] text-live-subtitle">{c.tools}</p>
              </div>
              <p className="flex items-start gap-2 text-[15px] font-normal"><svg aria-hidden width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0"><path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" /></svg>{c.date}</p>
              <p className="flex items-center gap-2 whitespace-nowrap text-[15px]"><svg aria-hidden width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2" /></svg>{c.time}</p>
              <div className="flex flex-wrap gap-3 text-[15px] min-[900px]:flex-col min-[900px]:gap-2">
                {c.modes.map((m) => {
                  return <span key={m} className="inline-flex items-center gap-2 whitespace-nowrap"><svg aria-hidden width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d={m === "On site" ? "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" : "M3 5h18v11H3zM8 20h8M12 16v4"} /></svg>{m}</span>;
                })}
              </div>
              {done ? (
                <span className="justify-self-start rounded-full border border-live-completed px-3 py-1.5 text-xs font-medium text-muted-foreground min-[900px]:col-span-2">Ολοκληρώθηκε</span>
              ) : (
                <>
                  <p className="text-base font-medium">{c.price}</p>
                  <span className="relative inline-flex justify-self-start min-[900px]:justify-self-end">
                    <Pill showArrow={false} className="whitespace-nowrap px-4 hover:bg-live-booking-hover hover:text-primary-foreground!">Κράτηση θέσης</Pill>
                    <span className="absolute -right-2 -top-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">Λίγες θέσεις</span>
                  </span>
                </>
              )}
            </div>
          );
        })}
      </Reveal>
      <Reveal className="live-xsell-list">
        {[
          { text: "Θέλω εξατομικευμένη εταιρική εκπαίδευση", icon: UserRound, tooltip: "Η πιο εξατομικευμένη αλλά και ακριβή επιλογή." },
          { text: "Θέλω ένα 8ωρο Sprint μέσα στην εταιρεία μου", icon: Zap, tooltip: "Υψηλή εξατομίκευση, ελκυστικό κόστος." },
          { text: "Θέλω να δω μαγνητοσκοπημένες εκπαιδεύσεις", icon: MonitorPlay, tooltip: "Η πιο οικονομική, Do-it-Yourself επιλογή." },
        ].map((card) => (
          <LiveCrossSellCard key={card.text} {...card} />
        ))}
      </Reveal>
    </Section>
  );
}

function LiveCrossSellCard({ text, icon: Icon, tooltip }: { text: string; icon: LucideIcon; tooltip: string }) {
  const tooltipId = useId();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hovered || focused || pinned;
  return (
    <div className="live-xsell-card">
      <Pill showArrow={false} className="live-xsell-link">
        <span className="live-xsell-swatch"><Icon aria-hidden className="h-5 w-5" strokeWidth={1.8} /></span>
        <span className="min-w-0 flex-1">{text}</span>
        <svg aria-hidden width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </Pill>
      <Button type="button" variant="ghost" size="icon" className="live-xsell-info [&_svg]:size-3" aria-label={`Πληροφορίες: ${text}`} aria-describedby={open ? tooltipId : undefined} aria-expanded={open}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)} onBlur={() => { setFocused(false); setPinned(false); }}
        onClick={() => setPinned((value) => !value)}
        onKeyDown={(event) => { if (event.key === "Escape") { setHovered(false); setFocused(false); setPinned(false); } }}>
        <svg aria-hidden width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 11v6M12 7h.01" strokeWidth={2.6} /></svg>
      </Button>
      {open && <div id={tooltipId} role="tooltip" className="live-xsell-tooltip">{tooltip}</div>}
    </div>
  );
}

type ServiceIconName = "corporate" | "sprint" | "live" | "demand";
const serviceIconPaths: Record<ServiceIconName, string[]> = {
  corporate: ["M4 21V5l8-3v19", "M12 9h8v12", "M3 21h18", "M7 8h2", "M7 12h2", "M7 16h2", "M15 13h2", "M15 17h2"],
  sprint: ["M13 2L4 14h7l-1 8 9-12h-7z"],
  live: ["M3 5h18v12H3z", "M8 21h8", "M12 17v4", "M10 8.5v5l4-2.5z"],
  demand: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M10 8.5v7l6-3.5z"],
};

function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {serviceIconPaths[name].map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
