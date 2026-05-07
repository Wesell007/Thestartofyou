# Phase L — TTC architecture, topic pages, subtopic pages

A single connected pass that turns the TTC area into a true parent → topic → subtopic → article system, mirroring the quality of the pregnancy ecosystem without redesigning anything outside TTC. Incorporates the six tightening notes from approval.

---

## 1. Tightening notes — how each is honoured

1. **Hub stays the parent surface.** Topic and subtopic pages each link back to `/trying-to-conceive` via a "Back to TTC" rail and a "Continue exploring TTC" siblings band. Topic heroes use the eyebrow `The TTC Guide · {topic}` to keep the hub framing visible. The hub itself keeps every existing section and gains a refined library; nothing on the hub is removed.
2. **"Conditions" → "Conditions that can affect TTC"** as the user-facing title everywhere (cards, hero H1, breadcrumb). Route remains `/trying-to-conceive/conditions` (clean URL, clearer label).
3. **"Pregnancy Tests & Early Signs" → "Pregnancy testing in TTC"** as the user-facing title, with subtitle "When to test, what early signs can mean, and how to read a result". Route remains `/trying-to-conceive/pregnancy-tests`. This keeps it firmly TTC-framed (about *testing while trying*), not confirmed-pregnancy content.
4. **TTC-led re-homing.** Re-homed articles appear in TTC `startHere` slots (top of the page) and in their primary cluster's first position. In `pregnancyTopicData.ts`, the same articles are demoted to a single soft "Bridge from TTC" link rather than appearing in multiple pregnancy clusters. URLs do not change. The ownership signal is "TTC first, pregnancy aware".
5. **No hollow pages.** I audited `articleData.ts`. Only nine existing slugs are TTC-relevant: `implantation-bleeding`, `symptoms-stopping-early-pregnancy`, `early-pregnancy-symptoms-explained`, `signs-of-ovulation`, `two-week-wait`, `trying-to-conceive-explained`, `ivf-timeline-what-to-expect`, `emotional-impact-of-ivf`, `pregnancy-after-loss`. Topic and subtopic pages will only feature live links to these plus existing live routes (`/ivf`, `/ivf-timeline`, `/trying-to-conceive/ovulation-calculator`, `/ask`, the hub itself). Pillars that would otherwise be thin (Male Fertility, Age & Fertility, Preconception Health) are curated tightly with one or two strong groups, an AI bridge, and an honest "more guidance is on the way" note rather than padded with dead links.
6. **Imagery flag.** Existing TTC-specific images are limited to: `ttc-journey.jpg`, `ttc-stage-cycle.jpg`, `ttc-stage-timing.jpg`, `ttc-stage-waiting.jpg`, `guidance-ttc.jpg`, `week1-cycle.jpg`, `week2-ovulation.jpg`, `week3-fertilisation.jpg`. These cover Ovulation, Cycle Tracking, Two-Week Wait, Fertility, and the hub well. **IVF & Treatment, Male Fertility, Age & Fertility, Preconception Health, Conditions, and Pregnancy Testing have no bespoke TTC imagery yet** — they will reuse parchment-toned pregnancy assets and will be **explicitly flagged in the completion summary as needing a follow-up TTC image pass**. No new images are generated in this phase.

---

## 2. Final TTC information architecture

```text
/trying-to-conceive                                 (Hub — parent surface)
│
├── Pillars (full topic pages)
│   ├── /trying-to-conceive/ovulation
│   ├── /trying-to-conceive/preconception-health
│   ├── /trying-to-conceive/fertility
│   ├── /trying-to-conceive/ivf-and-treatment
│   ├── /trying-to-conceive/male-fertility
│   └── /trying-to-conceive/age-and-fertility
│
└── Supporting subtopics (subtopic pages, lighter template)
    ├── /trying-to-conceive/cycle-tracking            (parent: Ovulation)
    ├── /trying-to-conceive/pregnancy-tests           (parent: Fertility)  → "Pregnancy testing in TTC"
    ├── /trying-to-conceive/two-week-wait             (parent: Fertility)
    └── /trying-to-conceive/conditions                (parent: Fertility)  → "Conditions that can affect TTC"
```

---

## 3. Article re-homing (pregnancy → TTC)

URLs unchanged. Surfacing logic only.

