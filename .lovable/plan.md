# Phase 4.11 — Pregnancy Cornerstone Rewrite 5

Upgrade the existing `anxiety-in-pregnancy` object in `src/data/articleData.ts` (lines 6219–6390) to the full Flagship shape. Single-object rewrite in place. Slug, route, position unchanged.

## Only file edited

- `src/data/articleData.ts`

No other files touched. No template, route, topic-data, SEO, calculator, product, About, AI, saved-journey, design-token, `articleInventory.ts`, `ArticleSources.tsx`, or `.lovable/plan.md` changes. No new files.

## Current state (audit)

Already present: `slug`, `title`, `metaDescription`, `quickAnswer`, `topic: "feelings"`, `reviewedBy: "Jenny Joines"`, `lastUpdated`, `standfirst`, 7 `editorialSections`, 5 `keyTakeaways`, 4 `faq`, 3 `sources`, `relatedSlugs`, plus all legacy fields.

Gaps to close for full Flagship parity: missing `inThisArticle`; 5 takeaways → 6; 7 sections → 8; 4 FAQs → 8; 3 sources → 5; refresh `lastUpdated`; expand `relatedSlugs`.

## Edits (in place on the existing object)

- **`title`** → "Anxiety in pregnancy"
- **`metaDescription`** → "A calm guide to anxiety in pregnancy, including common signs, why it can happen, what may help, and when to ask for support."
- **`standfirst`** → warm one-paragraph rewrite per prompt; British English; no em dashes.
- **`quickAnswer`** → 90–130 words: anxiety in a wanted pregnancy; possible drivers (hormones, uncertainty, previous loss, fertility treatment, health worries, birth fears, money, relationships, past experiences); emotional and physical; support routes (midwife, GP, perinatal mental health team, NHS Talking Therapies, therapist, trusted person); safety line for urgent help without phone numbers.
- **`reviewedBy`** kept as `"Jenny Joines"`.
- **`lastUpdated`** → `"May 2026"`.
- **`topic`** kept as `"feelings"`.
- **`inThisArticle`** (new, 8 items): matching the 8 section headings.
- **`keyTakeaways`** (expand to 6): common and affects thoughts + body; a wanted pregnancy can still feel frightening; previous loss/fertility treatment/health worries can intensify anxiety; daily supports help but are not a substitute for professional care; speak to midwife or GP before things feel severe; seek urgent help if unsafe / unable to cope / worried about harming self or baby.
- **`editorialSections`** (rewrite to 8, existing shape):
  1. `what-anxiety-can-feel-like`
  2. `why-anxiety-can-happen`
  3. `physical-signs` — with a careful callout that new/severe/worrying physical symptoms can have other causes in pregnancy and should be checked.
  4. `after-loss-or-treatment`
  5. `what-may-help-day-to-day` — callout noting these do not replace professional care.
  6. `talking-to-midwife-or-gp`
  7. `when-to-seek-urgent-support` — callout copy: "If you feel unsafe, unable to cope, or worried you might harm yourself or your baby, seek urgent help." No phone numbers, no protocol.
  8. `what-happens-next` — describe likely support pathways; no advice to start/stop/change medication.
- **`faq`** (rewrite to 8, short and medically careful): common in pregnancy; even if wanted; what it feels like; telling midwife; sleep and physical symptoms; pregnant after loss/IVF; unable to cope; treatment/therapy in pregnancy.
- **`sources`** (5 verified UK entries, structured `{ label, publisher, url, year? }`). Verification rule: only URLs and page titles that actually resolve on the publisher's site. If a candidate page has moved, use the closest live equivalent and label it with the publisher's own current title — no invented titles.
  Candidate set (all currently reachable):
  - NHS — "Anxiety in pregnancy" (existing entry, verified live: `nhs.uk/pregnancy/keeping-well/mental-health/`-linked anxiety page). If the exact page title/URL cannot be re-verified at implementation time, substitute the parent NHS page "Mental health in pregnancy" using its published title and current URL.
  - NHS — "Mental health in pregnancy" (parent hub, `nhs.uk`) as a second NHS entry, only added if it resolves live and only labelled with NHS's own current title. If it doesn't, drop the second NHS entry rather than invent one.
  - Tommy's — "Anxiety and panic attacks in pregnancy" (existing entry, verified).
  - Royal College of Psychiatrists — "Mental health in pregnancy" (existing entry, verified).
  - Mind — "Perinatal mental health" using Mind's current page title. If Mind's specific perinatal page cannot be verified, use their broader "Postnatal depression and perinatal mental health" page labelled exactly as Mind titles it.
  No invented URLs, no invented titles, no `year` unless the source publishes one.
- **`relatedSlugs`** → `["emotional-wellbeing-pregnancy", "pregnancy-after-loss", "the-first-trimester-emotionally", "when-the-joy-doesnt-arrive-yet", "first-trimester-complete-guide"]`. All confirmed to exist in `articleData.ts`.

Legacy fields (`howThisFeels`, `whatHappening`, `timing`, `whatItFeelsLike`, `whatThisMeans`, `normal`, `seekSupport`, `disclaimer`, `whatYouCanDo`, `whatHappensNext`, `relatedStage`, `aiPrompts`, `captureIntro`, `trimester`, `journey`, `topics`) preserved with at most light tone touch-ups. No field removed.

## Tone and safety

British English, no em dashes, no American spelling, calm and practical, short paragraphs. Non-diagnostic. No dramatic language, no sales copy, no medication start/stop/change advice, no hotline numbers, no crisis protocols. Never imply breathing / journalling / rest / lifestyle changes replace professional care for serious symptoms.

## Rendering trigger

`quickAnswer` + non-empty `editorialSections` + non-empty `keyTakeaways` all present, so `/articles/anxiety-in-pregnancy` continues to render through `ArticleFlagshipTemplate`. Medically reviewed badge appears once (hero); duplicate At-a-glance badge was removed globally in Phase 4.1.

## No relinking

`pregnancyTopicData.ts` untouched. Feelings → "Emotional wellbeing" group keeps `emotional-wellbeing-pregnancy` as its anchor.

## Verification

- `tsgo` typecheck.
- Load `/articles/anxiety-in-pregnancy` → Flagship render; single medically reviewed badge; 8 sections; 6 takeaways; 8 FAQs; 5 verified structured sources; standfirst; quick answer.
- Spot-check `/pregnancy/feelings` and `/articles/emotional-wellbeing-pregnancy` → unchanged, no accidental relinking or regression.
