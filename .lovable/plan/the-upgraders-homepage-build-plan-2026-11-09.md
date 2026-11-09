# The Upgraders — Homepage build plan

A single long Greek-language marketing homepage for The Upgraders (AI training + custom AI systems for Greek companies), rebuilt from the PDF section by section. Built at `/`.

## Visual direction (from the PDF)
- Dark full-screen hero with a soft, slowly drifting gradient (deep charcoal → violet → dusty rose), white serif-style headline.
- The rest of the page sits on a warm cream background with near-black text; dark "dashboard" mock cards for product sections.
- Pill-shaped buttons, rounded cards, small uppercase eyebrow labels above each section title (e.g. "LIVE UPGRADES", "ΑΝΑ ΡΟΛΟ").
- Fonts: a refined display font for headings plus a clean sans for body (both with full Greek support).

## Sections (top to bottom)
1. **Header** — logo "The Upgraders", pill button "Θέλω εκπαίδευση".
2. **Hero** — "Βάλατε ChatGPT και Claude. Η καθημερινότητα όμως έμεινε ίδια.", subtext about the team, link "Υπηρεσίες εκπαίδευσης για επιχειρήσεις".
3. **Υπηρεσίες εκπαίδευσης** — two groups: *Σε τμήματα* (Live Εκπαίδευση, On Demand) and *Εξατομικευμένη* (Εταιρικό AI Upgrade with "Δημοφιλές" badge, 8ώρο AI Sprint).
4. **Μας εμπιστεύονται** — client logo strip (Insurance Market, Seajets, Stoiximan, GBL) as text wordmarks until real logos are provided.
5. **Live Upgrades** — upcoming course cards (title, tools, date, time, On site/Online tags, price, "Λίγες θέσεις", "Κράτηση θέσης"; past course shown as "Ολοκληρώθηκε"), plus three CTA buttons.
6. **Ανά ρόλο** — 8 role rows (Leadership, Managers, Sales & Marketing, Finance, HR, Εξυπηρέτηση, Operations, Developers & IT).
7. **Ανά κλάδο** — 9 industry rows (Ναυτιλία, Τουρισμός, Retail, Real Estate, Τράπεζες, Φάρμακο, FMCG, Ενέργεια, Λογιστικά & Νομικά).
8. **Το ελληνικό παράδοξο** — stat comparison bars: Ελλάδα 8,9% vs ΕΕ 20% (Eurostat 2025), animated on scroll.
9. **Team enablement / Production systems** — two blocks, the second with a mock "AI OPS" live dashboard (ERP/CRM/SharePoint/Outlook sync rows, 1.284 hours saved, activity feed).
10. **Μεθοδολογία** — 4-step tabbed stepper (Διάγνωση, Προτεραιότητες, Υλοποίηση, Εξέλιξη) with a ranked "Ευκαιρίες AI" score panel.
11. **Release notes (case studies)** — Insurance Market (Release 2.0) and ΟΣΦΕ (Release 1.4) metric cards, marked as indicative values.
12. **Custom εργαλεία** — filter chips (Όλα, Πωλήσεις, Εξυπηρέτηση, …) over tool cards (Proposal Generation System, Hospitality Booking Assistant).
13. **Γιατί The Upgraders** — "Είναι σεμινάριο; Είναι consulting; Είναι Αναβάθμιση." with a positioning chart (speed vs customization, bubble size = investment).
14. **Γνωρίστε την ομάδα** — 3 team cards (Νίκος Ξυδάς, Βασίλης Καλλάρας, Πάνος Καλλάρας) with placeholder portraits.
15. **FAQ** — accordion with the 10 questions; first answer from the PDF, the rest need text from you.
16. **Footer** — Υπηρεσίες / Εταιρεία / Νομικά columns, social icons, copyright, "Made with <3 by Humble & Advisable".

## Scope for this first build
- Static front page only; buttons scroll to sections or are placeholders (no booking, payments or forms yet).
- Greek page title and description for sharing previews.
- Mobile layout for every section.

## Missing content I'll fill with placeholders
- Real client logos, team photos, most FAQ answers, and course booking links.

## Technical details
- Rewrite `src/routes/index.tsx`; one component per section under `src/components/home/`; content arrays in a single data file for easy edits.
- Design tokens (cream, ink, violet, rose, gradient) in `src/styles.css`; Google Fonts via `<link>` in `__root.tsx`.
- shadcn Accordion/Tabs for FAQ and methodology; CSS keyframes for the hero gradient; IntersectionObserver for stat bars.
