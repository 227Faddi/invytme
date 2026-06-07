"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function MusicToggle({ src, playing }: { src: string; playing: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!audioRef.current || !playing) return;
    audioRef.current.volume = 0.3;
    audioRef.current.loop = true;
    audioRef.current.play().catch(() => {});
    setVisible(true);
  }, [playing]);

  const toggle = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="none" />
      {visible && (
        <button
          onClick={toggle}
          aria-label={muted ? "Attiva musica" : "Disattiva musica"}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 py-2 px-3 text-xs transition-all"
          style={{
            background: "rgba(26,13,8,0.75)",
            border: "1px solid rgba(201,169,110,0.4)",
            color: "#c9a96e",
            backdropFilter: "blur(8px)",
            letterSpacing: "0.12em",
          }}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span className="hidden sm:inline uppercase text-xs" style={{ letterSpacing: "0.15em" }}>
            {muted ? "Off" : "Musica"}
          </span>
        </button>
      )}
    </>
  );
}
