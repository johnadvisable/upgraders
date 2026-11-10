export const clients = ["Insurance Market", "Seajets", "Stoiximan", "GBL", "Wecare", "Edructer", "Jacobs", "Νέα Οδός", "Κεντρική Οδός", "sebamed", "Galerie de Beauté", "chillbox"];

export const courses = [
  { title: "AI for Business", tools: "ChatGPT, Claude, Copilot · Projects, Skills, MCP connectors", date: "12 & 13 Νοεμβρίου 2026", time: "10:00 – 14:00", modes: ["On site", "Online"], price: "189 €", status: "open" as const },
  { title: "AI για Managers", tools: "Claude, NotebookLM · Αποφάσεις, reporting, ροές ομάδας", date: "3 Δεκεμβρίου 2026", time: "09:30 – 17:30", modes: ["Online"], price: "249 €", status: "open" as const },
  { title: "AI for Business", tools: "ChatGPT, Claude, Copilot · Projects, Skills, MCP connectors", date: "24 & 25 Σεπτεμβρίου 2026", time: "15:00 – 19:00", modes: ["On site", "Online"], price: "", status: "done" as const },
];

export const roles = [
  ["Leadership", "CEO, διοίκηση, ιδιοκτήτες. Αποφάσεις, στρατηγική και κανόνες χρήσης AI για όλη την εταιρεία."],
  ["Managers", "Οργάνωση ομάδας, reporting, συναντήσεις και παρακολούθηση στόχων με AI."],
  ["Sales & Marketing", "Προσφορές, έρευνα πελατών, καμπάνιες και περιεχόμενο σε κλάσμα του χρόνου."],
  ["Finance & Λογιστήριο", "Ανάλυση, συμφωνίες, τιμολόγια και αναφορές με λιγότερα χειροκίνητα βήματα."],
  ["HR", "Προσλήψεις, onboarding, εσωτερική επικοινωνία και πολιτικές."],
  ["Εξυπηρέτηση πελατών", "Γρηγορότερες, συνεπείς απαντήσεις πάνω στη γνώση της εταιρείας."],
  ["Operations & Supply Chain", "Παραγγελίες, αποθέματα, προμηθευτές και καθημερινές ροές."],
  ["Developers & IT", "Coding agents, αυτοματισμοί και ασφαλής υποδομή AI, με το DeepSkill."],
];

export const industries = [
  ["Ναυτιλία", "Εγχειρίδια, ανταλλακτικά, chartering και επικοινωνία με πλοία."],
  ["Τουρισμός & Φιλοξενία", "Κρατήσεις, guest experience και διαχείριση ομάδων εποχικού προσωπικού."],
  ["Retail & E-commerce", "Περιγραφές προϊόντων, καμπάνιες, εξυπηρέτηση και πωλήσεις online."],
  ["Real Estate", "Αγγελίες, ξεναγήσεις, επικοινωνία με ενδιαφερόμενους και συμβόλαια."],
  ["Τράπεζες & Ασφάλειες", "AI με αυστηρή συμμόρφωση, έλεγχο και πλήρη καταγραφή."],
  ["Φάρμακο & Υγεία", "Ιατρικό περιεχόμενο με έλεγχο ακρίβειας, εκπαίδευση και εξυπηρέτηση."],
  ["Τρόφιμα & FMCG", "Πωλήσεις πεδίου, διανομή, προβλέψεις και trade marketing."],
  ["Ενέργεια", "Τεχνική τεκμηρίωση, έργα, αδειοδοτήσεις και αναφορές."],
  ["Λογιστικά & Νομικά γραφεία", "Έρευνα, σύνταξη εγγράφων και διαχείριση πελατών σε λιγότερο χρόνο."],
];

export const opportunities = [
  ["Προσφορές B2B", "ΠΩΛΗΣΕΙΣ", 92],
  ["Απαντήσεις σε email πελατών", "ΕΞΥΠΗΡΕΤΗΣΗ", 84],
  ["Αντιστοίχιση τιμολογίων", "ΛΟΓΙΣΤΗΡΙΟ", 77],
  ["Εβδομαδιαία reports", "ΔΙΟΙΚΗΣΗ", 61],
  ["Onboarding νέων συνεργατών", "HR", 48],
] as const;

