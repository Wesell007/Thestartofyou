# Phase 36A Pregnancy hub and topic UX

## Repository truth

| Item | Verified result |
|---|---|
| Pregnancy hub route | 1: `/pregnancy` |
| Canonical Pregnancy topic pages | 6: body, baby, feelings, health and safety, diet and exercise, preparing for baby |
| Shared Pregnancy topic-template consumers | 6 |
| In-scope shared-template consumers | 6 |
| Out-of-scope shared-template consumers | 0 |
| Trimester routes | 3: first, second and third trimester |
| Week routes | 1 parameterised route backed by 42 week page modules, weeks 1 to 42 |
| Due-date calculator implementation | One shared `DueDateCalculatorForm`; the Pregnancy hub supplies existing due-date and IVF navigation callbacks |
| Pregnancy Companion surfaces currently rendered | One embedded hub search module plus the global floating Companion on eligible routes; topic pages have no embedded contextual Companion |
| Pregnancy FAQ surfaces currently rendered | One hub accordion containing 6 questions; each currently includes an AI action, while 5 also include editorial guidance links |
| Pregnancy final journey action | `KeepYourJourney`, currently a static `/journal` action and not lifecycle-aware |

Additional verified findings:

- The six topic pages already have six distinct approved local topic hero images suitable for reuse on the hub cards.
- The hub has six primary pathway cards, three trimester cards, and all 42 week destinations.
- The Pregnancy to IVF crossover correctly points to `/ivf`.
- Topic Start Here counts legitimately vary from 1 to 3.
- All configured grouped-library links are currently rendered. There is no silent rendering cap.
- The current per-group `View all` link incorrectly repeats the first article destination rather than opening a fuller category.
- Shared global navigation, breadcrumbs, calculator logic, Companion runtime and route infrastructure do not need modification.

## Implementation

### 1. Recompose the Pregnancy hub

- Preserve the existing split hero, copy, photography and calculator behaviour.
- Remove only the three-item hero statistic strip, adding no replacement claims.
- Convert “What this hub covers” from a large feature card into a compact editorial band while retaining all six coverage points and the IVF transition note.
- Reorder the hub to the approved sequence: hero and calculator, orientation, six pathways, trimester navigation, week map, IVF crossover, editorial common questions, one embedded Companion, final journey action.
- Remove AI actions from the six common-question rows and adjust the existing introduction to describe editorial answers and related guidance only.

### 2. Refine discovery cards without changing destinations

- Rework the six pathway cards into compact editorial cards using the six existing topic hero images.
- Preserve every title, support line, high-value link and canonical topic href.
- Add presentation-only destination metadata where required so topic, guidance, trimester, week, tool, IVF and Companion labels describe their actual destinations without creating a second route registry.
- Keep responsive discovery at three columns on desktop, two on tablet and one on mobile, with restrained image height and existing reduced-motion behaviour.

### 3. Separate trimester orientation from the detailed week map

- Retain all three trimester images and routes, but restyle the cards as a lighter chapter-navigation layer with less image height and copy weight.
- Preserve the detailed week map, all three trimester groups, all 42 week links, illustrations, ranges and visible-change messaging.
- Tighten spacing and mobile tile sizing only where needed. Pregnancy week data and calculation boundaries remain untouched.

### 4. Refine the six canonical topic pages

- Keep the split hero, title, introduction, topic image, coverage bullets, Start Here destinations, grouped libraries and quiet sibling navigation.
- Reduce oversized vertical gaps and slightly compact the coverage treatment without inventing copy.
- Add destination metadata to Start Here items and render the correct action label for editorial guidance or tools.
- Keep all configured library destinations visible. Remove the misleading per-group `View all` links because they currently duplicate the first article and reveal nothing additional.
- Preserve intentional cross-topic article reuse and prevent duplicate entries within a single rendered group.

### 5. Add one contextual Companion handoff per topic

- Reuse the existing `AskAboutThis` handoff and shared Companion panel, after the editorial library and before other-topic navigation.
- Add one presentation-only suggestion set per existing topic config, using only existing topic wording and concepts rather than new guidance or prompt/runtime logic.
- Keep execution in the single global Companion runtime. No second transcript, model call, backend, grounding, memory or Ask-route behaviour will be introduced.
- Retain one embedded Companion module on the hub, positioned after common questions.

### 6. Make the final hub action lifecycle-aware

- Replace the static journal promotion at the end of the hub with a Pregnancy-scoped journey action using the existing read-only `usePublicAccountLink` and `resolvePublicAccountLink` path.
- Verify signed out, active TTC, active Pregnancy, active First Year and signed in without an active lifecycle.
- Active Pregnancy will lead to `/my-week`; other states will retain their established resolver destinations.
- Do not write journey state or alter the three-lifecycle model.

## Regression coverage

Add focused tests for:

- preserved hero calculator and removed statistic strip
- six unique pathway cards and unchanged destinations
- Companion ordering, exactly one embedded hub module and editorial-only FAQ rows
- all three trimester destinations and all 42 week destinations
- unchanged week model and IVF crossover
- all six topic pages, variable Start Here counts, destination labels and unchanged hrefs
- complete grouped libraries with no silent truncation or misleading `View all`
- exactly one contextual Companion handoff on each canonical topic page
- lifecycle-aware final action across five account states
- shared-template scope and zero out-of-scope presentation changes

## Documentation and validation

- Create the three requested Phase 36A evidence documents and append the Phase 36A result to `roadmap.md` without changing locked TTC history.
- Run focused Pregnancy UI, route, calculator, week, trimester, breadcrumb, Companion-boundary and link-integrity tests.
- Run the full test suite, typecheck twice, lint against the recorded baseline, and a production validation build.
- Perform browser QA on `/pregnancy` and all six topic pages at 1280, 834 and 390 pixels, checking layout, keyboard access, imagery, links, calculator behaviour, Companion counts, console output and overflow.
- Do not deploy.

## Boundaries

No new articles, guidance, routes, week or trimester routes, lifecycle states, database work, schema work, migrations, analytics, AI runtime, AI prompts, grounding, memory, reviewer claims or TTC changes. Existing copy, source behaviour, week architecture, calculator logic and routes remain authoritative.
