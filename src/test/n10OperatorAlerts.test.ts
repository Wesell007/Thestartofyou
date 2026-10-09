import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import {
  createN10Db,
  dispatchOperatorAlerts,
  handleWorkerInvocation,
  readOperatorAlertConfig,
  renderOperatorAlert,
  runDeleteAccount,
  WORKER_TOKEN_HEADER,
  type AuthErrorLike,
  type N10Deps,
  type OperatorAlertConfig,
  type OperatorAlertMessage,
  type OperatorNotifier,
} from "../../supabase/functions/_shared/accountDeletion";
import { createN10Harness, n10MigrationFile, uuid, type N10Harness } from "./support/n10Pglite";

// N10.4 operator alerts (M4 ledger). Real M1 + M4 in PGlite, the real deletion flow, the real
// dispatcher and a fake provider. No external e-mail is ever sent by these tests.

const root = process.cwd();
const read = (p: string) => readFileSync(resolve(root, p), "utf8");
const stripSqlComments = (sql: string) => sql.replace(/--[^\n]*/g, " ");
const m4 = n10MigrationFile("_n10_operator_alert_ledger.sql");

let h: N10Harness;
const CONFIG: OperatorAlertConfig = { ok: true, to: "ops-test@example.invalid", from: "alerts-test@example.invalid", environment: "test" };
const logs: { event: string; fields: Record<string, unknown> }[] = [];
const log = {
  info: (event: string, fields: Record<string, unknown>) => void logs.push({ event, fields }),
  error: (event: string, fields: Record<string, unknown>) => void logs.push({ event, fields }),
};

