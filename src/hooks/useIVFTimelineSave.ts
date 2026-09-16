import { useCallback, useEffect, useRef, useState } from "react";
import {
  clearIVFTimelineContext,
  loadIVFTimelineContext,
  saveIVFTimelineContext,
  type IVFTimelineWriteResult,
} from "@/lib/savedTTCJourney";
import {
  formatIVFTransferDate,
  isValidNewIVFTransferDate,
  parseIVFTransferDate,
  type IVFTransferType,
} from "@/lib/ivfTimeline";
import { useLifecycle } from "@/lib/useLifecycle";

/**
 * Phase 34H.1 — the IVF timeline save state machine.
 *
 * This hook is only ever called from the feature controller, which itself is
 * mounted only while `IVF_TIMELINE_SAVE_ENABLED` is true. While the flag is
 * off the controller does not mount, so this hook never runs and the
 * persistence helpers are never called.
 *
 * It owns authentication, lifecycle, the saved-context read, the comparison
 * against the current calculation, and the save/update/remove writes. It never
 * writes on its own: every write comes from an explicit user action.
 */

export type IVFTimelineCurrent = { date: Date; type: IVFTransferType } | null;

export type IVFSavedContext = { transfer_date: string; transfer_type: IVFTransferType };

export type IVFWriteState = "idle" | "saving" | "updating" | "removing";

export type IVFJourneyState = "unknown" | "has_ttc" | "no_ttc";

export type IVFTimelineSaveApi = {
  loading: boolean;
  authed: boolean;
  lifecycle: "pregnancy" | "ttc" | "first_year" | null;
  journeyState: IVFJourneyState;
  saved: IVFSavedContext | null;
  /** The saved context is outside the calculator's current entry window. */
  savedIsHistorical: boolean;
  /** Saved values are exactly what is on screen right now. */
  savedMatchesCurrent: boolean;
  writeState: IVFWriteState;
  status: string | null;
  error: string | null;
  save: () => void;
  remove: () => void;
};

const GENERIC_ERROR = "Something went wrong. Please try again.";

const messageForWriteFailure = (result: Extract<IVFTimelineWriteResult, { ok: false }>): string => {
  switch (result.reason) {
    case "not_authenticated":
      return "You need to be signed in to change your saved timeline.";
    case "no_ttc_journey":
      return "Saving is connected to a Trying to Conceive journey.";
    default:
      // Never surface database text, identifiers or treatment values.
      return GENERIC_ERROR;
  }
};

export const useIVFTimelineSave = (options: {
  current: IVFTimelineCurrent;
  /** Called at most once, to reconstruct a saved timeline when nothing is on screen. */
  onRestore?: (restored: { date: Date; type: IVFTransferType }) => void;
}): IVFTimelineSaveApi => {
  const { current, onRestore } = options;
  const { authed, lifecycle, loading: lifecycleLoading } = useLifecycle();

  const [loadingContext, setLoadingContext] = useState(true);
  const [journeyState, setJourneyState] = useState<IVFJourneyState>("unknown");
  const [saved, setSaved] = useState<IVFSavedContext | null>(null);
  const [writeState, setWriteState] = useState<IVFWriteState>("idle");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // The current calculation is read through a ref at the moment an async load
  // resolves, so a timeline the person calculated while the read was in flight
  // is never replaced by an older stored one.
  const currentRef = useRef<IVFTimelineCurrent>(current);
  currentRef.current = current;
  const restoredRef = useRef(false);
  const writingRef = useRef(false);
  const onRestoreRef = useRef(onRestore);
  onRestoreRef.current = onRestore;

  useEffect(() => {
    if (lifecycleLoading) return;
    if (!authed) {
      setLoadingContext(false);
      setJourneyState("unknown");
      setSaved(null);
      return;
    }

    let cancelled = false;
    setLoadingContext(true);

    void loadIVFTimelineContext().then((result) => {
      if (cancelled) return;
      setLoadingContext(false);

      if (!result.ok) {
        if (result.reason === "no_ttc_journey") {
          setJourneyState("no_ttc");
          setSaved(null);
          return;
        }
        if (result.reason === "not_authenticated") {
          setJourneyState("unknown");
          setSaved(null);
          return;
        }
        setError(GENERIC_ERROR);
        return;
      }

      setJourneyState("has_ttc");
      const { transfer_date: date, transfer_type: type } = result.context;
      if (!date || !type) {
        setSaved(null);
        return;
      }
      setSaved({ transfer_date: date, transfer_type: type });

      // Restore only when nothing is currently displayed AT THIS MOMENT, the
      // person is actively trying to conceive, and the saved date is still
      // inside the calculator's active range. Historical context is shown as
      // history instead, never as a current treatment timeline.
      if (restoredRef.current) return;
      if (currentRef.current) return;
      if (lifecycle !== "ttc") return;
      if (!isValidNewIVFTransferDate(date)) return;
      const parsed = parseIVFTransferDate(date);
      if (!parsed) return;
      restoredRef.current = true;
      onRestoreRef.current?.({ date: parsed, type });
    });

    return () => {
      cancelled = true;
    };
  }, [authed, lifecycle, lifecycleLoading]);

  const savedIsHistorical = Boolean(saved && !isValidNewIVFTransferDate(saved.transfer_date));

  const savedMatchesCurrent = Boolean(
    saved &&
      current &&
      saved.transfer_type === current.type &&
      saved.transfer_date === formatIVFTransferDate(current.date),
  );

  const save = useCallback(() => {
    if (writingRef.current) return;
    const value = currentRef.current;
    if (!value) return;
    writingRef.current = true;
    setError(null);
    const updating = Boolean(saved);
    setWriteState(updating ? "updating" : "saving");
    setStatus(updating ? "Updating your saved timeline" : "Saving your timeline");

    void saveIVFTimelineContext({
      transfer_date: formatIVFTransferDate(value.date),
      transfer_type: value.type,
    })
      .then((result) => {
        if (result.ok) {
          setSaved({
            transfer_date: formatIVFTransferDate(value.date),
            transfer_type: value.type,
          });
          setStatus("Timeline saved");
          if (journeyState !== "has_ttc") setJourneyState("has_ttc");
          return;
        }
        if (result.reason === "no_ttc_journey") setJourneyState("no_ttc");
        setStatus(null);
        setError(messageForWriteFailure(result));
      })
      .catch(() => {
        setStatus(null);
        setError(GENERIC_ERROR);
      })
      .finally(() => {
        writingRef.current = false;
        setWriteState("idle");
      });
  }, [journeyState, saved]);

  const remove = useCallback(() => {
    if (writingRef.current) return;
    writingRef.current = true;
    setError(null);
    setWriteState("removing");
    setStatus("Removing your saved timeline");

    void clearIVFTimelineContext()
      .then((result) => {
        if (result.ok) {
          setSaved(null);
          setStatus("Saved timeline removed");
          return;
        }
        if (result.reason === "no_ttc_journey") setJourneyState("no_ttc");
        setStatus(null);
        setError(messageForWriteFailure(result));
      })
      .catch(() => {
        setStatus(null);
        setError(GENERIC_ERROR);
      })
      .finally(() => {
        writingRef.current = false;
        setWriteState("idle");
      });
  }, []);

  return {
    loading: lifecycleLoading || (authed && loadingContext),
    authed,
    lifecycle,
    journeyState,
    saved,
    savedIsHistorical,
    savedMatchesCurrent,
    writeState,
    status,
    error,
    save,
    remove,
  };
};
