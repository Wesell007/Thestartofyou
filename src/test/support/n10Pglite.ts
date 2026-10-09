// Local, in-process PostgreSQL (PGlite) harness for N10 database tests. No remote service.
// Builds a minimal stand-in for the Supabase-managed pieces the N10 migration depends on (roles
// anon/authenticated/service_role, auth.users + auth.uid(), storage.buckets/objects + foldername,
// the historical media policies taken verbatim from the repository migrations), then applies the
// real N10 M1 migration file unchanged. It cannot prove hosted Supabase behaviour (N10.3B does).
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { PGlite } from "@electric-sql/pglite";

const root = process.cwd();
const MIGRATIONS = resolve(root, "supabase/migrations");

export const n10MigrationFile = (suffix: string) => {
  const name = readdirSync(MIGRATIONS).find((f) => f.endsWith(suffix));
  if (!name) throw new Error(`migration *${suffix} not found`);
  return { name, sql: readFileSync(resolve(MIGRATIONS, name), "utf8") };
};

const STUB = `
create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;
create schema auth;
create schema storage;
create table auth.users (id uuid primary key, email text, deleted_at timestamptz);
create function auth.uid() returns uuid language sql stable
  as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
grant usage on schema auth to anon, authenticated, service_role;
grant execute on function auth.uid() to public;
create table storage.buckets (id text primary key, name text not null);
create table storage.objects (
  id uuid primary key default gen_random_uuid(),
  bucket_id text not null,
  name text not null,
  owner uuid,
  owner_id text,
  unique (bucket_id, name)
);
create function storage.foldername(name text) returns text[] language plpgsql immutable as $$
declare _parts text[];
begin
  select string_to_array(name, '/') into _parts;
  return _parts[1:array_length(_parts, 1) - 1];
end $$;
alter table storage.objects enable row level security;
grant usage on schema storage to anon, authenticated, service_role;
grant all on storage.objects to anon, authenticated, service_role;
grant execute on function storage.foldername(text) to public;
insert into storage.buckets values ('weekly-photos', 'weekly-photos'), ('first-year-memories', 'first-year-memories'), ('other-bucket', 'other-bucket');
`;

/** Historical media policies, extracted verbatim from the two repository migrations that created them. */
const historicalPolicies = () => {
  const files = ["20260420185521_21bbb9a8-d476-47a3-9f93-ff124498690f.sql", "20260813213029_87aa29b1-8be6-46fa-9c84-df5e512ae2fe.sql"];
  return files
    .map((f) => readFileSync(resolve(MIGRATIONS, f), "utf8"))
    .flatMap((sql) => sql.match(/CREATE POLICY[\s\S]*?;/g) ?? [])
    .filter((stmt) => /ON storage\.objects/i.test(stmt));
};

export type N10Harness = {
  db: PGlite;
  su: (sql: string, params?: unknown[]) => Promise<Record<string, unknown>[]>;
  asWorker: (sql: string, params?: unknown[]) => Promise<Record<string, unknown>[]>;
  asUser: (userId: string | null, sql: string, params?: unknown[]) => Promise<Record<string, unknown>[]>;
  timeTravel: (requestId: string, set: string) => Promise<void>;
};

export async function createN10Harness(): Promise<N10Harness> {
  const db = new PGlite();
  await db.exec(STUB);
  for (const policy of historicalPolicies()) await db.exec(policy);
  await db.exec(n10MigrationFile("_n10_account_deletion_foundation.sql").sql);

  const run = async (prefix: string[], sql: string, params: unknown[] = []) => {
    for (const p of prefix) await db.exec(p);
    try {
      const res = await db.query<Record<string, unknown>>(sql, params);
      return res.rows;
    } finally {
      await db.exec("reset role; select set_config('request.jwt.claim.sub', '', false);");
    }
  };

  return {
    db,
    su: (sql, params) => run([], sql, params),
    asWorker: (sql, params) => run(["set role account_deletion_worker"], sql, params),
    asUser: (userId, sql, params) =>
      run([`select set_config('request.jwt.claim.sub', '${userId ?? ""}', false)`, "set role authenticated"], sql, params),
    // Test-only clock movement: the guard trigger forbids these edits, so it is disabled for the update.
    timeTravel: async (requestId, set) => {
      await db.exec("alter table private.account_deletion_requests disable trigger account_deletion_requests_guard");
      try {
        await db.query(`update private.account_deletion_requests set ${set} where id = $1`, [requestId]);
      } finally {
        await db.exec("alter table private.account_deletion_requests enable trigger account_deletion_requests_guard");
      }
    },
  };
}

export const uuid = (n: number) => `00000000-0000-4000-8000-${n.toString(16).padStart(12, "0")}`;
