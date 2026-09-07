/**
 * AIC-JA2 — permissioned background journal awareness.
 *
 * A small amount of the person's own recent journal text, resolved on the
 * server, for one request, as background material only.
 *
 * Every one of these is a hard invariant, not an aspiration:
 *
 *   - Two gates. `AI_JOURNAL_CONTEXT_ENABLED` is authoritative: off means zero
 *     journal reads. On top of that the person must have opted in on their own
 *     profile row.
 *   - Identity comes only from a verified Supabase access token. A user id is
 *     never accepted from a request body, and the service role is never used:
 *     every read runs through PostgREST with the person's own token, so
 *     row-level security is the boundary.
 *   - Lifecycle is server-authoritative. `journeys.lifecycle` decides which
 *     source may be read, and it must agree with the AIC-2 personal journey.
 *     Page context never influences journal scope.
 *   - Episode isolation is fail-closed. A record that cannot be *proved* to
 *     belong to the current episode is excluded, even at the cost of recall.
 *   - Only text the person wrote themselves may be model-visible. Titles,
 *     tags, structured tracker values, ids, paths and media never are.
 *   - Model-visible characters are always a subset of safety-assessed
 *     characters: an entry is assessed whole by AIC-JA-S1 and then either used
 *     whole or dropped whole.
 *   - Anything unexpected — any failure, any ambiguity — yields no journal
 *     context and an ordinary answer. Nothing is cached and nothing is logged.
 */

import { filterBackgroundEntries } from "./enrichmentSafety.ts";
import {
  renderJournalContextBlock,
  type JournalObservationEntry,
} from "./enrichmentRendering.ts";
import { pregnancyWeekFromLmp } from "./pregnancyWeek.ts";
import type { PersonalJourneyContextV1 } from "./journeyContextContract.ts";

/** Opaque transparency metadata. It has no authority over anything. */
export const JOURNAL_CONTEXT_HEADER = "X-Companion-Journal-Context";

/**
 * Trusted system-layer rules for *using* the block, added only when a block
 * exists. `JOURNAL_CONTEXT_INSTRUCTIONS` states what the block is; these state
 * how it may be used. Neither can be reached or rewritten by journal text.
 */
export const JOURNAL_ANSWER_RULES = [
  "Using journal observations:",
  "- Draw on them only when they genuinely make this answer more useful. Most answers should not mention them at all.",
  "- Paraphrase in your own words. Never quote more than a few words back.",
  "- Never say you remember them, never list them and never describe how you came to know them.",
  "- A note about the person is never a fact about their baby, and a family note is never a fact about one child.",
  "- They never establish journey, stage, week, month or clinical fact. Saved journey details and safety guidance always take priority.",
].join("\n");

export interface JournalContextResult {
  /** The rendered block, or "" when there is nothing to add. */
  block: string;
  /** True only when a non-empty block will actually reach the model. */
  used: boolean;
}

const NONE: JournalContextResult = { block: "", used: false };

/** How far back each source may look. Deliberately short. */
export const PREGNANCY_WEEK_LOOKBACK = 3;
export const FIRST_YEAR_LOOKBACK_DAYS = 14;
export const TTC_LOOKBACK_DAYS = 21;

/** Upper bound on rows fetched per source before safety and rendering. */
const ROW_LIMIT = 20;

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

/** Authoritative server kill switch. Off means zero journal-table reads. */
export const isJournalContextEnabled = (): boolean =>
  readEnv("AI_JOURNAL_CONTEXT_ENABLED").trim().toLowerCase() === "true";

const dayString = (value: Date, offsetDays = 0): string =>
  new Date(value.getTime() + offsetDays * 86_400_000).toISOString().slice(0, 10);

/** `journeys.lifecycle` values mapped onto the AIC-2 personal taxonomy. */
const LIFECYCLE_TO_PERSONAL: Record<string, PersonalJourneyContextV1["journey"]> = {
  pregnancy: "pregnancy",
  ttc: "trying-to-conceive",
  first_year: "first-year",
};

