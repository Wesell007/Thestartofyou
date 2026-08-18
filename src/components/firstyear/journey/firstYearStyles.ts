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
export const FY_QUIET_LINK = `inline-flex min-h-11 items-center rounded-sm font-sans text-[14px] font-medium text-[hsl(var(--stage-firstyear-text))] underline underline-offset-4 decoration-[hsl(var(--stage-firstyear-text-soft)/0.55)] transition-colors hover:decoration-[hsl(var(--stage-firstyear-text))] ${FY_FOCUS_RING}`;

// ── Typographic scale ──────────────────────────────────────────────────────

/** Section heading, used once per block. */
export const FY_HEADING =
  "font-serif text-[1.45rem] sm:text-[1.62rem] leading-[1.18] text-foreground";

/** Card or tile title. */
export const FY_CARD_TITLE =
  "font-serif text-[1.1rem] font-medium leading-[1.4] text-foreground";

/** Body copy inside a card. */
export const FY_CARD_BODY =
  "font-sans text-[14px] leading-[1.65] text-[hsl(var(--stage-firstyear-text))]";

/** Longer intro paragraph under a section heading. */
export const FY_INTRO =
  "font-sans text-[14.5px] leading-[1.72] text-[hsl(var(--stage-firstyear-text))] max-w-[54ch]";

/** Quieter helper line: chips, captions and secondary notes. */
export const FY_HELPER =
  "font-sans text-[13px] leading-[1.6] font-medium text-[hsl(var(--stage-firstyear-text-soft))]";

/** Title of a compact list row in the lower sections. */
export const FY_ROW_TITLE =
  "font-sans text-[14.5px] font-semibold leading-snug text-foreground";

/** Description of a compact list row in the lower sections. */
export const FY_ROW_BODY =
  "font-sans text-[13.5px] leading-[1.62] text-[hsl(var(--stage-firstyear-text))]";

/** Arrow glyph contrast for list rows and cards. */
export const FY_ARROW = "text-[hsl(var(--stage-firstyear-text-soft))]";

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

// ── Phase 26C Today surface ────────────────────────────────────────────────

/** Small uppercase label above a card, a tile or a sheet section. */
export const FY_EYEBROW =
  "font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[hsl(var(--stage-firstyear-text-soft))]";

/** Tabular stopwatch face, used on the active cards only. */
export const FY_STOPWATCH =
  "font-sans text-[2.4rem] sm:text-[2.75rem] font-semibold leading-[1] tabular-nums tracking-[-0.01em] text-foreground";

/** One tint per care type, shared by the quick add tiles and timeline dots. */
export const FY_TYPE_TINT = {
  feed: {
    background: "hsl(var(--stage-firstyear-hero) / 0.6)",
    border: "hsl(var(--stage-firstyear-peach-soft) / 0.9)",
    dot: "hsl(var(--stage-firstyear-terracotta))",
  },
  sleep: {
    background: "hsl(var(--stage-firstyear-soft) / 0.75)",
    border: "hsl(var(--stage-firstyear-accent) / 0.28)",
    dot: "hsl(var(--stage-firstyear-accent))",
  },
  nappy: {
    background: "hsl(var(--sage-bg))",
    border: "hsl(var(--sage) / 0.28)",
    dot: "hsl(var(--sage))",
  },
  note: {
    background: "hsl(var(--stage-firstyear-rose) / 0.7)",
    border: "hsl(var(--stage-firstyear-legacy-accent) / 0.26)",
    dot: "hsl(var(--stage-firstyear-legacy-accent))",
  },
  pump: {
    background: "hsl(var(--stage-firstyear-lilac) / 0.7)",
    border: "hsl(var(--lavender) / 0.4)",
    dot: "hsl(var(--lavender))",
  },
} as const;


// ── Shared sheet surface ───────────────────────────────────────────────────
// Neutral constants so any First Year surface can present a sheet in the same
// language, without reaching into another surface's folder.

/** Small uppercase label above a field or a chip group inside a sheet. */
export const FY_SHEET_LEGEND =
  "font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-[hsl(var(--stage-firstyear-text-soft))] mb-2.5";

/** Single-line input inside a sheet. */
export const FY_SHEET_FIELD = `min-h-11 rounded-[14px] border border-border/60 bg-background px-4 py-2 font-sans text-[14.5px] text-foreground ${FY_FIELD_FOCUS_RING}`;

