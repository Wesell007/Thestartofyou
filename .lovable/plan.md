# Phase 9.5c — Saved TTC Setup Flow

## Files inspected

`src/App.tsx`, `src/pages/Setup.tsx`, `src/pages/Auth.tsx`, `src/pages/MyJourney.tsx`, `src/pages/MyWeek.tsx`, `src/components/auth/ProtectedRoute.tsx`, `src/lib/savedJourney.ts`, `src/lib/authIntent.ts`, `src/lib/analyticsEvents.ts`, `src/pages/OvulationCalculator.tsx`, `src/components/ttc/OvulationResult.tsx`, `src/integrations/supabase/client.ts`, all files under `supabase/migrations/`. Confirmed the existing pregnancy pattern: `journeys` pointer already accepts `lifecycle = 'ttc'` (CHECK constraint), `pregnancy_journeys` payload table, local-first `pendingJourney` localStorage → `commitPendingJourneyToDB(userId)` on `/setup`. `OvulationResult.tsx`'s current `handleSave` only writes to a `STORAGE_KEY` for "saved cycle" reminders; it does not stash a pending TTC journey or route anywhere.

## Files to create

- `supabase/migrations/<timestamp>_ttc_journeys.sql` — new table + RLS + grants.
- `src/lib/savedTTCJourney.ts` — pending stash, commit, and derived-date helpers scoped to TTC. Keep pregnancy helpers in `savedJourney.ts` untouched.
- `src/lib/ttcDerived.ts` — shared derived-date + stage calculator (also imported by the ovulation calculator later; not switched over in this phase to avoid touching calculator logic).
- `src/pages/SetupTTC.tsx` — the `/setup/trying-to-conceive` form.
- `src/pages/MyTTCJourney.tsx` — minimal protected placeholder for `/my-ttc-journey`.

## Files to edit

- `src/App.tsx` — mount `/setup/trying-to-conceive` (public, self-managed auth handoff like existing `/setup`) and `/my-ttc-journey` (wrapped in `<ProtectedRoute>`).
- `src/components/ttc/OvulationResult.tsx` — replace the presentational `handleSave` with a real save flow: stash pending TTC journey, then route to `/auth?intent=return_to_route&return_to=/setup/trying-to-conceive` when signed-out, or directly to `/setup/trying-to-conceive` when signed-in.
- `src/lib/authIntent.ts` — extend `PROTECTED_ROUTE_PREFIXES` with `/my-ttc-journey` and `/setup/trying-to-conceive` so `return_to_route` survives the auth round-trip (setup is not itself gated, but must be allowed as a safe post-login destination).
- `src/lib/analyticsEvents.ts` — add two events: `TTC_JOURNEY_SAVE_STARTED`, `TTC_JOURNEY_SETUP_COMPLETED` (empty prop shapes, common envelope only — matches existing pattern; no cycle-sensitive properties).

Everything else is untouched: pregnancy journey code, calculator formulas, SEO, sitemap, robots, hubs.

## Database migration

New table `public.ttc_journeys`, one row per user (unique `user_id`):

```
id uuid pk, user_id uuid not null unique references auth.users on delete cascade,
stage text,
last_period_date date,
cycle_length_days int,
period_length_days int,
cycle_regularity text,
actively_trying text,
uses_ovulation_tests text,
tracks_symptoms text,
support_status text,
ivf_consideration text,
current_cycle_start date,
fertile_window_start date,
fertile_window_end date,
likely_ovulation_date date,
expected_period_date date,
possible_test_date date,
positive_test_status text,
started_at timestamptz not null default now(),
updated_at timestamptz not null default now()
```

Order per repo convention: `CREATE TABLE` → `GRANT SELECT, INSERT, UPDATE, DELETE ON public.ttc_journeys TO authenticated; GRANT ALL TO service_role;` (no `anon` grant) → `ALTER … ENABLE RLS` → 4 policies (`select/insert/update/delete` scoped to `auth.uid() = user_id`) → `set_updated_at` trigger reusing existing `public.set_updated_at()` function.

`public.journeys.lifecycle` already permits `'ttc'` (existing CHECK constraint). No schema change to `journeys` needed.

No changes to `saved_journeys`; TTC is **not** mirrored to legacy.

## Local pending save

`src/lib/savedTTCJourney.ts` exports:

- `PendingTTCJourney` type carrying `lmp_ms`, `cycle_length_days`, optional `period_length_days`, and the derived dates the calculator already computed (`likely_ovulation_date`, `fertile_window_start/end`, `expected_period_date`, `possible_test_date`), plus `savedAt`. No preferences, no logs — form fields captured at `/setup/trying-to-conceive` are not stashed pre-auth to keep sensitive answers off the device unnecessarily.
- `stashPendingTTCJourney(input)` / `getPendingTTCJourney()` / `clearPendingTTCJourney()` under key `pendingTTCJourney`.
- `commitPendingTTCJourneyToDB(userId, formValues)` — writes `ttc_journeys` upsert on `user_id`, then upserts `journeys` pointer with `lifecycle = 'ttc'`. Refuses to overwrite when an active `lifecycle = 'pregnancy'` pointer exists (returns a discriminated result the setup page renders as a gentle notice with a link back to `/my-journey`).
- `getActiveTTCJourney(userId)` — mirrors `getActivePregnancyJourney` shape for the placeholder page.

## Derived dates & stage

`src/lib/ttcDerived.ts` implements the exact formulas the spec quotes (no formula change):

```
likely_ovulation = lmp + cycleLen - 14
fertile_start    = likely_ovulation - 5
fertile_end      = likely_ovulation + 1
possible_test    = likely_ovulation + 15
expected_period  = lmp + cycleLen
```

