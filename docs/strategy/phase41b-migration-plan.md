# Phase 41B.0 — Migration Plan

> **Historical 41B.0 text (CLOSED PASS, 2026-09-26).** Passages marked `SUPERSEDED BY 41B.0-R` below are governed by `docs/strategy/phase41b0r-family-entity-architecture-reconciliation.md` (its §22 lists each one). The original wording is preserved; nothing below has been rewritten.

Design only. Migration files created: 0.

## 1. Ownership change per audited object (24)

### Tables requiring a pregnancy episode link = 11
reflections, week_photos, week_media_memories, pregnancy_appointments, pregnancy_symptom_notes, baby_movement_notes, birth_plans, hospital_bag_items, midwife_questions, contraction_sessions, contraction_events.
Each gains nullable `pregnancy_episode_id` with composite FK `(pregnancy_episode_id, user_id)` to the episode, so a row can only point at the owner's own episode.

### Tables requiring baby_id changes = 5
| Table | Change |
|---|---|
| babies | add `pregnancy_episode_id` (composite FK `(pregnancy_episode_id, user_id)`), `archived_at`, UNIQUE `(id, user_id)` |
| first_year_entries | single-column `baby_id` FK (CASCADE) replaced by composite `(baby_id, user_id)` FK, RESTRICT |
| first_year_care_events | single-column `baby_id` FK (CASCADE) replaced by composite `(baby_id, user_id)` FK, RESTRICT |
| first_year_reminders | single-column `baby_id` FK (CASCADE) replaced by composite `(baby_id, user_id)` FK, RESTRICT |
| first_year_memories | single-column `baby_id` FK (SET NULL) replaced by composite `(baby_id, user_id)` FK, RESTRICT |

### Structural context changes = 2
pregnancy_journeys (becomes compatibility mirror, then retired), journeys (gains `active_pregnancy_episode_id` with composite FK `(active_pregnancy_episode_id, user_id)`).

Episode composite ownership links = 13 (the 11 tables above, `babies`, `journeys`); see RLS plan section 2.

### Tables requiring no ownership change = 6
archived_journeys (kept as history), saved_journeys (legacy, frozen, read-only fallback), first_year_journeys (user-level First Year status), companion_conversations, companion_messages, companion_memories (user-level by design; context is resolved per request; memory stays off).

11 + 5 + 2 + 6 = 24.

## 2. Backfills

> **SUPERSEDED BY 41B.0-R** §4, §5 — deterministic backfill 1 and derivable backfill 1 are not independent: one historic pregnancy is identified by `(user_id, lmp_date)` and yields at most one episode; the full legacy-state table and the `family_entity_backfill_log` audit table govern 41B.1B.

### Deterministic = 3
1. Each `pregnancy_journeys` row to one episode (same dates, status, outcome, `started_at`).
2. `journeys.active_pregnancy_episode_id` for users whose `lifecycle = 'pregnancy'`: the episode from step 1.
3. `contraction_events.pregnancy_episode_id` copied from its session, only where the session is bound.

### High-confidence derivable = 2
1. `archived_journeys` rows with `lifecycle = 'pregnancy'` to ended episodes, dates and reason read from the snapshot. Skipped (left as archive only) if the snapshot lacks `lmp_date`.
2. `babies.pregnancy_episode_id` from `first_year_journeys.archived_pregnancy_journey_id` to the episode created from that archive row, only when that link exists and is unique.

### Ambiguous, do not auto-assign = 10
reflections, week_photos, week_media_memories, pregnancy_appointments, pregnancy_symptom_notes, baby_movement_notes, birth_plans, hospital_bag_items, midwife_questions, contraction_sessions.
Reason: F2 means an earlier pregnancy may have been overwritten in place while keeping the old `started_at`, so neither dates nor "only one episode" prove which pregnancy a legacy row belongs to. Legacy rows stay `pregnancy_episode_id is null` (explicit unbound state). The person can later confirm a link themselves (a user action, then deterministic).

