# Phase 37C — First Year content inventory

Audit only. No content, route, image, AI, grounding, reviewer, database, lifecycle or analytics changes. Measured from the repository on 23 September 2026.

## 1. Route definitions versus concrete public URLs

Route patterns are counted separately from the concrete URLs they serve. A pattern is never counted as an additional visitor-facing surface.

| Field | Measured |
| --- | --- |
| Canonical route definitions (First Year, `src/App.tsx`) | 29 |
| Concrete canonical First Year public URLs | 54 |
| Hub URLs | 1 |
| Pathway URLs | 2 |
| Topic URLs | 8 |
| Phase URLs | 4 |
| Month destinations | 13 |
| Month destinations that are distinct public URLs | 13 |
| Article URLs | 26 |
| Legacy / redirect URLs | 5 |
| Indexable canonical duplicate URLs (First Year hub) | 0 |
| Sitemap URLs attributable to First Year (`/first-year*`) | 54 |
| Sitemap total (whole site) | 354 |

Route definitions breakdown: 1 hub + 2 pathway + 4 phase + 13 month (each month is its own `<Route>` with a `slug` prop) + 8 topic + 1 article pattern (`/first-year/:topic/:slug`) = 29. The article pattern serves 26 concrete URLs and is not counted as a 27th surface.

Month mechanism: the 13 months are 13 distinct public URLs served by one shared page component with a literal `slug` prop per route. They are not anchors, parameter values or stateful destinations.

## 2. Legacy / canonical route accounting (separate ledger)

| Legacy route | Canonical destination | Mechanism | Indexable | In sitemap | Inbound internal references | Redirect loop | Stale destination |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/postpartum` | `/first-year#recovery-topics` | `<Navigate replace>` | NO | NO | NO (route only) | NO | NO (anchor `recovery-topics` rendered by `FYTopicClusters`) |
| `/postpartum/early-days` | `/first-year/postpartum-recovery/healing-after-birth` | `<Navigate replace>` | NO | NO | NO | NO | NO |
| `/postpartum/early-weeks` | `/first-year/postpartum-recovery/what-recovery-can-feel-like` | `<Navigate replace>` | NO | NO | NO | NO | NO |
| `/postpartum/ongoing-adjustment` | `/first-year/emotional-wellbeing/feeling-like-yourself-again` | `<Navigate replace>` | NO | NO | NO | NO | NO |
| `/postpartum/legacy` | n/a (renders retained legacy page) | Rendered page, `noindex,follow` | NO | NO | NO | NO | n/a |

| Field | Measured |
| --- | --- |
| Canonical First Year public routes | 54 |
| Legacy / redirect First Year routes | 5 |
| Indexable legacy surfaces | 0 |
| Legacy routes present in sitemap | 0 |
| Internal links still pointing to legacy routes | 0 |
| Redirect loops | 0 |
| Broken legacy destinations | 0 |
| Canonical duplicate surfaces | 0 |

`src/lib/companion/journeyContext.ts` contains a `/postpartum` prefix matcher. That is journey classification for an incoming URL, not a rendered internal link, so it is not counted as an inbound reference.

## 3. Surface inventory

| Group | Count | Detail |
| --- | --- | --- |
| Hub | 1 | `/first-year` |
| Pathways | 2 | `/first-year/baby`, `/first-year/postpartum` |
| Topics | 8 | Baby: feeding, sleep, development, care-and-safety. Recovery: postpartum-recovery, emotional-wellbeing, body-and-hormones, checkups-and-warning-signs |
| Phases | 4 | 0-3, 3-6, 6-9, 9-12 months |
| Month destinations | 13 | newborn, 1–12 months |
| Article records | 26 | all `status: "ready"` |
| Cross-stage / support surfaces referenced | 4 | `/toddler` (3 references), Pregnancy entry points into `/first-year`, `/support` pathways, `/articles/*` legacy First Year set |
| Legacy / redirect surfaces | 5 | see ledger above |
| Indexable duplicate / legacy surfaces inside `/first-year` | 0 | — |

## 4. Article inventory (26 records)

Ownership: Baby 15, Postpartum 11. Status: ready 26, draft 0, unknown 0. Duplicate slugs: 0. Every record renders at `/first-year/<topic>/<slug>`, appears on its pathway page and on its topic page.

Discovery key: SH = pathway Start Here, G = pathway grouped list, T = topic library, F = topic featured, P = phase useful read / featured guidance, M = month related, R = related guidance inbound.

