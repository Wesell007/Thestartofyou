import { useRef, useState } from "react";
import botanicalCorner from "@/assets/botanical-corner.png";
import heroIllustration from "@/assets/hero-illustration.png";
import DueDateCalculatorForm from "@/components/shared/DueDateCalculatorForm";
import DueDateCalculatorResult from "@/components/shared/DueDateCalculatorResult";

const HeroSection = () => {
  const [lmp, setLmp] = useState<Date | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleResult = (lmpDate: Date) => {
    setLmp(lmpDate);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  return (
    <>
      <section className="relative min-h-screen bg-parchment overflow-hidden flex flex-col justify-center pt-20 md:pt-24 pb-16">
        {/* Top-right botanical decoration */}
        <img
          src={botanicalCorner}
          alt=""
          aria-hidden="true"
          width={340}
          height={340}
          className="absolute -top-6 -right-10 w-60 md:w-80 opacity-70 pointer-events-none select-none"
        />

        <div className="container mx-auto px-6 md:px-10 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 xl:gap-14 items-center">

            {/* Left: copy + illustration */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto md:mx-0">
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                Your pregnancy journey
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-5 animate-fade-up">
                Your Pregnancy Journey,{" "}
                <span className="italic">Week by Week</span>
              </h1>
              <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-6 animate-fade-up [animation-delay:0.1s] max-w-md">
                A structured system that adapts to your stage. Enter your details
                to begin your personalised{" "}
                <strong className="font-medium text-foreground">40-week guide</strong>.
              </p>
              <p className="font-sans text-xs font-light text-muted-foreground/60 space-x-2 animate-fade-up [animation-delay:0.2s] mb-8">
                <span>Free to start</span>
                <span className="text-sage-muted">·</span>
                <span>Updates weekly</span>
                <span className="text-sage-muted">·</span>
                <span>Saved to your profile</span>
              </p>

              {/* Illustration — visible on all sizes, centred on mobile */}
              <div className="flex justify-center md:justify-start w-full animate-float">
                <img
                  src={heroIllustration}
                  alt="Pregnant woman holding flowers, illustrated in sage green line art"
                  width={340}
                  height={380}
                  className="w-48 sm:w-56 md:w-64 lg:w-72 drop-shadow-sm"
                />
              </div>
            </div>

            {/* Centre divider — only on large screens */}
            <div className="hidden lg:block w-px h-80 bg-border/30 self-center" />

            {/* Right: Full Due Date Calculator */}
            <div className="animate-fade-up [animation-delay:0.15s]">
              <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-card-brand">
                <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-2">
                  Due date calculator
                </p>
                <h2 className="font-serif text-2xl text-foreground mb-1 leading-snug">
                  Find your due date
                </h2>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-7">
                  Understand what stage you're in — with guidance tailored to you.
                </p>
                <DueDateCalculatorForm onResult={handleResult} compact />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-parchment to-transparent pointer-events-none" />
      </section>

      {/* Results — appear seamlessly below hero */}
      {lmp && (
        <div ref={resultsRef}>
          <DueDateCalculatorResult lmp={lmp} />
        </div>
      )}
    </>
  );
};

export default HeroSection;
