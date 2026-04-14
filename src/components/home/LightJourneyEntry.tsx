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
    <section className="bg-parchment py-12 md:py-16">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-lg text-center">
        <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-sage mb-3">
          Begin here
        </p>
        <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-2">
          Find your week
        </h2>
        <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed mb-7 max-w-xs mx-auto">
          Enter the first day of your last period and we'll personalise your journey.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex-1 flex items-center justify-between bg-card border border-border/40 rounded-xl px-5 py-3.5 font-sans text-sm font-light transition-all hover:border-sage/40 focus:outline-none focus:border-sage/50",
                  date ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <span>{date ? format(date, "d MMMM yyyy") : "Select date"}</span>
                <CalendarIcon size={15} className="text-sage-muted" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border border-border/60 shadow-soft rounded-xl" align="center">
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
              "inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-xl px-7 py-3.5 font-sans text-sm font-medium shadow-cta transition-all",
              date ? "hover:bg-terracotta-hover" : "opacity-45 cursor-not-allowed"
            )}
          >
            Start
            <ArrowRight size={15} />
          </button>
        </div>

        <p className="font-sans text-[11px] font-light text-muted-foreground/60 mt-4 leading-relaxed">
          Not sure of the date?{" "}
          <a href="/due-date-calculator" className="underline underline-offset-2 decoration-sage/30 hover:text-foreground transition-colors">
            Use our full calculator
          </a>
        </p>
      </div>
    </section>
  );
};

export default LightJourneyEntry;
