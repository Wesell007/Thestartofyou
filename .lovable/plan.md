# Phase 41B.1A — Account Deletion Clarification (documentation only)

No SQL change. No database application. The pending migration file stays byte-identical, including `pregnancy_episodes.user_id` referencing `auth.users` ON DELETE CASCADE.

## 1. Evidence document (`docs/strategy/phase41b1a-family-entity-foundation-implementation.md`)
Replace the current note ("account deletion keeps working") with a new "Deletion semantics" section:
- ACCOUNT DELETION CASCADE = INTENTIONAL. Purpose: when a person explicitly deletes their whole account, their pregnancy episodes must also be eligible for deletion under the platform's account-deletion process. It is not replaced with RESTRICT.
- PREGNANCY-LEVEL DEPENDENCY DELETE = RESTRICT. Purpose: deleting a single pregnancy episode must never silently cascade into children, pregnancy history or episode-bound records.
- ACCOUNT DELETION WITH NEW PREGNANCY STRUCTURE = PENDING APPLICATION / RUNTIME VERIFICATION.
- Wording used: "The target design preserves account-deletion semantics. Runtime compatibility with the new RESTRICT relationships must be verified after application."

Add a "Future application-gate test: ACCOUNT DELETION INTEGRITY TEST" section:
- Fixture (non-customer data only): a user, a pregnancy episode, an episode-bound pregnancy record, a baby linked to the pregnancy, and a First Year child-bound record where applicable.
- Verify: (1) deleting the pregnancy episode alone is blocked where protected dependants exist; (2) the approved whole-account deletion workflow removes or processes all owned data in the required order; (3) no orphaned pregnancy, child or journey records remain; (4) no other user's data is touched.
- Stop rule: if whole-account deletion fails because RESTRICT dependencies block the existing flow, stop the release and redesign the deletion transaction or order before production.
- Status: NOT RUN. Never run against customer data.

## 2. Test and rollback plan (`docs/strategy/phase41b-test-and-rollback-plan.md`)
Add the Account Deletion Integrity Test to the section 1 database tests and to section 3 production preconditions as a required gate before release.

## 3. Roadmap
Add one line under the 41B.1A entry: account deletion cascade intentional, pregnancy-level RESTRICT, runtime compatibility pending application; integrity test added as an application gate. Decision unchanged: 41B.1A IMPLEMENTATION BUILT / APPLICATION BLOCKED. 41B.1B not started.

## Unchanged
Migration SQL, static SQL tests, the delete-account function, database, UI, deployment. Customer rows read: 0.
