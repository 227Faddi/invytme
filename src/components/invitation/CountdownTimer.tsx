"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FloralDivider } from "./FloralDivider";

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
    { label: "Giorni",   value: time.giorni },
    { label: "Ore",      value: time.ore },
    { label: "Minuti",   value: time.minuti },
    { label: "Secondi",  value: time.secondi },
  ];

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #fdf8f2 0%, #f5eade 50%, #fdf8f2 100%)",
      }}
      className="relative overflow-hidden px-6 py-24"
    >
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #2c2010 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

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
            className="text-xs uppercase tracking-[0.4em]"
            style={{ color: "#c9a96e" }}
          >
            Manca poco
          </p>
          <h2
            className="text-3xl font-light sm:text-4xl"
            style={{ fontFamily: "var(--font-serif)", color: "#2c2010" }}
          >
            Al grande giorno
          </h2>
          <FloralDivider />
        </div>

        {/* Countdown boxes */}
        <div className="grid grid-cols-4 gap-4 sm:gap-8">
          {units.map(({ label, value }, i) => (
            <motion.div
              key={label}
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div
                className="flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24"
                style={{
                  background: "linear-gradient(145deg, #fff9f4, #f5ead8)",
                  border: "1px solid #d4b880",
                  boxShadow:
                    "0 4px 20px rgba(201,169,110,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <span
                  className="tabular-nums text-3xl font-light sm:text-4xl"
                  style={{ fontFamily: "var(--font-serif)", color: "#a8834a" }}
                >
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <p
                className="text-xs uppercase tracking-widest"
                style={{ color: "#8a7060", letterSpacing: "0.18em" }}
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
