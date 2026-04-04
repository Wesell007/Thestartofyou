import { useNavigate } from "react-router-dom";
import DueDateCalculatorForm from "@/components/shared/DueDateCalculatorForm";

const PregnancyHero = () => {
  const navigate = useNavigate();

  const handleResult = (lmpDate: Date) => {
    navigate(`/due-date-results?lmp=${lmpDate.getTime()}`);
  };

  return (
    <section className="relative bg-parchment overflow-hidden pt-20 pb-14 sm:pt-24 sm:pb-20 md:pt-36 md:pb-28">
      {/* Soft radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-sage-bg/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">

          {/* Left: headline + copy */}
          <div className="text-left">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-4 md:mb-6">
              The Pregnancy Journey
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-4 md:mb-6 animate-fade-up">
              Your pregnancy journey,{" "}
              <span className="italic">from the very beginning</span>
            </h1>
            <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed mb-5 md:mb-6 max-w-sm animate-fade-up [animation-delay:0.1s]">
              A week-by-week path through pregnancy, helping you understand what's
              happening, what's normal, and what to focus on.
            </p>
            <p className="font-sans text-xs font-light text-muted-foreground/60 animate-fade-up [animation-delay:0.2s]">
              Free to start · Updates weekly · Saved to your profile
            </p>
          </div>

          {/* Right: Due Date Calculator */}
          <div className="animate-fade-up [animation-delay:0.15s]">
            <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8 shadow-card-brand">
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-2">
                Due date calculator
              </p>
              <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-1 leading-snug">
                Find your due date
              </h2>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5 sm:mb-7">
                Understand what stage you're in, with guidance tailored to you.
              </p>
              <DueDateCalculatorForm onResult={handleResult} compact />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-parchment to-transparent pointer-events-none" />
    </section>
  );
};

export default PregnancyHero;
