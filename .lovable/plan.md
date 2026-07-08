# Phase 8.5b — Toddler Batch 4 Image Mappings (Speech + Health and Safety)

## Scope
Add hero + body image mappings for the four ready Toddler Batch 4 articles. Only `src/components/toddler/article/toddlerArticleImages.ts` is edited. Eight new bespoke image assets are generated. No article data, components, routes, topic pages, cards, SEO or other stage files touched.

## Files edited
- `src/components/toddler/article/toddlerArticleImages.ts` — add 8 imports + 4 map entries.

## New assets (8 total, all bespoke)
Placed under `src/assets/`, matching existing Batch 1–3 naming convention. All follow The Start of You visual style: calm, premium, warm natural light, realistic, parent/toddler-centred, emotionally grounded, no logos, no text, no clinical/emergency/fear/diagnosis framing.

1. `toddler-article-speech-home-hero.jpg` — parent and toddler sharing a book together at home, warm natural light, pressure-free.
2. `toddler-article-speech-home-body.jpg` — toddler pointing during play while parent listens nearby, quiet shared attention.
3. `toddler-article-speech-delay-hero.jpg` — parent and toddler in a calm shared communication moment, supportive not clinical.
4. `toddler-article-speech-delay-body.jpg` — toddler gesturing during play with parent attentive nearby, no assessment framing.
5. `toddler-article-home-safety-hero.jpg` — parent checking a stair gate or cupboard latch in a warm family home, calm and practical.
6. `toddler-article-home-safety-body.jpg` — simple toddler-safe living room setup, warm and everyday, no hazards on show.
7. `toddler-article-call-gp-hero.jpg` — parent calmly holding toddler while checking on them at home, reassuring not emergency.
8. `toddler-article-call-gp-body.jpg` — parent sitting near resting toddler with a phone/notes nearby, quiet home care moment.

No existing Toddler article images are reused — the Batch 1–3 pool is already tightly matched to those articles and reusing would create inappropriate duplication for Speech/Health topics.

## Map entries (all use `afterSectionIndex: 1`)

| Slug | Hero alt | Body alt | Caption |
|---|---|---|---|
| `supporting-toddler-speech-at-home` | A parent and toddler sharing a book and talking together at home | A toddler communicating through play with a parent nearby | Toddler speech grows through everyday connection, repetition, shared attention and time to respond. |
| `when-to-ask-about-speech-delay` | A parent and toddler sharing a calm communication moment at home | A toddler pointing during play while a parent listens nearby | If speech feels different or worrying, noticing patterns and asking early for advice can be a calm next step. |
| `toddler-home-safety` | A parent making a warm home space safer for a toddler | A simple toddler safety setup in a calm family home | Toddler safety is about reducing obvious hazards and building small habits, not creating a perfect home. |
| `when-to-call-the-gp` | A parent calmly checking on their toddler at home | A parent sitting near their toddler while preparing to ask for advice | You do not need to know exactly what is wrong before asking for advice if something worries you. |

Each entry preceded by the requested `// bespoke future:` comment.

## Technical details
- Add 8 new `import` lines alongside existing hero/body imports, grouped consistently with current file structure.
- Append 4 new keys to `toddlerArticleImageMap`, keeping Batch 1–3 entries untouched and in existing order.
- No duplicate or unused imports. `ToddlerArticleImages` / `HubBodyImage` types unchanged.
- Image generation via `imagegen--generate_image` (fast tier, 1024×1024, .jpg). No `lovable-assets` externalisation — matches existing Batch 3 pattern where bespoke jpgs are imported directly.

## Verification
- `bunx tsgo --noEmit` — clean.
- Playwright desktop (1280×1800) and mobile (375×812) on all 4 new routes:
  - `/toddler/speech-language/supporting-toddler-speech-at-home`
  - `/toddler/speech-language/when-to-ask-about-speech-delay`
  - `/toddler/health-safety/toddler-home-safety`
  - `/toddler/health-safety/when-to-call-the-gp`
- Per route: 200, exactly one hero + one body image, body placed between section 2 and 3, no mobile overflow, no broken paths.
- Medical-review pill present on `when-to-ask-about-speech-delay`, `toddler-home-safety`, `when-to-call-the-gp`; absent on `supporting-toddler-speech-at-home`.
- Sources render; related grids link only to ready slugs.
- Regression sweep (200 each): `/toddler`, all 8 toddler topic pages, `/first-year`, `/articles/complete-guide-morning-sickness`, `/pregnancy`, `/trying-to-conceive`, `/ivf`. No "Coming soon" on any Toddler topic page.
- Diff scope: only `toddlerArticleImages.ts` + 8 new asset files.

## Go/no-go
On green verification: safe to proceed to Phase 8.6 Toddler final QA.
