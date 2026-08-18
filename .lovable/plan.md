# Phase 26C Refinement: Daily Rhythm logging that actually works

Keeps the Today page structure, route scope, table, RLS and styling. Refines the logging model and the four sheets so real baby care can be logged one handed.

## What changes for the parent

Quick add becomes four actions: Feed, Sleep, Nappy, Moment. Pump disappears from the interface.

**Feed** opens in two steps. First "What type of feed?" with Breast or Bottle only.

- Breast: a live side timer with Start left, Start right, Switch side, Pause, End feed, plus an "Add manually" path for left and right durations. Total is calculated, never asked for. Optional note.
- Bottle: only after Bottle is chosen do the kinds appear (expressed breast milk, formula, tube feed, other). Then amount in ml or oz (optional, above 0, up to 2000), time, optional note. "Other" shows a short note prompt.

**Sleep** opens on two choices: "Start sleep now" or "Add sleep manually". Starting now writes a row with no end time, so the Active card timer survives a refresh. End sleep writes the end time and the duration lands in Today so far and the timeline. Manual entry takes start, end, an optional nap or night label and an optional note.

**Nappy** becomes Wee, Poo, Both, Dry. Every option asks the time, "Any redness or rash noticed?" (No, A little, Yes, Not sure) and an optional note. Poo and Both also ask texture (runny, soft, formed, hard, other), size (small, medium, large) and colour (yellow, brown, green, other), all optional.

**Moment** stays as time plus note text, which is required.

**Today so far** shows Feeds (count, plus total feeding time when breast durations exist and total amount when bottle amounts exist), Sleep (total logged duration, with a "currently sleeping" cue rather than counting an unfinished sleep), Nappies (count with a quiet wee / poo / both / dry breakdown) and Moments. No Pump tile.

**Timeline rows** read like "Breast feed, left 8m, right 10m", "Bottle, formula, 90ml", "Sleep, 10:15 to 11:05, 50m", "Sleeping now, started 10:15", "Poo nappy, soft, medium", "Dry nappy". Each row keeps time, baby name for multiples, Edit and Remove.

**Active card** shows a running sleep and a running breast feed. Sleep is shown first when both exist. One running sleep and one running feed per baby.

## Technical approach

**Migration (new file, forward only).** The Phase 26C table is already deployed, so this is an alter, not a rewrite:

- widen the `nappy_type` check to allow `wee`, `poo`, `both`, `dry` alongside the existing `wet`, `dirty` (old rows keep working; the UI writes only the new values and reads the old ones as wee/poo).
- relax `first_year_care_events_sleep_shape` so a feed may also carry `started_at` and `ended_at`, keeping the rule that other types carry neither.
- add a partial unique index for one running breast feed per baby (`event_type = 'feed' AND started_at IS NOT NULL AND ended_at IS NULL`).
- `event_type` keeps `pump` in the check constraint: dormant, never surfaced.
- extend the validation trigger: require `feed_mode` in metadata for feeds, require `bottle_type` when the mode is bottle, keep nappy type and moment note required, and validate the metadata keys it owns.

**Metadata over new columns.** Feed and nappy detail lives in the existing `metadata` jsonb with strict typed helpers, which keeps the table stable and matches how the rest of the project stores shaped extras: `feed_mode`, `bottle_type`, `left_duration_seconds`, `right_duration_seconds`, `total_duration_seconds`, `active_side`, and for nappies `rash_level`, `poo_texture`, `poo_size`, `poo_colour`. Existing explicit columns (`amount_ml`, `side`, `nappy_type`, `sleep_kind`, `note`) stay as they are.

**Files touched**

- `src/lib/firstYearCareEventsSchema.ts`: new unions and labels, metadata parse/serialise helpers, refined `validateCareEventDraft`, `summariseDay` (feeding minutes, nappy breakdown, running feed, no pumps), `describeEvent` row text.
- `src/lib/firstYearCareEvents.ts`: start/stop breast feed alongside start/stop sleep, running feed fetch, metadata passthrough.
- `src/components/firstyear/today/LogSheet.tsx`: split into a small sheet shell plus `FeedSheet`, `SleepSheet`, `NappySheet`, `MomentSheet` so each step stays readable.
- New `src/components/firstyear/today/BreastTimer.tsx` for the live side stopwatch and the manual duration path.
- `QuickAddRow.tsx`, `TodaySoFar.tsx`, `ActiveCard.tsx`, `RhythmTimeline.tsx`, `RecentDays.tsx`: pump removal and richer detail.
- `src/pages/firstyear/FirstYearToday.tsx`: running feed state next to running sleep, wiring only.
- `src/lib/firstYearCareEventsSchema.test.ts`: extend with feed mode, bottle type, breast duration, nappy detail, summary and row text cases.

**Timers.** Elapsed time is derived from `started_at` on every render with a one second tick while a timer runs, so nothing depends on a client side counter and a refresh resumes exactly where it was.

**Untouched:** `/my-first-year`, memories, setup, public pages, Cindy, AI backend, navigation and the app shell. No care event data is passed to any AI context; the companion context builder is not edited.

**Copy:** warm, factual, British English, no banned words, no em dashes, no advice, no prediction or recommendation of any kind.

## Verification

390px and 1440px passes over the Today page and every sheet, create/edit/remove for each type, running sleep and running feed across a refresh, multiples, focus rings, no overflow, no console errors, then `npx tsgo --noEmit -p tsconfig.json`, targeted tests, `npx vitest run` and `npm run build`. Report returned in the requested order, then stop.
