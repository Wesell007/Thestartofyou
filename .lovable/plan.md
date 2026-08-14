# Phase 24A — First Year Signed-In Polish & Readiness Audit

Audit only. Nothing was changed. Findings come from reading the signed-in surfaces and their components.

## 1. Overall verdict

The signed-in First Year product is coherent, calm and close to premium. It reads as one product, not a set of bolted-on features. There is no tracker drift, no dashboard language and no banned wording on any signed-in surface. The weaknesses are consistency-level, not structural: mismatched focus-ring colours, one hardcoded colour, drifting page-frame values between setup and the rest of the journey, a stale export description, and a home page that has grown long enough to need a rhythm pass rather than a redesign.

A Phase 24B polish pass is worth doing, and it should be small.

## 2. What feels strong

- Consistent shell across `/my-first-year`, `/my-first-year/today`, `/my-first-year/memories`, `/my-pregnancy-chapter`: same header, same footer, same 720px column, same stage tint.
- Copy discipline. No milestone, normal, safe, tracker, score, progress, diagnosis or risk anywhere in signed-in copy. Reassurance lines ("nothing to keep up with") are repeated deliberately rather than accidentally.
- Card hierarchy on the home page is correct: Today keeps the keepsake surface and the only filled button; everything else is a quiet link.
- Empty states are genuinely handled: `RecentlySavedCard` renders nothing when there is nothing saved, `MemoriesCard` swaps its link label, `StageGuidanceSection` returns null on an unusable date.
- Loading and error states on the home page and pregnancy chapter go through the shared `PageLoadState` with a retry.
- Accessibility groundwork is real: `aria-labelledby` sections, `role="alert"` on field errors, `aria-live` save confirmations, `min-h-11` tap targets almost everywhere, `radiogroup` semantics on baby count and memory scope.

## 3. What feels weak

- Focus rings are inconsistent. `ring-sage` on Today and Memories surfaces, `ring-ring` in "For this stage", and no ring colour at all on the hero link, baby summary link, recently saved link, support-lane cards and the Today CTA. Where no colour is set, the ring falls back to the theme default and reads differently from the rest of the journey.
- `TodayCard` uses hardcoded `text-white` on the primary CTA instead of a token, the only place in the journey that bypasses the design system.
- `/setup/first-year` sits on a different frame from the rest: `max-w-[680px]` and `pt-20 sm:pt-24` against `max-w-[720px]` and `pt-16 sm:pt-20` elsewhere, so entering the product and living in it feel slightly different.
- Setup rolls its own loading and error screens instead of `PageLoadState`, so the retry affordance and voice differ from every other First Year route.
- Setup progress is text only ("Step 3 of 6") inside a fixed `min-h-[520px]` card. Short steps float in empty space on desktop; there is no visual sense of movement between steps.
- `/my-first-year` now runs nine stacked sections. Vertical spacing is set per card (`pb-3`, `pb-7`, `pb-8`, `pb-10`, `pb-14`) rather than by a shared rhythm, so the page reads long on mobile and the support lanes are the weakest part of the scroll.
- Account Settings export copy names "First Year daily notes" but not memories or memory photos, even though both are exported. A code comment there still says memories are "text keepsakes only, never media", which is now out of date.

## 4. Highest priority polish issues

1. Unify focus-ring treatment across every signed-in First Year interactive element.
2. Replace the hardcoded `text-white` on the Today CTA with a token.
3. Align `/setup/first-year` page frame (max width, top padding) with the rest of the journey.
4. Refresh the Account Settings export description so it names First Year memories and memory photos.
5. Spacing rhythm pass on `/my-first-year` so section gaps come from one scale.

## 5. Low priority polish issues

1. Setup step card: remove or relax the fixed `min-h-[520px]`, add a quiet step indicator, use `PageLoadState` for its loading and error screens.
2. "For this stage" could carry slightly more warmth (kicker weight, card surface) to match the Today card family.
3. Photo memory thumbnail and viewer dialog are functional but plain; a softer frame and caption treatment would fit the keepsake voice.
4. Support lanes: four cards on the parent side against three on the baby side makes the desktop two-column grid uneven.
5. `WhatComesNextCard` is the last thing on the page and is the least useful; it could be lighter.

## 6. Setup and onboarding audit

Step card design is clean but static; spacing is fine on mobile and slightly empty on desktop. There are no step transitions at all, only an instant swap, though focus does move to the step heading on change, which is correct. Baby count, DOB/stage, value and companion steps all have proper labels, `aria-describedby` error wiring and `role="alert"` errors. The DOB input's focus style uses `focus:ring-2 focus:ring-offset-2` with no ring colour. Review step handles save errors with `role="alert"` and routes back to the offending step on validation failure, which is good. Mobile readability is good; desktop readability suffers only from the narrow 680px column plus fixed card height.

Recommendation: yes, include a light setup polish in 24B. Frame alignment, focus rings, step indicator, shared load/error state. No flow or step-order change.

## 7. First Year home audit

Order is right: hero, baby summary, for this stage, Today, recently saved, memories, kept pregnancy chapter, support lanes, what comes next. Hero is appropriately quiet. Baby summary correctly reads lighter than Today. "For this stage" sits well between them. Recently saved and Memories are both restrained and neither shows counts. The page is not too long in content terms, but it reads long because the spacing scale is ad hoc and the two support lanes plus "what comes next" form a flat tail. Balance is achievable with spacing and a slightly lighter tail, not with removal.

## 8. Daily Check-in audit

Title spacing matches the other journey pages. Lane structure (baby, parent) with `aria-labelledby` and `sr-only` `aria-live` save confirmations is solid. Saved state, edit state and recent days all exist and read gently. Buttons and quiet links are shared constants with `min-h-11` and `ring-sage`, so this page is the most internally consistent of the set and is a good reference for the rest. It still reads as a note, not a tracker. No high-priority issues found.

