/**
 * Phase 28B — shared presentation constants for the signed-in TTC journey.
 *
 * Translated from the approved TTC concept board: cream paper, soft sage and
 * muted olive, blush and peach warmth, thin serif headings, small uppercase
 * labels and quiet actions. Presentation only: nothing here reads or writes
 * journey data, and every interactive constant clears a 44px tap target.
 */

/** Visible focus ring for links, buttons and cards. */
export const TTC_FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--stage-ttc-olive))] focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** The single card radius across the TTC app surfaces. */
export const TTC_CARD_RADIUS = "rounded-[22px]";

/** Inner panel radius, one step tighter than a card. */
export const TTC_INNER_RADIUS = "rounded-[16px]";

/** Paper card surface: cream face, hairline edge, low soft shadow. */
export const TTC_PAPER_CARD = `ttc-paper ${TTC_CARD_RADIUS}`;

/** Warmer paper card, for the hopeful surfaces. */
export const TTC_PAPER_CARD_WARM = `ttc-paper-warm ${TTC_CARD_RADIUS}`;

/** Standard paper card padding. */
export const TTC_CARD_PAD = "px-6 sm:px-8 py-7 sm:py-8";

/** Tighter padding for tiles and small panels. */
export const TTC_TILE_PAD = "px-5 py-5";

/** Small uppercase section label. */
export const TTC_EYEBROW =
  "font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase text-[hsl(var(--stage-ttc-olive))]";

/** Thin serif section heading. */
export const TTC_HEADING =
  "font-serif font-normal text-foreground leading-[1.16] tracking-tight";

/** Card or tile title. */
export const TTC_CARD_TITLE =
  "font-serif text-[1.05rem] sm:text-[1.12rem] font-normal leading-[1.3] text-foreground";

/** Reading copy inside a paper card. */
export const TTC_CARD_BODY =
  "font-serif text-[1.02rem] sm:text-[1.08rem] leading-[1.75] text-[hsl(var(--stage-ttc-text))] max-w-[52ch]";

/** Interface copy: hints, captions and secondary lines. */
export const TTC_HELPER =
  "font-sans text-[13px] leading-[1.6] text-[hsl(var(--stage-ttc-text-soft))]";

/** Quiet underlined text link. */
export const TTC_QUIET_LINK = `inline-flex min-h-11 items-center rounded-sm font-sans text-[13.5px] font-medium text-[hsl(var(--stage-ttc-olive))] underline underline-offset-4 decoration-[hsl(var(--stage-ttc-olive)/0.4)] transition-colors hover:decoration-[hsl(var(--stage-ttc-olive))] ${TTC_FOCUS_RING}`;

/** Soft sage pill, the primary calm TTC action. */
export const TTC_SOFT_PILL = `inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-6 py-2.5 font-sans text-[14px] font-medium text-[hsl(var(--stage-ttc-olive))] bg-[hsl(var(--stage-ttc-sage))] border border-[hsl(var(--stage-ttc-olive)/0.22)] transition-colors hover:bg-[hsl(var(--stage-ttc-sage-soft))] ${TTC_FOCUS_RING}`;

/** Olive pill, used once per surface where a firmer action is needed. */
export const TTC_OLIVE_PILL = `inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-6 py-2.5 font-sans text-[14px] font-medium text-[hsl(var(--stage-ttc-cream))] bg-[hsl(var(--stage-ttc-olive))] transition-opacity hover:opacity-90 ${TTC_FOCUS_RING}`;

/** Outlined pill, quieter than the olive fill. */
export const TTC_OUTLINE_PILL = `inline-flex min-h-11 items-center justify-center gap-2 rounded-pill border border-[hsl(var(--stage-ttc-olive)/0.45)] px-5 py-2.5 font-sans text-[13.5px] font-medium text-[hsl(var(--stage-ttc-olive))] transition-colors hover:bg-[hsl(var(--stage-ttc-sage)/0.7)] ${TTC_FOCUS_RING}`;

/** Round icon control, 44px tap target with a small visual footprint. */
export const TTC_ICON_CONTROL = `inline-flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--stage-ttc-olive)/0.32)] text-[hsl(var(--stage-ttc-olive))] transition-colors hover:bg-[hsl(var(--stage-ttc-sage)/0.7)] ${TTC_FOCUS_RING}`;

/** Fine line icon bubble used inside cards. */
export const TTC_ICON_BUBBLE =
  "flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--stage-ttc-olive)/0.22)] bg-[hsl(var(--stage-ttc-sage-tint))] text-[hsl(var(--stage-ttc-olive))]";

/** Small sage chip, for milestone and value labels. */
export const TTC_CHIP =
  "inline-flex items-center rounded-pill bg-[hsl(var(--stage-ttc-sage))] px-2.5 py-[2px] font-sans text-[10.5px] font-medium tracking-[0.08em] uppercase text-[hsl(var(--stage-ttc-olive))]";

/** Journal-like note field surface. */
export const TTC_NOTE_PANEL = `${TTC_INNER_RADIUS} border border-[hsl(var(--stage-ttc-olive)/0.16)] bg-[hsl(var(--stage-ttc-sage-tint)/0.55)] px-4 py-4`;


/** Soft divider between blocks inside a card. */
export const TTC_DIVIDER = "ttc-rule my-6";

/** Bottom nav tab, TTC tint. */
export const TTC_NAV_ACTIVE = "text-[hsl(var(--stage-ttc-olive))] font-medium";
export const TTC_NAV_INACTIVE =
  "text-[hsl(var(--stage-ttc-text-soft))] font-light hover:text-foreground";
