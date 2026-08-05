# Phase 16.2A — Birth to First Year Transition (Planning)

Planning report only. No code, migrations, routes, UI or AI changes in this phase.

## 1. Recommended route

New protected route: **`/setup/first-year`**

Why:
- Mirrors the existing setup convention (`/setup`, `/setup/trying-to-conceive`), so auth, layout and navigation behaviour are already understood.
- Keeps the transition off `/my-week` and `/my-journey`, which stay as reading surfaces rather than becoming multi-step forms.
- A dedicated route can be linked from several entry points without duplicating the flow.

Build-phase note: `/setup/first-year` must be added to `PROTECTED_ROUTE_PREFIXES` in `src/lib/authIntent.ts` (currently `/my-week`, `/my-journey`, `/my-ttc-journey`, `/setup/trying-to-conceive`) so sign-in returns the user to the flow.

## 2. Recommended entry points

Audited surfaces and the recommendation for each:

| Surface | Current given_birth behaviour | Recommendation |
| --- | --- | --- |
| `/my-week` → `SectionPregnancyComplete` | Shows "Pregnancy complete" panel with links to `/first-year`, `/my-journey`, Account Settings | **Primary entry point.** Replace the generic "Open First Year" public link with "Start your First Year journey" pointing at `/setup/first-year` |
| `/my-journey` (status block, ~line 353) | Renders a given_birth block | **Secondary entry point.** One quiet link, no second full panel |
| Account Settings → `JourneyStatusSection` | Status change only | **No entry point.** Add nothing; the status change itself should not push the user into setup |
| `ChangeStatusDialog` (choosing "I've given birth") | Confirms and updates status | **No immediate redirect.** After confirming, the `/my-week` panel is where they find the invitation when ready. Avoids pressure at an emotional moment |
| Kept Chapter | Sensitive/kept-state surface | **No entry point** |
| Signed-in nav | Journey-aware | No change this phase |

## 3. Status guard plan

Single source of truth: `canEnterFirstYearSetup(status)` in `src/lib/firstYearJourney.ts` (`status === "given_birth"`).

- Entry points render the invitation only when the predicate passes.
- The route itself re-checks on mount: any status other than `given_birth` redirects (`active` → `/my-week`; `pregnancy_loss`, `no_longer_pregnant`, `paused` → `/my-journey`) with no explanatory "you can't do this" message.
- If lifecycle is already `first_year`, redirect straight to the post-save destination rather than showing setup again.
- The RPC re-enforces the guard server-side, so a stale client cannot bypass it.
- No baby-age copy, no transition prompts, no First Year prompts anywhere in sensitive states.

## 4. Proposed user flow

Four steps in one route, single-column, one step visible at a time, with progress shown as a quiet "Step 2 of 4" line (no progress bar).

**Step 1 — Gentle intro**
- Acknowledges the pregnancy chapter, confirms everything saved is kept, states First Year can begin whenever they're ready.
- Actions: "Begin" (primary) and "Not right now" (returns to `/my-week`).

**Step 2 — Baby or babies**
- "How many babies?" choice: One baby / Twins / Three / Four, plus a quiet "I'll set up one baby for now".
- One baby: single date of birth (required) plus optional name.
- Multiples: one shared date of birth by default, then one optional name row per baby, labelled "First baby", "Second baby"… Birth order comes from row position; the first row is primary.
- A per-baby date of birth is deliberately deferred: the schema already stores date of birth per baby, so a later phase can add "these babies were born on different days" without a migration. Not needed for V1 because the same-day case covers almost all births.
- Not asked in this phase: birth story, birth type, feeding method, mental health, trauma.

**Step 3 — Companion choice**
- Framed as "Same companion, new chapter."
- Three options: **Continue gently** (default), **Personalise Cindy with my pregnancy journey**, **Decide later**.
- In this phase all three behave identically at runtime: no AI memory reading, no reflections, photos, videos, voice notes or toolkit notes sent to the AI, no birth story handover.
- "Personalise" is presented as an intention that will be set up later, with a clear line that nothing is shared until they choose specific items.

**Step 4 — Review and start**
- Read-only summary of baby count, date of birth, names and the companion choice, with "Edit" links back to each step.
- Primary action calls `save_first_year_journey(p_babies jsonb)` via `saveFirstYearJourney` in `src/lib/firstYearJourney.ts`.
- On success: pregnancy journey archived, First Year journey created, babies saved, lifecycle flipped to `first_year`.

## 5. Copy direction

Warm, calm, premium, British English, sentence case, no dashes.
- Intro: "Your pregnancy chapter is kept. Your First Year can begin when you are ready."
- Reassurance: "Everything you saved stays exactly where it is."
- Companion: "Cindy is still here. Same companion, new chapter."
- Allowed language: companion memory, personal context, what Cindy can use, carry my pregnancy journey forward.
- Forbidden: machine learning memory, training, data training. Also no medical claims, no emergency guidance, no AI memory promise.

## 6. Companion choice storage

**Recommendation: no storage in Phase 16.2B.**

The choice has no runtime effect this phase, and persisting a preference now would create a value the later memory-opt-in phase has to reinterpret or migrate. When the real opt-in exists (Phase 16.6), it needs an explicit consent record with a timestamp and a viewable list of what the companion can use — a richer shape than a single enum.

