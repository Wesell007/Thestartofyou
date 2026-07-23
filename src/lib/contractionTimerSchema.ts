export interface ContractionEventRow {
  id: string;
  session_id: string;
  user_id: string;
  started_at: string;
  ended_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContractionSessionRow {
  id: string;
  user_id: string;
  started_at: string;
  ended_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface LocalContractionEvent {
  localId: string;
  startedAt: string;
  endedAt: string | null;
}

export interface LocalContractionDraft {
  sessionStartedAt: string;
  events: LocalContractionEvent[];
  activeStartedAt: string | null;
  notes: string;
}

export const CONTRACTION_DRAFT_KEY = "the-start-of-you:contraction-timer-draft";

export const createEmptyDraft = (): LocalContractionDraft => ({
  sessionStartedAt: new Date().toISOString(),
  events: [],
  activeStartedAt: null,
  notes: "",
});

const pad = (n: number) => n.toString().padStart(2, "0");

export const formatDuration = (ms: number): string => {
  if (!Number.isFinite(ms) || ms < 0) ms = 0;
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${pad(m)}:${pad(s)}`;
};

export const formatGap = (ms: number): string => {
  if (!Number.isFinite(ms) || ms < 0) return "";
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${pad(s)}s`;
};

export const formatClockTime = (iso: string): string => {
  try {
    return new Date(iso).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

export const eventDurationMs = (e: LocalContractionEvent): number => {
  if (!e.endedAt) return 0;
  return new Date(e.endedAt).getTime() - new Date(e.startedAt).getTime();
};

export const gapBetweenMs = (
  prev: LocalContractionEvent,
  next: LocalContractionEvent
): number => new Date(next.startedAt).getTime() - new Date(prev.startedAt).getTime();

export interface DraftSummary {
  completedCount: number;
  hasActive: boolean;
  sessionStartedAt: string;
}

export const summariseDraft = (draft: LocalContractionDraft): DraftSummary => ({
  completedCount: draft.events.filter((e) => e.endedAt !== null).length,
  hasActive: draft.activeStartedAt !== null,
  sessionStartedAt: draft.sessionStartedAt,
});

export interface SavedSessionSummary {
  loading: boolean;
  hasRows: boolean;
  total: number;
  lastSessionAt: string | null;
}
