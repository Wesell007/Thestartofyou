# Journal-to-Digital design system (Gate 2 workstream)

**Status: PLANNED / NEXT MAJOR PRODUCT WORKSTREAM. Not started.** Recorded in Gate 0 (23 October 2026). Nothing in this document changes code. Programme context: `docs/strategy/tsoy-v1-product-rebaseline.md`.

## 1. Position

The current Lovable-era visual implementation is **not** the quality benchmark. The **physical The Start of You pregnancy journal and its packaging** are the primary visual source of truth. The redesign happens **before further major frontend expansion**. It serves web first and the native app's design language (`docs/mobile/tsoy-native-app-roadmap.md`).

## 2. Authority hierarchy

1. **Physical TSOY journal + packaging**: the reference artefact.
2. **Founder-approved brand judgement**: final say on direction.
3. **Curated Taste references and design critique**: what to borrow and what to avoid (§5).
4. **TSOY digital design system**: tokens, type, components and patterns derived from 1–3.
5. **Higgsfield / other approved asset-generation tools**: premium imagery and motion inside the system (§5).
6. **Claude Code implementation**: builds the system and screens faithfully, and flags conflicts upward rather than inventing.

A lower layer never overrides a higher one. A conflict is resolved by the owner.

## 3. What the system must derive from the journal

Each item is captured by a **physical journal audit** (Gate 2, step 1): photographed or scanned, measured and described, with nothing invented.

- **Real journal colours**: cover, paper, inks and accents, measured (sampled from controlled photographs, verified against the object) and mapped to tokens.
- **Packaging**: box, sleeve, inserts and their materials.
- **Typography**: typefaces or the closest licensed digital equivalents; scale; weights; the relationship between display and text.
- **Print hierarchy**: chapter openers, section heads, prompts, captions, footers.
- **Botanical language**: illustration style, line weight, density and placement.
- **Paper/cream tones**: the base surfaces, layered tones and their contrast with text (WCAG AA minimum).
- **Spacing and margins**: page grid, margins, rhythm and whitespace.
- **Dividers and rules**: line styles, ornaments, separators.
- **Prompt treatments**: how writing prompts, lines and boxes invite writing.
- **Physical texture and finish**: matte/soft-touch, emboss and foil, translated as restraint rather than skeuomorphism.
- **Photography direction**: light, palette, crop, subjects, real versus staged.
- **Emotional tone**: calm, warm, unhurried, private, trustworthy.

## 4. Redesign scope

- homepage;
- global navigation;
- Journal/product experience;
- TTC, IVF, Pregnancy, First Year, Toddler and Family hubs;
- topic pages;
- article templates;
- calculators and tools;
- Companion;
- My Journey and My Week;
- journal/memories;
- family/co-parent;
- account/privacy;
- setup/onboarding;
- responsive/mobile;
- loading, empty and error states.

## 5. Explicit anti-patterns

- generic SaaS cards and dashboard grids;
- AI gradients and glow;
- generic pregnancy stock imagery;
- over-rounded dashboard UI;
- template-like visual hierarchy.

### 4a. Journal owner and activation scope (added 23 October 2026)

Source: `docs/product/physical-product-activation-and-journal-owner-experience.md` §12. Gate 2 also designs:
- normal visitor onboarding and journal-owner onboarding;
- the activation screen and the insert-card QR experience;
- account creation after a scan, and claiming with an existing account;
- linking the journal to a pregnancy;
- owner home/dashboard treatment and "In your journal this week";
- the physical/digital journal bridge;
- Companion journal-awareness states;
- mobile/app activation concepts;
- **claimed / unclaimed / already-claimed / invalid-code / support** states.

The physical journal and packaging remain the design authority. Design only: no routes, tokens or schema.

## 6. Gate 2 deliverables (in order, each owner-reviewed)

1. **Physical journal audit**: **DONE from the supplied files (23 October 2026)**, see `docs/design/journal-audit/`.
   - Covered from the print PDF and the box mockup: typefaces, file colour values, layout, illustration, prompts, packaging, the digital gap analysis, principles and three proposed directions.
   - Physical confirmation (paper, finish, printed colour, trim size) is still pending.
   - The insert card does not exist yet and is a new deliverable.
2. **Taste reference system**: **DONE (23 October 2026)**, see `docs/design/references/` (seven categories, anti-reference board, A/B/C scorecard, synthesis recommendation: B + A + limited C as one system under three rules; Kidproducts = legacy/transitional physical brand only, per founder correction). **Direction approved by the founder on 23 October 2026**; Step 3 flagship screens follow.
3. **Visual directions**: DONE in Step 2 (A/B/C scored; B + A + limited C approved by the founder, 23 October 2026).
4. **Flagship screens**: **STEP 3 DELIVERED FOR FOUNDER REVIEW (23 October 2026)**: article, My Week (five states), Companion (four states), journal-owner activation (thirteen states), homepage, each at 1440 and 390 px as isolated static prototypes (`docs/design/flagship/`, review captures in `docs/design/flagship/review/`, source snapshot in `docs/design/flagship/prototype-source/`, working prototypes outside Git). Provisional tokens recorded; nothing implemented in the application. Awaiting founder approval (`docs/design/flagship/founder-review.md`).
5. **Shared design system**: tokens (colour, type, space, radius, elevation, motion), core components and patterns, implemented in `src/index.css` / `tailwind.config.ts` / `src/components/ui/`. It replaces the Lovable-era tokens through a planned migration with visual QA, not a big-bang swap.
6. **Web and app design principles**: one token source shared where practical.

**Current baseline, to be replaced rather than extended:**
- Playfair Display and Jost (`tailwind.config.ts`);
- the stage palettes in `src/index.css`;
- existing journal photography in `src/assets/journal-*.jpg` and the `/product` page, which can be reused as audit inputs where they are genuine journal photography.

The AGENTS.md conventions (accessibility, semantic structure, health-content tone, SEO) remain mandatory throughout.

## 7. Not in Gate 0

No tokens changed, no components or screens redesigned, no assets generated, nothing published.
