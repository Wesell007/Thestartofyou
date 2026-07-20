## Phase 9.19 — TTC Topic Structural Polish

Edit only `src/data/ttcTopicData.ts`. No new articles, images, prose, or infrastructure.

### 1. Cycle tracking (`cycle-tracking`, L544–598)

Replace the two current groups with:

- **Tracking your cycle**
  - Ovulation signs (`LIVE.ovulationSigns`)
  - Cervical mucus and fertility (`LIVE.cervicalMucus`)
  - Basal body temperature tracking (`LIVE.basalBodyTemperature`)
  - Using ovulation tests (`LIVE.usingOvulationTests`)
- **When cycles are unclear**
  - Irregular periods and trying to conceive (`LIVE.irregularPeriodsTTC`)
  - Late ovulation and TTC (`LIVE.lateOvulation`)
  - When ovulation is hard to predict (`LIVE.hardToPredictOvulation`)

Removes the duplicated "Practical basics → Ovulation calculator" (already in Start Here). Start Here unchanged.

### 2. Conditions (`conditions`, L779–796)

Append to existing "Knowing when to seek support" group:
- Trying again after miscarriage (`LIVE.tryingAgain`)

No new group. `curationNote` unchanged.

### 3. Male fertility (`male-fertility`, L471–480)

Add a new group above the existing "Tests and next steps":
- **Health and support before pregnancy**
  - Partner health before pregnancy (`LIVE.partnerHealthBeforePregnancy`)
  - Lifestyle before pregnancy (`LIVE.lifestyleBeforePregnancy`)

Second link included so the group isn't a single-item group; both are calm, non-blaming, live articles. "Tests and next steps" kept as-is.

### 4. Pregnancy tests (`pregnancy-tests`, L634–662)

Fold both single-item groups into their nearest neighbours:
- Move "Negative test but no period" into **Reading what you see** (fits its "interpreting unclear results" description). Delete the "When the answer is not clear yet" group.
- Move "Pregnancy after loss" into a renamed **Timing your test → When to test, and when it feels heavy** grouping — actually better fit: fold "Pregnancy after loss" into the existing **Reading what you see** group is thematically wrong. Instead, keep it clean: fold "Pregnancy after loss" as the closing link inside **Reading what you see** with the existing group description broadened slightly to "Interpreting unclear results, ambiguous symptoms, and testing when the moment feels heavy." Delete the "When the result feels heavy" group.

Resulting groups: **Timing your test** (2 links unchanged), **Reading what you see** (5 links: faint positive, evaporation line, implantation bleeding, negative test but no period, pregnancy after loss).

All Phase 9.16 slugs preserved.

### 5. Two week wait (`two-week-wait`, L706–737)

Fold "Looking after yourself in the wait" into **Worries during the wait**:
- New link order in Worries during the wait: two-week-wait symptoms, spotting during the two week wait, coping with the two week wait, early pregnancy symptoms explained.
- Broaden description to "The emotional and physical questions that surface in these days, and how to hold them."

Delete the single-item "Looking after yourself in the wait" group. Other groups unchanged.

### Verification

- `bunx tsgo --noEmit` clean.
- Grep confirms all six Phase 9.16 slugs still surfaced.
- Manual scan: no single-item groups remain (except the intentional single cross-link groups already documented in existing configs, i.e. two-week-wait's "When you're ready to test" cross-link which is retained as an intentional bridge).

### Deliverable summary format

Files inspected, files edited (one file), per-topic result, preservation checks (hub, IVF pathway, parent fields, image maps, Pregnancy, IVF, TTC Journey, SEO), broken link result, tsgo result, and a note that Phase 9.20 article batch remains recommended (age topic gap, thyroid gap, and cycle-tracking "tracking without overthinking" gap are not addressable by polish).