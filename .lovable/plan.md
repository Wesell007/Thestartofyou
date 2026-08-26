# Phase 30B — External Source Routing Coverage Upgrade

Widen the existing static NHS source routing so routine postpartum recovery, weaning and toddler questions get grounded on relevant NHS pages instead of falling through to the two generic pregnancy pages. No retrieval, no embeddings, no article grounding, no prompt/mode/safety/UI changes.

## What changes for users

Questions like "what can help my body recover after birth", "what happens at the 6-week check", "when is my baby ready for solids", "what foods should I avoid giving my baby", "how do I help my toddler with first words" and "simple play ideas for a toddler" will be answered against relevant NHS guidance rather than generic pregnancy pages. Answers keep the same calm tone, still show no URLs, no source blocks and no retrieval wording.

## Scope of edits

- `supabase/functions/_shared/aiSources.ts` — new allowlist entries and new ordered route groups.
- `supabase/functions/_shared/aiVersions.ts` — bump source routing version and phase, update summary.
- `src/lib/aiAnswerSafety.test.ts` (or a new `src/test/aiSourceRouting.test.ts` if the existing table grows unwieldy) — deterministic routing tests.
- `docs/ai/content-grounding-readiness.md`, `docs/ai/system-map.md`, `docs/ai/release-gate.md`, `docs/ai/roadmap.md`, `docs/ai/README.md`.

Nothing else. No schema, RLS, routes, SEO, sitemap, prompts, modes, safety patterns, rendering or UI.

## Candidate NHS sources (each verified before inclusion)

Postpartum recovery: NHS "your body after the birth" / keeping fit and healthy sections, and the postnatal (6-week) check page.
Weaning: NHS Start for Life / NHS "weaning and feeding" first-solid-foods page, plus foods to avoid giving babies and young children, and drinks and cups where it holds distinct content.
Toddler: NHS Start for Life early-learning / "first words and little sentences" page and a toddler play-and-activity page.

Verification per URL before it is added: resolves 200, not a PDF, has real main-page content, and survives the existing main-text extraction without being discarded as thin (<200 chars). Any candidate that fails is dropped and recorded in the report. Per-request cap stays at three URLs. URLs remain server-side only.

## Routing logic

Keep the architecture exactly: ordered regex topics, first match wins, family hub appended, cap of three, unchanged live fetch, unchanged 10,000-character cap, unchanged fetch-failure behaviour. Add a `postpartum` family (hub = the NHS postpartum/baby hub already approved) so hub-append behaviour stays coherent, or reuse the baby family if the postpartum hub is not distinct — decided during implementation from the verified pages.

New groups, ordered to avoid theft:

1. Postnatal check (narrow: `postnatal check`, `6[- ]week check`, `six[- ]week check`) placed above the existing appointment route so it is not swallowed by `check[- ]?up`.
2. Postpartum recovery (`after (the )?birth`, `postnatal|postpartum`, `stitches`, `perineum|perineal`, `pelvic floor`, `piles|haemorrhoid`, `c[- ]?section (recovery|scar)`, `lochia`) placed above the generic `bleed|cramp|pain` route so maternal recovery pain is not read as pregnancy bleeding.
3. Weaning and solids (`wean`, `solid food`, `first foods`, `purée|puree`, `baby[- ]?led`, `highchair`) placed above the generic feeding route.
4. Foods to avoid / food safety (`foods? to avoid`, `honey`, `choking hazard`, `salt|sugar for (my )?baby`, `unsafe food`) above weaning so it wins when it is the actual question.
5. Toddler speech and early learning (`first words`, `talking|speech|babbl`, `little sentences`, `early learning`) gated on toddler/child wording, placed above baby feeding and sleep so toddler speech is not swallowed.
6. Toddler play and activities (`play ideas`, `activities`, `bonding`, `games`) similarly gated.

Collision handling to be asserted by test:

- The safety/mental-health route is narrowed so bare `anxious|anxiety` does not outrank movements: movement wording plus incidental anxiety routes to movements; dominant mental-health wording (worthless, can't cope, depression, panic attacks, self-harm) still routes to the mental-health page. Hard escalation and the safety ruleset are untouched — this only affects which evidence page is fetched.
- Maternal pain while breastfeeding routes to postpartum recovery, not feeding-only.
- Toddler speech does not route to baby feeding or sleep.
- Brand/product/navigation questions (app, account, subscription, journal, this site) route to the generic default rather than a narrow clinical page, so grounding is never misleading. No empty source list is ever returned, keeping endpoint fetch-failure behaviour unchanged.

## Versioning

Bump `AI_SOURCE_ROUTING_VERSION` to `30B-source-routing-v1`, set `AI_PHASE` to `30B`, and update `AI_VERSION_SUMMARY` through those constants. Prompt, model, safety-ruleset, context-contract and eval-dataset versions unchanged. `aiVersions.test.ts` updated only where it pins those two strings.

## Tests

Deterministic `selectSources` assertions for each new group, plus regression assertions that movements, TTC testing, infant feeding and infant sleep still route as before, brand questions get no narrow clinical page, unknown questions still hit the existing default pair, the cap is three, and the hub-append rule still holds. Existing output-hygiene assertions (no URLs, no source blocks, no retrieval wording) are re-run unchanged. The JSON eval dataset is not modified.

## Manual check

Exercise the six sample questions against the AI flow where the local environment allows, confirming useful calm answers with no retrieval wording, no source blocks, no raw URLs, no certainty or diagnosis wording, and unchanged urgent escalation.

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. The known generated-file lint issue in `src/integrations/supabase/previewAuthStorage.ts` is reported as pre-existing and left untouched.

## Docs

Record the sources added, routes added, version bump, coverage gained, collision decisions, remaining gaps (loss, domestic abuse, complex perinatal mental health, brand answers — all deferred to safety-reviewed phases) and the standing reason Start of You article grounding remains blocked: articles still lack sensitivity level, content version, owner, archive state and per-article grounding approval.
