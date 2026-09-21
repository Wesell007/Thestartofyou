# Phase 37A — First Year hub, phase and topic UX, visual system and AI separation

Refine the public First Year experience only. Preserve all existing content, routes, month data, lifecycle rules, source governance and AI infrastructure. Create no new articles, guidance records, routes or saved journey types. Do not deploy.

## Verified repository baseline

- Public hub: `/first-year`.
- Canonical phase pages: **4**, all sharing `FirstYearPhasePage`.
- Month destinations: **13** from Newborn through 12 months, all sharing `FirstYearMonthPage`.
- Canonical topic pages: **8**, all sharing `FirstYearTopicPage`: **4 baby** and **4 postpartum**.
- Public First Year article records: **26**, all currently ready and all represented in the article image map.
- Hub Companion: **1** embedded module, currently placed before phases, months, topics and common questions.
- Topic Start Here: **24 cards**, all currently lack editorial destinations and therefore fall back to AI.
- Hub question AI actions: **6**.
- Phase question AI actions: **20** across four pages.
- Phase faux guidance AI cards: **12** across four pages.
- Current phase pages have no single dedicated Companion handoff. Topic pages already have one each after the article library.
- Current hub journey CTA uses a separate First Year entry resolver and appears in both the hero and final section. The shared public account resolver already provides the required five-state, four-destination behaviour.
- Current image surfaces include one hub video, four phase heroes, eight topic heroes, 24 topic feature-card placements, 26 article heroes and 37 article body-image placements. High-visibility reuse is present, including `firstyear-stage-0-3.jpg` on a phase, the Feeding topic and article imagery.
- The current hub composition omits the existing two-pathway component, places Companion too early, combines phase and month navigation in one component, and ends with both a four-card continuation section and another multi-action CTA.

## 1. Visual direction gate

Before replacing any production image, generate `src/assets/first-year-direction-board.png` with Nano Banana using the current hub, baby-topic and postpartum-topic screenshots as context.

The board will establish one editorial collection across:

- hub hero
- baby and postpartum pathway treatments
- early and later phase imagery
- baby and postpartum topic imagery
- article hero and occasional body-image treatments
- desktop, tablet and mobile crop guidance

Direction: intimate, warm, lived-in UK home photography; soft blue, sage and warm neutral for baby; muted plum, blush and warm neutral for postpartum; cream paper foundation; natural interaction and sensitive recovery representation. Reject staged perfection, unsafe anatomy or positioning, generic still life, excessive blur, oversaturated warmth and clinical stock.

The board is a direction artefact only. It will not render in the product.

## 2. Evidence-led image audit and replacement

Create a complete placement-level audit covering the hub, four phases, eight topics, all 26 article heroes and all 37 configured body images. Classify every reviewed placement as:

- KEEP
- RECROP
- REPLACE_WITH_EXISTING_APPROVED_ASSET
- REPLACE_WITH_NANO_BANANA_ASSET

Record route, surface, current asset, issue, replacement intent, final asset and reason. Keep strong imagery. Generate only the minimum coherent replacement set after the direction board is approved by the implementation gate.

Apply distinct, relevant hero imagery to every phase and topic. Reconcile article hero and body imagery so no high-visibility phase, topic or article hero repeats accidentally. Remove body images that add no contextual or emotional value rather than forcing replacements. Document any intentional reuse separately.

## 3. Recompose the First Year hub

Implement the locked order:

1. Hero
2. Compact orientation
3. Two image-backed primary pathways
4. Four lightweight phase chapters
5. Separate 13-destination month map
6. Four baby and four postpartum topic pathways
7. Six editorial common questions with no direct AI actions
8. One embedded Companion
9. Quiet cross-stage continuation, including Toddler as next-stage discovery
10. One lifecycle-aware final journey action

Preserve “Their first year, and your postpartum recovery.” Remove the journey CTA from the hero so its two editorial pathways are the only competing actions there. Reuse the shared public account resolver for the final action and verify signed out, TTC, Pregnancy, First Year and signed-in-without-lifecycle states. No journey writes.

