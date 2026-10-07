-- AD-1 — account-deletion cascade invariant: authoritative catalogue contract (Layer 2).
--
-- Rehearsal / test support only. NOT a migration and never placed under supabase/migrations.
-- Read-only: one SELECT over pg_catalog. Written at gate stage G2 (7 October 2026) and
-- NOT EXECUTED against any remote database. It is first run in the targeted account-deletion
-- rehearsal (docs/strategy/phase41b-g1-account-deletion-gate-plan.md). Running it against
-- production needs a separate owner authorisation as a structure-only pre-flight; it reads
-- no customer rows.
--
-- Rule (41B.0-R section 30.4): every FK whose delete action can block (RESTRICT 'r' or
-- NO ACTION 'a') and whose parent is a protected family parent must sit on a table that has:
--   B  a user_id column;
--   C  that same user_id inside the protected FK;
--   D  that position paired with the parent's user_id;
--   E  user_id NOT NULL;
--   F  its own direct single-column FK user_id -> auth.users (two-hop paths never count, I);
--   G  that FK targeting the auth.users primary key (id);
--   H  that FK being ON DELETE CASCADE.
-- Protected parents are the registered family parents (public.pregnancy_episodes, public.babies)
-- plus any account-owned table (NOT NULL user_id with a direct CASCADE FK to auth.users(id)),
-- found dynamically. A registered parent that exists but is not account-owned is itself a failure.
--
-- Output: one row per protected blocking FK (row_kind = 'fk'), then one gate row
-- (row_kind = 'gate'). The rehearsal gate requires the gate row's ad1_status = 'PASS', i.e.
-- fail_count = 0 AND episode_link_count = 13 AND every registered parent is account-owned.
-- The expected count of 13 changes only when a reviewed phase adds an Episode link.

