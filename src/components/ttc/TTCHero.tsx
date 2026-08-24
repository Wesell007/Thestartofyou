import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, ArrowDown, ArrowRight, Clock, Target, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import heroImg from "@/assets/ttc-hero-lifestyle.jpg";
import sprigImg from "@/assets/topic-mini-sprig.png";

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
    <section className="relative bg-parchment overflow-hidden pt-[88px] pb-12 sm:pt-[104px] sm:pb-16 md:pt-[120px] md:pb-24 lg:pt-[140px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 md:h-64 -z-0"
        style={{
          background:
            'linear-gradient(180deg, hsl(var(--stage-ttc) / 0.45) 0%, transparent 100%)',
        }}
      />

      {/* Left-edge lifestyle photo — desktop only, narrower than Pregnancy for breathing room */}
      <div className="hidden md:block absolute top-0 left-0 h-full w-[22%] lg:w-[22%] z-0">
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-parchment" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        {/* MOBILE: image strip on top */}
        <div className="md:hidden mb-6">
          <div
            className="relative rounded-3xl overflow-hidden border shadow-card-brand"
            style={{ borderColor: 'hsl(var(--stage-ttc-accent) / 0.18)' }}
          >
            <img
              src={heroImg}
              alt=""
              aria-hidden="true"
              className="w-full h-44 sm:h-56 object-cover"
              style={{ objectPosition: '50% 45%' }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, transparent 55%, hsl(var(--parchment) / 0.7) 100%)',
              }}
            />
            <div className="absolute left-4 top-4">
              <span
                className="inline-block rounded-full px-3 py-1 font-sans text-[10px] font-light tracking-[0.22em] uppercase backdrop-blur-sm"
                style={{
                  backgroundColor: 'hsl(var(--parchment) / 0.85)',
                  color: 'hsl(var(--stage-ttc-accent))',
                }}
              >
                Trying to Conceive
              </span>
            </div>
          </div>
        </div>

        <div className="md:pl-[18%] lg:pl-[16%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">

            {/* Left editorial */}
            <div className="text-left pt-2 md:pt-4">
              <p
                className="hidden md:block font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-5"
                style={{ color: 'hsl(var(--stage-ttc-accent))' }}
              >
                Trying to Conceive
              </p>

              <h1 className="font-serif text-[1.85rem] sm:text-4xl md:text-[2.75rem] lg:text-[3rem] text-foreground leading-[1.08] mb-4 sm:mb-5">
                Understand your cycle.{" "}
                <span className="italic font-normal">Find your window.</span>
              </h1>

              <p className="font-sans text-[14.5px] sm:text-base font-light text-muted-foreground leading-relaxed mb-6 sm:mb-7 max-w-md">
                A calm, practical guide through every stage of trying to
                conceive, from cycle awareness to the two-week wait.
              </p>

              <div className="flex items-stretch gap-4 sm:gap-8 mb-7">
                {[
                  { label: "3 stages", sub: "of the journey" },
                  { label: "5–6 days", sub: "fertile window" },
                  { label: "~85%", sub: "within a year" },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex flex-col ${i > 0 ? 'pl-4 sm:pl-8 border-l' : ''}`}
                    style={i > 0 ? { borderColor: 'hsl(var(--stage-ttc-accent) / 0.18)' } : undefined}
                  >
                    <span className="font-serif text-base sm:text-xl text-foreground leading-tight">
                      {item.label}
                    </span>
                    <span className="font-sans text-[10.5px] sm:text-[11px] font-light text-muted-foreground/70 mt-0.5">
                      {item.sub}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="rounded-xl p-5 max-w-md"
                style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.18)' }}
              >
                <p className="font-serif italic text-[14.5px] text-foreground/65 leading-relaxed mb-2">
                  "The hardest part isn't the timing. It's the waiting."
                </p>
                <p className="font-sans text-[11px] font-light text-muted-foreground/60">
                  A space that understands what this journey really feels like.
                </p>
              </div>
            </div>

            {/* Right — calculator + common questions */}
            <div className="relative">
              <img
                src={sprigImg}
                alt=""
                aria-hidden="true"
                className="hidden md:block absolute -top-8 -right-2 lg:-right-6 w-16 lg:w-20 opacity-45 pointer-events-none select-none rotate-12"
              />
              <div
                className="bg-card border rounded-[1.25rem] p-6 sm:p-7 relative"
                style={{
                  borderColor: 'hsl(var(--stage-ttc-accent) / 0.2)',
                  boxShadow:
                    '0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 22px 50px -28px hsl(var(--stage-ttc-accent) / 0.35)',
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-7 right-7 h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, hsl(var(--stage-ttc-accent) / 0.4), transparent)',
                  }}
                />
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'hsl(var(--stage-ttc-accent) / 0.14)' }}
                  >
                    <CalendarIcon size={13} style={{ color: 'hsl(var(--stage-ttc-accent))' }} />
                  </div>
                  <p
                    className="font-sans text-[11px] font-light tracking-[0.22em] uppercase"
                    style={{ color: 'hsl(var(--stage-ttc-accent))' }}
                  >
                    Ovulation calculator
                  </p>
                </div>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5">
                  See your fertile window for this cycle.
                </p>

                <div className="space-y-4">
                  <div>
                    <p className="font-sans text-[10px] font-light tracking-[0.12em] uppercase text-muted-foreground/60 mb-2">
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
                    <p className="font-sans text-[10px] font-light tracking-[0.12em] uppercase text-muted-foreground/60 mb-2">
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
                    Show fertility dates
                  </button>
                </div>

                <p className="mt-4 font-sans text-[11px] font-light text-muted-foreground/70 leading-relaxed">
                  An estimate based on your typical cycle. Ovulation can vary
                  month to month.
                </p>
              </div>

              <div className="mt-8">
                <p
                  className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-4"
                  style={{ color: 'hsl(var(--stage-ttc-accent))' }}
                >
                  Common questions
                </p>
                <div className="space-y-2.5">
                  {commonQuestions.map((prompt, i) => {
                    const Icon = prompt.icon;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          navigateToAsk(navigate, prompt.text, {
                            context: "Trying to conceive",
                            stage: "ttc",
                          })
                        }
                        className="group flex min-h-11 items-start gap-3 w-full text-left py-3 px-4 rounded-xl border bg-card/60 hover:bg-card transition-all"
                        style={{ borderColor: 'hsl(var(--stage-ttc) / 0.3)' }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.3)' }}
                        >
                          <Icon size={11} style={{ color: 'hsl(var(--stage-ttc-accent))' }} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-sans text-[13.5px] font-light text-foreground/85 group-hover:text-foreground transition-colors leading-snug">
                            {prompt.text}
                          </span>
                          <span className="font-sans text-[11px] font-light text-muted-foreground/55">
                            {prompt.sub}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  className="mt-4 flex items-center gap-2 border text-foreground rounded-pill px-5 py-2.5 font-sans text-[13px] font-light hover:bg-parchment-dark transition-all w-full justify-center"
                  style={{ borderColor: 'hsl(var(--stage-ttc-accent) / 0.25)' }}
                >
                  <ArrowDown size={13} />
                  Explore the full guide
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'hsl(var(--stage-ttc-accent) / 0.12)' }}
      />
    </section>
  );
};

export default TTCHero;
