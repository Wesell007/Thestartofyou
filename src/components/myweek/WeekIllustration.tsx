interface Props {
  week: number;
  size?: number;
  className?: string;
}

/**
 * Mum + baby relational form — the signature illustration for /my-week.
 *
 * Trimester-aware composition system. Rather than a single morphing form,
 * the illustration now shifts its underlying composition across four
 * phases of pregnancy:
 *
 *   Early   (1–13)   — A single luminous seed inside a wide vessel.
 *                      Mostly atmosphere; the baby is held in possibility.
 *   Middle  (14–27)  — Two forms in relation. A clearer inner being,
 *                      orbited by a soft outer thread.
 *   Late    (28–40)  — A nested, weighted form. The vessel narrows around
 *                      the inner being; gravity gathers downward.
 *   Overdue (41–42)  — Stillness. The forms settle, the rings hold steady,
 *                      a single waiting line sits below.
 *
 * Each phase shares the same atmospheric vocabulary — radial wash,
 * concentric breath, paper grain — so the journey reads as one piece.
 */
const WeekIllustration = ({ week, size = 260, className }: Props) => {
  const w = Math.min(Math.max(week, 1), 42);
  const phase: "early" | "middle" | "late" | "overdue" =
    w <= 13 ? "early" : w <= 27 ? "middle" : w <= 40 ? "late" : "overdue";

  // Local progression within the phase — 0 → 1
  const phaseT =
    phase === "early"
      ? Math.min(Math.max((w - 1) / 12, 0), 1)
      : phase === "middle"
      ? Math.min(Math.max((w - 14) / 13, 0), 1)
      : phase === "late"
      ? Math.min(Math.max((w - 28) / 12, 0), 1)
      : Math.min(Math.max((w - 41) / 1, 0), 1);

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
        <radialGradient id="atm" cx="50%" cy="48%" r="62%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.34)" />
          <stop offset="48%" stopColor="hsl(var(--stage-pregnancy) / 0.85)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy) / 0)" />
        </radialGradient>

        <linearGradient id="mumStroke" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.95)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.55)" />
        </linearGradient>

        <radialGradient id="babyFill" cx="42%" cy="38%" r="68%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 1)" />
          <stop offset="55%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.85)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.62)" />
        </radialGradient>

        <radialGradient id="babyGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.42)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0)" />
        </radialGradient>

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

        <radialGradient id="babyHighlight" cx="35%" cy="30%" r="35%">
          <stop offset="0%" stopColor="hsl(0 0% 100% / 0.42)" />
          <stop offset="100%" stopColor="hsl(0 0% 100% / 0)" />
        </radialGradient>
      </defs>

      {/* Atmosphere wash — shared across phases */}
      <circle cx="140" cy="140" r="130" fill="url(#atm)" />

      {/* ───── EARLY: a single luminous seed inside an open vessel ───── */}
      {phase === "early" && (
        <>
          {/* Wide, open vessel — the atmospheric "almost not yet" */}
          <ellipse
            cx="140"
            cy="140"
            rx={108}
            ry={114}
            fill="none"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.16)"
            strokeWidth="0.8"
          />
          <ellipse
            cx="140"
            cy="140"
            rx={92}
            ry={96}
            fill="none"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.22)"
            strokeWidth="0.7"
            strokeDasharray="1 6"
          />
          {/* The seed — small, central, glowing */}
          <circle cx="140" cy={144} r={18 + phaseT * 14} fill="url(#babyGlow)" />
          <circle cx="140" cy={144} r={6 + phaseT * 10} fill="url(#babyFill)" />
          <circle
            cx="140"
            cy={144}
            r={6 + phaseT * 10}
            fill="hsl(var(--stage-pregnancy-accent))"
            filter="url(#grain)"
            opacity="0.32"
          />
          {/* A single thread up — possibility ascending */}
          <path
            d={`M 140 ${144 - (6 + phaseT * 10)} L 140 64`}
            stroke="hsl(var(--stage-pregnancy-accent) / 0.42)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeDasharray="1.5 6"
          />
        </>
      )}

      {/* ───── MIDDLE: two forms in relation, orbital breath ───── */}
      {phase === "middle" && (
        <>
          {/* Outer breathing ring */}
          <ellipse
            cx="140"
            cy={140 + phaseT * 4}
            rx={108}
            ry={112}
            fill="none"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.18)"
            strokeWidth="0.8"
          />
          {/* Mum vessel — gentle ovoid */}
          <path
            d={`M 50 128
                C 50 88, 90 60, 140 60
                C 190 60, 230 88, 230 128
                C 230 196, 196 240, 140 240
                C 84 240, 50 196, 50 128 Z`}
            fill="none"
            stroke="url(#mumStroke)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Inner orbital — relational thread */}
          <ellipse
            cx="140"
            cy={140 + phaseT * 6}
            rx={70 + phaseT * 4}
            ry={76 + phaseT * 4}
            fill="none"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.26)"
            strokeWidth="0.7"
            strokeDasharray="1 6"
          />
          {/* Baby — settling into form */}
          {(() => {
            const r = 32 + phaseT * 18;
            const cy = 132 + phaseT * 10;
            const ry = r * (1.02 + phaseT * 0.12);
            return (
              <>
                <circle cx="140" cy={cy} r={r + 18} fill="url(#babyGlow)" />
                <ellipse cx="140" cy={cy} rx={r} ry={ry} fill="url(#babyFill)" />
                <ellipse
                  cx="140"
                  cy={cy}
                  rx={r}
                  ry={ry}
                  fill="hsl(var(--stage-pregnancy-accent))"
                  filter="url(#grain)"
                  opacity="0.4"
                />
                <ellipse
                  cx={140 - r * 0.18}
                  cy={cy - ry * 0.22}
                  rx={r * 0.65}
                  ry={ry * 0.55}
                  fill="url(#babyHighlight)"
                />
                {/* Quiet thread — mum to baby */}
                <path
                  d={`M 140 ${cy - ry} L 140 70`}
                  stroke="hsl(var(--stage-pregnancy-accent) / 0.5)"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  strokeDasharray="1.5 5"
                />
              </>
            );
          })()}
        </>
      )}

      {/* ───── LATE: nested, weighted, settling downward ───── */}
      {phase === "late" && (
        <>
          {/* Outer vessel — narrowing, weighted */}
          {(() => {
            const swell = 6 + phaseT * 10;
            return (
              <path
                d={`M ${48 - swell / 2} 128
                    C ${48 - swell / 2} 90, 88 60, 140 60
                    C 192 60, ${232 + swell / 2} 90, ${232 + swell / 2} 128
                    C ${232 + swell / 2} 200, 196 244, 140 244
                    C 84 244, ${48 - swell / 2} 200, ${48 - swell / 2} 128 Z`}
                fill="none"
                stroke="url(#mumStroke)"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            );
          })()}
          {/* Inner concentric breath — narrowed */}
          <ellipse
            cx="140"
            cy={148 + phaseT * 6}
            rx={82 - phaseT * 4}
            ry={88 - phaseT * 4}
            fill="none"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.24)"
            strokeWidth="0.7"
            strokeDasharray="1 6"
          />
          {/* Baby — large, settled deep */}
          {(() => {
            const r = 56 + phaseT * 8;
            const cy = 154 + phaseT * 12;
            const ry = r * (1.08 + phaseT * 0.06);
            return (
              <>
                <circle cx="140" cy={cy} r={r + 16} fill="url(#babyGlow)" />
                <ellipse cx="140" cy={cy} rx={r} ry={ry} fill="url(#babyFill)" />
                <ellipse
                  cx="140"
                  cy={cy}
                  rx={r}
                  ry={ry}
                  fill="hsl(var(--stage-pregnancy-accent))"
                  filter="url(#grain)"
                  opacity="0.42"
                />
                <ellipse
                  cx={140 - r * 0.2}
                  cy={cy - ry * 0.24}
                  rx={r * 0.62}
                  ry={ry * 0.52}
                  fill="url(#babyHighlight)"
                />
                <path
                  d={`M 140 ${cy - ry} L 140 70`}
                  stroke="hsl(var(--stage-pregnancy-accent) / 0.5)"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  strokeDasharray="1.5 5"
                />
              </>
            );
          })()}
        </>
      )}

      {/* ───── OVERDUE: settled stillness ───── */}
      {phase === "overdue" && (
        <>
          <ellipse
            cx="140"
            cy="142"
            rx={112}
            ry={116}
            fill="none"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.22)"
            strokeWidth="1.2"
          />
          <ellipse
            cx="140"
            cy="148"
            rx={88}
            ry={92}
            fill="none"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.18)"
            strokeWidth="0.7"
            strokeDasharray="1 6"
          />
          <circle cx="140" cy="160" r={78} fill="url(#babyGlow)" />
          <ellipse cx="140" cy="160" rx={64} ry={70} fill="url(#babyFill)" />
          <ellipse
            cx="140"
            cy="160"
            rx={64}
            ry={70}
            fill="hsl(var(--stage-pregnancy-accent))"
            filter="url(#grain)"
            opacity="0.42"
          />
          <ellipse
            cx={128}
            cy={142}
            rx={40}
            ry={36}
            fill="url(#babyHighlight)"
          />
          {/* The waiting line below — stillness */}
          <line
            x1="100"
            y1="252"
            x2="180"
            y2="252"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.5)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </>
      )}

      {/* Botanical chapter-mark above — the seal (shared) */}
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
