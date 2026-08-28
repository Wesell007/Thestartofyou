# Grounding approvals — evidence store

Phase 30K governance evidence for the initial five-article grounding batch.
Documentation and manifests only. Nothing here is imported by any runtime
module, prompt, mode, endpoint or AI path, and nothing here makes an article
grounding eligible on its own.

## Current state (Stage 1)

- Registry changes: **0**. `src/lib/grounding/articleGroundingRegistry.ts` is untouched.
- Candidate records: **0**. Approved records: **0**. `listGroundingEligibleSlugs()` is `[]`.
- Real human decisions recorded: **0**. Real source-validation events recorded: **0**.
- `AI_SOURCE_ROUTING_VERSION` remains `30B-source-routing-v1`.

## Files

| File | Purpose |
| --- | --- |
| `digest-specification.md` | Pinned substantive-content digest specification (`30K-content-digest-v1`). |
| `content-digests.json` | Full 64-hex SHA-256 fingerprint per batch slug. Prepared evidence only. |
| `source-evidence.json` | Append-only source-evidence history. Zero real states at Stage 1. |
| `source-validation.md` | Source-validation event contract and blank template. Zero real events. |
| `human-decisions.md` | Human-decision event contract and blank template. Zero real events. |
| `evidence-<slug>.md` | Per-article evidence package, one per batch slug. |
| `initial-approved-corpus.md` | Approved-corpus manifest. Valid while empty. |
| `rollback-and-re-review.md` | Rollback, lapse and re-review procedure. |

## What a Stage 1 digest is not

A digest computed in Stage 1 is a prepared evidence fingerprint. It is **not**
human review, owner authorisation, sensitivity confirmation, source validation,
candidate status, approval, or grounding eligibility. No governance state is
written because a digest exists.

## Unresolved architecture gate (blocking before Stage 4)

**External governance evidence -> eligibility invalidation mechanism must be
resolved before Stage 4 approval.**

Detailed validation and approval evidence lives in this directory, while
`listGroundingEligibleSlugs()` reads only registry fields. If an approved
article's evidence later becomes stale, broken, withdrawn, contradicted,
superseded or otherwise invalid, nothing in the current design removes its
eligibility. Before any article reaches approved/eligible status, a mechanism
must be chosen and explicitly approved that guarantees an article cannot remain
grounding eligible while its required evidence package is invalid.

Candidate mechanisms, none chosen and none implemented:

1. eligibility validated against a machine-readable governance manifest;
2. an existing registry field or state transition that removes eligibility when evidence lapses;
3. another explicitly approved governance mechanism.

Stage 1 does not solve this and changes neither the registry nor the
eligibility helper.

## Staging

Stage 1 evidence preparation (this state) -> Stage 2 human decision checkpoint
-> Stage 3 candidate transition -> Stage 4 approval. Stages 2 to 4 require
explicit human decisions and separate go-aheads.
