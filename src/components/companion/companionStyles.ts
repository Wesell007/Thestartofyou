/**
 * Phase 29B — shared style constants for the site-wide companion shell.
 *
 * Derived from the Nano Banana direction board
 * (`src/assets/companion-direction-board.png`): cream paper, soft sage,
 * muted olive, gentle blush warmth, botanical detail, calm editorial type.
 *
 * Tokens only. No hardcoded hex values.
 */

export const companionStyles = {
  launcher:
    "inline-flex items-center gap-2 rounded-full min-h-[44px] min-w-[44px] px-4 py-3 " +
    "bg-[hsl(var(--stage-ttc-cream))] text-[hsl(var(--stage-ttc-olive))] " +
    "border border-[hsl(var(--stage-ttc-sage-soft))] " +
    "shadow-[var(--shadow-ttc-paper)] transition-colors " +
    "hover:bg-[hsl(var(--stage-ttc-sage-tint))] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--stage-ttc-olive-soft))] focus-visible:ring-offset-2",
  panel:
    "flex h-full w-full flex-col gap-0 border-[hsl(var(--stage-ttc-sage-soft))] " +
    "bg-[hsl(var(--stage-ttc-cream))] p-0 text-[hsl(var(--stage-ttc-olive))]",
  panelHeading: "font-serif text-xl leading-snug text-[hsl(var(--stage-ttc-olive))]",
  safetyLine: "text-[13px] leading-relaxed text-[hsl(var(--stage-ttc-olive-soft))]",
  paperCard:
    "rounded-2xl border border-[hsl(var(--stage-ttc-sage-soft))] bg-[hsl(var(--stage-ttc-cream-soft))] p-4",
  chip:
    "min-h-[44px] rounded-full border border-[hsl(var(--stage-ttc-sage-soft))] " +
    "bg-[hsl(var(--stage-ttc-sage-tint))] px-4 py-2 text-left text-[13px] leading-snug " +
    "text-[hsl(var(--stage-ttc-olive))] transition-colors hover:bg-[hsl(var(--stage-ttc-sage))] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--stage-ttc-olive-soft))] focus-visible:ring-offset-2",
  userBubble:
    "ml-auto max-w-[85%] rounded-2xl rounded-br-md border border-[hsl(var(--stage-ttc-sage-soft))] " +
    "bg-[hsl(var(--stage-ttc-blush))] px-4 py-3 text-[15px] leading-relaxed text-[hsl(var(--stage-ttc-olive))]",
  assistantCard:
    "rounded-2xl border border-[hsl(var(--stage-ttc-sage-soft))] bg-[hsl(var(--background))] px-4 py-3",
  notice:
    "rounded-2xl border border-[hsl(var(--stage-ttc-sage-soft))] bg-[hsl(var(--stage-ttc-cream-soft))] " +
    "px-4 py-3 text-[14px] leading-relaxed text-[hsl(var(--stage-ttc-olive))]",
  quietButton:
    "min-h-[44px] rounded-full px-4 text-[13px] text-[hsl(var(--stage-ttc-olive-soft))] " +
    "transition-colors hover:text-[hsl(var(--stage-ttc-olive))] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--stage-ttc-olive-soft))] focus-visible:ring-offset-2",
  sendButton:
    "min-h-[44px] min-w-[44px] rounded-full bg-[hsl(var(--stage-ttc-olive))] px-4 " +
    "text-[hsl(var(--stage-ttc-cream))] transition-colors " +
    "hover:bg-[hsl(var(--stage-ttc-olive-soft))] disabled:opacity-50 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--stage-ttc-olive-soft))] focus-visible:ring-offset-2",
  textarea:
    "min-h-[44px] w-full resize-none rounded-2xl border border-[hsl(var(--stage-ttc-sage-soft))] " +
    "bg-[hsl(var(--background))] px-4 py-3 text-[15px] leading-relaxed text-[hsl(var(--stage-ttc-olive))] " +
    "placeholder:text-[hsl(var(--stage-ttc-olive-soft))] focus-visible:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-[hsl(var(--stage-ttc-olive-soft))]",
} as const;