## 9. Memories and photo memories audit

The form leads with words: title, note, date, scope, then an optional photo. That ordering keeps it keepsake-led rather than gallery-led. Photo control, selected preview, thumbnail and dialog viewer all work and are keyboard reachable with visible focus. Photo failure is handled after the words are saved, so a photo problem never loses the note. The list is a list, not a grid, which is right. Weakness is purely visual: the thumbnail frame and the dialog are plainer than the surrounding cards. Empty state and the bottom return link are both present.

## 10. Navigation audit

Header is the shared `MyWeekHeader` on every signed-in surface. Return links exist at the bottom of Today and Memories, and at the top of the pregnancy chapter ("Back to your First Year"), so the placement convention is not uniform: two pages return from the bottom, one from the top. Support cards and "For this stage" cards link out to public guide routes with no explicit way back other than browser back, which is acceptable but worth naming. Browser back behaviour is standard client routing with no history manipulation. The kept-chapter link only renders when there is a chapter, so no dead ends.

## 11. Copy consistency audit

Signed-in copy is clean: no banned words, no absolutes, no dashboard or tracker framing, no over-long paragraphs. Two observations. First, the public First Year guide pages that signed-in cards link into do use "milestones", "progress", "normal" and "safe sleep" in their metadata and body copy, so a parent leaving the signed-in surface meets a different register; that is a content question, not a 24B fix. Second, the Account Settings export sentence is factually stale about what is exported.

## 12. Accessibility audit

Heading order is correct on every page (single `h1`, `h2` per section, `h3` inside recent days). Form labels, error announcements and dialog focus handling (Radix) are all in place. Button and link labels are descriptive. Keyboard flow works. The gaps are: inconsistent or missing focus-ring colours in six places, and one hardcoded `text-white` that will not respond to theming. Tap targets meet 44px on the journey surfaces.

## 13. Mobile audit

Single-column throughout, 16px side padding, readable type sizes, 44px targets. The main mobile cost is total scroll length on the home page caused by uneven section padding.

## 14. Desktop audit

The home page widens to 880px and puts the support lanes side by side, which works. "For this stage" goes to three columns cleanly. The setup page stays at 680px with a fixed-height card, which is the weakest desktop surface. The pregnancy chapter matches the home frame.

## 15. Recommended Phase 24B scope

Presentation only.

1. Shared focus-ring treatment across all signed-in First Year interactive elements.
2. Token-based Today CTA colour.
3. Setup frame alignment plus shared loading and error state, relaxed card height, quiet step indicator.
4. Spacing rhythm pass on `/my-first-year` and a lighter "what comes next".
5. Return-link convention: bottom placement on Today, Memories and the pregnancy chapter.
6. Account Settings export description updated to name memories and memory photos.
7. Optional if time allows: warmth pass on "For this stage" and the photo thumbnail/viewer frame.

## 16. Files likely to change in Phase 24B

- `src/pages/setup/FirstYearSetup.tsx`
- `src/components/firstyear/setup/StepBabies.tsx`, `StepCompanion.tsx`, `StepReview.tsx`
- `src/pages/firstyear/MyFirstYear.tsx`
- `src/components/firstyear/journey/TodayCard.tsx`, `BabySummaryCard.tsx`, `FirstYearHeroPanel.tsx`, `RecentlySavedCard.tsx`, `MemoriesCard.tsx`, `SupportLane.tsx`, `StageGuidanceSection.tsx`, `WhatComesNextCard.tsx`
- `src/pages/firstyear/MyPregnancyChapter.tsx` (return-link placement only)
- `src/components/firstyear/memories/MemoryList.tsx`, `MemoryPhotoViewer.tsx` (optional warmth pass)
- `src/pages/AccountSettings.tsx` (export description sentence only)

## 17. Files that must not change

`src/lib/firstYearEntries.ts`, `firstYearEntriesSchema.ts`, `firstYearMemories.ts`, `firstYearMemoriesSchema.ts`, `firstYearMemoryPhoto.ts`, `firstYearJourney.ts`, `firstYearDates.ts`, `firstYearStage.ts`, `firstYearStageGuidance.ts`, `firstYearCopy.ts`, `App.tsx`, `authIntent.ts`, all migrations, RLS and grants, storage bucket config, export and delete-account logic, generated Supabase types, `public/sitemap.xml`, `public/robots.txt`, and all public First Year guide pages and article data.

## 18. Schema changes needed

None. No data or policy issue was found.

## 19. QA plan for Phase 24B

- Playwright at 390px and 1440px across `/setup/first-year`, `/my-first-year`, `/my-first-year/today`, `/my-first-year/memories`, `/my-pregnancy-chapter`, signed in.
- States to cover: single baby, twins, transition user with kept chapter, direct-start user, no notes, notes saved, no memories, memories with and without a photo.
- Keyboard pass on each page: visible ring on every interactive element, consistent colour, dialog focus trap and restore.
- Banned-word grep across changed files.
- `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`, sitemap unchanged.

## 20. Risks and open questions

- Signed-in Playwright verification has been blocked before by a signed-out preview; if it is blocked again, 24B relies on manual review for authenticated screens.
- Moving the pregnancy chapter return link to the bottom changes a habit for existing users; it may be better to keep the top link and add a bottom one rather than move it.
- Standardising focus rings on `ring-sage` inside a First Year stage-tinted page may read slightly off; the alternative is a First Year accent ring, which needs a visual check.
- Should the parent support lane drop to three cards for grid symmetry, or is content completeness more important?

## 21. Should Phase 24B proceed?

Yes. Small, presentation-only, no schema work, and it closes the consistency gaps before any new feature lands.
