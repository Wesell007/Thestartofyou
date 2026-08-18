import { useEffect, useState } from "react";
import {
  BabyChips,
  NoteArea,
  SheetActions,
  TimeField,
  timeValue,
  withTime,
  type SheetContext,
} from "@/components/firstyear/today/sheetControls";

/** A moment is a time and a few words. Nothing else is asked. */
const MomentSheet = ({ context }: { context: SheetContext }) => {
  const { babies, selectedBaby, onSelectBaby, editing, submit, saving } = context;
  const [time, setTime] = useState(timeValue(new Date()));
  const [note, setNote] = useState("");

  useEffect(() => {
    if (editing) {
      setTime(timeValue(new Date(editing.occurred_at)));
      setNote(editing.note ?? "");
      return;
    }
    setTime(timeValue(new Date()));
    setNote("");
  }, [editing]);

  const handleSubmit = async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    const base = editing ? new Date(editing.occurred_at) : new Date();
    await submit({
      eventType: "note",
      babyId: selectedBaby,
      occurredAt: withTime(base, time),
      note,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <BabyChips babies={babies} value={selectedBaby} onChange={onSelectBaby} />
      <div className="mb-4 flex flex-wrap gap-4">
        <TimeField id="moment-time" label="Time" value={time} onChange={setTime} />
      </div>
      <NoteArea
        id="moment-note"
        label="What happened?"
        placeholder="Settled quickly after a walk…"
        value={note}
        onChange={setNote}
      />
      <SheetActions saving={saving} editing={Boolean(editing)} onCancel={context.onClose} />
    </form>
  );
};

export default MomentSheet;
