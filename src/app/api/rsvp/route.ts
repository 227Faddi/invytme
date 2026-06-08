import FormData from "form-data";
import Mailgun from "mailgun.js";
import { NextRequest } from "next/server";

type ExtraGuest = { name?: string; dietary?: string };

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inviteCode, name, attending, dietary, message, extraGuests } = body;

    if (!inviteCode || inviteCode !== process.env.INVITE_CODE) {
      return Response.json(
        { error: "Codice invito non valido" },
        { status: 401 }
      );
    }

    if (!name || attending === undefined) {
      return Response.json(
        { error: "Campi obbligatori mancanti" },
        { status: 400 }
      );
    }

    const guests: ExtraGuest[] = Array.isArray(extraGuests)
      ? extraGuests.filter((g: ExtraGuest) => g.name?.trim())
      : [];

    const attends = attending === "yes";
    const totalGuests = (attends ? 1 : 0) + guests.length;
    const dietaryText = dietary?.trim() || "Nessuna";
    const messageText = message?.trim() || "Nessun messaggio";

    const receivedAt = new Intl.DateTimeFormat("it-IT", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Europe/Rome",
    }).format(new Date());

    // ── Plain-text version (fallback) ──────────────────────────────
    const line = "──────────────────────────────";
    const textLines = [
      attends
        ? `Nuova conferma di presenza da ${name}`
        : `${name} non potrà partecipare`,
      line,
      `Nome:        ${name}`,
      `Partecipa:   ${attends ? "Sì" : "No"}`,
      `Allergie:    ${dietaryText}`,
      "",
      `Ospiti aggiuntivi (${guests.length}):`,
      ...(guests.length
        ? guests.map(
            (g, i) =>
              `  ${i + 1}. ${g.name?.trim()}${
                g.dietary?.trim() ? ` — allergie: ${g.dietary.trim()}` : ""
              }`
          )
        : ["  Nessuno"]),
      "",
      `Totale partecipanti: ${totalGuests}`,
      "",
      "Messaggio:",
      `  ${messageText}`,
      line,
      `Ricevuto il ${receivedAt}`,
    ];

    // ── HTML version ───────────────────────────────────────────────
    const esc = (s: string) =>
      s.replace(/[&<>"]/g, (c) =>
        c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&quot;"
      );

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #efe7d8;color:#8a7a5c;font-size:13px;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;vertical-align:top;">${label}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #efe7d8;color:#2c2417;font-size:15px;">${value}</td>
      </tr>`;

    const guestsHtml = guests.length
      ? `<ul style="margin:6px 0 0;padding-left:18px;color:#2c2417;font-size:15px;">${guests
          .map(
            (g) =>
              `<li style="margin-bottom:4px;">${esc(g.name!.trim())}${
                g.dietary?.trim()
                  ? ` <span style="color:#8a7a5c;">— allergie: ${esc(
                      g.dietary.trim()
                    )}</span>`
                  : ""
              }</li>`
          )
          .join("")}</ul>`
      : `<span style="color:#9a9082;">Nessuno</span>`;

    const html = `
  <div style="background:#f4ede0;padding:24px 0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fffdf8;border:1px solid #e6dcc6;border-radius:12px;overflow:hidden;">
      <tr>
        <td style="background:linear-gradient(135deg,#c9a96e,#a8834a);padding:22px 24px;text-align:center;">
          <div style="color:#fff9ef;font-size:12px;letter-spacing:.25em;text-transform:uppercase;">Conferma di presenza</div>
          <div style="color:#fffdf8;font-size:22px;margin-top:6px;font-weight:600;">${esc(
            name
          )}</div>
          <div style="display:inline-block;margin-top:10px;padding:4px 14px;border-radius:999px;background:rgba(255,255,255,.2);color:#fff9ef;font-size:13px;">
            ${attends ? "✅ Parteciperà" : "❌ Non parteciperà"}
          </div>
        </td>
      </tr>
      <tr><td style="padding:8px 8px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${row("Nome", esc(name))}
          ${row("Partecipa", attends ? "Sì" : "No")}
          ${row("Allergie / intolleranze", esc(dietaryText))}
          ${row("Ospiti aggiuntivi", guestsHtml)}
          ${row(
            "Totale partecipanti",
            `<strong>${totalGuests}</strong>`
          )}
          ${row(
            "Messaggio",
            messageText === "Nessun messaggio"
              ? `<span style="color:#9a9082;">${messageText}</span>`
              : `<em>“${esc(messageText)}”</em>`
          )}
        </table>
      </td></tr>
      <tr>
        <td style="padding:16px 24px;text-align:center;color:#9a9082;font-size:12px;">
          Ricevuto il ${esc(receivedAt)}
        </td>
      </tr>
    </table>
  </div>`;

    const emailData = {
      from: process.env.MAILGUN_FROM_EMAIL as string,
      to: process.env.RSVP_RECIPIENT_EMAIL as string,
      subject: `RSVP — ${name} ${attends ? "✅ partecipa" : "❌ non partecipa"}`,
      text: textLines.join("\n"),
      html,
    };

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY as string,
      url: process.env.MAILGUN_URL,
    });

    await mg.messages.create(process.env.MAILGUN_DOMAIN as string, emailData);

    return Response.json({ success: true });
  } catch (error) {
    console.error("RSVP submission error:", error);
    return Response.json({ error: "Errore nell'invio" }, { status: 500 });
  }
}
