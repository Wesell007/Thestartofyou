/**
 * Bridging strip — sits between the Two-Track Entry and AI Support.
 * Two short columns side by side so the dual model is reinforced, not re-introduced.
 */
const FYWhatThisCovers = () => {
  return (
    <section className="bg-parchment py-12 md:py-14">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-5 text-foreground/60">
          What you'll find here
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="flex gap-4">
            <span
              className="w-0.5 shrink-0 rounded-full"
              style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.5)' }}
            />
            <div>
              <p
                className="font-sans text-[10px] font-light tracking-[0.22em] uppercase mb-2"
                style={{ color: 'hsl(var(--stage-firstyear-deep))' }}
              >
                For your baby
              </p>
              <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed">
                Feeding, sleep, development and care across twelve months, in one place.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span
              className="w-0.5 shrink-0 rounded-full"
              style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.5)' }}
            />
            <div>
              <p
                className="font-sans text-[10px] font-light tracking-[0.22em] uppercase mb-2"
                style={{ color: 'hsl(var(--stage-recovery-deep))' }}
              >
                For you
              </p>
              <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed">
                Physical healing, hormones, mood and the check-ups that matter, given equal care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FYWhatThisCovers;
