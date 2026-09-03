# Companion conversation continuity (AIC-4)

## What this is

One shared conversation runtime behind both companion surfaces: the site-wide
panel and the full `/ask` page. A conversation behaves the same wherever it
happens — same ordering, streaming, bounds, clearing and errors.

It is continuity, not memory. Nothing said in a conversation becomes a saved
preference. Long-term memory remains AIC-3: explicit, confirmed and reversible.

## The three layers, kept apart

| Layer | Source | Where it lives |
| --- | --- | --- |
| Conversation history | what was said in this thread | `<conversation_history>` |
| Journey context (AIC-2) | saved journey data | `<structured_journey_context>` |
| Permissioned memory (AIC-3) | explicitly saved preferences | `<permissioned_memory>` |

They are never merged into one blob, and each is rendered as its own clearly
named data block with its own trusted instructions.

## Continuity modes

**Session (default, everyone).** The visible transcript is held in React state
and mirrored into one `sessionStorage` key so a refresh does not lose the
thread. It ends with the browser session and is cleared on sign-in, sign-out
and "Start again". No database row is created, so an anonymous visitor never
produces stored data.

**Persistent (gated, signed in).** Requires `AI_CONVERSATION_HISTORY_ENABLED`
on the server *and* `VITE_COMPANION_HISTORY_ENABLED` in the client, plus an
explicit `historyMode: "persistent"` request and a verified session. Both
default off. Conversations are account-owned; the server, not the browser,
decides what history reaches the model.

## Boundaries

- Ownership is the database's: `user_id` defaults to `auth.uid()` and is never
  accepted from a request. Message rows are additionally checked against the
  owning conversation by RLS and a trigger.
- A conversation id the caller does not own is refused, never adopted.
- The user turn is stored idempotently by client message id, so a retry cannot
  duplicate it. Only a stream that completes stores an assistant turn.
- Urgent and paused answers are still visible in a stored thread; establishing
  the conversation never influences safety classification, and history is not
  loaded before it.
- Prior turns are escaped before rendering: a stored turn cannot close the
  block, forge a delimiter or issue an instruction.
- Bounds: 10 messages, 1,200 characters each, 4,000 rendered characters.
- Transcript text is never logged, and never sent to analytics.
