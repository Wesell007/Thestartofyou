# AIC-R1 — Journey AI production release record

Release date: 2026-09-07 (UTC).

## Revisions and rollback

| Item | Value |
| --- | --- |
| Validated release revision | `e35d39a0` |
| Backend deployed | `supabase/functions/ai-search` (deployed from `e35d39a0`) |
| Backend rollback target | previous `ai-search` deployment / commit `c2d4264b` |
| Frontend published | `thestartofyou.com`, published from HEAD `3f2c272f` |
| Frontend/validated delta | merge commit only; sole content change is the archival rename of the release plan document |
| Frontend rollback target | previously published build (pre-`3f2c272f`) |
| Backend verification | pre- and post-deploy header/contract probes, live browser CORS read |
| Frontend verification | production browser smoke at 390px and 1440px |

## Runtime checks performed in production

Site health: homepage 200 and rendered, navigation present, companion launcher
present once consent is answered, `/ask` 200, live `ai-search` requests
returning 200, no console errors, no horizontal overflow, `Access-Control-Expose-Headers`
intact.

Surfaces: exactly two companion answer surfaces — the global panel and `/ask`.
Repository scan confirms one runtime (`useCompanionConversation` →
`useAISearch`), consumed only by `CompanionProvider` and `AskPage`.

J5 lifecycle: sampled streaming showed next actions appearing only after the
answer text stopped growing; a new accepted turn cleared previous actions
immediately; suppressed responses ended with zero actions.

Saved journeys (pre-existing QA accounts on `@example.com`, read-only, no data
created or altered):

- TTC: one action, `Open My TTC Journey` → `/my-ttc-journey`. No calculator,
  IVF or fertility recommendation added.
- Pregnancy (saved week 36): `View My Week` → `/my-week` and
  `Read week 36 guidance` → `/pregnancy/week/36`. Asked from the public
  `/pregnancy/week/20` page, personal authority held at week 36; content
  context produced zero personal inference.
- First Year (saved age 4 months): `Open Today` → `/my-first-year/today` and
  `Read month 4 guidance` → `/first-year/4-months`. `/first-year/12-months`
  remains reachable public content.

Signed out / unknown: zero personal actions; no fabricated lifecycle wording;
contextual Ask still usable.

Safety composition in the browser: RED, CRISIS, clarification and unsupported
responses each rendered zero ordinary next actions and exposed no safety
reason, category, score or rule.

Parity: the same saved state resolved identical action IDs, labels,
destinations and order on both the panel and `/ask`; presentation differs only.

Layout: 390px — next steps sit above the composer with no collision with the
composer, bottom navigation or launcher, no clipping, no horizontal overflow,
tap targets remain usable. 1440px — no material regression.

Observability: `ai-search` logs show clean boots and the frozen version banner
(`prompt 29E-prompt-v1`, `safety 29D-safety-v1`,
`sourceRouting 30B-source-routing-v1`) with no errors after publish.

## NOT RUNTIME-VERIFIED

- Personal First Year month 12 fallback (no safe QA baby at that age); covered
  by engineering tests and the 0–11 registry bound.
- AMBER path and kill-switch branch (both intentionally OFF/not toggled).

## Unchanged state

Memory OFF/gated, persistent history OFF/gated (zero conversation rows written
during release verification), AMBER OFF/gated, kill switch untouched, grounding
parked at `30B-source-routing-v1`, voice OFF and paused at AIC-7B. No schema,
RLS, secrets, analytics, persistence, prompt or grounding change. No customer
records modified; no production writes performed for QA.
