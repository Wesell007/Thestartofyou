// D14.2 hosted harness context: the REAL sealed shared module (4b561385) wired to the hosted project.
// DB = account_deletion_worker over the shared transaction pooler (Postgres.js prepare:false);
// Auth/Storage = real GoTrue admin + Storage API with the project's service key (no user session).
import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";
// @ts-ignore - plain ESM helpers
import { dbUrl, secret, redact, projectUrl, REF } from "./lib.mjs";
// @ts-ignore - plain ESM helpers
import { workerSql, execOf } from "./wdb.mjs";
import * as N10 from "../src/supabase/functions/_shared/accountDeletion.ts";

export { N10, REF };
const D = "C:/Users/Administrator/.d142";
export const keys = JSON.parse(secret("d142.keys.json")) as { anon: string; service: string };

export const logLines: string[] = [];
export const say = (s: string) => { const t = redact(s); logLines.push(t); console.log(t); };
export const log: N10.N10Logger = {
  info: (event, fields) => say(`[log.info] ${JSON.stringify({ event, ...fields })}`),
  error: (event, fields) => say(`[log.error] ${JSON.stringify({ event, ...fields })}`),
};

export const admin = createClient(projectUrl, keys.service, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });

export function makeDeps(sql = workerSql(), over: Partial<N10.N10Deps> = {}) {
  const deps: N10.N10Deps = {
    db: N10.createN10Db(execOf(sql)),
    auth: {
      async deleteUser(userId) {
        const { error } = await admin.auth.admin.deleteUser(userId, false);
        return { error: error ? { status: error.status, name: error.name, message: error.message } : null };
      },
    },
    storage: {
      async remove(bucket, names) {
        const { error } = await admin.storage.from(bucket).remove(names);
        return { error: error ? { message: error.message } : null };
      },
    },
    alert: N10.createLoggingAlertHook(log),
    log,
    now: () => Date.now(),
    ...over,
  };
  return { deps, sql };
}

// Postgres (owner) connection for read-only snapshots and the documented time-shift only.
export const pg = postgres(dbUrl(), { prepare: false, max: 1, ssl: "require", onnotice: () => {}, connect_timeout: 20 });

/** Mirror of src/test/support/n10Pglite.ts timeTravel: user triggers disabled only for this one UPDATE. */
export async function timeTravel(requestId: string, set: string) {
  await pg.begin(async (tx) => {
    await tx.unsafe("alter table private.account_deletion_requests disable trigger user");
    const r = await tx.unsafe(`update private.account_deletion_requests set ${set} where id = $1`, [requestId]);
    await tx.unsafe("alter table private.account_deletion_requests enable trigger user");
    if (r.count !== 1) throw new Error("timeTravel: expected one row");
  });
  say(`[time-shift] request ${requestId}: ${set}`);
}

export async function snapshot(requestId: string) {
  const [r] = await pg.unsafe(
    `select id, status, user_id is not null as has_user,
      (select count(*) from auth.users u where u.id = r.user_id)::int as auth_user,
      (select count(*) from storage.objects o where r.user_id is not null and (storage.foldername(o.name))[1] = r.user_id::text)::int as media,
      to_jsonb(r) - 'user_id' - 'id' - 'status' as rest
     from private.account_deletion_requests r where id = $1`, [requestId]);
  return r;
}
export const show = async (label: string, requestId: string) => say(`${label} ${JSON.stringify(await snapshot(requestId))}`);

// Fixture registry (local, outside Git).
const FX = `${D}/d142.fixtures.json`;
export type Fixture = { label: string; userId: string; email: string; requestId?: string };
export const fixtures = (): Record<string, Fixture> => (existsSync(FX) ? JSON.parse(readFileSync(FX, "utf8")) : {});
export const saveFixture = (f: Fixture) => { const all = fixtures(); all[f.label] = f; writeFileSync(FX, JSON.stringify(all, null, 1)); };

const PNG = Buffer.from("89504e470d0a1a0a0000000d4948445200000001000000010806000000" + "1f15c4890000000d49444154789c6360000002000154a24f5d0000000049454e44ae426082", "hex");

/** Synthetic user with tiny generated media uploaded through the user's own session (RLS path). */
export async function createUserWithMedia(label: string, files = 2): Promise<Fixture> {
  const email = `d142-${label.toLowerCase()}-${randomBytes(4).toString("hex")}@example.invalid`;
  const password = randomBytes(24).toString("base64url");
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (error || !data.user) throw new Error(`createUser failed: ${error?.message}`);
  const userId = data.user.id;
  const userClient = createClient(projectUrl, keys.anon, { auth: { persistSession: false, autoRefreshToken: false } });
  const s = await userClient.auth.signInWithPassword({ email, password });
  if (s.error) throw new Error(`signIn failed: ${s.error.message}`);
  for (let i = 0; i < files; i++) {
    const bucket = i % 2 === 0 ? "weekly-photos" : "first-year-memories";
    const up = await userClient.storage.from(bucket).upload(`${userId}/d142-${i}.png`, PNG, { contentType: "image/png" });
    if (up.error) throw new Error(`upload failed ${bucket}: ${up.error.message}`);
  }
  await userClient.auth.signOut();
  const f = { label, userId, email };
  saveFixture(f);
  say(`[fixture ${label}] user created (synthetic @example.invalid) with ${files} media objects via the user's session`);
  return f;
}

export const tokenWindow: N10.TokenWindow = { ok: true, seconds: 3600 };
export function writeLog(path: string) { writeFileSync(path, logLines.join("\n") + "\n"); }
export function appendLog(path: string) { appendFileSync(path, logLines.join("\n") + "\n"); }
