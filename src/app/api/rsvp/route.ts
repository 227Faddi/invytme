import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { inviteCode, name, attending, dietary, message, extraGuests } = body;

  if (!inviteCode || inviteCode !== process.env.INVITE_CODE) {
    return Response.json({ error: "Codice invito non valido" }, { status: 401 });
  }

  if (!name || attending === undefined) {
    return Response.json({ error: "Campi obbligatori mancanti" }, { status: 400 });
  }

  const rsvp = await prisma.rSVP.create({
    data: {
      name: String(name),
      attending: attending === "yes",
      dietary: dietary || null,
      message: message || null,
      extraGuests: {
        create: Array.isArray(extraGuests)
          ? extraGuests
              .filter((g: { name?: string }) => g.name?.trim())
              .map((g: { name: string; dietary?: string }) => ({
                name: g.name.trim(),
                dietary: g.dietary?.trim() || null,
              }))
          : [],
      },
    },
  });

  return Response.json({ success: true, id: rsvp.id });
}
