"use client";

import { useState } from "react";
import { MusicToggle } from "./MusicToggle";

interface EnvelopeOverlayProps {
  initials: string;
  onOpen: () => void;
}

/* ── Botanical SVG corner element ── */
function BotanicalCorner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 110 Q30 60 80 20" stroke="#c9a96e" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M10 110 Q50 80 90 10" stroke="#c9a96e" strokeWidth="0.8" fill="none" opacity="0.4" />
      <circle cx="80" cy="22" r="3" fill="#c9a96e" opacity="0.5" />
      <circle cx="68" cy="36" r="2" fill="#c9a96e" opacity="0.4" />
      <circle cx="45" cy="63" r="2.5" fill="#c9a96e" opacity="0.45" />
    </svg>
  );
}

export function EnvelopeOverlay({ initials, onOpen }: EnvelopeOverlayProps) {
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setMusicPlaying(true);
    setTimeout(() => {
      setGone(true);
      onOpen();
    }, 1900);
  };

  if (gone) {
    return <MusicToggle src="/audio/song.mp3" playing={musicPlaying} />;
  }

  return (
    <>
      <MusicToggle src="/audio/song.mp3" playing={musicPlaying} />

      {/* Full-screen overlay */}
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, #2e251c 0%, #1c150e 60%, #140f0a 100%)",
          opacity: opening ? 0 : 1,
          transitionDelay: opening ? "1200ms" : "0ms",
          pointerEvents: opening ? "none" : "auto",
        }}
      >
        {/* Botanical corners */}
        <BotanicalCorner className="botanical-corner absolute top-0 left-0 opacity-30" />
        <BotanicalCorner className="botanical-corner absolute top-0 right-0 opacity-30 scale-x-[-1]" />
        <BotanicalCorner className="botanical-corner absolute bottom-0 left-0 opacity-30 scale-y-[-1]" />
        <BotanicalCorner className="botanical-corner absolute bottom-0 right-0 opacity-30 scale-x-[-1] scale-y-[-1]" />

        {/* Gold border frame */}
        <div
          className="absolute inset-6 pointer-events-none"
          style={{ border: "1px solid rgba(201,169,110,0.25)" }}
        />
        <div
          className="absolute inset-8 pointer-events-none"
          style={{ border: "1px solid rgba(201,169,110,0.12)" }}
        />

        {/* Content */}
        <div className="relative flex flex-col items-center gap-12 px-6">
          {/* Top label */}
          <p
            className="text-xs tracking-[0.4em] uppercase animate-fade-up-in"
            style={{ color: "rgba(201,169,110,0.7)", animationDelay: "0.3s", opacity: 0 }}
          >
            Siete Cordialmente Invitati
          </p>

          {/* Envelope */}
          <div
            onClick={handleOpen}
            className="group relative cursor-pointer select-none"
            style={{ perspective: "1200px" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleOpen()}
            aria-label="Apri l'invito"
          >
            <div
              className="relative h-56 w-80 transition-transform duration-300 group-hover:-translate-y-1 sm:h-64 sm:w-[26rem]"
              style={{ perspective: "1200px" }}
            >
              {/* Drop shadow under envelope */}
              <div
                className="absolute inset-0"
                style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.55)" }}
                aria-hidden="true"
              />

              {/* Envelope back panel (interior) */}
              <div
                className="absolute inset-0"
                style={{ background: "#7c875f", zIndex: 0 }}
                aria-hidden="true"
              />

              {/* Letter — hidden inside when closed, rises out on open */}
              <div
                className="absolute flex flex-col items-center justify-start gap-3 pt-6"
                style={{
                  left: "8%",
                  width: "84%",
                  height: "94%",
                  top: "3%",
                  background: "linear-gradient(180deg, #fbf6ec 0%, #f3ead8 100%)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  transform: opening ? "translateY(-64%)" : "translateY(0)",
                  transition: opening
                    ? "transform 0.9s cubic-bezier(0.33,0,0.2,1) 0.55s"
                    : "none",
                  zIndex: opening ? 5 : 1,
                }}
                aria-hidden="true"
              >
                <span
                  className="text-4xl"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    color: "#a8834a",
                  }}
                >
                  {initials}
                </span>
                <div className="h-px w-12" style={{ background: "#c9a96e" }} />
                <p
                  className="text-[0.6rem] uppercase tracking-[0.3em]"
                  style={{ color: "#9a8466" }}
                >
                  Vi aspettiamo
                </p>
              </div>

              {/* Left flap */}
              <div
                className="absolute inset-0"
                style={{
                  background: "#94a074",
                  clipPath: "polygon(0 0, 0 100%, 50% 50%)",
                  zIndex: 6,
                }}
                aria-hidden="true"
              />
              {/* Right flap */}
              <div
                className="absolute inset-0"
                style={{
                  background: "#8d9a6c",
                  clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
                  zIndex: 6,
                }}
                aria-hidden="true"
              />
              {/* Bottom flap (front pocket) */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, #a1aa82 0%, #93a073 100%)",
                  clipPath: "polygon(0 100%, 100% 100%, 50% 50%)",
                  zIndex: 7,
                }}
                aria-hidden="true"
              />

              {/* Top flap (sealed — rotates open) */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(165deg, #aeb693 0%, #9da779 100%)",
                  clipPath: "polygon(0 0, 100% 0, 50% 50%)",
                  transformOrigin: "top center",
                  transform: opening ? "rotateX(-162deg)" : "rotateX(0deg)",
                  transition: opening
                    ? "transform 0.7s cubic-bezier(0.5,0,0.3,1) 0.1s"
                    : "none",
                  filter: opening ? "brightness(0.9)" : "none",
                  zIndex: opening ? 4 : 9,
                }}
                aria-hidden="true"
              />

              {/* Wax seal with C & S monogram */}
              <div
                className="absolute left-1/2 top-1/2 flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24"
                style={{
                  background:
                    "radial-gradient(circle at 38% 32%, #d8c6a6 0%, #c3ad88 45%, #ab9670 100%)",
                  boxShadow:
                    "0 6px 16px rgba(0,0,0,0.35), inset 0 2px 4px rgba(255,255,255,0.35), inset 0 -3px 6px rgba(120,100,70,0.5)",
                  opacity: opening ? 0 : 1,
                  transform: opening
                    ? "translate(-50%, -50%) scale(0.6)"
                    : "translate(-50%, -50%) scale(1)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  zIndex: 10,
                }}
                aria-hidden="true"
              >
                <div
                  className="flex h-[78%] w-[78%] items-center justify-center rounded-full"
                  style={{
                    boxShadow:
                      "inset 0 1px 3px rgba(120,100,70,0.6), inset 0 -1px 2px rgba(255,255,255,0.25)",
                  }}
                >
                  <span
                    className="animate-seal-pulse whitespace-nowrap text-lg leading-none sm:text-xl"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      color: "#8a7350",
                      letterSpacing: "0",
                      textShadow:
                        "0 1px 1px rgba(255,255,255,0.4), 0 -1px 1px rgba(120,100,70,0.4)",
                    }}
                  >
                    {initials}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-2 text-center">
            <p
              className="text-3xl sm:text-4xl animate-fade-up-in"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "#ece2d2",
                animationDelay: "0.6s",
                opacity: 0,
              }}
            >
              Il nostro matrimonio
            </p>
            <p
              className="text-xs tracking-[0.35em] uppercase animate-fade-up-in"
              style={{
                color: "rgba(201,169,110,0.8)",
                animationDelay: "1s",
                opacity: 0,
              }}
            >
              ✦ Tocca per aprire ✦
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
