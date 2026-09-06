import AISearchBar from "@/components/shared/AISearchBar";
import sprigImg from "@/assets/topic-mini-sprig.png";

const TTCAISupport = () => {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.4)' }}
    >
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ backgroundColor: 'hsl(var(--stage-ttc-accent) / 0.2)' }}
      />

      <img
        src={sprigImg}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute top-16 left-8 lg:left-20 w-16 lg:w-20 opacity-45 pointer-events-none select-none -rotate-12"
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl relative z-10">
        <div className="text-center mb-8">
          <p
            className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-3"
            style={{ color: 'hsl(var(--stage-ttc-accent))' }}
          >
            When you need clarity
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[1.85rem] text-foreground leading-tight mb-4">
            Questions about cycles and timing,{" "}
            <span className="italic font-normal">gently answered.</span>
          </h2>
          <p className="font-sans text-[14.5px] font-light text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Ask anything about timing, ovulation, symptoms, or testing, and
            get calm, practical guidance.
          </p>
        </div>

        <div className="mt-6">
          <AISearchBar
            placeholder="Ask about cycles, timing, or symptoms..."
            suggestions={[
              "When am I most fertile?",
              "Am I ovulating?",
              "When should I test?",
              "Is this symptom normal?",
            ]}
            context="Trying to conceive"
            stage="ttc"
          />
        </div>

        <p className="mt-6 font-sans text-[11.5px] font-light text-muted-foreground/65 text-center">
          Trusted, calm guidance, never a replacement for medical advice.
        </p>

        <div className="mt-10 max-w-md mx-auto text-center">
          <p className="font-serif italic text-[14px] text-foreground/55 leading-relaxed">
            "The question you're afraid to ask is usually the most important one."
          </p>
        </div>
      </div>
    </section>
  );
};

export default TTCAISupport;
