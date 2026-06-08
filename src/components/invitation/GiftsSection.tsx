"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Copy, Check } from "lucide-react";
import { FloralDivider } from "./FloralDivider";
import { weddingConfig } from "@/lib/wedding-config";

const t = weddingConfig.text.gifts;

interface GiftsSectionProps {
  blurb: string;
  cardTitle: string;
  description: string;
  iban: string;
}

export function GiftsSection({ blurb, cardTitle, description, iban }: GiftsSectionProps) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyIban = async () => {
    try {
      await navigator.clipboard.writeText(iban.replace(/\s+/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section className="relative overflow-hidden px-6 py-24" style={{ background: "#15120e" }}>
      <div className="mx-auto max-w-xl">
        {/* Heading */}
        <motion.div
          className="mb-12 flex flex-col items-center gap-3 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <FloralDivider />
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "#c9a96e" }}>
            {t.label}
          </p>
          <h2
            className="text-4xl sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#d3b884" }}
          >
            {t.title}
          </h2>
          <p
            className="max-w-md text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#9a9082", fontSize: "1.05rem" }}
          >
            {blurb}
          </p>
        </motion.div>

        {/* Contributo card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ background: "#1e1a15", border: "1px solid rgba(201,169,110,0.18)" }}
        >
          {/* Card header */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid rgba(201,169,110,0.15)" }}
          >
            <span
              className="text-lg"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#ece2d2" }}
            >
              {cardTitle}
            </span>
            <button
              type="button"
              onClick={() => setRevealed((r) => !r)}
              className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] transition-colors"
              style={{ color: "#c9a96e" }}
            >
              <Sparkles size={12} />
              {revealed ? t.hide : t.reveal}
            </button>
          </div>

          {/* Card body */}
          {revealed && (
            <motion.div
              className="space-y-4 px-6 py-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "#9a9082" }}>
                {description}
              </p>

              {/* IBAN */}
              <div
                className="px-4 py-3 text-sm tracking-wider"
                style={{
                  background: "#15120e",
                  border: "1px solid rgba(201,169,110,0.25)",
                  fontFamily: "var(--font-mono)",
                  color: "#ece2d2",
                }}
              >
                {iban}
              </div>

              {/* Copy button */}
              <button
                type="button"
                onClick={copyIban}
                className="flex w-full items-center justify-center gap-2 py-3 text-xs uppercase tracking-[0.2em] transition-colors"
                style={{ border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e" }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? t.copied : t.copy}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
