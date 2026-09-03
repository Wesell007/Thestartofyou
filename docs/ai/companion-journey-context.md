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
