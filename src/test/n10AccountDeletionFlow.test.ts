import { beforeAll, describe, expect, it } from "vitest";
import {
  createN10Db,
  PURGE_BATCH_LIMIT,
  runDeleteAccount,
  runWorker,
  type AlertEvent,
  type AuthErrorLike,
  type N10Deps,
} from "../../supabase/functions/_shared/accountDeletion";
import { createN10Harness, uuid, type N10Harness } from "./support/n10Pglite";

// N10.3A orchestration tests: the real shared module drives the real M1 database (local PGlite, as
// the account_deletion_worker role) with fake Auth and Storage adapters that act on the stand-in
// auth.users / storage.objects tables. The fake Storage adapter records an E1 violation whenever it is
// asked to remove anything while the Auth user still exists.

let h: N10Harness;
type AuthMode = "ok" | "fail500" | "timeout_committed" | "permanent" | "not_found";

function makeDeps(opts: { authMode?: AuthMode; partialOnce?: boolean; clock?: () => number } = {}) {
  const calls = { auth: 0, removes: [] as { bucket: string; count: number }[], e1Violations: 0, alerts: [] as AlertEvent[] };
  let partialPending = opts.partialOnce ?? false;
  const deps: N10Deps = {
    db: createN10Db((sql, params) => h.asWorker(sql, params)),
    auth: {
      async deleteUser(userId) {
        calls.auth += 1;
        const mode = opts.authMode ?? "ok";
        const err = (status: number): { error: AuthErrorLike } => ({ error: { status, name: "AuthApiError", message: "x" } });
        if (mode === "fail500") return err(500);
        if (mode === "permanent") return err(400);
        await h.su("delete from auth.users where id = $1", [userId]);
        if (mode === "timeout_committed") return { error: { status: 0, name: "AuthRetryableFetchError", message: "timeout" } };
        if (mode === "not_found") return err(404);
        return { error: null };
      },
    },
    storage: {
      async remove(bucket, names) {
        expect(names.length).toBeLessThanOrEqual(PURGE_BATCH_LIMIT);
        const owner = names[0].split("/")[0];
        const live = await h.su("select count(*)::int as n from auth.users where id = $1", [owner]);
        if (Number(live[0].n) > 0) calls.e1Violations += 1;
        calls.removes.push({ bucket, count: names.length });
        const target = partialPending ? names.slice(0, Math.ceil(names.length / 2)) : names;
        partialPending = false;
        await h.su("delete from storage.objects where bucket_id = $1 and name = any($2::text[])", [bucket, target]);
        return { error: null };
      },
    },
    alert: async (e) => {
      calls.alerts.push(e);
    },
    log: { info: () => undefined, error: () => undefined },
    now: opts.clock ?? (() => Date.now()),
  };
  return { deps, calls };
}

const addUser = (id: string) => h.su("insert into auth.users (id, email) values ($1, $2)", [id, `${id}@example.invalid`]);
const addObjects = (bucket: string, names: string[], ownerId: string | null) =>
  h.su("insert into storage.objects (bucket_id, name, owner_id) select $1, unnest($2::text[]), $3", [bucket, names, ownerId]);
const mediaCount = async (userId: string) =>
  Number((await h.su("select count(*)::int as n from storage.objects where split_part(name, '/', 1) = $1", [userId]))[0].n);
const request = async (userId: string) => (await h.su("select * from private.account_deletion_requests where user_id = $1", [userId]))[0];
const makeDue = (userId: string) =>
  h.su("update private.account_deletion_requests set next_attempt_at = now() - interval '1 second' where user_id = $1", [userId]);
const W = { tokenWindowSeconds: 3600 };
const workerConfig = { tokenWindow: { ok: true as const, seconds: 3600 }, retentionDays: null };

beforeAll(async () => {
  h = await createN10Harness();
  await addUser(uuid(0xc0c0));
  await addObjects("weekly-photos", [`${uuid(0xc0c0)}/control.jpg`], uuid(0xc0c0));
}, 120_000);

const controlIntact = async () => {
  expect(await mediaCount(uuid(0xc0c0))).toBe(1);
  expect((await h.su("select count(*)::int as n from auth.users where id = $1", [uuid(0xc0c0)]))[0].n).toBe(1);
};

