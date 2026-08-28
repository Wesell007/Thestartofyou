# Phase 30K — Stage 2 Human-Review Checkpoint Forms

Status: forms only. No decision is recorded. Human-decision events = 0,
source-validation events = 0, registry changes = 0, candidates = 0,
approvals = 0, `listGroundingEligibleSlugs()` = `[]`,
`AI_SOURCE_ROUTING_VERSION` = `30B-source-routing-v1`.

Nothing below is decided by Lovable: no owner, no reviewer, no sensitivity
confirmation, no source-requirement judgement, no validation, no
`contentVersion`, no `reviewedDate`.

## Shared context for all five forms

Digest specification version: `30K-content-digest-v1` (full 64-hex SHA-256 over
slug, title, description, intro, sections, keyTakeaways; LF-normalised, no
trimming or whitespace collapsing).

Current registry status for all five: `blocked_missing_metadata`,
`editorialStatus: "live"`, `archived: false`, `deprecated: false`.

Current governance gaps (identical for all five): no content owner, no
grounding reviewer, unconfirmed sensitivity, no claim-attributability finding,
no source-evidence state, no source-validation event, no `contentVersion`, no
`reviewedDate`, no `approvalStatus` change, no `approvedBy` / `approvedAt`.

Current source position for all five: `hasSourceList: false`, zero recorded
source-evidence states, zero validation events. This is the absence of
evidence, not a finding that sources are unnecessary.

Claim-attributability checklist (applied to the exact digest content, per
article):

1. Does the text state a fact about health, development, safety or risk that a
   reader could act on?
2. Does it state frequencies, timings, durations, ages or thresholds?
3. Does it state what is "normal", "typical" or "expected"?
4. Does it advise when to contact a professional or service?
5. Does it make a causal claim (X leads to Y)?
6. Does it describe a product, medicine, device or physical technique?
7. Would a reasonable clinician expect a citation for any statement present?

Any "yes" points towards "attributable factual claims present". Unresolved
doubt is "uncertain — further review required", never "sources not required".

Choice sets offered on every form:

- Source validation: sources not required / sources required and validation
  passed / sources required — remediation required / source validation
  deferred.
- Claim attributability: no attributable factual claims requiring external
  support / attributable factual claims present / uncertain — further review
  required.
- Grounding review decision: sign off / refuse / defer.

Remaining requirements before any Stage 3 candidate transition (all five):

1. Named content owner who accepts the role.
2. Named grounding reviewer who accepts the role and is not the sole author.
   At `low`, contract authority is "grounding reviewer + content owner", so two
   distinct real people are expected.
3. Confirmed sensitivity level.
4. Recorded claim-attributability finding.
5. Recorded source-validation conclusion that does not leave the article
   blocked.
6. Grounding review sign-off (refusal or deferral keeps it blocked).
7. Owner authorisation of `<slug>@1` bound to the exact digest below.

Until every one of those exists, the article stays blocked and invisible to AI.
Reviewers must read the exact article content represented by the digest before
signing off. Article bodies are deliberately not reproduced here.

---

## Form 1 — second-time-parenting

- Title: Second-time parenting: what can feel different
- Topic: `growing-families` (journey: family)
- Digest: `f8e6e8f692c610699d0c2ef3e80f179964c3b16d6963d9bde30d0991e0bd14a4`
- Proposed sensitivity (Phase 30G, unconfirmed): `low`
- Why proposed low risk: reflective, experience-led guidance about adjusting to
  a second child; no triage pathway, dosing, or emergency instruction detected.
- Claim categories the reviewer must assess: sibling adjustment claims,
  parental capacity and coping statements, any implied developmental or
  emotional-health assertion.
- Content-owner acceptance question: do you, [named person], accept content
  ownership of this article at this exact digest?
- Grounding-reviewer acceptance question: do you, [named person], accept the
  grounding reviewer role for this article, and confirm you are not its sole
  author?
- Sensitivity question: do you confirm `low`, or reclassify?
- contentVersion authorisation question: do you authorise
  `second-time-parenting@1` against this exact digest?

## Form 2 — staying-connected-as-parents

