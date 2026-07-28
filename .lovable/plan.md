
# Phase 15.1 — Must Fix Product Gaps

Approved scope. Five focused fixes. No route, migration, storage, RLS, sitemap, analytics, AI prompt, voice, export, or asset changes.

## Fix 1 — Save confirmations on My Week

Add a calm, inline "Saved to this week." beat after each successful save, fading after ~2.4s. No toasts.

- `SlotReflection.tsx`: swap the footer autosave line to say `Saved to this week.` while `saveState === "saved"`, keeping the existing `Held privately.` idle text and the debounce untouched. Add optional `onSaved?: () => void` fired after each successful debounced save and shaping accept.
- `SlotPhotoMemory.tsx`: add a `justSaved` transient (2.4s timer) set after a successful upload and a successful caption save. Render a small `Saved to this week.` line under the figure using existing type tokens. Add `onSaved?: () => void`.
- `SlotVideoMemory.tsx`: same `justSaved` beat for upload and caption save, rendered directly under the video figure. Add `onSaved?: () => void`.

## Fix 2 — "Captured this week" indicator

Header line inside `SectionKeepThisWeek.tsx` that runs three cheap reads on mount for the current `(userId, week)`:

- `reflections.content` (non-empty)
- `week_photos.storage_path`
- `week_media_memories` where `media_type = 'video'`

Rendering:
- 0 kept → hidden.
- 1 kept → `Captured this week · reflection` (or photo/video).
- 2 kept → `Captured this week · reflection and photo`.
- 3 kept → `Captured this week · reflection, photo and video`.

Styling matches the section's existing tracking-uppercase accent tick label. No banner, no icons, no counts. A `refreshKey` bumped by each slot's `onSaved` re-runs the reads.

## Fix 3 — Bind reflection into the weekly capture section

`SectionKeepThisWeek.tsx` accepts a new `content: MyWeekEntry` prop and renders, in order: header indicator → `SlotReflection` → hairline → `SlotPhotoMemory` → hairline → `SlotVideoMemory` → footer link. Reflection keeps its own "A moment for you" heading. `MyWeek.tsx` drops its standalone `<SlotReflection>` render and passes `content` to `SectionKeepThisWeek`. No wider page-rhythm changes.

## Fix 4 — Quiet link from My Week to My Journey

Inside `SectionKeepThisWeek`, when the header indicator shows ≥1 kept item, render a low-emphasis footer link `See this week in My Journey →` to `/my-journey` using existing text-link styling. No modal, no forced navigation.

## Fix 5 — De-duplicate due date and setup surfaces

**Found duplication:** `DueDateCalculatorResult.tsx` shows three "Save your journey" CTAs (lines 368, 540, 1184) that unconditionally call `stashPendingJourney(lmp)` then `navigate("/auth")`, even for signed-in users who already have a saved pregnancy journey. This bounces signed-in users back through auth and frames the exploratory calculator as a fresh setup. Setup.tsx is unchanged (existing silent auth-flow commit is fine). AccountSettings shows the active lifecycle but not the saved LMP/due date, so there is no self-serve read.

**Adjustments (no data-shape or week-calc changes):**

1. Add additive helper `saveActivePregnancyJourney(userId, lmp)` in `src/lib/savedJourney.ts` that wraps the same authoritative RPC + legacy mirror used by `commitPendingJourneyToDB`.
2. In `DueDateCalculatorResult.tsx`, resolve auth mode on mount via `supabase.auth.getSession` + `getActivePregnancyJourney`. Three states:
   - **Signed out**: unchanged label `Save your journey` → `stashPendingJourney` + `/auth`.
   - **Signed in, no saved journey**: label becomes `Save to my journey` → calls `saveActivePregnancyJourney` then routes to `/my-week`; falls back to stash+auth on error.
   - **Signed in, saved journey exists**: all three primary CTAs collapse to `View My Week` → `/my-week`. A calm notice near the top of the reveal reads `You already have a saved pregnancy journey. This calculator is exploratory, so your saved dates have not changed.` plus the saved due date if available. A secondary link `Update my saved dates` opens a shadcn `AlertDialog` confirmation before calling `saveActivePregnancyJourney` and routing to `/my-week`.
3. In `AccountSettings.tsx`, when `lifecycle === "pregnancy"`, load `getActivePregnancyJourney` and display saved LMP and due date as read-only text, plus a single `Recalculate with new dates →` link to `/due-date-calculator`. No competing CTA.

## Files expected to change

- `src/pages/MyWeek.tsx`
- `src/components/myweek/SectionKeepThisWeek.tsx`
- `src/components/myweek/SlotReflection.tsx`
- `src/components/myweek/SlotPhotoMemory.tsx`
- `src/components/myweek/SlotVideoMemory.tsx`
- `src/components/shared/DueDateCalculatorResult.tsx`
- `src/pages/AccountSettings.tsx`
- `src/lib/savedJourney.ts` (additive helper only)

Setup.tsx is not edited.

## Out of scope

Voice notes, keepsake export, inline AI, unified media viewer, hospital bag/birth plan upgrades, migrations, RLS, storage, routes, sitemap, analytics events, AI prompts, illustration assets.

## QA

- Save a reflection → `Saved to this week.` appears then fades.
- Upload a photo / save a caption → confirmation beat appears; upload and caption still work.
- Upload a video / save a caption → confirmation beat appears; playback and caption still work.
- Header indicator hidden at 0, reads correctly at 1/2/3 kept items, and refreshes after saves.
- Reflection now renders inside the unified capture section, above photo and video.
- `See this week in My Journey →` appears only when ≥1 kept and routes to `/my-journey`.
- Signed-in user with saved journey sees the exploratory notice and single `View My Week` CTA; `Update my saved dates` prompts a confirmation before overwriting.
- Signed-in user without a saved journey saves directly and lands on `/my-week` without auth bounce.
- Signed-out user's flow is unchanged.
- Account Settings shows saved LMP and due date when a pregnancy journey exists, with a single recalculate link.
- Mobile layout intact; no console errors.
- `npm run typecheck` returns exit 0; result reported.
