import { useNavigate } from "react-router-dom";
import heroLifestyle from "@/assets/home-hero-lifestyle.jpg";
import DueDateCalculatorForm from "@/components/shared/DueDateCalculatorForm";
import { Shield, BookOpen, Heart, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
        <div className="absolute inset-0 bg-gradient-to-r from-parchment via-parchment/97 via-55% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-parchment/50 via-transparent to-parchment" />
      </div>

      {/* Mobile: intentional portrait image panel behind content */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={heroLifestyle}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-[75%_15%] scale-110"
        />
        {/* Bottom-heavy gradient so text at top is readable, image shows at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-parchment via-parchment/90 via-35% to-parchment/30" />
        {/* Left wash for text safety */}
        <div className="absolute inset-0 bg-gradient-to-r from-parchment/80 via-transparent to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-parchment via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        <div className="max-w-xl">
          {/* Trust signal */}
          <div className="flex items-center gap-2.5 mb-8 md:mb-10 animate-fade-up">
            <div className="h-px w-10 bg-sage" />
            <p className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-sage">
              Your Pregnancy Journey
            </p>
          </div>

          <h1 className="font-serif text-[2rem] sm:text-[2.75rem] md:text-5xl lg:text-[3.75rem] text-foreground leading-[1.06] mb-6 md:mb-8 animate-fade-up [animation-delay:0.05s]">
            A calm, structured guide{" "}
            <span className="italic text-foreground/85">through every week</span>{" "}
            of pregnancy
          </h1>

          <p className="font-sans text-[15px] sm:text-base md:text-[17px] font-light text-muted-foreground leading-[1.75] mb-6 md:mb-8 animate-fade-up [animation-delay:0.1s] max-w-[26rem]">
            Week-by-week guidance, milestone tracking, and reflection prompts, personalised to your stage. Enter your due date to begin.
          </p>

          {/* Micro trust signals */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 mb-10 md:mb-12 animate-fade-up [animation-delay:0.15s]">
            {[
              { icon: Shield, label: "Evidence-informed" },
              { icon: BookOpen, label: "40-week guide" },
              { icon: Heart, label: "Free to start" },
              { icon: Users, label: "For every parent" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 font-sans text-[11px] font-light text-muted-foreground/80">
                <Icon size={12} className="text-sage" /> {label}
              </span>
            ))}
          </div>

          {/* Calculator form in a card */}
          <div className="animate-fade-up [animation-delay:0.2s]">
            <div className="bg-card/85 backdrop-blur-md border border-border/30 rounded-2xl p-6 sm:p-8 shadow-elevated">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center">
                  <BookOpen size={14} className="text-sage" />
                </div>
                <div>
                  <p className="font-sans text-[11px] font-medium tracking-[0.15em] uppercase text-sage">
                    Due date calculator
                  </p>
                  <p className="font-sans text-xs font-light text-muted-foreground/70">
                    Find your week and start your personalised journey
                  </p>
                </div>
              </div>
              <DueDateCalculatorForm onResult={handleResult} compact />
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
