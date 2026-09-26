# Phase 41A — Pregnancy Multiples & Multi-Child Readiness Audit

Audit only. No product, schema, RLS, route, UI, AI or content changes. Deployment: NO.

## Evidence labels
- REPOSITORY-DEFINES: stated in repository files (migrations, generated types, modules).
- VERIFIED-PRODUCTION: confirmed by read-only catalog queries run in this phase against the live backend (`pg_constraint`, `pg_index`, `pg_proc` source only). No customer rows were read.
- PRODUCTION-NOT-VERIFIED: anything else.

Structure queries actually executed (2026-09-26):
- Q1: constraints (p/u/c/f) for `pregnancy_journeys`, `babies`, `journeys`, `first_year_journeys`, `archived_journeys`, `reflections`, `saved_journeys`, `first_year_entries`, `first_year_memories`, `first_year_care_events`, `first_year_reminders`, plus indexes on `babies`.
- Q2: function source of `save_pregnancy_journey`, `save_first_year_journey`, `delete_active_journey`, `validate_baby_date_of_birth`.

## 1. Pregnancy entry points (route file: `src/App.tsx`)
| Candidate | Result | Evidence |
|---|---|---|
| `/due-date-calculator` | EXISTS (public calculator; hands off to results, does not save) | App.tsx line 249; `src/pages/DueDateCalculator.tsx` |
| `/due-date-results` | EXISTS (result page; save path via pending journey) | App.tsx line 250 |
| `/setup` | EXISTS (chooser) | App.tsx line 400 |
| `/setup/pregnancy` | EXISTS | App.tsx line 402; `src/pages/setup/PregnancySetup.tsx` |
| `/start-your-journey` | EXISTS (routes pregnancy-committed users to `/setup/pregnancy`) | App.tsx line 231; `src/test/pregnancySetupRoute.test.ts` |
| `/ivf-timeline` | EXISTS (IVF result, TTC treatment context, not a pregnancy save) | App.tsx line 289 |

Confirmed pregnancy save paths: 2 (`/setup/pregnancy` and the results/pending-journey handoff), both ending in `save_pregnancy_journey(p_lmp_date, p_due_date)`.

Stored pregnancy fields (VERIFIED-PRODUCTION, generated types `src/integrations/supabase/types.ts` line 827): `user_id, lmp_date, due_date, status, status_changed_at, outcome_date, started_at, updated_at`. Pregnancy plurality field (baby count, multiples): **none**.

## 2. Multiples model
- Pregnancy: singleton only. No field or flow records twins or more. Week and due-date logic is single-LMP.
- Content: the word "twin" appears in `src/data/weekData.ts`, `trimesterData.ts`, `pregnancyTopicData.ts`, `weeklyArticleSuggestions.ts` and week 22/23 pages as editorial mentions, not personalisation. "your baby" singular phrasing is pervasive (e.g. 186 matches of "baby" in `weekData.ts`, 52 in `pregnancyTopicData.ts`). Recorded, not remediated.
- Safety/medical difference for multiples (earlier delivery, extra monitoring) cannot currently be reflected in saved context because plurality is not stored.

## 3. First Year multi-baby model (measured, not assumed)
- Maximum 4, enforced in three layers:
  - Database CHECK `birth_order between 1 and 4` (VERIFIED-PRODUCTION Q1; REPOSITORY-DEFINES `supabase/migrations/20260804110355_*.sql`).
  - `save_first_year_journey` rejects fewer than 1 or more than 4 babies (VERIFIED-PRODUCTION Q2).
  - UI `MAX_BABIES = 4` in `src/components/firstyear/setup/firstYearSetupSchema.ts`.
- One shared date of birth per setup (UI draft has one `dateOfBirth`); the database accepts per-baby dates.
- Primary baby: unique partial index `babies_one_primary_per_user_idx ON babies(user_id) WHERE is_primary` and unique `(user_id, birth_order)` (VERIFIED-PRODUCTION Q1).
- Per-baby records: `first_year_entries` (baby lane requires `baby_id`), `first_year_care_events` (`baby_id` NOT NULL), `first_year_memories` (`family` / `baby` / `all_babies` scope), `first_year_reminders` (optional `baby_id`). All VERIFIED-PRODUCTION.

