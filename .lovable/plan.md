# Phase 27C — Pregnancy App Shell and Navigation Parity

Navigation and shell only. No redesign, no new routes, no new features.

## Discovery findings

1. Signed-in pregnancy routes (all wrapped in `ProtectedRoute` in `src/App.tsx`): `/my-week`, `/my-week/:week` (kept chapter), `/my-journey`, `/pregnancy-toolkit`, plus toolkit sub-routes: birth-plan, hospital-bag, appointments, appointments/new, appointments/:id, baby-movements, contraction-timer, symptom-notes, questions-for-midwife.
2. `JourneyBottomNav` is mounted once globally in `App.tsx` (outside the route table) and decides visibility itself.
3. Pregnancy bottom-nav items already exist and are correct: This week `/my-week`, My journey `/my-journey`, Toolkit `/pregnancy-toolkit`, Account `/account`. No Memories item.
4. Active state uses `pathname === href || pathname.startsWith(href + "/")`, so toolkit sub-routes already mark Toolkit active. `/my-week/:week` already marks This week active.
5. Desktop header (`MyWeekHeader` via `resolveHeaderLinks`) shows only This week and My journey for the pregnancy lifecycle. Toolkit is missing on desktop.
6. Toolkit and all sub-routes render `MyWeekHeader` themselves; there is no shared pregnancy shell component, but the global bottom nav covers them because `PREGNANCY_NAV_ROUTES` includes the `/pregnancy-toolkit` prefix.
7. Bottom clearance comes from `body.has-journey-nav` (padding-bottom `4.25rem`, cleared at md), applied by the nav itself, so all relevant routes get it.
8. Gap found: `ConsentBanner` positions itself with `bottom-[var(--app-bottom-nav-inset,0px)]`, and that variable is only set by `FirstYearAppShell`. On pregnancy routes the variable is unset, so the banner sits at bottom 0 and can cover the pregnancy bottom nav (the First Year launch-readiness bug, still open for pregnancy).
9. Dialogs, sheets and the media lightbox use `z-50`, toasts `z-[100]`, bottom nav `z-40`, so overlays already layer above the nav. Inline (non-overlay) upload and reflection controls sit in flow and are cleared by the body padding.
10. Public pregnancy pages are unaffected: the nav requires an auth session plus a route-prefix match, and `MyWeekHeader` is only rendered by signed-in pages.

## Changes

1. **Shared nav inset constants** — move the inset variable name/value into a shared, lifecycle-neutral module (or export equivalents from `pregnancyStyles.ts`) so both journeys use one source of truth. No change to the First Year values.
2. **Publish the inset from `JourneyBottomNav`** — while the nav is visible on mobile, set `--app-bottom-nav-inset` on the document element and remove it on unmount. This makes the consent banner clear the pregnancy nav exactly as it does in First Year, with no change to consent logic. First Year keeps its own shell behaviour (same variable, same value, so no conflict).
3. **Desktop header parity** — add a Toolkit link (`/pregnancy-toolkit`) to `resolveHeaderLinks` for the pregnancy lifecycle and the null fallback, with a new `toolkit` tab id (already present in `NavTabId`). Header links render only in signed-in pregnancy context; public pages untouched.
4. **Active state for header links** — `MyWeekHeader` currently uses exact pathname equality, so Toolkit would not highlight on sub-routes. Switch header active detection to the shared `matchesRoute` prefix helper and add `aria-current="page"` on the active header link.
5. **Bottom-nav polish only where needed** — keep the 27B pregnancy tints; confirm 56px targets, safe-area padding, and add the shared pregnancy focus ring (`PG_FOCUS_RING`) to nav links. No new colours, no hex values.
6. **Clearance value** — keep `body.has-journey-nav` padding as-is unless verification shows overlap with in-flow actions at 390px; if it does, raise it to match the nav inset value.

## Tests

Extend `src/lib/navLifecycle.test.ts` and add a nav component test where practical:

- pregnancy header links are This week, My journey, Toolkit
- `matchesRoute` marks Toolkit active for `/pregnancy-toolkit` and `/pregnancy-toolkit/birth-plan`
- `/my-week/:week` infers pregnancy and marks This week active
- no Memories item in any pregnancy nav list
- First Year and TTC nav lists unchanged
- nav hidden when unauthenticated or off shell routes

## Verification

Playwright at 390px and 1440px on `/my-week`, `/my-week/:week`, `/my-journey`, `/pregnancy-toolkit`, one toolkit sub-route, plus smoke checks on a public pregnancy page, a public article, a First Year signed-in route and `/journal`. Check nav tappability with the consent banner present, overlay layering, focus rings, overflow and console. Then `npx tsgo --noEmit -p tsconfig.json`, targeted vitest, `npx vitest run`, `npm run build`.

## Later-phase notes

- Pregnancy Memories tab from the Nano Banana board: deferred, no route exists.
- Deeper Fable-led visual upgrade: out of scope here.
