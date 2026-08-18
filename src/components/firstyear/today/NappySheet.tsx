import { useEffect, useState } from "react";
import {
  NAPPY_LABELS,
  NAPPY_TYPES,
  POO_COLOURS,
  POO_COLOUR_LABELS,
  POO_SIZES,
  POO_SIZE_LABELS,
  POO_TEXTURES,
  POO_TEXTURE_LABELS,
  RASH_LEVELS,
  RASH_LEVEL_LABELS,
  normaliseNappyType,
  type NappyType,
  type PooColour,
  type PooSize,
  type PooTexture,
  type RashLevel,
} from "@/lib/firstYearCareEventsSchema";
import {
  BabyChips,
  ChipGroup,
  NoteArea,
  SheetActions,
  TimeField,
  timeValue,
  withTime,
  type SheetContext,
} from "@/components/firstyear/today/sheetControls";

/** Nappy logging with the detail a parent may want to mention at a check-up. */
const NappySheet = ({ context }: { context: SheetContext }) => {
  const { babies, selectedBaby, onSelectBaby, editing, submit, saving } = context;
  const [type, setType] = useState<NappyType | null>(null);
  const [time, setTime] = useState(timeValue(new Date()));
  const [rash, setRash] = useState<RashLevel | null>(null);
  const [texture, setTexture] = useState<PooTexture | null>(null);
  const [size, setSize] = useState<PooSize | null>(null);
  const [colour, setColour] = useState<PooColour | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (editing) {
      setType(normaliseNappyType(editing.nappy_type));
      setTime(timeValue(new Date(editing.occurred_at)));
      setRash(editing.metadata.rash_level ?? null);
      setTexture(editing.metadata.poo_texture ?? null);
      setSize(editing.metadata.poo_size ?? null);
      setColour(editing.metadata.poo_colour ?? null);
      setNote(editing.note ?? "");
      return;
    }
    setType(null);
    setTime(timeValue(new Date()));
    setRash(null);
    setTexture(null);
    setSize(null);
    setColour(null);
    setNote("");
  }, [editing]);

  const showPooDetail = type === "poo" || type === "both";

  const handleSubmit = async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    const base = editing ? new Date(editing.occurred_at) : new Date();
    await submit({
      eventType: "nappy",
      babyId: selectedBaby,
      occurredAt: withTime(base, time),
      nappyType: type,
      rashLevel: rash,
      pooTexture: showPooDetail ? texture : null,
      pooSize: showPooDetail ? size : null,
      pooColour: showPooDetail ? colour : null,
      note,
      metadata: editing ? { ...editing.metadata } : {},
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <BabyChips babies={babies} value={selectedBaby} onChange={onSelectBaby} />
      <ChipGroup
        legend="What was in the nappy?"
        name="nappy-type"
        options={NAPPY_TYPES.map((value) => ({ value, label: NAPPY_LABELS[value] }))}
        value={type}
        onChange={(value: NappyType | null) => setType(value)}
      />
      <div className="mb-4 flex flex-wrap gap-4">
        <TimeField id="nappy-time" label="Time" value={time} onChange={setTime} />
      </div>
      <ChipGroup
        legend="Any redness or rash noticed?"
        name="nappy-rash"
        options={RASH_LEVELS.map((value) => ({ value, label: RASH_LEVEL_LABELS[value] }))}
        value={rash}
        onChange={(value: RashLevel | null) => setRash(value)}
        allowClear
      />
      {showPooDetail && (
        <>
          <ChipGroup
            legend="Texture (optional)"
            name="nappy-texture"
            options={POO_TEXTURES.map((value) => ({ value, label: POO_TEXTURE_LABELS[value] }))}
            value={texture}
            onChange={(value: PooTexture | null) => setTexture(value)}
            allowClear
          />
          <ChipGroup
            legend="Size (optional)"
            name="nappy-size"
            options={POO_SIZES.map((value) => ({ value, label: POO_SIZE_LABELS[value] }))}
            value={size}
            onChange={(value: PooSize | null) => setSize(value)}
            allowClear
          />
          <ChipGroup
            legend="Colour (optional)"
            name="nappy-colour"
            options={POO_COLOURS.map((value) => ({ value, label: POO_COLOUR_LABELS[value] }))}
            value={colour}
            onChange={(value: PooColour | null) => setColour(value)}
            allowClear
          />
        </>
      )}
      <NoteArea
        id="nappy-note"
        label="Short note (optional)"
        placeholder="Anything worth remembering…"
        value={note}
        onChange={setNote}
      />
      <SheetActions saving={saving} editing={Boolean(editing)} onCancel={context.onClose} />
    </form>
  );
};

export default NappySheet;
