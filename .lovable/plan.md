# AIC-4 — Conversation Continuity

One conversation system shared by the site-wide companion panel and `/ask`. No new long-term memory. AIC-3 memory flags stay OFF. Persistent history ships behind its own OFF-by-default flags.

## Audit findings (verified in code)

- `CompanionProvider` holds panel messages in local React state (`CompanionTurn[]`, `{id, role, text, clarification?}`), plus `lastQuestion`, a `committedRef` guard that commits a finished stream once, and `useAISearch` for streaming/abort/retry. State dies on provider unmount; it survives route changes because the provider is mounted globally, and it survives panel close (only `open` toggles).
- `AskPage` has no message list at all. Each question is a fresh render driven by `?q`/router state; a `lastQueryRef` request key guards duplicate submits; `reset()` then `ask()` per question.
- Pseudo-continuity lives in `AskPage.goToQuestion`: it concatenates `Previous question: …` / `Previous answer: …` into the freeform `context` string and passes `previousQuestion` in router state for a "Back to previous question" button. Three inline cards (`TTCAskCompanionCard`, `SectionAskAI`, `FirstYearAskCompanion`) do their own local `Previous answer:` append — those are inline single-shot CTAs, out of AIC-4 scope, and stay unchanged.
- `askNavigation` carries `{question, context}` only. `companionRequest` builds `{query, context?, mode, journeyContext?}`. `useAISearch` posts to `ai-search` with the session JWT when signed in.
- `ai-search` order today: CORS → body validation → rate limit → kill switch → urgent match → journey context → memory (flag-gated) → grounding → model → SSE. No conversation table exists in the database.

## What gets built

### 1. Shared conversation runtime (client)

- New `CompanionConversationProvider` mounted alongside `CompanionProvider` (or folded into it) owning: active conversation id, `CompanionMessage[]`, send, streaming assistant text, new conversation, clear/delete, restore.
- Canonical contract: `{ id, role: "user" | "assistant", content, createdAt, status?: "streaming" | "complete" | "error", clientMessageId?, clarification? }`. Nothing hidden is stored — no prompts, journey context, memory, tokens.
- `CompanionProvider` and `AskPage` both read/write this one runtime. No panel-local transcript, no `/ask`-only transcript.
- `useAISearch` stays the only AI transport; the request gains an optional `conversationId` and, for anonymous users only, a bounded `sessionHistory` array.

### 2. Anonymous continuity

Provider state covers route changes and panel close/reopen. Refresh is covered by one narrowly scoped `sessionStorage` key holding only visible user/assistant messages, capped (20 messages, 2000 chars each, ~20 KB total), cleared with the browser session. No `localStorage`, no server rows for anonymous users.

### 3. Authenticated persistence (behind flags)

New tables `public.companion_conversations` and `public.companion_messages`, AIC-3 ownership pattern (`user_id default auth.uid()`), owner-only RLS, GRANTs, cascade from conversation → messages and from `auth.users`. Active conversation = most recently active non-archived conversation, or the client-held id validated against ownership server-side.

`ai-search` becomes server-authoritative for authenticated history: verify JWT, verify conversation ownership, load bounded prior messages under RLS, persist the user turn idempotently by `client_message_id`, persist the assistant turn only on a completed stream. Foreign `conversationId` → treated as no history (403-equivalent, documented), never a fallback read of another user's thread.

### 4. Prompt integration

Separate `<conversation_history>` block, escaped content, no internal ids. Bounded: 10 messages, 1200 chars per message, 4000 chars rendered. Trusted instructions state history is prior context and the current turn wins. Precedence unchanged: system/safety > current request > journey context > memory > history > page/entry context.

### 5. Pseudo-continuity removal

Once real history parity passes, remove the `Previous question:` / `Previous answer:` concatenation and the `previousQuestion` router-state field from `AskPage`/`askNavigation`. Only one continuity mechanism runs.

### 6. Minimal UI

`New conversation` and `Clear/Delete conversation` on both surfaces (panel footer replaces the existing "Start again"; `/ask` gets the same compact affordances), a restoring state, and a persistence-failure line. Single active conversation + New conversation is the MVP; no sidebar. No redesign of AskPage, panel, launcher, navbar or homepage.

### 7. Flags, export, deletion

`VITE_COMPANION_HISTORY_ENABLED` (client UX) and `AI_CONVERSATION_HISTORY_ENABLED` (server authority), both default OFF. Conversations added to the account data export and covered by account deletion cascade (verified against `delete-account`). No raw message content logged anywhere.

## Verification

Two isolated test users prove no cross-user SELECT/INSERT/UPDATE/DELETE and no foreign-`conversationId` history leak; probe data cleaned. Runtime proofs for delete, double-submit idempotency, aborted stream, provider failure. Desktop 1280 and mobile 390x844 checks for handoff both directions, close/reopen, refresh, new/clear, streaming, no duplicates, no overflow.

Focused tests per the AIC-4 list (runtime sharing, handoffs, anonymous session/refresh, authenticated restore, bounded history, escaping, idempotency, streaming persistence, RLS, export, cascade, separation of journey/memory, safety, grounding, identity). Then `npm test`, `npm run lint`, `npm run typecheck`, `npm run build` against the 79-file/776-test baseline with 0 new lint findings.

Docs: update `docs/ai/companion-architecture.md`, create `docs/ai/companion-conversations.md`, add ADR-AIC4-01 … ADR-AIC4-08. Deploy only `ai-search` (plus export/delete functions only if they genuinely change). Grounding, NHS routing, identity, journey context and memory gating stay untouched.

Closes as `AIC-4 ENGINEERING — CLOSED PASS` with `PRODUCTION CONVERSATION HISTORY — GATED`. Full 77-point report returned; AIC-5 not started.
