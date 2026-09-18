import AISearchBar from "@/components/shared/AISearchBar";
import leafImg from "@/assets/pregnancy-ai-leaf.png";
import sprigImg from "@/assets/topic-mini-sprig.png";

const PregnancyAIPanel = () => {
  return (
    <section className="py-14 md:py-20 bg-parchment" data-pregnancy-hub-companion>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div
          className="relative rounded-[2rem] overflow-hidden border shadow-card-brand"
          style={{
            background:
              'radial-gradient(120% 90% at 0% 0%, hsl(var(--stage-pregnancy) / 0.55) 0%, hsl(var(--stage-pregnancy) / 0.28) 55%, hsl(var(--parchment) / 0.95) 100%)',
            borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.18)',
            boxShadow:
              '0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 24px 60px -32px hsl(var(--stage-pregnancy-accent) / 0.28)',
          }}
        >
          {/* Decorative leaf, desktop left */}
          <img
            src={leafImg}
            alt=""
            aria-hidden="true"
            className="hidden md:block absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-32 lg:w-40 opacity-90 pointer-events-none select-none"
          />
          {/* Mirrored sprig, desktop right */}
          <img
            src={sprigImg}
            alt=""
            aria-hidden="true"
            className="hidden md:block absolute right-6 lg:right-10 bottom-6 w-16 lg:w-20 opacity-50 pointer-events-none select-none -scale-x-100"
          />
          {/* Faint paper grain wash */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(60% 50% at 80% 100%, hsl(var(--stage-pregnancy-accent) / 0.06), transparent 70%)',
            }}
          />

          <div className="relative z-10 px-5 sm:px-10 md:px-16 lg:px-24 py-12 md:py-16 text-center">
            <p
              className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
            >
              When you need clarity
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.125rem] text-foreground leading-[1.15] mb-3.5">
              Questions, <span className="italic font-normal">gently answered.</span>
            </h2>
            <p className="font-sans text-[14.5px] sm:text-[15px] font-light text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
              Ask anything about your pregnancy — from small worries to big
              questions — and get trusted, personalised guidance shaped to your
              stage.
            </p>

            {/* Soft framed input */}
            <div
              className="max-w-2xl mx-auto rounded-2xl p-1 sm:p-1.5"
              style={{
                background:
                  'linear-gradient(180deg, hsl(var(--parchment) / 0.6), hsl(var(--parchment) / 0.2))',
                border: '1px solid hsl(var(--stage-pregnancy-accent) / 0.12)',
              }}
            >
              <AISearchBar
                placeholder="Ask anything about your pregnancy…"
                suggestions={[
                  "Is it normal to feel so tired?",
                  "When will I feel the baby move?",
                  "What foods should I avoid?",
                  "Can stress affect my baby?",
                ]}
                context="Pregnancy"
                stage="pregnancy"
              />
            </div>

            <p className="mt-5 font-sans text-[11.5px] font-light text-muted-foreground/70">
              Trusted, calm guidance — never a replacement for medical advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PregnancyAIPanel;
