# Phase 16.3A — Signed-in First Year Landing Surface (planning report)

Planning only. No code, routes, UI, schema, migrations, RPCs, AI or tracking in this phase.

## Recommended route

`/my-first-year`

Why:
- It matches the existing signed-in naming family: `/my-week`, `/my-journey`, `/my-ttc-journey`. `/first-year/journey` would sit inside the public hub namespace and risk sitemap and canonical drift; `/my-baby` excludes the "For you" side, which is half the product.
- It keeps the public `/first-year` hub untouched as the editorial surface.
- It is a clean, stable value for `FIRST_YEAR_POST_SAVE_DESTINATION`.

Route must be protected, `noindex` via `SeoHead`, and excluded from the sitemap (the generator only picks up public data sets, so no change is expected — confirm during build).

## Route and auth plan

Audited: `src/App.tsx`, `src/lib/authIntent.ts`, `src/pages/MyJourney.tsx`, `src/pages/setup/FirstYearSetup.tsx`.

- Add `<Route path="/my-first-year" element={<ProtectedRoute><MyFirstYear /></ProtectedRoute>} />` alongside the other signed-in routes (near `/my-journey`), lazy loaded like `FirstYearSetup`.
- Add `"/my-first-year"` to `PROTECTED_ROUTE_PREFIXES` in `src/lib/authIntent.ts` so signed-out deep links round-trip through `/auth?intent=return_to_route&return_to=/my-first-year`.
- `resolvePostLoginDestination` currently checks pregnancy then TTC then falls back to `/due-date-calculator`. Add a lifecycle check: if the `journeys` pointer is `first_year`, return `/my-first-year` before the pregnancy branch.

Guard behaviour on `/my-first-year`, mirroring the `FirstYearSetup` pattern (read the `journeys` pointer first, then the specific journey row):

| Visitor | Behaviour |
| --- | --- |
| Signed out | `ProtectedRoute` sends to `/auth` with return_to preserved |
| lifecycle `first_year` with a journey row | Render the landing surface |
| lifecycle `pregnancy`, status `given_birth` | Redirect to `/setup/first-year` (they can finish the transition) |
| lifecycle `pregnancy`, any other status | Redirect to `/my-week` |
| lifecycle `ttc` | Redirect to `/my-ttc-journey` |
| No pointer / no journey at all | Redirect to `/due-date-calculator` (existing no-journey convention) |
| Pointer says `first_year` but no `first_year_journeys` row or no babies | Redirect to `/setup/first-year` rather than rendering an empty page |

Errors use the same calm loading / retry states as `FirstYearSetup`, never a raw database message.

## Data access plan

Reuse the 16.1B foundation unchanged: `src/lib/firstYearJourney.ts` (`getActiveFirstYearJourney`, `getBabies`, `getPrimaryBaby`, `getBabyAge`) and `src/lib/firstYearDates.ts` (`getFirstYearAge`).

Page reads, all scoped by `auth.uid()` via RLS:
1. `supabase.auth.getUser()` for the user id.
2. `journeys.lifecycle` pointer.
3. `getActiveFirstYearJourney(userId)` — status, `started_at`, `archived_pregnancy_journey_id`, `source_pregnancy_lmp_date`.
4. `getBabies(userId)` — all babies in birth order; primary derived with `getPrimaryBaby` semantics.
5. `getFirstYearAge(primary.date_of_birth)` for hero and month linking.
6. `archived_pregnancy_journey_id` used only to decide whether the "pregnancy chapter kept" card shows.

No foundation changes identified as blockers. One note for 16.3B: multiples with different dates of birth are not supported by the current single-date setup step; the landing page should read each baby's own `date_of_birth` anyway so it stays correct if that changes later.

## Landing page section plan

1. **Welcome hero** — kicker "A new chapter", heading "Your First Year journey has begun.", supporting line using derived age ("Your baby is 3 weeks old. You are in a new chapter too."). Multiples use "Your babies are …". No exact date of birth shown.
2. **Baby summary card** — name when present, otherwise "Your baby" / "Your babies"; derived age in weeks for the early window and months after; a quiet link to the matching month page (`/first-year/{month}` via `firstYearMonthIndex`).
3. **For baby lane** — card group linking to existing public topic hubs: feeding (`/first-year/feeding`), sleep (`/first-year/sleep`), development and milestones (`/first-year/development`), nappies and care (`/first-year/care-and-safety`), check-ups and questions (`/first-year/checkups-and-warning-signs`). No tracking.
4. **For you lane** — recovery after birth (`/first-year/postpartum-recovery`), body and hormones (`/first-year/body-and-hormones`), emotional wellbeing (`/first-year/emotional-wellbeing`), rest and support (article-level link chosen at build time), questions for your midwife, GP or health visitor (`/first-year/checkups-and-warning-signs`). No check-ins or symptom tools.
5. **Pregnancy chapter kept** — warm card: the pregnancy chapter is kept, saved memories stay readable, kept weeks remain open. Links to the kept chapter surfaces. No archive or database language.
6. **What comes next** — short, subtle: more First Year support is on the way; nothing is tracked yet; "Cindy is still here" with no implication she uses private pregnancy memories.

