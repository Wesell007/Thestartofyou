# Phase 29J — Explicit Saved-Memory MVP Pre-Build Gate

Review and planning only. No migrations, tables, RLS, edge functions, memory reads or writes, no companion or AI wiring, no implementation of any kind. The deliverable is documentation that makes a future build reviewable before a single line of it is written.

## What this phase produces

A new readiness document plus three governance updates, all derived from the existing 29G, 29H and 29I designs. Scope is not widened anywhere: the MVP stays inside category A preferences and category C explicit user-saved preferences, and category F stays structurally unstorable.

## 1. New document: `docs/ai/memory-mvp-readiness.md`

Sections, in order:

**Gate review.** A table walking every item of the memory gate in `release-gate.md` with a status of complete, partial or blocked, and a named owner action for anything not complete. Covering: privacy and legal review, approved consent copy and recorded consent version, approved sensitivity taxonomy, schema design, RLS design, deletion behaviour, export behaviour, audit logging approach, sensitive-content blocker, memory eval scenarios, memory-off kill switch, rollback plan, synthetic-only testing, no real user data in testing, and the separate migration review requirement.

From the current docs, the design-side items (taxonomy, schema, RLS, deletion, pause, expiry, audit shape, blocker, kill switch concept, rollback, synthetic testing rule) are already written down; the outstanding items are the human ones — recorded legal and privacy sign-off, signed-off consent copy with a version string, memory eval rows that exist only as prose today, and the separate migration review that by definition cannot happen before a migration is drafted. The document states each of those plainly rather than marking the gate green.

**MVP definition.** The narrowest slice: user-visible saved items only, written only from an explicit user action, no extraction, no inference, no chat history, no journal, no sensitive content, no category F, flag off by default, and memory not passed into any AI call until separately approved. Allowed examples: shorter answers, practical next steps, gentle reminders. An explicit excluded-content list mirroring the request.

**Feature flag plan.** Default off, internal-only first, no public exposure until the gate passes, rollback without a migration, no memory UI write path unless the flag is on, and a second independent switch for AI context use so storage and use can never be enabled by one action.

**Migration-readiness checklist.** Table names, enum names, constraints, triggers, RLS policies, grants, indexes, account-deletion wiring, audit log rules, sensitive blocker, consent version and rollback — carried from `memory-schema-rls-design.md` as a checklist to tick during a future migration phase, not as SQL to run.

**UI-readiness checklist.** What must change in the Phase 29I prototype before it becomes real: remove prototype-only labels and synthetic items, connect toggles only behind the flag, connect saved items only after schema and RLS exist, review confirmation copy, define delete-one, delete-all, pause and memory-off behaviour against real state, and keep the accessibility standard already met.

**AI-readiness checklist.** Consent checked, flag enabled, deleted/disabled/paused/expired filtered, journey scoped, category F excluded, journal excluded, explicit field picking, 500-character cap shared not extended, memory dropped first under budget pressure, kill switch verified, eval harness green.

**Evaluation requirements.** The twelve required scenarios written as a concrete test plan with expected outcomes and the layer each belongs to (deterministic harness, unit test, or manual review). No changes to `eval-dataset-v1.json` in this phase.

**Recommended sequence.** 29J.1 migration draft only, 29J.2 RLS and trigger test plan, 29J.3 feature flag and read-only client shell, 29J.4 explicit save MVP internal-only, 29K eval harness, 29L controlled rollout — each with entry and exit criteria. None started.

**Risks and remaining gaps.** Named honestly, including the service-role over-read risk already flagged in 29H and the fact that consent copy is drafted but not signed off.

## 2. `docs/ai/roadmap.md`

Rewrite the Phase 29J entry as a pre-build gate: mark it pending, record the gate outcome, add the 29J.1 to 29J.4 sub-phases with entry and exit criteria, and state that implementation does not begin and 29K does not begin. Do not mark anything implementation ready.

## 3. `docs/ai/release-gate.md`

Add a short pointer in the memory gate section to `memory-mvp-readiness.md` as the place where the current gate status is recorded, and note that the gate is assessed, not passed. No gate items removed or weakened.

## 4. `docs/ai/README.md`

Add `memory-mvp-readiness.md` to the contents table and add 29I to the closed-phase list where missing, with 29J listed as an open gate.

## Validation

`npm run typecheck` and `npm run build`. No tests required, since no application file or JSON dataset changes. A final check confirming no source, schema, migration, route, SEO or sitemap file was touched.

## Report

The closing report answers all fifteen requested points, including an explicit statement on whether 29J can move to implementation. Work stops at that report.
