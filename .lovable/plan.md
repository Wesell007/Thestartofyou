# Homepage Journey Evolution

## Goal
Broaden the homepage from a pregnancy first experience into one calm story spanning Trying to Conceive, Pregnancy and First Year, using the approved direction board as a visual reference while preserving the existing brand, video, routes, saved journey flows and companion architecture.

## Verified starting point

- The homepage currently renders the hero, three brand promises, a pregnancy only date entry, a pregnancy only journey carousel, wider lifecycle links, the physical journal section and the shared footer.
- Both current homepage start actions point to the pregnancy due date flow.
- The hero already has the required background video, still poster, autoplay fallback, tap to play recovery and reduced motion still image.
- Existing journey entry paths are available for TTC, Pregnancy and First Year. No new route, onboarding flow or saved data model is required.
- Existing local imagery can support all three stages and the physical pregnancy journal without adding remote assets.
- The current 1440px and 390px homepage has no horizontal overflow or console errors.

## Implementation

### 1. Reframe the first screen
- Keep the current full bleed pregnancy video, poster, fallback and playback behaviour unchanged.
- Replace only the hero wording with:
  - Eyebrow: `THE START OF YOU`
  - Headline: `From trying to conceive` / `to their first year.` / `Yours to keep.`
  - Supporting copy: `Personalised guidance, private journalling and a companion that stays with you through trying to conceive, pregnancy and your baby's first year.`
  - Primary action: `Start your journey`
  - Secondary action: `Already using your journey? Sign in`
- Make the primary action lead to the new three stage selector rather than assume pregnancy.
- Preserve a clear single H1, readable contrast, reduced motion behaviour and the current mobile image framing.

### 2. Keep the three quiet promises
- Retain the existing three item promise band and its restrained presentation.
- Update the wording only where needed so it accurately describes guidance across TTC, Pregnancy and First Year, without advertising journal awareness, voice, memory or media.

### 3. Replace the pregnancy only start block
- Rebuild the pale lilac section as `Start where you are` with exactly three choices: Trying to Conceive, Pregnancy and First Year.
- Each choice will use the repository authoritative existing journey entry:
  - TTC: the existing TTC setup and saved journey flow
  - Pregnancy: the existing due date and LMP calculator flow
  - First Year: the existing journey aware First Year start flow
- Preserve signed out authentication handling and signed in lifecycle safeguards already owned by those flows.
- Do not add onboarding, calculations, data writes, routes or backend behaviour.

### 4. Show the real three stage product story
- Replace the pregnancy only carousel with a responsive three stage preview for TTC, Pregnancy and First Year.
- Build each preview from the visual language and capabilities already present in the corresponding saved journey:
  - TTC: cycle orientation, a current focus and a quiet note or log affordance
  - Pregnancy: current week guidance and a kept moment
  - First Year: age aware guidance and a quiet daily note
- Use clearly generic static demonstration copy, no names, exact dates, private records, private queries or invented performance statistics.
- Reuse existing stage tokens and local imagery. Images below the first screen will be lazy loaded and given stable dimensions.
- Keep interaction keyboard accessible and restrained, with no autoplaying carousel.

### 5. Rebalance wider support and the journal
- Rework the wider support section so TTC, Pregnancy and First Year are the primary journey sequence, with IVF, Toddler and Family visibly secondary.
- Keep all destinations on their current canonical public routes.
- Preserve the physical journal as Pregnancy only and update its wording to make the distinction explicit. Keep the current journal photograph and product route.
- Keep the companion mention quiet and truthful. Do not mention journal awareness, voice, memory or media.

### 6. Align shared framing and search copy
- Update the homepage title and description to reflect TTC, Pregnancy and First Year while retaining the existing canonical URL.
- Adjust only homepage relevant shared header and footer wording or start destinations where pregnancy first wording would contradict the new selector.
- Preserve the existing navigation hierarchy, authenticated journey resolution, companion link, legal links and footer structure.
- Change the footer byline from pregnancy specific wording to inclusive journey wording.

## Files and structure

Expected edits are limited to the homepage page and its existing homepage sections, with small consistency edits in the shared header and footer. A small homepage only helper or preview component may be introduced if it keeps the three stage content focused and testable. Existing global tokens will be reused; no new design system or generated imagery is planned.

## Validation

- Add focused tests for the exact hero copy, exactly three start choices, canonical destinations, truthful preview boundaries and absence of restricted capability claims.
- Run the relevant tests, then the full test suite.
- Run TypeScript checking twice, the existing lint command and compare against the known baseline of 1 error and 10 warnings, and run the production build.
- Inspect the completed homepage at approximately 390px and 1440px, including video fallback, selector links, carousel or tab keyboard behaviour, focus states, image cropping, overflow, companion launcher, consent banner and console output.
- Confirm no AI, journal implementation, feature flag, memory, history, grounding, voice, database, migration, RLS, article, route, sitemap, robots or deployment changes.
