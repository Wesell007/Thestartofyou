interface Props {
  week: number;
  size?: number;
  className?: string;
}

/**
 * Mum + baby relational form — the signature illustration for /my-week.
 *
 * Composition principles:
 *   - A vessel form (mum) — generous, asymmetric, hand-drawn quality.
 *   - An inner luminous form (baby) — settles deeper, grows through pregnancy.
 *   - Concentric breathing rings — quiet rhythm, the relationship over time.
 *   - A subtle paper grain on the inner form — material, not flat.
 *   - A single botanical chapter-mark above — the seal of the chapter.
 *
 * The result reads as relational, premium, and stage-aware without ever
 * being literal or cliché.
 */
const WeekIllustration = ({ week, size = 260, className }: Props) => {
  const w = Math.min(Math.max(week, 1), 42);
  const t = Math.min(Math.max((w - 4) / 36, 0), 1);

  // Inner (baby) form — grows + settles
  const innerR = 22 + t * 38;
  const innerCy = 122 + t * 12;
  const innerRy = innerR * (0.96 + t * 0.18);

  // Outer (mum) form — gentle asymmetric swell
  const swell = 6 + t * 8;

  return (
    <svg
      viewBox="0 0 280 280"
      width={size}
      height={size}
      role="img"
      aria-label={`Week ${w} — a quiet illustration of mother and baby in relation`}
      className={className}
    >
      <defs>
        {/* Atmosphere — the warm air around them */}
        <radialGradient id="atm" cx="50%" cy="48%" r="62%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.34)" />
          <stop offset="48%" stopColor="hsl(var(--stage-pregnancy) / 0.85)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy) / 0)" />
        </radialGradient>

        {/* Mum stroke — duotone, warmer at top */}
        <linearGradient id="mumStroke" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.95)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.55)" />
        </linearGradient>

        {/* Baby form — luminous, hand-poured */}
        <radialGradient id="babyFill" cx="42%" cy="38%" r="68%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 1)" />
          <stop offset="55%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.85)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.62)" />
        </radialGradient>

        {/* Soft halo around baby */}
        <radialGradient id="babyGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.42)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0)" />
        </radialGradient>

        {/* Paper grain — subtle texture overlay on baby form */}
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix
            values="0 0 0 0 0.55
                    0 0 0 0 0.32
                    0 0 0 0 0.22
                    0 0 0 0.18 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>

        {/* Highlight crescent on baby form */}
        <radialGradient id="babyHighlight" cx="35%" cy="30%" r="35%">
          <stop offset="0%" stopColor="hsl(0 0% 100% / 0.42)" />
          <stop offset="100%" stopColor="hsl(0 0% 100% / 0)" />
        </radialGradient>
      </defs>

      {/* Atmosphere wash */}
      <circle cx="140" cy="140" r="130" fill="url(#atm)" />

      {/* Outer breathing ring — the wider relational space */}
      <ellipse
        cx="140"
        cy={140 + t * 5}
        rx={106}
        ry={112}
        fill="none"
        stroke="hsl(var(--stage-pregnancy-accent) / 0.14)"
        strokeWidth="0.8"
      />

      {/* Mum — vessel form. Asymmetric, hand-drawn quality. */}
      <path
        d={`M ${48 - swell / 2} 128
            C ${48 - swell / 2} 90, 88 60, 140 60
            C 192 60, ${232 + swell / 2} 90, ${232 + swell / 2} 128
            C ${232 + swell / 2} 196, 196 240, 140 240
            C 84 240, ${48 - swell / 2} 196, ${48 - swell / 2} 128 Z`}
        fill="none"
        stroke="url(#mumStroke)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Inner concentric breath — softer, dashed */}
      <ellipse
        cx="140"
        cy={140 + t * 4}
        rx={86 - t * 3}
        ry={92 - t * 3}
        fill="none"
        stroke="hsl(var(--stage-pregnancy-accent) / 0.22)"
        strokeWidth="0.7"
        strokeDasharray="1 6"
      />

      {/* Baby's halo — atmospheric warmth */}
      <circle cx="140" cy={innerCy} r={innerR + 18} fill="url(#babyGlow)" />

      {/* Baby — the developing form */}
      <ellipse
        cx="140"
        cy={innerCy}
        rx={innerR}
        ry={innerRy}
        fill="url(#babyFill)"
      />

      {/* Grain texture on baby — material quality */}
      <ellipse
        cx="140"
        cy={innerCy}
        rx={innerR}
        ry={innerRy}
        fill="hsl(var(--stage-pregnancy-accent))"
        filter="url(#grain)"
        opacity="0.4"
      />

      {/* Highlight crescent — the inner light */}
      <ellipse
        cx={140 - innerR * 0.18}
        cy={innerCy - innerRy * 0.22}
        rx={innerR * 0.65}
        ry={innerRy * 0.55}
        fill="url(#babyHighlight)"
      />

      {/* The quiet thread between mum and baby */}
      <path
        d={`M 140 ${innerCy - innerRy} L 140 ${60 + 8}`}
        stroke="hsl(var(--stage-pregnancy-accent) / 0.5)"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeDasharray="1.5 5"
      />

      {/* Botanical chapter-mark above — the seal */}
      <g transform="translate(140, 50)">
        <circle
          cx="0"
          cy="0"
          r="3.2"
          fill="hsl(var(--stage-pregnancy-accent) / 0.78)"
        />
        <path
          d="M 0 -4 C 5 -8, 10 -13, 12 -19"
          fill="none"
          stroke="hsl(var(--stage-pregnancy-accent) / 0.55)"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d="M 0 -4 C -5 -8, -10 -13, -12 -19"
          fill="none"
          stroke="hsl(var(--stage-pregnancy-accent) / 0.55)"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <ellipse
          cx="9"
          cy="-15"
          rx="2.4"
          ry="1"
          fill="hsl(var(--stage-pregnancy-accent) / 0.42)"
          transform="rotate(-32 9 -15)"
        />
        <ellipse
          cx="-9"
          cy="-15"
          rx="2.4"
          ry="1"
          fill="hsl(var(--stage-pregnancy-accent) / 0.42)"
          transform="rotate(32 -9 -15)"
        />
      </g>
    </svg>
  );
};

export default WeekIllustration;
