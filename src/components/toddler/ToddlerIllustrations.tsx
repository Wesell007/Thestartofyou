/**
 * ToddlerIllustrations — lightweight inline SVG marks for the Toddler hub.
 *
 * Hand-drawn watercolour feel, muted woodland palette. Decorative only —
 * every mark is aria-hidden; consumers add pointer-events-none and tune
 * opacity. No external assets, no imports.
 */

type MarkProps = {
  className?: string;
};

const INK = "hsl(20 30% 28%)";
const FUR = "hsl(28 35% 62%)";
const FUR_DEEP = "hsl(20 30% 42%)";
const LEAF = "hsl(95 22% 52%)";
const LEAF_SOFT = "hsl(95 26% 72%)";
const CREAM = "hsl(40 30% 94%)";
const WING = "hsl(212 20% 52%)";

export const DeerMark = ({ className }: MarkProps) => (
  <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
    <ellipse cx="60" cy="118" rx="42" ry="8" fill={LEAF_SOFT} opacity="0.35" />
    <path d="M30 92c0-14 12-24 30-24s30 10 30 24c0 6-2 11-6 14H36c-4-3-6-8-6-14z" fill={FUR} stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M40 106v14M52 108v14M70 108v14M82 106v14" stroke={INK} strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="48" cy="82" r="1.6" fill={CREAM} />
    <circle cx="60" cy="78" r="1.4" fill={CREAM} />
    <circle cx="72" cy="84" r="1.6" fill={CREAM} />
    <circle cx="66" cy="90" r="1.2" fill={CREAM} />
    <path d="M84 70c4-2 8-1 10 2 3 4 2 9-1 12-2 2-4 3-7 3-3 0-7-2-9-5" fill={FUR} stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M91 60c-1-4 0-7 2-8 2 1 3 4 2 8" fill={FUR_DEEP} stroke={INK} strokeWidth="1" />
    <path d="M98 60c1-4 3-6 5-6 1 2 1 5-1 8" fill={FUR_DEEP} stroke={INK} strokeWidth="1" />
    <circle cx="93" cy="73" r="1" fill={INK} />
    <path d="M22 116q3-6 6 0M96 118q3-6 6 0M14 118q2-5 4 0" stroke={LEAF} strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export const RabbitMark = ({ className }: MarkProps) => (
  <svg viewBox="0 0 110 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
    <ellipse cx="55" cy="116" rx="38" ry="6" fill={LEAF_SOFT} opacity="0.35" />
    <path d="M30 90c0-14 10-22 25-22s25 8 25 22c0 8-4 15-12 18H42c-8-3-12-10-12-18z" fill={FUR} stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M40 96c4 6 12 9 15 9s11-3 15-9" stroke={CREAM} strokeWidth="1.2" fill="none" />
    <circle cx="55" cy="62" r="16" fill={FUR} stroke={INK} strokeWidth="1.2" />
    <path d="M47 50c-3-12-2-22 2-26 4 4 5 14 3 26z" fill={FUR} stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M63 50c3-12 2-22-2-26-4 4-5 14-3 26z" fill={FUR} stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M48 38c1-7 2-13 4-16M62 38c-1-7-2-13-4-16" stroke={FUR_DEEP} strokeWidth="1" fill="none" />
    <circle cx="50" cy="62" r="1.2" fill={INK} />
    <circle cx="60" cy="62" r="1.2" fill={INK} />
    <path d="M53 68q2 2 4 0" stroke={INK} strokeWidth="1" fill="none" strokeLinecap="round" />
    <ellipse cx="42" cy="108" rx="6" ry="3" fill={FUR} stroke={INK} strokeWidth="1" />
    <ellipse cx="68" cy="108" rx="6" ry="3" fill={FUR} stroke={INK} strokeWidth="1" />
  </svg>
);

export const ButterflyMark = ({ className }: MarkProps) => (
  <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
    <ellipse cx="30" cy="25" rx="1.4" ry="10" fill={INK} />
    <path d="M30 15c-2-4-5-6-8-6M30 15c2-4 5-6 8-6" stroke={INK} strokeWidth="0.8" fill="none" strokeLinecap="round" />
    <path d="M28 20c-8-10-18-10-20-2-1 6 4 10 10 11 4 0 8-3 10-5z" fill={WING} opacity="0.55" stroke={INK} strokeWidth="0.8" />
    <path d="M32 20c8-10 18-10 20-2 1 6-4 10-10 11-4 0-8-3-10-5z" fill={WING} opacity="0.55" stroke={INK} strokeWidth="0.8" />
    <path d="M28 30c-6 8-14 8-16 2-1-4 3-7 8-8 3 0 6 2 8 3z" fill={LEAF_SOFT} opacity="0.7" stroke={INK} strokeWidth="0.8" />
    <path d="M32 30c6 8 14 8 16 2 1-4-3-7-8-8-3 0-6 2-8 3z" fill={LEAF_SOFT} opacity="0.7" stroke={INK} strokeWidth="0.8" />
    <circle cx="15" cy="22" r="1.2" fill={CREAM} />
    <circle cx="45" cy="22" r="1.2" fill={CREAM} />
  </svg>
);

export const LeafSprig = ({ className }: MarkProps) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
    <path d="M6 50q30-30 88-40" stroke={LEAF} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M22 40q4-10 14-8-4 10-14 8z" fill={LEAF_SOFT} stroke={LEAF} strokeWidth="0.8" />
    <path d="M40 30q5-10 15-7-5 10-15 7z" fill={LEAF_SOFT} stroke={LEAF} strokeWidth="0.8" />
    <path d="M60 20q5-9 15-6-5 9-15 6z" fill={LEAF_SOFT} stroke={LEAF} strokeWidth="0.8" />
    <path d="M78 14q4-8 14-6-4 8-14 6z" fill={LEAF_SOFT} stroke={LEAF} strokeWidth="0.8" />
  </svg>
);

export const BirdMark = ({ className }: MarkProps) => (
  <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
    <path d="M14 38c0-10 8-18 20-18 8 0 14 4 18 10l14 2-12 6c-2 8-10 14-20 14-12 0-20-6-20-14z" fill={WING} opacity="0.7" stroke={INK} strokeWidth="1" />
    <path d="M24 34c4-2 12-2 18 2-4 6-12 8-18 4z" fill={LEAF} opacity="0.7" stroke={INK} strokeWidth="0.8" />
    <circle cx="50" cy="30" r="1" fill={INK} />
    <path d="M62 32l6-1-6 3z" fill={INK} />
    <path d="M30 50v6M40 50v6" stroke={INK} strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);
