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
| `versioning.md` | The AI version constants, prompt fingerprints and the rules for bumping them |
| `roadmap.md` | Phases 29D to 29L with entry and exit criteria, plus the separate audit and redesign track |

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
- 29F controlled pregnancy context upgrade

## How to use these documents

1. Before starting AI work, read `purpose-and-scope.md` and `safety-taxonomy.md`. If the proposed feature falls outside the supported scope, it does not get built.
2. While building, follow `answer-patterns.md` for wording and `escalation-matrix.md` for escalation behaviour.
3. When changing a prompt, follow `versioning.md`: update the pinned fingerprint and bump the version constants in the same commit.
4. Before shipping, work through `release-gate.md` in full and record the result in the phase report.
5. When something goes wrong in production, follow `observability-and-incidents.md`, then add the failing prompt to `eval-dataset-v1.json` before re-release.

The deterministic harness over the evaluation dataset runs in the normal test suite (`src/test/aiSafetyHarness.test.ts`).

