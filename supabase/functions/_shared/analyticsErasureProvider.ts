// N10 analytics-identity erasure PROVIDER ADAPTER (the only analytics-provider-specific file; D14.1).
//
// Contract: createAnalyticsEraserFromEnv(env, fetch): AnalyticsEraser | null.
//   - returns null (fail closed) when the backend credential, project id or API host is missing or
//     malformed; the worker then records a durable "analytics_config" failure and the request cannot
//     complete;
//   - the eraser returns { ok: true, personsFound } or { ok: false, failure } and never throws, logs or
//     returns provider messages, response bodies or the credential.
// To switch provider, replace this file's implementation only; the M7 schema, completion gate, retry,
// attention and alert contract (accountDeletion.ts) do not change.
//
// Current implementation: PostHog Cloud, verified against PostHog's published OpenAPI schema on
// 15 October 2026 (operation persons_bulk_delete_create):
//   POST {host}/api/projects/{project_id}/persons/bulk_delete/
//   body { distinct_ids: [<user uuid>], delete_events: true, delete_recordings: true, keep_person: false }
//   Authorization: Bearer <personal API key>; required scope person:write; success 202 with
//   persons_found / persons_queued_for_deletion / events_queued_for_deletion / deletion_errors.
// Person records are removed in the background shortly after the request; event deletion is queued
// and processed asynchronously by PostHog (only events captured before the request are deleted).
//
// Secrets (Edge Function secrets only; never in Git, the database, pg_net or the client):
//   POSTHOG_PERSONAL_API_KEY  personal API key scoped to the single project, scope person:write only
//   POSTHOG_PROJECT_ID        numeric project id
//   POSTHOG_API_HOST          private API host: https://eu.posthog.com or https://us.posthog.com
import type { AnalyticsEraser, AnalyticsEraseResult, EnvReader } from "./accountDeletion.ts";

export const POSTHOG_API_HOSTS = ["https://eu.posthog.com", "https://us.posthog.com"] as const;
export const POSTHOG_TIMEOUT_MS = 10_000;
const KEY_RE = /^phx_[A-Za-z0-9_-]{20,200}$/;
const PROJECT_RE = /^\d{1,12}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
// deletion_errors steps after which the person is already deleted (PostHog schema text).
const DELETED_DESPITE_ERROR_STEPS = new Set(["log_activity", "publish_clickhouse_tombstone"]);

export type FetchLike = (url: string, init: { method: string; headers: Record<string, string>; body: string; signal: AbortSignal }) => Promise<{
  status: number;
  json(): Promise<unknown>;
}>;

export type PosthogConfig = { apiKey: string; projectId: string; host: (typeof POSTHOG_API_HOSTS)[number] };

export function readPosthogConfig(env: EnvReader): PosthogConfig | null {
  const apiKey = env("POSTHOG_PERSONAL_API_KEY")?.trim();
  const projectId = env("POSTHOG_PROJECT_ID")?.trim();
  const host = env("POSTHOG_API_HOST")?.trim().replace(/\/+$/, "");
  if (!apiKey || !KEY_RE.test(apiKey)) return null;
  if (!projectId || !PROJECT_RE.test(projectId)) return null;
  const allowed = POSTHOG_API_HOSTS.find((h) => h === host);
  if (!allowed) return null;
  return { apiKey, projectId, host: allowed };
}

const isCount = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 1000;

/** Classifies a PostHog bulk_delete response. Exported for tests. */
export function classifyPosthogResponse(status: number, body: unknown): AnalyticsEraseResult {
  if (status === 408 || status === 429 || status >= 500) return { ok: false, failure: "transient" };
  if (status >= 400) return { ok: false, failure: "permanent" };
  if (status !== 200 && status !== 202) return { ok: false, failure: "transient" };
  if (typeof body !== "object" || body === null) return { ok: false, failure: "transient" };
  const b = body as Record<string, unknown>;
  if (!isCount(b.persons_found)) return { ok: false, failure: "transient" };
  const errors = b.deletion_errors === undefined ? [] : b.deletion_errors;
  if (!Array.isArray(errors)) return { ok: false, failure: "transient" };
  for (const e of errors) {
    const step = e && typeof e === "object" ? (e as Record<string, unknown>).step : undefined;
    if (typeof step !== "string" || !DELETED_DESPITE_ERROR_STEPS.has(step)) return { ok: false, failure: "transient" };
  }
  // A matched person must have had event deletion requested; otherwise retry.
  if (b.persons_found > 0 && b.events_queued_for_deletion !== true) return { ok: false, failure: "transient" };
  return { ok: true, personsFound: b.persons_found };
}

export function createPosthogEraser(config: PosthogConfig, fetchImpl: FetchLike, timeoutMs = POSTHOG_TIMEOUT_MS): AnalyticsEraser {
  const url = `${config.host}/api/projects/${config.projectId}/persons/bulk_delete/`;
  return async (distinctId) => {
    // The distinct id is the Supabase user UUID (src/App.tsx identify); anything else is never sent.
    if (!UUID_RE.test(distinctId)) return { ok: false, failure: "permanent" };
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetchImpl(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ distinct_ids: [distinctId], delete_events: true, delete_recordings: true, keep_person: false }),
        signal: controller.signal,
      });
      let body: unknown = null;
      if (res.status === 200 || res.status === 202) {
        try {
          body = await res.json();
        } catch {
          body = null;
        }
      }
      return classifyPosthogResponse(res.status, body);
    } catch {
      return { ok: false, failure: "transient" };
    } finally {
      clearTimeout(timer);
    }
  };
}

export function createAnalyticsEraserFromEnv(env: EnvReader, fetchImpl: FetchLike): AnalyticsEraser | null {
  const config = readPosthogConfig(env);
  return config ? createPosthogEraser(config, fetchImpl) : null;
}