export const steps = [
  { key: "ΔΙΑΓΝΩΣΗ", h: "Βρίσκουμε πού ", hi: "αξίζει", h2: " το AI, για εσάς.", text: "Μελετάμε πώς δουλεύει πραγματικά η ομάδα σας, εντοπίζουμε πού το AI δημιουργεί μετρήσιμη αξία, και αποφασίζουμε τι αξίζει να χτιστεί πριν ξοδέψετε σε ανάπτυξη.", bullets: ["Οι ευκαιρίες με τη μεγαλύτερη αξία", "Ιεραρχημένες ανά επίδραση και εφικτότητα", "Καθαρός οδικός χάρτης πριν χτιστεί οτιδήποτε"] },
  { key: "ΠΡΟΤΕΡΑΙΟΤΗΤΕΣ", h: "Αποφασίζουμε ", hi: "τι χτίζεται πρώτο.", h2: "", text: "Ιεραρχούμε τις ευκαιρίες με βάση την αξία, την εφικτότητα και το ROI, και αποφασίζουμε τι χτίζεται πρώτο.", bullets: [] as string[] },
  { key: "ΥΛΟΠΟΙΗΣΗ", h: "Το βάζουμε ", hi: "σε παραγωγή.", h2: "", text: "Συνδέουμε τα σωστά δεδομένα και εργαλεία, δοκιμάζουμε το σύστημα σε πραγματικές περιπτώσεις και το βάζουμε σε παραγωγή.", bullets: [] as string[] },
  { key: "ΕΞΕΛΙΞΗ", h: "Βελτιώνουμε ", hi: "ό,τι δουλεύει.", h2: "", text: "Παρακολουθούμε την υιοθέτηση και την απόδοση, βελτιώνουμε ό,τι λειτουργεί, και επεκτεινόμαστε μόνο όταν η επόμενη ροή έχει καθαρό business case.", bullets: [] as string[] },
];

export const cases = [
  { name: "Insurance Market", sector: "Ασφαλιστική διαμεσολάβηση", release: "RELEASE 2.0", gradient: "radial-gradient(90% 120% at 0% 0%,#8B78B8,transparent 60%),linear-gradient(120deg,#4E4380,#A07085)", label: "Ώρες που εξοικονομήθηκαν τον μήνα", hero: "420", heroBadge: "−31%", rows: [["Χρόνος σύνταξης προσφοράς", "Ανά αίτημα πελάτη", "−82%"], ["Ομάδα σε ενεργή χρήση AI", "Μετά από 8 εβδομάδες", "94%"], ["Απόδοση επένδυσης", "Εκπαίδευση + σύστημα", "4,1×"]] },
  { name: "ΟΣΦΕ", sector: "Ομοσπονδία Συνεταιρισμών Φαρμακοποιών Ελλάδας", release: "RELEASE 1.4", gradient: "radial-gradient(90% 120% at 100% 0%,#93A884,transparent 60%),linear-gradient(120deg,#2F4A40,#6F8A6A)", label: "Φαρμακεία που εξυπηρετεί το σύστημα", hero: "1.100+", heroBadge: "Live", rows: [["Χρόνος απάντησης σε ερωτήματα", "Από ώρες σε δευτερόλεπτα", "12''"], ["Στελέχη που εκπαιδεύτηκαν", "Σε 3 εβδομάδες", "60"], ["Αυτόματες αναφορές / μήνα", "Αντί για χειροκίνητες", "140"]] },
  { name: "Wecare", sector: "Υπηρεσίες υγείας", release: "RELEASE 3.1", gradient: "radial-gradient(90% 120% at 0% 100%,#D3A0A8,transparent 60%),linear-gradient(120deg,#7E6A63,#A4677A)", label: "Περισσότερα ποιοτικά leads / εβδομάδα", hero: "3,2×", heroBadge: "+220%", rows: [["Χρόνος πρώτης απάντησης", "Σε νέους ενδιαφερόμενους", "−74%"], ["Εργασίες που αυτοματοποιήθηκαν", "Στο τμήμα πωλήσεων", "18"], ["Υιοθέτηση εργαλείων", "Μετά το Sprint", "88%"]] },
  { name: "Pharmacy Discount", sector: "Αλυσίδα φαρμακείων", release: "RELEASE 2.2", gradient: "radial-gradient(90% 120% at 100% 100%,#9886C9,transparent 60%),linear-gradient(120deg,#36366E,#6B5791)", label: "Χρόνος παραγωγής περιεχομένου", hero: "−46%", heroBadge: "−46%", rows: [["Περιγραφές προϊόντων / εβδομάδα", "Με έλεγχο ακρίβειας", "600"], ["Καμπάνιες που τρέχουν παράλληλα", "Ανά μήνα", "12"], ["Κόστος ανά καμπάνια", "Εσωτερικοί πόροι", "−38%"]] },
];

