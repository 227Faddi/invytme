"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExtraGuest {
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

export function ExportCsvButton({ rsvps }: { rsvps: RsvpRow[] }) {
  const handleExport = () => {
    const rows: string[][] = [
      ["ID", "Nome", "Partecipa", "Allergie", "Messaggio", "Ospiti extra", "Data invio"],
    ];

    for (const r of rsvps) {
      rows.push([
        r.id,
        r.name,
        r.attending ? "Sì" : "No",
        r.dietary ?? "",
        r.message ?? "",
        r.extraGuests
          .map((g) => `${g.name}${g.dietary ? ` (${g.dietary})` : ""}`)
          .join(" | "),
        new Date(r.createdAt).toLocaleString("it-IT"),
      ]);
    }

    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rsvp-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Download size={15} />
      Esporta CSV
    </Button>
  );
}
