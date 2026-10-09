// N10 Candidate E: account-first deletion with durable media purge.
// Frozen contract: docs/strategy/n10-candidate-e-account-first-deletion-architecture.md (N10.2 + N10.2A).
//
// Pure orchestration with injected adapters (database, Auth admin, Storage admin, alert hook, clock),
// so the Edge Functions stay thin and the logic is testable without remote services. The database
// (private.* functions) is authoritative for state transitions; this module never decides a
// transition on its own, it only calls the function surface and reacts to the state it returns.
//
// Absolute invariant (N10-E1): no Storage removal before private.auth_user_exists(user) is false.

export const N10_STATES = [
  "requested",
  "auth_deleted",
  "awaiting_final_sweep",
  "completed",
  "auth_attention",
  "purge_attention",
  "cancelled",
] as const;
export type N10State = (typeof N10_STATES)[number];

export const N10_ERROR_CLASSES = [
  "auth_transient",
  "auth_permanent",
  "auth_unknown_outcome",
  "storage_list",
  "storage_remove",
  "storage_partial",
  "owner_id_path_anomaly",
  "db",
  "timeout",
  "config",
] as const;
export type N10ErrorClass = (typeof N10_ERROR_CLASSES)[number];

export const MEDIA_BUCKETS = ["weekly-photos", "first-year-memories"] as const;
export const PURGE_BATCH_LIMIT = 1000;
export const IMMEDIATE_PURGE_BUDGET_MS = 20_000;
export const WORKER_BUDGET_MS = 50_000;
export const REQUEST_LEASE_SECONDS = 120;
export const WORKER_LEASE_SECONDS = 300;
export const WORKER_CLAIM_LIMIT = 5;
/** Documentation mirror of private.n10_retry_delay (the database is authoritative). */
export const RETRY_SCHEDULE_MINUTES = [1, 2, 5, 15, 30] as const;
export const RETRY_CAP_MINUTES = 60;
export const TOKEN_WINDOW_FLOOR_SECONDS = 3600;
export const TOKEN_WINDOW_MAX_SECONDS = 604_800;
export const SWEEP_MARGIN_SECONDS = 900;
export const DEDICATED_DB_ROLE = "account_deletion_worker";

// ---------------------------------------------------------------------------
// Configuration (fail closed)
// ---------------------------------------------------------------------------
export type EnvReader = (name: string) => string | undefined;

export type TokenWindow = { ok: true; seconds: number } | { ok: false; reason: string };
export const tokenWindowFailure = (w: TokenWindow): string | null => (w.ok ? null : (w as { reason: string }).reason);

/**
 * D13 / H1: the verified access-token window. Both values are deployment configuration:
 *   N10_VERIFIED_TOKEN_WINDOW_SECONDS  >= the project's verified Auth access-token lifetime
 *   N10_TOKEN_WINDOW_VERIFICATION      provenance of that verification, "<source>:<YYYY-MM-DD>"
 * Missing, malformed, out-of-range or unverified values fail closed.
 */
export function readVerifiedTokenWindow(env: EnvReader): TokenWindow {
  const raw = env("N10_VERIFIED_TOKEN_WINDOW_SECONDS");
  const provenance = env("N10_TOKEN_WINDOW_VERIFICATION");
  if (!raw || !/^\d{1,7}$/.test(raw.trim())) return { ok: false, reason: "token_window_missing_or_malformed" };
  const seconds = Number(raw.trim());
  if (seconds < TOKEN_WINDOW_FLOOR_SECONDS) return { ok: false, reason: "token_window_below_floor" };
  if (seconds > TOKEN_WINDOW_MAX_SECONDS) return { ok: false, reason: "token_window_above_maximum" };
  if (!provenance || !/^(dashboard|management-api|cli):\d{4}-\d{2}-\d{2}$/.test(provenance.trim())) {
    return { ok: false, reason: "token_window_not_verified" };
  }
  return { ok: true, seconds };
}

/** Mirror of the database formula (H1): auth_deleted_at + max(W, 3600 s) + 15 minutes. */
export function finalSweepAfterMs(authDeletedAtMs: number, windowSeconds: number): number {
  return authDeletedAtMs + (Math.max(windowSeconds, TOKEN_WINDOW_FLOOR_SECONDS) + SWEEP_MARGIN_SECONDS) * 1000;
}

/** D9 / N10-E13: the runtime connection must use the dedicated role, never postgres. */
export function isDedicatedRoleUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "postgres:" && parsed.protocol !== "postgresql:") return false;
    const user = decodeURIComponent(parsed.username);
    return user === DEDICATED_DB_ROLE || /^account_deletion_worker\.[a-z0-9]{20}$/.test(user);
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Worker invocation (N10.3A security patch, M3). Hosted pg_net grants its request queue to PUBLIC,
// so anything placed in a pg_net request is readable by every database login role. The scheduler
// therefore carries ONLY an invocation-only secret: it lets a caller start the normal durable-job loop
// and nothing else. It never selects a target, never reaches Auth/Storage/data, and no privileged
// Supabase or database credential ever travels through pg_net.
// ---------------------------------------------------------------------------
export const WORKER_TOKEN_HEADER = "x-n10-worker-token";
/** >= 32 random bytes encoded base64url (43 chars) or hex (64 chars); anything weaker fails closed. */
const INVOKE_SECRET_RE = /^[A-Za-z0-9_-]{43,512}$/;
const MAX_WORKER_BODY_BYTES = 1024;

