/**
 * Phase 27B — shared presentation constants for the signed-in pregnancy app.
 *
 * The pregnancy journey is the digital companion to the physical journal:
 * warm cream paper, one card radius, thin serif headings, small uppercase
 * labels and quiet links. Presentation only: nothing here reads or writes
 * journey data.
 */

/** Visible focus ring for links, buttons and cards. */
export const PG_FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--stage-pregnancy-accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** The single card radius across the pregnancy app surfaces. */
export const PG_CARD_RADIUS = "rounded-[22px]";

/** Inner panel radius, one step tighter than a card. */
export const PG_INNER_RADIUS = "rounded-[16px]";

/** Paper card surface: cream face, hairline edge, low soft shadow. */
export const PG_PAPER_CARD = `pregnancy-paper ${PG_CARD_RADIUS}`;

/** Standard paper card padding. */
export const PG_CARD_PAD = "px-6 sm:px-8 py-7 sm:py-8";

/** Small uppercase section label. Pair with the hairline lead-in dash. */
export const PG_EYEBROW =
  "font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase text-[hsl(var(--stage-pregnancy-accent))]";

/** Thin serif section heading. */
export const PG_HEADING =
  "font-serif font-medium text-foreground leading-[1.14] tracking-tight";

/** Card or tile title. */
export const PG_CARD_TITLE =
  "font-serif text-[1.05rem] sm:text-[1.1rem] font-medium leading-[1.3] text-foreground";

/** Reading copy inside a paper card. */
export const PG_CARD_BODY =
  "font-serif text-[1.05rem] sm:text-[1.12rem] leading-[1.75] text-[hsl(var(--stage-pregnancy-text))] max-w-[52ch]";

/** Interface copy inside a card: hints, captions and secondary lines. */
export const PG_HELPER =
  "font-sans text-[13px] leading-[1.6] text-[hsl(var(--stage-pregnancy-text-soft))]";

/** Quiet underlined text link. */
export const PG_QUIET_LINK = `inline-flex min-h-11 items-center rounded-sm font-sans text-[13.5px] font-medium text-[hsl(var(--stage-pregnancy-text))] underline underline-offset-4 decoration-[hsl(var(--stage-pregnancy-text-soft)/0.5)] transition-colors hover:decoration-[hsl(var(--stage-pregnancy-text))] ${PG_FOCUS_RING}`;

/** Soft pill action, used where a solid CTA would feel like selling. */
export const PG_SOFT_PILL = `inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-6 py-2.5 font-sans text-[14px] font-medium text-[hsl(var(--stage-pregnancy-text))] bg-[hsl(var(--stage-pregnancy-blush))] transition-colors hover:bg-[hsl(var(--stage-pregnancy-peach))] ${PG_FOCUS_RING}`;

/** Fine line icon bubble used on toolkit and tool cards. */
export const PG_ICON_BUBBLE =
  "flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--stage-pregnancy-edge))] bg-[hsl(var(--stage-pregnancy-cream))]";

/** Photo frame treatment, echoing a taped keepsake print. */
export const PG_PHOTO_FRAME =
  "rounded-[14px] border border-[hsl(var(--stage-pregnancy-edge))] bg-card p-2 shadow-[0_18px_40px_-30px_hsl(var(--stage-pregnancy-text)/0.6)]";

/**
 * Phase 27G — shared media keepsake controls.
 *
 * Every media action across the weekly photo, video and voice slots uses one
 * of these so the group reads as a single set of kept moments rather than
 * three separate upload utilities. All of them clear a 44px tap target.
 */

/** Quiet outlined action pill sitting on paper. */
export const PG_MEDIA_ACTION = `inline-flex min-h-11 items-center justify-center gap-2 rounded-pill border border-[hsl(var(--stage-pregnancy-accent)/0.42)] px-4 py-2 font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[hsl(var(--stage-pregnancy-accent))] transition-colors hover:bg-[hsl(var(--stage-pregnancy-accent)/0.1)] disabled:opacity-60 ${PG_FOCUS_RING}`;

/** Even quieter text action, for cancel, discard and edit. */
export const PG_MEDIA_ACTION_QUIET = `inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-4 py-2 font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[hsl(var(--stage-pregnancy-text-soft))] transition-colors hover:text-[hsl(var(--stage-pregnancy-text))] disabled:opacity-60 ${PG_FOCUS_RING}`;

/** Control that sits over saved media. Token scrim, readable on any frame. */
export const PG_MEDIA_OVERLAY_ACTION = `inline-flex min-h-11 items-center justify-center gap-1.5 rounded-pill bg-[hsl(var(--stage-pregnancy-text)/0.55)] px-3.5 py-2 font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[hsl(var(--stage-pregnancy-cream))] backdrop-blur-md transition-colors hover:bg-[hsl(var(--stage-pregnancy-text)/0.72)] disabled:opacity-60 ${PG_FOCUS_RING}`;

/** Square variant of the overlay action, for the remove cross. */
export const PG_MEDIA_OVERLAY_ICON = `inline-flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--stage-pregnancy-text)/0.55)] text-[hsl(var(--stage-pregnancy-cream))] backdrop-blur-md transition-colors hover:bg-[hsl(var(--stage-pregnancy-text)/0.72)] disabled:opacity-60 ${PG_FOCUS_RING}`;

/** Non-interactive badge over saved media. */
export const PG_MEDIA_OVERLAY_BADGE =
  "inline-flex items-center gap-1.5 rounded-pill bg-[hsl(var(--stage-pregnancy-text)/0.5)] px-2.5 py-1 font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[hsl(var(--stage-pregnancy-cream))] backdrop-blur-md";

/** Caption panel shell shared by photo, video and voice. */
export const PG_MEDIA_CAPTION_PANEL = `${PG_INNER_RADIUS} border border-[hsl(var(--stage-pregnancy-edge))] bg-[hsl(var(--stage-pregnancy-cream)/0.6)] px-4 py-4`;

/** Small keepsake caption line. */
export const PG_MEDIA_CAPTION =
  "font-serif italic text-[14px] leading-[1.65] text-[hsl(var(--stage-pregnancy-text))]";

/** Bottom nav tab, pregnancy tint. */
export const PG_NAV_ACTIVE = "text-[hsl(var(--stage-pregnancy-accent))] font-medium";
export const PG_NAV_INACTIVE =
  "text-[hsl(var(--stage-pregnancy-text-soft))] font-light hover:text-foreground";
