/**
 * Innate wordmark — a hand-drawn sunburst over an italic serif "Innate".
 * Recreated as vector so it scales crisply and inherits `currentColor`.
 */

function Sunburst({ className = "" }: { className?: string }) {
  // 12 tapered rays radiating from the centre, alternating length for a
  // hand-drawn feel.
  const rays = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 360) / 12;
    const long = i % 2 === 0;
    return { angle, inner: 17, outer: long ? 46 : 36, width: long ? 7 : 5 };
  });
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden
    >
      <g>
        {rays.map((r, i) => (
          <line
            key={i}
            x1="50"
            y1={50 - r.inner}
            x2="50"
            y2={50 - r.outer}
            strokeWidth={r.width}
            transform={`rotate(${r.angle} 50 50)`}
          />
        ))}
      </g>
    </svg>
  );
}

export function Logo({
  className = "",
  showSpark = true,
}: {
  className?: string;
  showSpark?: boolean;
}) {
  return (
    <span
      className={`relative inline-flex items-baseline font-serif italic leading-none tracking-tight ${className}`}
    >
      {showSpark && (
        <Sunburst className="absolute -top-[0.62em] left-[-0.18em] size-[0.78em] text-current opacity-90" />
      )}
      <span className="relative">Innate</span>
    </span>
  );
}
