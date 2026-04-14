import { useNavigate } from "react-router-dom";
import heroLifestyle from "@/assets/home-hero-lifestyle.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import DueDateCalculatorForm from "@/components/shared/DueDateCalculatorForm";
import { Shield, BookOpen, Heart, Users } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleResult = (lmpDate: Date) => {
    navigate(`/due-date-results?lmp=${lmpDate.getTime()}`);
  };

  const handleIVFResult = (transferDate: Date, transferType: string) => {
    navigate(`/ivf-timeline?date=${transferDate.getTime()}&type=${transferType}`);
  };

  return (
    <section className="relative min-h-[92vh] md:min-h-screen overflow-hidden flex flex-col justify-center pt-20 md:pt-0">
      {/* Desktop: full-bleed background image */}
      <div className="absolute inset-0 hidden md:block">
        <img
          src={heroLifestyle}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center"
        />
        {/* Cleaner, less muddy overlay — sharp left fade, subtle top/bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-parchment via-parchment/90 via-48% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-parchment/30 via-transparent to-parchment/60" />
      </div>

      {/* Mobile: intentional portrait image panel behind content */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={heroLifestyle}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-[75%_15%] scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-parchment via-parchment/90 via-35% to-parchment/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-parchment/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-parchment via-transparent to-transparent" />
      </div>

      {/* Botanical accent — top-right corner (desktop only) */}
      <img
        src={botanicalTr}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-4 w-[100px] md:w-[160px] lg:w-[200px] opacity-20 select-none hidden sm:block z-20"
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        {/* Desktop: side-by-side layout */}
        <div className="hidden md:grid md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-center">
          {/* Left: text block */}
          <div>
            <div className="flex items-center gap-2.5 mb-8 animate-fade-up">
              <div className="h-px w-10 bg-sage" />
              <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-sage">
                Your Pregnancy Journey
              </p>
            </div>

            <h1 className="font-serif text-5xl lg:text-[3.75rem] text-foreground leading-[1.06] mb-6 animate-fade-up [animation-delay:0.05s]">
              A calm, structured guide{" "}
              <span className="italic text-foreground/85">through every week</span>{" "}
              of pregnancy
            </h1>

            <p className="font-sans text-[17px] lg:text-lg font-light text-muted-foreground leading-[1.7] mb-8 animate-fade-up [animation-delay:0.1s] max-w-[26rem]">
              Week-by-week guidance, milestone tracking, and reflection prompts — personalised to your stage.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 animate-fade-up [animation-delay:0.15s]">
              {[
                { icon: Shield, label: "Evidence-informed" },
                { icon: BookOpen, label: "Week-by-week guide" },
                { icon: Heart, label: "Free to start" },
                { icon: Users, label: "For every parent" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 font-sans text-xs font-light text-muted-foreground/70">
                  <Icon size={13} className="text-sage" /> {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: calculator card */}
          <div className="animate-fade-up [animation-delay:0.18s]">
            <div className="bg-card/95 backdrop-blur-sm border border-border/30 rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-full bg-sage/10 flex items-center justify-center">
                  <BookOpen size={13} className="text-sage" />
                </div>
                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-sage">
                    Due date calculator
                  </p>
                  <p className="font-sans text-[11px] font-light text-muted-foreground/60">
                    Find your week and start your journey
                  </p>
                </div>
              </div>
              <DueDateCalculatorForm onResult={handleResult} onIVFResult={handleIVFResult} compact />
            </div>
          </div>
        </div>

        {/* Mobile: stacked layout */}
        <div className="md:hidden max-w-xl">
          <div className="flex items-center gap-2.5 mb-6 animate-fade-up">
            <div className="h-px w-10 bg-sage" />
            <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-sage">
              Your Pregnancy Journey
            </p>
          </div>

          <h1 className="font-serif text-[2.25rem] sm:text-[2.75rem] text-foreground leading-[1.06] mb-5 animate-fade-up [animation-delay:0.05s]">
            A calm, structured guide{" "}
            <span className="italic text-foreground/85">through every week</span>{" "}
            of pregnancy
          </h1>

          <p className="font-sans text-base sm:text-[17px] font-light text-muted-foreground leading-[1.7] mb-6 animate-fade-up [animation-delay:0.1s] max-w-[28rem]">
            Week-by-week guidance, milestone tracking, and reflection prompts, personalised to your stage. Enter your due date to begin.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 mb-8 animate-fade-up [animation-delay:0.15s]">
            {[
              { icon: Shield, label: "Evidence-informed" },
              { icon: BookOpen, label: "Week-by-week guide" },
              { icon: Heart, label: "Free to start" },
              { icon: Users, label: "For every parent" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 font-sans text-xs font-light text-muted-foreground/70">
                <Icon size={13} className="text-sage" /> {label}
              </span>
            ))}
          </div>

          <div className="animate-fade-up [animation-delay:0.2s]">
            <div className="bg-card/90 backdrop-blur-md border border-border/40 rounded-2xl p-6 sm:p-8 shadow-elevated">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center">
                  <BookOpen size={14} className="text-sage" />
                </div>
                <div>
                  <p className="font-sans text-[11px] font-medium tracking-[0.15em] uppercase text-sage">
                    Due date calculator
                  </p>
                  <p className="font-sans text-xs font-light text-muted-foreground/60">
                    Find your week and start your personalised journey
                  </p>
                </div>
              </div>
              <DueDateCalculatorForm onResult={handleResult} onIVFResult={handleIVFResult} compact />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="section-fade-bottom" />
    </section>
  );
};

export default HeroSection;
