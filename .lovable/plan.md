# Phase 16.1 — Baby Record Foundation Planning

Planning only. No code, no migrations, no RLS changes, no routes, no AI changes.

---

## Executive summary

The First Year journey is one journey with two sides: **For baby** and **For you**. Postpartum is not a separate lifecycle in version one; it is the parent side of the same First Year journey. That decision keeps the data model to a single lifecycle value and avoids a second journey pointer that would immediately conflict with the one-active-lifecycle rule already enforced by `journeys` (primary key on `user_id`).

Verified before planning:

- `journeys` has `PRIMARY KEY (user_id)` and a lifecycle CHECK that **already allows** `'first_year'` and `'postpartum'`. No enum or constraint change is needed to introduce a First Year journey.
- `archived_journeys` stores a `jsonb` snapshot with `ended_reason` limited to `transitioned`, `completed`, `user_ended`. A pregnancy-to-first-year handover fits `transitioned` with no constraint change.
- `pregnancy_journeys.status` already carries `given_birth` and `outcome_date`, and `updatePregnancyJourneyStatus` already writes `outcome_date` only when the status is `given_birth`.
- `save_pregnancy_journey`, `save_ttc_journey` and `delete_active_journey` are SECURITY INVOKER, take an advisory lock on the user id, and upsert both the payload table and the `journeys` pointer. A First Year save must follow that exact shape.
- Pregnancy memories are keyed by pregnancy week: `week_photos.week` and `week_media_memories(user_id, week, media_type)` with a CHECK of weeks 1-42. First Year memories cannot reuse these tables without breaking that CHECK, so they will need their own table in a later phase.

Recommendation: **two new tables** — `first_year_journeys` (one row per user, the payload for the active First Year journey) and `babies` (one row per baby, multiples-ready from day one but with only one exposed in the version one UI). Plus a pure `src/lib/firstYearDates.ts` helper. No consent table in 16.1.

---

## Recommended version one data model

### `public.first_year_journeys`

One row per user, mirroring the `pregnancy_journeys` shape so every existing pattern transfers.

| Column | Type | Notes |
| --- | --- | --- |
| `user_id` | uuid, PK, references `auth.users` on delete cascade | one active First Year journey per user, same as pregnancy |
| `status` | text (new enum `first_year_journey_status`) | `active`, `paused`, `completed` |
| `status_changed_at` | timestamptz, null | |
| `source_pregnancy_lmp_date` | date, null | coarse pregnancy link, no free text |
| `archived_pregnancy_journey_id` | uuid, null, references `archived_journeys(id)` on delete set null | pointer back to the kept pregnancy chapter |
| `started_at` | timestamptz not null default now() | |
| `updated_at` | timestamptz not null default now() | `set_updated_at` trigger |

Deliberately **not** included: birth story text, birth type, feeding method, mental health flags, loss detail. Those are content, not foundation, and several are sensitive. Keep the foundation table free of them exactly as `pregnancy_journeys` is.

### `public.babies`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | uuid PK default `gen_random_uuid()` | |
| `user_id` | uuid not null, references `auth.users` on delete cascade | |
| `date_of_birth` | date not null | the only required field |
| `name` | text, null, length-capped | optional, always |
| `birth_order` | smallint not null default 1 | 1 for a singleton; 1 and 2 for twins |
| `is_primary` | boolean not null default true | which baby version one displays |
| `created_at` / `updated_at` | timestamptz not null | `set_updated_at` trigger |

Constraints: `date_of_birth` not in the future and not absurdly old (validated in a trigger, not a CHECK, because `now()` is not immutable); a partial unique index on `(user_id) where is_primary` so exactly one baby is primary.

### One table or multiple?

**Multiple — two.** A single combined table would either force one row per baby (duplicating journey state per twin) or one row per user (blocking multiples permanently). Splitting journey state from baby records costs one extra table now and removes the only genuinely hard migration later.

---

## First Year journey and baby profile relationship

`journeys` (pointer, lifecycle = `first_year`) → `first_year_journeys` (journey state, 1 per user) → `babies` (1..n per user).

Babies attach to the user, not to the journey row, so a second pregnancy later does not orphan the first child's record. Baby age is derived from `babies.date_of_birth`; the journey row never stores a duplicate copy of the date.

---

## Twins and multiples recommendation

