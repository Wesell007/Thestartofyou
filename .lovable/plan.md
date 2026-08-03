# Phase 15.7 — Pregnancy Continuity and Correctness

Low-risk correctness pass. No migrations, no RLS changes, no storage changes, no AI prompt changes, no service worker.

---

## Audit findings (verified before planning)

| # | Finding | Evidence |
| --- | --- | --- |
| 1 | `/account-settings` is not a registered route. Only `/account` exists. Seven links point at the missing path and land on the 404 page. | `src/App.tsx:319` is the only account route; no `Navigate` alias exists. Linking sites: `PageStatusNotice.tsx:58`, `SectionJourneyPaused.tsx:30`, `SectionJourneyQuiet.tsx:32`, `SectionPregnancyComplete.tsx:40`, `JourneySupport.tsx:131`, `MyJourney.tsx:353`, `PregnancyToolkit.tsx:258` |
| 2 | Export payload covers 8 tables and omits 8 more. | `AccountSettings.tsx:100-127` selects `profiles`, `journeys`, `pregnancy_journeys`, `ttc_journeys`, `ttc_logs`, `reflections`, `week_photos`, `archived_journeys` only |
| 3 | Account Settings renders `Navbar`/`Footer`, not the journey shell. | `AccountSettings.tsx:5-6`, `:235` |
| 4 | Two native browser confirms on destructive actions. | `AccountSettings.tsx:144`, `AccountSettings.tsx:160` |
| 5 | `KeptChapter` never reads journey status; kept memories render for every status. | `KeptChapter.tsx:41-52` `Loaded` type has no `status` field; no status branch anywhere in the file |
| 6 | `/my-journey` signs media URLs once for 60 minutes with no refresh; `KeptChapter` refreshes at 50 minutes. | `MyJourney.tsx:158-166` one-shot `createSignedUrls(..., 60*60)`; `KeptChapter.tsx:257-261` 50-minute re-fetch timer |
| 7 | No manifest, no icons beyond `favicon.ico`. | `public/` contains only `favicon.ico`, `placeholder.svg`, `robots.txt`, `sitemap.xml`; `index.html` has no manifest link |
| 8 | `MyJourney.tsx:353` uses a raw `<a href>` instead of `<Link>`, forcing a full page reload. | `MyJourney.tsx:352-357` |

`alert-dialog.tsx` already exists in `src/components/ui/`, so fix 4 needs no new dependency.

---

## What will be built

### 1. Account Settings route alias

Add a second route in `src/App.tsx` mounting the same `AccountSettings` element at `/account-settings`, wrapped in the same `ProtectedRoute`. An alias rather than a redirect, so both paths render directly and no loop is possible. `/account` stays the canonical path used by `MyWeekHeader` and `JourneyBottomNav`.

Convert `MyJourney.tsx:353` from `<a href>` to `<Link to>` so it becomes a client transition like the other six.

Then audit all seven link sites and confirm each resolves.

### 2. Complete the data export payload

Extend the `Promise.all` in `exportData` to also read, scoped to `user_id`:

`week_media_memories`, `birth_plans`, `hospital_bag_items`, `pregnancy_appointments`, `baby_movement_notes`, `contraction_sessions`, `pregnancy_symptom_notes`, `midwife_questions`.

Add each to the payload under a clear key. Because every row already carries `storage_path` and never a URL, the export continues to contain storage path references only — no signed URLs, no public URLs. A short note is added to the payload explaining that media files themselves are not included in the JSON.

Read-only selects. No schema change, no RLS change, no server export, no email delivery.

### 3. Account Settings in the journey shell

Swap `Navbar`/`Footer` for `MyWeekHeader`/`MyWeekFooter` and adopt the journey page frame used by `/my-week` and `/my-journey`: `bg-parchment-grain page-vignette`, the constrained content column, and top padding that clears the fixed header. All existing sections, handlers, loading state and signed-in checks stay exactly as they are.

