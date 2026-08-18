import { useEffect, useState } from "react";
import {
  SLEEP_KINDS,
  SLEEP_KIND_LABELS,
  type SleepKind,
} from "@/lib/firstYearCareEventsSchema";
import {
  BabyChips,
  ChipGroup,
  NoteArea,
  SHEET_LINK_CLASS,
  SHEET_PRIMARY_CLASS,
  SHEET_PRIMARY_STYLE,
  SHEET_SECONDARY_CLASS,
  SheetActions,
  TimeField,
  timeValue,
  withTime,
  type SheetContext,
} from "@/components/firstyear/today/sheetControls";

type Props = {
  context: SheetContext;
  onStartNow: () => Promise<void>;
  liveAvailable: boolean;
};

/** Sleep logging: start one now, or add one that has already happened. */
const SleepSheet = ({ context, onStartNow, liveAvailable }: Props) => {
  const { babies, selectedBaby, onSelectBaby, editing, submit, saving } = context;
  const [manual, setManual] = useState(false);
  const [start, setStart] = useState(timeValue(new Date()));
  const [end, setEnd] = useState("");
  const [kind, setKind] = useState<SleepKind | null>(null);
  const [note, setNote] = useState("");
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (editing) {
      setManual(true);
      setStart(timeValue(new Date(editing.started_at ?? editing.occurred_at)));
      setEnd(editing.ended_at ? timeValue(new Date(editing.ended_at)) : "");
      setKind(editing.sleep_kind);
      setNote(editing.note ?? "");
      return;
    }
    setManual(false);
    setStart(timeValue(new Date()));
    setEnd("");
    setKind(null);
    setNote("");
  }, [editing]);

  const handleStart = async () => {
    if (starting) return;
    setStarting(true);
    try {
      await onStartNow();
    } finally {
      setStarting(false);
    }
  };

  const handleSubmit = async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    const base = editing ? new Date(editing.started_at ?? editing.occurred_at) : new Date();
    const occurredAt = withTime(base, start);
    const endedAt = end ? withTime(base, end) : null;
    // A sleep that ran past midnight is stored on the following day.
    if (endedAt && occurredAt && endedAt.getTime() <= occurredAt.getTime()) {
      endedAt.setDate(endedAt.getDate() + 1);
    }
    await submit({
      eventType: "sleep",
      babyId: selectedBaby,
      occurredAt,
      endedAt,
      sleepKind: kind,
      note,
    });
  };

  if (!manual) {
    return (
      <div>
        <BabyChips babies={babies} value={selectedBaby} onChange={onSelectBaby} />
        <p className="font-sans text-[13.5px] leading-[1.65] text-foreground/75 mb-4">
          Start the timer as they settle, or add a sleep that has already finished.
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button
            type="button"
            disabled={starting || !liveAvailable}
            onClick={handleStart}
            className={SHEET_PRIMARY_CLASS}
            style={SHEET_PRIMARY_STYLE}
          >
            Start sleep now
          </button>
          <button type="button" onClick={() => setManual(true)} className={SHEET_SECONDARY_CLASS}>
            Add sleep manually
          </button>
        </div>
        {!liveAvailable && (
          <p className="font-sans text-[13px] leading-[1.6] text-foreground/70 mb-4">
            A sleep is already running for this baby. End it from the card on the page first.
          </p>
        )}
        <button type="button" onClick={context.onClose} className={SHEET_LINK_CLASS}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <BabyChips babies={babies} value={selectedBaby} onChange={onSelectBaby} />
      <div className="mb-4 flex flex-wrap gap-4">
        <TimeField id="sleep-start" label="Started" value={start} onChange={setStart} />
        <TimeField id="sleep-end" label="Ended (optional)" value={end} onChange={setEnd} />
      </div>
      <ChipGroup
        legend="Nap or night (optional)"
        name="sleep-kind"
        options={SLEEP_KINDS.map((value) => ({ value, label: SLEEP_KIND_LABELS[value] }))}
        value={kind}
        onChange={(value: SleepKind | null) => setKind(value)}
        allowClear
      />
      <NoteArea
        id="sleep-note"
        label="Short note (optional)"
        placeholder="Settled quickly after a walk…"
        value={note}
        onChange={setNote}
      />
      <SheetActions saving={saving} editing={Boolean(editing)} onCancel={context.onClose} />
      {!editing && (
        <button
          type="button"
          onClick={() => setManual(false)}
          className={`${SHEET_LINK_CLASS} mt-3`}
        >
          Back
        </button>
      )}
    </form>
  );
};

export default SleepSheet;