function makeDeps(authMode: "ok" | "fail500" | "permanent" = "ok"): N10Deps {
  return {
    db: createN10Db((sql, params) => h.asWorker(sql, params)),
    auth: {
      async deleteUser(userId) {
        if (authMode === "fail500") return { error: { status: 500, name: "AuthApiError", message: "x" } as AuthErrorLike };
        if (authMode === "permanent") return { error: { status: 400, name: "AuthApiError", message: "x" } as AuthErrorLike };
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
    log,
    now: () => Date.now(),
  };
}

function fakeNotifier(mode: "ok" | "reject" | "throw" = "ok") {
  const sent: OperatorAlertMessage[] = [];
  const notifier: OperatorNotifier = async (m) => {
    sent.push(m);
    if (mode === "throw") throw new Error("provider exploded with api key sk_live_should_not_leak");
    return mode === "ok" ? { ok: true } : { ok: false, reason: "provider_rejected" };
  };
  return { sent, notifier };
}

const W = { tokenWindowSeconds: 3600 };
const addUser = (id: string) => h.su("insert into auth.users (id, email) values ($1, $2)", [id, `${id}@example.invalid`]);
const row = async (userId: string) => (await h.su("select * from private.account_deletion_requests where user_id = $1", [userId]))[0];
const dispatch = (n = fakeNotifier(), cfg: OperatorAlertConfig = CONFIG) => dispatchOperatorAlerts(makeDeps(), cfg, n.notifier).then((r) => ({ r, n }));
const drain = async () => {
  for (let i = 0; i < 5; i++) if ((await dispatch()).r.sent === 0) return;
};
const sensitive = (userId: string) => [userId, `${userId}@example.invalid`, "weekly-photos", "first-year-memories", ".jpg", "misfiled"];

beforeAll(async () => {
  h = await createN10Harness();
}, 120_000);

describe("M4 static contract", () => {
  it("is additive: alert_* columns, three hardened definer functions, worker-only EXECUTE, no Storage or status writes", () => {
    const sql = stripSqlComments(m4.sql);
    expect(sql).toMatch(/ALTER TABLE private\.account_deletion_requests\s+ADD COLUMN alert_key text/);
    const fns = sql.split(/CREATE OR REPLACE FUNCTION /).slice(1);
    expect(fns).toHaveLength(3);
    for (const f of fns) {
      expect(f.split("AS $$")[0]).toMatch(/SECURITY DEFINER/);
      expect(f.split("AS $$")[0]).toMatch(/SET search_path = ''/);
    }
    expect(sql).not.toMatch(/\b(insert\s+into|update|delete\s+from)\s+storage\./i);
    expect(sql).not.toMatch(/SET\s+status\s*=|user_id\s*=\s*NULL|auth_deleted_at\s*=|final_sweep_after\s*=/i);
    expect(sql).not.toMatch(/GRANT[^;]*TO[^;]*(PUBLIC|anon|authenticated|service_role)/i);
    expect(sql).not.toMatch(/cron\.|net\.http|vault\./);
  });

  it("no alert address is hardcoded and the provider is reached only from the runtime, exactly pinned, without pg_net", () => {
    const shared = read("supabase/functions/_shared/accountDeletion.ts");
    const runtime = read("supabase/functions/_shared/accountDeletionRuntime.ts");
    for (const src of [shared, runtime, m4.sql]) expect(src).not.toMatch(/[A-Za-z0-9._%+-]+@(?!example\.invalid)[A-Za-z0-9-]+\.[A-Za-z]{2,}/);
    expect(runtime).toMatch(/from "npm:@lovable\.dev\/email-js@0\.3\.1"/);
    expect(runtime).toMatch(/Deno\.env\.get\("LOVABLE_API_KEY"\)/);
    expect(shared).not.toMatch(/LOVABLE_API_KEY|sendLovableEmail/);
    expect(runtime).not.toMatch(/net\.http|enqueue_email|Authorization/);
  });
});

describe("configuration (fail closed)", () => {
  const env = (v: Record<string, string>) => (k: string) => v[k];
  it("requires a valid destination, a valid sender and an available provider", () => {
    expect(readOperatorAlertConfig(env({}), true)).toEqual({ ok: false, reason: "destination_unconfigured" });
    expect(readOperatorAlertConfig(env({ N10_OPERATOR_ALERT_EMAIL: "not-an-address" }), true)).toEqual({ ok: false, reason: "destination_unconfigured" });
    expect(readOperatorAlertConfig(env({ N10_OPERATOR_ALERT_EMAIL: "ops@example.invalid" }), true)).toEqual({ ok: false, reason: "sender_unconfigured" });
    expect(readOperatorAlertConfig(env({ N10_OPERATOR_ALERT_EMAIL: "ops@example.invalid", N10_OPERATOR_ALERT_FROM: "a@example.invalid" }), false)).toEqual({ ok: false, reason: "provider_unconfigured" });
    expect(readOperatorAlertConfig(env({ N10_OPERATOR_ALERT_EMAIL: "ops@example.invalid", N10_OPERATOR_ALERT_FROM: "a@example.invalid", N10_ENVIRONMENT: "production" }), true)).toEqual({ ok: true, to: "ops@example.invalid", from: "a@example.invalid", environment: "production" });
    expect(readOperatorAlertConfig(env({ N10_OPERATOR_ALERT_EMAIL: "ops@example.invalid", N10_OPERATOR_ALERT_FROM: "a@example.invalid", N10_ENVIRONMENT: "<script>" }), true)).toMatchObject({ environment: "unspecified" });
  });
});

describe("alert events, payload minimisation and deduplication (real M1 + M4)", () => {
  it("a normal successful deletion produces no alert", async () => {
    const U = uuid(0x401);
    await addUser(U);
    await h.su("insert into storage.objects (bucket_id, name, owner_id) values ('weekly-photos', $1, $2)", [`${U}/a.jpg`, U]);
    const res = await runDeleteAccount(makeDeps("ok"), { userId: U, ...W });
    expect(res.httpStatus).toBe(200);
    const { r, n } = await dispatch();
    expect(r).toMatchObject({ sent: 0, failed: 0 });
    expect(n.sent).toHaveLength(0);
  });

  it("an ordinary retryable pre-threshold Auth failure does not alert", async () => {
    const U = uuid(0x402);
    await addUser(U);
    await runDeleteAccount(makeDeps("fail500"), { userId: U, ...W });
    expect((await row(U)).status).toBe("requested");
    const { n } = await dispatch();
    expect(n.sent).toHaveLength(0);
  });

  it("permanent Auth failure -> auth_attention -> exactly one minimal alert with the opaque request id", async () => {
    await drain();
    const U = uuid(0x403);
    await addUser(U);
    await runDeleteAccount(makeDeps("permanent"), { userId: U, ...W });
    const r0 = await row(U);
    expect(r0.status).toBe("auth_attention");
    const { r, n } = await dispatch();
    expect(r.sent).toBe(1);
    const m = n.sent[0];
    expect(m.to).toBe(CONFIG.to);
    expect(m.text).toContain(String(r0.id));
    expect(m.text).toMatch(/Status: auth_attention/);
    expect(m.text).toMatch(/Error class: auth_permanent/);
    expect(m.text).toMatch(/Environment: test/);
    for (const s of sensitive(U)) {
      expect(m.text).not.toContain(s);
      expect(m.html).not.toContain(s);
      expect(m.subject).not.toContain(s);
    }
    // repeat worker ticks: no duplicate
    for (let i = 0; i < 3; i++) expect((await dispatch()).n.sent).toHaveLength(0);
    // the ledger touched alert columns only
    const r1 = await row(U);
    for (const k of ["status", "attempt_count", "last_error_class", "requested_at", "auth_deleted_at", "next_attempt_at", "user_id"]) expect(r1[k], k).toEqual(r0[k]);
    expect(r1.alert_key).toBe("auth_attention:auth_permanent");
  });

  it("owner_id/path anomaly -> purge_attention -> alert with class owner_id_path_anomaly; no path in the message", async () => {
    await drain();
    const U = uuid(0x404);
    await addUser(U);
    await h.su("insert into storage.objects (bucket_id, name, owner_id) values ('weekly-photos', $1, $2), ('first-year-memories', $3, $2)", [`${U}/ok.jpg`, U, `misfiled/${U}.jpg`]);
    await runDeleteAccount(makeDeps("ok"), { userId: U, ...W });
    expect((await row(U)).status).toBe("purge_attention");
    const { n } = await dispatch();
    expect(n.sent).toHaveLength(1);
    expect(n.sent[0].text).toMatch(/Media purge needs operator attention/);
    expect(n.sent[0].text).toMatch(/Error class: owner_id_path_anomaly/);
    for (const s of sensitive(U)) expect(n.sent[0].text + n.sent[0].html).not.toContain(s);
  });

  it("24 h unresolved -> exactly one escalation alert; then silence", async () => {
    await drain();
    const U = uuid(0x405);
    await addUser(U);
    await runDeleteAccount(makeDeps("permanent"), { userId: U, ...W });
    expect((await dispatch()).n.sent).toHaveLength(1);
    const id = String((await row(U)).id);
    await h.timeTravel(id, "alert_sent_at = alert_sent_at - interval '25 hours'");
    const { n } = await dispatch();
    expect(n.sent).toHaveLength(1);
    expect(n.sent[0].subject).toMatch(/ESCALATION/);
    expect(n.sent[0].text).toMatch(/unresolved after 24 hours/);
    expect(n.sent[0].text).toMatch(/First alerted at/);
    for (let i = 0; i < 3; i++) expect((await dispatch()).n.sent).toHaveLength(0);
  });

  it("a meaningful error-class change in the same attention state alerts again", async () => {
    await drain();
    const U = uuid(0x406);
    await addUser(U);
    await runDeleteAccount(makeDeps("permanent"), { userId: U, ...W });
    expect((await dispatch()).n.sent).toHaveLength(1);
    await h.timeTravel(String((await row(U)).id), "last_error_class = 'auth_unknown_outcome'");
    const { n } = await dispatch();
    expect(n.sent).toHaveLength(1);
    expect(n.sent[0].text).toMatch(/Error class: auth_unknown_outcome/);
  });

  it("provider failure leaves deletion state intact, is logged without secrets, backs off, then retries and delivers", async () => {
    await drain();
    const U = uuid(0x407);
    await addUser(U);
    await runDeleteAccount(makeDeps("permanent"), { userId: U, ...W });
    const before = await row(U);
    logs.length = 0;
    const first = await dispatch(fakeNotifier("throw"));
    expect(first.r).toMatchObject({ sent: 0, failed: 1 });
    const after = await row(U);
    expect(after.status).toBe("auth_attention");
    for (const k of ["status", "attempt_count", "last_error_class", "user_id"]) expect(after[k], k).toEqual(before[k]);
    expect(after.alert_failure_count).toBe(1);
    expect(after.alert_key).toBeNull();
    const logged = JSON.stringify(logs);
    expect(logged).toMatch(/n10_operator_alert_delivery_failed/);
    expect(logged).not.toMatch(/sk_live|exploded|example\.invalid/);
    // backoff: not retried on the next tick
    expect((await dispatch(fakeNotifier("reject"))).n.sent).toHaveLength(0);
    await h.timeTravel(String(after.id), "alert_next_attempt_at = now() - interval '1 second'");
    const retry = await dispatch(fakeNotifier("reject"));
    expect(retry.r.failed).toBe(1);
    expect((await row(U)).alert_failure_count).toBe(2);
    await h.timeTravel(String(after.id), "alert_next_attempt_at = now() - interval '1 second'");
    expect((await dispatch()).r.sent).toBe(1);
    expect((await row(U)).alert_failure_count).toBe(0);
  });

  it("no destination: nothing is sent, the pending count is logged, alerts stay pending for later delivery", async () => {
    await drain();
    const U = uuid(0x408);
    await addUser(U);
    await runDeleteAccount(makeDeps("permanent"), { userId: U, ...W });
    logs.length = 0;
    const n = fakeNotifier();
    const r = await dispatchOperatorAlerts(makeDeps(), { ok: false, reason: "destination_unconfigured" }, n.notifier);
    expect(r).toMatchObject({ sent: 0, configured: false, pending: 1 });
    expect(n.sent).toHaveLength(0);
    expect(logs.find((l) => l.event === "n10_operator_alert_unconfigured")?.fields).toEqual({ reason: "destination_unconfigured", pending: 1 });
    expect((await row(U)).alert_key).toBeNull();
    expect((await dispatch()).n.sent).toHaveLength(1);
  });

  it("a leased alert is never handed to a second, overlapping dispatcher", async () => {
    await drain();
    const U = uuid(0x409);
    await addUser(U);
    await runDeleteAccount(makeDeps("permanent"), { userId: U, ...W });
    const db = makeDeps().db;
    const first = await db.alertsDue(10, 60);
    const second = await db.alertsDue(10, 60);
    expect(first).toHaveLength(1);
    expect(second).toHaveLength(0);
    expect(await db.recordAlert(first[0].requestId, first[0].lease, first[0].kind, first[0].alertKey, true)).toBe(true);
    expect(await db.recordAlert(first[0].requestId, first[0].lease, first[0].kind, first[0].alertKey, true)).toBe(false);
  });

  it("the worker role still cannot read the request table (alert columns included)", async () => {
    await expect(h.asWorker("select alert_key from private.account_deletion_requests limit 1")).rejects.toThrow(/permission denied/);
  });
});

describe("rendering and the M3 invocation boundary", () => {
  it("renders only the permitted fields", () => {
    const m = renderOperatorAlert(
      { requestId: uuid(0x501), kind: "attention", alertKey: "purge_attention:storage_remove", status: "purge_attention", errorClass: "storage_remove", attemptCount: 3, requestedAt: "2026-10-09T10:00:00Z", attentionSince: null, lease: "x" },
      "production",
      Date.parse("2026-10-10T12:00:00Z"),
    );
    const labels = m.text.split("\n").filter((l) => l.includes(": ")).map((l) => l.split(": ")[0]);
    expect(labels).toEqual(["Environment", "Alert", "Deletion request", "Status", "Error class", "Attempts", "Requested at (UTC)", "Age", "Alert time (UTC)"]);
    expect(m.text).toMatch(/Age: 26 h/);
    expect(m.idempotencyKey).toBe(`n10-alert-${uuid(0x501)}-attention-purge_attention:storage_remove`);
  });

  it("wrong invocation token: 401 and no alert is sent; correct token: alerts dispatched, response still exactly {ok:true}", async () => {
    await drain();
    const U = uuid(0x502);
    await addUser(U);
    await runDeleteAccount(makeDeps("permanent"), { userId: U, ...W });
    const SECRET = "inv_" + "Z9y8X7w6V5".repeat(5);
    const env = (k: string) =>
      ({ N10_WORKER_INVOKE_SECRET: SECRET, N10_VERIFIED_TOKEN_WINDOW_SECONDS: "3600", N10_TOKEN_WINDOW_VERIFICATION: "management-api:2026-10-09", N10_OPERATOR_ALERT_EMAIL: "ops-test@example.invalid", N10_OPERATOR_ALERT_FROM: "alerts-test@example.invalid", N10_ENVIRONMENT: "test" })[k];
    const n = fakeNotifier();
    const runtime = () => ({ deps: makeDeps(), close: async () => undefined, notifier: n.notifier });
    const bad = await handleWorkerInvocation({ method: "POST", token: "wrong", bodyText: async () => "" }, env, runtime, log);
    expect(bad.httpStatus).toBe(401);
    expect(n.sent).toHaveLength(0);
    const good = await handleWorkerInvocation({ method: "POST", token: SECRET, bodyText: async () => "{}" }, env, runtime, log);
    expect(good).toEqual({ httpStatus: 200, body: { ok: true } });
    expect(n.sent).toHaveLength(1);
    expect(WORKER_TOKEN_HEADER).toBe("x-n10-worker-token");
  });
});
