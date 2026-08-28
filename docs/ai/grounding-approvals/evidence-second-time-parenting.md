# Evidence package — `second-time-parenting`

Stage 1 preparation. Unresolved evidence state, not a decision record.

**Stage 2 status: DEFERRED pending human governance team.** The required real
human governance roles have not yet been appointed: content owner TBD,
grounding reviewer TBD, editorial/medical governance team not yet established.
Sensitivity confirmation, claim-attributability, source validation,
grounding-review sign-off and `contentVersion` authorisation are all deferred.
Nobody is temporarily assigned or inferred. This Stage 1 evidence, including the
digest below, is preserved unchanged; a digest is regenerated only if the
substantive article content actually changes, in which case this package must be
refreshed before human review. The article remains `blocked_missing_metadata`.

## 1. Re-verification (Stage 1)

| Check | Value |
| --- | --- |
| Registry `editorialStatus` | live |
| Registry `archived` / `deprecated` | false / false |
| Registry `approvalStatus` | blocked_missing_metadata |
| Registry `sensitivity` | absent |
| Registry `hasSourceList` | false |
| Registry `owner` / `contentVersion` / `reviewer` / `reviewedDate` | all absent |
| Registry `approvedBy` / `approvedAt` / `approvalNotes` / `rollbackRef` | all absent |
| Journey / topics | family / growing-families |
| Dataset `status` | ready |

## 2. Content fingerprint

| Field | Value |
| --- | --- |
| Digest spec version | `30K-content-digest-v1` |
| Content digest (full SHA-256) | `f8e6e8f692c610699d0c2ef3e80f179964c3b16d6963d9bde30d0991e0bd14a4` |
| `contentVersion` | not minted (requires a human decision) |

Prepared evidence fingerprint only: not reviewed, not authorised, not
sensitivity-confirmed, not candidate, not approved, not eligible.

## 3. Governance gaps

- no confirmed `sensitivity` (`low` is a proposal from Phase 30G, unconfirmed);
- no accepted content owner;
- no named grounding reviewer;
- no `reviewedDate` (and none may be written before a real review);
- no authorised `contentVersion`;
- `hasSourceList` false and no grounding source-evidence state exists;
- no claim-attributability finding bound to the digest above;
- no source-validation event;
- `approvalStatus` remains `blocked_missing_metadata`.

## 4. Claim-attributability checklist (for the human reviewer)

- [ ] read the article at the exact digest above;
- [ ] list any factual claim a reader could act on that needs attribution;
- [ ] for each, record the source, or record explicitly that none is required;
- [ ] confirm no clinical, medication, dosing, urgency or safety-threshold claim is present;
- [ ] confirm no claim depends on statistics, guidelines or dated policy;
- [ ] record the finding as a `claim_attributability` event bound to this digest.

## 5. Human decisions required (all unresolved)

Content owner acceptance; grounding reviewer; sensitivity confirmation;
claim-attributability finding; source-validation conclusion; candidate
decision; approval decision. Lovable supplies none of these.

## 6. Linked evidence

Source-evidence state: none. Source-validation event: none. Human-decision
events: none.
