import { PenLine } from "lucide-react";
import { useState } from "react";

const prompts = ["Essentials", "Decisions", "Uncertainty", "Readiness", "Letting go"];

const PreparingReflection = () => {
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  return (
    <section className="bg-parchment py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="bg-card border border-border/40 rounded-2xl overflow-hidden shadow-elevated"
          style={{ borderTopWidth: "3px", borderTopColor: "hsl(var(--stage-preparing-accent))" }}>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">
            {/* Left panel */}
            <div className="p-8 md:p-10 flex flex-col justify-center"
              style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.4)" }}>
              <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-5"
                style={{ color: "hsl(var(--stage-preparing-accent))" }}>
                Take a moment
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-3">
                What feels most unclear right now?
              </h2>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
                Name it. Even that can help.
              </p>
              <div className="flex flex-wrap gap-2">
                {prompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => setActivePrompt(activePrompt === p ? null : p)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-sans font-light tracking-wider uppercase border transition-all ${
                      activePrompt === p
                        ? "border-current bg-card/60"
                        : "border-border/40 hover:border-border"
                    }`}
                    style={activePrompt === p ? { color: "hsl(var(--stage-preparing-accent))", borderColor: "hsl(var(--stage-preparing-accent))" } : undefined}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Right panel */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <textarea
                rows={5}
                placeholder="Write your thoughts here…"
                className="w-full bg-background border border-border rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 transition-all leading-relaxed mb-5"
                style={{ "--tw-ring-color": "hsl(var(--stage-preparing-accent))" } as React.CSSProperties}
              />

              <button className="flex items-center gap-2 rounded-pill px-7 py-3.5 font-sans text-sm font-light transition-all border"
                style={{ borderColor: "hsl(var(--stage-preparing-accent) / 0.4)", color: "hsl(var(--foreground))" }}>
                <PenLine size={14} />
                Capture this thought
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreparingReflection;