## Multiples handling plan

Version one shows the primary baby first with an acknowledgement line, never a switcher.

- One baby with name: "Ada is 3 weeks old."
- One baby without name: "Your baby is 3 weeks old."
- Twins with both names: "Ada and Mia are 3 weeks old."
- Twins with one name blank: "Ada and your second baby are 3 weeks old."
- Twins with both blank: "Your babies are 3 weeks old."
- Triplets / four babies: list names where present, otherwise "Your three babies" / "Your four babies"; single shared age line.

Copy is produced by a small pure helper (testable, no UI coupling) so a later baby switcher, per-baby dashboards and per-baby tracking can build on the same baby array without rework.

## Post-save destination and /my-journey bounce plan (for 16.3B)

- Repoint `FIRST_YEAR_POST_SAVE_DESTINATION` in `firstYearSetupConstants.ts` from `/my-journey` to `/my-first-year`. `FirstYearSetup` already reads the constant in both the save redirect and the already-transitioned early redirect, so one value change covers both.
- In `src/pages/MyJourney.tsx`, the no-active-pregnancy branch currently navigates to `/due-date-calculator` (line 127). Before that fallback, check the `journeys` pointer: if it is `first_year`, redirect to `/my-first-year`. Pregnancy and TTC behaviour is unchanged.
- `authIntent.resolvePostLoginDestination` gains the same lifecycle check so returning First Year users land correctly after sign-in.

## Visual token plan

- Page background and "For baby" lane: `--stage-firstyear`, `--stage-firstyear-soft`, `--stage-firstyear-accent`, `--stage-firstyear-deep`.
- "For you" lane: `--stage-recovery` family, with `--stage-postpartum` / `--stage-postpartum-accent` as the warm accent where a card needs separation.
- No pregnancy stage tokens anywhere on this page. Shared shell (`MyWeekHeader`, `MyWeekFooter`, `keepsake-surface`, `rounded-pill`, `font-serif` headings, `font-sans` interface text) keeps it inside the premium system.
- Two lanes read as one journey: same card geometry and rhythm, different accent family and section kicker.

## Accessibility and mobile

Mobile-first single column at 375px, two-lane grid from `md`. Semantic `h1` then `h2` per section, cards as real links with descriptive accessible names, visible focus rings, decorative art `aria-hidden`, fixed card heights or reserved space to avoid layout shift, calm loading and redirect states with no broken-looking empty states.

## Files likely to change in 16.3B

- `src/pages/firstyear/MyFirstYear.tsx` (new)
- `src/components/firstyear/journey/*` (new: hero, baby summary, lane cards, kept-chapter card, what-comes-next)
- `src/lib/firstYearCopy.ts` (new pure multiples copy helper) plus its test
- `src/App.tsx` (route registration)
- `src/lib/authIntent.ts` (prefix + post-login lifecycle branch)
- `src/pages/MyJourney.tsx` (bounce fix only)
- `src/components/firstyear/setup/firstYearSetupConstants.ts` (destination value)

## Files that must not change

`src/lib/companionContext.ts`, `src/components/myweek/SectionAskAI.tsx`, `supabase/functions/**`, `src/lib/firstYearJourney.ts` and `src/lib/firstYearDates.ts` (unless a real blocker appears), all migrations and RPCs, `src/integrations/supabase/*`, public First Year and Postpartum pages, TTC surfaces, `scripts/generate-sitemap.ts`.

## QA plan

Route and auth: signed-out deep link and return, first_year user, pregnancy user (active and given_birth), TTC user, no-journey user, pointer-without-row case.

Data display: one baby with and without name, twins, triplets, four babies, day-zero and week/month boundary ages, missing optional name, archived pregnancy link present and absent.

Visual: side-by-side against `/first-year` and `/postpartum` content, confirm no pregnancy palette drift, confirm the two lanes are distinct but connected, 375px and desktop.

Regression: `/setup/first-year`, `/my-week`, `/my-journey`, Kept Chapter, Account Settings export, TTC journey, public hubs, AI Ask.

Checks: `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, lint, build, and a throwaway-account Playwright pass for the full transition into the new landing surface.

## Risks and blockers

- Repointing the destination before the page is live would strand users: land the page and the constant change in the same phase.
- `/my-journey` is pregnancy-specific; the bounce fix must be a narrow lifecycle branch, not a rewrite.
- Multiples share one date of birth today; copy should not assert identical ages beyond what the data supports.
- Companion copy must stay free of any suggestion that pregnancy memories are in use.

## Recommended Phase 16.3B build scope

Build `/my-first-year` with the six sections, the multiples copy helper and its tests, route and auth wiring, the `/my-journey` lifecycle branch, and the `FIRST_YEAR_POST_SAVE_DESTINATION` repoint. Nothing else.
