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
3. claim-attributability finding — one of: no attributable factual claims
   requiring external support / attributable factual claims present /
   uncertain, further review required. "Uncertain" never defaults to "sources
   not required" and keeps the article blocked.
4. source-validation conclusion — one of: sources not required / sources
   required and validation passed / sources required, remediation required /
   source validation deferred. `hasSourceList: false` is never read as "sources
   unnecessary"; where sources are required and absent, the outcome is
   remediation required and the article stays blocked. No source is invented or
   added automatically.
5. grounding review sign-off, refusal, or deferral

Each becomes an immutable, append-only event with a stable `eventId`
(`hd-0001`…), the 64-hex `contentDigest`, `digestSpecVersion`, the decision
maker, the decision result in their words, and a precise `decisionTimestamp`.
Source-validation conclusions are appended as new states in
`source-evidence.json`, never overwriting an earlier state.

## Roles: real people only

Content owner and grounding reviewer are governance roles supplied by you as
real named people who explicitly accept the role. A decision produced by
ChatGPT, Lovable or any other AI is not human approval; the human may use AI to
help review, but the recorded decision is theirs. Identities are never inferred
from git history, article authorship, previous edits, account details or
project ownership.

Phase 30F contract as it stands: the grounding reviewer must not be the sole
author of the article; full authorship independence is required only for
`health_reviewed` and `safety_sensitive`. At `low`, candidate and approval
authority is expressed as "grounding reviewer + content owner", so Stage 2 will
expect two distinct named people and will not collapse them into one without an
explicit governance decision from you. No clinical reviewer requirement is
invented for these five low-risk articles, because the contract does not impose
one at `low`.

## contentVersion

Stage 2 may record the owner's authorisation of `<slug>@1` against the exact
Stage 1 digest. It is written to the decision history only, binding slug, full
64-character digest, digest specification version, authorised contentVersion,
owner identity and decision event. It is not written to the registry until
Stage 3.

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
| `docs/ai/grounding-approvals/evidence-<slug>.md` | Show the current decision state and reference event ids. |
| `docs/ai/grounding-approvals/README.md` | Update the counts and the stage marker. |

The append-only decision and source-validation histories stay the authoritative
record of what happened. The per-article evidence documents summarise current
state and cite event ids; they never erase or rewrite history. A later change
appends a new event that supersedes the earlier one by reference, and no
previous human decision is silently edited.

## Hard boundaries

- `src/lib/grounding/articleGroundingRegistry.ts` is not edited. Registry
  changes = 0, candidates = 0, approvals = 0,
  `listGroundingEligibleSlugs()` stays `[]`.
- Nothing is written to the registry in Stage 2: not `owner`, `reviewer`,
  `sensitivity`, `contentVersion`, `reviewedDate`, `approvalStatus`,
  `approvedBy`, `approvedAt`, `approvalNotes` or `rollbackRef`.
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
