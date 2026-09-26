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