Verdict: First Year correctly models up to four simultaneous babies from one birth. It cannot model a second set of babies from a later pregnancy alongside the first.

## 4. Pregnancy to First Year transition
- `save_first_year_journey` refuses to move a pregnancy with status `pregnancy_loss`, `paused` or `no_longer_pregnant`, archives the active pregnancy into `archived_journeys` (`ended_reason = 'transitioned'`, snapshot of dates and status), then **deletes every existing baby row for the user** and inserts the new set (VERIFIED-PRODUCTION Q2).
- Link from baby to pregnancy: none on `babies`. `first_year_journeys.archived_pregnancy_journey_id` links one First Year journey to one archived pregnancy (VERIFIED-PRODUCTION Q1).

## 5. Ended pregnancy without a First Year journey
- End/archive: status enum supports `pregnancy_loss`, `no_longer_pregnant`, `paused`; `delete_active_journey('pregnancy')` deletes the `pregnancy_journeys` and pregnancy `saved_journeys` rows (VERIFIED-PRODUCTION Q2). Whether the status path also writes `archived_journeys`: PRODUCTION-NOT-VERIFIED.
- Reminders: there is no pregnancy reminder table (only `first_year_reminders`), so no pregnancy reminder can continue. Week-screen behaviour after a non-active status: PRODUCTION-NOT-VERIFIED (not browser-tested in this phase).
- Companion: `src/lib/companion/journeyPersonalSource.ts` returns no pregnancy context unless status is `active` (lines 36 to 48). The ended pregnancy is not treated as active.
- Later pregnancy: `save_pregnancy_journey` upserts on `user_id` and updates only `lmp_date` and `due_date`. It does **not** reset `status`, `status_changed_at` or `outcome_date` and does not archive the previous row (VERIFIED-PRODUCTION Q2). A new pregnancy saved over an ended one keeps the old status until something else changes it.
- Previous records: `reflections` is unique on `(user_id, week)` with no pregnancy key (VERIFIED-PRODUCTION Q1); `week_photos`, `week_media_memories` and all toolkit tables carry only `user_id`. Records from an earlier pregnancy are not distinguishable from a later one.

## 6. Second pregnancy / multiple children at different stages
- `journeys` primary key `user_id`: exactly one active lifecycle per person (VERIFIED-PRODUCTION Q1).
- `pregnancy_journeys` primary key `user_id`: one pregnancy row per person, ever current.
- `save_pregnancy_journey` sets lifecycle to `pregnancy` from any lifecycle without archiving an active First Year journey; babies remain but First Year is no longer the active lifecycle.
- Starting First Year again replaces all babies (section 4), so an older child's First Year records lose their baby (entries and care events cascade delete; memories set `baby_id` null).
- Pregnancy while already parenting a toddler: not representable as two concurrent contexts.

## 7. Drift noted
`journeys` CHECK still allows `ttc, ivf, pregnancy, postpartum, first_year` (VERIFIED-PRODUCTION Q1; REPOSITORY-DEFINES `supabase/migrations/20260424105940_*.sql`). Save functions only write the three saved lifecycles; the wider CHECK is legacy drift, not a live IVF lifecycle. Recorded only.

## 8. Counts
- Entry-point candidates 6: EXISTS 6, REDIRECT 0, LEGACY 0, NOT FOUND 0, CATCH-ALL ONLY 0.
- Contamination/integrity risks: see register (10 entries).
- Remediation tasks: see handoff (12 tasks).

## 9. Outcome
**OUTCOME D — CURRENT ARCHITECTURE HAS DATA-INTEGRITY / SAFETY RISKS THAT SHOULD BE RESOLVED BEFORE FURTHER CONTINUITY WORK.**

Chosen on correctness: reachable paths today let a second pregnancy inherit the previous pregnancy's status, reflections, week photos and toolkit records, and let a new First Year setup delete an earlier child's babies and cascade their records. Multi-child support additionally requires a domain-model rework (Outcome C scope), but the reachable integrity risks come first.

