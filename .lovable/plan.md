# WC-3e — Final Navigation / IA Corrections

Three small IA corrections only. No WC-4 work, no navbar/footer/sitemap/robots/companion changes.

## 1. Redirect the superseded TTC legacy route

`src/App.tsx` line 243 currently renders the old hub:

```
<Route path="/trying-to-conceive/legacy" element={<TTC />} />
```

Replace the element with the repository's established redirect pattern:

```
<Route path="/trying-to-conceive/legacy" element={<Navigate to="/trying-to-conceive" replace />} />
```

The legacy page never renders. If the lazy `TTC` import becomes unused after this, remove only that now-dead import line. `/postpartum/legacy`, `/journal-start` and `/prototype/memory-settings` stay exactly as they are.

## 2. /preparing-for-baby preflight (already-surfaced finding)

Confirmed from current code before any edit:

- `/preparing-for-baby` is a distinct, live public route (`src/pages/PreparingForBaby.tsx`) with its own SEO title, description and self-canonical, and unique orientation content (essentials, what can wait, reflection, capture).
- It is distinct from the Pregnancy topic route `/pregnancy/preparing-for-baby`, which is a topic index built from `pregnancyTopicData`.
- The Pregnancy Preparing pathway **already links to it twice** in `src/data/pregnancyTopicData.ts`: as the first "Start here" entry ("Preparing for baby: complete guide", `/preparing-for-baby`) and again in the "Getting ready for baby" group.

Because contextual discovery from the Pregnancy Preparing pathway already exists, adding another link would duplicate the route in multiple places, which the brief forbids. Planned action: **no code change** for this subtask; verify the two existing links render and resolve at desktop and mobile, and report the preflight result rather than inventing a third entry point.

## 3. Quiet homepage companion discovery

The homepage (`src/pages/Index.tsx`) renders: NewHeroSection, ValueProofSection, JourneyBrandedSection, JourneyPreviewSection, LifecycleEcosystemSection, JournalMoment. None currently links to `/ask` (the existing `/ask` line lives in `CTASection`, which is not mounted on the homepage).

Chosen placement: inside the existing `JournalMoment` section (guidance → keepsake → companion), directly below the existing "Explore the journal" link, using the same typography and colour tokens already in that block — one small text line, no new section, no card, no icon-only control.

Copy, in the site's tone:

> Need something more personal? **Ask your companion**

with "Ask your companion" as the `<Link to="/ask">` text, styled with the existing muted/sage underline pattern already used elsewhere on the site so it reads as secondary to the journal CTA. Keyboard accessible by default with existing focus-visible styling; no icon-only meaning. No companion name, no query string, no companion state or behaviour change.

## Boundaries held

Unchanged: navbar, footer, `SeoHead`, `Breadcrumbs.tsx`, `BreadcrumbJsonLd.tsx`, `buildBreadcrumbJsonLd`, `scripts/generate-sitemap.ts`, robots, `/ask` SEO, companion launcher/panel/prompts/`ai-search`, `src/lib/grounding/*`, WC-2 assets, legacy article metadata debt.

## Verification

- `/trying-to-conceive/legacy` lands on `/trying-to-conceive`, no loop, no legacy render.
- Pregnancy Preparing pathway links resolve to `/preparing-for-baby`.
- Homepage companion link resolves to `/ask`.
- Desktop 1280px and mobile 390x844 check of homepage, Pregnancy Preparing pathway, and the redirect.
- `npm test`, `npm run lint`, `npm run typecheck`, `npm run build` against the 716-test / 1-error / 10-warning baseline.

Then the 41-point completion report, and a WC-3e / WC-3 closure verdict. WC-4 not started.
