# Phase 33.2 — Batch 1 image production and publication

Publish exactly two approved low-risk articles using existing systems, generate their imagery, apply only their documented link migration, validate, and stop at READY FOR DEPLOYMENT. No deployment. The other 17 drafts are untouched.

## Batch 1 scope (from the Phase 33 register)

| Article | Dataset | Template | Route | Images |
| --- | --- | --- | --- | --- |
| When your baby's sleep suddenly changes (`when-sleep-suddenly-changes`) | First Year, topic `sleep` | `HubArticleView` | `/first-year/sleep/when-sleep-suddenly-changes` | hero + 1 body, portrait |
| Hair dye and beauty treatments in pregnancy (`hair-dye-and-beauty-treatments-in-pregnancy`) | Legacy `articleData` | existing content-shape dispatch | `/articles/hair-dye-and-beauty-treatments-in-pregnancy` | hero only, 4:3 → 16:9 |

Register-confirmed migrations: sleep = `CHANGES_LINK_OR_INTENT_OWNERSHIP`; hair dye = `NO_LINK_MIGRATION_REQUIRED`.

## Steps

1. **Baseline.** Run tests, typecheck twice, lint, build, and the sitemap URL count. Expect 117 files / 1297 tests / 331 URLs, 1 existing lint error and 10 warnings. Stop and report if there is unexplained drift.
2. **Re-read the approved copy** in `phase32b-article-drafts.md` (sleep) and `phase32d-article-drafts.md` (hair dye), plus the intent-ownership and cannibalisation registers. No factual changes during conversion.
3. **Field-mapping check before writing records.** The legacy `ArticleData` shape is heavily structured (quick answer, how this feels, what's happening, timing, sources). Confirm the hair-dye draft maps onto an existing legacy shape and renderer through the existing dispatch. If it cannot map without substantive rewriting, stop that article as `HOLD_EDITORIAL_QA` and continue with the sleep article only.
4. **Images with Nano Banana.** Generate 3 assets total: sleep hero and body (portrait, night-lit bedroom, safe-sleep compliant cot, no loose bedding) and hair-dye hero (landscape, bright unbranded salon or bathroom, lifestyle, no warning or chemical cues). Shared direction: premium, warm, calm, editorial, natural, UK-appropriate, realistic, no embedded text. QA each output for realism, hands and faces, crop, focal point and artefacts; regenerate rather than accept a weak asset. Save into the existing article asset structure with descriptive filenames and register them through the existing image maps.
5. **Records.** Add the First Year record with truthful metadata: `status: "ready"`, no `medicallyReviewed`, no invented reviewer or review date. Add the legacy record via the existing dataset conventions only. If the First Year schema forces misleading review metadata, stop as `HOLD_TECHNICAL`.
6. **Link migration (sleep only).** Point the sleep primary and relevant month or topic surfaces at the new sub-intent article, keeping the existing settling and sleep-primary pages as supporting owners with their content intact. No site-wide link audit. Hair dye gets no manufactured links.
7. **Discovery and SEO.** Verify both appear through the existing topic/article discovery, resolve, are indexable and self-canonical, and enter the sitemap through the existing generator. No SEO, canonical, route or sitemap architecture changes.
8. **Focused tests** for route resolution, lookup, sitemap inclusion, slug uniqueness, First Year discovery, and absence of links to the 17 held drafts.
9. **Responsive QA** at desktop, tablet and mobile via a browser pass: hero height and crop, focal point, title wrapping, measure, body image placement, related guidance, sources block, no horizontal overflow.
10. **Validation and link integrity**, then documentation: update `docs/content/phase33-publication-register.md` for the two rows and create `docs/content/phase33-batch1-publication-report.md`.

## Boundaries

2 new article records and 2 new URLs (expected 331 → 333, derived from the generated sitemap). Zero new hubs, lifecycles, canonical/route/navigation/sitemap architecture changes, and zero AI, grounding, journal, memory, voice, database, schema or RLS changes. The 17 remaining drafts stay `NOT PUBLISHED`. No deployment; final state is READY FOR DEPLOYMENT.
