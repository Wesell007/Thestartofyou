# Homepage Story Refinement

## Confirmed starting point

- Revision: `7157af17`.
- Baseline: 112 test files, 1268 passing tests, 0 timeouts.
- Lint baseline: 1 existing error and 10 existing warnings.
- The approved video hero remains unchanged.
- The attached Nano board is a visual reference only and will not be embedded.
- Audited public guidance hubs:
  - Primary saved journey and guidance: Trying to Conceive `/trying-to-conceive`, Pregnancy `/pregnancy`, First Year `/first-year`.
  - Wider guidance: IVF `/ivf`, Preparing for Baby `/preparing-for-baby`, Toddler `/toddler`, Family `/family`.
  - Excluded from the guidance hub list: redirects, topic pages, calculators, protected journey pages, the Journal product page, Companion, About and customer Support.

## Build

### 1. Preserve the approved opening

- Leave the hero video, crop, gradient, headline, supporting copy, CTA, poster, tap to play and reduced motion behaviour untouched.
- Keep the three quiet promises immediately below it.

### 2. Redesign Start Where You Are

- Replace the white card treatment with three connected, image led editorial chapters using existing local photography:
  - TTC: `guidance-ttc.jpg`
  - Pregnancy: `guidance-featured-pregnancy.jpg`
  - First Year: `guidance-firstyear.jpg`
- Keep the approved eyebrow, heading and copy exactly.
- Add restrained chapter numbers, short supporting text and subtle links to the existing canonical starts:
  - TTC `/setup/trying-to-conceive`
  - Pregnancy `/due-date-calculator`
  - First Year `/setup/first-year`
- Change the section surface from the stronger `lavender` token to the existing pale `lavender-bg` token. No new purple token or image asset.
- Preserve the existing hash target and keyboard focus handoff from the hero and shared signed out Start link.

### 3. Rebuild Inside Your Journey

- Replace the current three text cards with one substantial static product showcase based on the actual visual language of My TTC Journey, My Week and First Year Today.
- Use a three stage segmented control. Desktop will show one large active preview with adjacent stage context rather than three small cards. Mobile will show one readable preview at a time.
- Use only safe, generic copy and fixed illustrative states. Do not mount protected journey components or call their hooks.
- Keep all previews local and presentational: zero customer reads, zero homepage database reads, no probabilities, scores, real dates, names, journal text or health statistics.
- Implement accessible tabs with keyboard navigation, visible focus, stable dimensions and no autoplay.

### 4. Create Guidance for the Journey

- Replace the small wider support band with a complete editorial guidance composition using the approved eyebrow, heading and copy.
- Give TTC, Pregnancy and First Year the strongest photographic hierarchy.
- Present IVF, Preparing for Baby, Toddler and Family as smaller, quieter wider guidance links with short truthful descriptors.
- Use an asymmetric magazine layout, not six identical cards or an icon directory.
- Link every item to its verified canonical public route and add tests ensuring all seven audited hubs are represented once with the correct hierarchy.

### 5. Add the Companion story

- Add a dedicated editorial section between Guidance and the physical journal using the approved eyebrow, heading and copy.
- Build a static visual crop from the real Companion panel tokens and message styling rather than mounting the live runtime.
- Show the approved generic question and a short calm stage aware answer, with a subtle TTC to Pregnancy to First Year continuity cue.
- Make no journal awareness, memory, history, voice, media or unsupported capability claims.
- Keep the existing floating Ask launcher and the two answer surfaces unchanged.

### 6. Refine Physical and Digital

- Preserve `journal-flatlay.jpg` and the existing `/journal` destination.
- Change the eyebrow and heading to the approved Physical + Digital story and use concise copy that clearly separates the Pregnancy only physical journal from the TTC to Pregnancy to First Year digital journey.
- Remove the redundant Companion link from this final section because Companion now has its own dedicated section.

### 7. Composition and responsive behaviour

- Keep the final order: hero, promises, Start, Inside Your Journey, Guidance, Companion, Physical + Digital, footer.
- Preserve the existing brand type, cream, sage, lavender, terracotta, charcoal and botanical restraint.
- At 390px, stack the photographic chapters, keep the selected product preview readable, simplify the guidance composition, and ensure the Companion preview and Ask launcher do not collide.
- At 1440px, make the product showcase materially larger than the current cards and preserve generous editorial whitespace.

## Scope safeguards

- No hero, route, lifecycle, database, migration, RLS, sitemap, robots, article data, AI, prompt, safety, grounding, journal awareness, memory, history, voice, analytics or deployment changes.
- Exactly three saved lifecycles remain: `ttc`, `pregnancy`, `first_year`.
- Reuse repository assets only. Planned new image assets: 0. Planned remote assets: 0.
- Keep homepage SEO and shared navigation behaviour unchanged.

## Tests and verification

- Extend focused homepage tests for exact section order and copy, canonical journey starts, seven audited hubs and hierarchy, tab keyboard behaviour, safe static preview boundaries, Companion claims and physical journal distinction.
- Run the full suite and require all tests passing with 0 timeouts.
- Run TypeScript checking twice.
- Run lint and require exactly the known baseline with no new findings.
- Run the production build.
- Inspect at approximately 390px and 1440px for all requested sections, every link, image loading, product controls, keyboard focus, launcher clearance, footer, overflow, collisions, layout stability and console errors.
- Do not deploy. Return the requested 58 field completion report and stop.
