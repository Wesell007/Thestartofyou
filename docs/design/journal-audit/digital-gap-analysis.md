# Current website vs the physical journal: gap analysis

**Measured from `src/` at `f760db08`** (`.tsx` files, excluding tests). The current Lovable-era visual system is **not** the authority; this classifies what to do with it. Nothing is implemented in this phase.

## Measured baseline

| Item | Current digital | Journal |
|---|---|---|
| Display type | Playfair Display (`font-serif`, 2,530 uses) | Adorn Story Serif: hairline display serif, spaced capitals |
| UI / body type | Jost (geometric sans) | Aileron (neutral grotesque) for prompts/labels; Source Serif for letter body |
| Global radius token | `--radius: 2rem` (32 px); `rounded-2xl` 472, `rounded-3xl` 447, `rounded-full` 1,534 | almost square; only the "size of" pill is rounded |
| Shadows | `shadow-` 1,509 uses | none: depth comes from watercolour washes and paper frames |
| Gradients / blur | `bg-gradient` 488, `backdrop-blur` 137 | none (soft watercolour fields instead) |
| Motion | `animate-` 141 | static print |
| Uppercase | 1,366 | spaced capitals reserved for titles and small labels |
| Palette | per-stage palettes (`--stage-*`), sage primary `100 18% 48%`, parchment `40 14% 97%`, pregnancy cream/blush/peach/sage tokens | cream `#F8F7F3`, blush `#FCF1E8`, dusty blue `#96ACB1`, sage `#D9E2DC`, brown `#896142`, black text |
| Paper cues | `.bg-parchment-grain`, `.page-vignette`, `.pregnancy-paper` utilities exist | real paper; grain/finish unknown |
| Imagery | 545 assets, including 18 journal photographs (`src/assets/journal-*.jpg`) | watercolour woodland illustration; polaroid photo frames |

## Classification

| Element | Verdict | Why |
|---|---|---|
| **Typography: display** | **REBUILD** | Playfair is a bookish high-contrast serif in mixed case; the journal's identity is a hairline display serif in **spaced capitals** with alternate letterforms. Licensing for Adorn Story Serif on the web must be confirmed, or a licensed equivalent chosen. |
| **Typography: UI/body** | **EVOLVE** | Jost's geometric character is close in calm but not in voice. The journal uses a neutral grotesque for prompts and a readable serif for long text. Evaluate Aileron (licence TBC) or an equivalent, plus a text serif for editorial reading. |
| **Colour** | **EVOLVE** | The existing cream, blush and sage pregnancy tokens are close relatives. Re-derive them from the journal (cream ground, blush ground, dusty blue-green signature, pale sage, brown accent, near-black text) and **reduce the per-stage rainbow** to tints of one family. |
| **Buttons** | **REBUILD** | 1,534 `rounded-full` pills and heavy shadows read as app/SaaS. The journal suggests quieter controls: text-led, hairline or lightly filled, small radius, generous spacing. |
| **Cards** | **REMOVE (as the default pattern)** | 32 px radii + shadows + gradients on card grids conflict with the journal's rule- and whitespace-led structure. Keep containers only where they carry meaning (the "size of" pill, a photo frame, a prompt wash). |
| **Navigation** | **EVOLVE** | Keep the information architecture. Restyle as an editorial masthead: spaced-caps wordmark, quiet links, no pill tabs or blur bars. |
| **Spacing** | **EVOLVE** | Already fairly generous. Align it to a print-like rhythm: larger section breaks, divider "chapter" moments, fewer stacked panels. |
| **Hero sections** | **REBUILD** | The journal's divider spread (large spaced title, small rule, one illustration at the edge, calm cream ground) is the template. Replace gradient/blur heroes. |
| **Imagery** | **EVOLVE** | Keep genuine journal photography as product imagery. Avoid generic stock and AI-looking lifestyle images. Future Higgsfield assets must follow the photography direction (not defined by the journal, which has no photography: an owner decision). |
| **Illustrations** | **REBUILD** | Introduce the woodland watercolour language sparingly at the edges. **Asset rights for the journal illustrations must be confirmed** (stock or licensed? web/app use?) before reuse. |
| **Article design** | **EVOLVE** | Editorial reading suits the journal. Apply spaced-caps titles with the dotted rule, a text serif body, ruled section breaks and a calmer source block. Keep SEO and accessibility. |
| **Hub design** | **REBUILD** | Hubs built from card grids → chapter-style hubs: divider header, then sections as lists and short editorial rows. |
| **Companion** | **EVOLVE** | Keep the safety architecture. Make the surface feel like a quiet page: no chat bubbles with heavy radius, prompt styling borrowed from the journal's sentence starters. |
| **Journal page (`/journal`)** | **REBUILD** | The product page should be the most journal-faithful surface: real product photography and a spread-like composition instead of the card, gradient and pill patterns used across the site. |
| **My Journey / My Week** | **REBUILD** | These map directly to the weekly template (update, photo, reflection prompts, "size of", reminder). Rebuild as a **digital week page** rather than a dashboard of cards. |
| **Onboarding** | **REBUILD** | Add the visitor path and the journal-owner path. Use a divider-style welcome ("Your journal continues here"). |
| **Mobile experience** | **REBUILD** (within the new system) | The landscape spreads become portrait single columns. Keep title-rule-prompt rhythm; titles must scale down (spaced caps get long on phones). |

## Generic Lovable/SaaS patterns that conflict with the physical brand

1. **Pills and heavy radius everywhere** (32 px token, `rounded-full` buttons and badges).
2. **Drop shadows** on almost every container.
3. **Gradients and glass blur** (`bg-gradient`, `backdrop-blur`) for heroes and panels.
4. **Card-grid density:** pages assembled from many equal cards rather than editorial sections.
5. **Per-stage colour switching** that makes stages feel like different apps; the journal holds one palette across pregnancy and the first year.
6. **Constant micro-animation** where the journal is still and calm.
7. **Uppercase micro-labels everywhere.** The journal uses spaced capitals mainly for titles; labels are rare.
