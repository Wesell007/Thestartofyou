# Homepage chapter illustrations: precision fidelity pass (Stage A style lock, Stage B final plates)

**Status: STAGE B DELIVERED FOR FOUNDER REVIEW (25 October 2026). Design artefacts only. Five watercolour chapter plates generated on GPT Image 2.5 from the founder-approved style sheet, integrated into the Step 3B homepage prototype. No runtime code, no Supabase change, no video work (Films B and C remain paused), My Week, Companion, Article, Activation, Lovable and the other hubs untouched.**

Governing rule: **REFERENCE FIDELITY FIRST** (founder precedent, 25 October 2026; see `../README.md`, "Governing rules"). The approved reference is the target, not inspiration; tool changes are allowed, design fallbacks are not; difficult elements are isolated and solved as one system; work is reviewed as REFERENCE TARGET / FIDELITY CHARACTERISTICS / MATCHED / REMAINING DIFFERENCES / WHY / NEXT FIDELITY ACTION.

## 1. Brief and locked decisions

The refined Step 3B homepage kept its architecture and lighter chapter cards. The one element that failed the approved reference was the chapter illustration family: a hand-drawn SVG line concept that read as generic line icons rather than the soft watercolour animals of **104 · D · One ecosystem, honestly told** (`explorations/104-homepage-D-gpt-image-2-5.jpg`). Founder-locked decisions for the pass:

- **Reference target:** 104 · D for composition, character, pose, facing, scale, restraint and the animal-to-botanical relationship. **Technique / brand authority:** the real TSOY journal artwork (cover fawn and rabbit, interior "Planning and organising" squirrel divider, baby-shower fawn by the stump).
- **Subjects locked:** TTC fawn, Pregnancy rabbit, First Year robin, Toddler squirrel with a subtle acorn, Family duck with ducklings. No substitutions.
- **One family, one model:** GPT Image 2.5 only (`gpt_image_2_5`, variant flare, quality high, 1k). No per-plate switch to any other model.
- **Cards not redesigned:** only the illustration changed, plus the minimum art-box accommodation (the pale SVG disc wash went with the SVG; the art box padding and image size were adjusted; mobile art box 118 to 128 px).
- **Format:** raster transparent PNG (the medium is watercolour; vector would change it).

## 2. Stage A: style lock (two rounds, 6.0 credits)

| Round | Sheets | References | Founder verdict |
|---|---|---|---|
| 1 | sheets 1 and 2 (jobs `e57ed719`, `7bd67900`) | 104D animal strip, cover fawn, cover rabbit, divider squirrel | NOT APPROVED: polished natural-history / nursery wildlife illustration; too much fur and feather micro-detail, sharper faces, heavier mass |
| 2 (correction) | sheets 3 and 4 (jobs `2ad524a9`, `ae94f006`) | 11 references: complete 104D card strip, clean five-animal strip, each 104D animal individually, cover fawn, cover rabbit, divider squirrel, fawn at the stump; prompt rewritten as an explicit style-matching task | **Sheet 4 APPROVED** as the mandatory style-hand anchor |

Measured against sheet 1 (mean absolute Laplacian inside each animal as a micro-detail proxy; mean darkness): sheet 4 was 24 % lower in micro-detail and 14 % lighter. `review/chapter-style-sheet-4-approved.jpg` is the anchor; `review/chapter-style-lock-vs-104d.jpg` shows 104D above sheets 3 and 4 at identical scale.

## 3. Stage B: five final plates (7.5 credits, no re-rolls)

Settings for every plate: `gpt_image_2_5`, flare, high, 1k, 1:1, `background: transparent`, 1024 × 1024 RGBA. Preflighted at 1.5 credits per plate immediately before submission; five plates 7.5, exactly the authorised maximum. Balance 1,150.88 before, 1,143.38 after. No plate was re-rolled; no other model was used.

