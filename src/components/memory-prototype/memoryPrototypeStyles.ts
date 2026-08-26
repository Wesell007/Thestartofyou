/**
 * Phase 29I — shared styling for the memory settings prototype.
 *
 * Warm cream paper, soft sage and muted olive, restrained blush. Values come
 * from the existing stage tokens in index.css; no new colours are introduced
 * and nothing is hardcoded to a hex value.
 */

export const MEMORY_FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--stage-ttc-olive-soft))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--stage-ttc-cream))]";

export const MEMORY_PAGE =
  "min-h-screen w-full overflow-x-hidden bg-[hsl(var(--stage-ttc-cream))] text-[hsl(var(--stage-ttc-text))]";

export const MEMORY_CARD =
  "rounded-[22px] border border-[hsl(var(--stage-ttc-edge)/0.7)] bg-card p-6 sm:p-7 shadow-[var(--shadow-ttc-paper)]";

export const MEMORY_CARD_QUIET =
  "rounded-[22px] border border-dashed border-[hsl(var(--stage-ttc-edge))] bg-[hsl(var(--stage-ttc-cream-soft)/0.7)] p-6 sm:p-7";

export const MEMORY_HEADING = "font-serif text-[21px] sm:text-[23px] leading-snug";

export const MEMORY_BODY =
  "font-sans text-[15px] font-light leading-[1.7] text-[hsl(var(--stage-ttc-text-soft))]";

export const MEMORY_TAP =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-4 font-sans text-[14px] font-light transition-colors";
