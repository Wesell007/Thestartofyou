# AIC-JA3 — Explicit "Ask about this entry"

Engineering complete. **Not active in production.** Both journal flags are off
and nothing has been deployed. The feature is inert: the code paths exist but
the gates that would allow them to read anything are closed.

| Gate | State |
| --- | --- |
| Engineering complete | YES |
| Production active | NO |
| `AI_JOURNAL_CONTEXT_ENABLED` | OFF |
| `VITE_COMPANION_JOURNAL_ENABLED` | OFF |
| Backend deployed | NO |
| Frontend deployed | NO |
| Legal/privacy activation | OPEN |


## What it is

A typed, explicit hand-off from a displayed journal record into the existing
companion runtime. The person presses "Ask about this entry" on one of their
own records; the next accepted question carries a reference to that record;
the server loads the record itself, verifies ownership and lifecycle, and may
include a bounded block of the person's own text as context for that one
answer. The click is the one-request permission: no account-level opt-in is
required.

It flows through the existing runtime — `useCompanionConversation` →
`useAISearch` → `ai-search` — and the product still has exactly two answer
surfaces (the site-wide panel and the full `/ask` page).


## The typed reference

The browser may send only this:

```ts
interface JournalEntryRefV1 {
  version: 1;
  source: "pregnancy_reflection" | "first_year_entry" | "first_year_memory" | "ttc_note";
  id: string; // UUID
}
```

Exactly three keys. No text, no `user_id`, no `baby_id`, no journey id, no date,
no week, no month, no storage path and no media.

The authoritative strict parser lives in
`supabase/functions/_shared/journalEntryRefContract.ts`. A minimal
construction-only mirror exists in
`src/lib/companion/journal/journalEntryRef.ts` so the Vite client can build a
well-formed reference without importing Deno modules; parity is proved by test
and the client type has no authority. Extra keys, unknown sources, non-UUID
ids and wrong versions all resolve to `null`, which means "no selected entry"
— the ordinary question continues.


## One-request permission semantics

1. A page renders an eligible owned record with a real stored UUID.
2. The person presses "Ask about this entry".
3. The typed reference is stored transiently in the shared companion context
   (`CompanionProvider`) as `journalEntry`, and the panel opens.
4. A visible indicator shows a generic source label ("Memory", "TTC note") —
   never the person's own words. The indicator can be removed.
5. The reference is handed to the runtime on the **next accepted user question
   only**. The runtime clears it immediately, so it can never silently attach
   to a later question.
6. A retry of that same question reuses the already-cleared reference only
   because the runtime keeps it in a request-scoped ref for the duration of
   the turn; a new question starts with no selected entry.
7. Route change, panel close, journey change or sign-in/out all clear a
   pending selection.

This is a one-request handoff, not a setting, not a subscription and not a
persistent preference.


## Server resolution

`resolveSelectedJournalEntry` in `supabase/functions/_shared/aiSelectedJournalEntry.ts`
runs only when the server feature flag is on and only after the body parser has
accepted a well-formed reference.

Identity comes only from a verified Supabase access token. No user id is ever
accepted from a request body, and the service role is never used: every read
runs through PostgREST with the person's own token, so row-level security is the
real boundary. The token is verified against `/auth/v1/user` before any table is
read.

Lifecycle is server-authoritative:

- `journeys.lifecycle` must match the source's lifecycle map
  (`pregnancy_reflection` → `pregnancy`, `first_year_entry/memory` → `first_year`,
  `ttc_note` → `ttc`). A selected entry from an earlier chapter resolves to
  nothing.

Episode and baby isolation is the same fail-closed logic as JA2:

- **Pregnancy**: `reflections` carries no journey id, so the only trustworthy
  evidence is the row's immutable `created_at` against the active
  `pregnancy_journeys.started_at`. `updated_at` is never used. A week outside
  1–42 resolves to nothing.
- **First Year**: the authoritative baby is the primary one, or the only one.
  Several babies with no primary is ambiguous, so baby-scoped material resolves
  to nothing. `all_babies` is out of scope. Parent, baby and family lanes carry
  distinct neutral `kind` wording.
- **TTC**: `ttc_logs.journey_id` must equal the current `ttc_journeys` id and
  `log_type` must be `note`.

Only proven user-written text is model-visible. Titles, tags, structured
tracker values, ids, `baby_id`, paths and media are not.


## Deterministic selected-entry safety

The resolver:

