# Flagship prototype source (DESIGN-ONLY / NON-RUNTIME)

**This folder is a design artefact snapshot. It is not imported, referenced or bundled by the application, and it must never be.** No file under `src/`, `supabase/`, `scripts/`, `public/`, any Vite/Vitest/Playwright/TypeScript/ESLint/Tailwind config or `index.html` may reference it. It exists so the Gate 2 Step 3 concepts can be reproduced and reviewed from Git.

Working copy (served locally for review): `C:\Users\Administrator\.tsoy-design\flagship-prototypes\`.

## Contents

| Path | Purpose |
|---|---|
| `index.html`, `compare.html` | review index and 390/1440 side-by-side view |
| `article.html`, `my-week.html`, `companion.html`, `activation.html`, `homepage.html` | the five concepts; multi-state files stack their states as `#state-…` sections |
| `css/tsoy.css` | provisional tokens and components (`../provisional-design-tokens.md` is the readable form) |
| `tools/fetch-fonts.mjs` | one-time download of the three stand-in OFL families (variable TTFs + `OFL.txt`) from the google/fonts repository into `fonts/` |
| `tools/screenshot.mjs` | Playwright capture (uses the repository's dev dependency via `createRequire`; true 1440×900 and 390×844 viewports; PNG; fixed name map; asserts the stand-in fonts loaded) |
| `tools/serve.cmd` | `python -m http.server 4310 --bind 127.0.0.1` on the folder |
| `assets/README.md` | manifest of the genuine journal photographs used (origin paths under `src/assets/` and hashes); the images themselves are intentionally not duplicated here |

Not committed, by design: font binaries, image copies, full-size PNG captures, temporary render output.

## Reproduce

1. Copy this folder to a location outside the repository.
2. `node tools/fetch-fonts.mjs` (network once).
3. Copy the files listed in `assets/README.md` from `src/assets/` into `assets/`; regenerate `cover-front.jpg` (crop 2.5 % / 3 % print margins off `journal-cover.jpg`) and the three `cover-art-*.jpg` edge crops from it (left 34 %, right 34 %, top-left 42 % square, each at 50 % scale).
4. `tools\serve.cmd`, then open `http://localhost:4310/`.
5. `node tools/screenshot.mjs` to regenerate the review captures into `review/`.

Fonts are stand-ins with the approved typographic character (Cormorant Garamond, Public Sans, Source Serif 4; all SIL OFL). Production fonts are not locked.
