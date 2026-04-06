import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, MessageCircle, ArrowDown, ArrowRight, Clock, Target, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const commonQuestions = [
  { text: "When am I most fertile?", sub: "Understanding your fertile window", icon: Target },
  { text: "When should I test?", sub: "Timing and accuracy", icon: Clock },
  { text: "Am I ovulating yet?", sub: "Signs and tracking", icon: Heart },
];

const cycleLengths = Array.from({ length: 16 }, (_, i) => i + 21);

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
      {/* Multi-layer ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.5)' }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.25)' }}
        />
        <div
          className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.15)' }}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-center">

          {/* Left — copy + calculator */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto md:mx-0">
            {/* Stage colour trail */}
            <div className="flex items-center gap-1.5 mb-5 animate-fade-up">
              {[
                { var: '--stage-ttc-accent', w: 'w-12' },
                { var: '--stage-pregnancy-accent', w: 'w-3' },
                { var: '--stage-ivf-accent', w: 'w-3' },
              ].map((t, i) => (
                <div
                  key={i}
                  className={`h-0.5 rounded-full ${t.w}`}
                  style={{ backgroundColor: `hsl(var(${t.var}) / ${i === 0 ? '0.7' : '0.15'})` }}
                />
              ))}
            </div>

            <p
              className="font-sans text-[11px] font-light tracking-[0.25em] uppercase mb-4 animate-fade-up"
              style={{ color: 'hsl(var(--stage-ttc-accent))' }}
            >
              Trying to Conceive
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.75rem] text-foreground leading-[1.06] mb-4 animate-fade-up">
              Understand your cycle.<br />
              <span className="italic">Find your window.</span>
            </h1>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-4 animate-fade-up [animation-delay:0.1s] max-w-md">
              A calm, practical guide through every stage of trying to conceive. From cycle awareness to the two-week wait.
            </p>

            {/* Stat anchors */}
            <div className="flex items-center gap-6 mb-7 animate-fade-up [animation-delay:0.12s]">
              {[
                { n: "3", label: "stages" },
                { n: "5–6", label: "fertile days" },
                { n: "~85%", label: "within a year" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center md:items-start">
                  <span className="font-serif text-xl text-foreground leading-none">{s.n}</span>
                  <span className="font-sans text-[9px] font-light text-muted-foreground/55 uppercase tracking-widest mt-1">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Calculator card */}
            <div
              className="w-full animate-fade-up [animation-delay:0.2s] rounded-2xl p-5 sm:p-6 space-y-4 border backdrop-blur-sm"
              style={{
                backgroundColor: 'hsl(var(--stage-ttc) / 0.18)',
                borderColor: 'hsl(var(--stage-ttc-accent) / 0.18)',
              }}
            >
              <div className="flex items-center justify-between">
                <p
                  className="font-sans text-[11px] font-light tracking-[0.15em] uppercase"
                  style={{ color: 'hsl(var(--stage-ttc-accent))' }}
                >
                  Ovulation Calculator
                </p>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.35)' }}
                >
                  <CalendarIcon size={11} style={{ color: 'hsl(var(--stage-ttc-accent))' }} />
                </div>
              </div>

              <div>
                <p className="font-sans text-[10px] font-light tracking-[0.12em] uppercase text-muted-foreground/60 mb-2 text-left">
                  First day of your last period
                </p>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <button
                      className={cn(
                        "w-full flex items-center justify-between bg-card border border-border/50 rounded-xl px-5 py-3.5 font-sans text-sm font-light transition-all hover:border-sage/40 focus:outline-none focus:border-sage/50",
                        lmpDate ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <span>{lmpDate ? format(lmpDate, "d MMMM yyyy") : "Select date"}</span>
                      <CalendarIcon size={14} className="text-sage-muted" />
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

              <div>
                <p className="font-sans text-[10px] font-light tracking-[0.12em] uppercase text-muted-foreground/60 mb-2 text-left">
                  Cycle length
                </p>
                <div className="relative">
                  <select
                    value={cycleLength}
                    onChange={(e) => setCycleLength(Number(e.target.value))}
                    className="w-full appearance-none bg-card border border-border/50 rounded-xl px-5 py-3.5 font-sans text-sm font-light text-foreground focus:outline-none focus:border-sage/50 hover:border-sage/40 transition-all pr-10"
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
                  "w-full flex items-center justify-center gap-2 rounded-pill px-7 py-3.5 font-sans text-sm font-medium transition-all",
                  lmpDate
                    ? "bg-terracotta text-terracotta-foreground shadow-cta hover:bg-terracotta-hover"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                <ArrowRight size={15} />
                Show Fertility Dates
              </button>

              <p className="font-sans text-[10px] font-light text-muted-foreground/45 text-center leading-relaxed">
                An estimate based on your typical cycle. Ovulation can vary month to month.
              </p>
            </div>
          </div>

          {/* Right — questions panel */}
          <div className="flex justify-center md:justify-end animate-fade-up [animation-delay:0.15s]">
            <div className="w-full max-w-sm md:max-w-md">
              <p
                className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-5 text-left"
                style={{ color: 'hsl(var(--stage-ttc-accent))' }}
              >
                Common questions
              </p>
              <div className="space-y-3">
                {commonQuestions.map((prompt, i) => {
                  const Icon = prompt.icon;
                  return (
                    <button
                      key={i}
                      className="group flex items-start gap-3.5 w-full text-left py-4 px-5 rounded-xl border bg-card/60 hover:bg-card shadow-card-brand transition-all"
                      style={{ borderColor: 'hsl(var(--stage-ttc) / 0.3)' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-ttc-accent) / 0.5)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-ttc) / 0.3)'}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.3)' }}
                      >
                        <Icon size={12} style={{ color: 'hsl(var(--stage-ttc-accent))' }} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-sans text-sm font-light text-foreground/85 group-hover:text-foreground transition-colors leading-snug">
                          {prompt.text}
                        </span>
                        <span className="font-sans text-[11px] font-light text-muted-foreground/50">
                          {prompt.sub}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* TTC emotional truth */}
              <div
                className="mt-6 rounded-xl p-5"
                style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.15)' }}
              >
                <p className="font-serif italic text-[15px] text-foreground/60 leading-relaxed mb-3">
                  "The hardest part isn't the timing. It's the waiting."
                </p>
                <p className="font-sans text-xs font-light text-muted-foreground/50">
                  A space that understands what this journey really feels like.
                </p>
              </div>

              <div className="mt-5">
                <button className="flex items-center gap-2 border text-foreground rounded-pill px-6 py-3 font-sans text-sm font-light hover:bg-parchment-dark transition-all w-full justify-center"
                  style={{ borderColor: 'hsl(var(--stage-ttc-accent) / 0.25)' }}
                >
                  <ArrowDown size={14} />
                  Explore the full guide
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-parchment-dark to-transparent pointer-events-none" />
    </section>
  );
};

export default TTCHero;
