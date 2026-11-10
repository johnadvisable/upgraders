import { useEffect, useRef, useState, type ReactNode } from "react";
import { industries, roles, steps } from "./data";
import { Slider } from "./Slider";
import { Reveal } from "./Reveal";
import { Eyebrow, Pill, Section, Title } from "./ui";

const listImages = {
  roles: { src: "/roles-team.webp", alt: "Χαμογελαστή ελληνική ομάδα γραφείου" },
  industries: { src: "/industries-photo.webp", alt: "Λιμάνι με πλοίο" },
};

function List({ eyebrow, title, items, id, reverse }: { eyebrow: string; title: ReactNode; items: string[][]; id: "roles" | "industries"; reverse?: boolean }) {
  const img = listImages[id];
  return (
    <Section id={id} className="py-[28px] min-[760px]:py-[clamp(56px,7vw,104px)]">
      <Reveal><Eyebrow>{eyebrow}</Eyebrow>
      <Title className="text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.06]">{title}</Title></Reveal>
      <div className={`mt-[clamp(32px,4vw,56px)] flex flex-wrap items-start gap-[clamp(24px,3vw,44px)] ${reverse ? "flex-row-reverse" : ""}`}>
        <Reveal className="relative max-w-full flex-[1_1_300px] min-[760px]:sticky min-[760px]:top-[100px] min-[760px]:max-w-[440px] min-[760px]:self-start"><img src={img.src} alt={img.alt} loading="lazy" className="block h-[240px] w-full rounded-[20px] object-cover min-[760px]:h-auto" /></Reveal>
        <Reveal className="relative -mx-5 min-w-0 flex-[2_1_480px] min-[760px]:mx-0 min-[760px]:pl-[26px]">
          <span aria-hidden="true" className="absolute top-[30px] bottom-[30px] left-1 hidden border-l border-role-line min-[760px]:block" />
          <Slider sliderClassName="list-slider grid gap-[10px]">
            {items.map(([name, text]) => (
              <article key={name} className="relative flex flex-wrap content-start items-baseline gap-x-7 gap-y-1.5 rounded-[14px] bg-secondary px-[22px] py-[18px]">
                <span aria-hidden="true" className="absolute top-[26px] -left-[26px] hidden h-[9px] w-[9px] rounded-full border-2 border-background bg-role-card-dot min-[760px]:block" />
                <h3 className="flex-[0_1_240px] text-lg font-semibold tracking-[-0.01em]">{name}</h3>
                <p className="flex-[1_1_280px] text-[15px] leading-normal text-muted-foreground">{text}</p>
              </article>
            ))}
          </Slider>
        </Reveal>
      </div>
    </Section>
  );
}

