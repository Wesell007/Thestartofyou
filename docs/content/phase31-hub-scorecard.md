# Phase 31 — Domain Scorecards

Seven domains. Repository existence and public organic coverage are reported separately throughout. Only `LIVE_INDEXABLE` surfaces are treated as organic owners.

Legend for the seven yes/no answers per domain:
Q1 does relevant repository content exist · Q2 is it live and indexable · Q3 is intent coverage complete · Q4 is new content needed · Q5 is improvement of existing content needed · Q6 is any status resolution needed · Q7 are there deliberate skips.

---

## 1. Trying to Conceive

| Measure | Value |
| --- | --- |
| Repository article records | 48 (subset of `articleData.ts`) |
| Live indexable articles | 47 |
| Non-owning records | 1 (`signs-of-ovulation`, redirected to `ovulation-signs`, correctly absent from sitemap) |
| Structured surfaces (live indexable) | 14 (`/trying-to-conceive` + 13 topic/stage pages) |
| Tools (live indexable) | 1 (`/ovulation-calculator`; the duplicate TTC route redirects) |
| Relevant clusters mapped | 11 |
| Covered strong / partial | 5 / 4 |
| New gaps | 2 |
| Skips | 1 |

Strengths: the strongest coverage-to-demand ratio on the site. Ovulation, fertile window, implantation, testing, two-week-wait and condition intents all have live owners plus a matching structured topic page.

Gaps: `hcg levels` (post-test intent, high demand, no owner) and `brown discharge instead of period` (pre-test intent).

Cannibalisation risk: MEDIUM. `ovulation-signs`, `how-to-know-when-you-are-ovulating`, `using-ovulation-tests`, `fertile-window` and `understanding-your-fertile-window` sit close together. The redirect already in place is correct; no further redirects were made in this phase.

Verdict: **TARGETED_TOP_UPS** — Q1 yes · Q2 yes · Q3 no · Q4 yes (2) · Q5 yes · Q6 no · Q7 yes.

---

## 2. Pregnancy

| Measure | Value |
| --- | --- |
| Repository article records | 95 |
| Live indexable articles | 95 |
| Structured surfaces (live indexable) | 52 (hub, 6 topics, 3 trimesters, 42 week pages) |
| Additional live surface | `/preparing-for-baby` (see status note) |
| Tools (live indexable) | 1 (`/due-date-calculator`) |
| Relevant clusters mapped | 43 |
| Covered strong / partial | 14 / 12 |
| New gaps | 11 (+1 tool) |
| Skips | 5 |

Strengths: 42 indexable week pages plus trimester and topic pages give this domain genuine structural ownership of the largest recurring intent in the dataset. Symptom coverage is broad and calm.

Gaps that matter: caesarean birth (no article anywhere), gestational diabetes as a condition, itching in pregnancy (potential obstetric cholestasis — safety-critical), leg cramps, digestive upset, and an explicit weeks-to-months answer on week pages.

Status note: `/preparing-for-baby` resolves, is indexable and is in the sitemap, while the brief states Preparing for Baby is not an active hub. Evidence conflicts, so it is recorded as `UNKNOWN_OR_UNRESOLVED` pending an editorial decision. No change was made.

Cannibalisation risk: MEDIUM. Discharge intent is split across `discharge-in-pregnancy` and `watery-discharge-in-pregnancy`; early-symptom intent across `early-pregnancy-symptoms-explained` and `symptoms-stopping-early-pregnancy`.

Verdict: **TARGETED_TOP_UPS** — Q1 yes · Q2 yes · Q3 no · Q4 yes (11) · Q5 yes · Q6 yes (`/preparing-for-baby`) · Q7 yes.

---

## 3. IVF

| Measure | Value |
| --- | --- |
| Repository article records | 3 |
| Live indexable articles | 3 |
| Structured surfaces (live indexable) | 5 (`/ivf` + 3 phase pages + `/ivf-timeline`) |
| Relevant clusters mapped | 1 |
| Covered strong / partial | 0 / 1 |
| New gaps | 0 from this source |
| Skips | 0 |

The source materially under-represents IVF: the competitor serves it thinly in the UK, so absence of clusters here is evidence about the source, not about demand. The one clear signal is IVF due-date intent, which the existing calculator supports functionally but no explanatory surface owns.

