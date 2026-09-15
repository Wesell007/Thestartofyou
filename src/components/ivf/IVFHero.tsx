import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, subDays } from "date-fns";
import { CalendarIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import heroMoment from "@/assets/ivf-hero-moment.jpg";

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
    <section className="relative bg-parchment overflow-hidden pt-28 md:pt-32 pb-12 md:pb-16">

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left column — utility anchor */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto md:mx-0">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.4)' }} />
              <span
                className="font-sans text-[11px] font-light tracking-[0.25em] uppercase"
                style={{ color: 'hsl(var(--stage-ivf-accent))' }}
              >
                IVF Journey
              </span>
              <div className="h-px w-10" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.4)' }} />
            </div>

            <h1 className="font-serif text-[2.5rem] sm:text-5xl lg:text-[3.75rem] text-foreground leading-[1.06] mb-4 animate-fade-up">
              Understand your stage.<br />
              <span className="italic">Navigate the waiting.</span>
            </h1>

            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-7 animate-fade-up [animation-delay:0.1s] max-w-md">
              Track your timeline, find answers to the questions that come between appointments, and move through each stage with clarity.
            </p>

            {/* Calculator card — the primary utility object */}
            <div
              className="w-full rounded-2xl p-5 sm:p-6 animate-fade-up [animation-delay:0.2s] space-y-3.5 border backdrop-blur-sm"
              style={{
                backgroundColor: 'hsl(var(--stage-ivf) / 0.18)',
                borderColor: 'hsl(var(--stage-ivf-accent) / 0.18)',
              }}
            >
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                Track your IVF timeline
              </p>

              <div>
                <p className="font-sans text-[11px] font-light text-muted-foreground/70 mb-1.5 text-left">Embryo transfer date</p>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <button
                      className={cn(
                        "w-full flex items-center justify-between bg-card border border-border/60 rounded-xl px-4 py-3 font-sans text-sm font-light transition-all hover:border-sage/40 focus:outline-none",
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
                      disabled={(date) => date > new Date() || date < subDays(new Date(), 300)}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <p className="font-sans text-[11px] font-light text-muted-foreground/70 mb-1.5 text-left">Transfer type</p>
                <div className="relative">
                  <select
                    value={transferType}
                    onChange={(e) => setTransferType(e.target.value as "5day" | "3day")}
                    className="w-full appearance-none bg-card border border-border/60 rounded-xl px-4 py-3 font-sans text-sm font-light text-foreground focus:outline-none hover:border-sage/40 transition-all pr-10"
                  >
                    <option value="5day">5-day transfer (blastocyst)</option>
                    <option value="3day">3-day transfer (cleavage)</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-muted pointer-events-none w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <Button
                onClick={handleTrack}
                disabled={!transferDate}
                className={cn(
                  "w-full h-auto flex items-center justify-center gap-2 rounded-pill px-7 py-3.5 font-sans text-sm font-medium transition-all bg-terracotta text-terracotta-foreground shadow-cta",
                  transferDate ? "hover:bg-terracotta-hover" : "opacity-50 cursor-not-allowed"
                )}
              >
                <ArrowRight size={15} />
                Track your timeline
              </Button>

              <p className="font-sans text-[10px] font-light text-muted-foreground/40 text-center leading-relaxed pt-0.5">
                An estimate based on your transfer date. Experiences can vary.
              </p>
            </div>
          </div>

          {/* Right column — single photographic moment + quiet truth band */}
          <div className="flex justify-center md:justify-end animate-fade-up [animation-delay:0.15s]">
            <div className="w-full max-w-sm md:max-w-[460px] space-y-5">
              <div
                className="relative rounded-[1.25rem] overflow-hidden ring-1 shadow-[0_40px_100px_-45px_rgba(60,40,90,0.32)]"
                style={{ ['--tw-ring-color' as never]: 'hsl(var(--stage-ivf-accent) / 0.22)' }}
              >
                <img
                  src={heroMoment}
                  alt="A quiet morning moment with lavender and tea, evoking the reflective spaces inside an IVF journey"
                  width={1024}
                  height={1280}
                  className="w-full h-auto max-h-[380px] md:max-h-[520px] object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, transparent 55%, hsl(var(--stage-ivf) / 0.22) 100%)' }}
                />
              </div>

              {/* Emotional truth band */}
              <div
                className="rounded-2xl px-6 py-5 border backdrop-blur-sm"
                style={{
                  backgroundColor: 'hsl(var(--stage-ivf) / 0.14)',
                  borderColor: 'hsl(var(--stage-ivf-accent) / 0.16)',
                }}
              >
                <p className="font-sans text-[10px] font-light tracking-[0.22em] uppercase mb-3" style={{ color: 'hsl(var(--stage-ivf-accent) / 0.9)' }}>
                  What many people feel
                </p>
                <p className="font-serif italic text-[16px] sm:text-[17px] text-foreground/75 leading-relaxed mb-4">
                  "The process has structure. The emotions often don't."
                </p>
                <div
                  className="h-px w-full mb-4"
                  style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.14)' }}
                />
                <div className="flex items-center gap-7">
                  {[
                    { n: "1 in 6", label: "couples" },
                    { n: "Guided", label: "at every step" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-baseline gap-1.5">
                      <span className="font-serif text-[15px] text-foreground/80">{s.n}</span>
                      <span className="font-sans text-[9.5px] font-light text-muted-foreground/60 uppercase tracking-[0.1em]">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default IVFHero;
