import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cases, faqs, team, toolFilters, tools } from "./data";
import { Eyebrow, Pill, Section, Title } from "./ui";

export function Cases() {
  return (
    <Section id="cases">
      <Eyebrow>Release notes</Eyebrow>
      <Title>Τι κάναμε για πελάτες μας.</Title>
      <p className="mt-4 text-muted-foreground">Τι άλλαξε μετά την αναβάθμιση.</p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {cases.map((c) => (
          <div key={c.name} className="rounded-[14px] bg-ink p-7 text-ink-foreground">
            <span className="rounded-full bg-ink-foreground/10 px-3 py-1 text-xs font-semibold font-mono tracking-[0.08em]">{c.release}</span>
            <h3 className="mt-5 font-display text-3xl">{c.name}</h3>
            <p className="text-sm text-ink-muted">{c.sector}</p>
            <p className="mt-6 font-display text-6xl">{c.hero[0]}</p>
            <p className="text-sm text-ink-muted">{c.hero[1]}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {c.metrics.map(([v, l, s]) => (
                <div key={l} className="rounded-2xl bg-ink-foreground/5 p-4">
                  <p className="font-display text-2xl text-accent">{v}</p>
                  <p className="mt-1 text-sm">{l}</p>
                  <p className="text-xs text-ink-muted">{s}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[10px] font-mono tracking-[0.08em] text-ink-muted">ΕΝΔΕΙΚΤΙΚΕΣ ΤΙΜΕΣ · PLACEHOLDER</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Tools() {
  const [filter, setFilter] = useState("Όλα");
  const shown = tools.filter((t) => filter === "Όλα" || t.filters.includes(filter));
  return (
    <Section id="tools" className="bg-secondary">
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
    <Section id="why">
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
    <Section id="team" className="bg-secondary">
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
    <Section id="faq">
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
