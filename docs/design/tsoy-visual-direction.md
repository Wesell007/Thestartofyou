# TSOY visual direction: references, critique and asset production

**Status: PLANNED (Gate 2).** Recorded in Gate 0 (23 October 2026). The system and authority hierarchy are in `docs/design/journal-to-digital-design-system.md`.

## 1. Direction in one paragraph

TSOY should look like the physical journal brought to the screen. It should feel editorial, calm, warm and premium: a printed keepsake rather than an app dashboard. Hierarchy comes from typography, paper tones, rules and whitespace instead of cards and colour blocks. Imagery is real, quiet and specific to the moment; motion is subtle and rare. The words are the "calm editorial tone" AGENTS.md already requires. The visual layer must now match them.

## 2. Taste: design-reference and critique layer

Taste captures:
- reference sites and screens;
- specific notes on what the owner likes and dislikes, and why;
- spacing, typography and hierarchy;
- editorial composition;
- photography treatment;
- premium cues;
- anti-patterns to avoid.

Rules:
- **Taste is not the final design authority.** References inform; the journal and founder judgement decide (hierarchy levels 1–2).
- Every adopted reference names the property borrowed (for example "chapter-opener spacing"), not "make it look like X".
- References are reviewed against the anti-pattern list (`journal-to-digital-design-system.md` §5).
- A reference set is curated per surface: editorial pages, Companion, journal, onboarding, app.

**Record format** (Gate 2), one entry per reference:
- source;
- what it shows;
- like or dislike;
- the property concerned;
- whether it applies to web, app or both;
- the decision.

Kept in `docs/design/references/` (created in Gate 2 Step 2, 23 October 2026: category files, `anti-references.md`, `direction-scorecard.md`, `synthesis-recommendation.md`). Entries are links and notes only; no screenshots are stored in Git. The 21st.dev catalog tooling was unavailable during the round, so references were grounded by web research and attributed per entry.

## 3. Higgsfield: premium visual-production layer

Used for:
- cinematic lifestyle assets;
- journal campaign imagery;
- image-to-video;
- subtle hero motion;
- product storytelling;
- branded launch assets;
- selected premium visual moments.

Rules:
- **Higgsfield is not the interface architecture authority**, and generated assets never define layout, components or tokens.
- Generated imagery must follow the photography direction derived from the journal audit. It must avoid generic pregnancy stock aesthetics, and must not depict medical procedures, scans or clinical outcomes in a way that could mislead (health-content rules in AGENTS.md).
- Assets are imported into the repository (no hotlinks), with meaningful alt text, and recorded with prompt/source provenance.
- Motion respects `prefers-reduced-motion` and never carries information on its own.
- No asset is generated in Gate 0.

## 4. Implementation

Claude Code implements the actual UI and design system (hierarchy level 6). It flags a conflict between a reference, an asset and the system to the owner rather than resolving it silently.
