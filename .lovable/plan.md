# AIC-5E — Emotional Continuity (BUILD)

Architecture B approved: deterministic explicit-emotion evidence + fixed trusted tone guidance. No model call, no persistence, no client change. Approve this card to unlock build mode; it is the approved spec, not a new planning pass.

## New files

**`supabase/functions/_shared/emotionalEvidence.ts`** — pure, no IO/logging.
- `EmotionCategory = "fear" | "overwhelm" | "low" | "self_blame" | "frustration" | "positive"`.
- `EmotionalEvidence = { kind: "none" } | { kind: "explicit"; categories: EmotionCategory[] /* max 2 */; source: "current" | "recent_user"; continuity: "new" | "continued" | "changed"; direction?: "eased" | "increased"; repeatedFromPrevious: boolean }`. No score, confidence, severity or raw matched phrase.
- Match requires user-owned experiencer: first-person self-report frame (`I'm / I am / I feel / I've been / I keep / I can't stop / I still feel` + emotion word) or precise ellipsis (`Feeling overwhelmed.`, `Terrified.`, `So relieved.`) with no third-party subject and no definitional frame.
- Object of concern is irrelevant: "I'm worried about my baby" → `fear`. Experiencer-owned exclusions: "My baby seems worried", "My partner is anxious", "My friend is terrified" → `none`. Hypothetical/definitional frames (`what should a worried parent…`, `signs of anxiety`, `is feeling nervous common`, `why do people feel guilty`) → `none`. Precision over recall.
- Change wording: `still` → `continued`; `less worried / calmer now / feeling better` → `changed` + `eased`; `even more scared` → `changed` + `increased`.
- History: last 2 **user** turns only, reused only when the current turn has no explicit emotion AND carries a narrow deterministic continuation signal (`what do i do next`, `what should i do about it`, `i still don't know what to do`, `what about now`, `does that change anything`, `it's still on my mind`). Assistant turns never establish evidence. No similarity, no embeddings, no extra history load.

**`supabase/functions/_shared/emotionalGuidance.ts`** — fixed trusted strings per category and continuity state; no user text ever interpolated. Opens with a precedence line: this block never alters, delays, softens or removes safety requirements, required professional-contact routes, escalation wording, factual standards or grounding. Per category: fear (brief acknowledgement, answer the question, no catastrophising, no "don't worry", no false reassurance); overwhelm (one clear first step, prioritised actions, fewer parallel optional recommendations, never strip safety content or caveats); low (brief warm acknowledgement, no forced positivity, no diagnosis, still answer); self_blame (no blame or moral judgement, no automatic "it's not your fault", no responsibility claims); frustration (clear, direct, non-defensive, no shortening rule, no aggression inference); positive (light reflection, no medical certainty, no outcome/pregnancy/fertility verdict). Continuity variants: carried context → "do not reopen with another generic acknowledgement, continue naturally"; explicit restatement → short persistence acknowledgement allowed; explicit change → acknowledge the change briefly.

## Modified

**`supabase/functions/ai-search/index.ts`** — after the AIC-5D safety-guidance block, on the model path only: resolve evidence from `query` + prior **user** turns inside a try/catch (throw → `none`), append the fixed guidance block after safety guidance and above mode/journey/context. Not injected into RED/CRISIS, clarification or UNSUPPORTED branches — those return before this point and stay byte-identical. No new headers, no logging, no persistence.

## Tests (new `src/test/emotionalEvidence.test.ts`, plus endpoint assertions)

Detector: six categories; mixed ("excited but terrified", "relieved but still worried" → positive + fear); "I'm worried about my baby" → fear; third-party experiencer → none; generic/hypothetical → none; ellipsis cases. Change: calmer-now overrides earlier terror; "even more worried" → increased; "still overwhelmed" → continued. History: hospital-bag turn does not carry earlier fear; "what should I do next?" may carry overwhelm; assistant "you sound worried" establishes nothing. Anti-repetition guidance variants. Safety: RED, CRISIS, clarify and unsupported responses unchanged and no emotional block injected; AMBER guidance still present alongside fear guidance; AMBER eligibility, classifier call count and schema unchanged. Zero-profiling assertions: no DB write, no memory write, no conversation metadata, no client header/state, no analytics, no logging. Eval dataset gains the listed fixtures without weakening existing cases.

## Docs

`docs/ai/companion-safety-emotional-continuity.md` (implemented design + evidence boundary), `docs/ai/companion-architecture.md` (one pipeline line, safety first), `docs/ai/adr/ADR-AIC5-proposals.md` (ADR-AIC5-07 → ACCEPTED (AIC-5E) only after validation passes), `roadmap.md` after validation.

## Validation and deployment

Focused tests → `npm test` → `npm run lint` (baseline only) → clear tsbuildinfo → `npm run typecheck` twice → `npm run build` → `DENO_DIR=/tmp/denodir deno check --no-lock supabase/functions/ai-search/index.ts`. Deploy `ai-search` only, no migration. Smoke: neutral, fear, overwhelm, positive, RED, CRISIS, clarify, unsupported. Frozen: AMBER classifier OFF, grounding `30B-source-routing-v1`, memory and persistent history OFF, DB migrations 0, UI changes 0. Stop after the completion report; AIC-5F and AIC-6 not started.
