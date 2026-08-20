# Phase 26K — First Year Home Hero Polish

Presentation-only refinement of the signed-in hero at `/my-first-year`. No routes, logic, data, copy meaning, Cindy, reminders, Today, Memories, navigation, schema, storage, RLS, AI or public First Year pages change.

## 1. Spacing beneath the header

`FirstYearHeroPanel` currently opens with `pt-14 sm:pt-16 pb-8` and its decorative wash starts at `-top-6`, so the hero reads as pressed against the site header.

- Top padding increases to roughly `pt-20 sm:pt-28`, bottom to `pb-12 sm:pb-14`.
- The decorative wash is re-anchored so it sits behind the text rather than bleeding up into the header.
- The kicker, name, age, chapter line and companion line keep their existing order and wording; only vertical rhythm between them relaxes slightly (kicker gap, line spacing).

## 2. Colour direction

Unchanged warm family: `--stage-firstyear-hero`, `--stage-firstyear-peach`, `--stage-firstyear-peach-soft`, `--stage-firstyear-cream`, `--stage-firstyear-terracotta`. No new palette. If a softer wash edge is needed, it is expressed with existing tokens at lower alpha, never a new hex.

## 3. Soft illustrative decoration

A new decorative-only component `src/components/firstyear/journey/FirstYearHeroDecor.tsx`, rendered inside the hero with `aria-hidden` and `pointer-events-none`:

- an inline SVG wave/organic band across the base of the hero, filled with `currentColor` driven by token colours at low opacity
- two or three tiny botanical accents (a leaf sprig and a small five-petal bloom) placed in the right and lower-left margins
- one faint baby-footprint motif at very low opacity as a personal touch
- the existing blurred peach/cream blobs are kept but softened so the illustration reads first

All fills use `hsl(var(--token) / alpha)`. Everything is behind the text (`-z-10`-style stacking within the hero) and sized down at mobile so nothing crowds the name.

## 4. Composition

- The text column is constrained (`max-w-[34ch]` on the display line) so the right-hand decoration has clear space at 1440px.
- At 390px the side accents shrink and the corner motifs move out of the text bounds; nothing overlaps the heading or age chip.
- Heading, age and the two supporting lines keep their current sizes from `FY_DISPLAY` / `FY_HELPER`.

## 5. Files changed

- `src/components/firstyear/journey/FirstYearHeroPanel.tsx` (spacing, composition, decor mount)
- `src/components/firstyear/journey/FirstYearHeroDecor.tsx` (new, decorative SVG only)
- `src/components/firstyear/journey/firstYearStyles.ts` only if a shared spacing constant is genuinely reused

## 6. Verification

`npx tsgo --noEmit -p tsconfig.json`, `npm run build`, targeted tests, plus a signed-in Playwright pass at 390px and 1440px checking spacing under the header, readability, no horizontal overflow, no console errors, and a grep for hex values in the touched files. Report follows and then work stops.
