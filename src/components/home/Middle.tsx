import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { industries, opportunities, roles, steps } from "./data";
import { Eyebrow, Pill, Section, Title } from "./ui";

function List({ eyebrow, title, items, id }: { eyebrow: string; title: string; items: string[][]; id: string }) {
  return (
    <Section id={id}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Title>{title}</Title>
      <div className="mt-10 divide-y divide-border border-y border-border">
        {items.map(([name, text]) => (
          <a key={name} href="#contact" className="group grid gap-2 py-5 transition-colors hover:bg-secondary md:grid-cols-[1fr_2fr_auto] md:items-center md:px-3">
            <span className="font-display text-xl">{name}</span>
            <span className="text-muted-foreground">{text}</span>
            <span className="hidden text-accent transition-transform group-hover:translate-x-1 md:block">→</span>
          </a>
        ))}
      </div>
    </Section>
  );
}

export const Roles = () => <List id="roles" eyebrow="Ανά ρόλο" title="Εκπαίδευση ανά θέση εργασίας." items={roles} />;
export const Industries = () => <List id="industries" eyebrow="Ανά κλάδο" title="Εκπαίδευση ανά κλάδο δραστηριότητας." items={industries} />;

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
  const bars = [["ΕΛΛΑΔΑ", 8.9, "8,9%", "bg-accent"], ["ΕΕ", 20, "20%", "bg-ink-foreground/70"]] as const;
  return (
    <section className="bg-ink px-5 py-24 text-ink-foreground">
      <div ref={ref} className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <Eyebrow>Το ελληνικό παράδοξο</Eyebrow>
          <Title>Οι Έλληνες χρησιμοποιούν AI. <span className="italic text-ink-muted">Οι ελληνικές εταιρείες όχι.</span></Title>
          <p className="mt-6 text-ink-muted">8,9% των ελληνικών επιχειρήσεων χρησιμοποιεί AI. Ο μέσος όρος στην Ευρώπη είναι 20%.</p>
        </div>
        <div className="space-y-6">
          {bars.map(([label, v, txt, color]) => (
            <div key={label}>
              <div className="mb-2 flex justify-between text-sm font-semibold"><span>{label}</span><span className="font-display text-2xl">{txt}</span></div>
              <div className="h-4 rounded-full bg-ink-foreground/10">
                <div className={`h-4 rounded-full ${color} transition-all duration-[1500ms] ease-out`} style={{ width: seen ? `${(v / 25) * 100}%` : "0%" }} />
              </div>
            </div>
          ))}
          <p className="text-xs text-ink-muted">Πηγή: Eurostat, 2025</p>
        </div>
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

export function Enablement() {
  const systems = [["ERP", "SoftOne ERP", "Συγχρονίστηκε πριν 2'"], ["CRM", "HubSpot CRM", "Συγχρονίστηκε πριν 1'"], ["DOC", "SharePoint · Έγγραφα", "12.480 αρχεία"], ["MAIL", "Outlook", "Εισερχόμενα πωλήσεων"]];
  const feed = [["Προσφορά #2381 · έτοιμη για έγκριση", "2'"], ["Τιμολόγιο ↔ Δελτίο · ταιριάζει", "6'"], ["Email πελάτη · απαντήθηκε", "9'"]];
  return (
    <Section id="programs">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <Eyebrow>Team enablement</Eyebrow>
          <Title>Αναβαθμίζουμε τους ανθρώπους.</Title>
          <p className="mt-5 text-muted-foreground">Εκπαιδεύουμε την ομάδα σας να χρησιμοποιεί AI στη δουλειά που ήδη κάνει: έρευνα, επικοινωνία, ανάλυση, αποφάσεις, καθημερινές ροές.</p>
          <Checks items={["Hands-on εκπαίδευση ανά ρόλο", "Πάνω στην πραγματική δουλειά της ομάδας", "Από τη βασική χρήση σε επαναλαμβανόμενες ροές"]} />
          <Pill className="mt-8" href="#roles">Δείτε τα προγράμματα</Pill>
        </div>
        <div>
          <Eyebrow>Production systems</Eyebrow>
          <Title>Αναβαθμίζουμε τα συστήματα.</Title>
          <p className="mt-5 text-muted-foreground">Συνδέουμε τα δεδομένα, τα έγγραφα και το λογισμικό σας και στήνουμε συστήματα AI γύρω από τις ροές που αξίζει να αλλάξουν.</p>
          <Checks items={["Πάνω στα συστήματα που ήδη έχετε", "Συνδεδεμένα με πραγματικά δεδομένα", "Σε λειτουργία, με παρακολούθηση και συνεχή βελτίωση"]} />
          <Pill className="mt-8" href="#tools">Δείτε τι έχουμε χτίσει</Pill>
        </div>
      </div>
      <div className="mt-14 rounded-[14px] bg-ink p-6 text-ink-foreground md:p-8">
        <div className="flex items-center justify-between text-xs font-semibold font-mono tracking-[0.08em] text-ink-muted">
          <span>AI OPS · Ροή προσφορών B2B</span>
          <span className="flex items-center gap-2 text-success"><span className="h-2 w-2 animate-pulse rounded-full bg-success" />LIVE</span>
        </div>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-mono tracking-[0.08em] text-ink-muted">ΣΥΝΔΕΔΕΜΕΝΑ ΣΥΣΤΗΜΑΤΑ</p>
            <div className="space-y-2">
              {systems.map(([k, n, s]) => (
                <div key={k} className="flex items-center gap-3 rounded-xl bg-ink-foreground/5 p-3 text-sm">
                  <span className="w-12 rounded-md bg-ink-foreground/10 py-1 text-center text-[10px] font-bold">{k}</span>
                  <span className="flex-1">{n}</span><span className="text-xs text-ink-muted">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-mono tracking-[0.08em] text-ink-muted">ΩΡΕΣ ΠΟΥ ΕΞΟΙΚΟΝΟΜΗΘΗΚΑΝ · Q3</p>
            <p className="mt-2 font-display text-6xl">1.284 <span className="text-lg text-success">+18%</span></p>
            <div className="mt-6 space-y-2">
              {feed.map(([t, m]) => (
                <div key={t} className="flex justify-between border-b border-ink-foreground/10 pb-2 text-sm"><span>{t}</span><span className="text-ink-muted">{m}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Method() {
  return (
    <Section id="method" className="bg-secondary">
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
