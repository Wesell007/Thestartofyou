# Start Your Journey — Journey Decision Page

## Confirmed current state

- No `/start-your-journey` route or equivalent explanatory page exists; the closest thing is the homepage `#start-where-you-are` section.
- The generic signed-out `Start your journey` actions all point at `/#start-where-you-are`: homepage hero (`NewHeroSection`), desktop header and mobile drawer (`Navbar`).
- Signed-in visitors see a different header action resolved by `resolvePublicAccountLink`: TTC → `/my-ttc-journey`, Pregnancy → `/my-week`, First Year → `/my-first-year`.
- Signed in with no active journey currently resolves to `Set up journey` → `/due-date-calculator`, which presumes Pregnancy rather than being stage-neutral. This single fallback destination will be made neutral (see below).
- Canonical starts are TTC `/setup/trying-to-conceive`, Pregnancy `/due-date-calculator`, First Year `/setup/first-year`.
- Static, safe product preview compositions for all three journeys already exist in `JourneyPreviewSection`, alongside the coordinated stage photography (`home-stage-ttc`, `home-stage-pregnancy`, `home-stage-first-year`) and guidance imagery (`guidance-editorial-1..4`).
- Active public guidance hubs: TTC, Pregnancy, First Year, IVF, Toddler, Family. Preparing for Baby is not an active hub.
- The sitemap script assembles from explicit route groups, so the new page needs an entry in the `core` group.

## Visual direction

The attached board is the north star for composition only: editorial opening, understated TTC → Pregnancy → First Year continuity, alternating photography and product-glimpse sections, a calm branching decision helper, restrained More Guidance strip, a small Companion reassurance and a simple closing choice. Its generated app screens, invented values, malformed copy, missing hubs and invented routes are not reproduced. All surfaces use the existing Start of You tokens, typography, photography and the real product design language.

## Page build

1. **Opening** — eyebrow `YOUR JOURNEY`, H1 `Start where you are`, the approved supporting copy and reassurance, a `Already have a journey? Sign in to continue where you left off` link to the existing sign-in route, and a fine-line three-stage continuity marker (not a clinical timeline).
2. **Three editorial journey sections**, alternating on desktop (TTC photo left, Pregnancy photo right, First Year photo left), each with positioning, who it is for, a short grounded expectations list, a static product glimpse, a primary call to action and a secondary guidance link.
   - Trying to Conceive — covers trying naturally, learning a cycle, tracking, waiting, and fertility treatment before pregnancy. IVF stays wider guidance via a visually subordinate `Explore IVF guidance` link. Primary `/setup/trying-to-conceive`, secondary `/trying-to-conceive`.
   - Pregnancy — includes the line about beginning with dates so the journey can place them in the right week. Primary `/due-date-calculator`, secondary `/pregnancy`.
   - First Year — after baby arrives, through the first year. Primary `/setup/first-year`, secondary `/first-year`.
3. **Product glimpses** — derived from the real My TTC Journey, My Week and Today / My First Year design language, reusing the existing static homepage preview patterns. Demonstration content only: zero customer data, zero private reads, zero protected components mounted, no medical scoring or development ranking.
4. **Not sure where to start?** — eyebrow, heading `Choose what feels closest to today`, and a calm three-question explanatory flow (pregnant now → Pregnancy; baby here and in their first year → First Year; trying or in treatment before pregnancy → Trying to Conceive), closing with the line that guidance can still be explored without a saved journey. Keyboard usable, visible focus, no wizard or triage styling, zero writes of any kind.
5. **Overlap reassurance** — wording to the effect of choosing the journey to focus on right now, with no permanent identity implied and no technical lifecycle terminology exposed.
6. **More guidance** — restrained thumbnail-and-text strip covering all six active hubs, three primary and three wider, visually distinct from saved journeys. Preparing for Baby excluded.
7. **Companion reassurance** — small static panel in the real Companion visual language, one `/ask` link, no runtime, model call or hidden turn, and no journal, memory, history, voice or media claims.
8. **Ready when you are** — heading, supporting line, three compact choices to the same canonical setup flows, and a closing sign-in line. Not styled as pricing cards.

## Call-to-action routing

Generic signed-out `Start your journey` in the homepage hero, desktop header and mobile drawer moves from `/#start-where-you-are` to `/start-your-journey`, keeping existing analytics events. Stage-committed calls to action (TTC, IVF, First Year, trimester strips, postpartum) stay stage-specific and unchanged. No signed-in resolution logic is edited.

## Technical notes

- New `src/pages/StartYourJourney.tsx` with section components under `src/components/start-journey/`, route registered in `src/App.tsx` above the generic patterns.
- `SeoHead`: title `Start Your Journey | The Start of You`, the approved description, canonical `https://thestartofyou.com/start-your-journey`. No other SEO edits.
- Add only `/start-your-journey` to the `core` group in `scripts/generate-sitemap.ts`.
- Accessibility: one H1, semantic section headings, labelled decision controls with visible focus, meaningful alt text, botanicals hidden from assistive technology, no colour-only meaning, comfortable tap targets.

## Out of scope

Lifecycle model, journey resolver, TTC/Pregnancy/First Year setup logic, database, migrations, RLS, AI runtime and prompts, AIC-5, Journey AI, journal awareness, memory, history, grounding, voice, article data, homepage/article/topic SEO, and deployment.

## Tests and validation

- Focused tests: route renders; exactly three saved journeys presented; each call to action resolves to its canonical setup route; IVF, Toddler and Family not presented as saved journeys; Preparing for Baby absent; decision helper performs zero writes and zero private reads; no unsupported Companion claims; signed-in resolution unchanged.
- Confirm the exact pre-change baseline (112 files, 1270 tests, 1270 passing, 0 timeouts; lint 1 error / 10 warnings) and stop with exact drift if it differs.
- After edits: full suite, typecheck twice, lint with zero new findings, production build, and runtime QA at ~390px and ~1440px checking overflow, launcher collision and console errors.
- No deployment. Finish with the 30-field completion report plus the additional direction, hub, writes, reads, routing and resolver statements requested.
