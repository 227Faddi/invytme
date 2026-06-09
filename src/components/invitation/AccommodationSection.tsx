"use client";

import { weddingConfig } from "@/lib/wedding-config";
import { motion } from "framer-motion";
import { BedDouble, Bus } from "lucide-react";
import { FloralDivider } from "./FloralDivider";

const t = weddingConfig.text.accommodation;

export function AccommodationSection() {
  return (
    <section
      className="relative overflow-hidden px-6 py-20"
      style={{ background: "#f3e9d8" }}
    >
      <div className="mx-auto max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-[32px] px-7 py-8"
          style={{
            background: "var(--w-card)",
            border: "1px solid var(--w-border)",
          }}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <FloralDivider />

            <span
              className="flex size-12 items-center justify-center rounded-full"
              style={{
                background: "rgba(176, 141, 79,0.12)",
                border: "1px solid rgba(176, 141, 79,0.25)",
                color: "#b08d4f",
              }}
            >
              <BedDouble size={20} />
            </span>

            <h2
              className="text-3xl sm:text-4xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "#c9a96e",
              }}
            >
              {t.title}
            </h2>

            <p
              className="max-w-md text-sm leading-relaxed"
              style={{ color: "#7c6f5a", fontSize: "1rem" }}
            >
              {t.descriptionBefore}
              <span style={{ color: "#b08d4f", fontWeight: 600 }}>
                {t.residenceName}
              </span>
              {t.descriptionAfter}
            </p>

            <div
              className="mt-2 flex items-start gap-3 rounded-2xl px-4 py-3 text-left text-sm leading-relaxed"
              style={{
                background: "#fbf5ea",
                border: "1px solid rgba(176, 141, 79,0.25)",
                color: "#7c6f5a",
              }}
            >
              <Bus
                size={18}
                className="mt-0.5 shrink-0"
                style={{ color: "#b08d4f" }}
              />
              <span>{t.shuttle}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
