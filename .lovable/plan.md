# AIC-JA3 — Explicit "Ask about this entry"

Engineering only. No deployment, no migration, no flag change, no media, no voice.
Both journal flags stay OFF; the legal/privacy activation gate stays open.

## What the person will get (once activation happens later)

On an eligible journal entry they own, a quiet "Ask about this entry" action. Pressing it
opens the existing companion with a small "Using this journal entry" indicator and a
Remove control. No AI call happens until they type a real question. Only a typed
reference travels to the server; the server loads the entry itself under the person's own
session. A completed answer says the selected entry was used.

## Architecture

Answer surfaces stay at exactly two (companion panel, `/ask`) and one runtime
(`useCompanionConversation` → `useAISearch` → `ai-search`). No new route, modal, inline
answer card or model endpoint.

### 1. Typed reference contract

The authoritative strict parser lives in the server layer, in new
`supabase/functions/_shared/journalEntryRefContract.ts`:

```
JournalEntryRefV1 = {
  version: 1
  source: "pregnancy_reflection" | "first_year_entry" | "first_year_memory" | "ttc_note"
  id: string   // uuid form only
}
```

Strict parser: unknown source, malformed/missing id, extra fields → no selected context.
Never infers source from an id. No text, user id, baby id, journey id, date, week, month,
path, URL or media accepted from the browser.

To avoid a Vite ↔ Deno runtime dependency, the browser gets a minimal construction-only
mirror at `src/lib/companion/journal/journalEntryRef.ts` — same version, same source enum,
same uuid requirement, no text/user-id/baby-id/journey-id fields, no parsing logic. A
parity test proves the two agree; the server parser stays authoritative and is not
weakened to make sharing easy.

`parseAiSearchBody` gains one optional field `journalEntryRef`. `JourneyContextV1` is
unchanged. An invalid ref never fails the request — the ordinary question continues.

### 2. Server resolver

New `supabase/functions/_shared/aiSelectedJournalEntry.ts`, mirroring the JA2 resolver's
discipline:

- gate on the existing `AI_JOURNAL_CONTEXT_ENABLED` (no new flag family); off → 0 reads
- verify bearer token via `auth/v1/user`; user id never taken from the body
- all reads through PostgREST with the person's own token (RLS is the boundary; no
  service role)
- server-authoritative `journeys.lifecycle` must match the ref's source lifecycle,
  otherwise 0 context (cross-lifecycle historical selection is deferred)
- source allowlist and model-visible field:
  - `pregnancy_reflection` → `reflections.content` (+ week as a stage label only)
  - `first_year_entry` → `first_year_entries.note` (lane parent = parent observation;
    lane baby requires match with the authoritative baby)
  - `first_year_memory` → `first_year_memories.note` (family = family observation; baby
    requires authoritative baby; `all_babies` excluded)
  - `ttc_note` → `ttc_logs.notes`, requires `log_type = note` and the current
    `ttc_journeys.id`
- excluded: memory titles, entry tags, ttc `value`, ids, baby ids, paths, media, trackers,
  appointments, birth plan, hospital bag, midwife questions, structured care data
- ambiguous current baby → baby-specific context 0
- normalise → sanitise → bound → assess → render. No cache, no persistence, no logging of
  content, no existence oracle in any error path.

Background permission (`profiles.companion_journal_context_enabled`) is **not** required
for the explicit selection; the click is the one-request authorisation. The server flag
still is.

### 3. Bound and safety-assessed subset

New renderer in `enrichmentRendering.ts`: `renderSelectedJournalEntryBlock` emitting a
distinct `<selected_journal_entry>` block plus trusted instructions stating it is
user-selected, user-controlled observation, data not instruction, not medical fact, cannot
establish lifecycle/stage, and loses to saved journey state.

Hard bound: **1,800 model-visible characters**, below the existing S1
`ENRICHMENT_TEXT_MAX_LENGTH` of 2,000 so the same string can be safety-assessed whole.
Order is: sanitise and truncate to the final model-visible string → run safety on exactly
that string → render exactly that string. Never scan an excerpt and render more.
Structural containment reuses `sanitiseJournalText` (control chars stripped, `<`, `>`,
backticks neutralised).

### 4. Safety composition and ordering in `ai-search`

No new classifier, no new taxonomy, no new wording, no journal-specific emergency copy.

```
parse body
→ decideSafety(current query)            ← unchanged, still first
   terminal RED/CRISIS → existing deterministic answer, selected reads 0, model calls 0
→ load selected entry (gated, GREEN-only)
→ decideSafety(bounded selected text)    ← same AIC-5 primitive
   terminal → existing deterministic answer, model calls 0,
              next-actions suppress, no background journal read, header none
→ existing rate limit, kill switch, boundary, AMBER, grounding, model
```

The selected-entry safety check is deliberately placed **before** ordinary rate limiting
so quota can never suppress a deterministic urgent response — the same invariant AIC-5A
already holds for the query. This is the smallest possible composition change; rate
limiting itself is untouched.

