import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, XCircle, UsersRound } from "lucide-react";

interface StatsCardsProps {
  total: number;
  attending: number;
  notAttending: number;
  totalGuests: number;
}

export function StatsCards({ total, attending, notAttending, totalGuests }: StatsCardsProps) {
  const stats = [
    {
      title: "Risposte totali",
      value: total,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Partecipanti",
      value: attending,
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      title: "Non partecipanti",
      value: notAttending,
      icon: XCircle,
      color: "text-red-500",
    },
    {
      title: "Ospiti totali",
      value: totalGuests,
      icon: UsersRound,
      color: "text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map(({ title, value, icon: Icon, color }) => (
        <Card key={title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </CardTitle>
            <Icon size={16} className={color} />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
