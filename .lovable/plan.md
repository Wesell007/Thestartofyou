
# Implement first article on the unified deep template (revised)

Build the new unified deep article render path and migrate **only** `early-pregnancy-symptoms-explained` onto it. All other articles continue to use the current render path until individually migrated. The old path is not retired in this pass.

## 1. Routing strategy — per-article opt-in

`ArticlePage.tsx` becomes a thin **switcher**:

```tsx
const NEW_TEMPLATE_SLUGS = new Set<string>([
  "early-pregnancy-symptoms-explained",
]);

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = getArticle(slug ?? "");
  if (!data) return <Navigate to="/explore" replace />;

  if (NEW_TEMPLATE_SLUGS.has(data.slug)) {
    return <ArticleDeepTemplate data={data} />;
  }
  return <ArticleLegacyPage data={data} />;
};
```

- The current `ArticlePage` body (both `isDeep` and short-article branches, all 18 blocks) is moved verbatim into a new file `ArticleLegacyPage.tsx`. No behavioural change for any non-migrated article.
- The new template lives in `ArticleDeepTemplate.tsx`.
- Migration is done by adding a slug to `NEW_TEMPLATE_SLUGS`. Once the catalogue is fully migrated in later passes, the switcher and the legacy page are deleted.

## 2. Data shape additions (`src/data/articleData.ts`)

Additive only — every field optional, no impact on legacy-rendered articles:

```ts
topic?: PregnancyTopicSlug;     // drives breadcrumb + topic return
standfirst?: string;            // one-line dek under H1
hero?: { src: string; alt: string; credit?: string }; // alt REQUIRED when hero set
```

Import `PregnancyTopicSlug` from `pregnancyTopicData`.

## 3. Article migration — `early-pregnancy-symptoms-explained`

- `topic: "body"`
- `standfirst: "What's actually happening in the first weeks — and how to tell the strong signals from the noise."`
- `hero: { src: <imported asset>, alt: "A person sitting quietly at home, hands resting on their lap, in soft natural light." }` — reuse `article-hero-implantation.jpg`.
- Add `editorialSections[]` with **8 H2 sections**, each with an explicit `id` (already required by the existing `EditorialSection` type):

```
01  when-symptoms-start                  → When early pregnancy symptoms usually start
02  earliest-signs-before-missed-period  → The earliest signs before a missed period
03  most-common-early-symptoms           → The most common early symptoms, and what causes them
        ↳ subsections: hCG and progesterone, smell sensitivity,
                       breast and areola changes, fatigue
04  implantation-bleeding                → Implantation bleeding, spotting, and what's normal
05  cramping-and-bloating                → Cramping and bloating in the first weeks
06  vs-pms                               → How early symptoms differ from PMS
07  when-to-test                         → When you can take a home pregnancy test
08  when-to-speak-to-a-doctor            → When to speak with a midwife or doctor
```

Each section: short `lead` (mini quick-answer), 2–4 `paragraphs`, optional H3 `subsections` for §03, max 2 `callout`s across the article.

