/**
 * Pregnancy memory film — pure timeline builder.
 *
 * Turns saved weekly memories (reflection, photo, video, voice note) into a
 * deterministic list of film "beats" with absolute start times.
 *
 * This module is intentionally pure: no React, no Supabase, no browser APIs,
 * no Date.now(), no randomness. Signed URLs are passed in as opaque strings
 * and are never created, refreshed or persisted here.
 */

export type FilmBeatKind =
  | "cover"
  | "chapter"
  | "weekLabel"
  | "photo"
  | "video"
  | "voice"
  | "reflection"
  | "ending";

export interface FilmMediaRef {
  url: string;
  caption?: string | null;
  mimeType?: string | null;
  durationSeconds?: number | null;
}

export interface WeekMemory {
  week: number;
  reflection?: string | null;
  photo?: FilmMediaRef | null;
  video?: FilmMediaRef | null;
  voice?: FilmMediaRef | null;
}

export interface BuildFilmInput {
  firstName: string;
  currentWeek: number;
  /** ISO date string or a formatted due-date line. Display only. */
  dueLabel?: string | null;
  weeks: WeekMemory[];
  /** When omitted, every week that has content is included. */
  selectedWeeks?: number[];
}

interface BaseBeat {
  id: string;
  kind: FilmBeatKind;
  week: number | null;
  startSeconds: number;
  durationSeconds: number;
}

export interface CoverBeat extends BaseBeat {
  kind: "cover";
  title: string;
  subtitle: string | null;
}

export interface ChapterBeat extends BaseBeat {
  kind: "chapter";
  trimester: 1 | 2 | 3;
  title: string;
}

export interface WeekLabelBeat extends BaseBeat {
  kind: "weekLabel";
  week: number;
  label: string;
}

export interface PhotoBeat extends BaseBeat {
  kind: "photo";
  week: number;
  url: string;
  caption: string | null;
}

export interface VideoBeat extends BaseBeat {
  kind: "video";
  week: number;
  url: string;
  caption: string | null;
  mimeType: string | null;
  /** Photo for the same week, used when the clip cannot be decoded. */
  fallbackPhotoUrl: string | null;
}

export interface VoiceBeat extends BaseBeat {
  kind: "voice";
  week: number;
  url: string;
  caption: string | null;
  mimeType: string | null;
  /** Photo for the same week, shown behind the audio when available. */
  backdropPhotoUrl: string | null;
}

export interface ReflectionBeat extends BaseBeat {
  kind: "reflection";
  week: number;
  excerpt: string;
}

export interface EndingBeat extends BaseBeat {
  kind: "ending";
  title: string;
  subtitle: string | null;
}

export type FilmBeat =
  | CoverBeat
  | ChapterBeat
  | WeekLabelBeat
  | PhotoBeat
  | VideoBeat
  | VoiceBeat
  | ReflectionBeat
  | EndingBeat;

export interface FilmTimeline {
  beats: FilmBeat[];
  totalSeconds: number;
  includedWeeks: number[];
  /** Weeks whose optional beats were dropped to respect the hard cap. */
  excludedForCap: number[];
  /** True when there is too little saved content for a full-length film. */
  sparse: boolean;
}

// ── Duration rules (seconds) ────────────────────────────────────────────────

export const FILM_DURATIONS = {
  cover: 3,
  chapter: 2.5,
  weekLabel: 2,
  photo: 4,
  reflection: 4,
  videoDefault: 5,
  videoMax: 6,
  voiceDefault: 8,
  voiceMax: 10,
  ending: 3,
} as const;

export const FILM_HARD_CAP_SECONDS = 120;
export const FILM_TARGET_MIN_SECONDS = 45;
/** Below this many kept weeks the film is treated as sparse. */
export const FILM_SPARSE_WEEK_THRESHOLD = 3;

export const REFLECTION_EXCERPT_MAX = 120;

// ── Small pure helpers ──────────────────────────────────────────────────────

export const trimesterForWeek = (week: number): 1 | 2 | 3 => {
  if (week <= 12) return 1;
  if (week <= 27) return 2;
  return 3;
};

const TRIMESTER_TITLE: Record<1 | 2 | 3, string> = {
  1: "The first little signs",
  2: "Beginning to show",
  3: "Almost here",
};

