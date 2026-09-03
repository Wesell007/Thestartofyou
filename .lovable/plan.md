# AIC-3 — Permissioned Companion Memory

## Pre-implementation audit (verified before this plan)

**What exists today**

- `/prototype/memory-settings` (`src/pages/MemorySettingsPrototype.tsx` + `src/components/memory-prototype/*`) is a front-end-only prototype: local React state, synthetic items, no Supabase, no fetch, no storage, `noindex`, companion suppressed, and eleven tests that lock those guards.
- Design docs already exist and are docs-only: `memory-design.md` (taxonomy, permission levels), `memory-schema-rls-design.md` (proposed three tables, enums, triggers, RLS — all pseudo-SQL, never applied), `memory-mvp-readiness.md` (Phase 29J gate marked NOT READY), `memory-settings-prototype.md`, `release-gate.md` memory gate.
- No memory table exists in the database. Nothing in `profiles` overlaps with memory except `companion_name` / `companion_tone` / `baby_illustration_style`, which stay with `useCompanionIdentity`.
- `/account` (canonical) and `/account-settings` both render `AccountSettings.tsx`, already sectioned: Your companion, Download your data, Current journey, Delete account. This is the natural home for memory management.
- `ai-search` never receives a user JWT today: `useAISearch` sends the publishable key as `Authorization`. The function verifies no user, rate-limits by hashed IP, and works fully anonymously.
- `delete-account` verifies the caller's JWT, clears storage, then `auth.admin.deleteUser` — so a `user_id` foreign key with `on delete cascade` removes memory automatically.
- `journeyContextContract.ts` / `aiJourneyContext.ts` (AIC-2) are the structured journey layer; memory must not enter them.

**Reuse decision:** reuse the prototype's copy, tone and component shapes; do not promote the prototype route. Build the production surface inside Account settings. No existing table is suitable, so one new table is required.

**Conflict to settle at approval:** the earlier 29H/29I/29J documents hold memory behind an open legal/privacy gate and define an enum with no conversation-derived source. AIC-3 explicitly approves explicit, user-commanded memory. This plan proceeds on AIC-3's instruction and supersedes those docs, recording the supersession in the docs themselves rather than silently ignoring them. Sensitive/clinical content stays out of memory, matching the earlier design.

## What gets built

### 1. Database (one migration)

`public.companion_memories`

- `id uuid pk`, `user_id uuid not null references auth.users(id) on delete cascade`
- `category` enum `companion_memory_category`: `preference | personal_detail | plan | relationship | support_preference | other`
- `value text` (1–240 chars), `normalised_value text` (lowercased/trimmed, used for duplicate detection)
- `source` enum `companion_memory_source`: `explicit_command | confirmed_suggestion | settings`
- `created_at`, `updated_at` (+ existing `set_updated_at` trigger)

Plus: `GRANT SELECT, INSERT, UPDATE, DELETE ... TO authenticated`, `GRANT ALL ... TO service_role`, no `anon` grant, RLS enabled, four owner-scoped policies (`user_id = auth.uid()` on select/insert/update/delete, with `with check` on write paths), a unique index on `(user_id, normalised_value)`, a per-user row cap and a blocker trigger rejecting credential/secret-shaped and clinical-diagnosis-shaped values. No status column, no transcript, no journey duplication, no provenance beyond `source`.

### 2. Data + domain layers

- `src/lib/companion/memory/companionMemoryRepository.ts` — the only place that touches Supabase for memory: `listMemories`, `createMemory`, `updateMemory`, `deleteMemory`, all relying on RLS and the session user, never a client-supplied id.
- `src/lib/companion/memory/companionMemoryPolicy.ts` — pure logic: category validation, normalisation, length caps, prohibited-content rejection (passwords, tokens, card numbers, keys), duplicate resolution, update-instead-of-duplicate rules for contradictory preferences.
- `src/lib/companion/memory/memoryIntent.ts` — pure, deterministic detection of an explicit "remember that…" / "forget that…" command from the user's own message. Application logic, not the model, decides whether a write may happen.

### 3. Permission flow (no silent memory)

- Explicit command: user says "remember that …" → deterministic parse → a **pending candidate in React state only** → an inline confirmation card showing exactly what would be saved → save on confirm, nothing on cancel.
- Explicit confirmation: where the companion proposes a memory, the same card is used; ambiguous "okay" never counts — only pressing the confirm control does.
- Ordinary conversation performs zero writes. Model output can never trigger a mutation.
- Anonymous users get a plain message that remembering needs an account, with a sign-in link. No localStorage memory.
- Forget: explicit delete of an identified memory; ambiguity asks which one.

### 4. Retrieval into the model (server-side, verified identity)

`useAISearch` sends the user's Supabase access token in `Authorization` when a session exists, otherwise the publishable key exactly as today. `ai-search` calls `auth.getUser()` on that token; only on success does it load that user's memories with the service role scoped to the **verified** id. No `user_id` is ever accepted from the browser and no memory content is sent from the browser. Anonymous requests behave byte-identically to today.

Bounded rendering: at most 8 memories, 240 chars each, 800 chars total, deterministic ordering (most recently updated first), emitted as a separate `<permissioned_memory>` block with its own trusted instruction text, never merged into `<structured_journey_context>` or legacy `<journey_context>`. Instructions state: user-approved details, use only when relevant, current message and authoritative journey state win, memory is not medical truth, safety overrides personalisation, never expose internal metadata.

### 5. UI (minimum)

- New "What your companion remembers" section in `AccountSettings.tsx` (both mounted paths) — list, inline edit, delete with the existing `ConfirmDialog`, empty state, error state. No IDs or provenance shown, plain wording, existing visual system, keyboard accessible, verified at 1280px and 390x844.
- Companion/Ask: only the confirmation card plus a concise success/failure line. No redesign of AskPage, CompanionPanel, launcher, navbar or homepage.
- `/prototype/memory-settings` stays exactly as it is, prototype-labelled and unlinked.

### 6. Docs and ADRs

`docs/ai/companion-memory.md` (new, full spec), `companion-architecture.md` updated, plus supersession notes in `memory-design.md`, `memory-mvp-readiness.md`, `release-gate.md`. ADR-AIC3-01 … ADR-AIC3-07 recorded.

### 7. Tests and security proof

Focused tests for: intent parsing, prohibited content, duplicates, contradictory updates, pending candidate writes nothing, confirm writes exactly one row, anonymous path, bounded prompt rendering, block separation from journey context, deletion/edit removing the old value from the rendered block, no raw memory logging, and grounding version unchanged. Cross-user isolation (read/update/delete of another user's row) is proven directly against the database with two real test users, and the rows are cleaned up afterwards.

## Out of scope (untouched)

Conversation history and thread state (AIC-4), emotional modelling (AIC-5), voice (AIC-6/7), embeddings/pgvector, proactive nudges, grounding (`30B-source-routing-v1`, 0 candidates, 0 approvals), NHS source governance, `useCompanionIdentity`, journey/profile tables, sitemap, robots, WC-1/2/3 surfaces.

## Validation

`npm test`, `npm run lint` (must stay at 1 pre-existing error / 10 warnings), `npm run typecheck`, `npm run build`; one migration applied; only `ai-search` deployed; desktop and mobile checks; then the 64-point completion report. AIC-4 is not started.
