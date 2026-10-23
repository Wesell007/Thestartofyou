# Gate 2, Step 2: Taste reference and design critique round

**Status: RESEARCH COMPLETE (23 October 2026) / NO DESIGN IMPLEMENTED.** Documentation only: no runtime code, components, tokens, Supabase, schema or assets changed.

## Purpose

Stress-test the Step 1 synthesis (`docs/design/journal-audit/design-principles.md` §3) against external references and founder taste:

- **B, Editorial Keepsake** as the base digital system;
- **A, The Journal Digitised** for journal, My Week, activation, verified-owner, prompt and memory surfaces;
- **C, Woodland Companion** sparingly, for chapter transitions and keepsake moments.

The synthesis was **not** treated as approved. The outcome is in `synthesis-recommendation.md`.

## Authority

Every reference was evaluated against the physical journal, not the other way round:

- `docs/design/journal-audit/physical-journal.md`
- `docs/design/journal-audit/design-principles.md`
- `docs/design/journal-audit/digital-gap-analysis.md`
- `docs/design/journal-to-digital-design-system.md`

References help translate TSOY into digital. None replaces the journal's language, and no brand's identity is to be copied.

## Method and tooling note

- **Taste catalog tooling (21st.dev `get_inspiration` / `search`) failed on every call this session** ("catalog search failed"). It is in any case a component and template catalog, so it would have served pattern references, not product references. No catalog data was used or invented.
- References were therefore gathered by **web research** (23 October 2026) and each claim is attributed to a source in the category files. Where a source is marketing copy, a third-party reconstruction or dated launch coverage, the entry says so.
- **No screenshots are stored in Git.** Entries hold links, the exact screen or interaction, and durable notes. Rights-cleared screenshots, if ever needed, go to the owner's design workspace, not the repository.
- The `design-taste-frontend` skill's anti-pattern discipline (AI tells, card and gradient defaults, eyebrow and pill overuse) was used as a critique lens for the anti-reference board. Its build rules are not applied here because nothing is built in this step.

## Reference discipline

Each saved reference records: source / product; exact screen or interaction; what specifically works; what does not; what translates to TSOY; what must **not** be copied; which TSOY principle (P1–P10 in `design-principles.md` §1) it supports or contradicts; and A / B / C relevance. Entries with only "premium / clean / nice" were rejected.

## Files

| File | Category |
|---|---|
| `editorial.md` | A. Premium editorial |
| `journal-keepsake.md` | B. Premium journal / keepsake |
| `health-wellness.md` | C. Calm health / wellness |
| `family.md` | D. Pregnancy / family |
| `ai-companion.md` | E. AI Companion |
| `physical-digital.md` | F. Physical → digital product |
| `mobile.md` | G. Premium mobile product |
| `anti-references.md` | What TSOY must not become |
| `direction-scorecard.md` | A / B / C and the synthesis scored on eight flagship surfaces and twelve criteria |
| `synthesis-recommendation.md` | The recommended master direction, typography/imagery/motion/Companion character, Kidproducts recommendation, open founder decisions |

## Principle key (from `design-principles.md` §1)

P1 page not dashboard · P2 spaced capitals announce, plain sentences invite · P3 warm paper · P4 one quiet palette across the journey · P5 structure from rules, washes and whitespace · P6 nature at the edges · P7 chapters with a ceremony · P8 room to write is the product · P9 warm and gentle, accurate where it matters · P10 still by default.
