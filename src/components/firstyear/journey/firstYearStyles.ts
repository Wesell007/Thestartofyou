/**
 * Shared presentation constants for the signed-in First Year surfaces.
 *
 * One focus treatment and one typographic scale across the whole journey, so
 * the home reads as a single app surface rather than a stack of articles.
 * Presentation only: nothing here reads or writes journey data.
 */

/** Visible focus ring for links, buttons and cards. */
export const FY_FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Visible focus ring for text inputs, which take focus without a pointer. */
export const FY_FIELD_FOCUS_RING =
  "focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-transparent";

/** The quiet underlined text link used across the First Year cards. */
export const FY_QUIET_LINK = `inline-flex min-h-11 items-center rounded-sm font-sans text-[14px] text-foreground/80 underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground/50 ${FY_FOCUS_RING}`;

// ── Typographic scale ──────────────────────────────────────────────────────

/** Section heading, used once per block. */
export const FY_HEADING =
  "font-serif text-[1.45rem] sm:text-[1.6rem] leading-[1.2] text-foreground";

/** Card or tile title. */
export const FY_CARD_TITLE = "font-serif text-[1.08rem] leading-snug text-foreground";

/** Body copy inside a card. */
export const FY_CARD_BODY = "font-sans text-[13.5px] leading-[1.65] text-foreground/75";

/** Longer intro paragraph under a section heading. */
export const FY_INTRO =
  "font-sans text-[14.5px] leading-[1.72] text-foreground/80 max-w-[54ch]";

/** Uppercase kicker label. Pair with a tinted pill and a token colour. */
export const FY_KICKER =
  "inline-flex items-center rounded-full px-3 py-1 font-sans text-[11px] font-semibold tracking-[0.22em] uppercase";

/** Solid primary pill action. Pair with token background and foreground. */
export const FY_CTA = `inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-7 py-2.5 font-sans text-[14.5px] font-semibold shadow-cta transition-opacity hover:opacity-92 ${FY_FOCUS_RING}`;

/** Softer secondary pill action, used where a solid pill would compete. */
export const FY_CTA_SOFT = `inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-6 py-2.5 font-sans text-[14px] font-semibold transition-colors ${FY_FOCUS_RING}`;

// ── Phase 26B app-home surface scale ───────────────────────────────────────

/** The single card radius across the First Year home. */
export const FY_CARD_RADIUS = "rounded-[26px]";

/** Inner panel radius, one step tighter than a card. */
export const FY_INNER_RADIUS = "rounded-[18px]";

/** The dominant card shadow, used once per page on Today. */
export const FY_SHADOW_STRONG = "0 34px 70px -34px hsl(var(--stage-firstyear-ink) / 0.55)";

/** The quieter card shadow used by every supporting card. */
export const FY_SHADOW_SOFT = "0 22px 50px -36px hsl(var(--stage-firstyear-ink) / 0.4)";

/** Small chip used inside the app cards, for dates and ages. */
export const FY_CHIP =
  "inline-flex items-center rounded-full px-3 py-1 font-sans text-[11.5px] font-medium leading-snug";

/** Oversized serif display line, used once at the top of the page. */
export const FY_DISPLAY =
  "font-serif text-[2.4rem] sm:text-[3.1rem] leading-[1.04] text-foreground";
