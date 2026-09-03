# Companion memory (AIC-3)

Status: implemented, feature gated, not released.
Supersedes the design-only parts of `memory-design.md` and `memory-schema-rls-design.md`.
Does **not** supersede the release gate: `memory-mvp-readiness.md` remains open, and the
external legal and privacy review recorded there is still outstanding. AIC-3 ships the
mechanism, not the launch.

## What memory is here

Short, explicit, reversible details someone has asked the companion to keep. Nothing else.

Memory is **not** conversation history, not a transcript, not a summary of what was said, not
an inference about someone's life, and not part of the journey context. There are no vectors,
no embeddings and no semantic recall.

## Two flags, deliberately separate

| Flag | Where | Controls |
| --- | --- | --- |
| `VITE_COMPANION_MEMORY_ENABLED` | client | whether memory UX exists at all: the account settings section and the conversational capture flow |
| `AI_MEMORY_ENABLED` | edge function | **authoritative.** Whether anything kept can be retrieved and reach the model |

They are configured independently and can technically disagree. That is intended: someone can
be able to see and delete their memories while the companion is not using them. Release means
deliberately turning both on, after the legal and privacy gate closes.

## How something gets remembered

1. Someone writes an explicit command: "remember that I prefer short answers".
2. `memoryIntent.ts` recognises it deterministically. Precision first: the command must be
   written plainly. Anything else is ordinary conversation and is sent to the companion as
   usual. Ordinary conversation can never produce a write.
3. `companionMemoryPolicy.ts` evaluates the candidate: length, credentials, clinical content,
   category. Rule-based, no second model call.
4. The candidate is shown for confirmation. It lives in React state for that moment only.
5. On confirm, exactly one row is written. On cancel, nothing is stored anywhere.

The model is never in this loop. It does not propose memories, does not classify them, and its
output is never parsed for anything to store. Model output cannot authorise a write.

The other source is the account settings form, where someone types a memory themselves. Those
two — `explicit_command` and `settings` — are the only source values that exist. A
`confirmed_suggestion` source is deliberately deferred: suggestions do not exist yet, so the
value does not exist either.

## What is refused

- Passwords, PINs, API keys, tokens, card and sort codes, security answers, login details.
  Refused whatever the feature flag says, and a refused command is not forwarded to the model
  as a fallback: it stops at the application.
- Clinical, diagnostic and medication content. Health history is out of scope for this MVP.
  The person can still talk about any of it; it simply is not kept.
- Anything longer than 240 characters, and anything empty.

## Storage

One table, `companion_memories`:

- ownership is database-owned: `user_id` defaults to `auth.uid()` and the client never sends
  one. The insert policy checks it independently.
- `normalised_value` is a generated column derived by the database, so a modified client
  cannot fabricate one to slip past the unique index on `(user_id, normalised_value)`.
- owner-only row-level security for select, insert, update and delete.
- ownership cannot be changed by an update.
- a trigger caps each person at 50 rows, taking an advisory lock so concurrent inserts cannot
  race past it.
- a credential-pattern trigger is a database-side backstop under the application policy.
- deleting an account cascades every memory away with it.

## What reaches the model

Retrieval runs in `ai-search`, and only for a request that is actually going to the model:
after validation, rate limiting, the urgent-support path and the kill switch. Urgent and
paused answers never trigger it.

- `AI_MEMORY_ENABLED` must be true, or nothing is queried.
- the caller's access token is verified with Supabase auth. A user id is never accepted from
  the request body, and the anonymous publishable key is not a session.
- the read goes through that verified user's own token, so row-level security applies. The
  service role is not used for memory.
- at most 8 memories, each capped at 240 characters, 800 characters rendered in total.
- values are escaped so no stored text can close the block, forge a delimiter or open a
  trusted section.
- rendered as a separate `<permissioned_memory>` DATA block, distinct from the AIC-2
  `<structured_journey_context>` block, with its own trusted instructions in the system prompt.
- any problem fails open: the answer is produced without memory rather than not at all.

No identifiers, categories, sources or timestamps are rendered. No memory value is ever logged.

## Precedence

1. Safety guidance.
2. The current message.
3. Saved journey details (stage, week, baby age) — authoritative, and a memory never overrides
   them.
4. Remembered details, used only where they genuinely help.

## Management

`/account` → "What your companion remembers": see everything kept, edit it, remove it, add
something. Memories are included in the data export. Deleting the account removes them.

## Out of scope for AIC-3

Suggested memories, conversation history, proactive messages, emotional modelling, voice.
