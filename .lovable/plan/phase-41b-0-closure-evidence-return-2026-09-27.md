# Phase 41B.0 — Closure Evidence Return

Reporting only. No reruns of catalog queries, no design changes, no product, database, access-rule, AI, Companion, memory or grounding changes. No deployment. 41B.1 stays NOT STARTED.

## 1. 8-finding traceability table
Return the 8 active 41A findings (register rows 1 to 6, 9, 10) one by one, in the exact field format: finding, severity, STATUS = DESIGN-ADDRESSED, design response, document and section, IMPLEMENTATION REQUIRED IN 41B.1 = YES, RESOLVED IN CURRENT PRODUCT = NO.
- P0: reflections shared across pregnancies; week photos/media user+week only; toolkit records carry over; First Year setup deletes babies.
- P1: new pregnancy keeps ended status/outcome.
- P2: pregnancy from First Year without archive; Companion not scoped to pregnancy or child; no plurality field.
Totals: P0 4/4, P1 1/1, P2 3/3. The words fixed, resolved, implemented or remediated are not used for the current product.

## 2. 18-table access-rule inventory
Return each actual policy once, with table, policy name, operation, roles, mode, USING, WITH CHECK and evidence label. If a policy is FOR ALL, or several policies cover one operation, record it once and list which operations it covers. Source: the policy evidence already recorded in RLS plan section 1.1. Policy names are read from the repository migration files only; `pg_policies` is not queried again.
- Report these separately: Tables reviewed = 18; Operation-coverage positions = 72; Distinct policy objects = X. X is counted from the evidence and not forced to 72.
- Evidence label BOTH is used only where the repository and the recorded production structure agree on table, policy name and operation. Any mismatch, such as a policy renamed or dropped by a later migration, a different command or a different expression, returns DESIGN BLOCKED naming that exact mismatch. It is not silently reconciled.
- Work out each of the five per-table answers from the recorded policies (combining permissive rules with OR and restrictive rules with AND). Nothing is pre-filled. Any NO returns DESIGN BLOCKED with the table, policy and operation.
- Name the four UPDATE policies with no WITH CHECK (on reflections, week_photos, journeys and pregnancy_journeys). For UPDATE, Postgres uses the USING expression as the check on the resulting row.

## 3. Final accounting, 4. Legacy safety, 5. Change accounting
Repeat the figures in the brief, checked against the current RLS plan and migration plan: 11 + 5 + 6 + 2 = 24 with no overlap; 13 links; 26 new constraints (21 + 5); 5 changed or removed; 0 policy changes; 4 new policies on 1 new table; 2 unresolved risks. Legacy answers: YES / NO / YES / NO. Every change count is 0; deployment NO; 41B.1 NOT STARTED.

## 6. Decision
If nothing contradicts the evidence, return the supplied closure wording exactly and add it to the Phase 41B.0 roadmap entry (the only file edit). If anything does contradict it, return DESIGN BLOCKED and name the contradiction. A possible case: a migration's policy definition differs from the recorded production structure.

## Technical details
- Files read: `docs/strategy/phase41a-context-contamination-register.md`, `phase41b-*.md`, `supabase/migrations/*.sql` (policy names only).
- File written: `roadmap.md` (closure line).
