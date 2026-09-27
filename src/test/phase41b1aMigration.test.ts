import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Static SQL-contract tests only. They do NOT prove runtime database behaviour,
// which stays PENDING APPLICATION until the migration is applied.
const raw = readFileSync(
  resolve(process.cwd(), "docs/strategy/migrations-pending/41b1a_family_entity_foundation.sql"),
  "utf8",
);
const sql = raw.replace(/--[^\n]*/g, ""); // strip comments
const flat = sql.replace(/\s+/g, " ");

const LINKED = [
  "reflections", "week_photos", "week_media_memories", "pregnancy_appointments",
  "pregnancy_symptom_notes", "baby_movement_notes", "birth_plans", "hospital_bag_items",
  "midwife_questions", "contraction_sessions", "contraction_events", "babies",
];

describe("Phase 41B.1A pending migration (static contract)", () => {
  it("creates the pregnancy episode entity with an (id, user_id) owner key", () => {
    expect(flat).toMatch(/CREATE TABLE IF NOT EXISTS public\.pregnancy_episodes/);
    expect(flat).toMatch(/pregnancy_episodes_pkey PRIMARY KEY \(id\)/);
    expect(flat).toMatch(/pregnancy_episodes_id_user_id_key UNIQUE \(id, user_id\)/);
  });

  it("A/C: no plain unique on user_id, so one person may hold many episodes", () => {
    expect(flat).not.toMatch(/UNIQUE \(user_id\)/);
  });

  it("B: partial unique index allows only one active episode per user", () => {
    expect(flat).toMatch(/CREATE UNIQUE INDEX IF NOT EXISTS \S+ ON public\.pregnancy_episodes \(user_id\) WHERE status = 'active'/);
  });

  it("J: expected_count accepts null or 1 to 4", () => {
    expect(flat).toMatch(/CHECK \(expected_count IS NULL OR expected_count BETWEEN 1 AND 4\)/);
  });

  it("has four owner policies with explicit WITH CHECK on insert and update", () => {
    for (const op of ["select", "insert", "update", "delete"]) {
      expect(flat).toContain(`pregnancy_episodes_${op}_own`);
    }
    expect(flat).toMatch(/FOR INSERT TO authenticated WITH CHECK \(auth\.uid\(\) = user_id\)/);
    expect(flat).toMatch(/FOR UPDATE TO authenticated USING \(auth\.uid\(\) = user_id\) WITH CHECK \(auth\.uid\(\) = user_id\)/);
    expect(flat).toMatch(/ENABLE ROW LEVEL SECURITY/);
  });

  it("D/E: 12 tables gain a nullable episode id with a composite same-user FK (RESTRICT)", () => {
    for (const t of LINKED) expect(flat).toContain(`'${t}'`);
    expect(flat).toMatch(/ADD COLUMN IF NOT EXISTS pregnancy_episode_id uuid'/);
    expect(flat).toMatch(/FOREIGN KEY \(pregnancy_episode_id, user_id\) ' 'REFERENCES public\.pregnancy_episodes \(id, user_id\) ON DELETE RESTRICT/);
  });

  it("F: journeys pointer is nullable with a composite same-user FK", () => {
    expect(flat).toMatch(/ADD COLUMN IF NOT EXISTS active_pregnancy_episode_id uuid;/);
    expect(flat).toMatch(/FOREIGN KEY \(active_pregnancy_episode_id, user_id\) REFERENCES public\.pregnancy_episodes \(id, user_id\)/);
  });

  it("13 episode ownership links in total (12 looped + journeys)", () => {
    expect(LINKED.length + 1).toBe(13);
  });

  it("G: new link columns are never NOT NULL", () => {
    expect(flat).not.toMatch(/pregnancy_episode_id uuid NOT NULL/);
    expect(flat).not.toMatch(/SET NOT NULL/);
  });

  it("H/I: no child row required, and no unique on babies' episode link", () => {
    expect(flat).not.toMatch(/UNIQUE \(pregnancy_episode_id\)/);
  });

  it("adds babies (id, user_id) owner key", () => {
    expect(flat).toMatch(/babies_id_user_id_key UNIQUE \(id, user_id\)/);
  });

  it("L: forward migration contains no destructive or backfill statements", () => {
    expect(flat).not.toMatch(/(^|;|BEGIN|THEN|LOOP)\s*UPDATE\s+(public\.)?\w+/i);
    expect(flat).not.toMatch(/\bDELETE\s+FROM\b/i);
    expect(flat).not.toMatch(/\bTRUNCATE\b/i);
    expect(flat).not.toMatch(/\bDROP\s+(TABLE|COLUMN|CONSTRAINT|POLICY|INDEX|TRIGGER)\b/i);
    expect(flat).not.toMatch(/\bINSERT\s+INTO\b/i);
    expect(flat).toMatch(/ON DELETE RESTRICT/); // expected, must not fail
  });

  it("does not touch deferred constraints", () => {
    expect(flat).not.toMatch(/reflections_user_id_week_key/);
    expect(flat).not.toMatch(/baby_id, user_id/);
    expect(flat).not.toMatch(/archived_at/);
  });
});