describe("delete-account orchestration (E1, E4, E8, E9, H2)", () => {
  it("no media: 200 account_deleted / removed; durable row awaits the final sweep (not completed)", async () => {
    const U = uuid(0x101);
    await addUser(U);
    const { deps, calls } = makeDeps();
    const res = await runDeleteAccount(deps, { userId: U, ...W });
    expect(res).toEqual({ httpStatus: 200, body: { status: "account_deleted", cleanup: "removed" } });
    expect((await request(U)).status).toBe("awaiting_final_sweep");
    expect(calls.removes).toHaveLength(0);
    await controlIntact();
  });

  it("one file: removed only after Auth absence is confirmed", async () => {
    const U = uuid(0x102);
    await addUser(U);
    await addObjects("weekly-photos", [`${U}/20.jpg`], U);
    const { deps, calls } = makeDeps();
    const res = await runDeleteAccount(deps, { userId: U, ...W });
    expect(res.body).toEqual({ status: "account_deleted", cleanup: "removed" });
    expect(await mediaCount(U)).toBe(0);
    expect(calls.e1Violations).toBe(0);
    await controlIntact();
  });

  it("1,001+ files across both buckets and deep paths: batches of at most 1,000, all removed", async () => {
    const U = uuid(0x103);
    await addUser(U);
    const deep = Array.from({ length: 1003 }, (_, i) => `${U}/m${i}/a/b/c/d/e/p${i}.jpg`);
    await addObjects("first-year-memories", deep, U);
    await addObjects("weekly-photos", [`${U}/1.jpg`, `${U}/1/voice_note/x.webm`], null);
    const { deps, calls } = makeDeps();
    const res = await runDeleteAccount(deps, { userId: U, ...W });
    expect(res.body).toEqual({ status: "account_deleted", cleanup: "removed" });
    expect(await mediaCount(U)).toBe(0);
    expect(calls.removes.every((r) => r.count <= 1000)).toBe(true);
    expect(calls.removes.reduce((n, r) => n + r.count, 0)).toBe(1005);
    expect(Number((await request(U)).objects_removed)).toBe(1005);
    expect(calls.e1Violations).toBe(0);
    await controlIntact();
  });

  it("Auth 500: 202, media byte-intact, no Storage call, request retrying", async () => {
    const U = uuid(0x104);
    await addUser(U);
    await addObjects("weekly-photos", [`${U}/1.jpg`, `${U}/2.jpg`], U);
    const { deps, calls } = makeDeps({ authMode: "fail500" });
    const res = await runDeleteAccount(deps, { userId: U, ...W });
    expect(res).toEqual({ httpStatus: 202, body: { status: "deletion_in_progress" } });
    expect(await mediaCount(U)).toBe(2);
    expect(calls.removes).toHaveLength(0);
    const r = await request(U);
    expect(r.status).toBe("requested");
    expect(r.last_error_class).toBe("auth_transient");
  });

  it("permanent pre-Auth failure: 500 deletion_failed, auth_attention, alert, media intact", async () => {
    const U = uuid(0x105);
    await addUser(U);
    await addObjects("first-year-memories", [`${U}/m/p.jpg`], U);
    const { deps, calls } = makeDeps({ authMode: "permanent" });
    const res = await runDeleteAccount(deps, { userId: U, ...W });
    expect(res).toEqual({ httpStatus: 500, body: { status: "deletion_failed", media: "untouched" } });
    expect((await request(U)).status).toBe("auth_attention");
    expect(calls.alerts.map((a) => a.kind)).toEqual(["auth_attention"]);
    expect(await mediaCount(U)).toBe(1);
    expect(calls.removes).toHaveLength(0);
  });

  it("timeout with the delete actually committed: resolved by the database check, then 200", async () => {
    const U = uuid(0x106);
    await addUser(U);
    await addObjects("weekly-photos", [`${U}/1.jpg`], U);
    const { deps, calls } = makeDeps({ authMode: "timeout_committed" });
    const res = await runDeleteAccount(deps, { userId: U, ...W });
    expect(res.body).toEqual({ status: "account_deleted", cleanup: "removed" });
    expect(calls.e1Violations).toBe(0);
  });

  it("duplicate request while another holder has the lease: 202 and no second Auth call", async () => {
    const U = uuid(0x107);
    await addUser(U);
    await h.asWorker("select * from private.n10_open_request($1::uuid, 120)", [U]);
    const { deps, calls } = makeDeps();
    const res = await runDeleteAccount(deps, { userId: U, ...W });
    expect(res.httpStatus).toBe(202);
    expect(calls.auth).toBe(0);
  });

  it("partial Storage removal: 200 continuing, retry recorded; the worker finishes idempotently", async () => {
    const U = uuid(0x108);
    await addUser(U);
    await addObjects("weekly-photos", Array.from({ length: 6 }, (_, i) => `${U}/${i}.jpg`), U);
    const first = makeDeps({ partialOnce: true });
    const res = await runDeleteAccount(first.deps, { userId: U, ...W });
    expect(res.body).toEqual({ status: "account_deleted", cleanup: "continuing" });
    const r = await request(U);
    expect(r.status).toBe("auth_deleted");
    expect(r.last_error_class).toBe("storage_partial");
    expect(await mediaCount(U)).toBe(3);
    await makeDue(U);
    const second = makeDeps();
    await runWorker(second.deps, workerConfig);
    expect(await mediaCount(U)).toBe(0);
    expect((await request(U)).status).toBe("awaiting_final_sweep");
    expect(first.calls.e1Violations + second.calls.e1Violations).toBe(0);
  });

  it("owner_id path anomaly: 200 continuing, purge_attention, alert, anomaly never auto-deleted", async () => {
    const U = uuid(0x109);
    await addUser(U);
    await addObjects("weekly-photos", [`${U}/1.jpg`], U);
    await addObjects("first-year-memories", [`misfiled/${U}.jpg`], U);
    const { deps, calls } = makeDeps();
    const res = await runDeleteAccount(deps, { userId: U, ...W });
    expect(res.body).toEqual({ status: "account_deleted", cleanup: "continuing" });
    expect((await request(U)).status).toBe("purge_attention");
    expect(calls.alerts.map((a) => a.kind)).toEqual(["purge_attention"]);
    expect((await h.su("select count(*)::int as n from storage.objects where name = $1", [`misfiled/${U}.jpg`]))[0].n).toBe(1);
  });

  it("immediate-purge budget exhausted: 200 continuing; the worker completes the purge", async () => {
    const U = uuid(0x10a);
    await addUser(U);
    await addObjects("weekly-photos", [`${U}/1.jpg`], U);
    let t = 0;
    const { deps } = makeDeps({ clock: () => (t += 30_000) });
    const res = await runDeleteAccount(deps, { userId: U, ...W });
    expect(res.body).toEqual({ status: "account_deleted", cleanup: "continuing" });
    expect(await mediaCount(U)).toBe(1);
    await runWorker(makeDeps().deps, workerConfig);
    expect(await mediaCount(U)).toBe(0);
  });
});

