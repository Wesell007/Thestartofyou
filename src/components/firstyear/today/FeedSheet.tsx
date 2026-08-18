import { useEffect, useState } from "react";
import {
  BOTTLE_TYPES,
  BOTTLE_TYPE_LABELS,
  FEED_MODES,
  FEED_MODE_LABELS,
  MAX_FEED_SIDE_MINUTES,
  ML_PER_OZ,
  formatAmount,
  formatDuration,
  type AmountUnit,
  type BottleType,
  type FeedMode,
  type FeedSide,
} from "@/lib/firstYearCareEventsSchema";
import {
  BabyChips,
  ChipGroup,
  NoteArea,
  SHEET_FIELD_CLASS,
  SHEET_LEGEND,
  SHEET_LINK_CLASS,
  SHEET_PANEL_CLASS,
  SHEET_PRIMARY_CLASS,
  SHEET_PRIMARY_STYLE,
  SHEET_SECONDARY_CLASS,
  SheetActions,
  TimeField,
  timeValue,
  withTime,
  type SheetContext,
} from "@/components/firstyear/today/sheetControls";
import { FY_FOCUS_RING } from "@/components/firstyear/journey/firstYearStyles";

type Props = {
  context: SheetContext;
  /** Starts a live breast feed and closes the sheet. */
  onStartLive: (side: FeedSide) => Promise<void>;
  liveAvailable: boolean;
};

const minutesValue = (seconds: number | undefined): string =>
  seconds && seconds > 0 ? String(Math.round(seconds / 60)) : "";

const toSeconds = (value: string): number => {
  const minutes = Number(value.trim());
  if (!Number.isFinite(minutes) || minutes <= 0) return 0;
  return Math.round(minutes * 60);
};