## Final evidence reconciliation (supersedes conflicting wording above)

Live structure queries: Q1 and Q2 as above; Q3 (2026-09-26) primary/unique keys on `pregnancy_journeys`, `journeys`, `first_year_journeys` and every foreign key from First Year tables to `babies`. Catalog only; no customer rows.

| Claim | Result | Measured fact | Evidence |
|---|---|---|---|
| `pregnancy_journeys` key | VERIFIED | `PRIMARY KEY (user_id)` | REPOSITORY-DEFINES `20260720120000_atomic_journey_lifecycle.sql` lineage; VERIFIED-PRODUCTION Q3 |
| `save_pregnancy_journey` conflict/updates | VERIFIED | `on conflict (user_id) do update set lmp_date, due_date, updated_at`; status, status_changed_at, outcome_date untouched | REPOSITORY-DEFINES latest `20260803231512_*.sql`; VERIFIED-PRODUCTION Q2 |
| `journeys` active lifecycle | VERIFIED | `PRIMARY KEY (user_id)`: one lifecycle row per person | REPOSITORY-DEFINES `20260424105940_*.sql`; VERIFIED-PRODUCTION Q3 |
| `save_first_year_journey` deletion | VERIFIED | explicit `DELETE FROM public.babies WHERE user_id = v_user_id` before insert | REPOSITORY-DEFINES `20260804110355_*.sql`; VERIFIED-PRODUCTION Q2 |
| `first_year_entries.baby_id` | VERIFIED | `ON DELETE CASCADE` | REPOSITORY-DEFINES `20260806202830_*.sql`; VERIFIED-PRODUCTION Q3 |
| `first_year_care_events.baby_id` | MEASURED | `NOT NULL`, `ON DELETE CASCADE` | REPOSITORY-DEFINES `20260818161415_*.sql`; VERIFIED-PRODUCTION Q3 |
| `first_year_memories.baby_id` | CORRECTED | `ON DELETE SET NULL`, but CHECK requires `baby_id` when scope is `baby`; outcome of deleting such a baby is a schema conflict, runtime untested | REPOSITORY-DEFINES `20260810130036_*.sql`; VERIFIED-PRODUCTION Q1, Q3 |
| `first_year_reminders.baby_id` | MEASURED | `ON DELETE CASCADE` | REPOSITORY-DEFINES `20260819193611_*.sql`; VERIFIED-PRODUCTION Q3 |

Analysis (not runtime-tested): with one `pregnancy_journeys` row per person that a new save updates in place, a later pregnancy cannot be stored as a separate episode alongside an earlier one.

UNVERIFIED RUNTIME BEHAVIOUR: whether an ended pregnancy is persisted as a past chapter; what `/my-week` renders after a pregnancy ends; whether First Year setup fails when baby-scoped memories exist.

Content count (unit: rendered page). Files searched 3 (`src/data/weekData.ts`, `trimesterData.ts`, `pregnancyTopicData.ts`). Pages assessed 51 (42 week pages, 3 trimester pages, 6 live topic pages). Singleton-assumption pages 37 (page text matches "your baby", "baby's", "baby is" or "the baby"); 14 do not. Medical/source-review 37 (singleton pages that also state size, weight, growth, movement, scan or labour information, which differs for multiples); copy-only 0; 37 = 37 + 0. Method is a text-pattern heuristic, not an editorial review.

Data objects audited 24: multi-pregnancy-safe 1 (`archived_journeys`); per-child keyed 5 (`babies`, `first_year_entries`, `first_year_care_events`, `first_year_memories`, `first_year_reminders`), but replaced by First Year setup; ambiguous ownership 14 (reflections, week photos, week media, 8 toolkit tables, 3 companion tables); singleton by design 4 (`pregnancy_journeys`, `saved_journeys`, `journeys`, `first_year_journeys`). 1 + 5 + 14 + 4 = 24.

Outcome D retained: the verified facts still show reachable data-integrity risks (P0 4).