`JourneyBottomNav` already treats `/account` as a shell route; `/account-settings` is added to its `SHARED_ROUTES` so the tab bar persists on the alias too.

### 4. Replace browser confirms

Introduce a small shared `ConfirmDialog` built on the existing `alert-dialog` primitive, with title, calm body copy, cancel action and a destructive confirm action. Wire it to both journey removal and account deletion via local state, so `removeJourney` and `deleteAccount` keep their current logic and only lose the `window.confirm` guard.

Copy comes from `journeyStatusCopy.ts` conventions: no alarming language, explicit about what is removed and what is not.

### 5. KeptChapter sensitive-state branch

`getActivePregnancyJourney` already returns `status`; `KeptChapter` currently discards it. Store it on `Loaded`, then:

- `active` — unchanged.
- `pregnancy_loss`, `paused`, `no_longer_pregnant` — do not render kept memories on arrival. Show the page frame plus the existing status chip and a reveal control, mirroring the `JourneyKeptRegion` pattern already used on `/my-journey`.
- `given_birth` — consistent with `/my-journey`: content shown, with the status chip present.

Reuses `STATUS_CHIP_LABEL` and existing copy. Nothing is deleted or permanently hidden.

### 6. Signed URL refresh parity on My Journey

Mirror the `KeptChapter` approach exactly: add an `attempt` counter to the load effect dependency list and a 50-minute timer that increments it whenever any media is present. Photos, videos and voice notes all re-sign together in the existing single `createSignedUrls` call. Lifetime stays 60 minutes; no storage or RLS change; no public URLs.

### 7. Manifest baseline only

Add `public/manifest.webmanifest` with the app name, short name, `theme_color` matching the existing `#f9f8f6`, background colour, and 192px and 512px icons generated from the brand logo. Link it from `index.html` alongside an `apple-touch-icon`.

No service worker, no registration code, no offline handling, no caching, no install prompt. Full installable-PWA behaviour with offline support stays out of scope and is reported as future work.

### 8. AI unchanged

No changes to `companionContext.ts`, `SectionAskAI.tsx`, `useAISearch.ts`, `AskPage.tsx` or any edge function. The optional `/ask` handoff is explicitly **not** included in this phase — it belongs with the Ask shell work and is not needed for continuity correctness.

---

## Technical notes

- Route alias uses a duplicate `<Route>` element, not `<Navigate>`, avoiding any redirect chain.
- The export additions are pure `select("*").eq("user_id", userId)` reads guarded by the existing combined error check, so one failing table surfaces the existing error toast rather than a partial download.
- `ConfirmDialog` is a new file under `src/components/shared/`; it is generic and takes title, description, confirm label and an async handler.
- The My Journey refresh timer is cleared on unmount and only starts when at least one media item resolved, matching `KeptChapter.tsx:257-261`.
- Manifest icons are generated as PNGs into `src/assets` equivalents under `public/` so they are referenced by absolute path from `index.html`.

## Files expected to change

`src/App.tsx`, `src/pages/AccountSettings.tsx`, `src/pages/MyJourney.tsx`, `src/pages/KeptChapter.tsx`, `src/components/layout/JourneyBottomNav.tsx`, `src/components/shared/ConfirmDialog.tsx` (new), `index.html`, `public/manifest.webmanifest` (new), `public/` icon files (new).

## Verification

- `npx tsgo --noEmit -p tsconfig.json`
- Vitest run for existing suites
- Playwright pass over `/account`, `/account-settings`, `/my-journey`, `/my-week`, one `/my-week/:week` kept chapter, `/pregnancy-toolkit`, `/pregnancy-toolkit/hospital-bag`, `/pregnancy-toolkit/birth-plan`, at desktop and mobile widths, checking console cleanliness
- Manual crawl of all seven Account Settings links to confirm none reach the 404 page
- Export run with the payload keys inspected for the eight added tables and no URL fields

## Explicitly out of scope

Memory-aware AI, sharing, notifications, service worker, offline mode, native app work, new toolkit features, redesigns.
