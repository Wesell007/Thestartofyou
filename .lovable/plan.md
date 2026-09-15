# Phase 34F — IVF timeline routing fix and save-state design

Scope: fix the broken timeline buttons and make the timeline tool usable on its own. Saving is designed and documented only; nothing is stored, no new journey type, nothing deployed.

## 1. The defect

The stage pages' timeline action ("Track your IVF timeline" / "Use timeline") points at `/ivf`, the hub, not at the timeline tool. Someone arriving there sees the hub again and has to find the small date form. The real tool page `/ivf-timeline` also has no way to enter anything: without a date in the address it only shows a message telling people to go back to the hub.

Audited timeline actions: 3 stage-page actions (before transfer, after transfer, early pregnancy) plus the hub's own date form (correct) and the fallback text link on the tool page (points back to the hub). Incorrect destinations before: 3. After: 0.

## 2. Routing fix

- Point all three stage timeline actions at `/ivf-timeline`.
- Give `/ivf-timeline` its own transfer-date and transfer-type form, reusing the same calculator the hub already has, so it is a real starting point instead of a dead end. Anyone can calculate, signed in or not.
- Keep the hub form working exactly as today (it already lands on `/ivf-timeline` with the entered values).
- Keep the separate written guide "IVF timeline, what to expect" clearly a guide, not the tool.

## 3. What is deliberately not changed

- No new saved journey type. Saved journeys stay exactly: trying to conceive, pregnancy, first year.
- No `/my-ivf-journey`, no change to "Start your journey", no Save button yet, no data stored.
- No changes to the Companion, to guidance content, imagery, articles, or grounding.

## 4. Storage audit result (documented, not built)

Can today's trying-to-conceive storage hold an IVF timeline? **No.** The record keeps cycle dates and an "IVF consideration" answer, but has nowhere for a transfer date or transfer type, and the save routine accepts a fixed list of answers that does not include them.

Smallest future change, written up for approval and not created now: two optional values (transfer date, transfer type) plus the existing updated timestamp on the same trying-to-conceive record, saved only by an explicit action, readable only by the person themselves under the existing access rules. Nothing else is stored: every day and milestone shown is recalculated from those two values.

Does the Companion see saved IVF information today? **No.** It reads only the two named answers from the record, so new values would not be picked up without a separate approved change.

## 5. Documented design for later approval

Written into the phase document, not built:

- Signed-out: calculate freely; an optional "Save my timeline" with "Sign in to keep your IVF timeline and return to it later."
- Signed in with a trying-to-conceive journey: saving attaches the transfer date and type to that journey, shows "Timeline saved", and offers "Update timeline". No second active journey.
- Sign-in handoff: carry the entered date and type through sign-in and return to `/ivf-timeline` with them restored, using the existing pending-journey and return-route mechanism (the return-route allow list would need `/ivf-timeline` added when saving is activated).
- Moving to pregnancy later: pregnancy becomes the active journey, the IVF timeline stays as history, is never treated as a competing active journey, and is not deleted automatically.
- Privacy: treatment information is health information. Saving must stay explicit, optional, signed in and clearly explained; using the calculator must never store anything. Privacy and legal review required before saving is switched on.

## 6. Technical notes

- `src/data/ivfTopicData.ts`: `LINKS.timeline` changes from `/ivf` to `/ivf-timeline`; kind stays `tool`.
- New `src/components/ivf/IVFTimelineForm.tsx`, extracted from the existing hub calculator card in `IVFHero.tsx` (date popover, 5-day/3-day select, submit navigating to `/ivf-timeline?date=…&type=…`). `IVFHero.tsx` and `src/pages/IVFTimeline.tsx` both render it; `IVFTimeline.tsx` shows it in place of the current "No transfer date provided" dead end, and above the result once a date is present.
- No changes to `savedTTCJourney.ts`, `save_ttc_journey`, `journeys`, `authIntent.ts`, or any context builder.
- Tests: extend `src/test/phase34eIvfUx.test.ts` (or a new `phase34fIvfTimelineRouting.test.ts`) to assert every `kind: "tool"` destination equals `/ivf-timeline`, and that the lifecycle list stays the three existing values.
- Docs: `docs/content/phase34f-ivf-timeline-routing-and-save-state.md` carrying the audit answers and the design above; roadmap entry.
- Validation: focused tests, full suite, typecheck, lint baseline, production build, and browser checks at 1280/834/390 that each stage action lands on `/ivf-timeline` and that a signed-out calculation works.
