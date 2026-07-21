import PublicReflectionEditor from "@/components/shared/PublicReflectionEditor";

const PostpartumReflection = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div
          className="rounded-2xl overflow-hidden border border-border/30 grid grid-cols-1 md:grid-cols-2"
          style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.06)' }}
        >
          {/* Left — editorial */}
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
            >
              Take a moment
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4 leading-snug">
              What has felt most present for you today?
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5">
              Tiredness, adjustment, connection, or something else entirely. There's no right answer.
            </p>

            {/* Prompt chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Exhaustion", "Gratitude", "Overwhelm", "Connection"].map((chip) => (
                <span
                  key={chip}
                  className="font-sans text-[11px] font-light px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: 'hsl(var(--stage-postpartum-accent) / 0.15)',
                    color: 'hsl(var(--stage-postpartum-accent))',
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>

            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-postpartum-accent) / 0.25)' }}
            >
              <p className="font-serif italic text-sm text-foreground/55 leading-relaxed">
                Writing things down can help make sense of what feels blurred or overwhelming.
              </p>
            </div>
          </div>

          {/* Right — input */}
          <div
            className="p-8 sm:p-10 flex flex-col justify-center"
            style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.12)' }}
          >
            <PublicReflectionEditor
              storageKey="tsoy:postpartum:reflection-draft"
              suggestions={["Exhaustion", "Gratitude", "Overwhelm", "Connection"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostpartumReflection;
