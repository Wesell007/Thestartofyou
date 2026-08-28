# Grounding approvals — evidence store

Phase 30K governance evidence for the initial five-article grounding batch.
Documentation and manifests only. Nothing here is imported by any runtime
module, prompt, mode, endpoint or AI path, and nothing here makes an article
grounding eligible on its own.

## Current state — Stage 1 complete, Stage 2 deferred

- Registry changes: **0**. `src/lib/grounding/articleGroundingRegistry.ts` is untouched.
- Candidate records: **0**. Approved records: **0**. `listGroundingEligibleSlugs()` is `[]`.
- Real human decisions recorded: **0**. Real source-validation events recorded: **0**.
- `AI_SOURCE_ROUTING_VERSION` remains `30B-source-routing-v1`.

## Stage 2 — DEFERRED PENDING HUMAN GOVERNANCE TEAM

Phase 30K Stage 2 is deferred because the required real human governance roles
have not yet been appointed. Content owner: TBD. Grounding reviewer: TBD.
Editorial/medical governance team: not yet established. Sensitivity
confirmation, claim-attributability decision, source-validation decision,
grounding-review sign-off and `contentVersion` authorisation are all deferred.

Nobody is temporarily assigned to progress the phase, and no owner or reviewer
is inferred from founder, article author, developer, editor, git history or
account details. This is an intentional project decision, not a failed phase.

All Stage 1 evidence is preserved unchanged: the five per-article packages, the
full SHA-256 digests, the digest specification, `content-digests.json`,
`source-evidence.json`, the source-validation structures, the human-review
forms, the governance-gap records, the append-only evidence architecture, the
seven-record safety-review hold and the external-evidence eligibility blocker.
Digests are not regenerated unless substantive article content actually
changes; if it does, the affected Stage 1 digest and evidence package must be
refreshed before human review.

Appointing the team would not by itself make article grounding ready. Grounding
stays blocked for multiple reasons: Stage 2 decisions unavailable, 0
candidates, 0 approvals, the unresolved external-evidence eligibility
invalidation mechanism below, Phase 30L not started and Phase 31A not started.

**Resume condition.** Stage 2 may resume only when real people have been
appointed and explicitly accept the roles, with at minimum: accepted content
owner(s); accepted grounding reviewer(s); reviewer access to the exact article
versions represented by these evidence packages; sensitivity decisions;
claim-attributability decisions; source-validation decisions; grounding-review
sign-off.


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
