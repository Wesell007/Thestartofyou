import { useState, useRef } from "react";
import { format } from "date-fns";
import { CalendarIcon, MessageCircle, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const suggestedPrompts = [
  "When should I test?",
  "What happens after transfer?",
  "Is this normal at this stage?",
];

interface IVFHeroProps {
  onCalculate: (date: Date) => void;
}

const IVFHero = ({ onCalculate }: IVFHeroProps) => {
  const [transferDate, setTransferDate] = useState<Date>();

  const handleTrack = () => {
    if (transferDate) onCalculate(transferDate);
  };

  return (
    <section className="relative min-h-[90vh] bg-parchment overflow-hidden flex flex-col justify-center pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-lavender-section/40 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left — Title + prompts */}
          <div className="text-left">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
              IVF Journey
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.1] mb-6 animate-fade-up">
              Your <span className="italic">IVF journey</span>
            </h1>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10 max-w-sm animate-fade-up [animation-delay:0.1s]">
              Understand where you are, what's happening, and what to expect next.
            </p>

            <div className="space-y-2.5 animate-fade-up [animation-delay:0.2s]">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
                Common questions
              </p>
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  className="group flex items-center gap-3 w-full text-left py-2.5 px-4 rounded-md border border-border/40 bg-card/60 hover:border-sage/40 hover:bg-card transition-all"
                >
                  <MessageCircle size={13} className="text-sage shrink-0" />
                  <span className="font-sans text-sm font-light text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed">
                    {prompt}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right — IVF Timeline Calculator */}
          <div className="animate-fade-up [animation-delay:0.15s]">
            <div className="bg-card border border-border/50 rounded-xl p-8 shadow-card-brand">
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-2">
                IVF Timeline
              </p>
              <h2 className="font-serif text-2xl text-foreground mb-1 leading-snug">
                Track your timeline
              </h2>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-7">
                Enter your embryo transfer date to understand where you are and what comes next.
              </p>

              <div className="mb-6">
                <label className="block font-sans text-xs font-light tracking-[0.1em] uppercase text-sage-muted mb-3">
                  Embryo transfer date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-background border-border/60 rounded-md px-4 py-3 h-auto font-sans text-sm font-light hover:bg-parchment-dark hover:border-sage/40 transition-all",
                        !transferDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon size={14} className="mr-2 text-sage shrink-0" />
                      {transferDate ? format(transferDate, "d MMMM yyyy") : "Select transfer date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={transferDate}
                      onSelect={setTransferDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                      disabled={(date) => date > new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <button
                onClick={handleTrack}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-pill px-7 py-3.5 font-sans text-sm font-medium transition-all",
                  transferDate
                    ? "bg-terracotta text-terracotta-foreground shadow-cta hover:bg-terracotta-hover"
                    : "bg-terracotta/40 text-terracotta-foreground/60 cursor-not-allowed"
                )}
                disabled={!transferDate}
              >
                <CalendarIcon size={14} />
                Track your timeline
              </button>

              <div className="flex items-center gap-4 my-5">
                <div className="h-px flex-1 bg-border/40" />
                <span className="font-sans text-xs font-light text-muted-foreground/50">or</span>
                <div className="h-px flex-1 bg-border/40" />
              </div>

              <button className="w-full flex items-center justify-center gap-2 border border-foreground/20 text-foreground rounded-pill px-7 py-3 font-sans text-sm font-light hover:bg-parchment-dark transition-all">
                <ArrowDown size={14} />
                Understand your IVF journey
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-parchment to-transparent pointer-events-none" />
    </section>
  );
};

export default IVFHero;
