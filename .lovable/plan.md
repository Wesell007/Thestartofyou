# Phase 40B — About / Our Story truth-led narrative rebuild

Rebuild `/about` as a calm editorial story, using the brief's copy and the Phase 40A claims register as the binding rules. The page changes only. No changes to app features, the Companion, memory, the journal, the database, saved journeys or deployment.

## Current state (checked before planning)
- Page tree: Navbar → AboutHero → AboutProblem → AboutApproach → AboutEcosystem → AboutAdaptive → AboutJournalConnection → AboutDifferent → AboutMission → AboutCTA → Footer (9 sections).
- The page has no images today: only lucide icons in AboutApproach, and none elsewhere. Retiring old imagery does not apply.
- The old page positions the product by counts ("7 journey stages", "50+ structured guides"). The CTA links to `/product`, which now redirects to `/journal`.
- Journey start route: `/start-your-journey`. Journal route: `/journal`. `/about` is in the sitemap and has a canonical tag.
- No About-specific tests exist.

## New page (10 sections, brief copy used word for word)
1. Hero: "Support that changes as family life changes." Buttons: "Start where you are" (`/start-your-journey`) and "Why we built this" (anchor to section 2). No AI button.
2. Why we exist: short of continuity, not information.
3. The Start of You today: four editorial columns (Guidance incl. IVF and preparing for baby, Companion, Tools, Journal). Uses the non-memory wording.
4. How we think about technology: four principles set as numbered prose, not cards.
5. More than a collection of features: one restrained text passage. No competitors, no "moat".
6. What we're building toward: a visibly distinct richer plum band using existing tokens, with four future directions and the line "Not all of this is live today". No "Coming soon".
7. Some things are for keeping: the physical journal, described as separate today. Link to `/journal`. If a strong existing journal photo is already in the repo, it is reused. No new images unless a real gap is found, and any new image gets documented.
8. Knowing the limits: understated prose.
9. What we want to protect: four commitments.
10. Final CTA: "Start your journey" (`/start-your-journey`) plus "Explore the guidance", but only if a canonical guidance discovery route is confirmed. Otherwise that button is left out.

Retired: counts in the hero, the ecosystem grid, the "adapts to every stage" grid, the mission section and the old CTA grid. Also retired: the old "physical and digital" framing and "every stage" wording.

## Technical details
- Replace the old `src/components/about/*` components with new narrative components in the same folder. `src/pages/About.tsx` keeps SeoHead and its canonical tag. Title and description change only if they now mismatch. The route and sitemap stay untouched.
- Hard-coded hex gradients get replaced with the existing tokens. Headings run h1 then h2 then h3 in order. Body text is kept to roughly 65 characters per line. The existing motion classes stay, and they respect reduced-motion settings.
- New `src/test/phase40bAboutStory.test.tsx` renders the page and checks that these phrases are absent: first AI companion, everything parents need, 7 stages, 50+, present-tense memory or continuity, universal NHS grounding, and physical/digital integration. It also checks that the future section contains future framing, that no fourth saved journey is implied, that the `/about` route exists and that the button destinations are correct.
- Responsive check with Playwright at 1280, 834 and 390 (overflow, console errors, crops, touch targets).
- Docs: `docs/strategy/phase40b-about-product-story.md`. Append Phase 40B to `roadmap.md` only.
- Validation: focused tests, then claims and lifecycle regression tests, the full suite, typecheck twice and lint against baseline. Finish with a production build. Report first run and rerun if anything flakes. Then the completion report and closure wording. No deployment, and no next phase is started.
