# Phase 37A — First Year UX, visual system and AI separation

Execute the public First Year refinement only. Preserve existing editorial content, routes, month architecture, lifecycle rules, sources, reviewers, grounding and AI infrastructure. Do not change TTC or Pregnancy. Do not deploy.

## Verified baseline and accounting

- Hub: `/first-year`.
- `FirstYearPhasePage` consumers: **4** canonical phase pages.
- `FirstYearTopicPage` consumers: **8** canonical topic pages, split into 4 Baby and 4 Postpartum topics.
- Month destinations: **13**, from Newborn through 12 months, using the unchanged month page system.
- Ready First Year article records: **26**.
- Existing image placements: **99** = 4 phase heroes + 8 topic heroes + 24 topic feature cards + 26 article heroes + 37 article body images.
- Hub video: **1**, audited separately from the 99 image placements.
- Topic Start Here AI fallbacks: **24**.
- Phase faux-guidance AI cards: **12**.
- Phase common-question AI actions: **20**, alongside 15 existing genuine article links.
- Hub question AI actions: **6**.
- The global floating Companion launcher is platform chrome and is excluded from embedded Companion counts.

## 1. Hard visual gate

Before any production image replacement, generate `src/assets/first-year-direction-board.png` with Nano Banana inside Lovable. The board will demonstrate the hub, both pathways, early and later phases, Baby and Postpartum topics, article hero and occasional body-image treatments, plus mobile crop direction.

Assess and document the board against:

- warm, lived-in UK-home feeling
- editorial rather than stock photography
- distinct Baby and Postpartum identities within the cream-paper system
- believable interaction, realistic anatomy and age-appropriate babies
- sensitive, non-glamorised postpartum representation
- viable desktop, tablet and mobile crops
- no unsafe or misleading infant-care situations
- safer-sleep consistency
- credible hands, positioning and equipment in feeding scenes
- no distress exploitation, clinical stock, excessive blur or oversaturated warmth

The board is direction only and will never render in the product. Production replacement work starts only after this internal gate passes. The completion evidence must state: `Nano Banana board created before production replacements = YES`.

## 2. Audit and reconcile all visual placements

Audit **99 / 99** existing image placements at placement level and audit the hub video separately. Every original image placement receives one disposition:

- KEEP
- RECROP
- REPLACE_WITH_EXISTING_APPROVED_ASSET
- REPLACE_WITH_NANO_BANANA_ASSET
- REMOVE_AS_UNNECESSARY, for body images only
- REMOVED_WITH_DISCOVERY_CARD, for topic feature imagery whose unmatched Start Here card is removed

Record route, surface, current asset, issue, replacement intent, final asset and reason. The disposition arithmetic must reconcile exactly: KEEP + RECROP + REPLACE_WITH_EXISTING_APPROVED_ASSET + REPLACE_WITH_NANO_BANANA_ASSET + REMOVE_AS_UNNECESSARY + REMOVED_WITH_DISCOVERY_CARD = 99. Keep strong existing imagery and generate only the minimum coherent replacement set.

Track any new Baby and Postpartum pathway images separately as `NEW PRESENTATION PLACEMENTS`, never inside the original 99 denominator.

Audit hero-level reuse across the hub or pathways, 4 phases, 8 topics and 26 article heroes. Eliminate accidental high-visibility duplication. Document each intentional reuse with both surfaces and its editorial reason. Do not force asset uniqueness or generate unnecessary replacements.

Article changes are imagery only. Article titles, descriptions, body copy, routes, statuses, sources, reviewers, related-guidance logic and grounding state remain unchanged.

## 3. Recompose the hub in the locked order

1. Hero
2. Compact orientation
3. Baby and Postpartum primary pathways
4. Four lightweight phase chapters
5. Separate 13-destination month map
6. Four Baby and four Postpartum topic pathways
7. Six editorial common questions
8. One embedded Companion
9. Quiet cross-stage continuation
10. One lifecycle-aware final journey action

Preserve “Their first year, and your postpartum recovery.” Keep Baby and Postpartum equal in visual weight. Reduce nested cards, repeated chips, duplicate navigation, oversized framing and unexplained gaps.

Remove the journey CTA from the hero. Do not move Companion above editorial discovery and do not retain or create a competing ending.

Use the shared read-only public account resolver for exactly five states:

- signed out → `/start-your-journey`
- TTC → `/my-ttc-journey`
- Pregnancy → `/my-week`
- First Year → `/my-first-year`
- signed in without active lifecycle → `/start-your-journey`

Expected: 5 states, 4 unique destinations, 0 incorrect routes and 0 journey writes.