If storage is later judged necessary, the smallest safe model is one nullable text column on `profiles` (`companion_continuity_choice`, values `continue`, `personalise`, `later`), no new table. The build phase can hold the choice in component state for the session only.

## 7. Safest post-save destination

The First Year dashboard does not exist yet. Recommended destination: **`/my-journey`**, which already handles a non-pregnancy lifecycle and shows the kept pregnancy chapter, with a brief success confirmation on arrival.

Rejected alternatives: `/my-week` is pregnancy-week specific and would read as wrong; `/first-year` is a public marketing hub and would feel like being logged out of the journey. Build phase should route through a single constant so Phase 16.3 can repoint it to the real dashboard in one line.

## 8. Visual token plan

The screen must read as "one First Year journey, two sides of support", not a pregnancy page with baby fields.

- Page frame and Step 1: `--stage-firstyear` background with `--stage-firstyear-accent` for kickers and `--stage-firstyear-deep` for headings.
- "For baby" content (baby count, dates, names): `--stage-firstyear-soft` surfaces.
- "For you" content (the recovery reassurance line and companion step framing): `--stage-recovery-soft` surface with `--stage-recovery-accent` kicker and `--stage-recovery-deep` heading.
- `--stage-postpartum` / `--stage-postpartum-accent` reserved for any explicit postpartum recovery link, matching the existing `/postpartum` redirect target `/first-year#recovery-topics`.
- Typography follows the existing system: `font-serif` for display text, `font-sans` for interface, 15px body, rounded pill CTAs, `keepsake-surface` style cards as used in `SectionPregnancyComplete`.
- No pregnancy stage tokens anywhere on this screen.

## 9. Files likely to change in the build phase

- `src/pages/setup/FirstYearSetup.tsx` (new)
- `src/components/firstyear/setup/*` (new step components)
- `src/App.tsx` (route registration, protected)
- `src/lib/authIntent.ts` (add `/setup/first-year` prefix)
- `src/components/myweek/SectionPregnancyComplete.tsx` (primary entry link)
- `src/pages/MyJourney.tsx` (secondary quiet link in the given_birth block)
- New unit tests for the setup form logic and guard behaviour

## 10. Files that must not change

- `src/lib/firstYearJourney.ts`, `src/lib/firstYearDates.ts` (foundation is closed)
- Any migration; no schema change is needed
- `src/integrations/supabase/client.ts`, `types.ts`
- AI files: `src/lib/companionContext.ts`, `src/components/myweek/SectionAskAI.tsx`, `supabase/functions/ai-search/*`
- Pregnancy toolkit, memory, realism assets and resolver
- `scripts/generate-sitemap.ts`, `public/robots.txt` (the route is protected and non-indexable)
- Public `/first-year`, `/postpartum` and topic pages

## 11. QA plans

**Sensitive state QA**
- Each of `active`, `pregnancy_loss`, `no_longer_pregnant`, `paused`: confirm no invitation renders on `/my-week` or `/my-journey`, and direct navigation to `/setup/first-year` redirects silently.
- `given_birth`: invitation renders and the route loads.
- Signed out: route sends the user to auth and returns them to the flow after sign in.
- Lifecycle already `first_year`: no second setup.

**Multiples QA**
- One, two, three and four babies each save correctly with birth order matching row order and the first baby primary.
- Shared date of birth applies to every baby.
- Changing the count after entering names does not lose or misorder remaining rows.
- Five or more is not reachable in the UI.

**Accessibility QA**
- Mobile-first single column, tested at 375px and desktop.
- Every field has a visible associated label; the count choice is a proper radio group.
- Full keyboard traversal, visible focus states, focus moved to the step heading on step change.
- Inline validation is gentle and specific ("Please add a date of birth"), announced to screen readers, never a raw error code or Postgres message.
- Back, Edit and Cancel are always available and never destructive without confirmation.
- No layout shift between steps; the container reserves height.

## 12. Risks and blockers

- Emotional risk: appearing too soon after a status change. Mitigated by not redirecting from the status dialog.
- Irreversibility: the save archives the pregnancy journey and flips lifecycle. Step 4 must state plainly that the pregnancy chapter is kept and readable, and the build phase should confirm there is a supported way back if a user saves in error.
- Destination gap: `/my-journey` is a stopgap until Phase 16.3; route it through one constant.
- Companion expectation: "Personalise" must not imply anything is happening yet.

## 13. Recommended Phase 16.2B build scope

1. Add `/setup/first-year` as a protected route and register the auth prefix.
2. Build the four-step flow with First Year and recovery tokens.
3. Multiples-ready baby setup for one to four babies, shared date of birth.
4. Companion choice, session state only, no storage.
5. Wire Step 4 to `saveFirstYearJourney`, redirect to `/my-journey` via a single constant.
6. Update the two entry points, guarded by `canEnterFirstYearSetup`.
7. Unit tests for guard and form logic, plus a live pass across the QA plans above.

Explicitly out of scope: dashboards, tracking, milestones, First Year memories, birth story, memory-aware AI, AI context changes, pregnancy multiples, baby switcher. Analytics events are recommended for a later phase once the dashboard exists.
