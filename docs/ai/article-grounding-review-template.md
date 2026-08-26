# Per-Article Grounding Review Template

Copy one block per article. Completing this template does not approve an article for AI grounding; approval happens only in a separately gated phase, and only when every field below is filled and signed off.

Record metadata only. Never paste article body, sections, prose, takeaways or media into a review record, and never record user content (journal, notes, reflections, logs, media).

```
Slug:
Title:
Journey:
Topics:

Proposed sensitivity level:      low | wellbeing | health_reviewed | safety_sensitive | not_allowed
Content owner:
Reviewer:                        (required for health_reviewed and safety_sensitive)
Reviewed date:                   (ISO date)
Source list checked:             yes | no        Notes:
Content version:
Archived / deprecated check:     live | archived | deprecated    Replacement slug:

Approval decision:               blocked | candidate | approved | not_allowed
Approval notes:                  (short governance note, never article content)
Rollback or replacement ref:

Eval examples needed:            (prompts to add to the eval dataset before approval)

Final reviewer sign-off:
  Name:
  Role:
  Date:
  Signed:                        yes | no
```

## Rules

- Any missing required field means the decision stays `blocked`.
- `not_allowed` is terminal. The article never returns to the queue.
- `safety_sensitive` requires a named clinical reviewer, a verified source list and a fresh reviewed date.
- A decision of `approved` also requires `approvedBy` and `approvedAt` to be written into the registry record; the eligibility helper rejects the article without them.
- Review tiers run in the order set out in `article-grounding-review-queue.md`.