/** Multi-line input inside a sheet. */
export const FY_SHEET_TEXTAREA = `w-full resize-none rounded-[14px] border border-border/60 bg-background px-4 py-3 font-sans text-[14.5px] leading-[1.7] text-foreground placeholder:text-muted-foreground/60 ${FY_FIELD_FOCUS_RING}`;

/** Quiet underlined action inside a sheet, such as Cancel. */
export const FY_SHEET_LINK = `${FY_FOCUS_RING} inline-flex min-h-11 items-center rounded-sm font-sans text-[13.5px] text-[hsl(var(--stage-firstyear-text))] underline underline-offset-4 hover:text-foreground`;

/** Full width primary action inside a sheet. */
export const FY_SHEET_PRIMARY = `${FY_CTA} w-full disabled:opacity-60`;

export const FY_SHEET_PRIMARY_STYLE_LEGACY = {
  backgroundColor: "hsl(var(--stage-firstyear-accent))",
  color: "hsl(var(--background))",
} as const;

/** Selectable pill, used for chip groups and quiet filters. */
export const FY_CHIP_BASE =
  "flex min-h-11 cursor-pointer items-center rounded-pill border px-[18px] py-2.5 font-sans text-[13.5px] font-medium transition-colors focus-within:ring-2 focus-within:ring-sage focus-within:ring-offset-2 focus-within:ring-offset-background";

export const FY_CHIP_SELECTED = "border-sage bg-sage/15 text-foreground";

export const FY_CHIP_IDLE =
  "border-border/60 bg-parchment text-[hsl(var(--stage-firstyear-text))] hover:border-foreground/25";

// ── Phase 26D keepsake surface ─────────────────────────────────────────────
// Shared paper language for the Memories shelf: one card surface, one polaroid
// treatment, one month rule. Presentation only.

/** The warm paper surface used by every keepsake card. */
export const FY_PAPER_CARD_STYLE = {
  backgroundColor: "hsl(var(--stage-firstyear-cream))",
  borderColor: "hsl(var(--stage-firstyear-peach-soft) / 0.75)",
  boxShadow:
    "0 1px 0 hsl(var(--background) / 0.7) inset, 0 26px 54px -38px hsl(var(--stage-firstyear-ink) / 0.45)",
} as const;

/** The stronger peach invitation surface, used once at the top of the shelf. */
export const FY_PEACH_INVITE_STYLE = {
  backgroundImage:
    "linear-gradient(155deg, hsl(var(--stage-firstyear-hero)) 0%, hsl(var(--stage-firstyear-peach-soft)) 58%, hsl(var(--stage-firstyear-hero)) 100%)",
  borderColor: "hsl(var(--stage-firstyear-peach-soft))",
  boxShadow:
    "0 1px 0 hsl(var(--background) / 0.55) inset, 0 30px 60px -34px hsl(var(--stage-firstyear-ink) / 0.5)",
} as const;

/** Uppercase month heading above a group of kept moments. */
export const FY_MONTH_HEADING =
  "font-sans text-[11.5px] font-semibold tracking-[0.24em] uppercase text-[hsl(var(--stage-firstyear-terracotta))]";

/** The paper mat around a kept photo. Tilt is applied by the caller. */
export const FY_POLAROID_STYLE = {
  backgroundColor: "hsl(var(--background))",
  borderColor: "hsl(var(--stage-firstyear-peach-soft) / 0.8)",
  boxShadow:
    "0 18px 40px -26px hsl(var(--stage-firstyear-ink) / 0.5), 6px 6px 0 -2px hsl(var(--stage-firstyear-cream)), 6px 6px 0 -1px hsl(var(--stage-firstyear-peach-soft) / 0.6)",
} as const;

/** Warm date chip on a keepsake card. */
export const FY_DATE_CHIP_STYLE = {
  backgroundColor: "hsl(var(--stage-firstyear-hero) / 0.85)",
  color: "hsl(var(--stage-firstyear-terracotta))",
} as const;

/** Softer sheet field surface, so writing feels like a card not a form. */
export const FY_SHEET_FIELD_STYLE = {
  backgroundColor: "hsl(var(--stage-firstyear-cream) / 0.6)",
  borderColor: "hsl(var(--stage-firstyear-peach-soft) / 0.8)",
} as const;
