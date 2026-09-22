# Phase 37A.1 First Year responsive evidence

## Browser matrix

Fresh browser validation covered 13 hub, phase and topic surfaces and all 26 article surfaces at 1280, 834 and 390 CSS pixels.

- Hub, phase and topic checks: 39.
- Article checks: 78.
- Total rendered checks: 117.
- Horizontal overflow: 0.
- Broken rendered images: 0.
- Missing or duplicate primary headings: 0.
- Browser console errors after correction: 0.

## Representative screenshots

Captured in `/tmp/browser/phase37a1-final/`:

- `feeding-desktop.png`
- `feeding-mobile.png`
- `feeding-article-desktop.png`
- `feeding-article-mobile.png`
- `retained-hero-tablet.png`

The feeding article screenshots verify its intentional image-free editorial header. The feeding topic screenshot verifies mixed image-bearing and intentional text-led discovery treatment. The teething screenshot verifies an approved article image still renders at tablet width.

## Automated regression evidence

Focused regression coverage proves:

1. An article with an approved image renders it.
2. An explicitly image-free article renders no hero or fallback and uses the text-led layout.
3. An explicitly image-free discovery card renders no image, fallback or blank image slot.
4. A non First Year article without suppression retains existing behaviour.
5. A removed image reference causes no broken request.
6. Unsuppressed First Year items retain normal fallback behaviour.
7. All fifteen explicitly suppressed article records have no mapped hero.
