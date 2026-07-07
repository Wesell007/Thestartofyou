## Phase 7.10 — First Year SEO Layer (execution)

Add per-route SEO with the shared `SeoHead` helper, mirroring the Family pattern exactly. `HelmetProvider` is already mounted in `src/main.tsx`, so no provider work is needed.

### Files to edit (10)

1. `src/pages/FirstYear.tsx` — hub
2. `src/pages/firstyear/Feeding.tsx`
3. `src/pages/firstyear/Sleep.tsx`
4. `src/pages/firstyear/Development.tsx`
5. `src/pages/firstyear/CareAndSafety.tsx`
6. `src/pages/firstyear/PostpartumRecovery.tsx`
7. `src/pages/firstyear/EmotionalWellbeing.tsx`
8. `src/pages/firstyear/BodyAndHormones.tsx`
9. `src/pages/firstyear/CheckupsAndWarningSigns.tsx`
10. `src/pages/firstyear/FirstYearArticle.tsx`

### Hub

Wrap the existing return in a fragment; prepend:

```tsx
<SeoHead
  title="First Year Baby Guide | Feeding, Sleep, Development & Recovery"
  description="Calm, practical guidance for your baby's first year, from feeding and sleep to development, care, postnatal recovery and emotional wellbeing."
  canonical="https://thestartofyou.com/first-year"
/>
```

`ogType` defaults to `"website"`.

### Topic wrappers (8)

Convert each 1-liner to render `<><SeoHead ... />{renderFirstYearTopic("<slug>")}</>` using these exact strings and canonicals:

- Feeding — `Baby Feeding in the First Year | The Start of You` / `Gentle first-year feeding guidance covering newborn rhythms, bottle and breastfeeding questions, feeding worries and when to ask for support.` / `.../first-year/feeding`
- Sleep — `Baby Sleep in the First Year | The Start of You` / `Calm guidance on newborn sleep, settling, sleep expectations and the changing rhythm of rest through your baby's first year.` / `.../first-year/sleep`
- Development — `Baby Development in the First Year | The Start of You` / `A reassuring guide to baby development, milestones, movement, play and what to do when progress feels uneven.` / `.../first-year/development`
- Care and Safety — `Baby Care and Safety in the First Year | The Start of You` / `Practical first-year guidance on safe sleep, everyday baby care, home safety and knowing when to ask for advice.` / `.../first-year/care-and-safety`
- Postpartum Recovery — `Postpartum Recovery After Birth | The Start of You` / `Supportive guidance for healing after birth, physical recovery, rest, changing symptoms and the early postnatal weeks.` / `.../first-year/postpartum-recovery`
- Emotional Wellbeing — `Emotional Wellbeing After Birth | The Start of You` / `Gentle support for the emotional side of the first year, including feeling changed, overwhelmed or unsure when to ask for help.` / `.../first-year/emotional-wellbeing`
- Body and Hormones — `Body and Hormones After Birth | The Start of You` / `Calm guidance on postpartum body changes, hormones, sweating, hair loss and the physical shifts that can follow birth.` / `.../first-year/body-and-hormones`
- Checkups and Warning Signs — `Postnatal Checks and When to Ask for Help | The Start of You` / `A calm guide to early postnatal checks, health visitor support, baby reviews and knowing when to ask for help after birth.` / `.../first-year/checkups-and-warning-signs`

`ogType` defaults to `website`.

### Article page

Mirror `pages/family/FamilyArticle.tsx` exactly:

```tsx
const canonical = `https://thestartofyou.com/first-year/${article.topic}/${article.slug}`;
const title = article.seoTitle || `${article.title} | The Start of You`;
const description = article.seoDescription || article.description;

const jsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description,
  mainEntityOfPage: canonical,
  url: canonical,
  publisher: {
    "@type": "Organization",
    name: "The Start of You",
    url: "https://thestartofyou.com",
  },
};
if (article.sources && article.sources.length > 0) {
  jsonLd.citation = article.sources.map((s) => s.url);
}
```

Render `<SeoHead ... ogType="article" jsonLd={jsonLd} />` above `<FirstYearArticlePage />`.

### Guarantees

- Canonical + og:url self-reference every route.
- No `datePublished`, no `dateModified`, no `author`, no reviewer schema.
- Article JSON-LD on article pages only; hub + topics carry no JSON-LD.
- `citation` only when `article.sources` exists (all 16 do).
- British English; no em dashes in any new SEO string.

### Verification

1. `bunx tsgo --noEmit`.
2. Playwright at 1280×1800 for hub, all 8 topics, and 5 sample articles (`/first-year/sleep/newborn-sleep-expectations`, `/first-year/feeding/newborn-feeding-rhythms`, `/first-year/development/baby-development-in-the-first-year`, `/first-year/checkups-and-warning-signs/when-to-ask-for-help-after-birth`, `/first-year/emotional-wellbeing/when-parenthood-feels-heavy`) — extract `document.title`, meta description, canonical, og:*, and JSON-LD; assert Article schema only on article routes and no forbidden fields.
3. Regression at 1280×1800 on `/family`, `/toddler`, `/pregnancy`, `/trying-to-conceive`, `/ivf`, `/articles/complete-guide-morning-sickness` (200 + no NotFound). Pre-existing `/family` and `/toddler` broken images noted only.

### Out of scope

Article copy, sources, images, cards, article/topic layout, routes, phase-page SEO, and Pregnancy / TTC / IVF / Family / Toddler files.