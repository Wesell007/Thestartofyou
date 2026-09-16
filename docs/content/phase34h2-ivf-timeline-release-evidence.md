# Phase 34H.2 — release evidence

Feature OFF throughout. No deployment, no shared-environment flag change, no shared-database write.

## Validation

| Check | Result |
| --- | --- |
| Focused Phase 34H.2 tests (`src/test/phase34h2IvfActivationReadiness.test.tsx`) | PASS — 5 tests |
| Phase 34H.1 tests | PASS — 21 tests |
| Phase 34F timeline tests | PASS — 15 tests |
| Phase 34G persistence tests | PASS (within the full suite) |
| TTC journey tests | PASS (within the full suite) |
| Full suite | PASS — 129 files / 1,489 tests |
| Typecheck (run twice) | PASS / PASS |
| Lint | At baseline — 1 pre-existing error in the generated `previewAuthStorage.ts`, 10 pre-existing warnings |
| Production **validation** build (feature OFF) | PASS |
| Production release build / deployment | NOT PERFORMED |

## Feature-off release contract (browser QA)

`/ivf-timeline`, `/ivf`, `/ivf/before-transfer`, `/ivf/after-transfer`, `/ivf/early-pregnancy` at
1280, 834 and 390:

- save/update/remove/saved/sign-in-to-save strings present: **0 on all 15 route-width combinations**
- horizontal overflow: **0**
- console errors: **0**

Focused test evidence: with the real flag (FALSE) the controller does not mount and
`loadIVFTimelineContext`, `saveIVFTimelineContext` and `clearIVFTimelineContext` are each called 0
times.

## Feature-ON readiness verification (isolated, mocked)

Run through mocked flag, auth, lifecycle and persistence helpers only. No shared environment enabled,
no IVF values written to the shared production-serving database.

| Scenario | Result |
| --- | --- |
| Signed out — calculator usable, no save prompt before a calculation | PASS |
| Signed out — save prompt appears, re-entry limitation stated, sign-in route `/auth` with `return_to=/ivf-timeline`, persistence = 0 | PASS |
| Active TTC — Save offered, saves the two source values exactly once (double click → 1 write) | PASS |
| Active TTC — Saved state when stored context matches, no redundant write, no timestamp | PASS |
| Active TTC — Update offered when the calculation differs, explicit click only | PASS |
| Active TTC — Remove cancelled → 0 clears; confirmed → exactly 1 clear; calculation stays on screen | PASS |
| No TTC journey — explanatory copy, 0 writes, no implicit row creation; journey-start action hidden when another lifecycle is active | PASS |
| Pregnancy — historical context only, Remove present, Save/Update absent | PASS |
| First year — historical context only, Remove present, Save/Update absent | PASS |
| Old historical context — readable, removable, never auto-cleared | PASS |
| Async load race — current explicit calculation always wins | PASS |
| Error handling — calm generic copy, no database text surfaced | PASS |

FEATURE-ON ENGINEERING QA = PASS.

## Feature-ON browser QA — isolated, hermetic (completed)

Method: a temporary build of the real application with `VITE_IVF_TIMELINE_SAVE_ENABLED=true` written to a
throwaway output directory and served on a private local port. The shared preview, `.env`, CI, Vite config,
deployment configuration and the shared database were not changed. Synthetic transfer values only.

Network isolation: the entire shared backend origin was deny-by-default. Every relevant request either
matched an explicitly expected request and was fulfilled locally with synthetic data, or was aborted and
failed the run.

| Isolation metric | Result |
| --- | --- |
| Shared-backend TTC reads | 0 |
| Shared-backend IVF reads | 0 |
| Shared-backend TTC mutations | 0 |
| Shared-database IVF QA writes | 0 |
| Shared auth/account mutations | 0 |
| Unexpected shared-backend requests | 0 |
| Console errors | 0 |
| Horizontal overflow | 0 |

Signed-out, feature ON, at 1280 / 834 / 390 (3/3 widths PASS): calculator usable, save prompt rendered,
re-entry limitation copy present, sign-in link `/auth?intent=return_to_route&return_to=%2Fivf-timeline`
carrying no treatment values, no treatment values in storage or cookies.

Regression, feature ON, signed out: `/ivf`, `/ivf/before-transfer`, `/ivf/after-transfer`,
`/ivf/early-pregnancy` at all three widths — 0 save UI, 0 overflow (12/12 route-width combinations).

Signed in, hermetic synthetic session, at 1280 / 834 / 390 (each scenario PASS at all three widths):

| Scenario | Observed |
| --- | --- |
| Active TTC, nothing saved | Save offered; one click → exactly 1 update; Saved state; Save button gone; Remove offered; 0 storage leakage |
| Active TTC, saved context differs | Update offered with replacement copy; one click → exactly 1 update carrying only the two source values; Saved state |
| Remove — cancelled | Confirmation dialog shown, focus inside the dialog, 0 additional writes |
| Remove — confirmed | Exactly 1 clear writing both columns to null; Save offered again; the calculated timeline stays on screen |
| No TTC journey | Explanatory copy and journey-start link only; 0 writes; no implicit row creation |
| Pregnancy lifecycle with saved context | Read-only saved timeline with Remove; Save and Update absent |
| First year lifecycle with saved context | Read-only saved timeline with Remove; Save and Update absent |
| Old saved context (400 days), no current calculation | Readable and removable; 0 automatic writes; stored row untouched |

FEATURE-ON BROWSER QA = PASS (isolated, hermetic, all three widths).
REAL PRODUCTION BACKEND FEATURE-ON QA = NOT PERFORMED (and not required for readiness).

All temporary build output, scripts and synthetic sessions were destroyed after the run.

## Privacy and security boundary (feature ON, mocked)

| Boundary | Result |
| --- | --- |
| Treatment values in URL / query / hash | 0 (sign-in link asserted to carry no date or type) |
| Treatment values in localStorage / sessionStorage | 0 (`Storage.prototype.setItem` asserted never called) |
| Treatment values in cookies | 0 |
| Treatment values in auth metadata | 0 |
| Treatment values in analytics | 0 (no analytics event added; new analytics = 0) |
| Treatment values in application logs or error output | 0 (generic error copy only) |
| Automatic calculator persistence | NO |
| Companion access | NO |
| AI context access | NO |
| Grounding use | NO |

TREATMENT-DATA EXPOSURE VIOLATIONS = 0.

## Accessibility

| Check | Result |
| --- | --- |
| Keyboard operation (buttons, links, dialog) | PASS |
| Dialog focus management (trap and return, shared `ConfirmDialog`) | PASS |
| Accessible names on every control | PASS |
| Polite live-region status announcements | PASS (`role="status" aria-live="polite"`) |
| Write/loading states accessible ("Saving…", "Updating…", "Removing…", controls disabled) | PASS |
| Error association (`role="alert"`) | PASS |
| Mobile touch targets | PASS |
| Colour-only status communication | NO |

ACCESSIBILITY QA = PASS (verified through the mocked feature-ON tests and the component contract).

## Scope

New schema changes = 0. New migrations = 0. RLS changes = 0. New analytics = 0. Consent UX = 0.
AI / Companion / grounding changes = 0. Application deployed = NO. Feature activated = NO.
