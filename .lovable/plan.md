# AIC-JA2 — Permissioned background journal awareness (engineering only)

Text-only, server-resolved, permission-gated recent journal context for the existing companion. Both feature flags stay OFF, nothing is deployed, no production migration is applied.

## What the person will see (only in engineering/test builds)

- A new Account setting, "Journal-aware companion", with the toggle "Use my journal to personalise the companion", default off, plus the supporting and reversibility copy from the brief.
- When the setting is on and the server flag is on, an answer that actually used journal text shows one quiet line under the completed reply: "Your recent journal was included as context."
- Nothing else changes: same two answer places (the panel and /ask), same starters, same next steps.

## Verified current state (read before planning)

- `ai-search` already: validates the body, runs `decideSafety(query)` first and terminally, then rate limit, conversation, boundary, AMBER, emotional guidance, grounding, then assembles `structuredJourneyContext` + `permissionedMemory` + `conversationHistory` into one user message. Journal context slots into that same ordinary-model stage only.
- `loadPermissionedMemory` is the exact precedent for this work: server env flag, bearer token, `/auth/v1/user` verification, then PostgREST reads with the user's own token (no service role), failing silently to "".
- S1 modules exist and are unused by `ai-search` today: `_shared/enrichmentSafety.ts` (`filterBackgroundEntries`, GREEN-only, fail closed) and `_shared/enrichmentRendering.ts` (`JournalContextV1`, `renderJournalContextBlock`, `JOURNAL_CONTEXT_INSTRUCTIONS`, bounds 5 / 300 / 1200).
- `profiles` has owner-only SELECT/INSERT/UPDATE policies keyed on `auth.uid() = user_id`, so a new boolean column needs **no new RLS policy**.
- Episode-association truth found in migrations:
  - `ttc_logs.journey_id` → `ttc_journeys.id`: strong identifier, safe.
  - `first_year_entries.lane` is `baby` (baby_id required) or `parent` (baby_id null) — parent scope is unambiguous by constraint; `first_year_memories.memory_scope` is `family` / `baby` / `all_babies` with a matching baby_id constraint.
  - `reflections` is `UNIQUE (user_id, week)` with no journey id, so a week row is reused across pregnancies. Immutable `created_at` plus the authoritative `pregnancy_journeys.lmp_date` (and any later `archived_journeys.ended_at` for pregnancy) is the only provable boundary. `updated_at` will not be used.

## Server work

**Flags.** `AI_JOURNAL_CONTEXT_ENABLED` (server, authoritative) and `VITE_COMPANION_JOURNAL_ENABLED` (client UI only), both default off, mirroring the memory flag files.

**Migration (created, not applied).** `ALTER TABLE public.profiles ADD COLUMN companion_journal_context_enabled boolean NOT NULL DEFAULT false;` No new policies, no grants change, no other schema change.

**New module `supabase/functions/_shared/aiJournalContext.ts`** — provider-free, no logging of content:
1. server flag on, else return `{ block: "", used: false }`
2. bearer token present and verified through `/auth/v1/user`
3. read `profiles.companion_journal_context_enabled` fresh with the user's token; false or unreadable → stop
4. read `journeys.lifecycle` (server authority). If it disagrees with `journeyContext.personal.journey`, or is absent → stop, and never override J2
5. per lifecycle, the minimum finite bounded query set (no N+1 loops, no artificial one-query purity; actual query shape reported honestly):
   - **Pregnancy**: `pregnancy_journeys` (lmp_date, due_date, status) → current week via the shared canonical week helper; latest pregnancy `archived_journeys.ended_at`; then `reflections` where `week` is between currentWeek-3 and currentWeek and `created_at >= max(lmp_date, that archived ended_at)`; no future weeks; the public route week is never used
   - **First Year**: authoritative baby = `is_primary`, else the single baby; ambiguous (several, no primary) → baby-scoped context = 0. `first_year_entries` last 14 days where `lane='parent'` or `baby_id` = active baby; `first_year_memories` last 14 days where `memory_scope='family'` or (`memory_scope='baby'` and `baby_id` = active). `memory_scope='all_babies'` is excluded
   - **TTC**: current `ttc_journeys.id`, then `ttc_logs` where `journey_id` = that id, `log_type='note'`, last 21 days; text from `notes`, adding `value` only when it is distinct wording
6. normalise to `{ date, kind, stageLabel?, text }`, newest first, dedupe on normalised text, drop empty. `kind` keeps provenance honest and distinct — "my own reflection", "note about me", "note about my baby", "family memory", "cycle note" — so family or parent material is never read as a fact about the selected baby. No `baby_id` and no ids of any sort enter the contract
7. `filterBackgroundEntries` (S1, GREEN only, per entry — one unsafe entry does not drop the block)
8. `renderJournalContextBlock` (S1 bounds are the only bounds); model-visible text is exactly the assessed text
9. any throw → `{ block: "", used: false }` and the ordinary answer continues

