export default function ThinkingHeart() {
  return (
    <div
      className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/75"
      aria-live="polite"
      aria-label="Neura esta pensando"
    >
      <span className="thinking-heart">{"\u2764\uFE0F"}</span>
      <span className="text-sm">NEURA esta escribiendo...</span>
    </div>
  );
}
