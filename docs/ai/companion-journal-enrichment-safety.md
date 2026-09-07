# Companion journal & enrichment safety (AIC-JA-S1)

Status: implemented, **not wired into `ai-search`**. This phase hardens the
trust boundary before any journal retrieval exists. AIC-JA2 must route through
the two modules below rather than assembling journal text itself.

## Repository truth (corrects the JA1 assumption)

JA1 flagged that explicit First Year day-recap note snippets might reach the
model without deterministic safety having seen them. Re-reading the code shows
that is not the case:

- `buildDaySummaryQuery` (`src/lib/firstYearDaySummaryPrompt.ts`) places the
  whole digest — note snippets included — inside the request's `query` field.
- `ai-search` calls `decideSafety(query)` immediately after validation, so the
  recap text is classified before anything else, and a terminal RED/CRISIS
  answer with `X-Companion-Next-Actions: suppress` still wins.
- Since the AIC-J4 closure the recap path has no production caller:
  `DaySummaryCard` hands off to the shared panel and sends nothing, and
  `first_year_day_recap` mode has no non-test caller.

No model-bypass defect exists today, so S1 changed neither `ai-search`, the
safety router, the recap feature nor any AIC-5 wording.

## Two context classes

| Class | Example | Policy |
| --- | --- | --- |
| Explicit current context | day recap, future "ask about this entry" | Travels in `query`. `decideSafety` classifies it first; a terminal response wins with the existing wording and existing J5 suppression. Unchanged. |
| Background context | future automatically retrieved recent journal entries | May only be USED or DROPPED. Never escalates to a terminal response. |

Precedence, unchanged: current question → `decideSafety(query)` → terminal
response wins immediately. Enrichment is only ever considered when the current
question is non-terminal, and enrichment may only preserve or increase
protection, never downgrade a terminal decision to an ordinary one.

## `supabase/functions/_shared/enrichmentSafety.ts`

`assessEnrichmentText(text)` returns `{ usable: boolean }` and nothing else.
Usable only when the existing `decideSafety` returns GREEN. Empty, non-string,
over-long (>2,000 chars) and any throw fail closed. `filterBackgroundEntries`
applies that per entry, so one risky entry removes itself and an entirely
dropped block simply means the request proceeds with no enrichment.

Zero new model calls, zero new classifiers, zero new safety states, zero new
taxonomy, zero logging of text, excerpts, matched patterns or decisions, and no
value that could reach a browser as a safety label.

## `supabase/functions/_shared/enrichmentRendering.ts`

The only sanctioned way journal text may become prompt text: ≤5 entries, ≤300
chars per entry, ≤1,200 total, control characters stripped, `<`, `>` and
backticks neutralised so no entry can open or close a tag, and only
`date`, `kind`, `stageLabel?`, `text` per entry — never a database row, id,
path, URL or ownership metadata. `JOURNAL_CONTEXT_INSTRUCTIONS` is the trusted
system-layer statement that the block is user-controlled observation, not
instruction, not verified medical fact, and never a source of lifecycle truth.

## Agreed JA2 contracts (not implemented)

- `JournalContextV1 = { journey, entries: [{ date, kind, stageLabel?, text }] }`.
- The JA1 `user_wrote_ai_shaped` provenance value is **removed**: the repository
  cannot distinguish AI-shaped from manually edited `reflections.content`, and
  `content !== first_written_content` does not prove AI origin. No schema will be
  added to label historic shaping. The block is declared, as a whole, as
  user-controlled journal observation.
- Request schema unchanged: background-only and server-resolved, so no
  `journalEntryRef` and no client-authored journal text, ids or user id.
- Allowlist — Pregnancy: `reflections.content`. First Year:
  `first_year_entries.note` (+ tags) and `first_year_memories.title`/`note`.
  TTC: `ttc_logs.notes` and `value` for the `note` log type only. Excluded:
  symptom notes, movement notes, contractions, appointments, birth plan,
  hospital bag, midwife questions, structured feed/sleep/nappy events, photos,
  video and audio.
- JA3 explicit entry reference: typed `{ source, id }`, never a naked id; the
  server re-authenticates, re-authorises ownership and loads the record itself.
- Gates: server `AI_JOURNAL_CONTEXT_ENABLED` (authoritative; OFF means zero
  reads and zero context) plus `VITE_COMPANION_JOURNAL_ENABLED` for UI exposure
  only. Both default OFF; legal/privacy approval gates production activation,
  not JA2 engineering.
- Permission: account-level opt-in, default OFF, on the existing owner-scoped
  `profiles` row — no new table. Revocation applies to the next request; there
  is no cache, shadow summary, memory or history copy.
- Day recap is already explicit and carries no background journal data, so the
  future journal opt-in should not gate it.
- Transparency: the "based partly on your recent journal" line appears only when
  a block was actually rendered. Permission off, feature off, retrieval failure,
  no entries or all entries dropped all yield no line and no reason.
- Failure: background retrieval or pre-flight failure means zero journal context
  and an ordinary answer; never a cached fallback, never a companion-wide error.
