# Human decisions — contract and template

Append-only event log. **Real human decisions recorded: 0.**

**Status: Stage 2 DEFERRED pending human governance team.** No decision can be
recorded because no content owner or grounding reviewer has been appointed
(both TBD; the editorial/medical governance team is not yet established). No
person is temporarily assigned or inferred. The log below stays empty until
real appointed people make real decisions.

Stage 1 creates templates and unresolved fields only. No blank, placeholder or
synthetic entry is appended to the event log, because an empty template must
never be mistaken for a decision that happened.

## Distinction

- **A. Template / unresolved evidence state** — the per-article evidence
  packages and the blank fields below. No `eventId`, no timestamp, no decision.
- **B. Immutable historical event** — appended only after an actual person
  makes the corresponding decision. Never silently mutated; a reversal or
  correction appends a new event referencing the superseded one.

## Event fields (real events only)

| Field | Meaning |
| --- | --- |
| `eventId` | stable unique id, e.g. `hd-0001` |
| `slug` | article slug |
| `contentDigest` | full 64-hex digest the decision was made against |
| `digestSpecVersion` | digest specification version |
| `contentVersion` | authorised content version label, when one exists |
| `decisionType` | `owner_acceptance`, `sensitivity_confirmation`, `claim_attributability`, `grounding_review`, `candidate`, `approval`, `rejection`, `withdrawal`, `re_review` |
| `decisionMaker` | the person deciding |
| `decisionResult` | the outcome in their words |
| `decisionTimestamp` | precise ISO timestamp, e.g. `2026-08-28T14:32:11+01:00` |
| `sourceEvidenceStateId` | source-evidence state relied on, where relevant |
| `sourceValidationEventId` | source-validation event relied on, where relevant |
| `supersedes` | previous `eventId` this replaces, or null |

## Registry vs decision history — `reviewedDate`

The registry contract is unchanged by Stage 1. `reviewedDate` stays the
**calendar date** on which the exact content version passed grounding review
and is written as `YYYY-MM-DD`. The precise moment of the decision lives only
here, as `decisionTimestamp`. `approvedAt` keeps its precise-timestamp
contract. No timestamp of any kind is created before its real decision occurs.

Example, once a real review exists:

```
Registry:          reviewedDate: "2026-08-28"
Decision history:  decisionTimestamp: "2026-08-28T14:32:11+01:00"
```

## Unresolved decision template (per article)

| Decision | Value | Decided by | Decision timestamp |
| --- | --- | --- | --- |
| Content owner acceptance | unresolved | unresolved | unresolved |
| Sensitivity confirmation (`low` proposed, unconfirmed) | unresolved | unresolved | unresolved |
| Claim-attributability finding | unresolved | unresolved | unresolved |
| Source-validation conclusion | unresolved | unresolved | unresolved |
| Grounding review sign-off | unresolved | unresolved | unresolved |
| Candidate decision | unresolved | unresolved | unresolved |
| Approval decision (`approvedBy`, `approvedAt`) | unresolved | unresolved | unresolved |

## Event log

_No real events. Stage 1 appends none._
