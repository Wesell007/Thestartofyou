# AIC-JA2-M1 — Inert Schema Readiness

One additive column, nothing else. No deployment, no flag change, no behaviour change.

## 1. Managed migration (single statement)

```sql
ALTER TABLE public.profiles
  ADD COLUMN companion_journal_context_enabled boolean NOT NULL DEFAULT false;
```

No tables, policies, grants, triggers, functions or indexes. Not batched with anything else. Applied through the platform migration workflow only.

## 2. Post-migration verification

Read back from the database: column exists, type boolean, NOT NULL yes, default false, all existing profile rows false, `profiles` policies unchanged, no unrelated schema drift. No customer journal text is read; no profile preference values are modified.

## 3. Canonical types

Let the managed workflow regenerate `src/integrations/supabase/types.ts`. Expected material change: `companion_journal_context_enabled` as `boolean` in Row and optional in Insert/Update on the `profiles` block only. If regeneration also alters unrelated generated definitions because the checked-in file is stale, stop and report the exact diff before accepting it.

## 4. Remove the temporary type workaround

In `src/lib/companion/journal/journalPermission.ts`, delete `JournalPermissionRow`, `JournalPermissionTable` and the `as unknown as` cast, calling `supabase.from("profiles")` directly with the identical select, `.eq("user_id", ...)`, `.maybeSingle()`, one-column update and thrown-error semantics. If canonical typing does not permit clean removal, the workaround stays and the exact compiler reason is reported. Typing is never weakened to force removal.

## 5. Documentation

Update `docs/ai/aic-ja2-journal-context.md` so schema readiness and feature activation are clearly distinct: schema ready YES, migration applied YES, feature active NO, server flag OFF, client flag OFF, backend deployed NO, frontend deployed NO, legal/privacy gate OPEN.

## 6. Explicitly unchanged

`aiJournalContext.ts`, `enrichmentSafety.ts`, `enrichmentRendering.ts`, pregnancy week logic, `ai-search` ordering, AIC-5, allowlists, episode isolation, header and transparency semantics, J2–J5, memory, history, grounding, media, analytics, voice. JA3 not started. Voice paused. Neither journal flag is enabled, not even temporarily.

## 7. Revalidation

`npm test` (before/after arithmetic, 0 timeouts), typecheck twice, direct Deno checks of `ai-search/index.ts`, `aiJournalContext.ts`, `pregnancyWeek.ts`, `enrichmentSafety.ts`, `enrichmentRendering.ts`, lint against the known baseline (1 error, 10 warnings, 0 new), and build.

## 8. Report

Return the full 105-field AIC-JA2 report plus the schema-readiness evidence, then stop.
