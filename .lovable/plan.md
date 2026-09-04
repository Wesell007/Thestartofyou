# Typecheck Baseline Restoration (AIC-5D closure blocker)

Validation tooling only. No production runtime, safety, classifier, prompt, flag, grounding, memory, history, UI or database change.

## Root cause (confirmed by read-only audit)

- `npm run typecheck` runs `tsc -b --pretty false`, building `tsconfig.app.json` (includes `src` only) and `tsconfig.node.json`.
- Three endpoint tests already avoid dragging the Deno edge function into the browser TypeScript project by importing it through a **non-literal** specifier:
  `src/test/aiSearchEndpoint.test.ts`, `aiSearchSafetyRouting.test.ts`, `aiSearchBoundaryRouting.test.ts` all use
  `const endpointModule = "../../supabase/functions/ai-search/index.ts"; await import(/* @vite-ignore */ endpointModule);`
  with an explicit comment stating why.
- The AIC-5D test `src/test/aiSearchAmberRouting.test.ts:71` breaks that convention with a **static literal** dynamic import, so `tsc` pulls `supabase/functions/ai-search/index.ts` into the browser project graph.
- All 18 errors come from that single inclusion:
  - 1 x TS2307 — remote `https://deno.land/std@0.168.0/http/server.ts` import (resolved by Deno, not by browser tsc).
  - 14 x TS2304 — `Cannot find name 'Deno'` (Deno globals absent from the browser lib set).
  - 3 x TS2339 — `parsed.error`, `setup.status`, `setup.error`. The unions are correctly discriminated (`{ ok: true; ... } | { ok: false; ... }`); narrowing fails only because `tsconfig.app.json` sets `strict: false` / `strictNullChecks: false`, under which boolean-discriminant narrowing is not applied. The edge function's real Deno environment is strict, so these are environment artifacts, not production typing defects.
- `src/test/aiVersions.test.ts` imports the same file with `?raw`, which is source-text only and does not add it to the type graph.

## Fix

Change one line of test code so it matches the existing, documented repository convention:

- `src/test/aiSearchAmberRouting.test.ts` — replace the static-literal dynamic import with the non-literal `endpointModule` pattern plus the same explanatory comment.

The test still imports and executes the real shipped `ai-search/index.ts` under Vitest through the existing Vite alias for the Deno `serve` stub. No mock substitution, no weakened assertions, no lost AIC-5A / AIC-5C / AIC-5D coverage.

No production file is touched. If any genuine production typing defect surfaces, work stops and it is reported rather than fixed here.

## Validation

1. Delete `tsconfig.app.tsbuildinfo` and `tsconfig.node.tsbuildinfo` (the only TypeScript incremental caches; nothing else removed).
2. `npm run typecheck` twice — both must PASS from clean state.
3. `npm test` — expect 86 files / 929 tests, all passing, no test lost.
4. `npm run lint` — known baseline only (1 generated-file `prefer-const` error, 10 react-refresh warnings), 0 new findings.
5. `npm run build` — PASS.
6. Edge-function check: the repository has no Deno/Supabase typecheck script (only `supabase/functions/process-email-queue/deno.json` exists; `ai-search` has none). If `deno check` is available it will be run read-only against `ai-search` and the result reported honestly; otherwise the absence is stated plainly. No deployment.

## Documentation

- `roadmap.md` / AIC-5D closure record: record that the original typecheck PASS was invalid due to a stale incremental cache, that the clean-cache run exposed 18 pre-existing errors owned by the Deno edge module, and that the repository validation boundary was corrected by restoring the non-literal test import convention. The historical finding is preserved, not erased.

## Closure

If all checks pass: AIC-5D ENGINEERING — CLOSED PASS; PRODUCTION AMBER CLASSIFIER RELEASE — GATED; `AI_AMBER_CLASSIFIER_ENABLED` — OFF; AIC-5E — SAFE TO BEGIN (not started).

Deliverable: the 29-point typecheck closure report only.
