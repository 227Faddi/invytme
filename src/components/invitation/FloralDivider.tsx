export function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-2 ${className}`}>
      {/* Left line */}
      <div
        className="h-px w-16"
        style={{ background: "linear-gradient(to right, transparent, #c9a96e)" }}
      />

      {/* Center dot */}
      <div
        className="h-1.5 w-1.5 rotate-45"
        style={{ background: "#c9a96e" }}
        aria-hidden="true"
      />

      {/* Right line */}
      <div
        className="h-px w-16"
        style={{ background: "linear-gradient(to left, transparent, #c9a96e)" }}
      />
    </div>
  );
}
