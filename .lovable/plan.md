# Phase 26C Reset — Today Daily Rhythm Foundation

Rebuild `/my-first-year/today` from a journal page into the parent's daily care space: log feeds, sleep, nappies, pumping and moments, with an optional note for the day sitting around those logged moments.

Scope is this route plus one new table. No changes to `/my-first-year`, memories, setup, public pages, Cindy, or the AI backend. No sleep prediction, no wake-window model, no recommendations. Manual logging and factual summaries only.

## What the parent sees

Page order:

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

Wording stays warm: "Today's rhythm", "Log today", "Add a moment", "Today so far". The word "tracker" is not used in the interface.

### Logging sheets

Each quick-add opens a small sheet with sensible defaults (time = now) so a one-handed log takes two taps.

- Feed: breast, bottle, expressed milk, formula, or solids (solids offered from around six months). Optional amount, optional side (left, right, both), optional short note.
- Sleep: start now and end later with a live running timer, or enter start and end manually. Duration is calculated, never suggested. Optional nap or night label and short note.
- Nappy: wet, dirty, or both, plus optional note.
- Pump: time, optional amount, optional side, optional note.
- Moment: time and a free note for anything else.

Amounts are entered in ml or oz with a toggle; the value is always stored in ml and converted for display. The unit preference is remembered on the device only.

Multiples: every care event belongs to one baby. The hero switcher sets which baby a new log is for, and the timeline shows the baby's name on each row.

### Existing daily check-in

The four baby note fields (rhythm, feeding, sleep, nappies) are retired from this page, replaced by the care log. The parent lane becomes the single optional "A note for today". Notes already saved stay in the database, remain visible in Recent days and remain available in Memories; they are simply no longer written from Today.

## Data model

New table `public.first_year_care_events`:

| column | type | notes |
| --- | --- | --- |
| id | uuid pk | |
| user_id | uuid not null | references auth.users, cascade |
| baby_id | uuid not null | references public.babies, cascade |
| event_type | text not null | feed, sleep, nappy, pump, note |
| occurred_at | timestamptz not null | the moment the row is anchored to |
| started_at | timestamptz | sleep and pump |
| ended_at | timestamptz | null while a sleep is running |
| amount_ml | numeric | feed and pump |
| side | text | left, right, both |
| nappy_type | text | wet, dirty, both |
| feed_method | text | breast, bottle, expressed, formula, solids |
| note | text | max 2000 chars |
| metadata | jsonb default '{}' | |
| created_at, updated_at | timestamptz | trigger keeps updated_at |

Security follows the existing First Year pattern exactly: grants to `authenticated` and `service_role` only, RLS enabled, four `auth.uid() = user_id` policies, plus a validation trigger mirroring `validate_first_year_entry` (actor must own the row, lifecycle must be `first_year`, baby must belong to the user, `occurred_at` not in the future, not before that baby's date of birth, field combinations valid for the event type, only one running sleep per baby). Indexes on `(user_id, occurred_at desc)` and `(user_id, baby_id, occurred_at desc)`.

Account deletion already cascades from `auth.users`, so no edge function change is needed.

## Technical notes

- `src/lib/firstYearCareEventsSchema.ts` — pure types, labels, validation, duration and ml/oz conversion, local day boundaries. Unit tested.
- `src/lib/firstYearCareEvents.ts` — Supabase reads and writes: list for a day, list recent day counts, start and stop sleep, save, update, delete.
- `src/components/firstyear/today/` — `QuickAddRow`, `LogSheet` (one sheet with per-type fields), `TodaySoFar`, `ActiveCard`, `RhythmTimeline`, `RecentDays`, plus the existing `NoteField` reused for the day note.
- `FirstYearToday.tsx` keeps its current lifecycle guards, redirects, load and error states, and toast patterns; the body is replaced.
- Styling reuses the tokens and constants in `firstYearStyles.ts` — no new colours, no hardcoded hex.
- Tests: schema unit tests (validation, duration, unit conversion, day bucketing) and a render test for the Today page covering an empty day, a logged day and a running sleep. Existing `saveLabels` and entries tests stay green.

## Verification

Typecheck, lint, targeted and full Vitest, build, plus a signed-in browser pass at 390px and 1440px checking an empty day, logging one of each type, a running sleep, editing and removing a row, and the day note.