| # | Slug | Title | Side | Topic | Discovery | Sources | Related in / out | Action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | newborn-feeding-rhythms | Newborn feeding rhythms | Baby | feeding | SH T F P M | 4 | 10 / 3 | KEEP |
| 2 | bottle-and-breastfeeding-questions | Bottle and breastfeeding questions | Baby | feeding | G T F P M | 5 | 13 / 3 | EXPAND_EXISTING |
| 3 | newborn-sleep-expectations | Newborn sleep expectations | Baby | sleep | SH T P M | 3 | 10 / 3 | KEEP |
| 4 | helping-your-baby-settle | Helping your baby settle | Baby | sleep | G T F P M | 3 | 20 / 3 | KEEP |
| 5 | when-sleep-suddenly-changes | When your baby's sleep suddenly changes | Baby | sleep | G T F P M | 3 | 4 / 3 | KEEP |
| 6 | baby-development-in-the-first-year | Baby development in the first year | Baby | development | SH T F P M | 4 | 19 / 3 | EXPAND_EXISTING |
| 7 | when-milestones-feel-uneven | When milestones feel uneven | Baby | development | G T F P M | 4 | 11 / 3 | KEEP |
| 8 | baby-care-basics | Baby care basics | Baby | care-and-safety | G T F | 4 | 8 / 3 | KEEP |
| 9 | safe-sleep-and-home-safety | Safe sleep and home safety | Baby | care-and-safety | SH T F P M | 4 | 11 / 3 | KEEP |
| 10 | teething | Teething: what to expect and what helps | Baby | care-and-safety | G T M | 4 | 2 / 3 | INTERNAL_LINK_ONLY |
| 11 | colic-and-evening-crying | Colic and evening crying | Baby | care-and-safety | G T | 4 | 0 / 3 | INTERNAL_LINK_ONLY |
| 12 | newborn-quirks-and-reflexes | Normal newborn quirks and reflexes | Baby | care-and-safety | G T | 4 | 2 / 3 | INTERNAL_LINK_ONLY |
| 13 | newborn-skin-spots-and-marks | Newborn skin: spots, marks and dry patches | Baby | care-and-safety | G T | 3 | 2 / 3 | INTERNAL_LINK_ONLY |
| 14 | common-illnesses-in-the-first-year | Common illnesses in the first year | Baby | care-and-safety | G T F | 4 | 2 / 3 | KEEP |
| 15 | introducing-solid-foods | Introducing solid foods | Baby | feeding | G T F P | 4 | 1 / 3 | EXPAND_EXISTING |
| 16 | healing-after-birth | Healing after birth | Postpartum | postpartum-recovery | SH T F P M | 4 | 9 / 3 | EXPAND_EXISTING |
| 17 | what-recovery-can-feel-like | What recovery can feel like | Postpartum | postpartum-recovery | G T P M | 4 | 10 / 3 | KEEP |
| 18 | stitches-tears-and-perineal-healing | Stitches, tears and perineal healing | Postpartum | postpartum-recovery | G T F | 4 | 0 / 3 | KEEP |
| 19 | feeling-like-yourself-again | Feeling like yourself again | Postpartum | emotional-wellbeing | G T F P M | 3 | 18 / 3 | KEEP |
| 20 | when-parenthood-feels-heavy | When parenthood feels heavy | Postpartum | emotional-wellbeing | SH T F P M | 4 | 15 / 3 | KEEP |
| 21 | body-changes-after-birth | Body changes after birth | Postpartum | body-and-hormones | SH T F P M | 4 | 11 / 3 | EXPAND_EXISTING |
| 22 | hormones-sweat-and-hair-loss | Hormones, sweat and hair loss | Postpartum | body-and-hormones | G T F P | 3 | 3 / 3 | KEEP |
| 23 | separated-tummy-muscles | Separated tummy muscles | Postpartum | body-and-hormones | G T F | 4 | 0 / 3 | KEEP |
| 24 | sex-and-intimacy-after-birth | Sex and intimacy after birth | Postpartum | body-and-hormones | G T F P | 4 | 1 / 3 | KEEP |
| 25 | postnatal-checks-and-appointments | Postnatal checks and appointments | Postpartum | checkups-and-warning-signs | SH T F M | 3 | 7 / 3 | KEEP |
| 26 | when-to-ask-for-help-after-birth | When to ask for help after birth | Postpartum | checkups-and-warning-signs | G T F P M | 4 | 11 / 3 | KEEP |

Action arithmetic: KEEP 17 + EXPAND_EXISTING 5 + MERGE 0 + REPOSITION 0 + INTERNAL_LINK_ONLY 4 + ARCHIVE_CANDIDATE 0 = 26 = measured article inventory.

No recommendation in this table has been implemented.

## 5. Source record inventory

| Field | Measured |
| --- | --- |
| Article source records | 93 (all structured with publisher + URL) |
| Month source records | 63 (all structured) |
| Phase source records | 20 (all structured) |
| Structured / verified source records (total) | 176 |
| Label-only source records | 0 |
| Articles with no source records | 0 |
| Phase / month provenance concerns | 0 |

Publishers used: NHS, NHS Start for Life, UNICEF UK Baby Friendly Initiative, The Lullaby Trust, RCPCH, RoSPA, Child Accident Prevention Trust, RCOG, Tommy's, Maternal Mental Health Alliance, Royal College of Psychiatrists, Mind, PANDAS Foundation, NCT, NICE NG194.

## 6. Legacy `/articles/*` records attributed to the First Year hub

These are not First Year canonical surfaces; they are legacy-article surfaces recorded in `src/data/articleInventory.ts`. All six are indexable and present in the sitemap.

| Route | Canonical role | Duplicate risk | Overlaps |
| --- | --- | --- | --- |
| `/articles/postpartum-recovery-timeline` | primary | medium | healing-after-birth, what-recovery-can-feel-like |
| `/articles/baby-sleep-first-year` | primary | medium | newborn-sleep-expectations, helping-your-baby-settle |
| `/articles/feeding-your-baby-complete-guide` | primary | medium | First Year feeding set |
| `/articles/your-body-after-birth` | primary | medium | body-changes-after-birth |
| `/articles/baby-milestones-first-year` | needs-decision | high | baby-development-in-the-first-year |
| `/articles/what-to-buy-for-a-new-baby` | primary | none | — |

`src/data/articleInventory.ts` is stale relative to repository truth: it lists 16 First Year hub articles as `draft` when all 26 are `ready`, and it does not contain the 10 articles added after it was written. Recorded as a documentation-accuracy finding only; not corrected in this phase.
