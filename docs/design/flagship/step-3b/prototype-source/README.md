# Step 3B prototype source (DESIGN-ONLY / NON-RUNTIME)

These files are the reproducible source of the Gate 2 Step 3B prototypes. **They are not imported, referenced or bundled by the application and must never be.** They are committed only so the design decisions can be reproduced and reviewed from Git.

## Contents

- `my-week.html`, `homepage.html`, `companion.html`, `index.html`: the three surfaces and the review index (every file carries a DESIGN-ONLY header).
- `css/tsoy-3b-refine.css`: the founder-refinement layer (lighter chapter cards, cinematic hero controls, memories row, print/web pair) and, from 25 October 2026, the chapter-plate art-box rules; from 27 October 2026 the R9 homepage static-polish block (section scale and rhythm, progression rail, editorial Companion excerpt, keepsake weights, closing spread, mounted-print treatment, tablet range 721 to 1024).
- `art/chapters/*-380.png`: the five approved watercolour chapter plates at 1x (380 px, transparent); the 760 px 2x exports and 1024 masters stay outside Git. `art/chapters.svg` and `tools/inject-art.py` keep the superseded SVG concept family for the comparison harness `art/chapters-test.html`. `tools/pack-fidelity.py` builds the fidelity-pass review additions.
- `css/tsoy-3b.css`: journey colour tokens (Toddler re-tuned 27 October 2026 to `#8A3F1B` / `#D9823B` / `#F2CFAD`, founder decision), logo, Companion mark, week strip, chapter band, baby growth plate, memory objects, Companion rail, cinematic hero, chapter spine. It imports the Step 3A base stylesheet `../../prototype-source/css/tsoy.css` by relative path (`../../css/tsoy.css` in the working folder).
- `tools/screenshot-3b.mjs`: Playwright capture of every view at 1440 and 390 (uses the repo's Playwright through `createRequire`; prefers the Edge channel so H.264 decodes; never touches the application).
- `tools/frames.mjs`: still-frame extraction from a local MP4 served over the local review server.
- `tools/pack-3b.py`: builds the compressed review pack, growth comparison, 3A-vs-3B comparison and contact sheet.

## Reproduce

1. Working folder: `C:\Users\Administrator\.tsoy-design\flagship-prototypes\` holds the 3A files, the self-hosted OFL stand-in fonts (`tools/fetch-fonts.mjs`), the genuine journal photographs copied from `src/assets/` (see `../../prototype-source/assets/README.md`) and the `3b/` folder containing these files.
2. Assets this round expects, all outside Git: `assets/logo-tsoy-trimmed.png` (crop of the transparent margin of the supplied logo, byte-identical to `src/assets/logo.png`; see `../logo-evidence.md`), `3b/media/hero-concept.mp4` and `3b/media/hero-poster.jpg` (the Kling 3.0 Omni concept A draft and its first frame; `3b/media/concept-{A,B,C}-*.mp4` for the review-bar switch). The homepage renders completely on the poster or on plain paper when the video is absent.
3. Serve with `tools/serve.cmd` and open `http://localhost:4310/3b/`.
4. Capture with `node tools/screenshot-3b.mjs`, then `python -I tools/pack-3b.py` to refresh `../review/`.

## Not committed

The hero-film MP4s (AI-generated concept drafts), full-size PNG captures, font binaries, the logo copies and duplicated photography remain outside Git.
