# Phase 15.4B Live QA Pass — results and one blocking fix

## Live QA result

Signed-in, active journey, week 37, companion name "Cindy", tone "warm".

Confirmed working:
- Inline companion card renders in the existing SectionAskAI position on /my-week.
- Companion name appears only in UI copy (eyebrow and heading), never in the request.
- Three prompt chips render; clicking a chip submits the question.
- Typing a custom question submits correctly.
- Inline loading state appears ("Finding a quiet answer…").
- "Ask something else" fully resets the card (answer cleared, input cleared).
- "Continue in Ask" routes to /ask?stage=pregnancy; the question and context arrive through router state, with no question or private context in the URL.
- Mobile (390px) renders the card correctly, no console errors on load.
- Desktop (1280px) renders correctly, no console errors on load.

Not confirmable in this pass:
- Streamed answers. Every ai-search call returned 503 (see defect below), so no answer body, no collapsed Sources block, and no chip/typed streaming could be observed.

## Request privacy: confirmed

Exact captured request bodies:

```text
{"query":"What should I remember about this week?","context":"Pregnancy week 37, third trimester. Due date around 25 August. Prefers warm, gentle wording. The person is reading their personal My Week pregnancy page."}
{"query":"Is mild backache normal now?","context":"Pregnancy week 37, third trimester. Due date around 25 August. Prefers warm, gentle wording. The person is reading their personal My Week pregnancy page."}
```

Present: question, week, trimester, due day and month, tone hint, My Week page hint.
Absent: first name, companion name, reflections, photos, videos, voice notes, memory flags, media URLs, journey history, due year.

## Error behaviour

- 503 was live-triggered (unintentionally, see defect). Behaviour was correct: the typed question stayed in the input, the calm retry message rendered, layout held, nothing was lost. The only console entries were the expected 503 resource errors.
- 429 was not live-triggered; the code path in useAISearch and ai-search was reviewed and reports the rate-limit message the same way. Code-verified only.
- Network failure shares the same catch branch as 503; code-verified only.

## Non-active gating: confirmed by code

MyWeek returns early for any status other than "active" and never renders SectionAskAI, so pregnancy loss, paused, no longer pregnant and given birth all hide the companion. Only "active" reaches the card. No data was written to force statuses.

## Defect found (blocking, pre-existing, site-wide)

AI guidance is currently down everywhere, not just in the companion card. The edge function logs show:

```text
ERROR ai-search rate limiter unavailable Rate limiter returned 404
```

Cause, verified against the live database: the migration `supabase/migrations/20260720110000_backend_safety_and_email_delivery.sql` was never applied. `public.ai_rate_limits` and `public.consume_ai_rate_limit` do not exist (`to_regclass` returns null, `pg_proc` has no match), so ai-search fails its rate-limit check and returns 503 on every request. This also takes out /ask and the email delivery infrastructure created in the same migration.

This is outside the QA-only scope, so nothing was changed.

## Proposed fix (needs approval)

1. Re-apply the missing backend objects as a new forward-only migration, copying the definitions verbatim from `20260720110000_backend_safety_and_email_delivery.sql`: the `ai_rate_limits` table with its RLS and revokes, and the `consume_ai_rate_limit` function with its `service_role` grant. Decide separately whether to also restore the email-delivery half of that migration or split it into its own step.
2. Re-run the same live QA script to confirm chip and typed questions stream, the answer renders inside the card, and the Sources block appears collapsed.
3. Then close Phase 15.4B.

No prompt changes, no new AI functions, no RLS relaxation, no route, analytics or memory work.

## Command results

```text
npx tsgo --noEmit -p tsconfig.json
Exit code: 0 (no output)

npx vitest run src/lib/companionContext.test.ts
✓ src/lib/companionContext.test.ts (8 tests) 30ms
Test Files  1 passed (1)
     Tests  8 passed (8)
```

## Can Phase 15.4B be closed?

Not yet. Everything owned by 15.4B passes, but end-to-end streaming cannot be demonstrated until the missing rate-limiter migration is restored.
