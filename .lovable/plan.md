# Phase 27F — Insert-Card Entry and Journal Owner State

Presentation and routing only. No schema, RLS, storage, AI, purchase flow or ownership verification.

## Discovery findings

1. Routes live centrally in `src/App.tsx`. `/journal` renders `Product`, `/product` redirects to `/journal`. Both stay untouched.
2. `/setup` is a public route (not wrapped in `ProtectedRoute`) that resolves lifecycle itself; `/setup/first-year` and `/setup/trying-to-conceive` are protected.
3. Signed-in pregnancy routes (`/my-week`, `/my-journey`, `/pregnancy-toolkit/*`) are all wrapped in `ProtectedRoute`.
4. Auth re-entry is modelled in `src/lib/authIntent.ts`: `buildAuthUrl("start_journey")` plus `resolvePostLoginDestination`, which already sends users to `/setup`, `/my-week`, `/my-first-year` or `/due-date-calculator`. No custom auth flow is needed.
5. Existing device-level preference patterns use plain `localStorage` helpers with SSR-safe guards: `src/lib/consent.ts`, `savedJourney.ts` (pending journey), `firstYearReminderNotifications.ts`, `firstYearCareEventsSchema.ts`. A new helper module follows the same shape.
6. `JournalBridgeCard` takes `variant` (`owner` | `discovery`) as a prop, defaulting to `discovery`. No caller passes it today, so all five placements render discovery copy.
7. No account-wide user preference system exists beyond profile name/companion fields; nothing suitable for ownership, so localStorage is the right first version.
8. Best home for the new page: `src/pages/JournalStart.tsx`, registered as a public route in `App.tsx` above the generic routes.
9. `/journal-start` is safe: no collision with `/journal` (React Router matches full segments), no sitemap extractor picks it up, and it will carry a `noindex` SeoHead.
10. Signed out visiting it: page renders fully, CTA sets the flag then goes to `/auth?intent=start_journey`.
11. Signed in visiting it: CTA sets the flag then routes by journey state.
12. Signed in with an active pregnancy journey: `/my-week`.
13. Signed in without one: `/setup`.
14. Public `/journal` and the `/product` redirect are unaffected.
15. First Year is unaffected; the flag is only read by `JournalBridgeCard` placements, which are pregnancy-only.

## What changes

### 1. Preference helper — `src/lib/journalOwner.ts`
- Key `theStartOfYou:pregnancyJournalOwner`, value `"true"`.
- `isJournalOwner()` returns false by default and on any storage error.
- `setJournalOwner()` / `clearJournalOwner()`.
- Presentation only: never gates a feature.

### 2. New route `/journal-start` — `src/pages/JournalStart.tsx`
- Public, added to `App.tsx` alongside the other public routes.
- `SeoHead` with `noindex` and a canonical, matching existing patterns.
- Cream paper background, one `WatercolourWash`, one botanical sprig (`aria-hidden`), a single `pregnancy-paper` card using `pregnancyStyles.ts` tokens only.
- Copy exactly as briefed: eyebrow "THE START OF YOU JOURNAL", single H1 "Welcome to your digital companion.", body and support line, primary CTA "Start my pregnancy journey" (`PG_SOFT_PILL`, min 44px), secondary link "I do not have the journal" (`PG_QUIET_LINK`).
- Owner CTA: set the preference, then resolve destination — signed out → `buildAuthUrl("start_journey")`; signed in with an active pregnancy journey → `/my-week`; signed in without → `/setup`.
- Secondary link: same destination resolution, without setting the preference.

### 3. Bridge tone
Pass `variant={isJournalOwner() ? "owner" : "discovery"}` at the five existing placements (`MyWeek`, `MyJourney`, the three toolkit cues). No new cards, no copy changes.

### 4. Tests
New `src/lib/journalOwner.test.ts` (default false, set, clear, storage failure safe) and additions to `JournalBridgeCard.test.tsx` for owner-variant wiring. A focused render test of `JournalStart` asserting copy, one H1, both actions and no purchase language.

## Verification
Playwright at 390px and 1440px on `/journal-start`, `/my-week`, `/my-journey` and the three toolkit routes in all four user states, plus smoke on `/journal`, `/product`, a public pregnancy page and a First Year route. Then `npx tsgo --noEmit -p tsconfig.json`, targeted tests, `npx vitest run`, `npm run build`.

## Out of scope
QR generation, account-wide ownership, settings UI, pregnancy Memories route, Fable upgrade, any purchase or checkout surface.
