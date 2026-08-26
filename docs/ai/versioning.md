# AI versioning

Phase 29E. Companion to `system-map.md` and `release-gate.md`.

The point of these constants is that when someone asks "why did the companion say that in March?", the answer is recoverable. Every answer is produced by a specific model, a specific composed prompt and a specific safety ruleset, and those three things change independently.

## The constants

All of them live in `supabase/functions/_shared/aiVersions.ts` and nowhere else.

| Constant | Meaning | Bump when |
| --- | --- | --- |
| `AI_MODEL_ID` | The gateway model the endpoint calls | The model changes |
| `AI_PROMPT_VERSION` | Version of the composed prompt registry | Any wording, block, block order or word limit changes in `aiModes.ts` |
| `AI_SAFETY_RULESET_VERSION` | Version of the code-level safety rules | `URGENT_PATTERN`, the escalation answers, the kill switch or the banned-verdict list changes |
| `AI_SOURCE_ROUTING_VERSION` | Version of keyword-to-source routing | `APPROVED_SOURCES` or the routing rules in `aiSources.ts` change |
| `AI_EVAL_DATASET_VERSION` | The eval set the current behaviour was checked against | Prompts are added, removed or re-graded in `eval-dataset-v1.json` |
| `AI_PHASE` | The phase marker shipped with this behaviour | A phase closes |

`AI_VERSION_SUMMARY` bundles all six. `ai-search` logs it once per cold start. It is server-side only: version data is never sent to the browser and never appears in an answer.

## Format

`major.minor`, as a string. Minor for wording, tone and additive rules that do not change what the system will refuse. Major for anything that changes refusal, escalation or grounding behaviour — a major bump means the eval set must be re-run and the release gate re-signed.

## Prompt fingerprints

`getPromptFingerprint(mode)` hashes the composed prompt for a mode. `src/test/aiPromptRegistry.test.ts` pins the current value for all five modes, so an accidental prompt edit fails CI.

When the change is deliberate:

1. Make the prompt edit in `aiModes.ts`.
2. Run the suite and read the new fingerprint from the failure.
3. Update the recorded fingerprint in the test.
4. Bump `AI_PROMPT_VERSION` in the same commit.
5. Re-run `src/test/aiSafetyHarness.test.ts` and confirm it is still green.

Never update a fingerprint on its own to make a test pass. A fingerprint change without a version bump is the exact drift these tests exist to catch.

## Wording that must not be duplicated

`SAFE_FALLBACK_ANSWER` and `DAY_RECAP_UNAVAILABLE_ANSWER` live in `supabase/functions/_shared/aiAnswerWording.ts`. Both the prompts and the client sanitiser import from there. Do not retype either line into a component, a prompt or a test fixture — a near-copy that drifts by one word means the model is told to say one thing while the client checks for another.
