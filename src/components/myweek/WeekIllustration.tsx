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
        <radialGradient id="wombGlow" cx="48%" cy="48%" r="66%">
          <stop offset="0%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.42)" />
          <stop offset="52%" stopColor="hsl(var(--stage-pregnancy) / 0.78)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy) / 0)" />
        </radialGradient>
        <radialGradient id="babyFill" cx="34%" cy="24%" r="82%">
          <stop offset="0%" stopColor="hsl(var(--card) / 0.62)" />
          <stop offset="36%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.88)" />
          <stop offset="100%" stopColor="hsl(var(--stage-pregnancy-accent) / 0.6)" />
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
      <ellipse cx="140" cy="142" rx="114" ry="118" fill="hsl(var(--card) / 0.1)" stroke="hsl(var(--stage-pregnancy-accent) / 0.18)" strokeWidth="0.8" />
      <ellipse cx="140" cy="144" rx="91" ry="99" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.2)" strokeWidth="0.7" strokeDasharray="1 7" />

      {phase === "early" && (
        <g transform={`translate(140 ${148 + phaseT * 3}) scale(${0.8 + phaseT * 0.36}) rotate(${-25 + phaseT * 7})`}>
          <circle cx="0" cy="0" r="64" fill="hsl(var(--stage-pregnancy-accent) / 0.09)" />
          <path
            d="M -7 -28 C 16 -34, 39 -17, 36 10 C 34 34, 11 50, -13 42 C -37 34, -46 6, -31 -14 C -24 -23, -16 -27, -7 -28 Z"
            fill="url(#babyFill)"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.34)"
            strokeWidth="1"
          />
          <path
            d="M -8 -17 C 8 -12, 17 3, 12 17 C 8 30, -5 36, -18 31"
            fill="none"
            stroke="hsl(var(--card) / 0.48)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M 7 20 C -3 20, -10 16, -14 9" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.54)" strokeWidth="1.7" strokeLinecap="round" />
          <path
            d="M 21 17 C 37 26, 42 40, 32 52"
            fill="none"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.62)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="8" cy="-17" r="1.5" fill="hsl(var(--card) / 0.86)" />
          <ellipse cx="-12" cy="-21" rx="27" ry="20" fill="url(#softHighlight)" />
        </g>
      )}

      {phase === "middle" && (
        <g transform={`translate(140 ${151 + phaseT * 4}) scale(${0.97 + phaseT * 0.16}) rotate(${-16 + phaseT * 3})`}>
          <circle cx="0" cy="0" r="78" fill="hsl(var(--stage-pregnancy-accent) / 0.08)" />
          <path d="M -52 -38 C -45 -60, -15 -64, -1 -45 C 13 -26, 0 -4, -23 -1 C -45 2, -60 -16, -52 -38 Z" fill="url(#babyFill)" stroke="hsl(var(--stage-pregnancy-accent) / 0.34)" strokeWidth="1" />
          <path
            d="M -7 -14 C 29 -23, 58 6, 49 39 C 42 68, 9 83, -20 68 C -49 53, -58 20, -38 -2 C -29 -11, -19 -14, -7 -14 Z"
            fill="url(#babyFill)"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.34)"
            strokeWidth="1"
          />
          <path d="M -11 -1 C 8 17, 2 42, -22 52" fill="none" stroke="hsl(var(--card) / 0.5)" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 7 8 C 30 1, 46 12, 43 31" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.72)" strokeWidth="3" strokeLinecap="round" />
          <path d="M -4 43 C 15 61, 40 59, 53 43" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.72)" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M -36 -15 C -23 -8, -10 -14, -2 -29" fill="none" stroke="hsl(var(--card) / 0.36)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="-39" cy="-39" r="1.8" fill="hsl(var(--card) / 0.9)" />
          <path d="M -51 -22 C -37 -13, -19 -17, -8 -31" fill="none" stroke="hsl(var(--card) / 0.42)" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="-38" cy="-43" rx="24" ry="18" fill="url(#softHighlight)" />
        </g>
      )}

      {phase === "late" && (
        <g transform={`translate(142 ${160 + phaseT * 8}) scale(${1.12 + phaseT * 0.15}) rotate(${-20 + phaseT * 2})`}>
          <circle cx="0" cy="0" r="86" fill="hsl(var(--stage-pregnancy-accent) / 0.08)" />
          <path d="M -59 -42 C -51 -68, -15 -70, 2 -49 C 18 -29, 2 -3, -25 -1 C -52 1, -68 -18, -59 -42 Z" fill="url(#babyFill)" stroke="hsl(var(--stage-pregnancy-accent) / 0.32)" strokeWidth="1" />
          <path
            d="M -10 -18 C 38 -27, 69 9, 55 48 C 42 86, -9 96, -43 68 C -72 44, -67 5, -41 -10 C -31 -16, -20 -18, -10 -18 Z"
            fill="url(#babyFill)"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.32)"
            strokeWidth="1"
          />
          <path d="M -13 -1 C 10 18, 2 48, -24 61" fill="none" stroke="hsl(var(--card) / 0.42)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 6 9 C 33 0, 54 13, 51 34" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.68)" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M -4 52 C 22 72, 50 67, 64 48" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.68)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 28 33 C 37 41, 50 41, 59 34" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.54)" strokeWidth="2.3" strokeLinecap="round" />
          <circle cx="-45" cy="-48" r="1.9" fill="hsl(var(--card) / 0.88)" />
          <path d="M -57 -30 C -42 -21, -23 -26, -12 -40" fill="none" stroke="hsl(var(--card) / 0.38)" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="-43" cy="-50" rx="26" ry="20" fill="url(#softHighlight)" />
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
