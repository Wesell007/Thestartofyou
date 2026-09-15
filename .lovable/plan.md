# Phase 34G — Final shared-database closure reconciliation (documentation only)

Scope: documentation corrections only. No source-code changes, no schema changes, no new migration, no feature activation, no deployment. Phase 34H not started.

## 1. Correct the deployment record

`docs/content/phase34g-ivf-timeline-persistence-foundation.md`

- Update the header state line to:
  `CLOSED PASS / FEATURE OFF / SHARED-DATABASE MIGRATION APPLIED / PRIVACY & LEGAL APPROVAL REQUIRED BEFORE ACTIVATION`
- Add a "Deployment record" section stating that the application has no separate preview and production databases: the database used by the preview also serves the published application, therefore the Phase 34G schema migration has already been applied to the shared production-serving database.
- State separately, in the same section:
  - Application code published/deployed = NO
  - Feature flag enabled = NO
  - Save UI visible = NO
  - IVF persistence available to visitors = NO
  - IVF transfer values stored = 0
  - Existing records changed by migration = 0
  - Existing data backfilled = NO
  - RLS/access policies changed = NO

`docs/content/phase34g-ivf-timeline-persistence-evidence.md` — "Deployment state" section

- Add the explicit line `Shared production-serving database migration applied = YES` alongside the existing prose (which already explains the single shared instance), keeping `Application deployed = NO`, `Feature flag enabled = NO`.

`roadmap.md` — Phase 34G checklist and open blockers

- Mandatory correction: remove every unqualified `nothing deployed` statement. The global Phase 33 note becomes: `Global Phase 33 deployment block remains ACTIVE; no application code deployed or published (the shared production-serving database already includes the additive Phase 34G schema migration)`.
- Replace the Phase 34G final item with: `Shared production-serving database migration applied = YES; application code deployed/published = NO; feature remains OFF; privacy and legal approval remain required before activation.`
- Update the Phase 34G roadmap heading to `CLOSED PASS / FEATURE OFF / SHARED-DATABASE MIGRATION APPLIED`.
- The audit record explicitly distinguishes three facts: DATABASE SCHEMA CHANGE (applied), APPLICATION DEPLOYMENT (no application code deployed or published), FEATURE ACTIVATION (feature OFF).

## 2. Explain why live product behaviour is unchanged

In the foundation document's new "Deployment record" section (and mirrored briefly in the evidence document), document that the migration is additive only:

- 2 nullable columns added, no defaults, no backfill, no data rewrite
- paired-state CHECK constraint added
- no policy changes
- feature remains OFF, save UI is not deployed, calculator does not write IVF values

Conclusion recorded: database schema changed = YES; visitor-facing application behaviour changed = NO; health-treatment values collected automatically = NO.

## 3. Record the constraint defect and fix

`docs/content/phase34g-ivf-timeline-persistence-evidence.md` — "Database" section

- Align the defect wording with the agreed statement: the initial paired-state CHECK expression could evaluate to SQL UNKNOWN for a partial state, and CHECK constraints treat TRUE or UNKNOWN as passing, so a partial state would have been accepted. The final shipped constraint was corrected with the explicit `IS NOT NULL` guard.
- Extend the truth table to cover the full agreed set explicitly:

| ivf_transfer_date | ivf_transfer_type | result |
| --- | --- | --- |
| NULL | NULL | PASS |
| DATE | `3day` | PASS |
| DATE | `5day` | PASS |
| DATE | NULL | REJECT |
| NULL | `3day` | REJECT |
| NULL | `5day` | REJECT |

- Keep the existing extra row for the invalid value (`DATE` / `day5` = REJECT) and the closing line `Partial IVF context accepted = NO`.
- Mirror the defect-and-fix summary in the foundation document's constraint section (it already describes the NULL-satisfaction issue; align wording with the SQL UNKNOWN statement above).

## 4. Final authoritative Phase 34G counts

Add a "Final authoritative counts" section to the foundation document, listing exactly the agreed values: TTC persistence owner `public.ttc_journeys`; IVF fields added = 2; transfer date type = DATE; transfer type values = `3day` / `5day`; fields nullable = YES; paired-field constraint = YES; partial IVF context accepted = NO; existing records backfilled = NO; existing records modified by migration = 0; explicit load/save/clear helpers = YES; matched-row verification = YES; zero-row save/clear reported as success = NO; save/clear without TTC journey = `no_ttc_journey`; journey row count changed by IVF persistence = NO; ordinary TTC save preserves IVF context = YES; historical IVF context expires = NO; derived milestones persisted = 0; feature flag enabled = NO; save UI visible = NO; calculator-triggered persistence writes = 0; new IVF lifecycle = 0; saved lifecycles = ttc / pregnancy / first_year; existing access policies changed = NO; cross-user access = DENIED BY DESIGN / NOT FULLY TESTABLE; sensitive URL parameters generated = 0; companion access = NO; AI runtime changes = 0; grounding changes = 0; privacy/legal approval completed = NO; privacy/legal approval required before activation = YES; shared production-serving database migration applied = YES; application code deployed = NO; feature activated = NO.

## 5. Validation record

Preserve unchanged in the evidence document: focused Phase 34G tests = PASS (24); full suite = 127 files / 1,463 tests PASS; typecheck x2 = PASS; lint = baseline only / 1 pre-existing generated-file error; production build = PASS; responsive QA = 1280 / 834 / 390 PASS; Save / Update / Clear controls visible = 0.

## 6. Closure lock

Update the closure wording in the foundation document (and the roadmap Phase 34G heading if needed) to:

`PHASE 34G — IVF TIMELINE PERSISTENCE FOUNDATION CLOSED PASS / FEATURE OFF / SHARED-DATABASE MIGRATION APPLIED / PRIVACY & LEGAL APPROVAL REQUIRED BEFORE ACTIVATION`

Phase 34H remains recommended but NOT started.

## Files touched

- `docs/content/phase34g-ivf-timeline-persistence-foundation.md`
- `docs/content/phase34g-ivf-timeline-persistence-evidence.md`
- `roadmap.md`

No other files. No code, schema, migration, analytics, AI or deployment changes.
