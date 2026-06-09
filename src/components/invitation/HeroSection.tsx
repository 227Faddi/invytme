"use client";

import { weddingConfig } from "@/lib/wedding-config";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const t = weddingConfig.text.hero;

interface HeroSectionProps {
  groomName: string;
  brideName: string;
  date: string;
}

export function HeroSection({ groomName, brideName, date }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background: looping video with warm gradient fallback */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #1a0d08 0%, #2e1810 25%, #4a2c18 50%, #3a2010 75%, #1a0d08 100%)",
        }}
      />
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/herobg.mp4" type="video/mp4" />
      </video>

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
        style={{ border: "1px solid rgba(176, 141, 79,0.2)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="rounded-full bg-black/30 px-6 py-1.5 backdrop-blur-md ring-1 ring-white/5"
        >
          <p
            className="text-[0.7rem] font-bold uppercase"
            style={{
              color: "rgba(176, 141, 79,0.95)",
              letterSpacing: "0.4em",
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            {t.intro}
          </p>
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <h1
            className="leading-[1.05] tracking-wide"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(3rem, 10vw, 6.5rem)",
              color: "#f3ead9",
              textShadow: "0 2px 30px rgba(0,0,0,0.5)",
            }}
          >
            {brideName}
          </h1>
          <span
            className="my-1 font-bold text-white"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.6rem, 4.5vw, 3rem)",
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            }}
          >
            &amp;
          </span>
          <h1
            className="leading-[1.05] tracking-wide"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(3rem, 10vw, 6.5rem)",
              color: "#f3ead9",
              textShadow: "0 2px 30px rgba(0,0,0,0.5)",
            }}
          >
            {groomName}
          </h1>
        </motion.div>

        {/* Ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex items-center gap-3"
          aria-hidden="true"
        >
          <div
            className="h-px w-10"
            style={{
              background: "linear-gradient(to right, transparent, #b08d4f)",
            }}
          />
          <div
            className="h-1 w-1 rotate-45"
            style={{ background: "#b08d4f" }}
          />
          <div
            className="h-px w-10"
            style={{
              background: "linear-gradient(to left, transparent, #b08d4f)",
            }}
          />
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6 }}
          className="rounded-full bg-black/20 px-6 py-1.5 backdrop-blur-sm ring-1 ring-white/5"
        >
          <p
            className="text-xs font-bold uppercase sm:text-sm"
            style={{
              color: "rgba(176, 141, 79,0.95)",
              letterSpacing: "0.35em",
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            {date}
          </p>
        </motion.div>
      </div>

      {/* Page marker */}
      <motion.div
        className="absolute bottom-6 right-6 z-10 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span
          className="text-xs tracking-widest"
          style={{
            fontFamily: "var(--font-serif)",
            color: "rgba(176, 141, 79,0.8)",
          }}
        >
          01
        </span>
        <ChevronDown
          size={14}
          className="animate-bounce"
          style={{ color: "rgba(176, 141, 79,0.7)" }}
        />
      </motion.div>
    </section>
  );
}
