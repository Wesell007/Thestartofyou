# Gate 2 — physical journal and packaging audit

**Status: AUDIT COMPLETE (from supplied files) / PHYSICAL CONFIRMATION PENDING / NO DESIGN IMPLEMENTED.** Recorded 23 October 2026. This is audit and design extraction only: no runtime code, no tokens changed, no Supabase change, no generated imagery.

## Sources (owner-supplied; kept outside Git)

| Source | Location (local, not committed) | Size | SHA-256 | What it is |
|---|---|---|---|---|
| Journal print PDF | `C:\Users\Administrator\.tsoy-design\journal-audit\raw\journal.pdf` (supplied as `PregnancyJournal-WithoutEndS FINAL (1) (1) (1).pdf`) | 103.6 MB, 148 pages, PDF 1.4, created 7 Aug 2026 | `27331d3a5ab3f9c4…` | the complete interior, the front cover, the back cover and the spine (file name says "without end sheets") |
| Cover image | `…\raw\cover.jpg` (supplied as `Journal-book-case-with (1) (1).jpg`) | 3508 × 2480 px | `5c561b8b0f8de8ed…` | a **rendered mockup** of the box/case on a textured surface, not a photograph |

The owner placed the files in a folder whose name lost its backslashes (`Downloads\CUsersAdministrator.tsoy-designjournal-auditraw`). They were copied unchanged into the intended path; the originals remain where they were.

**No insert card exists yet.** It is a **new design deliverable** (`insert-card.md`), not a blocker.

## Method

1. **Structural extraction from the PDF (PyMuPDF):**
   - page sizes;
   - embedded font names;
   - text styles (font / size / colour);
   - vector fill and stroke colours with their colour spaces;
   - the image count;
   - the page-by-page text outline.

   Embedded font names and vector colour values are **file evidence**.
2. **Visual review:** contact sheets of all 148 pages, plus high-resolution renders of the cover, the letter page, a week page and the spine. One contact sheet (pp. 37–48) was briefly blocked by a permission prompt and was reviewed after the folder was added to the workspace.
3. **Approximate rendered colours:** pixel quantisation of representative pages. These are screen sRGB values from the file, **not** measurements of the printed object.
4. **Current-site comparison:** pattern counts and tokens from `src/` (`digital-gap-analysis.md`).

Evidence labels used throughout:
- **FILE** — proven from the PDF data;
- **VISUAL** — observed in renders;
- **APPROX** — sampled pixels;
- **NEEDS PHYSICAL CONFIRMATION** — cannot be proven from files.

## Documents

| File | Content |
|---|---|
| `physical-journal.md` | structure, colour, typography, layout, illustration, prompts, material |
| `packaging.md` | box/case mockup, spine, back cover, brand marks |
| `insert-card.md` | absence recorded; requirements for the new activation insert card |
| `digital-gap-analysis.md` | current site vs the journal: KEEP / EVOLVE / REMOVE / REBUILD |
| `design-principles.md` | principles derived from the audit; journal-owner inputs; **three proposed creative directions** |

Authority: `docs/design/journal-to-digital-design-system.md`. Owner experience: `docs/product/physical-product-activation-and-journal-owner-experience.md`.
