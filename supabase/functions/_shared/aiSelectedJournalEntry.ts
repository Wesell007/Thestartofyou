/**
 * AIC-JA3 — one journal entry the person explicitly selected for this request.
 *
 * Different from AIC-JA2 in one way only: the person deliberately chose this
 * record, in this moment, by pressing "Ask about this entry". That click is the
 * one-request authorisation, so the account-level background permission is not
 * required. Everything else is at least as strict as JA2:
 *
 *   - `AI_JOURNAL_CONTEXT_ENABLED` is authoritative. Off means zero reads.
 *   - Identity comes only from a verified Supabase access token. A user id is
 *     never accepted from a request body and the service role is never used:
 *     every read runs through PostgREST with the person's own token, so
 *     row-level security is the boundary.
 *   - Lifecycle is server-authoritative and must match the source. A selected
 *     entry from a previous chapter of life resolves to nothing in V1.
 *   - Only proven user-written text is model-visible: no titles, tags, tracker
 *     values, ids, baby ids, paths or media.
 *   - The exact final model-visible string is what deterministic AIC-5 safety
 *     assesses. Nothing longer, nothing different, is ever rendered.
 *   - No cache, no persistence, no logging of content, and no error path that
 *     could tell a caller whether a record exists.
 */

import { decideSafety } from "./safetyRouter.ts";
import { isDeterministicSafetyDecision } from "./safetyState.ts";
import {
  renderSelectedJournalEntryBlock,
  sanitiseJournalText,
  SELECTED_JOURNAL_MAX_CHARS,
} from "./enrichmentRendering.ts";
import { isJournalContextEnabled } from "./aiJournalContext.ts";
import {
  JOURNAL_ENTRY_SOURCE_LIFECYCLE,
  type JournalEntryRefV1,
} from "./journalEntryRefContract.ts";

/** Opaque transparency metadata. It has no authority over anything. */
export const SELECTED_JOURNAL_ENTRY_HEADER = "X-Companion-Journal-Entry";

/**
 * Three outcomes, and only three.
 *
 * `none`     — nothing usable. The ordinary question continues untouched.
 * `terminal` — the existing deterministic AIC-5 answer wins. No model call, no
 *              block, no background journal read. The wording is the existing
 *              wording, and nothing reveals what caused it.
 * `ready`    — a bounded, assessed block that may enter the prompt.
 */
export type SelectedJournalEntryResult =
  | { kind: "none" }
  | { kind: "terminal"; answer: string }
  | { kind: "ready"; block: string; text: string };

const NONE: SelectedJournalEntryResult = { kind: "none" };

const readEnv = (name: string): string => {
  const runtime = (globalThis as {
    Deno?: { env?: { get(key: string): string | undefined } };
  }).Deno;
  try {
    return runtime?.env?.get(name) ?? "";
  } catch {
    return "";
  }
};


const bearerToken = (req: Request): string | null => {
  const match = /^Bearer\s+(.+)$/i.exec((req.headers.get("authorization") ?? "").trim());
  const token = match?.[1]?.trim();
  if (!token) return null;
  const anonKey = readEnv("SUPABASE_ANON_KEY");
  if (anonKey && token === anonKey) return null;
  return token;
};

interface ReadContext {
  req: Request;
  supabaseUrl: string;
  anonKey: string;
  token: string;
}

const restGet = async <T>(ctx: ReadContext, path: string): Promise<T[] | null> => {
  const response = await fetch(`${ctx.supabaseUrl}/rest/v1/${path}`, {
    headers: { apikey: ctx.anonKey, Authorization: `Bearer ${ctx.token}` },
    signal: ctx.req.signal,
  });
  if (!response.ok) return null;
  const rows = await response.json();
  return Array.isArray(rows) ? (rows as T[]) : null;
};

/** What a source resolves to before sanitising: text plus neutral labels. */
interface RawSelection {
  kind: string;
  stageLabel?: string;
  text: string;
}

const PREGNANCY_WEEK_MIN = 1;
const PREGNANCY_WEEK_MAX = 42;

