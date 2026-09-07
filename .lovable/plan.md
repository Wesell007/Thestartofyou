# AIC-J6 — Remediation and final closure pass

Audit accepted. Target: P0 = 0, P1 = 0, P2 = 0, P3 documented only. No deployment, no voice, no new features, no prompt/grounding/memory/history/schema/safety-logic changes.

## R1 — False-personalisation copy (3 items, copy only)

- `src/components/article/ArticleAISupport.tsx:25` — replace "Ask anything about this topic and get guidance tailored to your stage." with content-safe wording tied to the article, e.g. "Ask anything about this topic and get general guidance on what you are reading."
- `src/components/ivf/IVFAISupport.tsx:40` — "Ask about your stage" becomes "Ask about this stage". IVF stays content only; no lifecycle, no `in_treatment`, no `ivfInTreatment`.
- `src/pages/AskPage.tsx:1049` — generic tail heading "Continue your journey" becomes "Keep exploring".

No other copy touched. No component logic changes.

## R2 — Month 12 boundary (binding decision)

Saved personal First Year is **0–11 months**. Public `/first-year/12-months` remains a valid content route, untouched.

- `src/lib/companion/journeyNextActions.ts`: bound the personal month map to 0–11 (`MAX_MONTH = 11`, drop the 12 entry) so month 12 or any invalid value falls through to `Open My First Year` → `/my-first-year`.
- No `JourneyContextV1` schema change, no J2 range change, no J3 band change.
- Update `docs/ai/companion-journey-next-actions.md` to state the personal 0–11 versus content-may-include-12 distinction explicitly.

## R3 — Missing composition coverage (new tests)

1. **Month 12 / boundary** — month 11 gives the normal month action; month 12 and invalid values give the fallback only; `/first-year/12-months` stays a valid content route; content month 12 produces zero personal inference; no new J3 band.
2. **Eligibility → runtime → UI** — drive the real `useAISearch` → `useCompanionConversation` → `CompanionNextActions` path with a mocked response boundary: `allow` + completed renders actions; `suppress` + completed renders none; `allow` + failed/aborted/incomplete renders none.
3. **Sign-out mid-answer** — personal state clears, no signed-in personal action leaks onto the completing answer, no crash, no history rewrite; fails closed.
4. **Journey transition during stream** — saved TTC streaming, authoritative switch to Pregnancy before completion: zero stale TTC actions, no Pregnancy action attached to the old answer, the next eligible Pregnancy answer may show them.
5. **Mobile structural invariants** — action row wraps, no nested interactive controls, min touch target class retained, DOM order of Next steps / composer, panel scroll container intact. Documented as structural only, not visual proof.

## R4 — Runtime UX verification (Playwright, read-only inspection)

Panel and `/ask` at ~390px and ~1440px, across TTC, Pregnancy with a known week, and First Year with a known month. Inspect starter chips, answer body, Next steps row, composer, launcher, bottom nav, scrolling, wrapping, spacing, duplicated controls, clipping, whitespace. Explicit check: Next steps + composer + bottom nav + launcher do not collide on mobile.

Genuine P2 layout defect → minimal fix plus regression coverage. Architectural or safety defect → stop and report before expanding scope.

## P3 and documentation

- The duplicate suppress-header assignment in `ai-search` stays as documented accepted debt. No safety-path edit.
- Release docs corrected: controlled and safety paths deliberately return `suppress`; a missing header is client backward compatibility only.
- Release order stays backend first, with the seven-step verification sequence recorded. Rollback compatible both directions.
- Roadmap updated with J6 remediation state.

## Validation gate

`npm test` (all pass, 0 timeouts), typecheck twice, `DENO_DIR=/tmp/denodir deno check --no-lock supabase/functions/ai-search/index.ts`, `npm run lint` (exactly the 1 pre-existing error and 10 pre-existing warnings, 0 new), `npm run build`. Baseline to reconcile: 100 files / 1153 tests. Exact test arithmetic reported.

Then the full 75-point closure report. No deployment, no voice.