export type ToolTag = "Πωλήσεις" | "Εξυπηρέτηση" | "Λειτουργίες" | "Περιεχόμενο" | "Κλαδικά";
export const tools: { name: string; text: string; tag: ToolTag; meta: string; chip1: string; chip2: string }[] = [
  { name: "Proposal Generation System", text: "Επαγγελματικές προτάσεις σε λεπτά.", tag: "Πωλήσεις", meta: "B2B", chip1: "Πρόταση #208 · 14 σελίδες", chip2: "Έτοιμη σε 4'" },
  { name: "Hospitality Booking Assistant", text: "Βοηθός κρατήσεων για ξενοδοχεία, 24/7.", tag: "Κλαδικά", meta: "Τουρισμός", chip1: "Κράτηση · 2 νύχτες ✓", chip2: "Απάντηση σε 3''" },
  { name: "AI Sales Chatbot για Eshops", text: "Chatbot που προτείνει προϊόντα και κλείνει πωλήσεις.", tag: "Πωλήσεις", meta: "E-commerce", chip1: "«Ψάχνω δώρο έως 50€»", chip2: "3 προτάσεις · 1 στο καλάθι" },
  { name: "B2B Email Sales System", text: "Αυτοματοποιημένες προσωποποιημένες καμπάνιες email για B2B πωλήσεις.", tag: "Πωλήσεις", meta: "B2B", chip1: "Νέο lead · Ποιοτικό ✓", chip2: "Καμπάνια Q4 · 38% opens" },
  { name: "E-commerce Campaign Automation", text: "Αυτοματοποιημένες καμπάνιες για eshops.", tag: "Περιεχόμενο", meta: "E-commerce", chip1: "Black Friday · 3 segments", chip2: "Προγραμματίστηκε ✓" },
  { name: "AI Support Assistant", text: "Απαντήσεις εξυπηρέτησης πάνω στη γνώση της εταιρείας.", tag: "Εξυπηρέτηση", meta: "Όλοι οι κλάδοι", chip1: "Απάντηση σε 3''", chip2: "Πηγή: Πολιτική επιστροφών §4" },
  { name: "AI Prospect Qualification", text: "Αξιολόγηση και ιεράρχηση υποψήφιων πελατών.", tag: "Πωλήσεις", meta: "B2B", chip1: "Score 87 · Ζεστός lead", chip2: "Προτεραιότητα: Υψηλή" },
  { name: "Voice-to-CRM for Field Sales", text: "Από φωνητική σημείωση σε εγγραφή CRM.", tag: "Πωλήσεις", meta: "Field sales", chip1: "Φωνητική σημείωση · 0:42", chip2: "CRM ενημερώθηκε ✓" },
  { name: "Property Tour AI Assistant", text: "Ξεναγός ακινήτων που απαντά σε ενδιαφερόμενους.", tag: "Κλαδικά", meta: "Real Estate", chip1: "«Έχει θέση πάρκινγκ;»", chip2: "Ξενάγηση · Πέμπτη 11:00" },
  { name: "Invoice & Delivery Note Matching", text: "Αυτόματη αντιστοίχιση τιμολογίων και δελτίων αποστολής.", tag: "Λειτουργίες", meta: "Όλοι οι κλάδοι", chip1: "Τιμολόγιο ↔ Δελτίο: Ταιριάζει", chip2: "Απόκλιση: 0,00 €" },
  { name: "Social Media Carousel System", text: "Carousels για social media σε κλίμακα.", tag: "Περιεχόμενο", meta: "Social", chip1: "Carousel · 8 slides", chip2: "Brand check ✓" },
  { name: "Campaign Production System", text: "Παραγωγή καμπανιών από το brief μέχρι το τελικό υλικό.", tag: "Περιεχόμενο", meta: "Marketing", chip1: "Brief → 24 assets", chip2: "Έγκριση · 1 εκκρεμεί" },
  { name: "AI Operations From Your Phone", text: "Διαχείριση λειτουργιών μέσα από το κινητό.", tag: "Λειτουργίες", meta: "Mobile", chip1: "«Στείλε το report της εβδομάδας»", chip2: "Εστάλη σε 6 παραλήπτες ✓" },
  { name: "Medical Content Engine", text: "Παραγωγή ιατρικού περιεχομένου με έλεγχο ακρίβειας.", tag: "Περιεχόμενο", meta: "Υγεία", chip1: "Έλεγχος ακρίβειας · 12/12 ✓", chip2: "Άρθρο έτοιμο για review" },
  { name: "Regulated AI Assistant", text: "Βοηθός AI για αυστηρά ρυθμιζόμενους κλάδους.", tag: "Κλαδικά", meta: "Τράπεζες & Ασφάλειες", chip1: "Έλεγχος συμμόρφωσης ✓", chip2: "Audit log · καταγράφηκε" },
  { name: "Vessel Manuals & Spare Parts", text: "Άμεση αναζήτηση σε εγχειρίδια πλοίων και ανταλλακτικά.", tag: "Κλαδικά", meta: "Ναυτιλία", chip1: "Part 4417-B · Σε απόθεμα", chip2: "Εγχειρίδιο κινητήρα · σελ. 212" },
  { name: "AI Video Editing Pipeline", text: "Αυτοματοποιημένο μοντάζ βίντεο.", tag: "Περιεχόμενο", meta: "Video", chip1: "Raw 42' → Τελικό 90''", chip2: "Υπότιτλοι EL / EN ✓" },
  { name: "Multi-Agent Operations System", text: "Πολλοί AI agents που συνεργάζονται σε σύνθετες ροές.", tag: "Λειτουργίες", meta: "Enterprise", chip1: "4 agents σε συνεργασία", chip2: "Βήμα 3/5 · Έλεγχος" },
  { name: "Real-Time Voice Research Agent", text: "Φωνητικός agent που κάνει έρευνα σε πραγματικό χρόνο.", tag: "Λειτουργίες", meta: "Research", chip1: "«Βρες τιμές ανταγωνισμού»", chip2: "18 πηγές · Live" },
  { name: "Patent Research & FTO", text: "Έρευνα διπλωμάτων ευρεσιτεχνίας και ελευθερίας χρήσης.", tag: "Κλαδικά", meta: "Νομικά", chip1: "214 διπλώματα σαρώθηκαν", chip2: "FTO: Χαμηλός κίνδυνος" },
  { name: "AI Agent Identity & Email Infrastructure", text: "Υποδομή ταυτότητας και email για AI agents.", tag: "Λειτουργίες", meta: "Υποδομή", chip1: "agent@company.gr · Ενεργό", chip2: "SPF · DKIM ✓" },
];

