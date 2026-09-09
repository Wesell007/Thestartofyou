# Phase 32C — Postpartum / Recovery Gap Remediation

Documentation only. No runtime records, routes, navigation, sitemap, SEO, AI, grounding, journal, memory, voice or database changes. No deployment. Phases 32A and 32B stay closed.

## Confirmed Phase 31 records (read from `phase31-opportunity-clusters.csv`)

Exactly six records carry `domain = Postpartum`. No cluster IDs are guessed.

| ID | Intent | Classification | Owner in Phase 31 | Priority | Top vol | Keywords | Directional |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C080 | Lochia and postnatal bleeding | COVERED_PARTIAL | `/first-year/postpartum-recovery/healing-after-birth` | P0 | 4,400 | 12 | 17,720 |
| C078 | Diastasis recti | NEW_ARTICLE_GAP | none | P0 | 3,600 | 24 | 29,080 |
| C081 | Perineal care after birth | NEW_ARTICLE_GAP | none | P1 | 12,100 | 1 | 12,100 |
| C079 | Sex and recovery after birth | NEW_ARTICLE_GAP | none | P1 | 1,300 | 27 | 19,440 |
| C046 | Pelvic floor exercises | COVERED_STRONG | `/articles/pelvic-floor-exercises-in-pregnancy` | P1 | 22,200 | 4 | 28,020 |
| C082 | Postnatal mental health | COVERED_STRONG | `/first-year/emotional-wellbeing/when-parenthood-feels-heavy` | P1 | 12,100 | 158 | 109,690 |

P0 = 2, P1 = 4, P2 = 0, unrelated = 0. C082 stays outside the physical-recovery scope of this phase (section 19) and receives an internal-link note only.

## Confirmed repository truth

Postpartum coverage is broader than Phase 31's owner column implies. All of these are `status: "ready"` and medically reviewed:

- First Year `postpartum-recovery` topic: `healing-after-birth`, `what-recovery-can-feel-like`
- First Year `body-and-hormones` and related: `body-changes-after-birth`, `hormones-sweat-and-hair-loss`, `postnatal-checks-and-appointments`, `when-to-ask-for-help-after-birth`, `feeling-like-yourself-again`, `when-parenthood-feels-heavy`
- Legacy: `/articles/postpartum-recovery-timeline` (cornerstone, covers lochia, hormones, pelvic floor at overview depth) and `/articles/your-body-after-birth` (already names night sweats, hair loss, diastasis recti, pelvic floor at one-line depth)
- Legacy pregnancy: `/articles/pelvic-floor-exercises-in-pregnancy`, `/articles/pelvic-pain-in-pregnancy`

`src/data/articleInventory.ts` still marks `healing-after-birth` and `what-recovery-can-feel-like` as draft placeholders; the live dataset says otherwise. The evidence pack will record the dataset as authoritative and flag the stale inventory rows as a note, not a change.

Consequence: the generic "postpartum recovery" and "your body after birth" intents are already owned. No new generic recovery article will be proposed.

## Proposed actions (to be confirmed by the evidence stage)

| Intent | Current owner | Primary action | Review level |
| --- | --- | --- | --- |
| Lochia / postnatal bleeding (C080) | `healing-after-birth` | EXPAND_EXISTING_ARTICLE — explicit bleeding pattern and urgent red flags | SAFETY_REVIEW_REQUIRED |
| Perineal care, stitches, tears (C081) | none | NEW_ARTICLE in First Year postpartum-recovery | SAFETY_REVIEW_REQUIRED |
| Diastasis recti / abdominal recovery (C078) | one line in `your-body-after-birth` | NEW_ARTICLE, high-level, no exercise programme | HEALTH_REVIEW_REQUIRED |
| Sex and intimacy after birth (C079) | none | NEW_ARTICLE, includes contraception and pain routing | HEALTH_REVIEW_REQUIRED |
| Pelvic floor / bladder / bowel (C046) | pregnancy-framed article | INTERNAL_LINK_ACTION plus a postnatal section in an existing recovery article; no fragmented symptom pages | HEALTH_REVIEW_REQUIRED |
| Hair loss, night sweats, body change | `hormones-sweat-and-hair-loss`, `body-changes-after-birth` | NO_NEW_PAGE_REQUIRED | n/a |
| Caesarean recovery | `healing-after-birth` covers both routes | Tested during the evidence stage; a separate page is proposed only if evidence and demand support it, and it stays distinct from the 32A `caesarean-birth` birth-route draft | SAFETY_REVIEW_REQUIRED if created |
| Postnatal mental health (C082) | `when-parenthood-feels-heavy` | INTERNAL_LINK_ACTION only, out of physical scope | n/a |

Expected outcome: 3 new articles (plus a possible fourth if caesarean recovery is justified), 2 to 3 existing-article expansions, 0 new hubs, 0 new lifecycles.

## Stage 32C.1 — evidence and ownership

Create `docs/content/phase32c-evidence-pack.md` with the exact section structure requested: Phase 31 findings, current inventory, intent ownership map, one section per consolidated intent (Phase 31 evidence, current owner, UK sources, supported points, safety and escalation boundaries, excluded claims, cannibalisation finding, primary action, supporting action, review classification, `Evidence sufficient to build: YES / NO`), then cross-intent overlaps, cannibalisation risks, First Year ownership, conflicts, human review requirements, image requirements and publication recommendation.

Sources are UK-first and fetched live with checked dates: NHS your body just after birth, NHS bleeding after birth, NHS stitches and perineal healing, NHS caesarean recovery, NHS pelvic floor exercises, NHS sex and contraception after birth, NHS postnatal checks, plus NICE NG194 postnatal care and RCOG patient information where national guidance needs support. What to Expect stays demand evidence only.

Also reconfirm publication architecture: both the legacy dataset and the First Year dataset render a matching direct URL indexably, so safe non-public draft capability remains NO for both.

## Stage 32C.2 — drafting

Only for intents gated YES:

- `docs/content/phase32c-article-drafts.md` — full drafts, each headed `PUBLICATION STATUS: NOT PUBLISHED` and its own evidence-derived `REVIEW STATUS`.
- `docs/content/phase32c-existing-content-expansions.md` — for each expansion: current owner, uncovered intent, exact new sections, content to preserve, content not to duplicate, search-intent effect, internal links, review classification.

Content boundaries: no bleeding thresholds beyond what NHS wording supports, no false reassurance, no procedural or hygiene manuals, no diastasis measurement thresholds or exercise prescriptions, no timetable for resuming sex, no standalone fear-based warning-signs page (safety routing sits inside each relevant page), no drift into postnatal depression or trauma content, no imagery generated.

## Then

Report the full 30-point return with exact validation arithmetic and stop. Nothing is published or deployed.
