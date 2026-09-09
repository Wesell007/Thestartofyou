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

Reported arithmetic: Phase 31 Postpartum records reviewed = 6, consolidated intents represented = 6, P0 = 2, P1 = 4, P2 = 0, unrelated = 0. Separately: physical remediation intents = 5; mental-health intent reviewed and out of physical scope = 1 (C082, `INTERNAL_LINK_ACTION` only, never counted as a physical page or expansion). Repository cross-checks — hair loss and night sweats, generic recovery, caesarean recovery — are reported outside the Phase 31 cluster arithmetic.

## Confirmed repository truth

Postpartum coverage is broader than Phase 31's owner column implies. Publication state and review state are reported separately for each dataset, and never inferred.

**First Year dataset (`src/data/firstYearArticleData.ts`) — explicit fields exist.** These eight records each carry `status: "ready"` and `medicallyReviewed: true`, confirmed by direct read: `healing-after-birth`, `what-recovery-can-feel-like`, `feeling-like-yourself-again`, `when-parenthood-feels-heavy`, `body-changes-after-birth`, `hormones-sweat-and-hair-loss`, `postnatal-checks-and-appointments`, `when-to-ask-for-help-after-birth`.

**Legacy dataset (`src/data/articleData.ts`) — no editorial-status field.** `/articles/postpartum-recovery-timeline` (broad cornerstone recovery owner), `/articles/your-body-after-birth` (broad body-change owner, mentions night sweats, hair loss, diastasis recti and pelvic floor at one-line depth), `/articles/pelvic-floor-exercises-in-pregnancy` and `/articles/pelvic-pain-in-pregnancy`. Their publication state will be resolved during 32C.1 from actual behaviour — record present, route resolves, public, self-canonical, in the sitemap, not redirected — and reported as `LIVE_INDEXABLE` or the appropriate evidence-based state. Their review state will be reported as `UNKNOWN / NOT EXPLICITLY RECORDED` unless a review field genuinely exists on the record.

`src/data/articleInventory.ts` still describes `healing-after-birth` and `what-recovery-can-feel-like` as draft placeholders while the authoritative First Year dataset says `status: "ready"`. Recorded as stale inventory metadata drift only; the runtime dataset wins and nothing is changed in this phase.

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
| Caesarean recovery (no Phase 31 record) | `healing-after-birth` covers both birth routes | Boundary check only. A new article is drafted solely if a documented Phase 31 evidence record demonstrates a clearly separate intent. Otherwise recorded as `NO_NEW_PAGE_REQUIRED` / `EXPAND_EXISTING`, or `FUTURE CONTENT VALIDATION REQUIRED`. No competitor research is widened to justify a URL. | SAFETY_REVIEW_REQUIRED if ever created |
| Postnatal mental health (C082) | `when-parenthood-feels-heavy` | INTERNAL_LINK_ACTION only, out of physical scope | n/a |

Preserved generic owners: `/articles/postpartum-recovery-timeline` stays the broad cornerstone recovery owner and `/articles/your-body-after-birth` stays the broad body-change owner. No competing generic page is proposed.

Review floor, not to be downgraded: lochia SAFETY_REVIEW_REQUIRED; perineal SAFETY_REVIEW_REQUIRED; diastasis HEALTH_REVIEW_REQUIRED; sex after birth HEALTH_REVIEW_REQUIRED; postnatal pelvic-floor/bladder-bowel expansion HEALTH_REVIEW_REQUIRED. Human review completed stays 0.

Expected outcome: 3 new articles, 2 to 3 existing-article expansions, internal-link actions for C046 and C082, 0 new hubs, 0 new lifecycles.

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
