import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// N10.3A static repository contracts: what the migrations, Edge Functions, config and caller must
// and must not contain. Behaviour is covered by the PGlite suites; these guard against regressions.

const root = process.cwd();
const read = (p: string) => readFileSync(resolve(root, p), "utf8");
const migrationDir = "supabase/migrations";
const migrationNamed = (suffix: string) => {
  const f = readdirSync(resolve(root, migrationDir)).find((n) => n.endsWith(suffix));
  if (!f) throw new Error(`missing migration ${suffix}`);
  return { name: f, sql: read(`${migrationDir}/${f}`) };
};
const stripComments = (sql: string) => sql.replace(/--[^\n]*/g, " ");
const m1 = migrationNamed("_n10_account_deletion_foundation.sql");
const m2 = migrationNamed("_n10_account_deletion_worker_schedule.sql");
const n10Code = [
  "supabase/functions/_shared/accountDeletion.ts",
  "supabase/functions/_shared/accountDeletionRuntime.ts",
  "supabase/functions/delete-account/index.ts",
  "supabase/functions/account-deletion-worker/index.ts",
].map((p) => ({ p, src: read(p) }));
const stripTsComments = (src: string) => src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const STORAGE_DML = /\b(insert\s+into|update|delete\s+from)\s+storage\.(objects|buckets)\b/i;

