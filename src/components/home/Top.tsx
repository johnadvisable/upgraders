import { GrainGradient } from "@paper-design/shaders-react";
import { ClientOnly } from "@tanstack/react-router";
import { ArrowRight, Building2, Calendar, CirclePlay, Clock, Info, MapPin, Monitor, MonitorPlay, UserRound, Zap, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { courses } from "./data";
import { Eyebrow, Pill, Section, Title } from "./ui";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-5 py-4 transition-colors duration-300 ${scrolled ? "border-b border-border bg-card/75 backdrop-blur-md" : "border-b border-transparent"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <a href="#top" aria-label="The Upgraders"><img src={scrolled ? "/logo.svg" : "/logo-negative.svg"} alt="The Upgraders" className="h-[34px] w-auto" /></a>
        <span className="relative">
          <Pill href="#services" variant="light" className="px-5 py-3 font-medium">Θέλω εκπαίδευση</Pill>
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground">1</span>
        </span>
      </div>
    </header>
  );
}

function UpdateCard() {
  return (
    <div className="absolute bottom-5 right-5 z-[1] hidden w-[360px] rounded-[18px] border border-ink-foreground/15 bg-ink/60 p-4 text-left shadow-2xl backdrop-blur-2xl sm:block">
      <button aria-label="Κλείσιμο" className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-ink-foreground/15 text-xs text-ink-foreground">×</button>
      <div className="flex gap-3">
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-ink font-display text-lg font-bold">
          u
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent" />
        </span>
        <div className="flex-1">
          <div className="flex items-center justify-between pr-6">
            <p className="text-sm font-semibold">Update Available</p>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-foreground/60">Τώρα</span>
          </div>
          <p className="mt-1 text-[13px] leading-snug text-ink-foreground/85">Το πιο σημαντικό Upgrade είναι διαθέσιμο για την εταιρεία σας. Η εταιρεία σας 2.0.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="rounded-[8px] bg-ink-foreground py-1.5 text-[13px] font-medium text-ink">Εγκατάσταση τώρα</button>
            <button className="rounded-[8px] bg-ink-foreground/15 py-1.5 text-[13px] font-medium">Αργότερα</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
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
      <div className="relative z-[1] max-w-4xl">
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
      <UpdateCard />
    </section>
  );
}

function ServiceCard({ title, sub, text, cta, badge, icon: Icon, tone }: { title: string; sub?: string; text: string; cta: string; badge?: string; icon: LucideIcon; tone: "light" | "tan" }) {
  const light = tone === "light";
  return (
    <div className={`relative flex flex-col rounded-[20px] p-7 ${light ? "bg-card shadow-[0_8px_24px_-12px_rgba(28,28,26,0.18)]" : "bg-tan"}`}>
      {badge && <span className="absolute right-5 top-7 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">{badge}</span>}
      <span className={`flex h-11 w-11 items-center justify-center rounded-[4px] ${light ? "bg-tan" : "bg-card"}`}>
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
      </span>
      <h3 className="mt-10 text-xl font-semibold tracking-tight">{title}</h3>
      {sub && <p className="mt-1 text-foreground/70">{sub}</p>}
      <p className="mt-2 flex-1 leading-relaxed text-foreground/80">{text}</p>
      <a href="#live" className="mt-8 inline-flex items-center gap-2 self-start rounded-[6px] bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/85 hover:text-primary-foreground">
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
    <Section id="services">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow className="text-foreground">Υπηρεσίες εκπαίδευσης</Eyebrow>
          <Title className="mt-6 text-5xl md:text-7xl">
            Επιλέξτε πώς θα
            <span className="block font-serif italic !font-normal">αναβαθμιστείτε.</span>
          </Title>
        </div>
        <Pill>Θέλω εκπαίδευση</Pill>
      </div>
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <div>
          <GroupLabel title="Σε τμήματα" sub="Ανοιχτά μαθήματα & βιβλιοθήκη εκπαιδεύσεων" />
          <div className="grid gap-4 sm:grid-cols-2 lg:h-[calc(100%-3rem)]">
            <ServiceCard tone="light" icon={MonitorPlay} title="Live Εκπαίδευση" sub="(σε μικρά τμήματα)" text="Μικρά groups, σε δική μας αίθουσα ή livestream." cta="Επόμενα μαθήματα" />
            <ServiceCard tone="light" icon={CirclePlay} title="On Demand εκπαίδευση" text="Δείτε σε μαγνητοσκόπηση κρίσιμες εκπαιδεύσεις για τα σημαντικότερα εργαλεία AI." cta="Περισσότερα" />
          </div>
        </div>
        <div>
          <GroupLabel title="Εξατομικευμένη" sub="Στημένη αποκλειστικά για την ομάδα σας" />
          <div className="grid gap-4 sm:grid-cols-2 lg:h-[calc(100%-3rem)]">
            <ServiceCard tone="tan" icon={Building2} title="Εταιρικό AI Upgrade" text="Tailor-made εκπαίδευση, στημένη πάνω στην εταιρεία σας." cta="Δείτε πώς γίνεται" />
            <ServiceCard tone="tan" icon={Zap} badge="Δημοφιλές" title="8ώρο AI Sprint" text="Δύο 4ωρα μέσα στην εταιρεία σας, εκπαίδευση στα εργαλεία που θα κάνουν τη διαφορά." cta="Κλείστε Sprint" />
          </div>
        </div>
      </div>
    </Section>
  );
}

