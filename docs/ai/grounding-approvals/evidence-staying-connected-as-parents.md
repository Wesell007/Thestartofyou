# Evidence package — `staying-connected-as-parents`

Stage 1 preparation. Unresolved evidence state, not a decision record.

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
| Journey / topics | family / relationships |
| Dataset `status` | ready |

## 2. Content fingerprint

| Field | Value |
| --- | --- |
| Digest spec version | `30K-content-digest-v1` |
| Content digest (full SHA-256) | `7135b6012791f41360c13bbe71ba6f9fcca7c27985f75ab5dd8a912b7c1d07ea` |
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
- [ ] confirm no relationship-distress, mental-health or safeguarding claim crosses into clinical territory;
- [ ] confirm no claim depends on statistics, guidelines or dated policy;
- [ ] record the finding as a `claim_attributability` event bound to this digest.

## 5. Human decisions required (all unresolved)

Content owner acceptance; grounding reviewer; sensitivity confirmation;
claim-attributability finding; source-validation conclusion; candidate
decision; approval decision. Lovable supplies none of these.

## 6. Linked evidence

Source-evidence state: none. Source-validation event: none. Human-decision
events: none.
