/**
 * Pure builders for the consent-based companion day recap on the Today page.
 *
 * Nothing here calls the network. The digest is only ever built inside the
 * "Summarise today" button handler, never on render.
 *
 * Deliberately excluded from everything built here: parent names, baby names,
 * photos, photo paths, memory text, kept pregnancy chapter content, account
 * details, the private day note and any care event from another day. Babies
 * are referred to by neutral labels only.
 */

import {
  BOTTLE_TYPE_LABELS,
  NAPPY_LABELS,
  POO_COLOUR_LABELS,
  POO_SIZE_LABELS,
  POO_TEXTURE_LABELS,
  RASH_LEVEL_LABELS,
  SIDE_LABELS,
  SLEEP_KIND_LABELS,
  bankedFeedSeconds,
  formatDuration,
  isRunningBreastFeed,
  normaliseNappyType,
  secondsToMinutes,
  summariseDay,
  type CareEvent,
} from "@/lib/firstYearCareEventsSchema";

/** The shared `ai-search` function rejects anything longer than this. */
export const DAY_SUMMARY_QUERY_MAX_LENGTH = 1000;

/** A moment is carried as a short snippet, never in full. */
export const MOMENT_SNIPPET_MAX_LENGTH = 90;

/** The instruction is never trimmed, whatever else has to go. */
export const DAY_SUMMARY_GUARDRAILS = [
  "You are a gentle First Year companion inside The Start of You.",
  "Write a short recap of only the care events listed below for this one day.",
  "Use British English, no outside knowledge, no web search, no advice of any kind.",
  "Do not diagnose, do not advise on sleep, do not predict a next feed, sleep or nappy, and do not compare the baby with typical ranges.",
  "Do not judge the day and do not use the words tracker, prediction, predicts, ideal, optimal, score, progress, risk, diagnosis, symptom checker, safe, unsafe, normal or abnormal.",
  "Use the headings Today at a glance, What was logged, and Little things to remember.",
  "Do not add safety wording, emergency wording or who to contact, since the page already shows it.",
  "Keep it between 80 and 140 words. If only a little was logged, say so lightly and keep the recap short.",
].join(" ");

export type DigestLine = {
  /** Type, time and structured detail. Kept before any moment text. */
  core: string;
  /** Optional moment wording, trimmed first when space runs out. */
  moment?: string;
};

export type DayRhythmDigest = {
  /** The selected day, as a plain date key. */
  day: string;
  /** Counts and totals of what was logged. */
  counts: string;
  /** One line per care event, oldest first. */
  lines: DigestLine[];
};

export type DigestOptions = {
  /** Neutral label per baby id, such as "Baby 1". Never a real name. */
  babyLabels?: Record<string, string>;
  /** Coarse age wording, such as "around three months old". */
  ageLabel?: string | null;
  now?: Date;
};

const clock = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const snippet = (text: string): string => {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > MOMENT_SNIPPET_MAX_LENGTH
    ? `${clean.slice(0, MOMENT_SNIPPET_MAX_LENGTH).trimEnd()}…`
    : clean;
};

const feedDetail = (event: CareEvent, now: Date): string[] => {
  const parts: string[] = [];
  if (event.metadata.feed_mode === "bottle" || event.feed_method === "bottle") {
    parts.push("bottle");
    if (event.metadata.bottle_type) {
      parts.push(BOTTLE_TYPE_LABELS[event.metadata.bottle_type].toLowerCase());
    }
    if (typeof event.amount_ml === "number") parts.push(`${Math.round(event.amount_ml)} ml`);
    return parts;
  }
  parts.push("breast");
  if (isRunningBreastFeed(event)) {
    parts.push("still running");
    return parts;
  }
  const left = secondsToMinutes(event.metadata.left_duration_seconds);
  const right = secondsToMinutes(event.metadata.right_duration_seconds);
  const total = secondsToMinutes(
    event.metadata.total_duration_seconds ?? bankedFeedSeconds(event.metadata),
  );
  if (left > 0) parts.push(`left ${formatDuration(left)}`);
  if (right > 0) parts.push(`right ${formatDuration(right)}`);
  if (total > 0) parts.push(`total ${formatDuration(total)}`);
  if (left === 0 && right === 0 && total === 0 && event.side) {
    parts.push(SIDE_LABELS[event.side].toLowerCase());
  }
  return parts;
};

const sleepDetail = (event: CareEvent, now: Date): string[] => {
  const parts: string[] = [];
  if (event.sleep_kind) parts.push(SLEEP_KIND_LABELS[event.sleep_kind].toLowerCase());
  if (!event.ended_at) {
    parts.push("still sleeping");
    return parts;
  }
  const start = new Date(event.started_at ?? event.occurred_at).getTime();
  const end = new Date(event.ended_at).getTime();
  if (Number.isFinite(start) && Number.isFinite(end) && end > start) {
    parts.push(formatDuration(Math.round((end - start) / 60000)));
  }
  return parts;
};