const pregnancyReflection = async (
  ctx: ReadContext,
  id: string,
): Promise<RawSelection | null> => {
  // Episode isolation, proven and fail-closed. `reflections` carries no
  // journey id, so the only trustworthy evidence is the immutable creation
  // time of the row against the start of the pregnancy currently saved.
  // `updated_at` is never used: editing an old reflection must not move it
  // into this pregnancy. No boundary, no selection.
  const journeys = await restGet<{ started_at: string; status: string }>(
    ctx,
    "pregnancy_journeys?select=started_at,status&limit=1",
  );
  const journey = journeys?.[0];
  if (!journey || journey.status !== "active") return null;
  const episodeStart = Date.parse(journey.started_at ?? "");
  if (!Number.isFinite(episodeStart)) return null;

  const rows = await restGet<{ week: number; content: string; created_at: string }>(
    ctx,
    `reflections?select=week,content,created_at&id=eq.${id}&limit=1`,
  );
  const row = rows?.[0];
  if (!row) return null;
  const createdAt = Date.parse(row.created_at ?? "");
  if (!Number.isFinite(createdAt) || createdAt < episodeStart) return null;
  const week = Number(row.week);
  // A week outside the possible range is not a pregnancy reflection we will
  // describe, so the selection resolves to nothing.
  if (!Number.isFinite(week) || week < PREGNANCY_WEEK_MIN || week > PREGNANCY_WEEK_MAX) return null;
  return {
    kind: "their own weekly reflection",
    // Descriptive only. It never establishes the current week: the saved
    // journey remains the sole authority for that.
    stageLabel: `week ${week}`,
    text: typeof row.content === "string" ? row.content : "",
  };
};

/**
 * The authoritative baby is the primary one, or the only one. Several babies
 * with no primary is ambiguous, so baby-scoped material resolves to nothing
 * rather than being guessed at.
 */
const authoritativeBabyId = async (ctx: ReadContext): Promise<string | null> => {
  const babies = await restGet<{ id: string; is_primary: boolean }>(
    ctx,
    "babies?select=id,is_primary&order=birth_order.asc&limit=4",
  );
  if (!babies || babies.length === 0) return null;
  const primary = babies.filter((baby) => baby.is_primary);
  if (primary.length === 1) return primary[0].id;
  return babies.length === 1 ? babies[0].id : null;
};

const firstYearEntry = async (ctx: ReadContext, id: string): Promise<RawSelection | null> => {
  const rows = await restGet<{ lane: string; note: string | null; baby_id: string | null }>(
    ctx,
    `first_year_entries?select=lane,note,baby_id&id=eq.${id}&limit=1`,
  );
  const row = rows?.[0];
  if (!row) return null;
  if (row.lane === "parent") {
    return { kind: "their own note about themselves", text: row.note ?? "" };
  }
  if (row.lane !== "baby") return null;
  const babyId = await authoritativeBabyId(ctx);
  if (!babyId || row.baby_id !== babyId) return null;
  return { kind: "their own note about their baby", text: row.note ?? "" };
};

const firstYearMemory = async (ctx: ReadContext, id: string): Promise<RawSelection | null> => {
  const rows = await restGet<{ memory_scope: string; note: string; baby_id: string | null }>(
    ctx,
    `first_year_memories?select=memory_scope,note,baby_id&id=eq.${id}&limit=1`,
  );
  const row = rows?.[0];
  if (!row) return null;
  if (row.memory_scope === "family") {
    return { kind: "a family memory they wrote", text: row.note ?? "" };
  }
  // `all_babies` is out of scope for JA3 V1: it cannot be attributed to one
  // baby without inventing meaning the person did not write.
  if (row.memory_scope !== "baby") return null;
  const babyId = await authoritativeBabyId(ctx);
  if (!babyId || row.baby_id !== babyId) return null;
  return { kind: "a memory they wrote about their baby", text: row.note ?? "" };
};

