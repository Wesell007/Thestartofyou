const EmotionalReminder = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
        <div className="flex items-center gap-5 mb-10 justify-center">
          <div className="h-px w-16" style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.3)' }} />
          <span
            className="font-sans text-xs font-light tracking-[0.2em] uppercase"
            style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
          >
            A small reminder
          </span>
          <div className="h-px w-16" style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.3)' }} />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-7 leading-tight">
          There's no single way to experience pregnancy.
        </h2>

        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto">
          Some weeks feel clear, others feel uncertain, and both can be
          completely normal.
        </p>
      </div>
    </section>
  );
};

export default EmotionalReminder;
