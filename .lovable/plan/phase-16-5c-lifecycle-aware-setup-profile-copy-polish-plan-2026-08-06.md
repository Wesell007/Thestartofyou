# Phase 16.5C — Lifecycle-aware Setup/Profile Copy Polish (Plan)

Planning and audit only. No build.

## Audit findings

**Which file renders "What should we call you?"**
`src/pages/Setup.tsx` (route `/setup`, registered in `src/App.tsx` line 333, not wrapped in `ProtectedRoute` — it does its own session check and sends signed-out visitors to `/auth`).

**Helper copy**
Hardcoded in `Setup.tsx`: "Just your first name. We'll use it to greet you each week." No copy module involved.

**CTA copy**
Hardcoded in the submit button in `Setup.tsx`: "Continue to my week".

**Where it sends users after completion**
Hardcoded `navigate("/my-week", { replace: true })` after a successful profile upsert. There is a second hardcoded pregnancy redirect earlier: if a `first_name` already exists on load, the page immediately sends the user to `/my-week`.

**Can it read the lifecycle pointer?**
Yes. It already has the authenticated `user.id` and queries `profiles`; reading `journeys.lifecycle` for that user is the same access pattern used by `useLifecycle` and `authIntent`. No schema or policy change needed.

**Can it use auth intent or return path?**
Not reliably. `/setup` is not in `PROTECTED_ROUTE_PREFIXES`, so `parseSafeReturnTo` rejects it and `/auth` never forwards a `return_to` into `/setup`. `/setup` is also reached by direct redirect from other pages, which pass no state. Intent/return path is therefore not a usable signal here.

**Who can land here**
- Pregnancy: yes — `authIntent` sends pending-journey users and named-less pregnancy users to `/setup`; `MyWeek.tsx` (113) and `MyJourney.tsx` (142) redirect when `first_name` is missing.
- First Year: yes — `KeptChapter.tsx` (178) and `MyPregnancyChapter.tsx` (124) redirect to `/setup` when the profile name is missing, and both are First Year-reachable surfaces. Such a user currently gets pregnancy copy and is then thrown to `/my-week`, which does not belong to them.
- TTC: only by direct navigation today (`MyTTCJourney.tsx` does not gate on `first_name`), but the wording and the `/my-week` landing are still wrong for them.

**Can this be fixed without touching route guards?**
Yes. Every change is inside `Setup.tsx` plus a small pure copy helper. No guard, no redirect source, no schema change.

## Recommended behaviour

Resolve one lifecycle value on load, then derive copy, CTA and destination from it.

Lifecycle source: **pointer first, saved-journey fallback**, not return path.
1. `journeys.lifecycle` for the user (`pregnancy` | `ttc` | `first_year`).
2. If absent: a pending/saved pregnancy journey implies `pregnancy`; a saved TTC journey implies `ttc`.
3. Otherwise `null` (neutral).

| Lifecycle | Helper copy | CTA | Destination |
| --- | --- | --- | --- |
| pregnancy | Just your first name. We'll use it to greet you each week. | Continue to my week | `/my-week` |
| first_year | Just your first name. We'll use it to greet you in your First Year space. | Continue to my First Year | `/my-first-year` |
| ttc | Just your first name. We'll use it to greet you in your journey. | Continue to my journey | `/my-ttc-journey` |
| unknown | Just your first name. We'll use it to greet you. | Continue | existing fallback (`/due-date-calculator`) |

The same destination map applies to the early "already has a name" redirect, so a First Year user with a name is no longer bounced to `/my-week`.

The `commitPendingJourneyToDB` call, its error copy, the companion name/tone block and the profile fields all stay exactly as they are.

## Technical notes

- New pure helper, e.g. `resolveSetupCopy(lifecycle)` returning `{ helper, cta, destination }`, placed next to `src/lib/navLifecycle.ts` (or exported from it) so it is unit-testable and components stay branch-free.
- Reuse the existing `NavLifecycle` type.
- Lifecycle fetch folds into the existing `getSession` effect — one extra `maybeSingle()` read, no new render pass, and the button already shows a loading state so no copy flicker.

## Files that would change
- `src/pages/Setup.tsx`
- `src/lib/navLifecycle.ts` (or a new small `setupCopy.ts`) plus a matching unit test

## Files that must not change
`src/App.tsx`, `src/lib/authIntent.ts`, `ProtectedRoute.tsx`, `MyWeek.tsx`, `MyJourney.tsx`, `KeptChapter.tsx`, `MyPregnancyChapter.tsx`, `SetupTTC.tsx`, `FirstYearSetup.tsx`, `src/lib/companion.ts`, `AccountSettings.tsx`, migrations, RPCs, RLS, sitemap, robots, analytics.

## QA plan
- Unit test the copy/destination resolver for all four lifecycle values.
- Throwaway-account Playwright pass: pregnancy user with no name → pregnancy copy → `/my-week`; First Year user with no name (via `/my-pregnancy-chapter` redirect) → First Year copy → `/my-first-year`; TTC user visiting `/setup` → TTC copy → `/my-ttc-journey`; user with no lifecycle → neutral copy.
- Confirm a named First Year user hitting `/setup` lands on `/my-first-year`, not `/my-week`.
- Signed-out `/setup` still redirects to `/auth`.
- Pending-journey commit and its error state unchanged.
- Typecheck, tests, production build.

## Risks and open questions
- A First Year user whose lifecycle pointer read fails would fall to neutral copy and the neutral destination rather than pregnancy wording — acceptable and safer than the current behaviour.
- Open question: should the neutral fallback stay `/due-date-calculator`, or should it become a quiet "choose your journey" landing? Keeping the existing fallback for now unless you prefer otherwise.

## Next step
Phase 16.5D build can proceed once this is approved.
