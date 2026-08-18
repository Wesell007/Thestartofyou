import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  validateCareEventDraft,
  type AmountUnit,
  type CareEvent,
  type CareEventDraft,
  type CareEventPayload,
  type FeedSide,
  type QuickAddType,
} from "@/lib/firstYearCareEventsSchema";
import FeedSheet from "@/components/firstyear/today/FeedSheet";
import SleepSheet from "@/components/firstyear/today/SleepSheet";
import NappySheet from "@/components/firstyear/today/NappySheet";
import MomentSheet from "@/components/firstyear/today/MomentSheet";
import type { SheetContext } from "@/components/firstyear/today/sheetControls";
import type { BabyRecord } from "@/lib/firstYearJourney";

type Props = {
  open: boolean;
  eventType: QuickAddType;
  /** Present when an existing moment is being edited. */
  editing: CareEvent | null;
  babies: BabyRecord[];
  babyId: string | null;
  unit: AmountUnit;
  onUnitChange: (unit: AmountUnit) => void;
  onClose: () => void;
  onSubmit: (payload: CareEventPayload) => Promise<void>;
  onStartSleep: (babyId: string) => Promise<void>;
  onStartBreastFeed: (babyId: string, side: FeedSide) => Promise<void>;
  /** Baby ids that already have something running. */
  runningSleepBabyIds: string[];
  runningFeedBabyIds: string[];
  onError: (message: string) => void;
};

const TITLES: Record<QuickAddType, string> = {
  feed: "Add a feed",
  sleep: "Add sleep",
  nappy: "Add a nappy",
  note: "Add a moment",
};

const EDIT_TITLES: Record<QuickAddType, string> = {
  feed: "Edit feed",
  sleep: "Edit sleep",
  nappy: "Edit nappy",
  note: "Edit moment",
};

const DESCRIPTIONS: Record<QuickAddType, string> = {
  feed: "Choose breast or bottle, then add anything useful. The rest is optional and stays private to you.",
  sleep: "Start a timer or add the times you remember. The rest is optional and stays private to you.",
  nappy: "Choose what was in the nappy, then add anything useful. The rest is optional and stays private to you.",
  note: "Add a few words for something you want to remember from today.",
};

/**
 * The shell around each logging sheet. It holds the baby choice, validates
 * the draft and hands a clean payload back to the page.
 */
const LogSheet = ({
  open,
  eventType,
  editing,
  babies,
  babyId,
  unit,
  onUnitChange,
  onClose,
  onSubmit,
  onStartSleep,
  onStartBreastFeed,
  runningSleepBabyIds,
  runningFeedBabyIds,
  onError,
}: Props) => {
  const [selectedBaby, setSelectedBaby] = useState<string | null>(babyId);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSelectedBaby(editing ? editing.baby_id : babyId ?? babies[0]?.id ?? null);
  }, [open, editing, babyId, babies]);

  const baby = babies.find((item) => item.id === selectedBaby) ?? null;

  const submit = async (draft: CareEventDraft) => {
    if (saving) return;
    const check = validateCareEventDraft(draft, { dateOfBirth: baby?.date_of_birth ?? null });
    if (check.ok !== true) {
      onError(check.message);
      return;
    }
    setSaving(true);
    try {
      await onSubmit(check.payload);
    } finally {
      setSaving(false);
    }
  };

  const context: SheetContext = {
    babies,
    selectedBaby,
    onSelectBaby: setSelectedBaby,
    editing,
    unit,
    onUnitChange,
    submit,
    onError,
    onClose,
    saving,
  };

  const startSleep = async () => {
    if (!selectedBaby) {
      onError("Please choose which baby this is for.");
      return;
    }
    await onStartSleep(selectedBaby);
  };

  const startFeed = async (side: FeedSide) => {
    if (!selectedBaby) {
      onError("Please choose which baby this is for.");
      return;
    }
    await onStartBreastFeed(selectedBaby, side);
  };

  const sleepAvailable = !selectedBaby || !runningSleepBabyIds.includes(selectedBaby);
  const feedAvailable = !selectedBaby || !runningFeedBabyIds.includes(selectedBaby);

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? undefined : onClose())}>
      <DialogContent className="max-w-[520px] max-h-[86vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-[1.35rem] leading-[1.25]">
            {editing ? EDIT_TITLES[eventType] : TITLES[eventType]}
          </DialogTitle>
          <DialogDescription className="font-sans text-[13px] leading-[1.6]">
            {DESCRIPTIONS[eventType]}
          </DialogDescription>
        </DialogHeader>

        {eventType === "feed" && (
          <FeedSheet context={context} onStartLive={startFeed} liveAvailable={feedAvailable} />
        )}
        {eventType === "sleep" && (
          <SleepSheet context={context} onStartNow={startSleep} liveAvailable={sleepAvailable} />
        )}
        {eventType === "nappy" && <NappySheet context={context} />}
        {eventType === "note" && <MomentSheet context={context} />}
      </DialogContent>
    </Dialog>
  );
};

export default LogSheet;
