# Phase 37B.1 First Year responsive evidence

## Browser matrix

Fresh browser validation covered 40 affected routes at 1280, 834 and 390 CSS pixels:

- Pathway pages: 2.
- Topic pages: 8.
- Phase pages: 4.
- Article pages: 26.
- Total route and viewport checks: 120.

Every page was scrolled before image evaluation so lazy loaded imagery was measured only after entering the viewport.

- Horizontal overflow: 0.
- Broken rendered images: 0.
- Missing or duplicate primary headings: 0.
- Nested interactive controls: 0.
- Browser console errors: 0.

## Visual review

Representative screenshots covered an image bearing topic page at desktop and mobile, a phase page at tablet, a Baby article at desktop and mobile, and a Postpartum article at tablet.

The review confirmed:

- meaningful article specific images at full hero scale;
- consistent destination identity on topic and phase cards;
- safe and plausible infant handling, feeding and sleep scenes;
- clear Postpartum recovery context without graphic or diagnostic imagery;
- resilient desktop, tablet and mobile crops without hiding image defects;
- no image distortion, clipped controls or text overlap;
- existing visible focus, touch target, heading and reduced motion behaviour preserved.

## Automated evidence

Focused regression coverage proves 26 explicit heroes, 26 distinct assignments, zero current suppressions, zero generic fallback, destination based topic and phase imagery, unchanged body image mappings and unchanged AI runtime boundaries.

- Focused suite: 4 files, 45 tests PASS.
- Full suite: 137 files, 1,576 tests PASS.
- Typecheck: PASS twice.
- Production build: PASS.
- Sitemap: 354 entries, 354 unique.
- Lint remained at the established unrelated baseline of one error and ten warnings.