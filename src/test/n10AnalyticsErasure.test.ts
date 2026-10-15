import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import {
  createN10Db,
  dispatchOperatorAlerts,
  handleWorkerInvocation,
  runAnalyticsErasure,
  runDeleteAccount,
  runWorker,
  WORKER_RESPONSES,
  type AnalyticsEraser,
  type N10Deps,
  type OperatorAlertMessage,
} from "../../supabase/functions/_shared/accountDeletion";
import {
  classifyPosthogResponse,
  createAnalyticsEraserFromEnv,
  createPosthogEraser,
  readPosthogConfig,
  type FetchLike,
} from "../../supabase/functions/_shared/analyticsErasureProvider";
import { createN10Harness, n10MigrationFile, uuid, type N10Harness } from "./support/n10Pglite";

// D14.1: durable analytics-identity erasure (owner decision E). Real M1 + M4 + M6 + M7 in PGlite, the
// real shared module and the real PostHog adapter against a fake fetch. Nothing here reaches PostHog.

const root = process.cwd();
const read = (p: string) => readFileSync(resolve(root, p), "utf8");
const sha256Lf = (text: string) => createHash("sha256").update(text.replace(/\r\n/g, "\n")).digest("hex");
const code = (src: string) => src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1").replace(/--[^\n]*/g, " ");
const m7 = n10MigrationFile("_n10_analytics_erasure.sql");

// Test-only values shaped like real ones; not credentials.
const FAKE_KEY = "phx_" + "TestOnlyNotARealKey0".repeat(2);
const POSTHOG_ENV = { POSTHOG_PERSONAL_API_KEY: FAKE_KEY, POSTHOG_PROJECT_ID: "12345", POSTHOG_API_HOST: "https://eu.posthog.com" };
const envOf = (vars: Record<string, string | undefined>) => (name: string) => vars[name];

type Logged = { event: string; fields: Record<string, unknown> };
let h: N10Harness;

function makeDeps(target: () => N10Harness = () => h) {
  const logs: Logged[] = [];
  const order: string[] = [];
  const deps: N10Deps = {
    db: createN10Db((sql, params) => target().asWorker(sql, params)),
    auth: {
      async deleteUser(userId) {
        await target().su("delete from auth.users where id = $1", [userId]);
        return { error: null };
      },
    },
    storage: {
      async remove(bucket, names) {
        order.push("storage");
        await target().su("delete from storage.objects where bucket_id = $1 and name = any($2::text[])", [bucket, names]);
        return { error: null };
      },
    },
    alert: async () => undefined,
    log: {
      info: (event, fields) => void logs.push({ event, fields }),
      error: (event, fields) => void logs.push({ event, fields }),
    },
    now: () => Date.now(),
  };
  return { deps, logs, order };
}

const W = { tokenWindowSeconds: 3600 };
const WORKER = { tokenWindow: { ok: true as const, seconds: 3600 }, retentionDays: null };
const addUser = (id: string, t: N10Harness = h) => t.su("insert into auth.users (id, email) values ($1, $2)", [id, `${id}@example.invalid`]);
const addMedia = (id: string, t: N10Harness = h) =>
  t.su("insert into storage.objects (bucket_id, name, owner_id) values ('weekly-photos', $1, $2), ('first-year-memories', $3, $2)", [`${id}/a.jpg`, id, `${id}/b.jpg`]);
const reqRow = async (id: string, t: N10Harness = h) => (await t.su("select * from private.account_deletion_requests where id = $1", [id]))[0];
const media = async (userId: string) => Number((await h.su("select count(*)::int as n from storage.objects where split_part(name, '/', 1) = $1", [userId]))[0].n);
/** delete-account for a fresh user with media; returns the request id. */
async function deleted(userId: string, t: N10Harness = h) {
  await addUser(userId, t);
  await addMedia(userId, t);
  const res = await runDeleteAccount(makeDeps(() => t).deps, { userId, ...W });
  expect(res.httpStatus).toBe(200);
  return String((await t.su("select id from private.account_deletion_requests where user_id = $1", [userId]))[0].id);
}
/** Moves Auth deletion (and the sweep window) into the past. */
const ago = (id: string, interval: string, t: N10Harness = h) =>
  t.timeTravel(id, `auth_deleted_at = auth_deleted_at - interval '${interval}', final_sweep_after = final_sweep_after - interval '${interval}', next_attempt_at = now() - interval '1 second'`);
