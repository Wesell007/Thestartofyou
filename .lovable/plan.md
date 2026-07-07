## Phase 5.10 — Family trust and references layer

Add optional source rendering to the shared hub article view, then attach verified UK references to the four Family articles that warrant them. No changes to Pregnancy Flagship, TTC, IVF, First Year or Toddler data. No medical review added to lifestyle articles.

### Files edited
- `src/components/shared/HubArticleView.tsx` — extend `HubArticleViewArticle` with an optional `sources` field and render a "Sources and references" section between the article body/takeaways and the `relatedSlot`.
- `src/data/familyArticleData.ts` — add optional `sources` field to the `FamilyArticle` interface (mirrors the hub type) and populate it on the four articles below **after per-URL live verification**.

No other files touched.

### URL verification protocol (run in build mode before writing)
For every candidate URL:
1. `curl -sIL -A "Mozilla/5.0" <url>` to follow redirects and check the final status.
2. If the final response is not 200, or the final URL is on a different host or points at unrelated content, **do not add it**. Log it as a gap in the return summary.
3. If a candidate fails verification and a clearly equivalent official page on the same publisher can be found (e.g. NHS reorganised the page), verify and use that instead. Otherwise omit and flag.
4. No made-up URLs, no low-trust hosts, no forums or blogs.

Publishers used: NHS, GOV.UK, RoSPA, Child Accident Prevention Trust, NSPCC, Family Lives, MoneyHelper. Year only added where the page shows a visible reviewed/updated/published year.

### Type + rendering changes in `HubArticleView.tsx`
Add to `HubArticleViewArticle`:

```ts
sources?: {
  label: string;
  publisher: string;
  url: string;
  year?: string;
}[];
```

Render logic:
- Only render when `article.sources && article.sources.length > 0`.
- Placement: new section inserted immediately before the existing `relatedSlot` block (line ~478) and after the article footer/medical-review area.
- Uses existing hub tokens (`accent`, `accentBorderStrong`, `deep`, `deepSoft`, `deepMuted`) for a calm premium panel matching the rest of the article.
- Content: `SectionLabel` "Sources and references", short heading "Where this guidance draws from", then an ordered list. Each row is `<a href={url} target="_blank" rel="noopener noreferrer nofollow">{label}</a>` followed by " — {publisher}" and " ({year})" when present. Subtle `ExternalLink` icon (lucide) after the link.
- No changes to the existing `medicallyReviewed` / `reviewedBy` block.

### `FamilyArticle` interface change
Add matching optional `sources` field on `FamilyArticle` in `src/data/familyArticleData.ts`. `withFamilyDefaults` already spreads `...article`, so the field passes through. `FamilyArticlePage` already forwards the whole article to `HubArticleView`, no change needed.

### Candidate sources (all subject to live verification)

**1. `making-your-home-safer` (health-safety) — target 3–4 sources**
- Baby and toddler safety — NHS — `https://www.nhs.uk/baby/babys-development/safety/baby-and-toddler-safety/`
- Home safety — RoSPA — `https://www.rospa.com/home-safety`
- Preventing accidents to children — Child Accident Prevention Trust — `https://capt.org.uk/preventing-accidents/`
- Fire safety in the home — GOV.UK — `https://www.gov.uk/government/publications/fire-safety-in-the-home`

**2. `when-to-ask-for-help` (health-safety) — target 3–4 sources**
- Where to get mental health help — NHS — `https://www.nhs.uk/mental-health/children-and-young-adults/help-for-parents/`
- Support for parents and carers — NSPCC — `https://www.nspcc.org.uk/keeping-children-safe/support-for-parents/`
- Parent support — Family Lives — `https://www.familylives.org.uk/advice/your-family`
- Report child abuse to your local council — GOV.UK — `https://www.gov.uk/report-child-abuse-to-local-council`

The GOV.UK link is listed **only as a reference** for where official local support can be found. The article body will not gain any procedural safeguarding instructions, legal thresholds, or emergency numbers. Existing broad wording ("If you are worried… ask for medical advice from the appropriate local service") stays as-is.

**3. `family-sick-days-at-home` (health-safety) — target 3 sources**
- Looking after a sick child — NHS — `https://www.nhs.uk/conditions/baby/health/looking-after-a-sick-child/`
- NHS 111 online — NHS — `https://111.nhs.uk/`
- Fever in children — NHS — `https://www.nhs.uk/conditions/fever-in-children/`

No new treatment, dose, or threshold copy added to article body.

**4. `managing-childcare-costs` (family-basics) — target 2–3 sources**
- Help paying for childcare — GOV.UK — `https://www.gov.uk/help-with-childcare-costs`
- Tax-Free Childcare — GOV.UK — `https://www.gov.uk/tax-free-childcare`
- Childcare costs — MoneyHelper — `https://www.moneyhelper.org.uk/en/family-and-care/becoming-a-parent/childcare-costs`

No specific amounts or eligibility claims added to article copy.

Any URL failing verification is omitted and flagged; if a topic drops below its target count, that gap is reported rather than back-filled with a weak source.

### Articles intentionally left unsourced
Lifestyle guidance without a clear evidence anchor: `building-family-routines`, `building-family-traditions`, `screen-time-as-a-family`, `simple-family-play-ideas`, `planning-family-days-out`, `staying-connected-as-parents`, `setting-boundaries-with-grandparents`, `preparing-for-another-baby`, `helping-your-child-adjust-to-a-new-sibling`, `second-time-parenting`, `sharing-the-mental-load`, `calmer-evenings-after-busy-days`, `travelling-with-young-children`, `making-car-journeys-calmer`.

### Medical review
Existing `medicallyReviewed` / `reviewedBy` on Family articles preserved untouched. No new medical review badges anywhere.

### Guardrails
No edits to Pregnancy Flagship components/data, TTC/IVF/First Year/Toddler data, `articleData.ts`, routes, SEO, product, About, AI logic, saved-journey logic, design tokens, or `.lovable/plan.md`. No new articles, topics, `/family/community-support`, emergency numbers, or legal/financial/clinical/safeguarding instructions.

### Verification
- `tsgo`
- Load `/family/health-safety/making-your-home-safer`, `/family/health-safety/when-to-ask-for-help`, `/family/health-safety/family-sick-days-at-home`, `/family/family-basics/managing-childcare-costs` — confirm sources render, links carry `target="_blank"` and `rel="noopener noreferrer nofollow"`.
- Load `/family/play-connection/simple-family-play-ideas` and confirm no empty sources section.
- Regression: `/articles/complete-guide-morning-sickness`, one First Year hub article, one Toddler hub article.
- Mobile at 375px.
