# Homepage static polish and lock (27 October 2026)

**Status: STATIC HOMEPAGE FOUNDER APPROVED AND LOCKED (27 October 2026).** Video (hero films B and C) remains paused and untouched; the hero keeps the existing B draft and poster exactly as delivered on 24 October. The locked state is `prototype-source/homepage.html` with `prototype-source/css/tsoy-3b.css` and `prototype-source/css/tsoy-3b-refine.css`, served from the working folder at `http://localhost:4310/3b/homepage.html`. DESIGN-ONLY / NON-RUNTIME: nothing here is imported, referenced or bundled by the application.

## What is locked

- The final watercolour chapter illustration family (five GPT Image 2.5 plates anchored to the approved sheet 4; see `chapter-illustrations.md`). Displayed at 90 % of the art box on desktop (156 px at 1440) and 104 px on mobile; the images themselves are unchanged since Stage B.
- The final journey colour system, with Toddler re-tuned by founder decision so the three warm journeys read as three families (blush, apricot / clay, honey): `--tod-wash #F2CFAD`, `--tod-mid #D9823B`, `--tod-deep #8A3F1B` (originally `#F6E6DA` / `#D8A585` / `#955537`; an intermediate `#F7E0C8` / `#E09F6A` / `#9C4F25` was judged too subtle). Contrast on the Toddler wash: label and link 5.09:1, description grey 4.76:1, heading ink 11.35:1; deep on paper 6.98:1. The shared tokens also colour the hero and closing journey dots, the ribbon segment and the mobile card edge.
- The final editorial homepage sections in their approved order: cinematic hero, Start wherever you are, The same page wherever you keep it, A Companion that answers carefully, Things worth keeping, One journey that moves with you.
- The final print-object treatment of the real journal photograph.
- The final responsive behaviour at 1440, 1280, 834 and 390, with zero horizontal overflow at each.

## The polish pass, in order (all CSS in the R9 block of `tsoy-3b-refine.css` unless noted)

1. **Whole page.** Section headings 30 to 36 px on desktop (32 tablet, 26 mobile), more air under the dotted rule and before the deck. Page height grew about 13 % from spacing, not from wider columns.
2. **The same page, wherever you keep it.** Heading runs full width above the two columns (HTML: label, heading and rule wrapped in `.section-head`, the two columns in `.cols`); the photograph column is 1.28 of the text column. The print, web, pocket rows became one progression: a dotted rail in the signature colour with a filled node for print and web and a hollow node for pocket; the boxed NOW / LATER tags became quiet spaced text. Micro-pass: photo-to-screen gap 60 to 42 px. Print object: warm off-white mat (`--page`) with an 18 px border and a hairline at the image edge, 8:5 print proportion, a 1° set, shadow in three layers (`0 1px 2px rgba(31,30,28,.07), 0 4px 8px -4px rgba(31,30,28,.08), 0 28px 56px -24px rgba(31,30,28,.26)`), italic muted caption; the Week Twelve object (max 470 px) sits right-aligned under the print and the dotted join spans exactly its width. A second paper sheet behind the print was tried and removed (read as a stack of cards). Mobile: 3:2, 0.6°, lighter shadow.
3. **Companion.** Example question 34 px display serif on two lines, answer 19 px on a 48-character measure, provenance as one quiet line separated by middle dots under a dotted rule, muted eyebrow, 80 px column gap. No bubbles, avatars or gradients.
4. **Things worth keeping.** Columns 1.05 / 1 / 1.3 / 1.12; the video object is the widest (4:3 still, 60 px play ring, 0.6° tilt, deeper shadow), the scan photo sits lower with a 1.8° tilt and Polaroid frame, the voice note is a cream paper note without border, the written reflection has 18 px hand text. Micro-pass: section bottom padding 96 to 64 px, privacy line gap 44 to 34 px (space below the objects down 25 %).
5. **One journey that moves with you.** Heading 44 px on two lines, deck 23 px, `--s7` above and below the ribbon, continuity column as a hairline list under a small-caps label closing on an italic display line, and a closing journey row (HTML addition: the five chapter dots with "Yours to keep.") under a hairline, bookending the hero.
6. **Tablet range 721 to 1024 px** (new): gutter 32 px, menu button instead of the nav, five plates with 18 px headings, two-by-two memory objects, narrower gaps. Before this range existed, 834 px overflowed to a 947 px scroll width.
7. **Mobile** restatements of every single-column grid the desktop rules would otherwise override.

## Review evidence in `review/`

`homepage-desktop.jpg`, `homepage-tablet-834.jpg`, `homepage-mobile.jpg`, `homepage-chapters-desktop.jpg`, `homepage-chapters-mobile.jpg` (locked state); `homepage-polish-before-after-{printweb,companion,memories,moves}.jpg` and `homepage-polish-print-object.jpg` (section before / after at 1440); `homepage-toddler-colour-before-after.jpg` (five-card strip, intermediate versus final Toddler). Full-resolution captures at all four widths stay outside Git in the working folder under `3b/review-polish/`.

## Scope

Homepage only. Companion and My Week prototypes, the Article and Activation 3A prototypes, Lovable, Supabase, 41B.1B and the runtime are untouched; `prototype-source/companion.html`, `my-week.html`, `index.html` and `tools/pack-3b.py` are at their 24 October (`1f43cca8`) state. Credits spent in this pass: none.
