import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChipGroup,
  SHEET_FIELD_CLASS,
  SHEET_LEGEND,
  SHEET_LINK_CLASS,
  SHEET_PRIMARY_CLASS,
} from "@/components/firstyear/today/sheetControls";
import { SHEET_PRIMARY_STYLE } from "@/components/firstyear/today/sheetHelpers";
import { FY_FIELD_FOCUS_RING } from "@/components/firstyear/journey/firstYearStyles";
import {
  REMINDER_LABEL_MAX_LENGTH,
  REMINDER_TYPES,
  REMINDER_TYPE_LABELS,
  validateReminderDraft,
  type Reminder,
  type ReminderPayload,
  type ReminderType,
} from "@/lib/firstYearRemindersSchema";
import type { BabyRecord } from "@/lib/firstYearJourney";

const ANY_BABY = "__none__";

const babyLabel = (baby: BabyRecord, index: number): string =>
  baby.name?.trim() ? baby.name.trim() : `Baby ${baby.birth_order ?? index + 1}`;

type Props = {
  open: boolean;
  editing: Reminder | null;
  babies: BabyRecord[];
  saving: boolean;
  onClose: () => void;
  onSubmit: (payload: ReminderPayload) => Promise<void>;
  onError: (message: string) => void;
};

/**
 * The add and edit sheet for a reminder the parent sets themselves.
 *
 * Times are entered in local time and converted at the boundary. Nothing here
 * asks for notification permission or schedules anything in the background.
 */
const ReminderSheet = ({
  open,
  editing,
  babies,
  saving,
  onClose,
  onSubmit,
  onError,
}: Props) => {
  const multiples = babies.length > 1;
  const [reminderType, setReminderType] = useState<ReminderType | null>("feed");
  const [babyId, setBabyId] = useState<string>(ANY_BABY);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState(format(new Date(), "HH:mm"));
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!open) return;
    if (editing) {
      const due = new Date(editing.due_at);
      setReminderType(editing.reminder_type);
      setBabyId(editing.baby_id ?? ANY_BABY);
      setDate(format(due, "yyyy-MM-dd"));
      setTime(format(due, "HH:mm"));
      setLabel(editing.label ?? "");
      return;
    }
    const now = new Date();
    setReminderType("feed");
    setBabyId(ANY_BABY);
    setDate(format(now, "yyyy-MM-dd"));
    setTime(format(now, "HH:mm"));
    setLabel("");
  }, [open, editing]);

  const handleSubmit = async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    if (saving) return;
    const check = validateReminderDraft({
      reminderType,
      babyId: babyId === ANY_BABY ? null : babyId,
      date,
      time,
      label,
    });
    if (check.ok !== true) {
      onError(check.message);
      return;
    }
    await onSubmit(check.payload);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? undefined : onClose())}>
      <DialogContent className="max-w-[520px] max-h-[86vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-[1.35rem] leading-[1.25]">
            {editing ? "Edit reminder" : "Add reminder"}
          </DialogTitle>
          <DialogDescription className="font-sans text-[13px] leading-[1.6]">
            Choose what you want to remember and when. You set the time, and it stays private to
            you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ChipGroup<ReminderType>
            legend="What is this for?"
            name="fy-reminder-type"
            options={REMINDER_TYPES.map((value) => ({
              value,
              label: REMINDER_TYPE_LABELS[value],
            }))}
            value={reminderType}
            onChange={setReminderType}
          />

          {multiples && (
            <ChipGroup<string>
              legend="Who is this for?"
              name="fy-reminder-baby"
              options={[
                { value: ANY_BABY, label: "Just for me" },
                ...babies.map((baby, index) => ({
                  value: baby.id,
                  label: babyLabel(baby, index),
                })),
              ]}
              value={babyId}
              onChange={(next) => setBabyId(next ?? ANY_BABY)}
            />
          )}

          <div className="mb-5 flex flex-wrap gap-4">
            <div>
              <label htmlFor="fy-reminder-date" className={`block ${SHEET_LEGEND}`}>
                Date
              </label>
              <input
                id="fy-reminder-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className={SHEET_FIELD_CLASS}
              />
            </div>
            <div>
              <label htmlFor="fy-reminder-time" className={`block ${SHEET_LEGEND}`}>
                Time
              </label>
              <input
                id="fy-reminder-time"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className={SHEET_FIELD_CLASS}
              />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="fy-reminder-label" className={`block ${SHEET_LEGEND}`}>
              Add a short note
            </label>
            <input
              id="fy-reminder-label"
              type="text"
              value={label}
              maxLength={REMINDER_LABEL_MAX_LENGTH}
              onChange={(event) => setLabel(event.target.value)}
              placeholder="Optional, such as top up the bottles"
              className={`w-full rounded-[14px] border border-border/60 bg-background px-4 py-2.5 font-sans text-[14.5px] text-foreground placeholder:text-muted-foreground/60 min-h-11 ${FY_FIELD_FOCUS_RING}`}
            />
          </div>

          <div className="flex flex-col items-center gap-1 pt-1">
            <button
              type="submit"
              disabled={saving}
              className={SHEET_PRIMARY_CLASS}
              style={SHEET_PRIMARY_STYLE}
            >
              {saving ? "Saving…" : editing ? "Save changes" : "Save reminder"}
            </button>
            <button type="button" onClick={onClose} className={SHEET_LINK_CLASS}>
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderSheet;
