import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Static SQL-contract tests for the pending 41B.1A foundation files.
// They prove the properties the 41B.0-R reconciliation requires (S8) from the text of
// the files. They do NOT prove runtime database behaviour, which stays PENDING
// APPLICATION until the 41B.1A-C1 rehearsal runs the files.
//
// Hardened 3 October 2026 after the pre-push review (structural grant parsing, complete
// policy surface, rollback DROP whitelist, composite-FK enforcement, identifier length,
// wider DML / transaction detectors), then made case-insensitive after the independent
// review of that commit: SQL keyword casing must never decide whether a defect is seen.
// Every structural matcher is registered and asserted case-insensitive, captured
// identifiers are canonicalised, and each detector has an adversarial self-test.

const PENDING = "docs/strategy/migrations-pending";
const squash = (sql: string) => sql.replace(/\s+/g, " ").trim();
const lc = (s: string) => s.toLowerCase();
// Canonical identifier: unquoted SQL identifiers fold to lower case; the format() placeholder stays %I.
const ident = (s: string) => lc(s).replace(/%i/g, "%I");
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
// Structural matchers. All are registered here so a self-test can prove none depends on casing.
// ---------------------------------------------------------------------------
const M = {
  loopTables: /tables text\[\] := array\[([^\]]*)\]/i,
  quotedName: /'([a-z_]+)'/gi,
  grant: /\bgrant\s+([a-z ,()]+?)\s+on\s+(?:table\s+)?([a-z_."]+)\s+to\s+([a-z_, ]+?)\s*;/gi,
  grantToken: /\bgrant\b/gi,
  revoke: /\brevoke\b[^;]*;/gi,
  policyStatement: /create policy [^;]*;/gi,
  policyGuard: /tablename = '([a-z_]+)' and policyname = '([a-z_]+)'/gi,
  tableDef: /create table if not exists public\.pregnancy_episodes \((.*?)\); create unique index/i,
  constraintName: /(?<!pg_)constraint ([a-z_%i]+)/gi, // not the pg_constraint catalogue in the guards
  addConstraint: /add constraint ([a-z_%i]+)/gi,
  createIndex: /create (?:unique )?index if not exists ([a-z_%i]+) on public\.([a-z_%i]+)/gi,
  createUniqueIndex: /create unique index/gi,
  createTrigger: /create trigger/gi,
  createPolicy: /create policy/gi,
  foreignKey: /foreign key/gi,
  episodeRef: /references public\.pregnancy_episodes/gi,
  compositeEpisodeLink:
    /foreign key \((current_pregnancy_episode_id|pregnancy_episode_id), user_id\) references public\.pregnancy_episodes \(id, user_id\) on delete restrict not valid/gi,
  singleColumnEpisodeRef: /references public\.pregnancy_episodes\s*\(\s*id\s*\)/i,
  singleColumnEpisodeFk: /foreign key \((current_)?pregnancy_episode_id\)/i,
  cascadingEpisodeRef: /references public\.pregnancy_episodes[^;']*(?:cascade|set null|deferrable)/i,
  inlineValidatedEpisodeLink: /references public\.pregnancy_episodes \(id, user_id\) on delete restrict(?! not valid)/i,
  onDeleteCascade: /on delete cascade/gi,
  pgConstraintGuard: /from pg_constraint where ([^)]*)\)/gi,
  validateStatement: /alter table public\.([a-z_]+) validate constraint ([a-z_]+);/gi,
  alterTable: /\balter table\b/gi,
  dropAny: /\bdrop\b/gi,
  dropStatement: /\bdrop\b[^;]*;/gi,
  dropColumn: /alter table public\.([a-z_%i]+) drop column(?: if exists)? ([a-z_%i]+)/gi,
  dropConstraint: /alter table public\.([a-z_%i]+) drop constraint(?: if exists)? ([a-z_%i]+)/gi,
  dropIndex: /drop index(?: if exists)? (?:public\.)?([a-z_%i]+)/gi,
  dropPolicy: /drop policy(?: if exists)? ([a-z_]+) on ([a-z_.]+)/gi,
  dropTrigger: /drop trigger(?: if exists)? ([a-z_]+) on ([a-z_.]+)/gi,
  dropTable: /drop table(?: if exists)? (?:public\.)?([a-z_]+)/gi,
  dropObject: /\bdrop (table|index|policy|trigger|constraint|column)\b(?: if exists)?/gi,
  refusal: /raise exception 'rollback refused/gi,
  publicName: /(?<!drop index if exists )public\.([a-z_]+)/gi,
  expectedFks: /expected_fks text\[\] := array\[([^\]]*)\]/i,
};

