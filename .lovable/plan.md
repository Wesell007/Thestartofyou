
# Pregnancy Rollout Plan — Locked Benchmark Coverage

Uses the locked What to Expect benchmark subtopics (this pass) as the coverage reference. Each item maps to its previously agreed Start of You label, current state, target destination, and rollout phase. Items already excluded in the prior coverage map (Cord Blood Banking, Birth Stories, Baby Registry, Baby Shower, Gender Reveal, Chinese Gender Predictor, Rib Pain, Twins extras) are intentionally out of scope here.

Naming follows brand rules: "Guidance" not "Articles" in user copy, British English, no em/en dashes. All medical articles get the Jenny Joines trust signal + sources block. Each new article is opted in via `NEW_TEMPLATE_SLUGS` in `ArticlePage.tsx` and authored against the unified deep template.

---

## Coverage matrix (locked benchmark only)

### Your Body
| Benchmark | TSOY label | Current | Target destination | Type | Phase |
|---|---|---|---|---|---|
| Early Signs of Pregnancy | Early pregnancy symptoms explained | Live (deep) | Same | Deep article | Done |
| Pregnancy Symptoms | Symptoms across pregnancy | Covered by `body` topic groups | Same (no mega-article) | Topic-page groups | Done |
| Pregnancy Sleep | Sleep in pregnancy | Missing | `/articles/sleep-in-pregnancy` | Deep article | C |
| Labour & Delivery | Labour and birth | Missing | New group in `body`: signs of labour, stages of labour, when to go in | Topic-page group + 3 deep articles | D |

### Your Baby
| Benchmark | TSOY label | Current | Target destination | Type | Phase |
|---|---|---|---|---|---|
| Fetal Development | How your baby develops | Missing | `/articles/how-your-baby-develops-in-pregnancy` | Deep article | C |
| Your Pregnancy Week by Week | Week by week | Live as bridge | `/pregnancy#week-by-week` via `weekBridge` | Bridge | Done |
| Twins & More | Twins and multiples | Missing | `/articles/twins-and-multiples-in-pregnancy` | Deep article | C |

### Health & Safety
| Benchmark | TSOY label | Current | Target destination | Type | Phase |
|---|---|---|---|---|---|
| Pregnancy Health | Staying well in pregnancy | Topic page not built | `/pregnancy/health-and-safety` landing intro + group lead | Topic-page lead | A |
| Tests & Screenings | Tests and scans | Missing | `/articles/tests-and-scans-in-pregnancy` (cornerstone) + later per-test deeps | Deep article | A |
| How Much Weight to Gain | Weight changes in pregnancy | Missing | `/articles/weight-changes-in-pregnancy` | Deep article | A (tail) |
| Vaccines You Need | Vaccinations in pregnancy | Missing | `/articles/vaccinations-in-pregnancy` | Deep article | A |
| Medications That Are Safe | Medicines in pregnancy | Missing | `/articles/medicines-in-pregnancy` | Deep article | A |

### Diet & Fitness
| Benchmark | TSOY label | Current | Target destination | Type | Phase |
|---|---|---|---|---|---|
| Pregnancy Diet: Best & Worst Foods | Eating well in pregnancy | Missing | `/articles/eating-well-in-pregnancy` (cornerstone) | Deep article | B |
| Pregnancy Fitness | Moving your body in pregnancy | Missing | `/articles/moving-your-body-in-pregnancy` (cornerstone) | Deep article | B |
| Pregnancy Nutrients | Key nutrients in pregnancy | Missing | `/articles/key-nutrients-in-pregnancy` | Deep article | B |
| Healthy Eating During Pregnancy | (merged) | n/a | Folded into "Eating well" | Merge | Done by design |
| Appetite Loss During Pregnancy | When you can't face food | Missing | `/articles/when-you-cant-face-food-in-pregnancy` | Deep article | B |
| Foods to Avoid During Pregnancy | Foods to avoid | Missing | `/articles/foods-to-avoid-in-pregnancy` | Deep article | A (highest intent, pulled forward) |
| Best Exercises for Pregnant Women | (merged) | n/a | Section inside "Moving your body" | Merge | Done by design |
| Exercises to Avoid During Pregnancy | Exercises to avoid | Missing | Anchor section inside "Moving your body" | Section, not standalone | B |

