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
      <ellipse cx="45" cy="65" rx="14" ry="6" fill="#e8c4b4" opacity="0.5" transform="rotate(-45 45 65)" />
      <ellipse cx="55" cy="52" rx="12" ry="5" fill="#e8c4b4" opacity="0.4" transform="rotate(-55 55 52)" />
      <ellipse cx="68" cy="38" rx="10" ry="4" fill="#e8c4b4" opacity="0.35" transform="rotate(-60 68 38)" />
      <ellipse cx="30" cy="80" rx="8" ry="3" fill="#c4887a" opacity="0.3" transform="rotate(-35 30 80)" />
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
    }, 1500);
  };

  if (gone) {
    return <MusicToggle src="/audio/wedding-music.mp3" playing={musicPlaying} />;
  }

  return (
    <>
      <MusicToggle src="/audio/wedding-music.mp3" playing={musicPlaying} />

      {/* Full-screen overlay */}
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700"
        style={{
          background: "linear-gradient(160deg, #1a0d08 0%, #2e1a0e 30%, #3d2415 55%, #2e1a0e 80%, #1a0d08 100%)",
          opacity: opening ? 0 : 1,
          transitionDelay: opening ? "900ms" : "0ms",
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
          className="absolute inset-6 rounded-none pointer-events-none"
          style={{ border: "1px solid rgba(201,169,110,0.25)" }}
        />
        <div
          className="absolute inset-8 rounded-none pointer-events-none"
          style={{ border: "1px solid rgba(201,169,110,0.12)" }}
        />

        {/* Content */}
        <div className="relative flex flex-col items-center gap-10 px-6">
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
            style={{ perspective: "1000px" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleOpen()}
            aria-label="Apri l'invito"
          >
            {/* Envelope body — sage paper */}
            <div
              className="relative flex h-52 w-80 items-center justify-center sm:h-60 sm:w-96"
              style={{
                background: "linear-gradient(145deg, #aab28f 0%, #9aa37e 50%, #8b9570 100%)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.15)",
              }}
            >
              {/* Back V-folds */}
              <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top right, rgba(70,80,55,0.35) 49.5%, transparent 50%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top left, rgba(70,80,55,0.35) 49.5%, transparent 50%)",
                  }}
                />
              </div>

              {/* Flap */}
              <div
                className="absolute left-0 right-0 top-0 overflow-hidden"
                style={{
                  height: "52%",
                  transformOrigin: "top center",
                  transform: opening ? "rotateX(-180deg)" : "rotateX(0deg)",
                  transition: opening ? "transform 0.8s cubic-bezier(0.4,0,0.2,1)" : "none",
                  zIndex: 10,
                }}
                aria-hidden="true"
              >
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #9ba578 49.5%, transparent 50%), linear-gradient(to bottom left, #9ba578 49.5%, transparent 50%)",
                    backgroundSize: "50.5% 100%, 50.5% 100%",
                    backgroundPosition: "left, right",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>

              {/* Wax seal with C & S monogram */}
              <div
                className="animate-seal-pulse relative z-20 flex h-24 w-24 items-center justify-center rounded-full sm:h-28 sm:w-28"
                style={{
                  background:
                    "radial-gradient(circle at 38% 32%, #d8c6a6 0%, #c3ad88 45%, #ab9670 100%)",
                  boxShadow:
                    "0 6px 16px rgba(0,0,0,0.35), inset 0 2px 4px rgba(255,255,255,0.35), inset 0 -3px 6px rgba(120,100,70,0.5)",
                }}
                aria-hidden="true"
              >
                {/* Inner ring */}
                <div
                  className="flex h-[78%] w-[78%] items-center justify-center rounded-full"
                  style={{
                    boxShadow:
                      "inset 0 1px 3px rgba(120,100,70,0.6), inset 0 -1px 2px rgba(255,255,255,0.25)",
                  }}
                >
                  <span
                    className="text-3xl sm:text-4xl"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      color: "#8a7350",
                      letterSpacing: "0.02em",
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
                color: "#f0d8b0",
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
