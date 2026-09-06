# Companion journey context (AIC-2)

Structured, provenance-separated context sent with companion requests from the
two intentional surfaces: the site-wide companion panel and `/ask`.

## Contract

`supabase/functions/_shared/journeyContextContract.ts` is the single, runtime
neutral source of truth. Both the browser and the Deno edge function import it,
so the client cannot describe a shape the server does not validate.

```ts
JourneyContextV1 = {
  version: 1
  personal?: { journey: "pregnancy",          week?: 1-42, trimester?: first|second|third }
            | { journey: "trying-to-conceive", ttcStage?: TtcStage, ivfInTreatment?: true }
            | { journey: "first-year",         ageMonths?: 0-11 }
  page?:  { journey?, pageType?, topic?, title?, week?, month? }
  entry?: { journey?, stage?, topic?, title? }
}
```

The personal union is discriminated, so a pregnancy context can never carry a
first-year field and vice versa. Every string is bounded and sanitised; there
are no raw dates, identifiers, notes, profile rows or memory.

## Provenance

Three layers stay separate for ever:

- `personal` — authoritative saved journey state, derived to a minimum.
- `page` — what the person is currently reading. Content, never identity.
- `entry` — what they pressed Ask from. Content, never identity.

`buildPageContext` and `buildEntryContext` structurally cannot write into
`personal`; only `resolvePersonalJourneyContext` supplies it.

## Personal resolution

`src/lib/companion/journeyPersonalSource.ts` is the only resolver, shared by
both surfaces:

1. session → no session means no personal context;
2. `journeys.lifecycle` pointer (single authoritative pointer);
3. only the relevant journey source, column-scoped.

Rules:

- pregnancy uses the authoritative status; `given_birth`, `no_longer_pregnant`,
  `pregnancy_loss` and `paused` never produce an active stage. The established
  legacy `saved_journeys` fallback still applies when the new row is missing.
- IVF is not a journey: it is `ivf_consideration === "in_treatment"` on the TTC
  context.
- first year uses the canonical `getFirstYearAge` month index. With more than
  one baby and no unique primary, no age is sent; no default is guessed.
- every failure path fails open to `null`.

`useCompanionPersonalJourney` starts resolution on mount, shares one in-flight
promise, and at submit awaits it with a 1.5s bound. There is no new loading
state: a slow first request simply goes without personal context.

## Validation and rendering

`parseAiSearchBody` accepts an optional `journeyContext` and rejects unknown
keys, wrong versions, invalid enums, out-of-range numbers and cross-journey
fields. Absent context leaves the request byte-identical to pre-AIC-2.

`renderJourneyContextBlock` emits a single `<structured_journey_context>` data
block, kept distinct from the legacy freeform `<journey_context>`. The trusted
interpretation rules (`JOURNEY_CONTEXT_INSTRUCTIONS`) are appended to the
system prompt only when the block is present, so no client string can rewrite
them. The current message always outranks saved details; page and entry are
content, not facts; safety and grounding behaviour are unchanged.

## Privacy

No names, emails, free text, notes, reflections, cycle detail or identifiers
are sent. Nothing is persisted, logged or sent to analytics; `ai-search` still
logs no request body.

## Freshness (AIC-J2)

Personal context is cached once per session in `useCompanionPersonalJourney`.
Two independent causes invalidate it: an auth state change, and an
authoritative journey mutation announced through
`src/lib/journeyStateSignal.ts`.

The signal is payload-free and in-memory: no journey type, stage, week, age,
identifier, storage, network or analytics. It means only "the cached personal
journey context is no longer trustworthy", and is never a source of journey
truth.

Emitting paths, one notification per completed logical mutation, after success:

- pregnancy — `upsertPregnancyJourney` (the single inner authority behind
  `commitPendingJourneyToDB` and `saveActivePregnancyJourney`, so the outer
  callers never emit again), `updatePregnancyJourneyStatus`,
  `deletePregnancyJourney`;
- TTC — `commitPendingTTCJourneyToDB`, `deleteTTCJourney`;
- first year — `saveFirstYearJourney`, whose single RPC writes journey, babies,
  primary baby and lifecycle together.

