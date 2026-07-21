import PublicReflectionEditor from "@/components/shared/PublicReflectionEditor";

const prompts = ["Essentials", "Decisions", "Uncertainty", "Readiness", "Letting go"];

const PreparingReflection = () => {
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
                  <span
                    key={p}
                    className="px-3 py-1.5 rounded-full text-[10px] font-sans font-light tracking-wider uppercase border border-border/40"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Right panel */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <PublicReflectionEditor
                storageKey="tsoy:preparing:reflection-draft"
                suggestions={prompts}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreparingReflection;
