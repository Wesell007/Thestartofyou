import { useNavigate } from "react-router-dom";
import heroLifestyle from "@/assets/home-hero-lifestyle.jpg";
import DueDateCalculatorForm from "@/components/shared/DueDateCalculatorForm";
import { Shield, BookOpen, Heart } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleResult = (lmpDate: Date) => {
    navigate(`/due-date-results?lmp=${lmpDate.getTime()}`);
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden flex flex-col justify-center pt-20 md:pt-0">
      {/* Background image with gradient masks */}
      <div className="absolute inset-0">
        <img
          src={heroLifestyle}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        {/* Left-to-right gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-parchment via-parchment/95 to-parchment/40 md:to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-parchment via-transparent to-parchment/30" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        <div className="max-w-xl">
          {/* Trust signal */}
          <div className="flex items-center gap-2 mb-6 md:mb-8 animate-fade-up">
            <div className="h-px w-8 bg-sage-light" />
            <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
              Your Pregnancy Journey
            </p>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.08] mb-5 md:mb-7 animate-fade-up [animation-delay:0.05s]">
            A calm, structured guide{" "}
            <span className="italic">through every week</span>{" "}
            of pregnancy
          </h1>

          <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed mb-4 md:mb-5 animate-fade-up [animation-delay:0.1s] max-w-md">
            Week-by-week guidance, milestone tracking, and reflection prompts — personalised to your stage. Enter your due date to begin.
          </p>

          {/* Micro trust signals */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 md:mb-10 animate-fade-up [animation-delay:0.15s]">
            <span className="flex items-center gap-1.5 font-sans text-[11px] font-light text-muted-foreground/70">
              <Shield size={11} className="text-sage" /> Evidence-informed
            </span>
            <span className="flex items-center gap-1.5 font-sans text-[11px] font-light text-muted-foreground/70">
              <BookOpen size={11} className="text-sage" /> 40-week guide
            </span>
            <span className="flex items-center gap-1.5 font-sans text-[11px] font-light text-muted-foreground/70">
              <Heart size={11} className="text-sage" /> Free to start
            </span>
          </div>

          {/* Calculator form in a card */}
          <div className="animate-fade-up [animation-delay:0.2s]">
            <div className="bg-card/80 backdrop-blur-sm border border-border/40 rounded-2xl p-5 sm:p-7 shadow-elevated">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-1.5">
                Due date calculator
              </p>
              <p className="font-sans text-sm font-light text-muted-foreground mb-5">
                Find your week and start your personalised journey.
              </p>
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