export const team = [
  { name: "Νίκος Ξυδάς", role: "Founder · Entrepreneur · Trainer · Content Creator · Marketer", img: "/team-0.webp" },
  { name: "Βασίλης Καλλάρας", role: "Founder · Entrepreneur · Trainer · Lead Engineer", img: "/team-1.webp" },
  { name: "Πάνος Καλλάρας", role: "Lead Engineer · Partner · Trainer", img: "/team-2.webp" },
  { name: "Ναστάζια Ταμπακοπούλου", role: "Founder · Marketing Director · Trainer", img: "/team-3.webp" },
  { name: "Νίκος Σταθόπουλος", role: "Business Lead. Πρώην Sales Director, [Εταιρεία]", img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Κατερίνα Ηλιοπούλου", role: "Design Lead · Product Design, [Εταιρεία]", img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

const tbd = "Σύντομα θα προστεθεί αναλυτική απάντηση. Επικοινωνήστε μαζί μας για λεπτομέρειες.";
export const faqs: [string, string][] = [
  ["Τι κάνει η The Upgraders;", "Έχουμε δημιουργήσει σε μορφή υπηρεσίας αυτό που κάναμε μέσα στις δικές μας επιχειρήσεις, για να μειώσουμε κόστη και να αυξήσουμε την παραγωγικότητα, χρησιμοποιώντας την τεχνητή νοημοσύνη. Πιο συγκεκριμένα, εκπαιδεύουμε τους ανθρώπους σας να δουλεύουν με AI, ανά ρόλο και αντικείμενο και χτίζουμε custom συστήματα AI μέσα στην εταιρεία σας. Πάνω στις δικές σας διαδικασίες, με αποτέλεσμα που μετριέται. Στο τέλος της μέρας, θέλουμε μετρήσιμο αποτέλεσμα σε εξοικονόμηση κόστους, αύξηση ταχύτητας και εσόδων."],
  ...[
    "Τι είναι το 8h AI Sprint Upgrade;",
    "Τι είναι το Εταιρικό AI Upgrade;",
    "Μπορούμε να ξεκινήσουμε με το 8ώρο Sprint και μετά να προχωρήσουμε σε κάτι πιο εξειδικευμένο;",
    "Πόσο κοστίζει;",
    "Πόσα άτομα χωράει κάθε εκπαίδευση;",
    "Πού γίνεται η εκπαίδευση;",
    "Ποια εργαλεία διδάσκετε;",
    "Τι γίνεται με τα δεδομένα μας;",
    "Ποια η διαφορά εκπαίδευσης και custom software;",
  ].map((q) => [q, tbd] as [string, string]),
];
