# AI roadmap after Phase 29C

Phases 29D, 29E and 29F are closed. The rest are not started. Each begins only when its entry criteria are met, and closes only when its exit criteria are met and the release gate passes.

## Phase 29D — evaluation harness and safety tests — CLOSED

**Entry.** 29C closed.

**Work.** Turn `eval-dataset-v1.json` into a runnable harness. Two layers: a fast deterministic layer that asserts routing, category detection, sanitisation and banned phrases without calling the model, and an optional graded layer that calls the model for a sampled subset and checks escalation presence, banned wording and link absence. Add the highest-priority hard-pattern gaps from `escalation-matrix.md`, each with a false-positive check. Move the highest-risk verdict phrases into the client sanitiser with tests. Add the kill switch and a prompt and model version string.

**Exit.** Met. Deterministic harness runs in CI over the 94-prompt dataset, every Red and Crisis prompt escalates, the kill switch is tested, and the Green prompts produce no false positives.

## Phase 29E — companion mode and prompt cleanup — CLOSED

**Entry.** 29D harness in place, so prompt edits are measurable.

**Work.** Consolidate shared prompt rules into one composed block; align tone and word limits; give the companion panel the same ambiguity handling as `/ask`; tighten the postpartum and feeding coverage that currently falls to `general`; consider a dedicated postpartum mode.

**Delivered.** Prompts are now composed by a registry from shared safety, escalation, grounding and hygiene blocks, with normalised word limits and pinned fingerprints. Fallback wording has a single cross-runtime source. Every AI surface renders through one `sanitiseAnswerForDisplay` helper, replacing six drifting local copies. Explicit version constants are logged per cold start and documented in `versioning.md`.

**Deferred.** A dedicated postpartum mode and wider postpartum/feeding source routing were not taken on — they change answer behaviour rather than governance, so they belong with the grounding work in 29G rather than in an infrastructure cleanup.

**Exit.** Met for the governance scope. Prompt duplication removed, fingerprints pinned, no harness regression, and panel and `/ask` behave the same for broad and urgent wording.


## Phase 29F — controlled pregnancy context upgrade — CLOSED

**Entry.** Met. 29E closed, privacy note written for each new field.

**Work.** Allow a slightly richer, still coarse pregnancy context: week, trimester, first or later pregnancy, and whether an appointment is imminent. No notes, no symptoms, no free text. Keep the 500-character cap.

**Exit.** Met. `src/lib/pregnancyAiContext.ts` defines the allowlist, the runtime picker refuses unknown keys, the due date day and month is gone from the My Week card, and the safety harness, mode routing and escalation tests are unchanged and passing.

## Phase 29G — permissioned memory design — PENDING VALIDATION

**Entry.** Met. 29F closed.

**Work.** Design and specification only. No implementation, no schema, no tables, no RLS, no UI, no memory behaviour. Deliverable is `memory-design.md`: principles, a six-category taxonomy, a five-level permission model, the user-control specification, consent copy drafts, a data boundary contract, AI usage rules, a safety and privacy gate, memory evaluation scenarios and an explicit exclusion list. Governance docs updated to match.

**Exit.** Docs complete, `npm run typecheck` and `npm run build` pass, and the phase report confirms no application code, schema, RLS, route, auth, SEO or sitemap change. Only then is this phase marked CLOSED.

## Phase 29H — memory schema and RLS design review

**Entry.** 29G closed.

**Work.** Review, on paper, the table shape implied by the data boundary contract in `memory-design.md`: owner-scoped RLS, grants in the same migration, journey scoping, soft delete, expiry, consent version, and how deletion joins `delete-account`. No migration is written in this phase.

**Exit.** An approved schema and policy design, with the privacy and legal review recorded.

## Phase 29I — memory settings UI prototype

**Entry.** 29H closed.

**Work.** Prototype the memory settings surface: level switches, the visible item list, edit, delete one, delete all, pause, the separate journal toggle default off, and the plain explanation copy. Prototype only, no persistence.

**Exit.** An approved surface with consent copy signed off and the copy version recorded.

## Phase 29J — explicit saved-memory MVP

**Entry.** 29H and 29I closed, and the memory gate in `release-gate.md` satisfiable.

**Work.** The narrowest useful slice: Basic preferences and Saved by me only, written only by a deliberate user action, behind a feature flag and a memory-off kill switch. Category F rejected at write time. No journey inference, no journal use, no continuity.

**Exit.** Memory writes only from explicit action, full delete and pause working, deletion joined to account deletion.

## Phase 29K — memory eval harness

**Entry.** 29J built behind a flag and not yet rolled out.

**Work.** Turn the eleven memory scenarios in `eval-dataset-v1.md` into dataset rows and deterministic checks, with near-miss Green rows against over-triggering.

**Exit.** Every memory scenario passing in CI, with cross-journey and deleted-memory leakage covered.

## Phase 29L — controlled rollout behind a feature flag

**Entry.** 29K green and the full memory gate passed.

**Work.** Staged rollout with the kill switch live, monitoring in place and a rollback that needs no migration.

**Exit.** Stable behaviour at each stage, with incidents and rollbacks recorded.

## Separate track — not part of the memory sequence

These remain valid but sit outside 29H to 29L and are not started.

- **Start of You content grounding readiness audit.** Whether the site's own guidance is ready to ground answers: review status, reviewer metadata, canonical structure, freshness, eligible articles, retrieval approach, and how internal grounding coexists with the NHS allowlist. Audit only.
- **Voice readiness audit.** Escalation wording in speech, latency, transcription errors on clinical wording, accessibility, microphone consent, and whether audio is ever retained. Audit only.
- **Fable-led AI companion UI redesign.** A deeper premium companion and Ask experience. Behaviour, wording and escalation stay fixed to this framework, with the full `/ask` and panel regression set green.


## Not on the roadmap

Proactive nudges, partner and family mode, agentic tool actions and any autonomous action taken on a person's behalf remain out of scope until the evaluation and observability layers have production history behind them.
