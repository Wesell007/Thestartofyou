# Rollback, lapse and re-review

Applies from Stage 3 onwards. Nothing to roll back at Stage 1: zero candidates,
zero approvals, zero real decisions.

## Triggers

1. **Content change.** Any substantive change moves the digest, so the
   authorised `contentVersion` no longer matches. The approval lapses and the
   record returns to `blocked_missing_metadata` pending re-review.
2. **Source invalidation.** A source becoming stale, broken, withdrawn,
   contradicted or superseded invalidates the source-validation state even when
   the digest is unchanged.
3. **Sensitivity reassessment.** A stricter sensitivity proposal removes the
   article from the low-risk route immediately.
4. **Withdrawal.** An owner or reviewer may withdraw their decision at any time.

## Procedure

- Append a new event (`withdrawal`, `re_review`, `rejection`) to
  `human-decisions.md` referencing the superseded `eventId`. Never edit or
  delete the earlier event.
- Append a new source-evidence state and, where relevant, a new
  source-validation event. Never overwrite the state an earlier approval used.
- Clear the registry approval fields for that record only, restoring
  `approvalStatus` to `blocked_missing_metadata`. `rollbackRef` points at the
  evidence document so the rollback path is traceable without a migration.
- Records are handled one at a time; one rollback never cascades to another.

## Known gap

Registry-only eligibility cannot currently detect trigger 2. See the unresolved
external-evidence eligibility-invalidation gate in `README.md`, which must be
resolved before Stage 4 approval.