- Refine `keyTakeaways` to 4 calm statements.
- Keep existing `faq` (4 search-shaped Qs, mild rewording).
- Extend `sources` to 3–4 entries (NHS, Tommy's, NICE).
- Keep `relatedSlugs`; template renders up to 3.

## 4. New components

### `src/components/article/ArticleDeepTemplate.tsx` *(new — the unified render path)*

```tsx
const ArticleDeepTemplate = ({ data }: { data: ArticleData }) => {
  const related = getRelatedArticles(data.slug, 3); // up to 3, never padded
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <ArticleHeader data={data} />
      <ArticleQuickAnswer data={data} variant="calm" />
      <ArticleHeroImage data={data} />
      <ArticleContents data={data} />
      <ArticleTakeaways data={data} />
      {data.editorialSections?.length ? (
        <ArticleEditorialContent sections={data.editorialSections} />
      ) : null}
      <ArticleNormalSignals data={data} />
      <ArticleFAQ data={data} variant="calm" />
      <ArticleSources data={data} />
      {related.length > 0 && (
        <ArticleRelatedReads articles={related} variant="calm" />
      )}
      <ArticleTopicReturn data={data} />
      <Footer />
    </div>
  );
};
```

### `ArticleHeader.tsx` *(new)*
Breadcrumb (`The Pregnancy Map · Your body` when `topic` set), serif H1, italic serif standfirst. Parchment background. No date/byline/read-time/tags/CTA.

### `ArticleHeroImage.tsx` *(new)*
Contained image, `max-w-3xl`, `rounded-xl`, no shadow, no caption strip. 4:3 mobile, 16:9 desktop. Margin rhythm `my-10 sm:my-12 md:my-14`.

**Hero source resolution order:**
1. `data.hero?.src` — explicit per-article hero (alt = `data.hero.alt`, **meaningful, required**)
2. `heroImageMap[data.slug]` — legacy lookup (alt = `data.title`, meaningful)
3. `article-botanical-accent.png` — decorative botanical fallback (`alt=""`, `aria-hidden="true"`)
4. No `<img>` rendered if even (3) fails

Optional muted credit line, 11px sans, right-aligned, only when `data.hero?.credit` set.

### `ArticleContents.tsx` *(new)*
Eyebrow `In this article`. Anchors derived from `editorialSections[].id` — already a required field on `EditorialSection`, no slugification, no `heading.id` assumption. Falls back to a non-anchored list of `data.inThisArticle` strings only when no editorial sections exist (renders as plain labels, no jump behaviour). Two-column on desktop, single on mobile. Each row: `01` numeral + serif label. Quiet container, hairline border, no card shadow, **no sticky bar**. Renders only when 3+ entries exist. Smooth scroll, ~80px offset.

### `ArticleTakeaways.tsx` *(new — calmer restyle of `ArticleKeyTakeaways`)*
Eyebrow `Key takeaways`. 3–5 bullets with left accent rule per item. No boxed sage card, no checkmark icons, no read-time caption.

### `ArticleNormalSignals.tsx` *(new — calmer restyle of `ArticleNormal`)*
Two quiet text columns: `Usually normal` / `Worth a check`. No coloured boxes, no traffic-light icons. Single muted serif-italic disclaimer at the foot.

### `ArticleTopicReturn.tsx` *(new)*
Two centred muted links separated by `·`: `← Your body in pregnancy` (when `topic` set) and `← The Pregnancy Map`. Underline on hover. No buttons, no icons.

## 5. Restyled-for-new-path components (variant prop, not in-place rewrite)

To avoid changing how legacy articles look, three existing components gain a `variant?: "legacy" | "calm"` prop (default `"legacy"`):

- `ArticleQuickAnswer.tsx` — calm: drop the `-mt-*` pull-up. Same content otherwise.
- `ArticleFAQ.tsx` — calm: hairline-bordered rows, no rounded card chrome. Schema injection unchanged.
- `ArticleRelatedReads.tsx` — calm: vertical list, **up to 3, target 3, never padded**, no thumbnails, no card grid, no "Browse all guidance" link, no journey/Guide pills. Each entry: serif title (link) + muted italic one-liner from `metaDescription` (truncated). Renders nothing if 0 matches; renders 1 or 2 if curation honestly yields fewer.

`ArticleSources.tsx` and `ArticleEditorialContent.tsx`: used as-is by both paths.

## 6. Related-reads selection logic

The new path uses `getRelatedArticles(slug, 3)` and treats its result as **up to 3**. If the helper currently pads with weak matches, harden it: prefer `relatedSlugs` (curated) → same `topic` → shared `cornerstoneSlug`, and **stop** rather than pad. Public signature unchanged.

For `early-pregnancy-symptoms-explained`, the curated `relatedSlugs` provide four candidates — three are returned. Result is exactly 3 honest matches.

## 7. What is NOT changed in this pass

- No edits to the 19 legacy article components (`ArticleHero`, `ArticleHowThisFeels`, `ArticleWhatHappening`, `ArticleTiming`, `ArticleRealExperience`, `ArticleInterpretation`, `ArticleNormal`, `ArticleAction`, `ArticleCompare`, `ArticleWhatNext`, `ArticleRelatedStage`, `ArticleAISupport`, `ArticleJourneyCTA`, `ArticleKeyTakeaways`, `ArticleJumpNav`, `ArticleInThisGuide`, `ArticleFullGuide`, `ArticleDeepIntro`, `JournalPromotion`).
- No changes to topic pages, `/pregnancy`, nav, or homepage.
- No deletion of any existing article component or render path.

## 8. Routing

`/articles/:slug` unchanged. The switcher inside `ArticlePage` decides which template renders.

## Returns deliverable (after implementation)

1. **Changed files:** `src/pages/ArticlePage.tsx` (switcher), `src/pages/ArticleLegacyPage.tsx` (extracted), `src/components/article/ArticleDeepTemplate.tsx` + 6 new sibling components, `variant` props added to `ArticleQuickAnswer` / `ArticleFAQ` / `ArticleRelatedReads`, `src/data/articleData.ts` (additive fields + migrated entry).
2. Final article structure used.
3. Final H2 structure (the 8 sections above).
4. Hero added: yes, contained, `article-hero-implantation.jpg`, between Quick Answer and Contents.
5. In this article: derived from `editorialSections[].id` (no manual config).
6. Components retired from this article's render path: the 19 legacy blocks listed above. They continue to render for every other article via the legacy path.
7. Visual review notes.
8. Migration risks: every non-migrated article is unchanged; risk is limited to the one migrated article. Future migrations are slug-add operations into `NEW_TEMPLATE_SLUGS`.
