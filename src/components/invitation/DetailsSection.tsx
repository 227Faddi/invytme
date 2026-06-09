"use client";

import { weddingConfig } from "@/lib/wedding-config";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { FloralDivider } from "./FloralDivider";

const t = weddingConfig.text.details;

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
}: VenueInfo & { type: string; delay: number }) {
  return (
    <motion.div
      className="flex w-full flex-col overflow-hidden rounded-[32px]"
      style={{
        background: "#fdf8f0",
        border: "1px solid rgba(176, 141, 79,0.18)",
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
        style={{ borderBottom: "1px solid rgba(176, 141, 79,0.15)" }}
      >
        {/* Type label */}
        <div className="flex items-center gap-3">
          <div className="h-px w-8" style={{ background: "#b08d4f" }} />
          <p
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: "#b08d4f" }}
          >
            {type}
          </p>
          <div className="h-px w-8" style={{ background: "#b08d4f" }} />
        </div>

        <h3
          className="text-center text-3xl sm:text-4xl"
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            color: "#3a2f22",
          }}
        >
          {venue}
        </h3>

        <div
          className="mt-1 flex flex-col items-center gap-1.5 text-sm"
          style={{ color: "#7c6f5a" }}
        >
          <span className="flex items-center gap-1.5">
            <MapPin size={13} style={{ color: "#b08d4f" }} />
            {address}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} style={{ color: "#b08d4f" }} />
            {t.timePrefix} {time}
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
      style={{ background: "#f3e9d8" }}
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
            style={{ color: "#b08d4f" }}
          >
            {t.label}
          </p>
          <h2
            className="text-4xl sm:text-5xl"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "#c9a96e",
            }}
          >
            {t.title}
          </h2>
          <p className="text-sm" style={{ color: "#7c6f5a" }}>
            {t.subtitle}
          </p>
          <FloralDivider />
        </motion.div>

        <div className="mx-auto max-w-2xl">
          <VenueCard type={t.ceremonyLabel} {...ceremony} delay={0} />
        </div>
      </div>
    </section>
  );
}
