"use client";

import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { FloralDivider } from "./FloralDivider";

interface VenueInfo {
  venue: string;
  address: string;
  time: string;
  mapEmbedUrl: string;
}

interface DetailsSectionProps {
  ceremony: VenueInfo;
  reception: VenueInfo;
}

function VenueCard({
  type,
  venue,
  address,
  time,
  mapEmbedUrl,
  delay,
}: VenueInfo & { type: "Cerimonia" | "Ricevimento"; delay: number }) {
  return (
    <motion.div
      className="flex flex-col overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #fff9f4 0%, #fdf5ec 100%)",
        border: "1px solid #d4b880",
        boxShadow: "0 8px 40px rgba(44,32,16,0.08)",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay }}
    >
      {/* Card header */}
      <div
        className="flex flex-col items-center gap-2 px-6 py-8"
        style={{ borderBottom: "1px solid #e8d5b8" }}
      >
        {/* Type label */}
        <div className="flex items-center gap-3">
          <div className="h-px w-8" style={{ background: "#c9a96e" }} />
          <p
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: "#c9a96e" }}
          >
            {type}
          </p>
          <div className="h-px w-8" style={{ background: "#c9a96e" }} />
        </div>

        <h3
          className="text-center text-2xl font-light sm:text-3xl"
          style={{ fontFamily: "var(--font-serif)", color: "#2c2010" }}
        >
          {venue}
        </h3>

        <div
          className="mt-1 flex flex-col items-center gap-1.5 text-sm"
          style={{ color: "#8a7060" }}
        >
          <span className="flex items-center gap-1.5">
            <MapPin size={13} style={{ color: "#c9a96e" }} />
            {address}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} style={{ color: "#c9a96e" }} />
            ore {time}
          </span>
        </div>
      </div>

      {/* Map */}
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="220"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mappa ${type}`}
        />
      </div>
    </motion.div>
  );
}

export function DetailsSection({ ceremony, reception }: DetailsSectionProps) {
  return (
    <section
      className="relative overflow-hidden px-6 py-24"
      style={{ background: "#fdf8f2" }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          className="mb-16 flex flex-col items-center gap-3 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-xs uppercase tracking-[0.4em]"
            style={{ color: "#c9a96e" }}
          >
            Vi aspettiamo
          </p>
          <h2
            className="text-3xl font-light sm:text-4xl"
            style={{ fontFamily: "var(--font-serif)", color: "#2c2010" }}
          >
            Dove e Quando
          </h2>
          <FloralDivider />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <VenueCard type="Cerimonia" {...ceremony} delay={0} />
          <VenueCard type="Ricevimento" {...reception} delay={0.15} />
        </div>
      </div>
    </section>
  );
}
