import { cn } from "@/lib/utils";
import botanicalSrc from "@/assets/botanical-corner.png";

/**
 * Shared botanical art-direction layer used across calculator result pages.
 * Each page passes its own stage colour token via `tone` so the illustration
 * system feels like one premium family while the colour stays stage-correct.
 *
 * tones:
 *   - "ttc"       → green / sage (TTC hub)
 *   - "ivf"       → IVF colour family
 *   - "pregnancy" → pregnancy colour family
 *   - "sage"      → neutral sage fallback
 */

type Tone = "ttc" | "ivf" | "pregnancy" | "sage";

const toneToColor = (tone: Tone) => {
  switch (tone) {
    case "ttc":
      return "hsl(var(--stage-ttc-accent))";
    case "ivf":
      return "hsl(var(--stage-ivf-accent))";
    case "pregnancy":
      return "hsl(var(--stage-pregnancy-accent))";
    default:
      return "hsl(var(--sage))";
  }
};

/* ── Botanical illustration accent (corner art) ─────────────────────── */
export const BotanicalAccent = ({
  className,
  flip = false,
  opacity = "opacity-[0.42]",
  size = "w-[220px] md:w-[320px]",
}: {
  className?: string;
  flip?: boolean;
  opacity?: string;
  size?: string;
}) => (
  <img
    src={botanicalSrc}
    alt=""
    aria-hidden="true"
    className={cn(
      "pointer-events-none absolute select-none h-auto",
      size,
      opacity,
      flip && "-scale-x-100",
      className
    )}
  />
);

/* ── Sprig (decorative botanical mark, used as a section divider) ───── */
export const Sprig = ({
  className,
  tone = "sage",
}: {
  className?: string;
  tone?: Tone;
}) => (
  <svg
    viewBox="0 0 64 64"
    aria-hidden="true"
    className={cn("pointer-events-none select-none", className)}
    style={{ color: toneToColor(tone) }}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
  >
    <path d="M32 60 C 32 40, 32 24, 32 6" />
    <path d="M32 46 C 24 44, 18 40, 16 32" />
    <path d="M32 36 C 40 34, 46 30, 48 22" />
    <path d="M32 26 C 26 24, 22 20, 21 14" />
    <path d="M32 18 C 38 16, 42 12, 43 8" />
  </svg>
);

/* ── Ambient stage glow (soft tonal wash) ───────────────────────────── */
export const StageGlow = ({
  className,
  tone = "sage",
  opacity = 0.7,
}: {
  className?: string;
  tone?: Tone;
  opacity?: number;
}) => (
  <div
    aria-hidden="true"
    className={cn("pointer-events-none absolute", className)}
    style={{
      background: `radial-gradient(ellipse at center, ${toneToColor(tone)} 0%, transparent 65%)`,
      opacity: opacity * 0.18,
    }}
  />
);

/* ── Sprig divider row (centered, with thin flanking rules) ─────────── */
export const SprigDivider = ({
  tone = "sage",
  className,
}: {
  tone?: Tone;
  className?: string;
}) => (
  <div className={cn("flex items-center justify-center gap-5 py-2", className)}>
    <span
      className="h-px w-12 md:w-16"
      style={{ background: `${toneToColor(tone)}33` }}
    />
    <Sprig tone={tone} className="w-6 h-6 md:w-7 md:h-7 opacity-80" />
    <span
      className="h-px w-12 md:w-16"
      style={{ background: `${toneToColor(tone)}33` }}
    />
  </div>
);