Verdict: **MATERIAL_GAPS**, low confidence — Q1 yes · Q2 yes · Q3 unknown from this source · Q4 not from this evidence · Q5 yes · Q6 no · Q7 no. A dedicated IVF keyword source is needed before committing a backlog.

---

## 4. First Year

| Measure | Value |
| --- | --- |
| Repository article records | 24 (16 hub + 8 legacy) |
| Live indexable articles | 24 |
| Drafts | 0 (the `"draft"` string is a type union, not a record) |
| Structured surfaces (live indexable) | 26 (hub, 4 phases, newborn, 12 month pages, 8 topic pages) |
| Relevant clusters mapped | 21 |
| Covered strong / partial | 2 / 8 |
| New gaps | 11 |
| Skips | 1 |

Strengths: the month and phase architecture is excellent and already indexable; feeding, sleep, development, care and safety topics all have live owners.

Gaps: this is the weakest coverage-to-demand ratio on the site. Teething, colic and evening crying, starting solids and weaning, named sleep regressions, milestone-timing questions, newborn skin, newborn quirks and reflexes, tummy time and common illnesses all lack an owning page while carrying substantial demand.

Cannibalisation risk: MEDIUM for new milestone and sleep pages against month pages. New articles must be depth pages linked from months, not month-page duplicates.

Verdict: **MATERIAL_GAPS** — Q1 yes · Q2 yes · Q3 no · Q4 yes (11) · Q5 yes · Q6 no · Q7 yes.

---

## 5. Postpartum / Recovery (within First Year)

| Measure | Value |
| --- | --- |
| Repository article records | 10 (8 First Year recovery/wellbeing/body/checks articles + 2 legacy) |
| Live indexable articles | 10 |
| Structured surfaces (live indexable) | 4 topic pages under `/first-year` |
| Non-owning surfaces | `/postpartum` (redirect), `/postpartum/legacy` (`LIVE_NOINDEX`), 3 further legacy redirects |
| Relevant clusters mapped | 6 |
| Covered strong / partial | 2 / 2 |
| New gaps | 3 |
| Skips | 0 |

The redirect architecture is correct: the old hub folds into First Year, and the retained legacy page is noindex so it cannot compete. Emotional recovery coverage is strong and distinctive.

Gaps: physical recovery is thinner than emotional recovery. Diastasis recti, perineal care and stitches, and sex after birth have no owner. Lochia and postnatal bleeding red flags need strengthening inside `healing-after-birth`. Pelvic floor content currently lives only in the pregnancy article and is not linked from recovery.

Verdict: **MATERIAL_GAPS** — Q1 yes · Q2 yes · Q3 no · Q4 yes (3) · Q5 yes · Q6 no · Q7 no.

---

## 6. Toddler

| Measure | Value |
| --- | --- |
| Repository article records | 16 |
| Live indexable articles | 16 |
| Structured surfaces (live indexable) | 14 (hub, 8 topics, 5 age bands) |
| Relevant clusters mapped | 3 |
| Covered strong / partial | 1 / 0 |
| New gaps | 0 |
| Skips | 1 |

Toddler is a wider guidance domain, not a saved journey, and the current 16 articles across 8 topics plus 5 age pages cover the intents the source surfaces that fit the brand. Potty training, tantrums, speech, sleep, fussy eating and play all have live owners. The competitor's toddler demand skews to first aid and product content, which is out of scope.

Verdict: **COMPLETE_FOR_CURRENT_STRATEGY** — Q1 yes · Q2 yes · Q3 yes for current strategy · Q4 no · Q5 minor · Q6 no · Q7 yes.

---

## 7. Family

| Measure | Value |
| --- | --- |
| Repository article records | 18 |
| Live indexable articles | 18 |
| Structured surfaces (live indexable) | 7 (hub + 6 topics) |
| Relevant clusters mapped | 4 |
| Covered strong / partial | 0 / 1 |
| New gaps | 0 |
| Skips | 3 |

Family demand in the source is dominated by baby names, birthday and star-sign content, and product guides — all deliberately skipped. The one genuine fit, travelling with a baby, has a live owner that needs UK adaptation (passports and travel rules differ entirely from the US source).

Verdict: **COMPLETE_FOR_CURRENT_STRATEGY** — Q1 yes · Q2 yes · Q3 yes for current strategy · Q4 no · Q5 yes (1) · Q6 no · Q7 yes.
