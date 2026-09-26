# Phase 41A — Closure Evidence Patch

Reporting only. No reruns unless the existing JSON reports lack paths. No product, database, route, UI, AI or content changes. No deployment. Outcome D unchanged. Phase 41B not started.

## 1. Exact test paths
- Read the JSON reports already generated in the reconciliation (under /tmp) and extract the full repository path (directory, filename, extension) of every unique test file.
- Group under: Pregnancy, First Year, Lifecycle / journey, Companion context, Journal context, Focused Phase 41A. Each file appears once in its group; the same file in two groups is noted, never double counted.
- Rerun a group with the JSON reporter only if its report is missing or does not have paths.
- Keep "218 / 218 unique tests PASS, 28 unique files" only if the path list adds up to exactly those totals. Otherwise report the measured figures and BLOCKED.

## 2. Data ownership counts (24-row matrix)
Classify each of the 24 objects on its own, using these rules:
- MULTI-PREGNANCY-SAFE: the record's key or foreign key identifies a specific pregnancy, so two pregnancies cannot overwrite or share it.
- MULTI-CHILD-SAFE: the record is the child, or is bound to one child by `baby_id`, or is scoped to one child explicitly, so several children stay separate.
- AMBIGUOUS OWNERSHIP: owned by the user only (or user + week) with no pregnancy or child binding, so it is unclear which pregnancy or child the record belongs to.
- These categories can overlap, so they are not added together. Return: objects audited 24, and one count each for multi-pregnancy-safe, multi-child-safe and ambiguous, plus the list of objects in each category. The earlier summary buckets are not used to work these out.

## 3. Memory delete interaction
Keep this as UNVERIFIED RUNTIME BEHAVIOUR: the schema shows a conflict between `ON DELETE SET NULL` and the CHECK that baby-scoped memories must have a baby. Nothing is claimed about the result. Outcome D does not depend on it.

## 4. Deliverables and closure
- Add the path inventory and ownership counts to the "Final evidence reconciliation" section of the Phase 41A audit document. Do not change any finding.
- Update only the Phase 41A roadmap entry, if needed.
- Return the full Section 24 report with the new fields, then the closure wording exactly as supplied, only if every gate passes. Otherwise report BLOCKED and name the gate that failed.
