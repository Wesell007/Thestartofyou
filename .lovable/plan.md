# Phase 41A — Final Evidence Reconciliation

Reporting only. No product, database, route, UI, AI or content changes. No deployment. Outcome D kept unless the evidence stops supporting it. Phase 41B not started.

## 1. Regression accounting (re-run each group separately)
- Run each group as its own test command and record the exact file paths, file count, test count, pass count, and whether it was already run earlier in 41A or is new here:
  - Pregnancy: `pregnancySetupRoute`, `journalPregnancyWeekParity`, `pregnancyAiContext`, plus any other pregnancy setup/week tests found by filename search.
  - First Year: tests under `src/components/firstyear/**`, `firstYearPendingSetup`, `firstYearCompanionContext`, and First Year phase tests found by search.
  - Lifecycle / journey: `navLifecycle`, `journeyPersonalResolution`, `journeyStateSignal`, `journeyContextFreshness`, `startYourJourney`.
  - Companion context: `companionJourneyContext`, `companionRequestFoundation`, `companionContext`, `journeySuggestionFreshness`.
  - Journal context: `journalEntrySelection`, `journalSearchRouting`, `journalPermissionUi`, `journalEntryTransparency`, `journalEntryCta`.
  - Focused: `src/test/phase41aMultiplesReadinessAudit.test.ts`.
- Run each group with the JSON reporter. Deduplicate tests by identity (repository file path + full suite and test name), never by subtracting file counts. Report raw group test executions, unique test identities, and unique files.
- The earlier combined run (13 files / 112 tests) is recorded as "previously run". Group files added beyond that set are recorded as "newly run".
- If anything fails, report the failure and fix nothing.

## 2. Fill counts not yet measured (read-only)
- Data objects audited: count every table in the ownership matrix. Classify each as multi-pregnancy-safe, multi-child-safe, or ambiguous ownership.
- Content: headline unit is the rendered page (each pregnancy week page, trimester page and pregnancy topic page generated from the data). Fall back to source data record, or to file, only if page-level counting is impossible, and state the unit used. Never mix units in one total. Report files searched, pages assessed, pages that assume one baby, copy-only plurality issues, medical/source-review issues, and a separate neutral category if needed. Copy-only + medical + neutral must add up to the pages that assume one baby.

## 3. Risk register reconciliation
Reclassify the 10 findings into P0 data integrity, P1 safety or wrong context, P2 functional limitation, P3 UX or copy limitation, and existing safeguards. Keep the two Companion safeguards outside the active-risk total. Check that the numbers add up: active = P0+P1+P2+P3, then active + safeguards = total. Do not raise any severity to make the numbers work.

## 4. Exact architecture wording
Replace the plain-language summaries with facts proven by the evidence, each labelled with its source:
- `pregnancy_journeys` primary key `user_id`. `save_pregnancy_journey` upserts on `user_id` and updates only `lmp_date` and `due_date`. `journeys` primary key `user_id` allows one active lifecycle. A later pregnancy cannot exist as a separate episode.
- `save_first_year_journey` runs an explicit `DELETE FROM babies WHERE user_id`. Deleting a baby then removes its `first_year_entries` and `first_year_care_events` automatically. `first_year_memories.baby_id` and `first_year_reminders` behave as their foreign keys define; the reminders rule is read from the live structure before it is stated.
- Label each fact as defined in the repository, confirmed in the live database structure, or both.

## 5. Production evidence
Keep the three evidence labels. Mark whether ended pregnancies are saved as past chapters, and what `/my-week` shows after a pregnancy ends, as UNVERIFIED RUNTIME BEHAVIOUR.

## 6. Deliverables
- Add a "Final evidence reconciliation" section to the four Phase 41A documents. Change only the risk register and handoff totals where the new classification requires it.
- Update only the Phase 41A roadmap entry.
- Return the full section 24 report field by field, then the closure wording with Outcome D, only if every total adds up. Otherwise report BLOCKED and name the gate that failed.