const nappyDetail = (event: CareEvent): string[] => {
  const parts: string[] = [];
  const type = normaliseNappyType(event.nappy_type);
  if (type) parts.push(NAPPY_LABELS[type].toLowerCase());
  if (event.metadata.poo_texture) {
    parts.push(POO_TEXTURE_LABELS[event.metadata.poo_texture].toLowerCase());
  }
  if (event.metadata.poo_size) parts.push(POO_SIZE_LABELS[event.metadata.poo_size].toLowerCase());
  if (event.metadata.poo_colour) {
    parts.push(POO_COLOUR_LABELS[event.metadata.poo_colour].toLowerCase());
  }
  if (event.metadata.rash_level) {
    parts.push(`rash: ${RASH_LEVEL_LABELS[event.metadata.rash_level].toLowerCase()}`);
  }
  return parts;
};

/**
 * Turns the day's care events into a compact, name-free digest. Only the
 * fields allowed by the Today recap are read: type, time, durations, bottle
 * type and amount, nappy type and details, moment wording and a neutral baby
 * label.
 */
export const buildDayRhythmDigest = (
  events: CareEvent[],
  day: string,
  { babyLabels = {}, ageLabel, now = new Date() }: DigestOptions = {},
): DayRhythmDigest => {
  const summary = summariseDay(events, now);
  const ordered = [...events].sort(
    (a, b) => new Date(a.occurred_at).getTime() - new Date(b.occurred_at).getTime(),
  );
  const multiples = Object.keys(babyLabels).length > 1;

  const countParts = [
    `${summary.feeds} feed${summary.feeds === 1 ? "" : "s"}`,
    `${summary.sleeps} sleep${summary.sleeps === 1 ? "" : "s"}`,
    `${summary.nappies} nappy change${summary.nappies === 1 ? "" : "s"}`,
    `${summary.moments} moment${summary.moments === 1 ? "" : "s"}`,
  ];
  if (summary.sleepMinutes > 0) countParts.push(`${formatDuration(summary.sleepMinutes)} of sleep`);
  if (summary.runningSleep) countParts.push("a sleep still running");
  if (summary.runningFeed) countParts.push("a feed still running");
  if (ageLabel) countParts.push(ageLabel);

  const lines: DigestLine[] = ordered
    .filter((event) => event.event_type !== "pump")
    .map((event) => {
      const time = clock(event.started_at ?? event.occurred_at);
      const label = babyLabels[event.baby_id];
      const scope = multiples && label ? ` [${label}]` : "";
      let detail: string[] = [];
      if (event.event_type === "feed") detail = feedDetail(event, now);
      if (event.event_type === "sleep") detail = sleepDetail(event, now);
      if (event.event_type === "nappy") detail = nappyDetail(event);
      const type =
        event.event_type === "note"
          ? "Moment"
          : event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1);
      const core = `${time} ${type}${detail.length > 0 ? ` (${detail.join(", ")})` : ""}${scope}`;
      const momentText = event.event_type === "note" && event.note ? snippet(event.note) : undefined;
      return momentText ? { core, moment: momentText } : { core };
    });

  return { day, counts: countParts.join(", "), lines };
};

const assemble = (digest: DayRhythmDigest, lines: string[]): string =>
  [
    DAY_SUMMARY_GUARDRAILS,
    `Day: ${digest.day}.`,
    `Logged: ${digest.counts}.`,
    lines.length > 0 ? `Events:\n${lines.join("\n")}` : "Events: none logged.",
  ].join("\n");

/**
 * Fits the digest inside the query limit without ever trimming the guardrail
 * instruction. Moment wording goes first, oldest first, then whole event
 * lines from the oldest end. The day and the counts always stay.
 */
export const buildDaySummaryQuery = (
  digest: DayRhythmDigest,
  maxLength: number = DAY_SUMMARY_QUERY_MAX_LENGTH,
): string => {
  const working = digest.lines.map((line) => ({ ...line }));

  const render = () =>
    assemble(
      digest,
      working.map((line) => (line.moment ? `${line.core}: ${line.moment}` : line.core)),
    );

  // 1. Shorten, then drop, moment wording from the oldest entries first.
  for (let i = 0; i < working.length && render().length > maxLength; i += 1) {
    if (working[i].moment) delete working[i].moment;
  }

  // 2. Only then start dropping whole event lines, again oldest first.
  while (working.length > 0 && render().length > maxLength) {
    working.shift();
  }

  const out = render();
  return out.length > maxLength ? out.slice(0, maxLength).trimEnd() : out;
};
