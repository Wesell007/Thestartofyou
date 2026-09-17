# Phase 35A.1: TTC Explore topic card imagery

## Goal
Refine only the seven existing supporting cards in `Explore TTC topics` on `/trying-to-conceive` by adding compact, relevant editorial photography. Preserve Phase 35A structure, wording, destinations and behaviour.

## Existing imagery selection
Use the distinct approved image already associated with each destination in the TTC page system:

| Card | Existing image |
| --- | --- |
| Cycle tracking | `ttc-stage-cycle.jpg` |
| The two-week wait | `ttc-stage-waiting.jpg` |
| Pregnancy testing in TTC | `ttc-pregnancy-tests.jpg` |
| Conditions that can affect TTC | `ttc-conditions.jpg` |
| Age and fertility | `ttc-age-and-fertility.jpg` |
| Male fertility | `ttc-male-fertility.jpg` |
| IVF and fertility treatment | `ttc-ivf-treatment.jpg` |

These are seven unique, topic-specific local assets already mapped to the same TTC destinations. No images will be generated, downloaded or duplicated.

## Implementation
- Add a hub-local presentation image map keyed by the existing topic slug. Keep the existing topic data and destination source of truth unchanged.
- Reshape only the seven supporting cards into image, category label, title, description and unchanged `Explore topic` action.
- Use a stable compact image area around 160px high, full card width, `object-cover`, and top corners matching the current card shape.
- Keep the existing desktop three-column, tablet two-column and mobile one-column layouts, with full readable copy and balanced card bodies.
- Keep each card as the existing single accessible link. Treat its image as decorative within that already-labelled link so assistive technology does not repeat the visible title. Preserve visible focus and reduced-motion behaviour.
- Lazy-load and asynchronously decode these below-the-fold images, with stable dimensions to avoid layout shift.
- Do not alter the three deeper TTC topic-page libraries or any shared topic template.

## Validation
- Add focused coverage confirming all seven cards have the intended unique image and retain their exact existing href, grouping, order, copy and action language.
- Run the focused TTC tests, full tests, typecheck twice, lint and production validation build. Record any unchanged baseline issue separately.
- Review `/trying-to-conceive` at 1280px, 834px and 390px, checking crop quality, image uniqueness, card rhythm, readable titles and descriptions, visible actions, overflow and console errors.
- Confirm the three deeper topic-page compact libraries are unchanged.

## Completion report
Report:
- Explore TTC topic cards with imagery = 7 / 7
- Unique/relevant image treatment = YES
- Existing destinations preserved = YES
- Topic grouping unchanged = YES
- Topic-page compact libraries changed = NO
- Responsive 1280 / 834 / 390 = PASS or FAIL
- New content = 0
- New routes = 0
- Application deployed = NO

Close only when verified as:

`PHASE 35A.1 — TTC EXPLORE TOPIC CARD IMAGERY`

`CLOSED PASS / VISUAL REFINEMENT COMPLETE`
