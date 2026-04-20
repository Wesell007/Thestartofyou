interface Props {
  week: number;
  /** Visual size in px (square). Defaults to 240. */
  size?: number;
  className?: string;
}

/**
 * Stage-aware editorial illustration for /my-week — the relational form.
 *
 * Two abstract shapes, mum and baby, in quiet relation:
 *  - The outer holding form (mum) — a soft, generous arc that opens at the top.
 *  - The inner luminous form (baby) — nestled within, growing and settling
 *    deeper through pregnancy.
 *  - A quiet halo binds them together visually, stage-tinted.
 *
 * No faces, no fruit, no nursery aesthetic. The two-form composition reads
 * as "mum + baby" without ever being literal.
 */
const WeekIllustration = ({ week, size = 240, className }: Props) => {
  const w = Math.min(Math.max(week, 1), 42);
  // 0..1 progress across the journey
  const t = Math.min(Math.max((w - 4) / 36, 0), 1);

  // Inner (baby) form grows and settles deeper
  const innerR = 16 + t * 36; // 16 → 52
  const innerCy = 116 + t * 10; // settles a touch lower late
  const innerRy = innerR * (0.94 + t * 0.16);

  // Outer (mum) form swells gently — a fuller curve later
  const outerSwell = 4 + t * 6; // subtle widening through pregnancy

  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      role="img"
      aria-label={`A quiet illustration for week ${w} of pregnancy — mother and baby in relation`}
      className={className}
    >
      <defs>
        <radialGradient id="myw-halo" cx="50%" cy="48%" r="58%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.32)" />
          <stop offset="55%" stopColor="hsl(var(--stage-pregnancy) / 0.7)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy) / 0)" />
        </radialGradient>

        <linearGradient id="myw-mum" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.85)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.45)" />
        </linearGradient>

        <radialGradient id="myw-baby" cx="42%" cy="40%" r="62%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 1)" />
          <stop offset="60%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.78)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.55)" />
        </radialGradient>

        <radialGradient id="myw-baby-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.35)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0)" />
        </radialGradient>
      </defs>

      {/* Soft halo — the atmosphere holding both */}
      <circle cx="120" cy="120" r="110" fill="url(#myw-halo)" />

      {/* Mum — the outer holding form. An open vessel that cradles. */}
      {/* Drawn as an arc that opens slightly at the top, like a gentle bowl. */}
      <path
        d={`M ${40 - outerSwell / 2} 110
            C ${40 - outerSwell / 2} 78, 80 50, 120 50
            C 160 50, ${200 + outerSwell / 2} 78, ${200 + outerSwell / 2} 110
            C ${200 + outerSwell / 2} 168, 168 208, 120 208
            C 72 208, ${40 - outerSwell / 2} 168, ${40 - outerSwell / 2} 110 Z`}
        fill="none"
        stroke="url(#myw-mum)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* A second, softer concentric breath — quiet rhythm */}
      <ellipse
        cx="120"
        cy={120 + t * 4}
        rx={76 - t * 2}
        ry={82 - t * 2}
        fill="none"
        stroke="hsl(var(--stage-pregnancy-accent) / 0.2)"
        strokeWidth="0.8"
        strokeDasharray="1 5"
      />

      {/* Baby's quiet glow — a soft inner light */}
      <circle cx="120" cy={innerCy} r={innerR + 14} fill="url(#myw-baby-glow)" />

      {/* Baby — the developing form, nested inside the mother's curve */}
      <ellipse
        cx="120"
        cy={innerCy}
        rx={innerR}
        ry={innerRy}
        fill="url(#myw-baby)"
      />

      {/* The small thread between them — a single vertical line at the top of
          the inner form, suggesting connection without literalism. */}
      <path
        d={`M 120 ${innerCy - innerRy} L 120 ${50 + 6}`}
        stroke="hsl(var(--stage-pregnancy-accent) / 0.42)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="2 4"
      />

      {/* A quiet botanical mark above — chapter-mark style */}
      <circle
        cx="120"
        cy="40"
        r="3"
        fill="hsl(var(--stage-pregnancy-accent) / 0.7)"
      />
      <path
        d="M 120 36 C 124 32, 128 28, 130 22"
        fill="none"
        stroke="hsl(var(--stage-pregnancy-accent) / 0.5)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M 120 36 C 116 32, 112 28, 110 22"
        fill="none"
        stroke="hsl(var(--stage-pregnancy-accent) / 0.5)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default WeekIllustration;
