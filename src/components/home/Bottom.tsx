import { useCallback, useEffect, useRef, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cases, faqs, team, tools, type ToolTag } from "./data";
import { Eyebrow, Pill, Section, Title } from "./ui";

export function Cases() {
  const { ref, bar, update, go } = useCarousel(16);
  return (
    <Section id="cases" className="bg-ink text-ink-foreground py-[clamp(80px,10vw,140px)]">
      <div className="flex flex-wrap gap-[clamp(36px,5vw,72px)]">
        <div className="grid max-w-[400px] flex-[1_1_300px] content-start gap-5">
          <Eyebrow className="text-ink-foreground/80">Release notes</Eyebrow>
          <h2 className="text-[clamp(36px,4.6vw,64px)] font-light leading-[1.04] tracking-[-0.035em]">Τι κάναμε <span className="font-serif font-light! italic">για πελάτες μας.</span></h2>
          <p className="text-[17px] text-ink-foreground/78">Τι άλλαξε μετά την αναβάθμιση.</p>
        </div>
        <div className="min-w-0 flex-[2_1_520px]">
          <div className="mb-5 flex justify-end"><CarouselNav go={go} /></div>
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
          <ProgressBar bar={bar} />
        </div>
      </div>
    </Section>
  );
}

const toolStyles: Record<ToolTag, { bg: string; icon: string[] }> = {
  Πωλήσεις: { bg: "radial-gradient(120% 80% at 85% 0%, #9886C9 0%, transparent 60%), linear-gradient(160deg,#5E4E95 0%,#3B3170 58%,#8A6FA6 100%)", icon: ["M3 17l6-6 4 4 8-8", "M15 7h6v6"] },
  Εξυπηρέτηση: { bg: "radial-gradient(100% 70% at 15% 0%, #7E5DA2 0%, transparent 60%), linear-gradient(170deg,#3D2757 0%,#24183A 60%,#6B4C80 100%)", icon: ["M4 5h16v11H9l-5 4z"] },
  Λειτουργίες: { bg: "radial-gradient(110% 80% at 85% 10%, #93A884 0%, transparent 60%), linear-gradient(165deg,#4F6A55 0%,#2C4236 60%,#6F8A6A 100%)", icon: ["M4 4h7v7H4z", "M13 4h7v7h-7z", "M4 13h7v7H4z", "M13 13h7v7h-7z"] },
  Περιεχόμενο: { bg: "radial-gradient(110% 80% at 15% 5%, #D3A0A8 0%, transparent 60%), linear-gradient(165deg,#A4677A 0%,#6E3F57 60%,#B88593 100%)", icon: ["M4 20l4-1 11-11-3-3L5 16z"] },
  Κλαδικά: { bg: "radial-gradient(110% 80% at 80% 0%, #B49A86 0%, transparent 60%), linear-gradient(165deg,#5E5470 0%,#3A3346 60%,#8A7466 100%)", icon: ["M3 8h18v12H3z", "M9 8V5h6v3"] },
};
const filterTag: Record<string, ToolTag | null> = { "Όλα": null, "Πωλήσεις": "Πωλήσεις", "Εξυπηρέτηση": "Εξυπηρέτηση", "Λειτουργίες": "Λειτουργίες", "Περιεχόμενο & Marketing": "Περιεχόμενο", "Κλαδικά": "Κλαδικά" };
const chipAlign = [["self-start", "self-end"], ["self-end", "self-start"], ["self-center", "self-end"]] as const;

