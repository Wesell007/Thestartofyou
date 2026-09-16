# Phase 34H.1 — IVF timeline save experience

Status: CLOSED PASS / FEATURE OFF / ACTIVATION GATES REMAIN
Flag: `IVF_TIMELINE_SAVE_ENABLED` (from `VITE_IVF_TIMELINE_SAVE_ENABLED`) — default FALSE
Schema changes: 0 (Phase 34G columns reused)
Deployed: NO. Activated: NO. Privacy and legal approval: NOT GRANTED.

## Purpose

Build the complete Save / Update / Load / Remove experience for `/ivf-timeline` on top of the
Phase 34G persistence foundation, without activating it. While the flag is FALSE the page behaves
exactly as Phase 34F left it.

## Architecture

Three layers, deliberately separated:

| Layer | File | Responsibility |
| --- | --- | --- |
| Feature controller | `src/components/ivf/IVFTimelineSaveController.tsx` | Mounted only while the flag is ON. Decides which mode the visible area renders, if any. |
| State machine | `src/hooks/useIVFTimelineSave.ts` | Auth, lifecycle, saved-context load, save/update/remove, saved-vs-current comparison, historical determination. |
| Visible area | `src/components/ivf/IVFTimelineSaveArea.tsx` | Presentation only. No persistence calls, no auth reads. |

`src/pages/IVFTimeline.tsx` mounts the controller behind `IVF_TIMELINE_SAVE_ENABLED &&`. The hook is
called unconditionally inside the controller, so no React hook is ever called conditionally: when the
flag is FALSE the controller component is never created and the hook never executes.

```text
IVFTimeline (page)
  └─ flag ON ─▶ IVFTimelineSaveController ──▶ useIVFTimelineSave (auth, lifecycle, 34G helpers)
                      └─ mode ─▶ IVFTimelineSaveArea (copy, buttons, confirm dialog, live region)
```

## Feature-off contract

While `IVF_TIMELINE_SAVE_ENABLED` is FALSE:

- the controller is not mounted, so `useIVFTimelineSave` never runs;
- `loadIVFTimelineContext`, `saveIVFTimelineContext` and `clearIVFTimelineContext` are called 0 times;
- no save, update, remove or status element exists in the DOM (not hidden — absent);
- the calculator, its hub handoff and its legacy query handling are unchanged.

## Modes

| Mode | Condition | Primary copy |
| --- | --- | --- |
| `signed_out` | Flag ON, not signed in, a current calculation exists | "Want to keep this timeline?" |
| `save` | Active lifecycle `ttc`, current calculation, no saved context | "Save my timeline" |
| `saved` | Saved context equals the current calculation | "Timeline saved" |
| `update` | Saved context differs from the current calculation | "Update saved timeline" |
| `historical` | Saved context exists but cannot be offered for saving (other lifecycle, or outside the calculator's entry range with nothing on screen) | "Saved IVF timeline" |
| `no_journey` | Signed in, no TTC journey row | "Saving is connected to a Trying to Conceive journey." |

Nothing renders while the state is loading, or when there is neither a current calculation nor a
saved context.

## Copy

- Signed out: "Want to keep this timeline?" / "Sign in to save your IVF timeline to your Trying to
  Conceive journey. You'll return here after signing in and can re-enter your transfer details to
  save them." / "Sign in to save".
- Save: "Save my timeline" / "Save your embryo transfer date and transfer type to your Trying to
  Conceive journey so you can return to this timeline later." / "Calculated milestones are not
  stored."
- Saved: "Timeline saved" — no timestamp, no "automatically saved" wording.
- Update: "Update saved timeline" / "This will replace the transfer details currently saved to your
  TTC journey."
- Remove dialog: "Remove your saved IVF timeline?" / "This removes your saved embryo transfer date
  and transfer type from your Trying to Conceive journey. It won't delete your TTC journey or your
  other answers." / "Remove saved timeline" + "Cancel".
- No journey: "Saving is connected to a Trying to Conceive journey." with "Start your TTC journey"
  offered only when no other lifecycle is active.
- Errors: calm generic copy only ("Something went wrong. Please try again."). No database text, no
  identifiers, no transfer values.

All privacy wording is provisional and factual; it makes no consent, GDPR or retention claim.

## Current-calculation priority

The displayed timeline resolves as `navigation state ?? legacy query ?? carried state ?? restored
saved context` — restored context is last, so any explicit calculation wins.

Saved context is restored into the calculator only when, at the moment the load resolves, nothing is
displayed, the active lifecycle is `ttc`, and the saved date is still inside the calculator's entry
range. The decision reads a ref holding the live current value, not the value captured when the
request started, so a calculation made while the load is in flight is never replaced. Restoration
performs no write.

## Auth handoff

- AUTH FLOW TYPE: full-page redirect via `/auth` (Google OAuth and magic-link email).
- SIGNED-OUT VALUES PRESERVED THROUGH AUTH: NO. Both flows leave the site and return through a fresh
  document load, so router navigation state cannot survive. No alternative store was introduced.
- AUTH HANDOFF DECISION: ACCEPTED RE-ENTRY UX. The signed-out copy states the re-entry requirement,
  so nobody is told their values will survive sign-in.
- Return route: `buildAuthUrl("return_to_route", "/ivf-timeline")`. The URL carries no treatment data.

## Write-state safety

States: IDLE, SAVING, SAVED, UPDATING, REMOVING, ERROR. Actions are disabled during a write and a ref
guard blocks re-entry, so duplicate writes = 0. Status is announced through a polite live region;
errors render in an alert region.

## Privacy boundaries

No transfer date or type is written to analytics, console logs, error telemetry, breadcrumbs, URLs,
query strings, hashes, auth metadata, localStorage, sessionStorage or cookies. Only the two Phase 34G
columns on the existing TTC journey row are ever written, and only on explicit press.

## Out of scope

No Companion integration (Companion access = NO), no AI or grounding change, no analytics event, no
new lifecycle, no `/my-ivf-journey`, no schema change, no migration, no deployment.
