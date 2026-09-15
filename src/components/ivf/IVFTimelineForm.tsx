import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, subDays } from "date-fns";
import { CalendarIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

/**
 * Phase 34F — the single IVF timeline calculator.
 *
 * One implementation, used by the IVF hub hero and by `/ivf-timeline` itself,
 * so the tool is never a dead end and the transfer date and transfer type a
 * timeline derives from have one source of truth.
 *
 * Privacy: newly initiated calculations hand off through ephemeral router
 * state, never the address bar, so treatment information is not written into
 * history, referrers or server logs. Nothing is persisted — calculating never
 * creates a saved record and writes to no storage layer.
 */

export type { IVFTransferType } from "@/lib/ivfTimeline";
import type { IVFTransferType } from "@/lib/ivfTimeline";

export const IVF_TIMELINE_ROUTE = "/ivf-timeline";

/** Ephemeral navigation state shape for the hub → tool handoff. */
export type IVFTimelineNavState = {
  transferMs: number;
  transferType: IVFTransferType;
};

export type IVFTimelineFormProps = {
  initialDate?: Date | null;
  initialType?: IVFTransferType;
  className?: string;
  headingLevel?: "h2" | "p";
};

const IVFTimelineForm = ({
  initialDate,
  initialType = "5day",
  className,
  headingLevel = "p",
}: IVFTimelineFormProps) => {
  const navigate = useNavigate();
  const [transferDate, setTransferDate] = useState<Date | undefined>(initialDate ?? undefined);
  const [transferType, setTransferType] = useState<IVFTransferType>(initialType);
  const [open, setOpen] = useState(false);

  const handleTrack = () => {
    if (!transferDate) return;
    const state: IVFTimelineNavState = { transferMs: transferDate.getTime(), transferType };
    navigate(IVF_TIMELINE_ROUTE, { state });
  };

  const Heading = headingLevel;

  return (
    <div
      className={cn("w-full rounded-2xl p-5 sm:p-6 space-y-3.5 border backdrop-blur-sm", className)}
      style={{
        backgroundColor: "hsl(var(--stage-ivf) / 0.18)",
        borderColor: "hsl(var(--stage-ivf-accent) / 0.18)",
      }}
    >
      <Heading
        className="font-sans text-xs font-light tracking-[0.15em] uppercase"
        style={{ color: "hsl(var(--stage-ivf-accent))" }}
      >
        Track your IVF timeline
      </Heading>

      <div>
        <label
          htmlFor="ivf-transfer-date"
          className="block font-sans text-[11px] font-light text-muted-foreground/70 mb-1.5 text-left"
        >
          Embryo transfer date
        </label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              id="ivf-transfer-date"
              type="button"
              className={cn(
                "w-full flex items-center justify-between bg-card border border-border/60 rounded-xl px-4 py-3 font-sans text-sm font-light transition-all hover:border-sage/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage/40",
                transferDate ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span>{transferDate ? format(transferDate, "d MMMM yyyy") : "Select your transfer date"}</span>
              <CalendarIcon size={14} className="text-sage-muted" aria-hidden="true" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border border-border/60 shadow-soft rounded-xl" align="start">
            <Calendar
              mode="single"
              selected={transferDate}
              onSelect={(d) => {
                setTransferDate(d);
                setOpen(false);
              }}
              disabled={(date) => date > new Date() || date < subDays(new Date(), 300)}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label
          htmlFor="ivf-transfer-type"
          className="block font-sans text-[11px] font-light text-muted-foreground/70 mb-1.5 text-left"
        >
          Transfer type
        </label>
        <div className="relative">
          <select
            id="ivf-transfer-type"
            value={transferType}
            onChange={(e) => setTransferType(e.target.value as IVFTransferType)}
            className="w-full appearance-none bg-card border border-border/60 rounded-xl px-4 py-3 font-sans text-sm font-light text-foreground focus:outline-none hover:border-sage/40 transition-all pr-10"
          >
            <option value="5day">5-day transfer (blastocyst)</option>
            <option value="3day">3-day transfer (cleavage)</option>
          </select>
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-muted pointer-events-none w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <Button
        onClick={handleTrack}
        disabled={!transferDate}
        className={cn(
          "w-full h-auto flex items-center justify-center gap-2 rounded-pill px-7 py-3.5 font-sans text-sm font-medium transition-all bg-terracotta text-terracotta-foreground shadow-cta",
          transferDate ? "hover:bg-terracotta-hover" : "opacity-50 cursor-not-allowed",
        )}
      >
        <ArrowRight size={15} aria-hidden="true" />
        Track my timeline
      </Button>

      <p className="font-sans text-[10px] font-light text-muted-foreground/40 text-center leading-relaxed pt-0.5">
        An estimate based on your transfer date. Experiences can vary. Nothing you enter here is saved.
      </p>
    </div>
  );
};

export default IVFTimelineForm;
