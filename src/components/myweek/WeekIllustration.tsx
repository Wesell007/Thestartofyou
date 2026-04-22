interface Props {
  week: number;
  size?: number;
  className?: string;
}

/** Stage-aware fetal development illustration for the weekly hero card. */
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
      aria-label={`Week ${w} — a softly stylised fetal development illustration`}
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

        <radialGradient id="babyFill" cx="42%" cy="34%" r="72%">
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

        <radialGradient id="babyHighlight" cx="34%" cy="28%" r="38%">
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
          {/* Tiny embryonic presence, deliberately small and held. */}
          <circle cx="140" cy={144} r={22 + phaseT * 14} fill="url(#babyGlow)" />
          <path
            d={`M ${137 - phaseT * 4} ${144 - phaseT * 3}
                C ${126 - phaseT * 4} ${135 - phaseT * 8}, ${129 - phaseT * 22} ${156 + phaseT * 2}, ${143 + phaseT * 5} ${157 + phaseT * 9}
                C ${157 + phaseT * 9} ${158 + phaseT * 4}, ${163 + phaseT * 1} ${142 - phaseT * 8}, ${150 + phaseT * 2} ${136 - phaseT * 6}
                C ${145 + phaseT * 1} ${133 - phaseT * 4}, ${141 - phaseT * 1} ${136 - phaseT * 1}, ${137 - phaseT * 4} ${144 - phaseT * 3} Z`}
            fill="url(#babyFill)"
          />
          <path
            d={`M ${146 + phaseT * 4} ${155 + phaseT * 4} C ${154 + phaseT * 6} ${162 + phaseT * 7}, ${154 + phaseT * 2} ${170 + phaseT * 5}, ${145 + phaseT * 1} ${173 + phaseT * 4}`}
            fill="none"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.58)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx={146 + phaseT * 3} cy={143 - phaseT * 4} r={1.4 + phaseT * 0.6} fill="hsl(var(--card) / 0.78)" />
          <path
            d={`M 140 ${130 - phaseT * 8} L 140 64`}
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
          {/* Recognisable baby form, curled and tender, not clinical. */}
          {(() => {
            const scale = 0.88 + phaseT * 0.18;
            return (
              <g transform={`translate(140 150) scale(${scale}) rotate(-10)`}>
                <circle cx="0" cy="0" r="70" fill="url(#babyGlow)" />
                <ellipse cx="-21" cy="-30" rx="25" ry="29" fill="url(#babyFill)" stroke="hsl(var(--stage-pregnancy-accent) / 0.35)" strokeWidth="1" />
                <path d="M -1 -14 C 31 -11, 48 17, 25 45 C 1 74, -45 55, -43 17 C -42 -5, -24 -17, -1 -14 Z" fill="url(#babyFill)" stroke="hsl(var(--stage-pregnancy-accent) / 0.35)" strokeWidth="1" />
                <path d="M -5 -1 C 11 13, 5 34, -14 43" fill="none" stroke="hsl(var(--card) / 0.46)" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M 6 10 C 25 5, 37 14, 35 29" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.78)" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M -3 36 C 13 52, 30 53, 42 40" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.78)" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M 23 42 C 31 48, 39 49, 46 44" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.62)" strokeWidth="2.4" strokeLinecap="round" />
                <circle cx="-30" cy="-34" r="1.9" fill="hsl(var(--card) / 0.9)" />
                <path d="M -39 -18 C -28 -12, -14 -14, -6 -23" fill="none" stroke="hsl(var(--card) / 0.42)" strokeWidth="1.7" strokeLinecap="round" />
              </g>
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
          {/* Larger late-stage baby, curled into the narrowing womb. */}
          {(() => {
            const scale = 1.06 + phaseT * 0.16;
            return (
              <g transform={`translate(142 ${160 + phaseT * 8}) scale(${scale}) rotate(-18)`}>
                <circle cx="0" cy="0" r="82" fill="url(#babyGlow)" />
                <ellipse cx="-25" cy="-38" rx="29" ry="33" fill="url(#babyFill)" stroke="hsl(var(--stage-pregnancy-accent) / 0.34)" strokeWidth="1" />
                <path d="M -1 -19 C 39 -16, 58 20, 31 54 C 5 86, -47 68, -50 22 C -52 0, -30 -18, -1 -19 Z" fill="url(#babyFill)" stroke="hsl(var(--stage-pregnancy-accent) / 0.34)" strokeWidth="1" />
                <path d="M -4 -2 C 14 14, 7 40, -16 51" fill="none" stroke="hsl(var(--card) / 0.38)" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M 7 10 C 28 4, 43 13, 43 30" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.68)" strokeWidth="3.4" strokeLinecap="round" />
                <path d="M 1 44 C 19 62, 40 63, 53 49" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.68)" strokeWidth="3.4" strokeLinecap="round" />
                <circle cx="-35" cy="-42" r="1.9" fill="hsl(var(--card) / 0.86)" />
                <path d="M -45 -26 C -34 -20, -18 -22, -10 -31" fill="none" stroke="hsl(var(--card) / 0.38)" strokeWidth="1.8" strokeLinecap="round" />
              </g>
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
