import { clients, courses } from "./data";
import { Eyebrow, Pill, Section, Title } from "./ui";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full bg-ink/70 py-2 pl-6 pr-2 backdrop-blur-md">
        <a href="#top" className="font-display text-xl font-semibold text-ink-foreground">The Upgraders</a>
        <Pill href="#services" variant="light">Θέλω εκπαίδευση</Pill>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="hero-gradient relative flex min-h-screen items-center justify-center px-5 text-center text-ink-foreground">
      <div className="max-w-3xl">
        <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">
          Βάλατε ChatGPT και Claude.
          <span className="mt-2 block italic text-ink-foreground/75">Η καθημερινότητα όμως έμεινε ίδια.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg text-ink-foreground/85">
          Ήρθε η ώρα για αναβάθμιση. Αναλαμβάνουν οι Upgraders. Μια ομάδα από builders, δημιουργούς, tech και corporate education experts.
        </p>
        <a href="#services" className="mt-10 inline-block border-b border-ink-foreground/40 pb-1 text-sm font-medium hover:border-ink-foreground">
          Υπηρεσίες εκπαίδευσης για επιχειρήσεις →
        </a>
      </div>
    </section>
  );
}

function ServiceCard({ title, sub, text, cta, badge }: { title: string; sub?: string; text: string; cta: string; badge?: string }) {
  return (
    <div className="relative flex flex-col rounded-3xl border border-border bg-card p-7">
      {badge && <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">{badge}</span>}
      <h3 className="font-display text-2xl">{title}</h3>
      {sub && <p className="text-sm text-muted-foreground">{sub}</p>}
      <p className="mt-4 flex-1 text-muted-foreground">{text}</p>
      <Pill variant="outline" className="mt-6 self-start" href="#live">{cta}</Pill>
    </div>
  );
}

export function Services() {
  return (
    <Section id="services">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Υπηρεσίες εκπαίδευσης</Eyebrow>
          <Title>Επιλέξτε πώς θα αναβαθμιστείτε.</Title>
        </div>
        <Pill>Θέλω εκπαίδευση</Pill>
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold">ΣΕ ΤΜΗΜΑΤΑ <span className="font-normal text-muted-foreground">· Ανοιχτά μαθήματα & βιβλιοθήκη εκπαιδεύσεων</span></p>
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceCard title="Live Εκπαίδευση" sub="(σε μικρά τμήματα)" text="Μικρά groups, σε δική μας αίθουσα ή livestream." cta="Επόμενα μαθήματα" />
            <ServiceCard title="On Demand εκπαίδευση" text="Δείτε σε μαγνητοσκόπηση κρίσιμες εκπαιδεύσεις για τα σημαντικότερα εργαλεία AI." cta="Περισσότερα" />
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold">ΕΞΑΤΟΜΙΚΕΥΜΕΝΗ <span className="font-normal text-muted-foreground">· Στημένη αποκλειστικά για την ομάδα σας</span></p>
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceCard badge="Δημοφιλές" title="Εταιρικό AI Upgrade" text="Tailor-made εκπαίδευση, στημένη πάνω στην εταιρεία σας." cta="Δείτε πώς γίνεται" />
            <ServiceCard title="8ώρο AI Sprint" text="Δύο 4ωρα μέσα στην εταιρεία σας, εκπαίδευση στα εργαλεία που θα κάνουν τη διαφορά." cta="Κλείστε Sprint" />
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-4 border-t border-border pt-10">
        <span className="text-sm font-semibold text-muted-foreground">Μας εμπιστεύονται</span>
        {clients.map((c) => (
          <span key={c} className="font-display text-2xl text-foreground/60">{c}</span>
        ))}
      </div>
    </Section>
  );
}

export function LiveCourses() {
  return (
    <Section id="live" className="bg-secondary">
      <Eyebrow>Live Upgrades</Eyebrow>
      <Title>Τα επόμενα live μαθήματα.</Title>
      <p className="mt-4 max-w-2xl text-muted-foreground">Μικρά groups, σε αίθουσα ή livestream. Κάθε μάθημα έχει τη δική του σελίδα με αναλυτική ύλη, κράτηση θέσης και πληρωμή.</p>
      <div className="mt-10 space-y-4">
        {courses.map((c, i) => {
          const done = c.status === "done";
          return (
            <div key={i} className={`grid items-center gap-4 rounded-3xl border border-border bg-card p-6 md:grid-cols-[2fr_1.2fr_auto] ${done ? "opacity-55" : ""}`}>
              <div>
                <h3 className="font-display text-2xl">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.tools}</p>
              </div>
              <div className="text-sm">
                <p className="font-semibold">{c.date}</p>
                <p className="text-muted-foreground">{c.time}</p>
                <div className="mt-2 flex gap-2">
                  {c.modes.map((m) => <span key={m} className="rounded-full border border-border px-2.5 py-0.5 text-xs">{m}</span>)}
                </div>
              </div>
              {done ? (
                <span className="text-sm font-semibold text-muted-foreground">Ολοκληρώθηκε</span>
              ) : (
                <div className="flex items-center gap-4 md:flex-col md:items-end">
                  <div className="text-right">
                    <p className="font-display text-2xl">{c.price}</p>
                    <p className="text-xs font-semibold text-accent">Λίγες θέσεις</p>
                  </div>
                  <Pill>Κράτηση θέσης</Pill>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Pill variant="outline">Θέλω εξατομικευμένη εταιρική εκπαίδευση</Pill>
        <Pill variant="outline">Θέλω ένα 8ωρο Sprint μέσα στην εταιρεία μου</Pill>
        <Pill variant="outline">Θέλω να δω μαγνητοσκοπημένες εκπαιδεύσεις</Pill>
      </div>
    </Section>
  );
}
