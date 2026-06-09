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
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-105"
          style={{
            background: "rgba(250,243,230,0.85)",
            border: "1px solid rgba(176, 141, 79,0.45)",
            color: "#b08d4f",
            backdropFilter: "blur(8px)",
          }}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      )}
    </>
  );
}
