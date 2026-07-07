# Phase 7.8 — Emotional wellbeing publishing

## Scope

Replace the two draft objects in `src/data/firstYearArticleData.ts` (lines 1069–1087) with full ready articles. No other files touched. No images this phase.

## Preserved fields (per article)

`slug`, `topic: "emotional-wellbeing"`, `title`, `description`. `readTime`: `"5 min read"` for `feeling-like-yourself-again`, `"6 min read"` for `when-parenthood-feels-heavy` (matches existing draft values).

## Shared standard

`status: "ready"`, `medicallyReviewed: true`, `reviewedBy: "Jenny Joines"`, `lastUpdated: "July 2026"`, `seoTitle`, `seoDescription`, `intro` (one calm paragraph), 7 sections × 2 short paragraphs each, 5–6 `keyTakeaways`, 3 `relatedSlugs` (all confirmed `status: "ready"` in the file), 3–5 verified UK sources. British English, no em dashes, no diagnosis / treatment / medication / emergency thresholds, no fake authority, no bounce-back or shame wording.

## Article 1 — `feeling-like-yourself-again`

Warm, validating, non-medicalising. Sections:
1. Why you may not feel like yourself straight away
2. Body, sleep and hormones after birth
3. Identity after becoming a parent
4. The emotional load of caring for a baby
5. Small ways to feel more grounded
6. Talking honestly about how you feel
7. When it helps to ask for support (soft signposting: "If your mood, anxiety, exhaustion or ability to cope worries you, speak to your midwife, health visitor or GP.")

`relatedSlugs`: `when-parenthood-feels-heavy`, `what-recovery-can-feel-like`, `hormones-sweat-and-hair-loss`.

Sources (4):
- NHS — Mental health in pregnancy and after birth · `https://www.nhs.uk/pregnancy/keeping-well/mental-health/`
- NHS Start for Life — Baby · `https://www.nhs.uk/start-for-life/baby/`
- NHS — Services and support for parents · `https://www.nhs.uk/conditions/baby/support-and-services/services-and-support-for-parents/`
- Maternal Mental Health Alliance — About maternal mental health · `https://maternalmentalhealthalliance.org/about-maternal-mental-health/`

## Article 2 — `when-parenthood-feels-heavy`

Very careful, non-judgemental. Sections:
1. When parenthood feels heavier than expected
2. Love and struggle can exist together
3. Anxiety, low mood and feeling overwhelmed
4. Exhaustion and the invisible emotional load
5. Why it can be hard to say you are struggling
6. Who you can speak to
7. Taking the first step towards support (brief safety line: "If you feel unable to keep yourself or your baby safe, seek urgent local help immediately.")

`relatedSlugs`: `feeling-like-yourself-again`, `when-to-ask-for-help-after-birth`, `postnatal-checks-and-appointments`.

Sources (5):
- NHS — Postnatal depression overview · `https://www.nhs.uk/mental-health/conditions/post-natal-depression/overview/`
- NHS — Mental health in pregnancy and after birth · `https://www.nhs.uk/pregnancy/keeping-well/mental-health/`
- Royal College of Psychiatrists — Postnatal depression · `https://www.rcpsych.ac.uk/mental-health/mental-illnesses-and-mental-health-problems/postnatal-depression`
- Mind — Postnatal depression and perinatal mental health · `https://www.mind.org.uk/information-support/types-of-mental-health-problems/postnatal-depression-and-perinatal-mental-health/postnatal-depression/`
- PANDAS Foundation · `https://pandasfoundation.org.uk/`

All URLs pre-verified live: NHS / RCPsych / MMHA / Start for Life / PANDAS / NCT returned 200; Mind returned 403 (WAF bot-block, page real). No invented URLs. Tommy's excluded.

## Verification

1. `tsgo` typecheck.
2. Playwright at 1280×1800 on `/first-year/emotional-wellbeing` and both direct article routes: ready cards clickable, no "Coming soon", no placeholder body, medical review label, sources list, related guidance ready-only.
3. Regression on `/first-year/checkups-and-warning-signs/postnatal-checks-and-appointments`, `/first-year/development/baby-development-in-the-first-year`, `/articles/complete-guide-morning-sickness`, `/toddler`.
4. Report counts (expected total 16, ready 16, draft 0).

## Out of scope

Image mappings (Phase 7.8b), components, routes, topic pages, cards, SEO wiring, Pregnancy / TTC / IVF / Family / Toddler files.
