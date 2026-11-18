import { useState, type FormEvent } from "react";
import { ModalShell } from "./ModalShell";
import { sendContact, contactSchema } from "@/lib/contact.functions";

const field = "mt-1.5 w-full rounded-[10px] border border-foreground/15 bg-background px-3.5 py-3 text-[15px] outline-none focus:border-foreground";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Ελέγξτε τα πεδία"); return; }
    setError(""); setState("sending");
    try { await sendContact({ data: parsed.data }); setState("done"); } catch { setState("error"); }
  }
  return (
    <>
      {state === "done" ? (
        <p role="status" className="mt-8 rounded-[12px] bg-secondary p-5 text-[15px]">Ευχαριστούμε! Λάβαμε το μήνυμά σας και θα επικοινωνήσουμε σύντομα.</p>
      ) : (
        <form onSubmit={submit} noValidate className="mt-7 flex flex-col gap-4">
          <label className="text-sm font-medium">Ονοματεπώνυμο<input name="name" required maxLength={100} autoComplete="name" className={field} /></label>
          <label className="text-sm font-medium">Email<input name="email" type="email" required maxLength={255} autoComplete="email" className={field} /></label>
          <label className="text-sm font-medium">Τηλέφωνο (προαιρετικό)<input name="phone" type="tel" maxLength={30} autoComplete="tel" className={field} /></label>
          <label className="text-sm font-medium">Μήνυμα<textarea name="message" required maxLength={2000} rows={5} className={field} /></label>
          {(error || state === "error") && <p role="alert" className="text-sm text-destructive">{error || "Κάτι πήγε στραβά. Δοκιμάστε ξανά."}</p>}
          <button type="submit" disabled={state === "sending"} className="mt-2 h-12 rounded-[10px] bg-foreground px-6 text-[15px] font-medium text-background disabled:opacity-60">{state === "sending" ? "Αποστολή…" : "Αποστολή μηνύματος"}</button>
        </form>
      )}
    </>
  );
}

export function ContactModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose} labelledBy="contact-title" z="z-[210]" className="max-w-[560px] bg-background p-[clamp(28px,4vw,48px)]">
      <h2 id="contact-title" className="pr-10 text-[clamp(26px,3vw,34px)] font-semibold leading-[1.1] tracking-[-0.025em]">Επικοινωνία</h2>
      <p className="mt-3 text-[15px] text-muted-foreground">Στείλτε μας μήνυμα.</p>
      <ContactForm />
    </ModalShell>
  );
}
