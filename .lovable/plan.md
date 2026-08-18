# Phase 26C Reset — Today Daily Rhythm Foundation

Rebuild `/my-first-year/today` from a journal page into the parent's daily care space: log feeds, sleep, nappies, pumping and moments, with an optional note for the day sitting around those logged moments.

Scope is this route plus one new table. No changes to `/my-first-year`, memories, setup, public pages, Cindy, or the AI backend. No sleep prediction, no wake-window model, no recommendations, no reminders. Manual logging and factual summaries only.

## Discovery, confirmed against the current project

- Baby model: `public.babies` (columns `id, user_id, date_of_birth, name, birth_order, is_primary`), created and replaced by the `save_first_year_journey` RPC. Multiples are first-class, up to four babies per user.
- Today currently reads and writes `public.first_year_entries` through `src/lib/firstYearEntries.ts`, with pure rules in `src/lib/firstYearEntriesSchema.ts` and page `src/pages/firstyear/FirstYearToday.tsx`. Eight fixed note kinds, one row per day, kind and baby.
- RLS pattern for First Year tables: grants to `authenticated` and `service_role` only, RLS enabled, four separate `auth.uid() = user_id` policies, plus a `validate_*` BEFORE trigger that re-checks ownership, lifecycle, baby ownership and dates.
- Account deletion: `supabase/functions/delete-account/index.ts` sweeps the two storage buckets by hand, then calls `admin.auth.admin.deleteUser`. All database cleanup relies on `ON DELETE CASCADE` from `auth.users`, with no per-table delete list. A new table with `user_id ... REFERENCES auth.users(id) ON DELETE CASCADE` is therefore covered with no edge-function change. `delete_active_journey` deletes `public.babies`, so a `baby_id` cascade also covers journey deletion.
- Existing tests: `src/lib/firstYearEntriesSchema.test.ts` and `src/components/firstyear/today/saveLabels.test.ts`. Both stay green.

## What the parent sees

```text
Back to First Year
Today hero (date, baby name and age, babies switcher for multiples)
Quick add row (Feed, Sleep, Nappy, Pump, Moment)
Today so far (counts and totals, factual only)
Active card (a sleep in progress, or the latest logged moment)
Daily rhythm (today's timeline, newest first, edit and remove)
A note for today (optional, one per day)
Recent days (last 7 days, counts per day)
Gentle support footer
```

Wording stays warm: "Today's rhythm", "Log today", "Add a moment", "Today so far", "Daily rhythm". The word "tracker" never appears in the interface.

### Logging sheets

Each quick-add opens a small sheet with the time defaulted to now, so a one-handed log takes two taps.

- Feed: breast, bottle, expressed milk, formula, or solids (offered from around six months). Optional amount, optional side, optional short note.
- Sleep: start now with a live running timer and stop later, or enter start and end manually. Duration is calculated, never suggested. Optional nap or night label and note.
- Nappy: wet, dirty or both, plus optional note.
- Pump: time, optional amount, optional side, optional note.
- Moment: time and a free note.

Amounts are entered in ml or oz; the value is always stored in `amount_ml` and converted for display only. The unit choice is remembered on the device.

Multiples: every event belongs to one baby. The hero switcher sets the baby a new log is for, and each timeline row shows the baby's name.

### Existing daily check-in

The four baby note fields (rhythm, feeding, sleep, nappies) are retired from this page, replaced by the care log. The parent lane becomes a single optional "A note for today". Notes already saved stay in the database, stay visible in Recent days and stay available in Memories; they are simply no longer written from Today.

## Migration to apply

`public.first_year_care_events`

| column | type | notes |
| --- | --- | --- |
| id | uuid pk | |
| user_id | uuid not null | `auth.users` cascade |
| baby_id | uuid not null | `public.babies` cascade |
| event_type | text not null | feed, sleep, nappy, pump, note |
| occurred_at | timestamptz not null | the anchor time; set from `started_at` for sleep |
| started_at / ended_at | timestamptz | sleep only; `ended_at` null means running |
| amount_ml | numeric(6,1) | feed and pump, optional; when supplied greater than 0 and no more than 2000 |
| side | text | left, right, both |
| nappy_type | text | wet, dirty, both |
| feed_method | text | breast, bottle, expressed, formula, solids |
| sleep_kind | text | nap, night |
| note | text | max 2000 chars |
| metadata | jsonb default '{}' | headroom for parent-set reminders later |
| created_at / updated_at | timestamptz | `set_updated_at` trigger |

Security and validation:

- Grants to `authenticated` and `service_role` only, no `anon`. RLS enabled with four `auth.uid() = user_id` policies.
- Trigger `validate_first_year_care_event`: actor owns the row, lifecycle is `first_year`, baby belongs to the user, no future times, nothing before the baby's date of birth, nappy needs a type, only Moment events require note text (feed, sleep, nappy and pump notes stay optional), non-sleep rows cannot carry sleep times.
- Shape constraints keep fields to their event type, and `ended_at > started_at` when present.
- Partial unique index `(baby_id) WHERE event_type = 'sleep' AND ended_at IS NULL` enforces one running sleep per baby.
- Indexes on `(user_id, occurred_at desc)` and `(user_id, baby_id, occurred_at desc)`.

## Technical notes

- `src/lib/firstYearCareEventsSchema.ts` — pure types, labels, validation, duration and ml/oz conversion, day bucketing. Unit tested.
- `src/lib/firstYearCareEvents.ts` — Supabase reads and writes: events for a day, recent day counts, start and stop sleep, save, update, delete.
- `src/components/firstyear/today/` — `QuickAddRow`, `LogSheet`, `TodaySoFar`, `ActiveCard`, `RhythmTimeline`, `RecentDays`; existing `NoteField` reused for the day note.
- `FirstYearToday.tsx` keeps its lifecycle guards, redirects, load and error states and toast patterns; the body is replaced.
- Styling uses existing tokens and `firstYearStyles.ts` constants. No new colours, no hardcoded hex.
- Cindy and the AI backend are untouched; no care event is ever passed to AI in this phase.
- Tests: schema unit tests plus a Today page render test covering an empty day, a logged day and a running sleep.

## Verification

Typecheck, lint, targeted and full Vitest, build, plus a signed-in browser pass at 390px and 1440px covering create, edit and delete for each event type, sleep start and stop, the summary, recent days, multiples, overflow, console and focus rings.