- **Schema: multiples-ready from the start.** `babies` is already one row per baby with `birth_order` and `is_primary`. Nothing about version one blocks a second row.
- **UI: single baby only in version one.** Setup asks for one date of birth and one optional name. All reads use the primary baby.
- **Name stays optional, permanently.** Some parents will not name for weeks, and some will not want a name stored.
- **Date of birth is enough for the first build.** It yields age, month index, and the postpartum window — everything Phase 16.1B needs.
- **Later, for twins:** an "add another baby" action, a baby switcher on the First Year surface, per-baby memory keying, and a decision on shared versus per-baby milestones. Because twins usually share a date of birth, age derivation needs no change at all.

---

## Baby age derivation helper plan

New pure module `src/lib/firstYearDates.ts`, alongside `pregnancyDates.ts`, reusing `parseDateOnly` from `src/lib/dateOnly.ts` so calendar dates are never treated as UTC midnight.

Single entry point returning one object:

- `ageInDays`
- `ageInWeeks` — completed weeks
- `ageInMonths` — completed calendar months, not `days/30`
- `firstYearMonthIndex` — 0 for the first month through 11, clamped, mapping onto the existing month pages 0-12
- `isInFirstYear` — under 12 completed months
- `isEarlyPostpartum` — 0 to 12 completed weeks since birth
- `postpartumWeek` — 0-12, null once past the window

Pure, no Supabase, no `Date.now()` inside — the reference date is an injected parameter defaulting to today, as `buildCompanionContext` and `pregnancyDates` already do.

Unit tests at boundaries: day 0, day 6/7, week 11/12/13 for the postpartum edge, month-end arithmetic (born 31 January, reference 28 February), a leap-day birth, the 12-month boundary, and past-first-year clamping.

---

## First Year lifecycle plan

- **Use the existing `journeys.lifecycle`.** It already accepts `first_year`, and `PRIMARY KEY (user_id)` keeps the one-active-lifecycle rule intact.
- **Create the First Year journey only when the user enters a date of birth**, not automatically when pregnancy is marked given birth. Marking given birth is a status change that may happen days before the parent wants a new journey, and an auto-created empty journey would silently flip the active lifecycle away from pregnancy.
- **The pregnancy journey stays reachable and read-only.** When First Year is created, the pregnancy journey is snapshotted into `archived_journeys` with `ended_reason = 'transitioned'`, and `first_year_journeys.archived_pregnancy_journey_id` points at it. `/kept-chapter` remains the way back.
- **Archived pregnancy memories stay reachable** because `week_photos` and `week_media_memories` are keyed by `user_id` and pregnancy week, not by the journey pointer. Nothing needs migrating; `/kept-chapter` and the memory film keep reading them. First Year memories get their own table later rather than stretching the 1-42 week CHECK.
- A `save_first_year_journey(p_date_of_birth, p_name)` RPC, SECURITY INVOKER, advisory-locked on the user id, does the archive-then-create in one transaction — the same shape as `save_pregnancy_journey`.

---

## Pregnancy to First Year handover foundation

16.1 lays only the foundation the handover will need:

1. A place to store the date of birth (`babies`).
2. A place to record the journey and its link back (`first_year_journeys`).
3. An archive pointer so the pregnancy chapter is never lost.

The transition screen itself, the birth story handover, and the three companion choices are all Phase 16.2 or later. 16.1 must not write any of that content.

---

## Sensitive-state guard plan

A single shared predicate, `canEnterFirstYearSetup(status)`, used by every entry point:

| Pregnancy status | Behaviour |
| --- | --- |
| `given_birth` | Invited into First Year setup |
| `active` | No invitation. First Year remains public editorial only, reachable if browsed deliberately |
| `pregnancy_loss` | Never invited, never prompted, no baby-age copy anywhere |
| `no_longer_pregnant` | Never invited |
| `paused` | Never invited |

Enforced in the UI *and* server-side: the `save_first_year_journey` RPC rejects the call when the caller's `pregnancy_journeys.status` is one of the three sensitive values, so a stale client cannot create a baby record for a user in a loss state. Existing reveal-gate copy patterns in `KeptChapter` and `MyJourney` are the tone reference.

---

## Account export considerations

No export work in 16.1. Expected additions to `exportData` in a later phase:

- `first_year_journeys` — the single row
- `babies` — all rows including any additional babies

Both are plain row reads scoped by `user_id`, no signed URLs, matching the existing eight-then-sixteen table pattern. Baby name and date of birth are personal data and belong in the export; note them in the export's explanatory copy.

---

## AI companion continuity considerations

No AI change in 16.1. Direction for 16.5:

