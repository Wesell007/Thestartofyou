
# Phase 11.7 — First Year Phase Page Depth Upgrade

Depth and trust polish across the four First Year phase pages. Visual system stays. We deepen content in the existing data file, upgrade Common Questions to the newer article-link + Ask CTA format, and add a References block. No new routes, no new articles, no new images.

## Confirmed by reads

- Routes: `/first-year/0-3-months`, `/first-year/3-6-months`, `/first-year/6-9-months`, `/first-year/9-12-months`, all rendering `FirstYearPhasePage` with a `PhaseConfig` from `src/data/firstYearPhaseData.ts`.
- Page composition today: `PhaseHero` → `InPhaseAges` → `PairedSection` (baby + parent cards) → `CommonQuestions` (plain q+a) → `FeaturedGuidance` (routes to `/ask?q=...`) → `RelatedTopics` → `Endcap`. Hero and card system are the parts to preserve verbatim.
- First Year articles live at `/first-year/:topic/:slug`. Verified live slugs available for linking (topic in parentheses):
  - feeding: `newborn-feeding-rhythms`, `bottle-and-breastfeeding-questions`
  - sleep: `newborn-sleep-expectations`, `helping-your-baby-settle`
  - development: `baby-development-in-the-first-year`, `when-milestones-feel-uneven`
  - care-and-safety: `baby-care-basics`, `safe-sleep-and-home-safety`
  - postpartum-recovery: `healing-after-birth`, `what-recovery-can-feel-like`
  - emotional-wellbeing: `feeling-like-yourself-again`, `when-parenthood-feels-heavy`
  - body-and-hormones: `body-changes-after-birth`, `hormones-sweat-and-hair-loss`
  - checkups-and-warning-signs: `postnatal-checks-and-appointments`, `when-to-ask-for-help-after-birth`
- Existing `commonQuestions` entries have `q` + `a` only. The Ask CTA pattern used across the site is `/ask?stage=first-year&phase=<slug>&topic=<slugified-question>`.
- `firstYearArticleData.ts` shows only these 16 live First Year slugs — everything else must be Ask-only.
- No em/en dashes present in new copy; existing intros for `0–3` etc use en dashes only in the `ageRange` label, which is preserved unchanged (existing content, not new copy).

## Deliverables

### Data upgrade — `src/data/firstYearPhaseData.ts`

Extend `PhaseConfig` with four optional fields, all typed and rendered only if present so nothing else has to change:

```ts
type PhaseArticleLink = { label: string; href: string };
type PhaseQuestion = {
  q: string;
  a: string;
  readMore?: PhaseArticleLink;   // live slug only, or omitted
  askTopic?: string;              // slug for /ask?...&topic=
};
type PhaseFeelsHard = { label: string; body: string };
type PhaseWhatHelps = { label: string; body: string };
type PhaseSupport = { label: string; body: string; when?: string };
type PhaseSource = { label: string; publisher: string; href: string };

type PhaseConfig = {
  // existing fields unchanged
  editorial?: string;              // "What this phase is really about"
  feelsHard?: PhaseFeelsHard[];    // "What often feels hard"
  whatHelps?: PhaseWhatHelps[];    // "What can help"
  support?: PhaseSupport[];        // "When to ask for support"
  sources?: PhaseSource[];         // "References and guidance"
};
```

For each of the four phases:

1. Add a warm 2–3 sentence `editorial` beat aligned with the phase's emotional truth (survival/healing → rhythm → curiosity/separation → independence/identity shift).
2. Deepen `babyChanges` and `parentRecovery` copy where thin, keeping the existing `label` + `body` shape and card layout intact. Extend `parentRecovery` on later phases to cover identity, partner/family support and return-to-work where relevant, without changing card count wildly (max 5 bullets per card to preserve spacing).
3. Upgrade every `commonQuestions[]` entry with an `askTopic` slug, and add `readMore` only where a verified live slug from the list above genuinely answers the question. Questions with no fitting article stay Ask-only — no placeholders.
4. Add `feelsHard[]` (4–5 items) and `whatHelps[]` (4–5 items) per phase using calm, non-prescriptive wording.
5. Add `support[]` (3–4 items) per phase signposting health visitor, GP, midwife (0–3 only where relevant), feeding support, 111/999 for urgent symptoms. Uses `label` + `body` (+ optional `when`).
6. Add `sources[]` (3–5 items) per phase from the trusted UK allow-list only: NHS baby/toddler and postnatal hubs, UNICEF Baby Friendly (feeding phases), Lullaby Trust (sleep-relevant phases), Tommy's postnatal mental health, NCT parent support, NICE PH37/NG194 antenatal-postnatal where relevant. Hub URLs only, no fabricated deep links.

