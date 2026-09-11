# Phase 33.2 final governance and sleep hero correction

## Goal
Preserve the completed Batch 1 article and visual work while correcting both review classifications, replacing only the ambiguous sleep hero, and placing production deployment on human review hold. Do not deploy or begin Batch 2.

## Confirmed current state

- The sleep article contains direct safe sleep, room sharing, SIDS risk reduction, car seat transfer and professional advice guidance. It therefore requires `SAFETY_REVIEW_REQUIRED`, not `LOW_RISK_GENERAL`.
- The hair dye article contains pregnancy specific health claims and precautions covering exposure, ventilation, patch testing, heat, skin treatments, reactions and professional advice. It therefore requires `HEALTH_REVIEW_REQUIRED`. Its urgent reaction statement becomes a specific reviewer checkpoint, and it will not be escalated to safety review unless the claim level review establishes that this project's safety threshold is met.
- Human review is complete for neither article.
- The current sleep hero is ambiguous because its lower covering can read as loose bedding. It must be replaced.
- The programme visual standard is already one hero plus at least two meaningful body images per article, totalling at least 57 assets across 19 articles. This remains unchanged.

## Implementation

### 1. Correct governance and deployment state

Update the Phase 33 publication register and Batch 1 report so:

- `when-sleep-suddenly-changes` is `SAFETY_REVIEW_REQUIRED`, human review `REQUIRED / NOT COMPLETED`, production status `HOLD_HUMAN_REVIEW`.
- `hair-dye-and-beauty-treatments-in-pregnancy` is `HEALTH_REVIEW_REQUIRED`, human review `REQUIRED / NOT COMPLETED`, production status `HOLD_HUMAN_REVIEW`.
- No Phase 33 article is described as low risk or ready for deployment.
- Human review held count becomes 19, human reviews completed remains 0, and production deployed count remains 0.
- The corrected closure is `PHASE 33.2 — BATCH 1 VISUAL IMPLEMENTATION CLOSED PASS / HUMAN REVIEW REQUIRED BEFORE DEPLOYMENT`.

### 2. Record the exact repository state for all 19

Batch 1, two articles: runtime record present YES, repository and build preview YES, production deployed NO, human review complete NO, production deployment eligible NO, final production status `HOLD_HUMAN_REVIEW`.

Remaining 17: runtime record present NO, documentation draft YES, production deployed NO, human review complete NO, production deployment eligible NO, still genuinely `NOT PUBLISHED`. The documents will not claim all 19 are runtime published, nor that the Batch 1 articles are production live.

Because these article systems have no safe non-public runtime draft state, record for each Batch 1 article in both the register and the Batch 1 report:

- DEPLOYMENT BLOCKER: HUMAN REVIEW REQUIRED
- SAFE NON-PUBLIC RUNTIME DRAFT STATE: NO
- ACCIDENTAL-DEPLOYMENT RISK: YES — the runtime record would become production content on deployment

No feature flag, draft system, route guard or publication architecture will be created during this correction. The control is no deployment, and a later deployment gate must re-check review clearance before any production release.

### 3. Expand the human review pack from 17 to 19 records

Add complete records for both Batch 1 articles using the current runtime copy as the authoritative text, not the earlier documentation drafts, since runtime conversion may have changed wording.

Each new record will include full current copy, evidence and source URLs, supported and excluded claims, the health or safety wording requiring review, claim specific reviewer checkpoints, and blank `Reviewer`, `Review date`, `Outcome` and `Reviewer notes` fields. All 19 records keep those fields blank and human reviews completed stays 0.

Sleep checkpoints: room sharing wording, SIDS risk wording, NHS and Lullaby Trust alignment, sleep surface guidance, car seat transfer wording, sling wording, the solids and sleep statement, and when to seek professional advice.

Hair dye checkpoints: the pregnancy hair colouring statement, absorption wording, ventilation, patch testing, nails, lashes and brows, fake tan, sunbeds, massage and positioning, sauna and heat exposure, skin and acne treatments, product reactions, and the urgent reaction escalation statement.

No claim will be weakened or removed to obtain a lower classification.

### 4. Replace only the sleep hero with Nano Banana

Generate a new premium Start of You editorial hero that visibly shows a baby lying on their back in a separate cot on a firm flat surface with a fitted sheet, in fitted sleepwear or a clearly recognisable fitted sleep bag, head and face unobstructed, with no loose blanket, duvet, pillow, bumper, toy, positioner or loose cot accessory, and no embedded text or branding.

Inspect the generated image at source size before accepting it. If any fabric remains visually ambiguous, reject and regenerate rather than assuming the prompt intention was achieved. Reject anything with unsafe details, malformed anatomy, text, brands or weak responsive crop behaviour. Record generation attempts, rejected attempts and the single accepted asset, and keep no rejected variant in the production inventory.

Alt text will describe only what is visibly present, for example "Baby lying on their back in a clear cot with a fitted sheet". It will not state or imply safety guidance, because the article itself carries that guidance.

Preserve the other five Batch 1 images unless a separate defect is genuinely found. Confirm the wind down image shows an awake, held baby, implies no sleeping position, and keeps a routine focused caption. Confirm the three hair dye images remain unbranded, non instructional, free of readable product or chemical claims, and imply no endorsement, diagnosis or unsafe practice. Final counts stay sleep 1 hero plus 2 body, hair dye 1 hero plus 2 body, total 6.

### 5. Strengthen focused safeguards

Extend the existing Batch 1 integrity coverage to verify sleep still has one hero and two correctly placed body images, that the accepted hero is the corrected asset with factual descriptive alt text, and that both hair dye section images remain attached to their intended sections.

### 6. Validate the corrected state

- Run focused Batch 1 integrity tests, the full test suite, typecheck twice, lint against the recorded 1 error and 10 warning baseline, and a production build.
- Inspect the sleep article at desktop, tablet and mobile, recording the actual viewport sizes, and confirm the new hero is visually unambiguous, crops correctly, never crops the face or head badly, keeps cot context clear, preserves title and hero balance, preserves body imagery, and produces no overflow or broken asset while keeping the approved editorial rhythm.
- Verify both Batch 1 routes resolve, the generated sitemap count is 333 if repository truth still confirms it, sitemap architecture changes are 0, the sleep Phase 32F migration is intact, no hair dye migration was manufactured, links to the remaining 17 drafts are 0, and runtime records added during this correction are 0.
- Record in the documentation: review-held Phase 33 articles 19, human reviews completed 0, Batch 1 runtime records present 2, documentation-only held drafts 17, production-deployed articles 0.

## Boundaries

- No deployment, no Batch 2
- No new article records, URLs, routes, renderers or templates
- No substantive article copy change
- No navigation, canonical or sitemap architecture change
- Saved lifecycles remain exactly `ttc`, `pregnancy`, `first_year`
- No AI, grounding, journal, memory, voice, database, schema or RLS change
- Programme standard preserved: 19 heroes plus minimum 38 body images, minimum 57 assets; the remaining 17 stay at 0 generated images
- Never state READY FOR DEPLOYMENT until the required human reviews are genuinely completed