- Title: Staying connected as parents
- Topic: `relationships` (journey: family)
- Digest: `7135b6012791f41360c13bbe71ba6f9fcca7c27985f75ab5dd8a912b7c1d07ea`
- Proposed sensitivity (Phase 30G, unconfirmed): `low`
- Why proposed low risk: relationship and communication guidance; no clinical
  instruction or crisis pathway detected.
- Claim categories the reviewer must assess: relationship distress, couple
  wellbeing and mood statements, any drift into mental-health or safeguarding
  territory.
- Content-owner acceptance question: do you, [named person], accept content
  ownership of this article at this exact digest?
- Grounding-reviewer acceptance question: do you, [named person], accept the
  grounding reviewer role, and confirm you are not its sole author?
- Sensitivity question: do you confirm `low`, or reclassify?
- contentVersion authorisation question: do you authorise
  `staying-connected-as-parents@1` against this exact digest?

## Form 3 — calmer-evenings-after-busy-days

- Title: Calmer evenings after busy days
- Topic: `family-basics` (journey: family)
- Digest: `8834a7a97030d13141a95580b2b053fdddfdf3ca38a2d2bd9b4e5fe2331159d6`
- Proposed sensitivity (Phase 30G, unconfirmed): `low`
- Why proposed low risk: everyday routine and wind-down guidance; no dosing,
  triage or safety instruction detected.
- Claim categories the reviewer must assess: routine and settling advice, sleep
  adjacency. Any sleep-duration, sleep-need or sleep-safety statement crosses
  the `low` threshold and should be flagged.
- Content-owner acceptance question: do you, [named person], accept content
  ownership of this article at this exact digest?
- Grounding-reviewer acceptance question: do you, [named person], accept the
  grounding reviewer role, and confirm you are not its sole author?
- Sensitivity question: do you confirm `low`, or reclassify?
- contentVersion authorisation question: do you authorise
  `calmer-evenings-after-busy-days@1` against this exact digest?

## Form 4 — planning-family-days-out

- Title: Planning family days out without overdoing it
- Topic: `travel-days-out` (journey: family)
- Digest: `3e0b7a50c41acba78fb9e539a46f071053d793ba74f81e189dbe6eec78b3864c`
- Proposed sensitivity (Phase 30G, unconfirmed): `low`
- Why proposed low risk: planning and pacing guidance for family outings; no
  clinical content detected.
- Claim categories the reviewer must assess: travel logistics, car seats, sun
  and heat exposure, water safety, crowd or supervision guidance. Any explicit
  safety instruction crosses the `low` threshold.
- Content-owner acceptance question: do you, [named person], accept content
  ownership of this article at this exact digest?
- Grounding-reviewer acceptance question: do you, [named person], accept the
  grounding reviewer role, and confirm you are not its sole author?
- Sensitivity question: do you confirm `low`, or reclassify?
- contentVersion authorisation question: do you authorise
  `planning-family-days-out@1` against this exact digest?

## Form 5 — simple-family-play-ideas

- Title: Simple family play ideas for everyday connection
- Topic: `play-connection` (journey: family)
- Digest: `b63336b3d8af2a838e5eff15f32271868878b568f7b196f4ab5b47f5d1a4aeb1`
- Proposed sensitivity (Phase 30G, unconfirmed): `low`
- Why proposed low risk: low-stakes play suggestions for everyday connection;
  no clinical or emergency content detected.
- Claim categories the reviewer must assess: age-appropriateness claims,
  choking and small-parts risk, supervision wording, any developmental-benefit
  claim.
- Content-owner acceptance question: do you, [named person], accept content
  ownership of this article at this exact digest?
- Grounding-reviewer acceptance question: do you, [named person], accept the
  grounding reviewer role, and confirm you are not its sole author?
- Sensitivity question: do you confirm `low`, or reclassify?
- contentVersion authorisation question: do you authorise
  `simple-family-play-ideas@1` against this exact digest?

---

## Open architecture gate (carried forward)

External governance evidence -> eligibility invalidation mechanism must be
resolved before Stage 4 approval. Not addressed here.

## Next step

Return the completed decisions for these five forms. Stage 2 execution begins
only on your explicit instruction, and only with real named people.