/** Feed logging: breast or bottle first, then only what that choice needs. */
const FeedSheet = ({ context, onStartLive, liveAvailable }: Props) => {
  const { babies, selectedBaby, onSelectBaby, editing, unit, onUnitChange, submit, saving } =
    context;
  const [mode, setMode] = useState<FeedMode | null>(null);
  const [manual, setManual] = useState(false);
  const [bottleType, setBottleType] = useState<BottleType | null>(null);
  const [time, setTime] = useState(timeValue(new Date()));
  const [amount, setAmount] = useState("");
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [note, setNote] = useState("");
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (editing) {
      const editMode = editing.metadata.feed_mode ?? null;
      setMode(editMode);
      setManual(true);
      setBottleType(editing.metadata.bottle_type ?? null);
      setTime(timeValue(new Date(editing.started_at ?? editing.occurred_at)));
      setAmount(
        editing.amount_ml === null
          ? ""
          : unit === "oz"
            ? String(Math.round((editing.amount_ml / ML_PER_OZ) * 10) / 10)
            : String(Math.round(editing.amount_ml)),
      );
      setLeft(minutesValue(editing.metadata.left_duration_seconds));
      setRight(minutesValue(editing.metadata.right_duration_seconds));
      setNote(editing.note ?? "");
      return;
    }
    setMode(null);
    setManual(false);
    setBottleType(null);
    setTime(timeValue(new Date()));
    setAmount("");
    setLeft("");
    setRight("");
    setNote("");
  }, [editing, unit]);

  const handleStart = async (side: FeedSide) => {
    if (starting) return;
    setStarting(true);
    try {
      await onStartLive(side);
    } finally {
      setStarting(false);
    }
  };

  const handleSubmit = async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    const base = editing ? new Date(editing.started_at ?? editing.occurred_at) : new Date();
    const occurredAt = withTime(base, time);
    const leftSeconds = mode === "breast" ? toSeconds(left) : 0;
    const rightSeconds = mode === "breast" ? toSeconds(right) : 0;
    await submit({
      eventType: "feed",
      babyId: selectedBaby,
      occurredAt,
      feedMode: mode,
      bottleType: mode === "bottle" ? bottleType : null,
      leftDurationSeconds: leftSeconds,
      rightDurationSeconds: rightSeconds,
      amount,
      amountUnit: unit,
      note,
      metadata: editing ? { ...editing.metadata } : {},
    });
  };

  if (!mode) {
    return (
      <div>
        <BabyChips babies={babies} value={selectedBaby} onChange={onSelectBaby} />
        <fieldset className="mb-5">
          <legend className={SHEET_LEGEND}>What type of feed?</legend>
          <div className="flex flex-col gap-3">
            {FEED_MODES.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMode(option)}
                className={SHEET_PANEL_CLASS}
                style={{
                  borderColor: "hsl(var(--stage-firstyear-peach-soft) / 0.9)",
                  backgroundColor: "hsl(var(--stage-firstyear-hero) / 0.5)",
                }}
              >
                <span className="font-sans text-[15.5px] font-semibold text-foreground">
                  {FEED_MODE_LABELS[option]}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
        <div className="flex justify-center">
          <button type="button" onClick={context.onClose} className={SHEET_LINK_CLASS}>
            Cancel
          </button>
        </div>

      </div>
    );
  }

  if (mode === "breast" && !manual) {
    return (
      <div>
        <BabyChips babies={babies} value={selectedBaby} onChange={onSelectBaby} />
        <p className="font-sans text-[13.5px] leading-[1.65] text-[hsl(var(--stage-firstyear-text))] mb-4">
          Start the side you are on now, or add a feed that has already finished.
        </p>
        <div className="flex flex-col gap-2.5 mb-4">
          {(["left", "right"] as FeedSide[]).map((side) => (
            <button
              key={side}
              type="button"
              disabled={starting || !liveAvailable}
              onClick={() => handleStart(side)}
              className={SHEET_PRIMARY_CLASS}
              style={SHEET_PRIMARY_STYLE}
            >
              {side === "left" ? "Start left" : "Start right"}
            </button>
          ))}
        </div>
        {!liveAvailable && (
          <p className="font-sans text-[13px] leading-[1.6] text-[hsl(var(--stage-firstyear-text))] mb-4">
            A feed is already running for this baby. End it from the card on the page first.
          </p>
        )}
        <div className="flex flex-col items-center gap-1">
          <button type="button" onClick={() => setManual(true)} className={SHEET_SECONDARY_CLASS}>
            Add manually
          </button>
          <button type="button" onClick={() => setMode(null)} className={SHEET_LINK_CLASS}>
            Back
          </button>
        </div>
      </div>
    );
  }


  const totalMinutes = Math.round((toSeconds(left) + toSeconds(right)) / 60);

  return (
    <form onSubmit={handleSubmit}>
      <BabyChips babies={babies} value={selectedBaby} onChange={onSelectBaby} />

      <div className="mb-4 flex flex-wrap gap-4">
        <TimeField id="feed-time" label="Time" value={time} onChange={setTime} />
      </div>

      {mode === "bottle" && (
        <>
          <ChipGroup
            legend="What was in the bottle?"
            name="feed-bottle-type"
            options={BOTTLE_TYPES.map((value) => ({ value, label: BOTTLE_TYPE_LABELS[value] }))}
            value={bottleType}
            onChange={(value: BottleType | null) => setBottleType(value)}
          />
          <div className="mb-4">
            <label
              htmlFor="feed-amount"
              className="block font-sans text-[13px] font-medium text-foreground/80 mb-1.5"
            >
              Amount (optional)
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <input
                id="feed-amount"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.1"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className={`${SHEET_FIELD_CLASS} w-32`}
              />
              <div role="group" aria-label="Amount unit" className="flex gap-2">
                {(["ml", "oz"] as AmountUnit[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onUnitChange(option)}
                    aria-pressed={unit === option}
                    className={`${FY_FOCUS_RING} min-h-11 rounded-pill border px-4 py-2 font-sans text-[13px] transition-colors ${
                      unit === option
                        ? "border-sage bg-sage/12 text-foreground"
                        : "border-border/60 bg-parchment text-foreground/70 hover:border-foreground/25"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {bottleType === "other" && (
            <p className="font-sans text-[13px] leading-[1.6] text-foreground/70 mb-4">
              A short note below will help you remember what this one was.
            </p>
          )}
        </>
      )}

      {mode === "breast" && (
        <fieldset className="mb-4">
          <legend className="font-sans text-[13px] font-medium text-foreground/80 mb-2">
            How long on each side? Minutes, both optional.
          </legend>
          <div className="flex flex-wrap gap-4">
            <div>
              <label
                htmlFor="feed-left"
                className="block font-sans text-[12.5px] text-foreground/70 mb-1.5"
              >
                Left
              </label>
              <input
                id="feed-left"
                type="number"
                inputMode="numeric"
                min="0"
                max={MAX_FEED_SIDE_MINUTES}
                value={left}
                onChange={(event) => setLeft(event.target.value)}
                className={`${SHEET_FIELD_CLASS} w-28`}
              />
            </div>
            <div>
              <label
                htmlFor="feed-right"
                className="block font-sans text-[12.5px] text-foreground/70 mb-1.5"
              >
                Right
              </label>
              <input
                id="feed-right"
                type="number"
                inputMode="numeric"
                min="0"
                max={MAX_FEED_SIDE_MINUTES}
                value={right}
                onChange={(event) => setRight(event.target.value)}
                className={`${SHEET_FIELD_CLASS} w-28`}
              />
            </div>
          </div>
          {totalMinutes > 0 && (
            <p className="font-sans text-[12.5px] text-[hsl(var(--stage-firstyear-text-soft))] mt-2">
              Total {formatDuration(totalMinutes)}
            </p>
          )}
        </fieldset>
      )}

      <NoteArea
        id="feed-note"
        label="Short note (optional)"
        placeholder="Anything worth remembering…"
        value={note}
        onChange={setNote}
      />

      <SheetActions
        saving={saving}
        editing={Boolean(editing)}
        onCancel={context.onClose}
        extra={
          mode === "bottle" && amount.trim() !== "" ? (
            <span className="font-sans text-[12.5px] text-[hsl(var(--stage-firstyear-text-soft))]">
              {formatAmount(Number(amount) * (unit === "oz" ? ML_PER_OZ : 1), "ml") ?? ""}
            </span>
          ) : null
        }
      />
      {!editing && (
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => (mode === "breast" ? setManual(false) : setMode(null))}
            className={SHEET_LINK_CLASS}
          >
            Back
          </button>
        </div>
      )}

    </form>
  );
};

export default FeedSheet;
