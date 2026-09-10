# Phase 33 article visual standard correction

## Goal
Bring the two implemented Batch 1 guides up to the approved Start of You editorial image rhythm, then update the Phase 33 programme standard for all 19 guides. Keep the existing First Year and legacy article systems unchanged. Do not deploy or begin Batch 2.

## Confirmed current state

- `when-sleep-suddenly-changes` currently has one hero and one body image. Its seven sections support a second body image later in the reading sequence through the existing First Year image map.
- `hair-dye-and-beauty-treatments-in-pregnancy` currently has one hero. Its seven editorial sections use the existing flagship renderer, which already supports section-specific images and alternating image and text compositions.
- The current Phase 33 publication register still records the superseded 29-asset plan.
- The requested Batch 1 publication report does not currently exist and must be created as part of this correction.

## Implementation

### 1. Produce exactly three additional Batch 1 images

Use Nano Banana inside Lovable with the established premium, warm, calm, realistic, UK editorial direction.

- **Sleep body image 2**
  - Supports: `What tends to help`
  - Subject: a quiet, non-sleeping evening wind-down routine between parent and baby
  - Placement: after section index 3, leaving the existing night-waking image after section index 2
  - Format: landscape body image, designed for the existing responsive 4:3 to 16:10 crop
  - Safety: no unsafe sleep position, loose bedding, cot accessories, or implied sleep instruction

- **Hair dye body image 1**
  - Supports: `Ways to feel more comfortable about it`
  - Subject: thoughtful home colour preparation in a bright, ventilated domestic setting, with unbranded materials and no application instruction
  - Placement: explicit image on the early section through the existing `EditorialSection.image` field
  - Format: portrait editorial composition for the existing flagship section placement and mobile 4:3 crop

- **Hair dye body image 2**
  - Supports: `Nails, lashes and brows` or `Massage, facials and saunas`, selected after checking visual separation from the hero and first body image
  - Subject: understated pregnancy self-care or calm treatment consultation, fully clothed and non-clinical
  - Placement: later in the article through the same existing section image capability
  - Format: portrait editorial composition with a mobile-safe central focal point

Inspect every generated image for malformed anatomy, unsafe details, brands, text, visual diagnosis, staged expressions, and crop quality. Regenerate only rejected assets.

### 2. Wire images through existing article capabilities

- Add the new sleep image to the existing First Year article image map with purposeful alt text and a section-specific caption.
- Add both hair-dye images directly to the relevant existing editorial sections.
- Preserve all article copy, routes, metadata, image components, templates, renderers, design tokens, and navigation architecture.
- Do not add a new layout component or change shared article styling.

### 3. Update Phase 33 controls

Update `docs/content/phase33-publication-register.md` so every one of the 19 records states:

- hero count 1
- body-image minimum 2
- planned and actual totals
- Nano Banana status
- image QA status
- exception status and rationale where applicable

Replace the old estimate with:

```text
19 heroes + minimum 38 body images = minimum 57 planned assets
```

Keep all 17 review-held articles unpublished and ungenerated. Record no exceptions unless repository compatibility proves one is necessary.

Create `docs/content/phase33-batch1-publication-report.md` with the corrected two-article asset inventory, section support, placement, aspect ratio, focal point, mobile crop, alt-text intent, generation and QA outcomes, responsive checks, route and sitemap checks, link migration result, and deployment state.

### 4. Validate the complete result

- Inspect both guides from top to bottom at desktop, tablet, and mobile widths.
- Compare their overall pacing with the Cervical mucus benchmark: distribution, whitespace, text density, alternating compositions, section transitions, hero relationship, stacking, crops, and overflow.
- Confirm each Batch 1 guide has exactly one hero plus at least two meaningful body images and no clustered image dumping.
- Confirm the sleep image remains safe and the beauty images imply neither diagnosis nor medical endorsement.
- Confirm both routes remain clean and indexable, sitemap remains at the expected two-guide increase, the documented sleep migration remains intact, and no hair-dye migration was introduced.
- Run focused image/publication integrity tests, the full test suite, typecheck twice, lint against its recorded baseline, and a production build.

## Boundaries

- Batch 1 only
- No generation for the other 17 guides
- No substantive copy changes
- No new article, URL, route, renderer, template, lifecycle, navigation, canonical, sitemap architecture, AI, journal, memory, voice, database, schema, or RLS work
- No deployment
- Stop after the Phase 33.2 Batch 1 closure report, ready for deployment only if every gate passes