References per plate, in order: (1) approved sheet 4 complete; (2) the same animal cropped from sheet 4; (3) the matching 104D animal crop for pose, facing, scale, botanical relationship and restraint; (4) the complete 104D card strip for card-scale lightness; (5) real cover fawn; (6) real cover rabbit; (7) fawn only: real fawn at the stump; squirrel only: real divider squirrel. One prompt skeleton for all five (style-matching instruction; composition: animal about 35 % of image height, animal plus sprig about 55 % of image width, generous negative space, one airy asymmetrical sprig; hand: soft, light, storybook watercolour, simplified warm faces, low visual weight, limited modelling; strict: no text, frame, disc, border, background, ground, shadow; negative: wildlife illustration, dense fur, individually rendered feathers, heavy modelling, cartoon, clip art, vector, sticker, 3D) with a one-sentence subject clause per plate that states the 104D facing: fawn in profile facing right with the head turned a little to the viewer; rabbit upright in three-quarter view turned slightly left; robin on a diagonal branch facing right; squirrel upright facing left with the tail up on the right; duck standing facing left with two ducklings. The facings were read from the 104D crops before prompting (an earlier Stage A note had the fawn and robin the wrong way round and was corrected).

| Plate | Job | Checks (alpha, halo, corners) |
|---|---|---|
| 1 TTC fawn | `93419958-e049-4ee1-8c38-6c3ac3ee49d1` | RGBA, content 58 % × 69 % of the square, transparent corners, light edge fringe only |
| 2 Pregnancy rabbit | `751ac259-578c-471d-ab39-b03eeab40985` | RGBA, 53 % × 58 %, clean |
| 3 First Year robin | `dd89f502-c99e-4ee4-ba2b-25176a6b3404` | RGBA, 64 % × 45 %, clean |
| 4 Toddler squirrel | `62fef2b0-446e-442e-b950-4e4a70a03042` | RGBA, 56 % × 56 %, clean |
| 5 Family duck | `ab7cf365-f185-47c4-b968-0de49b5c6d44` | RGBA, 65 % × 58 %, clean |

Post-processing (zero credits, `prototype-source/tools/pack-fidelity.py` and the working-folder script): alpha trim, uniform fit into a square (content 82 % of the box, centred), exports at 760 px (2×) and 380 px (1×) for the prototype, quantised 512 px copies for Git (`review/chapter-plate-*.png`, 32 to 64 KB). The 1024 masters and 760 px exports stay outside Git.

## 4. Quality gate, plate by plate

Evaluated against the approved sheet 4 (hand), the matching 104D animal (pose, facing, scale, restraint, botanical relationship) and the real journal technique.

| Plate | REFERENCE TARGET | MATCHED | REMAINING DIFFERENCES | Result |
|---|---|---|---|---|
| TTC fawn | 104D fawn: profile right, head to viewer, sprig behind left, small sprig low right; sheet 4 fawn face | Pose and facing exact; soft storybook face with large eyes; spots as washes; legs and hooves clean; sprigs placed as 104D; hand identical to sheet 4 | Slightly more body modelling than 104D's very light fawn | **PASS** |
| Pregnancy rabbit | 104D rabbit: upright, three-quarter, slightly left, long sprig lying left under the feet | Pose, facing and sprig placement exact; warm simplified face; body a quiet wash with a few strokes | Gaze is nearer the viewer than the brief's "no eye contact" ideal (104D's rabbit is equally frontal); fur strokes a touch more present than sheet 4's rabbit | **PASS** |
| First Year robin | 104D robin: diagonal branch, facing right, leaves both sides | Exact; soft breast, suggested wing, feet plausible; the closest plate to both references | None material | **PASS** |
| Toddler squirrel | 104D squirrel: upright facing left, tail up right, sprig low left; subtle acorn (locked) | Pose, facing, acorn and sprig exact; face warm and simplified | The densest plate of the five: the tail carries more directional strokes and the body more fur texture than sheet 4's squirrel (104D's own squirrel also has a stroked fluffy tail, so it is within the reference, but it is the heaviest of the family at full size; at card size it reads as the same system) | **PASS** (flagged; the founder may ask for one controlled re-roll at 1.5 credits if it should be lighter) |
| Family duck | 104D duck: standing, facing left, sprigs behind; ducklings locked by the founder | Facing and stance exact; two soft ducklings; plumage suggested with soft scalloped marks rather than drawn feathers | The right-hand sprig is a little fuller than 104D's; plumage pattern slightly more present than sheet 4's duck | **PASS** |

System check: one hand across all five (same wash technique, same palette, same leaf language, same facial construction); no text, frames, discs, borders or shadows; five locked subjects; transparent edges clean on all five washes.

