import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  BabyMovementDraft,
  BabyMovementNote,
  cleanDraft,
  isDraftSaveable,
} from "@/lib/babyMovementSchema";

// Generated Supabase types may not yet include baby_movement_notes.
// Cast at the boundary; RLS scopes rows to auth.uid() regardless.
const table = () => (supabase.from as any)("baby_movement_notes");

export type ListLoadState = "loading" | "loaded" | "error";
export type SaveState = "idle" | "saving" | "saved" | "error";

export interface UseBabyMovementNotesResult {
  loadState: ListLoadState;
  rows: BabyMovementNote[];
  saveState: SaveState;
  errorMessage: string | null;
  create: (draft: BabyMovementDraft) => Promise<BabyMovementNote | null>;
  update: (id: string, draft: BabyMovementDraft) => Promise<BabyMovementNote | null>;
  remove: (id: string) => Promise<boolean>;
  reload: () => void;
}

export const useBabyMovementNotes = (): UseBabyMovementNotesResult => {
  const [loadState, setLoadState] = useState<ListLoadState>("loading");
  const [rows, setRows] = useState<BabyMovementNote[]>([]);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadState("loading");
      setErrorMessage(null);
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) {
        if (!cancelled) {
          setLoadState("error");
          setErrorMessage("You need to be signed in to view your notes.");
        }
        return;
      }
      const { data, error } = await table()
        .select("*")
        .eq("user_id", userId)
        .order("noted_at", { ascending: false });
      if (cancelled) return;
      if (error) {
        setLoadState("error");
        setErrorMessage("We couldn't load your notes just now.");
        return;
      }
      setRows((data as BabyMovementNote[] | null) ?? []);
      setLoadState("loaded");
    })();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  const create = useCallback(async (draft: BabyMovementDraft) => {
    if (!isDraftSaveable(draft)) {
      setSaveState("error");
      setErrorMessage("Add a note or choose a pattern label before saving.");
      return null;
    }
    setSaveState("saving");
    setErrorMessage(null);
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) {
      setSaveState("error");
      setErrorMessage("You need to be signed in to save.");
      return null;
    }
    const cleaned = cleanDraft(draft);
    const { data, error } = await table()
      .insert({ ...cleaned, user_id: userId })
      .select("*")
      .single();
    if (error) {
      setSaveState("error");
      setErrorMessage("We couldn't save your note.");
      return null;
    }
    const row = data as BabyMovementNote;
    setRows((prev) =>
      [row, ...prev].sort(
        (a, b) => new Date(b.noted_at).getTime() - new Date(a.noted_at).getTime()
      )
    );
    setSaveState("saved");
    return row;
  }, []);

  const update = useCallback(async (id: string, draft: BabyMovementDraft) => {
    if (!isDraftSaveable(draft)) {
      setSaveState("error");
      setErrorMessage("Add a note or choose a pattern label before saving.");
      return null;
    }
    setSaveState("saving");
    setErrorMessage(null);
    const cleaned = cleanDraft(draft);
    const { data, error } = await table()
      .update(cleaned)
      .eq("id", id)
      .select("*")
      .single();
    if (error) {
      setSaveState("error");
      setErrorMessage("We couldn't save your changes.");
      return null;
    }
    const row = data as BabyMovementNote;
    setRows((prev) =>
      prev
        .map((r) => (r.id === row.id ? row : r))
        .sort(
          (a, b) => new Date(b.noted_at).getTime() - new Date(a.noted_at).getTime()
        )
    );
    setSaveState("saved");
    return row;
  }, []);

  const remove = useCallback(async (id: string) => {
    setSaveState("saving");
    setErrorMessage(null);
    const { error } = await table().delete().eq("id", id);
    if (error) {
      setSaveState("error");
      setErrorMessage("We couldn't delete this note.");
      return false;
    }
    setRows((prev) => prev.filter((r) => r.id !== id));
    setSaveState("saved");
    return true;
  }, []);

  return {
    loadState,
    rows,
    saveState,
    errorMessage,
    create,
    update,
    remove,
    reload: () => setTick((n) => n + 1),
  };
};

export interface BabyMovementNotesSummary {
  loading: boolean;
  hasRows: boolean;
  total: number;
  lastNoteAt: string | null;
}

export const useBabyMovementNotesSummary = (): BabyMovementNotesSummary => {
  const { loadState, rows } = useBabyMovementNotes();
  return useMemo(
    () => ({
      loading: loadState === "loading",
      hasRows: rows.length > 0,
      total: rows.length,
      lastNoteAt: rows[0]?.noted_at ?? null,
    }),
    [loadState, rows]
  );
};
