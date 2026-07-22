import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  BirthPlanAnswers,
  BirthPlanRow,
  calculateCompletion,
} from "@/lib/birthPlanSchema";

// Supabase generated types may not yet include the birth_plans table.
// Cast at the boundary; RLS scopes rows to auth.uid() regardless.
const table = () => (supabase.from as any)("birth_plans");

export type BirthPlanLoadState = "loading" | "loaded" | "error";
export type BirthPlanSaveState = "idle" | "saving" | "saved" | "error";

export interface UseBirthPlanResult {
  loadState: BirthPlanLoadState;
  saveState: BirthPlanSaveState;
  row: BirthPlanRow | null;
  answers: BirthPlanAnswers;
  completion: number;
  updatedAt: string | null;
  errorMessage: string | null;
  saveAnswers: (next: BirthPlanAnswers) => Promise<void>;
  reload: () => void;
}

export const useBirthPlan = (): UseBirthPlanResult => {
  const [loadState, setLoadState] = useState<BirthPlanLoadState>("loading");
  const [saveState, setSaveState] = useState<BirthPlanSaveState>("idle");
  const [row, setRow] = useState<BirthPlanRow | null>(null);
  const [answers, setAnswers] = useState<BirthPlanAnswers>({});
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
          setErrorMessage("You need to be signed in to view your birth plan.");
        }
        return;
      }
      const { data, error } = await table()
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        setLoadState("error");
        setErrorMessage("We couldn't load your birth plan just now.");
        return;
      }
      const r = (data as BirthPlanRow | null) ?? null;
      setRow(r);
      setAnswers(r?.answers ?? {});
      setLoadState("loaded");
    })();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  const saveAnswers = useCallback(
    async (next: BirthPlanAnswers) => {
      setSaveState("saving");
      setErrorMessage(null);
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) {
        setSaveState("error");
        setErrorMessage("You need to be signed in to save your birth plan.");
        return;
      }
      const completion = calculateCompletion(next);
      const payload = {
        user_id: userId,
        answers: next,
        completion,
      };
      const { data, error } = await table()
        .upsert(payload, { onConflict: "user_id" })
        .select("*")
        .maybeSingle();
      if (error) {
        setSaveState("error");
        setErrorMessage("We couldn't save your changes. Please try again.");
        return;
      }
      const r = (data as BirthPlanRow | null) ?? null;
      setRow(r);
      setAnswers(r?.answers ?? next);
      setSaveState("saved");
      window.setTimeout(() => {
        setSaveState((s) => (s === "saved" ? "idle" : s));
      }, 1600);
    },
    []
  );

  const reload = useCallback(() => setTick((n) => n + 1), []);

  const completion = row?.completion ?? calculateCompletion(answers);

  return {
    loadState,
    saveState,
    row,
    answers,
    completion,
    updatedAt: row?.updated_at ?? null,
    errorMessage,
    saveAnswers,
    reload,
  };
};

/**
 * Lightweight read-only hook for the toolkit hub. Returns null row when
 * no plan exists yet so hub cards can render "Not started" honestly
 * without creating a row.
 */
export const useBirthPlanSummary = () => {
  const [loading, setLoading] = useState(true);
  const [row, setRow] = useState<BirthPlanRow | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) {
        if (!cancelled) setLoading(false);
        return;
      }
      const { data } = await table()
        .select("id, completion, updated_at")
        .eq("user_id", userId)
        .maybeSingle();
      if (cancelled) return;
      setRow((data as BirthPlanRow | null) ?? null);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { loading, row };
};
