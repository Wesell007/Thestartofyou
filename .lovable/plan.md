# IVF Pass 1 — Stage pages premium uplift

Scope: `src/components/ivf/IVFTopicPage.tsx` only. No data file changes, no hub changes, no new image assets.

Guardrails respected: keep IVF contained, photographic (not illustrative), one main decorative gesture per section, lilac-family identity preserved, thumbnails restrained, AI bridge stays secondary, tablet/iPad checked.

## A. Per-stage theme variation (lilac family)

Add `IVF_THEME[slug]` map inside the component file. Three shifts of the same lilac family with one Lucide icon each:

| Stage | accent HSL | tint HSL | icon |
|---|---|---|---|
| `before-transfer` | `265 32% 56%` (cool lilac, prep/focus) | `265 24% 94%` | `ShieldCheck` |
| `after-transfer` | `280 32% 56%` (mid lilac, waiting) | `280 22% 94%` | `Hourglass` |
| `early-pregnancy` | `300 30% 58%` (warm lilac, handover warmth) | `300 22% 94%` | `Heart` |

Inside `IVFTopicPage` derive `IVF_ACCENT_HSL` / `IVF_TINT_HSL` from `IVF_THEME[config.slug]`. The data file's exported constants stay as-is for any other consumer; they are simply no longer this component's source of truth.

## B. Cluster row thumbnails (restrained, consistent)

- Add `IVF_THUMBS: Record<string, string>` map at the top of the file using only existing assets. Covers live `/articles/*`, `/ivf/*`, `/support`, `/pregnancy`. `askIVF(...)` deep-links and anything unmatched fall back to the page's `heroImage` — so every row has a thumb and the look stays consistent.
- `thumbFor(href, fallback)` strips query strings before lookup.
- Cluster row becomes: 44px square thumb (`object-cover`, `rounded-lg`, ring-1 with `accentBorder`) · label · chevron. Row padding `py-3`, gap `gap-3`. Hover: row bg `accentSoft`, thumb `scale-[1.04]` 600ms. Existing border-top hairline retained.
- Cap stays at 5 links per cluster (already in place).
- No "View all" added in this pass.

## C. Start here cards uplift

- Add a small thumbnail strip at the top of each Start here card: full-bleed `h-28 sm:h-32` image, `rounded-xl`, ring-1 `accentBorder`, `group-hover:scale-[1.03]` 600ms.
- Card content padding nudged to `p-6 sm:p-7`.
- Keep the existing 01/02/03 serif marker, corner halo, "Open →" footer. No additional decoration.

## D. AI bridge uplift (stays secondary)

- Replace the full-width tinted band with a lifted card inside the section:
  - Outer section keeps soft background `hsl(tintHsl / 0.4)`.
  - Inner: `max-w-3xl mx-auto bg-card/75 backdrop-blur-sm rounded-[2rem] border` with `accentBorder`, `p-8 sm:p-12`.
  - One centred sprig (existing `topic-mini-sprig.png`) above the eyebrow, ~28px, low opacity.
  - Italic serif lead under the heading.
- Shadow capped at `0_30px_80px_-40px_rgba(0,0,0,0.12)` — stays clearly below hero, What this covers, Start here, and grouped clusters.

## E. Sibling chip refinement

- Two-line label: small uppercase "IVF stage" (10px, `tracking-[0.22em]`) + serif name (14px) for that sibling.
- Icon disc uses the **sibling's own** per-stage icon and accent via `IVF_THEME[sibling.slug]`, at `w-8 h-8`, icon size 14 — each chip carries the colour cue of the stage it links to.
- Chip padding `px-5 py-3`, row gap `gap-4 md:gap-5`. Default shadow `0 2px 10px -6px rgba(0,0,0,0.12)`; hover `0 10px 28px -18px rgba(0,0,0,0.25)` + `-translate-y-0.5`.

## F. Hairline finish above Back link

- Faint hairline `h-px max-w-32 mx-auto` using `accentSoft`, ~10px above the "← Back to the IVF hub" link.

## G. Out of scope

- IVF hub (`/ivf`), `IVFHero`, `IVFStages`, `IVFAISupport`, `IVFFinalCTA`, `IVFWhatThisCovers`, `IVFPathwayPosition`.
- TTC, Pregnancy, articles, navbar, weeks.
- `src/data/ivfTopicData.ts` — no edits.
- No new image assets, no new sprigs in this pass.
- No new sections, no changes to protocol-week / handover / common-questions / featured / normal-vs-seek blocks.

## H. Files

- `src/components/ivf/IVFTopicPage.tsx` (only).

## I. Verification

Playwright screenshots on `/ivf/before-transfer`, `/ivf/after-transfer`, `/ivf/early-pregnancy` at desktop (1280), iPad (834), and mobile (390). Confirm:
- Each stage shows a visibly distinct lilac accent.
- Cluster rows show thumbnails + hover tint without breaking vertical rhythm at iPad width.
- AI bridge reads as a lifted card, not a band.
- Sibling chips show per-stage icon and colour cue and wrap cleanly on tablet.
- Back link sits under a hairline.

Pause for review before IVF Pass 2 (hub uplift).
