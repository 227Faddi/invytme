"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";

const t = weddingConfig.text.countdown;

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { giorni: 0, ore: 0, minuti: 0, secondi: 0 };
  return {
    giorni: Math.floor(diff / (1000 * 60 * 60 * 24)),
    ore: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minuti: Math.floor((diff / (1000 * 60)) % 60),
    secondi: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [time, setTime] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: t.days,    value: time.giorni },
    { label: t.hours,   value: time.ore },
    { label: t.minutes, value: time.minuti },
    { label: t.seconds, value: time.secondi },
  ];

  return (
    <section
      style={{ background: "#15120e" }}
      className="relative overflow-hidden px-6 py-24"
    >
      <motion.div
        className="relative mx-auto flex max-w-3xl flex-col items-center gap-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
      >
        {/* Heading */}
        <div className="flex flex-col items-center gap-3 text-center">
          <p
            className="text-xs uppercase"
            style={{ color: "#c9a96e", letterSpacing: "0.4em" }}
          >
            {t.label}
          </p>
          <h2
            className="text-4xl sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#d3b884" }}
          >
            {t.title}
          </h2>
        </div>

        {/* Countdown boxes — connected row */}
        <div
          className="grid w-full max-w-2xl grid-cols-4"
          style={{ border: "1px solid rgba(201,169,110,0.22)" }}
        >
          {units.map(({ label, value }, i) => (
            <motion.div
              key={label}
              className="flex flex-col items-center justify-center gap-3 py-8 sm:py-10"
              style={
                i < units.length - 1
                  ? { borderRight: "1px solid rgba(201,169,110,0.22)" }
                  : undefined
              }
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <span
                className="tabular-nums text-4xl sm:text-6xl"
                style={{ fontFamily: "var(--font-serif)", color: "#ece2d2" }}
              >
                {String(value).padStart(2, "0")}
              </span>
              <p
                className="text-[0.65rem] uppercase"
                style={{ color: "#9a9082", letterSpacing: "0.2em" }}
              >
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
