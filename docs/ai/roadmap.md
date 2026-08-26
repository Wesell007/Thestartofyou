# AI roadmap after Phase 29C

Phases 29D, 29E, 29F and 29G are closed. The rest are not started. Each begins only when its entry criteria are met, and closes only when its exit criteria are met and the release gate passes.

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

## Phase 29G — permissioned memory design — CLOSED

**Entry.** Met. 29F closed.

**Work.** Design and specification only. No implementation, no schema, no tables, no RLS, no UI, no memory behaviour. Deliverable is `memory-design.md`: principles, a six-category taxonomy, a five-level permission model, the user-control specification, consent copy drafts, a data boundary contract, AI usage rules, a safety and privacy gate, memory evaluation scenarios and an explicit exclusion list. Governance docs updated to match.

**Exit.** Met. Docs complete, `npm run typecheck` and `npm run build` pass, and the phase report confirms no application code, schema, RLS, route, auth, SEO or sitemap change.

## Phase 29H — memory schema and RLS design review — CLOSED

**Entry.** Met. 29G closed.

**Work.** Design and review only. No migration, table, enum, index, grant, RLS policy, storage bucket, edge function or application code. Deliverable is `memory-schema-rls-design.md`: three proposed tables (`ai_memory_items`, `ai_memory_consents`, `ai_memory_events`), their enums, constraints, indexes and grants; owner-scoped RLS as pseudo-SQL with a single controlled read function; a ten-row threat model led by service-role over-read; consent, pause, deletion, expiry and account-deletion behaviour; server-side access rules for future edge functions; write-time validation; and a pre-migration review checklist. Category F stays structurally unstorable and journal content stays unbuildable. Governance docs updated to match.

**Exit.** Met. Design document complete, supporting docs updated, `npm run typecheck` and `npm run build` pass, and the phase report confirms no application code, schema, migration, RLS, route, auth, SEO or sitemap change. The privacy and legal review itself remains outstanding and is a gate item for 29J, not for this phase.

## Phase 29I — memory settings UI prototype — CLOSED

**Entry.** Met. 29H closed.

**Work.** Front-end prototype only, at the hidden route `/prototype/memory-settings`: explanation and default-off framing, a status card, the five permission levels with sensitive memory shown as unavailable and switchless, three synthetic remembered items with edit, review and delete, pause and delete-all confirmations, a separate journal boundary card with no toggle, a sensitive information boundary, and a "What does my companion remember?" viewer across the off, empty and example states. All state is local React state. No persistence, no Supabase read or write, no browser storage, no network call, no companion connection and nothing passed into an AI request. `/prototype` was added to `COMPANION_HIDDEN_PREFIXES` so the launcher and panel never appear on the prototype, and the page uses its own static chrome rather than `MyWeekHeader`, which runs `useLifecycle` and Supabase work.

**Exit.** Met. Surface built and reviewable, `noindex` set, route absent from navigation and from the sitemap allowlists, eleven prototype guard tests passing, and `npm test`, `npm run lint`, `npm run typecheck` and `npm run build` all pass. Consent copy sign-off and a recorded copy version remain outstanding and carry into the memory gate for 29J.

## Phase 29J — explicit saved-memory MVP pre-build gate — IN REVIEW

**Entry.** 29H and 29I closed.

**Work.** Review and planning only. No migration, table, enum, RLS policy, edge function, application code, route, SEO change or AI behaviour change. Deliverable is `docs/ai/memory-mvp-readiness.md`, with supporting updates to `roadmap.md`, `release-gate.md` and `README.md`. The phase records honestly whether the full memory gate in `release-gate.md` is satisfiable, identifies the remaining blockers, and defines the narrow MVP scope and the future implementation sub-phases 29J.1 to 29J.4.

**Review artifact.** The evidence pack in `docs/ai/memory-gate-evidence-pack.md` is produced for privacy/legal and internal product review. It is not implementation and does not itself close the gate.

**MVP scope.** Category A explicit preferences and Category C explicit user-saved preferences only. User-visible saved items only. Explicit save action only. No extraction, no inference, no ordinary conversation memory, no chat history, no journal content, no sensitive content, no Category F. Feature flag off by default. Memory is not passed into AI calls until 29J.3, which is a separate future sub-phase requiring its own gate check.

**Exit.** Gate reviewed, blockers named, MVP scope agreed, and sub-phases 29J.1 to 29J.4 defined. This phase does **not** mark implementation ready.


## Phase 29J.1 — migration and schema — FUTURE, NOT STARTED

**Entry.** 29J gate reviewed and all blockers in `memory-mvp-readiness.md` section 3 closed.

**Work.** Write the single migration that creates the memory tables, enums, constraints, indexes, grants and owner-scoped RLS policies described in `memory-schema-rls-design.md`. Add the validation trigger. No application code or AI behaviour change.

**Exit.** Migration reviewed and approved as its own change.

## Phase 29J.2 — memory writes and settings persistence — FUTURE, NOT STARTED

**Entry.** 29J.1 migration approved.

**Work.** Build explicit save, edit, soft delete, delete-all and pause paths. Wire the settings UI from Phase 29I to real persistence. The companion still does not read memory.

