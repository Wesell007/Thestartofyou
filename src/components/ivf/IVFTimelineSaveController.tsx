import IVFTimelineSaveArea from "@/components/ivf/IVFTimelineSaveArea";
import {
  useIVFTimelineSave,
  type IVFTimelineCurrent,
} from "@/hooks/useIVFTimelineSave";
import type { IVFTransferType } from "@/lib/ivfTimeline";

/**
 * Phase 34H.1 — the IVF timeline save feature controller.
 *
 * Mounted by `/ivf-timeline` only while `IVF_TIMELINE_SAVE_ENABLED` is true,
 * so the hook below (and therefore every persistence call) simply does not
 * exist while the feature is off. The component boundary is what enforces the
 * flag: no React hook is ever called conditionally.
 *
 * Save and Update are offered only while the active saved lifecycle is `ttc`.
 * Saved context belonging to someone now in pregnancy or their first year, or
 * older than the calculator's entry window, is shown as history and can be
 * removed, but is never presented as an active treatment timeline.
 */

export type IVFTimelineSaveControllerProps = {
  current: IVFTimelineCurrent;
  onRestore: (restored: { date: Date; type: IVFTransferType }) => void;
};

const IVFTimelineSaveController = ({ current, onRestore }: IVFTimelineSaveControllerProps) => {
  const {
    loading,
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
  } = useIVFTimelineSave({ current, onRestore });

  if (loading) return null;

  const shared = {
    writeState,
    status,
    error,
    onSave: save,
    onRemove: remove,
  };

  if (!authed) {
    if (!current) return null;
    return <IVFTimelineSaveArea mode="signed_out" {...shared} />;
  }

  if (journeyState === "no_ttc") {
    if (!current) return null;
    return (
      <IVFTimelineSaveArea mode="no_journey" canStartTTC={lifecycle === null} {...shared} />
    );
  }

  if (journeyState !== "has_ttc") return null;

  const canSave = lifecycle === "ttc";

  // Historical treatment context: outside active TTC, or older than the
  // calculator's entry window with nothing newer on screen.
  if (saved && (!canSave || (savedIsHistorical && !current))) {
    return (
      <IVFTimelineSaveArea
        mode="historical"
        savedDate={saved.transfer_date}
        savedType={saved.transfer_type}
        canRemove
        {...shared}
      />
    );
  }

  if (!canSave) return null;
  if (!current) return null;

  if (saved && savedMatchesCurrent) {
    return <IVFTimelineSaveArea mode="saved" canRemove {...shared} />;
  }

  if (saved) {
    return (
      <IVFTimelineSaveArea
        mode="update"
        savedDate={saved.transfer_date}
        savedType={saved.transfer_type}
        canRemove
        {...shared}
      />
    );
  }

  return <IVFTimelineSaveArea mode="save" {...shared} />;
};

export default IVFTimelineSaveController;
