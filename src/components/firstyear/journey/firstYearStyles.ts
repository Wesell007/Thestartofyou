/**
 * Shared presentation constants for the signed-in First Year surfaces.
 *
 * One focus treatment across the whole journey, so keyboard users see the same
 * ring on the home, the daily note, memories, the kept pregnancy chapter and
 * setup. Presentation only: nothing here reads or writes journey data.
 */

/** Visible focus ring for links, buttons and cards. */
export const FY_FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Visible focus ring for text inputs, which take focus without a pointer. */
export const FY_FIELD_FOCUS_RING =
  "focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-transparent";

/** The quiet underlined text link used across the First Year cards. */
export const FY_QUIET_LINK = `inline-flex min-h-11 items-center rounded-sm font-sans text-[13.5px] text-foreground/70 underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground/40 ${FY_FOCUS_RING}`;
