"use client";

import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { FloralDivider } from "./FloralDivider";

interface VenueInfo {
  venue: string;
  address: string;
  time: string;
  mapEmbedUrl: string;
}

interface DetailsSectionProps {
  ceremony: VenueInfo;
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
      className="flex w-full flex-col overflow-hidden"
      style={{
        background: "#1e1a15",
        border: "1px solid rgba(201,169,110,0.18)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay }}
    >
      {/* Card header */}
      <div
        className="flex flex-col items-center gap-2 px-6 py-8"
        style={{ borderBottom: "1px solid rgba(201,169,110,0.15)" }}
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
          className="text-center text-3xl sm:text-4xl"
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            color: "#ece2d2",
          }}
        >
          {venue}
        </h3>

        <div
          className="mt-1 flex flex-col items-center gap-1.5 text-sm"
          style={{ color: "#9a9082" }}
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
      <div className="relative overflow-hidden" style={{ height: 420 }}>
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="420"
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

export function DetailsSection({ ceremony }: DetailsSectionProps) {
  return (
    <section
      className="relative overflow-hidden px-6 py-24"
      style={{ background: "#15120e" }}
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
            Dove ci troviamo
          </p>
          <h2
            className="text-4xl sm:text-5xl"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "#d3b884",
            }}
          >
            La location
          </h2>
          <p className="text-sm" style={{ color: "#9a9082" }}>
            Tutto quello che devi sapere per raggiungerci
          </p>
          <FloralDivider />
        </motion.div>

        <div className="mx-auto max-w-2xl">
          <VenueCard type="Cerimonia" {...ceremony} delay={0} />
        </div>
      </div>
    </section>
  );
}
