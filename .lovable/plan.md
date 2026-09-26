# Phase 41A closure, then Phase 41B.0 design

Two briefs, done in order. Documentation only throughout: no test reruns for 41A, no product code, no database changes, no data changes, no deployment, no 41B.1.

## Part 1 — Phase 41A: accept measured reconciliation and close
1. Audit doc final reconciliation: replace provisional 28 files / 218 tests and the "FAILED" gate wording with the authoritative 30 unique files / 249 unique tests / 249 PASS (Pregnancy 4/27, First Year 11/99, Lifecycle 5/46, Companion 4/38, Journal 5/33, Focused 1/6; 0 duplicates; typecheck PASS). The measured set supersedes the earlier figures.
2. Ownership kept: 24 objects; multi-pregnancy-safe 1, multi-child-safe 5, ambiguous 15, other scope 4; overlap explained (`first_year_reminders`).
3. Memory delete interaction kept as UNVERIFIED RUNTIME BEHAVIOUR; Outcome D does not depend on it.
4. Roadmap: 41A test line updated to 249, BLOCKED removed, entry closed with Outcome D.
5. Preserved: 10 findings, 8 active (P0 4, P1 1, P2 3, P3 0), 2 safeguards, 12 tasks (9 / 2 / 1), Outcome D.
6. Return the supplied closure wording.

## Part 2 — Phase 41B.0: family entity architecture and migration design
Add a 41B.0 roadmap entry. Read the four 41A docs and re-check the relevant migrations, types, save functions and client write paths (read-only; live catalog queries only, no customer rows) so every current-state claim is sourced.

Write five design documents covering brief sections 3 to 24:
- `docs/strategy/phase41b-family-entity-target-model.md`: user, pregnancy episode (own id, status, outcome, plurality), child linked to its pregnancy, family-scoped data, multiples semantics, pregnancy loss and ended-journey safety, delete vs archive.
- `docs/strategy/phase41b-migration-plan.md`: which tables gain `pregnancy_id`, which `baby_id` changes, which need no change; deterministic vs ambiguous backfills; replacing the delete-all-babies First Year setup; memory SET NULL vs CHECK fix; the nine-step migration order; compatibility reads.
- `docs/strategy/phase41b-context-contract.md`: current-context pointer, transition state machine, resolution contract, Companion boundary (no behaviour change).
- `docs/strategy/phase41b-rls-and-integrity-plan.md`: RLS per new/changed table scoped by `auth.uid()`, constraints to add/change, transactional save functions to replace.
- `docs/strategy/phase41b-test-and-rollback-plan.md`: 41B.1 test plan, rollback per migration step, backup and production preconditions, query/index review.

Final safeguards applied to Part 2:
- Part 1 is finished and confirmed closed (Outcome D) before Part 2 starts; the closed 41A docs are the baseline.
- Every important current-state claim cites its migration, generated type, function, client write path and policy source, labelled REPOSITORY-DEFINES, VERIFIED-PRODUCTION-STRUCTURE or DESIGN INFERENCE. No customer rows read.
- Names like `pregnancy_id` stay conceptual; propose the smallest durable model; no household entity unless a real requirement justifies it.
- Each backfill is marked DETERMINISTIC, HIGH-CONFIDENCE DERIVABLE, or AMBIGUOUS — DO NOT AUTO-ASSIGN; unbound legacy state is kept rather than guessed.
- History kept by default: transitions create, update status, select context, archive; any hard delete of a pregnancy or child is explicitly justified.
- Context rule: no personal context is safer than wrong context; the resolver never guesses between several pregnancies or children.

Then return every Section 26 field with exact counts traceable to the documents (risks addressed out of 4 / 1 / 3, unresolved risks), plus: product, database, migration file, RLS, customer data read, Companion, memory and grounding changes all 0; deployment NO; 41B.1 NOT STARTED. READY FOR 41B.1 is returned only if every item in the readiness bar is covered; otherwise DESIGN BLOCKED with the missing decision named. The supplied closure wording is used only if the design is complete.
