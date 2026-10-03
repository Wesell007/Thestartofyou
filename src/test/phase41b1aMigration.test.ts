import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Static SQL-contract tests for the pending 41B.1A foundation files.
// They prove the properties the 41B.0-R reconciliation requires (S8) from the text of
// the files. They do NOT prove runtime database behaviour, which stays PENDING
// APPLICATION until the 41B.1A-C1 rehearsal runs the files.
//
// Hardened 3 October 2026 after the pre-push review: structural grant parsing, a
// complete policy surface, a rollback DROP whitelist, composite-FK enforcement,
// identifier-length and wider DML / transaction detectors. Every detector has a
// self-test so a regex that silently stops matching cannot hide a defect.

const PENDING = "docs/strategy/migrations-pending";
const squash = (sql: string) => sql.replace(/\s+/g, " ").trim();
const load = (name: string) => {
  const raw = readFileSync(resolve(process.cwd(), PENDING, name), "utf8");
  const noComments = raw.replace(/--[^\n]*/g, "");
  return { raw, flat: squash(noComments) };
};

const forward = load("41b1a_family_entity_foundation.sql");
const validate = load("41b1a_family_entity_foundation_validate.sql");
const rollback = load("41b1a_family_entity_foundation_rollback.sql");
const ALL_FILES = [forward, validate, rollback];

// ---------------------------------------------------------------------------
// Parsers and detectors
// ---------------------------------------------------------------------------

// The looped table list is parsed from the SQL itself (S8: never count our own array).
const parseLoopTables = (flat: string): string[] => {
  const m = flat.match(/tables text\[\] := ARRAY\[([^\]]*)\]/);
  if (!m) return [];
  return [...m[1].matchAll(/'([a-z_]+)'/g)].map((x) => x[1]);
};

const LOOP_TABLES = parseLoopTables(forward.flat);
const LINK_FKS = [
  "journeys_current_pregnancy_episode_owner_fkey",
  ...LOOP_TABLES.map((t) => `${t}_pregnancy_episode_owner_fkey`),
];
const LINK_INDEXES = [
  "journeys_current_pregnancy_episode_idx",
  ...LOOP_TABLES.map((t) => `${t}_pregnancy_episode_idx`),
];

type Grant = { privileges: string[]; object: string; roles: string[] };

