export function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-2 ${className}`}>
      {/* Left line */}
      <div className="h-px w-16 rounded-full" style={{ background: "linear-gradient(to right, transparent, oklch(0.72 0.1 80))" }} />

      {/* Center ornament */}
      <svg width="56" height="24" viewBox="0 0 56 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Left petals */}
        <ellipse cx="10" cy="12" rx="7" ry="3" style={{ fill: "oklch(0.82 0.07 20)", opacity: 0.65 }} transform="rotate(-35 10 12)" />
        <ellipse cx="10" cy="12" rx="7" ry="3" style={{ fill: "oklch(0.82 0.07 20)", opacity: 0.45 }} transform="rotate(35 10 12)" />
        {/* Left dot */}
        <circle cx="19" cy="12" r="2" style={{ fill: "oklch(0.72 0.1 80)", opacity: 0.7 }} />
        {/* Center diamond */}
        <polygon points="28,5 32,12 28,19 24,12" style={{ fill: "oklch(0.72 0.1 80)", opacity: 0.9 }} />
        {/* Right dot */}
        <circle cx="37" cy="12" r="2" style={{ fill: "oklch(0.72 0.1 80)", opacity: 0.7 }} />
        {/* Right petals */}
        <ellipse cx="46" cy="12" rx="7" ry="3" style={{ fill: "oklch(0.82 0.07 20)", opacity: 0.65 }} transform="rotate(35 46 12)" />
        <ellipse cx="46" cy="12" rx="7" ry="3" style={{ fill: "oklch(0.82 0.07 20)", opacity: 0.45 }} transform="rotate(-35 46 12)" />
      </svg>

      {/* Right line */}
      <div className="h-px w-16 rounded-full" style={{ background: "linear-gradient(to left, transparent, oklch(0.72 0.1 80))" }} />
    </div>
  );
}
