# AIC-JA4 — Text journal awareness: evaluation and release gate

Final engineering evaluation of JA2 (permissioned background journal awareness)
and JA3 (explicit "Ask about this entry") as one integrated system. This is an
engineering verdict only. Nothing here activates the feature, and nothing here
is a legal or privacy approval.

Evaluated revision: baseline `f7fa38a0`, plus the in-scope remediation recorded
below. Production state at close: both journal flags OFF, no deployment, no
schema change, legal/privacy activation gate OPEN.

## 1. Surfaces and runtime

Exactly two answer surfaces — `CompanionPanel` and `/ask` — over one runtime:
`useCompanionConversation` → `useAISearch` → `supabase/functions/ai-search`.
Journal awareness adds no surface, no second runtime, and no separate model
call. `ai-reflect` remains a separate, unrelated feature and receives no
journal context plumbing.

## 2. Flag authority

- `AI_JOURNAL_CONTEXT_ENABLED` (server) is authoritative. With it off, neither
  the background resolver nor the selected-entry resolver performs any read,
  and both transparency headers report `none`.
- `VITE_COMPANION_JOURNAL_ENABLED` (client) only exposes UI: the account
  setting and the "Ask about this entry" affordance. It can never cause journal
  text to reach the model.
- Both flags are OFF in production.

## 3. Permission matrix (canonical, not exhaustive)

| Server flag | Background permission | Selected entry | Background used | Selected used |
| --- | --- | --- | --- | --- |
| off | off | none | no | no |
| off | on | present | no | no |
| on | off | none | no | no |
| on | off | present, safe | no | yes |
| on | off | present, terminal | no | no (deterministic answer) |
| on | on | none | yes | no |
| on | on | present, safe | yes | yes |
| on | on | present, terminal | no | no (deterministic answer) |

Explicit selection does not require the background opt-in: an entry the person
deliberately chose is its own permission for that one request. Revoking the
background permission stops automatic use only.

## 4. Ownership, isolation and allowlists

All journal reads use the caller's own bearer token against PostgREST, so RLS
is the ownership authority; no service-role read exists on either path.

- Pregnancy: active saved journey supplies the LMP and the canonical week.
  Episode association is proved with immutable `created_at` against the saved
  journey start (and the newest archived boundary for background reads).
  `updated_at` is never used. Where proof is unavailable, the read fails closed.
- First Year: requires an active journey and one authoritative baby (unique
  primary, or the only baby). Ambiguity fails closed. `all_babies` scope is
  excluded. Parent-lane and family records stay distinct from baby records.
  Personal months are capped 0–11.
- TTC: requires the current journey id; only `ttc_logs` rows of type `note`
  contribute their free text. Structured tracker values never enter the prompt.
- Source allowlist is text-only. No media, no file paths, no ids, no tags, and
  no derived clinical fields reach the model.

## 5. Bounds and containment (S1)

Background: at most 5 entries, 300 characters per entry, 1,200 characters
total; an over-long entry is dropped whole rather than truncated mid-sentence.
Selected: one entry, at most 1,800 characters. Sanitisation strips control
characters, angle brackets and backticks before rendering, so a journal entry
cannot open, close or forge a prompt delimiter. Both blocks are rendered as
explicitly untrusted data with no instruction authority, and the string that is
safety-assessed is exactly the string that is rendered.

## 6. Safety ordering

1. `decideSafety(query)` on the person's own question, immediately after
   request validation — before rate limiting, kill switch, mode routing and any
   journal read. Terminal results return the existing wording, make no model
   call, read no journal, and suppress next actions.
2. Selected-entry resolution and its deterministic assessment, before ordinary
   quota, so an urgent selected entry still receives the existing safety
   response when the quota is exhausted. A terminal selected entry answers
   deterministically, sets the selected header to `none`, exposes no cause, and
   triggers no background read and no model call.
3. Ordinary quota, kill switch, clarification and unsupported boundaries.
4. Gated AMBER classification. No selected or background journal text is ever
   sent to the AMBER classifier, and no new classifier or model call was added.
5. Background journal resolution, only on the ordinary GREEN generative path.

Measured separately on controlled branches: background reads are zero on every
one of them (terminal question, terminal selected entry, clarification,
unsupported, recap, rate limited, kill switch, AMBER); selected reads occur only
where the selected entry must be deterministically assessed.

## 7. Prompt composition

