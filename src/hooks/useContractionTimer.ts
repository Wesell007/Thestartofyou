import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  CONTRACTION_DRAFT_KEY,
  ContractionSessionRow,
  LocalContractionDraft,
  LocalContractionEvent,
  SavedSessionSummary,
  createEmptyDraft,
} from "@/lib/contractionTimerSchema";

// Generated Supabase types may not yet include these tables.
// Cast at the boundary; RLS scopes rows to auth.uid() regardless.
const sessionsTable = () => (supabase.from as any)("contraction_sessions");
const eventsTable = () => (supabase.from as any)("contraction_events");

export type SaveState = "idle" | "saving" | "saved" | "error";

const readDraft = (): LocalContractionDraft => {
  if (typeof window === "undefined") return createEmptyDraft();
  try {
    const raw = window.localStorage.getItem(CONTRACTION_DRAFT_KEY);
    if (!raw) return createEmptyDraft();
    const parsed = JSON.parse(raw) as Partial<LocalContractionDraft>;
    if (!parsed || typeof parsed !== "object") return createEmptyDraft();
    return {
      sessionStartedAt: parsed.sessionStartedAt ?? new Date().toISOString(),
      events: Array.isArray(parsed.events) ? parsed.events : [],
      activeStartedAt: parsed.activeStartedAt ?? null,
      notes: typeof parsed.notes === "string" ? parsed.notes : "",
    };
  } catch {
    return createEmptyDraft();
  }
};

const writeDraft = (draft: LocalContractionDraft) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONTRACTION_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* ignore quota errors */
  }
};

const clearDraftStorage = () => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CONTRACTION_DRAFT_KEY);
  } catch {
    /* ignore */
  }
};

const genLocalId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `local-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export interface UseContractionTimerResult {
  draft: LocalContractionDraft;
  saveState: SaveState;
  errorMessage: string | null;
  startContraction: () => void;
  stopContraction: () => void;
  resetSession: () => void;
  updateNotes: (value: string) => void;
  saveSession: () => Promise<boolean>;
}

export const useContractionTimer = (): UseContractionTimerResult => {
  const [draft, setDraft] = useState<LocalContractionDraft>(() => readDraft());
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (!hydratedRef.current) {
      hydratedRef.current = true;
      return;
    }
    writeDraft(draft);
  }, [draft]);

  const startContraction = useCallback(() => {
    setSaveState("idle");
    setErrorMessage(null);
    setDraft((prev) => {
      if (prev.activeStartedAt) return prev;
      return { ...prev, activeStartedAt: new Date().toISOString() };
    });
  }, []);

  const stopContraction = useCallback(() => {
    setSaveState("idle");
    setErrorMessage(null);
    setDraft((prev) => {
      if (!prev.activeStartedAt) return prev;
      const event: LocalContractionEvent = {
        localId: genLocalId(),
        startedAt: prev.activeStartedAt,
        endedAt: new Date().toISOString(),
      };
      return { ...prev, activeStartedAt: null, events: [...prev.events, event] };
    });
  }, []);

  const resetSession = useCallback(() => {
    setSaveState("idle");
    setErrorMessage(null);
    const fresh = createEmptyDraft();
    setDraft(fresh);
    clearDraftStorage();
  }, []);

  const updateNotes = useCallback((value: string) => {
    setDraft((prev) => ({ ...prev, notes: value }));
  }, []);

  const saveSession = useCallback(async () => {
    setErrorMessage(null);
    if (draft.activeStartedAt) {
      setSaveState("error");
      setErrorMessage(
        "Stop the current contraction before saving this session."
      );
      return false;
    }
    const completed = draft.events.filter((e) => e.endedAt !== null);
    if (completed.length === 0) {
      setSaveState("error");
      setErrorMessage("Time at least one contraction before saving.");
      return false;
    }
    setSaveState("saving");
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) {
      setSaveState("error");
      setErrorMessage("You need to be signed in to save.");
      return false;
    }

    const startedAt = draft.sessionStartedAt;
    const endedAt = completed[completed.length - 1].endedAt ?? new Date().toISOString();
    const notes = draft.notes.trim() ? draft.notes.trim() : null;

    const { data: sessionRow, error: sessionError } = await sessionsTable()
      .insert({
        user_id: userId,
        started_at: startedAt,
        ended_at: endedAt,
        notes,
      })
      .select("*")
      .single();

    if (sessionError || !sessionRow) {
      setSaveState("error");
      setErrorMessage("We couldn't save this session.");
      return false;
    }

    const session = sessionRow as ContractionSessionRow;
    const eventRows = completed.map((e) => ({
      session_id: session.id,
      user_id: userId,
      started_at: e.startedAt,
      ended_at: e.endedAt,
    }));

    const { error: eventsError } = await eventsTable().insert(eventRows);
    if (eventsError) {
      setSaveState("error");
      setErrorMessage("We saved the session but couldn't save the contractions.");
      return false;
    }

    clearDraftStorage();
    setDraft(createEmptyDraft());
    setSaveState("saved");
    return true;
  }, [draft]);

  return {
    draft,
    saveState,
    errorMessage,
    startContraction,
    stopContraction,
    resetSession,
    updateNotes,
    saveSession,
  };
};

export const useContractionSessionsSummary = (): SavedSessionSummary => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<ContractionSessionRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) {
        if (!cancelled) {
          setRows([]);
          setLoading(false);
        }
        return;
      }
      const { data } = await sessionsTable()
        .select("id, started_at")
        .eq("user_id", userId)
        .order("started_at", { ascending: false })
        .limit(50);
      if (cancelled) return;
      setRows((data as ContractionSessionRow[] | null) ?? []);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return useMemo(
    () => ({
      loading,
      hasRows: rows.length > 0,
      total: rows.length,
      lastSessionAt: rows[0]?.started_at ?? null,
    }),
    [loading, rows]
  );
};
