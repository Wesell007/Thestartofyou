# Phase 38B — Toddler content inventory

Source of truth: `src/data/toddlerArticleData.ts`. All routes follow `/toddler/:topic/:slug`. Every article is rendered on its topic page and appears as a related link on other articles. Every article has exactly 3 related slugs, and all of them are valid.

| # | Slug | Topic | Dataset | Inventory row | Age relevance | Role | Sources (structured) | Discovery | Overlap | Action |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | what-toddler-development-can-look-like | development-milestones | ready | draft/placeholder | 12m to 3y | Orientation | 3 (3) | WELL | Pairs with MFD, distinct | KEEP |
| 2 | when-milestones-feel-different | development-milestones | ready | draft/placeholder | 12m to 3y | Concern and support | 4 (4) | WELL | Distinct | KEEP |
| 3 | understanding-toddler-tantrums | behaviour-emotions | ready | draft/placeholder | 12m to 3y | Core behaviour | 4 (4) | WELL | Near BIG, distinct intent | EXPAND_EXISTING (P2 closure, hitting and biting) |
| 4 | helping-your-toddler-with-big-feelings | behaviour-emotions | ready | draft/placeholder | 18m to 3y | Co-regulation | 4 (4) | WELL | Near TAN, keep both | KEEP |
| 5 | supporting-toddler-speech-at-home | speech-language | ready | draft/placeholder | 12m to 3y | Practical | 4 (4) | WELL | Distinct | EXPAND_EXISTING (P3, bilingual development) |
| 6 | when-to-ask-about-speech-delay | speech-language | ready | draft/placeholder | 18m to 3y | Concern and support | 5 (5) | WELL | Distinct | KEEP |
| 7 | toddler-sleep-rhythms | sleep | ready | draft/placeholder | 12m to 3y | Rhythm and naps | 3 (3) | WELL | Near BED, keep both | KEEP |
| 8 | bedtime-battles-and-night-waking | sleep | ready | draft/placeholder | 18m to 3y | Bedtime and nights | 3 (3) | WELL | Near SLR, keep both | EXPAND_EXISTING (P3, moving from cot to bed) |
| 9 | picky-eating-in-toddlers | food-feeding | ready | draft/placeholder | 12m to 3y | Picky eating | 4 (4) | WELL | Near MEA, keep both | KEEP |
| 10 | making-mealtimes-feel-calmer | food-feeding | ready | draft/placeholder | 12m to 3y | Mealtime practice | 4 (4) | WELL | Near PIC, keep both | KEEP |
| 11 | signs-your-child-may-be-ready-for-potty-training | potty-learning | ready | draft/placeholder | 18m to 3y | Readiness | 4 (4) | WELL | Distinct | KEEP |
| 12 | potty-training-without-pressure | potty-learning | ready | draft/placeholder | 2y to 3y | Process and setbacks | 4 (4) | WELL | Distinct | EXPAND_EXISTING (P2 closure, withholding; P3 deferred, night dryness) |
| 13 | toddler-home-safety | health-safety | ready | draft/placeholder | 12m to 3y | Prevention | 4 (4) | WELL | Distinct | EXPAND_EXISTING (P2 closure, food choking; P3 deferred, outdoor safety) |
| 14 | when-to-call-the-gp | health-safety | ready | draft/placeholder | 12m to 3y | Escalation | 4 (4) | WELL | Distinct | KEEP |
| 15 | simple-play-ideas-for-toddlers | play-connection | ready | draft/placeholder | 12m to 3y | Practical play | 3 (3) | WELL | Near CON, keep both | EXPAND_EXISTING (P3, screen time) |
| 16 | building-connection-through-everyday-play | play-connection | ready | draft/placeholder | 12m to 3y | Connection | 3 (3) | WELL | Near PLY, keep both | KEEP |

## Article actions

- KEEP 10, EXPAND_EXISTING 6 (closure P2: TAN, PTP, HOM; deferred P3: BED, SPH, PLY), MERGE 0, REPOSITION 0, INTERNAL_LINK_ONLY 0, ARCHIVE_CANDIDATE 0. Total 16 of 16.
- Final reconciliation: the earlier ledger showed KEEP 13 / EXPAND_EXISTING 3 and left out the P3 expansions the register had already assigned (cot to bed to BED, bilingual to SPH, screen time to PLY). They are now counted.
- The internal link (A6 from BIG, A8 from PIC), E2 friendships decision and Family handoff treatments are journey-level recommendations, recorded in the gap register. They are not article actions.

## Inventory governance drift (separate from content coverage)

- Canonical ready Toddler articles: 16.
- Inventory rows referring to them: 16.
- Rows with stale status (draft): 16.
- Rows with stale recommendedAction (placeholder-era action): 16.
- Articles hidden publicly because of stale metadata: 0.
- Public availability source of truth: canonical Toddler dataset (`status: "ready"`) through the route and sitemap generator.
- Stale rows repaired in 38B: 0.

## Source records and reviewer-metadata / provenance debt

- Structured source records with verified URLs: 60. Label-only: 0. Articles with no sources: 0.
- Three data records (SPD, HOM, GP) set `medicallyReviewed: true` with `reviewedBy: "Jenny Joines"`, and `withToddlerDefaults` fills in the same reviewer by default. The Toddler renderer does not display these fields; nothing renders them today. The claims have no per-surface provenance, so they are classified as UNRESOLVED REVIEWER-METADATA / PROVENANCE DEBT: reviewer provenance findings 3, rendered unsupported reviewer claims 0. This is not a rendered claim violation. The fields were not changed; the remediation decision belongs to the next phase.

## Discovery

- Well discovered 16, weak 0, orphaned 0.
- Broken links 0, wrong destinations 0, stale slugs 0.
- Technical duplicates 0. Editorial overlap groups 5 (TAN/BIG, SLR/BED, PIC/MEA, PLY/CON, TDL/MFD), all KEEP BOTH.
