import AISearchBar from "@/components/shared/AISearchBar";
import { MessageCircle } from "lucide-react";

const TTCAISupport = () => {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.4)' }}
    >
      {/* Ambient */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full blur-3xl opacity-30"
        style={{ backgroundColor: 'hsl(var(--stage-ttc-accent) / 0.2)' }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 items-center">
          {/* Left — 2 cols */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.4)' }}
              >
                <MessageCircle size={14} style={{ color: 'hsl(var(--stage-ttc-accent))' }} />
              </div>
              <p
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                style={{ color: 'hsl(var(--stage-ttc-accent))' }}
              >
                AI Support
              </p>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-4">
              Ask anything about your cycle
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-5">
              If something feels unclear, whether it's about timing, ovulation, symptoms, or what to expect next, you can ask here and get guidance specific to TTC.
            </p>

            {/* Pull quote */}
            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-ttc-accent) / 0.2)' }}
            >
              <p className="font-serif italic text-sm text-foreground/50 leading-relaxed">
                "The question you're afraid to ask is usually the most important one."
              </p>
            </div>
          </div>

          {/* Right — search + suggestions */}
          <div className="md:col-span-3">
            <div
              className="rounded-2xl p-6 sm:p-8 border"
              style={{
                backgroundColor: 'hsl(var(--stage-ttc) / 0.15)',
                borderColor: 'hsl(var(--stage-ttc-accent) / 0.12)',
              }}
            >
              <AISearchBar
                placeholder="Ask about your cycle, timing, or symptoms..."
                suggestions={[
                  "When am I most fertile?",
                  "Am I ovulating?",
                  "When should I test?",
                  "Is this symptom normal?",
                ]}
                context="Trying to conceive"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TTCAISupport;
