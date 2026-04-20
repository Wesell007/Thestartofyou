interface Props {
  week: number;
  /** Visual size in px (square). Defaults to 220. */
  size?: number;
  className?: string;
}

/**
 * Stage-aware editorial illustration for /my-week.
 *
 * Pure SVG, no raster art. Premium, parent-focused, never babyish:
 *  - A soft botanical-like vessel (the holding body) drawn from arcs.
 *  - A small developing form within, scaling and rounding by week.
 *  - A quiet halo whose colour comes from the pregnancy stage token.
 *
 * No faces, no fruit, no cartoons. The form grows with the week, so the
 * illustration changes meaningfully across pregnancy without ever drifting
 * into nursery aesthetic.
 */
const WeekIllustration = ({ week, size = 220, className }: Props) => {
  // Inner form scale grows from week 4..40 within a calm range.
  const t = Math.min(Math.max((week - 4) / 36, 0), 1);
  const innerR = 14 + t * 38; // 14 → 52
  // Subtle vertical settle — sits a touch lower in late pregnancy.
  const innerCy = 110 + t * 8;
  // Form ratio: rounder in early, slightly elongated mid, fuller late.
  const innerRy = innerR * (0.92 + t * 0.18);

  return (
    <svg
      viewBox="0 0 220 220"
      width={size}
      height={size}
      role="img"
      aria-label={`A quiet illustration for week ${week} of pregnancy`}
      className={className}
    >
      <defs>
        <radialGradient id="myw-halo" cx="50%" cy="48%" r="55%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.22)" />
          <stop offset="60%" stopColor="hsl(var(--stage-pregnancy) / 0.55)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy) / 0)" />
        </radialGradient>
        <linearGradient id="myw-vessel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.55)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.18)" />
        </linearGradient>
        <radialGradient id="myw-inner" cx="42%" cy="40%" r="62%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.85)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.55)" />
        </radialGradient>
      </defs>

      {/* Soft halo */}
      <circle cx="110" cy="110" r="100" fill="url(#myw-halo)" />

      {/* Outer vessel — an open botanical curve, the holding body */}
      <path
        d="M110 28
           C 60 28, 30 70, 30 118
           C 30 160, 64 192, 110 192
           C 156 192, 190 160, 190 118
           C 190 70, 160 28, 110 28 Z"
        fill="none"
        stroke="url(#myw-vessel)"
        strokeWidth="1.25"
      />

      {/* Inner concentric breath — a quiet second ring */}
      <ellipse
        cx="110"
        cy="118"
        rx="68"
        ry="74"
        fill="none"
        stroke="hsl(var(--stage-pregnancy-accent) / 0.18)"
        strokeWidth="0.75"
        strokeDasharray="1 4"
      />

      {/* The developing form — rounded, soft, scales with week */}
      <ellipse
        cx="110"
        cy={innerCy}
        rx={innerR}
        ry={innerRy}
        fill="url(#myw-inner)"
      />

      {/* Quiet stem — a single botanical mark, anchoring the vessel */}
      <path
        d="M110 28 C 108 18, 112 14, 110 6"
        fill="none"
        stroke="hsl(var(--stage-pregnancy-accent) / 0.6)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M110 14 C 116 12, 120 8, 122 4"
        fill="none"
        stroke="hsl(var(--stage-pregnancy-accent) / 0.45)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M110 18 C 104 16, 100 12, 98 8"
        fill="none"
        stroke="hsl(var(--stage-pregnancy-accent) / 0.45)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default WeekIllustration;