WITH
auth_pk AS (
  SELECT p.conkey
  FROM pg_catalog.pg_constraint p
  WHERE p.conrelid = 'auth.users'::regclass
    AND p.contype = 'p'
),
direct_auth AS (
  SELECT c.conrelid,
         c.conname,
         c.confdeltype,
         ca.attname AS child_column,
         ra.attname AS auth_column,
         (c.confkey = (SELECT conkey FROM auth_pk)) AS targets_auth_pk
  FROM pg_catalog.pg_constraint c
  JOIN pg_catalog.pg_attribute ca ON ca.attrelid = c.conrelid AND ca.attnum = c.conkey[1]
  JOIN pg_catalog.pg_attribute ra ON ra.attrelid = c.confrelid AND ra.attnum = c.confkey[1]
  WHERE c.contype = 'f'
    AND c.confrelid = 'auth.users'::regclass
    AND cardinality(c.conkey) = 1
    AND ca.attname = 'user_id'
),
account_owned AS (
  SELECT d.conrelid AS relid
  FROM direct_auth d
  JOIN pg_catalog.pg_attribute u
    ON u.attrelid = d.conrelid AND u.attname = 'user_id' AND NOT u.attisdropped
  WHERE d.confdeltype = 'c'
    AND d.targets_auth_pk
    AND d.auth_column = 'id'
    AND u.attnotnull
  GROUP BY d.conrelid
),
registered AS (
  SELECT r.name AS registered_name, to_regclass(r.name) AS relid
  FROM unnest(ARRAY['public.pregnancy_episodes', 'public.babies']) AS r(name)
),
protected_parents AS (
  SELECT relid FROM account_owned
  UNION
  SELECT relid FROM registered WHERE relid IS NOT NULL
),
blocking AS (
  SELECT c.oid, c.conname, c.conrelid, c.confrelid, c.conkey, c.confkey,
         c.confdeltype, c.condeferrable, c.condeferred
  FROM pg_catalog.pg_constraint c
  WHERE c.contype = 'f'
    AND c.confdeltype IN ('r', 'a')
    AND c.confrelid IN (SELECT relid FROM protected_parents)
),
evaluated AS (
  SELECT b.conname,
         b.confrelid,
         b.confdeltype,
         b.condeferrable,
         b.condeferred,
         pn.nspname AS parent_schema_name,
         pc.relname AS parent_table_name,
         cn.nspname AS referencing_schema_name,
         cc.relname AS referencing_table_name,
         (SELECT string_agg(a.attname::text, ', ' ORDER BY k.ord)
            FROM unnest(b.conkey) WITH ORDINALITY AS k(attnum, ord)
            JOIN pg_catalog.pg_attribute a ON a.attrelid = b.conrelid AND a.attnum = k.attnum) AS fk_columns,
         (SELECT string_agg(a.attname::text, ', ' ORDER BY k.ord)
            FROM unnest(b.confkey) WITH ORDINALITY AS k(attnum, ord)
            JOIN pg_catalog.pg_attribute a ON a.attrelid = b.confrelid AND a.attnum = k.attnum) AS ref_columns,
         ua.attnum AS user_attnum,
         ua.attnotnull AS user_not_null,
         array_position(b.conkey, ua.attnum) AS user_position,
         pu.attname AS paired_parent_column,
         (b.confrelid IN (SELECT relid FROM account_owned)) AS parent_account_owned,
         d.conname AS direct_name,
         d.child_column AS direct_column,
         d.confdeltype AS direct_action,
         d.targets_auth_pk,
         d.auth_column
  FROM blocking b
  JOIN pg_catalog.pg_class cc ON cc.oid = b.conrelid
  JOIN pg_catalog.pg_namespace cn ON cn.oid = cc.relnamespace
  JOIN pg_catalog.pg_class pc ON pc.oid = b.confrelid
  JOIN pg_catalog.pg_namespace pn ON pn.oid = pc.relnamespace
  LEFT JOIN pg_catalog.pg_attribute ua
    ON ua.attrelid = b.conrelid AND ua.attname = 'user_id' AND NOT ua.attisdropped
  LEFT JOIN pg_catalog.pg_attribute pu
    ON pu.attrelid = b.confrelid AND pu.attnum = b.confkey[array_position(b.conkey, ua.attnum)]
  LEFT JOIN LATERAL (
    SELECT x.*
    FROM direct_auth x
    WHERE x.conrelid = b.conrelid
    ORDER BY (x.confdeltype = 'c') DESC, x.conname
    LIMIT 1
  ) d ON true
),
classified AS (
  SELECT e.*,
         concat_ws('; ',
           CASE WHEN NOT e.parent_account_owned
                THEN 'parent not account-owned (no NOT NULL user_id with direct auth.users CASCADE)' END,
           CASE WHEN e.user_attnum IS NULL THEN 'B: referencing table has no user_id column' END,
           CASE WHEN e.user_attnum IS NOT NULL AND e.user_position IS NULL
                THEN 'C: protected FK does not include the referencing user_id' END,
           CASE WHEN e.user_position IS NOT NULL AND e.paired_parent_column IS DISTINCT FROM 'user_id'
                THEN 'D: user_id not paired with the parent user_id' END,
           CASE WHEN e.user_attnum IS NOT NULL AND NOT e.user_not_null THEN 'E: user_id is nullable' END,
           CASE WHEN e.direct_name IS NULL
                THEN 'F/I: no direct user_id -> auth.users FK (two-hop paths do not satisfy AD-1)' END,
           CASE WHEN e.direct_name IS NOT NULL AND NOT (e.targets_auth_pk AND e.auth_column = 'id')
                THEN 'G: account FK does not target the auth.users primary key' END,
           CASE WHEN e.direct_name IS NOT NULL AND e.direct_action <> 'c'
                THEN 'H: account FK delete action is not CASCADE' END
         ) AS reasons
  FROM evaluated e
),
gate AS (
  SELECT count(*) FILTER (WHERE c.reasons <> '') AS fail_count,
         count(*) FILTER (WHERE c.confrelid = to_regclass('public.pregnancy_episodes')) AS episode_link_count,
         count(*) AS protected_fk_count,
         (SELECT string_agg(r.registered_name, ', ' ORDER BY r.registered_name)
            FROM registered r
           WHERE r.relid IS NULL OR r.relid NOT IN (SELECT relid FROM account_owned)) AS registered_problems
  FROM classified c
)
SELECT 'fk' AS row_kind,
       c.parent_schema_name::text AS parent_schema,
       c.parent_table_name::text AS parent_table,
       c.conname::text AS protected_constraint,
       c.referencing_schema_name::text AS referencing_schema,
       c.referencing_table_name::text AS referencing_table,
       c.fk_columns || ' -> ' || c.ref_columns AS protected_fk_columns,
       CASE c.confdeltype WHEN 'r' THEN 'RESTRICT' WHEN 'a' THEN 'NO ACTION' END AS protected_delete_action,
       CASE WHEN c.condeferred THEN 'DEFERRABLE INITIALLY DEFERRED'
            WHEN c.condeferrable THEN 'DEFERRABLE INITIALLY IMMEDIATE'
            ELSE 'NOT DEFERRABLE' END AS protected_deferrable,
       CASE WHEN c.user_attnum IS NULL THEN NULL ELSE 'user_id' END AS ownership_user_column,
       c.direct_name::text AS direct_auth_fk_name,
       c.direct_column::text AS direct_auth_fk_columns,
       CASE c.direct_action WHEN 'c' THEN 'CASCADE' WHEN 'r' THEN 'RESTRICT' WHEN 'a' THEN 'NO ACTION'
            WHEN 'n' THEN 'SET NULL' WHEN 'd' THEN 'SET DEFAULT' END AS direct_auth_delete_action,
       CASE WHEN c.direct_name IS NULL THEN NULL
            ELSE 'auth.users(' || c.auth_column::text || ')'
                 || CASE WHEN c.targets_auth_pk THEN ' primary key' ELSE ' not primary key' END END AS auth_reference_target,
       c.user_not_null AS user_id_not_null,
       (c.user_position IS NOT NULL AND c.paired_parent_column = 'user_id') AS same_user_column_proven,
       CASE WHEN c.reasons = '' THEN 'PASS' ELSE 'FAIL' END AS ad1_status,
       NULLIF(c.reasons, '') AS failure_reason
FROM classified c
UNION ALL
SELECT 'gate', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
       CASE WHEN g.fail_count = 0 AND g.episode_link_count = 13 AND g.registered_problems IS NULL
            THEN 'PASS' ELSE 'FAIL' END,
       'fail_count=' || g.fail_count
         || '; episode_link_count=' || g.episode_link_count
         || '; protected_fk_count=' || g.protected_fk_count
         || '; registered parents not account-owned: ' || coalesce(g.registered_problems, 'none')
FROM gate g
ORDER BY 1, 3, 6, 4;
