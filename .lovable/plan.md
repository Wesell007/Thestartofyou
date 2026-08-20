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

The reference is direction only: it is never uploaded, imported, used as a background or shipped as an asset. A Nano Banana render may be used privately to lock shape language, and the shipped result is hand-built inline SVG and CSS inside the hero component. No external image assets are added.

A new decorative-only component `src/components/firstyear/journey/FirstYearHeroDecor.tsx`:

- a soft organic peach wave band sweeping across the top of the hero, matching the reference's curved band
- a small monogram-style disc in the top right, using the baby initial already available to the hero
- a warm baby-footprint pair at the lower right, low opacity
- a small bloom with two leaves beside the footprints, and a leaf sprig on the opposite side
- the existing blurred peach blobs kept but softened so the drawn shapes read first

Rules applied: root wrapper carries `aria-hidden="true"` and `pointer-events-none`, every `<svg>` carries `focusable="false"`, all fills use `hsl(var(--token) / alpha)` with no hex. Stacking stays inside the hero: the decor sits in a positioned wrapper with the text on a higher `relative z-10`, no negative z-index that could push it behind the page. On mobile the leaf sprig (and the monogram disc if space is tight) is hidden with a responsive class rather than shrinking text or changing copy.

## 4. Composition

- The text column is constrained (`max-w-[34ch]` on the display line) so the right-hand decoration has clear space at 1440px.
- At 390px the remaining motifs sit clear of the text bounds; nothing overlaps the heading or age.
- Heading, age and the two supporting lines keep their current sizes from `FY_DISPLAY` / `FY_HELPER`. Copy is unchanged.
- Global header, app shell, bottom navigation and routing are untouched.


## 5. Files changed

- `src/components/firstyear/journey/FirstYearHeroPanel.tsx` (spacing, composition, decor mount)
- `src/components/firstyear/journey/FirstYearHeroDecor.tsx` (new, decorative SVG only)
- `src/components/firstyear/journey/firstYearStyles.ts` only if a shared spacing constant is genuinely reused

## 6. Verification

`npx tsgo --noEmit -p tsconfig.json`, `npm run build`, targeted tests, plus a signed-in Playwright pass at 390px and 1440px checking spacing under the header, readability, no horizontal overflow, no console errors, and a grep for hex values in the touched files. Report follows and then work stops.
