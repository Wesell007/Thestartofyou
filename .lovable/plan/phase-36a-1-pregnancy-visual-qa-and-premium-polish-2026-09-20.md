# Phase 36A.1 Pregnancy visual QA and premium polish

## Confirmed baseline

Fresh browser evidence was captured for the Pregnancy hub and all six canonical topic pages at 1280, 834 and 390 pixels, covering 21 route and viewport combinations.

The current implementation already shows:

- zero horizontal overflow across all 21 combinations
- zero console errors
- zero broken images after lazy loaded sections were brought into view
- six distinct image backed Pregnancy pathways
- three trimester chapter destinations and all 42 week destinations
- six editorial FAQ rows with no AI actions
- one embedded hub Companion and one contextual handoff on each topic page
- balanced hub hero, compact orientation, subordinate trimester cards, readable week map and quiet sibling navigation

One consistent presentation issue is visible across all six topic pages at 390 pixels: the breadcrumb sits too close to the fixed header and becomes faint and cramped. No other section currently justifies visual change from the evidence reviewed.

## Implementation

1. **Refine the shared topic breadcrumb on mobile only**
   - Adjust spacing and visual contrast in the shared Pregnancy topic template so the breadcrumb is clearly separated from the header at 390 pixels.
   - Preserve its text, destinations, structured data, desktop and tablet composition, hero image, title and introduction.
   - Apply the single shared correction to all six canonical topic pages.

2. **Leave strong sections unchanged**
   - Keep the hub hero, calculator, orientation band, six pathway cards, trimester cards, week map, IVF crossover, FAQ, hub Companion and final journey action unchanged unless the post-change verification reveals a concrete regression.
   - Keep topic coverage, Start Here counts, grouped libraries, contextual Companion and sibling navigation unchanged apart from the breadcrumb correction.

3. **Record the evidence**
   - Create `docs/content/phase36a1-pregnancy-visual-review.md` with the seven-surface review, the observed issue, the exact refinement and why it improves the experience.
   - Create `docs/content/phase36a1-pregnancy-responsive-evidence.md` with PASS or ISSUE for every surface at 1280, 834 and 390 pixels and fresh measured closure results.
   - Append Phase 36A.1 to `roadmap.md` without changing the closed Phase 36A record.

## Verification

- Repeat all 21 browser checks with the consent notice dismissed and lazy loaded imagery fully exercised.
- Inspect the six topic breadcrumbs closely at 390 pixels and confirm desktop and tablet heroes remain unchanged.
- Verify image crops, vertical rhythm, FAQ open state, calculator usability, focus visibility, mobile target sizing, Companion placement and sibling wrapping.
- Confirm six pathways, three trimester destinations, 42 week destinations, six FAQ rows, one hub Companion and six topic handoffs remain intact.
- Run focused Pregnancy UI, route, calculator, trimester and week, Companion boundary and available accessibility regressions.
- Run the full test suite, TypeScript checks twice, lint against the existing baseline and a production validation build.
- Do not deploy.

## Locked boundaries

No content, guidance, routes, images, calculator logic, week model, lifecycle, database, schema, analytics, AI runtime, prompts, context building, grounding, memory, reviewer claims or TTC changes. Phase 36A remains closed and Phase 36B will not start automatically.