export function Tools() {
  const [filter, setFilter] = useState("Όλα");
  const { ref, bar, update, go } = useCarousel(14);
  const tag = filterTag[filter] ?? null;
  const shown = tools.filter((t) => !tag || t.tag === tag);
  useEffect(() => {
    if (ref.current) ref.current.scrollLeft = 0;
    update();
  }, [filter, ref, update]);
  return (
    <Section id="tools" className="pt-[clamp(80px,10vw,140px)] pb-[clamp(40px,5vw,64px)]">
      <div className="flex flex-wrap items-end justify-between gap-7">
        <div className="max-w-[900px] flex-[1_1_500px]">
          <h2 className="text-[clamp(30px,3.8vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em]">Χτίζουμε και Custom Εργαλεία<span className="font-serif font-semibold! italic">: σχεδιασμένα για κλάδους ή αποκλειστικά για τη δική σας εταιρεία.</span></h2>
          <p className="mt-4 text-lg text-muted-foreground">Πραγματικά συστήματα AI, σε πραγματικές ελληνικές εταιρείες.</p>
        </div>
        <CarouselNav go={go} light />
      </div>
      <div className="no-scrollbar mt-9 flex gap-2 overflow-x-auto">
        {Object.keys(filterTag).map((f) => (
          <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f}
            className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm ${filter === f ? "border-foreground bg-foreground text-background" : "border-foreground/20 bg-transparent text-foreground"}`}>{f}</button>
        ))}
      </div>
      <div ref={ref} onScroll={update} className="cases-track mt-6 flex gap-[14px] overflow-x-auto">
        {shown.map((t, i) => {
          const st = toolStyles[t.tag];
          const al = chipAlign[i % 3]!;
          return (
            <article key={t.name} className="relative h-[430px] flex-[0_0_min(420px,84vw)] snap-start overflow-hidden rounded-[22px] p-6 text-white" style={{ background: st.bg }}>
              <div aria-hidden="true" className="absolute inset-0" style={{ opacity: 0.4, mixBlendMode: "overlay", backgroundImage: "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E)" }} />
              <div className="relative flex items-start gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tool-glass inline-flex items-center gap-1.5 rounded-[8px] px-2.5 py-[5px] text-xs">
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{st.icon.map((d) => <path key={d} d={d} />)}</svg>
                    {t.tag}
                  </span>
                  <span className="text-xs opacity-90">{t.meta}</span>
                </div>
                <img src="/icon.png" alt="" aria-hidden="true" className="ml-auto h-[38px] w-[38px] shrink-0 rounded-[10px] object-cover shadow-lg" />
              </div>
              <h3 className="relative mt-6 max-w-[340px] text-[27px] font-normal leading-tight">{t.name}</h3>
              <p className="relative mt-2 max-w-[320px] text-sm opacity-88">{t.text}</p>
              <div className="absolute right-6 bottom-[84px] left-6 flex flex-col gap-[10px]">
                <span className={`tool-chip ${al[0]} flex items-center gap-2 rounded-[12px] px-3.5 py-[11px] text-sm`}><span className="h-2 w-2 shrink-0 rounded-full bg-accent" />{t.chip1}</span>
                <span className={`tool-chip ${al[1]} rounded-[12px] px-3.5 py-[11px] text-sm`}>{t.chip2}</span>
              </div>
              <a href="#contact" className="tool-cta absolute bottom-6 left-6 rounded-[10px] bg-background px-4 py-[11px] text-sm font-medium text-foreground">Δείτε πώς δουλεύει</a>
            </article>
          );
        })}
      </div>
      <ProgressBar bar={bar} light />
    </Section>
  );
}

function useCarousel(gap: number) {
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
  const go = useCallback((dir: 1 | -1) => {
    const el = ref.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  }, [gap]);
  return { ref, bar, update, go };
}

function CarouselNav({ go, light }: { go: (d: 1 | -1) => void; light?: boolean }) {
  return (
    <div className="flex gap-2">
      {([-1, 1] as const).map((d) => (
        <button key={d} type="button" aria-label={d < 0 ? "Προηγούμενο" : "Επόμενο"} onClick={() => go(d)}
          className={`flex h-10 w-10 items-center justify-center rounded-[10px] transition-colors ${light ? "bg-foreground/[0.07] text-foreground hover:bg-foreground/[0.14]" : "bg-ink-foreground/10 text-ink-foreground hover:bg-ink-foreground/20"}`}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} /></svg>
        </button>
      ))}
    </div>
  );
}

function ProgressBar({ bar, light }: { bar: { left: number; width: number }; light?: boolean }) {
  return (
    <div className={`relative mt-[26px] h-0.5 rounded-[1px] ${light ? "bg-foreground/12" : "bg-ink-foreground/14"}`}>
      <span className={`absolute top-0 h-full rounded-[1px] ${light ? "bg-foreground" : "bg-ink-foreground"}`} style={{ left: `${bar.left}%`, width: `${bar.width}%` }} />
    </div>
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
