# Phase 37B First Year visual evidence

## Direction gate

Nano Banana produced `src/assets/first-year-pathway-phase-direction-board.png` before production completion. It covers the two pathway identities, four age stages and editorial image-break treatment. The board is direction-only: production imports and rendered placements are 0.

## Implemented visual system

- Hub pathway cards: two equal-weight editorial cards, each with one strong approved image, eyebrow, title, explanation, four topic names and one CTA.
- `Twelve months, four phases`: four image-led phase cards retain a separate role from the thirteen-month map.
- `Everything, side by side`: two editorial collections with one justified image per side and compact linked topic rows; additional symmetry-driven thumbnails: 0.
- Phase pages: exactly one contextual image break on each of four phases, using existing approved imagery and no missing-image fallback.
- Article hero suppression inherited unchanged: 15 intentionally image-free records; fallback restoration: 0.

## Browser evidence

Fresh Playwright QA covered seven core surfaces at 1280, 834 and 390 CSS pixels, plus all eight topic pages at 1280: 29 rendered checks total.

- Core responsive checks: 21.
- Topic sanity checks: 8.
- Horizontal overflow: 0.
- Broken rendered images: 0.
- Missing or duplicate primary headings: 0.
- Console and page errors: 0.
- Pathway embedded Companion failures: 0.
- Phase image-break failures: 0.

Screenshots were captured in `/tmp/browser/phase37b/screenshots/`, including pathway desktop/mobile views, premium hub cards, side-by-side topic collections, both Companion/cross-link endings and the 6–9 month image break. Visual inspection confirmed coherent desktop, tablet and mobile hierarchy.