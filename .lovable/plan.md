# Phase 17A — First Year Baby and Postpartum Tracking Strategy

Planning only. No build in this phase.

## Audit findings

**Signed-in First Year surfaces**
- `/my-first-year` (`src/pages/firstyear/MyFirstYear.tsx`): protected, noindex, read-only. Renders hero panel, baby summary, two support lanes (baby and you), optional kept-chapter card, "what comes next" card. No tracking anywhere.
- `/my-pregnancy-chapter`: read-only kept chapter.
- `/setup/first-year`: 4-step setup with transition and direct modes.
- Journey components: `FirstYearHeroPanel`, `BabySummaryCard`, `SupportLane`, `PregnancyChapterKeptCard`, `WhatComesNextCard`. All presentational; only `MyFirstYear` reads data.

**Public First Year content**: hub, four phase pages, thirteen month pages, eight topic pages (feeding, sleep, development, care-and-safety, postpartum-recovery, emotional-wellbeing, body-and-hormones, checkups-and-warning-signs) plus `/first-year/:topic/:slug` articles. All legacy `/postpartum/*` routes already redirect into First Year recovery topics, so postpartum has no separate public system to keep in sync.

**Data model today**
- `babies`: id, user_id, date_of_birth, name, birth_order (1-4), is_primary, timestamps. Unique primary per user, unique birth order per user, DOB validation trigger.
- `first_year_journeys`: user_id PK, status enum (active/paused/completed), status_changed_at, source_pregnancy_lmp_date, archived_pregnancy_journey_id, started_at, updated_at.
- `journeys` holds the single active lifecycle pointer.
- Helpers: `src/lib/firstYearJourney.ts` (save/read/babies/kept chapter), `firstYearDates.ts` (age, postpartum week), `firstYearCopy.ts` (multiples-aware naming).

**Existing note/memory tables** — all pregnancy-scoped by design and should NOT be reused for First Year: `reflections` (week-indexed), `week_photos` and `week_media_memories` (pregnancy week + `weekly-photos` bucket), `pregnancy_symptom_notes`, `baby_movement_notes`, `midwife_questions` (pregnancy appointment linked), `pregnancy_appointments`. Reusing week-indexed tables for baby-age data would corrupt pregnancy surfaces and exports.

**No First Year tracking tables exist.** New schema is required.

**Guards, RLS, export, delete**
- Route guard pattern: `ProtectedRoute` plus in-page lifecycle checks that redirect TTC to `/my-ttc-journey`, pregnancy to `/my-week` or setup, and missing journeys to setup.
- RLS pattern is consistent: four owner policies scoped to `auth.uid()`, `GRANT` to `authenticated` and `service_role` only, `set_updated_at` trigger, user_id index.
- Export (`AccountSettings.tsx`) already includes `first_year_journeys` and `babies`; new tables must be added there.
- `delete-account` relies on `ON DELETE CASCADE` from `auth.users` plus manual storage cleanup, so new tables inherit deletion for free provided the FK cascades.

## Recommended direction: Option C (hybrid), confirmed

- **Option A (one daily log)**: simplest schema and gentlest UX, but a single row per day forces awkward compromises for multiples and mixes baby and parent content that later needs to split.
- **Option B (separate tools)**: matches the pregnancy toolkit pattern, but five or six new tables and tools for exhausted new parents is heavy, slow to launch and pressures completeness.
- **Option C (hybrid)**: one gentle daily check-in first, structured trackers layered later against the same table. Fastest to launch, no tracking pressure, and the entry model generalises. Risk: entries stay free-text so early data yields little structure — mitigated by optional quick tags now and structured `kind` values later.

## First build (Phase 17B scope): First Year Daily Check-in

A gentle "Today" surface where a parent can save any subset of: a baby rhythm note (feeding, sleep, nappies phrased as rhythm), a parent recovery note, an emotional wellbeing note, and a question to bring to a midwife, GP or health visitor. Everything optional, saved per day, editable, deletable. No streaks, scores, judgement or medical decisioning.

## Route and UX structure

- Keep `/my-first-year` calm. Add a single compact **Today card** near the top: today's date, gentle prompt, a summary of anything already saved, and one link.
- Full check-in lives at a new protected route **`/my-first-year/today`**. Not a modal: it holds several fields, needs deep-linking and back-button behaviour, and works better on mobile as its own page.
- On `/my-first-year/today`: baby rhythm section (baby selector only when multiples), parent recovery section, wellbeing section, questions section, then "Recent notes" (last seven days, read-only list with edit links).
- Copy rules: notice, log, save, remember, patterns, rhythm, support, "bring this up with your midwife, GP or health visitor". Banned: safe, unsafe, risk levels, reassurance claims, symptom checker, diagnosis.

