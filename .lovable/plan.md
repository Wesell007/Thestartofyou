## Phase 10.2b — Preparing for Baby Gap Batch

Publish 5 flagship pregnancy articles into `/pregnancy/preparing-for-baby`, wire in the 5 pre-generated hero images, and place the articles into the existing grouped topic structure.

### Duplicate check (confirmed clean)

Grep against `src/data/articleData.ts` for the 10 exact and near-duplicate slugs returned no matches. Safe to create all 5.

### Assets (already generated in `src/assets/`)

`article-hero-safe-sleep-basics.jpg`, `article-hero-car-seat-basics.jpg`, `article-hero-newborn-essentials.jpg`, `article-hero-preparing-siblings.jpg`, `article-hero-maternity-leave.jpg`.

### Article shape (matches nearby Phase 10.2a articles exactly)

Fields per article: `slug`, `title`, `metaDescription`, `quickAnswer`, `howThisFeels`, `whatHappening { commonCauses, lessCauses, whyItVaries }`, `timing`, `whatItFeelsLike`, `whatThisMeans`, `normal`, `seekSupport`, `disclaimer`, `whatYouCanDo`, `whatHappensNext`, `relatedStage`, `aiPrompts`, `captureIntro`, `trimester`, `relatedSlugs`, `journey: ["pregnancy"]`, `topics: ["preparing"]`, `reviewedBy: "Jenny Joines"`, `lastUpdated: "July 2026"`, `keyTakeaways` (5–6), `sources` (3–5 structured `{label, publisher, url}` — the `ArticleSource` type), `faq` (3 items, field is `faq` not `faqs`), `topic: "preparing-for-baby"`, `standfirst`, `editorialSections` (5–7). UK English. No em dashes. No personalised medical, legal or safety advice. No fear-based framing.

Related-slug pool (verified live): `the-space-your-baby-will-come-home-to`, `preparing-emotionally-for-birth`, `birth-preferences`, `hospital-bag-and-what-to-pack` (verified as the actual live slug), `the-36-week-appointment`, plus the sibling new articles from this batch.

Sources per article (all UK, structured, non-fear-based):
- Safe sleep basics — Lullaby Trust, NHS SIDS reduction, NHS helping baby to sleep.
- Car seat basics — GOV.UK child car seats, Good Egg Safety, NHS getting baby home, RoSPA.
- Baby clothes and newborn essentials — NHS things you'll need, Tommy's, NCT.
- Preparing siblings — NCT, Tommy's, NHS bringing baby home.
- Maternity leave planning — GOV.UK maternity pay & leave, GOV.UK employers, GOV.UK Maternity Allowance, ACAS.

### Files to edit

**1. `src/data/articleData.ts`** — insert the 5 article objects before the closing `];` of `articleDatabase` (line 20227). Full editorial copy already drafted and ready to paste.

**2. `src/data/pregnancyTopicData.ts`** — update only the `"preparing-for-baby"` config (lines 468–540):
- **Getting ready for baby** — append:
  - `{ label: "Baby clothes and newborn essentials", href: "/articles/baby-clothes-and-newborn-essentials" }`
  - `{ label: "Preparing siblings for a new baby", href: "/articles/preparing-siblings-for-a-new-baby" }`
- **Birth planning** — unchanged.
- **Late-pregnancy decisions** — unchanged.
- **Practical safety and planning** — new group appended after Late-pregnancy decisions:
  - description: "The practical decisions that quietly matter around bringing your baby home."
  - links: Safe sleep basics, Car seat basics, Maternity leave planning
- `startHere`, `whatThisCovers`, `showSiblings`, `showAI`, and `topicMapEntries` unchanged.

**3. `src/components/pregnancy/PregnancyTopicPage.tsx`** — add 5 imports after existing pregnancy asset imports:
```ts
import imgSafeSleepBasics from "@/assets/article-hero-safe-sleep-basics.jpg";
import imgCarSeatBasics from "@/assets/article-hero-car-seat-basics.jpg";
import imgNewbornEssentials from "@/assets/article-hero-newborn-essentials.jpg";
import imgPreparingSiblings from "@/assets/article-hero-preparing-siblings.jpg";
import imgMaternityLeave from "@/assets/article-hero-maternity-leave.jpg";
```
Add 5 entries to `HREF_IMAGE_MAP` at the end of the `// Preparing` block:
```ts
"/articles/safe-sleep-basics": imgSafeSleepBasics,
"/articles/car-seat-basics": imgCarSeatBasics,
"/articles/baby-clothes-and-newborn-essentials": imgNewbornEssentials,
"/articles/preparing-siblings-for-a-new-baby": imgPreparingSiblings,
"/articles/maternity-leave-planning": imgMaternityLeave,
```
All Phase 10.1, 10.2a and 10.2a.1 mappings preserved verbatim.

### Verification

- `bunx tsgo --noEmit`.
- Grep each new slug exactly once in `articleData.ts`.
- Confirm `/pregnancy/preparing-for-baby` shows the two new Getting-ready cards and the new Practical safety and planning group with three distinct thumbnails; no adjacent-card image collisions on the page.

### Out of scope

TTC, IVF, First Year, Toddler, Family; routes, sitemap, robots, redirects, SEO infra; calculators; TTC Journey; Pregnancy Map design; any other pregnancy topic config or image mapping.

### Final report

Files inspected/edited, assets used, duplicate check result, slugs/titles created, reviewer/source/image-wiring status, Preparing for baby topic page result, Pregnancy Map / Phase 10.1 / 10.2a / 10.2a.1 / TTC / IVF / SEO preservation notes, dash-rule result, typecheck result, and whether it is safe to proceed to TTC Phase 9.16 or run final Pregnancy QA.
