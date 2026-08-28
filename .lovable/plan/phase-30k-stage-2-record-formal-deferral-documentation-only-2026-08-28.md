# Phase 30K Stage 2 — record formal deferral (documentation only)

Stage 2 is not executed. No decisions, no events, no registry edits, no code,
no AI runtime or product behaviour changes. The only changes are governance
documentation recording the deferred checkpoint.

## Decision being recorded

Phase 30K Stage 2 is deferred pending appointment of The Start of You human
editorial/medical governance team. This is an intentional project decision, not
a failed phase. Content owner TBD, grounding reviewer TBD, review team not yet
established. Sensitivity, claim-attributability, source-validation,
grounding-review sign-off and `contentVersion` authorisation are all deferred.
No person is temporarily assigned or inferred from any source.

## Files to update (docs only)

| File | Change |
| --- | --- |
| `docs/ai/roadmap.md` | Add a Phase 30K entry with stage status: Stage 1 COMPLETE, Stage 2 DEFERRED PENDING HUMAN GOVERNANCE TEAM, Stages 3 and 4 NOT STARTED, Phase 30L NOT STARTED, Phase 31A NOT STARTED. Phase 30K is not described as complete. |
| `docs/ai/release-gate.md` | Record article grounding as disabled and blocked, with the deferral as the current reason and the resume condition. |
| `docs/ai/grounding-approvals/README.md` | Change the stage marker from "Current state (Stage 1)" to Stage 1 complete / Stage 2 deferred. Keep all counts at 0. Add the deferral reason, the preservation statement and the resume condition. |
| `docs/ai/grounding-approvals/human-decisions.md` | Add a status note: 0 real events, log deferred pending appointed people. No event appended. |
| `docs/ai/grounding-approvals/source-validation.md` | Same status note: 0 real validation events, deferred. No event appended. |
| `docs/ai/grounding-approvals/evidence-<slug>.md` (5 files) | Add a single "Stage 2 status: deferred pending human governance team" line. Existing digests, gaps and forms untouched. |
| `docs/ai/article-grounding-governance.md` | Note that the initial five-article batch is parked at the Stage 2 checkpoint. |
| `docs/ai/README.md` | Point to the deferral in the grounding section. |

## Content of the deferral note (shared wording)

- Reason: required real human governance roles are not yet appointed.
- Not permitted: temporary assignment, or inferring owner/reviewer from
  founder, author, developer, editor, git history or account details.
- Resume condition: accepted content owner(s); accepted grounding reviewer(s);
  reviewer access to the exact article versions represented by the evidence
  packages; sensitivity decisions; claim-attributability decisions;
  source-validation decisions; grounding-review sign-off.
- Digest rule: digests are not regenerated unless substantive article content
  changes. If it changes before review, the Stage 1 digest must be regenerated
  and the evidence package refreshed before review.

## Grounding is blocked for more than the human-team reason

`docs/ai/release-gate.md` and the other governance docs must not imply that
appointing the people would by itself make article grounding ready. The
recorded blocker list is:

- Stage 2 human governance decisions not yet available
- 0 candidates
- 0 approvals
- external governance evidence -> eligibility invalidation mechanism unresolved
  (must be resolved before Stage 4 approval)
- Phase 30L not started
- Phase 31A not started

No readiness claim is made anywhere. Phase 30K overall is recorded as
IN PROGRESS / PARKED, NOT COMPLETE.

## Preserved unchanged

Five evidence packages, full 64-hex SHA-256 digests, `digest-specification.md`,
`content-digests.json`, `source-evidence.json`, source-validation templates,
the human-review forms, governance-gap records, the append-only evidence
design, the seven-record safety-review hold, and the open external-evidence
eligibility blocker.

## Hard boundaries

- `src/lib/grounding/articleGroundingRegistry.ts` not edited. Registry total
  206 (live 117, draft 44, unknown 45), candidates = 0, approvals = 0,
  `listGroundingEligibleSlugs()` = `[]`. No sensitivity, owner, reviewer,
  `contentVersion`, `reviewedDate`, `approvedBy` or `approvedAt` for this
  batch. All five remain `blocked_missing_metadata`.
- Article grounding stays disabled: no RAG, retrieval, embeddings, vector
  search, ingestion, chunking, article runtime imports, article-derived runtime
  summaries, prompt, mode, safety-rule, endpoint, source-routing, Ask,
  companion, schema, route or SEO changes.
  `AI_SOURCE_ROUTING_VERSION` remains `30B-source-routing-v1`.
- Human-decision events remain 0. Source-validation events remain 0.

## Verification

Run the `articleGrounding`, `articleGroundingDrift` and
`articleGroundingApproval` tests, `npm run lint` and `npm run typecheck`.

Diff check is scoped to this phase, not the whole tree: confirm every file this
phase touches is under `docs/`. Any unrelated pre-existing non-doc working-tree
change is reported separately and not treated as a Phase 30K change. The known
pre-existing `previewAuthStorage.ts` prefer-const issue and the existing
react-refresh warnings are left untouched.

