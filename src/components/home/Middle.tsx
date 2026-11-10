import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { industries, opportunities, roles, steps } from "./data";
import { Slider } from "./Slider";
import { Eyebrow, Pill, Section, Title } from "./ui";

const listImages = {
  roles: { src: "/roles-team.webp", alt: "Χαμογελαστή ελληνική ομάδα γραφείου" },
  industries: { src: "/industries-photo.webp", alt: "Λιμάνι με πλοίο" },
};

function List({ eyebrow, title, items, id, reverse }: { eyebrow: string; title: string; items: string[][]; id: "roles" | "industries"; reverse?: boolean }) {
  const img = listImages[id];
  return (
    <Section id={id} className="py-[28px] min-[760px]:py-[clamp(56px,7vw,104px)]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Title>{title}</Title>
      <div className={`mt-[clamp(32px,4vw,56px)] flex flex-wrap items-start gap-[clamp(24px,3vw,44px)] ${reverse ? "flex-row-reverse" : ""}`}>
        <img src={img.src} alt={img.alt} loading="lazy" className="relative h-[240px] max-w-full flex-[1_1_300px] rounded-[20px] object-cover min-[760px]:sticky min-[760px]:top-[100px] min-[760px]:h-auto min-[760px]:max-w-[440px] min-[760px]:self-start" />
        <div className="relative -mx-5 min-w-0 flex-[2_1_480px] min-[760px]:mx-0 min-[760px]:pl-[26px]">
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
        </div>
      </div>
    </Section>
  );
}

export const Roles = () => <List id="roles" eyebrow="Ανά ρόλο" title="Εκπαίδευση ανά θέση εργασίας." items={roles} />;
export const Industries = () => <List id="industries" reverse eyebrow="Ανά κλάδο" title="Εκπαίδευση ανά κλάδο δραστηριότητας." items={industries} />;

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
      <div ref={ref} className="relative mx-auto max-w-[1040px]">
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
      </div>
    </section>
  );
}

function Checks({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-2">
      {items.map((i) => <li key={i} className="flex gap-3"><span className="text-accent">✓</span>{i}</li>)}
    </ul>
  );
}

const svgBase = { width: 30, height: 30, viewBox: "0 0 24 24", fill: "none", stroke: "var(--foreground)", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

function EnableText({ icon, eyebrow, lead, accent, text, bullets, link, href }: { icon: string[]; eyebrow: string; lead: string; accent: string; text: string; bullets: string[]; link: string; href: string }) {
  return (
    <div className="flex max-w-[540px] flex-[1_1_min(100%,360px)] flex-col gap-5">
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
    </div>
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
        <img src="https://images.pexels.com/photos/3184327/pexels-photo-3184327.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Ελληνική ομάδα σε workshop γύρω από τραπέζι με laptops" loading="lazy" className="min-w-0 flex-[1.3_1_min(100%,460px)] rounded-[22px] object-cover" />
      </div>
      <div className="mt-[clamp(56px,7vw,104px)] flex flex-row-reverse flex-wrap items-center gap-[clamp(36px,5vw,88px)]">
        <EnableText
          icon={["M3 4h18v6H3z", "M3 14h18v6H3z", "M7 7h.01", "M7 17h.01", "M11 7h6", "M11 17h6"]}
          eyebrow="Production systems" lead="Αναβαθμίζουμε " accent="τα συστήματα."
          text="Συνδέουμε τα δεδομένα, τα έγγραφα και το λογισμικό σας και στήνουμε συστήματα AI γύρω από τις ροές που αξίζει να αλλάξουν."
          bullets={["Πάνω στα συστήματα που ήδη έχετε", "Συνδεδεμένα με πραγματικά δεδομένα", "Σε λειτουργία, με παρακολούθηση και συνεχή βελτίωση"]}
          link="Δείτε τι έχουμε χτίσει" href="#tools"
        />
        <div className="ops-frame relative min-w-0 flex-[1.3_1_min(100%,460px)] overflow-hidden rounded-[22px] p-[clamp(18px,3vw,40px)]">
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
        </div>
      </div>
    </Section>
  );
}

export function Method() {
  return (
    <Section id="method" className="pt-0 pb-[clamp(72px,9vw,128px)]">
      <Eyebrow>Μεθοδολογία</Eyebrow>
      <Title>Εφαρμόζουμε 4 βήματα. <span className="italic text-muted-foreground">Μετά, φέρνουμε αποτέλεσμα.</span></Title>
      <Tabs defaultValue="diag" className="mt-10">
        <TabsList className="h-auto flex-wrap rounded-full bg-card p-1">
          {steps.map((s, i) => (
            <TabsTrigger key={s.key} value={s.key} className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              0{i + 1} {s.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {steps.map((s, i) => (
          <TabsContent key={s.key} value={s.key} className="mt-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold font-mono tracking-[0.08em] text-muted-foreground">0{i + 1} / 04 · {s.label.toUpperCase()}</p>
                <h3 className="mt-3 font-display text-3xl">{s.title}</h3>
                <p className="mt-4 text-muted-foreground">{s.text}</p>
                <Checks items={s.bullets} />
              </div>
              <div className="rounded-[14px] border border-border bg-card p-6">
                <div className="flex justify-between text-sm"><span className="font-semibold">Ευκαιρίες AI <span className="text-muted-foreground">14</span></span><span className="text-xs font-mono tracking-[0.08em] text-muted-foreground">ΕΠΙΔΡΑΣΗ</span></div>
                <div className="mt-4 space-y-4">
                  {opportunities.map(([n, d, v]) => (
                    <div key={n}>
                      <div className="flex justify-between text-sm"><span>{n} <span className="ml-2 text-[10px] font-mono tracking-[0.08em] text-muted-foreground">{d}</span></span><span className="font-semibold">{v}</span></div>
                      <div className="mt-1 h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-accent" style={{ width: `${v}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  );
}
