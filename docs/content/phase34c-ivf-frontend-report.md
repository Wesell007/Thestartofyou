# Phase 34C — Frontend and discovery report

## Discovery

One new hub section, `IVFGuides`, rendered once on `/ivf` between the stage
list and the hub-wide common questions. It holds all four guides as image
cards. Each guide is surfaced exactly once site-wide as normal discovery;
there are no duplicate placements, and no new stage routes were created. Public
IVF stage routes remain three: before transfer, after transfer, early pregnancy.

## Contextual internal links

| From | To | Placement |
| --- | --- | --- |
| `/articles/ivf-timeline-what-to-expect` | OHSS guide | one contextual cross-link |
| `/ivf/after-transfer` | Unsuccessful-cycle guide | replaced the equivalent AI prompt in the "If results bring difficult news" group |
| Unsuccessful-cycle guide | `/articles/emotional-impact-of-ivf` | related stage link and cross-link |
| NHS funding guide | `/articles/moving-from-ttc-to-ivf` | related slug and cross-link |
| What IVF is | Timeline guide and funding guide | related stage links |

All internal link targets are asserted to resolve in
`src/test/phase34cIvfNewArticles.test.ts`.

## Imagery

Twelve new assets: one hero per guide (1600×1000) and two body images per
guide (1400×933). Every image has descriptive alt text; hero images are
rendered by the flagship template and body images use lazy loading. No image
depicts clinical procedures, needles or distressing content.

## SEO

Each guide has a unique title, meta description, standfirst and canonical under
`https://thestartofyou.com`. Keyword ownership is recorded in the inventory:
orientation and the cycle sequence stay separated between the "what IVF is"
guide and the timeline guide, and the emotional experience of treatment as a
whole stays with `/articles/emotional-impact-of-ivf`. Sitemap 350 → 354 URLs,
0 duplicates.

## Accessibility and responsive QA

Checked at 1280px, 834px and 390px across `/ivf`, the four new guides,
`/ivf/after-transfer` and the timeline guide: one H1 per page, 0 horizontal
overflow, 0 broken images, decorative icons `aria-hidden`, visible focus
retained on card links, and no new console errors (the pre-existing
`fetchPriority` casing warning in `FlagshipHero` is unchanged).

## Trust surfaces

Citations render as plain, non-clickable text with publisher attribution. No
external-link icon or new-tab affordance is used. Reviewer claims rendered: 0.
Unsupported JSON-LD `reviewedBy`: 0.

## Deployment

Not deployed. Preview only. The global Phase 33 deployment block remains
ACTIVE, and human review of all four guides is outstanding.
