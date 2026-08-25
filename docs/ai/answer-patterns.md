# Approved and banned answer patterns

## 1. Banned user-facing phrases

Status key: **code** = already removed or prevented by code; **prompt** = banned in the mode prompts; **doc** = documentation-only for now, candidate for a test in Phase 29D.

### Retrieval and plumbing wording

| Banned | Status |
| --- | --- |
| "provided NHS evidence" | code (`aiAnswerSafety.ts`) + prompt |
| "provided evidence", "supplied evidence", "retrieved evidence" | code + prompt |
| "not covered in the evidence", "not covered by the provided sources" | code + prompt |
| "based on the context provided", "the context provided", "provided context" | code + prompt |
| "source material", "reference material", "documents provided", "snippets" | code + prompt |
| "I cannot provide specific information on this topic because…" | code + prompt |
| A "Sources", "References" or "Further reading" section | code (`answerSourceLinks.ts`) + prompt |
| Any URL, link or domain in an answer | code + prompt |

### Verdict and certainty wording

| Banned | Status |
| --- | --- |
| "safe" / "unsafe" (as a verdict about a person's situation) | doc |
| "normal" / "abnormal" | prompt (pregnancy mode explicit) + doc |
| "low risk" / "high risk" | doc |
| "everything is okay" | doc |
| "your baby is fine" | doc |
| "no need to call", "no need to worry", "nothing to worry about" | doc |
| "it can wait until morning" | doc |
| "definitely", "certainly", "guaranteed" about an outcome | prompt + doc |

### Claim and scoring wording

| Banned | Status |
| --- | --- |
| "confirmed pregnancy", "you are pregnant", "you are not pregnant" | prompt (TTC explicit) + doc |
| "confirmed ovulation", "you have ovulated" | prompt (TTC explicit) + doc |
| "fertility score", "risk score", any percentage chance for the individual | doc |
| "diagnosis", "diagnosed", "you have <condition>" | prompt + doc |
| "symptom checker" | doc — also banned in product and marketing copy |
| "medically reviewed by…" inside an AI answer | prompt |
| Invented statistics, citations, reviewer names or review dates | prompt |

## 2. Approved alternatives

| Instead of | Use |
| --- | --- |
| "normal" | "common", "many people notice this", "this can happen", "worth asking about if it worries you" |
| "abnormal" | "less common", "worth getting checked" |
| "safe" | "usually recommended", "commonly advised", "best checked with your midwife, GP or health visitor" |
| "unsafe" | "usually advised against", "worth asking your midwife or GP about before you do it" |
| "your baby is fine" | "many causes are not serious, but it is still worth getting checked if you are concerned" |
| "everything is okay" | "what you are describing is something many people experience, and it can still be worth mentioning" |
| "no need to call" | "if you are unsure, calling is always reasonable" |
| "low risk" | "less commonly a sign of a problem, though only an assessment can tell you" |
| "you are pregnant" | "only a test and then your GP or midwife can tell you that" |
| "you have ovulated" | "cycle dates and fertile windows are estimates, not confirmation" |
| "your chances are X%" | "this is not something I can work out for you; a fertility clinician can talk through your own situation" |
| "take X mg of…" | "your pharmacist, midwife or GP can tell you what is right for you and how much" |
| "wait and see" | "contact your maternity unit now, day or night" (for any red flag) |
| "it is probably nothing" | "there are several common explanations, and getting it checked is the way to know" |

## 3. Structural rules

- Answers begin with a direct response, then use only the relevant sections of "What this means", "What may help", "When to seek support". Absent sections are never padded.
- For Red and Crisis categories, escalation comes first, before any explanation.
- Word limits per mode: general 350, pregnancy 320, first year 300, TTC 300, day recap 80 to 140.
- British English throughout. No em dashes.
- Never address the person by name, and never claim to remember a previous conversation.
- Never refer to the companion as a doctor, midwife, clinician, expert or reviewer. Where the companion has a chosen name, it stays a companion name, never a clinical title.

## 4. Enforcement layers

1. Prompt rules in `supabase/functions/_shared/aiModes.ts`.
2. Hard escalation short-circuit in `supabase/functions/ai-search/index.ts`.
3. Client sanitiser `src/lib/aiAnswerSafety.ts` and link stripper `src/lib/answerSourceLinks.ts`.
4. Rendering: `EditorialAnswer` renders links as plain text.
5. Tests: `src/lib/aiAnswerSafety.test.ts`, `src/test/aiModes.test.ts`, `src/lib/askTrustCopy.test.ts`.

The verdict and scoring bans currently sit at layer 1 only. Moving the highest-risk ones ("your baby is fine", "no need to call", "everything is okay", "risk score", "fertility score", "symptom checker") into layer 3 with tests is a Phase 29D task, with care not to break legitimate wording such as "many causes are not serious".
