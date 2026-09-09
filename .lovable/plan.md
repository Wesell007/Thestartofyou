# Phase 32A — Priority Pregnancy Health & Safety Gap Remediation (Batch 1)

Scope: exactly three Phase 31 Pregnancy gaps — itching in pregnancy, caesarean birth, gestational diabetes. Evidence and drafts only. No runtime, route, sitemap, SEO, AI, grounding, database or deployment changes. No publication.

## Confirmed Phase 31 backlog records

| Cluster | Working title | Priority | Example keyword | Volume | Closest existing surface | Cannibalisation | Review level |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C019 | Itching in pregnancy | P0 | pregnancy stomach itching | 1,600 | /pregnancy (no owner) | LOW | HEALTH_REVIEW_REQUIRED |
| C036 | Caesarean birth | P0 | c section and | 27,100 | none in any hub | LOW | HEALTH_REVIEW_REQUIRED |
| C037 | Gestational diabetes | P0 | gestational diabetes | 27,100 | test covered inside antenatal-tests article, condition not | MEDIUM | HEALTH_REVIEW_REQUIRED |

All three are genuine NEW_ARTICLE_GAP rows in `phase31-new-content-backlog.csv`, all UK adaptation required, all proposed page type `article`, parent surface `/pregnancy`.

## Publication behaviour finding (decisive)

These three belong in the legacy Pregnancy dataset `src/data/articleData.ts`, served at `/articles/:slug`.

- That dataset has **no status/draft field**.
- `scripts/generate-sitemap.ts` emits `/articles/<slug>` for **every** top-level `slug:` in the file (only an explicit redirect list is excluded).
- `ArticlePage.tsx` renders any record found, with a self-referencing canonical and no noindex.

Therefore adding a record publishes it immediately and indexably. There is **no safe draft state**, and Phase 32A forbids inventing one. So Phase 32A follows the documentation route: drafts live in `docs/`, runtime data is untouched.

## Deliverables (two new documentation files only)

1. `docs/content/phase32a-evidence-pack.md`
   - Per article: search intent · existing Start of You coverage · UK authoritative sources (NHS, NICE, RCOG only, each with title, URL, check date, claims supported) · key factual points · safety/escalation points · claims intentionally excluded · cannibalisation check · recommended structure.
   - Closing sections: evidence conflicts and uncertainties · editorial review requirements · publication recommendation.
   - Written first; drafting only begins once every substantive claim has a named UK source. Any claim without a current, clear UK source is dropped and logged under exclusions, never filled from general knowledge.

2. `docs/content/phase32a-article-drafts.md`
   - Full drafts for the three articles, each with proposed title, slug, description, read-time estimate, topic, body, suggested related guidance (repository-verified routes only), source list, review classification, cannibalisation note, and `PUBLICATION STATUS: NOT PUBLISHED`.
   - Review classification for all three: `AWAITING HUMAN HEALTH/SAFETY REVIEW`. No medically-reviewed claim, no reviewer name.

A short Phase 32B–32F roadmap is recorded inside the evidence pack as documentation only.

## Editorial approach per article

**Itching in pregnancy** — proposed slug `itching-in-pregnancy`. Answers why itching happens, when it is ordinary, comfort measures supported by NHS advice, and a clearly headed "When to speak to your maternity team" section covering intrahepatic cholestasis of pregnancy exactly as UK guidance frames it. No diagnosis, no probabilities, no false reassurance, no "wait and see" where guidance says be assessed.

**Caesarean birth** — proposed slug `caesarean-birth`. Owns the birth-route intent only: what a caesarean is, planned versus unplanned, broadly what happens before, during and after, early recovery expectations, practical preparation, when to seek help after birth, emotional experience without prescribing feelings. Not a surgical manual; deeper postpartum recovery stays a separate Phase 32C intent.

**Gestational diabetes** — proposed slug `gestational-diabetes`. Owns the condition, not the test: what it means, why testing is offered, context on risk factors without turning them into predictions, what happens after diagnosis, monitoring and treatment at a high level, implications for pregnancy and birth, postnatal follow-up, and when to contact the maternity or diabetes team. Explicit note that local trust pathways and thresholds vary. No diet plans, no personalised glucose targets.

All three: British English, UK maternity terminology, calm and non-alarmist, strong human opening, clear answer early, scannable sections, no invented statistics.

## Images

None generated in this phase. The evidence pack records the exact image need per article for a later decision, consistent with existing Pregnancy article conventions.

## Validation

Confirm: backlog records used = 3 · unrelated articles = 0 · application source changes = 0 · runtime article records added = 0 · public articles = 0 · routes, sitemap, SEO, AI, grounding, journal, memory, voice, schema, migrations, deployments = 0 · files changed = exactly the 2 new documentation files. Close with the 30-point return report and stop.
