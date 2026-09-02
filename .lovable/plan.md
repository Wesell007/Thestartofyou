# WC-3b — Existing Breadcrumb Migration (parity only)

## Verified inventory (current source, not the audit assumption)

Confirmed by search of `src/`:

| # | Implementation | Routes | Hierarchy today | Style | Inline colours | Target tone |
|---|---|---|---|---|---|---|
| 1 | `components/trimester/TrimesterHero.tsx` | `/pregnancy/:trimester` | Pregnancy › {label} | centred, xs, sage current, ChevronRight | no (class based) | section |
| 2 | `components/firsttri/FirstTriHero.tsx` | first trimester hub | Pregnancy › {label} | same as above | no | section |
| 3 | `components/secondtri/SecondTriHero.tsx` | second trimester hub | Pregnancy › {label} | same | no | section |
| 4 | `components/thirdtri/ThirdTriHero.tsx` | third trimester hub | Pregnancy › {label} | same | no | section |
| 5 | `components/week/WeekHero.tsx` | `/pregnancy/week/:week` (generic) | Pregnancy › {trimester} › Week N | centred, xs, `›` glyph, no `<ol>`, no aria-label | no | section |
| 6 | `pages/Week1Page.tsx` … `Week42Page.tsx` (42 files) | `/pregnancy/week/1..42` | Pregnancy › Week by week › Week N | centred, 12px, `›` glyph, `aria-label="breadcrumb"`, no `<ol>` | no | section |
| 7 | `components/ttc/TTCTopicPage.tsx` | TTC topics | The TTC Guide › {topic} | 12px muted, `›` | no | section |
| 8 | `components/ttc/TTCSubtopicPage.tsx` | TTC subtopics | The TTC Guide › {parent} › {page} | same | no | section |
| 9 | `components/ivf/IVFTopicPage.tsx` | IVF topics | IVF › {eyebrow} | same | no | section |
| 10 | `components/toddler/topic/ToddlerTopicPage.tsx` | Toddler topics | Toddler › {topic} | `<ol>`, Home icon, ChevronRight | yes (`accent`, `deep`, `deepSoft`) | section + `colors` |
| 11 | `components/toddler/age/ToddlerAgePage.tsx` | Toddler age pages | Toddler › {age} | same | yes | section + `colors` |
| 12 | `components/family/topic/FamilyTopicPage.tsx` | Family topics | Family › {topic} | same | yes | section + `colors` |
| 13 | `components/shared/HubArticleView.tsx` | hub articles | {hub} › {topic/current} | same | yes | section + `colors` |
| 14 | `components/article/ArticleHeader.tsx` | legacy article pages | The Pregnancy Map › {topic} (both links, no current crumb) | uppercase micro | no | article — see blocker |
| 15 | `components/article/flagship/FlagshipHero.tsx` | flagship articles | The Pregnancy Map / The TTC Guide › {topic} (both links) | uppercase micro | no | article — see blocker |

Total distinct implementations: 15 (counting the 42 week pages as one repeated pattern; 56 files touched).

## Blocker to decide before migrating items 14 and 15

`ArticleHeader` and `FlagshipHero` render breadcrumb trails whose **last item is a link to the topic hub** — the article itself is not a crumb. The shared component always renders the final item as a non-clickable `aria-current` span, so a straight migration would silently break the topic link.

Recommended handling (no shared-API change, no hierarchy change): **leave items 14 and 15 unmigrated in WC-3b** and report them as a blocked family for WC-3c, where the cross-journey `/articles/:slug` hierarchy is already scheduled for resolution. Alternative, if you prefer full coverage now, is a minimal `Breadcrumbs` addition (`trailingLink` behaviour) — that is an API expansion and per section 13 requires your explicit approval.

Default in this plan: defer 14 and 15, migrate 1–13.

## Work

1. Migrate items 1–9 to `Breadcrumbs` with `tone="section"`, matching current classes via `className` (centring, margins, text size). No `colors`.
2. Migrate items 10–13 with `tone="section"` plus the `colors` escape hatch (`base: deepSoft`, `link: accent`, `current: deep`) because those values come from stage palette variables computed at runtime. The small `Home` icon in those four is decorative and inside the link label; it will be dropped or, if visual parity requires it, reported. Preference: drop it only if it reads identically; otherwise report as a parity deviation rather than expanding the API.
3. Remove now-dead local markup and imports (`ChevronRight`, `Home`) only where unused elsewhere in that file.
4. Hierarchy, labels and hrefs preserved exactly; each current page gains its own canonical href as the final non-clickable crumb.

## Explicitly untouched

`SeoHead`, `App.tsx`, sitemap, robots, `/ask`, `/journal-start`, `/postpartum/legacy`, `/trying-to-conceive/legacy`, `PregnancyTopicPage`, `IVFTimeline`, TTC `StagePage`, First Year surfaces, `buildBreadcrumbJsonLd` usage, WC-2 assets, `src/lib/grounding/*`, `docs/ai/grounding-approvals/*`, `supabase/functions/_shared/ai*`.

## Verification

- Representative consumer tests (week page, trimester, TTC subtopic, toddler topic, hub article) asserting hierarchy, links, final non-link, `aria-current`.
- Playwright visual check at 1280px and 390x844 for article/week/trimester/TTC/IVF/Toddler/Family routes: typography, colour, spacing, separator, wrapping, no overflow.
- `npm test`, `npm run lint`, `npm run typecheck`, `npm run build` against the 69 files / 696 tests baseline and the known 1 error + 10 warnings lint baseline.
- Full 40-point completion report; stop before WC-3c.
