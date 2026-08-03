import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  MidwifeQuestion,
  MidwifeQuestionDraft,
  cleanDraft,
  isDraftSaveable,
} from "@/lib/midwifeQuestionsSchema";
import type { Appointment } from "@/lib/appointmentSchema";

const table = () => supabase.from("midwife_questions");
const appointmentsTable = () => supabase.from("pregnancy_appointments");

export type ListLoadState = "loading" | "loaded" | "error";
export type SaveState = "idle" | "saving" | "saved" | "error";

export interface OwnedAppointmentOption {
  id: string;
  label: string;
}

export interface UseMidwifeQuestionsResult {
  loadState: ListLoadState;
  rows: MidwifeQuestion[];
  saveState: SaveState;
  errorMessage: string | null;
  appointments: OwnedAppointmentOption[];
  create: (draft: MidwifeQuestionDraft) => Promise<MidwifeQuestion | null>;
  update: (
    id: string,
    draft: MidwifeQuestionDraft,
  ) => Promise<MidwifeQuestion | null>;
  remove: (id: string) => Promise<boolean>;
  toggleAnswered: (id: string, answered: boolean) => Promise<boolean>;
  toggleFollowUp: (id: string, followUp: boolean) => Promise<boolean>;
  updateAnswerNotes: (id: string, notes: string | null) => Promise<boolean>;
  reload: () => void;
}

const sortNewest = (rows: MidwifeQuestion[]): MidwifeQuestion[] =>
  [...rows].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

const appointmentLabel = (a: Appointment): string => {
  const parts: string[] = [];
  if (a.appointment_type) parts.push(a.appointment_type);
  if (a.appointment_at) {
    const d = new Date(a.appointment_at);
    if (!Number.isNaN(d.getTime())) {
      parts.push(
        d.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      );
    }
  } else if (a.week != null) {
    parts.push(`Week ${a.week}`);
  }
  return parts.length > 0 ? parts.join(" · ") : "Appointment";
};

export const useMidwifeQuestions = (): UseMidwifeQuestionsResult => {
  const [loadState, setLoadState] = useState<ListLoadState>("loading");
  const [rows, setRows] = useState<MidwifeQuestion[]>([]);
  const [appointments, setAppointments] = useState<OwnedAppointmentOption[]>(
    [],
  );
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
          setErrorMessage("You need to be signed in to view your questions.");
        }
        return;
      }
      const [{ data, error }, appts] = await Promise.all([
        table()
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false }),
        appointmentsTable()
          .select("id, appointment_type, appointment_at, week")
          .eq("user_id", userId)
          .order("appointment_at", { ascending: false, nullsFirst: false }),
      ]);
      if (cancelled) return;
      if (error) {
        setLoadState("error");
        setErrorMessage("We couldn't load your questions just now.");
        return;
      }
      setRows((data as MidwifeQuestion[] | null) ?? []);
      const apptRows = (appts?.data as Appointment[] | null) ?? [];
      setAppointments(
        apptRows.map((a) => ({ id: a.id, label: appointmentLabel(a) })),
      );
      setLoadState("loaded");
    })();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  const create = useCallback(async (draft: MidwifeQuestionDraft) => {
    if (!isDraftSaveable(draft)) {
      setSaveState("error");
      setErrorMessage("Add a question and choose a category before saving.");
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
      setErrorMessage("We couldn't save your question.");
      return null;
    }
    const row = data as MidwifeQuestion;
    setRows((prev) => sortNewest([row, ...prev]));
    setSaveState("saved");
    return row;
  }, []);

  const update = useCallback(
    async (id: string, draft: MidwifeQuestionDraft) => {
      if (!isDraftSaveable(draft)) {
        setSaveState("error");
        setErrorMessage("Add a question and choose a category before saving.");
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
      const row = data as MidwifeQuestion;
      setRows((prev) =>
        sortNewest(prev.map((r) => (r.id === row.id ? row : r))),
      );
      setSaveState("saved");
      return row;
    },
    [],
  );

  const remove = useCallback(async (id: string) => {
    setSaveState("saving");
    setErrorMessage(null);
    const { error } = await table().delete().eq("id", id);
    if (error) {
      setSaveState("error");
      setErrorMessage("We couldn't delete this question.");
      return false;
    }
    setRows((prev) => prev.filter((r) => r.id !== id));
    setSaveState("saved");
    return true;
  }, []);

  const patch = useCallback(
    async (id: string, patchObj: Partial<MidwifeQuestion>) => {
      setSaveState("saving");
      setErrorMessage(null);
      const { data, error } = await table()
        .update(patchObj)
        .eq("id", id)
        .select("*")
        .single();
      if (error) {
        setSaveState("error");
        setErrorMessage("We couldn't save that change.");
        return false;
      }
      const row = data as MidwifeQuestion;
      setRows((prev) =>
        sortNewest(prev.map((r) => (r.id === row.id ? row : r))),
      );
      setSaveState("saved");
      return true;
    },
    [],
  );

  const toggleAnswered = useCallback(
    (id: string, answered: boolean) => patch(id, { answered }),
    [patch],
  );
  const toggleFollowUp = useCallback(
    (id: string, follow_up: boolean) => patch(id, { follow_up }),
    [patch],
  );
  const updateAnswerNotes = useCallback(
    (id: string, notes: string | null) => {
      const value = notes && notes.trim().length > 0 ? notes.trim() : null;
      return patch(id, { answer_notes: value });
    },
    [patch],
  );

  return {
    loadState,
    rows,
    saveState,
    errorMessage,
    appointments,
    create,
    update,
    remove,
    toggleAnswered,
    toggleFollowUp,
    updateAnswerNotes,
    reload: () => setTick((n) => n + 1),
  };
};

export interface MidwifeQuestionsSummary {
  loading: boolean;
  hasRows: boolean;
  total: number;
  openTotal: number;
  lastQuestionAt: string | null;
}

export const useMidwifeQuestionsSummary = (): MidwifeQuestionsSummary => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<MidwifeQuestion[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) {
        if (!cancelled) {
          setRows([]);
          setLoading(false);
        }
        return;
      }
      const { data } = await table()
        .select("id, answered, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (cancelled) return;
      setRows((data as MidwifeQuestion[] | null) ?? []);
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
      openTotal: rows.filter((r) => !r.answered).length,
      lastQuestionAt: rows[0]?.created_at ?? null,
    }),
    [loading, rows],
  );
};
