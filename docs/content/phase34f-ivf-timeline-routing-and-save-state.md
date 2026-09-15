# Phase 34F — IVF timeline routing fix and save-state design

Status: CLOSED PASS / PERSISTENCE ACTIVATION SUBJECT TO PRIVACY & ARCHITECTURE GATES
Scope: routing fix, standalone tool, privacy-safe navigation. No persistence, no save UI, no schema change, no AI or grounding change, no deployment.

## 1. Timeline action audit

Timeline actions audited = 5

| # | Surface | Action | Before | After |
| - | ------- | ------ | ------ | ----- |
| 1 | `/ivf` hero | Track my timeline (calculator submit) | `/ivf-timeline?date=…&type=…` — worked, but exposed treatment values in the address | `/ivf-timeline` via ephemeral navigation state |
| 2 | `/ivf/before-transfer` | Track your IVF timeline (tool) | `/ivf` — hub, not the tool | `/ivf-timeline` |
| 3 | `/ivf/after-transfer` | Track your IVF timeline (tool) | `/ivf` — hub, not the tool | `/ivf-timeline` |
| 4 | `/ivf-timeline` no-value state | "use the calculator on the IVF hub" link | `/ivf` — dead end | replaced by the working calculator on the page |
| 5 | `/ivf` guide library | "IVF timeline, what to expect" | `/articles/ivf-timeline-what-to-expect` — correct article, not the tool | unchanged |

Incorrect timeline destinations before = 3 (rows 2, 3, 4)
Incorrect timeline destinations after = 0
Primary timeline route = `/ivf-timeline`
New timeline CTAs added = 0

`/ivf/early-pregnancy` has no timeline tool action by design (the timeline ends at the outcome), so none was added.

## 2. Shared form

`src/components/ivf/IVFTimelineForm.tsx` is the single calculator, used by `IVFHero` and `/ivf-timeline`. No duplicate implementation exists. Supported on both surfaces: transfer date selection (past 300 days, no future dates), 3-day and 5-day transfer types, validation, calculation. Signed in or signed out; no authentication is involved at any point.

## 3. Address and analytics privacy

- Newly initiated calculations hand off through router state (`navigate("/ivf-timeline", { state: { transferMs, transferType } })`). New URLs containing treatment values = 0.
- Legacy `?date` / `?type` links remain readable. Resolution priority: navigation state, then legacy parameters, then the calculator form.
- After a valid legacy read the values are held in component state and the address is replaced with clean `/ivf-timeline` (`replace: true`, guarded by a one-shot ref). No navigation loop, no duplicate calculation, and the reconstructed timeline survives the replacement. Back navigation returns to the previous page rather than a parameterised entry.
- Invalid or missing values never error: the calculator renders.
- Analytics verified: page events send `window.location.pathname` only, never `window.location.search`, and no transfer values are captured anywhere.
- Historical exposure caveat: any treatment values already recorded in a person's browser history, in a referrer or in upstream server logs from an original legacy URL cannot be removed retroactively. This is a known residual item, recorded as a privacy item to resolve before saved-timeline activation.

## 4. Storage audit

CURRENT TTC STORAGE SUPPORTS SAVED IVF TIMELINE = NO

The trying-to-conceive record holds cycle dates, regularity, trying/testing answers, support status and an IVF consideration answer, plus derived cycle dates. It has no field for an embryo transfer date or a transfer type, and the save routine accepts a fixed parameter list that does not include them. No optional metadata container exists on the record.

Future minimum persisted treatment values = 2

1. optional transfer date
2. optional transfer type

Using the existing updated timestamp. Calculated milestones and day counts must never be persisted; all timeline output is derived from those two source values. Nothing has been created — no migration was run in this phase.

## 5. Journey model (unchanged)

Saved lifecycles remain exactly `ttc`, `pregnancy`, `first_year`. No `ivf` lifecycle, no `/my-ivf-journey`, no competing active IVF journey. Conceptual model: trying to conceive → optional IVF treatment context → pregnancy when applicable.

## 6. Future save flow (documented only)

- Signed out: calculate freely, then an optional `Save my timeline` with "Sign in to keep your IVF timeline and return to it later." Never implicit.
- Signed in with an active trying-to-conceive journey: saving attaches the transfer date and type to that existing journey, confirms with `Timeline saved`, and offers `Update timeline`. No second active journey.
- Sign-in handoff: entered values survive sign-in, the person returns to `/ivf-timeline` with the values restored and never re-enters them. The return-route allow list in `src/lib/authIntent.ts` would need to permit `/ivf-timeline` at that point. Not changed in this phase.
- Trying to conceive → pregnancy handover: pregnancy becomes the active lifecycle; the IVF treatment context remains historical information attached to the prior trying-to-conceive journey; it must not become a competing active lifecycle and must not be deleted automatically merely because pregnancy became active. No migration behaviour implemented here.

## 7. Companion and AI

COMPANION ACCESS TO SAVED IVF TIMELINE STATE TODAY = NO

The trying-to-conceive resolver reads only `support_status` and `ivf_consideration`, so future transfer values would not be picked up without a separate approved change. Grounding changes = 0. AI runtime changes = 0. No prompt, memory or context-builder change.

## 8. Privacy and consent

Persisted transfer information would be personal health information. Future saving must be explicit, optional, authenticated, user-controlled and clearly explained. Using the calculator must never create a saved treatment record. Calculation-triggered persistence writes in this phase = 0 (no database write, no local or session storage write; router state is ephemeral transport only). Privacy and legal review is required before persistence activation.

## 9. Validation

- Focused Phase 34F tests: 15 passed (routing, standalone form, 3-day, 5-day, shared implementation, navigation-state priority, legacy resolution and parameter stripping, invalid fallback, no save control, no persistence write, lifecycle list, analytics).
- Full suite, typecheck twice, lint against baseline, production build: recorded in the frontend report.
- Browser QA at 1280 / 834 / 390.
- Production deployed = 0.
