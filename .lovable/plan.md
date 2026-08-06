# Phase 17B — First Year Daily Check-in Build

A gentle, optional daily check-in for parents in their First Year: a few notes for baby, a few for you, and questions worth remembering. No trackers, no streaks, no scores.

## What gets built

1. **Today card** on `/my-first-year`, placed after the baby summary and before the support lanes. Shows today's date, a short prompt ("Save a few notes for baby, you, or questions you want to remember. Everything here is optional."), a one-line summary of what is already saved today, and a link through to the check-in.
2. **`/my-first-year/today`** — a protected, noindex page with a quiet back link and five optional sections: baby rhythm, recovery, emotional wellbeing, rest and support, and a question to bring to a midwife, GP or health visitor.
3. **Recent notes** — the last seven days, grouped by day, each with edit and delete.
4. **Save, edit, delete** for every entry, with a live-region save confirmation and a calm delete confirmation.
5. **Export** — daily entries included in the Account Settings data download.

### Baby lane and multiples

One baby: notes save to that baby automatically, no selector. Twins, triplets or four babies: a small accessible radio group appears with each baby plus an "All babies" option. "All babies" writes one row per baby. Nothing is ever required per baby.

### Parent lane

Recovery, wellbeing, rest and support, and questions are journey-level and never attached to a baby. Copy stays in the approved register (notice, log, save, remember, patterns, rhythm, support, "bring this up with your midwife, GP or health visitor") and avoids all reassurance, risk or triage language.

## Route guards

| User state | Result |
| --- | --- |
| Signed out | Auth, returning to `/my-first-year/today` |
| First Year with journey and at least one baby | Renders |
| First Year but missing journey or babies | `/setup/first-year` |
| Pregnancy, given birth | `/setup/first-year` |
| Pregnancy, other states | `/my-week` |
| TTC | `/my-ttc-journey` |
| No journey pointer | `/due-date-calculator` |

Calm loading, empty and retry states throughout; never a raw database message.

`/my-first-year/today` is added to protected auth return handling in `src/lib/authIntent.ts`, so a signed-out visitor is sent to auth and lands back on the check-in after signing in.

Lifecycle-aware navigation treats the route as First Year: the First Year route list in `src/lib/navLifecycle.ts` already prefix-matches `/my-first-year`, and this is confirmed for the mobile bottom nav (`src/components/layout/JourneyBottomNav.tsx`) so no pregnancy labels appear there. Any gap found is fixed in those two files only.

## Technical details

### Migration — `public.first_year_entries`

Columns: `id`, `user_id` (cascades from the account), `baby_id` (nullable, cascades from the baby), `entry_date`, `lane` (`baby` or `parent`), `kind` (`rhythm`, `feeding`, `sleep`, `nappies`, `recovery`, `wellbeing`, `rest_support`, `question`), `note`, `tags`, `answered`, `created_at`, `updated_at` with the shared `set_updated_at` trigger.

Constraints: note capped at 2000 characters; at most 8 tags; baby lane requires a baby and parent lane forbids one; baby kinds restricted to rhythm/feeding/sleep/nappies and parent kinds to recovery/wellbeing/rest_support/question.

Indexes: `(user_id, entry_date desc)`, `(user_id, baby_id, entry_date desc)`, plus partial unique indexes on `(user_id, baby_id, entry_date, kind)` for baby rows and `(user_id, entry_date, kind)` for parent rows, so re-saving updates instead of duplicating.

Validation trigger: tags must be short non-empty labels; the baby must belong to the same account; entry dates cannot precede the relevant date of birth; a generous future bound (UTC today plus one day) so no legitimate local "today" is ever rejected while the UI blocks real future dates.

RLS: four owner policies scoped to `auth.uid()`, grants to `authenticated` and `service_role` only, nothing to `anon`.

### Client

New `src/lib/firstYearEntriesSchema.ts` (lane and kind unions, note and tag validation, local-calendar-date helper built on `parseDateOnly` — never `toISOString`) and `src/lib/firstYearEntries.ts` (today's entries, recent entries, save, delete, and the "All babies" fan-out).

Saving does not rely on client upsert against partial unique indexes. Instead: look up the existing row by natural key (user, baby or null, date, kind), update when found, insert when not, and on a duplicate-key race refetch and update. All writes go through the table so the validation trigger always applies; no inserts bypass it. An RPC is added only if a real atomicity issue surfaces during build or QA.

Analytics uses the existing consent-gated helpers: `first_year_checkin_opened`, `first_year_entry_saved`, `first_year_entry_deleted`, carrying only `lane` and `kind`.

### Files

New: the migration; `src/lib/firstYearEntries.ts`; `src/lib/firstYearEntriesSchema.ts` plus tests; `src/pages/firstyear/FirstYearToday.tsx`; `src/components/firstyear/today/*`; `src/components/firstyear/journey/TodayCard.tsx`.

Edited: `src/App.tsx` (one route), `src/pages/firstyear/MyFirstYear.tsx` (Today card), `src/pages/AccountSettings.tsx` (export), `src/lib/authIntent.ts` (auth return), `src/lib/analyticsEvents.ts`, `src/lib/navLifecycle.ts` and `src/components/layout/JourneyBottomNav.tsx` only if nav matching needs it, regenerated `src/integrations/supabase/types.ts`.

Untouched: pregnancy tables and surfaces, the pregnancy toolkit, `reflections`, `week_photos`, `week_media_memories`, public First Year and Postpartum content and routes, the sitemap script, robots, and AI companion context.

## QA

Disposable accounts only, cleaned up afterwards. Covers: direct-start single baby (save, edit, delete, recent notes, Today card summary, export); transition user (entries save, kept pregnancy chapter still works, no pregnancy data mixing); twins (selector appears, "All babies" writes one row per baby, parent rows stay baby-free); duplicate prevention (saving the same kind twice on the same day updates one row); signed-out auth return landing back on `/my-first-year/today`; mobile bottom nav showing First Year labels on the route; blocked users (pregnancy, TTC, no journey); RLS cross-account read, update and delete attempts; desktop and mobile layout, keyboard flow, screen-reader labels, no console or network errors.

Then: typecheck, targeted tests, full `vitest run`, production build, sitemap and dist check.
