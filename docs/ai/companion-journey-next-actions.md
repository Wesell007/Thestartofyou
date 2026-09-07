# Companion journey next actions (AIC-J5, V1)

Engineering status: implemented and validated. Production activation status:
the layer is live in code but only ever renders for a signed-in person with a
saved journey, on an answer the server explicitly permitted. Nothing about the
existing answer path, safety, grounding, memory or history changed.

## Scope

Strictly the three saved personal lifecycles: trying to conceive, pregnancy,
first year. Content families (IVF, preparing for baby, postpartum, toddler,
family, support) never produce actions. There is no content or page action
layer, no entry/action seed, no question parsing, no answer parsing and no
model-generated action.

## Eligibility — an opaque permission

`ai-search` sets `X-Companion-Next-Actions: allow | suppress` (exposed through
CORS). It is a UI permission derived from a decision already taken, and never
carries a safety state, category, score, rule, threshold or reason.

- `allow`: an ordinary generative response with no AMBER or cautious
  uncertainty guidance applied.
- `suppress`: deterministic RED/CRISIS answers, the kill-switch/controlled
  answers, clarify and unsupported boundaries, and AMBER responses.

The browser fails closed: missing, unknown or malformed values are `suppress`
(`readNextActionsEligibility` in `useAISearch`).

## Lifecycle

Eligibility is held for one in-flight request only, in a ref. Actions become
visible only when that same response commits as a completed assistant message.

- A new accepted turn, a retry, a stop, a new/cleared conversation and a
  restored thread all clear the layer immediately.
- Failed, aborted, timed-out, streaming, partial and suppressed responses
  render no actions.
- A J2 journey-state change clears the layer. Actions for a new lifecycle are
  never attached retroactively to an older answer; the next eligible completed
  answer produces fresh ones.

## Registry and resolver

`src/lib/companion/journeyNextActions.ts` is a closed registry with a pure
resolver, `resolveJourneyNextActions({ personal, signedIn })`. Personal state
comes only from the authoritative J2 resolver.

| Saved state | Actions |
| --- | --- |
| TTC, any stage (treatment included) | `Open My TTC Journey` → `/my-ttc-journey` |
| Pregnancy, valid saved week N | `View My Week` → `/my-week`, `Read week N guidance` → `/pregnancy/week/N` |
| Pregnancy, unknown week | `Open My Journey` → `/my-journey` |
| First year, unambiguous saved month 0–11 | `Open Today` → `/my-first-year/today`, `Read month N guidance` → the existing month route |
| First year, month 12 or any ambiguous/unknown month | `Open My First Year` → `/my-first-year` |
| Signed out, or no saved journey | none |

### First year month boundary (AIC-J6-R2)

The saved PERSONAL first-year journey is 0–11 whole months. Twelve-month
guidance remains valid PUBLIC CONTENT at `/first-year/12-months`, reachable
through normal navigation, but it is never produced from personal state: a
saved age of 12, or anything out of range or ambiguous, falls back to
`Open My First Year`. This matches the J3 starter bands, which also stop at 11.

At most two actions (`MAX_NEXT_ACTIONS`), stable registry order, deduplicated
by exact destination.

## Presentation

`CompanionNextActions` is shared by the panel message list and `/ask`, so both
surfaces show identical IDs, labels, order and destinations. It is a compact
secondary `nav` labelled "Next steps", with wrapping ~44px link targets and no
nested interactive controls.

## AIC-J6-R4 runtime findings (local, intercepted)

Verified in a local browser at 390px and 1440px with the `ai-search` response
boundary intercepted deterministically (no deployment, no production write).
Two defects were found and fixed:

1. The first resolution of a previously unknown personal journey was treated as
   a journey transition, which blanked the layer on the first answer of a
   session. Only a change away from a *known* journey invalidates now.
2. On `/ask` the layer was rendered inside the optional "More on this" section,
   so a short answer never showed it. It now belongs to the completed answer.

## Boundaries

Navigation only. No persistence, no message metadata, no analytics, no schema
or RLS change, no prompt, grounding, memory, history, J2/J3/J4 or voice change.
