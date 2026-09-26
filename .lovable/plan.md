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
- Planned fix: add unique `(id, user_id)` on `babies` and composite `(baby_id, user_id)` links on the 4 First Year child tables. The Section 26 new-constraint count becomes 11. Both are marked TARGET COMPOSITE OWNERSHIP CONTROL = DESIGN-ADDRESSED / IMPLEMENTATION REQUIRED IN 41B.1 and are never described as live.

Outcome rules:
- If any rule is missing a required row filter or row check (for example, an edit rule with no check on the resulting row), do not keep 0. Name each table and rule, add its replacement to the RLS plan and revise the Section 26 count.
- Only the RLS plan document and the affected Section 26 counts may change. No rule or database change is applied.

## 5. Decision and closure
Keep READY FOR 41B.1 only if all 8 findings have concrete controls and step 4 reveals no open decision. Otherwise return DESIGN BLOCKED and name the missing decision. Return the supplied closure wording only on pass, and record the result in the Phase 41B.0 roadmap entry.