1. Loads the row under the caller's session.
2. Sanitises and bounds the text to `SELECTED_JOURNAL_MAX_CHARS` (1,800).
3. Passes that exact string to the existing deterministic `decideSafety`.
4. If the result is RED or CRISIS, returns the existing deterministic answer
   with no model call, no background journal read, and the selected header set
   to `none`. No new classifier, no model call, no journal-specific wording, and
   nothing reveals that the entry rather than the question produced the answer.
5. If the result is GREEN, renders the exact assessed string through
   `renderSelectedJournalEntryBlock`.

Model-visible characters are always a subset of safety-assessed characters.


## Zero AMBER input

No selected journal text is ever sent to the AMBER classifier. AMBER, when
gated on at all, assesses only the current question and prior user-authored
turns as before. JA3 introduces zero new safety model calls or classifiers.


## Safety before ordinary rate limiting

Selected-entry safety is resolved before the ordinary quota check. A
deterministic urgent result from the selected text cannot be suppressed by rate
limiting. Background journal awareness remains unreachable on RED, CRISIS,
rate-limit, kill-switch, clarification, unsupported and AMBER branches — zero
background reads on every controlled path.


## Selected vs background precedence and dedupe

A selected entry is resolved **before** ordinary rate limiting and on a
separate path from background context. If both a selected entry and background
context are eligible, the selected block is rendered separately under
`<selected_journal_entry>` and the background block under
`<journal_observations>`.

To avoid presenting the same text twice, the runtime may pass the sanitised
text of the selected entry into `resolveJournalContext` as `excludeText`. The
background resolver deduplicates by deterministic normalised text match only:
no id, source or internal identifier enters `JournalContextV1`, the prompt, the
headers or anything the browser can see. If the architecture ever makes this
dedupe awkward, the fallback is acceptable: the same text appearing in both
blocks is bounded and harmless.


## Prompt placement

The selected block is placed next to the user question and the structured
journey context, before background journal material:

```
<user_question>...</user_question>
<structured_journey_context>...</structured_journey_context>
<selected_journal_entry>...</selected_journal_entry>
<journal_observations>...</journal_observations>
...
```

Interpretation rules for the selected block live in the trusted system layer
(`SELECTED_JOURNAL_INSTRUCTIONS`) and are added only when a block exists. They
state that the text is data, not instruction; that it never establishes journey,
week, month or clinical fact; that saved journey details win on conflict; and
that safety guidance always takes priority.


## Transparency

`X-Companion-Journal-Entry: used | none`, exposed through CORS alongside the
JA2 header. `used` means a non-empty selected block actually entered the prompt.
It is metadata only, with zero authority over safety, journey state, J5
eligibility, memory, history or any later request. The client fails closed on
anything that is not exactly `used`.

The combined transparency line on a completed assistant answer is managed by
`CompanionJournalNote.tsx`:

- background only → "Your recent journal was included as context."
- selected only → "The journal entry you selected was included as context."
- both → "The journal entry you selected, and your recent journal, were
  included as context."

It is shown on completed answers only, never while streaming or on aborted,
failed, terminal, clarification or unsupported answers. There is no global
used state.


## Privacy, logging and persistence boundaries

- No journal text, id, source, date or metadata is persisted on the server
  beyond the existing row.
- No journal content is written to conversation rows, memory rows, analytics,
  logs or headers.
- Error logs contain only error names, never ids, sources, text or safety
  results.
- The browser never stores the selected text; only the typed reference exists
  transiently in React state for the pending turn.


## Flags and production state

Both switches remain OFF:

- `AI_JOURNAL_CONTEXT_ENABLED` (server, authoritative for all journal reads
  including selected entries).
- `VITE_COMPANION_JOURNAL_ENABLED` (client, exposes the "Ask about this entry"
  UI).

With these off, the CTA is not rendered and the server resolver returns `none`
without reading any table. No backend or frontend deployment has been performed
for JA3. Production journal QA is zero. The legal/privacy activation gate is
OPEN.


## Accepted V1 UI coverage limitation

CTA currently present:

- First Year memory items (`first_year_memory` with `memory.note`)
- TTC note/log items (`ttc_note` with `log_type = note` and non-empty `notes`)

Not currently exposed:

- Pregnancy reflection surfaces
- First Year Today entry surfaces

Reason: those render surfaces do not expose a stable authoritative persistent
row id suitable for the typed `JournalEntryRefV1` contract. We do not fabricate,
derive or infer ids to expand coverage.

Classification: **release-coverage limitation**, not engineering safety failure.