describe("migrations (E7, E13, E16, H1)", () => {
  it("were created by the Supabase CLI naming scheme and sort after every existing migration", () => {
    const names = readdirSync(resolve(root, migrationDir)).sort();
    expect(names.slice(-3, -1)).toEqual([m1.name, m2.name]);
    for (const n of [m1.name, m2.name]) expect(n).toMatch(/^\d{14}_n10_account_deletion_[a-z_]+\.sql$/);
  });

  it("never mutate Storage data: no INSERT/UPDATE/DELETE on storage.objects or storage.buckets", () => {
    for (const { name, sql } of [m1, m2]) expect(stripComments(sql), name).not.toMatch(STORAGE_DML);
  });

  it("the request table has no REFERENCES clause and no FK to auth.users", () => {
    const table = stripComments(m1.sql).match(/CREATE TABLE private\.account_deletion_requests \(([\s\S]*?)\n\);/);
    expect(table).not.toBeNull();
    expect(table?.[1]).not.toMatch(/references/i);
  });

  it("the role is created without dangerous attributes and the migration contains no password", () => {
    expect(m1.sql).toMatch(/CREATE ROLE account_deletion_worker WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS/);
    for (const { sql } of [m1, m2]) {
      expect(sql).not.toMatch(/\bpassword\b\s*'/i);
      expect(sql).not.toMatch(/BYPASSRLS(?!\b)/);
      expect(stripComments(sql)).not.toMatch(/\bwith\s+login\s+password\b/i);
    }
  });

  it("H1: the sweep window is anchored on auth_deleted_at with max(W, 3600) + 15 minutes, never requested_at", () => {
    const fn = m1.sql.match(/FUNCTION private\.n10_confirm_auth_deleted[\s\S]*?\n\$\$;/)?.[0] ?? "";
    expect(fn).toMatch(/final_sweep_after = v_now \+ pg_catalog\.make_interval\(secs => GREATEST\(p_window_seconds, 3600\)\)\s*\+ interval '15 minutes'/);
    expect(fn).toMatch(/auth_deleted_at = v_now/);
    expect(fn).not.toMatch(/requested_at/);
    expect(m1.sql).toMatch(/final_sweep_after >= auth_deleted_at \+ interval '1 hour 15 minutes'/);
  });

  it("every SECURITY DEFINER function sets an empty search_path", () => {
    const fns = m1.sql.split(/CREATE OR REPLACE FUNCTION /).slice(1);
    for (const f of fns) {
      if (/SECURITY DEFINER/.test(f.split("AS $$")[0])) expect(f.split("AS $$")[0], f.slice(0, 60)).toMatch(/SET search_path = ''/);
    }
  });

  it("M2 references Vault secret names only and is a no-op while they are missing", () => {
    const body = stripComments(m2.sql);
    expect(body).toMatch(/cron\.schedule\(\s*'n10-account-deletion-worker',\s*'\* \* \* \* \*'/);
    expect(body).toMatch(/name = 'n10_account_deletion_worker_url'/);
    expect(body).toMatch(/name = 'n10_account_deletion_worker_service_key'/);
    expect(body).toMatch(/WHERE s\.url IS NOT NULL AND s\.service_key IS NOT NULL/);
    expect(body).not.toMatch(/vault\.create_secret|eyJ[A-Za-z0-9_-]{10,}|sb_secret_|https:\/\/[a-z]{20}\.supabase\.co/);
  });
});

describe("Edge Functions (E1, E7, E13, E17, H2)", () => {
  it("delete-account no longer contains the Storage-first sweep or any direct Storage call", () => {
    const src = read("supabase/functions/delete-account/index.ts");
    expect(src).not.toMatch(/listAllUnder|\.storage\.from\(|Nothing else was deleted/);
    expect(src).toMatch(/runDeleteAccount/);
  });

  it("no N10 code uses unrestricted database credentials or mutates Storage tables", () => {
    for (const { p, src } of n10Code) {
      expect(stripTsComments(src), p).not.toMatch(/SUPABASE_DB_URL/);
      expect(stripTsComments(src), p).not.toMatch(STORAGE_DML);
    }
    expect(read("supabase/functions/_shared/accountDeletionRuntime.ts")).toMatch(/Deno\.env\.get\("N10_DB_URL"\)/);
    expect(read("supabase/functions/_shared/accountDeletionRuntime.ts")).toMatch(/prepare: false/);
  });

  it("new runtime imports are exactly pinned", () => {
    for (const { p, src } of n10Code) {
      for (const spec of src.match(/"npm:[^"]+"/g) ?? []) expect(spec, p).toMatch(/^"npm:(@[a-z0-9-]+\/)?[a-z0-9.-]+@\d+\.\d+\.\d+"$/);
      expect(src, p).not.toMatch(/esm\.sh/);
    }
  });

  it("admin clients never carry a user session; the caller client is used only for getUser", () => {
    const runtime = read("supabase/functions/_shared/accountDeletionRuntime.ts");
    expect(runtime).toMatch(/createClient\(supabaseUrl, serviceKey, \{\s*auth: \{ persistSession: false/);
    expect(runtime).not.toMatch(/Authorization/);
    expect(read("supabase/functions/delete-account/index.ts")).toMatch(/caller\.auth\.getUser\(\)/);
  });

  it("Storage removals happen only inside purgePass, after an auth_user_exists re-check", () => {
    const shared = read("supabase/functions/_shared/accountDeletion.ts");
    const calls = shared.match(/deps\.storage\.remove\(/g) ?? [];
    expect(calls).toHaveLength(1);
    const pass = shared.slice(shared.indexOf("export async function purgePass"), shared.indexOf("const OUTCOME_ERROR"));
    expect(pass.indexOf("deps.db.authUserExists")).toBeGreaterThan(-1);
    expect(pass.indexOf("deps.db.authUserExists")).toBeLessThan(pass.indexOf("deps.storage.remove("));
  });

  it("E24: log events carry opaque ids, states and counts only, never user ids, paths or messages", () => {
    let total = 0;
    for (const { p, src } of n10Code) {
      const calls = src.match(/(?:log|n10Log|deps\.log)\.(?:info|error)\([^;]*?\}\)/gs) ?? [];
      total += calls.length;
      for (const call of calls) {
        const keys = [...call.matchAll(/([a-z_]+):/g)].map((m) => m[1]);
        for (const k of keys) {
          expect(["request_id", "outcome", "phase", "reason", "status", "auth_confirmed", "kind", "error_class", "processed", "token_window_ok", "retention_configured", "removed_rows"], `${p}: ${call.slice(0, 80)}`).toContain(k);
        }
      }
    }
    expect(total).toBeGreaterThanOrEqual(10);
  });

  it("delete-account keeps the gateway user-JWT boundary (the worker boundary is covered by n10WorkerInvocation)", () => {
    expect(read("supabase/config.toml")).toMatch(/\[functions\.delete-account\]\r?\nverify_jwt = true/);
  });
});

describe("configuration and caller (D10, D15, H2)", () => {
  it("first-year-memories is declared through config.toml, not Storage SQL", () => {
    expect(read("supabase/config.toml")).toMatch(/\[storage\.buckets\.first-year-memories\]\r?\npublic = false/);
  });

  it("AccountSettings uses the H2 interpretation, local sign-out and query-cache clearing", () => {
    const src = read("src/pages/AccountSettings.tsx");
    expect(src).toMatch(/interpretDeleteAccountResult\(/);
    expect(src).toMatch(/signOut\(\{ scope: "local" \}\)/);
    expect(src).toMatch(/queryClient\.clear\(\)/);
    expect(src).not.toMatch(/Your account is still available/);
  });

  it("D15: the signing call sites (6 files, 10 calls) are unchanged; signing stays governed by the guarded SELECT policy", () => {
    const files = ["src/components/myweek/SlotPhotoMemory.tsx", "src/hooks/useWeekMedia.ts", "src/lib/firstYearMemories.ts", "src/pages/firstyear/MyPregnancyChapter.tsx", "src/pages/KeptChapter.tsx", "src/pages/MyJourney.tsx"];
    const sites = files.flatMap((f) => read(f).match(/\.createSignedUrls?\(/g) ?? []);
    expect(sites).toHaveLength(10);
    for (const f of files) expect(read(f)).not.toMatch(/createSignedUploadUrl|uploadToSignedUrl|getPublicUrl/);
  });
});
