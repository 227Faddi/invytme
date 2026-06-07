"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  groomName: string;
  brideName: string;
  date: string;
  city: string;
}

export function HeroSection({ groomName, brideName, date, city }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background: photo with warm gradient fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          background: "url('/images/hero-bg.jpg') center/cover no-repeat, linear-gradient(160deg, #1a0d08 0%, #2e1810 25%, #4a2c18 50%, #3a2010 75%, #1a0d08 100%)",
        }}
      />

      {/* Warm overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,8,4,0.55) 0%, rgba(30,16,8,0.3) 40%, rgba(30,16,8,0.3) 60%, rgba(15,8,4,0.7) 100%)",
        }}
      />

      {/* Gold vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 120px rgba(0,0,0,0.6)",
        }}
      />

      {/* Thin gold frame */}
      <div
        className="absolute inset-4 pointer-events-none hidden sm:block"
        style={{ border: "1px solid rgba(201,169,110,0.2)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
        {/* Top label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="text-xs font-light uppercase"
          style={{ color: "rgba(201,169,110,0.8)", letterSpacing: "0.35em" }}
        >
          Insieme per sempre
        </motion.p>

        {/* Gold line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-px w-16"
          style={{ background: "linear-gradient(to right, transparent, #c9a96e, transparent)" }}
        />

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.7 }}
          className="flex flex-col items-center gap-1"
        >
          <h1
            className="font-light leading-none tracking-wide"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(3rem, 10vw, 7rem)",
              color: "#fdf0dc",
              textShadow: "0 2px 30px rgba(0,0,0,0.5)",
            }}
          >
            {groomName}
          </h1>
          <span
            className="font-light"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
              color: "#c9a96e",
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            }}
          >
            &amp;
          </span>
          <h1
            className="font-light leading-none tracking-wide"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(3rem, 10vw, 7rem)",
              color: "#fdf0dc",
              textShadow: "0 2px 30px rgba(0,0,0,0.5)",
            }}
          >
            {brideName}
          </h1>
        </motion.div>

        {/* Gold line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="h-px w-16"
          style={{ background: "linear-gradient(to right, transparent, #c9a96e, transparent)" }}
        />

        {/* Date & city */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6 }}
          className="flex flex-col items-center gap-1"
        >
          <p
            className="text-xl font-light tracking-widest sm:text-2xl"
            style={{ color: "rgba(253,240,220,0.9)" }}
          >
            {date}
          </p>
          <p
            className="text-xs font-light uppercase tracking-[0.3em]"
            style={{ color: "rgba(201,169,110,0.7)" }}
          >
            {city}
          </p>
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <motion.div
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{ color: "rgba(201,169,110,0.7)" }}
      >
        <p className="text-xs tracking-widest uppercase" style={{ letterSpacing: "0.25em" }}>
          Scorri
        </p>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