const DML = [
  /\bupdate\s+(?:only\s+)?(?:public\.)?[a-z_%i"]+(?:\s+(?:as\s+)?[a-z_]+)?\s+set\b/i,
  /\binsert\s+into\b/i,
  /\bdelete\s+from\b/i,
  /\btruncate\b/i,
  /\bmerge\s+into\b/i,
  /\bcopy\b/i,
  // SELECT may appear only as a privilege word (GRANT SELECT ON / FOR SELECT TO), a catalogue
  // existence check (SELECT 1 FROM pg_* / information_schema) or an aggregate count.
  /\bselect\s+(?!1\s+from\s+(?:pg_|information_schema\.)|count\(\*\)|on\b|to\b)/i,
];
const DESTRUCTIVE_DDL = [
  /\bdrop\s+(table|column|constraint|policy|index|type|function|schema|role|sequence)\b/i,
  /\balter\s+type\b/i,
  /\bset\s+not\s+null\b/i,
  /\balter\s+table\s+(?:only\s+)?(?:public\.)?[a-z_%i"]+\s+drop\b/i,
  /\brename\b/i,
];
const TRANSACTION_CONTROL = [
  /\bbegin\s*;/i,
  /\bbegin\s+(transaction|work|isolation|read|deferrable)\b/i,
  /\bstart\s+transaction\b/i,
  /\bcommit\b/i,
  /\brollback\s*(;|to\b|work\b|transaction\b|prepared\b)/i,
  /\bsavepoint\b/i,
  /\bprepare\s+transaction\b/i,
];
const PRIVILEGE_ESCAPES = [
  /\bdisable\s+row\s+level\s+security\b/i,
  /\balter\s+policy\b/i,
  /\bon\s+all\s+(tables|sequences|functions|routines)\s+in\s+schema\b/i,
  /\balter\s+default\s+privileges\b/i,
  /\bsecurity\s+definer\b/i,
  /\bbypassrls\b/i,
];
const POLICY_ESCAPES = [/\bfor all\b/i, /\bto (public|anon)\b/i, /using \(true\)|with check \(true\)/i, /as (restrictive|permissive)/i];

const MAX_IDENTIFIER_BYTES = 63;

// ---------------------------------------------------------------------------
// Parsers (every one returns canonical lower-case identifiers)
// ---------------------------------------------------------------------------
const parseLoopTables = (flat: string): string[] => {
  const m = flat.match(M.loopTables);
  if (!m) return [];
  return [...m[1].matchAll(M.quotedName)].map((x) => ident(x[1]));
};

type Grant = { privileges: string[]; object: string; roles: string[] };
const ROLE_TOKEN = /^[a-z_][a-z0-9_]*$/;
const PRIVILEGE_TOKEN = /^(select|insert|update|delete|truncate|references|trigger|all|all privileges)$/;

const parseGrants = (sql: string): Grant[] =>
  [...squash(sql).matchAll(M.grant)].map((m) => ({
    privileges: m[1].split(",").map((p) => lc(p.trim())).filter(Boolean),
    object: lc(m[2]),
    roles: m[3].split(",").map((r) => lc(r.trim())).filter(Boolean),
  }));

// Approved surface: authenticated may hold SELECT only, on pregnancy_episodes only; anon and
// PUBLIC may hold nothing. Any token outside the accepted grammar is itself a violation
// (fail closed), so "GROUP authenticated" or "authenticated GRANTED BY x" can never read as safe.
const grantViolations = (grants: Grant[]): string[] => {
  const out: string[] = [];
  for (const g of grants) {
    const desc = `GRANT ${g.privileges.join(", ")} ON ${g.object} TO ${g.roles.join(", ")}`;
    for (const r of g.roles) if (!ROLE_TOKEN.test(r)) out.push(`unrecognised role token "${r}": ${desc}`);
    for (const p of g.privileges) if (!PRIVILEGE_TOKEN.test(p)) out.push(`unrecognised privilege token "${p}": ${desc}`);
    if (g.roles.some((r) => r === "anon" || r === "public")) out.push(`anon/PUBLIC granted: ${desc}`);
    if (g.roles.some((r) => r === "authenticated" || r.includes("authenticated"))) {
      if (g.object !== "public.pregnancy_episodes") out.push(`authenticated granted on another object: ${desc}`);
      if (g.privileges.length !== 1 || g.privileges[0] !== "select") out.push(`authenticated beyond SELECT: ${desc}`);
    }
  }
  return out;
};
// Fail-closed wrapper: every GRANT token must have produced exactly one parsed grant.
const grantAudit = (sql: string) => {
  const grants = parseGrants(sql);
  const tokens = (squash(sql).match(M.grantToken) ?? []).length;
  const violations = grantViolations(grants);
  if (grants.length !== tokens) violations.push(`unparsed GRANT syntax: ${tokens} GRANT token(s), ${grants.length} parsed`);
  return { grants, violations };
};

const EXPECTED_POLICIES = [
  "create policy pregnancy_episodes_select_own on public.pregnancy_episodes for select to authenticated using (auth.uid() = user_id);",
  "create policy pregnancy_episodes_insert_own on public.pregnancy_episodes for insert to authenticated with check (auth.uid() = user_id);",
  "create policy pregnancy_episodes_update_own on public.pregnancy_episodes for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);",
  "create policy pregnancy_episodes_delete_own on public.pregnancy_episodes for delete to authenticated using (auth.uid() = user_id);",
];
const policySurface = (flat: string) => [...flat.matchAll(M.policyStatement)].map((m) => lc(m[0]));
const policyEscapes = (flat: string) => POLICY_ESCAPES.filter((re) => re.test(flat)).map(String);

// Episode-reference audit over the format()-joined text.
const episodeReferenceAudit = (flat: string) => {
  const joined = flat.replace(/' '/g, "");
  return {
    allRefs: (joined.match(M.episodeRef) ?? []).length,
    composite: [...joined.matchAll(M.compositeEpisodeLink)].map((m) => ident(m[1])).sort(),
    foreignKeys: (joined.match(M.foreignKey) ?? []).length,
    singleColumn: M.singleColumnEpisodeRef.test(joined) || M.singleColumnEpisodeFk.test(joined),
    cascading: M.cascadingEpisodeRef.test(joined),
    inlineValidated: M.inlineValidatedEpisodeLink.test(joined),
  };
};

// Surface counts used to prove the parsers do not undercount on any casing.
const surfaceCounts = (flat: string) => ({
  foreignKeys: (flat.match(M.foreignKey) ?? []).length,
  episodeRefs: (flat.match(M.episodeRef) ?? []).length,
  policies: (flat.match(M.createPolicy) ?? []).length,
  indexes: [...flat.matchAll(M.createIndex)].map((m) => `${ident(m[2])}.${ident(m[1])}`),
  uniqueIndexes: (flat.match(M.createUniqueIndex) ?? []).length,
  triggers: (flat.match(M.createTrigger) ?? []).length,
  constraints: [...flat.matchAll(M.constraintName)].map((m) => ident(m[1])).filter((n) => n !== "for"),
  validations: [...flat.matchAll(M.validateStatement)].map((m) => `${ident(m[1])}.${ident(m[2])}`),
  cascades: (flat.match(M.onDeleteCascade) ?? []).length,
});

// Rollback DROP categorisation; every DROP must fall into exactly one owned category.
const categoriseDrops = (flat: string) => {
  const columns = [...flat.matchAll(M.dropColumn)].map((m) => `${ident(m[1])}.${ident(m[2])}`).sort();
  const constraints = [...flat.matchAll(M.dropConstraint)].map((m) => `${ident(m[1])}.${ident(m[2])}`).sort();
  const indexes = [...flat.matchAll(M.dropIndex)].map((m) => ident(m[1])).sort();
  const policies = [...flat.matchAll(M.dropPolicy)].map((m) => `${ident(m[2])}.${ident(m[1])}`).sort();
  const triggers = [...flat.matchAll(M.dropTrigger)].map((m) => `${ident(m[2])}.${ident(m[1])}`).sort();
  const tables = [...flat.matchAll(M.dropTable)].map((m) => ident(m[1])).sort();
  const total = (flat.match(M.dropAny) ?? []).length;
  const categorised = columns.length + constraints.length + indexes.length + policies.length + triggers.length + tables.length;
  return { columns, constraints, indexes, policies, triggers, tables, total, categorised };
};
const OWNED_DROPS = {
  columns: ["%I.pregnancy_episode_id", "journeys.current_pregnancy_episode_id"],
  constraints: ["%I.%I", "babies.babies_id_user_id_key", "journeys.journeys_current_pregnancy_episode_owner_fkey"],
  indexes: ["%I", "journeys_current_pregnancy_episode_idx", "pregnancy_episodes_one_open_per_user_idx", "pregnancy_episodes_user_id_idx"].sort(),
  policies: ["select", "insert", "update", "delete"].map((op) => `public.pregnancy_episodes.pregnancy_episodes_${op}_own`).sort(),
  triggers: ["public.pregnancy_episodes.pregnancy_episodes_set_updated_at"],
  tables: ["pregnancy_episodes"],
};

// Deterministic mixed-case transform for adversarial inputs: alternate letter case outside quotes.
const mixCase = (sql: string) => {
  let inQuote = false;
  let i = 0;
  return sql
    .split("")
    .map((c) => {
      if (c === "'") inQuote = !inQuote;
      if (inQuote || !/[a-z]/i.test(c)) return c;
      i += 1;
      return i % 2 ? c.toUpperCase() : c.toLowerCase();
    })
    .join("");
};

const LOOP_TABLES = parseLoopTables(forward.flat);
const LINK_FKS = ["journeys_current_pregnancy_episode_owner_fkey", ...LOOP_TABLES.map((t) => `${t}_pregnancy_episode_owner_fkey`)];
const LINK_INDEXES = ["journeys_current_pregnancy_episode_idx", ...LOOP_TABLES.map((t) => `${t}_pregnancy_episode_idx`)];

// ---------------------------------------------------------------------------
// Detector self-tests: each detector must trip on the defect it exists to catch, in any casing.
// ---------------------------------------------------------------------------
describe("detector self-tests (a silent regex regression must fail here)", () => {
  it("every structural matcher and detector is case-insensitive by construction", () => {
    for (const [name, re] of Object.entries(M)) expect(re.flags, name).toContain("i");
    for (const re of [...DML, ...DESTRUCTIVE_DDL, ...TRANSACTION_CONTROL, ...PRIVILEGE_ESCAPES, ...POLICY_ESCAPES]) expect(re.flags, String(re)).toContain("i");
  });

  it("grant audit rejects every forbidden shape, with and without TABLE, any case or spacing, and fails closed on unparsed grammar", () => {
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
      "Grant Select On public.pregnancy_episodes To Anon;",
      "GRANT SELECT ON public.pregnancy_episodes TO PUBLIC;",
      "GRANT SELECT ON public.pregnancy_episodes TO service_role, authenticated, anon;",
      "GRANT SELECT ON public.babies TO authenticated;",
      "GRANT ALL ON TABLE public.pregnancy_episodes TO service_role, authenticated;",
      // decorated or multi-word role syntax must never read as a plain authenticated SELECT
      "GRANT SELECT ON public.pregnancy_episodes TO GROUP authenticated;",
      "grant select on public.pregnancy_episodes to group authenticated;",
      "GRANT ALL ON public.pregnancy_episodes TO GROUP authenticated;",
      "GRANT SELECT ON public.pregnancy_episodes TO authenticated GRANTED BY postgres;",
      "GRANT SELECT ON public.pregnancy_episodes TO authenticated WITH GRANT OPTION;",
      "GRANT SELECT ON public.pregnancy_episodes TO \"authenticated\";",
      "GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;",
      "GRANT authenticated TO anon;",
      "GRANT EXECUTE ON FUNCTION public.f() TO authenticated;",
    ];
    for (const sql of forbidden) expect(grantAudit(sql).violations, sql).not.toHaveLength(0);
    const allowed = [
      "GRANT SELECT ON TABLE public.pregnancy_episodes TO authenticated;",
      "grant  select  on  public.pregnancy_episodes  to  authenticated ;",
      "Grant Select On Table public.pregnancy_episodes To Authenticated;",
      "GRANT ALL ON TABLE public.pregnancy_episodes TO service_role;",
    ];
    for (const sql of allowed) expect(grantAudit(sql).violations, sql).toEqual([]);
  });

  it("DML detectors trip inside EXECUTE strings, on MERGE / COPY / aliased UPDATE, in any casing", () => {
    const bad = [
      ["EXECUTE format('UPDATE public.%I SET x = 1', t)", 0],
      ["update public.babies as b set x = 1", 0],
      ["Update Only public.babies Set x = 1", 0],
      ["EXECUTE 'insert into public.x VALUES (1)'", 1],
      ["EXECUTE format('Delete From public.%I', t)", 2],
      ["truncate public.babies", 3],
      ["merge into public.babies USING s ON true WHEN MATCHED THEN DO NOTHING", 4],
      ["Copy public.babies FROM '/tmp/x.csv'", 5],
      ["select * from public.reflections", 6],
    ] as const;
    for (const [sql, idx] of bad) expect(sql).toMatch(DML[idx]);
    for (const ok of ["before update on public.x", "FOR UPDATE TO authenticated", "on delete restrict", "GRANT SELECT ON TABLE public.x TO y", "for select to authenticated", "SELECT 1 FROM pg_constraint", "select count(*) from public.x"]) {
      for (const re of DML) expect(ok, `${ok} vs ${re}`).not.toMatch(re);
    }
  });

  it("transaction detectors trip on every spelling and casing, but not on plpgsql blocks or the guard message", () => {
    for (const sql of ["BEGIN;", "begin;", "Begin Transaction;", "BEGIN WORK;", "start transaction;", "COMMIT;", "commit work;", "ROLLBACK;", "rollback to s1;", "SAVEPOINT s1;", "prepare transaction 'x';"]) {
      expect(TRANSACTION_CONTROL.some((re) => re.test(sql)), sql).toBe(true);
    }
    for (const ok of ["DO $$ BEGIN IF true THEN null; END IF; END $$;", "do $$ begin if true then null; end if; end $$;", "RAISE EXCEPTION 'ROLLBACK REFUSED: % row(s)'", "FOREACH t IN ARRAY tables LOOP END LOOP;"]) {
      expect(TRANSACTION_CONTROL.some((re) => re.test(ok)), ok).toBe(false);
    }
  });

  it("privilege-escape detectors trip on RLS disable, ALTER POLICY, schema-wide grants and default privileges, in any casing", () => {
    for (const sql of [
      "alter table public.pregnancy_episodes disable row level security;",
      "Alter Policy pregnancy_episodes_select_own On public.pregnancy_episodes Using (true);",
      "GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;",
      "alter default privileges in schema public grant all on tables to anon;",
    ]) {
      expect(PRIVILEGE_ESCAPES.some((re) => re.test(sql)), sql).toBe(true);
    }
  });

  it("policy regression: a lowercase or mixed-case permissive policy to anon is counted and flagged", () => {
    for (const leak of [
      "create policy leak on public.pregnancy_episodes for select to anon using (true);",
      "Create Policy Leak On public.pregnancy_episodes For Select To Anon Using (TRUE);",
      "create policy leak2 on public.pregnancy_episodes for all to authenticated using (true);",
    ]) {
      const injected = `${forward.flat} ${leak}`;
      expect(policySurface(injected), leak).toHaveLength(5);
      expect(policyEscapes(injected), leak).not.toHaveLength(0);
      expect(surfaceCounts(injected).policies, leak).toBe(5);
    }
    // the committed surface itself raises no escape
    expect(policyEscapes(forward.flat)).toEqual([]);
  });

  it("single-column ownership regression: a lowercase or mixed-case single-column episode FK is detected", () => {
    for (const bad of [
      "alter table public.reflections add constraint x foreign key (pregnancy_episode_id) references public.pregnancy_episodes (id);",
      "Alter Table public.babies Add Constraint y Foreign Key (pregnancy_episode_id) References public.pregnancy_episodes(ID);",
      "alter table public.journeys add constraint z foreign key (current_pregnancy_episode_id) references public.pregnancy_episodes (id) on delete cascade;",
    ]) {
      const audit = episodeReferenceAudit(`${forward.flat} ${bad}`);
      expect(audit.singleColumn, bad).toBe(true);
      expect(audit.allRefs, bad).toBe(3);
      expect(audit.composite, bad).toHaveLength(2); // the extra reference is not composite
      expect(audit.foreignKeys, bad).toBe(4);
    }
    const inline = "alter table public.babies add constraint w foreign key (pregnancy_episode_id, user_id) references public.pregnancy_episodes (id, user_id) on delete restrict;";
    expect(episodeReferenceAudit(`${forward.flat} ${inline}`).inlineValidated).toBe(true);
  });

  it("rollback legacy-column regression: a lowercase or mixed-case DROP COLUMN on a legacy column fails the whitelist", () => {
    for (const bad of [
      "alter table public.babies drop column if exists birth_order;",
      "Alter Table public.reflections Drop Column week;",
      "ALTER TABLE public.babies DROP COLUMN IF EXISTS name;",
    ]) {
      const d = categoriseDrops(`${rollback.flat} ${bad}`);
      expect(d.columns, bad).not.toEqual(OWNED_DROPS.columns);
      expect(d.total, bad).toBe(16);
      expect(d.total, bad).toBe(d.categorised); // still categorised, so the whitelist comparison is what fails
    }
    // an unrecognised DROP form is caught by the total/categorised reconciliation instead
    const odd = categoriseDrops(`${rollback.flat} drop type public.pregnancy_journey_status;`);
    expect(odd.total).toBe(16);
    expect(odd.categorised).toBe(15);
  });

  it("structural counts: lower-case and mixed-case spellings of the whole forward file count identically", () => {
    const base = surfaceCounts(forward.flat);
    expect(surfaceCounts(lc(forward.flat))).toEqual(base);
    expect(surfaceCounts(mixCase(forward.flat))).toEqual(base);
    expect(surfaceCounts(lc(validate.flat)).validations).toEqual(surfaceCounts(validate.flat).validations);
    expect(surfaceCounts(mixCase(validate.flat)).validations).toHaveLength(13);
    expect(categoriseDrops(lc(rollback.flat))).toEqual(categoriseDrops(rollback.flat));
    expect(categoriseDrops(mixCase(rollback.flat))).toEqual(categoriseDrops(rollback.flat));
    expect(parseLoopTables(mixCase(forward.flat))).toEqual(LOOP_TABLES);
    expect(episodeReferenceAudit(mixCase(forward.flat))).toEqual(episodeReferenceAudit(forward.flat));
    expect(policySurface(mixCase(forward.flat))).toEqual(policySurface(forward.flat));
    // and the counts are the real ones, not zero in every variant
    expect(base).toMatchObject({ foreignKeys: 3, episodeRefs: 2, policies: 4, uniqueIndexes: 1, triggers: 1, cascades: 1 });
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
        expect(f.flat).toMatch(/set local lock_timeout = '\d+s';/i);
        expect(f.flat.search(/set local lock_timeout/i)).toBe(0);
      }
    });

    it("no file disables RLS, alters a policy, grants schema-wide, changes default privileges, or uses SECURITY DEFINER", () => {
      for (const f of ALL_FILES) for (const re of PRIVILEGE_ESCAPES) expect(f.flat).not.toMatch(re);
    });

    it("every identifier this phase introduces fits PostgreSQL's 63-byte limit and is lower-case", () => {
      const introduced = new Set<string>([
        ...surfaceCounts(forward.flat).constraints,
        ...surfaceCounts(forward.flat).indexes.map((x) => x.split(".")[1]),
        ...policySurface(forward.flat).map((p) => (p.match(/create policy ([a-z_]+)/) as RegExpMatchArray)[1]),
        ...[...forward.flat.matchAll(/create trigger ([a-z_]+)/gi)].map((m) => ident(m[1])),
        ...[...forward.flat.matchAll(/add column if not exists ([a-z_]+)/gi)].map((m) => ident(m[1])),
        ...surfaceCounts(validate.flat).validations.map((x) => x.split(".")[1]),
        ...LINK_FKS,
        ...LINK_INDEXES,
        "pregnancy_episodes", "removed_at", "current_pregnancy_episode_id", "pregnancy_episode_id",
      ]);
      introduced.delete("%I");
      expect(introduced.size).toBeGreaterThanOrEqual(13 + 13 + 6 + 4 + 1);
      for (const name of introduced) {
        expect(Buffer.byteLength(name, "utf8"), name).toBeLessThanOrEqual(MAX_IDENTIFIER_BYTES);
        expect(name, name).toMatch(/^[a-z_]+$/);
      }
      // raw spellings in the files are lower-case too (unquoted identifiers fold; mixed case would be a smell)
      for (const f of ALL_FILES) expect(f.flat).not.toMatch(/\b(?:constraint|index if not exists|policy|trigger) [a-z_]*[A-Z][a-z_]*\b/);
    });
  });

  describe("pregnancy episode entity", () => {
    const tableDef = () => (forward.flat.match(M.tableDef) as RegExpMatchArray)[1];

    it("rows 1–2: table with primary key and (id, user_id) owner key", () => {
      expect(forward.flat).toMatch(/create table if not exists public\.pregnancy_episodes \(/i);
      expect(forward.flat).toMatch(/constraint pregnancy_episodes_pkey primary key \(id\)/i);
      expect(forward.flat).toMatch(/constraint pregnancy_episodes_id_user_id_key unique \(id, user_id\)/i);
    });

    it("A/C: no plain unique on user_id, so one person may hold many episodes", () => {
      expect(forward.flat).not.toMatch(/unique \(user_id\)/i);
    });

    it("account-level cascade is intentional: user_id references auth.users ON DELETE CASCADE, and it is the only CASCADE", () => {
      expect(forward.flat).toMatch(/constraint pregnancy_episodes_user_id_fkey foreign key \(user_id\) references auth\.users \(id\) on delete cascade/i);
      expect(surfaceCounts(forward.flat).cascades).toBe(1);
      expect(forward.flat).not.toMatch(/on delete set (null|default)/i);
    });

    it("S4: lmp_date and due_date are NOT NULL and carry the save function's date rule as a CHECK", () => {
      expect(forward.flat).toMatch(/\blmp_date date not null\b/i);
      expect(forward.flat).toMatch(/\bdue_date date not null\b/i);
      expect(forward.flat).toMatch(/constraint pregnancy_episodes_dates_check check \(due_date > lmp_date and due_date <= lmp_date \+ 300\)/i);
    });

    it("row 4: expected_count accepts null or 1 to 4", () => {
      expect(forward.flat).toMatch(/constraint pregnancy_episodes_expected_count_check check \(expected_count is null or expected_count between 1 and 4\)/i);
    });

    it("row 5: ended_at is null exactly when status is active or paused", () => {
      expect(forward.flat).toMatch(/constraint pregnancy_episodes_ended_at_status_check check \(\(status in \('active', 'paused'\)\) = \(ended_at is null\)\)/i);
    });

    it("exactly six table constraints and nothing on removed_at, outcome_date or status beyond the approved set", () => {
      expect(forward.flat.match(M.tableDef)).not.toBeNull();
      const names = [...tableDef().matchAll(M.constraintName)].map((m) => ident(m[1]));
      expect(names).toEqual([
        "pregnancy_episodes_pkey",
        "pregnancy_episodes_id_user_id_key",
        "pregnancy_episodes_user_id_fkey",
        "pregnancy_episodes_dates_check",
        "pregnancy_episodes_expected_count_check",
        "pregnancy_episodes_ended_at_status_check",
      ]);
      expect(tableDef()).not.toMatch(/check \([^)]*removed_at/i);
      // and these six are the only constraints defined outside ADD CONSTRAINT statements
      const allNames = surfaceCounts(forward.flat).constraints;
      expect(allNames).toEqual([...names, "journeys_current_pregnancy_episode_owner_fkey", "%I", "babies_id_user_id_key"]);
    });

    it("S13 (final): removed_at is an episode-local nullable timestamptz, orthogonal to status", () => {
      expect(tableDef()).toMatch(/\bremoved_at timestamptz,/i);
      expect(tableDef()).not.toMatch(/removed_at timestamptz not null/i);
      expect(tableDef()).not.toMatch(/removed_at timestamptz default/i);
      for (const f of ALL_FILES) {
        expect(f.flat).not.toMatch(/'removed'/i);
        expect(f.flat).not.toMatch(/\balter type\b/i);
        expect(f.flat).not.toMatch(/add value/i);
        expect(f.flat).not.toMatch(/\barchived_at\b/i);
      }
      expect(forward.flat).not.toMatch(/removed_at is not null/i);
      expect(forward.flat).not.toMatch(/removed_at[^,;]*(ended_at|outcome_date|status)/i);
    });

    it("S5 + S13: one OPEN episode per user — active or paused, and not removed — and it is the only unique index", () => {
      expect(forward.flat).toMatch(
        /create unique index if not exists pregnancy_episodes_one_open_per_user_idx on public\.pregnancy_episodes \(user_id\) where status in \('active', 'paused'\) and removed_at is null;/i,
      );
      expect(surfaceCounts(forward.flat).uniqueIndexes).toBe(1);
      expect(forward.flat).not.toMatch(/where status = 'active'/i);
      expect(forward.flat).not.toMatch(/one_active_per_user/i);
    });

    it("S3: plain (user_id) index kept; the index surface is exactly the four approved statements", () => {
      expect(forward.flat).toMatch(/create index if not exists pregnancy_episodes_user_id_idx on public\.pregnancy_episodes \(user_id\);/i);
      expect(surfaceCounts(forward.flat).indexes).toEqual([
        "pregnancy_episodes.pregnancy_episodes_one_open_per_user_idx",
        "pregnancy_episodes.pregnancy_episodes_user_id_idx",
        "journeys.journeys_current_pregnancy_episode_idx",
        "%I.%I",
      ]);
    });

    it("S11: updated_at trigger is drop-and-create on set_updated_at (no CREATE OR REPLACE TRIGGER)", () => {
      expect(forward.flat).toMatch(/drop trigger if exists pregnancy_episodes_set_updated_at on public\.pregnancy_episodes;/i);
      expect(forward.flat).toMatch(/create trigger pregnancy_episodes_set_updated_at before update on public\.pregnancy_episodes for each row execute function public\.set_updated_at\(\);/i);
      expect(forward.flat).not.toMatch(/create or replace trigger/i);
      expect(surfaceCounts(forward.flat).triggers).toBe(1);
    });
  });

  describe("privileges and RLS", () => {
    it("S2: exactly one REVOKE, from PUBLIC, anon and authenticated, placed before any grant", () => {
      const revokes = [...forward.flat.matchAll(M.revoke)].map((m) => lc(m[0]));
      expect(revokes).toEqual(["revoke all on table public.pregnancy_episodes from public, anon, authenticated;"]);
      expect(forward.flat.search(/\bgrant\b/i)).toBeGreaterThan(lc(forward.flat).indexOf(revokes[0]));
    });

    it("owner decision 2: every GRANT in every file is parsed, and authenticated holds SELECT only on pregnancy_episodes", () => {
      for (const f of ALL_FILES) expect(grantAudit(f.flat).violations).toEqual([]);
      expect(grantAudit(forward.flat).grants).toEqual([
        { privileges: ["select"], object: "public.pregnancy_episodes", roles: ["authenticated"] },
        { privileges: ["all"], object: "public.pregnancy_episodes", roles: ["service_role"] },
      ]);
      expect(grantAudit(validate.flat).grants).toEqual([]);
      expect(grantAudit(rollback.flat).grants).toEqual([]);
    });

    it("RLS is enabled and the policy surface is exactly the four owner policies", () => {
      expect(forward.flat).toMatch(/alter table public\.pregnancy_episodes enable row level security;/i);
      const created = policySurface(forward.flat);
      expect(created).toHaveLength(4);
      expect([...created].sort()).toEqual([...EXPECTED_POLICIES].sort());
      expect(surfaceCounts(forward.flat).policies).toBe(4);
      const guarded = [...forward.flat.matchAll(M.policyGuard)].map((m) => `${ident(m[1])}.${ident(m[2])}`);
      expect([...guarded].sort()).toEqual(["select", "insert", "update", "delete"].map((op) => `pregnancy_episodes.pregnancy_episodes_${op}_own`).sort());
      expect(policySurface(validate.flat)).toEqual([]);
      expect(policySurface(rollback.flat)).toEqual([]);
      for (const f of ALL_FILES) expect(policyEscapes(f.flat)).toEqual([]);
    });
  });

  describe("ownership links", () => {
    it("13 links in total: journeys pointer plus 12 looped tables", () => {
      expect(LINK_FKS).toHaveLength(13);
      expect(new Set(LINK_FKS).size).toBe(13);
    });

    it("S9: journeys pointer is current_pregnancy_episode_id, nullable, with a composite same-user FK", () => {
      expect(forward.flat).toMatch(/alter table public\.journeys add column if not exists current_pregnancy_episode_id uuid;/i);
      expect(forward.flat).toMatch(
        /add constraint journeys_current_pregnancy_episode_owner_fkey foreign key \(current_pregnancy_episode_id, user_id\) references public\.pregnancy_episodes \(id, user_id\) on delete restrict not valid;/i,
      );
      expect(forward.flat).toMatch(/create index if not exists journeys_current_pregnancy_episode_idx on public\.journeys \(current_pregnancy_episode_id, user_id\);/i);
      for (const f of ALL_FILES) expect(f.flat).not.toMatch(/active_pregnancy_episode/i);
    });

    it("S1: journeys is altered before the 12-table loop (lock order)", () => {
      const journeysAt = forward.flat.search(/alter table public\.journeys add column if not exists current_pregnancy_episode_id/i);
      const loopAt = forward.flat.search(/foreach t in array tables loop/i);
      expect(journeysAt).toBeGreaterThan(-1);
      expect(loopAt).toBeGreaterThan(journeysAt);
    });

    it("rows 6–17: looped tables gain a nullable episode id, a composite same-user FK (RESTRICT, NOT VALID) and a composite index", () => {
      expect(forward.flat).toMatch(/add column if not exists pregnancy_episode_id uuid'/i);
      expect(forward.flat).toMatch(/foreign key \(pregnancy_episode_id, user_id\) ' 'references public\.pregnancy_episodes \(id, user_id\) on delete restrict not valid'/i);
      expect(forward.flat).toMatch(/t \|\| '_pregnancy_episode_owner_fkey'/i);
      expect(forward.flat).toMatch(/create index if not exists %I on public\.%I \(pregnancy_episode_id, user_id\)'/i);
    });

    it("every reference to pregnancy_episodes is the composite (id, user_id) key, RESTRICT and NOT VALID; no single-column episode FK exists", () => {
      const audit = episodeReferenceAudit(forward.flat);
      expect(audit).toEqual({
        allRefs: 2, // the journeys statement and the loop template
        composite: ["current_pregnancy_episode_id", "pregnancy_episode_id"],
        foreignKeys: 3, // account cascade + the two composite links
        singleColumn: false,
        cascading: false,
        inlineValidated: false,
      });
    });

    it("S10: existence guards are scoped to the table (conrelid), never by name alone", () => {
      const guards = [...forward.flat.matchAll(M.pgConstraintGuard)].map((m) => lc(m[1]));
      expect(guards).toHaveLength(3);
      for (const g of guards) expect(g).toMatch(/^conrelid = /);
      expect(forward.flat).not.toMatch(/from pg_constraint where conname =/i);
    });

    it("G: link columns are never NOT NULL (legacy and unlinked children stay valid)", () => {
      expect(forward.flat).not.toMatch(/pregnancy_episode_id uuid not null/i);
      expect(forward.flat).not.toMatch(/current_pregnancy_episode_id uuid not null/i);
      expect(forward.flat).not.toMatch(/set not null/i);
      expect(forward.flat).not.toMatch(/pregnancy_episode_id uuid default/i);
    });

    it("H/I: no child row required, no unique on any episode link, no pointer CHECK (row 19 is 41B.1D)", () => {
      expect(forward.flat).not.toMatch(/unique \(pregnancy_episode_id/i);
      expect(forward.flat).not.toMatch(/unique \(current_pregnancy_episode_id/i);
      expect(forward.flat).not.toMatch(/lifecycle/i);
    });

    it("row 22: babies (id, user_id) owner key, table-scoped guard, and the only constraint added outside the loop besides the pointer", () => {
      expect(forward.flat).toMatch(/conrelid = 'public\.babies'::regclass and conname = 'babies_id_user_id_key'/i);
      expect(forward.flat).toMatch(/alter table public\.babies add constraint babies_id_user_id_key unique \(id, user_id\);/i);
      const added = [...forward.flat.matchAll(M.addConstraint)].map((m) => ident(m[1]));
      expect(added).toEqual(["journeys_current_pregnancy_episode_owner_fkey", "%I", "babies_id_user_id_key"]);
    });
  });

  describe("scope held: nothing destructive, nothing from later subphases", () => {
    it("L: forward file contains no DML, no destructive DDL, no enum change", () => {
      for (const re of DML) expect(forward.flat).not.toMatch(re);
      for (const re of DESTRUCTIVE_DDL) expect(forward.flat).not.toMatch(re);
      const drops = [...forward.flat.matchAll(M.dropStatement)].map((m) => lc(m[0]));
      expect(drops).toEqual(["drop trigger if exists pregnancy_episodes_set_updated_at on public.pregnancy_episodes;"]);
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
        for (const f of ALL_FILES) expect(lc(f.flat)).not.toContain(name);
      }
      for (const f of ALL_FILES) {
        expect(f.flat).not.toMatch(/baby_id, user_id/i);
        expect(f.flat).not.toMatch(/pregnancy_journeys|saved_journeys|archived_journeys|first_year_/i);
        expect(f.flat).not.toMatch(/create (or replace )?function/i);
        expect(f.flat).not.toMatch(/family_entity_backfill_log/i);
        expect(f.flat).not.toMatch(/\b(60|sixty)\b/i);
      }
    });
  });

  describe("validate file (S1, second step)", () => {
    it("validates every NOT VALID link and nothing else", () => {
      const validated = surfaceCounts(validate.flat).validations;
      expect(validated.map((v) => v.split(".")[1]).sort()).toEqual([...LINK_FKS].sort());
      for (const v of validated) {
        const [table, name] = v.split(".");
        expect(name).toBe(table === "journeys" ? "journeys_current_pregnancy_episode_owner_fkey" : `${table}_pregnancy_episode_owner_fkey`);
      }
      const statements = validate.flat.split(";").map((s) => s.trim()).filter(Boolean);
      expect(statements).toHaveLength(1 + 13); // SET LOCAL + 13 validations
      expect((validate.flat.match(M.alterTable) ?? []).length).toBe(13);
    });

    it("validate file changes no data and drops nothing", () => {
      for (const re of DML) expect(validate.flat).not.toMatch(re);
      for (const re of DESTRUCTIVE_DDL) expect(validate.flat).not.toMatch(re);
    });
  });

  describe("rollback file (S7)", () => {
    it("refuses to run when any new-model row or later-phase dependency exists", () => {
      expect(rollback.flat).toMatch(/select count\(\*\) from public\.pregnancy_episodes/i);
      expect(rollback.flat).toMatch(/select count\(\*\) from public\.journeys where current_pregnancy_episode_id is not null/i);
      expect(rollback.flat).toMatch(/select count\(\*\) from public\.%I where pregnancy_episode_id is not null/i);
      expect(rollback.flat).toMatch(/confrelid = 'public\.pregnancy_episodes'::regclass and conname <> all \(expected_fks\)/i);
      expect(rollback.flat).toMatch(/u\.conname = 'babies_id_user_id_key'/i);
      expect([...rollback.flat.matchAll(M.refusal)]).toHaveLength(5);
      const firstRefusal = rollback.flat.search(M.refusal);
      const firstDrop = rollback.flat.search(/\bdrop\b/i);
      expect(firstRefusal).toBeGreaterThan(-1);
      expect(firstDrop).toBeGreaterThan(firstRefusal);
    });

    it("guard list of expected foreign keys matches the links the forward file creates", () => {
      const m = rollback.flat.match(M.expectedFks);
      expect(m).not.toBeNull();
      const listed = [...(m as RegExpMatchArray)[1].matchAll(M.quotedName)].map((x) => ident(x[1]));
      expect(listed.sort()).toEqual([...LINK_FKS].sort());
    });

    it("whitelist: every DROP in the rollback names a 41B.1A-owned object, every owned object is dropped, and nothing is uncategorised", () => {
      const d = categoriseDrops(rollback.flat);
      expect(d.columns).toEqual(OWNED_DROPS.columns);
      expect(d.constraints).toEqual(OWNED_DROPS.constraints);
      expect(d.indexes).toEqual(OWNED_DROPS.indexes);
      expect(d.policies).toEqual(OWNED_DROPS.policies);
      expect(d.triggers).toEqual(OWNED_DROPS.triggers);
      expect(d.tables).toEqual(OWNED_DROPS.tables);
      expect(d.total).toBe(d.categorised);
      expect(d.total).toBe(15);
      // the %I placeholders are the loop variable, bound to the parsed table list
      expect(rollback.flat).toMatch(/drop column if exists pregnancy_episode_id', t\)/i);
      expect(rollback.flat).toMatch(/drop constraint if exists %I', t, t \|\| '_pregnancy_episode_owner_fkey'\)/i);
      expect(rollback.flat).toMatch(/drop index if exists public\.%I', t \|\| '_pregnancy_episode_idx'\)/i);
      // every DROP uses IF EXISTS so a partial forward run can still be reversed; none cascades
      for (const m of rollback.flat.matchAll(M.dropObject)) expect(lc(m[0])).toMatch(/if exists$/);
      expect(rollback.flat).not.toMatch(/\bcascade\b/i);
    });

    it("dependency order: pointer, looped links, babies key, policies, trigger, indexes, table", () => {
      const hay = lc(rollback.flat);
      const order = [
        "drop constraint if exists journeys_current_pregnancy_episode_owner_fkey",
        "drop index if exists public.journeys_current_pregnancy_episode_idx",
        "drop column if exists current_pregnancy_episode_id",
        "foreach t in array tables loop execute format('alter table public.%i drop constraint",
        "drop constraint if exists babies_id_user_id_key",
        "drop policy if exists pregnancy_episodes_select_own",
        "drop trigger if exists pregnancy_episodes_set_updated_at",
        "drop index if exists public.pregnancy_episodes_one_open_per_user_idx",
        "drop table if exists public.pregnancy_episodes",
      ].map((s) => hay.indexOf(s));
      for (const i of order) expect(i).toBeGreaterThan(-1);
      expect([...order].sort((a, b) => a - b)).toEqual(order);
    });

    it("rollback destroys no customer history: no DML, no enum change, no other table named", () => {
      for (const re of DML) expect(rollback.flat).not.toMatch(re);
      expect(rollback.flat).not.toMatch(/\balter type\b/i);
      const tablesNamed = new Set([...rollback.flat.matchAll(M.publicName)].map((m) => ident(m[1])));
      expect([...tablesNamed].sort()).toEqual(["babies", "journeys", "pregnancy_episodes"]);
    });
  });
});
