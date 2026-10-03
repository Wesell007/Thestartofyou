import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Static SQL-contract tests for the pending 41B.1A foundation files.
// They prove the properties the 41B.0-R reconciliation requires (S8) from the text of
// the files. They do NOT prove runtime database behaviour, which stays PENDING
// APPLICATION until the 41B.1A-C1 rehearsal runs the files.

const PENDING = "docs/strategy/migrations-pending";
const load = (name: string) => {
  const raw = readFileSync(resolve(process.cwd(), PENDING, name), "utf8");
  const noComments = raw.replace(/--[^\n]*/g, "");
  return { raw, flat: noComments.replace(/\s+/g, " ").trim() };
};

const forward = load("41b1a_family_entity_foundation.sql");
const validate = load("41b1a_family_entity_foundation_validate.sql");
const rollback = load("41b1a_family_entity_foundation_rollback.sql");

// Parse the looped table list from the SQL itself (S8: never count our own array).
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
// DML and destructive statement detectors. They match whole statements, so
// "BEFORE UPDATE ON", "FOR UPDATE TO", "ON DELETE RESTRICT" and "GRANT SELECT" do not trip them.
const DML = [
  /\bUPDATE\s+(?:public\.)?[a-z_%I]+\s+SET\b/i,
  /\bINSERT\s+INTO\b/i,
  /\bDELETE\s+FROM\b/i,
  /\bTRUNCATE\b/i,
  // SELECT may appear only as a privilege word (GRANT SELECT ON / FOR SELECT TO), a catalogue
  // existence check (SELECT 1 FROM pg_* / information_schema) or an aggregate count.
  /\bSELECT\s+(?!1\s+FROM\s+(?:pg_|information_schema\.)|count\(\*\)|ON\b|TO\b)/i,
];
const DESTRUCTIVE_DDL = [
  /\bDROP\s+(TABLE|COLUMN|CONSTRAINT|POLICY|INDEX|TYPE|FUNCTION|SCHEMA)\b/i,
  /\bALTER\s+TYPE\b/i,
  /\bSET\s+NOT\s+NULL\b/i,
  /\bALTER\s+TABLE\s+(?:public\.)?[a-z_%I]+\s+DROP\b/i,
  /\bRENAME\b/i,
];

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

    it("S6: no transaction control in any file", () => {
      for (const f of [forward, validate, rollback]) {
        expect(f.flat).not.toMatch(/\bBEGIN\s*;/i);
        expect(f.flat).not.toMatch(/\bCOMMIT\b/i);
        expect(f.flat).not.toMatch(/\bROLLBACK\s*;/i);
      }
    });

    it("S1: every file bounds lock waits with SET LOCAL lock_timeout", () => {
      for (const f of [forward, validate, rollback]) {
        expect(f.flat).toMatch(/SET LOCAL lock_timeout = '\d+s';/);
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

    it("account-level cascade is intentional: user_id references auth.users ON DELETE CASCADE", () => {
      expect(forward.flat).toMatch(
        /CONSTRAINT pregnancy_episodes_user_id_fkey FOREIGN KEY \(user_id\) REFERENCES auth\.users \(id\) ON DELETE CASCADE/,
      );
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

    it("S13 (final): removed_at is an episode-local nullable timestamptz, orthogonal to status", () => {
      expect(forward.flat).toMatch(/\bremoved_at timestamptz,/);
      expect(forward.flat).not.toMatch(/removed_at timestamptz NOT NULL/);
      expect(forward.flat).not.toMatch(/'removed'/);
      expect(forward.flat).not.toMatch(/\bALTER TYPE\b/i);
      expect(forward.flat).not.toMatch(/ADD VALUE/i);
      // removal is not expressed through the status dimension
      expect(forward.flat).not.toMatch(/removed_at IS NOT NULL/);
    });

    it("S5 + S13: one OPEN episode per user — active or paused, and not removed", () => {
      expect(forward.flat).toMatch(
        /CREATE UNIQUE INDEX IF NOT EXISTS pregnancy_episodes_one_open_per_user_idx ON public\.pregnancy_episodes \(user_id\) WHERE status IN \('active', 'paused'\) AND removed_at IS NULL;/,
      );
      // the superseded one-active shape must be gone
      expect(forward.flat).not.toMatch(/WHERE status = 'active'/);
      expect(forward.flat).not.toMatch(/one_active_per_user/);
    });

    it("S3: plain (user_id) index kept", () => {
      expect(forward.flat).toMatch(/CREATE INDEX IF NOT EXISTS pregnancy_episodes_user_id_idx ON public\.pregnancy_episodes \(user_id\);/);
    });

    it("S11: updated_at trigger is drop-and-create on set_updated_at (no CREATE OR REPLACE TRIGGER)", () => {
      expect(forward.flat).toMatch(/DROP TRIGGER IF EXISTS pregnancy_episodes_set_updated_at ON public\.pregnancy_episodes;/);
      expect(forward.flat).toMatch(
        /CREATE TRIGGER pregnancy_episodes_set_updated_at BEFORE UPDATE ON public\.pregnancy_episodes FOR EACH ROW EXECUTE FUNCTION public\.set_updated_at\(\);/,
      );
      expect(forward.flat).not.toMatch(/CREATE OR REPLACE TRIGGER/i);
    });
  });

  describe("privileges and RLS", () => {
    it("S2: explicit revoke from PUBLIC, anon and authenticated before any grant", () => {
      const revokeAt = forward.flat.indexOf("REVOKE ALL ON TABLE public.pregnancy_episodes FROM PUBLIC, anon, authenticated;");
      const grantAt = forward.flat.indexOf("GRANT SELECT ON TABLE public.pregnancy_episodes TO authenticated;");
      expect(revokeAt).toBeGreaterThan(-1);
      expect(grantAt).toBeGreaterThan(revokeAt);
    });

    it("owner decision 2: authenticated gets SELECT only; service_role keeps ALL; no other table grant", () => {
      const grants = [...forward.flat.matchAll(/GRANT ([A-Z, ]+?) ON TABLE public\.([a-z_]+) TO ([a-z_]+);/g)].map((m) => ({
        privilege: m[1].trim(),
        table: m[2],
        role: m[3],
      }));
      expect(grants).toEqual([
        { privilege: "SELECT", table: "pregnancy_episodes", role: "authenticated" },
        { privilege: "ALL", table: "pregnancy_episodes", role: "service_role" },
      ]);
      expect(forward.flat).not.toMatch(/GRANT [^;]*\b(INSERT|UPDATE|DELETE)\b[^;]*TO authenticated/);
    });

    it("RLS enabled with four owner policies; INSERT and UPDATE carry explicit WITH CHECK", () => {
      expect(forward.flat).toMatch(/ALTER TABLE public\.pregnancy_episodes ENABLE ROW LEVEL SECURITY;/);
      for (const op of ["select", "insert", "update", "delete"]) {
        expect(forward.flat).toContain(`CREATE POLICY pregnancy_episodes_${op}_own ON public.pregnancy_episodes`);
      }
      expect(forward.flat).toMatch(/FOR SELECT TO authenticated USING \(auth\.uid\(\) = user_id\)/);
      expect(forward.flat).toMatch(/FOR INSERT TO authenticated WITH CHECK \(auth\.uid\(\) = user_id\)/);
      expect(forward.flat).toMatch(/FOR UPDATE TO authenticated USING \(auth\.uid\(\) = user_id\) WITH CHECK \(auth\.uid\(\) = user_id\)/);
      expect(forward.flat).toMatch(/FOR DELETE TO authenticated USING \(auth\.uid\(\) = user_id\)/);
      expect(forward.flat).not.toMatch(/FOR ALL\b/);
      expect(forward.flat).not.toMatch(/\bTO (public|anon)\b/);
      expect(forward.flat).not.toMatch(/AS RESTRICTIVE/i);
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
      expect(forward.flat).not.toMatch(/active_pregnancy_episode/);
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

    it("every episode link is RESTRICT and NOT VALID; nothing cascades from an episode", () => {
      const episodeRefs = [...forward.flat.matchAll(/REFERENCES public\.pregnancy_episodes \(id, user_id\)([^;']*)/g)].map((m) => m[1]);
      expect(episodeRefs).toHaveLength(2); // the journeys statement and the loop template
      for (const tail of episodeRefs) {
        expect(tail).toMatch(/ON DELETE RESTRICT NOT VALID/);
        expect(tail).not.toMatch(/CASCADE|SET NULL/);
      }
      // the only CASCADE is the account-level one
      const cascades = [...forward.flat.matchAll(/ON DELETE CASCADE/g)];
      expect(cascades).toHaveLength(1);
    });

    it("S10: existence guards are scoped to the table (conrelid), never by name alone", () => {
      const guards = [...forward.flat.matchAll(/FROM pg_constraint WHERE ([^)]*)\)/g)].map((m) => m[1]);
      expect(guards.length).toBeGreaterThanOrEqual(3);
      for (const g of guards) expect(g).toMatch(/conrelid = /);
      expect(forward.flat).not.toMatch(/FROM pg_constraint WHERE conname =/);
    });

    it("G: link columns are never NOT NULL (legacy and unlinked children stay valid)", () => {
      expect(forward.flat).not.toMatch(/pregnancy_episode_id uuid NOT NULL/);
      expect(forward.flat).not.toMatch(/current_pregnancy_episode_id uuid NOT NULL/);
      expect(forward.flat).not.toMatch(/SET NOT NULL/);
    });

    it("H/I: no child row required, no unique on any episode link, no pointer CHECK (row 19 is 41B.1D)", () => {
      expect(forward.flat).not.toMatch(/UNIQUE \(pregnancy_episode_id/);
      expect(forward.flat).not.toMatch(/UNIQUE \(current_pregnancy_episode_id/);
      expect(forward.flat).not.toMatch(/lifecycle/);
    });

    it("row 22: babies (id, user_id) owner key, table-scoped guard", () => {
      expect(forward.flat).toMatch(/conrelid = 'public\.babies'::regclass AND conname = 'babies_id_user_id_key'/);
      expect(forward.flat).toMatch(/ALTER TABLE public\.babies ADD CONSTRAINT babies_id_user_id_key UNIQUE \(id, user_id\);/);
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

    it("DML detector also covers text inside EXECUTE format strings", () => {
      // sanity: the detector must trip on a disguised update, otherwise the previous test proves nothing
      expect("EXECUTE format('UPDATE public.%I SET x = 1', t)").toMatch(DML[0]);
      expect("EXECUTE 'INSERT INTO public.x VALUES (1)'").toMatch(DML[1]);
      expect("EXECUTE format('DELETE FROM public.%I', t)").toMatch(DML[2]);
    });

    it("does not touch deferred or legacy objects", () => {
      for (const name of [
        "reflections_user_id_week_key", "week_photos_user_id_week_key",
        "week_media_memories_user_id_week_media_type_key", "birth_plans_user_id_key",
        "hospital_bag_items_user_id_category_item_key_key", "babies_user_birth_order_idx",
        "babies_one_primary_per_user_idx", "first_year_entries_baby_id_fkey",
        "first_year_care_events_baby_id_fkey", "first_year_memories_baby_id_fkey",
        "first_year_reminders_baby_id_fkey",
      ]) {
        expect(forward.flat).not.toContain(name);
      }
      expect(forward.flat).not.toMatch(/baby_id, user_id/);
      expect(forward.flat).not.toMatch(/archived_at/);
      expect(forward.flat).not.toMatch(/pregnancy_journeys|saved_journeys|archived_journeys/);
      expect(forward.flat).not.toMatch(/CREATE (OR REPLACE )?FUNCTION/i);
      expect(forward.flat).not.toMatch(/family_entity_backfill_log/);
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
      expect(refusals.length).toBeGreaterThanOrEqual(5);
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

    it("names and removes every object the forward file creates, in dependency order", () => {
      // journeys pointer first
      expect(rollback.flat).toMatch(/ALTER TABLE public\.journeys DROP CONSTRAINT IF EXISTS journeys_current_pregnancy_episode_owner_fkey;/);
      expect(rollback.flat).toMatch(/DROP INDEX IF EXISTS public\.journeys_current_pregnancy_episode_idx;/);
      expect(rollback.flat).toMatch(/ALTER TABLE public\.journeys DROP COLUMN IF EXISTS current_pregnancy_episode_id;/);
      // looped links
      expect(rollback.flat).toMatch(/DROP CONSTRAINT IF EXISTS %I', t, t \|\| '_pregnancy_episode_owner_fkey'/);
      expect(rollback.flat).toMatch(/DROP INDEX IF EXISTS public\.%I', t \|\| '_pregnancy_episode_idx'/);
      expect(rollback.flat).toMatch(/DROP COLUMN IF EXISTS pregnancy_episode_id', t/);
      // babies key, policies, trigger, indexes, table
      expect(rollback.flat).toMatch(/ALTER TABLE public\.babies DROP CONSTRAINT IF EXISTS babies_id_user_id_key;/);
      for (const op of ["select", "insert", "update", "delete"]) {
        expect(rollback.flat).toContain(`DROP POLICY IF EXISTS pregnancy_episodes_${op}_own ON public.pregnancy_episodes;`);
      }
      expect(rollback.flat).toMatch(/DROP TRIGGER IF EXISTS pregnancy_episodes_set_updated_at ON public\.pregnancy_episodes;/);
      expect(rollback.flat).toMatch(/DROP INDEX IF EXISTS public\.pregnancy_episodes_one_open_per_user_idx;/);
      expect(rollback.flat).toMatch(/DROP INDEX IF EXISTS public\.pregnancy_episodes_user_id_idx;/);
      expect(rollback.flat).toMatch(/DROP TABLE IF EXISTS public\.pregnancy_episodes;/);

      const order = [
        "DROP COLUMN IF EXISTS current_pregnancy_episode_id",
        "FOREACH t IN ARRAY tables LOOP EXECUTE format('ALTER TABLE public.%I DROP CONSTRAINT",
        "DROP CONSTRAINT IF EXISTS babies_id_user_id_key",
        "DROP POLICY IF EXISTS pregnancy_episodes_select_own",
        "DROP TRIGGER IF EXISTS pregnancy_episodes_set_updated_at",
        "DROP TABLE IF EXISTS public.pregnancy_episodes",
      ].map((s) => rollback.flat.indexOf(s));
      for (const i of order) expect(i).toBeGreaterThan(-1);
      expect([...order].sort((a, b) => a - b)).toEqual(order);
    });

    it("rollback destroys no customer history: drops only its own objects, no DML, no CASCADE drop", () => {
      for (const re of DML) expect(rollback.flat).not.toMatch(re);
      expect(rollback.flat).not.toMatch(/\bCASCADE\b/);
      const droppedTables = [...rollback.flat.matchAll(/DROP TABLE IF EXISTS public\.([a-z_]+)/g)].map((m) => m[1]);
      expect(droppedTables).toEqual(["pregnancy_episodes"]);
      expect(rollback.flat).not.toMatch(/\bALTER TYPE\b/i);
      expect(rollback.flat).not.toMatch(/pregnancy_journeys|saved_journeys|archived_journeys|first_year_/);
      // every DROP uses IF EXISTS so a partial forward run can still be reversed
      const drops = [...rollback.flat.matchAll(/\bDROP (TABLE|INDEX|POLICY|TRIGGER|CONSTRAINT|COLUMN)\b(?: IF EXISTS)?/g)];
      expect(drops.length).toBeGreaterThan(0);
      for (const d of drops) expect(d[0]).toMatch(/IF EXISTS$/);
    });
  });
});
