# Phase 37B.1 plan

## Repository truth

- The current First Year registry contains 26 ready articles: 15 Baby and 11 Postpartum.
- Current hero state is 11 explicit mapped heroes and 15 intentionally image-free heroes. Arithmetic: 11 + 15 = 26.
- The 15 suppressed records match the Phase 37A.1 audit. Their image-map entries contain no hero, and the article page and shared article card both honour `suppressHeroImage`.
- The 11 current heroes are explicit article mappings using 11 distinct assets.
- Pathway Start Here and grouped libraries use the shared First Year article card. Topic-page featured cards use their own image field, while topic related guidance uses the shared card. Phase useful reads currently use a separate text-led card. Article related guidance also uses the shared card.
- The shared First Year card currently has a topic fallback for unsuppressed records without an explicit mapping. Phase 37B.1 will not use that fallback for any of the 26 current articles.
- Phase 37B is closed. Its pathway ownership, routes, page structure, month navigation, image breaks and Companion placement remain locked.

## Build

### 1. Create the article-specific image register before generation

- Build the exact 15-article missing-hero list from repository data, preserving title, description, topic and Baby or Postpartum ownership.
- Lock and review the 11 existing mapped heroes first. Preserve each assignment unless visual review proves a safety defect, anatomy defect, semantic mismatch, broken asset or damaging crop. Report preserved and defect-replaced totals separately, with preserved plus replaced equalling 11.
- Review the full subject and surrounding visual system for each missing article.
- Search the approved asset pool first. Assign an existing asset only when it is strong, subject-specific, safe and not already the hero identity of another First Year article.
- Record one decision per missing article: `REUSE_STRONG_EXISTING_APPROVED_ASSET` or `GENERATE_ARTICLE_SPECIFIC_NANO_BANANA_ASSET`.
- Do not predetermine the reuse or generation totals. The measured article-by-article audit will set them.
- Reconcile the 15 missing records separately: existing approved assets assigned plus new Nano Banana assets generated must equal 15. Any justified replacement among the original 11 is excluded from this equation.

### 2. Generate only justified missing heroes

- Use Nano Banana individually for every remaining gap, with prompts tied to the article subject rather than its broad category.
- Baby imagery will show credible feeding, safer sleep or settling, age-appropriate play and movement, or real caregiving as the article requires.
- Postpartum imagery will centre the parent and show believable recovery, rest, support, body recovery or healthcare context only where relevant.
- Keep the established warm, intimate, lived-in UK-home direction and the Baby blue, sage and neutral or Postpartum plum, blush and neutral relationship.
- Reject or regenerate any result with implausible anatomy, hands, infant age, head or neck support, feeding position, sleep cues, objects, fabric, faces or body positioning. Cropping will never conceal a safety or anatomy defect.
- Review every accepted image for useful subject framing at desktop, tablet and mobile before wiring it into the product.
- Image quality outranks the 26 of 26 target. If no acceptable asset can be produced after justified review and regeneration, keep that article explicitly suppressed, record `UNRESOLVED_HERO_QUALITY_GAP = 1`, and leave Phase 37B.1 open rather than accepting a weak, generic, duplicated, unsafe or implausible image.

### 3. Establish 26 explicit and unique article identities

- Add an explicit hero mapping and meaningful alt text for every current First Year article.
- Remove `suppressHeroImage` from the current 15 records only after each has an approved explicit hero.
- Preserve the optional hero type, suppression flag, image-free article rendering and image-free card rendering for future or other records.
- Make explicit mapping the required source for all 26 current articles. Do not restore topic, category, pathway or neighbouring-article fallback imagery.
- Verify 26 distinct hero assignments across 26 articles and zero article-to-article hero duplication.
- Leave all article body-image decisions unchanged and generate zero body images.

### 4. Make every article discovery surface use the same identity