Reduce chips, nested cards, oversized containers and unexplained vertical gaps. Keep baby and postpartum equal in visual weight. Separate four-phase orientation from the detailed month map so their roles are unambiguous.

## 4. Make all topic discovery editorial

Refine the shared topic template for all eight canonical topics:

```text
Breadcrumb
Split editorial hero
Compact topic orientation
Where parents tend to start
Grouped related guidance
One contextual Companion
Quiet sibling navigation
Return to First Year
```

For each of the 24 current Start Here intents, map only to a genuinely matching existing article, topic, month or phase destination. Where no honest destination exists, remove that card and allow topic counts to vary. Eliminate the optional-href AI fallback entirely.

Keep a few strong image-backed Start Here cards, then render the complete existing topic library as compact grouped rows. Deduplicate destinations within rendered groups and add no fake View All links or arbitrary caps. Preserve all valid article destinations.

## 5. Tighten all four phase pages

Keep the existing dual baby and recovery content, safety support and source treatment, but establish this order:

```text
Breadcrumb and hero
Phase orientation and month links
Baby changes and recovery or adjustment
What this stage can feel like
What feels hard and what can help
Who to turn to and safety support
Editorial common questions
Relevant real guidance
One contextual Companion
Related First Year topics
Sources
Quiet continuation
```

Remove all 20 per-question Companion actions. Keep the 15 existing article links and retain answers without links where no article exists.

Audit the 12 “Ask for guidance shaped to this phase” cards against the 26 existing articles. Convert only genuine matches to editorial links; remove unmatched faux-editorial cards. Add exactly one contextual Companion handoff per phase after editorial discovery and before continuation.

## 6. Preserve article and trust behaviour

Do not redesign the article template or alter source rendering, source records, reviewer claims, grounding eligibility or article copy. Limit article changes to the audited image map: unique and relevant heroes, useful body imagery only, accurate alt text and appropriate crops.

If source presentation conflicts with locked governance during QA, record it without changing global source behaviour.

## 7. Tests and validation

Add focused Phase 37A regression coverage for:

- locked hub hierarchy and one late embedded Companion
- four phase and all 13 month destinations
- two primary pathways, four baby topics and four postpartum topics
- editorial-only Start Here destinations, with zero `/ask` or hidden AI fallbacks
- zero article-looking AI cards and zero phase per-question AI actions
- exactly one contextual Companion on each of eight topic and four phase pages
- no duplicate destination within a rendered group and no fake View All links
- high-visibility hero-image uniqueness
- five lifecycle states, four final destinations, zero incorrect routes and zero writes
- preserved First Year to Toddler transition
- unchanged route and month architecture
- no TTC or Pregnancy regression

Perform browser QA at 1280, 834 and 390 pixels across the hub, four phases and eight topics. Check crop quality, hierarchy, month navigation, grouped libraries, Companion placement, source panels, sibling navigation, focus visibility, touch targets, reduced motion, image loading, console errors and horizontal overflow.

Run focused tests, the full suite, typecheck twice, lint against the established baseline and a production validation build. Do not publish.

## 8. Evidence and closure

Create:

- `docs/content/phase37a-first-year-visual-direction.md`
- `docs/content/phase37a-first-year-hub-phase-topic-ux.md`
- `docs/content/phase37a-first-year-destination-audit.md`
- `docs/content/phase37a-first-year-responsive-evidence.md`

Append Phase 37A to `roadmap.md` without rewriting locked TTC or Pregnancy history. Reconcile the completion report from the final repository and browser evidence, including every requested image, destination, Companion, AI-separation, responsive and validation count.

Close only if all gates pass as:

**PHASE 37A — FIRST YEAR HUB, PHASE & TOPIC UX, VISUAL SYSTEM AND AI SEPARATION — CLOSED PASS / FIRST YEAR PUBLIC EXPERIENCE REFINED / VISUAL SYSTEM ALIGNED / NO NEW CONTENT**

Do not begin the finished-experience visual review or the First Year content coverage audit automatically.
