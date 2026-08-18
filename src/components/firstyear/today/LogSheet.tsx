import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CARE_EVENT_LABELS,
  CARE_NOTE_MAX_LENGTH,
  FEED_METHOD_LABELS,
  NAPPY_LABELS,
  NAPPY_TYPES,
  SIDES,
  SIDE_LABELS,
  SLEEP_KINDS,
  SLEEP_KIND_LABELS,
  feedMethodsForAge,
  formatAmount,
  validateCareEventDraft,
  type AmountUnit,
  type CareEvent,
  type CareEventPayload,
  type CareEventType,
  type FeedMethod,
  type NappyType,
  type Side,
  type SleepKind,
} from "@/lib/firstYearCareEventsSchema";
import {
  FY_CTA,
  FY_FIELD_FOCUS_RING,
  FY_FOCUS_RING,
} from "@/components/firstyear/journey/firstYearStyles";
import type { BabyRecord } from "@/lib/firstYearJourney";

type Props = {
  open: boolean;
  eventType: CareEventType;
  /** Present when an existing moment is being edited. */
  editing: CareEvent | null;
  babies: BabyRecord[];
  babyId: string | null;
  unit: AmountUnit;
  onUnitChange: (unit: AmountUnit) => void;
  onClose: () => void;
  onSubmit: (payload: CareEventPayload) => Promise<void>;
  onError: (message: string) => void;
};

const timeValue = (date: Date) => format(date, "HH:mm");

const withTime = (base: Date, value: string): Date | null => {
  const [hours, minutes] = value.split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  const next = new Date(base);
  next.setHours(hours, minutes, 0, 0);
  return next;
};

const CHIP_BASE = `flex min-h-11 cursor-pointer items-center rounded-pill border px-4 py-2 font-sans text-[13px] transition-colors focus-within:ring-2 focus-within:ring-sage focus-within:ring-offset-2 focus-within:ring-offset-background`;

type ChipGroupProps<T extends string> = {
  legend: string;
  name: string;
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (value: T | null) => void;
  allowClear?: boolean;
};

const ChipGroup = <T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  allowClear,
}: ChipGroupProps<T>) => (
  <fieldset className="mb-4">
    <legend className="font-sans text-[13px] font-medium text-foreground/80 mb-2">{legend}</legend>
    <div role="radiogroup" aria-label={legend} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <label
            key={option.value}
            className={`${CHIP_BASE} ${
              selected
                ? "border-sage bg-sage/12 text-foreground"
                : "border-border/60 bg-parchment text-foreground/70 hover:border-foreground/25"
            }`}
          >
            <input
              type="radio"
              name={name}
              className="sr-only"
              checked={selected}
              onChange={() => onChange(allowClear && selected ? null : option.value)}
              onClick={() => {
                if (allowClear && selected) onChange(null);
              }}
            />
            {option.label}
          </label>
        );
      })}
    </div>
  </fieldset>
);

