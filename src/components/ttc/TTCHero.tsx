import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, MessageCircle, ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const commonQuestions = [
  "When am I most fertile?",
  "When should I test?",
  "Am I ovulating yet?",
];

const cycleLengths = Array.from({ length: 16 }, (_, i) => i + 21); // 21-36

const TTCHero = () => {
  const navigate = useNavigate();
  const [lmpDate, setLmpDate] = useState<Date>();
  const [cycleLength, setCycleLength] = useState(28);
  const [open, setOpen] = useState(false);

  const handleShowDates = () => {
    if (lmpDate) {
      const lmpStr = format(lmpDate, "yyyy-MM-dd");
      navigate(`/ovulation-calculator?lmp=${lmpStr}&cycle=${cycleLength}`);
    }
  };

  return (
    <section className="relative min-h-screen bg-parchment overflow-hidden flex flex-col justify-center pt-20 md:pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-sage-bg/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 items-center">

          {/* Left: copy + calculator */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto md:mx-0">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              TTC Journey
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-5 animate-fade-up">
              Your <span className="italic">TTC journey</span>
            </h1>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10 animate-fade-up [animation-delay:0.1s] max-w-md">
              Understand your cycle, your fertile window, and what to focus on next.
            </p>

            {/* Calculator form */}
            <div className="w-full animate-fade-up [animation-delay:0.2s] space-y-5">
              {/* LMP date */}
              <div>
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3 text-left">
                  First day of your last period
                </p>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <button
                      className={cn(
                        "w-full flex items-center justify-between bg-parchment border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light transition-all hover:border-sage/40 focus:outline-none focus:border-sage/50",
                        lmpDate ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <span>{lmpDate ? format(lmpDate, "d MMMM yyyy") : "Select date"}</span>
                      <CalendarIcon size={15} className="text-sage-muted" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border border-border/60 shadow-soft rounded-xl" align="start">
                    <Calendar
                      mode="single"
                      selected={lmpDate}
                      onSelect={(d) => { setLmpDate(d); setOpen(false); }}
                      disabled={(date) => date > new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Cycle length */}
              <div>
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3 text-left">
                  Cycle length
                </p>
                <div className="relative">
                  <select
                    value={cycleLength}
                    onChange={(e) => setCycleLength(Number(e.target.value))}
                    className="w-full appearance-none bg-parchment border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground focus:outline-none focus:border-sage/50 hover:border-sage/40 transition-all pr-10"
                  >
                    {cycleLengths.map((len) => (
                      <option key={len} value={len}>
                        {len} days{len === 28 ? " (average)" : ""}
                      </option>
                    ))}
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-muted pointer-events-none w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <button
                onClick={handleShowDates}
                disabled={!lmpDate}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-pill px-7 py-4 font-sans text-sm font-medium transition-all",
                  lmpDate
                    ? "bg-terracotta text-terracotta-foreground shadow-cta hover:bg-terracotta-hover"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                <ArrowRight size={15} />
                Show Fertility Dates
              </button>

              <p className="font-sans text-[11px] font-light text-muted-foreground/60 text-center leading-relaxed">
                This is an estimate based on your typical cycle. Ovulation can vary from month to month.
              </p>
            </div>
          </div>

          {/* Right: common questions */}
          <div className="flex justify-center md:justify-end animate-fade-up [animation-delay:0.15s]">
            <div className="w-full max-w-sm md:max-w-md space-y-4">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-5 text-left">
                Common questions
              </p>
              {commonQuestions.map((prompt, i) => (
                <button
                  key={i}
                  className="group flex items-center gap-3 w-full text-left py-4 px-5 rounded-xl border border-border/40 bg-card/60 hover:border-sage/40 hover:bg-card shadow-card-brand transition-all"
                >
                  <MessageCircle size={13} className="text-sage shrink-0" />
                  <span className="font-sans text-sm font-light text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed">
                    {prompt}
                  </span>
                </button>
              ))}

              <div className="pt-4">
                <button className="flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-6 py-3 font-sans text-sm font-light hover:bg-parchment-dark transition-all w-full justify-center">
                  <ArrowDown size={14} />
                  Understand your TTC journey
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-parchment to-transparent pointer-events-none" />
    </section>
  );
};

export default TTCHero;
