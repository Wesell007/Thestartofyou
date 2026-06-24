import AISearchBar from "@/components/shared/AISearchBar";

const babyChips = ["Sleep regression", "Feeding cues", "Milestones", "Teething"];
const recoveryChips = ["Bleeding", "Mood shifts", "Hormones", "6-week check"];

const FYAISupport = () => {
  return (
    <section className="relative bg-parchment py-14 md:py-16">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl relative z-10">
        {/* Dual-band header line */}
        <div className="flex items-center gap-1.5 mb-5">
          <span className="h-0.5 w-10 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.7)' }} />
          <span className="h-0.5 w-10 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.7)' }} />
          <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase ml-2 text-foreground/60">
            AI Support · both tracks
          </p>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
          Ask anything from either track.
        </h2>
        <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-7 max-w-2xl">
          Questions about your baby and questions about your own recovery belong in the same place. Ask plainly, get guidance that fits the stage you're in.
        </p>

        <AISearchBar
          placeholder="What's on your mind today?"
          suggestions={[]}
          context="First year hub"
        />

        {/* Dual-track chip rows */}
        <div className="mt-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="font-sans text-[10px] font-light tracking-wider uppercase mr-1"
              style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
            >
              Baby
            </span>
            {babyChips.map((c) => (
              <a
                key={c}
                href={`/ask?q=${encodeURIComponent(c)}&ctx=First+year+hub&journey=firstyear`}
                className="font-sans text-[12px] font-light px-3 py-1.5 rounded-full border transition-colors hover:bg-card"
                style={{
                  borderColor: 'hsl(var(--stage-firstyear-accent) / 0.25)',
                  color: 'hsl(var(--stage-firstyear-deep))',
                  backgroundColor: 'hsl(var(--card) / 0.5)',
                }}
              >
                {c}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="font-sans text-[10px] font-light tracking-wider uppercase mr-1"
              style={{ color: 'hsl(var(--stage-recovery-accent))' }}
            >
              Recovery
            </span>
            {recoveryChips.map((c) => (
              <a
                key={c}
                href={`/ask?q=${encodeURIComponent(c)}&ctx=Postpartum+recovery&journey=recovery`}
                className="font-sans text-[12px] font-light px-3 py-1.5 rounded-full border transition-colors hover:bg-card"
                style={{
                  borderColor: 'hsl(var(--stage-recovery-accent) / 0.25)',
                  color: 'hsl(var(--stage-recovery-deep))',
                  backgroundColor: 'hsl(var(--card) / 0.5)',
                }}
              >
                {c}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FYAISupport;
