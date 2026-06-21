/**
 * Compressed to a quiet italic-serif interlude band between TTCFocus and TTCAISupport.
 * No card chrome — soft tinted full-width band; editorial single-line statement.
 */
const TTCWhatMakesDifferent = () => {
  return (
    <section
      className="py-14 md:py-20"
      style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.22)' }}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
        <p
          className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-4"
          style={{ color: 'hsl(var(--stage-ttc-accent))' }}
        >
          A different kind of guide
        </p>
        <p className="font-serif italic text-lg sm:text-xl md:text-[1.45rem] text-foreground/75 leading-snug">
          Trying to conceive doesn't follow a script.{" "}
          <span className="block sm:inline">The guide shouldn't either.</span>
        </p>
        <div
          aria-hidden="true"
          className="mx-auto mt-6 h-px w-16"
          style={{
            background:
              'linear-gradient(90deg, transparent, hsl(var(--stage-ttc-accent) / 0.5), transparent)',
          }}
        />
        <p className="mt-5 font-sans text-[13.5px] font-light text-muted-foreground/80 leading-relaxed max-w-xl mx-auto">
          Hope and disappointment can cycle within the same week. Timing matters
          but can't be forced. This is a space that acknowledges the real shape
          of trying, not a checklist that pretends otherwise.
        </p>
      </div>
    </section>
  );
};

export default TTCWhatMakesDifferent;
