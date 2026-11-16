import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Συμπληρώστε το όνομά σας").max(100),
  email: z.string().trim().email("Μη έγκυρο email").max(255),
  phone: z.string().trim().max(30).optional().default(""),
  message: z.string().trim().min(1, "Γράψτε το μήνυμά σας").max(2000),
});

// The recipient address stays on the server so it never appears in the page.
export const sendContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const res = await fetch("https://formsubmit.co/ajax/xydas.n@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Origin: "https://upgraters.advisable.link", Referer: "https://upgraters.advisable.link/" },
      body: JSON.stringify({ ...data, _subject: `Νέο μήνυμα από ${data.name} (The Upgraders)`, _replyto: data.email, _template: "table", _captcha: "false" }),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
    if (!res.ok || String(json.success) !== "true") throw new Error(json.message || "send_failed");
    return { ok: true };
  });
