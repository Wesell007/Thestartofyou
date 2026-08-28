# Phase 30K — Stage 2: Human Decision Checkpoint

Stage 1 is accepted. Stage 2 records real human decisions for the five prepared
articles. Lovable records only what a named person actually decides; it invents
nothing. Stage 2 stops short of any registry change: candidate transition is
Stage 3, approval is Stage 4.

## Batch

`second-time-parenting`, `staying-connected-as-parents`,
`calmer-evenings-after-busy-days`, `planning-family-days-out`,
`simple-family-play-ideas`.

## What Stage 2 produces

For each article, a completed decision set bound to the exact Stage 1 digest:

1. content owner acceptance
2. sensitivity confirmation (the Phase 30G `low` proposal is unconfirmed)
3. claim-attributability finding
4. source-validation conclusion (including whether a source list is required)
5. grounding review sign-off, refusal, or deferral

Each becomes an immutable, append-only event with a stable `eventId`
(`hd-0001`…), the 64-hex `contentDigest`, `digestSpecVersion`, the decision
maker, the decision result in their words, and a precise `decisionTimestamp`.
Source-validation conclusions are appended as new states in
`source-evidence.json`, never overwriting an earlier state.

## Inputs required from you before I write anything

Stage 2 cannot start until you supply, per article:

- the named content owner and their acceptance
- the named grounding reviewer
- the confirmed sensitivity level
- the claim-attributability finding against the checklist already prepared
- the source-validation conclusion
- the review sign-off decision and the date it was made
- the authorised `contentVersion` label, if the owner mints one

If a decision is refused or deferred, that is recorded as an event too. A blank
value stays blank; no placeholder is written.

## Files Stage 2 will touch

| File | Change |
| --- | --- |
| `docs/ai/grounding-approvals/human-decisions.md` | Append real events to the event log. |
| `docs/ai/grounding-approvals/source-evidence.json` | Append new source-evidence states. |
| `docs/ai/grounding-approvals/source-validation.md` | Append real validation events. |
| `docs/ai/grounding-approvals/evidence-<slug>.md` | Replace unresolved fields with the recorded decisions and their event ids. |
| `docs/ai/grounding-approvals/README.md` | Update the counts and the stage marker. |

## Hard boundaries

- `src/lib/grounding/articleGroundingRegistry.ts` is not edited. Registry
  changes = 0, candidates = 0, approvals = 0,
  `listGroundingEligibleSlugs()` stays `[]`.
- No `owner`, `reviewer`, `sensitivity`, `contentVersion`, `reviewedDate`,
  `approvedBy`, `approvedAt` or `approvalStatus` is written to the registry in
  Stage 2.
- `reviewedDate` keeps its `YYYY-MM-DD` contract; precise decision times live
  only in the decision history as `decisionTimestamp`.
- No RAG, retrieval, embeddings, vector search, ingestion, chunking, runtime
  article import, or prompt/mode/safety change.
  `AI_SOURCE_ROUTING_VERSION` remains `30B-source-routing-v1`.
- Digests are not regenerated. Any digest change requires a separate approval.
- The seven-record safety-review hold is untouched.

## Open gate carried forward

External governance evidence → eligibility invalidation mechanism must be
resolved before Stage 4 approval. Stage 2 does not solve it and restates it in
the README.

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, plus a
re-verification that the registry diff is empty and eligibility is `[]`.

## Stop point

Stage 2 ends with a completion report and the recorded decision set. Stage 3
(candidate transition) requires a separate go-ahead.