export function LiveCourses() {
  return (
    <Section id="live" className="bg-secondary">
      <div className="max-w-[51.25rem]">
        <Eyebrow>Live Upgrades</Eyebrow>
        <Title>Τα επόμενα <span className="font-serif italic font-normal!">live<br className="hidden lg:block" /> μαθήματα.</span></Title>
        <p className="mt-4 text-lg text-muted-foreground">Μικρά groups, σε αίθουσα ή livestream. Κάθε μάθημα έχει τη δική του σελίδα με αναλυτική ύλη, κράτηση θέσης και πληρωμή.</p>
      </div>
      <div className="mt-10 rounded-[20px] border border-border bg-card">
        <div className="live-course-grid hidden border-b border-border px-6 py-4 font-mono text-[11px] uppercase text-muted-foreground lg:grid">
          <span>ΜΑΘΗΜΑ</span><span>ΗΜΕΡΟΜΗΝΙΑ</span><span>ΩΡΕΣ</span><span>ΤΡΟΠΟΣ</span><span>ΤΙΜΗ</span>
        </div>
        {courses.map((c, i) => {
          const done = c.status === "done";
          return (
            <div key={i} className={`live-course-grid grid items-center gap-5 p-6 ${i > 0 ? "border-t border-border" : ""} ${done ? "opacity-55" : ""}`}>
              <div>
                <h3 className="font-display text-2xl">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.tools}</p>
              </div>
              <p className="flex items-start gap-2 text-sm font-semibold"><Calendar aria-hidden className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />{c.date}</p>
              <p className="flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground"><Clock aria-hidden className="h-4 w-4 shrink-0" strokeWidth={1.5} />{c.time}</p>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground lg:flex-col lg:gap-2">
                {c.modes.map((m) => {
                  const ModeIcon = m === "On site" ? MapPin : Monitor;
                  return <span key={m} className="inline-flex items-center gap-2 whitespace-nowrap"><ModeIcon aria-hidden className="h-4 w-4" strokeWidth={1.5} />{m}</span>;
                })}
              </div>
              {done ? (
                <span className="justify-self-start rounded-full border border-live-completed px-3 py-1.5 text-xs font-medium text-muted-foreground">Ολοκληρώθηκε</span>
              ) : (
                <div className="flex flex-wrap items-center gap-4 lg:flex-col lg:items-start">
                  <div>
                    <p className="font-display text-2xl">{c.price}</p>
                  </div>
                  <span className="relative mt-2 inline-flex">
                    <Pill className="whitespace-nowrap px-4">Κράτηση θέσης</Pill>
                    <span className="absolute -right-2 -top-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">Λίγες θέσεις</span>
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {[
          { text: "Θέλω εξατομικευμένη εταιρική εκπαίδευση", icon: UserRound },
          { text: "Θέλω ένα 8ωρο Sprint μέσα στην εταιρεία μου", icon: Zap },
          { text: "Θέλω να δω μαγνητοσκοπημένες εκπαιδεύσεις", icon: MonitorPlay },
        ].map(({ text, icon: Icon }) => (
          <div key={text} className="relative min-w-0">
            <Pill variant="outline" className="h-full w-full gap-3 rounded-[14px] p-3 text-left font-medium">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-tan"><Icon aria-hidden className="h-5 w-5" strokeWidth={1.5} /></span>
              <span className="min-w-0 flex-1">{text}</span>
            </Pill>
            <span tabIndex={0} role="img" aria-label={text} title={text} className="absolute -right-1.5 -top-1.5 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-card bg-primary text-live-info-foreground">
              <Info aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
