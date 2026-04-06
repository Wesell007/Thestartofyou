const TTCEmotionalReminder = () => {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.22)' }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl"
        style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.2)' }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Left — the statement */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-ttc-accent) / 0.3)' }} />
              <span
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                style={{ color: 'hsl(var(--stage-ttc-accent))' }}
              >
                A small reminder
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.5rem] text-foreground mb-5 leading-[1.12]">
              Trying to conceive can feel straightforward at times, and uncertain at others.
            </h2>

            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
              Both are part of the process. Neither defines the outcome.
            </p>
          </div>

          {/* Right — reinforcing elements */}
          <div className="space-y-4">
            {[
              "You don't need to feel confident to keep going.",
              "Uncertainty is not a sign that something is wrong.",
              "Your experience is valid, even when it's hard to articulate.",
            ].map((line, i) => (
              <div
                key={i}
                className="rounded-xl px-5 py-4 border"
                style={{
                  backgroundColor: 'hsl(var(--stage-ttc) / 0.15)',
                  borderColor: 'hsl(var(--stage-ttc-accent) / 0.1)',
                }}
              >
                <p className="font-serif italic text-[15px] text-foreground/60 leading-relaxed">
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TTCEmotionalReminder;
