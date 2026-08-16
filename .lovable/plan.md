# Phase 25B — First Year Launch Readiness Fix Pass

Copy and presentation only. No schema, RLS, storage, route, sitemap, export or deletion logic changes.

## 1. Account deletion copy

`src/pages/AccountSettings.tsx`

- Delete panel summary becomes an accurate list: the account and everything saved to it, including saved journeys, baby details, First Year daily notes, First Year memories and their photo details, reflections, and stored private photos, videos and voice notes.
- Confirm dialog description gains the same First Year items, keeps "This cannot be undone" and keeps the invitation to download a copy first.
- Buttons, handlers and the delete function are untouched.

## 2. Four-baby ceiling wording

`src/components/firstyear/setup/firstYearSetupConstants.ts`

- `BABY_LIMIT_NOTE` reworded to the approved sentence: "We can set up four babies at the moment. If you have more than four, choose four for now and tell us so we can help."
- The note currently only appears after "More than three" is chosen, which is where the cap matters, so placement stays as is. The option label stays "More than three".
- No change to `MAX_BABIES`, validation, payload shape or the save call.

## 3. Older-child DOB wording

`src/lib/firstYearStage.ts` and `src/components/firstyear/setup/StepStage.tsx`

- `BEYOND_FIRST_YEAR_NOTE` extended with the next step: "First Year is built around the first twelve months, so some guidance may be less relevant now. You are welcome to carry on. If your child is older, toddler guidance may be a better fit."
- `StepStage` renders the note as it does today, followed by a quiet text link to the existing public `/toddler` hub, opening in the same tab, with the shared setup link styling and a visible focus ring.
- Date validation window, stage thresholds and the ability to continue are unchanged. Nothing redirects.

## 4. Memory photo viewer alt text

`src/components/firstyear/memories/MemoryPhotoViewer.tsx` and its caller in `src/pages/firstyear/FirstYearMemories.tsx`

- The viewer derives the image alt from the memory title it already displays: "Photo for memory: {title}" when a title exists, otherwise "Photo saved with this memory".
- The title is already shown in the dialog heading, so nothing private is added. Note text is never used.
- The existing `caption` prop is replaced by this derivation, or kept and defaulted, whichever keeps the caller simplest. Photo loading, signed URLs, replace, remove and delete are untouched.

## Copy guardrails

No banned words and no em dashes in any changed string.

## Verification

- `npx tsgo --noEmit -p tsconfig.json`
- `npx vitest run` (First Year setup and stage tests are the targeted ones)
- `npm run build`, then confirm `public/sitemap.xml` is unchanged

Report returned with files changed, per-item results, copy safety, check results, sitemap status and a launch-readiness statement.
