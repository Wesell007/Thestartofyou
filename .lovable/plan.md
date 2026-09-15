# Phase 34C — small IVF new-article batch (preview only)

Create exactly four new IVF guides, available in preview, with imagery, verified UK sources, one discovery place each, and no deployment.

## The four guides

| Guide | Slug / route | Owns |
| --- | --- | --- |
| What IVF is: a UK guide | `/articles/what-ivf-is-uk-guide` | Definition, context, orientation |
| NHS IVF funding and eligibility | `/articles/nhs-ivf-funding-and-eligibility` | Access and funding variation |
| OHSS and IVF treatment side effects | `/articles/ohss-and-ivf-side-effects` | Treatment-effect safety |
| When an IVF cycle doesn't work | `/articles/when-an-ivf-cycle-does-not-work` | After an unsuccessful result, next steps |

Phase 34A gap register rows 1, 2, 12 and 15 — all four recorded as "New article on the IVF hub". No slug in the register, so the slugs above are chosen and will be documented. Slug collisions checked before writing. No aliases, no redirects.

Ownership guarded: the existing IVF timeline guide keeps the step-by-step sequence, the emotional-impact guide keeps the emotional experience across treatment, and `/ivf/after-transfer` keeps the wait after transfer. New guides link to them rather than repeating them.

## Content boundaries

- Funding guide: NICE recommendations and NHS access described as varying locally; no invented age limits, cycle numbers, BMI, residency, relationship or previous-child criteria; no promise that anyone qualifies.
- OHSS guide: calm, non-diagnostic; escalation wording only from HFEA/NHS; no medication instruction, no numerical thresholds beyond what sources support.
- Unsuccessful-cycle guide: compassionate, non-blaming; no success promises, no universal waiting periods, not a recurrent-implantation-failure guide.

## Sources

HFEA first, then NHS, then NICE; Fertility Network UK and BICA only for emotional support context. Every URL checked live before it is recorded. Titles, publisher and URL stored; years only where genuinely published. Visitor-facing citations stay visible plain text with zero clickable anchors (Phase 33.4).

## Imagery

Twelve new images generated in-house: one hero and two in-article images per guide, in the existing premium editorial style — calm, warm, realistic, UK-appropriate, no text in image, no branding. OHSS uses clinic, medication-preparation and calm-home contexts, never anything that reads as diagnostic. The unsuccessful-cycle guide uses restrained, sensitive imagery, no devastation clichés. Existing hero and section image fields are reused; no new image system.

## Discovery and links

- One new hub section on `/ivf` listing the four guides — exactly one normal-discovery placement each, zero duplicates. No new stage pages, no new topic architecture.
- Contextual links only where they help: what-IVF-is → timeline; timeline → OHSS; funding → moving from TTC to IVF; after-transfer → unsuccessful cycle; unsuccessful cycle → emotional impact of IVF. Reported separately from discovery.

## Review and publication holds

Classifications inherited from the audit: health review required for what-IVF-is, funding and unsuccessful-cycle; safety review required for OHSS (and escalated if anything else warrants it). Human reviews completed = 0, so no reviewer name, no review badge, no machine-readable reviewer data on any of the four. Preview only; the production deployment block stays in place.

## Technical notes

- Records added to `src/data/articleData.ts` in the existing flagship shape (quick answer, editorial sections, key takeaways, structured sources, hero). No new renderer. Inventory rows added to `src/data/articleInventory.ts`.
- Four default-deny rows added to `src/lib/grounding/articleGroundingRegistry.ts` (`editorialStatus: "draft"`, `approvalStatus: "blocked_draft"`, not archived, not deprecated, no approval metadata) so the drift guard passes. Registry currently 226 rows; actual before/after reported. Grounding runtime, eligibility, routing version and AI code untouched.
- Sitemap regenerated through the existing script (currently 350 URLs; expect 354, actual reported, duplicates checked).
- New test file `src/test/phase34cIvfNewArticles.test.ts` covering: four records and routes, no slug collisions, ownership boundaries, one discovery placement each, contextual links resolve, structured sources with URLs, zero clickable citations, three or more images per guide, zero reviewer claims and zero reviewer structured data, grounding eligibility still empty, routing version unchanged, saved lifecycles still ttc, pregnancy, first_year.
- Validation: focused tests, grounding drift and approval tests, full suite, typecheck twice, lint against baseline, production build, sitemap and route/link checks. Desktop, tablet and mobile QA on all four guides plus the hub.
- Documentation: `phase34c-ivf-new-article-batch.md`, `phase34c-ivf-evidence-pack.md`, `phase34c-ivf-frontend-report.md`, plus status annotations on the Phase 34A rows (historical counts untouched).

## Not in this phase

IVF versus ICSI, embryo development, fresh versus frozen transfer, the clinic-questions checklist, and deeper `/ivf/before-transfer` expansion all stay on hold. No schema, auth, AI, journal, memory or voice changes. No deployment.
