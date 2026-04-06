const EmotionalReminder = () => {
  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.2)' }}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
        {/* Decorative accent */}
        <div className="flex items-center gap-4 mb-8 justify-center">
          <div className="h-px w-12" style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.25)' }} />
          <span
            className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
            style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
          >
            A small reminder
          </span>
          <div className="h-px w-12" style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.25)' }} />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-5 leading-tight max-w-md mx-auto">
          There's no single way to experience pregnancy.
        </h2>

        <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
          Some weeks feel clear, others feel uncertain, and both can be
          completely normal.
        </p>

        {/* Subtle closing line */}
        <p className="font-serif italic text-sm text-muted-foreground/60">
          Your experience is yours.
        </p>
      </div>
    </section>
  );
};

export default EmotionalReminder;
