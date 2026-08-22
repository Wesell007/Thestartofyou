import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import { isFutureDateOnly, parseDateOnly } from "@/lib/dateOnly";
import {
  createTTCLog,
  updateTTCLog,
  LOG_TYPE_LABEL,
  LOG_TYPE_VALUES,
  LOG_VALUE_LABEL,
  TTC_LOG_TYPES,
  type TTCLog,
  type TTCLogType,
} from "@/lib/ttcLogs";
import { TTC_CHIP, TTC_FOCUS_RING } from "@/components/ttc/journey/ttcStyles";

type Suggestion = "period_started" | "positive_pregnancy_test" | null;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  journeyId: string;
  initialDate: string; // yyyy-MM-dd
  /** Phase 28D — quick chips preselect an existing log type. */
  initialType?: TTCLogType;
  initialValue?: string;
  editing?: TTCLog | null;
  onSaved: () => void;
};

const todayIso = () => format(new Date(), "yyyy-MM-dd");

const TTCLogEntryPanel = ({
  open,
  onOpenChange,
  userId,
  journeyId,
  initialDate,
  initialType,
  initialValue,
  editing,
  onSaved,
}: Props) => {
  const [logDate, setLogDate] = useState<string>(initialDate);
  const [logType, setLogType] = useState<TTCLogType>("note");
  const [value, setValue] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [suggestion, setSuggestion] = useState<Suggestion>(null);

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setLogDate(editing.log_date);
      setLogType(editing.log_type);
      setValue(editing.value ?? "");
      setNotes(editing.notes ?? "");
    } else {
      setLogDate(initialDate || todayIso());
      setLogType(initialType ?? "note");
      setValue(initialValue ?? "");
      setNotes("");
    }
    setSuggestion(null);
  }, [open, editing, initialDate, initialType, initialValue]);


  const availableValues = LOG_TYPE_VALUES[logType] ?? [];

  const handleSave = async () => {
    if (!logDate) {
      toast({ title: "Pick a date", description: "Please choose a date for this log." });
      return;
    }
    if (!parseDateOnly(logDate) || isFutureDateOnly(logDate)) {
      toast({ title: "Choose a valid date", description: "Logs cannot be saved for a future date.", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await updateTTCLog(editing.id, {
          log_date: logDate,
          log_type: logType,
          value: availableValues.length ? (value || null) : null,
          notes: notes.trim() || null,
        });
        toast({ title: "Log updated" });
      } else {
        await createTTCLog({
          user_id: userId,
          journey_id: journeyId,
          log_date: logDate,
          log_type: logType,
          value: availableValues.length ? (value || null) : null,
          notes: notes.trim() || null,
        });
        trackEvent(EVENTS.TTC_LOG_CREATED);
        toast({ title: "Log saved" });
      }

      // Gentle suggestions (never automated actions).
      if (logType === "period" && value === "started") {
        setSuggestion("period_started");
      } else if (logType === "pregnancy_test" && value === "positive") {
        setSuggestion("positive_pregnancy_test");
      } else {
        setSuggestion(null);
        onSaved();
        onOpenChange(false);
        return;
      }
      onSaved();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      toast({ title: "Could not save log", description: message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto ttc-paper-warm">
        <SheetHeader className="text-left">
          <SheetTitle className="font-serif font-normal text-[22px] leading-[1.25] text-foreground">
            {editing ? "Edit this note" : "Add a small note"}
          </SheetTitle>
          <SheetDescription className="font-sans text-[13px] text-[hsl(var(--stage-ttc-text-soft))]">
            Write what you notice, when you feel ready. This is private to you.
          </SheetDescription>
        </SheetHeader>


        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="ttc-log-date"
              className="block font-sans text-[11px] tracking-[0.15em] uppercase font-medium text-foreground/70 mb-2"
            >
              Date
            </label>
            <input
              id="ttc-log-date"
              type="date"
              value={logDate}
              max={todayIso()}
              onChange={(e) => setLogDate(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="font-sans text-[11px] tracking-[0.15em] uppercase font-medium text-foreground/70">
                What is this note about
              </label>
              <span className={TTC_CHIP}>{LOG_TYPE_LABEL[logType]}</span>
            </div>
            <Select
              value={logType}
              onValueChange={(v) => {
                setLogType(v as TTCLogType);
                setValue("");
              }}
            >
              <SelectTrigger className="min-h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                {TTC_LOG_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {LOG_TYPE_LABEL[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {availableValues.length > 0 && (
            <div>
              <label className="block font-sans text-[11px] tracking-[0.15em] uppercase font-medium text-foreground/70 mb-2">
                Detail
              </label>
              <Select value={value} onValueChange={setValue}>
                <SelectTrigger className="min-h-11">
                  <SelectValue placeholder="Choose an option (optional)" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {availableValues.map((v) => (
                    <SelectItem key={v} value={v}>
                      {LOG_VALUE_LABEL[v] ?? v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <label
              htmlFor="ttc-log-notes"
              className="block font-sans text-[11px] tracking-[0.15em] uppercase font-medium text-foreground/70 mb-2"
            >
              In your words (optional)
            </label>
            <Textarea
              id="ttc-log-notes"
              rows={6}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What you notice today, or anything worth remembering."
              maxLength={500}
              className="min-h-[150px] font-serif text-[15px] leading-[1.7]"
            />
          </div>


          <p className="font-sans text-[11.5px] text-muted-foreground/80 leading-relaxed">
            Logs are for your own reference. They are private to you and are
            not used to change your cycle estimates or interpret results.
          </p>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="min-h-11 rounded-pill px-6 bg-[hsl(var(--stage-ttc-olive))] text-[hsl(var(--stage-ttc-cream))] hover:bg-[hsl(var(--stage-ttc-olive))] hover:opacity-90"
            >
              {saving && <Loader2 size={14} className="mr-2 animate-spin" />}
              {editing ? "Save changes" : "Save note"}
            </Button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex min-h-11 items-center rounded-sm px-2 font-sans text-[13px] text-[hsl(var(--stage-ttc-text-soft))] transition-colors hover:text-[hsl(var(--stage-ttc-text))]"
            >
              Cancel
            </button>
          </div>

          {suggestion === "period_started" && (
            <div
              className="mt-4 rounded-[14px] px-4 py-4 border"
              style={{ borderColor: "hsl(var(--stage-ttc-edge))", background: "hsl(var(--stage-ttc-sage) / 0.45)" }}
            >
              <p className="font-serif text-[15px] text-foreground/85 mb-3">
                If your period has started, you may want to refresh your TTC
                setup so your estimates reflect this new cycle. We won't do
                this for you.
              </p>
              <Link
                to="/setup/trying-to-conceive"
                onClick={() => onOpenChange(false)}
                className="inline-flex min-h-11 items-center gap-2 font-sans text-[13px] font-medium text-[hsl(var(--stage-ttc-olive))]"
              >
                Update TTC setup <ArrowRight size={13} />
              </Link>
            </div>
          )}

          {suggestion === "positive_pregnancy_test" && (
            <div
              className="mt-4 rounded-[14px] px-4 py-4 border"
              style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.3)", background: "hsl(var(--stage-pregnancy-accent) / 0.06)" }}
            >
              <p className="font-serif text-[15px] text-foreground/85 mb-3">
                When you're ready, you can estimate a due date and explore
                early pregnancy guidance. We won't move you across
                automatically.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Link
                  to="/due-date-calculator"
                  onClick={() => onOpenChange(false)}
                  className="inline-flex items-center gap-2 font-sans text-[13px] font-medium"
                  style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                >
                  Due date calculator <ArrowRight size={13} />
                </Link>
                <Link
                  to="/pregnancy"
                  onClick={() => onOpenChange(false)}
                  className="inline-flex min-h-11 items-center rounded-sm px-2 font-sans text-[13px] text-[hsl(var(--stage-ttc-text-soft))] transition-colors hover:text-[hsl(var(--stage-ttc-text))]"
                >
                  Pregnancy guidance
                </Link>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TTCLogEntryPanel;
