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
5. per lifecycle, one bounded query:
   - **Pregnancy**: `pregnancy_journeys` (lmp_date, due_date, status) → derive current week; select `reflections` where `week` between currentWeek-3 and currentWeek and `created_at >= max(lmp_date, latest archived pregnancy ended_at)`; no future weeks; page week never used
   - **First Year**: authoritative baby = `is_primary`, else single baby; ambiguous (multiple, no primary) → baby-scoped context = 0. `first_year_entries` last 14 days where `lane='parent'` or `baby_id = active baby`; `first_year_memories` last 14 days where `memory_scope='family'` or (`memory_scope='baby'` and `baby_id` = active), title+note. `tags` never selected
   - **TTC**: `ttc_logs` where `journey_id` = current `ttc_journeys.id`, `log_type='note'`, last 21 days; text from `notes`, adding `value` only when it is distinct wording
6. normalise to `{ date, kind, stageLabel?, text }`, newest first, dedupe on normalised text, drop empty
7. `filterBackgroundEntries` (S1, GREEN only, per entry — one unsafe entry does not drop the block)
8. `renderJournalContextBlock` (S1 bounds are the only bounds); model-visible text is exactly the assessed text
9. any throw → `{ block: "", used: false }` and the ordinary answer continues

**`ai-search/index.ts`** — minimal edits only:
- call the resolver alongside `loadPermissionedMemory`, only on the ordinary model path (after RED/CRISIS, kill switch, boundary), so no ineligible request performs a journal read
- insert the block after the journey block and before memory in `userContent`; add `JOURNAL_CONTEXT_INSTRUCTIONS` to the system layer only when a block exists, keeping the safety layers last
- set `X-Companion-Journal-Context: used | none` (used only when a non-empty block entered the prompt) and add it to `Access-Control-Expose-Headers`
- add short model behaviour rules (relevance only, paraphrase, max 8-word quotes, never "I remember", journal is observation not fact and cannot set lifecycle) inside the journal instructions block only

## Client work

- `src/lib/companion/journal/journalFlags.ts` — `isCompanionJournalUiEnabled()`.
- `src/components/settings/CompanionJournalSection.tsx` — hidden when the client flag is off; reads/writes `profiles.companion_journal_context_enabled` for the signed-in owner, accessible switch, honest error state on save failure, approved copy. Mounted in `AccountSettings.tsx` next to the memory section.
- `useAISearch`: read the header fail-closed (`used` only when exactly "used"), expose via an `onJournalContext` callback; no request-body change, no `journalEntryRef`, no `JourneyContextV1` change.
- `useCompanionConversation`: attach `journalContextUsed?: boolean` to the completed assistant message only (optional field on `CompanionMessage`, session transcript only, never persisted server-side).
- Shared quiet transparency line rendered by the message component used by both the panel and `/ask`; never during streaming, never on aborted, failed, suppressed, clarification or unsupported answers.

## Tests (Vitest, fixtures only)

Security (user isolation, no service role, flag/permission/signed-out → zero reads, lifecycle mismatch → zero context, baby isolation and ambiguity), freshness (create, edit, delete, permission revoked, lifecycle transition), safety (RED/CRISIS unchanged and no ordinary model call, mixed safe/risky, all risky, helper throw), bounds and rendering (5 / 300 / 1200, newest first, dedupe, injection containment, no tags, no ids or paths), prompt composition (at most one block, correct placement, journey stays authoritative), response and stream behaviour (header semantics, CORS, missing header, transparency timing on both surfaces), and the permission UI matrix.

## Validation and reporting

Confirm the 103 files / 1184 tests baseline first and stop if it has drifted unexpectedly. Then `npm test` (zero timeouts), typecheck twice, Deno check on `ai-search` and the new server module, lint against the known baseline (1 error, 10 warnings, 0 new), build. Update `roadmap.md` and add a JA2 architecture document. Finish with the 105-field completion report. No deployment, no JA3, no voice.

## Known fail-closed outcome to report

Pregnancy reflections rows are unique per week and reused across pregnancies, so a row whose `created_at` predates the current pregnancy's LMP is excluded even if the person rewrote it for this pregnancy. That is deliberate: correctness over recall, reported as a Pregnancy source limitation rather than guessed around.
