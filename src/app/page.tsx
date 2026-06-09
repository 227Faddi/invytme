/* eslint-disable @next/next/no-img-element */
"use client";

import { AccommodationSection } from "@/components/invitation/AccommodationSection";
import { CountdownTimer } from "@/components/invitation/CountdownTimer";
import { DetailsSection } from "@/components/invitation/DetailsSection";
import { EnvelopeOverlay } from "@/components/invitation/EnvelopeOverlay";
import { FaqSection } from "@/components/invitation/FaqSection";
import { GiftsSection } from "@/components/invitation/GiftsSection";
import { HeroSection } from "@/components/invitation/HeroSection";
import { RsvpForm } from "@/components/invitation/RsvpForm";
import { weddingConfig } from "@/lib/wedding-config";
import { useState } from "react";

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
        />

        <CountdownTimer targetDate={weddingConfig.weddingDate} />

        <DetailsSection
          ceremony={{
            venue: weddingConfig.ceremonyVenue,
            address: weddingConfig.ceremonyAddress,
            time: weddingConfig.ceremonyTime,
            mapEmbedUrl: weddingConfig.ceremonyMapEmbedUrl,
          }}
        />

        <RsvpForm />

        <FaqSection items={weddingConfig.faqItems} />

        {weddingConfig.giftEnabled && (
          <GiftsSection
            blurb={weddingConfig.giftBlurb}
            cardTitle={weddingConfig.giftCardTitle}
            description={weddingConfig.giftDescription}
            accountName={weddingConfig.giftAccountName}
            iban={weddingConfig.giftIban}
          />
        )}

        <AccommodationSection />

        {/* Footer */}
        <footer className="px-6 py-16" style={{ background: "#f3e9d8" }}>
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
            {/* Couple photo */}
            <div
              className="size-60 overflow-hidden rounded-full"
              style={{
                border: "1px solid rgba(176, 141, 79,0.5)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
              }}
            >
              <img
                src="/images/couple.jpg"
                alt={`${weddingConfig.brideName} & ${weddingConfig.groomName}`}
                className="h-full w-full object-cover"
              />
            </div>

            <p
              className="mt-2 text-3xl sm:text-4xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "#3a2f22",
              }}
            >
              {weddingConfig.footerMessage}
            </p>
            <p className="text-sm" style={{ color: "#7c6f5a" }}>
              {weddingConfig.text.footer.closing}
            </p>
            <p
              className="text-lg"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "#b08d4f",
              }}
            >
              {weddingConfig.brideName} &amp; {weddingConfig.groomName}
            </p>
            <p
              className="mt-4 text-xs uppercase tracking-[0.3em]"
              style={{ color: "rgba(176, 141, 79,0.6)" }}
            >
              {weddingConfig.dateShort}
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
