import { ModalShell } from "./ModalShell";
import { Pill } from "./ui";

const BOOK = "https://www.eventora.com/el/Events/upgraders-ai-coding-masterclas";
const audiences = [
  ["Startupers με μια ιδέα", "Την πρώτη έκδοση (MVP) της εφαρμογής σου live"],
  ["Επιχειρήσεις με site ή e-shop", "Το site ή το e-shop σου συνδεδεμένο με AI μέσω MCP"],
  ["Digital agencies", "Μια ροή παράδοσης project με AI για την ομάδα σου"],
  ["Freelancers", "Μια νέα υπηρεσία που μπορείς να πουλήσεις από αύριο"],
];
const modules = [
  ["Vibe coding από το μηδέν", "Ποιο εργαλείο για τι και πώς γράφεις ένα καλό brief ώστε το AI να χτίσει αυτό που έχεις στο μυαλό σου."],
  ["Design με Claude Design", "Σελίδες, οθόνες εφαρμογής και visual identity με prompts."],
  ["Website, e-shop και mobile app", "Φόρμες, κατάλογος προϊόντων, πληρωμές, βάση δεδομένων, λογαριασμοί χρηστών και εφαρμογές iOS/Android με το Rork."],
  ["Claude Code και ChatGPT Codex", "Περισσότερος έλεγχος στο project σου, GitHub και αλλαγές με φυσική γλώσσα."],
  ["AI εφαρμογές και ομάδες AI agents", "AI μέσα στην εφαρμογή σου με Amazon Bedrock και ομάδα AI developers με το Grok Bot."],
  ["Διαχείριση με MCP connectors", "Διαχειρίζεσαι προϊόντα, περιεχόμενο και παραγγελίες από το Claude ή το ChatGPT."],
  ["Security, Cloudflare και publish", "Κλειδιά, δικαιώματα, domain, SSL, προστασία από bots και ανέβασμα live."],
];
const packs = [
  ["Online", "149 €", "Πέμ 17 & Παρ 18/12 · 15:00–20:00 · live online"],
  ["Δια ζώσης", "249 €", "Πέμ 17 & Παρ 18/12 · 15:00–20:00 · γραφεία Advisable"],
  ["Full pack", "399 €", "Δια ζώσης + workshop Σάββατο 19/12 12:00–18:00 & Christmas party"],
];
const h = "font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground";

export function MasterclassModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose} labelledBy="mc-title" z="z-[210]" className="max-w-[760px] bg-background p-[clamp(24px,4vw,48px)]">
      <p className={h}>17 – 19 Δεκεμβρίου 2026 · Δια ζώσης & online</p>
      <h2 id="mc-title" className="mt-3 pr-10 text-[clamp(26px,3.4vw,38px)] font-semibold leading-[1.05] tracking-[-0.025em]">AI Coding Masterclass</h2>
      <p className="mt-3 text-[15px] text-muted-foreground">Φτιάξε μόνος σου website, e-shop ή εφαρμογή με prompts, διαχειρίσου τα από το Claude ή το ChatGPT και βγάλ' τα live με ασφάλεια μέσω Cloudflare. Ως Lovable partners, σου δίνουμε λογαριασμό Lovable με credits για τα πρώτα σου projects.</p>
      <div className="mt-6 grid grid-cols-3 gap-3 rounded-[14px] bg-secondary p-4 text-center">
        {[["16 ώρες", "live εκπαίδευση (Full pack)"], ["7", "πρακτικές ενότητες"], ["3 μήνες", "πρόσβαση στη βιντεοσκόπηση"]].map(([a, b]) => (
          <div key={a}><p className="text-[22px] font-semibold">{a}</p><p className="text-[12px] text-muted-foreground">{b}</p></div>
        ))}
      </div>
      <h3 className={`${h} mt-8`}>Για ποιους & με τι φεύγεις</h3>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {audiences.map(([t, d]) => <li key={t} className="rounded-[12px] border border-foreground/10 p-4"><p className="font-medium">{t}</p><p className="mt-1 text-[14px] text-muted-foreground">{d}</p></li>)}
      </ul>
      <h3 className={`${h} mt-8`}>Ύλη</h3>
      <ol className="mt-3 grid gap-3">
        {modules.map(([t, d], i) => <li key={t} className="flex gap-4"><span className="font-mono text-[13px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span><div><p className="font-medium">{t}</p><p className="text-[14px] text-muted-foreground">{d}</p></div></li>)}
      </ol>
      <h3 className={`${h} mt-8`}>Τιμές</h3>
      <ul className="mt-3 grid gap-3 sm:grid-cols-3">
        {packs.map(([t, p, d]) => <li key={t} className="rounded-[12px] border border-foreground/10 p-4"><p className={h}>{t}</p><p className="mt-1 whitespace-nowrap text-[26px] font-semibold">{p}</p><p className="mt-1 text-[13px] text-muted-foreground">{d}</p></li>)}
      </ul>
      <p className="mt-3 text-[13px] text-muted-foreground">Τελικές τιμές · Δωρεάν ακύρωση έως 10 ημέρες πριν</p>
      <div className="mt-6"><Pill href={BOOK} target="_blank" rel="noopener noreferrer">Κράτηση θέσης</Pill></div>
    </ModalShell>
  );
}
