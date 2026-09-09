# Start Your Journey — Journey Decision Page

## Confirmed current state

- No `/start-your-journey` route or equivalent explanatory page exists in the route table; the closest thing is the homepage `#start-where-you-are` section.
- The signed-out `Start your journey` calls to action currently point at `/#start-where-you-are`: homepage hero (`NewHeroSection`), desktop header and mobile drawer (`Navbar`).
- Signed-in visitors already see a different header button resolved by `resolvePublicAccountLink` (My TTC Journey / My Week / My First Year, or Set up journey when nothing is saved). That resolution is untouched by this work.
- The three saved journeys and their canonical starts are TTC `/setup/trying-to-conceive`, Pregnancy `/due-date-calculator`, First Year `/setup/first-year`.
- Static homepage preview compositions for the three journeys already exist inside `JourneyPreviewSection`, together with the coordinated photography (`home-stage-ttc`, `home-stage-pregnancy`, `home-stage-first-year`) and guidance imagery (`guidance-editorial-1..4`).
- The active public guidance hubs are TTC, Pregnancy, First Year, IVF, Toddler and Family; Preparing for Baby is no longer an active hub.
- The sitemap script builds from explicit route groups, so a new public page needs an entry added.

## What gets built

A single new public page at `/start-your-journey` that explains the three saved journeys and hands the visitor into the existing setup flows. Nothing about lifecycles, setup logic, the backend or the AI stack changes.

### Page story

1. Opening: eyebrow `YOUR JOURNEY`, H1 `Start where you are`, supporting copy, a quiet reassurance that the journey can change, a subtle continuous TTC → Pregnancy → First Year line, and an `Already have a journey? Sign in to continue where you left off` link to the existing sign-in route.
2. Three substantial editorial journey sections, alternating image and text on desktop, each with: who it is for, what the saved experience centres on, a short expectations list, a compact static product glimpse, a primary call to action, and a subordinate guidance link.
   - Trying to Conceive — includes people in fertility treatment before pregnancy; IVF stays wider guidance with a visually subordinate `Explore IVF guidance` link. Primary: `/setup/trying-to-conceive`. Secondary: `/trying-to-conceive`.
   - Pregnancy — begins with dates so the journey can place them in pregnancy. Primary: `/due-date-calculator`. Secondary: `/pregnancy`.
   - First Year — from birth through the first year, in customer-friendly language. Primary: `/setup/first-year`. Secondary: `/first-year`.
3. `Not sure where to start?` — a calm, keyboard-accessible three-step decision guide (pregnant now → Pregnancy; baby already here → First Year; trying or in treatment before pregnancy → TTC), with a closing line that guidance can be explored without starting a saved journey. Pure local component state; no writes, no account, no lifecycle selection.
4. `More guidance when you need it` — a restrained strip naming the six active hubs, no directory.
5. One small Companion reassurance with a single `/ask` link, limited to live capabilities.
6. `Ready when you are` — the same three choices, compact, linking to the same canonical setup flows, plus the sign-in line.

### Copy safeguards

Wording makes clear the visitor chooses what the product focuses on right now, not a permanent identity. No fertility prediction, probability, medical monitoring or development scoring claims. No mention of journal awareness, memory, history, voice or media understanding.

### Call-to-action routing

Signed-out `Start your journey` in the homepage hero, desktop header and mobile drawer changes from `/#start-where-you-are` to `/start-your-journey`. Existing analytics events stay. Other stage-specific final calls to action (TTC, IVF, First Year, trimester strips, postpartum) are audited and reported, changed only where they are generic rather than stage-committed.

Resulting behaviour to report: signed out → `/start-your-journey`; signed in with TTC → `/my-ttc-journey`; Pregnancy → `/my-week`; First Year → `/my-first-year`; signed in with no active journey → unchanged current resolution. No signed-in resolution logic is edited.

## Technical notes

- New `src/pages/StartYourJourney.tsx`, route registered in `src/App.tsx` above the generic patterns, with `SeoHead` (title `Start Your Journey | The Start of You`, self-referencing canonical `https://thestartofyou.com/start-your-journey`).
- Add the route to the `core` group in `scripts/generate-sitemap.ts`.
- Page sections live in a new `src/components/start-journey/` folder, reusing existing design tokens, stage palettes, botanical accents and the current photography. The product glimpses reuse the existing static homepage preview language; no protected components, no data reads, no new product UI system.
- Accessibility: single H1, semantic section headings, labelled decision-guide controls with visible focus, meaningful alt text, decorative botanicals hidden from assistive technology, no colour-only meaning.

## Out of scope

Lifecycle model, journey resolver, TTC/Pregnancy/First Year setup logic, database, migrations, RLS, AI runtime and prompts, journal awareness, memory, history, grounding, voice, article data, homepage/article/topic SEO, and deployment.

## Tests and validation

- Focused tests: route renders; exactly three saved journeys presented; each call to action resolves to its canonical setup route; IVF, Toddler and Family are not presented as saved journeys; Preparing for Baby absent; decision guide performs zero writes and zero private reads; no unsupported Companion claims; signed-in resolution unchanged.
- Confirm the exact pre-change baseline (112 files, 1270 tests, 1270 passing, 0 timeouts; lint 1 error / 10 warnings) and stop with exact drift if it differs.
- After edits: full suite, typecheck twice, lint against baseline with zero new findings, production build, and runtime QA at ~390px and ~1440px for overflow, launcher collision and console errors.
- No deployment. Finish with the requested 30-point completion report.