// Structural GRANT parser: optional TABLE keyword, any casing, any whitespace, role lists.
const GRANT_RE = /\bGRANT\s+([A-Za-z ,()]+?)\s+ON\s+(?:TABLE\s+)?([A-Za-z_."]+)\s+TO\s+([A-Za-z_, ]+?)\s*;/gi;
const parseGrants = (sql: string): Grant[] =>
  [...squash(sql).matchAll(GRANT_RE)].map((m) => ({
    privileges: m[1].split(",").map((p) => p.trim().toUpperCase()).filter(Boolean),
    object: m[2].toLowerCase(),
    roles: m[3].split(",").map((r) => r.trim().toLowerCase()).filter(Boolean),
  }));

// Approved surface: authenticated may hold SELECT only, on pregnancy_episodes only.
// anon and PUBLIC may hold nothing. Anything else is a violation.
const grantViolations = (grants: Grant[]): string[] => {
  const out: string[] = [];
  for (const g of grants) {
    const desc = `GRANT ${g.privileges.join(", ")} ON ${g.object} TO ${g.roles.join(", ")}`;
    if (g.roles.some((r) => r === "anon" || r === "public")) out.push(`anon/PUBLIC granted: ${desc}`);
    if (g.roles.includes("authenticated")) {
      if (g.object !== "public.pregnancy_episodes") out.push(`authenticated granted on another object: ${desc}`);
      if (g.privileges.length !== 1 || g.privileges[0] !== "SELECT") out.push(`authenticated beyond SELECT: ${desc}`);
    }
  }
  return out;
};

const POLICY_STATEMENT_RE = /CREATE POLICY [^;]*;/g;
const EXPECTED_POLICIES = [
  "CREATE POLICY pregnancy_episodes_select_own ON public.pregnancy_episodes FOR SELECT TO authenticated USING (auth.uid() = user_id);",
  "CREATE POLICY pregnancy_episodes_insert_own ON public.pregnancy_episodes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);",
  "CREATE POLICY pregnancy_episodes_update_own ON public.pregnancy_episodes FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);",
  "CREATE POLICY pregnancy_episodes_delete_own ON public.pregnancy_episodes FOR DELETE TO authenticated USING (auth.uid() = user_id);",
];

// DML and destructive statement detectors. They match whole statements, so
// "BEFORE UPDATE ON", "FOR UPDATE TO", "ON DELETE RESTRICT" and "GRANT SELECT" do not trip them.
const DML = [
  /\bUPDATE\s+(?:ONLY\s+)?(?:public\.)?[a-z_%I"]+(?:\s+(?:AS\s+)?[a-z_]+)?\s+SET\b/i,
  /\bINSERT\s+INTO\b/i,
  /\bDELETE\s+FROM\b/i,
  /\bTRUNCATE\b/i,
  /\bMERGE\s+INTO\b/i,
  /\bCOPY\b/i,
  // SELECT may appear only as a privilege word (GRANT SELECT ON / FOR SELECT TO), a catalogue
  // existence check (SELECT 1 FROM pg_* / information_schema) or an aggregate count.
  /\bSELECT\s+(?!1\s+FROM\s+(?:pg_|information_schema\.)|count\(\*\)|ON\b|TO\b)/i,
];
const DESTRUCTIVE_DDL = [
  /\bDROP\s+(TABLE|COLUMN|CONSTRAINT|POLICY|INDEX|TYPE|FUNCTION|SCHEMA|ROLE|SEQUENCE)\b/i,
  /\bALTER\s+TYPE\b/i,
  /\bSET\s+NOT\s+NULL\b/i,
  /\bALTER\s+TABLE\s+(?:ONLY\s+)?(?:public\.)?[a-z_%I"]+\s+DROP\b/i,
  /\bRENAME\b/i,
];
const TRANSACTION_CONTROL = [
  /\bBEGIN\s*;/i,
  /\bBEGIN\s+(TRANSACTION|WORK|ISOLATION|READ|DEFERRABLE)\b/i,
  /\bSTART\s+TRANSACTION\b/i,
  /\bCOMMIT\b/i,
  /\bROLLBACK\s*(;|TO\b|WORK\b|TRANSACTION\b|PREPARED\b)/i,
  /\bSAVEPOINT\b/i,
  /\bPREPARE\s+TRANSACTION\b/i,
];
const PRIVILEGE_ESCAPES = [
  /\bDISABLE\s+ROW\s+LEVEL\s+SECURITY\b/i,
  /\bALTER\s+POLICY\b/i,
  /\bON\s+ALL\s+(TABLES|SEQUENCES|FUNCTIONS|ROUTINES)\s+IN\s+SCHEMA\b/i,
  /\bALTER\s+DEFAULT\s+PRIVILEGES\b/i,
  /\bSECURITY\s+DEFINER\b/i,
  /\bBYPASSRLS\b/i,
];

const MAX_IDENTIFIER_BYTES = 63;

// ---------------------------------------------------------------------------
// Detector self-tests: each detector must trip on the defect it exists to catch.
// ---------------------------------------------------------------------------
describe("detector self-tests (a silent regex regression must fail here)", () => {
  it("grant parser rejects every forbidden authenticated / anon shape, with and without TABLE, any case or spacing", () => {
    const forbidden = [
      "GRANT ALL ON public.pregnancy_episodes TO authenticated;",
      "GRANT ALL ON TABLE public.pregnancy_episodes TO authenticated;",
      "grant all privileges on public.pregnancy_episodes to authenticated;",
      "GRANT INSERT ON public.pregnancy_episodes TO authenticated;",
      "GRANT UPDATE ON TABLE public.pregnancy_episodes TO authenticated;",
      "GRANT DELETE ON public.pregnancy_episodes TO authenticated;",
      "GRANT SELECT, INSERT, UPDATE, DELETE ON public.pregnancy_episodes TO authenticated;",
      "GRANT SELECT,DELETE ON public.pregnancy_episodes TO authenticated;",
      "grant   insert ,  update   on   table   public.pregnancy_episodes   to   authenticated ;",
      "GRANT SELECT ON public.pregnancy_episodes TO anon;",
      "GRANT SELECT ON public.pregnancy_episodes TO PUBLIC;",
      "GRANT SELECT ON public.pregnancy_episodes TO service_role, authenticated, anon;",
      "GRANT SELECT ON public.babies TO authenticated;",
      "GRANT ALL ON TABLE public.pregnancy_episodes TO service_role, authenticated;",
    ];
    for (const sql of forbidden) {
      const grants = parseGrants(sql);
      expect(grants, sql).toHaveLength(1);
      expect(grantViolations(grants), sql).not.toHaveLength(0);
    }
    const allowed = [
      "GRANT SELECT ON TABLE public.pregnancy_episodes TO authenticated;",
      "GRANT  select  ON  public.pregnancy_episodes  TO  authenticated ;",
      "GRANT ALL ON TABLE public.pregnancy_episodes TO service_role;",
    ];
    for (const sql of allowed) expect(grantViolations(parseGrants(sql)), sql).toEqual([]);
  });

  it("DML detectors trip inside EXECUTE strings and on MERGE / COPY / aliased UPDATE", () => {
    expect("EXECUTE format('UPDATE public.%I SET x = 1', t)").toMatch(DML[0]);
    expect("UPDATE public.babies AS b SET x = 1").toMatch(DML[0]);
    expect("UPDATE ONLY public.babies SET x = 1").toMatch(DML[0]);
    expect("EXECUTE 'INSERT INTO public.x VALUES (1)'").toMatch(DML[1]);
    expect("EXECUTE format('DELETE FROM public.%I', t)").toMatch(DML[2]);
    expect("TRUNCATE public.babies").toMatch(DML[3]);
    expect("MERGE INTO public.babies USING s ON true WHEN MATCHED THEN DO NOTHING").toMatch(DML[4]);
    expect("COPY public.babies FROM '/tmp/x.csv'").toMatch(DML[5]);
    expect("SELECT * FROM public.reflections").toMatch(DML[6]);
    // and do not trip on the permitted grammar positions
    for (const ok of ["BEFORE UPDATE ON public.x", "FOR UPDATE TO authenticated", "ON DELETE RESTRICT", "GRANT SELECT ON TABLE public.x TO y", "FOR SELECT TO authenticated", "SELECT 1 FROM pg_constraint", "SELECT count(*) FROM public.x"]) {
      for (const re of DML) expect(ok, `${ok} vs ${re}`).not.toMatch(re);
    }
  });

  it("transaction detectors trip on every transaction-control spelling", () => {
    for (const bad of ["BEGIN;", "BEGIN TRANSACTION;", "BEGIN WORK;", "START TRANSACTION;", "COMMIT;", "COMMIT WORK;", "ROLLBACK;", "ROLLBACK TO s1;", "SAVEPOINT s1;", "PREPARE TRANSACTION 'x';"]) {
      expect(TRANSACTION_CONTROL.some((re) => re.test(bad)), bad).toBe(true);
    }
    // plpgsql block delimiters and the guard's message text are not transaction control
    for (const ok of ["DO $$ BEGIN IF true THEN null; END IF; END $$;", "RAISE EXCEPTION 'ROLLBACK REFUSED: % row(s)'", "FOREACH t IN ARRAY tables LOOP END LOOP;"]) {
      expect(TRANSACTION_CONTROL.some((re) => re.test(ok)), ok).toBe(false);
    }
  });

  it("privilege-escape detectors trip on RLS disable, ALTER POLICY, schema-wide grants and default privileges", () => {
    for (const bad of [
      "ALTER TABLE public.pregnancy_episodes DISABLE ROW LEVEL SECURITY;",
      "ALTER POLICY pregnancy_episodes_select_own ON public.pregnancy_episodes USING (true);",
      "GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;",
      "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon;",
    ]) {
      expect(PRIVILEGE_ESCAPES.some((re) => re.test(bad)), bad).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// Contract tests
// ---------------------------------------------------------------------------
describe("Phase 41B.1A pending migration (static contract, amended per 41B.0-R)", () => {
  describe("shape of the three files", () => {
    it("the loop names exactly the 11 pregnancy-owned tables plus babies, in the approved order", () => {
      expect(LOOP_TABLES).toEqual([
        "reflections", "week_photos", "week_media_memories", "pregnancy_appointments",
        "pregnancy_symptom_notes", "baby_movement_notes", "birth_plans", "hospital_bag_items",
        "midwife_questions", "contraction_sessions", "contraction_events", "babies",
      ]);
    });

    it("rollback loops over the identical table list", () => {
      expect(parseLoopTables(rollback.flat)).toEqual(LOOP_TABLES);
    });

    it("S6: no transaction control in any file (the external runner owns the transaction)", () => {
      for (const f of ALL_FILES) for (const re of TRANSACTION_CONTROL) expect(f.flat).not.toMatch(re);
    });

    it("S1: every file bounds lock waits with SET LOCAL lock_timeout as its first statement", () => {
      for (const f of ALL_FILES) {
        expect(f.flat).toMatch(/SET LOCAL lock_timeout = '\d+s';/);
        expect(f.flat.indexOf("SET LOCAL lock_timeout")).toBe(0);
      }
    });

    it("no file disables RLS, alters a policy, grants schema-wide, changes default privileges, or uses SECURITY DEFINER", () => {
      for (const f of ALL_FILES) for (const re of PRIVILEGE_ESCAPES) expect(f.flat).not.toMatch(re);
    });

    it("every identifier this phase introduces fits PostgreSQL's 63-byte limit", () => {
      const introduced = new Set<string>([
        ...[...forward.flat.matchAll(/CONSTRAINT ([a-z_]+)/g)].map((m) => m[1]),
        ...[...forward.flat.matchAll(/INDEX IF NOT EXISTS ([a-z_]+)/g)].map((m) => m[1]),
        ...[...forward.flat.matchAll(/CREATE POLICY ([a-z_]+)/g)].map((m) => m[1]),
        ...[...forward.flat.matchAll(/CREATE TRIGGER ([a-z_]+)/g)].map((m) => m[1]),
        ...[...forward.flat.matchAll(/ADD COLUMN IF NOT EXISTS ([a-z_]+)/g)].map((m) => m[1]),
        ...[...validate.flat.matchAll(/VALIDATE CONSTRAINT ([a-z_]+)/g)].map((m) => m[1]),
        ...LINK_FKS,
        ...LINK_INDEXES,
        "pregnancy_episodes", "removed_at", "current_pregnancy_episode_id", "pregnancy_episode_id",
      ]);
      introduced.delete("for"); // "CONSTRAINT for" is prose inside the format() template, not a name
      expect(introduced.size).toBeGreaterThanOrEqual(13 + 13 + 6 + 4 + 1);
      for (const name of introduced) {
        expect(Buffer.byteLength(name, "utf8"), name).toBeLessThanOrEqual(MAX_IDENTIFIER_BYTES);
        expect(name, name).toMatch(/^[a-z_]+$/);
      }
    });
  });

  describe("pregnancy episode entity", () => {
    it("rows 1–2: table with primary key and (id, user_id) owner key", () => {
      expect(forward.flat).toMatch(/CREATE TABLE IF NOT EXISTS public\.pregnancy_episodes \(/);
      expect(forward.flat).toMatch(/CONSTRAINT pregnancy_episodes_pkey PRIMARY KEY \(id\)/);
      expect(forward.flat).toMatch(/CONSTRAINT pregnancy_episodes_id_user_id_key UNIQUE \(id, user_id\)/);
    });

    it("A/C: no plain unique on user_id, so one person may hold many episodes", () => {
      expect(forward.flat).not.toMatch(/UNIQUE \(user_id\)/);
    });

    it("account-level cascade is intentional: user_id references auth.users ON DELETE CASCADE, and it is the only CASCADE", () => {
      expect(forward.flat).toMatch(
        /CONSTRAINT pregnancy_episodes_user_id_fkey FOREIGN KEY \(user_id\) REFERENCES auth\.users \(id\) ON DELETE CASCADE/,
      );
      expect([...forward.flat.matchAll(/ON DELETE CASCADE/g)]).toHaveLength(1);
      expect(forward.flat).not.toMatch(/ON DELETE SET (NULL|DEFAULT)/);
    });

    it("S4: lmp_date and due_date are NOT NULL and carry the save function's date rule as a CHECK", () => {
      expect(forward.flat).toMatch(/\blmp_date date NOT NULL\b/);
      expect(forward.flat).toMatch(/\bdue_date date NOT NULL\b/);
      expect(forward.flat).toMatch(
        /CONSTRAINT pregnancy_episodes_dates_check CHECK \(due_date > lmp_date AND due_date <= lmp_date \+ 300\)/,
      );
    });

    it("row 4: expected_count accepts null or 1 to 4", () => {
      expect(forward.flat).toMatch(
        /CONSTRAINT pregnancy_episodes_expected_count_check CHECK \(expected_count IS NULL OR expected_count BETWEEN 1 AND 4\)/,
      );
    });

    it("row 5: ended_at is null exactly when status is active or paused", () => {
      expect(forward.flat).toMatch(
        /CONSTRAINT pregnancy_episodes_ended_at_status_check CHECK \(\(status IN \('active', 'paused'\)\) = \(ended_at IS NULL\)\)/,
      );
    });

    it("exactly six table constraints and nothing on removed_at, outcome_date or status beyond the approved set", () => {
      const tableDef = forward.flat.match(/CREATE TABLE IF NOT EXISTS public\.pregnancy_episodes \((.*?)\); CREATE UNIQUE INDEX/);
      expect(tableDef).not.toBeNull();
      const names = [...(tableDef as RegExpMatchArray)[1].matchAll(/CONSTRAINT ([a-z_]+)/g)].map((m) => m[1]);
      expect(names).toEqual([
        "pregnancy_episodes_pkey",
        "pregnancy_episodes_id_user_id_key",
        "pregnancy_episodes_user_id_fkey",
        "pregnancy_episodes_dates_check",
        "pregnancy_episodes_expected_count_check",
        "pregnancy_episodes_ended_at_status_check",
      ]);
      expect((tableDef as RegExpMatchArray)[1]).not.toMatch(/CHECK \([^)]*removed_at/);
    });

    it("S13 (final): removed_at is an episode-local nullable timestamptz, orthogonal to status", () => {
      const tableDef = (forward.flat.match(/CREATE TABLE IF NOT EXISTS public\.pregnancy_episodes \((.*?)\); CREATE UNIQUE INDEX/) as RegExpMatchArray)[1];
      expect(tableDef).toMatch(/\bremoved_at timestamptz,/);
      expect(tableDef).not.toMatch(/removed_at timestamptz NOT NULL/);
      expect(tableDef).not.toMatch(/removed_at timestamptz DEFAULT/);
      for (const f of ALL_FILES) {
        expect(f.flat).not.toMatch(/'removed'/);
        expect(f.flat).not.toMatch(/\bALTER TYPE\b/i);
        expect(f.flat).not.toMatch(/ADD VALUE/i);
        expect(f.flat).not.toMatch(/\barchived_at\b/);
      }
      // removal is never expressed through the status dimension or a fabricated end
      expect(forward.flat).not.toMatch(/removed_at IS NOT NULL/);
      expect(forward.flat).not.toMatch(/removed_at[^,;]*(ended_at|outcome_date|status)/);
    });

    it("S5 + S13: one OPEN episode per user — active or paused, and not removed — and it is the only unique index", () => {
      expect(forward.flat).toMatch(
        /CREATE UNIQUE INDEX IF NOT EXISTS pregnancy_episodes_one_open_per_user_idx ON public\.pregnancy_episodes \(user_id\) WHERE status IN \('active', 'paused'\) AND removed_at IS NULL;/,
      );
      expect([...forward.flat.matchAll(/CREATE UNIQUE INDEX/g)]).toHaveLength(1);
      expect(forward.flat).not.toMatch(/WHERE status = 'active'/);
      expect(forward.flat).not.toMatch(/one_active_per_user/);
    });

    it("S3: plain (user_id) index kept; exactly two indexes on the episode table", () => {
      expect(forward.flat).toMatch(/CREATE INDEX IF NOT EXISTS pregnancy_episodes_user_id_idx ON public\.pregnancy_episodes \(user_id\);/);
      const onEpisodes = [...forward.flat.matchAll(/INDEX IF NOT EXISTS ([a-z_]+) ON public\.pregnancy_episodes/g)].map((m) => m[1]);
      expect(onEpisodes).toEqual(["pregnancy_episodes_one_open_per_user_idx", "pregnancy_episodes_user_id_idx"]);
    });

    it("S11: updated_at trigger is drop-and-create on set_updated_at (no CREATE OR REPLACE TRIGGER)", () => {
      expect(forward.flat).toMatch(/DROP TRIGGER IF EXISTS pregnancy_episodes_set_updated_at ON public\.pregnancy_episodes;/);
      expect(forward.flat).toMatch(
        /CREATE TRIGGER pregnancy_episodes_set_updated_at BEFORE UPDATE ON public\.pregnancy_episodes FOR EACH ROW EXECUTE FUNCTION public\.set_updated_at\(\);/,
      );
      expect(forward.flat).not.toMatch(/CREATE OR REPLACE TRIGGER/i);
      expect([...forward.flat.matchAll(/CREATE TRIGGER/g)]).toHaveLength(1);
    });
  });

  describe("privileges and RLS", () => {
    it("S2: exactly one REVOKE, from PUBLIC, anon and authenticated, placed before any grant", () => {
      const revokes = [...forward.flat.matchAll(/\bREVOKE\b[^;]*;/gi)].map((m) => m[0]);
      expect(revokes).toEqual(["REVOKE ALL ON TABLE public.pregnancy_episodes FROM PUBLIC, anon, authenticated;"]);
      const grantAt = forward.flat.search(/\bGRANT\b/);
      expect(grantAt).toBeGreaterThan(forward.flat.indexOf(revokes[0]));
    });

    it("owner decision 2: every GRANT in every file is parsed, and authenticated holds SELECT only on pregnancy_episodes", () => {
      for (const f of ALL_FILES) {
        const grants = parseGrants(f.flat);
        // nothing escapes the parser (e.g. GRANT ... ON FUNCTION / SCHEMA / ALL TABLES)
        expect(grants.length).toBe((f.flat.match(/\bGRANT\b/gi) ?? []).length);
        expect(grantViolations(grants)).toEqual([]);
      }
      expect(parseGrants(forward.flat)).toEqual([
        { privileges: ["SELECT"], object: "public.pregnancy_episodes", roles: ["authenticated"] },
        { privileges: ["ALL"], object: "public.pregnancy_episodes", roles: ["service_role"] },
      ]);
      expect(parseGrants(validate.flat)).toEqual([]);
      expect(parseGrants(rollback.flat)).toEqual([]);
    });

    it("RLS is enabled and the policy surface is exactly the four owner policies", () => {
      expect(forward.flat).toMatch(/ALTER TABLE public\.pregnancy_episodes ENABLE ROW LEVEL SECURITY;/);
      const created = [...forward.flat.matchAll(POLICY_STATEMENT_RE)].map((m) => m[0]);
      expect(created).toHaveLength(4);
      expect([...created].sort()).toEqual([...EXPECTED_POLICIES].sort());
      expect((forward.flat.match(/CREATE POLICY/g) ?? []).length).toBe(4);
      // the idempotency guards name exactly the same four policies, on the same table
      const guarded = [...forward.flat.matchAll(/tablename = '([a-z_]+)' AND policyname = '([a-z_]+)'/g)].map((m) => `${m[1]}.${m[2]}`);
      expect([...guarded].sort()).toEqual(
        ["select", "insert", "update", "delete"].map((op) => `pregnancy_episodes.pregnancy_episodes_${op}_own`).sort(),
      );
      // no policy exists in the companion files, and no policy is permissive-to-all or restrictive
      expect(validate.flat).not.toMatch(/CREATE POLICY/);
      expect(rollback.flat).not.toMatch(/CREATE POLICY/);
      for (const f of ALL_FILES) {
        expect(f.flat).not.toMatch(/\bFOR ALL\b/);
        expect(f.flat).not.toMatch(/\bTO (public|anon)\b/);
        expect(f.flat).not.toMatch(/USING \(true\)|WITH CHECK \(true\)/);
        expect(f.flat).not.toMatch(/AS (RESTRICTIVE|PERMISSIVE)/i);
      }
    });
  });

  describe("ownership links", () => {
    it("13 links in total: journeys pointer plus 12 looped tables", () => {
      expect(LINK_FKS).toHaveLength(13);
      expect(new Set(LINK_FKS).size).toBe(13);
    });

    it("S9: journeys pointer is current_pregnancy_episode_id, nullable, with a composite same-user FK", () => {
      expect(forward.flat).toMatch(/ALTER TABLE public\.journeys ADD COLUMN IF NOT EXISTS current_pregnancy_episode_id uuid;/);
      expect(forward.flat).toMatch(
        /ADD CONSTRAINT journeys_current_pregnancy_episode_owner_fkey FOREIGN KEY \(current_pregnancy_episode_id, user_id\) REFERENCES public\.pregnancy_episodes \(id, user_id\) ON DELETE RESTRICT NOT VALID;/,
      );
      expect(forward.flat).toMatch(/CREATE INDEX IF NOT EXISTS journeys_current_pregnancy_episode_idx ON public\.journeys \(current_pregnancy_episode_id, user_id\);/);
      for (const f of ALL_FILES) expect(f.flat).not.toMatch(/active_pregnancy_episode/);
    });

    it("S1: journeys is altered before the 12-table loop (lock order)", () => {
      const journeysAt = forward.flat.indexOf("ALTER TABLE public.journeys ADD COLUMN IF NOT EXISTS current_pregnancy_episode_id");
      const loopAt = forward.flat.indexOf("FOREACH t IN ARRAY tables LOOP");
      expect(journeysAt).toBeGreaterThan(-1);
      expect(loopAt).toBeGreaterThan(journeysAt);
    });

    it("rows 6–17: looped tables gain a nullable episode id, a composite same-user FK (RESTRICT, NOT VALID) and a composite index", () => {
      expect(forward.flat).toMatch(/ADD COLUMN IF NOT EXISTS pregnancy_episode_id uuid'/);
      expect(forward.flat).toMatch(
        /FOREIGN KEY \(pregnancy_episode_id, user_id\) ' 'REFERENCES public\.pregnancy_episodes \(id, user_id\) ON DELETE RESTRICT NOT VALID'/,
      );
      expect(forward.flat).toMatch(/t \|\| '_pregnancy_episode_owner_fkey'/);
      expect(forward.flat).toMatch(/CREATE INDEX IF NOT EXISTS %I ON public\.%I \(pregnancy_episode_id, user_id\)'/);
    });

    it("every reference to pregnancy_episodes is the composite (id, user_id) key, RESTRICT and NOT VALID; no single-column episode FK exists", () => {
      const joined = forward.flat.replace(/' '/g, ""); // join the format() string-literal halves
      const allRefs = joined.match(/REFERENCES public\.pregnancy_episodes/g) ?? [];
      const compositeRefs = [
        ...joined.matchAll(
          /FOREIGN KEY \((current_pregnancy_episode_id|pregnancy_episode_id), user_id\) REFERENCES public\.pregnancy_episodes \(id, user_id\) ON DELETE RESTRICT NOT VALID/g,
        ),
      ];
      expect(allRefs).toHaveLength(2); // the journeys statement and the loop template
      expect(compositeRefs).toHaveLength(2);
      expect(compositeRefs.map((m) => m[1]).sort()).toEqual(["current_pregnancy_episode_id", "pregnancy_episode_id"]);
      expect(joined).not.toMatch(/REFERENCES public\.pregnancy_episodes\s*\(\s*id\s*\)/);
      expect(joined).not.toMatch(/FOREIGN KEY \((current_)?pregnancy_episode_id\)/);
      expect(joined).not.toMatch(/REFERENCES public\.pregnancy_episodes[^;']*(?:CASCADE|SET NULL|DEFERRABLE)/);
      // three FOREIGN KEY clauses in total: account cascade + the two composite links
      expect(joined.match(/FOREIGN KEY/g)).toHaveLength(3);
      // no validated-inline episode link anywhere
      expect(joined).not.toMatch(/REFERENCES public\.pregnancy_episodes \(id, user_id\) ON DELETE RESTRICT(?! NOT VALID)/);
    });

    it("S10: existence guards are scoped to the table (conrelid), never by name alone", () => {
      const guards = [...forward.flat.matchAll(/FROM pg_constraint WHERE ([^)]*)\)/g)].map((m) => m[1]);
      expect(guards).toHaveLength(3);
      for (const g of guards) expect(g).toMatch(/^conrelid = /);
      expect(forward.flat).not.toMatch(/FROM pg_constraint WHERE conname =/);
    });

    it("G: link columns are never NOT NULL (legacy and unlinked children stay valid)", () => {
      expect(forward.flat).not.toMatch(/pregnancy_episode_id uuid NOT NULL/);
      expect(forward.flat).not.toMatch(/current_pregnancy_episode_id uuid NOT NULL/);
      expect(forward.flat).not.toMatch(/SET NOT NULL/);
      expect(forward.flat).not.toMatch(/pregnancy_episode_id uuid DEFAULT/);
    });

    it("H/I: no child row required, no unique on any episode link, no pointer CHECK (row 19 is 41B.1D)", () => {
      expect(forward.flat).not.toMatch(/UNIQUE \(pregnancy_episode_id/);
      expect(forward.flat).not.toMatch(/UNIQUE \(current_pregnancy_episode_id/);
      expect(forward.flat).not.toMatch(/lifecycle/);
    });

    it("row 22: babies (id, user_id) owner key, table-scoped guard, and the only constraint added outside the loop besides the pointer", () => {
      expect(forward.flat).toMatch(/conrelid = 'public\.babies'::regclass AND conname = 'babies_id_user_id_key'/);
      expect(forward.flat).toMatch(/ALTER TABLE public\.babies ADD CONSTRAINT babies_id_user_id_key UNIQUE \(id, user_id\);/);
      const added = [...forward.flat.matchAll(/ADD CONSTRAINT ([a-z_%I]+)/g)].map((m) => m[1]);
      expect(added).toEqual(["journeys_current_pregnancy_episode_owner_fkey", "%I", "babies_id_user_id_key"]);
    });
  });

  describe("scope held: nothing destructive, nothing from later subphases", () => {
    it("L: forward file contains no DML, no destructive DDL, no enum change", () => {
      for (const re of DML) expect(forward.flat).not.toMatch(re);
      for (const re of DESTRUCTIVE_DDL) expect(forward.flat).not.toMatch(re);
      // the one permitted DROP is the idempotent trigger re-create on our own table
      const drops = [...forward.flat.matchAll(/\bDROP\b[^;]*;/gi)].map((m) => m[0]);
      expect(drops).toEqual(["DROP TRIGGER IF EXISTS pregnancy_episodes_set_updated_at ON public.pregnancy_episodes;"]);
    });

    it("does not touch deferred or legacy objects, functions or the backfill log", () => {
      for (const name of [
        "reflections_user_id_week_key", "week_photos_user_id_week_key",
        "week_media_memories_user_id_week_media_type_key", "birth_plans_user_id_key",
        "hospital_bag_items_user_id_category_item_key_key", "babies_user_birth_order_idx",
        "babies_one_primary_per_user_idx", "first_year_entries_baby_id_fkey",
        "first_year_care_events_baby_id_fkey", "first_year_memories_baby_id_fkey",
        "first_year_reminders_baby_id_fkey",
      ]) {
        for (const f of ALL_FILES) expect(f.flat).not.toContain(name);
      }
      for (const f of ALL_FILES) {
        expect(f.flat).not.toMatch(/baby_id, user_id/);
        expect(f.flat).not.toMatch(/pregnancy_journeys|saved_journeys|archived_journeys|first_year_/);
        expect(f.flat).not.toMatch(/CREATE (OR REPLACE )?FUNCTION/i);
        expect(f.flat).not.toMatch(/family_entity_backfill_log/);
        expect(f.flat).not.toMatch(/\b(60|sixty)\b/i);
      }
    });
  });

  describe("validate file (S1, second step)", () => {
    it("validates every NOT VALID link and nothing else", () => {
      const validated = [...validate.flat.matchAll(/ALTER TABLE public\.([a-z_]+) VALIDATE CONSTRAINT ([a-z_]+);/g)].map((m) => ({
        table: m[1],
        name: m[2],
      }));
      expect(validated.map((v) => v.name).sort()).toEqual([...LINK_FKS].sort());
      for (const v of validated) expect(v.name).toBe(v.table === "journeys" ? "journeys_current_pregnancy_episode_owner_fkey" : `${v.table}_pregnancy_episode_owner_fkey`);
      const statements = validate.flat.split(";").map((s) => s.trim()).filter(Boolean);
      expect(statements).toHaveLength(1 + 13); // SET LOCAL + 13 validations
      expect((validate.flat.match(/\bALTER TABLE\b/g) ?? []).length).toBe(13);
    });

    it("validate file changes no data and drops nothing", () => {
      for (const re of DML) expect(validate.flat).not.toMatch(re);
      for (const re of DESTRUCTIVE_DDL) expect(validate.flat).not.toMatch(re);
    });
  });

  describe("rollback file (S7)", () => {
    it("refuses to run when any new-model row or later-phase dependency exists", () => {
      expect(rollback.flat).toMatch(/SELECT count\(\*\) FROM public\.pregnancy_episodes/);
      expect(rollback.flat).toMatch(/SELECT count\(\*\) FROM public\.journeys WHERE current_pregnancy_episode_id IS NOT NULL/);
      expect(rollback.flat).toMatch(/SELECT count\(\*\) FROM public\.%I WHERE pregnancy_episode_id IS NOT NULL/);
      expect(rollback.flat).toMatch(/confrelid = 'public\.pregnancy_episodes'::regclass AND conname <> ALL \(expected_fks\)/);
      expect(rollback.flat).toMatch(/u\.conname = 'babies_id_user_id_key'/);
      const refusals = [...rollback.flat.matchAll(/RAISE EXCEPTION 'ROLLBACK REFUSED/g)];
      expect(refusals).toHaveLength(5);
      // the guard runs before the first drop
      const firstRefusal = rollback.flat.indexOf("RAISE EXCEPTION 'ROLLBACK REFUSED");
      const firstDrop = rollback.flat.search(/\bDROP\b/);
      expect(firstRefusal).toBeGreaterThan(-1);
      expect(firstDrop).toBeGreaterThan(firstRefusal);
    });

    it("guard list of expected foreign keys matches the links the forward file creates", () => {
      const m = rollback.flat.match(/expected_fks text\[\] := ARRAY\[([^\]]*)\]/);
      expect(m).not.toBeNull();
      const listed = [...(m as RegExpMatchArray)[1].matchAll(/'([a-z_]+)'/g)].map((x) => x[1]);
      expect(listed.sort()).toEqual([...LINK_FKS].sort());
    });

    it("whitelist: every DROP in the rollback names a 41B.1A-owned object, and every owned object is dropped", () => {
      const r = rollback.flat;

      const droppedColumns = [...r.matchAll(/ALTER TABLE public\.([a-z_%I]+) DROP COLUMN(?: IF EXISTS)? ([a-z_]+)/g)].map((m) => `${m[1]}.${m[2]}`);
      expect(droppedColumns.sort()).toEqual(["%I.pregnancy_episode_id", "journeys.current_pregnancy_episode_id"]);
      expect(r).toMatch(/DROP COLUMN IF EXISTS pregnancy_episode_id', t\)/); // the %I is the loop variable

      const droppedConstraints = [...r.matchAll(/ALTER TABLE public\.([a-z_%I]+) DROP CONSTRAINT(?: IF EXISTS)? ([a-z_%I]+)/g)].map((m) => `${m[1]}.${m[2]}`);
      expect(droppedConstraints.sort()).toEqual(["%I.%I", "babies.babies_id_user_id_key", "journeys.journeys_current_pregnancy_episode_owner_fkey"]);
      expect(r).toMatch(/DROP CONSTRAINT IF EXISTS %I', t, t \|\| '_pregnancy_episode_owner_fkey'\)/);

      const droppedIndexes = [...r.matchAll(/DROP INDEX(?: IF EXISTS)? (?:public\.)?([a-z_%I]+)/g)].map((m) => m[1]);
      expect(droppedIndexes.sort()).toEqual(["%I", "journeys_current_pregnancy_episode_idx", "pregnancy_episodes_one_open_per_user_idx", "pregnancy_episodes_user_id_idx"].sort());
      expect(r).toMatch(/DROP INDEX IF EXISTS public\.%I', t \|\| '_pregnancy_episode_idx'\)/);

      const droppedPolicies = [...r.matchAll(/DROP POLICY(?: IF EXISTS)? ([a-z_]+) ON ([a-z_.]+)/g)].map((m) => `${m[2]}.${m[1]}`);
      expect(droppedPolicies.sort()).toEqual(
        ["select", "insert", "update", "delete"].map((op) => `public.pregnancy_episodes.pregnancy_episodes_${op}_own`).sort(),
      );

      const droppedTriggers = [...r.matchAll(/DROP TRIGGER(?: IF EXISTS)? ([a-z_]+) ON ([a-z_.]+)/g)].map((m) => `${m[2]}.${m[1]}`);
      expect(droppedTriggers).toEqual(["public.pregnancy_episodes.pregnancy_episodes_set_updated_at"]);

      const droppedTables = [...r.matchAll(/DROP TABLE(?: IF EXISTS)? (?:public\.)?([a-z_]+)/g)].map((m) => m[1]);
      expect(droppedTables).toEqual(["pregnancy_episodes"]);

      // every DROP is one of the categories above: nothing uncategorised (no DROP TYPE / FUNCTION / SCHEMA / ROLE)
      const totalDrops = (r.match(/\bDROP\b/g) ?? []).length;
      expect(totalDrops).toBe(
        droppedColumns.length + droppedConstraints.length + droppedIndexes.length +
        droppedPolicies.length + droppedTriggers.length + droppedTables.length,
      );
      expect(totalDrops).toBe(15);
      // every DROP uses IF EXISTS so a partial forward run can still be reversed; none cascades
      for (const d of r.matchAll(/\bDROP (TABLE|INDEX|POLICY|TRIGGER|CONSTRAINT|COLUMN)\b(?: IF EXISTS)?/g)) expect(d[0]).toMatch(/IF EXISTS$/);
      expect(r).not.toMatch(/\bCASCADE\b/);
    });

    it("dependency order: pointer, looped links, babies key, policies, trigger, indexes, table", () => {
      const order = [
        "DROP CONSTRAINT IF EXISTS journeys_current_pregnancy_episode_owner_fkey",
        "DROP INDEX IF EXISTS public.journeys_current_pregnancy_episode_idx",
        "DROP COLUMN IF EXISTS current_pregnancy_episode_id",
        "FOREACH t IN ARRAY tables LOOP EXECUTE format('ALTER TABLE public.%I DROP CONSTRAINT",
        "DROP CONSTRAINT IF EXISTS babies_id_user_id_key",
        "DROP POLICY IF EXISTS pregnancy_episodes_select_own",
        "DROP TRIGGER IF EXISTS pregnancy_episodes_set_updated_at",
        "DROP INDEX IF EXISTS public.pregnancy_episodes_one_open_per_user_idx",
        "DROP TABLE IF EXISTS public.pregnancy_episodes",
      ].map((s) => rollback.flat.indexOf(s));
      for (const i of order) expect(i).toBeGreaterThan(-1);
      expect([...order].sort((a, b) => a - b)).toEqual(order);
    });

    it("rollback destroys no customer history: no DML, no enum change, no other table named", () => {
      for (const re of DML) expect(rollback.flat).not.toMatch(re);
      expect(rollback.flat).not.toMatch(/\bALTER TYPE\b/i);
      // every public.<name> that is not an index being dropped must be one of the three tables this phase touches
      const tablesNamed = new Set([...rollback.flat.matchAll(/(?<!DROP INDEX IF EXISTS )public\.([a-z_]+)/g)].map((m) => m[1]));
      expect([...tablesNamed].sort()).toEqual(["babies", "journeys", "pregnancy_episodes"]);
    });
  });
});
