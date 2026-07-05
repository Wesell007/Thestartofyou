# Family Topic Pages — Generate and wire hero images

Add a real, warm editorial hero image to each of the 6 Family topic pages, replacing the current token-washed abstract panel. Image + wiring pass only — no structural changes.

## 1. Generate 6 images (1024x1200, premium tier)

Shared style: warm natural window light, buttercream/honey/beige palette, calm editorial photography, unposed, shallow DoF, no text/logos/watermarks.

Save each to `/tmp/`:

| Topic | File | Subject |
|---|---|---|
| Growing families | `/tmp/family-topic-growing-families.jpg` | Parents preparing for new baby, older child nearby, folded baby clothes |
| Relationships | `/tmp/family-topic-relationships.jpg` | Parent couple at kitchen table, child playing out of focus |
| Family basics | `/tmp/family-topic-family-basics.jpg` | Parent with family calendar, lunch boxes, keys, small backpack |
| Health and safety | `/tmp/family-topic-health-safety.jpg` | Parent with child on sofa, blanket, water — warm, not clinical |
| Travel and days out | `/tmp/family-topic-travel-days-out.jpg` | Family packing, children putting on shoes at front door |
| Play, fun and connection | `/tmp/family-topic-play-connection.jpg` | Family on rug playing blocks/board game, quiet laughter |

## 2. Upload as Lovable CDN assets

For each image, run `lovable-assets create --file <tmp path> --filename <name>.jpg` and write stdout to the matching pointer:

- `src/assets/family-topic-growing-families.jpg.asset.json`
- `src/assets/family-topic-relationships.jpg.asset.json`
- `src/assets/family-topic-family-basics.jpg.asset.json`
- `src/assets/family-topic-health-safety.jpg.asset.json`
- `src/assets/family-topic-travel-days-out.jpg.asset.json`
- `src/assets/family-topic-play-connection.jpg.asset.json`

Then `rm` the `/tmp` originals.

## 3. Wire images into topic data

Edit `src/data/familyTopicData.ts`:

- Import the 6 asset pointers at the top.
- Add to `FamilyTopicConfig`:
  ```ts
  heroImage: { src: string; alt: string };
  ```
- Add `heroImage` to each of the 6 configs with the specified alt text:
  - Growing families → "Family preparing for a new baby at home"
  - Relationships → "Parents sharing a calm conversation at home"
  - Family basics → "Family planning everyday routines at home"
  - Health and safety → "Parent caring for a child at home"
  - Travel and days out → "Family getting ready for a day out"
  - Play, fun and connection → "Family playing together at home"

## 4. Update FamilyTopicPage hero

Edit `src/components/family/topic/FamilyTopicPage.tsx`:

- Replace the blank token-washed abstract panel with an `<img>` sourced from `config.heroImage.src` / `config.heroImage.alt`.
- Treatment: keep existing premium frame (muted ochre border, rounded, warm shadow, buttercream wash overlay, inner highlight). `object-cover`, `object-position: 50% 40%` for safe face crop.
- Keep the existing abstract panel rendered as fallback if `config.heroImage?.src` is missing.
- Do NOT touch breadcrumb, eyebrow, H1, standfirst, CTAs, spacing, or section order.

## 5. Verification

- `tsgo` clean typecheck.
- Playwright at 1280 / 1024 / 390 across all 6 `/family/*` topic routes: real image visible, no blank panel, no broken image icons, no horizontal scroll, faces not cropped badly, CTAs tappable, Q&A accordion still works.
- Spot-check `/family`, `/pregnancy`, `/first-year`, `/toddler` still render.

## Out of scope

No new routes, subtopic pages, articles, tokens, journey logic, or edits to Family Hub carousel/layout, nav, footer, AskPage, AISearchBar, HubAISupport, aiStageStyles, sibling hubs, auth, setup, prompts, or edge functions.

## Technical details

- Image model: `premium` (photorealistic families benefit from higher fidelity than `fast`).
- Pointer imports use existing `@/assets/*.asset.json` pattern already used by `family-hero-*` files.
- Fallback check: `config.heroImage?.src ? <img .../> : <existing abstract panel/>` so a missing pointer doesn't crash the page.
