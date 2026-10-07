import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildSchema,
  evaluateAd1,
  isBlocking,
  type Ad1Report,
  type SqlSource,
} from "./support/accountDeletionInvariant";

// AD-1 — account-deletion cascade invariant (41B.0-R section 30.4), Layer 1 static contract.
// Discovery is dynamic: every blocking FK (RESTRICT / NO ACTION) to an account-owned or
// registered family parent found in the migration SQL is checked. The current-schema
// assertions further down are a regression net, not the discovery mechanism. Static text
// cannot prove runtime behaviour; the authoritative check is the Layer 2 catalogue query
// (docs/strategy/rehearsal-support/ad1-catalogue-contract.sql) in the targeted rehearsal.

const root = process.cwd();
const read = (p: string) => readFileSync(resolve(root, p), "utf8");
const MIGRATIONS = "supabase/migrations";
const PENDING = "docs/strategy/migrations-pending";
const LAYER2 = "docs/strategy/rehearsal-support/ad1-catalogue-contract.sql";

const repositorySources = (): SqlSource[] => [
  ...readdirSync(resolve(root, MIGRATIONS))
    .filter((f) => f.endsWith(".sql"))
    .sort()
    .map((f) => ({ name: `${MIGRATIONS}/${f}`, sql: read(`${MIGRATIONS}/${f}`) })),
  // Pending 41B.1A forward and validate files; the rollback is not part of the forward schema.
  { name: `${PENDING}/41b1a_family_entity_foundation.sql`, sql: read(`${PENDING}/41b1a_family_entity_foundation.sql`) },
  { name: `${PENDING}/41b1a_family_entity_foundation_validate.sql`, sql: read(`${PENDING}/41b1a_family_entity_foundation_validate.sql`) },
];

const withFixture = (sql: string): Ad1Report =>
  evaluateAd1(buildSchema([...repositorySources(), { name: "fixture.sql", sql }]));
const failuresFor = (report: Ad1Report, table: string) =>
  report.results.filter((r) => r.fk.table === table && r.status === "FAIL").flatMap((r) => r.reasons);

const repo = buildSchema(repositorySources());
const report = evaluateAd1(repo);
const episodeLinks = report.results.filter((r) => r.fk.refTable === "public.pregnancy_episodes");

// Regression list only (41B.0-R / 41B.1A ledger, read from the frozen forward file).
const EXPECTED_EPISODE_LINKS = [
  "public.journeys.journeys_current_pregnancy_episode_owner_fkey",
  ...[
    "reflections", "week_photos", "week_media_memories", "pregnancy_appointments",
    "pregnancy_symptom_notes", "baby_movement_notes", "birth_plans", "hospital_bag_items",
    "midwife_questions", "contraction_sessions", "contraction_events", "babies",
  ].map((t) => `public.${t}.${t}_pregnancy_episode_owner_fkey`),
].sort();

describe("AD-1 Layer 1: repository schema model", () => {
  it("parses every migration and the pending 41B.1A forward/validate files with zero fail-closed errors", () => {
    expect(repo.errors).toEqual([]);
  });

  it("models the expected account and family tables", () => {
    for (const t of ["public.pregnancy_episodes", "public.babies", "public.journeys", "public.contraction_events"]) {
      expect(repo.tables.has(t), t).toBe(true);
    }
  });

  it("both registered family parents are account-owned (NOT NULL user_id, direct auth.users CASCADE)", () => {
    expect(report.protectedParents).toEqual(expect.arrayContaining(["public.babies", "public.pregnancy_episodes"]));
    expect(report.errors).toEqual([]);
  });
});

