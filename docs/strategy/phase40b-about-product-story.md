# Phase 40B — About / Our Story truth-led narrative rebuild

Source of truth: Phase 40A claims truth registry (binding). Route `/about`, canonical, sitemap entry unchanged.

## Old narrative (tree before edit)
Navbar → AboutHero → AboutProblem → AboutApproach → AboutEcosystem → AboutAdaptive → AboutJournalConnection → AboutDifferent → AboutMission → AboutCTA → Footer (9 sections). Feature-count positioning ("7 journey stages", "50+ structured guides"), "physical and digital" framing, "at every stage", CTA to `/product` (redirect). No images; lucide icons only. No About tests.

## New narrative (10 sections, `src/components/about/AboutStory.tsx`)
1 Hero · 2 Why we exist · 3 Today (four pillars) · 4 Philosophy (four principles) · 5 How the pieces meet · 6 What we're building toward (plum `--stage-recovery-deep` band) · 7 Some things are for keeping (journal) · 8 Knowing the limits · 9 What we want to protect · 10 Final CTA.

Old sections retained 0; materially reframed 4 (Hero, Problem → Why, JournalConnection → Keeping, CTA); removed 5 (Approach, Ecosystem, Adaptive, Different, Mission); new narrative sections 6 (Today, Philosophy, System, Future, Limits, Promise).

## Claims
- Removed: 7 journey stages, 50+ structured guides, 1 connected system, "every stage"/"at every stage", "physical and digital" as integrated, "not another content platform, a guided experience".
- Retained / true now (A): guidance across TTC, pregnancy, first year, toddler, family with IVF and preparing for baby; practical calculators (due date, ovulation); private reflection space; physical pregnancy journal; limits and human-help framing.
- Qualified (B): Companion is "context-aware" and "can use your saved journey and the part of the site you're in" (no memory claim); physical and digital experiences "separate today"; trust as a product principle, not a claim that all answers show provenance.
- Future direction (C), only inside the labelled future section: clearer trust, useful next steps, continuity with permission, memory that belongs to you; closed by "Not all of this is live today".
- Do not claim (D) present: 0.

## Imagery
Existing repo asset `journal-flatlay.jpg` (already used by JournalPromotion) reused for the journal section. No images generated, removed or replaced (page had none).

## SEO
Title kept; meta description updated to match the new narrative. Canonical and sitemap unchanged.

## Secondary final CTA
"Explore the guidance" omitted: no canonical guidance discovery route exists.

## Responsive evidence
1280 / 834 / 390: horizontal overflow 0, broken images 0, console errors 0, heading order h1 → h2 → h3 with no jumps. Future band visibly distinct at all widths.

## Validation
Focused `phase40bAboutStory` 7/7; with reviewer governance, 40A thesis and start-your-journey regressions 4 files/29 tests PASS. Full suite 146 files/1,642 tests PASS first run. Typecheck ×2 PASS. Lint 1 error/10 warnings (baseline). Production build PASS. No deployment.
