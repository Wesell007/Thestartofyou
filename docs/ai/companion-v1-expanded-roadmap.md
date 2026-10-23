# Companion V1 expanded roadmap

**Status: PLANNED.** Recorded in Gate 0 (23 October 2026). This document is a map, not a design. The existing AI control layer is unchanged: `docs/ai/README.md` (safety taxonomy, release gate, banned phrases, versioning) applies to every item below. Programme gates: `docs/strategy/tsoy-v1-product-rebaseline.md`.

| Capability | Existing foundation (link, do not duplicate) | Planned in | Activation dependency |
|---|---|---|---|
| Grounded text Companion | `system-map.md`, `companion-architecture.md`, `companion-conversation.md`, grounding governance (`article-grounding-governance.md`; grounding stays default-deny) | ongoing | release gate per change |
| Journey-aware context | `companion-journey-context.md`, `companion-journey-next-actions.md`; 41B context contract (`docs/strategy/phase41b0r-family-entity-architecture-reconciliation.md` §8) | Gate 3–4 | 41B pointer/episodes on staging |
| Trusted provenance | Phase 40A priority 1 | **42A** (Gate 4) | claims registry (`docs/strategy/phase40a-claims-truth-registry.md`) |
| Answer → action | Phase 40A priority 2 | **42B** (Gate 4) | no actions on RED/CRISIS |
| Continuity across transitions | Phase 40A priority 3 | **43** (Gate 4) | loss-aware copy; 41B |
| Permissioned memory | `memory-design.md`, `memory-schema-rls-design.md`, `memory-mvp-readiness.md`, `memory-gate-evidence-pack.md`, `companion-memory.md` | **44** (Gate 4) | privacy/legal approval before release |
| Journal continuity / awareness | `aic-ja2-journal-context.md`, `aic-ja3-selected-journal-entry.md`, `aic-ja4-text-journal-release-gate.md`, `companion-journal-enrichment-safety.md` | **45** (Gate 4) | explicit permission per entry/scope |
| Emotional continuity | `companion-safety-emotional-continuity.md`, `companion-safety-final-verification.md` | ongoing | safety review |
| Proactive intelligence | none (new) | Gate 5 | opt-in; quiet hours; no proactive message on safety-sensitive topics without review; notification permission (app) |
| Real-time voice | `companion-voice-architecture.md`, `companion-voice-provider-review.md`, ADR-AIC6-01…05 | Gate 5 | voice is transport; canonical text; no audio before safety (ADRs) |
| Family / co-parent modes | none (new); depends on 41B family entity | Gate 5 | private conversations stay private unless explicitly shared |
| Multimodal understanding | none (new) | Gate 5 | media privacy; owner-prefixed storage paths (N10 rule A); no diagnostic interpretation of scans or images |
| Safe agentic actions | Phase 40A priority 2 (smallest version) | architecture now, activation Gate 5 | see below |

## Agentic actions: architecture principles (design now, build later)

- **Typed action catalogue.** For example: `save_memory`, `create_journal_entry`, `add_checklist_item`, `schedule_reminder`, `prepare_appointment_questions`, `update_plan`, `share_item_with_partner`, `retrieve_authorised_context`. Each action declares its input schema, the data it touches and its risk tier.
- **Risk tiers.**
  - Tier 0: read the user's own authorised context.
  - Tier 1: reversible writes to the user's own private data.
  - Tier 2: anything shared with another person, external or irreversible. This always needs **explicit confirmation** in the UI, showing exactly what will happen.
- **The server is authoritative.** The model proposes; a server function validates ownership (RLS plus explicit checks), executes and logs. The model never holds credentials or calls providers directly.
- **Safety coupling.** RED/CRISIS or unsupported turns offer no action. Health actions never imply diagnosis or treatment.
- **Audit and undo.** Every executed action records actor, time, action, target and result. Tier 1 actions offer undo.
- **Privacy.** Retrieval is limited to user-authorised scopes. Family sharing uses explicit per-item permission. Account deletion (N10) must remove action logs with the account.

None of this is implemented in Gate 0.
