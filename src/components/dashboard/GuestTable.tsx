"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ExtraGuest {
  id: string;
  name: string;
  dietary: string | null;
}

interface RsvpRow {
  id: string;
  name: string;
  attending: boolean;
  dietary: string | null;
  message: string | null;
  createdAt: Date;
  extraGuests: ExtraGuest[];
}

type DialogData =
  | { type: "guests"; guests: ExtraGuest[]; guestName: string }
  | { type: "message"; message: string; guestName: string }
  | null;

export function GuestTable({ rsvps }: { rsvps: RsvpRow[] }) {
  const [dialog, setDialog] = useState<DialogData>(null);

  return (
    <>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Presenza</TableHead>
              <TableHead>Allergie</TableHead>
              <TableHead>Ospiti extra</TableHead>
              <TableHead>Messaggio</TableHead>
              <TableHead className="text-right">Data invio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rsvps.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                  Nessuna risposta ancora.
                </TableCell>
              </TableRow>
            )}
            {rsvps.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell>
                  {r.attending ? (
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                      Partecipa
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="bg-red-100 text-red-600 hover:bg-red-100">
                      Non partecipa
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="max-w-[160px] truncate text-sm text-muted-foreground">
                  {r.dietary || "—"}
                </TableCell>
                <TableCell>
                  {r.extraGuests.length > 0 ? (
                    <button
                      onClick={() =>
                        setDialog({
                          type: "guests",
                          guests: r.extraGuests,
                          guestName: r.name,
                        })
                      }
                      className="text-sm text-blue-600 underline-offset-2 hover:underline"
                    >
                      {r.extraGuests.length} ospite{r.extraGuests.length > 1 ? "i" : ""}
                    </button>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {r.message ? (
                    <button
                      onClick={() =>
                        setDialog({
                          type: "message",
                          message: r.message!,
                          guestName: r.name,
                        })
                      }
                      className="max-w-[160px] truncate text-left text-sm text-blue-600 underline-offset-2 hover:underline"
                    >
                      {r.message.length > 40
                        ? r.message.slice(0, 40) + "…"
                        : r.message}
                    </button>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">
                  {new Date(r.createdAt).toLocaleString("it-IT", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!dialog} onOpenChange={(open) => !open && setDialog(null)}>
        <DialogContent>
          {dialog?.type === "guests" && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Ospiti di {dialog.guestName}
                </DialogTitle>
              </DialogHeader>
              <ul className="space-y-3">
                {dialog.guests.map((g) => (
                  <li
                    key={g.id}
                    className="rounded-md border p-3 text-sm"
                  >
                    <p className="font-medium">{g.name}</p>
                    {g.dietary && (
                      <p className="text-muted-foreground">
                        Allergie: {g.dietary}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {dialog?.type === "message" && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Messaggio di {dialog.guestName}
                </DialogTitle>
              </DialogHeader>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {dialog.message}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
