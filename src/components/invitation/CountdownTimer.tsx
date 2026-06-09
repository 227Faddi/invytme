"use client";

import { weddingConfig } from "@/lib/wedding-config";
import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";

const t = weddingConfig.text.countdown;

type TimeLeft = { giorni: number; ore: number; minuti: number; secondi: number };

const ZERO: TimeLeft = { giorni: 0, ore: 0, minuti: 0, secondi: 0 };

function compute(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return ZERO;
  return {
    giorni: Math.floor(diff / (1000 * 60 * 60 * 24)),
    ore: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minuti: Math.floor((diff / (1000 * 60)) % 60),
    secondi: Math.floor((diff / 1000) % 60),
  };
}

// Module-level subscription + cached snapshot. Keeping these outside the
// component avoids re-subscribing on every render, and the cache lets
// getSnapshot return a referentially-stable value until the time actually
// changes (required by useSyncExternalStore). No render-scope mutation, so the
// React Compiler is happy.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

let cache: TimeLeft = ZERO;
function snapshotFor(target: Date): TimeLeft {
  const next = compute(target);
  if (
    next.giorni !== cache.giorni ||
    next.ore !== cache.ore ||
    next.minuti !== cache.minuti ||
    next.secondi !== cache.secondi
  ) {
    cache = next;
  }
  return cache;
}

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  // Server renders the deterministic ZERO snapshot (so SSR matches the client's
  // first paint — no hydration mismatch); after mount it reads the live value
  // and updates every second via the subscription above.
  const time = useSyncExternalStore(
    subscribe,
    () => snapshotFor(targetDate),
    () => ZERO
  );

  const units = [
    { label: t.days, value: time.giorni },
    { label: t.hours, value: time.ore },
    { label: t.minutes, value: time.minuti },
    { label: t.seconds, value: time.secondi },
  ];

  return (
    <section
      style={{ background: "#f3e9d8" }}
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
            style={{ color: "#b08d4f", letterSpacing: "0.4em" }}
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
          {t.subtitle && (
            <p
              className="text-sm uppercase sm:text-base"
              style={{ color: "#b08d4f", letterSpacing: "0.25em" }}
            >
              {t.subtitle.replace("{date}", weddingConfig.date)}
            </p>
          )}
        </div>

        {/* Countdown boxes — connected row */}
        <div
          className="grid w-full max-w-2xl grid-cols-4"
          style={{ border: "1px solid rgba(176, 141, 79,0.22)" }}
        >
          {units.map(({ label, value }, i) => (
            <motion.div
              key={label}
              className="flex flex-col items-center justify-center gap-3 py-8 sm:py-10"
              style={
                i < units.length - 1
                  ? { borderRight: "1px solid rgba(176, 141, 79,0.22)" }
                  : undefined
              }
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <span
                className="tabular-nums text-4xl sm:text-6xl"
                style={{ fontFamily: "var(--font-serif)", color: "#3a2f22" }}
              >
                {String(value).padStart(2, "0")}
              </span>
              <p
                className="text-[0.65rem] uppercase"
                style={{ color: "#7c6f5a", letterSpacing: "0.2em" }}
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
