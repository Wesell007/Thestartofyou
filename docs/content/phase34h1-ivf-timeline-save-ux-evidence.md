# Phase 34H.1 — save experience evidence

## Files

New:
- `src/hooks/useIVFTimelineSave.ts`
- `src/components/ivf/IVFTimelineSaveArea.tsx`
- `src/components/ivf/IVFTimelineSaveController.tsx`
- `src/test/phase34h1IvfSaveExperience.test.tsx`
- `docs/content/phase34h1-ivf-timeline-save-experience.md`
- `docs/content/phase34h1-ivf-timeline-save-ux-evidence.md`
- `docs/content/phase34h1-ivf-timeline-activation-readiness.md`

Changed:
- `src/pages/IVFTimeline.tsx` (flag-gated controller mount, restored-state slot last in the priority chain)
- `src/test/phase34gIvfPersistence.test.ts` (the feature-off assertion now allows the page to reference the flag solely as the mount gate; the form must still never reference it)
- `roadmap.md`

No schema change, no migration, no edge function, no analytics event, no Companion or grounding file touched.

## Test matrix — `src/test/phase34h1IvfSaveExperience.test.tsx` (21 tests)

Auth, lifecycle, the flag and the three Phase 34G helpers are mocked. No real database value is read
or written by any test.

Feature off:
1. Controller not mounted; load/save/clear called 0 times; no save, update, remove, saved or sign-in element present.
2. Calculator identical to Phase 34F; load called 0 times.

Signed out:
3. No save experience before a calculation; load called 0 times.
4. SIGNED-OUT AUTH COPY — "Sign in to save" shown, copy states the re-entry requirement, link points at `/auth` with `return_to=%2Fivf-timeline` and no transfer values, no persistence write, no browser-storage write.

Active TTC:
5. "Save my timeline" offered with the "Calculated milestones are not stored." line; two rapid clicks produce exactly one `saveIVFTimelineContext({ transfer_date, transfer_type })` call with the exact source values.
6. Saved context equal to the current calculation renders "Timeline saved" with no Save or Update control and 0 writes.
7. Differing saved context renders "Update saved timeline" with the replacement warning; the write happens only on click, exactly once.
8. No save timestamp rendered.

Restoration and priority:
9. Usable saved context with an empty screen reconstructs the timeline; 0 writes, 0 clears.
10. Current calculation outranks older saved context; saved context only drives the Update state.
11. ASYNC RESTORATION RACE — with the load pending, a calculation made before it resolves stays displayed; the late saved context only sets the Update state; no automatic persistence.

Historical and other lifecycles:
12. Out-of-range saved context shown as "Saved IVF timeline" with the date, no reconstructed timeline, no auto-clear, Remove available.
13. Pregnancy lifecycle — historical display only, no Save or Update, Remove available.
14. First-year lifecycle — historical display only with a current calculation present.
15. Non-TTC lifecycle without saved context — calculator usable, no save CTA.

Remove:
16. Cancelling the dialog calls clear 0 times.
17. Confirming calls `clearIVFTimelineContext` exactly once, returns to the Save state, and keeps the current calculation on screen.

No TTC journey:
18. Explanatory copy shown, no save call, "Start your TTC journey" offered.
19. With another lifecycle active, no journey-start action offered.

Errors and privacy:
20. A failing save shows only "Something went wrong. Please try again."; the raw constraint text never reaches the DOM.
21. A successful save writes nothing to browser storage (`Storage.prototype.setItem` spy, 0 calls).

## Validation run

| Check | Result |
| --- | --- |
| Focused 34H.1 tests | 21 passed |
| Phase 34F timeline tests | passed (within the full suite) |
| Phase 34G persistence tests | passed (assertion updated for the flag-gated mount) |
| TTC journey tests | passed (within the full suite) |
| Full suite | 128 files / 1,484 tests passed |
| `npm run typecheck` x2 | clean both times |
| `npm run lint` | at baseline — 1 pre-existing error in the generated `previewAuthStorage.ts`, 10 pre-existing warnings |
| `npm run build` | production build succeeded |
| Feature-OFF responsive QA | `/ivf-timeline`, `/ivf`, `/ivf/before-transfer`, `/ivf/after-transfer`, `/ivf/early-pregnancy` at 1280 / 834 / 390 — 0 save UI strings, 0 horizontal overflow, 0 console errors |
| Feature-ON QA | mocked DOM only (jsdom, flag mocked ON). The shared environment flag was never enabled and no QA value was written to the shared database. |

## Accessibility

- Status changes announced through a `role="status"` polite live region; failures through `role="alert"`.
- The remove confirmation is the shared `ConfirmDialog` (Radix): focus is trapped, Escape cancels, Cancel and Remove are reachable by keyboard.
- Buttons carry explicit text labels; the saved area is a labelled `section`.
- Busy state is conveyed through the disabled attribute plus visible wording, not colour alone.
- Touch targets use the standard button sizing at mobile width; the area stacks in a single column at 390.

## Known gaps

- Feature-ON visual QA at real viewport widths is not possible without enabling the shared environment flag, which is out of scope for this phase. It is listed as a Phase 34H.2 activation step.
