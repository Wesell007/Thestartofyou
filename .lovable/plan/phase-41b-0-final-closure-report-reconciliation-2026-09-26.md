# Phase 41B.0 — Final Closure Report Reconciliation

Reporting only. No product, database, migration, access-rule or AI changes. No deployment. 41B.1 not started.

## 1. Section 26, field by field
Return every field from the existing design documents, including the four descriptive ones: core identity problem, pregnancy entity, child relationship and context mechanism. Show how 11 + 5 + 6 + 2 = 24, and note that the categories do not overlap: each table is in exactly one.

## 2. Risk-to-design traceability
List each of the 8 active 41A findings with its severity, design response and document section. Each also shows IMPLEMENTATION REQUIRED IN 41B.1 = YES and RESOLVED IN CURRENT PRODUCT = NO. Only the term DESIGN-ADDRESSED is used.

## 3. Legacy ambiguity
State from the migration plan (sections 2 and 6) that unbound legacy records:
- stay accessible;
- are never attached to a later pregnancy automatically;
- are linked only by an explicit later confirmation from the person.

Also state that pregnancies overwritten in the past cannot be reconstructed.

## 4. Access-rule confirmation (per operation)
Scope: the 18 existing tables touched by the design:
- the 11 pregnancy tables;
- `babies`;
- the 4 First Year child tables;
- `journeys`;
- `pregnancy_journeys` (compatibility mirror).

Evidence: the repository migrations plus a structure-only read of the live rule list (`pg_policies`). No customer rows are read. Current rules are labelled CURRENT POLICY = REPOSITORY-DEFINES / VERIFIED-PRODUCTION-STRUCTURE.

For each table, record which of view, add, edit and delete rules exist, with the exact expressions, then check:
- Add: the check on the new row requires `user_id = auth.uid()`.
- Edit: the row filter limits edits to the owner's rows, and the check on the resulting row keeps `user_id = auth.uid()`, so ownership cannot be moved to another user.
- View and delete: owner-scoped.
- Episode or baby links cannot point at another user's record. Row rules alone cannot guarantee this, so the design relies on composite links.

Composite link check against the RLS plan:
- Episodes: unique `(id, user_id)` is present (constraint 2), with composite links on the 11 tables, `babies` and `journeys`.
- Babies: no unique `(id, user_id)` and no composite `(baby_id, user_id)` links exist in the plan today. The existing validation triggers on entries, care events, memories and reminders check baby ownership, but only when a row is added or edited, not as a database relationship.
- Planned fix: add unique `(id, user_id)` on `babies` and composite `(baby_id, user_id)` links on the 4 First Year child tables. Both are marked TARGET COMPOSITE OWNERSHIP CONTROL = DESIGN-ADDRESSED / IMPLEMENTATION REQUIRED IN 41B.1 and are never described as live.
- The Section 26 new-constraint count is NOT predetermined. It comes only from the completed constraint table, which has one row per target constraint. The table:
  - splits the grouped episode links into one row per table;
  - counts the episode `(id, user_id)` uniqueness separately;
  - adds the `babies (id, user_id)` uniqueness and the 4 baby links;
  - lists every other designed constraint individually.

  No earlier headline number (9, 11 or any other) is kept unless the table produces it. Outputs: New constraints proposed = X and Constraints changed / removed = Y.
- Optional baby links: where `baby_id` is meant to be empty (family-scoped memories, reminders not tied to one baby), the composite link applies only when a baby is set, and it then blocks other users' babies. When empty, the row's user-level ownership rules protect it. An empty link is not counted as a failure.

Outcome rules:
- If any rule is missing a required row filter or row check (for example, an edit rule with no check on the resulting row), do not keep 0. Name each table and rule, add its replacement to the RLS plan and revise the Section 26 count.
- Only the RLS plan document and the affected Section 26 counts may change. No rule or database change is applied.

## 5. Decision and closure
Keep READY FOR 41B.1 only if all 8 findings have concrete controls and step 4 reveals no open decision. Otherwise return DESIGN BLOCKED and name the missing decision. Return the supplied closure wording only on pass, and record the result in the Phase 41B.0 roadmap entry.

## Final reconciliation safeguards
**A. How the rules work together.** List every relevant rule with:
- its name, table, operation and roles;
- whether it is permissive or restrictive;
- its row filter and new-row check.

For edit (UPDATE) rules only: where a rule has a row filter (USING) but no explicit new-row check (WITH CHECK), record whether Postgres uses that filter as the check on the edited row under the effective rule set. This is not applied to add (INSERT) rules. For adds, protection must come from an INSERT or ALL rule whose effective WITH CHECK protects the new row. Evaluate the full rule set by table, operation, role, mode, USING and WITH CHECK, combining several rules on the same operation (permissive by OR, restrictive by AND) before assigning YES or NO.

For each affected table, answer separately:
- VIEW OWNER-SCOPED
- ADD NEW-ROW OWNERSHIP PROTECTED
- EDIT EXISTING-ROW OWNERSHIP PROTECTED
- EDIT RESULTING-ROW OWNERSHIP PROTECTED
- DELETE OWNER-SCOPED (YES, NO or NOT APPLICABLE)

Any gap names the exact rule or combination and is fixed in the RLS plan.

**B. Constraint table.** This replaces every earlier assumed or grouped count. Write one row per actual target constraint, with:
- CONSTRAINT, TABLE and PURPOSE;
- PREVIOUSLY COUNTED IN 41B.0;
- NEWLY ADDED BY THIS RECONCILIATION;
- TARGET ONLY = YES.

Episode ownership links:
- Do not assume a number. Read the target design and list every table meant to have a composite `(episode, user_id)` link.
- Return "Episode composite ownership links = X" with the exact table list, and derive the count only from that list.
- If the migration plan and the RLS plan disagree on which tables get the link, reconcile the documents first and record the corrected design count. For example, the RLS plan adds `babies` and `journeys`, which the migration plan's list of 11 does not name.

Separately list:
- the episode `(id, user_id)` uniqueness;
- the `babies (id, user_id)` uniqueness;
- each of the 4 First Year `(baby_id, user_id)` links;
- every other designed target constraint.

Derive "New constraints proposed = X" and "Constraints changed / removed = Y" from the completed table. No earlier figure (9, 11, 12, 13) is kept unless the table produces it. Update the RLS plan, and the migration plan if needed, plus the Section 26 figures to match. No database constraint is created or changed.

**C. Evidence.** Structure-only catalog reads: `pg_policies`, `pg_constraint`, `pg_indexes`. Customer rows read: 0. Labels:
- CURRENT POLICY = REPOSITORY-DEFINES
- CURRENT POLICY = VERIFIED-PRODUCTION-STRUCTURE
- TARGET COMPOSITE OWNERSHIP CONTROL = DESIGN-ADDRESSED

No target constraint is described as live.

**D. Closure gate.** READY FOR 41B.1 only if all of these hold:
- all 24 tables reconcile (11 + 5 + 6 + 2);
- all 8 findings have controls;
- the combined access rules have been checked;
- cross-user ownership is protected by design for both pregnancies and children;
- the constraint count reconciles;
- no decision remains open.

Otherwise DESIGN BLOCKED, naming the exact unresolved decision. 41B.1 stays NOT STARTED.
