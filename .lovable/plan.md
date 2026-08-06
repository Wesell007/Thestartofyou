# Phase 16.6A — Public First Year entry and direct First Year onboarding

Planning only. No build in this phase.

## Audit findings

**Public hub `/first-year`**
- `src/pages/FirstYear.tsx` is a thin composition of `src/components/firstyear/new/*`.
- No CTA anywhere on the hub starts a First Year journey. Every CTA is editorial: `FYHero` links to `#baby-topics` / `#recovery-topics`, `FYFinalCTA` links to the baby topics anchor and `/first-year/postpartum-recovery`, `FYPathways` links to other content.
- First Year topic pages (`/first-year/feeding` etc.) have no signed-in CTA either.
- So today a signed-out user has no First Year CTA to click at all. There is nothing to break.

**Setup route `/setup/first-year`**
- Protected (`ProtectedRoute`), `noindex`, 4 steps (Intro, Babies, Companion, Review).
- Its guard is strictly transition-only: it reads `journeys.lifecycle`; `first_year` → `/my-first-year`, missing pointer or any non-pregnancy lifecycle → `/my-journey`, pregnancy `active` → `/my-week`, and anything other than `given_birth` → `/my-journey`.
- Result: a user with no pregnancy journey **cannot** reach it today. They are bounced to `/my-journey`, which for a user with nothing saved forwards on to the due date calculator.
- Copy is transition-specific: `StepIntro` leads with "Your pregnancy chapter is kept", and the companion step offers "Personalise Cindy with my pregnancy journey".

**Backend**
- `save_first_year_journey(p_babies jsonb)` does **not** require a pregnancy journey. It reads `pregnancy_journeys` with `SELECT ... INTO`; when no row exists `v_preg` stays null, the archive block is skipped (`IF v_lifecycle = 'pregnancy' AND v_preg.user_id IS NOT NULL`), `archived_pregnancy_journey_id` stays null, and it still inserts babies, upserts `first_year_journeys` and upserts `journeys.lifecycle = 'first_year'`.
- It only raises for sensitive pregnancy states (`pregnancy_loss`, `paused`, `no_longer_pregnant`), which is correct behaviour to keep.
- **No new RPC is needed. No schema change is needed.** The existing function already supports direct start, including multiples.
- The function is SECURITY INVOKER, so it relies on the caller's RLS. `journeys`, `first_year_journeys` and `babies` each have owner-scoped insert/update policies plus `authenticated` grants, so the required writes already work for a user with no pregnancy history.

**Signed-in surfaces**
- `/my-first-year` already handles the no-kept-chapter case: it derives `hasKeptChapter` from `archived_pregnancy_journey_id` and `PregnancyChapterKeptCard` hides the link when false. However it still renders the whole "Your pregnancy chapter is kept" card with reassurance copy — wrong for a direct-start parent who never had a pregnancy journey here.
- `/my-pregnancy-chapter` guards on the archived chapter and is not linked when absent, so it stays hidden correctly.
- Lifecycle-aware nav (`navLifecycle.ts`) is keyed on `lifecycle === "first_year"` plus a `hasKeptChapter` flag, so it already supports direct users with no changes.
- `authIntent.ts` returns `/my-first-year` for `first_year` lifecycle. `PROTECTED_ROUTE_PREFIXES` includes `/setup/first-year`, so `return_to` round-tripping to the setup route already works and is already allow-listed as safe.

## Recommended option

**Option A — one route, two modes.** The existing route and the existing RPC both support direct start cleanly; the only transition-specific thing is the guard and some copy. A second route would duplicate the babies step and the save path for no gain.

Rejected: Option B (duplicate UI, more routing decisions), Option C (unnecessary — no backend work is blocking).

## Route and mode model

`/setup/first-year` resolves one of two modes from the user's state before rendering:

```text
lifecycle = first_year                      -> redirect /my-first-year
lifecycle = pregnancy, status given_birth   -> mode "transition"
lifecycle = pregnancy, status active        -> redirect /my-week
lifecycle = pregnancy, sensitive status     -> redirect /my-journey (unchanged)
lifecycle = ttc                             -> redirect /my-ttc-journey
no journeys row at all                      -> mode "direct"
signed out                                  -> /auth?intent=return_to_route&return_to=/setup/first-year
```

Only the "no pointer" branch changes behaviour; everything else keeps its current outcome.

## Public hub CTA

Add a single First Year start CTA to the public hub (a new component under `src/components/firstyear/new/`, surfaced in the hero area and reused at the final CTA block). Label: **"Start your First Year"**.

| User state | CTA destination |
| --- | --- |
| signed out | `/auth?intent=start_journey&return_to=/setup/first-year` |
| signed in, no journey | `/setup/first-year` (direct mode) |
| signed in, `first_year` | `/my-first-year`, label becomes "Open your First Year" |
| signed in, pregnancy `given_birth` | `/setup/first-year` (transition mode) |
| signed in, pregnancy `active` | `/my-week`, with a quiet line: "Your First Year space opens once your baby arrives." |
| signed in, pregnancy sensitive status | no start CTA; quiet link to `/my-journey` only |
| signed in, `ttc` | `/my-ttc-journey`. No First Year start path for TTC in this phase |

