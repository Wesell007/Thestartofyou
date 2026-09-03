# AIC-3 — Permissioned Companion Memory (controlled MVP)

Build-mode approval is registered against this plan. Approving it starts implementation; no further planning pass follows.

## Pre-implementation audit (verified)

- `/prototype/memory-settings` is front-end only: local state, synthetic items, no Supabase, no fetch, no storage, `noindex`, companion suppressed. It stays unchanged and unlinked.
- No production memory storage exists. Nothing in `profiles` overlaps except `companion_name`, `companion_tone`, `baby_illustration_style`, which stay with `useCompanionIdentity`.
- `/account` and `/account-settings` both render `AccountSettings.tsx`, already sectioned (Your companion, Download your data, Current journey, Delete account) — the production home for memory management.
- `ai-search` is anonymous today: `useAISearch` sends the publishable key as `Authorization`, no user is verified, rate limiting is by hashed IP.
- `delete-account` verifies the caller's JWT and calls `auth.admin.deleteUser`, so `on delete cascade` removes memory with the account.
- AIC-2's `journeyContextContract.ts` / `aiJourneyContext.ts` stay the journey layer; memory never enters them.
- The model runtime is plain SSE text with no structured tool/metadata channel, so companion-proposed memory is deferred (`confirmed_suggestion` not implemented, usage count 0).

## 1. Migration (one)

`public.companion_memories`: `id`, `user_id uuid not null references auth.users(id) on delete cascade`, `category companion_memory_category not null`, `value text not null`, `normalised_value text` **generated/derived server-side**, `source companion_memory_source not null`, `created_at`, `updated_at` (+ `set_updated_at` trigger).

- Categories: `preference | personal_detail | plan | relationship | support_preference | other`. No clinical categories.
- Sources: `explicit_command | settings` only.
- `normalised_value` is derived by the database from `value` (stored generated column, or a `BEFORE INSERT OR UPDATE` trigger if the normalisation needs immutability-unsafe functions). The client never supplies it.
- `CHECK` on trimmed `value` length 1–240.
- Unique index on `(user_id, normalised_value)` for exact duplicate prevention.
- Row cap of 50 per user, enforced by a trigger that takes a per-user advisory lock so concurrent writes cannot exceed it.
- A narrow credential-shaped blocker trigger (obvious password/token/key/card patterns). Documented as a backstop only — the richer policy lives in the application, with no claim that regex classifies sensitive data completely.
- `GRANT SELECT, INSERT, UPDATE, DELETE TO authenticated`, `GRANT ALL TO service_role`, no `anon`. RLS enabled with four owner-only policies on `auth.uid() = user_id` (with `WITH CHECK` on insert/update).

## 2. Application layers

- `src/lib/companion/memory/companionMemoryPolicy.ts` — pure: normalisation, category validation, length rules, prohibited-content checks (credentials/secrets, and clinical/diagnostic content, including refusing to turn "I might have anxiety" into a stored fact), duplicate rules, deterministic update eligibility. No Supabase, React or AI.
- `src/lib/companion/memory/memoryIntent.ts` — pure, precision-first detection of "remember that X", "please remember X", "forget X", "forget that". Ambiguous input never mutates; it either continues as ordinary conversation or asks.
- `src/lib/companion/memory/companionMemoryRepository.ts` — the only browser Supabase memory CRUD: `list`, `create`, `update`, `delete`. Uses session identity plus RLS; never accepts a caller-supplied `userId`.
- `src/lib/companion/memory/useCompanionMemoryInteraction.ts` — one shared conversational path used by both `CompanionPanel` and `AskPage`. No parsing duplicated per surface.

## 3. Conversational flow

Explicit command → intercepted before any model call → policy check → pending candidate in React state only → confirmation card ("Remember this" / "Cancel") → confirm writes exactly one row; cancel writes none. Prohibited commands are rejected locally and never sent to the model. Anonymous users get a plain sign-in explanation and no storage of any kind. Forget acts only on an unambiguously identified memory; otherwise it asks or points to the settings section. Contradiction replacement only when the target memory is matched exactly.

## 4. Server retrieval

`useAISearch` sends the current Supabase access token as `Authorization` when a session exists, keeping the publishable key as `apikey`; anonymous requests stay byte-identical to today. `ai-search` verifies the token with Supabase auth and, on success, queries `companion_memories` through a **user-scoped client carrying that token so RLS stays active** — no service role, no client-supplied user id. Invalid or expired tokens fall back to AI without memory; normal AI never fails because of memory.

Bounded rendering: at most 8 memories, 240 chars each, 800 chars total; deterministic selection by category priority (`preference`, `support_preference`, then the rest) then `updated_at` descending, then `id` for stability. Rendered as a separate `<permissioned_memory>` block with narrow trusted instructions (user-approved details, use only when relevant, current message wins, authoritative journey context wins on stage facts, memory is not medical truth, never reveal internal metadata, safety overrides personalisation). No IDs, sources or timestamps. Precedence order preserved: current message → journey context → memory → page/entry context → general knowledge.

## 5. Feature gating

Two minimal switches, no framework: `VITE_COMPANION_MEMORY_ENABLED` (client UX: settings section and conversational capture) and `AI_MEMORY_ENABLED` (server retrieval). Both default off, so the implementation can ship with production memory disabled until the privacy/legal release gate clears. They are read from one shared constant per side so the two can never disagree in a way that hides injected memory.

## 6. UI

New "What your companion remembers" section in `AccountSettings.tsx` (serving both mounted paths): list, empty state, inline edit, delete via the existing `ConfirmDialog`, loading and error states, plain language, no IDs or provenance. Optional manual add using `source = settings` only if it fits the existing section pattern without extra scope; the report states whether it shipped. Confirmation card in the companion surfaces. No navbar, homepage or unrelated redesign. Verified at 1280px and 390x844 including wrapping, focus and overflow.

## 7. Docs and ADRs

New `docs/ai/companion-memory.md`; updates to `companion-architecture.md`; explicit supersession notes in `memory-design.md`, `memory-schema-rls-design.md`, `memory-mvp-readiness.md`, `release-gate.md` that separate the superseded product/engineering block from the still-outstanding production privacy/legal release gate. Nothing historical is erased. ADR-AIC3-01 … ADR-AIC3-08 recorded, including the deferral of model-proposed suggestions.

## 8. Tests and proofs

Focused tests across intent detection, no-write on ordinary messages, credential interception (and non-transmission to the model), clinical rejection, pending/confirm/cancel write counts, anonymous unavailability, settings list/edit/delete, duplicate prevention, deterministic update, ambiguous contradiction and ambiguous forget both refusing to guess, block separation, precedence instructions, prompt budget, no raw memory logging, and grounding/safety/identity unchanged. Cross-user SELECT/INSERT/UPDATE/DELETE rejection proven with two real test users, cleaned up afterwards. Runtime proofs that a deleted memory disappears from the next authenticated request and an edited memory replaces the old value.

## Out of scope

AIC-4 conversation persistence, AIC-5 emotional modelling, AIC-6/7 voice, embeddings/pgvector, proactive nudges, grounding governance (`30B-source-routing-v1`, 0 candidates, 0 approvals), NHS routing, identity fields, journey tables, sitemap, robots.

## Validation and closure

`npm test`, `npm run lint` (must remain 1 pre-existing error / 10 warnings), `npm run typecheck`, `npm run build`; one migration applied; only `ai-search` deployed. The report separates AIC-3 engineering closure from production memory enablement, which stays gated. AIC-4 is not started.