- Keep the existing First Year article card layout and make it render only the article's explicit mapped hero for the current registry.
- Pathways: show heroes on all Start Here cards and all grouped Baby and Postpartum library cards without changing ownership, order, copy or destinations.
- Topic pages: resolve featured editorial cards to their destination article hero instead of independent topic-card imagery, and keep related-guidance cards on the same shared identity.
- Remove all conflicting independent topic-feature imagery for First Year article destinations. Every such card must resolve to the destination article's explicit hero.
- Phase pages: add each linked First Year article's explicit hero to useful-read cards while preserving their existing titles, descriptions, destinations and phase architecture.
- Article pages: render the established split hero for all 26 articles and keep breadcrumbs, category, title, introduction, read time, update date and body structure unchanged.
- Article related guidance: continue using the shared card so each related article carries its own hero.
- Do not add images to topic navigation, phase navigation, support rows or any non-article element.

### 5. Preserve locked boundaries

- Do not redesign `/first-year`, either pathway page, the four phase pages, `Twelve months, four phases`, `Everything, side by side`, month navigation or Companion placement.
- Keep pathway accounting at Baby 4 Start Here plus 11 grouped equals 15, and Postpartum 4 Start Here plus 7 grouped equals 11.
- Make zero article-copy, route, source, reviewer, grounding, AI-runtime, lifecycle, database, TTC or Pregnancy changes.
- Do not modify or restore removed body imagery from Phase 37A.1.
- Keep article body-image decisions unchanged: zero generated body images and zero previously removed filler images restored. Report any unavoidable broken-reference repair separately.
- Before replacing or deleting any old asset, run repository-wide reference checks. Delete nothing unless it is proven unreferenced across every surface.
- Do not deploy and do not begin the First Year content-coverage audit.

## Verification

### Automated regression coverage

Add focused tests proving:

- 26 ready articles, 26 explicit hero mappings, 0 current suppressions and 26 valid asset references.
- 26 distinct article hero assignments, 0 cross-article duplication and 0 generic fallback use for current First Year articles.
- 0 missing images across pathway Start Here, Baby pathway, Postpartum pathway, all topic article-card systems, phase useful reads and article related guidance.
- The article page hero renders for every ready record.
- Optional hero, explicit suppression and image-free rendering remain supported with a non-current fixture.
- Article copy, routes, sources and reviewer metadata remain unchanged.
- Phase 37B ownership and Companion invariants remain unchanged.
- Grounding, AI runtime and lifecycle boundaries remain untouched.

### Visual and responsive review

- Inspect all 26 article pages at 1280, 834 and 390 pixels: 78 article and viewport combinations.
- Inspect both pathway pages at all three widths.
- Sanity-check all eight topic pages and all four phase pages for complete article-card imagery.
- Capture representative close evidence for Baby and Postpartum heroes, Start Here, Browse by topic, topic featured cards, phase useful reads and article related guidance.
- Verify no stretching, breakage, blank image areas, unexpected text-only article cards, unsafe or implausible imagery, damaging crops, horizontal overflow or new console errors.
- Confirm meaningful alt text, keyboard-reachable links, visible focus, valid heading hierarchy and preserved reduced-motion behaviour.

### Quality gates and evidence

- Run focused regressions, all locked First Year regressions, the full test suite, typecheck twice, lint and the production validation build.
- Record each asset's slug, title, ownership, filename, generated or existing status, visual intent, safety pass and three crop passes in `docs/content/phase37b1-first-year-image-asset-register.md`.
- Separate the register accounting into the 11 original heroes reviewed, original heroes preserved, original heroes replaced for documented defects, and the 15 missing heroes remediated through existing or newly generated assets.
- Record final accounting and boundary checks in `docs/content/phase37b1-first-year-article-image-completion.md`.
- Record the 78 hero checks, pathway checks, topic and phase sanity checks, screenshots, console and overflow results in `docs/content/phase37b1-first-year-responsive-evidence.md`.
- Add only a new Phase 37B.1 section to `roadmap.md`; leave Phase 37A, 37A.1 and 37B history unchanged.
- Return every requested completion-report field, including the measured existing-versus-generated split and established lint baseline.
- Include the reconciliation equations: preserved original heroes plus documented replacements equals 11; existing assignments plus new generations for suppressed records equals 15; 11 original hero articles plus 15 remediated articles equals 26 final explicit heroes.
- Report unresolved hero quality gaps explicitly. Closure additionally requires that count to be 0; any nonzero value blocks the locked closure statement.
- Use the locked closure wording only when all image, uniqueness, safety, card, responsive and validation gates pass.
