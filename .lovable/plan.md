## Goal

Refactor `src/components/home/JourneyPreviewSection.tsx` so the three product surface previews (My Week → My Journey → Kept Chapter) are presented one at a time in a quiet, manual carousel, instead of stacked side-by-side.

No autoplay, no loop, no tabs, no loud chrome. Header, supporting copy, preview cards, and design tokens all stay as-is.

## Files changed

- `src/components/home/JourneyPreviewSection.tsx` — only this file. The three preview components (`MyWeekPreview`, `MyJourneyPreview`, `KeptChapterPreview`) and the section header remain unchanged. Only the composition grid is replaced with a carousel.

No other files touched. No new components. No route, nav, analytics, or data changes.

## Carousel structure

Use the existing shadcn `Carousel` primitive (`src/components/ui/carousel.tsx`, Embla under the hood) — already in the project, no new dependency.

```text
<Carousel opts={{ align: "center", loop: false, dragFree: false, containScroll: "trimSnaps" }}>
  <CarouselContent>
    <CarouselItem> Slide: My Week        </CarouselItem>
    <CarouselItem> Slide: My Journey     </CarouselItem>
    <CarouselItem> Slide: Kept Chapter   </CarouselItem>
  </CarouselContent>

  {/* Quiet desktop-only arrow controls */}
  <CarouselPrevious /> <CarouselNext />
</Carousel>

{/* Quiet step indicator below: 01 / 03 with 3 small ticks */}
```

Each `CarouselItem` is a small slide wrapper containing:

1. Surface label (uppercase tracked eyebrow, accent colour — reuses existing `Eyebrow`)
2. One-line micro-copy (serif italic, foreground/65)
3. The truthful preview card (existing `MyWeekPreview` / `MyJourneyPreview` / `KeptChapterPreview` — used unchanged)

Slide widths (fuller than the first proposal so the section reads composed, not sparse):
- Mobile: `basis-[88%]` — small peek of next slide on the right.
- `md` and up: `basis-[82%]` — light peek of the neighbouring card on either side.
- `lg` and up: `basis-[70%]` — one dominant slide, with a quieter peek that still invites interaction.

Inner card content keeps its current max width via `max-w-[560px] mx-auto` on the slide body so My Week's larger preview doesn't get stretched.

## Interaction

Desktop (≥ md):
- Drag with mouse (Embla default).
- Two minimal arrow buttons (`CarouselPrevious` / `CarouselNext`) positioned just below the carousel. Restyled to be quiet: 32px circles, `border-foreground/15`, `text-foreground/60`, hover `text-foreground`. No drop shadow. No bright fill.
- Keyboard: left/right arrows (built into the shadcn primitive via `onKeyDownCapture`).

Mobile (< md):
- Native swipe via Embla touch.
- Arrows hidden (`hidden md:inline-flex`).
- A single-line hint under the carousel: "Swipe to continue" in tracked uppercase 10px text-foreground/40, shown only on mobile.

Both:
- `loop: false` — feels like a finite walkthrough, not an endless slider.
- No autoplay plugin.
- No transition flair beyond Embla's default smooth scroll.

## Step indicator (quiet, not dots)

Below the carousel, centred:

```text
01 / 03      — — —
```

- `01` is the current index, updates via `api.on("select")`. Uses `font-sans text-[10px] tracking-[0.28em] uppercase text-foreground/55`.
- Three 16px hairline ticks (`h-px w-4 bg-foreground/15`); the active one becomes `bg-foreground/55`. Clickable to jump (`api.scrollTo(i)`), but visually the same — no dots, no pills, no numbers inside circles.

This avoids the "loud dots" pattern while still giving position feedback.

## Final micro-copy used

Header (unchanged):
- Eyebrow: `Inside your journey`
- Heading: `Your week, your journey, and the moments you return to`
- Body: `Follow your pregnancy week by week, keep reflections and photos, and return to the chapters that matter as your journey grows.`

Per slide:

| # | Label (eyebrow) | Micro-copy (one line, serif italic) |
|---|---|---|
| 1 | `Current week` | `See what matters now, week by week.` |
| 2 | `Your journey` | `Look back at the weeks and moments you've kept.` |
| 3 | `Kept chapter` | `Return to a past week as a preserved chapter.` |

Mobile-only hint: `Swipe to continue`

## Footer link decision (review at implementation)

The existing `See how the journey works → /product` link is treated as optional. After the carousel is in place, judge whether the three-slide walkthrough already explains the system clearly. Default position:

- If the carousel reads as a complete explanation on its own → **remove the link**, end the section on the step indicator. Cleaner, fewer competing CTAs, more confident.
- Only keep it if the section feels like it ends abruptly without further direction.

Lean toward removal.

## Visual rules honoured

- One dominant slide visible at any time; subtle peek of neighbours invites interaction without competing.
- Existing `keepsake-surface`, pregnancy stage accent, serif type, parchment background — all preserved by reusing the three preview components untouched.
- Controls (arrows, ticks) are deliberately desaturated and small.
- No SaaS chrome: no drop shadow, no progress bar, no gradient buttons, no bright accent fills on controls.
- The three small "Where you are right now" / "The weeks you keep…" / "A week you can return to later" caption strings under the old grid are removed — the new slide micro-copy replaces them.

## Things still likely to need a visual review pass after build

1. Final verdict on the footer link (keep vs remove) once the carousel is in place.
2. Vertical alignment between slides of different heights — Embla doesn't equalise heights; each slide sizes to its own content with `items-start` on `CarouselContent` and centred horizontally. Worth eyeballing on mobile where the My Week card is significantly taller.
3. Arrow button placement — proposing bottom-right, but bottom-centre next to the step indicator could feel quieter; quick judgement after first build.
4. Whether the mobile "Swipe to continue" hint is still needed once the peek of the next slide is visible.

## Out of scope

- No autoplay, no loop, no infinite carousel.
- No new analytics events.
- No changes to underlying preview cards' content, copy, or visuals.
- No nav, route, IA, or hero changes.