### Preparing for Baby
| Benchmark | TSOY label | Current | Target destination | Type | Phase |
|---|---|---|---|---|---|
| Baby Prep | Getting ready for baby | Topic page not built | `/pregnancy/preparing-for-baby` landing intro | Topic-page lead | C |
| Baby Names | Choosing a name | Missing | `/articles/choosing-a-baby-name` (reflective, not a database) | Deep article (light) | F |
| Setting Up the Nursery | The space your baby will come home to | Missing | `/articles/the-space-your-baby-will-come-home-to` | Deep article | C |

---

## Rollout order (this pass)

**Phase A — Health & Safety topic + highest-intent food article**
1. Build `/pregnancy/health-and-safety` topic landing (mirror `BodyTopic.tsx`); add to `LIVE_TOPIC_SLUGS`.
2. Ship `/articles/foods-to-avoid-in-pregnancy` (pulled into A: highest search intent).
3. Ship `/articles/tests-and-scans-in-pregnancy`.
4. Ship `/articles/vaccinations-in-pregnancy`.
5. Ship `/articles/medicines-in-pregnancy`.
6. Tail: `/articles/weight-changes-in-pregnancy`.

**Phase B — Diet & Exercise topic**
1. Build `/pregnancy/diet-and-exercise` landing; add to `LIVE_TOPIC_SLUGS`.
2. Ship `/articles/eating-well-in-pregnancy`.
3. Ship `/articles/moving-your-body-in-pregnancy` (includes "Exercises to avoid" as a section).
4. Ship `/articles/key-nutrients-in-pregnancy`.
5. Ship `/articles/when-you-cant-face-food-in-pregnancy`.

**Phase C — Baby topic gaps + Sleep + Preparing landing**
1. Ship `/articles/how-your-baby-develops-in-pregnancy` (linked from `baby` topic).
2. Ship `/articles/twins-and-multiples-in-pregnancy`.
3. Ship `/articles/sleep-in-pregnancy` (linked from `body` topic).
4. Build `/pregnancy/preparing-for-baby` landing.
5. Ship `/articles/the-space-your-baby-will-come-home-to`.

**Phase D — Labour & Birth cluster (Body topic)**
1. Add new group "Labour and birth" to `body` topic config.
2. Ship `/articles/signs-of-labour`.
3. Ship `/articles/stages-of-labour`.
4. Ship `/articles/when-to-go-in-for-labour`.

**Phase F — Long tail**
1. Ship `/articles/choosing-a-baby-name`.

---

## Coverage check vs locked benchmark
- Your Body: 4/4 covered (1 live, 1 via groups, 2 planned).
- Your Baby: 3/3 covered (1 live bridge, 2 planned).
- Health & Safety: 5/5 covered (all planned in Phase A).
- Diet & Fitness: 8/8 reconciled (4 deep articles, 1 section, 2 explicit merges, 1 tail).
- Preparing for Baby: 3/3 covered (1 topic landing, 2 articles).

After Phase D the locked benchmark is fully matched on coverage; remaining work is depth (per-test deep articles under Tests and scans) and the Feelings topic, both out of scope for this benchmark pass.

---

## Technical notes
- New articles: extend `ArticleData` entries in `src/data/articleData.ts` with `topic`, `standfirst`, `hero`, `editorialSections`; opt in via `NEW_TEMPLATE_SLUGS` in `src/pages/ArticlePage.tsx`. Legacy articles untouched.
- New topic landings: add a wrapper in `src/pages/pregnancy/<Topic>.tsx` mirroring `BodyTopic.tsx`, populate the config in `pregnancyTopicData.ts`, and add the slug to `LIVE_TOPIC_SLUGS` only after at least one real article exists in its groups.
- Topic-page group links must point to live articles only — never to unbuilt slugs.
- Each medical deep article: include sources, FAQ, Normal Signals where relevant, and the Jenny Joines trust signal.
- Related Reads stays capped at 3, curated, after the Topic Return block.