Selected-entry safety is **deterministic only**. Selected journal text is never sent to
the AMBER model classifier and causes no additional model call of any kind. The existing
AMBER system keeps operating on the current user question under its existing semantics.
New safety classifiers: 0. New safety model calls: 0. Protection may increase, never
decrease; the current question can never be downgraded by the entry.

If explicit safety terminalises, JA2 background reads are 0.

### 5. Prompt precedence

`journey context → selected journal entry → background journal → memory → history →
page context → grounding`, safety guidance still last/highest in the system layer. At most
one selected block. Background retrieval deterministically drops any entry whose sanitised
text matches the selected entry, so the same words never appear twice.

### 6. Transparency

New opaque header `X-Companion-Journal-Entry: used | none`, added to the CORS expose list
alongside the existing JA2 header, which keeps its background-only meaning. `used` means a
block actually entered the prompt. No source, id, date, week, baby or safety information.
Client reads it fail-closed (`used` exactly, else false) in `useAISearch`; presentation
only, with no authority over safety, J5, journey, memory, history or later requests.

Assistant session metadata gains `selectedJournalEntryUsed?: boolean` beside the existing
`journalContextUsed`. One combined quiet line on a completed answer only:

- selected only: "This answer used the journal entry you selected."
- background only: existing JA2 line
- both: "This answer used the journal entry you selected and your recent journal."

Never during streaming, abort, failure, terminal, clarification or unsupported.

### 7. Handoff lifecycle (client)

Modelled on the proven J4 transient entry handoff, in provider memory only — no
localStorage, no sessionStorage, no server row, no cross-tab state.

- click → panel opens, pending ref stored, model calls 0, no hidden turn
- entry B replaces entry A; Remove clears it
- blank/rejected send does not consume it
- first accepted turn attaches it once, then consumes it; second turn has none
- cleared on panel close, route change, auth change and J2 lifecycle change
- an explicit journal selection replaces any pending generic J4 page entry, so two
  overlapping representations of the same page are never sent
- signed out → never sent
- edited before send → server loads the newest text; deleted or no longer allowlisted →
  context 0 and the question continues

### 8. UI

New shared `AskAboutThisEntry` component using existing tokens (quiet, secondary to
Save/Edit, ≥44px target, clear focus ring, no overflow, no layout shift). Rendered only
where someone is genuinely viewing an owned eligible text entry with a real id, gated by
`VITE_COMPANION_JOURNAL_ENABLED`. Candidate placements to confirm during the build audit:
pregnancy kept reflections (`SlotReflection` / kept-chapter viewers), First Year today
notes and memory list items, TTC note/log list items. Exact final placements are reported.

Pending-context treatment in the panel: "Using this journal entry", optional generic
source label ("Pregnancy reflection", "First Year note", "Memory", "TTC note"), and an
accessible Remove. Never the entry text, id, path or internal enum.

JA2 account-setting copy gets the smallest clarification so the background toggle is not
read as disabling explicit selection.

### 9. Explicitly unchanged

J3 starters, J5 saved-journey actions, grounding, memory, persistent history, media,
voice, analytics (no new event, no entry identifiers), schema (0 migrations).

## Tests

Focused suites covering: typed-ref parsing; ownership and wrong-user/wrong-baby/
cross-lifecycle zero-leak; pregnancy week authority (saved Week 36 beats selected Week 34,
invalid week rejected); First Year baby isolation and `all_babies` exclusion; TTC journey
and `log_type` rules; safety matrix (current RED/CRISIS, selected RED/CRISIS) with proof
that selected text never reaches the AMBER classifier and adds zero safety model calls;
client/server ref parity; explicit safety beating ordinary rate limiting; selected terminal
and every controlled non-generative branch leaving background reads at 0; the
assessed-text-equals-rendered-text invariant; background+selected combination and dedupe;
handoff lifecycle including a pending J4 entry being replaced and the ref consumed once;
no raw journal text in the browser request; header semantics and CORS; transparency copy
across streaming/abort/failure/terminal on both surfaces; prompt composition; structural
injection containment; privacy (no text/id in logs, analytics, headers, memory or history).

## Validation

Confirm the JA2 baseline first (107 files, 1228 tests, 0 timeouts) and stop if it drifts.
After the build: `npm test` all pass with 0 timeouts, typecheck twice, Deno check of
`ai-search` and every new/changed server module, lint at the known baseline (1 error,
10 warnings, no new findings), and a passing build. Mobile ~390px and desktop ~1440px
checks of the CTA, panel pending state and composer.

## Documentation

New `docs/ai/aic-ja3-selected-journal-entry.md` and a `roadmap.md` update recording
AIC-JA3 as engineering closed / production off, with journal text awareness
(background + explicit entry) engineering ready and production off.

Finish with the full numbered JA3 completion report, then stop.
