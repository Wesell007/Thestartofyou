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
        <radialGradient id="wombGlow" cx="50%" cy="48%" r="64%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.34)" />
          <stop offset="58%" stopColor="hsl(var(--stage-pregnancy) / 0.74)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy) / 0)" />
        </radialGradient>
        <radialGradient id="babyFill" cx="38%" cy="28%" r="78%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.95)" />
          <stop offset="54%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.78)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.58)" />
        </radialGradient>
        <radialGradient id="softHighlight" cx="32%" cy="24%" r="40%">
          <stop offset="0%" stopColor="hsl(var(--card) / 0.54)" />
          <stop offset="100%" stopColor="hsl(var(--card) / 0)" />
        </radialGradient>
        <linearGradient id="vesselLine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.64)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.24)" />
        </linearGradient>
      </defs>

      <circle cx="140" cy="140" r="130" fill="url(#wombGlow)" />
      <ellipse cx="140" cy="142" rx="112" ry="116" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.16)" strokeWidth="0.8" />
      <ellipse cx="140" cy="143" rx="92" ry="98" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.18)" strokeWidth="0.7" strokeDasharray="1 7" />

      {phase === "early" && (
        <g transform={`translate(140 ${148 + phaseT * 3}) scale(${0.78 + phaseT * 0.36}) rotate(${-24 + phaseT * 8})`}>
          <circle cx="0" cy="0" r="62" fill="hsl(var(--stage-pregnancy-accent) / 0.08)" />
          <path
            d="M -8 -24 C 15 -31, 36 -15, 34 10 C 33 32, 12 47, -11 39 C -34 31, -43 6, -30 -12 C -24 -20, -17 -23, -8 -24 Z"
            fill="url(#babyFill)"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.34)"
            strokeWidth="1"
          />
          <path
            d="M -6 -15 C 7 -10, 15 3, 11 16 C 8 27, -3 33, -15 30"
            fill="none"
            stroke="hsl(var(--card) / 0.48)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 20 18 C 33 26, 38 38, 31 49"
            fill="none"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.62)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="7" cy="-15" r="1.6" fill="hsl(var(--card) / 0.85)" />
          <ellipse cx="-11" cy="-18" rx="26" ry="20" fill="url(#softHighlight)" />
        </g>
      )}

      {phase === "middle" && (
        <g transform={`translate(140 ${151 + phaseT * 4}) scale(${0.96 + phaseT * 0.16}) rotate(${-16 + phaseT * 3})`}>
          <circle cx="0" cy="0" r="78" fill="hsl(var(--stage-pregnancy-accent) / 0.08)" />
          <ellipse cx="-24" cy="-34" rx="27" ry="32" fill="url(#babyFill)" stroke="hsl(var(--stage-pregnancy-accent) / 0.34)" strokeWidth="1" />
          <path
            d="M -2 -16 C 33 -15, 55 14, 38 45 C 22 74, -21 75, -43 49 C -58 31, -53 6, -35 -7 C -27 -13, -16 -17, -2 -16 Z"
            fill="url(#babyFill)"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.34)"
            strokeWidth="1"
          />
          <path d="M -5 -2 C 12 13, 6 34, -14 44" fill="none" stroke="hsl(var(--card) / 0.46)" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 8 8 C 28 4, 41 13, 39 29" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.74)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 0 38 C 15 56, 36 58, 50 45" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.72)" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 27 44 C 35 50, 43 50, 49 45" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.58)" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="-33" cy="-39" r="1.9" fill="hsl(var(--card) / 0.9)" />
          <path d="M -43 -22 C -31 -15, -16 -17, -7 -27" fill="none" stroke="hsl(var(--card) / 0.42)" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="-29" cy="-41" rx="22" ry="18" fill="url(#softHighlight)" />
        </g>
      )}

      {phase === "late" && (
        <g transform={`translate(142 ${160 + phaseT * 8}) scale(${1.12 + phaseT * 0.15}) rotate(${-20 + phaseT * 2})`}>
          <circle cx="0" cy="0" r="86" fill="hsl(var(--stage-pregnancy-accent) / 0.08)" />
          <ellipse cx="-28" cy="-42" rx="31" ry="36" fill="url(#babyFill)" stroke="hsl(var(--stage-pregnancy-accent) / 0.32)" strokeWidth="1" />
          <path
            d="M -2 -20 C 43 -18, 65 18, 42 55 C 19 91, -35 83, -54 48 C -68 22, -55 -7, -28 -17 C -20 -20, -11 -21, -2 -20 Z"
            fill="url(#babyFill)"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.32)"
            strokeWidth="1"
          />
          <path d="M -5 -3 C 15 15, 8 43, -17 55" fill="none" stroke="hsl(var(--card) / 0.4)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 8 10 C 31 3, 49 15, 48 33" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.68)" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M 2 48 C 23 68, 48 67, 61 51" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.68)" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="-38" cy="-47" r="1.9" fill="hsl(var(--card) / 0.88)" />
          <path d="M -49 -30 C -37 -23, -20 -25, -11 -35" fill="none" stroke="hsl(var(--card) / 0.38)" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="-33" cy="-46" rx="24" ry="20" fill="url(#softHighlight)" />
        </g>
      )}

      {phase === "overdue" && (
        <g transform="translate(140 160) scale(1.18) rotate(-14)">
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