describe("AD-1 Layer 1: dynamic discovery over the current schema", () => {
  it("discovers protected blocking relationships and every one satisfies AD-1", () => {
    expect(report.results.length).toBeGreaterThan(0);
    for (const r of report.results) expect(r.reasons, `${r.fk.table}.${r.fk.name}`).toEqual([]);
    expect(report.status).toBe("PASS");
  });

  it("every discovered relationship carries the exact same user_id on both sides and a direct CASCADE account FK", () => {
    for (const r of report.results) {
      const pos = r.fk.columns.indexOf("user_id");
      expect(pos, r.fk.name).toBeGreaterThanOrEqual(0);
      expect(r.fk.refColumns?.[pos], r.fk.name).toBe("user_id");
      expect(r.directAuthFk?.table).toBe(r.fk.table);
      expect(r.directAuthFk?.refTable).toBe("auth.users");
      expect(r.directAuthFk?.onDelete).toBe("cascade");
      expect(repo.tables.get(r.fk.table)?.columns.get("user_id")?.notNull).toBe(true);
    }
  });

  it("non-blocking First Year links to babies (CASCADE / SET NULL) are not classified as AD-1 relationships", () => {
    const babyFks = [...repo.tables.values()].flatMap((t) => [...t.fks.values()]).filter((fk) => fk.refTable === "public.babies");
    expect(babyFks.map((fk) => `${fk.table}:${fk.onDelete}`).sort()).toEqual([
      "public.first_year_care_events:cascade",
      "public.first_year_entries:cascade",
      "public.first_year_memories:set null",
      "public.first_year_reminders:cascade",
    ]);
    expect(babyFks.some(isBlocking)).toBe(false);
    expect(report.results.filter((r) => r.fk.refTable === "public.babies")).toEqual([]);
  });
});

describe("AD-1 current Pregnancy Episode contract (regression assertion, separate from discovery)", () => {
  it("exactly 13 protected Pregnancy Episode ownership FKs exist, with the ledger names", () => {
    expect(episodeLinks).toHaveLength(13);
    expect(episodeLinks.map((r) => `${r.fk.table}.${r.fk.name}`).sort()).toEqual(EXPECTED_EPISODE_LINKS);
  });

  it("every one is ON DELETE RESTRICT, NOT DEFERRABLE, composite (link, user_id) -> (id, user_id), and AD-1 PASS", () => {
    for (const r of episodeLinks) {
      expect(r.fk.onDelete, r.fk.name).toBe("restrict");
      expect(r.fk.deferrable, r.fk.name).toBe(false);
      expect(r.fk.initiallyDeferred, r.fk.name).toBe(false);
      expect(r.fk.columns[1], r.fk.name).toBe("user_id");
      expect(r.fk.refColumns, r.fk.name).toEqual(["id", "user_id"]);
      expect(r.status, r.fk.name).toBe("PASS");
    }
  });

  it("a future 14th link is evaluated by the generic checks, not hidden by the historical count", () => {
    const good = withFixture(`
      CREATE TABLE public.episode_notes_v2 (
        id uuid PRIMARY KEY, user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        pregnancy_episode_id uuid,
        CONSTRAINT episode_notes_v2_owner_fkey FOREIGN KEY (pregnancy_episode_id, user_id)
          REFERENCES public.pregnancy_episodes (id, user_id) ON DELETE RESTRICT
      );`);
    expect(good.results.filter((r) => r.fk.refTable === "public.pregnancy_episodes")).toHaveLength(14);
    expect(good.status).toBe("PASS");
    const bad = withFixture(`
      CREATE TABLE public.episode_notes_v2 (
        id uuid PRIMARY KEY, user_id uuid NOT NULL, pregnancy_episode_id uuid,
        FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES public.pregnancy_episodes (id, user_id) ON DELETE RESTRICT
      );`);
    expect(bad.results.filter((r) => r.fk.refTable === "public.pregnancy_episodes")).toHaveLength(14);
    expect(bad.status).toBe("FAIL");
  });
});

