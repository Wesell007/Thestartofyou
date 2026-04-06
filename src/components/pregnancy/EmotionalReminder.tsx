const EmotionalReminder = () => {
  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.2)' }}
    >
      {/* Subtle ambient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl"
        style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.2)' }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center relative z-10">
        {/* Decorative accent */}
        <div className="flex items-center gap-4 mb-7 justify-center">
          <div className="h-px w-10" style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.2)' }} />
          <span
            className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
            style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
          >
            A small reminder
          </span>
          <div className="h-px w-10" style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.2)' }} />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.5rem] text-foreground mb-5 leading-[1.15] max-w-lg mx-auto">
          There's no single way to experience pregnancy.
        </h2>

        <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
          Some weeks feel clear, others feel uncertain, and both can be
          completely normal.
        </p>

        {/* Reinforcing pull-quote */}
        <div
          className="inline-block rounded-xl px-6 py-4"
          style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.25)' }}
        >
          <p className="font-serif italic text-base text-foreground/60">
            Your experience is yours.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmotionalReminder;
