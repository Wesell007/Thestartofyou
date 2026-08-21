/**
 * Decorative-only illustration layer for the signed-in First Year hero.
 *
 * Hand-built inline SVG and CSS using existing First Year tokens: a soft peach
 * wave band, a quiet monogram disc, a footprint pair and small botanical
 * accents. Nothing here is interactive, focusable or announced.
 */

type Props = {
  /** Single initial for the quiet monogram disc, when a name is available. */
  initial?: string | null;
};

const FirstYearHeroDecor = ({ initial }: Props) => {
  const mark = initial?.trim().charAt(0).toUpperCase() ?? "";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]"
    >
      {/* Soft blurred washes, kept from the previous hero but quieter. */}
      <div
        className="absolute -left-16 top-0 h-[240px] w-[300px] rounded-full blur-[52px]"
        style={{ backgroundColor: "hsl(var(--stage-firstyear-hero) / 0.7)" }}
      />
      <div
        className="absolute right-[-70px] top-8 h-[210px] w-[260px] rounded-full blur-[58px]"
        style={{ backgroundColor: "hsl(var(--stage-firstyear-peach) / 0.75)" }}
      />

      {/* Organic wave band sweeping across the top. */}
      <svg
        focusable="false"
        className="absolute inset-x-0 top-0 h-[58%] w-full"
        viewBox="0 0 400 140"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0H400V50C332 92 268 58 196 76C124 94 62 130 0 106Z"
          fill="hsl(var(--stage-firstyear-hero) / 0.55)"
        />
        <path
          d="M0 0H400V24C338 64 250 38 176 56C104 74 58 98 0 80Z"
          fill="hsl(var(--stage-firstyear-peach-soft) / 0.4)"
        />
      </svg>

      {/* Monogram disc, tucked into the decorative area and hidden on mobile. */}
      {mark && (
        <svg
          focusable="false"
          className="absolute right-6 top-7 hidden h-12 w-12 sm:block"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r="23"
            fill="hsl(var(--stage-firstyear-cream) / 0.9)"
            stroke="hsl(var(--stage-firstyear-peach-soft) / 0.8)"
          />
          <text
            x="24"
            y="30"
            textAnchor="middle"
            fontSize="17"
            fontFamily="Georgia, serif"
            fill="hsl(var(--stage-firstyear-terracotta) / 0.7)"
          >
            {mark}
          </text>
        </svg>
      )}

      {/* Footprint pair, lower right. */}
      <svg
        focusable="false"
        className="absolute bottom-3 right-5 h-16 w-16 sm:right-10 sm:h-20 sm:w-20"
        viewBox="0 0 80 80"
      >
        <g fill="hsl(var(--stage-firstyear-peach-soft) / 0.75)">
          <ellipse cx="24" cy="46" rx="9" ry="13" transform="rotate(-14 24 46)" />
          <circle cx="17" cy="31" r="3.1" />
          <circle cx="24" cy="28.5" r="2.7" />
          <circle cx="30.5" cy="29.5" r="2.3" />
          <ellipse cx="52" cy="56" rx="9" ry="13" transform="rotate(-10 52 56)" />
          <circle cx="45.5" cy="41" r="3.1" />
          <circle cx="52.5" cy="38.5" r="2.7" />
          <circle cx="59" cy="39.5" r="2.3" />
        </g>
      </svg>

      {/* Small bloom with leaves, beside the footprints. */}
      <svg
        focusable="false"
        className="absolute bottom-2 right-[76px] h-12 w-12 sm:right-28 sm:h-14 sm:w-14"
        viewBox="0 0 64 64"
      >
        <path d="M32 40C24 40 16 36 14 28C22 26 30 30 32 38Z" fill="hsl(var(--sage) / 0.3)" />
        <path d="M34 42C40 42 48 39 50 32C42 30 36 34 34 41Z" fill="hsl(var(--sage) / 0.22)" />
        <g fill="hsl(var(--stage-firstyear-terracotta) / 0.42)">
          <circle cx="32" cy="18" r="6" />
          <circle cx="24" cy="24" r="6" />
          <circle cx="40" cy="24" r="6" />
          <circle cx="28" cy="32" r="6" />
          <circle cx="37" cy="32" r="6" />
        </g>
        <circle cx="32" cy="25" r="4" fill="hsl(var(--stage-firstyear-cream))" />
      </svg>

      {/* Leaf sprig on the opposite side, simplified away on mobile. */}
      <svg
        focusable="false"
        className="absolute bottom-4 left-2 hidden h-14 w-14 sm:block"
        viewBox="0 0 56 56"
      >
        <path
          d="M28 52C28 36 32 22 44 12"
          stroke="hsl(var(--sage) / 0.3)"
          strokeWidth="1.6"
          fill="none"
        />
        <path d="M30 40C30 32 36 28 42 28C42 36 36 40 30 40Z" fill="hsl(var(--sage) / 0.22)" />
        <path d="M27 30C21 28 19 22 20 16C26 18 29 24 27 30Z" fill="hsl(var(--sage) / 0.18)" />
      </svg>
    </div>
  );
};

export default FirstYearHeroDecor;
