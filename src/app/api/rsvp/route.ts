import { NextRequest } from "next/server";
import FormData from "form-data";
import Mailgun from "mailgun.js";

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

    const guestsText = guests.length
      ? guests
          .map(
            (g, i) =>
              `   ${i + 1}. ${g.name?.trim()}${
                g.dietary?.trim() ? ` — ${g.dietary.trim()}` : ""
              }`
          )
          .join("\n")
      : "Nessun ospite aggiuntivo";

    const emailData = {
      from: process.env.MAILGUN_FROM_EMAIL as string,
      to: process.env.RSVP_RECIPIENT_EMAIL as string,
      subject: `Nuovo RSVP da ${name}`,
      text: `
        Nuova conferma di presenza ricevuta:

        👤 Nome: ${name}
        ✅ Partecipa: ${attending === "yes" ? "Sì" : "No"}
        🍽️ Intolleranze/allergie: ${dietary?.trim() || "Nessuna"}

        👥 Ospiti aggiuntivi:
${guestsText}

        💬 Messaggio: ${message?.trim() || "Nessun messaggio"}
        `,
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
