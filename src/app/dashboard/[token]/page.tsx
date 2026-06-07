import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { GuestTable } from "@/components/dashboard/GuestTable";
import { ExportCsvButton } from "@/components/dashboard/ExportCsvButton";
import { Heart, AlertCircle } from "lucide-react";

interface Props {
  params: Promise<{ token: string }>;
}

export default async function DashboardPage({ params }: Props) {
  const { token } = await params;

  if (!process.env.DASHBOARD_TOKEN || token !== process.env.DASHBOARD_TOKEN) {
    notFound();
  }

  let rsvps: Awaited<ReturnType<typeof prisma.rSVP.findMany<{ include: { extraGuests: true } }>>> = [];
  let dbError = false;

  try {
    rsvps = await prisma.rSVP.findMany({
      orderBy: { createdAt: "desc" },
      include: { extraGuests: true },
    });
  } catch {
    dbError = true;
  }

  type RsvpWithExtras = (typeof rsvps)[number];
  const attending = rsvps.filter((r: RsvpWithExtras) => r.attending).length;
  const notAttending = rsvps.filter((r: RsvpWithExtras) => !r.attending).length;
  const totalGuests = rsvps
    .filter((r: RsvpWithExtras) => r.attending)
    .reduce((sum: number, r: RsvpWithExtras) => sum + r.extraGuests.length + 1, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-rose-400" />
              <h1 className="text-2xl font-semibold">Dashboard Matrimonio</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Panoramica delle risposte degli invitati
            </p>
          </div>
          {!dbError && <ExportCsvButton rsvps={rsvps} />}
        </div>

        {/* DB error banner */}
        {dbError && (
          <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-500" />
            <div>
              <p className="font-medium">Database non connesso</p>
              <p className="mt-0.5 text-amber-700">
                Configura la variabile <code className="rounded bg-amber-100 px-1">DATABASE_URL</code> in{" "}
                <code className="rounded bg-amber-100 px-1">.env.local</code> ed esegui{" "}
                <code className="rounded bg-amber-100 px-1">pnpm exec prisma migrate dev</code> per creare le tabelle.
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <StatsCards
          total={rsvps.length}
          attending={attending}
          notAttending={notAttending}
          totalGuests={totalGuests}
        />

        {/* Table */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold">
            Tutti gli invitati ({rsvps.length})
          </h2>
          <GuestTable rsvps={rsvps} />
        </div>
      </div>
    </div>
  );
}
