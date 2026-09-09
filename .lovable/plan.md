# Homepage Story Refinement Round 3

## Confirmed current state

- The approved video opening and three promise blocks are separate from the requested correction area and will remain unchanged.
- `Start where you are` currently uses the stronger lavender surface and still renders `Chapter 01`, `Chapter 02` and `Chapter 03`.
- Its canonical starts are TTC `/setup/trying-to-conceive`, Pregnancy `/due-date-calculator` and First Year `/setup/first-year`.
- `Inside your journey` has accessible TTC, Pregnancy and First Year tabs, but each state currently renders one compact illustrative panel.
- Guidance currently contains seven links, including the now excluded `/preparing-for-baby`, and has no thumbnail imagery.
- The Companion preview is static, uses shared Companion styles, links to `/ask` and starts no runtime.
- Suitable local imagery already exists for TTC, Pregnancy, First Year, IVF, Toddler and Family, so no new image generation is required.

## Visual direction

Use the selected Editorial Lavender Narrative for its editorial scale, asymmetric balance, layered product canvas and visual depth. Apply the existing Start of You typography, semantic colours, local imagery and restrained shadows rather than the prototype’s fonts, raw colours, generated imagery, numbering or unsupported copy.

## Implementation

### 1. Preserve the approved opening

- Do not change the hero, video, poster, fallback, controls, reduced motion behaviour, actions or three promise blocks.
- Preserve the existing accessible anchor and focus handoff into `Start where you are`.

### 2. Correct `Start where you are`

- Change the surface to the existing pale `lavender-bg` treatment.
- Remove chapter labels, numbers and all chapter-specific rendering logic.
- Keep the three existing photographs, eyebrow, heading, supporting copy and exact canonical links.
- Present the entries as unboxed editorial image links with lighter spacing, subtle depth and restrained stage accents.
- Tighten descriptions around cycle understanding and private tracking, date-based weekly guidance and meaningful moments, and age-aware baby and recovery support.

### 3. Rebuild `Inside your journey`

- Keep one accessible segmented tab control and one active preview at a time.
- Replace each compact panel with a large homepage-only static page composition derived from the real product patterns, without mounting protected screens or making data reads.
- TTC will show a saved journey heading, Today/current-cycle context, cycle path, current guidance and private notes/log structure.
- Pregnancy will show My Week, trimester and week orientation, current guidance, a meaningful-moment/reflection area and supporting weekly structure.
- First Year will show Today and age context, stage-aware guidance, baby/recovery organisation and a note or memory area.
- Use only generic demonstration copy. Show no real names, dates, IDs, notes, appointments, scores, probabilities or customer information.
- Make the preview dominant and readable on desktop. On mobile, show one full-width composition with simplified stacking rather than scaling a desktop screen into a miniature.
- Preserve zero public homepage private journey, journal, baby and TTC reads.

### 4. Upgrade `Guidance for the journey`

- Remove `Preparing for baby` and its link completely.
- Keep only six active hubs: TTC, Pregnancy and First Year as primary; IVF, Toddler and Family as secondary.
- Add cohesive local thumbnail imagery to every hub.
- Use an asymmetric editorial hierarchy: larger image-led primary entries and smaller varied secondary links, rather than six identical cards or a plain directory.
- Preserve exact existing destinations for the six retained hubs.

### 5. Elevate `Your companion`

- Keep the section non-interactive with one `/ask` link and no runtime, model call or hidden turn.
- Retain safe generic guidance and the shared Companion visual language.
- Improve balance, spacing, hierarchy, layered paper surfaces, restrained shadows and subtle existing botanical detail.
- Do not mention or imply journal awareness, memory, history, voice, media or unsupported personal knowledge.

### 6. Finish the below-hero story

- Harmonise spacing, rules, image treatment and shadow depth across the four corrected sections without turning every section into a card grid.
- Preserve the Physical + Digital section and Pregnancy-only physical journal distinction.
- Keep the page calm, warm and editorial, with restrained interaction and reduced-motion support.

## Scope safeguards

- Homepage presentation and focused homepage tests only.
- No route, saved journey, lifecycle, AI, journal awareness, memory, history, grounding, voice, analytics, database, migration, RLS, sitemap, robots, article data or deployment changes.
- Exactly three saved lifecycles remain: `ttc`, `pregnancy`, `first_year`.
- No generated product UI, new generated imagery, live protected screens or private data.

## Tests and validation

- Update focused homepage tests for zero chapter labels, pale lavender treatment, unchanged canonical starts, fuller stage-specific structures, six active hubs only, thumbnail presence and a static one-runtime Companion preview.
- Run the full test suite and require zero failures and zero timeouts.
- Run TypeScript checking twice.
- Run lint against the existing `1 error / 10 warnings` baseline and require zero new findings.
- Run the production build.
- Inspect at approximately 390px and 1440px across all three preview tabs. Verify readable previews, six hub links, imagery, `/ask`, no overflow, no collisions, clear launcher space, no broken links and zero console errors.
- Do not deploy. Return the requested concise ten-point completion report.
