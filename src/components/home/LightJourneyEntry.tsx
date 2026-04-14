import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { format, addDays, isBefore, isAfter } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const LightJourneyEntry = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const today = new Date();

  const handleStart = () => {
    if (date) {
      navigate(`/due-date-results?lmp=${date.getTime()}`);
    }
  };

  return (
    <section className="relative bg-parchment-dark py-14 md:py-20">
      {/* Top transition line */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-md text-center">
        <h2 className="font-serif text-[1.35rem] sm:text-[1.5rem] text-foreground mb-2">
          Find your week
        </h2>
        <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed mb-8 max-w-[17rem] mx-auto">
          Enter the first day of your last period.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-sm mx-auto">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex-1 flex items-center justify-between bg-card border border-border/30 rounded-xl px-5 py-3.5 font-sans text-[13.5px] font-light transition-all hover:border-sage/40 focus:outline-none focus:border-sage/50",
                  date ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <span>{date ? format(date, "d MMMM yyyy") : "Select date"}</span>
                <CalendarIcon size={14} className="text-sage-muted opacity-70" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border border-border/50 shadow-soft rounded-xl" align="center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => { setDate(d); setOpen(false); }}
                disabled={(d) =>
                  isAfter(d, today) || isBefore(d, addDays(today, -300))
                }
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <button
            onClick={handleStart}
            disabled={!date}
            className={cn(
              "inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-xl px-7 py-3.5 font-sans text-[13.5px] font-medium shadow-cta transition-all",
              date ? "hover:bg-terracotta-hover" : "opacity-40 cursor-not-allowed"
            )}
          >
            Start
            <ArrowRight size={14} />
          </button>
        </div>

        <p className="font-sans text-[11px] font-light text-muted-foreground/50 mt-5">
          Not sure?{" "}
          <a href="/due-date-calculator" className="underline underline-offset-2 decoration-border hover:text-muted-foreground transition-colors">
            Use the full calculator
          </a>
        </p>
      </div>
    </section>
  );
};

export default LightJourneyEntry;
