# The Start of You — AI foundation, safety governance and evaluation framework

Phase 29C. These documents are the control layer for every future AI change in this product. They describe the AI system as it exists today, what the companion is allowed to be, how safety is classified and escalated, what wording is banned, how changes are evaluated, and what must be true before an AI change ships.

Nothing in this folder changes runtime behaviour. It is documentation plus one evaluation data file.

## Contents

| File | Purpose |
| --- | --- |
| `system-map.md` | The current AI system: entry points, modes, source routing, safety routing, context, sanitisation, ambiguity handling |
| `purpose-and-scope.md` | What the companion is allowed to be, supported scope per journey, unsupported behaviour |
| `safety-taxonomy.md` | Green, Amber, Red, Crisis, Unsupported, Ambiguous — triggers, expected behaviour, escalation wording, must-not-say |
| `escalation-matrix.md` | Per-journey escalation requirements and current coverage |
| `answer-patterns.md` | Banned user-facing phrases and approved alternatives |
| `eval-dataset-v1.md` / `eval-dataset-v1.json` | Evaluation dataset v1 (84 prompts) and its schema |
| `release-gate.md` | The checklist every future AI change must pass |
| `observability-and-incidents.md` | What to track later, kill switch and incident response |
| `privacy-notes.md` | Health and fertility data handling, minimisation, memory preconditions |
| `memory-design.md` | Permissioned memory and personalisation design (specification only, nothing built) |
| `memory-schema-rls-design.md` | Future memory tables, enums, constraints, RLS, threat model, deletion and validation design (review only, nothing built) |
| `memory-settings-prototype.md` | Where the Phase 29I memory settings prototype lives and what it deliberately does not do |
| `memory-mvp-readiness.md` | Phase 29J pre-build gate outcome: MVP scope, blockers, checklists and implementation sequence (planning only, nothing built) |
| `memory-gate-evidence-pack.md` | Review pack for privacy/legal and internal product reviewers, supporting the pre-build gate (review only, nothing built) |
| `content-grounding-readiness.md` | Phase 30A grounding audit: current source routing, coverage strengths and gaps, why Start of You content is not approved for grounding, the criteria and gated future options (audit only, nothing built) |
| `content-grounding-readiness.md` (Phase 30B section) | The delivered widened NHS routing: sources added, routes added, collisions resolved, remaining gaps |
| `content-grounding-readiness.md` (Phase 30C section) | The article grounding metadata model, approval statuses, sensitivity levels, default-deny rule and eligibility logic (governance only, no article connected to AI) |
| `article-grounding-review-queue.md` | Phase 30D review queue: article counts by journey, status, sensitivity and metadata gap, cautious review order and exit criteria (governance only, zero articles approved) |
| `article-grounding-review-template.md` | Phase 30D per-article grounding review form and its rules |
| `article-grounding-editorial-status-resolution.md` | Phase 30F per-record editorial status resolution for the 52 unknown records: `articleInventory.ts` evidence reconciliation, 7 resolved to live, 45 still unknown, verified totals (metadata only, zero articles approved) |
| `article-grounding-governance.md` | Phase 30F normative governance contract for blocked → candidate → approved: content owner, content version, grounding reviewer, reviewed date, source-list validation, sensitivity decision rules, candidate authority, approval authority, review evidence package and decision matrix (roles and rules only, no people assigned, no article classified) |
| `article-grounding-tier-1-review.md` | Phase 30E Tier 1 review batch: 206 records screened (110 live, 44 draft, 52 unknown), the 12 support-journey Tier 1 corrections, six body-reviewed exclusions, zero accepted candidates, governance gaps and the recommended next phase (review only, zero articles approved) |
| `versioning.md` | The AI version constants, prompt fingerprints and the rules for bumping them |

| `roadmap.md` | Phases 29D to 29L and the grounding track 30A to 30L plus 31A, with entry and exit criteria, plus the separate audit and redesign track |

## Closed AI phases

- 29A companion audit and architecture
- 29B site-wide text companion shell
- 29B.1 answer quality and grounding fallback
- 29B.2 premium Ask experience and ambiguous query handling
- 29B.2b Ask visual parity and trust copy
- 29B.2c "More on this" premium section cards
- 29C this framework
- 29D safety harness, kill switch and hard escalation gaps
- 29E mode, prompt registry and output hygiene cleanup
- 30A content grounding readiness audit
- 30B external source routing coverage upgrade
- 30C article grounding metadata and approval model (governance data only, zero articles approved)
- 30D article grounding registry drift guard and review queue (governance and QA only, zero articles approved)
- 30E Tier 1 article grounding review batch (review only, 0 accepted candidates, 0 registry changes, zero articles approved, AI runtime unchanged, article grounding still blocked)
- 30F grounding governance metadata and editorial status resolution (52 unknown statuses investigated, 7 resolved to live, 45 still unknown, governance contract published covering content owner, content version, grounding reviewer, reviewed date, source-list validation, sensitivity decision rules, candidate authority, approval authority and review evidence; no governance metadata invented, 0 candidates, 0 approvals, AI runtime unchanged, article grounding still blocked)
- 30G Tier 2 low-risk general education review (review only, 102 verified-live records screened, 5 accepted future Tier 2 candidates, 5 body-reviewed exclusions, 92 metadata-routed provisional exclusions, 0 registry changes, 0 candidates, 0 approvals, AI runtime unchanged, article grounding still blocked)
- 30H wellbeing and sensitive support review (review only, 11 verified-live records body-reviewed, 3 unknown support records still excluded, 0 accepted future wellbeing candidates, 4 routed to Phase 30I, 7 routed to Phase 30J, 0 ambiguous, 3 source-list gaps, 0 registry changes, 0 candidates, 0 approvals, AI runtime unchanged, article grounding still blocked)
- 30I health-reviewed article review (review only, 57 unique verified-live records body-reviewed, 21 accepted future health-reviewed candidates in documentation only, 0 registry candidate records, 33 routed to Phase 30J, 2 returned to the wellbeing stream, 1 later safety adjudication required, 11 source-list gaps, 0 registry changes, 0 approvals, AI runtime unchanged, article grounding still blocked)

- 29F controlled pregnancy context upgrade
- 29G permissioned memory and personalisation design (specification only)
- 29H memory schema and RLS design review (design review only)
- 29I memory settings UI prototype (front-end prototype only, no persistence)
- 29J explicit saved-memory MVP pre-build gate (planning and review only, no persistence)
- Companion name personalisation cleanup (no default companion name anywhere)
- 30A AI content grounding readiness audit (audit only, nothing built, nothing authorised)


## How to use these documents

1. Before starting AI work, read `purpose-and-scope.md` and `safety-taxonomy.md`. If the proposed feature falls outside the supported scope, it does not get built.
2. While building, follow `answer-patterns.md` for wording and `escalation-matrix.md` for escalation behaviour.
3. When changing a prompt, follow `versioning.md`: update the pinned fingerprint and bump the version constants in the same commit.
4. Before shipping, work through `release-gate.md` in full and record the result in the phase report.
5. When something goes wrong in production, follow `observability-and-incidents.md`, then add the failing prompt to `eval-dataset-v1.json` before re-release.

The deterministic harness over the evaluation dataset runs in the normal test suite (`src/test/aiSafetyHarness.test.ts`).

