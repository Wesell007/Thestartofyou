# Phase 37A.1 First Year image quality correction

## Goal

Make every current First Year image earn its place. Keep strong, believable and relevant imagery. Recrop only where composition is the problem. Reuse an existing approved asset only where the context genuinely matches. Otherwise remove the image and let the editorial layout carry the page.

No bulk generation, no content changes, no route changes and no work outside First Year.

## Confirmed starting point

Repository truth currently contains:

• 4 configured phase heroes
• 8 configured topic heroes
• 21 current Start Here cards after the Phase 37A removal of 3 unsupported cards
• 26 mapped First Year article heroes
• 37 mapped First Year article body images
• 1 hub video, audited separately

This gives a current configured still image baseline of 96 placements before counting repeated render appearances of article cards. The rendered audit will record both the canonical configured placement and every route surface where that asset appears, avoiding double counting while still exposing problematic repetition.

The specific `Bottle and breastfeeding questions` hero is confirmed as `firstyear-scene.jpg`, the baby feet in a knitted blanket. It will be removed. The same article also currently uses a generic bonding image in its body, which will be judged independently against the surrounding feeding section.

The shared article view already renders a centred, narrower text led hero when no hero image is supplied. However, the First Year image map currently requires every entry to have a hero, and article cards currently force topic fallback photography. Those First Year constraints must be relaxed so deliberate removal does not silently reintroduce generic imagery.

## Implementation

### 1. Build the current rendered audit

Inspect the current preview rather than carrying forward the old 99 placement decision table.

Cover:

• `/first-year`
• all 4 phase pages
• all 8 topic pages
• all 26 ready First Year articles
• all 37 current article body placements in their actual section context
• Start Here imagery, related article cards, pathway surfaces and repeated assets across adjacent discovery areas

For every canonical placement record:

• route or routes
• surface
• current asset
• surrounding subject
• `KEEP`, `RECROP`, `REPLACE_WITH_EXISTING_APPROVED_ASSET` or `REMOVE`
• reason
• final treatment
• any repetition, infant safety, anatomy or plausibility concern

The hub video remains a separate media decision rather than being mixed into the still image total.

### 2. Apply only evidence backed image decisions

Use this priority:

1. Strong relevant approved image
2. Intentional image free treatment
3. One specifically justified new image only if a high value hero has no defensible alternative

Bulk generated images remain 0. No image will be retained to preserve visual symmetry or fill a slot.

Reject malformed anatomy, implausible feeding or holding positions, synthetic skin, merged objects, surreal rooms, unsafe sleep cues and decorative detail photography without a clear editorial relationship. Do not hide those defects with cropping.

For `Bottle and breastfeeding questions`:

• remove the baby feet hero immediately
• use a strong existing approved feeding image only if the full audit shows it is relevant and does not create problematic high visibility repetition
• otherwise use the premium image free article hero
• do not substitute another generic baby detail

### 3. Support deliberate image absence within First Year

Contain the capability to the First Year article image mapping and article card presentation.

• make First Year article heroes optional
• preserve the existing shared article view behaviour for present and absent heroes
• prevent topic fallback photography from overriding an intentional image removal
• give image free article cards a balanced text led treatment with no blank ratio box, broken slot or reserved whitespace
• keep Family, Toddler and the global article systems unchanged

Update old image quantity tests that force every audited article to retain photography. Replace them with checks for valid optional heroes, valid remaining body placements, no missing assets and no accidental fallback on explicitly image free First Year articles.

### 4. Visual verification

Run automated and rendered checks after cleanup.

At 1280, 834 and 390 pixels inspect:

• hub, 4 phases and 8 topics: 39 combinations
• all 26 article hero treatments: 78 combinations
• every retained article body image in context, with tablet and mobile sampling across Baby and Postpartum subjects

Verify:

• no semantically irrelevant or uncanny retained image
• safer sleep and feeding positioning remain responsible
• no strange crop, broken image, blank image box or empty placeholder
• image free heroes and cards look intentional
• typography and article rhythm remain balanced
• no horizontal overflow or console errors
• no regression to hub, phase or topic presentation

Run focused image and First Year regressions, then the full test suite, typecheck twice, lint and the production validation build. Record the established lint baseline separately if unchanged. Do not deploy.

### 5. Evidence and closure

Create:

• a complete current placement audit with one row per canonical placement and route appearance notes
• a Phase 37A.1 correction report with exact before and after totals
• responsive evidence with measured browser results
• representative before and after screenshots, including the feeding article and image free treatment, supplied for review
• a closed Phase 37A.1 roadmap record without altering the locked Phase 37A record

The report will state:

• current placements audited
• KEEP, RECROP, existing replacement and REMOVE totals
• new generated image count
• 26 of 26 article heroes inspected
• hero changes and image free totals
• article body images inspected and removed
• semantic and uncanny defects after
• broken placements and empty placeholders
• hub, phase and topic regressions
• article copy, AI, grounding, TTC and Pregnancy changes
• deployment status

Close only when the measured evidence supports:

`PHASE 37A.1 — FIRST YEAR IMAGE QUALITY CORRECTION`

`CLOSED PASS / IRRELEVANT AND LOW QUALITY IMAGERY REMOVED / FIRST YEAR VISUAL SYSTEM APPROVED`

Do not begin the First Year content coverage audit.