| Article URL | Was surfaced in | Now TTC-primary in | Pregnancy retains |
|---|---|---|---|
| `/articles/implantation-bleeding` | Pregnancy/Body — "The first signs" | TTC/Pregnancy testing — startHere + "Reading the signs" | Single soft cross-link from Body |
| `/articles/early-pregnancy-symptoms-explained` | Pregnancy/Body — startHere + "First signs" | TTC/Pregnancy testing — startHere | Kept once in Body (legitimate dual relevance) |
| `/articles/symptoms-stopping-early-pregnancy` | Pregnancy/Body — "First signs" | TTC/Two-week wait — "Worries during the wait" | Removed from Body cluster, single bridge link |
| `/articles/signs-of-ovulation` | (TTC legacy only) | TTC/Ovulation — startHere | n/a |
| `/articles/two-week-wait` | (TTC legacy only) | TTC/Two-week wait — startHere | n/a |
| `/articles/trying-to-conceive-explained` | (TTC legacy only) | TTC/Hub + Fertility startHere | n/a |
| `/articles/pregnancy-after-loss` | Pregnancy/Feelings | TTC/Two-week wait — "After a difficult cycle" | Kept in Feelings (still pregnancy-relevant) |
| `/articles/ivf-timeline-what-to-expect`, `/articles/emotional-impact-of-ivf`, `/ivf`, `/ivf-timeline` | IVF area | TTC/IVF & Treatment — startHere + groups | IVF page untouched |

---

## 4. Files

**New data**
- `src/data/ttcTopicData.ts` — replaced with a richer schema mirroring `pregnancyTopicData.ts`: `slug`, `kind: "pillar" | "subtopic"`, `parent?`, `eyebrow`, `title`, `intro`, `whatThisCovers { lead, bullets }`, `startHere[]`, `groups[]`, `relatedTopics[]`, `aiPrompts[]`. The hub's existing `ttcTopics` shape is preserved (or wrapped) so `TTCHub.tsx` keeps working without any breaking changes — exported as a derived constant from the new schema.

**New templates**
- `src/components/ttc/TTCTopicPage.tsx` — pillar template (hero, what-this-covers card, start-here trio, grouped clusters, sibling pillar row, AI bridge, back-to-hub rail). Same visual rhythm as `PregnancyTopicPage.tsx`, themed with `--stage-ttc` / `--stage-ttc-accent` tokens plus a per-topic accent override.
- `src/components/ttc/TTCSubtopicPage.tsx` — slimmer editorial template (breadcrumb back to parent pillar + hub, smaller hero, what-this-covers, start-here trio, two grouped clusters, "continue in {parent pillar}" + sibling-subtopics footer).

**New pages (thin wrappers)**
- `src/pages/ttc/Ovulation.tsx`
- `src/pages/ttc/PreconceptionHealth.tsx`
- `src/pages/ttc/Fertility.tsx`
- `src/pages/ttc/IVFAndTreatment.tsx`
- `src/pages/ttc/MaleFertility.tsx`
- `src/pages/ttc/AgeAndFertility.tsx`
- `src/pages/ttc/CycleTracking.tsx`
- `src/pages/ttc/PregnancyTests.tsx`
- `src/pages/ttc/TwoWeekWait.tsx`
- `src/pages/ttc/Conditions.tsx`

**Edited**
- `src/App.tsx` — register the 10 new routes under `/trying-to-conceive/*`. Existing routes (`/trying-to-conceive`, `/trying-to-conceive/ovulation-calculator`, `/trying-to-conceive/legacy`, `/ovulation-calculator`) untouched.
- `src/pages/TTCHub.tsx` — `TopicLibrary` section split into two bands:
  - **"Core TTC topics"** — 6 pillar cards, current premium card style (halo + icon tile + Explore topic CTA).
  - **"Supporting guides"** — 4 subtopic cards, smaller height, lighter background, no halo, icon + label + one-line intro + arrow.
  - Card labels updated for "Pregnancy testing in TTC" and "Conditions that can affect TTC". Section ordering and every other hub section preserved.
- `src/data/pregnancyTopicData.ts` — minimal trim:
  - Body topic: `symptoms-stopping-early-pregnancy` removed from "The first signs" cluster (kept as a single bridge link in a new "From the TTC guide" mini-line under the cluster). `implantation-bleeding` left in place but moved out of "First signs" into the bridge line so TTC owns it.
  - No other changes to pregnancy data.

