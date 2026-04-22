interface Props {
  week: number;
  size?: number;
  className?: string;
}

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

/** Stage-aware fetal development illustration for the weekly hero card. */
const WeekIllustration = ({ week, size = 260, className }: Props) => {
  const w = Math.min(Math.max(week, 1), 42);
  const phase: "early" | "middle" | "late" | "overdue" =
    w <= 13 ? "early" : w <= 27 ? "middle" : w <= 40 ? "late" : "overdue";

  const phaseT =
    phase === "early"
      ? clamp((w - 1) / 12)
      : phase === "middle"
      ? clamp((w - 14) / 13)
      : phase === "late"
      ? clamp((w - 28) / 12)
      : clamp((w - 41) / 1);

  return (
    <svg
      viewBox="0 0 280 280"
      width={size}
      height={size}
      role="img"
      aria-label={`Week ${w}, softly stylised fetal development illustration`}
      className={className}
    >
      <defs>
        <filter id="paintedSoftness" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="softShadow" />
          <feOffset dx="0" dy="3" result="offsetShadow" />
          <feColorMatrix in="offsetShadow" type="matrix" values="0 0 0 0 0.58 0 0 0 0 0.18 0 0 0 0 0.12 0 0 0 0.18 0" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="wombGlow" cx="48%" cy="45%" r="68%">
          <stop offset="0%" stopColor="hsl(var(--card) / 0.42)" />
          <stop offset="38%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.38)" />
          <stop offset="68%" stopColor="hsl(var(--stage-pregnancy) / 0.72)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy) / 0)" />
        </radialGradient>
        <radialGradient id="babyFill" cx="36%" cy="22%" r="86%">
          <stop offset="0%" stopColor="hsl(var(--card) / 0.82)" />
          <stop offset="30%" stopColor="hsl(var(--stage-pregnancy) / 0.74)" />
          <stop offset="58%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.78)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.48)" />
        </radialGradient>
        <radialGradient id="skinWarmth" cx="62%" cy="72%" r="72%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.42)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0)" />
        </radialGradient>
        <radialGradient id="softHighlight" cx="30%" cy="20%" r="48%">
          <stop offset="0%" stopColor="hsl(var(--card) / 0.72)" />
          <stop offset="100%" stopColor="hsl(var(--card) / 0)" />
        </radialGradient>
        <linearGradient id="vesselLine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.64)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.24)" />
        </linearGradient>
      </defs>

      <circle cx="140" cy="140" r="130" fill="url(#wombGlow)" />
      <ellipse cx="140" cy="142" rx="112" ry="118" fill="hsl(var(--card) / 0.12)" stroke="hsl(var(--card) / 0.36)" strokeWidth="1.2" />
      <ellipse cx="140" cy="143" rx="91" ry="99" fill="hsl(var(--stage-pregnancy-accent) / 0.05)" stroke="hsl(var(--stage-pregnancy-accent) / 0.14)" strokeWidth="0.8" />
      <path d="M 56 119 C 79 55, 155 31, 210 70 C 258 104, 252 186, 203 224" fill="none" stroke="hsl(var(--card) / 0.38)" strokeWidth="7" strokeLinecap="round" opacity="0.52" />
      <path d="M 72 84 C 109 48, 171 48, 210 86" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.2)" strokeWidth="1.2" strokeLinecap="round" />

      {phase === "early" && (
        <g transform={`translate(140 ${148 + phaseT * 3}) scale(${0.82 + phaseT * 0.36}) rotate(${-22 + phaseT * 6})`} filter="url(#paintedSoftness)">
          <circle cx="0" cy="0" r="66" fill="hsl(var(--stage-pregnancy-accent) / 0.08)" />
          <path
            d="M -11 -32 C 16 -42, 43 -22, 43 8 C 43 32, 21 52, -6 49 C -35 45, -51 18, -40 -7 C -34 -22, -24 -29, -11 -32 Z"
            fill="url(#babyFill)"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.22)"
            strokeWidth="0.9"
          />
          <path d="M -7 -29 C 13 -32, 28 -18, 26 -1 C 24 15, 8 25, -8 20 C -25 15, -31 -5, -22 -19 C -18 -25, -13 -28, -7 -29 Z" fill="url(#softHighlight)" />
          <path d="M 2 17 C 14 20, 23 28, 25 39" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.48)" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M -10 -17 C 7 -12, 15 4, 10 18 C 5 31, -10 36, -23 29"
            fill="none"
            stroke="hsl(var(--card) / 0.52)"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
          <path d="M 8 22 C -2 23, -12 18, -17 9" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.52)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="9" cy="-18" r="1.35" fill="hsl(var(--card) / 0.86)" />
          <ellipse cx="12" cy="22" rx="22" ry="18" fill="url(#skinWarmth)" />
        </g>
      )}

      {phase === "middle" && (
        <g transform={`translate(140 ${151 + phaseT * 4}) scale(${0.98 + phaseT * 0.16}) rotate(${-13 + phaseT * 2})`} filter="url(#paintedSoftness)">
          <circle cx="0" cy="0" r="80" fill="hsl(var(--stage-pregnancy-accent) / 0.08)" />
          <path d="M -54 -40 C -46 -68, -8 -70, 8 -47 C 22 -27, 5 -1, -24 0 C -51 1, -65 -18, -54 -40 Z" fill="url(#babyFill)" stroke="hsl(var(--stage-pregnancy-accent) / 0.22)" strokeWidth="0.9" />
          <path
            d="M -8 -15 C 34 -27, 66 6, 57 42 C 49 75, 10 91, -24 73 C -55 56, -65 20, -42 -3 C -32 -12, -20 -15, -8 -15 Z"
            fill="url(#babyFill)"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.22)"
            strokeWidth="0.9"
          />
          <path d="M -13 -1 C 9 18, 1 47, -25 58" fill="none" stroke="hsl(var(--card) / 0.52)" strokeWidth="2.7" strokeLinecap="round" />
          <path d="M 7 8 C 31 -1, 51 12, 48 34" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.62)" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M -2 50 C 22 71, 49 66, 63 47" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.62)" strokeWidth="3.6" strokeLinecap="round" />
          <path d="M -39 -17 C -25 -8, -10 -15, -2 -31" fill="none" stroke="hsl(var(--card) / 0.42)" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="-39" cy="-40" r="1.55" fill="hsl(var(--card) / 0.88)" />
          <path d="M -52 -23 C -37 -13, -18 -18, -7 -32" fill="none" stroke="hsl(var(--card) / 0.46)" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="-38" cy="-45" rx="29" ry="22" fill="url(#softHighlight)" />
          <ellipse cx="22" cy="48" rx="43" ry="34" fill="url(#skinWarmth)" />
        </g>
      )}

      {phase === "late" && (
        <g transform={`translate(142 ${160 + phaseT * 7}) scale(${1.12 + phaseT * 0.14}) rotate(${-18 + phaseT * 2})`} filter="url(#paintedSoftness)">
          <circle cx="0" cy="0" r="88" fill="hsl(var(--stage-pregnancy-accent) / 0.08)" />
          <path d="M -60 -43 C -52 -72, -12 -73, 5 -50 C 22 -28, 3 0, -26 1 C -54 2, -70 -19, -60 -43 Z" fill="url(#babyFill)" stroke="hsl(var(--stage-pregnancy-accent) / 0.22)" strokeWidth="0.9" />
          <path
            d="M -10 -18 C 41 -31, 75 8, 62 51 C 50 91, -6 103, -45 72 C -78 46, -73 5, -43 -11 C -33 -17, -21 -19, -10 -18 Z"
            fill="url(#babyFill)"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.22)"
            strokeWidth="0.9"
          />
          <path d="M -14 -1 C 12 20, 2 52, -27 65" fill="none" stroke="hsl(var(--card) / 0.46)" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 7 10 C 37 -1, 61 14, 58 37" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.58)" strokeWidth="3.8" strokeLinecap="round" />
          <path d="M -2 57 C 27 80, 58 73, 72 51" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.58)" strokeWidth="3.8" strokeLinecap="round" />
          <path d="M 30 35 C 39 45, 54 44, 64 36" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.48)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="-45" cy="-49" r="1.55" fill="hsl(var(--card) / 0.86)" />
          <path d="M -58 -31 C -42 -21, -22 -27, -10 -42" fill="none" stroke="hsl(var(--card) / 0.42)" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="-43" cy="-51" rx="30" ry="23" fill="url(#softHighlight)" />
          <ellipse cx="25" cy="51" rx="48" ry="38" fill="url(#skinWarmth)" />
        </g>
      )}

      {phase === "overdue" && (
        <g transform="translate(140 160) scale(1.18) rotate(-14)" filter="url(#paintedSoftness)">
          <circle cx="0" cy="0" r="86" fill="hsl(var(--stage-pregnancy-accent) / 0.08)" />
          <ellipse cx="-29" cy="-42" rx="32" ry="36" fill="url(#babyFill)" stroke="hsl(var(--stage-pregnancy-accent) / 0.32)" strokeWidth="1" />
          <path d="M -2 -18 C 45 -17, 67 19, 43 57 C 19 94, -39 82, -56 45 C -67 20, -53 -8, -27 -18 C -18 -21, -9 -21, -2 -18 Z" fill="url(#babyFill)" stroke="hsl(var(--stage-pregnancy-accent) / 0.32)" strokeWidth="1" />
          <path d="M -5 -1 C 15 16, 7 44, -18 56" fill="none" stroke="hsl(var(--card) / 0.4)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 8 13 C 31 5, 49 16, 49 34" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.68)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 0 49 C 23 71, 50 69, 63 52" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.68)" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="-39" cy="-47" r="1.9" fill="hsl(var(--card) / 0.88)" />
          <ellipse cx="-34" cy="-47" rx="24" ry="20" fill="url(#softHighlight)" />
        </g>
      )}

      <path d="M 92 218 C 114 235, 165 236, 190 217" fill="none" stroke="url(#vesselLine)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <g transform="translate(140, 49)">
        <circle cx="0" cy="0" r="3" fill="hsl(var(--stage-pregnancy-accent) / 0.72)" />
        <path d="M 0 -4 C 5 -8, 10 -13, 12 -19" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.5)" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M 0 -4 C -5 -8, -10 -13, -12 -19" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.5)" strokeWidth="0.9" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export default WeekIllustration;
