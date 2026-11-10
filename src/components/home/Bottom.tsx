import { useCallback, useEffect, useRef, useState } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cases, faqs, team, tools, type ToolTag } from "./data";
import { Eyebrow, Section } from "./ui";
import { Reveal } from "./Reveal";
import { LegalModal, type LegalDoc } from "./LegalModal";

export function Cases() {
  const { ref, bar, update, go } = useCarousel(16);
  return (
    <Section id="cases" className="bg-ink text-ink-foreground py-[clamp(80px,10vw,140px)]">
      <div className="flex flex-wrap gap-[clamp(36px,5vw,72px)]">
        <Reveal className="grid max-w-[400px] flex-[1_1_300px] content-start gap-5">
          <Eyebrow className="text-ink-foreground/80">Release notes</Eyebrow>
          <h2 className="text-[clamp(36px,4.6vw,64px)] font-light leading-[1.04] tracking-[-0.035em]">Τι κάναμε <span className="font-serif font-light! italic">για πελάτες μας.</span></h2>
          <p className="text-[17px] text-ink-foreground/78">Τι άλλαξε μετά την αναβάθμιση.</p>
        </Reveal>
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
        <Reveal className="max-w-[900px] flex-[1_1_500px]">
          <h2 className="text-[clamp(30px,3.8vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em]">Χτίζουμε και Custom Εργαλεία<span className="font-serif font-semibold! italic">: σχεδιασμένα για κλάδους ή αποκλειστικά για τη δική σας εταιρεία.</span></h2>
          <p className="mt-4 text-lg text-muted-foreground">Πραγματικά συστήματα AI, σε πραγματικές ελληνικές εταιρείες.</p>
        </Reveal>
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
  const light = "bg-white border border-[rgba(28,28,26,0.14)] text-foreground";
  const bubbles = [
    { label: "Online μαθήματα & academies των AI εταιρειών", cls: `${light} left-[4%] top-[3%] w-[36%] p-[4%] text-[10px] min-[600px]:left-[12%] min-[600px]:top-[9%] min-[600px]:w-[18%] min-[600px]:p-[2.4%] min-[600px]:text-[clamp(11px,1.1vw,13px)]` },
    { label: "Κλασικά σεμινάρια", cls: `${light} left-[12%] top-[42%] w-[32%] p-[4%] text-[11px] min-[600px]:left-[22%] min-[600px]:top-[48%] min-[600px]:w-[22%] min-[600px]:p-[3%] min-[600px]:text-[clamp(13px,1.4vw,17px)]` },
    { label: "Μεγάλες συμβουλευτικές", cls: `${light} left-[52%] top-[47%] w-[44%] p-[4%] text-[12px] min-[600px]:left-[61%] min-[600px]:top-[44%] min-[600px]:w-[32%] min-[600px]:p-[4%] min-[600px]:text-[clamp(15px,1.7vw,21px)]` },
  ];
  const muted = "text-[#5F5B53]";
  return (
    <Section id="why" className="pt-[clamp(40px,5vw,64px)] pb-[clamp(80px,10vw,140px)] text-center">
      <Reveal><p className="font-serif text-[22px] italic font-normal!">Γιατί The Upgraders</p>
      <h2 className="mx-auto mt-4 max-w-[1000px] text-[clamp(34px,4.8vw,68px)] font-light leading-[1.05] tracking-[-0.035em]">Είναι σεμινάριο; Είναι consulting;<br /><span className="font-serif font-normal! italic">Είναι Αναβάθμιση.</span></h2>
      <p className={`mx-auto mt-6 max-w-[700px] text-[18px] leading-[1.55] ${muted}`}>Τα σεμινάρια δεν αλλάζουν τη δουλειά. Οι σύμβουλοι δεν χτίζουν. Εμείς εκπαιδεύουμε τους ανθρώπους και χτίζουμε τα συστήματα, γρήγορα και εξατομικευμένα, όπως κάναμε στις δικές μας εταιρείες.</p></Reveal>
      <Reveal className="mt-[clamp(48px,6vw,80px)] overflow-x-auto text-left" role="img" aria-label="Διάγραμμα: ταχύτητα αποτελέσματος έναντι προσαρμογής. Τα online μαθήματα είναι γρήγορα αλλά γενικά, τα κλασικά σεμινάρια αργά και γενικά, οι μεγάλες συμβουλευτικές αργές και ειδικές με μεγάλη επένδυση, ενώ οι The Upgraders γρήγοροι και ειδικά για εσάς.">
        <div className="relative mx-auto aspect-[0.9] max-w-[980px] min-[600px]:aspect-[1.32] min-[600px]:min-w-[660px]">
          <div className="absolute top-2 right-2 bottom-16 left-16 border-b-[1.5px] border-l-[1.5px] border-foreground">
            <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-[rgba(28,28,26,0.25)]" />
            <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[rgba(28,28,26,0.25)]" />
            <span className="absolute -top-2 -left-[6px] h-0 w-0 border-x-[5px] border-b-[8px] border-x-transparent border-b-foreground" />
            <span className="absolute -right-2 -bottom-[6px] h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-foreground" />
            {bubbles.map((b) => (
              <div key={b.label} className={`absolute flex aspect-square items-center justify-center rounded-full text-center leading-[1.25] ${b.cls}`}>{b.label}</div>
            ))}
            <div className="absolute top-[3%] left-[56%] flex aspect-square w-[38%] items-center justify-center rounded-full bg-foreground p-[4%] text-center text-[13px] leading-[1.2] tracking-[-0.02em] text-white shadow-[0_24px_50px_-16px_rgba(28,28,26,0.5)] min-[600px]:top-[6%] min-[600px]:left-[66%] min-[600px]:w-[23%] min-[600px]:p-0 min-[600px]:text-[clamp(17px,2vw,26px)]">
              The Upgraders
              <span className="absolute top-[6%] right-[6%] flex aspect-square w-[16%] items-center justify-center rounded-full bg-[#FF3B30] text-[clamp(11px,1.2vw,15px)] font-semibold text-white shadow-[0_0_0_3px_#FEFAF3]">1</span>
            </div>
            <div className="absolute bottom-[4%] left-[3%] grid gap-[10px] rounded-[12px] bg-[#F1EADD] px-4 py-[14px] text-[13px]">
              <div className="flex items-center gap-1.5">{[8, 12, 18].map((s) => <span key={s} className="rounded-full bg-foreground" style={{ width: s, height: s }} />)}</div>
              <span>Μέγεθος κύκλου = επένδυση</span>
            </div>
          </div>
          <div className={`pointer-events-none absolute top-0 bottom-[70px] left-[74px] flex flex-col justify-between text-[13px] ${muted}`}><span>Γρήγορα</span><span>Αργά</span></div>
          <div className={`pointer-events-none absolute top-2 bottom-16 left-1 flex items-center ${muted}`}><span className="-ml-[74px] origin-center -rotate-90 whitespace-nowrap text-[15px] font-medium">Ταχύτητα αποτελέσματος</span></div>
          <div className={`pointer-events-none absolute right-2 bottom-9 left-16 flex justify-between text-[13px] ${muted}`}><span>Γενικό</span><span>Ειδικά για εσάς</span></div>
          <div className="pointer-events-none absolute right-2 bottom-1 left-16 text-center text-[15px] font-medium text-foreground">Προσαρμογή</div>
        </div>
      </Reveal>
    </Section>
  );
}

export function Team() {
  const { ref, bar, update, go } = useCarousel(12);
  return (
    <Section id="team" className="pt-0 pb-[clamp(80px,10vw,140px)]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal className="max-w-[860px]">
          <p className="font-serif text-[18px] italic font-normal!">Γνωρίστε την ομάδα</p>
          <h2 className="text-[clamp(34px,4.6vw,64px)] font-light leading-[1.06] tracking-[-0.035em]">
            <span className="font-serif font-normal! italic">Builders, Makers, Entrepreneurs, Trainers</span><br />
            <span className="mt-[10px] inline-block text-[0.5em] font-normal leading-[1.2] tracking-[-0.02em]">Πρώτα το κάναμε για τις εταιρείες μας. Τώρα, το κάνουμε και για τις δικές σας.</span>
          </h2>
        </Reveal>
        <CarouselNav go={go} light />
      </div>
      <div ref={ref} onScroll={update} className="cases-track mt-[clamp(32px,4vw,48px)] flex gap-3 overflow-x-auto">
        {team.map((m) => (
          <article key={m.name} className="relative h-[350px] flex-[0_0_300px] snap-start overflow-hidden rounded-[20px] bg-[#3A3631]">
            <img src={m.img} alt={m.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(20,18,16,0.82)_100%)]" />
            <div className="pointer-events-none absolute right-[22px] bottom-[22px] left-[22px] text-white">
              <h3 className="text-[24px] tracking-[-0.02em]">{m.name}</h3>
              <p className="mt-1 text-[14px] leading-[1.4] text-white/88">{m.role}</p>
            </div>
          </article>
        ))}
      </div>
      <ProgressBar bar={bar} light />
    </Section>
  );
}

