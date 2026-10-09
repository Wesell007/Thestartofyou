import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { beforeAll, describe, expect, it } from "vitest";
import {
  constantTimeEqual,
  createN10Db,
  handleWorkerInvocation,
  isEmptyWorkerBody,
  readInvokeSecret,
  runDeleteAccount,
  WORKER_TOKEN_HEADER,
  type AuthErrorLike,
  type N10Deps,
  type WorkerRuntime,
} from "../../supabase/functions/_shared/accountDeletion";
import { createN10Harness, n10MigrationFile, uuid, type N10Harness } from "./support/n10Pglite";

// N10.3A security patch (M3): the pg_net scheduler carries only an invocation-only secret. The worker
// (verify_jwt = false) authenticates that secret before opening anything, accepts no caller-selected
// target, and returns only {"ok":true} or a generic error. Hosted proof is N10.3B.

const root = process.cwd();
const read = (p: string) => readFileSync(resolve(root, p), "utf8");
const stripSqlComments = (sql: string) => sql.replace(/--[^\n]*/g, " ");
const stripTsComments = (src: string) => src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");
const sha256Lf = (text: string) => createHash("sha256").update(text.replace(/\r\n/g, "\n")).digest("hex");

const m1 = n10MigrationFile("_n10_account_deletion_foundation.sql");
const m2 = n10MigrationFile("_n10_account_deletion_worker_schedule.sql");
const m3 = n10MigrationFile("_n10_worker_invocation_hardening.sql");
const workerIndex = read("supabase/functions/account-deletion-worker/index.ts");

const SECRET = "inv_" + "A1b2C3d4E5".repeat(5); // 54 chars, test-only, not a real credential
const env = (vars: Record<string, string | undefined>) => (name: string) => vars[name];
const GOOD_ENV = {
  N10_WORKER_INVOKE_SECRET: SECRET,
  N10_VERIFIED_TOKEN_WINDOW_SECONDS: "3600",
  N10_TOKEN_WINDOW_VERIFICATION: "management-api:2026-10-09",
};
const silentLog = { info: () => undefined, error: () => undefined };

