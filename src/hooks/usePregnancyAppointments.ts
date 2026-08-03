import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Appointment,
  AppointmentDraft,
  cleanDraft,
  groupAppointments,
  nextUpcoming,
} from "@/lib/appointmentSchema";

const table = () => supabase.from("pregnancy_appointments");

export type ListLoadState = "loading" | "loaded" | "error";
export type SaveState = "idle" | "saving" | "saved" | "error";

export interface UseAppointmentsResult {
  loadState: ListLoadState;
  rows: Appointment[];
  errorMessage: string | null;
  reload: () => void;
}

export const useAppointments = (): UseAppointmentsResult => {
  const [loadState, setLoadState] = useState<ListLoadState>("loading");
  const [rows, setRows] = useState<Appointment[]>([]);
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
          setErrorMessage("You need to be signed in to view your appointments.");
        }
        return;
      }
      const { data, error } = await table()
        .select("*")
        .eq("user_id", userId)
        .order("appointment_at", { ascending: false, nullsFirst: false });
      if (cancelled) return;
      if (error) {
        setLoadState("error");
        setErrorMessage("We couldn't load your appointments just now.");
        return;
      }
      setRows(((data as Appointment[] | null) ?? []));
      setLoadState("loaded");
    })();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  return {
    loadState,
    rows,
    errorMessage,
    reload: () => setTick((n) => n + 1),
  };
};

export interface AppointmentsSummary {
  loading: boolean;
  hasRows: boolean;
  total: number;
  next: Appointment | null;
}

export const useAppointmentsSummary = (): AppointmentsSummary => {
  const { loadState, rows } = useAppointments();
  return useMemo(
    () => ({
      loading: loadState === "loading",
      hasRows: rows.length > 0,
      total: rows.length,
      next: nextUpcoming(rows),
    }),
    [loadState, rows]
  );
};

export type SingleLoadState = "loading" | "loaded" | "notfound" | "error";

export interface UseAppointmentResult {
  loadState: SingleLoadState;
  saveState: SaveState;
  row: Appointment | null;
  errorMessage: string | null;
  create: (draft: AppointmentDraft) => Promise<Appointment | null>;
  update: (id: string, draft: AppointmentDraft) => Promise<Appointment | null>;
  remove: (id: string) => Promise<boolean>;
  reload: () => void;
}

export const useAppointment = (id: string | undefined): UseAppointmentResult => {
  const [loadState, setLoadState] = useState<SingleLoadState>(id ? "loading" : "loaded");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [row, setRow] = useState<Appointment | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!id) {
      setLoadState("loaded");
      setRow(null);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoadState("loading");
      setErrorMessage(null);
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) {
        if (!cancelled) {
          setLoadState("error");
          setErrorMessage("You need to be signed in to view this appointment.");
        }
        return;
      }
      const { data, error } = await table()
        .select("*")
        .eq("id", id)
        .eq("user_id", userId)
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        setLoadState("error");
        setErrorMessage("We couldn't load this appointment.");
        return;
      }
      const r = (data as Appointment | null) ?? null;
      setRow(r);
      setLoadState(r ? "loaded" : "notfound");
    })();
    return () => {
      cancelled = true;
    };
  }, [id, tick]);

  const create = useCallback(async (draft: AppointmentDraft) => {
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
      setErrorMessage("We couldn't save this appointment.");
      return null;
    }
    setRow(data as Appointment);
    setSaveState("saved");
    return data as Appointment;
  }, []);

  const update = useCallback(async (rowId: string, draft: AppointmentDraft) => {
    setSaveState("saving");
    setErrorMessage(null);
    const cleaned = cleanDraft(draft);
    const { data, error } = await table()
      .update(cleaned)
      .eq("id", rowId)
      .select("*")
      .single();
    if (error) {
      setSaveState("error");
      setErrorMessage("We couldn't save your changes.");
      return null;
    }
    setRow(data as Appointment);
    setSaveState("saved");
    return data as Appointment;
  }, []);

  const remove = useCallback(async (rowId: string) => {
    setSaveState("saving");
    setErrorMessage(null);
    const { error } = await table().delete().eq("id", rowId);
    if (error) {
      setSaveState("error");
      setErrorMessage("We couldn't delete this appointment.");
      return false;
    }
    setSaveState("saved");
    return true;
  }, []);

  return {
    loadState,
    saveState,
    row,
    errorMessage,
    create,
    update,
    remove,
    reload: () => setTick((n) => n + 1),
  };
};

export { groupAppointments };
