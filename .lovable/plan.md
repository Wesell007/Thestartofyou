# Phase 41A — Pregnancy Multiples & Multi-Child Readiness Audit

Audit only. No product, UI, route, content, database, RLS, lifecycle, Companion, AI, memory, grounding, Journal changes. No deployment. Allowed: four docs, one read-only test, one roadmap entry.

## 1. Measure repository truth first (no conclusions before evidence)
- Pregnancy entry points: `/due-date-calculator`, `/due-date-results`, `/setup`, `/setup/pregnancy`, `/start-your-journey`, pending-journey stash, IVF timeline handoff. Record every stored field and whether any plurality (baby count, multiples) exists.
- Schema from migrations + generated types: pregnancy journey table(s), `babies`, First Year tables, journal, toolkit tables (appointments, symptoms, movement, birth plan, contractions), memories. Record owner keys, foreign keys, uniqueness, primary-baby mechanism, birth order, RLS scoping to `auth.uid()`, triggers.
- Read-only DB queries only for structure (columns, constraints, policies); no customer rows read or mutated.

## 2. Structural analyses (brief sections 4 to 18)
- Multiples model: twins, triplets+, due-date/week logic, content singleton wording.
- First Year multi-baby: 1 to 4 babies, shared date of birth, primary baby, all-babies scope, per-baby records.
- Pregnancy to First Year transition: kept pregnancy chapter, how babies link (or not) to the pregnancy.
- Second pregnancy / repeated journey: can a second pregnancy coexist with or replace the first; lifecycle single-active constraint.
- Pregnancy content and hub/saved-journey UX singleton assumptions (sample and count).
- Companion context: `JourneyContextV1`, personal source resolution, `ageMonths`, which baby/pregnancy is chosen, cross-child contamination risk.
- Journal context: entry ownership, whether entries bind to a child or pregnancy.
- Toolkit/action data ownership.
- Safety/medical differences for multiples (recorded, not remediated).
- Setup UX hypothesis, family-graph readiness, identity/context ownership matrix, high-risk singleton assumptions register, production vs foundation (repository default vs verified production kept distinct).

## 3. Decision
- One outcome A to D chosen on correctness, not effort, after all counts reconcile.
- Every remediation candidate classified LOVABLE-SUITABLE / CLAUDE-CODE-SUITABLE / EITHER. None performed.

## 4. Deliverables
- `docs/strategy/phase41a-pregnancy-multiples-audit.md`
- `docs/strategy/phase41a-family-entity-readiness.md`
- `docs/strategy/phase41a-context-contamination-register.md`
- `docs/strategy/phase41a-implementation-handoff.md`
- `src/test/phase41aMultiplesReadinessAudit.test.ts` — objective static facts only (lifecycle set, schema fields, baby ownership, primary-baby mechanism, Companion context field set, presence/absence of pregnancy plurality field, route set). No strategic conclusions, no data mutation.
- Append Phase 41A only to `roadmap.md`; 40A/40B untouched.

## 5. Validation
Focused 41A test; Pregnancy, First Year, lifecycle/journey, Companion context and journal-context regression groups (exact files and counts reported, previously vs newly run); typecheck. Database changes 0, deployment NO.

## 6. Closure
Report per brief section 24, close with the required wording and selected outcome only if accounting reconciles; otherwise BLOCKED naming the failed gate. Phase 41B not started.
