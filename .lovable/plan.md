# Phase 27B — Nano Banana Pregnancy App Direction and Visual System

Turn the signed-in pregnancy journey into the digital companion to the physical journal, following the attached direction board closely.

## Step 1: Nano Banana direction pass (before any code)

Generate a small set of direction renders with Nano Banana inside Lovable, using the attached board, the journal's watercolour language, the current `/my-week` and `/my-journey` screens, and the First Year app-ready standard as inputs. The pass covers: This Week home, weekly reflection, memories and keepsakes, My Journey overview, toolkit entry cards, journal owner companion card, app-only discovery card, insert-card welcome state, and mobile navigation.

These renders are reference only. Nothing from the board or the journal PDF is shipped as an image, background or asset.

## Step 2: Pregnancy visual system

New `src/components/myweek/pregnancyStyles.ts` (mirroring `firstYearStyles.ts` in spirit): focus ring, quiet link, serif heading scale, eyebrow label, card body, helper line, paper card surface, journal bridge card, photo frame treatment, toolkit card, and bottom nav item style.

Tokens live in `src/index.css` as HSL variables. The existing `--stage-pregnancy` and `--stage-pregnancy-accent` stay as they are; added alongside them are quiet text, soft text, blush, peach, sage-accent and paper-edge values plus one watercolour wash and one soft shadow. No hex in components.

Surfaces: warm cream page, paper cards at a single larger radius, low soft shadows, hairline dotted dividers, thin serif headings against readable sans body, small uppercase labels.

## Step 3: `/my-week`

Restyle the existing sections without touching their data flow: warmer hero and week chapter card, softer baby, body and emotional cards, keepsake-styled reflection area, taped polaroid style for photo memory and matching frames for video and voice, warm paper toolkit tiles, and one journal companion cue placed under the weekly memory block.

## Step 4: `/my-journey`

Restyle hero, trimester rail, moments kept summary, photo journal preview, reflection highlights, toolkit entry, looking ahead and film cards onto the same paper card system, with a single quiet journal connection panel low on the page.

## Step 5: Toolkit entry

Apply the paper card and fine line icon treatment to the toolkit index and the `Tools for this week` cards. Behaviour and routes unchanged.

## Step 6: Journal bridge cards

One shared presentational component with two variants: owner companion ("This week also has space in your journal.", "Keep the quick moments here, and the longer story by hand.") and app-only discovery ("Some things are nicer written by hand.", with a quiet "See the journal" link to `/journal`). Variant selection in this phase is a prop only, defaulting to discovery. No ownership field, no purchase flow, no insert-card route.

## Step 7: Mobile navigation direction

Restyle the existing pregnancy tabs in `JourneyBottomNav` to the board's look: warm surface, fine icons, clear active state, touch-friendly targets. Tabs and destinations stay as they are today. The board's fourth "Memories" tab is recorded as a direction note only, since no pregnancy memories route exists.

## Illustrations

Only generate assets if the layout needs them: at most a couple of soft watercolour botanical accents, decorative and `aria-hidden`. No animals as characters, no mascots, no stock-style graphics. Any generated asset is reported with what, where, why and whether it is decorative.

## Technical notes

- Presentation only. No changes to week calculation, saved journey data, reflection or media save logic, toolkit data, Ask Cindy, First Year, public pages, schema, RLS, storage, edge functions, auth, sitemap or SEO.
- Files expected to change: `src/index.css`, new pregnancy style module, `src/components/myweek/*`, `src/components/myjourney/*`, `src/pages/PregnancyToolkit.tsx`, `src/components/layout/JourneyBottomNav.tsx`, plus a new journal bridge component.
- British English, no dashes in user-facing copy, no hard-sell language.

## Verification

Playwright checks at 390px and 1440px on `/my-week`, `/my-journey` and the toolkit: no horizontal overflow, no console errors, save and upload flows still work, Ask Cindy unchanged. Then `npx tsgo --noEmit -p tsconfig.json`, targeted tests, `npx vitest run` and `npm run build`. Report follows the 24 point structure requested.
