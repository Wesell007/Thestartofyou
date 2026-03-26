import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, MessageCircle, ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const [transferType, setTransferType] = useState<"5day" | "3day">("5day");
  const [open, setOpen] = useState(false);

  const handleTrack = () => {
    if (transferDate) onCalculate(transferDate);
  };

  return (
    <section className="relative min-h-screen bg-parchment overflow-hidden flex flex-col justify-center pt-20 md:pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-lavender-section/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 items-center">

          {/* Left: copy + calculator form */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto md:mx-0">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              IVF Journey
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-5 animate-fade-up">
              Your <span className="italic">IVF journey</span>
            </h1>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10 animate-fade-up [animation-delay:0.1s] max-w-md">
              Understand where you are, what's happening, and what to expect next.
            </p>

            {/* IVF Timeline Calculator — sits where the form sits on homepage */}
            <div className="w-full animate-fade-up [animation-delay:0.2s] space-y-5">
              <div>
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3 text-left">
                  Embryo transfer date
                </p>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <button
                      className={cn(
                        "w-full flex items-center justify-between bg-parchment border border-border/60 rounded-xl px-5 py-4 font-sans text-sm font-light transition-all hover:border-sage/40 focus:outline-none focus:border-sage/50",
                        transferDate ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <span>{transferDate ? format(transferDate, "d MMMM yyyy") : "Select your transfer date"}</span>
                      <CalendarIcon size={15} className="text-sage-muted" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border border-border/60 shadow-soft rounded-xl" align="start">
                    <Calendar
                      mode="single"
                      selected={transferDate}
                      onSelect={(d) => { setTransferDate(d); setOpen(false); }}
                      disabled={(date) => date > new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <button
                onClick={handleTrack}
                disabled={!transferDate}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-pill px-7 py-4 font-sans text-sm font-medium transition-all",
                  transferDate
                    ? "bg-terracotta text-terracotta-foreground shadow-cta hover:bg-terracotta-hover"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                <ArrowRight size={15} />
                Track your timeline
              </button>

              <p className="font-sans text-[11px] font-light text-muted-foreground/60 text-center leading-relaxed">
                This gives an estimate based on your transfer date — experiences can vary.
              </p>
            </div>
          </div>

          {/* Right: suggested prompts as visual companion */}
          <div className="flex justify-center md:justify-end animate-fade-up [animation-delay:0.15s]">
            <div className="w-full max-w-sm md:max-w-md space-y-4">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-5 text-left">
                Common questions
              </p>
              {suggestedPrompts.map((prompt, i) => (
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
                  Understand your IVF journey
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

export default IVFHero;