3 + 2 + 10 = 15 backfill decisions. Babies with no derivable link stay unbound.

## 3. First Year destructive setup replacement
Replace `DELETE FROM babies WHERE user_id` (F4) with, in one transaction:
1. End the active episode if moving from pregnancy.
2. Set `archived_at = now()` on the current cohort only if the person is starting a new, separate First Year; editing the same cohort updates rows by id.
3. Insert new babies with `pregnancy_episode_id` of the episode just ended (when there is one).
4. Update `first_year_journeys` and `journeys`.
No baby row is deleted, so entries, care events, reminders and memories are untouched.

## 4. Memory FK and invariant
Change `first_year_memories.baby_id` to `ON DELETE RESTRICT`. A deliberate baby deletion goes through one function that first asks the person to delete the baby's memories or convert them to `family` scope, then deletes. The CHECK stays. This removes the SET NULL versus CHECK interaction without claiming what it does today.

## 5. Migration order

> **SUPERSEDED BY 41B.0-R** §18 — the nine-step order is replaced by the corrected subphases 41B.1A / 1A-C1 / 1B / 1C (five internal steps) / 1D; the reflections split and the other four unique-key splits move from tightening (step 8) to 41B.1C step 3.
1. Create `pregnancy_episodes` with grants, RLS, constraints. No reads change.
2. Deterministic and derivable backfills (section 2), run once, idempotent, row counts logged (counts only, no content).
3. Add nullable episode columns and `babies` columns; composite FKs `NOT VALID`, then validate.
4. Compatibility reads: `pregnancy_journeys` kept in sync from the active episode by the save functions.
5. Migrate write paths (functions, then client) to write episode ids.
6. Migrate context resolver to the active episode pointer.
7. Verify (test plan).
8. Tighten: FK RESTRICT changes, reflections unique split, pointer check, only after data checks pass.
9. Later: retire `pregnancy_journeys` writes and the legacy `saved_journeys` fallback.

## 6. Compatibility
- Old reads of `pregnancy_journeys` keep working through step 8 because the functions mirror the active episode into it.
- Unbound legacy pregnancy rows: shown only with the current active episode and labelled as notes from before pregnancies were kept separately, until the person confirms or hides them. Never shown for a different, later episode after confirmation, and never sent to the Companion.

> **SUPERSEDED BY 41B.0-R** §7 — unbound rows stay readable under the bounded compatibility rule (one episode: shown in that chapter, any status; two or more: a separate "earlier notes" area), until confirmed or hidden by the person.
- Clients that do not yet send an episode id: the save functions fill in the active episode server-side; if there is no active episode the write is rejected rather than guessed.

## 7. Client write paths to migrate = 17

> **SUPERSEDED BY 41B.0-R** §10 — replaced by `phase41b0r-write-path-inventory.md` (74 paths; three listed files do not write; storage writes and the status update were missing).
`src/lib/savedJourney.ts`, `src/lib/firstYearJourney.ts`, `src/lib/useLifecycle.ts`, `src/lib/authIntent.ts`, `src/hooks/usePublicAccountLink.ts`, `src/pages/Setup.tsx`, `src/pages/setup/FirstYearSetup.tsx`, `src/components/myweek/SlotReflection.tsx`, `src/components/myweek/SlotPhotoMemory.tsx`, `src/components/myweek/SectionKeepThisWeek.tsx`, `src/hooks/usePregnancyAppointments.ts`, `src/hooks/usePregnancySymptomNotes.ts`, `src/hooks/useBabyMovementNotes.ts`, `src/hooks/useBirthPlan.ts`, `src/hooks/useHospitalBag.ts`, `src/hooks/useMidwifeQuestions.ts`, `src/hooks/useContractionTimer.ts`.
Read-side files to review (not write paths): `MyJourney.tsx`, `KeptChapter.tsx`, `MyPregnancyChapter.tsx`, `SlotCompanionRecall.tsx`, `AccountSettings.tsx`, `journeyPersonalSource.ts`.
