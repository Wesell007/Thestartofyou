/**
 * DueDateCalculatorForm, shared, reusable calculator input block.
 * Used on: homepage, pregnancy hub, /due-date-calculator page.
 *
 * Props:
 *  onResult(lmp: Date), called with the computed LMP when the user submits.
 *  compact, if true, renders a condensed single-column card form (for hero cards).
 */

import { useState } from "react";
import { addDays, isAfter, isBefore } from "date-fns";
import { format } from "date-fns";
import { CalendarIcon, ArrowRight, ChevronDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Method = "lmp" | "conception" | "ivf" | "ultrasound";
type IVFType = "3day" | "5day";

interface Props {
  onResult: (lmp: Date) => void;
  onIVFResult?: (transferDate: Date, transferType: IVFType) => void;
  compact?: boolean;
}

// ─── reusable sub-inputs ──────────────────────────────────────────────────────

const DatePickerInput = ({
  label,
  value,
  onChange,
  disabledAfter,
  disabledBefore,
}: {
  label: string;
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
  disabledAfter?: Date;
  disabledBefore?: Date;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">{label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "w-full flex items-center justify-between bg-parchment border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light transition-all hover:border-sage/40 focus:outline-none focus:border-sage/50",
              value ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <span>{value ? format(value, "d MMMM yyyy") : "Select a date"}</span>
            <CalendarIcon size={15} className="text-sage-muted" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border border-border/60 shadow-soft rounded-xl" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(d) => { onChange(d); setOpen(false); }}
            disabled={(date) => {
              if (disabledAfter && isAfter(date, disabledAfter)) return true;
              if (disabledBefore && isBefore(date, disabledBefore)) return true;
              return false;
            }}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

const SelectInput = ({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div>
    <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">{label}</p>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-parchment border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground focus:outline-none focus:border-sage/50 hover:border-sage/40 transition-all pr-10"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-muted pointer-events-none" />
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────

const DueDateCalculatorForm = ({ onResult, onIVFResult, compact = false }: Props) => {
  const [method, setMethod] = useState<Method>("lmp");
  const [lmpDate, setLmpDate] = useState<Date | undefined>();
  const [cycleLength, setCycleLength] = useState(28);
  const [conceptionDate, setConceptionDate] = useState<Date | undefined>();
  const [ivfDate, setIvfDate] = useState<Date | undefined>();
  const [ivfType, setIvfType] = useState<IVFType>("5day");
  const [usDate, setUsDate] = useState<Date | undefined>();
  const [usWeeks, setUsWeeks] = useState("");

  const today = new Date();

  const canCalculate = () => {
    if (method === "lmp") return !!lmpDate;
    if (method === "conception") return !!conceptionDate;
    if (method === "ivf") return !!ivfDate;
    if (method === "ultrasound") return !!usDate && !!usWeeks && !isNaN(parseFloat(usWeeks));
    return false;
  };

  const handleCalculate = () => {
    // IVF-specific routing when callback provided
    if (method === "ivf" && ivfDate && onIVFResult) {
      onIVFResult(ivfDate, ivfType);
      return;
    }

    let lmp: Date | undefined;
    if (method === "lmp" && lmpDate) {
      lmp = addDays(lmpDate, -(cycleLength - 28));
    } else if (method === "conception" && conceptionDate) {
      lmp = addDays(conceptionDate, -14);
    } else if (method === "ivf" && ivfDate) {
      lmp = addDays(ivfDate, -(ivfType === "5day" ? 19 : 17));
    } else if (method === "ultrasound" && usDate && usWeeks) {
      const w = parseFloat(usWeeks);
      if (!isNaN(w)) lmp = addDays(usDate, -(w * 7));
    }
    if (lmp && isBefore(lmp, today) && isAfter(lmp, addDays(today, -300))) {
      onResult(lmp);
    }
  };

  return (
    <div className="space-y-6">
      <SelectInput
        label="Calculation method"
        value={method}
        onChange={(v) => { setMethod(v as Method); }}
        options={[
          { value: "lmp",        label: "Last period" },
          { value: "conception", label: "Conception date" },
          { value: "ivf",        label: "IVF transfer date" },
          { value: "ultrasound", label: "Ultrasound date" },
        ]}
      />

      {method === "lmp" && (
        <>
          <DatePickerInput
            label="First day of your last period"
            value={lmpDate}
            onChange={setLmpDate}
            disabledAfter={today}
            disabledBefore={addDays(today, -300)}
          />
          <div>
            <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">Cycle length</p>
            <div className="relative inline-block">
              <select
                value={cycleLength}
                onChange={(e) => setCycleLength(Number(e.target.value))}
                className="appearance-none bg-parchment border border-border/60 rounded-xl px-5 py-4 pr-10 font-sans text-sm font-light text-foreground focus:outline-none focus:border-sage/50 hover:border-sage/40 transition-all"
              >
                {Array.from({ length: 25 }, (_, i) => i + 21).map((d) => (
                  <option key={d} value={d}>{d} days{d === 28 ? " (average)" : ""}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-muted pointer-events-none" />
            </div>
            <p className="font-sans text-[11px] font-light text-muted-foreground/70 mt-2.5 leading-relaxed">
              28 days is average, but many cycles vary. Your estimate will adjust based on the cycle length you choose.
            </p>
          </div>
        </>
      )}

      {method === "conception" && (
        <DatePickerInput
          label="Conception date"
          value={conceptionDate}
          onChange={setConceptionDate}
          disabledAfter={today}
          disabledBefore={addDays(today, -300)}
        />
      )}

      {method === "ivf" && (
        <>
          <DatePickerInput
            label="Embryo transfer date"
            value={ivfDate}
            onChange={setIvfDate}
            disabledAfter={today}
            disabledBefore={addDays(today, -300)}
          />
          <SelectInput
            label="Transfer type"
            value={ivfType}
            onChange={(v) => setIvfType(v as IVFType)}
            options={[
              { value: "5day", label: "5-day transfer (blastocyst)" },
              { value: "3day", label: "3-day transfer (cleavage)" },
            ]}
          />
        </>
      )}

      {method === "ultrasound" && (
        <>
          <DatePickerInput
            label="Ultrasound date"
            value={usDate}
            onChange={setUsDate}
            disabledAfter={today}
            disabledBefore={addDays(today, -300)}
          />
          <div>
            <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">Weeks pregnant at scan</p>
            <input
              type="number" min={4} max={40} placeholder="e.g. 12"
              value={usWeeks}
              onChange={(e) => setUsWeeks(e.target.value)}
              className="w-full bg-parchment border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-sage/50"
            />
          </div>
        </>
      )}

      <div className="pt-1">
        <button
          onClick={handleCalculate}
          disabled={!canCalculate()}
          className={cn(
            "w-full flex items-center justify-center gap-2 rounded-pill px-7 py-4 font-sans text-sm font-medium transition-all bg-terracotta text-terracotta-foreground shadow-cta",
            canCalculate()
              ? "hover:bg-terracotta-hover"
              : "opacity-50 cursor-not-allowed"
          )}
        >
          <ArrowRight size={15} />
          Calculate my due date
        </button>
        <p className="font-sans text-[11px] font-light text-muted-foreground/60 text-center mt-3 leading-relaxed">
          This gives an estimate, your healthcare provider may adjust your due date based on scans.
        </p>
      </div>
    </div>
  );
};

export default DueDateCalculatorForm;