All new copy: UK English, no em/en dashes, no diagnosis language, no milestone pressure, no personalised medical advice. Existing prose is preserved.

### Component upgrade — `src/components/firstyear/phase/FirstYearPhasePage.tsx`

Preserve `PhaseHero`, `InPhaseAges`, `PairedSection`, `FeaturedGuidance`, `RelatedTopics`, and `Endcap` exactly. Changes:

1. **New `PhaseEditorial`** — a slim editorial paragraph section rendered under `PairedSection` when `config.editorial` is present. Uses existing `SectionLabel` ("What this phase can feel like"), serif h2, single narrow column. Matches spacing of the existing sections.
2. **New `WhatFeelsHard` and `WhatHelps`** — a two-column bullet layout matching the existing paired card language but rendered as one softer parchment section (or two stacked sections on mobile). Reuses the `stage-firstyear-soft` and `stage-recovery-soft` tints already in the file so no new tokens.
3. **New `WhenToAskForSupport`** — a compact list styled like `CommonQuestions` (label + short body, quiet rule between). No fear-based colour, uses existing border tokens.
4. **`CommonQuestions` upgraded** — signature accepts the extended `PhaseQuestion[]`. Each row keeps the existing q + short answer, and gains a small CTA row underneath:
   - "Read: <label>" pill link to `readMore.href` when present (styled like the existing `stage-firstyear-accent` accent used in `FeaturedGuidance`).
   - "Ask about this" pill link to `/ask?stage=first-year&phase=<slug>&topic=<askTopic || slugify(q)>`, styled as a bordered card pill.
   - No `href="#"` anywhere. If no `readMore`, only the Ask CTA renders.
5. **New `PhaseSources`** — modelled on the existing `WeekSources` pattern used on pregnancy week pages: numbered list, publisher + label, external links with `target="_blank"` and `rel="noopener noreferrer nofollow"`, plus a calm disclaimer sentence: "This guide is general information. Always speak to your health visitor, GP or midwife if you are worried about you or your baby." Rendered only when `sources` is present.
6. **Section order** inside `FirstYearPhasePage` becomes:

```text
PhaseHero
InPhaseAges
PairedSection
PhaseEditorial          (new, if editorial present)
WhatFeelsHard + WhatHelps (new, if arrays present)
WhenToAskForSupport     (new, if support present)
CommonQuestions         (upgraded)
FeaturedGuidance        (unchanged)
RelatedTopics           (unchanged)
PhaseSources            (new, if sources present)
Endcap                  (unchanged)
```

All new sections use the existing `bg-parchment` rhythm, `SectionLabel`, `QuietRule`, `stage-firstyear-*` and `stage-recovery-*` tokens, and the same container widths, so the visual system stays intact.

### Preserve

Untouched: First Year hub (`/first-year`) including the "Twelve months, four phases" section (`FYPhaseNav`), routes, SEO, sitemap, robots, redirects, article data, article routes, TTC, Pregnancy (including week pages from Phase 11.6), IVF, Toddler, Family, calculators, Journey logic, auth logic, database schema, RLS.

### Content guardrails

UK English, calm signposting to health visitor / GP / midwife / 111 / 999, no em or en dashes in new copy, no diagnosis language, no personalised medical advice, no milestone pressure, no certainty language around development.

### Verification

- `bunx tsgo --noEmit` must pass.
- Manual load: `/first-year/0-3-months`, `/first-year/3-6-months`, `/first-year/6-9-months`, `/first-year/9-12-months`.
- Confirm: hero and paired cards render identically; new editorial, feels-hard, what-helps, support, and sources sections appear; Common Questions show Read links (where present) and Ask CTAs; every Read link resolves to a live `/first-year/:topic/:slug` article; every Ask CTA hits `/ask?stage=first-year&phase=...&topic=...`; no `href="#"` anywhere on the phase pages; new copy contains zero em or en dashes.
- Regression: `/first-year`, First Year topic pages, First Year articles, pregnancy week pages, TTC hub, IVF hub, Toddler hub, Family hub, calculators all still render.

### Deliverable summary at end

Files inspected, files edited, per-phase result for 0–3 / 3–6 / 6–9 / 9–12, Common Questions result, article-link result, Ask AI result, references result, content-safety result, visual-preservation result, placeholder-link result, preservation of TTC / Pregnancy / IVF / Toddler / Family / sitemap / robots / redirects / SEO, `bunx tsgo --noEmit` result, and whether First Year phase pages are ready for final launch sign off.
