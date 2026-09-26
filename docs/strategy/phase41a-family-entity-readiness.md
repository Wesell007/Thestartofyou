# Phase 41A — Family Entity Readiness

## Target shape under test
```text
Parent
  Pregnancy A -> Child A
  Pregnancy B -> Child B
  Pregnancy C -> Child C + Child D (twins)
Child A may already be in Toddler / Family content.
```

## Readiness by capability
| Capability | Ready? | Evidence |
|---|---|---|
| Parent identity | Yes | `profiles`, `auth.uid()` RLS on every user table |
| Many pregnancies per parent | No | `pregnancy_journeys` PK `user_id` (VERIFIED-PRODUCTION) |
| Pregnancy plurality (twins, triplets) | No | no field in `pregnancy_journeys` (types.ts line 827) |
| Pregnancy to child link | Partial | `first_year_journeys.archived_pregnancy_journey_id`; none on `babies` |
| Several babies from one birth | Yes, up to 4 | CHECK + RPC + UI (see audit section 3) |
| Children from different births | No | `save_first_year_journey` deletes all babies before insert |
| Concurrent contexts (pregnant while parenting) | No | `journeys` PK `user_id` |
| Child beyond First Year (toddler) | No saved entity | lifecycles are ttc, pregnancy, first_year only |
| Per-pregnancy reflections / media / toolkit | No | `reflections` unique `(user_id, week)`; toolkit tables `user_id` only |
| Archived history | Partial | `archived_journeys` snapshot jsonb, lifecycle text |

## Identity / context ownership matrix
| Record | Owned by | Bound to pregnancy | Bound to child |
|---|---|---|---|
| pregnancy_journeys | user | is the pregnancy | no |
| saved_journeys (legacy) | user (unique) | implicit | no |
| reflections | user + week | no | no |
| week_photos, week_media_memories | user + week | no | no |
| pregnancy_appointments, symptom notes, movement notes, birth_plans, hospital_bag_items, midwife_questions, contraction_sessions/events | user | no | no |
| babies | user | no | is the child |
| first_year_entries, care_events | user + baby | no | yes (baby lane) |
| first_year_memories | user + scope | no | baby / all_babies / family |
| first_year_reminders | user, optional baby | no | optional |
| companion_conversations, messages, memories | user | no | no |

## Verdict
The family graph is not representable. Multi-birth within one First Year is. Everything pregnancy-side is keyed to the person, not to a pregnancy.
