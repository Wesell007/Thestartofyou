# AIC-JA2 — Closure Remediation Only

Two missing closure artefacts, no behaviour change, no deployment, no migration execution, both journal flags stay OFF.

## 1. Migration file as a source artefact

Create one new file in `supabase/migrations/`, matching the existing timestamp naming convention (`YYYYMMDDHHMMSS_<uuid>.sql`), containing exactly:

```sql
ALTER TABLE public.profiles
  ADD COLUMN companion_journal_context_enabled boolean NOT NULL DEFAULT false;
```

Nothing else: no table, policy, grant, trigger, function, index, or unrelated change. Written with the file-write tool only — the migration execution tool will not be used, so nothing runs against the database. Migration applied: NO.

## 2. Canonical Supabase type

In `src/integrations/supabase/types.ts`, add to the `profiles` block only:

- `Row`: `companion_journal_context_enabled: boolean`
- `Insert`: `companion_journal_context_enabled?: boolean`
- `Update`: `companion_journal_context_enabled?: boolean`

Alphabetical placement after `companion_tone`, matching generated-type conventions. No other table or definition touched.

Then remove the temporary local shape in `src/lib/companion/journal/journalPermission.ts` (the `JournalPermissionRow` / `JournalPermissionTable` interfaces and the `as unknown as` cast), calling `supabase.from("profiles")` directly with the same select, `.eq("user_id", ...)`, `.maybeSingle()`, and the same one-column `.update()`. Same runtime behaviour, same thrown errors, same narrow single-column write. Existing tests mock this module, so their expectations are unchanged. If removing the workaround changes typing behaviour in any way, the workaround stays and the reason is reported.

## 3. Explicitly unchanged

`aiJournalContext.ts`, `enrichmentSafety.ts`, `enrichmentRendering.ts`, pregnancy week logic, `ai-search` safety ordering, allowlists, episode isolation, header semantics, Account copy, transparency UI, J2–J5, memory, history, grounding, voice, media, analytics.

## 4. Revalidation

`npm test` (report before/after counts and timeouts), typecheck twice, direct Deno checks of `ai-search/index.ts`, `aiJournalContext.ts`, `pregnancyWeek.ts`, `enrichmentSafety.ts`, `enrichmentRendering.ts`, lint (expect the known baseline: 1 error, 10 warnings, 0 new), and build.

## 5. Report

Return the full 105-field AIC-JA2 completion report, then stop. Target closure: AIC-JA2 — ENGINEERING CLOSED PASS; journal text awareness engineering-ready, production OFF, migration not applied, nothing deployed.