describe("AD-1 negative fixtures (synthetic; no migration is edited)", () => {
  it("1. protected RESTRICT relationship with no auth.users cascade fails (F/I)", () => {
    const r = withFixture(`
      CREATE TABLE public.orphan_notes (id uuid PRIMARY KEY, user_id uuid NOT NULL, pregnancy_episode_id uuid,
        FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES public.pregnancy_episodes (id, user_id) ON DELETE RESTRICT);`);
    expect(r.status).toBe("FAIL");
    expect(failuresFor(r, "public.orphan_notes").join(" ")).toMatch(/^F\/I: no direct user_id -> auth\.users FK/);
  });

  it("2. account FK exists but uses SET NULL: fails (H), and the nullable owner fails E", () => {
    const r = withFixture(`
      CREATE TABLE public.setnull_notes (id uuid PRIMARY KEY,
        user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL, pregnancy_episode_id uuid,
        FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES public.pregnancy_episodes (id, user_id) ON DELETE RESTRICT);`);
    const reasons = failuresFor(r, "public.setnull_notes").join(" | ");
    expect(r.status).toBe("FAIL");
    expect(reasons).toMatch(/H: account FK ON DELETE SET NULL, not CASCADE/);
    expect(reasons).toMatch(/E: referencing user_id is nullable/);
  });

  it("3. protected composite uses owner_id while the account FK uses an unrelated user_id: fails (C)", () => {
    const r = withFixture(`
      CREATE TABLE public.owner_mismatch (id uuid PRIMARY KEY,
        user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        owner_id uuid NOT NULL, pregnancy_episode_id uuid,
        FOREIGN KEY (pregnancy_episode_id, owner_id) REFERENCES public.pregnancy_episodes (id, user_id) ON DELETE RESTRICT);`);
    expect(r.status).toBe("FAIL");
    expect(failuresFor(r, "public.owner_mismatch").join(" ")).toMatch(/C: protected FK does not include the referencing table's user_id/);
  });

  it("4. two-hop-only account path (cascade via another account-owned table) fails (F/I)", () => {
    const r = withFixture(`
      CREATE TABLE public.y_parent (id uuid PRIMARY KEY, user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        UNIQUE (id, user_id));
      CREATE TABLE public.x_dependant (id uuid PRIMARY KEY, user_id uuid NOT NULL, y_id uuid NOT NULL, pregnancy_episode_id uuid NOT NULL,
        FOREIGN KEY (y_id, user_id) REFERENCES public.y_parent (id, user_id) ON DELETE CASCADE,
        FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES public.pregnancy_episodes (id, user_id) ON DELETE RESTRICT);`);
    expect(r.status).toBe("FAIL");
    expect(failuresFor(r, "public.x_dependant").join(" ")).toMatch(/two-hop paths do not satisfy AD-1/);
  });

  it("5. protected FK grammar the parser cannot safely understand fails closed", () => {
    const cases: Array<[string, RegExp]> = [
      // dynamic SQL outside the recognised loop shape
      [`DO $$ BEGIN EXECUTE 'ALTER TABLE public.x ADD CONSTRAINT x_fk FOREIGN KEY (e, user_id) REFERENCES public.pregnancy_episodes (id, user_id) ON DELETE RESTRICT'; END $$;`,
        /dynamic EXECUTE outside the recognised loop pattern/],
      // unexpected text after the FK clause
      [`ALTER TABLE public.reflections ADD CONSTRAINT r2 FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES public.pregnancy_episodes (id, user_id) ON DELETE RESTRICT USING INDEX foo;`,
        /unexpected text after foreign key/],
      // unknown referential action
      [`ALTER TABLE public.reflections ADD CONSTRAINT r3 FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES public.pregnancy_episodes (id, user_id) ON DELETE VANISH;`,
        /unknown referential action/],
      // REFERENCES outside CREATE / ALTER TABLE
      [`COMMENT ON TABLE public.reflections IS NULL; SELECT 1 references;`, /REFERENCES outside CREATE\/ALTER TABLE/],
      // unsupported ALTER TABLE action and rename
      [`ALTER TABLE public.reflections INHERIT public.week_photos;`, /unsupported ALTER TABLE action/],
      [`ALTER TABLE public.reflections RENAME COLUMN user_id TO owner_id;`, /RENAME on public\.reflections is not supported/],
      // DDL hidden in a string literal
      [`SELECT 'alter table public.babies drop constraint babies_user_id_fkey';`, /DDL-like text in a string literal/],
    ];
    for (const [sql, expected] of cases) {
      const r = withFixture(sql);
      expect(r.errors.join(" | "), sql).toMatch(expected);
      expect(r.status, sql).toBe("FAIL");
    }
  });

  it("later DROP NOT NULL on user_id or a dropped account FK breaks AD-1 for the existing 13", () => {
    const nullable = withFixture(`ALTER TABLE public.reflections ALTER COLUMN user_id DROP NOT NULL;`);
    expect(failuresFor(nullable, "public.reflections").join(" ")).toMatch(/E: referencing user_id is nullable/);
    const dropped = withFixture(`ALTER TABLE public.week_photos DROP CONSTRAINT week_photos_user_id_fkey;`);
    expect(failuresFor(dropped, "public.week_photos").join(" ")).toMatch(/two-hop paths do not satisfy AD-1/);
  });

  it("default NO ACTION and DEFERRABLE INITIALLY DEFERRED FKs are still blocking and still checked; casing is irrelevant", () => {
    const r = withFixture(`
      create table PUBLIC.Quiet_Notes (ID uuid primary key, User_Id uuid not null, Pregnancy_Episode_Id uuid,
        foreign key (pregnancy_episode_id, user_id) references Public.Pregnancy_Episodes (id, user_id));
      CREATE TABLE public.late_notes (id uuid PRIMARY KEY, user_id uuid NOT NULL, pregnancy_episode_id uuid,
        FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES public.pregnancy_episodes (id, user_id)
        ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED);`);
    expect(r.results.find((x) => x.fk.table === "public.quiet_notes")?.fk.onDelete).toBe("no action");
    expect(r.results.find((x) => x.fk.table === "public.late_notes")?.fk.initiallyDeferred).toBe(true);
    expect(failuresFor(r, "public.quiet_notes").length).toBeGreaterThan(0);
    expect(failuresFor(r, "public.late_notes").length).toBeGreaterThan(0);
  });

  it("a protected FK to the parent primary key only (single-column) fails D", () => {
    const r = withFixture(`
      CREATE TABLE public.pk_only (id uuid PRIMARY KEY, user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        pregnancy_episode_id uuid REFERENCES public.pregnancy_episodes ON DELETE RESTRICT);`);
    expect(failuresFor(r, "public.pk_only").join(" ")).toMatch(/C: protected FK does not include/);
    expect(failuresFor(r, "public.pk_only").join(" ")).toMatch(/D: protected FK references the parent primary key/);
  });

  it("zero discovered protected relationships fails (J)", () => {
    const empty = evaluateAd1(buildSchema([{ name: "empty.sql", sql: "CREATE TABLE public.t (id uuid PRIMARY KEY);" }]));
    expect(empty.status).toBe("FAIL");
    expect(empty.errors.join(" ")).toMatch(/J: zero protected blocking relationships/);
  });

  it("a registered family parent whose account ownership cannot be established fails", () => {
    const r = withFixture(`ALTER TABLE public.babies DROP CONSTRAINT babies_user_id_fkey;`);
    expect(r.errors.join(" ")).toMatch(/registered protected parent public\.babies exists but its account ownership cannot be established/);
    expect(r.status).toBe("FAIL");
  });
});

describe("AD-1 baby / First Year forward compatibility (41B.1C)", () => {
  it("a composite RESTRICT link to babies from a table with a direct account cascade passes", () => {
    const r = withFixture(`
      ALTER TABLE public.first_year_entries
        ADD CONSTRAINT first_year_entries_baby_owner_fkey FOREIGN KEY (baby_id, user_id)
        REFERENCES public.babies (id, user_id) ON DELETE RESTRICT NOT VALID;`);
    const link = r.results.find((x) => x.fk.name === "first_year_entries_baby_owner_fkey");
    expect(link?.status).toBe("PASS");
    expect(r.status).toBe("PASS");
  });

  it("a single-column RESTRICT link to babies fails (no same-user ownership)", () => {
    const r = withFixture(`
      ALTER TABLE public.first_year_reminders DROP CONSTRAINT first_year_reminders_baby_id_fkey;
      ALTER TABLE public.first_year_reminders ADD CONSTRAINT first_year_reminders_baby_id_fkey
        FOREIGN KEY (baby_id) REFERENCES public.babies (id) ON DELETE RESTRICT;`);
    expect(r.status).toBe("FAIL");
    expect(failuresFor(r, "public.first_year_reminders").join(" ")).toMatch(/C: protected FK does not include/);
  });

  it("a NO ACTION link to babies from a two-hop-only table fails", () => {
    const r = withFixture(`
      CREATE TABLE public.baby_photo_tags (id uuid PRIMARY KEY, user_id uuid NOT NULL, memory_id uuid NOT NULL, baby_id uuid NOT NULL,
        FOREIGN KEY (memory_id) REFERENCES public.first_year_memories (id) ON DELETE CASCADE,
        FOREIGN KEY (baby_id, user_id) REFERENCES public.babies (id, user_id));`);
    expect(r.status).toBe("FAIL");
    expect(failuresFor(r, "public.baby_photo_tags").join(" ")).toMatch(/two-hop paths do not satisfy AD-1/);
  });

  it("a blocking link to any new account-owned parent is discovered without registration", () => {
    const r = withFixture(`
      CREATE TABLE public.siblings (id uuid PRIMARY KEY, user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, UNIQUE (id, user_id));
      CREATE TABLE public.sibling_notes (id uuid PRIMARY KEY, user_id uuid NOT NULL, sibling_id uuid,
        FOREIGN KEY (sibling_id, user_id) REFERENCES public.siblings (id, user_id) ON DELETE RESTRICT);`);
    expect(r.protectedParents).toContain("public.siblings");
    expect(failuresFor(r, "public.sibling_notes").length).toBeGreaterThan(0);
  });
});

describe("AD-1 Layer 2 catalogue contract file (static checks only; never executed by this suite)", () => {
  const sql = read(LAYER2);
  const noComments = sql.replace(/--[^\n]*/g, " ");
  const body = noComments.replace(/'[^']*'/g, "''");

  it("is read-only: no DDL, DML, transaction control, grants or SET", () => {
    expect(body).not.toMatch(/\b(insert|update|delete|merge|create|alter|drop|truncate|grant|revoke|comment|copy|vacuum|begin|commit|rollback|savepoint|set|reset|lock|call|do)\b\s/i);
  });

  it("returns every required output column", () => {
    for (const col of [
      "parent_schema", "parent_table", "protected_constraint", "referencing_schema", "referencing_table",
      "protected_fk_columns", "protected_delete_action", "protected_deferrable", "ownership_user_column",
      "direct_auth_fk_name", "direct_auth_fk_columns", "direct_auth_delete_action", "auth_reference_target",
      "user_id_not_null", "same_user_column_proven", "ad1_status", "failure_reason",
    ]) expect(body, col).toMatch(new RegExp(`\\bas\\s+${col}\\b`, "i"));
  });

  it("discovers dynamically from pg_constraint and states the gate (FAIL = 0, Episode links = 13)", () => {
    expect(body).toMatch(/from\s+pg_catalog\.pg_constraint/i);
    expect(noComments).toMatch(/confdeltype\s+in\s*\(\s*'r'\s*,\s*'a'\s*\)/i);
    expect(sql).toMatch(/fail_count\s*=\s*0/i);
    expect(sql).toMatch(/episode_link_count\s*=\s*13/i);
  });

  it("names no project ref and is not a migration", () => {
    expect(sql).not.toMatch(/wogepxfipdipogyogced|wwtcnbjhttjtklpxhrkd|dlftnirrnirlkhxpofoq/);
    expect(LAYER2.startsWith("supabase/")).toBe(false);
  });
});

describe("frozen 41B.1A SQL is byte-identical to the C1-rehearsed files", () => {
  it.each([
    ["41b1a_family_entity_foundation.sql", "e6ad0bc82b245beb03131023bb9ce122a451f40c2fe9b75cd43f047b674585cb"],
    ["41b1a_family_entity_foundation_validate.sql", "8645fd67f0b0211beb613b9d440e1f964d50e737f31862c11292c0103781b508"],
    ["41b1a_family_entity_foundation_rollback.sql", "0d00895514b4e2dc623383436952fd534d5f879cdf4011024596dae303a36077"],
  ])("%s", (file, sha) => {
    expect(createHash("sha256").update(readFileSync(resolve(root, PENDING, file))).digest("hex")).toBe(sha);
  });
});