**Canonical week, no second formula.** Edge functions cannot import `src/`, so the exact body of `src/lib/pregnancyWeek.ts` (`pregnancyWeekFromLmp`, clamp 1-42) is ported once into `supabase/functions/_shared/`, and a parity test imports both and asserts identical output across a wide date sweep. No new or divergent derivation is written.

**Long-entry rule.** Model-visible journal characters must always be a subset of safety-assessed characters. Anything `assessEnrichmentText` rejects — including text above its raw-input bound — is dropped whole. No truncate-then-scan-the-fragment, and no rendering of text that was not itself assessed.

**Tags.** `first_year_entries.tags` may inform deterministic server-side selection only. Model-visible tag count is 0: never in `JournalContextV1`, prompt text, headers or assistant metadata.

**`ai-search/index.ts`** — minimal edits only:
- resolve journal context **only on the ordinary GREEN generative path**. Every other outcome performs zero journal-table reads and returns `none`: RED, CRISIS, rate-limited, kill switch or controlled response, clarification, unsupported, and AMBER. AMBER never uses background journal context. AIC-5 semantics are not changed to achieve this — the call simply sits after those branches have resolved, and a guard test proves zero reads for each
- insert the block after the journey block and before memory in `userContent`; add `JOURNAL_CONTEXT_INSTRUCTIONS` to the system layer only when a block exists, keeping the safety layers last
- set `X-Companion-Journal-Context: used | none` (`used` only when a non-empty block actually entered the model prompt) and add it to `Access-Control-Expose-Headers`
- add short model behaviour rules (relevance only, paraphrase, max 8-word quotes, never "I remember", journal is observation not fact and cannot set lifecycle or stage) inside the journal instructions block only

## Client work

- `src/lib/companion/journal/journalFlags.ts` — `isCompanionJournalUiEnabled()`, default OFF.
- `src/components/settings/CompanionJournalSection.tsx` — hidden when the client flag is off; reads the owner's `companion_journal_context_enabled` and writes **only that column** (narrow update, never a broad profile upsert). A failed write reverts to the authoritative stored value and shows an honest error; the UI never shows permission on when the server does not have it on. Approved copy, accessible switch. Mounted in `AccountSettings.tsx` beside the memory section.
- Regenerate only the `profiles` row types in `src/integrations/supabase/types.ts` to add the new boolean so the code compiles against the migration. No unrelated generated definitions touched; this is not applying the production migration.
- `useAISearch`: read the header fail-closed (`used` only when the value is exactly `used`), expose via an `onJournalContext` callback; no request-body change, no `journalEntryRef`, no `JourneyContextV1` change.
- `useCompanionConversation`: `journalContextUsed?: boolean` attached to that one completed assistant message only — no global journal-used state, session-only, never persisted server-side, and never carrying journal text, ids, source names or dates.
- Shared quiet transparency line rendered by the message component both surfaces use. Shown only when that assistant answer commits complete **and** the header was exactly `used`. Never during streaming, and never on aborted, failed, suppressed, terminal, clarification or unsupported answers. Revoking permission does not rewrite earlier answers.

## Tests (Vitest, fixtures only)

Security (user isolation, no service role, flag/permission/signed-out → zero reads, lifecycle mismatch → zero context, baby isolation and ambiguity), path guards (RED, CRISIS, rate limited, kill switch, clarification, unsupported and AMBER each perform zero journal reads and return `none`), freshness (create, edit, delete, permission revoked, lifecycle transition), safety (mixed safe/risky, all risky, over-long entry dropped whole, helper throw), bounds and rendering (5 / 300 / 1200, newest first, dedupe, injection containment, zero tags, no ids or paths), week parity with `src/lib/pregnancyWeek.ts` and page-week independence, prompt composition (at most one block, correct placement, journey stays authoritative), response and stream behaviour (header semantics, CORS, missing header, transparency timing on both surfaces), and the permission UI matrix including narrow-write and failed-write behaviour.

## Validation and reporting

Confirm the 103 files / 1184 tests baseline first and stop if it has drifted unexpectedly. Then `npm test` (zero timeouts), typecheck twice, Deno check on `ai-search` and the new server modules, lint against the known baseline (1 error, 10 warnings, 0 new), build. Update `roadmap.md` and add a JA2 architecture document. Finish with the 105-field completion report.

## Production state at completion

`AI_JOURNAL_CONTEXT_ENABLED` OFF, `VITE_COMPANION_JOURNAL_ENABLED` OFF, production migration not applied, no backend deployment, no frontend deployment. Engineering-ready only; legal and privacy approval still required before activation. No JA3, no voice.

## Known fail-closed outcome to report

Pregnancy `reflections` rows are unique per week and reused across pregnancies, so a row whose immutable `created_at` predates the current pregnancy's LMP (or the latest archived pregnancy boundary) is excluded even if the person rewrote it during this pregnancy. `updated_at` is never used as episode evidence. If implementation shows that boundary cannot prove current-episode ownership, the Pregnancy journal source is disabled entirely and the exact limitation reported rather than the boundary weakened.
