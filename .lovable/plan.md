# Phase 34F — IVF timeline routing fix and save-state design

Scope: fix the broken timeline buttons and make the timeline tool usable on its own. No saving, no Save button, no new journey type, nothing deployed.

## 1. The defect

The three stage pages' timeline action ("Track your IVF timeline" / "Use timeline") points at `/ivf`, the hub, not at the timeline tool. The tool page `/ivf-timeline` also has no way to enter anything: without a date passed in it only shows a message sending people back to the hub.

Timeline actions audited: 5 (three stage actions, the hub's own date form, the tool page's fallback link). Incorrect destinations before: 3. After: 0. No new buttons are added.

## 2. Routing fix

- Point all three stage timeline actions at `/ivf-timeline`.
- Add the calculator directly to `/ivf-timeline`, so it works standalone: pick transfer date, pick transfer type, calculate. Signed in or signed out, no account needed.
- The hub form keeps working; the tool page's fallback message is replaced by the working form.

## 3. Shared form, one source of truth

Extract the existing hub calculator into `src/components/ivf/IVFTimelineForm.tsx` and use it from both the hub hero and `/ivf-timeline`. No second implementation.

## 4. Health-data address safeguard

Transfer date and type are treatment information. The hub currently passes them in the visible web address, where they can end up in browser history, server logs and referrers.

- The hub to timeline handoff moves to ephemeral in-app navigation state, so nothing sensitive appears in the address bar.
- Reading the existing address parameters stays supported for people who bookmarked or shared a link, but nothing new is added to them.
- Verified: analytics record only the page path, never the parameters. This is documented as a privacy item to resolve before saving is ever switched on.

## 5. No Save UI

No "Save my timeline", no disabled or coming-soon control. The tool calculates and shows the timeline. Saving stays a documented future capability.

## 6. Documented audit results (no code or database change)

- Current trying-to-conceive storage supports an IVF timeline: **NO**. The record and its save routine have no transfer date or transfer type.
- Future minimum storage: optional transfer date, optional transfer type, plus the existing updated timestamp. Two values only; every milestone is recalculated, never stored.
- Future model stays: trying to conceive journey, optional IVF treatment context, pregnancy when applicable. No `ivf` lifecycle, no `/my-ivf-journey`, no competing active journey.
- Future save flow: signed out calculates freely then an optional save with a clear sign-in explanation; signed in with an active trying-to-conceive journey, saving attaches the two values to that journey and confirms with "Timeline saved" plus an update action.
- Future sign-in handoff: preserve entered values, return to `/ivf-timeline`, restore them; the existing return-route allow list would need to permit `/ivf-timeline` at that point. Not changed now.
- Moving to pregnancy later: pregnancy becomes active, prior IVF context stays historical, never a competing lifecycle, never auto-deleted. No migration work now.
- Companion access to saved IVF timeline data today: **NO**. No Companion, prompt, runtime, grounding or memory changes.
- Privacy: future saved transfer information is personal health information; saving must be explicit, optional, signed in, user-controlled and clearly explained. Using the calculator must never create a saved record. Privacy and legal review required before persistence is activated.

## 7. Technical notes

- `src/data/ivfTopicData.ts`: `LINKS.timeline` `/ivf` → `/ivf-timeline`; kind stays `tool`.
- New `src/components/ivf/IVFTimelineForm.tsx` (date popover with `pointer-events-auto`, 5-day/3-day select, submit) navigating via `navigate("/ivf-timeline", { state: { transferMs, transferType } })`. `IVFHero.tsx` renders it in place of its inline card; `src/pages/IVFTimeline.tsx` renders it instead of the dead-end message, resolving values from router state first and existing query parameters second, keeping the current date validation.
- Untouched: `savedTTCJourney.ts`, `save_ttc_journey`, `journeys`, `authIntent.ts`, context builders, grounding, articles, imagery.
- Tests, new `src/test/phase34fIvfTimeline.test.tsx`: every `kind: "tool"` destination is `/ivf-timeline` (incorrect = 0); `/ivf-timeline` renders a usable calculator with no pre-filled state; 3-day and 5-day both resolve; invalid or missing values fall back to the form safely; no save control rendered; no database call during calculation; lifecycle list remains exactly ttc, pregnancy, first_year; grounding and AI runtime unchanged; analytics do not record the sensitive parameters.
- Docs: `docs/content/phase34f-ivf-timeline-routing-and-save-state.md` with the audit answers, the address-exposure note and the future design; roadmap entry.
- Validation: focused tests, full suite, typecheck twice, lint against baseline, production build, and browser QA at 1280/834/390 checking stage actions land on `/ivf-timeline`, standalone and hub calculation both work, no dead end, no sideways scrolling, no new console errors.
