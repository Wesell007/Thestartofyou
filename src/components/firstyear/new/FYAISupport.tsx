import AISearchBar from "@/components/shared/AISearchBar";

const babyChips = ["Sleep regression", "Feeding cues", "Milestones"];
const recoveryChips = ["Bleeding", "Mood shifts", "6-week check"];

const FYAISupport = () => {
  return (
    <section className="relative bg-parchment py-14 md:py-16">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl relative z-10">
        <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4 text-foreground/55">
          Ask anything
        </p>

        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
          Ask whatever's on your mind.
        </h2>
        <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-7 max-w-xl">
          Questions about your baby or about you, answered in the same place.
        </p>

        <AISearchBar
          placeholder="What's on your mind today?"
          suggestions={[]}
          context="First year hub"
          stage="first-year"
        />

        {/* Quiet chip row — colour carries the meaning */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {babyChips.map((c) => (
            <a
              key={c}
              href={`/ask?q=${encodeURIComponent(c)}&ctx=First+year+hub&journey=firstyear&stage=first-year`}
              className="font-sans text-[12px] font-light px-3 py-1.5 rounded-full border transition-colors hover:bg-card"
              style={{
                borderColor: 'hsl(var(--stage-firstyear-accent) / 0.18)',
                color: 'hsl(var(--stage-firstyear-deep))',
              }}
            >
              {c}
            </a>
          ))}
          {recoveryChips.map((c) => (
            <a
              key={c}
              href={`/ask?q=${encodeURIComponent(c)}&ctx=Postpartum+recovery&journey=recovery&stage=recovery`}
              className="font-sans text-[12px] font-light px-3 py-1.5 rounded-full border transition-colors hover:bg-card"
              style={{
                borderColor: 'hsl(var(--stage-recovery-accent) / 0.18)',
                color: 'hsl(var(--stage-recovery-deep))',
              }}
            >
              {c}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FYAISupport;