- Same companion identity (`profiles.companion_name`) and tone (`profiles.companion_tone`).
- Context extends `buildCompanionContext` with a lifecycle discriminator rather than a second builder, so the 500-character cap and the memory-blind test suite cover both chapters.
- The First Year context may contain: baby age in weeks or months, first-year month index, postpartum window flag, page hint, tone hint.
- It must never contain: pregnancy reflections, photos, videos, voice notes, birth plan notes, toolkit notes, postpartum notes, birth trauma content, mental health content, baby name, or exact date of birth. Follow the existing rule of day-and-month only, and prefer a coarse age band over any date at all.
- Extend `companionContext.test.ts` with the same forbidden-substring assertions for the First Year path.

---

## Companion memory consent considerations

**Defer. No consent table and no placeholder column in 16.1.**

Reasoning: an unused consent column invites a future half-implementation, and the consent model needs to record *which items* were approved, when, and by which choice — that is a table with its own rows, not a boolean. Adding it now would guess at its shape before the transition screen exists.

When it comes (16.2 for the choice, 16.6 for item-level memory), it should be its own table recording the choice (`continue_gently`, `personalise`, `decide_later`), the timestamp, and one row per approved item, with a full off switch and a delete action. Product copy uses "companion memory", "personal context", "what Cindy can use", "carry my pregnancy journey forward" — never machine learning or training language.

---

## Migration and RLS plan

One migration in 16.1B, in the required order for each new table:

1. `CREATE TYPE first_year_journey_status`.
2. `CREATE TABLE public.first_year_journeys` → `GRANT SELECT, INSERT, UPDATE, DELETE TO authenticated` and `GRANT ALL TO service_role`, **no anon grant** → `ENABLE ROW LEVEL SECURITY` → four policies scoped to `auth.uid() = user_id`.
3. `CREATE TABLE public.babies` → same grant block, no anon → RLS → four `auth.uid()` policies.
4. Partial unique index on `(user_id) where is_primary`; index on `babies(user_id)`.
5. `set_updated_at` triggers on both tables.
6. A validation trigger for `date_of_birth` bounds (trigger, not CHECK, because it depends on `now()`).
7. `save_first_year_journey` and `delete_active_journey` extension, both SECURITY INVOKER, `search_path` pinned, `EXECUTE` revoked from `PUBLIC` and `anon`, granted to `authenticated` and `service_role` — matching the existing journey RPCs.

No changes to `journeys`, `pregnancy_journeys`, `archived_journeys`, storage or existing policies.

---

## Likely files to change in build phase (16.1B)

- New migration
- `src/integrations/supabase/types.ts` (regenerated)
- `src/lib/firstYearDates.ts` (new, pure)
- `src/lib/firstYearDates.test.ts` (new)
- `src/lib/firstYearJourney.ts` (new — save, read, delete, mirroring `savedJourney.ts`)
- `src/lib/savedJourney.ts` (add the shared sensitive-state predicate only)

No route, page, component, sitemap, analytics or AI file changes in 16.1B.

---

## QA plan

- Unit tests for every age boundary listed above.
- RLS verification: a second user cannot read or write another user's `babies` or `first_year_journeys` row; `anon` is denied on both.
- RPC verification: creating a First Year journey while the pregnancy status is `pregnancy_loss`, `paused` or `no_longer_pregnant` is rejected server-side.
- Archive verification: after a handover, the pregnancy snapshot exists in `archived_journeys` with `ended_reason = 'transitioned'`, and `/kept-chapter` plus the memory film still render every pregnancy memory.
- Lifecycle verification: `journeys.lifecycle` flips to `first_year` and `getActivePregnancyJourney` correctly returns null afterwards without erroring.
- Full test suite, typecheck, lint and build.

---

## What should wait

First Year dashboard, postpartum surfaces, baby tracking (feeding, sleep, nappies), milestones, First Year memories, the transition screen, birth story handover, memory-aware AI, consent storage, export changes, analytics events, twin UI.

---

## Final recommendation

Build 16.1B as: two tables, one enum, one save RPC with a server-side sensitive-state guard, one archive-on-handover step, one pure date helper with boundary tests, and a small data-access module. Nothing user-visible ships. That is the smallest change that unblocks 16.2 onwards while leaving multiples, memory continuity and consent free to evolve.

**Risks and blockers**

- The one-active-lifecycle rule means creating First Year *ends* the active pregnancy journey. The archive step must be in the same transaction or a user could lose the pointer to their pregnancy chapter. This is the single highest-risk part of 16.1B.
- Sensitive-state routing is a trust risk, not just a UX one. The server-side guard is not optional.
- `week_photos` and `week_media_memories` are hard-capped at weeks 1-42. Any temptation to reuse them for baby months must be resisted; First Year memories need their own table.
- Calendar-month age arithmetic is a common source of off-by-one bugs. Injected reference dates and boundary tests are required, not nice-to-have.
