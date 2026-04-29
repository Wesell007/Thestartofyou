import AISearchBar from "@/components/shared/AISearchBar";
import leafImg from "@/assets/pregnancy-ai-leaf.png";

const PregnancyAIPanel = () => {
  return (
    <section className="py-12 md:py-16 bg-parchment">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div
          className="relative rounded-3xl overflow-hidden border"
          style={{
            backgroundColor: 'hsl(var(--stage-pregnancy) / 0.35)',
            borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.15)',
          }}
        >
          {/* Decorative leaf, desktop */}
          <img
            src={leafImg}
            alt=""
            aria-hidden="true"
            className="hidden md:block absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 w-32 lg:w-40 opacity-90 pointer-events-none"
          />

          <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 py-10 md:py-14 text-center">
            <p
              className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-3"
              style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
            >
              AI Support
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight mb-3">
              Questions, answered with care.
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground max-w-xl mx-auto leading-relaxed mb-7">
              Ask anything about your pregnancy and get trusted, personalised answers.
            </p>

            <div className="max-w-2xl mx-auto">
              <AISearchBar
                placeholder="Ask anything about your pregnancy..."
                suggestions={[
                  "Is it normal to feel so tired?",
                  "When will I feel the baby move?",
                  "What foods should I avoid?",
                  "Can stress affect my baby?",
                ]}
                context="Pregnancy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PregnancyAIPanel;