## Data model

One table is enough for version one.

`public.first_year_entries`
- `id uuid pk`, `user_id uuid not null references auth.users(id) on delete cascade`
- `baby_id uuid null references public.babies(id) on delete cascade` — set for baby-lane entries, always null for parent-lane entries
- `entry_date date not null` (local calendar day supplied by the client)
- `lane text not null check (lane in ('baby','parent'))`
- `kind text not null check (kind in ('rhythm','feeding','sleep','nappies','recovery','wellbeing','rest_support','question'))` — extra kinds reserved for phase two trackers
- `note text` (length capped, e.g. 2000)
- `tags text[] not null default '{}'` (optional quick tags, capped count and length)
- `answered boolean not null default false` for question entries
- `created_at`, `updated_at` with `set_updated_at` trigger

Indexes: `(user_id, entry_date desc)`, `(user_id, baby_id)`. Validation trigger (not CHECK) to enforce: `entry_date` not in the future and not before the earliest baby DOB; `baby_id` null when `lane = 'parent'`; `baby_id` belongs to the same user.

Deferred to later phases: `first_year_memories` (media, own bucket, mirrors the pregnancy media pattern) and any structured numeric trackers, which can attach to this table via `kind` plus a `details jsonb` column added later.

**Multiples**: one daily check-in covers the whole family. Parent notes are journey-level (`baby_id` null). Baby notes default to the primary baby when there is one; with multiples the baby section shows a small chip selector and an "applies to all" action that writes one row per baby. Never force per-baby completion.

**RLS and access**: same four owner policies scoped to `auth.uid()`, grants to `authenticated` and `service_role` only. Direct table access from the client is acceptable — writes are single-row and owner-scoped, unlike the multi-table lifecycle flips that justified RPCs. No new RPC needed for Phase 17B. An RPC becomes worthwhile only if "applies to all babies" needs atomicity across rows, which can be a follow-up.

**Export and delete**: add `first_year_entries` to the Account Settings export payload and its copy. Deletion is covered by the `auth.users` cascade; the reset-journey path should also clear entries when a First Year journey is deleted.

## Other considerations

- **Analytics**: consent-gated, names only, no content. Suggested events: `first_year_checkin_opened`, `first_year_entry_saved` with `lane` and `kind` only. Never send note text, tags, baby names or dates.
- **Accessibility**: labelled textareas, visible focus rings, baby selector as a real radio group, live-region save confirmation, headings in order, 15px body text and existing stage palettes.
- **Postpartum lane**: notes, prompts and links into existing recovery, body-and-hormones and emotional-wellbeing guidance, plus questions to bring to a professional. No triage, scoring or reassurance claims. A persistent quiet line points to the midwife, GP or health visitor.

## Files that would change in Phase 17B

New: migration for `first_year_entries`; `src/lib/firstYearEntries.ts`; `src/lib/firstYearEntriesSchema.ts` plus tests; `src/pages/firstyear/FirstYearToday.tsx`; `src/components/firstyear/today/*`; `src/components/firstyear/journey/TodayCard.tsx`.
Edited: `src/App.tsx` (one route), `src/pages/firstyear/MyFirstYear.tsx` (Today card), `src/pages/AccountSettings.tsx` (export), `src/lib/analyticsEvents.ts`, `src/integrations/supabase/types.ts` (regenerated).
Must not change: pregnancy tables and surfaces, `reflections`, `week_photos`, `week_media_memories`, toolkit tools, public First Year content and routes, sitemap, robots, `src/integrations/supabase/client.ts`.

## QA plan

Unit tests for schema validation and multiples fan-out. Playwright on throwaway accounts: direct-start single baby, transition user, twins, TTC and pregnancy users blocked from `/my-first-year/today`, signed-out redirect, save and edit and delete round-trip, export contains entries, mobile and desktop layout, zero console errors. Typecheck, lint, tests and production build.

## Risks and open questions

- Timezone: entry_date is a client-supplied local date; needs a documented rule to avoid duplicate days across travel.
- Free-text notes are health-adjacent content: confirm no analytics or AI context ever carries them without explicit consent.
- Open: should the Today card appear before or after the baby summary on `/my-first-year`?
- Open: should questions saved here later surface alongside the existing pregnancy midwife-questions pattern, or stay separate?