**Exit.** Writes and settings persistence working and guarded by the feature flag and kill switch.

## Phase 29J.3 — memory read path behind feature flag — FUTURE, NOT STARTED

**Entry.** 29J.2 closed and the AI-readiness checklist from `memory-mvp-readiness.md` section 9 passed.

**Work.** Build the single controlled access module, connect it to the companion context builder, and keep memory inside the existing 500-character context cap. Enable only when the feature flag and kill switch both permit it.

**Exit.** Memory is read only for the current journey, only live items, only category A and C, and only within the context cap.

## Phase 29J.4 — memory eval harness and controlled rollout — FUTURE, NOT STARTED

**Entry.** 29J.3 closed.

**Work.** Convert the evaluation scenarios from `eval-dataset-v1.md` into dataset rows and deterministic checks. Update `observability-and-incidents.md` with memory-specific severities. Conduct controlled rollout behind the feature flag with the kill switch live.

**Exit.** Every memory scenario passing in CI, stable behaviour at each rollout stage.

## Phase 29K — memory eval harness extension — FUTURE, NOT STARTED

**Entry.** 29J.4 closed.

**Work.** If additional cross-journey, deleted-memory leakage or service-role access cases are needed, extend the harness. Otherwise this phase may be absorbed into 29J.4.

**Exit.** Every memory scenario passing in CI, including any cases added after 29J.4.

## Phase 29L — controlled rollout behind a feature flag — FUTURE, NOT STARTED

**Entry.** 29J.4 / 29K green and the full memory gate in `release-gate.md` section H passed.

**Work.** Staged rollout with the kill switch live, monitoring in place and a rollback that needs no migration.

**Exit.** Stable behaviour at each stage, with incidents and rollbacks recorded.


## Separate track — not part of the memory sequence

These remain valid but sit outside 29H to 29L and are not started.

- **Start of You content grounding readiness audit — CLOSED (Phase 30A).** Delivered as `content-grounding-readiness.md`: the current static keyword routing and NHS allowlist documented, coverage strengths and gaps recorded, and the criteria that this product's own content would have to meet before it could ever be grounding material. Verdict: not approved for grounding. The gated follow-on sequence is below. Audit only; nothing was implemented and nothing is authorised.
- **Voice readiness audit.** Escalation wording in speech, latency, transcription errors on clinical wording, accessibility, microphone consent, and whether audio is ever retained. Audit only.
- **Fable-led AI companion UI redesign.** A deeper premium companion and Ask experience. Behaviour, wording and escalation stay fixed to this framework, with the full `/ask` and panel regression set green.


## Grounding track — recommended and gated, none started

Recommended by Phase 30A. None of these is authorised: each needs its own approval before work begins, and the grounding gate in `release-gate.md` section I applies throughout.

### Phase 30B — widen external source routing — CLOSED

**Delivered.** Eleven new NHS pages added to `APPROVED_SOURCES` covering postpartum physical recovery, the 6-week postnatal check, postnatal fitness, first solid foods, what to feed young children, foods to avoid, drinks and cups, learning to talk, toddler first words, toddler activities and the NHS Best Start toddler hub. Six new route groups plus a brand/product guard, with ordering fixes for the Phase 30A collisions. `AI_SOURCE_ROUTING_VERSION` bumped to `30B-source-routing-v1` and `AI_PHASE` to `30B`. 38 deterministic routing tests added in `src/test/aiSourceRouting.test.ts`.

**Deliberately out of scope and still deferred.** Loss, domestic abuse and complex perinatal mental health routing, which stay separate safety-reviewed phases; Start of You article grounding, still blocked at the gate; brand-answer grounding (Phase 30D).

### Phase 30C — article metadata and approval model — CLOSED, pending validation record

**Entry.** 30B closed, default-deny governance model agreed.

**Work.** Data-layer only: `src/lib/grounding/` now holds a metadata-only type model, a 206-record approval registry and default-deny eligibility helpers. No article dataset is imported, no article body content is stored, and the AI reads none of it.

**Exit.** Metadata model present, lifecycle and missing-metadata exclusion proven in tests, zero articles approved, zero AI usage, no version constant bumped. Closed after validation passed and the report confirmed no AI behaviour changed.

### Phase 30D — curated brand-answer grounding behind a flag — FUTURE, NOT STARTED

**Entry.** 30C closed, the per-article criteria satisfied and recorded for every mapped article, stale-content evaluations in place.

**Work.** A small hand-curated topic-to-article map for product and navigation guidance only. Never clinical, never safety-critical.

**Exit.** Brand questions answered from approved content behind a feature flag, kill switch and rollback proven, no clinical use.

### Phase 30E — retrieval readiness review — FUTURE, NOT STARTED

**Entry.** 30D closed with production history.

**Work.** Assess retrieval over an approved, versioned subset on the evidence from 30D. Review only; it may conclude retrieval is unnecessary.

**Exit.** A recorded decision either way. No retrieval, vector search or embedding work starts without it.


## Not on the roadmap

Proactive nudges, partner and family mode, agentic tool actions and any autonomous action taken on a person's behalf remain out of scope until the evaluation and observability layers have production history behind them.