The hub stays public and cached-friendly: the CTA renders its signed-out form first and swaps once the lightweight lifecycle read resolves, matching the existing anti-flicker pattern.

## Auth return behaviour

- `return_to=/setup/first-year` is already a safe protected path, so no change to `isSafeReturnTo`.
- `resolvePostLoginDestination` needs no change: `return_to` wins, and a `first_year` pointer already resolves to `/my-first-year`.
- One refinement: the `start_journey` intent from the First Year CTA must not be captured by an unrelated pending pregnancy journey in local storage. Rule: when `return_to` is present it always wins over the pending-journey branch (this is already the order today — verify in QA rather than change code).

## Copy

**Direct mode** (no pregnancy language at all)
- Step 1: "Let's set up your First Year space." / "This takes a minute. You can stop at any point and come back later."
- Step 2: "Add your baby's details so we can shape this around their age." / "You can add one baby, twins, triplets or four babies."
- Step 3 companion: "Cindy is here for your first year." Options reduced to "Continue gently" and "Decide later" — the pregnancy personalisation option is not offered.
- Step 4 review: "Your First Year space starts from here."

**Transition mode** — unchanged. Keep "Your pregnancy chapter is kept. Your First Year can begin when you are ready.", the memories reassurance, "Cindy continues gently" and all three companion options.

**`/my-first-year`** — when there is no kept chapter, do not render `PregnancyChapterKeptCard` at all rather than showing generic pregnancy reassurance.

## Data result after a direct save

- `journeys.lifecycle = 'first_year'`
- one `first_year_journeys` row, `status = 'active'`, `source_pregnancy_lmp_date` null, `archived_pregnancy_journey_id` null
- one to four `babies` rows, first by birth order flagged primary
- no `archived_journeys` row, no `pregnancy_journeys` row
- redirect to `/my-first-year`

This is exactly the shape future baby and parent recovery tracking will key off (`babies.date_of_birth` for age, `first_year_journeys.started_at` for recovery timelines), so direct users are not second-class later.

## Files that would change

- `src/pages/setup/FirstYearSetup.tsx` — mode resolution, mode-aware copy wiring
- `src/components/firstyear/setup/StepIntro.tsx`, `StepCompanion.tsx`, `StepReview.tsx` — accept a `mode` prop
- `src/components/firstyear/setup/firstYearSetupConstants.ts` — direct-mode copy and companion option subset
- new `src/lib/firstYearEntry.ts` — pure resolver for CTA destination/label from lifecycle + pregnancy status, plus unit tests
- new `src/components/firstyear/new/FYStartFirstYearCTA.tsx`
- `src/components/firstyear/new/FYHero.tsx`, `FYFinalCTA.tsx` — surface the CTA
- `src/pages/firstyear/MyFirstYear.tsx` — hide the kept-chapter card when there is none

## Files that must not change

- `save_first_year_journey` and all migrations, schema, RLS, grants
- `src/lib/authIntent.ts`, `src/lib/navLifecycle.ts`, `src/lib/useLifecycle.ts`
- `src/pages/firstyear/MyPregnancyChapter.tsx`, `src/lib/firstYearJourney.ts`
- `src/App.tsx` routes, `scripts/generate-sitemap.ts`, `public/robots.txt`
- pregnancy transition entry points in `SectionPregnancyComplete.tsx` and `MyJourney.tsx`
- any tracking, article data or topic page content

## QA plan

Unit: resolver covering all seven CTA states, plus direct/transition copy selection.

Live, disposable accounts only:
1. Signed-out: hub CTA → `/auth` → create account → lands on `/setup/first-year` in direct mode, no pregnancy copy anywhere.
2. Direct save with one baby, and again with twins → verify `journeys`, `first_year_journeys` (null archived id), `babies` rows, and landing on `/my-first-year` with no kept-chapter card.
3. Transition account (`given_birth`) → hub CTA and direct route both still show the original transition copy and still archive the pregnancy chapter.
4. Pregnancy active → CTA goes to `/my-week`, direct route still redirects.
5. Sensitive pregnancy status → no start CTA, RPC still refuses.
6. TTC → CTA goes to `/my-ttc-journey`, and `/setup/first-year` redirects there too. No direct setup for TTC.
7. Nav, console and page errors clean on all of the above; clean up all seeded rows.

## Risks and open questions

- Hub is a public marketing page; the lifecycle read must be lazy and must not delay first paint or cause layout shift.
- TTC → First Year is the only genuinely ambiguous state; the confirm-first treatment is a proposal and can be dropped to "no CTA" if you prefer.
- Companion choice remains session-only in both modes, as in 16.2B.
- Open question: should the direct CTA also appear on First Year topic pages, or hub only? Plan assumes hub only.

The build phase (16.6B) can proceed once approved.
