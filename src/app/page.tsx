"use client";

import { useState } from "react";
import { EnvelopeOverlay } from "@/components/invitation/EnvelopeOverlay";
import { HeroSection } from "@/components/invitation/HeroSection";
import { CountdownTimer } from "@/components/invitation/CountdownTimer";
import { DetailsSection } from "@/components/invitation/DetailsSection";
import { FaqSection } from "@/components/invitation/FaqSection";
import { RsvpForm } from "@/components/invitation/RsvpForm";
import { FloralDivider } from "@/components/invitation/FloralDivider";
import { weddingConfig } from "@/lib/wedding-config";

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <EnvelopeOverlay
        initials={weddingConfig.initials}
        onOpen={() => setOpened(true)}
      />

      <main
        className="flex flex-col"
        style={{
          opacity: opened ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: opened ? "auto" : "none",
        }}
      >
        <HeroSection
          groomName={weddingConfig.groomName}
          brideName={weddingConfig.brideName}
          date={weddingConfig.date}
          city={weddingConfig.city}
        />

        <CountdownTimer targetDate={weddingConfig.weddingDate} />

        {/* Section break */}
        <div style={{ background: "#f5eade" }} className="py-6">
          <FloralDivider />
        </div>

        <DetailsSection
          ceremony={{
            venue: weddingConfig.ceremonyVenue,
            address: weddingConfig.ceremonyAddress,
            time: weddingConfig.ceremonyTime,
            mapEmbedUrl: weddingConfig.ceremonyMapEmbedUrl,
          }}
          reception={{
            venue: weddingConfig.receptionVenue,
            address: weddingConfig.receptionAddress,
            time: weddingConfig.receptionTime,
            mapEmbedUrl: weddingConfig.receptionMapEmbedUrl,
          }}
        />

        <FaqSection items={weddingConfig.faqItems} />

        {/* Section break */}
        <div style={{ background: "#fdf8f2" }} className="py-6">
          <FloralDivider />
        </div>

        <RsvpForm />

        {/* Footer */}
        <footer
          className="py-14 text-center"
          style={{
            background: "linear-gradient(160deg, #1a0d08 0%, #2e1a0e 50%, #1a0d08 100%)",
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <p
              className="text-2xl font-light"
              style={{ fontFamily: "var(--font-serif)", color: "#f0d8b0" }}
            >
              {weddingConfig.groomName} &amp; {weddingConfig.brideName}
            </p>
            <div
              className="h-px w-16"
              style={{ background: "linear-gradient(to right, transparent, #c9a96e, transparent)" }}
            />
            <p
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "rgba(201,169,110,0.7)" }}
            >
              {weddingConfig.date}
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
