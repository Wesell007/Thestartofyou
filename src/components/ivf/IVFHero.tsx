import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, MessageCircle, ArrowRight, Clock, Activity, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const suggestedPrompts = [
  { text: "When should I test after transfer?", icon: Clock },
  { text: "What happens during the two-week wait?", icon: Activity },
  { text: "Is this symptom normal at this stage?", icon: Heart },
];

const IVFHero = () => {
  const navigate = useNavigate();
  const [transferDate, setTransferDate] = useState<Date>();
  const [transferType, setTransferType] = useState<"5day" | "3day">("5day");
  const [open, setOpen] = useState(false);

  const handleTrack = () => {
    if (transferDate) {
      navigate(`/ivf-timeline?date=${transferDate.getTime()}&type=${transferType}`);
    }
  };

  return (
    <section className="relative min-h-screen bg-parchment overflow-hidden flex flex-col justify-center pt-20 md:pt-24 pb-16">
      {/* Triple ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.4)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.25)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.08)' }}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-center">

          {/* Left column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto md:mx-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span
                className="font-sans text-[11px] font-light tracking-[0.25em] uppercase"
                style={{ color: 'hsl(var(--stage-ivf-accent))' }}
              >
                IVF Journey
              </span>
              <div className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.08] mb-5 animate-fade-up">
              Navigate your IVF<br />
              <span className="italic">with clarity and care</span>
            </h1>

            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8 animate-fade-up [animation-delay:0.1s] max-w-md">
              Track your timeline, understand each stage, and find guidance designed for the unique emotional and medical rhythm of IVF.
            </p>

            {/* Stat anchors */}
            <div className="flex items-center gap-6 mb-8 animate-fade-up [animation-delay:0.15s]">
              {[
                { n: "3", label: "stages" },
                { n: "14", label: "day wait" },
                { n: "1", label: "step at a time" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center md:items-start">
                  <span className="font-serif text-2xl text-foreground">{s.n}</span>
                  <span className="font-sans text-[10px] font-light text-muted-foreground/60 uppercase tracking-wide">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Calculator card */}
            <div
              className="w-full rounded-2xl p-6 sm:p-7 animate-fade-up [animation-delay:0.2s] space-y-4 border"
              style={{
                backgroundColor: 'hsl(var(--stage-ivf) / 0.2)',
                borderColor: 'hsl(var(--stage-ivf-accent) / 0.15)',
              }}
            >
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-left" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                Track your IVF timeline
              </p>

              <div>
                <p className="font-sans text-[11px] font-light text-muted-foreground mb-2 text-left">Embryo transfer date</p>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <button
                      className={cn(
                        "w-full flex items-center justify-between bg-card border border-border/60 rounded-xl px-5 py-3.5 font-sans text-sm font-light transition-all hover:border-sage/40 focus:outline-none",
                        transferDate ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <span>{transferDate ? format(transferDate, "d MMMM yyyy") : "Select your transfer date"}</span>
                      <CalendarIcon size={14} className="text-sage-muted" />
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

              <div>
                <p className="font-sans text-[11px] font-light text-muted-foreground mb-2 text-left">Transfer type</p>
                <div className="relative">
                  <select
                    value={transferType}
                    onChange={(e) => setTransferType(e.target.value as "5day" | "3day")}
                    className="w-full appearance-none bg-card border border-border/60 rounded-xl px-5 py-3.5 font-sans text-sm font-light text-foreground focus:outline-none hover:border-sage/40 transition-all pr-10"
                  >
                    <option value="5day">5-day transfer (blastocyst)</option>
                    <option value="3day">3-day transfer (cleavage)</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-muted pointer-events-none w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <button
                onClick={handleTrack}
                disabled={!transferDate}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-pill px-7 py-3.5 font-sans text-sm font-medium transition-all bg-terracotta text-terracotta-foreground shadow-cta",
                  transferDate ? "hover:bg-terracotta-hover" : "opacity-50 cursor-not-allowed"
                )}
              >
                <ArrowRight size={15} />
                Track your timeline
              </button>
            </div>

            <p className="mt-3 font-sans text-[11px] font-light text-muted-foreground/50 text-center leading-relaxed">
              An estimate based on your transfer date. Experiences can vary.
            </p>
          </div>

          {/* Right column — questions */}
          <div className="flex justify-center md:justify-end animate-fade-up [animation-delay:0.15s]">
            <div className="w-full max-w-sm md:max-w-md space-y-3">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase mb-4 text-left" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                Common questions during IVF
              </p>
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  className="group flex items-center gap-4 w-full text-left py-4 px-5 rounded-xl border bg-card/60 hover:bg-card shadow-card-brand transition-all"
                  style={{ borderColor: 'hsl(var(--stage-ivf) / 0.3)' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-ivf-accent) / 0.5)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-ivf) / 0.3)'}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.3)' }}
                  >
                    <prompt.icon size={14} style={{ color: 'hsl(var(--stage-ivf-accent))' }} />
                  </div>
                  <span className="font-sans text-sm font-light text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed">
                    {prompt.text}
                  </span>
                </button>
              ))}

              {/* Emotional truth box */}
              <div
                className="mt-5 rounded-xl p-5 border"
                style={{
                  backgroundColor: 'hsl(var(--stage-ivf) / 0.15)',
                  borderColor: 'hsl(var(--stage-ivf-accent) / 0.1)',
                }}
              >
                <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-2" style={{ color: 'hsl(var(--stage-ivf-accent) / 0.7)' }}>
                  What many people feel
                </p>
                <p className="font-serif italic text-sm text-foreground/60 leading-relaxed">
                  "The process has structure. The emotions often don't. That's completely normal."
                </p>
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