## 4. Convert Topic Start Here to honest editorial discovery

Refine the shared topic template for all eight consumers:

```text
Breadcrumb
Split editorial hero
Compact orientation
Where parents tend to start
Grouped related guidance
One contextual Companion
Quiet sibling navigation
Return to First Year
```

Reconcile every existing Start Here card:

- starting cards: **24**
- mapped to a genuine existing article, topic, month or phase destination: **X**
- removed because no honest destination exists: **Y**
- each removed card carrying imagery receives `REMOVED_WITH_DISCOVERY_CARD` in the 99-placement audit
- required: **X + Y = 24**
- AI fallback, `/ask` and hidden model-call destinations after: **0**

Use existing route and content records as the only URL authority. Presentation metadata may describe a destination kind but must not become another URL registry. Topic card counts may vary. Never create content merely to preserve a three-card layout.

Keep a few strong image-backed Start Here cards, then show the complete existing topic library as compact grouped rows. Deduplicate destinations inside each rendered group. Add no fake View All links or arbitrary caps.

## 5. Refine the four shared phase pages

Use this order for all four existing consumers:

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

Preserve all questions and answers. Remove all **20** per-question AI actions. Retain each of the **15** current article links only where its destination remains valid.

Reconcile every faux-guidance card:

- starting cards: **12**
- converted to a genuine existing editorial destination: **X**
- removed because no honest destination exists: **Y**
- required: **X + Y = 12**
- faux-editorial AI cards after: **0**

Add exactly one contextual Companion after editorial discovery on each phase page. Final embedded counts are 1 hub module, 8 of 8 topic handoffs and 4 of 4 phase handoffs. Duplicate AI execution runtimes and AI runtime changes remain zero.

## 6. Contain shared-template and month-page impact

Before implementation, confirm the shared consumer counts remain 4 phase and 8 topic pages. Keep `FirstYearMonthPage`, month data, route behaviour, source behaviour and month-specific discovery untouched.

Required outcome:

- month destinations retained: **13**
- month data changes: **0**
- month route changes: **0**
- unintended month-page presentation changes: **0**
- unintended out-of-scope shared-template changes: **0**

## 7. Tests and responsive verification

Add focused Phase 37A regression coverage for:

- locked hub hierarchy and one late embedded Companion
- 4 phase and 13 month destinations
- two primary pathways, 4 Baby topics and 4 Postpartum topics
- exact 24-card and 12-card AI-to-editorial reconciliation
- zero hub and phase question AI actions
- one contextual Companion on every topic and phase page
- no duplicate destination within a rendered group and no fake View All links
- hero reuse audit and zero accidental high-visibility duplication
- five lifecycle states, four destinations and zero writes
- preserved First Year to Toddler transition
- 4 phase and 8 topic template consumers
- unchanged article copy, routes, source records, reviewers and grounding state
- no month-system, TTC or Pregnancy regression

Inspect the hub, all four phases and all eight topics at 1280, 834 and 390 pixels. Check crops, hierarchy, month navigation, grouped guidance, Companion placement, source panels, sibling navigation, focus visibility, touch targets, reduced motion, image loading, console errors and horizontal overflow.

Run focused tests, the full suite, typecheck twice, lint against the established baseline and a production validation build. Do not publish.

## 8. Evidence, roadmap and closure

Create:

- `docs/content/phase37a-first-year-visual-direction.md`
- `docs/content/phase37a-first-year-hub-phase-topic-ux.md`
- `docs/content/phase37a-first-year-destination-audit.md`
- `docs/content/phase37a-first-year-responsive-evidence.md`

Append the Phase 37A task and final outcome to `roadmap.md` without rewriting locked TTC or Pregnancy records.

The completion report will reconcile every requested denominator, including:

- existing image placements audited out of 99
- hub video audit
- new pathway placements
- keep, recrop, existing replacement, Nano Banana replacement, body-image removal and removed-with-card totals
- intentional hero reuse
- 24 topic Start Here dispositions
- 12 phase faux-guidance dispositions
- hub and phase question AI-action counts
- phase and topic template consumer counts
- month-page impact
- zero article copy and source-record changes
- no duplicate route source of truth
- all hard-boundary counts

Close only when every gate passes as:

**PHASE 37A — FIRST YEAR HUB, PHASE & TOPIC UX, VISUAL SYSTEM AND AI SEPARATION — CLOSED PASS / FIRST YEAR PUBLIC EXPERIENCE REFINED / VISUAL SYSTEM ALIGNED / NO NEW CONTENT**

Do not begin the finished-experience visual review or First Year content-coverage audit automatically.