## 5. Homepage integration (minimum change)

- `homepage.html`: the five `<svg data-art>` concept drawings became `<img>` plates with 1× / 2× `srcset`, descriptive alt text and explicit dimensions; the header comment and the art note under the row now state honestly that the plates are AI-generated concept plates anchored to the approved style sheet, not production artwork.
- `css/tsoy-3b-refine.css`: `.plates .art` padding 30/30/10 to 22/22/0 and a `.plate-art` image rule (max 228 px) on desktop; the mobile art box 118 to 128 px with 6 px padding. Nothing else in the card system changed: colours, typography, descriptions, actions, spacing, min-height, top band and separators are as before.
- `art/chapters-test.html`: the harness now shows 104D, the previous SVG family and the final family on the current washes (`review/chapter-illustrations-desktop.jpg`). The SVG family stays in `art/chapters.svg` for the record.
- Before / after at both widths: `review/chapter-illustrations-before-after-desktop.jpg`, `-mobile.jpg`. Chapter section: `review/homepage-chapters-desktop.jpg`, `-mobile.jpg`. Full homepage: `review/homepage-desktop.jpg`, `-mobile.jpg`. Five-plate comparison with 104D on the real card washes at 104D's proportion: `review/chapter-plates-vs-104d.jpg`.

## 6. Final fidelity assessment

**REFERENCE TARGET:** 104 · D · One ecosystem, honestly told (composition, character, facing, scale, restraint, botanical relationship); the real TSOY journal artwork (watercolour hand, soft edges, pencil touches, facial warmth, eucalyptus language); the founder-approved sheet 4 as the hand.

**FIDELITY CHARACTERISTICS:** five locked subjects in one storybook watercolour hand; simplified warm faces; low visual weight and limited modelling; one airy asymmetrical sprig per animal; 104D's poses and facings; generous negative space; no text, frame, disc or shadow; transparent plates on the current lighter card washes.

**MATCHED:** every pose and facing follows its 104D animal; the hand is sheet 4's across all five; faces are soft and warm; foliage is light and integrated; the plates sit on the existing washes with no disc; the cards' type, copy, actions and spacing are unchanged; at card size the row reads as the 104D system with TSOY's own typography.

**REMAINING DIFFERENCES:** the squirrel is denser than sheet 4 (tail strokes, fur texture); the rabbit's gaze is near-frontal; the duck's right sprig is a little full; all five carry slightly more body modelling than 104D's very small, very light plates, which was already true of the approved sheet. Within the card the animal-plus-sprig composition is about 58 to 65 % of the art box width rather than 104D's 55 % of its wider card; the square art box and the 1.64:1 card are different frames, so the proportion was tuned visually.

**WHY:** GPT Image 2.5 reproduces the high-resolution journal technique more readily than the lightness of the small 104D plates, so individual plates land between the approved sheet and the journal's own animals; the squirrel's fluffy tail is the subject where this shows most.

**NEXT FIDELITY ACTION (not authorised; founder's call):** if the squirrel should be lighter, one controlled GPT Image 2.5 re-roll with the same references and a stronger "tail as one soft wash with three or four strokes" clause, 1.5 credits; otherwise none. Production artwork remains to be commissioned or hand-finished from this family, as the art note says.

## 7. Credits and ledger

| Step | Credits |
|---|---|
| Stage A round 1 (sheets 1, 2) | 3.0 |
| Stage A correction round (sheets 3, 4) | 3.0 |
| Stage B five plates | 7.5 |
| Uploads, preflights, post-processing, captures | 0 |
| **Fidelity pass total** | **13.5** |

Balance 1,156.88 before the pass, 1,143.38 after. No video credits spent; Films B and C remain paused. Media ids, job ids and verbatim prompts are in the working folder `C:\Users\Administrator\.tsoy-design\higgsfield-explorations\chapter-illustrations\` (`uploads.md`, `prompts.md`, `stage-b/prompts-stage-b.md`, `stage-b/plate-checks.json`).

## 8. Guarantees

- No file under `src/`, `supabase/`, `scripts/`, `public/` or any build or test config changed or references these files.
- The plates are AI-generated concept material and are labelled as such on the page; the real journal artwork was used only as a reference and is not represented by AI imagery anywhere.
- Kidproducts appears nowhere.
