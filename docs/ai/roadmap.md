# AI roadmap after Phase 29C

Phases 29D and 29E are closed. The rest are not started. Each begins only when its entry criteria are met, and closes only when its exit criteria are met and the release gate passes.

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


## Phase 29F — controlled pregnancy context upgrade

**Entry.** 29E closed. Privacy note written for each new field.

**Work.** Allow a slightly richer, still coarse pregnancy context: week, trimester, first or later pregnancy, and whether an appointment is imminent. No notes, no symptoms, no free text. Keep the 500-character cap.

**Exit.** Answers are demonstrably more relevant on a held-out prompt set, with no new field outside the allowlist and no regression in escalation behaviour.

## Phase 29G — permissioned memory design

**Entry.** 29F closed. Every precondition in `privacy-notes.md` section 5 designed, not just intended.

**Work.** Design only in this phase: allowlist, opt-in flow, management UI, retention, deletion and export, loss-sensitive handling, plus memory-specific evaluation cases. Implementation is a separate later phase.

**Exit.** Design approved, with an explicit decision on what is excluded from memory.

## Phase 29H — Start of You content grounding readiness audit

**Entry.** 29D harness available to measure grounding changes.

**Work.** Audit whether the site's own guidance is ready to ground answers: review status, reviewer metadata, canonical structure, freshness, and which articles are eligible. Decide retrieval approach without building it. Define how internal grounding coexists with the NHS allowlist and how internal links may appear where external ones may not.

**Exit.** A clear eligible-content list and a recommendation to proceed or not.

## Phase 29I — voice readiness audit

**Entry.** 29D and 29E closed.

**Work.** Audit voice specifically for safety: how escalation wording survives speech, latency, transcription errors on clinical wording, accessibility, consent for microphone input, and whether audio is ever retained. No implementation.

**Exit.** A written recommendation with a red-flag transcription risk assessment.

## Phase 29J — Fable-led AI companion UI redesign

**Entry.** The safety and evaluation layers are stable, so a visual rebuild cannot silently change behaviour.

**Work.** Deeper premium companion and Ask experience, led by Fable. Behaviour, wording and escalation stay fixed to this framework.

**Exit.** Visual parity with the approved direction, with the full `/ask` and panel regression set and every safety test unchanged and green.

## Not on the roadmap

Proactive nudges, partner and family mode, agentic tool actions and any autonomous action taken on a person's behalf remain out of scope until the evaluation and observability layers have production history behind them.
