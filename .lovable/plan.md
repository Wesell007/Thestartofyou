# WC-3a — Shared Breadcrumb Foundation (implementation slice)

Foundation only. No production page consumes the new component in this slice.

## Files created

1. `src/lib/seo/breadcrumbs.ts`
2. `src/components/shared/Breadcrumbs.tsx`
3. `src/lib/seo/breadcrumbs.test.ts`
4. `src/components/shared/Breadcrumbs.test.tsx`

Files modified: none. `SeoHead`, `App.tsx`, sitemap, robots, navbar, footer, homepage, `/ask`, all existing breadcrumb consumers, companion and grounding stay untouched.

## Data contract

```ts
export type BreadcrumbItem = { label: string; href: string };
```

Every item, including the current page, carries its canonical internal href. The component renders the final item as non-clickable; the helper still emits its absolute URL. Nothing reads `window.location`.

## `src/lib/seo/breadcrumbs.ts`

- `SITE_ORIGIN = "https://thestartofyou.com"` — audit confirmed the only other definition is `BASE_URL` in `scripts/generate-sitemap.ts`, a Node build script outside the app bundle and not importable from `src/`. The new constant is kept local to this SEO utility; no wider SEO refactor.
- `toAbsoluteUrl(href)` — trims, passes through already-absolute `http(s)` URLs unchanged, otherwise normalises leading slashes so `/`, `pregnancy`, `//pregnancy/body` all join without duplicate slashes.
- `buildBreadcrumbJsonLd(items)` — returns `{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [...] }` with `@type: "ListItem"`, `position` starting at 1 in visible order, `name` from `label`, `item` absolute.

No `@graph` merging and no `SeoHead` wiring — that is WC-3d.

## `src/components/shared/Breadcrumbs.tsx`

API: `{ items, tone?: "article" | "section", className?, colors? }`, default export. `colors` is an optional `{ base, link, current }` inline-colour escape hatch so WC-3b can reproduce the stage-palette crumbs that currently use inline styles.

Two tones only, reproducing what already ships:

- `article` — `text-[11px] font-light tracking-[0.12em] uppercase text-muted-foreground/70`, `gap-2`, `·` separator, `hover:text-sage`.
- `section` — `text-[12.5px] font-light`, `gap-1.5`, `ChevronRight` (13px) separator, `hover:underline underline-offset-4`.

Markup: `<nav aria-label="Breadcrumb"><ol class="flex … flex-wrap"><li>…</li></ol></nav>`. Earlier items are React Router `Link`s; the final item is a `<span aria-current="page">` and never self-links. Separators are `aria-hidden="true"` decorative spans, so `·` and `›` are never announced. Empty `items` renders `null`; a single item renders just the current-page span.

Mobile: keeps `flex-wrap`, existing compact spacing and no horizontal overflow; long current-page labels wrap via `break-words` with the full accessible name intact. Links get `py-1` vertical padding for WCAG 2.2 target spacing without inflating the design; no 44px minimum is imposed. Focus uses existing focus-visible conventions only — no WC-7 work.

No new colours, type scale, spacing tokens or animation. `src/components/ui/breadcrumb.tsx` stays unused; only one application-level breadcrumb abstraction is introduced.

## Tests

Component: nav `aria-label`, `<ol>` present, earlier items are links, final item is not a link, final item has `aria-current="page"`, separators hidden from assistive technology, single-item safety, empty-input safety, both tones render. Behavioural assertions, no full-markup snapshots.

Helper: `@context`, `@type`, positions start at 1, order matches visible order, labels preserved, relative paths become absolute production URLs, `/` → `https://thestartofyou.com/`, nested joins, current page included, no double slashes, already-absolute URLs not double-prefixed, and one shared array feeding both component and helper.

## Guardrails recorded, not implemented

- `/articles/:slug` parents must be resolved from authoritative article data in WC-3c — the corpus spans Pregnancy, TTC and IVF, so no pathname assumptions.
- `/ask` sitemap/indexation is NOT approved in WC-3; only a possible quiet homepage discovery point later.
- `/journal-start` stays hidden/noindex; its product fate remains carry-forward.
- WC-2 closed-pass state and all its carry-forward backlog items untouched.
- Grounding untouched: `30B-source-routing-v1`, 0 candidates, 0 approvals, empty eligible list, Phase 30K parked at Stage 2.

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. Lint baseline expected unchanged (1 pre-existing `prefer-const` error, 10 react-refresh warnings); no unrelated findings fixed.