export function Quote() {
  return (
    <section id="contact" className="px-[clamp(12px,3vw,48px)] pb-[clamp(80px,10vw,140px)]">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[28px] px-6 py-[clamp(80px,10vw,140px)] text-center text-white" style={{ background: "radial-gradient(60% 80% at 0% 100%,#B07F9C 0%,transparent 65%), radial-gradient(60% 70% at 100% 0%,#36366E 0%,transparent 70%), linear-gradient(120deg,#5E62A0 0%,#53508E 45%,#6B5791 100%)" }}>
        <div aria-hidden="true" className="absolute inset-0" style={{ opacity: 0.35, mixBlendMode: "overlay", backgroundImage: "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E)" }} />
        <Reveal className="relative">
          <p className="text-[clamp(32px,4.4vw,64px)] font-light leading-[1.06] tracking-[-0.035em]">Φτιαγμένο με AI,</p>
          <p className="mx-auto mt-3 max-w-[900px] font-serif text-[clamp(24px,3.2vw,44px)] font-light! italic leading-[1.15] tracking-[-0.02em]">Και 15 χρόνια εμπειρίας σε product, business, copywriting, design και coding.</p>
          <img src="/logo-negative.svg" alt="The Upgraders" className="mx-auto mt-10 block h-[30px]" />
        </Reveal>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <Section id="faq" className="pt-0 pb-[clamp(80px,10vw,140px)]">
      <div className="mx-auto max-w-[1168px]">
        <Reveal as="h2" className="text-center text-[clamp(36px,5vw,68px)] font-light leading-[1.04] tracking-[-0.035em]">Ερωτήσεις, <span className="font-serif font-normal! italic text-[#FF3B30]">απαντημένες.</span></Reveal>
        <AccordionPrimitive.Root type="single" collapsible defaultValue="q0" className="mt-[clamp(40px,5vw,64px)] grid gap-[10px]">
          {faqs.map(([q, a], i) => (
            <AccordionPrimitive.Item key={q} value={`q${i}`} className="group rounded-[16px] bg-[#F5EEE2] transition-colors hover:bg-[#F1E8DA]">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex w-full items-center justify-between gap-5 bg-transparent px-[clamp(20px,2.4vw,30px)] py-[clamp(20px,2.2vw,28px)] text-left text-[clamp(17px,1.6vw,20px)] tracking-[-0.01em]">
                  {q}
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-90"><path d="M9 6l6 6-6 6" /></svg>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content>
                <p className="animate-[tuIn_0.35s_ease_both] max-w-[780px] px-[clamp(20px,2.4vw,30px)] pb-[clamp(22px,2.4vw,30px)] text-[16px] leading-[1.6] text-[#5F5B53]">{a}</p>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </Section>
  );
}

export function Footer() {
  const [legal, setLegal] = useState<LegalDoc | null>(null);
  const cols: Record<string, [string, string][]> = {
    "ΥΠΗΡΕΣΙΕΣ": [["Εταιρικό AI Upgrade", "#contact"], ["8ώρο AI Sprint", "#contact"], ["Live Εκπαίδευση", "#live"], ["Custom AI εργαλεία", "#tools"]],
    "ΕΤΑΙΡΕΙΑ": [["Η ομάδα", "#team"], ["Case Studies", "#cases"], ["Συχνές ερωτήσεις", "#faq"], ["Επικοινωνία", "#contact"]],
    "ΝΟΜΙΚΑ": [["Όροι χρήσης", "legal:terms"], ["Πολιτική απορρήτου", "legal:privacy"], ["Πολιτική cookies", "legal:cookies"]],
  };
  const socials = [
    { code: "IG", label: "Instagram @nikosxydas", href: "https://www.instagram.com/nikosxydas" },
    { code: "TT", label: "TikTok @nikosxydas", href: "https://www.tiktok.com/@nikosxydas" },
    { code: "f", label: "Facebook @nikosxydas", href: "https://www.facebook.com/nikosxydas" },
    { code: "YT", label: "YouTube @ScrollStoppers", href: "https://www.youtube.com/@ScrollStoppers" },
  ];
  return (
    <footer className="bg-ink pt-[clamp(64px,8vw,100px)] text-ink-foreground">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="flex flex-wrap gap-2 self-start">
            {socials.map((s) => (
              <a key={s.code} href={s.href} target="_blank" rel="noopener" aria-label={s.label}
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-ink-foreground/20 font-mono text-[11px] font-medium transition-colors hover:border-ink-foreground hover:text-ink-foreground">{s.code}</a>
            ))}
          </div>
          <div className="grid max-w-[860px] flex-[1_1_620px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-9">
            {Object.entries(cols).map(([h, items]) => (
              <div key={h}>
                <p className="font-mono text-xs font-semibold tracking-[0.08em] text-ink-muted">{h}</p>
                <ul className="mt-4 space-y-2 text-sm">{items.map(([l, href]) => <li key={l}>{href.startsWith("legal:") ? <a href="#" onClick={(e) => { e.preventDefault(); e.currentTarget.focus(); setLegal(href.slice(6) as LegalDoc); }} className="hover:text-accent">{l}</a> : <a href={href} className="hover:text-accent">{l}</a>}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      {legal && <LegalModal doc={legal} onClose={() => setLegal(null)} />}
      <div className="px-[clamp(12px,2vw,28px)] pt-[clamp(40px,5vw,72px)] pb-[clamp(16px,2vw,28px)]">
        <img src="/logo-negative.svg" alt="The Upgraders" className="block h-auto w-full" />
      </div>
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap justify-between gap-4 py-[22px] font-mono text-[11px] tracking-[0.06em] text-ink-foreground/60">
          <span>© 2026 THE UPGRADERS. ΜΕ ΕΠΙΦΥΛΑΞΗ ΠΑΝΤΟΣ ΔΙΚΑΙΩΜΑΤΟΣ.</span>
          <span>Made with &lt;3 by Humble &amp; Advisable.</span>
        </div>
      </div>
    </footer>
  );
}
