# Phase 30D — Article Grounding Registry Drift Guard and Review Queue

Governance, QA and review planning only. No article becomes approved. No AI wiring, prompts, modes, safety rules, endpoint, source routing, answer rendering, Ask or companion UI, memory, voice, schema, RLS, auth, routes, SEO or sitemap changes. No AI version constant is bumped.

## Runtime guard

`src/lib/grounding/articleGroundingRegistry.ts` and `articleGroundingEligibility.ts` stay metadata-only and import no article dataset. Article datasets are imported only inside the new test file, never in runtime modules or edge functions.

## 1. Drift-guard tests — `src/test/articleGroundingDrift.test.ts` (new, test-only imports)

Builds the live slug set from the article datasets (`articleData.ts`, `familyArticleData.ts`, `firstYearArticleData.ts`, `toddlerArticleData.ts`) and compares it against the registry:

- every article slug has a registry record (no missing records)
- every registry slug maps to an existing article (no orphans)
- no duplicate registry slugs
- zero records with `approvalStatus: "approved"`
- `listGroundingEligibleSlugs()` returns `[]`
- unknown slug remains not approved
- registry and eligibility module sources import no `src/data/` dataset and no AI runtime module
- eligibility helper output carries slug plus reason codes only, no body text

Failure messages name the exact drifting slugs so a future article addition fails loudly rather than silently becoming invisible.

The existing `src/test/articleGrounding.test.ts` keeps its assertions; the source-routing and answer-hygiene suites stay untouched and must keep passing.

## 2. Review queue — `docs/ai/article-grounding-review-queue.md` (new)

Counts computed from the registry as it stands (206 records, zero approved):

1. total article count
2. count by journey
3. count by approval status
4. count by sensitivity level (all unassessed today)
5. draft/placeholder count
6. health or safety-sensitive count (unassessed, so treated as unknown and blocked)
7. articles missing owner
8. articles missing content version
9. articles missing reviewer
10. articles missing reviewed date
11. articles missing source list where needed
12. suggested review order

Review order: low-risk brand/navigation/product guidance, then low-risk general education, then wellbeing, then health-reviewed, then safety-sensitive. Anything assessed `not_allowed` stays permanently blocked.

The document also states the exit criteria for moving a single article from blocked to candidate, and from candidate to approved, in a later gated phase.

## 3. Per-article review template — `docs/ai/article-grounding-review-template.md` (new)

Fields: slug, title, journey, topics, proposed sensitivity level, content owner, reviewer, reviewed date, source list checked, content version, archived/deprecated check, approval decision, approval notes, rollback or replacement reference, eval examples needed, final reviewer sign-off.

## 4. Docs updates

- `content-grounding-readiness.md` — drift guard and review queue recorded, articles still blocked
- `release-gate.md` — grounding gate stays closed; drift guard noted as satisfied
- `system-map.md` — drift test listed as a non-AI-path validation
- `roadmap.md` — 30D closed, next gated step is per-article review using the template
- `README.md` — contents and closed-phase list

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. The known generated-file lint issue in `src/integrations/supabase/previewAuthStorage.ts` is reported as pre-existing and left untouched.

## Report

The 19 requested items, ending with the Phase 30D close verdict.
