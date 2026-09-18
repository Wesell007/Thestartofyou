# Phase 36A final closure patch

## Verified stale references

The four occurrences in `src/data/stageData.ts` are:

1. Line 193, `Next Stage`, `Timing and tracking`: `/trying-to-conceive/timing-and-tracking` → `/trying-to-conceive/cycle-tracking`
2. Line 316, `Previous`, `Understanding your cycle`: `/trying-to-conceive/understanding-your-cycle` → `/trying-to-conceive/ovulation`
3. Line 317, `Next Stage`, `Waiting and testing`: `/trying-to-conceive/waiting-and-testing` → `/trying-to-conceive/two-week-wait`
4. Line 439, `Previous`, `Timing and tracking`: `/trying-to-conceive/timing-and-tracking` → `/trying-to-conceive/cycle-tracking`

The three Phase 35C `Navigate replace` redirects are still present in `src/App.tsx`, above the generic stage route. Existing Phase 35C regression coverage asserts their mappings, ordering, sitemap exclusion and redirect safety.

## Implementation

- Change only those four `href` values to their already approved canonical destinations.
- Preserve all labels, titles, descriptions, surrounding stage data and TTC presentation.
- Preserve all three legacy redirects unchanged for historical and external URLs.
- Add no content, routes, redirects, sitemap logic, architecture or Pregnancy behaviour.

## Validation

- Confirm the retired URLs occur zero times as internal destinations in `stageData.ts` and the four canonical replacements are present.
- Run the blocking global link-integrity check, the Phase 35C TTC closure regressions and the Phase 36A focused Pregnancy regressions.
- Run the complete test suite, TypeScript validation twice, lint against the established one-error and ten-warning baseline, and a production validation build.
- Confirm zero broken TTC routes, broken Pregnancy routes, broken links and wrong-destination links, while all three legacy redirects remain unchanged.
- Do not deploy.

## Evidence and closure

- Update the existing Phase 36A responsive and validation evidence with: “Pre-existing stale TTC internal references discovered during Phase 36A validation and canonicalised to the already-approved Phase 35C destinations.”
- Replace the recorded blocked validation results with final measured results only after every closure gate passes.
- Update the Phase 36A roadmap entry to `CLOSED PASS / PREGNANCY PUBLIC EXPERIENCE REFINED / NO NEW CONTENT` while leaving Phase 35C history and `TTC WORKSTREAM CLOSED FOR CURRENT STRATEGY` unchanged.
- Return the final Phase 36A completion report and do not start another phase.