describe("account-deletion worker (E4, E9, E10, E14)", () => {
  it("retries a requested row after a transient failure and completes Auth + purge", async () => {
    const U = uuid(0x201);
    await addUser(U);
    await addObjects("weekly-photos", [`${U}/1.jpg`], U);
    await runDeleteAccount(makeDeps({ authMode: "fail500" }).deps, { userId: U, ...W });
    await makeDue(U);
    const { deps, calls } = makeDeps();
    await runWorker(deps, workerConfig);
    expect((await request(U)).status).toBe("awaiting_final_sweep");
    expect(await mediaCount(U)).toBe(0);
    expect(calls.e1Violations).toBe(0);
  });

  it("fails closed without a verified token window: the requested row is not processed", async () => {
    const U = uuid(0x202);
    await addUser(U);
    await runDeleteAccount(makeDeps({ authMode: "fail500" }).deps, { userId: U, ...W });
    await makeDue(U);
    const { deps, calls } = makeDeps();
    await runWorker(deps, { tokenWindow: { ok: false, reason: "token_window_not_verified" }, retentionDays: null });
    expect(calls.auth).toBe(0);
    const r = await request(U);
    expect(r.status).toBe("requested");
    expect(r.last_error_class).toBe("config");
    expect((await h.su("select (next_attempt_at > now()) as later from private.account_deletion_requests where user_id = $1", [U]))[0].later).toBe(true);
    expect((await h.su("select count(*)::int as n from auth.users where id = $1", [U]))[0].n).toBe(1);
  });

  it("final sweep only after the window; a late object is removed, alerted, then COMPLETED and anonymised", async () => {
    const U = uuid(0x203);
    await addUser(U);
    await runDeleteAccount(makeDeps().deps, { userId: U, ...W });
    const id = String((await request(U)).id);
    await runWorker(makeDeps().deps, workerConfig);
    expect((await h.su("select status from private.account_deletion_requests where id = $1", [id]))[0].status).toBe("awaiting_final_sweep");
    await h.timeTravel(id, "auth_deleted_at = auth_deleted_at - interval '3 hours', final_sweep_after = final_sweep_after - interval '3 hours', next_attempt_at = now() - interval '1 second'");
    await addObjects("weekly-photos", [`${U}/stale-upload.jpg`], U);
    const { deps, calls } = makeDeps();
    await runWorker(deps, workerConfig);
    const done = (await h.su("select * from private.account_deletion_requests where id = $1", [id]))[0];
    expect(done.status).toBe("completed");
    expect(done.user_id).toBeNull();
    expect(done.sweep_objects_removed).toBe(1);
    expect(calls.alerts.map((a) => a.kind)).toContain("final_sweep_regression");
    expect(await mediaCount(U)).toBe(0);
    await controlIntact();
  });
});