export const Roles = () => <List id="roles" eyebrow="Ανά ρόλο" title={<>Εκπαίδευση ανά <span className="italic !font-normal">θέση εργασίας.</span></>} items={roles} />;
export const Industries = () => <List id="industries" reverse eyebrow="Ανά κλάδο" title={<>Εκπαίδευση ανά <span className="italic !font-normal">κλάδο δραστηριότητας.</span></>} items={industries} />;

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setSeen(true), { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

export function Paradox() {
  const [ref, seen] = useInView<HTMLDivElement>();
  const bars = [
    { label: "ΕΛΛΑΔΑ 8,9%", v: 8.9, fill: "bg-accent", transition: "width 1.6s cubic-bezier(.2,.7,.2,1) .2s" },
    { label: "ΕΕ 20%", v: 20, fill: "bg-ink-foreground", transition: "width 1.8s cubic-bezier(.2,.7,.2,1) .35s" },
  ];
  return (
    <section className="relative overflow-hidden bg-ink px-5 py-[clamp(44px,5vw,72px)] text-center text-ink-foreground">
      <div aria-hidden="true" className="paradox-glow absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-0" style={{ opacity: 0.18, mixBlendMode: "overlay", backgroundImage: "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E)" }} />
      <Reveal className="relative mx-auto max-w-[1040px]"><div ref={ref}>
        <Eyebrow className="flex justify-center text-ink-foreground/80">Το ελληνικό παράδοξο</Eyebrow>
        <h2 className="mt-3 text-[clamp(24px,2.6vw,36px)] font-light leading-[1.15] tracking-[-0.035em]">
          Οι Έλληνες χρησιμοποιούν AI.<br />
          <span className="font-serif font-light! italic">Οι ελληνικές εταιρείες όχι.</span>
        </h2>
        <p className="mx-auto mt-[14px] max-w-[720px] text-[clamp(15px,1.2vw,17px)] leading-normal text-ink-foreground/85">
          <span className="text-[1.5em] font-medium tracking-[-0.03em] text-accent">8,9%</span> των ελληνικών επιχειρήσεων χρησιμοποιεί AI.<br />
          Ο μέσος όρος στην Ευρώπη είναι <span className="text-[1.5em] font-medium tracking-[-0.03em] text-ink-foreground">20%</span>.
        </p>
        <div className="mx-auto mt-6 grid max-w-[760px] gap-3 text-left font-mono text-[11px] tracking-[0.08em]">
          {bars.map((b) => (
            <div key={b.label} className="grid grid-cols-[104px_1fr] items-center gap-4">
              <span>{b.label}</span>
              <div className="h-4 overflow-hidden rounded-[8px] bg-ink-foreground/10">
                <div className={`h-full rounded-[8px] ${b.fill}`} style={{ width: seen ? `${(b.v / 25) * 100}%` : "0%", transition: b.transition }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] font-semibold text-ink-foreground/75">Πηγή: Eurostat, 2025</p>
      </div></Reveal>
    </section>
  );
}


const svgBase = { width: 30, height: 30, viewBox: "0 0 24 24", fill: "none", stroke: "var(--foreground)", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

function EnableText({ icon, eyebrow, lead, accent, text, bullets, link, href }: { icon: string[]; eyebrow: string; lead: string; accent: string; text: string; bullets: string[]; link: string; href: string }) {
  return (
    <Reveal className="flex max-w-[540px] flex-[1_1_min(100%,360px)] flex-col gap-5">
      <svg {...svgBase}>{icon.map((d) => <path key={d} d={d} />)}</svg>
      <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">{eyebrow}</p>
      <h2 className="text-[clamp(36px,4.4vw,60px)] font-light leading-[1.04] tracking-[-0.035em]">{lead}<span className="font-serif font-normal! italic">{accent}</span></h2>
      <p className="text-lg leading-[1.55] text-muted-foreground">{text}</p>
      <ul className="grid gap-[10px] text-base">
        {bullets.map((b) => <li key={b} className="flex items-center gap-3"><span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-foreground" />{b}</li>)}
      </ul>
      <a href={href} className="inline-flex items-center gap-2 self-start text-base font-medium">
        {link}
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </a>
    </Reveal>
  );
}

export function Enablement() {
  const systems = [["ERP", "SoftOne ERP", "Συγχρονίστηκε πριν 2'"], ["CRM", "HubSpot CRM", "Συγχρονίστηκε πριν 1'"], ["DOC", "SharePoint · Έγγραφα", "12.480 αρχεία"], ["MAIL", "Outlook", "Εισερχόμενα πωλήσεων"]];
  const feed = [["Προσφορά #2381 · έτοιμη για έγκριση", "2'"], ["Τιμολόγιο ↔ Δελτίο · ταιριάζει", "6'"], ["Email πελάτη · απαντήθηκε", "9'"]];
  const bars = [30, 42, 38, 55, 61, 58, 72, 80, 77, 92];
  return (
    <Section id="programs" className="pt-[clamp(40px,5vw,72px)] pb-[clamp(72px,9vw,120px)]">
      <div className="flex flex-wrap items-center gap-[clamp(36px,5vw,88px)]">
        <EnableText
          icon={["M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M2 21c0-4 3-6.5 7-6.5s7 2.5 7 6.5", "M16 3.6a4 4 0 0 1 0 7.3", "M18 14.8c2.4.6 4 2.6 4 6.2"]}
          eyebrow="Team enablement" lead="Αναβαθμίζουμε " accent="τους ανθρώπους."
          text="Εκπαιδεύουμε την ομάδα σας να χρησιμοποιεί AI στη δουλειά που ήδη κάνει: έρευνα, επικοινωνία, ανάλυση, αποφάσεις, καθημερινές ροές."
          bullets={["Hands-on εκπαίδευση ανά ρόλο", "Πάνω στην πραγματική δουλειά της ομάδας", "Από τη βασική χρήση σε επαναλαμβανόμενες ροές"]}
          link="Δείτε τα προγράμματα" href="#services"
        />
        <Reveal className="min-w-0 flex-[1.3_1_min(100%,460px)]"><img src="https://images.pexels.com/photos/3184327/pexels-photo-3184327.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Ελληνική ομάδα σε workshop γύρω από τραπέζι με laptops" loading="lazy" className="block h-[240px] w-full rounded-[22px] object-cover min-[760px]:h-[clamp(320px,38vw,520px)]" /></Reveal>
      </div>
      <div className="mt-[clamp(56px,7vw,104px)] flex flex-row-reverse flex-wrap items-center gap-[clamp(36px,5vw,88px)]">
        <EnableText
          icon={["M3 4h18v6H3z", "M3 14h18v6H3z", "M7 7h.01", "M7 17h.01", "M11 7h6", "M11 17h6"]}
          eyebrow="Production systems" lead="Αναβαθμίζουμε " accent="τα συστήματα."
          text="Συνδέουμε τα δεδομένα, τα έγγραφα και το λογισμικό σας και στήνουμε συστήματα AI γύρω από τις ροές που αξίζει να αλλάξουν."
          bullets={["Πάνω στα συστήματα που ήδη έχετε", "Συνδεδεμένα με πραγματικά δεδομένα", "Σε λειτουργία, με παρακολούθηση και συνεχή βελτίωση"]}
          link="Δείτε τι έχουμε χτίσει" href="#tools"
        />
        <Reveal className="ops-frame relative min-w-0 flex-[1.3_1_min(100%,460px)] overflow-hidden rounded-[22px] p-[clamp(18px,3vw,40px)]">
          <div aria-hidden="true" className="absolute inset-0" style={{ opacity: 0.3, mixBlendMode: "overlay", backgroundImage: "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E)" }} />
          <div className="ops-card relative overflow-hidden rounded-[14px] bg-card">
            <div className="flex items-center gap-3 border-b border-ops-line px-4 py-3">
              <span className="flex gap-1.5">{[0, 1, 2].map((d) => <span key={d} className="h-[9px] w-[9px] rounded-full bg-ops-dot" />)}</span>
              <span className="flex-1 text-center font-mono text-[11px] text-muted-foreground">AI OPS · Ροή προσφορών B2B</span>
              <span className="flex items-center gap-1.5 font-mono text-[11px]"><span className="h-[7px] w-[7px] animate-pulse rounded-full bg-accent" />LIVE</span>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))]">
              <div className="border-r border-ops-line p-5">
                <p className="font-mono text-[10px] tracking-[0.08em] text-muted-foreground">ΣΥΝΔΕΔΕΜΕΝΑ ΣΥΣΤΗΜΑΤΑ</p>
                <div className="mt-3 grid gap-3">
                  {systems.map(([k, n, sub]) => (
                    <div key={k} className="flex items-center gap-3">
                      <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-ops-chip font-mono text-[10px] font-semibold">{k}</span>
                      <span className="min-w-0 flex-1"><span className="block text-sm">{n}</span><span className="block text-xs text-live-subtitle">{sub}</span></span>
                      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--foreground)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l4 4 10-10" /></svg>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <p className="font-mono text-[10px] tracking-[0.08em] text-muted-foreground">ΩΡΕΣ ΠΟΥ ΕΞΟΙΚΟΝΟΜΗΘΗΚΑΝ · Q3</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[52px] font-light tracking-[-0.04em]">1.284</span>
                  <span className="rounded-full bg-accent px-2 py-[3px] text-xs font-medium text-accent-foreground">+18%</span>
                </div>
                <div aria-hidden="true" className="mt-2 flex h-16 items-end gap-1">
                  {bars.map((h, idx) => <span key={idx} className="flex-1 rounded-t-[3px] bg-foreground opacity-85" style={{ height: `${h}%` }} />)}
                </div>
                <div className="mt-3">
                  {feed.map(([t, m]) => (
                    <div key={t} className="flex justify-between gap-3 border-b border-live-row-divider py-[9px] text-[13px]"><span>{t}</span><span className="font-mono text-[11px] text-live-subtitle">{m}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

const methodOpps = [["Προσφορές B2B", "ΠΩΛΗΣΕΙΣ", 92], ["Απαντήσεις σε email πελατών", "ΕΞΥΠΗΡΕΤΗΣΗ", 84], ["Αντιστοίχιση τιμολογίων", "ΛΟΓΙΣΤΗΡΙΟ", 77], ["Εβδομαδιαία reports", "ΔΙΟΙΚΗΣΗ", 61], ["Onboarding νέων συνεργατών", "HR", 48]] as const;
const methodDots = [[80, 18, 16, "var(--accent)", "Προσφορές B2B"], [64, 30, 12, "var(--foreground)", "Email πελατών"], [86, 40, 11, "var(--foreground)", ""], [70, 44, 9, "var(--foreground)", "Τιμολόγια"], [28, 26, 10, "rgb(28 28 26 / .3)", ""], [58, 68, 9, "rgb(28 28 26 / .3)", ""], [20, 76, 8, "rgb(28 28 26 / .3)", ""], [38, 58, 10, "rgb(28 28 26 / .3)", ""]] as const;
const methodSources = [{ k: "ERP", n: "Τιμοκατάλογος" }, { k: "CRM", n: "Πελάτες & deals" }, { k: "EMAIL", n: "Ιστορικό" }, { k: "DOCS", n: "Όροι & πρότυπα" }];
const methodAdoption = [["ΜΑΪ", 22], ["ΙΟΥΝ", 35], ["ΙΟΥΛ", 48], ["ΑΥΓ", 57], ["ΣΕΠ", 71], ["ΟΚΤ", 86]] as const;
const mono = "font-mono tracking-[0.08em]";

function PanelHead({ children, right }: { children: ReactNode; right: ReactNode }) {
  return <div className="mb-[18px] flex items-center justify-between gap-3">{children}{right}</div>;
}

function MethodPanel({ step }: { step: number }) {
  if (step === 0)
    return (
      <>
        <PanelHead right={<span className={`${mono} text-[10px] text-muted-foreground`}>ΕΠΙΔΡΑΣΗ</span>}>
          <span className="flex items-center gap-2 text-base font-medium">Ευκαιρίες AI <span className="inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-[11px] bg-accent px-1.5 text-xs font-semibold text-accent-foreground">14</span></span>
        </PanelHead>
        {methodOpps.map(([n, d, v]) => (
          <div key={n} className="grid grid-cols-[minmax(0,1fr)_34%_34px] items-center gap-[14px] border-t border-live-header-divider py-[13px]">
            <span className="min-w-0"><span className="block text-[15px]">{n}</span><span className={`${mono} block text-[10px] text-live-subtitle`}>{d}</span></span>
            <span className="h-1.5 rounded-[3px] bg-live-header-divider"><span className="block h-full rounded-[3px] bg-foreground" style={{ width: `${v}%` }} /></span>
            <span className="text-right font-mono text-[13px]">{v}</span>
          </div>
        ))}
      </>
    );
  if (step === 1)
    return (
      <>
        <PanelHead right={<span className={`${mono} text-[10px] text-muted-foreground`}>14 ΕΥΚΑΙΡΙΕΣ</span>}><span className="text-base font-medium">Επίδραση × Εφικτότητα</span></PanelHead>
        <div className="relative ml-[22px]">
          <span className={`${mono} absolute top-1/2 -left-[22px] -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[10px] text-muted-foreground`}>ΕΠΙΔΡΑΣΗ →</span>
          <div className="relative aspect-[1.55] border-b-[1.5px] border-l-[1.5px] border-foreground">
            <span className="absolute top-0 bottom-1/2 left-0 right-1/2 bg-foreground/[0.035]" />
            <span className="absolute top-0 bottom-0 left-1/2 border-l border-dashed border-foreground/20" />
            <span className="absolute top-1/2 left-0 right-0 border-t border-dashed border-foreground/20" />
            <span className={`${mono} absolute top-2 right-2 text-[10px]`}>ΧΤΙΖΕΤΑΙ ΠΡΩΤΟ</span>
            {methodDots.map(([x, y, sz, c, l], idx) => (
              <span key={idx} className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5" style={{ left: `${x}%`, top: `${y}%` }}>
                <span className="block rounded-full" style={{ width: sz, height: sz, background: c }} />
                {l && <span className="absolute left-full ml-1.5 whitespace-nowrap rounded-md bg-card px-1.5 py-0.5 text-[11px] shadow-sm">{l}</span>}
              </span>
            ))}
          </div>
          <p className={`${mono} mt-2 text-center text-[10px] text-muted-foreground`}>ΕΦΙΚΤΟΤΗΤΑ →</p>
        </div>
      </>
    );
  if (step === 2)
    return (
      <>
        <PanelHead right={<span className={`${mono} inline-flex items-center gap-1.5 rounded-full bg-ops-chip px-2.5 py-1 text-[11px]`}><span className="h-[7px] w-[7px] animate-pulse rounded-full bg-accent" />LIVE</span>}>
          <span className="text-base font-medium">Ροή: Προσφορές B2B</span>
        </PanelHead>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(40px,.8fr)_minmax(0,1.1fr)] items-center">
          <div className="grid min-w-0 gap-3">
            {methodSources.map((s) => (
              <div key={s.k} className="flex min-w-0 items-center gap-[10px] overflow-hidden rounded-[10px] border border-method-chip-border bg-method-chip px-3 py-[10px]">
                <span className="w-[38px] shrink-0 font-mono text-[10px] font-semibold">{s.k}</span>
                <span className="truncate text-xs text-muted-foreground">{s.n}</span>
              </div>
            ))}
          </div>
          <svg viewBox="0 0 100 200" preserveAspectRatio="none" className="h-[220px] w-full" aria-hidden="true">
            {[26, 75, 125, 174].map((y) => <path key={y} d={`M0 ${y} C50 ${y} 50 100 100 100`} fill="none" stroke="var(--foreground)" strokeWidth={1.2} strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />)}
          </svg>
          <div className="rounded-[16px] bg-ink p-5 text-ink-foreground">
            <img src="/icon.png" alt="" aria-hidden="true" className="h-[34px] w-[34px] rounded-[8px] object-cover" />
            <p className="mt-3 text-lg">AI Assistant</p>
            <p className="mt-1 text-xs text-ink-foreground/70">Συντάσσει προσφορές από CRM, τιμοκατάλογο ERP και ιστορικό email.</p>
          </div>
        </div>
        <div className={`${mono} mt-5 flex flex-wrap justify-between gap-2 border-t border-live-header-divider pt-4 text-[11px]`}>
          <span>ΔΟΚΙΜΕΣ: 248/250 ΠΕΡΙΠΤΩΣΕΙΣ ✓</span><span>ΣΕ ΠΑΡΑΓΩΓΗ ΑΠΟ 14/10</span>
        </div>
      </>
    );
  return (
    <>
      <PanelHead right={<span className="flex items-center gap-2"><span className="text-[46px] font-light leading-none">86%</span><span className="rounded-full bg-accent px-2 py-[3px] text-xs font-medium text-accent-foreground">+15</span></span>}>
        <span><span className="block text-base font-medium">Υιοθέτηση ομάδας</span><span className="block text-[13px] text-live-subtitle">Ενεργοί χρήστες / εβδομάδα</span></span>
      </PanelHead>
      <div className="mt-7 flex h-[210px] items-end gap-[clamp(8px,1.6vw,18px)] border-b-[1.5px] border-foreground">
        {methodAdoption.map(([m, v], idx) => (
          <div key={m} className="flex h-full flex-1 flex-col items-center justify-end">
            <span className="mb-1 font-mono text-[10px]">{v}%</span>
            <span className="block w-full rounded-t-[6px] bg-foreground" style={{ height: `${v}%`, opacity: 0.35 + idx * 0.13 }} />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-[clamp(8px,1.6vw,18px)]">
        {methodAdoption.map(([m]) => <span key={m} className={`${mono} flex-1 text-center text-[10px] text-muted-foreground`}>{m}</span>)}
      </div>
    </>
  );
}

export function Method() {
  const [active, setActive] = useState(0);
  const s = steps[active] ?? steps[0]!;
  return (
    <section id="method" className="mx-auto max-w-[1320px] px-[clamp(12px,3vw,48px)] pt-0 pb-[clamp(72px,9vw,128px)]">
      <div className="rounded-[28px] bg-method-bg px-[clamp(20px,5vw,72px)] py-[clamp(32px,5vw,72px)]">
        <Reveal><Eyebrow className="text-foreground">Μεθοδολογία</Eyebrow>
        <h2 className="mt-3 text-[clamp(36px,5vw,72px)] font-light leading-[1.04] tracking-[-0.035em]">Εφαρμόζουμε 4 βήματα.<br /><span className="font-serif font-normal! italic">Μετά, φέρνουμε αποτέλεσμα.</span></h2></Reveal>
        <div className="mt-[clamp(36px,5vw,64px)] flex flex-wrap items-center gap-[clamp(28px,4vw,64px)]">
          <div className="grid min-h-[300px] max-w-[480px] flex-[1_1_320px] content-start gap-[18px]">
            <p className={`${mono} text-xs text-muted-foreground`}>0{active + 1} / 04 · {s.key}</p>
            <h3 className="text-[clamp(30px,3.4vw,46px)] font-light leading-[1.08] tracking-[-0.03em]">{s.h}<span className="font-serif font-normal! italic">{s.hi}</span>{s.h2}</h3>
            <p className="text-[17px] leading-[1.55] text-muted-foreground">{s.text}</p>
            {s.bullets.length > 0 && (
              <ul className="grid gap-[10px] text-base">
                {s.bullets.map((b) => <li key={b} className="flex items-center gap-3"><span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-foreground" />{b}</li>)}
              </ul>
            )}
          </div>
          <div className="method-panel min-h-[380px] min-w-0 flex-[1.4_1_440px] rounded-[20px] bg-card p-[clamp(18px,2.4vw,30px)]">
            <MethodPanel step={active} />
          </div>
        </div>
        <div className="mt-[clamp(36px,4vw,56px)] flex flex-wrap justify-center gap-2" role="tablist" aria-label="Βήματα μεθοδολογίας">
          {steps.map((st, i) => (
            <button key={st.key} type="button" role="tab" aria-selected={i === active} onClick={() => setActive(i)}
              className={`${mono} rounded-full px-[18px] py-3 text-xs ${i === active ? "bg-foreground text-background" : "bg-background text-foreground"}`}>
              0{i + 1} {st.key}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
