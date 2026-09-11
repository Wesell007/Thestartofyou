# Phase 33.2 final governance and sleep hero correction

## Goal
Preserve the completed Batch 1 article and visual work while correcting both review classifications, replacing only the ambiguous sleep hero, and placing production deployment on human review hold. Do not deploy or begin Batch 2.

## Confirmed current state

- The sleep article contains direct safe sleep, room sharing, SIDS risk reduction, car seat transfer and professional advice guidance. It therefore requires `SAFETY_REVIEW_REQUIRED`, not `LOW_RISK_GENERAL`.
- The hair dye article contains pregnancy specific health claims and precautions covering exposure, ventilation, patch testing, heat, skin treatments, reactions and professional advice. It therefore requires `HEALTH_REVIEW_REQUIRED`. Its single urgent reaction statement will be a specific reviewer checkpoint, but the article does not contain the sustained emergency or high consequence instruction pattern used by existing safety classified records.
- Human review is complete for neither article.
- The current sleep hero is ambiguous because its lower covering can read as loose bedding. It must be replaced.
- Both articles remain present in the repository and preview, the other 17 remain held, and production deployments remain zero.
- The programme visual standard is already one hero plus at least two meaningful body images per article, totalling at least 57 assets across 19 articles. This remains unchanged.

## Implementation

### 1. Correct governance and deployment state

Update the Phase 33 publication register and Batch 1 report so:

- `when-sleep-suddenly-changes` is `SAFETY_REVIEW_REQUIRED`, human review `REQUIRED / NOT COMPLETED`, production status `HOLD_HUMAN_REVIEW`.
- `hair-dye-and-beauty-treatments-in-pregnancy` is `HEALTH_REVIEW_REQUIRED`, human review `REQUIRED / NOT COMPLETED`, production status `HOLD_HUMAN_REVIEW`.
- No Phase 33 article is described as low risk or ready for deployment.
- Repository published or preview available remains distinct from production deployment eligibility.
- Human review held count becomes 19, human reviews completed remains 0, and production deployed count remains 0.
- The corrected closure is `PHASE 33.2 — BATCH 1 VISUAL IMPLEMENTATION CLOSED PASS / HUMAN REVIEW REQUIRED BEFORE DEPLOYMENT`.

### 2. Expand the human review pack from 17 to 19 records

Add complete records for both Batch 1 articles using the current repository copy as the authoritative text rather than stale draft pointers.

Each new record will include:

- full current article copy
- authoritative evidence and source URLs already used
- supported and excluded claims
- health or safety wording requiring review
- claim specific reviewer checkpoints
- current hero and body image paths where useful for visual context
- blank `Reviewer`, `Review date`, `Outcome`, and `Reviewer notes` fields

The sleep checkpoints will cover room sharing, SIDS risk wording, safe sleep source alignment, car seat transfer, sling wording, solids and sleep, and routes for professional advice. The hair dye checkpoints will cover the strength and scope of safety claims for colouring, absorption, ventilation, patch tests, treatments, heat exposure, reactions and urgent escalation.

### 3. Replace only the sleep hero with Nano Banana

Generate a new premium Start of You editorial hero showing:

- a baby unambiguously asleep on their back
- a separate cot with a firm, flat mattress and fitted sheet
- clearly fitted sleepwear or an unmistakably correctly fitted sleep bag
- face and head fully uncovered
- no blanket, duvet, pillow, bumper, toy, positioner or loose cot accessory
- a calm, realistic bedroom with no text or branding

Inspect the generated image at source size before accepting it. Reject and remove any variant with ambiguous fabric, unsafe details, malformed anatomy, text, brands or weak responsive crop behaviour. Replace the existing hero asset or its single image map reference without changing the template or placement.

Preserve both sleep body images and all three hair dye images unless final visual inspection reveals a separate defect. Confirm the wind down baby is awake and held, its caption remains routine focused, and the beauty imagery remains unbranded, non instructional and non diagnostic.

### 4. Strengthen focused safeguards

Extend the existing Batch 1 integrity coverage to verify:

- sleep still has exactly one hero and two correctly placed body images
- the accepted sleep hero is the corrected asset and has explicit safe sleep alt text
- both hair dye section images remain attached to their intended sections
- both review classifications and human review holds are represented consistently in the Phase 33 control documents where practical

No article copy will be weakened or removed to regain a lower review class.

### 5. Validate the corrected state

- Inspect the complete sleep article at desktop, tablet and mobile sizes after hero replacement.
- Confirm safe sleep presentation is unambiguous, title and hero balance is preserved, cropping is sound, no content overlaps or overflows, and all six Batch 1 image placements remain correct.
- Reconfirm the sleep wind down image and all hair dye imagery against the stated safety and editorial checks.
- Confirm both article routes, titles, canonicals and indexability remain valid and the sitemap still contains 333 unique URLs if repository truth confirms it.
- Confirm the sleep link migration remains intact, hair dye still has no migration, and the other 17 records have no article, image or publication changes.
- Run focused image and publication tests, the full test suite, typecheck twice, lint against the recorded 1 error and 10 warning baseline, and a production build.
- Record actual results, accepted and rejected hero generation attempts, final asset path, crop behaviour and all changed files in the Batch 1 report.

## Boundaries

- No deployment
- No Batch 2
- No article copy removal or substantive rewrite
- No body image regeneration unless a separate defect is proven during QA
- No renderer, template, route, canonical, navigation, sitemap architecture, lifecycle, AI, grounding behaviour, journal, memory, voice, database, schema or RLS changes
- The two repository records remain available for preview and review, but all 19 Phase 33 articles remain blocked from production deployment until their required human reviews are genuinely completed