/** The configured invocation-only secret, or null (fail closed) when missing or too weak. */
export function readInvokeSecret(env: EnvReader): string | null {
  const raw = env("N10_WORKER_INVOKE_SECRET");
  return raw && INVOKE_SECRET_RE.test(raw) ? raw : null;
}

/** Timing-resistant comparison: no early exit; runtime depends only on the longer input's length. */
export function constantTimeEqual(a: string, b: string): boolean {
  const x = new TextEncoder().encode(a);
  const y = new TextEncoder().encode(b);
  let diff = x.length ^ y.length;
  const n = Math.max(x.length, y.length);
  for (let i = 0; i < n; i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

/** The worker accepts no caller input: an empty body or exactly `{}`. Any key (user_id, request_id, ...) is rejected. */
export function isEmptyWorkerBody(bodyText: string): boolean {
  const trimmed = bodyText.trim();
  if (trimmed === "") return true;
  if (trimmed.length > MAX_WORKER_BODY_BYTES) return false;
  try {
    const parsed: unknown = JSON.parse(trimmed);
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) && Object.keys(parsed).length === 0;
  } catch {
    return false;
  }
}

export type WorkerHttpResult = { httpStatus: 200 | 400 | 401 | 405 | 500 | 503; body: Record<string, unknown> };

export const WORKER_RESPONSES = {
  ok: { httpStatus: 200, body: { ok: true } },
  badRequest: { httpStatus: 400, body: { error: "Bad request" } },
  unauthorized: { httpStatus: 401, body: { error: "Unauthorized" } },
  methodNotAllowed: { httpStatus: 405, body: { error: "Method not allowed" } },
  failed: { httpStatus: 500, body: { error: "Worker run failed" } },
  misconfigured: { httpStatus: 503, body: { error: "Server configuration error" } },
} as const satisfies Record<string, WorkerHttpResult>;

export type WorkerInvocation = { method: string; token: string | null; bodyText: () => Promise<string> };
export type WorkerRuntime = { deps: N10Deps; close: () => Promise<void>; notifier?: OperatorNotifier };

/**
 * account-deletion-worker request handling (verify_jwt = false; this is the only authentication).
 * Order matters: method, then the invocation secret, then the (empty) body, and only then is the
 * dedicated database connection or any privileged client opened. Responses never carry user ids,
 * request ids, states, paths or error details.
 */
export async function handleWorkerInvocation(
  inv: WorkerInvocation,
  env: EnvReader,
  openRuntime: () => WorkerRuntime | null,
  log: N10Logger,
): Promise<WorkerHttpResult> {
  if (inv.method !== "POST") return WORKER_RESPONSES.methodNotAllowed;
  const secret = readInvokeSecret(env);
  if (secret === null) {
    log.error("n10_config_invalid", { reason: "invoke_secret_unavailable" });
    return WORKER_RESPONSES.misconfigured;
  }
  const token = inv.token ?? "";
  // Compare even when the header is absent so both paths take the same route through the code.
  const match = constantTimeEqual(token, secret);
  if (!inv.token || !match) return WORKER_RESPONSES.unauthorized;
  let bodyText: string;
  try {
    bodyText = await inv.bodyText();
  } catch {
    return WORKER_RESPONSES.badRequest;
  }
  if (!isEmptyWorkerBody(bodyText)) return WORKER_RESPONSES.badRequest;

  const runtime = openRuntime();
  if (!runtime) {
    log.error("n10_config_invalid", { reason: "runtime_unavailable" });
    return WORKER_RESPONSES.misconfigured;
  }
  try {
    const tokenWindow = readVerifiedTokenWindow(env);
    const retentionDays = readRetentionDays(env);
    const { processed } = await runWorker(runtime.deps, { tokenWindow, retentionDays });
    // Operator alerts run after, and independently of, the durable-job loop (N10.4 / M4).
    const alerts = await dispatchOperatorAlerts(runtime.deps, readOperatorAlertConfig(env, Boolean(runtime.notifier)), runtime.notifier);
    log.info("n10_worker_run", {
      processed,
      token_window_ok: tokenWindow.ok,
      retention_configured: retentionDays !== null,
      alerts_sent: alerts.sent,
      alerts_failed: alerts.failed,
    });
    return WORKER_RESPONSES.ok;
  } catch {
    log.error("n10_worker_run_failed", { phase: "run" });
    return WORKER_RESPONSES.failed;
  } finally {
    await runtime.close();
  }
}

/** Caller lookup failure meaning "this account no longer exists" (410), as observed in N10.1 R4. */
export function isDeletedUserError(error: { status?: number; code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return error.code === "user_not_found" || error.status === 404 || /sub claim in JWT does not exist/i.test(error.message ?? "");
}

/** D2/D3: retention of anonymised completed rows (proposed 30 days, D14-gated). Missing means skip cleanup. */
export function readRetentionDays(env: EnvReader): number | null {
  const raw = env("N10_COMPLETED_ROW_RETENTION_DAYS");
  if (!raw || !/^\d{1,4}$/.test(raw.trim())) return null;
  const days = Number(raw.trim());
  return days >= 1 && days <= 3650 ? days : null;
}

// ---------------------------------------------------------------------------
// Ownership (D12)
// ---------------------------------------------------------------------------
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** Rule A: first path segment exactly equals the user's UUID. No substring or prefix-only matching. */
export function isCanonicalMediaPath(name: string, userId: string): boolean {
  if (!UUID_RE.test(userId)) return false;
  const slash = name.indexOf("/");
  return slash > 0 && name.slice(0, slash) === userId;
}

export function isMediaBucket(bucket: string): bucket is (typeof MEDIA_BUCKETS)[number] {
  return (MEDIA_BUCKETS as readonly string[]).includes(bucket);
}

// ---------------------------------------------------------------------------
// Auth delete classification (unknown outcomes are resolved by the database check, not the status)
// ---------------------------------------------------------------------------
export type AuthErrorLike = { status?: number; name?: string; message?: string } | null;
export type AuthDeleteClass = "ok" | "not_found" | "transient" | "permanent";

export function classifyAuthDelete(error: AuthErrorLike): AuthDeleteClass {
  if (!error) return "ok";
  const status = typeof error.status === "number" ? error.status : 0;
  if (status === 404) return "not_found";
  if (status === 0 || status === 408 || status === 429 || status >= 500) return "transient";
  if (/retryable|fetch|network|timeout/i.test(error.name ?? "")) return "transient";
  return "permanent";
}

// ---------------------------------------------------------------------------
// Adapters
// ---------------------------------------------------------------------------
export type SqlExecutor = (sql: string, params: unknown[]) => Promise<Record<string, unknown>[]>;

export interface OpenedRequest {
  requestId: string;
  status: N10State;
  lease: string | null;
  leaseAcquired: boolean;
}
export interface ClaimedRequest {
  requestId: string;
  userId: string;
  status: N10State;
  lease: string;
  attemptCount: number;
}
export interface MediaObject {
  bucket: string;
  name: string;
}

export interface N10Db {
  openRequest(userId: string, leaseSeconds: number): Promise<OpenedRequest>;
  claimDue(limit: number, leaseSeconds: number): Promise<ClaimedRequest[]>;
  releaseLease(requestId: string, lease: string): Promise<boolean>;
  recordFailure(requestId: string, lease: string, expected: N10State, errorClass: N10ErrorClass, permanent: boolean): Promise<N10State>;
  confirmAuthDeleted(requestId: string, lease: string, windowSeconds: number): Promise<N10State>;
  recordPurge(requestId: string, lease: string, expected: N10State, removed: number): Promise<N10State>;
  authUserExists(userId: string): Promise<boolean>;
  canonicalMedia(userId: string, limit: number): Promise<MediaObject[]>;
  cleanupCompleted(retentionDays: number): Promise<number>;
  /** M4 operator-alert ledger (out-of-band from every deletion transition). */
  alertsDue(limit: number, leaseSeconds: number): Promise<DueOperatorAlert[]>;
  recordAlert(requestId: string, lease: string, kind: OperatorAlertKind, alertKey: string, delivered: boolean): Promise<boolean>;
  alertsPendingCount(): Promise<number>;
}

export type OperatorAlertKind = "attention" | "escalation";
export interface DueOperatorAlert {
  requestId: string;
  kind: OperatorAlertKind;
  alertKey: string;
  status: N10State;
  errorClass: string | null;
  attemptCount: number;
  requestedAt: string;
  attentionSince: string | null;
  lease: string;
}

const asState = (value: unknown): N10State => {
  if (typeof value === "string" && (N10_STATES as readonly string[]).includes(value)) return value as N10State;
  throw new Error("n10: unexpected state from database");
};

/** The only SQL the runtime issues: calls to the private function surface, all parameterised. */
export function createN10Db(exec: SqlExecutor): N10Db {
  const one = async (sql: string, params: unknown[]) => {
    const rows = await exec(sql, params);
    if (rows.length !== 1) throw new Error("n10: expected one row");
    return rows[0];
  };
  return {
    async openRequest(userId, leaseSeconds) {
      const r = await one(
        "select o_request_id, o_status, o_lease, o_lease_acquired from private.n10_open_request($1::uuid, $2::int)",
        [userId, leaseSeconds],
      );
      return {
        requestId: String(r.o_request_id),
        status: asState(r.o_status),
        lease: r.o_lease == null ? null : String(r.o_lease),
        leaseAcquired: r.o_lease_acquired === true,
      };
    },
    async claimDue(limit, leaseSeconds) {
      const rows = await exec(
        "select o_request_id, o_user_id, o_status, o_lease, o_attempt_count from private.n10_claim_due($1::int, $2::int)",
        [limit, leaseSeconds],
      );
      return rows.map((r) => ({
        requestId: String(r.o_request_id),
        userId: String(r.o_user_id),
        status: asState(r.o_status),
        lease: String(r.o_lease),
        attemptCount: Number(r.o_attempt_count),
      }));
    },
    async releaseLease(requestId, lease) {
      const r = await one("select private.n10_release_lease($1::uuid, $2::text) as ok", [requestId, lease]);
      return r.ok === true;
    },
    async recordFailure(requestId, lease, expected, errorClass, permanent) {
      const r = await one(
        "select private.n10_record_failure($1::uuid, $2::text, $3::text, $4::text, $5::boolean) as s",
        [requestId, lease, expected, errorClass, permanent],
      );
      return asState(r.s);
    },
    async confirmAuthDeleted(requestId, lease, windowSeconds) {
      const r = await one("select private.n10_confirm_auth_deleted($1::uuid, $2::text, $3::int) as s", [
        requestId,
        lease,
        windowSeconds,
      ]);
      return asState(r.s);
    },
    async recordPurge(requestId, lease, expected, removed) {
      const r = await one("select private.n10_record_purge($1::uuid, $2::text, $3::text, $4::int) as s", [
        requestId,
        lease,
        expected,
        removed,
      ]);
      return asState(r.s);
    },
    async authUserExists(userId) {
      const r = await one("select private.auth_user_exists($1::uuid) as e", [userId]);
      return r.e === true;
    },
    async canonicalMedia(userId, limit) {
      const rows = await exec("select bucket_id, name from private.account_media_canonical($1::uuid, $2::int)", [
        userId,
        limit,
      ]);
      return rows.map((r) => ({ bucket: String(r.bucket_id), name: String(r.name) }));
    },
    async cleanupCompleted(retentionDays) {
      const r = await one("select private.n10_cleanup_completed($1::int) as n", [retentionDays]);
      return Number(r.n);
    },
    async alertsDue(limit, leaseSeconds) {
      const rows = await exec(
        "select o_request_id, o_kind, o_alert_key, o_status, o_error_class, o_attempt_count, o_requested_at::text as o_requested_at, o_attention_since::text as o_attention_since, o_lease from private.n10_alerts_due($1::int, $2::int)",
        [limit, leaseSeconds],
      );
      return rows.map((r) => ({
        requestId: String(r.o_request_id),
        kind: r.o_kind === "escalation" ? "escalation" : "attention",
        alertKey: String(r.o_alert_key),
        status: asState(r.o_status),
        errorClass: r.o_error_class === null || r.o_error_class === undefined ? null : String(r.o_error_class),
        attemptCount: Number(r.o_attempt_count),
        requestedAt: String(r.o_requested_at),
        attentionSince: r.o_attention_since === null || r.o_attention_since === undefined ? null : String(r.o_attention_since),
        lease: String(r.o_lease),
      }));
    },
    async recordAlert(requestId, lease, kind, alertKey, delivered) {
      const r = await one("select private.n10_record_alert($1::uuid, $2::text, $3::text, $4::text, $5::boolean) as ok", [
        requestId,
        lease,
        kind,
        alertKey,
        delivered,
      ]);
      return r.ok === true;
    },
    async alertsPendingCount() {
      const r = await one("select private.n10_alerts_pending_count() as n", []);
      return Number(r.n);
    },
  };
}

export interface AuthAdmin {
  /** Hard delete (auth.admin.deleteUser with shouldSoftDelete = false). Never carries a user session. */
  deleteUser(userId: string): Promise<{ error: AuthErrorLike }>;
}
export interface StorageAdmin {
  /** Storage API remove (service role, no user session). At most 1,000 names per call. */
  remove(bucket: string, names: string[]): Promise<{ error: { message?: string } | null }>;
}
export type AlertKind = "auth_attention" | "purge_attention" | "owner_id_path_anomaly" | "final_sweep_regression";
export type AlertEvent = { kind: AlertKind; requestId: string; errorClass?: N10ErrorClass };
export type AlertHook = (event: AlertEvent) => Promise<void>;
export type LogFields = Record<string, string | number | boolean | null>;
export interface N10Logger {
  info(event: string, fields: LogFields): void;
  error(event: string, fields: LogFields): void;
}
export interface N10Deps {
  db: N10Db;
  auth: AuthAdmin;
  storage: StorageAdmin;
  alert: AlertHook;
  log: N10Logger;
  now(): number;
}

/**
 * Provider-neutral alert hook (D5). Production activation is blocked until a real destination is
 * configured; until then the event is logged as "operator notification required".
 */
export function createLoggingAlertHook(log: N10Logger): AlertHook {
  return async (event) => {
    log.error("n10_operator_notification_required", {
      kind: event.kind,
      request_id: event.requestId,
      error_class: event.errorClass ?? null,
    });
  };
}

// ---------------------------------------------------------------------------
// Operator alerts (N10.4, M4). Delivered out-of-band after the worker's durable-job loop: the
// database decides which attention rows need an alert (dedup + 24 h escalation), the notifier sends a
// minimal message, and the outcome is recorded. Deletion state never depends on delivery.
// ---------------------------------------------------------------------------
export const ALERT_CLAIM_LIMIT = 10;
export const ALERT_LEASE_SECONDS = 120;
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const ENVIRONMENT_RE = /^[a-z0-9-]{1,32}$/;

export type OperatorAlertConfig =
  | { ok: true; to: string; from: string; environment: string }
  | { ok: false; reason: "destination_unconfigured" | "sender_unconfigured" | "provider_unconfigured" };

/**
 * N10_OPERATOR_ALERT_EMAIL (destination) and N10_OPERATOR_ALERT_FROM (verified sender) are deployment
 * configuration; no address is ever hardcoded. Missing or malformed values fail closed (nothing is sent,
 * the pending count is logged, and the ledger keeps every alert pending).
 */
export function readOperatorAlertConfig(env: EnvReader, providerAvailable: boolean): OperatorAlertConfig {
  const to = env("N10_OPERATOR_ALERT_EMAIL")?.trim();
  const from = env("N10_OPERATOR_ALERT_FROM")?.trim();
  if (!to || !EMAIL_RE.test(to)) return { ok: false, reason: "destination_unconfigured" };
  if (!from || !EMAIL_RE.test(from)) return { ok: false, reason: "sender_unconfigured" };
  if (!providerAvailable) return { ok: false, reason: "provider_unconfigured" };
  const rawEnv = env("N10_ENVIRONMENT")?.trim();
  return { ok: true, to, from, environment: rawEnv && ENVIRONMENT_RE.test(rawEnv) ? rawEnv : "unspecified" };
}

export type OperatorAlertMessage = { to: string; from: string; subject: string; text: string; html: string; idempotencyKey: string };
export type OperatorNotifier = (message: OperatorAlertMessage) => Promise<{ ok: true } | { ok: false; reason: string }>;

const ALERT_CLASS: Record<string, string> = {
  auth_attention: "Auth deletion needs operator attention",
  purge_attention: "Media purge needs operator attention",
};

const escapeHtml = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * The only fields an alert may carry: environment, alert class, opaque request id, status, attempt
 * count, first-requested time, age / escalation duration, high-level error class, alert time. Never a
 * user id, e-mail, name, path, journey or health data, token or secret.
 */
export function renderOperatorAlert(alert: DueOperatorAlert, environment: string, nowMs: number): Omit<OperatorAlertMessage, "to" | "from"> {
  const ageHours = Math.max(0, Math.floor((nowMs - Date.parse(alert.requestedAt)) / 3_600_000));
  const cls = ALERT_CLASS[alert.status] ?? "Account deletion needs operator attention";
  const escalation = alert.kind === "escalation";
  const fields: [string, string][] = [
    ["Environment", environment],
    ["Alert", escalation ? `${cls} (unresolved after 24 hours)` : cls],
    ["Deletion request", alert.requestId],
    ["Status", alert.status],
    ["Error class", alert.errorClass ?? "none"],
    ["Attempts", String(alert.attemptCount)],
    ["Requested at (UTC)", new Date(Date.parse(alert.requestedAt)).toISOString()],
    ["Age", `${ageHours} h`],
    ...(escalation && alert.attentionSince ? ([["First alerted at (UTC)", new Date(Date.parse(alert.attentionSince)).toISOString()]] as [string, string][]) : []),
    ["Alert time (UTC)", new Date(nowMs).toISOString()],
  ];
  const subject = `[TSOY ${environment}] ${escalation ? "ESCALATION: " : ""}${cls} — request ${alert.requestId.slice(0, 8)}`;
  const footer = "Look up the request by its id in private.account_deletion_requests. This message intentionally contains no personal data.";
  const text = [...fields.map(([k, v]) => `${k}: ${v}`), "", footer].join("\n");
  const html = `<table>${fields.map(([k, v]) => `<tr><th align="left">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}</table><p>${escapeHtml(footer)}</p>`;
  const idempotencyKey = `n10-alert-${alert.requestId}-${alert.kind}-${alert.alertKey}`.replace(/[^A-Za-z0-9:_-]/g, "-").slice(0, 200);
  return { subject, text, html, idempotencyKey };
}

export type AlertDispatchResult = { sent: number; failed: number; pending: number | null; configured: boolean };

/** Drains due alerts. Never throws into the caller; never touches deletion state. */
export async function dispatchOperatorAlerts(
  deps: N10Deps,
  config: OperatorAlertConfig,
  notifier: OperatorNotifier | undefined,
): Promise<AlertDispatchResult> {
  if (!config.ok || !notifier) {
    let pending: number | null = null;
    try {
      pending = await deps.db.alertsPendingCount();
    } catch {
      pending = null;
    }
    if (pending !== 0) {
      deps.log.error("n10_operator_alert_unconfigured", { reason: config.ok ? "provider_unconfigured" : (config as { reason: string }).reason, pending });
    }
    return { sent: 0, failed: 0, pending, configured: false };
  }
  let sent = 0;
  let failed = 0;
  let due: DueOperatorAlert[];
  try {
    due = await deps.db.alertsDue(ALERT_CLAIM_LIMIT, ALERT_LEASE_SECONDS);
  } catch {
    deps.log.error("n10_operator_alert_claim_failed", { phase: "alerts" });
    return { sent, failed, pending: null, configured: true };
  }
  for (const alert of due) {
    let delivered = false;
    try {
      const rendered = renderOperatorAlert(alert, config.environment, deps.now());
      const result = await notifier({ to: config.to, from: config.from, ...rendered });
      delivered = result.ok;
      if (!result.ok) deps.log.error("n10_operator_alert_delivery_failed", { request_id: alert.requestId, kind: alert.kind, reason: "provider_rejected" });
    } catch {
      deps.log.error("n10_operator_alert_delivery_failed", { request_id: alert.requestId, kind: alert.kind, reason: "provider_error" });
    }
    try {
      await deps.db.recordAlert(alert.requestId, alert.lease, alert.kind, alert.alertKey, delivered);
    } catch {
      deps.log.error("n10_operator_alert_record_failed", { request_id: alert.requestId, kind: alert.kind });
    }
    if (delivered) {
      sent += 1;
      deps.log.info("n10_operator_alert_sent", { request_id: alert.requestId, kind: alert.kind, status: alert.status });
    } else {
      failed += 1;
    }
  }
  return { sent, failed, pending: null, configured: true };
}

// ---------------------------------------------------------------------------
// Auth step
// ---------------------------------------------------------------------------
export type AuthStepResult = "absent" | "present_transient" | "present_permanent";

/** Hard Auth delete, then confirm through the database. HTTP status alone never decides. */
export async function deleteAuthAndConfirm(deps: N10Deps, userId: string): Promise<{ result: AuthStepResult; cls: AuthDeleteClass }> {
  let cls: AuthDeleteClass;
  try {
    const { error } = await deps.auth.deleteUser(userId);
    cls = classifyAuthDelete(error);
  } catch {
    cls = "transient";
  }
  const exists = await deps.db.authUserExists(userId);
  if (!exists) return { result: "absent", cls };
  return { result: cls === "permanent" ? "present_permanent" : "present_transient", cls };
}

// ---------------------------------------------------------------------------
// Purge (only after confirmed Auth absence; re-checked before every pass)
// ---------------------------------------------------------------------------
export type PurgeOutcome = "empty" | "budget" | "partial" | "remove_error" | "list_error" | "auth_present" | "non_canonical";

export async function purgePass(
  deps: N10Deps,
  userId: string,
  deadlineMs: number,
): Promise<{ outcome: PurgeOutcome; removed: number }> {
  let removed = 0;
  for (;;) {
    if (deps.now() >= deadlineMs) return { outcome: "budget", removed };
    // N10-E1: re-confirm before every pass.
    if (await deps.db.authUserExists(userId)) return { outcome: "auth_present", removed };
    let page: MediaObject[];
    try {
      page = await deps.db.canonicalMedia(userId, PURGE_BATCH_LIMIT);
    } catch {
      return { outcome: "list_error", removed };
    }
    if (page.length === 0) return { outcome: "empty", removed };
    // Defence in depth: never remove anything outside rule A, even if the database returned it.
    if (page.some((o) => !isMediaBucket(o.bucket) || !isCanonicalMediaPath(o.name, userId))) {
      return { outcome: "non_canonical", removed };
    }
    const byBucket = new Map<string, string[]>();
    for (const o of page) byBucket.set(o.bucket, [...(byBucket.get(o.bucket) ?? []), o.name]);
    for (const [bucket, names] of byBucket) {
      for (let i = 0; i < names.length; i += PURGE_BATCH_LIMIT) {
        const batch = names.slice(i, i + PURGE_BATCH_LIMIT);
        let error: { message?: string } | null;
        try {
          ({ error } = await deps.storage.remove(bucket, batch));
        } catch {
          error = { message: "remove threw" };
        }
        if (error) return { outcome: "remove_error", removed };
      }
    }
    // Re-check: no removed name may still be present (no OFFSET; the next page starts from the top).
    let after: MediaObject[];
    try {
      after = await deps.db.canonicalMedia(userId, PURGE_BATCH_LIMIT);
    } catch {
      return { outcome: "list_error", removed };
    }
    const removedKeys = new Set(page.map((o) => `${o.bucket}/${o.name}`));
    const still = after.filter((o) => removedKeys.has(`${o.bucket}/${o.name}`)).length;
    removed += page.length - still;
    if (still > 0) return { outcome: "partial", removed };
  }
}

const OUTCOME_ERROR: Record<Exclude<PurgeOutcome, "empty" | "budget">, N10ErrorClass> = {
  partial: "storage_partial",
  remove_error: "storage_remove",
  list_error: "storage_list",
  auth_present: "db",
  non_canonical: "db",
};

/** Purge then record the result; the database applies the frozen transitions. Returns the new state. */
export async function purgeAndRecord(
  deps: N10Deps,
  req: { requestId: string; userId: string; lease: string; status: N10State },
  deadlineMs: number,
): Promise<N10State> {
  const pass = await purgePass(deps, req.userId, deadlineMs);
  let state: N10State;
  if (pass.outcome === "empty" || pass.outcome === "budget") {
    state = await deps.db.recordPurge(req.requestId, req.lease, req.status, pass.removed);
    if (state === req.status && pass.outcome === "budget") {
      await deps.db.releaseLease(req.requestId, req.lease);
    }
  } else {
    if (pass.removed > 0) {
      // Keep the evidence counters accurate before recording the failure.
      state = await deps.db.recordPurge(req.requestId, req.lease, req.status, pass.removed);
      if (state !== req.status) return state;
    }
    state = await deps.db.recordFailure(req.requestId, req.lease, req.status, OUTCOME_ERROR[pass.outcome], false);
    deps.log.error("n10_purge_pass_failed", { request_id: req.requestId, outcome: pass.outcome });
  }
  if (state === "purge_attention") {
    await deps.alert({ kind: "purge_attention", requestId: req.requestId });
  }
  if (req.status === "awaiting_final_sweep" && pass.removed > 0) {
    // A non-empty final sweep signals a policy regression or a late upload (N10.2A §16).
    await deps.alert({ kind: "final_sweep_regression", requestId: req.requestId });
  }
  return state;
}

// ---------------------------------------------------------------------------
// H2 response contract (delete-account)
// ---------------------------------------------------------------------------
export type DeleteAccountBody =
  | { status: "account_deleted"; cleanup: "removed" | "continuing" }
  | { status: "deletion_in_progress" }
  | { status: "already_deleted" }
  | { status: "deletion_failed"; media: "untouched" }
  | { status: "unavailable" };

export type DeleteAccountResponse = { httpStatus: 200 | 202 | 410 | 500 | 503; body: DeleteAccountBody };

export const RESPONSES = {
  /** 200: Auth/account deletion confirmed committed during this request. Never means workflow COMPLETED. */
  deleted: (cleanup: "removed" | "continuing"): DeleteAccountResponse => ({
    httpStatus: 200,
    body: { status: "account_deleted", cleanup },
  }),
  /** 202: durably accepted; Auth deletion not yet confirmed; media frozen and untouched. */
  accepted: (): DeleteAccountResponse => ({ httpStatus: 202, body: { status: "deletion_in_progress" } }),
  /** 410: already deleted. */
  gone: (): DeleteAccountResponse => ({ httpStatus: 410, body: { status: "already_deleted" } }),
  /** 5xx: confirmed pre-Auth permanent failure; the account and media are untouched. */
  failedPreAuth: (): DeleteAccountResponse => ({ httpStatus: 500, body: { status: "deletion_failed", media: "untouched" } }),
  /** 5xx: the request could not be safely accepted or persisted. */
  unavailable: (): DeleteAccountResponse => ({ httpStatus: 503, body: { status: "unavailable" } }),
};

/**
 * Synchronous part of delete-account, after the caller has been authenticated (frozen §9).
 * Order: open/lease (freeze commits) → Auth hard delete → database confirmation → immediate purge.
 */
export async function runDeleteAccount(
  deps: N10Deps,
  input: { userId: string; tokenWindowSeconds: number },
): Promise<DeleteAccountResponse> {
  let opened: OpenedRequest;
  try {
    opened = await deps.db.openRequest(input.userId, REQUEST_LEASE_SECONDS);
  } catch {
    deps.log.error("n10_open_request_failed", { phase: "freeze" });
    return RESPONSES.unavailable();
  }
  // From here the freeze is committed: the request is durable and media access is denied.
  if (opened.status === "auth_attention") return RESPONSES.failedPreAuth();
  if (!opened.leaseAcquired || opened.lease === null || opened.status !== "requested") return RESPONSES.accepted();

  const lease = opened.lease;
  const requestId = opened.requestId;
  let authConfirmed = false;
  try {
    const auth = await deleteAuthAndConfirm(deps, input.userId);
    if (auth.result === "present_permanent") {
      const state = await deps.db.recordFailure(requestId, lease, "requested", "auth_permanent", true);
      if (state === "auth_attention") await deps.alert({ kind: "auth_attention", requestId, errorClass: "auth_permanent" });
      return RESPONSES.failedPreAuth();
    }
    if (auth.result === "present_transient") {
      const errorClass: N10ErrorClass = auth.cls === "transient" ? "auth_transient" : "auth_unknown_outcome";
      const state = await deps.db.recordFailure(requestId, lease, "requested", errorClass, false);
      if (state === "auth_attention") await deps.alert({ kind: "auth_attention", requestId, errorClass });
      return RESPONSES.accepted();
    }
    await deps.db.confirmAuthDeleted(requestId, lease, input.tokenWindowSeconds);
    authConfirmed = true;
    const state = await purgeAndRecord(
      deps,
      { requestId, userId: input.userId, lease, status: "auth_deleted" },
      deps.now() + IMMEDIATE_PURGE_BUDGET_MS,
    );
    return RESPONSES.deleted(state === "awaiting_final_sweep" ? "removed" : "continuing");
  } catch {
    deps.log.error("n10_delete_account_step_failed", { request_id: requestId, auth_confirmed: authConfirmed });
    try {
      await deps.db.releaseLease(requestId, lease);
    } catch {
      // The lease expires on its own; the worker continues.
    }
    // The request is durable either way; the worker owns continuation.
    return authConfirmed ? RESPONSES.deleted("continuing") : RESPONSES.accepted();
  }
}

// ---------------------------------------------------------------------------
// Worker
// ---------------------------------------------------------------------------
export async function processClaimed(
  deps: N10Deps,
  req: ClaimedRequest,
  config: { tokenWindow: TokenWindow; deadlineMs: number },
): Promise<N10State> {
  if (req.status === "requested") {
    const windowFailure = tokenWindowFailure(config.tokenWindow);
    if (windowFailure !== null || !config.tokenWindow.ok) {
      // Fail closed: never delete an Auth user without a verified sweep window. Recorded as a durable
      // config failure so the request backs off (D4) and escalates with an alert, instead of spinning.
      deps.log.error("n10_config_invalid", { request_id: req.requestId, reason: windowFailure });
      const state = await deps.db.recordFailure(req.requestId, req.lease, "requested", "config", false);
      if (state === "auth_attention") await deps.alert({ kind: "auth_attention", requestId: req.requestId, errorClass: "config" });
      return state;
    }
    const auth = await deleteAuthAndConfirm(deps, req.userId);
    if (auth.result !== "absent") {
      const permanent = auth.result === "present_permanent";
      const errorClass: N10ErrorClass = permanent ? "auth_permanent" : auth.cls === "transient" ? "auth_transient" : "auth_unknown_outcome";
      const state = await deps.db.recordFailure(req.requestId, req.lease, "requested", errorClass, permanent);
      if (state === "auth_attention") await deps.alert({ kind: "auth_attention", requestId: req.requestId, errorClass });
      return state;
    }
    await deps.db.confirmAuthDeleted(req.requestId, req.lease, config.tokenWindow.seconds);
    return purgeAndRecord(deps, { ...req, status: "auth_deleted" }, config.deadlineMs);
  }
  if (req.status === "auth_deleted" || req.status === "awaiting_final_sweep" || req.status === "purge_attention") {
    return purgeAndRecord(deps, req, config.deadlineMs);
  }
  // auth_attention, completed and cancelled are never claimed (operator-only or terminal).
  await deps.db.releaseLease(req.requestId, req.lease);
  return req.status;
}

export async function runWorker(
  deps: N10Deps,
  config: { tokenWindow: TokenWindow; retentionDays: number | null },
): Promise<{ processed: number; results: N10State[] }> {
  const deadlineMs = deps.now() + WORKER_BUDGET_MS;
  const results: N10State[] = [];
  const seen = new Set<string>();
  while (deps.now() < deadlineMs) {
    const claimed = await deps.db.claimDue(WORKER_CLAIM_LIMIT, WORKER_LEASE_SECONDS);
    if (claimed.length === 0) break;
    // Never process the same request twice in one run (no spinning on a released row).
    const fresh = claimed.filter((r) => !seen.has(r.requestId));
    for (const r of claimed) if (seen.has(r.requestId)) await deps.db.releaseLease(r.requestId, r.lease);
    if (fresh.length === 0) break;
    for (const req of fresh) {
      seen.add(req.requestId);
      try {
        results.push(await processClaimed(deps, req, { tokenWindow: config.tokenWindow, deadlineMs }));
      } catch {
        deps.log.error("n10_worker_request_failed", { request_id: req.requestId, status: req.status });
        // Lease expiry returns the request to the queue.
      }
    }
  }
  if (config.retentionDays !== null) {
    const removed = await deps.db.cleanupCompleted(config.retentionDays);
    deps.log.info("n10_retention_cleanup", { removed_rows: removed });
  }
  return { processed: results.length, results };
}