const makeAnalyticsDue = (id: string) => h.timeTravel(id, "analytics_next_attempt_at = now() - interval '1 second'");
const errorCode = async (fn: () => Promise<unknown>) => {
  try {
    await fn();
    return "no-error";
  } catch (e) {
    return String((e as { code?: string }).code ?? "unknown");
  }
};
const eraser = (result: Awaited<ReturnType<AnalyticsEraser>> | "throw") => {
  const calls: string[] = [];
  const fn: AnalyticsEraser = async (distinctId) => {
    calls.push(distinctId);
    if (result === "throw") throw new Error(`network down ${FAKE_KEY}`);
    return result;
  };
  return { fn, calls };
};
const SOON = () => Date.now() + 10_000;

beforeAll(async () => {
  h = await createN10Harness();
}, 120_000);

// ---------------------------------------------------------------------------
describe("M7 static contract", () => {
  it("is CLI-named, sorts last, and M1–M6 stay byte-identical to their tested/applied versions", () => {
    const names = readdirSync(resolve(root, "supabase/migrations")).sort();
    expect(names[names.length - 1]).toBe(m7.name);
    expect(m7.name).toMatch(/^\d{14}_n10_analytics_erasure\.sql$/);
    const pinned: Record<string, string> = {
      "_n10_account_deletion_foundation.sql": "bc73c4275e00f1a671363590bae96115655183586c5cb7722a15ad356282c2bd",
      "_n10_account_deletion_worker_schedule.sql": "99c42be0f2c735c5754bc1d3cae2f267357e778b20400e3692f9664a7349fdc4",
      "_n10_worker_invocation_hardening.sql": "c2f34cb3f1120b4c47bafee2ad93d0095b4328c5642b96ddfa4527d2671d7324",
      "_n10_operator_alert_ledger.sql": "63348e3a7f45e2d9317a1cfd58a5f58a44fbe37fe75ac00283eff3675979a732",
      "_email_queue_invocation_hardening.sql": "b6899e9a86e78a8e7f8766a27719bcf6a621ade4d110e93a69c3c7f8b57595d0",
      "_n10_privacy_minimisation.sql": "9f9acf6f14a0e478ea9cda05af8274e42d5518d66e08c9e55a02715f8aadea6e",
    };
    for (const [suffix, sha] of Object.entries(pinned)) expect(sha256Lf(n10MigrationFile(suffix).sql), suffix).toBe(sha);
  });

  it("adds no status, no pg_net/cron/Vault, no Storage writes, no grant beyond the worker, and carries no credential", () => {
    const sql = code(m7.sql);
    expect(sql).not.toMatch(/account_deletion_requests_status_check|DROP CONSTRAINT|'privacy_attention'/);
    expect(sql).not.toMatch(/net\.http|cron\.|vault\./i);
    expect(sql).not.toMatch(/\b(insert\s+into|update|delete\s+from)\s+storage\./i);
    expect(sql).not.toMatch(/GRANT[^;]*TO[^;]*(PUBLIC|anon|authenticated|service_role)/i);
    expect(sql).not.toMatch(/POSTHOG|phx_|posthog\.com/i);
    expect(m7.sql).not.toMatch(/POSTHOG_|phx_|posthog\.com/);
  });

  it("the provider is isolated: only the adapter knows PostHog; core, runtime wiring, worker and client never hold the key", () => {
    const adapter = read("supabase/functions/_shared/analyticsErasureProvider.ts");
    const neutral = {
      core: read("supabase/functions/_shared/accountDeletion.ts"),
      worker: read("supabase/functions/account-deletion-worker/index.ts"),
      "delete-account": read("supabase/functions/delete-account/index.ts"),
      M7: m7.sql,
    };
    for (const [name, src] of Object.entries(neutral)) expect(code(src), name).not.toMatch(/posthog/i);
    const runtime = read("supabase/functions/_shared/accountDeletionRuntime.ts");
    expect(runtime).toMatch(/analyticsEraser: createAnalyticsEraserFromEnv\(\(name\) => Deno\.env\.get\(name\), fetch\)/);
    expect(code(runtime)).not.toMatch(/POSTHOG_/);
    expect(adapter).not.toMatch(/net\.http|"npm:|from "https?:/);
    expect(adapter).toMatch(/\/api\/projects\/\$\{config\.projectId\}\/persons\/bulk_delete\//);
    const clientFiles = ["src/lib/analytics.ts", "src/App.tsx", "src/lib/accountDeletion.ts", ".env.example"];
    for (const f of clientFiles) expect(read(f), f).not.toMatch(/POSTHOG_PERSONAL_API_KEY|phx_/);
  });
});

// ---------------------------------------------------------------------------
describe("PostHog adapter (fake fetch; verified request shape)", () => {
  type Call = { url: string; init: Parameters<FetchLike>[1] };
  const fakeFetch = (status: number, body: unknown, opts: { throwError?: boolean; hang?: boolean } = {}) => {
    const calls: Call[] = [];
    const fetchImpl: FetchLike = (url, init) => {
      calls.push({ url, init });
      if (opts.throwError) return Promise.reject(new Error(`ECONNRESET Authorization: Bearer ${FAKE_KEY}`));
      if (opts.hang) return new Promise((_, reject) => init.signal.addEventListener("abort", () => reject(new Error("aborted"))));
      return Promise.resolve({ status, json: async () => (body === "malformed" ? JSON.parse("{") : body) });
    };
    return { calls, fetchImpl };
  };
  const config = readPosthogConfig(envOf(POSTHOG_ENV))!;
  const U = uuid(0xa001);
  const OK = { persons_found: 1, persons_deleted: 0, persons_queued_for_deletion: 1, events_queued_for_deletion: true, recordings_queued_for_deletion: true, deletion_errors: [] };

  it("successful cleanup: one POST to bulk_delete with the user UUID, events and recordings, Bearer key", async () => {
    const f = fakeFetch(202, OK);
    expect(await createPosthogEraser(config, f.fetchImpl)(U)).toEqual({ ok: true, personsFound: 1 });
    expect(f.calls).toHaveLength(1);
    expect(f.calls[0].url).toBe("https://eu.posthog.com/api/projects/12345/persons/bulk_delete/");
    expect(f.calls[0].init.method).toBe("POST");
    expect(JSON.parse(f.calls[0].init.body)).toEqual({ distinct_ids: [U], delete_events: true, delete_recordings: true, keep_person: false });
    expect(f.calls[0].init.headers.Authorization).toBe(`Bearer ${FAKE_KEY}`);
  });

  it("no person for the id (never identified, or already deleted) resolves with persons_found 0", async () => {
    const f = fakeFetch(202, { ...OK, persons_found: 0, persons_queued_for_deletion: 0, events_queued_for_deletion: false });
    expect(await createPosthogEraser(config, f.fetchImpl)(U)).toEqual({ ok: true, personsFound: 0 });
  });

  it("4xx is permanent; 408/429/5xx, network errors and timeouts are transient", async () => {
    for (const s of [400, 401, 403, 404, 422]) expect(classifyPosthogResponse(s, null), String(s)).toEqual({ ok: false, failure: "permanent" });
    for (const s of [408, 429, 500, 502, 503, 504]) expect(classifyPosthogResponse(s, null), String(s)).toEqual({ ok: false, failure: "transient" });
    expect(await createPosthogEraser(config, fakeFetch(0, null, { throwError: true }).fetchImpl)(U)).toEqual({ ok: false, failure: "transient" });
    expect(await createPosthogEraser(config, fakeFetch(0, null, { hang: true }).fetchImpl, 20)(U)).toEqual({ ok: false, failure: "transient" });
    expect(await createPosthogEraser(config, fakeFetch(403, null).fetchImpl)(U)).toEqual({ ok: false, failure: "permanent" });
  });

  it("a 202 that did not fully delete, or did not queue events, or is malformed, retries", () => {
    expect(classifyPosthogResponse(202, { ...OK, deletion_errors: [{ person_uuid: "p", step: "delete_person" }] })).toEqual({ ok: false, failure: "transient" });
    expect(classifyPosthogResponse(202, { ...OK, events_queued_for_deletion: false })).toEqual({ ok: false, failure: "transient" });
    expect(classifyPosthogResponse(202, { ...OK, persons_found: "1" })).toEqual({ ok: false, failure: "transient" });
    expect(classifyPosthogResponse(202, null)).toEqual({ ok: false, failure: "transient" });
    // PostHog documents these two steps as "person deleted"; retrying would not find the person.
    expect(classifyPosthogResponse(202, { ...OK, deletion_errors: [{ person_uuid: "p", step: "log_activity" }] })).toEqual({ ok: true, personsFound: 1 });
  });

  it("only a UUID distinct id is ever sent", async () => {
    const f = fakeFetch(202, OK);
    expect(await createPosthogEraser(config, f.fetchImpl)("someone@example.invalid")).toEqual({ ok: false, failure: "permanent" });
    expect(f.calls).toHaveLength(0);
  });

  it("configuration fails closed: missing or malformed key, project or host gives no eraser", () => {
    expect(createAnalyticsEraserFromEnv(envOf(POSTHOG_ENV), fakeFetch(202, OK).fetchImpl)).not.toBeNull();
    for (const bad of [
      { POSTHOG_PERSONAL_API_KEY: undefined },
      { POSTHOG_PERSONAL_API_KEY: "phc_projectKeyIsNotAPersonalKey1234" },
      { POSTHOG_PROJECT_ID: undefined },
      { POSTHOG_PROJECT_ID: "abc" },
      { POSTHOG_API_HOST: undefined },
      { POSTHOG_API_HOST: "http://eu.posthog.com" },
      { POSTHOG_API_HOST: "https://eu.i.posthog.com" },
      { POSTHOG_API_HOST: "https://attacker.example.invalid" },
    ]) expect(createAnalyticsEraserFromEnv(envOf({ ...POSTHOG_ENV, ...bad }), fakeFetch(202, OK).fetchImpl), JSON.stringify(bad)).toBeNull();
  });

  it("no secret leakage: results never carry the key, even when the transport error message does", async () => {
    const r = await createPosthogEraser(config, fakeFetch(0, null, { throwError: true }).fetchImpl)(U);
    expect(JSON.stringify(r)).not.toContain(FAKE_KEY);
    expect(JSON.stringify(await createPosthogEraser(config, fakeFetch(401, { detail: FAKE_KEY }).fetchImpl)(U))).not.toContain(FAKE_KEY);
  });
});

// ---------------------------------------------------------------------------
describe("durable erasure on the real database (M1 + M4 + M6 + M7)", () => {
  it("is not due before Auth deletion, and not until 15 minutes after it", async () => {
    const pre = uuid(0xb000);
    await addUser(pre);
    await h.asWorker("select * from private.n10_open_request($1::uuid, 120)", [pre]);
    const id = await deleted(uuid(0xb001));
    const due = await h.asWorker("select o_request_id from private.n10_analytics_due(50, 120)");
    expect(due.map((d) => d.o_request_id)).not.toContain(id);
    const preId = String((await h.su("select id from private.account_deletion_requests where user_id = $1", [pre]))[0].id);
    expect(due.map((d) => d.o_request_id)).not.toContain(preId);
    expect((await reqRow(preId)).analytics_status).toBe("pending");
  });

  it("successful cleanup: media purged immediately without the provider, erasure resolves, then COMPLETED", async () => {
    const U = uuid(0xb010);
    const id = await deleted(U);
    expect(await media(U)).toBe(0); // the synchronous purge never consults analytics
    await ago(id, "20 minutes");
    const e = eraser({ ok: true, personsFound: 1 });
    const { deps, logs } = makeDeps();
    expect(await runAnalyticsErasure(deps, e.fn, SOON())).toEqual({ resolved: 1, failed: 0, attention: 0 });
    expect(e.calls).toEqual([U]);
    const r = await reqRow(id);
    expect(r).toMatchObject({ analytics_status: "resolved", analytics_persons_found: 1, analytics_last_error: null, analytics_attention_since: null, user_id: U });
    expect(r.analytics_resolved_at).not.toBeNull();
    await ago(id, "2 hours");
    await runWorker(makeDeps().deps, WORKER);
    const done = await reqRow(id);
    expect(done).toMatchObject({ status: "completed", user_id: null });
    for (const l of logs) expect(JSON.stringify(l)).not.toContain(U);
  });

  it("repeated runs are idempotent: a resolved erasure is never re-sent; a live lease is never shared", async () => {
    const U = uuid(0xb020);
    const id = await deleted(U);
    await ago(id, "20 minutes");
    const first = await h.asWorker("select o_request_id from private.n10_analytics_due(50, 120)");
    expect(first.map((d) => d.o_request_id)).toContain(id);
    expect((await h.asWorker("select o_request_id from private.n10_analytics_due(50, 120)")).map((d) => d.o_request_id)).not.toContain(id);
    await h.timeTravel(id, "analytics_lease_until = now() - interval '1 second'");
    const e = eraser({ ok: true, personsFound: 1 });
    await runAnalyticsErasure(makeDeps().deps, e.fn, SOON());
    await runAnalyticsErasure(makeDeps().deps, e.fn, SOON());
    await makeAnalyticsDue(id);
    await runAnalyticsErasure(makeDeps().deps, e.fn, SOON());
    expect(e.calls).toEqual([U]);
    expect((await reqRow(id)).analytics_attempt_count).toBe(1);
  });

  it("missing credential fails closed: durable config failure, immediate attention, no COMPLETED, user id kept", async () => {
    const U = uuid(0xb030);
    const id = await deleted(U);
    await ago(id, "2 hours");
    const { deps } = makeDeps();
    expect(await runAnalyticsErasure(deps, null, SOON())).toEqual({ resolved: 0, failed: 1, attention: 1 });
    await runWorker(deps, WORKER);
    await runWorker(deps, WORKER);
    const r = await reqRow(id);
    expect(r).toMatchObject({ status: "awaiting_final_sweep", user_id: U, analytics_status: "pending", analytics_last_error: "analytics_config", completed_at: null, anonymised_at: null });
    expect(r.analytics_attention_since).not.toBeNull();
    expect((await h.su("select analytics_next_attempt_at > now() + interval '50 minutes' as later from private.account_deletion_requests where id = $1", [id]))[0].later).toBe(true);
  });

  it("a provider 4xx is permanent: immediate attention, hourly retry, still pending", async () => {
    const id = await deleted(uuid(0xb040));
    await ago(id, "20 minutes");
    await runAnalyticsErasure(makeDeps().deps, eraser({ ok: false, failure: "permanent" }).fn, SOON());
    const r = await reqRow(id);
    expect(r).toMatchObject({ analytics_status: "pending", analytics_last_error: "analytics_permanent" });
    expect(r.analytics_attention_since).not.toBeNull();
  });

  it("5xx / network errors retry on the backoff schedule and become attention only after 24 hours", async () => {
    const id = await deleted(uuid(0xb050));
    await ago(id, "20 minutes");
    await runAnalyticsErasure(makeDeps().deps, eraser("throw").fn, SOON());
    let r = await reqRow(id);
    expect(r).toMatchObject({ analytics_status: "pending", analytics_last_error: "analytics_transient", analytics_attention_since: null, analytics_attempt_count: 1 });
    expect((await h.su("select analytics_next_attempt_at between now() + interval '50 seconds' and now() + interval '70 seconds' as one_min from private.account_deletion_requests where id = $1", [id]))[0].one_min).toBe(true);
    await ago(id, "25 hours");
    await makeAnalyticsDue(id);
    await runAnalyticsErasure(makeDeps().deps, eraser({ ok: false, failure: "transient" }).fn, SOON());
    r = await reqRow(id);
    expect(r.analytics_attention_since).not.toBeNull();
    expect(r.status).not.toBe("purge_attention"); // the media state machine is not borrowed
  });

  it("media purge continues independently: the worker media loop never calls the eraser, and runs first", async () => {
    const U = uuid(0xb060);
    await addUser(U);
    await addMedia(U);
    // Auth deletion fails in the request; the worker owns everything that follows.
    const failing = makeDeps();
    failing.deps.auth.deleteUser = async () => ({ error: { status: 500, name: "AuthApiError", message: "x" } });
    await runDeleteAccount(failing.deps, { userId: U, ...W });
    await h.su("update private.account_deletion_requests set next_attempt_at = now() - interval '1 second' where user_id = $1", [U]);
    // Another request whose erasure is already due, with the provider failing.
    const V = uuid(0xb061);
    await ago(await deleted(V), "20 minutes");
    const e = eraser("throw");
    const { deps, order } = makeDeps();
    const wrapped: AnalyticsEraser = async (id) => (order.push("analytics"), e.fn(id));
    const res = await handleWorkerInvocation(
      { method: "POST", token: "inv_" + "A1b2C3d4E5".repeat(5), bodyText: async () => "" },
      envOf({ N10_WORKER_INVOKE_SECRET: "inv_" + "A1b2C3d4E5".repeat(5), N10_VERIFIED_TOKEN_WINDOW_SECONDS: "3600", N10_TOKEN_WINDOW_VERIFICATION: "management-api:2026-10-09" }),
      () => ({ deps, close: async () => undefined, analyticsEraser: wrapped }),
      { info: () => undefined, error: () => undefined },
    );
    expect(res).toEqual(WORKER_RESPONSES.ok);
    expect(await media(U)).toBe(0);
    expect(e.calls).toContain(V);
    expect(order.indexOf("storage")).toBe(0);
    expect(order.lastIndexOf("storage")).toBeLessThan(order.indexOf("analytics"));
    const id = String((await h.su("select id from private.account_deletion_requests where user_id = $1", [U]))[0].id);
    expect((await reqRow(id)).status).toBe("awaiting_final_sweep");
  });

  it("COMPLETED is gated: after the window with erasure pending the worker never completes or anonymises", async () => {
    const U = uuid(0xb070);
    const id = await deleted(U);
    await ago(id, "3 hours");
    for (let i = 0; i < 3; i++) {
      await h.su("update private.account_deletion_requests set next_attempt_at = now() - interval '1 second' where id = $1", [id]);
      await runWorker(makeDeps().deps, WORKER);
    }
    expect(await reqRow(id)).toMatchObject({ status: "awaiting_final_sweep", user_id: U, completed_at: null, anonymised_at: null });
    // Direct writes are refused too (M1 guard + M7 guard + CHECK).
    expect(await errorCode(() => h.su("update private.account_deletion_requests set status = 'completed', completed_at = now(), user_id = null, anonymised_at = now() where id = $1", [id]))).toBe("23514");
    expect(await errorCode(() => h.su("update private.account_deletion_requests set analytics_status = 'not_tracked' where id = $1", [id]))).toBe("23514");
    expect(await errorCode(() => h.su("update private.account_deletion_requests set analytics_status = 'resolved' where id = $1", [id]))).toBe("23514");
  });

  it("the user identifier is kept until resolution; resolution is refused while the Auth user exists or with a wrong lease", async () => {
    const U = uuid(0xb080);
    const id = await deleted(U);
    await ago(id, "20 minutes");
    const lease = String((await h.asWorker("select * from private.n10_analytics_due(50, 120)")).find((d) => d.o_request_id === id)?.o_lease);
    expect(await errorCode(() => h.asWorker("select private.n10_record_analytics($1::uuid, $2::text, 'resolved', null, 1)", [id, "2000-01-01 00:00:00+00"]))).toBe("55000");
    await addUser(U); // an Auth user with the same id reappears
    expect(await errorCode(() => h.asWorker("select private.n10_record_analytics($1::uuid, $2::text, 'resolved', null, 1)", [id, lease]))).toBe("23514");
    await h.su("delete from auth.users where id = $1", [U]);
    expect((await h.asWorker("select private.n10_record_analytics($1::uuid, $2::text, 'resolved', null, 1) as s", [id, lease]))[0].s).toBe("resolved");
    expect((await reqRow(id)).user_id).toBe(U); // still there until COMPLETED
  });

  it("persistent failure reaches the operator-alert path once, with no personal data, and stops after resolution", async () => {
    const U = uuid(0xb090);
    const id = await deleted(U);
    await ago(id, "2 hours");
    await runAnalyticsErasure(makeDeps().deps, null, SOON());
    const sent: OperatorAlertMessage[] = [];
    const cfg = { ok: true as const, to: "ops-test@example.invalid", from: "alerts-test@example.invalid", environment: "test" };
    const notifier = async (m: OperatorAlertMessage) => (sent.push(m), { ok: true as const });
    const drain = async () => {
      for (let i = 0; i < 10; i++) if ((await dispatchOperatorAlerts(makeDeps().deps, cfg, notifier)).sent === 0) return;
    };
    await drain();
    const mine = sent.filter((m) => m.text.includes(id));
    expect(mine).toHaveLength(1);
    expect(mine[0].subject).toMatch(/Analytics identity erasure needs operator attention/);
    expect(mine[0].text).toMatch(/Error class: analytics_config/);
    for (const m of mine) for (const s of [U, `${U}@example.invalid`, FAKE_KEY, "weekly-photos"]) expect(m.subject + m.text + m.html).not.toContain(s);
    expect((await reqRow(id)).alert_key).toBe("analytics_attention:analytics_config");
    await drain();
    expect(sent.filter((m) => m.text.includes(id))).toHaveLength(1); // no duplicate on the next tick
    // A different error class is a new alert key.
    await makeAnalyticsDue(id);
    await runAnalyticsErasure(makeDeps().deps, eraser({ ok: false, failure: "permanent" }).fn, SOON());
    await drain();
    expect(sent.filter((m) => m.text.includes(id))).toHaveLength(2);
    // Resolution clears the condition.
    await makeAnalyticsDue(id);
    await runAnalyticsErasure(makeDeps().deps, eraser({ ok: true, personsFound: 1 }).fn, SOON());
    expect((await h.asWorker("select o_request_id from private.n10_alerts_due(50, 120)")).map((d) => d.o_request_id)).not.toContain(id);
  });
});

// ---------------------------------------------------------------------------
// Mutation tests of the completion gate: each database layer is removed in turn. Any single layer
// still prevents COMPLETED; removing all three lets the request complete with erasure pending, which
// the gating test above would detect.
// ---------------------------------------------------------------------------
describe("mutation: completion gate layers", () => {
  const GATE = / {2}IF v_row\.analytics_status <> 'resolved' THEN\n[\s\S]*?RETURN 'awaiting_final_sweep';\n {2}END IF;\n\n {2}UPDATE private\.account_deletion_requests r\n {2}SET status = 'completed',/;
  const CHECK = / {2}ADD CONSTRAINT account_deletion_requests_analytics_completed_check\n {4}CHECK \(status <> 'completed' OR analytics_status IN \('resolved', 'not_tracked'\)\),\n/;
  const TRIGGER_USER = / {2}IF OLD\.user_id IS NOT NULL AND NEW\.user_id IS NULL AND NEW\.analytics_status <> 'resolved' THEN\n[\s\S]*? {2}END IF;\n/;
  const TRIGGER_DONE = / {2}IF NEW\.status = 'completed' AND OLD\.status <> 'completed' AND NEW\.analytics_status <> 'resolved' THEN\n[\s\S]*? {2}END IF;\n/;
  const lf = m7.sql.replace(/\r\n/g, "\n");
  const mutate = (layers: ("gate" | "check" | "trigger")[]) => {
    let sql = lf;
    const sub = (re: RegExp, by: string) => {
      expect(re.test(sql), String(re)).toBe(true);
      sql = sql.replace(re, by);
    };
    if (layers.includes("gate")) sub(GATE, "  UPDATE private.account_deletion_requests r\n  SET status = 'completed',");
    if (layers.includes("check")) sub(CHECK, "");
    if (layers.includes("trigger")) {
      sub(TRIGGER_USER, "");
      sub(TRIGGER_DONE, "");
    }
    return sql;
  };
  async function attemptCompletion(layers: ("gate" | "check" | "trigger")[], n: number) {
    const t = await createN10Harness({ m7Sql: mutate(layers) });
    const U = uuid(0xc000 + n);
    const id = await deleted(U, t);
    await ago(id, "3 hours", t);
    const claimed = (await t.asWorker("select * from private.n10_claim_due(5, 300)")).find((c) => c.o_request_id === id);
    const code = await errorCode(() => t.asWorker("select private.n10_record_purge($1::uuid, $2::text, 'awaiting_final_sweep', 0)", [id, claimed?.o_lease]));
    return { code, row: await reqRow(id, t) };
  }

  it("unmutated: the gate holds the request without error", async () => {
    const { code, row } = await attemptCompletion([], 1);
    expect(code).toBe("no-error");
    expect(row).toMatchObject({ status: "awaiting_final_sweep", analytics_status: "pending" });
    expect(row.user_id).not.toBeNull();
  }, 60_000);

  it.each([
    [["gate"], 2],
    [["gate", "check"], 3],
    [["gate", "trigger"], 4],
  ] as const)("mutant without %j: still no COMPLETED (a remaining layer refuses with 23514)", async (layers, n) => {
    const { code, row } = await attemptCompletion([...layers], n);
    expect(code).toBe("23514");
    expect(row.status).toBe("awaiting_final_sweep");
    expect(row.user_id).not.toBeNull();
  }, 60_000);

  it("mutant without all three layers completes and anonymises with erasure pending (the gate test would fail)", async () => {
    const { code, row } = await attemptCompletion(["gate", "check", "trigger"], 5);
    expect(code).toBe("no-error");
    expect(row).toMatchObject({ status: "completed", analytics_status: "pending", user_id: null });
  }, 60_000);
});