**Not touched** (scope guard)
Pregnancy hub, week pages, trimester pages, article templates, homepage, nav, footer, IVF page, ovulation calculator, due-date pages, support, postpartum, first year, preparing for baby.

---

## 5. Topic-page section logic (pillars)

1. **Hero** — eyebrow `The TTC Guide · {topic}`, serif H1, calm standfirst, rounded square image with sage halo + botanical sprig.
2. **What this topic covers** — overlapping card, checklist with sage/terracotta accent.
3. **Start here** — 3 curated editorial cards (image + title + "why this") drawn only from live URLs.
4. **Grouped clusters** — 1–3 labelled groups, only with live links. Pillars with thin live content (Male Fertility, Age & Fertility, Preconception Health) get a single curated group + AI bridge + honest "more guidance coming" line.
5. **Sibling row** — chips linking the other 5 pillars.
6. **AI bridge** — `AISearchBar` with topic-specific prompt chips.
7. **Back to TTC rail** — quiet `← Back to the TTC Guide` link.

Per-topic accent palette:
- Ovulation — sage `140 22% 42%`
- Preconception Health — warm parchment `26 38% 52%`
- Fertility — muted terracotta `16 38% 52%`
- IVF & Treatment — slate-sage `200 22% 44%`
- Male Fertility — deep sage `150 18% 38%`
- Age & Fertility — muted mauve `342 28% 52%`

---

## 6. Subtopic-page section logic

1. **Breadcrumb** — `TTC › {parent pillar} › {subtopic}`.
2. **Hero** — softer, single-column on tablet, smaller image.
3. **What this topic covers** — short bullet card.
4. **Start here** — trio of best entry articles (live links only).
5. **Two grouped clusters** — typically "Practical basics" + "Worries and what to do next".
6. **Continue exploring** — CTA back to parent pillar + the other 3 subtopics as quiet chips.
7. **Back to TTC hub** rail.

Subtopic-specific titling:
- `cycle-tracking` → "Cycle tracking"
- `pregnancy-tests` → **"Pregnancy testing in TTC"**
- `two-week-wait` → "The two-week wait"
- `conditions` → **"Conditions that can affect TTC"**

---

## 7. Hub refinement

Order preserved: Hero → What this hub covers → AI Support → **Core TTC topics (6)** → **Supporting guides (4)** → Journey Timeline → Tool CTA → Reassurance.

The "View all topics" anchor still scrolls to the library. Card descriptions slightly tightened and supporting-guides band has a softer header ("Supporting guides — narrower routes that complement the core topics").

---

## 8. Imagery direction

Reuse only. Per-topic hero choices:
- Ovulation — `week2-ovulation.jpg` ✓ TTC-specific
- Cycle tracking — `ttc-stage-cycle.jpg` ✓ TTC-specific
- Two-week wait — `ttc-stage-waiting.jpg` ✓ TTC-specific
- Fertility — `ttc-journey.jpg` ✓ TTC-specific
- Preconception health — `topic-diet-hero.jpg` ⚠ generic, **flagged**
- IVF & treatment — `topic-health-hero.jpg` ⚠ generic, **flagged**
- Male fertility — `topic-body-hero.jpg` ⚠ generic, **flagged**
- Age & fertility — `topic-feelings-hero.jpg` ⚠ generic, **flagged**
- Pregnancy testing in TTC — `article-hero-implantation-bleeding.jpg` ⚠ borderline, **flagged**
- Conditions that can affect TTC — `topic-health-hero.jpg` ⚠ generic, **flagged**

Flagged items will be listed at the end of the build summary as a follow-up TTC image pass.

---

## 9. Responsive behaviour

- **Mobile (≤640px)**: hero stacks (image first), single-column clusters, full-width tappable cards, sibling row scrolls horizontally.
- **Tablet (641–1024px)**: 2-column grouped clusters, 2-col supporting-guides band, hero stays 2-col but tighter.
- **Desktop (≥1025px)**: 3-col start-here, 2-col grouped clusters, generous editorial spacing.

---

## 10. Deliverable

Final summary will list: changed files, IA tree, re-homed articles, topic-page structure, subtopic-page structure, hub section order, breakpoint notes, imagery follow-up flags, and confirmation that no out-of-scope systems were touched.
