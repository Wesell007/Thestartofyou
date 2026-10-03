# Phase 41B.0 — Context Contract

> **Historical 41B.0 text (CLOSED PASS, 2026-09-26).** Passages marked `SUPERSEDED BY 41B.0-R` below are governed by `docs/strategy/phase41b0r-family-entity-architecture-reconciliation.md` (its §22 lists each one). The original wording is preserved; nothing below has been rewritten.

Design only. Companion changes: 0.

Rule: NO PERSONAL CONTEXT is safer than WRONG PERSONAL CONTEXT.

## 1. Current context mechanism
One `journeys` row per user (unchanged key):
- `lifecycle`: `ttc | pregnancy | first_year` (exactly three).
- `active_pregnancy_episode_id`: required when `lifecycle = 'pregnancy'` (enforced after tightening), null otherwise.

> **SUPERSEDED BY 41B.0-R** §6, S9 — `current_pregnancy_episode_id`; a pointer is permitted outside lifecycle `pregnancy` (kept-chapter reference after First Year); ledger row 19 requires one only when lifecycle is `pregnancy`.
- First Year cohort: babies with `archived_at is null`; the selected baby follows the existing `is_primary` rule.

## 2. Transitions (all in one transaction each)

> **SUPERSEDED BY 41B.0-R** §6, §9 — a pregnancy that ends does not clear the pointer; a save over an open pregnancy is not "rejected" but returns a result code (`created`, `unchanged`, `updated`, `needs_confirmation`); a legacy or background save with different dates returns `needs_confirmation` (owner decision 4, no automatic threshold).
```text
none/ttc  --start pregnancy-->  pregnancy (CREATE episode, set pointer)
pregnancy --ends (loss, no longer pregnant)--> none or ttc (UPDATE episode status, clear pointer)
pregnancy --birth--> first_year (END episode, CREATE babies linked to it, set lifecycle)
first_year --new pregnancy--> pregnancy (CREATE episode; First Year cohort kept, not deleted; archive only if the person chooses)
first_year --new First Year setup--> first_year (ARCHIVE old cohort, CREATE babies)
any --remove journey--> END/ARCHIVE, never delete (hard delete only by explicit permanent-delete or account deletion)
```
Starting a new pregnancy while one is `active` is rejected until the person states what happened to the earlier one. This closes 41A finding 1.

## 3. Resolution contract
Input: session. Output: derived values only (week, trimester, TTC stage, baby age in months) or `null`.
1. No session, pointer error, or unknown lifecycle: `null`.
2. `pregnancy`: read only the episode named by the pointer. If missing, or status is not `active`: `null`. Never fall back to "latest" or "only" episode.
3. `first_year`: use the unarchived cohort; one baby, or exactly one `is_primary`, gives an age; otherwise no age.
4. `ttc`: unchanged.
5. Legacy fallback (`saved_journeys`) is kept only until step 9 and only when no episode exists at all.
6. Unbound legacy records are never part of personal context.

## 4. Companion boundary

> **SUPERSEDED BY 41B.0-R** §8 — the client resolver is not the only personal-context source: the two server-side journal readers are in scope and move to the pointer in 41B.1C; the journal flag stays off until then.
The resolver above is the only personal-context source. Conversations and memories stay user-level; they are not re-labelled by episode in 41B. Memory, history and grounding stay off. Implementing this contract in `src/lib/companion/journeyPersonalSource.ts` is 41B.1 work; no behaviour change now.
