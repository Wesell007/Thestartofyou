# Gate 2, Step 3: flagship screen design

**Status: STEP 3A DELIVERED FOR FOUNDER REVIEW (23 October 2026); STEP 3B VISUAL-EXPLORATION ROUND COMPLETE, STEP 3B PROTOTYPES NOT STARTED. Design artefacts only. Nothing implemented in the application; no token migration; no Supabase, schema or production change; 41B.1B not started; Lovable unpublished.**

Step 3B (founder brief of 23 October 2026: journey colour families, baby-growth system, richer My Week / Companion / Homepage, revised card and motion rules) began with a Higgsfield visual-exploration round rather than with code: see `step-3b/higgsfield-exploration-round.md` and the compressed studies in `step-3b/explorations/`. The 3A documents below remain the current prototype record until the 3B pass is approved and executed.

Five isolated static prototypes prove the approved system (B Editorial Keepsake as master; A Journal-Digitised patterns where the user writes, remembers or looks back; C woodland art only at chapter, keepsake, welcome and product-storytelling moments) on the most demanding surfaces, in the required order:

| # | Concept | Spec | States | Review captures (`review/`) |
|---|---|---|---|---|
| 1 | Article | `article.md` | one | `article-desktop.jpg`, `article-mobile.jpg` |
| 2 | My Week | `my-week.md` | A owner · B digital-only · C TTC/IVF · D historical · E paused | `my-week-*.jpg` (+ per-state desktop) |
| 3 | Companion | `companion.md` | answer · not found · seek help · owner cue | `companion-*.jpg` |
| 4 | Journal-owner activation | `journal-owner-activation.md` | 13 states on 4 sheets | `activation-*.jpg` |
| 5 | Homepage | `homepage.md` | one | `homepage-*.jpg` |

Cross-cutting: `mobile-principles.md`, `provisional-design-tokens.md`, `founder-review.md` (the approval questions). `contact-sheet.jpg` shows all five at both widths.

## How to review visually

- **Locally in a browser:** run `C:\Users\Administrator\.tsoy-design\flagship-prototypes\tools\serve.cmd` and open `http://localhost:4310/` (review index) or `http://localhost:4310/compare.html` (390 px and 1440 px side by side). Localhost only; fully offline; nothing connected.
- **From Git:** the compressed captures in `review/` (desktop downscaled to 960 px wide, mobile at 390 px, JPEG) and the reproducible source in `prototype-source/` (DESIGN-ONLY / NON-RUNTIME).
- Full-size PNG captures, the self-hosted stand-in fonts and image copies stay outside Git in the working folder.

## Guarantees

- No file under `src/`, `supabase/`, `scripts/`, `public/` or any build/test config changed or references `docs/design/flagship` (verified by grep and by the commit's diff classification).
- Photography is the real journal shoot and the real cover artwork already tracked under `src/assets/`; the three AI-generated "journal" images in the repository (`home-journal-flatlay.jpg`, `journal-book.jpg`, `ttc-ovulation-signs-journal.jpg`) are excluded and reported as findings in `founder-review.md`.
- Article copy, reviewer name and article titles are real repository content; every user, date, appointment and activation code is synthetic.
- Fonts are stand-ins with the approved character; production fonts are not locked (licence findings in `provisional-design-tokens.md`).
- Kidproducts (legacy/transitional physical brand) appears nowhere in the concepts.