/**
 * One small sheet for logging or editing a moment. Times default to now so a
 * quick log takes two taps. No timings are ever suggested.
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
  onError,
}: Props) => {
  const [selectedBaby, setSelectedBaby] = useState<string | null>(babyId);
  const [startTime, setStartTime] = useState(timeValue(new Date()));
  const [endTime, setEndTime] = useState("");
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState<Side | null>(null);
  const [nappyType, setNappyType] = useState<NappyType | null>(null);
  const [feedMethod, setFeedMethod] = useState<FeedMethod | null>(null);
  const [sleepKind, setSleepKind] = useState<SleepKind | null>(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    const now = new Date();
    if (editing) {
      const start = new Date(editing.started_at ?? editing.occurred_at);
      setSelectedBaby(editing.baby_id);
      setStartTime(timeValue(start));
      setEndTime(editing.ended_at ? timeValue(new Date(editing.ended_at)) : "");
      setAmount(
        editing.amount_ml === null
          ? ""
          : unit === "oz"
            ? String(Math.round((editing.amount_ml / 29.5735) * 10) / 10)
            : String(Math.round(editing.amount_ml)),
      );
      setSide(editing.side);
      setNappyType(editing.nappy_type);
      setFeedMethod(editing.feed_method);
      setSleepKind(editing.sleep_kind);
      setNote(editing.note ?? "");
      return;
    }
    setSelectedBaby(babyId ?? babies[0]?.id ?? null);
    setStartTime(timeValue(now));
    setEndTime("");
    setAmount("");
    setSide(null);
    setNappyType(null);
    setFeedMethod(null);
    setSleepKind(null);
    setNote("");
  }, [open, editing, babyId, babies, unit]);

  const baby = babies.find((item) => item.id === selectedBaby) ?? null;
  const feedOptions = useMemo(
    () => feedMethodsForAge(baby?.date_of_birth ?? null),
    [baby?.date_of_birth],
  );

  const showAmount = eventType === "feed" || eventType === "pump";
  const isSleep = eventType === "sleep";
  const title = editing
    ? `Edit ${CARE_EVENT_LABELS[eventType].toLowerCase()}`
    : eventType === "note"
      ? "Add a moment"
      : `Add ${CARE_EVENT_LABELS[eventType].toLowerCase()}`;

  const handleSubmit = async (submitEvent: React.FormEvent) => {
    submitEvent.preventDefault();
    if (saving) return;

    const base = editing ? new Date(editing.started_at ?? editing.occurred_at) : new Date();
    const occurredAt = withTime(base, startTime);
    const endedAt = isSleep && endTime ? withTime(base, endTime) : null;
    // A sleep that ran past midnight is stored on the following day.
    if (endedAt && occurredAt && endedAt.getTime() <= occurredAt.getTime()) {
      endedAt.setDate(endedAt.getDate() + 1);
    }

    const check = validateCareEventDraft(
      {
        eventType,
        babyId: selectedBaby,
        occurredAt,
        endedAt,
        amount,
        amountUnit: unit,
        side,
        nappyType,
        feedMethod,
        sleepKind,
        note,
      },
      { dateOfBirth: baby?.date_of_birth ?? null },
    );
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

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? undefined : onClose())}>
      <DialogContent className="max-w-[520px] max-h-[86vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-[1.35rem] leading-[1.25]">{title}</DialogTitle>
          <DialogDescription className="font-sans text-[13px] leading-[1.6]">
            Every field except the time is optional. This stays private to you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {babies.length > 1 && (
            <ChipGroup
              legend="Who is this for?"
              name="care-baby"
              options={babies.map((item, index) => ({
                value: item.id,
                label: item.name?.trim() ? item.name.trim() : `Baby ${item.birth_order ?? index + 1}`,
              }))}
              value={selectedBaby}
              onChange={(value) => setSelectedBaby(value)}
            />
          )}

          <div className="mb-4 flex flex-wrap gap-4">
            <div>
              <label
                htmlFor="care-start-time"
                className="block font-sans text-[13px] font-medium text-foreground/80 mb-1.5"
              >
                {isSleep ? "Started" : "Time"}
              </label>
              <input
                id="care-start-time"
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className={`min-h-11 rounded-[14px] border border-border/60 bg-background px-4 py-2 font-sans text-[14.5px] text-foreground ${FY_FIELD_FOCUS_RING}`}
              />
            </div>
            {isSleep && (
              <div>
                <label
                  htmlFor="care-end-time"
                  className="block font-sans text-[13px] font-medium text-foreground/80 mb-1.5"
                >
                  Ended (optional)
                </label>
                <input
                  id="care-end-time"
                  type="time"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                  className={`min-h-11 rounded-[14px] border border-border/60 bg-background px-4 py-2 font-sans text-[14.5px] text-foreground ${FY_FIELD_FOCUS_RING}`}
                />
              </div>
            )}
          </div>

          {eventType === "feed" && (
            <ChipGroup
              legend="How was this feed?"
              name="care-feed-method"
              options={feedOptions.map((method) => ({
                value: method,
                label: FEED_METHOD_LABELS[method],
              }))}
              value={feedMethod}
              onChange={setFeedMethod}
              allowClear
            />
          )}

          {eventType === "nappy" && (
            <ChipGroup
              legend="Nappy"
              name="care-nappy-type"
              options={NAPPY_TYPES.map((type) => ({ value: type, label: NAPPY_LABELS[type] }))}
              value={nappyType}
              onChange={setNappyType}
            />
          )}

          {isSleep && (
            <ChipGroup
              legend="Nap or night (optional)"
              name="care-sleep-kind"
              options={SLEEP_KINDS.map((kind) => ({ value: kind, label: SLEEP_KIND_LABELS[kind] }))}
              value={sleepKind}
              onChange={setSleepKind}
              allowClear
            />
          )}

          {showAmount && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="care-amount"
                  className="block font-sans text-[13px] font-medium text-foreground/80 mb-1.5"
                >
                  Amount (optional)
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    id="care-amount"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.1"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    className={`min-h-11 w-32 rounded-[14px] border border-border/60 bg-background px-4 py-2 font-sans text-[14.5px] text-foreground ${FY_FIELD_FOCUS_RING}`}
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
              <ChipGroup
                legend="Side (optional)"
                name="care-side"
                options={SIDES.map((value) => ({ value, label: SIDE_LABELS[value] }))}
                value={side}
                onChange={setSide}
                allowClear
              />
            </>
          )}

          <div className="mb-5">
            <label
              htmlFor="care-note"
              className="block font-sans text-[13px] font-medium text-foreground/80 mb-1.5"
            >
              {eventType === "note" ? "What happened?" : "Short note (optional)"}
            </label>
            <textarea
              id="care-note"
              rows={3}
              value={note}
              maxLength={CARE_NOTE_MAX_LENGTH}
              onChange={(event) => setNote(event.target.value)}
              placeholder={eventType === "note" ? "Settled quickly after a walk…" : "Anything worth remembering…"}
              className={`w-full resize-none rounded-[14px] border border-border/60 bg-background px-4 py-3 font-sans text-[14.5px] leading-[1.7] text-foreground placeholder:text-muted-foreground/50 ${FY_FIELD_FOCUS_RING}`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className={`${FY_CTA} disabled:opacity-60`}
              style={{
                backgroundColor: "hsl(var(--stage-firstyear-accent))",
                color: "hsl(var(--background))",
              }}
            >
              {saving ? "Saving…" : editing ? "Save changes" : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`${FY_FOCUS_RING} inline-flex min-h-11 items-center rounded-sm font-sans text-[13.5px] text-foreground/65 underline underline-offset-4 hover:text-foreground`}
            >
              Cancel
            </button>
            {showAmount && amount.trim() !== "" && (
              <span className="font-sans text-[12.5px] text-[hsl(var(--stage-firstyear-text-soft))]">
                {formatAmount(Number(amount) * (unit === "oz" ? 29.5735 : 1), "ml") ?? ""}
              </span>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LogSheet;
