# Homepage Story Refinement Round 2

## Confirmed current state

- The opening is already separated into the approved video hero followed by three quiet promise blocks. Both will remain unchanged.
- `Start where you are` currently uses the stronger `lavender` surface and labels its three entries `Chapter 01`, `Chapter 02` and `Chapter 03`.
- Its canonical starts are already correct: TTC `/setup/trying-to-conceive`, Pregnancy `/due-date-calculator`, First Year `/setup/first-year`.
- `Inside your journey` currently has accessible TTC, Pregnancy and First Year tabs, but each active state shows only one compact card rather than the fuller saved journey structure.
- The current static previews already perform no private data reads. The real product patterns available to mirror include TTC Today, cycle path, cycle details and notes; Pregnancy My Week orientation and guidance; First Year Today, age context and saved moments.
- Guidance currently represents the seven approved hubs once, with TTC, Pregnancy and First Year primary and IVF, Preparing for Baby, Toddler and Family secondary.
- The Companion section is a non-interactive rendering using shared Companion styles and links to `/ask`; it does not start another runtime.

## Implementation

### 1. Preserve the approved opening

- Make no changes to the video hero, poster and fallback, tap to play, reduced motion handling, hero copy, hero actions or the three promise blocks.
- Preserve the existing accessible scroll and focus handoff to `Start where you are`.

### 2. Lighten `Start where you are`

- Change the section to the existing pale `lavender-bg` surface and rebalance foreground tones for an airy, near-white lilac treatment.
- Remove every chapter label, chapter number and chapter-oriented comment or presentation detail.
- Keep the eyebrow, heading, supporting copy, three coordinated photographs and exact canonical links.
- Refine the three entries as unboxed, image-led editorial links with calmer proportions, more breathing room and restrained stage accents.
- Tighten the stage descriptions to communicate:
  - TTC: cycle understanding and a private place to track the journey.
  - Pregnancy: date-based weekly guidance and meaningful moments.
  - First Year: age-aware support for baby and recovery in one place.

### 3. Rebuild `Inside your journey` as a fuller product showcase

- Keep one accessible segmented tab control for TTC, Pregnancy and First Year, with clear selected and keyboard-focus states.
- Replace the compact preview cards with larger homepage-only static screen compositions faithfully derived from the real saved journey design language. Do not mount protected screens or data-fetching components.
- Show enough structure to explain each system:
  - TTC: saved journey header, Today context, cycle path, a guidance area and private notes affordance.
  - Pregnancy: My Week header, week and trimester context, current guidance and a visible keeping/reflection area.
  - First Year: current age and Today context, age-aware guidance, plus visible note or memory structure.
- Use fixed, generic demonstration content only. Include no names, real dates, IDs, private notes, records, scores, probabilities or customer data.
- Make the active preview the dominant object on desktop, with the supporting explanation integrated beneath or beside it without competing for attention.
- On mobile, render one full-width, legible preview at a time with stable dimensions and no miniature screenshot treatment.
- Tighten the section copy around a private saved space that changes with the user and keeps information organised by stage.
- Preserve zero homepage private journey, journal, baby or TTC reads.

### 4. Maintain the story after the showcase

- Keep Guidance editorial and preserve all seven hubs exactly once, with TTC, Pregnancy and First Year primary and the four wider hubs visibly secondary.
- Keep the dedicated Companion section non-interactive and secondary to the saved journey story. If needed, lightly refine its copy to name calm support across TTC, Pregnancy and First Year without making journal-awareness, memory, history, voice or media claims.
- Keep Physical + Digital and the Pregnancy-only physical journal distinction unchanged unless a minor copy adjustment is required for a smooth transition.
- Preserve the section order: opening, promises, Start, Inside Your Journey, Guidance, Companion, Physical + Digital, footer.

## Scope safeguards

- Homepage presentation and focused homepage tests only.
- No route, lifecycle, saved journey logic, AI architecture, journal awareness, memory, history, grounding, voice, analytics, database, migration, RLS, sitemap, robots, article data or deployment changes.
- Exactly three saved lifecycles remain: `ttc`, `pregnancy`, `first_year`.
- No generated product or Companion UI, no live protected components and no new image generation.

## Tests and validation

- Update focused homepage tests to prove chapter labels are absent, all three canonical start links remain correct, each tab exposes its fuller stage-specific structure, static previews contain no interactive private-data functionality, seven hub links remain correct and Companion still starts no runtime.
- Run the full test suite and require zero failures and zero timeouts.
- Run TypeScript checking twice.
- Run lint and compare it with the existing baseline, accepting no new findings.
- Run the production build.
- Inspect at approximately 390px and 1440px, verifying the pale Start surface, absent chapter labels, readable full previews for all three tabs, correct links, focus behaviour, launcher clearance, no overflow, no layout collisions and no console errors.
- Do not deploy. Return a concise completion report and stop.
