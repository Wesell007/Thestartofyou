import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  calculateProgress,
  HospitalBagCategoryKey,
  HospitalBagItemRow,
  HospitalBagProgress,
  HOSPITAL_BAG_DEFAULTS,
  slugifyCustomLabel,
  statusFromProgress,

} from "@/lib/hospitalBagSchema";

// Supabase generated types may not yet include hospital_bag_items.
// Cast at the boundary; RLS scopes rows to auth.uid() regardless.
const table = () => (supabase.from as any)("hospital_bag_items");

export type HospitalBagLoadState = "loading" | "seeding" | "loaded" | "error";
export type HospitalBagSaveState = "idle" | "saving" | "saved" | "error";

export interface UseHospitalBagResult {
  loadState: HospitalBagLoadState;
  saveState: HospitalBagSaveState;
  rows: HospitalBagItemRow[];
  progress: HospitalBagProgress;
  updatedAt: string | null;
  errorMessage: string | null;
  togglePacked: (id: string) => Promise<void>;
  addCustomItem: (
    category: HospitalBagCategoryKey,
    label: string,
  ) => Promise<void>;
  deleteCustomItem: (id: string) => Promise<void>;
  reload: () => void;
}

const sortRows = (rows: HospitalBagItemRow[]): HospitalBagItemRow[] =>
  [...rows].sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
    return a.label.localeCompare(b.label);
  });

export const useHospitalBag = (): UseHospitalBagResult => {
  const [loadState, setLoadState] = useState<HospitalBagLoadState>("loading");
  const [saveState, setSaveState] = useState<HospitalBagSaveState>("idle");
  const [rows, setRows] = useState<HospitalBagItemRow[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadState("loading");
      setErrorMessage(null);
      const { data: sessionData } = await supabase.auth.getSession();
      const uid = sessionData.session?.user?.id ?? null;
      if (!uid) {
        if (!cancelled) {
          setLoadState("error");
          setErrorMessage("You need to be signed in to view your hospital bag.");
        }
        return;
      }
      if (!cancelled) setUserId(uid);
      const { data, error } = await table()
        .select("*")
        .eq("user_id", uid);
      if (cancelled) return;
      if (error) {
        setLoadState("error");
        setErrorMessage("We couldn't open your hospital bag just now.");
        return;
      }
      const existing = (data as HospitalBagItemRow[] | null) ?? [];
      if (existing.length === 0) {
        setLoadState("seeding");
        const seedPayload = HOSPITAL_BAG_DEFAULTS.map((d) => ({
          user_id: uid,
          category: d.category,
          item_key: d.item_key,
          label: d.label,
          is_custom: false,
          sort_order: d.sort_order,
        }));
        const { data: seeded, error: seedError } = await table()
          .upsert(seedPayload, { onConflict: "user_id,category,item_key" })
          .select("*");
        if (cancelled) return;
        if (seedError) {
          setLoadState("error");
          setErrorMessage("We couldn't set up your hospital bag. Please try again.");
          return;
        }
        setRows(sortRows((seeded as HospitalBagItemRow[] | null) ?? []));
        setLoadState("loaded");
        return;
      }
      setRows(sortRows(existing));
      setLoadState("loaded");
    })();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  const flashSaved = useCallback(() => {
    setSaveState("saved");
    window.setTimeout(() => {
      setSaveState((s) => (s === "saved" ? "idle" : s));
    }, 1400);
  }, []);

  const togglePacked = useCallback(
    async (id: string) => {
      const current = rows.find((r) => r.id === id);
      if (!current) return;
      const nextPackedAt = current.packed_at ? null : new Date().toISOString();
      const prev = rows;
      setRows((rs) =>
        rs.map((r) => (r.id === id ? { ...r, packed_at: nextPackedAt } : r)),
      );
      setSaveState("saving");
      setErrorMessage(null);
      const { error } = await table()
        .update({ packed_at: nextPackedAt })
        .eq("id", id);
      if (error) {
        setRows(prev);
        setSaveState("error");
        setErrorMessage("We couldn't save that change. Please try again.");
        return;
      }
      flashSaved();
    },
    [rows, flashSaved],
  );

  const addCustomItem = useCallback(
    async (category: HospitalBagCategoryKey, rawLabel: string) => {
      const label = rawLabel.trim();
      if (!label) return;
      if (!userId) {
        setSaveState("error");
        setErrorMessage("You need to be signed in to add items.");
        return;
      }
      const maxSort = rows
        .filter((r) => r.category === category)
        .reduce((acc, r) => (r.sort_order > acc ? r.sort_order : acc), 0);
      const item_key = slugifyCustomLabel(label);
      setSaveState("saving");
      setErrorMessage(null);
      const { data, error } = await table()
        .insert({
          user_id: userId,
          category,
          item_key,
          label,
          is_custom: true,
          sort_order: maxSort + 10,
        })
        .select("*")
        .maybeSingle();
      if (error || !data) {
        setSaveState("error");
        setErrorMessage("We couldn't add that item. Please try again.");
        return;
      }
      setRows((rs) => sortRows([...rs, data as HospitalBagItemRow]));
      flashSaved();
    },
    [rows, userId, flashSaved],
  );

  const deleteCustomItem = useCallback(
    async (id: string) => {
      const current = rows.find((r) => r.id === id);
      if (!current || !current.is_custom) return;
      const prev = rows;
      setRows((rs) => rs.filter((r) => r.id !== id));
      setSaveState("saving");
      setErrorMessage(null);
      const { error } = await table().delete().eq("id", id);
      if (error) {
        setRows(prev);
        setSaveState("error");
        setErrorMessage("We couldn't remove that item. Please try again.");
        return;
      }
      flashSaved();
    },
    [rows, flashSaved],
  );

  const reload = useCallback(() => setTick((n) => n + 1), []);

  const progress = useMemo(() => calculateProgress(rows), [rows]);
  const updatedAt = useMemo(() => {
    if (rows.length === 0) return null;
    return rows.reduce<string | null>((acc, r) => {
      if (!acc) return r.updated_at;
      return r.updated_at > acc ? r.updated_at : acc;
    }, null);
  }, [rows]);

  return {
    loadState,
    saveState,
    rows,
    progress,
    updatedAt,
    errorMessage,
    togglePacked,
    addCustomItem,
    deleteCustomItem,
    reload,
  };
};

/**
 * Read-only hook for the toolkit hub. Never seeds rows. Returns
 * `hasRows: false` when the user has never opened the tool.
 */
export const useHospitalBagSummary = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<HospitalBagProgress>({
    packed: 0,
    total: 0,
    percent: 0,
    status: "not-started",
  });
  const [hasRows, setHasRows] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const uid = sessionData.session?.user?.id;
      if (!uid) {
        if (!cancelled) setLoading(false);
        return;
      }
      const { data } = await table()
        .select("id, packed_at")
        .eq("user_id", uid);
      if (cancelled) return;
      const list = (data as { id: string; packed_at: string | null }[] | null) ?? [];
      if (list.length > 0) {
        const packed = list.filter((r) => Boolean(r.packed_at)).length;
        const total = list.length;
        const percent = Math.round((packed / total) * 100);
        const { statusFromProgress: sfp } = await import(
          "@/lib/hospitalBagSchema"
        );
        setProgress({
          packed,
          total,
          percent,
          status: sfp(packed, total, true),
        });
        setHasRows(true);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { loading, progress, hasRows };
};
