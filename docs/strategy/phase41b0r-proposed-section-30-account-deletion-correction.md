# 41B.0-R — PROPOSED section 30: account deletion under RESTRICT, corrected model

Status: **PROPOSED. NOT APPLIED TO THE 41B.0-R DOCUMENT. NOT APPROVED.** Written 7 October 2026 at gate stage G1 (paper only). The 41B.0-R convention is to append numbered sections (27, 28, 29) to `phase41b0r-family-entity-architecture-reconciliation.md`. This text is held in a separate file until the owner approves it. Once approved, it is appended there verbatim as section 30, and section 29 keeps its original text. Supporting analysis: `phase41b-g1-account-deletion-gate-plan.md`.

**The production account-deletion gate remains OPEN.** Nothing in this section closes it.

---

## 30. Account deletion under RESTRICT: corrected model (proposed, G1, 7 October 2026)

### 30.1 Historical observation (unchanged, not retracted)

C1.18 (`docs/strategy/evidence/41b1a-c1/24e-c1-18-summary.md`), Project 1 `wwtcnbjhttjtklpxhrkd`, 2026-10-06: the real `auth.admin.deleteUser` path removed a fully connected synthetic graph for User D (journey pointer, a `given_birth` episode, 7 episode-bound rows, a linked baby, 4 First Year child rows). Results: HTTP 200, 0 orphans, users A, B and C unchanged, nine-section structural diff EMPTY. Every fact in that record stands.

### 30.2 Interpretation withdrawn as not established

Section 29 says the RESTRICT checks queued by the nested cascade `DELETE` on `pregnancy_episodes` fire at the end of that nested statement. It concludes that the outcome depends on the name order of the RI triggers on `auth.users`. C1.18 (`24e`, "Interpretation and portability limit") attributed its own success to that order.

That explanation is **no longer considered established**. The PostgreSQL source (REL_13 to REL_18_STABLE, read 7 October 2026) shows a different execution model, given in 30.3. Section 29's model and the C1.18 attribution are superseded as explanations. Their text is kept unchanged as the historical record.

Section 19's original sentence, withdrawn by section 29, said that Postgres "runs the restrict checks after the first round of cascades". It is substantially the model below. This section restores it with source citations and a stated precondition. It is **not** restored as proven.

### 30.3 Corrected execution model (source-supported, pending runtime proof)

1. Every RI action is an AFTER ROW trigger, RESTRICT included. `RI_FKey_restrict_del` says: "In Postgres we still implement this as an AFTER trigger, but it's non-deferrable." Triggers for the same event on one relation are queued and fired in trigger-name order.
2. RI triggers run their SQL (the cascade `DELETE`, or the RESTRICT `SELECT`) through SPI with `fire_triggers = false`. The nested statement therefore does **not** fire its own AFTER triggers when it ends. The events it queues go to the *outer* statement's queue (`AfterTriggerEndQuery`: "Foreign key enforcement triggers do add to the current query level, thanks to their passing fire_triggers = false").
3. When the outer statement ends, `AfterTriggerEndQuery` works in firing cycles. Each cycle marks every event already queued, fires only those, and then loops. Events queued during a cycle fire in a later cycle.
4. Consequence for `DELETE FROM auth.users WHERE id = $1` (GoTrue hard delete, one statement):
   - **Cycle 1:** every action trigger on that `auth.users` row fires, in name order. Each account cascade deletes its child rows. One of them deletes the user's `pregnancy_episodes` rows, which queues those rows' 13 RESTRICT checks.
   - **Cycle 2:** the 13 RESTRICT checks run, along with everything else cycle 1 queued.
5. Each of the 13 Episode-bound tables carries its own `user_id → auth.users(id) ON DELETE CASCADE` (C1.1 baseline catalogue `02-baseline-catalogue.md`; `user_id` NOT NULL on every table). Every bound row is therefore deleted in cycle 1, *whatever the name order*. The cycle-2 RESTRICT checks find nothing. On this model, whole-account deletion does not depend on the order of the RI triggers on `auth.users`.
6. The precondition is essential. If a row could block an Episode check but disappeared only through a second hop (a cascade from some other parent), its deletion would also land in cycle 2, competing with the RESTRICT check. Order would then matter again. Section 30.4 forbids this.
7. Direct deletion of an Episode that still has dependants is unchanged. In that statement's cycle 1 the RESTRICT check finds the dependant and raises SQLSTATE 23503. History protection is not weakened.

This model is **SOURCE-SUPPORTED and NOT YET RUNTIME-PROVEN.** It becomes the accepted model only if the G1 targeted rehearsal passes. That rehearsal covers favourable order, forced unfavourable order and a mandatory sensitivity control that must reproduce the predicted order dependence.

### 30.4 Account-deletion cascade invariant (proposed, binding on all later phases)

**Invariant AD-1.** Some rows can block deletion of an account-owned family-entity parent through a non-cascading FK action (`RESTRICT` or `NO ACTION`); such a parent is, for example, `pregnancy_episodes`, `babies`, or any later journey-owned entity. Every such row must be removed by the account-deletion statement's first firing cycle. That is, its table must carry its own direct `user_id → auth.users(id) ON DELETE CASCADE`, with `user_id NOT NULL`. The protective FK must include `user_id` matched to the parent's `user_id`, so that a blocking row always belongs to the same account as the protected parent. Reaching the row only through another cascade (two hops or more) does not satisfy AD-1.

Current schema: all 13 Episode ownership FKs satisfy AD-1. They are the only blocking (`RESTRICT`/`NO ACTION`) FKs among public tables (the C1.5 post-forward catalogue holds 50 FKs; 34 cascade, 3 SET NULL, 13 RESTRICT).

### 30.5 What does not change

- Architecture: unchanged. The 13 ownership FKs stay `ON DELETE RESTRICT`, NOT DEFERRABLE.
- Frozen 41B.1A SQL: unchanged (forward `e6ad0bc8…`, validate `8645fd67…`, rollback `0d008955…`).
- Migrations: none added.
- Section 29's route list (pg_trigger inspection; a deferrable FK design; explicit ordering in `delete-account`) is superseded as the closure mechanism. The gate closes only by the G1 targeted-rehearsal PASS contract and the owner's acceptance of that evidence.
- Finding N10 (storage removed before Auth deletion): OPEN, unaffected.
- The production gates in 41B.0-R §11 (backup observation, quiet window, owner approval) are unaffected.