const ttcNote = async (ctx: ReadContext, id: string): Promise<RawSelection | null> => {
  const journeys = await restGet<{ id: string }>(ctx, "ttc_journeys?select=id&limit=1");
  const journeyId = journeys?.[0]?.id;
  if (typeof journeyId !== "string") return null;
  const rows = await restGet<{ notes: string | null; log_type: string; journey_id: string }>(
    ctx,
    `ttc_logs?select=notes,log_type,journey_id&id=eq.${id}&limit=1`,
  );
  const row = rows?.[0];
  if (!row) return null;
  // Both rules are proved here, never assumed from what the browser showed:
  // it must still be a note, and it must belong to the current journey.
  if (row.log_type !== "note" || row.journey_id !== journeyId) return null;
  return { kind: "their own cycle note", text: row.notes ?? "" };
};

export interface ResolveSelectedJournalEntryOptions {
  ref?: JournalEntryRefV1 | null;
}

/**
 * Resolve the selected entry for one request.
 *
 * Callers must only reach this after the current question has been through
 * `decideSafety` and did not terminate: the person's own question is always
 * assessed first, and a terminal question performs zero journal reads.
 */
export const resolveSelectedJournalEntry = async (
  req: Request,
  options: ResolveSelectedJournalEntryOptions = {},
): Promise<SelectedJournalEntryResult> => {
  const ref = options.ref;
  if (!ref) return NONE;
  if (!isJournalContextEnabled()) return NONE;

  const token = bearerToken(req);
  const supabaseUrl = readEnv("SUPABASE_URL");
  const anonKey = readEnv("SUPABASE_ANON_KEY");
  if (!token || !supabaseUrl || !anonKey) return NONE;

  const ctx: ReadContext = { req, supabaseUrl, anonKey, token };

  try {
    // 1. Verify the session. Nothing is read on an unverified token.
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
      signal: req.signal,
    });
    if (!userResponse.ok) return NONE;
    const user = await userResponse.json();
    if (!user?.id) return NONE;

    // 2. Server-authoritative lifecycle. JA3 V1 is current-lifecycle only:
    //    a selected entry from an earlier chapter resolves to nothing.
    const journeys = await restGet<{ lifecycle: string }>(ctx, "journeys?select=lifecycle&limit=1");
    const lifecycle = journeys?.[0]?.lifecycle;
    if (!lifecycle || lifecycle !== JOURNAL_ENTRY_SOURCE_LIFECYCLE[ref.source]) return NONE;

    // 3. The one allowlisted read for that source. A row belonging to somebody
    //    else is simply invisible under row-level security, so it behaves
    //    exactly like a row that does not exist: no oracle, no difference.
    const raw =
      ref.source === "pregnancy_reflection"
        ? await pregnancyReflection(ctx, ref.id)
        : ref.source === "first_year_entry"
          ? await firstYearEntry(ctx, ref.id)
          : ref.source === "first_year_memory"
            ? await firstYearMemory(ctx, ref.id)
            : await ttcNote(ctx, ref.id);
    if (!raw) return NONE;

    // 4. Sanitise and bound FIRST, so the assessed string and the rendered
    //    string are the same string. Never assess an excerpt and render more.
    const text = sanitiseJournalText(raw.text, SELECTED_JOURNAL_MAX_CHARS);
    if (!text) return NONE;

    // 5. Deterministic AIC-5 safety over exactly that string. No new
    //    classifier, no model call, no journal-specific wording: the existing
    //    deterministic answer is returned unchanged, and nothing anywhere
    //    reveals that the entry rather than the question produced it.
    const safety = decideSafety(text);
    if (isDeterministicSafetyDecision(safety)) {
      return { kind: "terminal", answer: safety.answer };
    }

    // 6. Render exactly the assessed string.
    const block = renderSelectedJournalEntryBlock({
      kind: raw.kind,
      stageLabel: raw.stageLabel,
      text,
    });
    return block ? { kind: "ready", block, text } : NONE;
  } catch (error) {
    if (req.signal.aborted) return NONE;
    // Never a journal value, a source name, an id or a safety result.
    console.error(
      "ai-search selected journal entry unavailable",
      error instanceof Error ? error.name : "unknown error",
    );
    return NONE;
  }
};
