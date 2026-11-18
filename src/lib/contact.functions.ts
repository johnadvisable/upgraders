import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Συμπληρώστε το όνομά σας").max(100),
  email: z.string().trim().email("Μη έγκυρο email").max(255),
  phone: z.string().trim().max(30).optional().default(""),
  message: z.string().trim().min(1, "Γράψτε το μήνυμά σας").max(2000),
});

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Sent directly via the Resend API using the project's RESEND_API_KEY secret (verified domain upgraders.gr). Recipient stays server-side.
export const sendContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const resendKey = process.env["RESEND_API_KEY"];
    if (!resendKey) throw new Error("email_not_configured");
    const rows = [["Ονοματεπώνυμο", data.name], ["Email", data.email], ["Τηλέφωνο", data.phone || "—"]]
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td>${esc(v ?? "")}</td></tr>`).join("");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: "The Upgraders <contact@upgraders.gr>",
        to: ["vkallaras@advisable.com", "nikos@humble.gr", "n.xydas@humble.gr", "panos@advisable.com"],
        reply_to: data.email,
        subject: `Νέο μήνυμα από ${data.name} (The Upgraders)`,
        html: `<table>${rows}</table><p style="white-space:pre-wrap">${esc(data.message)}</p>`,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Resend send failed [${res.status}]: ${body}`);
      throw new Error(`send_failed [${res.status}]`);
    }
    return { ok: true };
  });
