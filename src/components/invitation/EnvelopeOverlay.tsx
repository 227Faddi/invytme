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
            {/* Envelope body */}
            <div
              className="relative flex h-52 w-80 items-center justify-center sm:h-60 sm:w-96"
              style={{
                background: "linear-gradient(145deg, #f5e8d0 0%, #ecdab8 50%, #e0c898 100%)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.4)",
              }}
            >
              {/* Back V-folds */}
              <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top right, rgba(180,145,85,0.35) 49.5%, transparent 50%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top left, rgba(180,145,85,0.35) 49.5%, transparent 50%)",
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
                      "linear-gradient(to bottom right, #dfc898 49.5%, transparent 50%), linear-gradient(to bottom left, #dfc898 49.5%, transparent 50%)",
                    backgroundSize: "50.5% 100%, 50.5% 100%",
                    backgroundPosition: "left, right",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>

              {/* Initials + wax seal */}
              <div className="relative z-20 flex flex-col items-center gap-4">
                <span
                  className="text-4xl sm:text-5xl"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "#2c1a0a",
                    letterSpacing: "0.05em",
                  }}
                >
                  {initials}
                </span>

                {/* Wax seal */}
                <div
                  className="animate-seal-pulse flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    background: "radial-gradient(circle at 35% 35%, #d4504a, #a83830)",
                    boxShadow: "0 4px 12px rgba(168,56,48,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}
                >
                  {/* Seal crown/flower */}
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <circle cx="14" cy="14" r="5" fill="rgba(255,255,255,0.9)" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                      <ellipse
                        key={deg}
                        cx="14"
                        cy="14"
                        rx="3.5"
                        ry="7"
                        fill="rgba(255,255,255,0.65)"
                        transform={`rotate(${deg} 14 14) translate(0, -6)`}
                      />
                    ))}
                  </svg>
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