/** First sentence, or a word-boundary trim at ~120 characters. */
export const reflectionExcerpt = (raw: string): string => {
  const text = raw.replace(/\s+/g, " ").trim();
  if (text.length === 0) return "";
  const sentenceEnd = text.search(/[.!?](\s|$)/);
  if (sentenceEnd > 0 && sentenceEnd + 1 <= REFLECTION_EXCERPT_MAX) {
    return text.slice(0, sentenceEnd + 1);
  }
  if (text.length <= REFLECTION_EXCERPT_MAX) return text;
  const clipped = text.slice(0, REFLECTION_EXCERPT_MAX);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > 40 ? clipped.slice(0, lastSpace) : clipped).trim()}…`;
};

const clampDuration = (
  raw: number | null | undefined,
  fallback: number,
  max: number,
): number => {
  if (typeof raw !== "number" || !Number.isFinite(raw) || raw <= 0) return fallback;
  return Math.min(Math.round(raw * 10) / 10, max);
};

const hasContent = (w: WeekMemory): boolean =>
  Boolean(
    (w.reflection && w.reflection.trim().length > 0) ||
      w.photo?.url ||
      w.video?.url ||
      w.voice?.url,
  );

/** Describe what a week holds, for the selection UI. */
export const weekMemoryChips = (w: WeekMemory): string[] => {
  const chips: string[] = [];
  if (w.photo?.url) chips.push("Photo");
  if (w.video?.url) chips.push("Video");
  if (w.voice?.url) chips.push("Voice");
  if (w.reflection && w.reflection.trim().length > 0) chips.push("Reflection");
  return chips;
};

export const weeksWithContent = (weeks: WeekMemory[]): WeekMemory[] =>
  weeks.filter(hasContent).sort((a, b) => a.week - b.week);

// ── Builder ─────────────────────────────────────────────────────────────────

type DraftBeat = Omit<FilmBeat, "startSeconds"> & { priority: number };

/**
 * Build the film timeline.
 *
 * Beat order is chronological by week. A chapter card is inserted whenever the
 * trimester changes. Within a week: week label, photo, video, voice, reflection.
 *
 * When the running total would exceed the hard cap, optional beats are dropped
 * in priority order (reflections first, then voice, then video) while every
 * selected week keeps at least one beat.
 */
export const buildFilmTimeline = (input: BuildFilmInput): FilmTimeline => {
  const { firstName, dueLabel, selectedWeeks } = input;
  const allWithContent = weeksWithContent(input.weeks);
  const selection = selectedWeeks ? new Set(selectedWeeks) : null;
  const weeks = selection
    ? allWithContent.filter((w) => selection.has(w.week))
    : allWithContent;

  const includedWeeks = weeks.map((w) => w.week);

  if (weeks.length === 0) {
    return {
      beats: [],
      totalSeconds: 0,
      includedWeeks: [],
      excludedForCap: [],
      sparse: true,
    };
  }

  const firstWeek = includedWeeks[0];
  const lastWeek = includedWeeks[includedWeeks.length - 1];

  const cover: DraftBeat = {
    id: "cover",
    kind: "cover",
    week: null,
    durationSeconds: FILM_DURATIONS.cover,
    title: firstName ? `${firstName}'s pregnancy` : "A pregnancy, kept",
    subtitle: `Week ${firstWeek} to week ${lastWeek}`,
    priority: 0,
  } as DraftBeat;

  const ending: DraftBeat = {
    id: "ending",
    kind: "ending",
    week: null,
    durationSeconds: FILM_DURATIONS.ending,
    title: "Kept, week by week",
    subtitle: dueLabel ? `Due ${dueLabel}` : null,
    priority: 0,
  } as DraftBeat;

  const middle: DraftBeat[] = [];
  let lastTrimester: 1 | 2 | 3 | null = null;

  weeks.forEach((w) => {
    const trimester = trimesterForWeek(w.week);
    if (trimester !== lastTrimester) {
      lastTrimester = trimester;
      middle.push({
        id: `chapter-${trimester}`,
        kind: "chapter",
        week: null,
        durationSeconds: FILM_DURATIONS.chapter,
        trimester,
        title: TRIMESTER_TITLE[trimester],
        priority: 2,
      } as DraftBeat);
    }

    const photoUrl = w.photo?.url ?? null;
    const weekBeats: DraftBeat[] = [];

    if (photoUrl) {
      weekBeats.push({
        id: `photo-${w.week}`,
        kind: "photo",
        week: w.week,
        durationSeconds: FILM_DURATIONS.photo,
        url: photoUrl,
        caption: w.photo?.caption ?? null,
        priority: 0,
      } as DraftBeat);
    }

    if (w.video?.url) {
      weekBeats.push({
        id: `video-${w.week}`,
        kind: "video",
        week: w.week,
        durationSeconds: clampDuration(
          w.video.durationSeconds,
          FILM_DURATIONS.videoDefault,
          FILM_DURATIONS.videoMax,
        ),
        url: w.video.url,
        caption: w.video.caption ?? null,
        mimeType: w.video.mimeType ?? null,
        fallbackPhotoUrl: photoUrl,
        priority: photoUrl ? 4 : 0,
      } as DraftBeat);
    }

    if (w.voice?.url) {
      weekBeats.push({
        id: `voice-${w.week}`,
        kind: "voice",
        week: w.week,
        durationSeconds: clampDuration(
          w.voice.durationSeconds,
          FILM_DURATIONS.voiceDefault,
          FILM_DURATIONS.voiceMax,
        ),
        url: w.voice.url,
        caption: w.voice.caption ?? null,
        mimeType: w.voice.mimeType ?? null,
        backdropPhotoUrl: photoUrl,
        priority: weekBeats.length > 0 ? 5 : 0,
      } as DraftBeat);
    }

    const excerpt = w.reflection ? reflectionExcerpt(w.reflection) : "";
    if (excerpt.length > 0) {
      weekBeats.push({
        id: `reflection-${w.week}`,
        kind: "reflection",
        week: w.week,
        durationSeconds: FILM_DURATIONS.reflection,
        excerpt,
        priority: weekBeats.length > 0 ? 6 : 0,
      } as DraftBeat);
    }

    // A week with no visual or audio beat still gets its label card.
    if (weekBeats.length === 0) return;

    // Only lead with a standalone week label when the first beat is not a photo,
    // because photo beats carry the week label in their own overlay.
    if (weekBeats[0].kind !== "photo") {
      middle.push({
        id: `weekLabel-${w.week}`,
        kind: "weekLabel",
        week: w.week,
        durationSeconds: FILM_DURATIONS.weekLabel,
        label: `Week ${w.week}`,
        priority: 3,
      } as DraftBeat);
    }

    middle.push(...weekBeats);
  });

  // ── Cap enforcement ───────────────────────────────────────────────────────
  const fixedSeconds = cover.durationSeconds + ending.durationSeconds;
  const totalOf = (list: DraftBeat[]) =>
    list.reduce((sum, b) => sum + b.durationSeconds, fixedSeconds);

  let kept = middle;
  const excludedForCap = new Set<number>();

  // Drop optional beats highest-priority-number first, never removing the last
  // remaining content beat for a week.
  for (const dropPriority of [6, 5, 4, 3, 2]) {
    if (totalOf(kept) <= FILM_HARD_CAP_SECONDS) break;
    const next: DraftBeat[] = [];
    for (const beat of kept) {
      if (totalOf(next.concat(kept.slice(next.length))) <= FILM_HARD_CAP_SECONDS) {
        next.push(beat);
        continue;
      }
      const isOptional = beat.priority === dropPriority && beat.priority > 0;
      if (isOptional) {
        if (beat.week !== null) excludedForCap.add(beat.week);
        continue;
      }
      next.push(beat);
    }
    kept = next;
  }

  // Final safety: if still over cap, trim trailing optional beats.
  while (totalOf(kept) > FILM_HARD_CAP_SECONDS) {
    const idx = [...kept].reverse().findIndex((b) => b.priority > 0);
    if (idx === -1) break;
    const removeAt = kept.length - 1 - idx;
    const removed = kept[removeAt];
    if (removed.week !== null) excludedForCap.add(removed.week);
    kept = kept.filter((_, i) => i !== removeAt);
  }

  // Remove orphaned chapter and label cards left behind by dropped content.
  const finalMiddle = kept.filter((beat, i) => {
    if (beat.kind !== "chapter" && beat.kind !== "weekLabel") return true;
    const next = kept[i + 1];
    if (!next) return false;
    if (beat.kind === "weekLabel") return next.week === beat.week;
    return next.kind !== "chapter";
  });

  const ordered = [cover, ...finalMiddle, ending];

  let cursor = 0;
  const beats: FilmBeat[] = ordered.map((draft) => {
    const { priority: _priority, ...rest } = draft;
    const beat = { ...rest, startSeconds: Math.round(cursor * 10) / 10 } as FilmBeat;
    cursor += draft.durationSeconds;
    return beat;
  });

  const totalSeconds = Math.round(cursor * 10) / 10;

  const contentWeeks = new Set(
    beats.filter((b) => b.week !== null).map((b) => b.week as number),
  );

  return {
    beats,
    totalSeconds,
    includedWeeks: [...contentWeeks].sort((a, b) => a - b),
    excludedForCap: [...excludedForCap].sort((a, b) => a - b),
    sparse:
      contentWeeks.size < FILM_SPARSE_WEEK_THRESHOLD ||
      totalSeconds < FILM_TARGET_MIN_SECONDS,
  };
};

/** Format a film length as `0:45`. Display only. */
export const formatFilmLength = (seconds: number): string => {
  const total = Math.max(0, Math.round(seconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

/** Index of the beat covering `elapsed`, clamped to the timeline. */
export const beatIndexAt = (beats: FilmBeat[], elapsed: number): number => {
  if (beats.length === 0) return -1;
  for (let i = beats.length - 1; i >= 0; i--) {
    if (elapsed >= beats[i].startSeconds) return i;
  }
  return 0;
};
