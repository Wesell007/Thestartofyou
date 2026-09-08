# AIC-JA2 — Permissioned background journal awareness

Engineering complete. **Not active in production.** Both flags are off and
nothing has been deployed. The schema column exists (AIC-JA2-M1) and is inert:
a database column is not a live feature.

| Gate | State |
| --- | --- |
| Schema ready | YES |
| Migration applied | YES (additive column only) |
| Journal feature active | NO |
| `AI_JOURNAL_CONTEXT_ENABLED` | OFF |
| `VITE_COMPANION_JOURNAL_ENABLED` | OFF |
| Backend deployed | NO |
| Frontend deployed | NO |
| Legal/privacy activation | OPEN |


## What it is

A small amount of the person's own recent journal text, resolved on the server
for one request, added to the companion prompt as background observation only.
It flows through the existing runtime — `useCompanionConversation` →
`useAISearch` → `ai-search` — and the product still has exactly two answer
surfaces.

## The gates, in order

1. `AI_JOURNAL_CONTEXT_ENABLED` (server, authoritative). Off ⇒ zero journal reads.
2. A verified Supabase access token. No user id is ever accepted from a request
   body, and the service role is never used: every read runs under the person's
   own token, so row-level security is the real boundary.
3. `profiles.companion_journal_context_enabled` — the person's own explicit opt-in.
4. `journeys.lifecycle`, server-authoritative, which must agree with the AIC-2
   personal journey. Page context never influences journal scope.
5. AIC-JA-S1 safety filtering, then the S1 bounded renderer.

Any failure, ambiguity or abort yields no journal context and an ordinary
answer. Nothing is cached, nothing is logged.

## Path invariant

```
ordinary GREEN model path -> journal may be resolved
anything else             -> zero journal reads, header "none"
```

"Anything else" covers RED, CRISIS, rate limiting, the kill switch,
clarification, unsupported, recap mode and AMBER. AMBER stays a separate
cautious path and never uses background journal material. AIC-5 semantics were
not changed to achieve this: resolution simply sits after every other branch has
returned, gated additionally on `!amberGuidance` and on companion mode.

## Sources and episode isolation

| Journey | Source | Episode evidence |
| --- | --- | --- |
| Pregnancy | `reflections.content` | Active `pregnancy_journeys.lmp_date`, raised to a later archived pregnancy chapter. Filtered on immutable `created_at`; `updated_at` is never used. |
| First Year | `first_year_entries.note`, `first_year_memories.note` | Active `first_year_journeys` plus the authoritative baby. |
| TTC | `ttc_logs.notes` where `log_type = note` | `ttc_logs.journey_id` — an exact foreign key. |

Known limitation, stated plainly: `reflections` is unique on `(user_id, week)`
and carries no journey id, so a week row written in an earlier pregnancy and
edited during this one cannot be proved to belong to this episode. It is
therefore **excluded**. Pregnancy recall is deliberately incomplete rather than
possibly wrong.

First Year: the authoritative baby is the primary one, or the only one. Several
babies with no primary is ambiguous, so baby-scoped material is excluded
entirely. `all_babies` memories are out of scope. Parent, baby and family
material carry distinct neutral `kind` wording so parent or family writing can
never be read as a fact about one child.

Never model-visible: ids, `baby_id`, tags, titles, structured tracker values,
storage paths and all media. Model-visible tag count is 0.

## Bounds

Maximum 5 entries, 300 characters each, 1,200 characters total, enforced by the
shared S1 renderer. Lookback is 3 weeks (pregnancy), 14 days (First Year), 21
days (TTC), 20 rows per source before filtering. Query shape is a finite set per
lifecycle with no N+1 loops: auth, profile, lifecycle, then two to three
source reads.

An entry S1 will not vouch for — including one too long to assess — is dropped
whole. Model-visible characters are always a subset of safety-assessed
characters.

## Transparency

`X-Companion-Journal-Context: used | none`, exposed through CORS. `used` means a
non-empty block actually entered the prompt. It is metadata only, with zero
authority over safety, journey state, J5 eligibility, memory, history or any
later request. The client fails closed on anything that is not exactly `used`.

The line "Your recent journal was included as context." is shown on one
completed assistant answer, on both surfaces, and never while streaming or on an
aborted, failed, terminal, clarification or unsupported answer. There is no
global used state. Nothing about the journal is persisted, and turning the
permission off does not rewrite earlier visible answers.

## Pregnancy week

`supabase/functions/_shared/pregnancyWeek.ts` is a one-to-one port of
`src/lib/pregnancyWeek.ts`, not a second formula.
`src/test/journalPregnancyWeekParity.test.ts` sweeps hundreds of dates through
both and asserts they never disagree.

## Schema

The permission is one boolean on the existing owner-scoped `profiles` row,
applied as AIC-JA2-M1:

```sql
ALTER TABLE public.profiles
  ADD COLUMN companion_journal_context_enabled boolean NOT NULL DEFAULT false;
```

No new table and no new policy: `profiles` already has owner-only policies keyed
on `auth.uid() = user_id`, and existing grants cover the new column. Every
existing row defaults to `false`. The column is inert while the server flag is
off: even a manually enabled preference yields zero journal reads. The generated
database types now carry the column, so `journalPermission.ts` uses
`supabase.from("profiles")` directly with no local type workaround.

## Activation checklist (remaining)

1. Legal and privacy approval.
2. `AI_JOURNAL_CONTEXT_ENABLED=true`, deploy `ai-search`.
3. `VITE_COMPANION_JOURNAL_ENABLED=true`, publish the frontend.


Out of scope and untouched: JA3, voice, media, grounding, memory, persistent
history and analytics.