const JOURNEY_LABEL: Record<PersonalJourneyContextV1["journey"], string> = {
  pregnancy: "pregnancy",
  "trying-to-conceive": "trying to conceive",
  "first-year": "first year",
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

const bearerToken = (req: Request): string | null => {
  const match = /^Bearer\s+(.+)$/i.exec((req.headers.get("authorization") ?? "").trim());
  const token = match?.[1]?.trim();
  if (!token) return null;
  // The anonymous publishable key is not a user session.
  const anonKey = readEnv("SUPABASE_ANON_KEY");
  if (anonKey && token === anonKey) return null;
  return token;
};

/* ------------------------------------------------------------- per journey */

/**
 * Pregnancy: `reflections` is unique on `(user_id, week)`, so a week row is
 * reused across pregnancies and carries no journey id. The only provable
 * current-episode boundary is the row's immutable `created_at` against the
 * authoritative LMP and any later archived pregnancy. `updated_at` is never
 * episode evidence, so a historic row rewritten during this pregnancy is
 * excluded. That is intentional: correctness over recall.
 */
const pregnancyEntries = async (
  ctx: ReadContext,
  now: Date,
): Promise<JournalObservationEntry[]> => {
  const journeys = await restGet<{ lmp_date: string; status: string }>(
    ctx,
    "pregnancy_journeys?select=lmp_date,status&limit=1",
  );
  const journey = journeys?.[0];
  if (!journey?.lmp_date || journey.status !== "active") return [];

  const lmp = new Date(`${journey.lmp_date}T00:00:00.000Z`);
  if (Number.isNaN(lmp.getTime())) return [];

  // A pregnancy chapter that was archived after this LMP means the episode
  // boundary is the archive, not the LMP.
  const archived = await restGet<{ ended_at: string }>(
    ctx,
    "archived_journeys?select=ended_at&lifecycle=eq.pregnancy&order=ended_at.desc&limit=1",
  );
  const archivedEnd = archived?.[0]?.ended_at ? new Date(archived[0].ended_at) : null;
  const boundary =
    archivedEnd && !Number.isNaN(archivedEnd.getTime()) && archivedEnd > lmp ? archivedEnd : lmp;

  const week = pregnancyWeekFromLmp(lmp, now);
  const rows = await restGet<{ week: number; content: string; created_at: string }>(
    ctx,
    `reflections?select=week,content,created_at&week=gte.${Math.max(1, week - PREGNANCY_WEEK_LOOKBACK)}` +
      `&week=lte.${week}&created_at=gte.${encodeURIComponent(boundary.toISOString())}` +
      `&order=week.desc&limit=${ROW_LIMIT}`,
  );
  if (!rows) return [];

  return rows.map((row) => ({
    date: typeof row.created_at === "string" ? row.created_at.slice(0, 10) : "",
    kind: "their own weekly reflection",
    stageLabel: Number.isFinite(row.week) ? `week ${row.week}` : undefined,
    text: typeof row.content === "string" ? row.content : "",
  }));
};

/**
 * First Year: the authoritative baby is the primary one, or the only one.
 * Several babies with no primary is ambiguous, so baby-scoped material is
 * excluded entirely rather than guessed. `all_babies` memories are out of
 * scope for JA2, and `kind` keeps parent and family material clearly distinct
 * so neither can be read as an observation about the selected baby.
 */
const firstYearEntries = async (
  ctx: ReadContext,
  now: Date,
  personal: PersonalJourneyContextV1,
): Promise<JournalObservationEntry[]> => {
  const journeys = await restGet<{ status: string }>(
    ctx,
    "first_year_journeys?select=status&limit=1",
  );
  if (journeys?.[0]?.status !== "active") return [];

  const babies = await restGet<{ id: string; is_primary: boolean }>(
    ctx,
    "babies?select=id,is_primary&order=birth_order.asc&limit=4",
  );
  if (!babies) return [];
  const primary = babies.filter((baby) => baby.is_primary);
  const activeBabyId =
    primary.length === 1 ? primary[0].id : babies.length === 1 ? babies[0].id : null;

  const since = dayString(now, -FIRST_YEAR_LOOKBACK_DAYS);
  const stageLabel =
    personal.journey === "first-year" && typeof personal.ageMonths === "number"
      ? `month ${personal.ageMonths}`
      : undefined;

  const [notes, memories] = await Promise.all([
    restGet<{ entry_date: string; lane: string; note: string | null; baby_id: string | null }>(
      ctx,
      `first_year_entries?select=entry_date,lane,note,baby_id&entry_date=gte.${since}` +
        `&order=entry_date.desc&limit=${ROW_LIMIT}`,
    ),
    restGet<{ memory_date: string; note: string; memory_scope: string; baby_id: string | null }>(
      ctx,
      `first_year_memories?select=memory_date,note,memory_scope,baby_id&memory_date=gte.${since}` +
        `&order=memory_date.desc&limit=${ROW_LIMIT}`,
    ),
  ]);

  const entries: JournalObservationEntry[] = [];

  for (const row of notes ?? []) {
    if (row.lane === "parent") {
      entries.push({
        date: row.entry_date,
        kind: "their own note about themselves",
        stageLabel,
        text: row.note ?? "",
      });
    } else if (row.lane === "baby" && activeBabyId && row.baby_id === activeBabyId) {
      entries.push({
        date: row.entry_date,
        kind: "their own note about their baby",
        stageLabel,
        text: row.note ?? "",
      });
    }
  }

  for (const row of memories ?? []) {
    if (row.memory_scope === "family") {
      entries.push({
        date: row.memory_date,
        kind: "a family memory they wrote",
        stageLabel,
        text: row.note ?? "",
      });
    } else if (row.memory_scope === "baby" && activeBabyId && row.baby_id === activeBabyId) {
      entries.push({
        date: row.memory_date,
        kind: "a memory they wrote about their baby",
        stageLabel,
        text: row.note ?? "",
      });
    }
  }

  return entries;
};

/**
 * TTC: `ttc_logs.journey_id` is a real foreign key to the current journey, so
 * episode isolation here is exact. Only free-text `notes` on the `note` log
 * type are used — structured tracker values are not journal writing.
 */
const ttcEntries = async (ctx: ReadContext, now: Date): Promise<JournalObservationEntry[]> => {
  const journeys = await restGet<{ id: string }>(ctx, "ttc_journeys?select=id&limit=1");
  const journeyId = journeys?.[0]?.id;
  if (typeof journeyId !== "string" || !/^[0-9a-f-]{36}$/i.test(journeyId)) return [];

  const rows = await restGet<{ log_date: string; notes: string | null }>(
    ctx,
    `ttc_logs?select=log_date,notes&journey_id=eq.${journeyId}&log_type=eq.note` +
      `&log_date=gte.${dayString(now, -TTC_LOOKBACK_DAYS)}&order=log_date.desc&limit=${ROW_LIMIT}`,
  );
  if (!rows) return [];

  return rows.map((row) => ({
    date: row.log_date,
    kind: "their own cycle note",
    stageLabel: undefined,
    text: row.notes ?? "",
  }));
};

/* ---------------------------------------------------------------- resolver */

export interface ResolveJournalContextOptions {
  /** The AIC-2 personal journey for this request, when there is one. */
  personal?: PersonalJourneyContextV1;
  /** Injected for tests; defaults to now. */
  now?: Date;
}

/**
 * Resolve the journal block for one request. Callers must only call this on
 * the ordinary GREEN generative path — every other outcome must perform zero
 * journal reads.
 */
export const resolveJournalContext = async (
  req: Request,
  options: ResolveJournalContextOptions = {},
): Promise<JournalContextResult> => {
  if (!isJournalContextEnabled()) return NONE;

  const personal = options.personal;
  if (!personal) return NONE;

  const token = bearerToken(req);
  const supabaseUrl = readEnv("SUPABASE_URL");
  const anonKey = readEnv("SUPABASE_ANON_KEY");
  if (!token || !supabaseUrl || !anonKey) return NONE;

  const ctx: ReadContext = { req, supabaseUrl, anonKey, token };
  const now = options.now ?? new Date();

  try {
    // 1. Verify the session. Nothing is read on an unverified token.
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
      signal: req.signal,
    });
    if (!userResponse.ok) return NONE;
    const user = await userResponse.json();
    if (!user?.id) return NONE;

    // 2. Explicit permission on the person's own profile row.
    const profiles = await restGet<{ companion_journal_context_enabled: boolean }>(
      ctx,
      "profiles?select=companion_journal_context_enabled&limit=1",
    );
    if (profiles?.[0]?.companion_journal_context_enabled !== true) return NONE;

    // 3. Server-authoritative lifecycle, which must agree with AIC-2.
    const journeys = await restGet<{ lifecycle: string }>(ctx, "journeys?select=lifecycle&limit=1");
    const lifecycle = journeys?.[0]?.lifecycle;
    if (!lifecycle || LIFECYCLE_TO_PERSONAL[lifecycle] !== personal.journey) return NONE;

    // 4. The minimum bounded read set for that one lifecycle.
    const raw =
      personal.journey === "pregnancy"
        ? await pregnancyEntries(ctx, now)
        : personal.journey === "first-year"
          ? await firstYearEntries(ctx, now, personal)
          : await ttcEntries(ctx, now);

    // 5. Normalise, order and de-duplicate.
    const seen = new Set<string>();
    const normalised = raw
      .map((entry) => ({ ...entry, text: (entry.text ?? "").trim() }))
      .filter((entry) => {
        if (!entry.text || !entry.date) return false;
        const key = entry.text.toLowerCase().replace(/\s+/g, " ");
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

    // 6. AIC-JA-S1 pre-flight, per entry. An entry the shared assessment will
    //    not vouch for — including one too long to assess — is dropped whole,
    //    never truncated into a partially assessed fragment.
    const safe = filterBackgroundEntries(normalised);
    if (safe.length === 0) return NONE;

    // 7. The shared renderer owns every bound and all escaping.
    const block = renderJournalContextBlock({
      journey: JOURNEY_LABEL[personal.journey],
      entries: safe,
    });
    return block ? { block, used: true } : NONE;
  } catch (error) {
    if (req.signal.aborted) return NONE;
    // Never a journal value, a count, a date or a source name.
    console.error(
      "ai-search journal context unavailable",
      error instanceof Error ? error.name : "unknown error",
    );
    return NONE;
  }
};
