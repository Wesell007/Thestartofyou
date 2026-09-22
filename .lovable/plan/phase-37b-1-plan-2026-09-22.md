# Phase 37B.1 plan

## Goal

Complete the existing First Year visual system without redesigning Phase 37B. Every current First Year article receives one strong, article specific hero, and the same destination image appears consistently across article pages and editorial discovery cards.

## Image accounting and quality gate

- Review all 11 original hero articles. Preserve each unless a genuine safety, anatomy, semantic, broken asset or damaging crop defect is confirmed.
- Report `Existing heroes reviewed = 11 / 11`, with preserved and defect replaced totals satisfying `preserved + replaced = 11`.
- Remediate the 15 currently suppressed articles individually. Search approved assets first, then use an article specific Nano Banana image only where no suitable approved asset exists.
- Report approved existing asset assignments and newly generated assignments separately, satisfying `existing asset assignments + new Nano Banana assets = 15`. Replacements among the original 11 remain outside this equation.
- Final accounting must satisfy `11 original hero articles + 15 remediated articles = 26 explicit heroes`.
- Require 26 distinct assignments, 0 current suppressions, 0 cross article duplication, 0 generic fallback, 0 unsafe or implausible imagery and 0 missing card images.
- Reject imagery that fails semantic relevance, anatomy, infant safety, age plausibility, feeding or sleep safety, believable interaction, or desktop, tablet and mobile crop review. Do not hide defects through cropping.
- If an acceptable hero cannot be produced, keep that article explicitly suppressed and report `UNRESOLVED_HERO_QUALITY_GAP = 1`. Do not close until unresolved gaps equal 0.
- Keep optional suppression capability available for future content. Keep generic fallback disabled for every current article.
- Body imagery remains locked: 0 generated, 0 restored and 0 changed, unless a broken reference repair is separately identified and reported.

## Implementation

1. Add accepted explicit hero mappings and meaningful alt text for the 15 remediated articles while preserving the 11 accepted original hero mappings and every body image decision.
2. Remove the 15 current suppression flags only after their explicit images pass review.
3. Make shared First Year article cards use explicit destination article imagery for all 26 current articles, with no current article able to fall through to topic or category imagery.
4. Make each topic featured card resolve its image from its destination article rather than its independent topic card image. Preserve titles, descriptions, order, routes and overall card layout.
5. Add the destination article hero to First Year phase useful read cards without redesigning the phase template or changing guidance titles, descriptions, order or routes.
6. Preserve article page hero behaviour, related guidance, both pathway pages, all eight topic pages and all four phase pages. No body image or editorial content changes.
7. Remove only rejected generated files after confirming they have no references. Keep accepted image files local and imported through the existing asset pattern.

## Focused regressions

Add or update tests proving:

- 26 ready First Year articles have 26 explicit, valid and distinct hero assignments.
- Current First Year suppressions equal 0 and current generic fallback use equals 0.
- Optional future suppression behaviour remains supported without a blank image ratio box.
- Article pages, pathway cards, all eight topic card surfaces, phase useful reads and related guidance use destination article identity.
- Topic featured cards have 0 conflicting independent imagery.
- Phase useful reads gain article heroes without architectural redesign.
- Body image mappings are unchanged from the locked Phase 37A.1 decisions.
- Existing Phase 37B pathway accounting, Companion counts and ordering remain intact.
- AI runtime, prompts, context builder, grounding, database, lifecycle, TTC, Pregnancy, routes, article content, sources and reviewers remain unchanged.

## Evidence and validation

- Create `docs/content/phase37b1-first-year-article-image-completion.md`.
- Create `docs/content/phase37b1-first-year-image-asset-register.md`.
- Create `docs/content/phase37b1-first-year-responsive-evidence.md`.
- Update only the Phase 37B.1 section of `roadmap.md`.
- Run focused tests, the full test suite, typecheck twice, lint and production build.
- Run responsive browser QA at 1280, 834 and 390 pixels across article pages and every affected discovery surface. Check crops, image identity, missing and broken images, overflow, interaction nesting, keyboard focus, touch targets, heading hierarchy, reduced motion and console errors.
- Report visual evidence and all requested accounting fields before closure.
- Do not deploy and do not start the First Year content coverage audit.

## Locked boundaries

- New articles, article copy, medical guidance, routes, sources and reviewer changes: 0.
- AI runtime, prompts, context builder, grounding, lifecycle, database, TTC and Pregnancy changes: 0.
- Body images generated, restored or changed: 0, unless a broken reference repair is explicitly reported.
- Deployment: NO.

## Closure

Use the following wording only after every gate passes:

`PHASE 37B.1 — FIRST YEAR ARTICLE HERO & CARD IMAGE COMPLETION`

`CLOSED PASS / ALL FIRST YEAR ARTICLES VISUALLY COMPLETE /`

`ARTICLE DISCOVERY IMAGERY CONSISTENT /`

`NO CONTENT CHANGES`
