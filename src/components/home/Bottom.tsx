import { useCallback, useEffect, useRef, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cases, faqs, team, toolFilters, tools } from "./data";
import { Eyebrow, Pill, Section, Title } from "./ui";

export function Cases() {
  const ref = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ left: 0, width: 100 });
  const update = useCallback(() => {
    const el = ref.current;
    if (!el || !el.scrollWidth) return;
    setBar({ left: (el.scrollLeft / el.scrollWidth) * 100, width: (el.clientWidth / el.scrollWidth) * 100 });
  }, []);
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);
  const go = (dir: 1 | -1) => {
    const el = ref.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: "smooth" });
  };
  return (
    <Section id="cases" className="bg-ink text-ink-foreground py-[clamp(80px,10vw,140px)]">
      <div className="flex flex-wrap gap-[clamp(36px,5vw,72px)]">
        <div className="grid max-w-[400px] flex-[1_1_300px] content-start gap-5">
          <Eyebrow className="text-ink-foreground/80">Release notes</Eyebrow>
          <h2 className="text-[clamp(36px,4.6vw,64px)] font-light leading-[1.04] tracking-[-0.035em]">Τι κάναμε <span className="font-serif font-light! italic">για πελάτες μας.</span></h2>
          <p className="text-[17px] text-ink-foreground/78">Τι άλλαξε μετά την αναβάθμιση.</p>
        </div>
        <div className="min-w-0 flex-[2_1_520px]">
          <div className="mb-5 flex justify-end gap-2">
            {([-1, 1] as const).map((d) => (
              <button key={d} type="button" aria-label={d < 0 ? "Προηγούμενο" : "Επόμενο"} onClick={() => go(d)} className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-ink-foreground/10 text-ink-foreground transition-colors hover:bg-ink-foreground/20">
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} /></svg>
              </button>
            ))}
          </div>
          <div ref={ref} onScroll={update} className="cases-track flex gap-4 overflow-x-auto">
            {cases.map((c) => (
              <article key={c.name} className="flex flex-[0_0_min(500px,84vw)] snap-start flex-col overflow-hidden rounded-[22px] bg-card text-foreground">
                <div className="relative flex h-[150px] flex-col justify-between px-[26px] py-[22px] text-white" style={{ background: c.gradient }}>
                  <div aria-hidden="true" className="absolute inset-0" style={{ opacity: 0.35, mixBlendMode: "overlay", backgroundImage: "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E)" }} />
                  <span className="cases-badge relative self-start rounded-[8px] px-2.5 py-[5px] font-mono text-[10px] tracking-[0.08em]">{c.release}</span>
                  <div className="relative">
                    <h3 className="text-[26px] leading-tight">{c.name}</h3>
                    <p className="text-xs opacity-85">{c.sector}</p>
                  </div>
                </div>
                <div className="px-[26px] pt-[26px] pb-[22px]">
                  <p className="text-[15px] text-muted-foreground">{c.label}</p>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-[clamp(56px,6vw,84px)] font-light leading-none tracking-[-0.05em]">{c.hero}</span>
                    <span className="rounded-full bg-accent px-[9px] py-[3px] text-xs font-medium text-accent-foreground">{c.heroBadge}</span>
                  </div>
                </div>
                <div className="flex-1 bg-cases-metrics px-[26px] pt-1 pb-[18px]">
                  {c.rows.map(([l, sub, v]) => (
                    <div key={l} className="flex items-center justify-between gap-4 border-b border-cases-line py-4">
                      <span><span className="block text-[15px]">{l}</span><span className="block text-xs text-live-subtitle">{sub}</span></span>
                      <span className="text-right text-[28px] font-light">{v}</span>
                    </div>
                  ))}
                  <p className="mt-4 font-mono text-[10px] tracking-[0.08em] text-cases-note">ΕΝΔΕΙΚΤΙΚΕΣ ΤΙΜΕΣ · PLACEHOLDER</p>
                </div>
              </article>
            ))}
          </div>
          <div className="relative mt-[26px] h-0.5 rounded-[1px] bg-ink-foreground/14">
            <span className="absolute top-0 h-full rounded-[1px] bg-ink-foreground" style={{ left: `${bar.left}%`, width: `${bar.width}%` }} />
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Tools() {
  const [filter, setFilter] = useState("Όλα");
  const shown = tools.filter((t) => filter === "Όλα" || t.filters.includes(filter));
  return (
    <Section id="tools" className="pt-[clamp(80px,10vw,140px)] pb-[clamp(40px,5vw,64px)]">
      <Title className="max-w-3xl">Χτίζουμε και Custom Εργαλεία: <span className="italic text-muted-foreground">σχεδιασμένα για κλάδους ή αποκλειστικά για τη δική σας εταιρεία.</span></Title>
      <p className="mt-4 text-muted-foreground">Πραγματικά συστήματα AI, σε πραγματικές ελληνικές εταιρείες.</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {toolFilters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-card hover:bg-card/70"}`}>{f}</button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {shown.length === 0 && <p className="text-muted-foreground">Σύντομα νέα εργαλεία σε αυτή την κατηγορία.</p>}
        {shown.map((t) => (
          <div key={t.name} className="rounded-[14px] border border-border bg-card p-7">
            <div className="flex gap-2">{t.tags.map((g) => <span key={g} className="rounded-full bg-secondary px-3 py-1 text-xs">{g}</span>)}</div>
            <h3 className="mt-5 font-display text-2xl">{t.name}</h3>
            <p className="mt-1 text-muted-foreground">{t.text}</p>
            <div className="mt-6 flex justify-between rounded-2xl bg-ink p-4 text-sm text-ink-foreground">
              <span>{t.preview[0]}</span><span className="text-success">{t.preview[1]}</span>
            </div>
            <Pill variant="outline" className="mt-6">Δείτε πώς δουλεύει</Pill>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Why() {
  const bubbles = [
    { label: "Online μαθήματα & academies των AI εταιρειών", x: 22, y: 26, s: 110, cls: "bg-muted-foreground/25" },
    { label: "Κλασικά σεμινάρια", x: 22, y: 72, s: 80, cls: "bg-muted-foreground/25" },
    { label: "Μεγάλες συμβουλευτικές", x: 78, y: 75, s: 130, cls: "bg-muted-foreground/25" },
    { label: "The Upgraders", x: 78, y: 22, s: 90, cls: "bg-accent text-accent-foreground" },
  ];
  return (
    <Section id="why" className="pt-[clamp(40px,5vw,64px)] pb-[clamp(80px,10vw,140px)]">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>Γιατί The Upgraders</Eyebrow>
          <Title>Είναι σεμινάριο; Είναι consulting; <span className="italic text-accent">Είναι Αναβάθμιση.</span></Title>
          <p className="mt-6 text-muted-foreground">Τα σεμινάρια δεν αλλάζουν τη δουλειά. Οι σύμβουλοι δεν χτίζουν. Εμείς εκπαιδεύουμε τους ανθρώπους και χτίζουμε τα συστήματα, γρήγορα και εξατομικευμένα, όπως κάναμε στις δικές μας εταιρείες.</p>
        </div>
        <div className="relative aspect-square rounded-[14px] border border-border bg-card">
          <div className="absolute inset-y-6 left-1/2 border-l border-dashed border-border" />
          <div className="absolute inset-x-6 top-1/2 border-t border-dashed border-border" />
          <span className="absolute left-3 top-3 text-xs text-muted-foreground">Γρήγορα</span>
          <span className="absolute bottom-3 left-3 text-xs text-muted-foreground">Αργά</span>
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">Γενικό → Ειδικά για εσάς · Προσαρμογή</span>
          {bubbles.map((b) => (
            <div key={b.label} className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full p-2 text-center text-[11px] font-semibold leading-tight ${b.cls}`} style={{ left: `${b.x}%`, top: `${b.y}%`, width: b.s, height: b.s }}>
              {b.label}
            </div>
          ))}
          <span className="absolute right-3 top-3 text-[10px] text-muted-foreground">Μέγεθος κύκλου = επένδυση</span>
        </div>
      </div>
    </Section>
  );
}

export function Team() {
  return (
    <Section id="team" className="pt-0 pb-[clamp(80px,10vw,140px)]">
      <Eyebrow>Γνωρίστε την ομάδα</Eyebrow>
      <Title>Builders, Makers, Entrepreneurs, Trainers</Title>
      <p className="mt-4 text-muted-foreground">Πρώτα το κάναμε για τις εταιρείες μας. Τώρα, το κάνουμε και για τις δικές σας.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {team.map((m) => (
          <div key={m.name} className="overflow-hidden rounded-[14px] bg-card">
            <div className="hero-gradient flex aspect-[4/5] items-end p-6">
              <span className="font-display text-6xl text-ink-foreground/80">{m.name.split(" ").map((w) => w[0]).join("")}</span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl">{m.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center font-display text-2xl">Φτιαγμένο με AI, <span className="italic text-muted-foreground">και 15 χρόνια εμπειρίας σε product, business, copywriting, design και coding.</span></p>
    </Section>
  );
}

export function Faq() {
  return (
    <Section id="faq" className="pt-0 pb-[clamp(80px,10vw,140px)]">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <Eyebrow>The Upgraders</Eyebrow>
          <Title>Ερωτήσεις, απαντημένες.</Title>
        </div>
        <Accordion type="single" collapsible defaultValue="q0">
          {faqs.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`}>
              <AccordionTrigger className="text-left text-lg font-semibold">{q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

export function Footer() {
  const cols = {
    "ΥΠΗΡΕΣΙΕΣ": ["Εταιρικό AI Upgrade", "8ώρο AI Sprint", "Live Εκπαίδευση", "Custom AI εργαλεία"],
    "ΕΤΑΙΡΕΙΑ": ["Η ομάδα", "Case Studies", "Συχνές ερωτήσεις", "Επικοινωνία"],
    "ΝΟΜΙΚΑ": ["Όροι χρήσης", "Πολιτική απορρήτου", "Πολιτική cookies"],
  };
  return (
    <footer id="contact" className="bg-ink px-5 pb-10 pt-20 text-ink-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl md:text-5xl">Έτοιμοι για αναβάθμιση;</h2>
          <Pill variant="light" href="mailto:hello@theupgraders.gr">Θέλω εκπαίδευση</Pill>
        </div>
        <div className="mt-16 grid gap-10 sm:grid-cols-4">
          <div className="flex gap-4 text-sm text-ink-muted">{["IG", "TT", "f", "YT"].map((s) => <a key={s} href="#" className="hover:text-ink-foreground">{s}</a>)}</div>
          {Object.entries(cols).map(([h, items]) => (
            <div key={h}>
              <p className="text-xs font-semibold font-mono tracking-[0.08em] text-ink-muted">{h}</p>
              <ul className="mt-4 space-y-2 text-sm">{items.map((i) => <li key={i}><a href="#" className="hover:text-accent">{i}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <p className="mt-20 font-display text-[18vw] leading-none text-ink-foreground/10 md:text-[11rem]">The Upgraders</p>
        <div className="mt-6 flex flex-wrap justify-between gap-4 text-xs text-ink-muted">
          <span>© 2026 THE UPGRADERS. ΜΕ ΕΠΙΦΥΛΑΞΗ ΠΑΝΤΟΣ ΔΙΚΑΙΩΜΑΤΟΣ.</span>
          <span>Made with &lt;3 by Humble &amp; Advisable.</span>
        </div>
      </div>
    </footer>
  );
}