// ---------------------------------------------------------------------------
// Static contracts
// ---------------------------------------------------------------------------
describe("M3 and configuration contracts", () => {
  it("M3 precedes only M4 (N10.4), CLI-named; M1 and M2 are byte-identical to their applied versions", () => {
    const names = readdirSync(resolve(root, "supabase/migrations")).sort();
    expect(names.at(-2)).toBe(m3.name);
    expect(names.at(-1)).toMatch(/^\d{14}_n10_operator_alert_ledger\.sql$/);
    expect(m3.name).toMatch(/^\d{14}_n10_worker_invocation_hardening\.sql$/);
    expect(sha256Lf(m1.sql)).toBe("bc73c4275e00f1a671363590bae96115655183586c5cb7722a15ad356282c2bd");
    expect(sha256Lf(m2.sql)).toBe("99c42be0f2c735c5754bc1d3cae2f267357e778b20400e3692f9664a7349fdc4");
  });

  it("only account-deletion-worker has verify_jwt = false; delete-account stays true", () => {
    const config = read("supabase/config.toml");
    expect(config).toMatch(/\[functions\.account-deletion-worker\]\r?\nverify_jwt = false/);
    expect(config).toMatch(/\[functions\.delete-account\]\r?\nverify_jwt = true/);
  });

  it("the M3 scheduler references the invoke-secret Vault name and never the service-role name", () => {
    const body = stripSqlComments(m3.sql);
    expect(body).toMatch(/name = 'n10_account_deletion_worker_invoke_secret'/);
    expect(body).toMatch(/name = 'n10_account_deletion_worker_url'/);
    expect(body).toMatch(/'X-N10-Worker-Token', s\.invoke_token/);
    expect(body).toMatch(/body := '\{\}'::jsonb/);
    expect(body).toMatch(/WHERE s\.url IS NOT NULL AND s\.invoke_token IS NOT NULL/);
    const job = body.slice(body.indexOf("$job$"), body.lastIndexOf("$job$"));
    expect(job).not.toMatch(/service_key|service_role|Authorization|apikey|Bearer/i);
  });

  it("no privileged credential or project URL is hardcoded in M1-M3 or the N10 functions", () => {
    const sources = [m1.sql, m2.sql, m3.sql, workerIndex, read("supabase/functions/_shared/accountDeletion.ts"), read("supabase/functions/_shared/accountDeletionRuntime.ts")];
    for (const src of sources) {
      expect(src).not.toMatch(/eyJ[A-Za-z0-9_-]{10,}\.|sb_secret_[A-Za-z0-9]|sb_publishable_[A-Za-z0-9]|postgres(ql)?:\/\/[^\s'"]*:[^\s'"@]+@|https:\/\/[a-z]{20}\.supabase\.co/);
      expect(src).not.toMatch(/vault\.create_secret/);
    }
  });

  it("the worker entrypoint authenticates only the invocation header and has no JWT/service-role path", () => {
    const code = stripTsComments(workerIndex);
    expect(code).toMatch(/handleWorkerInvocation\(/);
    expect(code).toMatch(/req\.headers\.get\(WORKER_TOKEN_HEADER\)/);
    expect(code).not.toMatch(/Authorization|isServiceRoleBearer|SUPABASE_SERVICE_ROLE_KEY|N10_DB_URL|createClient/);
    expect(WORKER_TOKEN_HEADER).toBe("x-n10-worker-token");
  });

  it("the runtime still uses N10_DB_URL only, with no postgres / SUPABASE_DB_URL fallback", () => {
    const runtime = stripTsComments(read("supabase/functions/_shared/accountDeletionRuntime.ts"));
    expect(runtime).toMatch(/Deno\.env\.get\("N10_DB_URL"\)/);
    expect(runtime).toMatch(/!isDedicatedRoleUrl\(dbUrl\)/);
    expect(runtime).not.toMatch(/SUPABASE_DB_URL|postgres:\/\/postgres/);
  });
});

// ---------------------------------------------------------------------------
// Worker boundary (pure; fake runtime that records whether anything privileged was opened)
// ---------------------------------------------------------------------------
function fakeRuntime() {
  const state = { opened: 0, closed: 0, bodyReads: 0 };
  const deps = {
    db: {
      claimDue: async () => [],
      cleanupCompleted: async () => 0,
    },
    log: silentLog,
    now: () => Date.now(),
  } as unknown as N10Deps;
  const open = (): WorkerRuntime => {
    state.opened += 1;
    return { deps, close: async () => void (state.closed += 1) };
  };
  return { state, open };
}

const invoke = (opts: { method?: string; token?: string | null; body?: string; vars?: Record<string, string | undefined> }, rt = fakeRuntime()) => {
  const inv = {
    method: opts.method ?? "POST",
    token: opts.token === undefined ? SECRET : opts.token,
    bodyText: async () => {
      rt.state.bodyReads += 1;
      return opts.body ?? "";
    },
  };
  return handleWorkerInvocation(inv, env(opts.vars ?? GOOD_ENV), rt.open, silentLog).then((r) => ({ r, rt }));
};

describe("worker invocation boundary", () => {
  it("correct invocation token with an empty body: 200 {ok:true}; runtime opened and closed once", async () => {
    const { r, rt } = await invoke({});
    expect(r).toEqual({ httpStatus: 200, body: { ok: true } });
    expect(rt.state).toEqual({ opened: 1, closed: 1, bodyReads: 1 });
    const { r: r2 } = await invoke({ body: " {} " });
    expect(r2.httpStatus).toBe(200);
  });

  it("GET (and any non-POST) is rejected before authentication or any side effect", async () => {
    for (const method of ["GET", "PUT", "DELETE", "OPTIONS"]) {
      const { r, rt } = await invoke({ method });
      expect(r.httpStatus).toBe(405);
      expect(rt.state).toEqual({ opened: 0, closed: 0, bodyReads: 0 });
    }
  });

  it("missing, wrong, truncated, extended or JWT-shaped tokens get a generic 401 and open nothing", async () => {
    const bad = [null, "", "wrong", SECRET.slice(0, -1), SECRET + "x", SECRET.toLowerCase(), "Bearer " + SECRET, "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIn0.sig"];
    for (const token of bad) {
      const { r, rt } = await invoke({ token });
      expect(r).toEqual({ httpStatus: 401, body: { error: "Unauthorized" } });
      expect(rt.state).toEqual({ opened: 0, closed: 0, bodyReads: 0 });
    }
  });

  it("missing or weak N10_WORKER_INVOKE_SECRET is a configuration failure (fail closed), even with a matching header", async () => {
    for (const vars of [{ ...GOOD_ENV, N10_WORKER_INVOKE_SECRET: undefined }, { ...GOOD_ENV, N10_WORKER_INVOKE_SECRET: "" }, { ...GOOD_ENV, N10_WORKER_INVOKE_SECRET: "short-secret" }]) {
      const { r, rt } = await invoke({ token: vars.N10_WORKER_INVOKE_SECRET ?? null, vars });
      expect(r).toEqual({ httpStatus: 503, body: { error: "Server configuration error" } });
      expect(rt.state.opened).toBe(0);
    }
    expect(readInvokeSecret(env({ N10_WORKER_INVOKE_SECRET: "a".repeat(42) }))).toBeNull();
    expect(readInvokeSecret(env({ N10_WORKER_INVOKE_SECRET: "a".repeat(43) }))).toBe("a".repeat(43));
    expect(readInvokeSecret(env({ N10_WORKER_INVOKE_SECRET: "a".repeat(42) + " " }))).toBeNull();
  });

  it("caller-supplied targets are rejected with 400 and open nothing: user_id, request_id, email, bucket, path, status", async () => {
    const bodies = [
      JSON.stringify({ user_id: uuid(1) }),
      JSON.stringify({ request_id: uuid(2) }),
      JSON.stringify({ email: "victim@example.invalid" }),
      JSON.stringify({ bucket: "weekly-photos", path: `${uuid(3)}/a.jpg` }),
      JSON.stringify({ status: "auth_deleted" }),
      JSON.stringify({ source: "pg_cron" }),
      JSON.stringify([uuid(4)]),
      "null",
      '"x"',
      "{not json",
      JSON.stringify({ pad: "x".repeat(2000) }),
    ];
    for (const body of bodies) {
      const { r, rt } = await invoke({ body });
      expect(r, body.slice(0, 40)).toEqual({ httpStatus: 400, body: { error: "Bad request" } });
      expect(rt.state.opened).toBe(0);
    }
  });

  it("an unreadable body is a 400; a runtime that cannot open is a 503; a failed run is a generic 500", async () => {
    const rt = fakeRuntime();
    const r1 = await handleWorkerInvocation({ method: "POST", token: SECRET, bodyText: async () => Promise.reject(new Error("x")) }, env(GOOD_ENV), rt.open, silentLog);
    expect(r1.httpStatus).toBe(400);
    const r2 = await handleWorkerInvocation({ method: "POST", token: SECRET, bodyText: async () => "" }, env(GOOD_ENV), () => null, silentLog);
    expect(r2).toEqual({ httpStatus: 503, body: { error: "Server configuration error" } });
    let closed = 0;
    const failing = { deps: { db: { claimDue: async () => Promise.reject(new Error("relation private.x secret detail")) }, log: silentLog, now: () => Date.now() } as unknown as N10Deps, close: async () => void (closed += 1) };
    const r3 = await handleWorkerInvocation({ method: "POST", token: SECRET, bodyText: async () => "" }, env(GOOD_ENV), () => failing, silentLog);
    expect(r3).toEqual({ httpStatus: 500, body: { error: "Worker run failed" } });
    expect(closed).toBe(1);
  });

  it("comparison helpers: constant-time equality is exact; empty body or {} only", () => {
    expect(constantTimeEqual(SECRET, SECRET)).toBe(true);
    expect(constantTimeEqual(SECRET, SECRET.slice(0, -1))).toBe(false);
    expect(constantTimeEqual("", SECRET)).toBe(false);
    expect(constantTimeEqual("", "")).toBe(true);
    expect(constantTimeEqual("é", "é")).toBe(false);
    expect(isEmptyWorkerBody("")).toBe(true);
    expect(isEmptyWorkerBody("{}")).toBe(true);
    expect(isEmptyWorkerBody('{"a":1}')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Real M1 database (PGlite) + real handler: no target selection, minimal responses, lease safety
// ---------------------------------------------------------------------------
describe("worker invocation against the real M1 database", () => {
  let h: N10Harness;
  const authCalls: string[] = [];

  const makeDeps = (authMode: "ok" | "fail500" = "ok"): N10Deps => ({
    db: createN10Db((sql, params) => h.asWorker(sql, params)),
    auth: {
      async deleteUser(userId) {
        authCalls.push(userId);
        if (authMode === "fail500") return { error: { status: 500, name: "AuthApiError", message: "x" } as AuthErrorLike };
        await h.su("delete from auth.users where id = $1", [userId]);
        return { error: null };
      },
    },
    storage: {
      async remove(bucket, names) {
        await h.su("delete from storage.objects where bucket_id = $1 and name = any($2::text[])", [bucket, names]);
        return { error: null };
      },
    },
    alert: async () => undefined,
    log: silentLog,
    now: () => Date.now(),
  });
  const runtimeFor = (deps: N10Deps) => () => ({ deps, close: async () => undefined });
  const call = (body: string, deps = makeDeps()) =>
    handleWorkerInvocation({ method: "POST", token: SECRET, bodyText: async () => body }, env(GOOD_ENV), runtimeFor(deps), silentLog);
  const addUser = (id: string) => h.su("insert into auth.users (id, email) values ($1, $2)", [id, `${id}@example.invalid`]);
  const requestRows = async () => Number((await h.su("select count(*)::int as n from private.account_deletion_requests"))[0].n);
  const userExists = async (id: string) => Number((await h.su("select count(*)::int as n from auth.users where id = $1", [id]))[0].n) === 1;

  beforeAll(async () => {
    h = await createN10Harness();
  }, 120_000);

  it("calls with no due work are harmless: 200 {ok:true}, no rows created, no Auth call", async () => {
    const victim = uuid(0x901);
    await addUser(victim);
    const before = await requestRows();
    for (let i = 0; i < 3; i++) expect(await call("")).toEqual({ httpStatus: 200, body: { ok: true } });
    expect(await requestRows()).toBe(before);
    expect(authCalls).toHaveLength(0);
    expect(await userExists(victim)).toBe(true);
  });

  it("the invocation secret cannot create a request or select a victim, whatever the body says", async () => {
    const victim = uuid(0x902);
    await addUser(victim);
    for (const body of [JSON.stringify({ user_id: victim }), JSON.stringify({ request_id: victim }), JSON.stringify({ email: `${victim}@example.invalid` })]) {
      expect((await call(body)).httpStatus).toBe(400);
    }
    expect(await call("{}")).toEqual({ httpStatus: 200, body: { ok: true } });
    expect(await requestRows()).toBe(0);
    expect(authCalls).not.toContain(victim);
    expect(await userExists(victim)).toBe(true);
  });

  it("due work is chosen by the database only; the response carries no ids, states or paths", async () => {
    const U = uuid(0x903);
    await addUser(U);
    await h.su("insert into storage.objects (bucket_id, name, owner_id) values ('weekly-photos', $1, $2)", [`${U}/a.jpg`, U]);
    await runDeleteAccount(makeDeps("fail500"), { userId: U, tokenWindowSeconds: 3600 });
    const row = (await h.su("select id, status from private.account_deletion_requests where user_id = $1", [U]))[0];
    expect(row.status).toBe("requested");
    await h.su("update private.account_deletion_requests set next_attempt_at = now() - interval '1 second' where user_id = $1", [U]);
    const res = await call("");
    expect(res).toEqual({ httpStatus: 200, body: { ok: true } });
    const text = JSON.stringify(res);
    expect(text).not.toContain(U);
    expect(text).not.toContain(String(row.id));
    expect(text).not.toMatch(/awaiting_final_sweep|auth_deleted|requested|weekly-photos|a\.jpg/);
    expect(await userExists(U)).toBe(false);
    expect((await h.su("select status from private.account_deletion_requests where id = $1", [row.id]))[0].status).toBe("awaiting_final_sweep");
  });

  it("duplicate and concurrent valid invocations stay lease/idempotency safe: one Auth delete per request", async () => {
    const U = uuid(0x904);
    await addUser(U);
    await runDeleteAccount(makeDeps("fail500"), { userId: U, tokenWindowSeconds: 3600 });
    await h.su("update private.account_deletion_requests set next_attempt_at = now() - interval '1 second' where user_id = $1", [U]);
    const rowsBefore = await requestRows();
    const authBefore = authCalls.filter((u) => u === U).length;
    const results = await Promise.all([call(""), call(""), call("{}")]);
    for (const r of results) expect(r).toEqual({ httpStatus: 200, body: { ok: true } });
    expect(await call("")).toEqual({ httpStatus: 200, body: { ok: true } });
    expect(authCalls.filter((u) => u === U).length - authBefore).toBe(1);
    expect(await requestRows()).toBe(rowsBefore);
  });
});

// ---------------------------------------------------------------------------
// Effective scheduler: run the real M2 then M3 against stand-in cron / Vault / pg_net and inspect
// exactly what pg_net would be asked to send.
// ---------------------------------------------------------------------------
describe("effective N10 scheduler after M3", () => {
  // Assembled at runtime so no credential-shaped literal exists in the repository (secret scans stay clean).
  const b64url = (o: object) => btoa(JSON.stringify(o)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
  const SERVICE_ROLE_FAKE = [b64url({ alg: "HS256", typ: "JWT" }), b64url({ role: "service_role", note: "test-fake" }), "fake-signature"].join(".");
  const SB_SECRET_FAKE = ["sb", "secret", "TESTFAKE0000000000000000"].join("_");
  const STUB = `
    create schema cron;
    create table cron.job (jobid serial primary key, jobname text unique, schedule text, command text);
    create function cron.schedule(n text, s text, c text) returns bigint language sql as
      $$ insert into cron.job (jobname, schedule, command) values (n, s, c)
         on conflict (jobname) do update set schedule = excluded.schedule, command = excluded.command returning jobid::bigint $$;
    create function cron.unschedule(n text) returns boolean language sql as $$ delete from cron.job where jobname = n returning true $$;
    create schema vault;
    create table vault.decrypted_secrets (name text primary key, decrypted_secret text);
    create schema net;
    create table net.captured (url text, headers jsonb, body jsonb, timeout_milliseconds integer);
    create function net.http_post(url text, body jsonb default '{}'::jsonb, params jsonb default '{}'::jsonb,
      headers jsonb default '{}'::jsonb, timeout_milliseconds integer default 5000) returns bigint language sql as
      $$ insert into net.captured values (url, headers, body, timeout_milliseconds) returning 1::bigint $$;
  `;
  // Supabase-managed extensions are stood in by the stub above; the migration text is otherwise unchanged.
  const withoutCreateExtension = (sql: string) => sql.replace(/^CREATE EXTENSION[^\n]*\n/gm, "");
  let db: PGlite;
  const command = async () => String((await db.query<{ command: string }>("select command from cron.job where jobname = 'n10-account-deletion-worker'")).rows[0].command);
  const fire = async () => {
    await db.exec(await command());
    return (await db.query<{ url: string; headers: Record<string, string>; body: unknown }>("select url, headers, body from net.captured")).rows;
  };

  beforeAll(async () => {
    db = new PGlite();
    await db.exec(STUB);
    await db.exec(withoutCreateExtension(m2.sql));
  }, 120_000);

  it("before M3 the M2 job carried the service-role Vault secret (the rejected design)", async () => {
    expect(await command()).toMatch(/n10_account_deletion_worker_service_key/);
  });

  it("M3 replaces the job: exactly one N10 job, invoke-secret only, no service-role reference", async () => {
    await db.exec(m3.sql);
    const jobs = (await db.query<{ n: number }>("select count(*)::int as n from cron.job where jobname = 'n10-account-deletion-worker'")).rows[0].n;
    expect(jobs).toBe(1);
    const cmd = await command();
    expect(cmd).toMatch(/n10_account_deletion_worker_invoke_secret/);
    expect(cmd).not.toMatch(/service_key|Authorization|apikey|Bearer/i);
    expect((await db.query<{ schedule: string }>("select schedule from cron.job")).rows[0].schedule).toBe("* * * * *");
  });

  it("sends nothing while the invoke secret is missing, even if the superseded service-role secret exists", async () => {
    await db.query("insert into vault.decrypted_secrets values ('n10_account_deletion_worker_url', 'https://worker.example.invalid/functions/v1/account-deletion-worker')");
    await db.query("insert into vault.decrypted_secrets values ('n10_account_deletion_worker_service_key', $1)", [SERVICE_ROLE_FAKE]);
    expect(await fire()).toHaveLength(0);
  });

  it("the effective request carries only the URL, Content-Type, X-N10-Worker-Token and an empty body", async () => {
    await db.query("insert into vault.decrypted_secrets values ('n10_account_deletion_worker_invoke_secret', $1)", [SECRET]);
    await db.query("insert into vault.decrypted_secrets values ('sb_secret_holder', $1)", [SB_SECRET_FAKE]);
    const rows = await fire();
    expect(rows).toHaveLength(1);
    const [req] = rows;
    expect(req.url).toBe("https://worker.example.invalid/functions/v1/account-deletion-worker");
    expect(Object.keys(req.headers).sort()).toEqual(["Content-Type", "X-N10-Worker-Token"]);
    expect(req.headers["X-N10-Worker-Token"]).toBe(SECRET);
    expect(req.body).toEqual({});
    const all = JSON.stringify(rows);
    expect(all).not.toContain(SERVICE_ROLE_FAKE);
    expect(all).not.toContain(SB_SECRET_FAKE);
    expect(all).not.toMatch(/eyJ[A-Za-z0-9_-]{10,}|sb_secret_|Bearer/);
  });
});
