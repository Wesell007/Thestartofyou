# Phase 24B — First Year Signed-In Polish Pass

Presentation only. No schema, migrations, RLS, storage, routes, sitemap, robots, public pages, article data, or save/edit/delete/export/deletion logic.

## 1. Shared focus treatment

New file `src/components/firstyear/journey/firstYearStyles.ts` exporting three constants:

- `FY_FOCUS_RING` — `focus-visible:ring-2 ring-sage ring-offset-2 ring-offset-background`
- `FY_FIELD_FOCUS_RING` — the `focus:` equivalent for text inputs
- `FY_QUIET_LINK` — the quiet underlined link style used across the cards, with the ring folded in

Applied to: hero link, baby summary link, "For this stage" cards and parent link, Today CTA, recently saved link, Memories card link, support lane cards, setup text inputs (`StepBabies`, `StepCompanion`), and the pregnancy chapter return links. Today, Memories and the check-in already use `ring-sage`, so this makes the rest match rather than introducing a new colour. No focus state is removed or weakened.

## 2. Today CTA colour

`TodayCard` drops `text-white` and takes its colour from the parchment token via the same inline-style pattern the card already uses for its background. Hierarchy is unchanged: Today keeps the keepsake surface and the only filled button on the page.

## 3. Setup frame

`src/pages/setup/FirstYearSetup.tsx`:

- Column widens from `max-w-[680px]` to `max-w-[720px]`, top padding moves from `pt-20 sm:pt-24` to `pt-16 sm:pt-20`, matching every other First Year surface.
- Fixed `min-h-[520px]` on the step card relaxes to `min-h-[420px]` so short steps do not float on desktop.
- The loading and error screens are replaced with the shared `PageLoadState` (its error branch already offers retry).
- The text "Step 3 of 6" gains a quiet row of six small bars, marked `aria-hidden`, with the existing `aria-live` text kept as the announced version.

Step order, validation, save behaviour, companion storage and baby payload are untouched.

## 4. Home spacing rhythm

`MyFirstYear.tsx` and its section components move to one scale: `pb-6` between paired cards (baby summary to "For this stage"), `pb-10` between distinct sections, `pb-12` before the footer. Section order is unchanged and nothing is removed.

## 5. Lighter tail

`WhatComesNextCard` loses its tinted card surface and becomes a plain block with a hairline top rule and smaller type. Same three lines of content.

## 6. Return links

`/my-pregnancy-chapter` keeps its top link and gains a bottom one below the closing line, worded differently ("Back to your First Year journey" at the bottom) so the two do not read as duplicates. The footer line "Nothing new is being tracked here" is softened to avoid tracker wording.

## 7. Account Settings export copy

The export description sentence is rewritten to name First Year daily notes, First Year memories and memory photo details. The stale comment claiming memories are text-only and never media is corrected. Export behaviour, payload shape and file contents are unchanged.

## 8. Optional warmth

If it stays purely visual: softer frame and inner border on the memory photo thumbnail in `MemoryList`, and a matching frame on `MemoryPhotoViewer`. "For this stage" cards pick up the same tinted wash the other First Year cards use instead of `bg-card/70`. Memories stays a text-led list, not a grid.

## Files that will change

`src/components/firstyear/journey/firstYearStyles.ts` (new), `FirstYearHeroPanel.tsx`, `BabySummaryCard.tsx`, `StageGuidanceSection.tsx`, `TodayCard.tsx`, `RecentlySavedCard.tsx`, `MemoriesCard.tsx`, `SupportLane.tsx`, `WhatComesNextCard.tsx`, `src/pages/firstyear/MyFirstYear.tsx`, `src/pages/firstyear/MyPregnancyChapter.tsx`, `src/pages/setup/FirstYearSetup.tsx`, `src/components/firstyear/setup/StepBabies.tsx`, `StepCompanion.tsx`, `src/pages/AccountSettings.tsx` (copy and comment only), and optionally `MemoryList.tsx` and `MemoryPhotoViewer.tsx`.

## Files that will not change

All `src/lib/firstYear*` modules, `App.tsx`, `authIntent.ts`, migrations, RLS and grants, storage config, export and delete-account logic, generated types, `public/sitemap.xml`, `public/robots.txt`, public First Year guide pages and article data.

## Schema

None.

## QA

- `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`, sitemap byte-unchanged.
- Playwright at 390px and 1440px across setup, home, today, memories and the pregnancy chapter, signed in where the preview session allows; if auth is unavailable it will be reported plainly and verification falls back to code review plus your manual pass.
- Keyboard pass for a consistent visible ring on every interactive element, setup fields, photo controls, dialog focus trap and restore.
- Banned-word grep across changed files; heading order and horizontal overflow checked.

## Risk

Low. The only judgement calls are the ring colour reading against the First Year stage tint and the bottom return link on the pregnancy chapter; both are easy to revert.