Actual physical order of user content: `<user_question>`, structured journey
context, selected entry block, background journal block, permissioned memory,
conversation history, page context, grounding material. System order: mode
prompt, journey rules, selected rules, background rules, journal answer rules,
memory rules, history rules, emotional guidance, global reassurance, AMBER
guidance.

Semantic authority is deliberately different from physical order and is carried
by the instructions themselves: safety outranks everything, the saved journey
outranks any stage or week implied by an entry, and journal text is data only.
No code was reordered cosmetically for this evaluation.

## 8. Composition with J2–J5 and with memory/history

J2 freshness, J3 suggestions, J4 page context and J5 next actions are unchanged.
An explicit entry selection replaces any pending generic J4 page context, so the
two cannot both claim the turn. Permissioned memory and persistent history
remain independently gated and OFF; journal context has no authority over them.

## 9. Handoff, transparency and persistence

The selected reference is transient client state: it is consumed once on an
accepted send, preserved across a retry of the same turn, and cleared on panel
close, route change, auth change or journey change. It is never written to
`localStorage` or `sessionStorage`.

`X-Companion-Journal-Context` and `X-Companion-Journal-Entry` are opaque
`used | none` headers, exposed through CORS, parsed fail-closed by the client,
and attached only to completed assistant answers. `used` means exactly that a
non-empty block entered the prompt for that answer.

No journal text, entry id, source or date is persisted, logged or sent to
analytics on any path. Error logging carries the error name only.

## 10. CTA coverage (accepted V1 limitation, carried forward from JA3)

CTA present: First Year memory items; TTC note/log items.
CTA not currently exposed: Pregnancy reflection surfaces; First Year Today
entry surfaces. Reason: those rendered surfaces lack stable authoritative
persistent ids suitable for `JournalEntryRefV1`, and ids must not be fabricated,
inferred or derived. This is a release-coverage limitation, not an engineering
safety failure.

## 11. Findings and remediation

- P0: none. P1: none. P2: none remaining. P3: none remaining.
- Remediated in scope during JA4:
  - The account setting implied that revoking the background permission also
    stopped explicit single-entry questions. Copy now separates automatic use
    from deliberate selection.
  - The companion panel promised "it does not read your private notes", which
    would become untrue at activation. The line is now conditional on the
    client journal gate: unchanged while journal awareness is off, and honest
    about permission and deliberate selection when it is on.
  - Endpoint-level runtime proof was missing for the composed permission matrix
    and for the separate selected/background read behaviour on controlled
    branches (`src/test/journalSelectedRouting.test.ts`, 19 tests), and the
    hand-off affordance had no boundary coverage
    (`src/test/journalEntryCta.test.tsx`, 4 tests).

## 12. Validation at close

- Full suite: 111 files, 1262 tests, all passing, zero timeouts.
- Typecheck run twice: clean. Deno check of the journal server modules: clean.
  Build: clean. Lint: known baseline only (1 error, 10 warnings, in generated
  files); no new findings.
- Runtime check at 390px and 1440px against the local dev server: `/ask`,
  homepage and the companion panel render with zero horizontal overflow and no
  console errors, and no journal affordance or journal wording is exposed at
  production defaults.
- Enabled-state behaviour was evaluated with local isolated fixtures only. No
  real account and no real journal content were used, and no production QA was
  performed.

## 13. Activation runbook (prepared, NOT executed)

1. Obtain legal and privacy approval, and publish the user-facing privacy
   wording that describes journal use.
2. Deploy `ai-search` with `AI_JOURNAL_CONTEXT_ENABLED` still off; confirm both
   headers report `none`.
3. Turn on `AI_JOURNAL_CONTEXT_ENABLED`; confirm background use stays off for
   everyone, because the per-person permission defaults to false.
4. Publish the frontend with `VITE_COMPANION_JOURNAL_ENABLED` on, exposing the
   account setting and the entry affordance.
5. Verify on a test account: permission off, permission on, explicit entry with
   permission off, and a terminal entry.

## 14. Rollback runbook (prepared, NOT executed)

1. Turn `AI_JOURNAL_CONTEXT_ENABLED` off. This is sufficient and immediate: all
   journal reads stop and both headers report `none` on the next request.
2. If the UI must also disappear, publish with `VITE_COMPANION_JOURNAL_ENABLED`
   off.
3. No data cleanup is required, because no journal text, id or usage record is
   persisted anywhere. The stored per-person permission boolean is unaffected
   and can stay as it is.

## 15. Verdict

Engineering release gate: CLOSED PASS. Text journal awareness is technically
release ready and remains OFF in production, pending the legal and privacy
activation gate, which is OPEN.
