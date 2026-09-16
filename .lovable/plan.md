# Phase 34H.1 — IVF timeline save experience (feature OFF)

Build the complete save / update / load / remove experience for the IVF timeline on `/ivf-timeline`, behind the existing `IVF_TIMELINE_SAVE_ENABLED` flag which stays FALSE. No activation, no deployment, no schema change, no new lifecycle.

## Auth handoff audit (already verified)

The sign-in flow uses Google OAuth and magic-link email, both of which leave the site and return through a full page load at `/auth`. React Router navigation state does not survive that round trip, and the only surviving mechanisms are the address bar and browser storage — both forbidden for treatment values.

- AUTH FLOW TYPE = full-page redirect (OAuth + magic link) via `/auth`
- SIGNED-OUT IVF VALUES CAN SURVIVE AUTH EPHEMERALLY = NO
- Decision: ACCEPTED RE-ENTRY UX. After signing in the person returns to `/ivf-timeline` (already on the safe return list) and re-enters the two values. No new storage mechanism is invented.

## What gets built

Two separate things, so the feature boundary stays clean and no React hook is ever called conditionally:

- A save feature controller component, mounted on `/ivf-timeline` only when the flag is ON. It owns authentication state, lifecycle state, the saved-context load, the save/update/remove state machine, the saved-versus-current comparison and the historical determination. The hook is called unconditionally inside it.
- The visible Save / Update / Remove area, which renders only when the situation calls for it.

States and copy:

- Signed out: "Want to keep this timeline?" / "Sign in to save your IVF timeline to your Trying to Conceive journey and return to it later." / `Sign in to save`. Nothing is written before authentication.
- Signed in, active TTC, nothing saved: `Save my timeline` with "Save your embryo transfer date and transfer type to your Trying to Conceive journey so you can return to this timeline later." and "Calculated milestones are not stored."
- Saved context identical to what is on screen: `Timeline saved` only — no active Save button, no redundant write, no save timestamp.
- Saved context differs: `Update saved timeline` with "This will replace the transfer details currently saved to your TTC journey." Never automatic.
- Signed in, no TTC journey: "Saving is connected to a Trying to Conceive journey." plus the existing `Start your TTC journey` action only when no other lifecycle is active. No insert, upsert or placeholder.
- Active pregnancy or first year with saved context: historical `Saved IVF timeline` display with date and type, Remove available, no Save or Update, never reconstructed as an active treatment timeline.
- Saved context older than the calculator's entry range: shown as historical, never forced through entry validation, never auto-cleared, removable.
- Remove: `Remove saved timeline` behind a confirmation dialog ("Remove your saved IVF timeline?" / "This removes your saved embryo transfer date and transfer type from your Trying to Conceive journey. It won't delete your TTC journey or your other answers." / `Cancel` and `Remove saved timeline`). After a successful clear the on-screen calculation stays visible and the TTC journey and its answers are untouched.

Interaction states IDLE / SAVING / SAVED / UPDATING / REMOVING / ERROR, with the action disabled during a write so repeated clicks cannot produce a second write. Status changes announced via a polite live region; focus returns to the action area after save or remove; errors use calm generic copy with no database text, identifiers or treatment values.

Priority and restoration rules:

- A current explicit calculation (form, hub handoff, navigation state) always remains the displayed timeline; stored context then only decides Save / Saved / Update / Remove or historical state.
- With no current calculation and an active TTC journey, a usable saved context may reconstruct the normal timeline from the two source values. No write occurs.

## Feature-off boundary

With the flag FALSE the controller never mounts, so the hook never runs and the load, save and clear helpers are called zero times — `/ivf-timeline` behaves exactly as in Phase 34F. Tested explicitly.


## Technical details

- New: `src/components/ivf/IVFTimelineSaveArea.tsx`, `src/hooks/useIVFTimelineSave.ts`, tests in `src/test/phase34h1IvfSaveExperience.test.tsx`.
- Changed: `src/pages/IVFTimeline.tsx` (flag-gated mount, saved-context fallback when no current calculation), reusing `ConfirmDialog`, `useLifecycle`, `buildAuthUrl("return_to_route", "/ivf-timeline")` and the Phase 34G helpers in `savedTTCJourney.ts`. No change to the helpers themselves, to analytics, to companion or AI code.
- Tests mock auth, lifecycle and the three persistence helpers; the flag module is mocked ON for feature-on tests. No real transfer values are written to the shared database. The flag default stays FALSE and the shared environment flag is not enabled.
- Validation: focused 34H.1 tests, Phase 34F and 34G suites, TTC tests, full suite, typecheck twice, lint against baseline, production build, responsive feature-off QA at 1280 / 834 / 390 across `/ivf-timeline`, `/ivf`, `/ivf/before-transfer`, `/ivf/after-transfer`, `/ivf/early-pregnancy`, and mocked feature-on UI QA.

## Documentation

`docs/content/phase34h1-ivf-timeline-save-experience.md`, `docs/content/phase34h1-ivf-timeline-save-ux-evidence.md`, `docs/content/phase34h1-ivf-timeline-activation-readiness.md`, plus a roadmap entry. These record the state machine, every state's copy, the auth-handoff result above, accessibility, tests, files changed, activation blockers and the deployment state (schema change in 34H.1 = NO; application deployed = NO; feature activated = NO).

Closure on pass: PHASE 34H.1 — CLOSED PASS / FEATURE OFF / ACTIVATION GATES REMAIN. Phase 34H.2 recommended but not started.