The opportunistic legacy backfill inside `getActivePregnancyJourney` is a read
path that cannot change the resolved journey, so it deliberately does not emit.
Failed mutations throw before the emit, so they emit nothing. Listener failures
are caught and logged: a committed journey write must never be reported as
failed because a cache listener threw.

Invalidation semantics:

- one module-level cache and one module-level listener, however many companion
  surfaces are mounted; no per-surface or per-journey caches;
- a signal bumps an epoch and clears cache and in-flight reference
  synchronously;
- a resolution completing under an obsolete epoch is neither cached nor handed
  to its awaiting caller: it chains onto the current-epoch resolution;
- concurrent reads after a signal coalesce on one fresh resolution;
- a failed refresh resolves to `null`. Stale context is never a fallback.

Page and entry context stay per request: the panel reads a live pathname ref
and `/ask` rebuilds entry context from the current authoritative parameters.
Historical turns are never rewritten. Prompt assembly is unchanged.

## AIC-J3 — journey-aware suggestion registry

`src/lib/companion/journeySuggestions.ts` is the single canonical source of
personal journey starters, for TTC, pregnancy and first year only.

Authority:

- personal starters are produced only from an authoritative
  `JourneyContextV1.personal` object. There is no journey-family shortcut, so
  a mode, page, route, hub, topic, entry or content string cannot reach them.
  Inference count from mode, page, route and content entry: 0, 0, 0, 0;
- `page` is accepted by the resolver and never consulted, so page content can
  never create, refine or overwrite personal identity;
- `resolveJourneySuggestions({ personal, entry, page, surface })` is pure and
  deterministic for surfaces `companion | ask | hub`, capped at 4 chips: no
  model calls, randomness, analytics, persistence, dates or identifiers.

Stage handling:

- TTC uses the four authoritative stages `preparing_to_try`,
  `trying_naturally`, `considering_help`, `in_treatment`. `ivfInTreatment`
  refines only when no saved stage says otherwise and never creates a
  lifecycle;
- pregnancy uses `trimester` when present, otherwise the single canonical
  `trimesterFromWeek` helper. Trimester derivation implementations remain 1;
- first year uses the non-overlapping bands 0–2, 3–5, 6–8, 9–11. Month 12 is
  unsupported and resolves to journey level.

Content and personal stay separate. Mode chips, hub prompts and topic, week,
article and tool prompts remain CONTENT prompts and describe what someone is
reading, never who they are. `companionStarters.ts` is now a thin delegate over
the content/mode chips, so no duplicated personal journey copy remains.

Freshness reuses J2 unchanged: one module cache, one listener, one resolver.
The published personal value becomes unknown synchronously on invalidation, so
stale personal starter exposure is 0 and duplicate resolver queries from
multiple mounted surfaces are 0.

## AIC-J4 — contextual journey entry points

Entry points hand off to the one shared panel. They are not answer surfaces:
the TTC, My Week and My First Year cards no longer call `useAISearch`, hold no
transcript and render no answer. Direct `useAISearch` callers in those three
cards: 0. Inline answer renderers in those three cards: 0.

`CompanionProvider.openWithEntry({ entry, suggestions? })` is transient:

- `entry` is AIC-2 entry provenance (content, never identity) built by the
  single `buildEntryContext` helper. `JourneyContextV1` is unchanged;
- `suggestions` are presentation-only chips shown while the thread is empty and
  the entry is unconsumed. Content prompts stored in `JourneyContextV1`: 0;
- opening an entry point performs 0 model calls and sends no hidden user
  message. Nothing is asked until the person writes or chooses a question;
- the entry is consumed inside `resolveJourneyContext`, which the shared
  runtime calls only after it has accepted and committed the first user turn
  and before any assistant reply. An assistant failure or a retry afterwards
  does not revive it;
- a route change clears an unconsumed entry, and closing the panel abandons it,
  so an ordinary launcher reopen is not a contextual hand-off. Turns already in
  the conversation are untouched;
- a new contextual hand-off may activate a new entry at any time.

`/ask` follows the same rule for its URL-derived entry: consumed by the first
accepted turn, revived only when the stage, journey, topic or label changes.

Routing rule: contextual hand-off opens the panel so the person keeps their
place; broad or free-text search opens `/ask`. Answer surfaces remain exactly
two, with one runtime, one endpoint and one renderer per surface.
