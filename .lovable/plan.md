# AIC-5D — Final Deno typecheck debt fix

## Confirmed root cause

`DENO_DIR=/tmp/denodir deno check --no-lock supabase/functions/ai-search/index.ts` reports exactly one error, TS2322 at line 642 (the streaming `new Response(...)` headers object).

At line 503:

```ts
const conversationHeader = conversation ? { "X-Conversation-Id": conversation.conversationId } : {};
```

TypeScript widens the ternary to a union whose second branch is inferred as `{ "X-Conversation-Id"?: undefined }`. When spread into the response headers object, the resulting union member carries an optional-undefined property, which is not assignable to `Record<string, string>` / `HeadersInit`.

## Fix

Annotate the conditional header map as a plain string record so the absent case is an empty record rather than a record with an optional-undefined key:

```ts
const conversationHeader: Record<string, string> = conversation
  ? { "X-Conversation-Id": conversation.conversationId }
  : {};
```

This is type-only, matches the existing `const headers: Record<string, string>` pattern at line 52, and uses no `as any`, `@ts-ignore`, or non-null assertion. Runtime output is byte-identical: header present with the same value when a conversation exists, absent otherwise. `X-Companion-Boundary`, `X-Companion-Clarification-Topic`, `Access-Control-Expose-Headers`, status codes, body and streaming are untouched.

## Validation sequence

1. `DENO_DIR=/tmp/denodir deno check --no-lock supabase/functions/ai-search/index.ts` → must be 0 errors. If a different genuine error surfaces, stop and report.
2. Remove `tsconfig.app.tsbuildinfo` / `tsconfig.node.tsbuildinfo` where present, then `npm run typecheck` twice → PASS both.
3. `npm test` → reconcile against the 86 files / 929 tests baseline.
4. Check whether endpoint tests already assert both the present and absent `X-Conversation-Id` cases; add the smallest focused assertion only if that exact behaviour is uncovered. No existing test weakened.
5. `npm run lint` (baseline only: 1 generated-file `prefer-const` error, 10 react-refresh warnings) and `npm run build` → PASS.

## Deployment and closure

- Deploy `ai-search` only, after all validation passes.
- Minimal smoke: ordinary query streams normally, clarification boundary unchanged, RED deterministic safety unchanged.
- `AI_AMBER_CLASSIFIER_ENABLED` stays OFF; production AMBER classifier release remains GATED.
- Update the closure record in `roadmap.md` preserving the full history (18 false cross-runtime app errors → test import boundary corrected → clean app typecheck → Deno check exposed one genuine `HeadersInit` defect → type-only correction → both typechecks pass).
- Return only the 26-point final closure report. AIC-5E not started.
