# Phase 28H.1 — TTC Calendar Colour Separation Fix

Presentation only on the `/my-ttc-journey` cycle calendar. No changes to date maths, click behaviour, disabled future dates, log behaviour, routes, AI, handover, SEO or sitemap. Pregnancy and First Year surfaces untouched.

## 1. Stronger state separation

`TTC_DAY_STATES` in `ttcStyles.ts` currently uses five very pale fills drawn from three base tokens (blush at two opacities, sage at two opacities, peach), which is why the states read as one wash. Each state is rebuilt as a fill plus border plus ink plus chip treatment, not a tint step:

- Period start: soft blush fill, rose border, rose ink
- Expected period: deeper dusty rose/terracotta fill with a stronger rose border, clearly heavier than Period start
- Fertile window: soft sage fill with a sage border
- Likely ovulation: deeper olive fill with a thicker olive ring and a stronger ink, clearly heavier than Fertile window
- Possible test day: warm sand fill with a peach/apricot border, clearly off both the green and rose families
- Today: neutral framed outline only, no fill of its own, so it layers cleanly over any state
- Notes added: solid olive dot marker, kept as is but sized so it stays visible on the darker fills

New HSL tokens are added under the existing `--stage-ttc-*` group in `src/index.css` where the current palette cannot express the separation, likely a terracotta/dusty rose fill, a warm sand fill, a mid olive fill, and a matching border value for each family. No hex anywhere.

## 2. More than colour alone

Each state keeps a short uppercase chip inside the cell (PERIOD, FERTILE, OVUL, TEST, EXPECTED), now rendered with the state ink on a faint chip ground so it is legible on both light and deeper fills. Ring thickness and border weight vary by state (ovulation and expected period get the heavier rings), so the states differ by shape as well as hue.

## 3. Legend

The legend under "What the colours mean" lists all seven entries: Period start, Fertile window, Likely ovulation, Possible test day, Expected period, Notes you have added, Today. Each swatch is rendered from the same state definition as the cell (same fill, border and ring), so a swatch always matches what appears on the calendar. Labels move to readable helper size with sufficient contrast, in a one-column mobile / two-column desktop wrapped list.

## 4. Accessibility

Aria-labels on every cell stay exactly as they are, 44px minimum tap targets are kept, focus rings unchanged, today stays clear when layered, and meaning is always carried by the chip text as well as colour.

## Technical notes

Files in scope: `src/components/ttc/journey/ttcStyles.ts` (state map gains `border` and chip fields), `src/components/ttc/journey/TTCJourneyCalendar.tsx` (cell and legend rendering only), and `src/index.css` for the new `--stage-ttc-*` state tokens.

## Nano Banana visual direction step (required)

Before implementation, Nano Banana is used inside Lovable to produce a direction board for the calendar colour system: the six state fills side by side, the layered Today outline, the chip treatment and the legend swatch row, at premium, soft, green-led TTC tone.

## Verification

390px and 1440px across `/my-ttc-journey`, `/setup/trying-to-conceive`, `/ovulation-calculator`, `/trying-to-conceive`, one signed-in pregnancy route and one signed-in First Year route. Checks: distinct states at a glance, legend matches cells, no colour-only meaning, no horizontal overflow, no console errors, no hex colours. Then `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run` and `npm run build`.