`computeStage(today, dates)` → one of `before_ovulation | fertile_window | likely_ovulation | two_week_wait | test_window | expected_period`, displayed as a soft "roughly where you are" label, never as certainty.

The ovulation calculator continues to use its current inline formulas — no refactor in this phase; drift risk is noted for Phase 9.5d.

## `/setup/trying-to-conceive` form

Public route (no `<ProtectedRoute>`). On mount:

1. Read `getPendingTTCJourney()`; prefill LMP + cycle length if present.
2. Read auth session. If signed out, still render the form but the submit CTA reads "Continue — sign in to save" and routes to `/auth?intent=return_to_route&return_to=/setup/trying-to-conceive` after re-stashing the current form values into `pendingTTCJourney` (extended shape covering all form answers, still no logs).
3. If signed in and `getActivePregnancyJourney` returns a row, show a calm block: "You have an active pregnancy journey saved. Saving a TTC journey would replace it." with a link to `/my-journey`; do **not** auto-overwrite.
4. If signed in and `getActiveTTCJourney` returns a row, prefill from DB and switch CTA to "Update TTC setup".

Fields (calm, TTC-green palette, British English, no em dashes, no clinical tone, no fertility score / safe-day / diagnosis / guarantee copy):

- First day of last period (date, required)
- Usual cycle length (number, 20–45, required)
- Period length (number, 2–10, optional)
- Cycle regularity: regular / irregular / unsure
- Actively trying: yes / not yet, preparing / unsure
- Ovulation tests: yes / no / sometimes
- Symptom tracking: yes / not right now
- Wider journey: trying naturally / preparing to try / considering fertility help / in fertility treatment
- IVF consideration: no / considering / already in treatment / prefer not to say

Sensitivity note above the form: "Your TTC journey can include sensitive information. We use it to keep your saved guidance together. You can update or remove it later." Pre-auth stash line where relevant: "Saved on this device until you sign in."

Zod validation on submit; on success call `commitPendingTTCJourneyToDB`, fire `TTC_JOURNEY_SETUP_COMPLETED`, `clearPendingTTCJourney()`, navigate to `/my-ttc-journey`.

## `/my-ttc-journey` placeholder

`<ProtectedRoute>`-wrapped. Reads `getActiveTTCJourney`. If missing, `<Navigate to="/setup/trying-to-conceive">`. Otherwise a calm card:

> Your TTC journey is saved
> Next, we will build your personal dashboard with cycle timing, next steps and gentle reminders.

Links: `/trying-to-conceive`, `/ovulation-calculator`, `/ask?stage=ttc`. No data readouts of sensitive fields in this placeholder (just confirmation).

## Ovulation calculator save CTA rewiring

In `OvulationResult.tsx`, `handleSave` becomes:

1. `stashPendingTTCJourney({ lmp_ms, cycle_length_days, derived: { … from current props … } })`.
2. `trackEvent(TTC_JOURNEY_SAVE_STARTED)`.
3. `supabase.auth.getSession()`; if signed out → `navigate(buildAuthUrl('return_to_route', '/setup/trying-to-conceive'))`, else `navigate('/setup/trying-to-conceive')`.

Leave the existing "reminders" localStorage under `STORAGE_KEY` alone (independent concern). Do not silently persist to DB from the calculator — the setup page is the only place a TTC journey is written.

## Analytics

`ttc_journey_save_started`, `ttc_journey_setup_completed` — empty prop shape, common envelope only. Confirmed forbidden set (last period date, cycle length, results, preferences, treatment status) is never attached.

## Guardrails satisfied

No changes to calculator formulas, canonicals, SEO tags, sitemap, robots, or non-TTC hubs. No logs table, no dashboard, no handover automation, no legacy mirror, no anonymous DB access, no PII in analytics.

## Verification plan

- `bunx tsgo --noEmit`.
- Playwright (headless, viewport 1280×1800) against `http://localhost:8080`:
  1. Signed-out: `/ovulation-calculator?lmp=2026-06-16&cycle=28` → click save → assert URL becomes `/auth?intent=return_to_route&return_to=%2Fsetup%2Ftrying-to-conceive`; `localStorage.pendingTTCJourney` present.
  2. Signed-in (using `LOVABLE_BROWSER_SUPABASE_*` if `LOVABLE_BROWSER_AUTH_STATUS=injected`; otherwise report as unverified): save → lands at `/setup/trying-to-conceive` with LMP prefilled → submit → lands at `/my-ttc-journey`; row exists via `supabase--read_query`.
  3. Signed-in with pre-existing pregnancy journey: setup page shows the "active pregnancy" notice and does not write.
  4. Regression smoke: `/`, `/my-journey`, `/my-week`, `/setup`, `/due-date-calculator`, `/due-date-results`, `/ovulation-calculator`, `/trying-to-conceive`, `/pregnancy`, `/first-year`, `/toddler`, `/family`, `/ivf` — all 200, no console errors.
- DB check via `supabase--read_query`: RLS enabled, 4 policies, grants correct, unique `user_id`.

## Deliverables

Route added: `/setup/trying-to-conceive` (public), `/my-ttc-journey` (protected placeholder). New table `ttc_journeys` with RLS + grants. `journeys` pointer reused (no schema change). Local pending save under `pendingTTCJourney`. Save CTA on ovulation result routes through auth intent → setup. No SEO / sitemap / robots / calculator-formula changes.

## Safe to proceed to Phase 9.5d?

Yes — once the above verifications pass. The placeholder at `/my-ttc-journey` gives Phase 9.5d a clear mount point without pre-committing dashboard design.
