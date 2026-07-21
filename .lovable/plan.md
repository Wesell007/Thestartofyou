## Scope

Refresh imagery across the `/pregnancy/body` ecosystem using **Nano Banana 2** (`imagegen--generate_image` with `model: "premium.gemini"`). Covers:

- The Body topic page hero
- All **25 sub-article** hero images (and their thumbnails on the topic page — same underlying files)

No copy, layout, routing, alt text or component changes.

## Approach

Overwrite each unique underlying `.jpg` in `src/assets/` in-place. Because the app resolves each article hero and each topic thumbnail through a shared asset (via `flagshipImageMap.ts`, `ArticleHeroImage.tsx`, and `PregnancyTopicPage.tsx`'s `HREF_IMAGE_MAP`), regenerating the source `.jpg` refreshes both hero and thumbnail everywhere it is referenced.

Regeneration parameters:
- Model: `premium.gemini` (Nano Banana 2)
- Dimensions: keep current framing — 1600×1067 (3:2) for editorial heroes
- Prompts: derived from each image's existing curated `alt` text plus the site's editorial style (soft daylight, cream linen, sage/eucalyptus accents, calm UK editorial, no faces of identifiable people, no text, no logos)

## Files to regenerate (unique assets, ~25)

Body topic page:
1. `src/assets/topic-body-hero.jpg`

Symptom & early-weeks cluster:
2. `src/assets/article-hero-early-symptoms.jpg`
3. `src/assets/article-hero-nausea.jpg`
4. `src/assets/article-hero-fatigue.jpg`
5. `src/assets/article-hero-implantation.jpg`
6. `src/assets/article-hero-implantation-bleeding.jpg`
7. `src/assets/article-hero-second-sleep.jpg`

Trimester cluster:
8. `src/assets/trimester-first.jpg`
9. `src/assets/trimester-second.jpg`
10. `src/assets/trimester-third.jpg`

Aches, digestion & body cluster:
11. `src/assets/article-hero-second-body.jpg`
12. `src/assets/article-hero-second-movement-exercise.jpg`
13. `src/assets/article-hero-second-eating.jpg`
14. `src/assets/flagship-heartburn-hero.jpg`
15. `src/assets/flagship-heartburn-anatomy.jpg`
16. `src/assets/flagship-heartburn-pillows.jpg`
17. `src/assets/flagship-heartburn-call.jpg`

Bleeding, discharge & reassurance cluster:
18. `src/assets/article-hero-bleeding-reassurance.jpg`
19. `src/assets/article-hero-discharge.jpg`
20. `src/assets/guidance-card-quiet.jpg`
21. `src/assets/guidance-card-body.jpg`
22. `src/assets/guidance-card-comfort.jpg`

Late pregnancy & labour cluster:
23. `src/assets/article-hero-third-signs-of-labour.jpg`
24. `src/assets/article-hero-third-movement.jpg`
25. `src/assets/article-hero-third-hospital-bag.jpg`
26. `src/assets/article-hero-third-sleep.jpg`
27. `src/assets/article-hero-third-emotional.jpg`

## Known cross-topic side effects (worth flagging)

Some of these files are also referenced from other topics/hubs (e.g. `article-hero-second-body.jpg` is used by weight-changes and second-trimester guides; the third-trimester assets appear on the Preparing hub; `guidance-card-*` files are also used by non-body flagship articles). Regenerating them refreshes those surfaces too — but each new image is directed by the same alt/subject brief, so the semantic fit remains correct. If you want body-only isolation instead (new dedicated files + rewire the maps), say so and I'll switch to that approach.

## Steps

1. Regenerate each file in the list above with Nano Banana 2, one call per file, using an editorial prompt derived from the current alt text and the site's photographic style.
2. Do a visual pass across `/pregnancy/body` and 2–3 sample article pages (e.g. `bleeding-in-early-pregnancy`, `sleep-in-pregnancy`, `heartburn-in-pregnancy`) to confirm images render and framing survives at hero + thumbnail sizes.
3. Report back with the list of regenerated files.

## Out of scope

- Alt text, copy, routes, sitemap, SEO metadata
- Journal / product imagery
- Non-body topics (Baby, Feelings, Health & Safety, Diet & Exercise, Preparing)
- The `video/journal-hero.mp4` file (still-image model can't regenerate video)
