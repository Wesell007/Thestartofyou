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

## 4. Exact architecture wording (claims to verify, not wording to keep)
Each statement below is a claim. For each one: inspect the exact repository source (migration filename, generated types) and, where possible, the live structure (read-only catalog query only). Record the exact source, mark VERIFIED if it matches, and replace the statement with the measured fact if any detail differs. Label each fact REPOSITORY-DEFINES, VERIFIED-PRODUCTION, or both; if the live structure was not checked for that fact, label it PRODUCTION-NOT-VERIFIED. Never infer runtime behaviour from schema alone, and never adjust evidence to keep Outcome D.
- `pregnancy_journeys` key/uniqueness (claimed: primary key `user_id`).
- `save_pregnancy_journey` conflict target and updated columns (claimed: `on conflict (user_id)`, updates `lmp_date`, `due_date`, `updated_at` only).
- `journeys` active-lifecycle constraint (claimed: primary key `user_id`).
- `save_first_year_journey` deletion behaviour (claimed: explicit `DELETE FROM babies WHERE user_id`).
- `first_year_entries.baby_id` delete rule (claimed: cascade).
- `first_year_care_events.baby_id` delete rule (not yet read; to measure).
- `first_year_memories.baby_id` delete rule (claimed: set null).
- `first_year_reminders.baby_id` delete rule (not yet read; to measure).
- Whether a later pregnancy can exist as a separate episode is stated only as a consequence of the verified facts above, labelled as analysis rather than runtime-tested.

## 5. Production evidence
Keep the three evidence labels. Mark whether ended pregnancies are saved as past chapters, and what `/my-week` shows after a pregnancy ends, as UNVERIFIED RUNTIME BEHAVIOUR.

## 6. Deliverables
- Add a "Final evidence reconciliation" section to the four Phase 41A documents. Change only the risk register and handoff totals where the new classification requires it.
- Update only the Phase 41A roadmap entry.
- Return the full section 24 report field by field, then the closure wording with Outcome D, only if every total adds up. Otherwise report BLOCKED and name the gate that failed.
