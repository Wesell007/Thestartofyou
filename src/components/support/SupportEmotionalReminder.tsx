const SupportEmotionalReminder = () => {
  return (
    <section className="relative bg-parchment py-24 md:py-32 overflow-hidden">
      {/* Dual ambient glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[300px] h-[200px] rounded-full blur-3xl pointer-events-none" style={{ background: 'hsl(260 22% 90% / 0.3)' }} />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[250px] h-[180px] rounded-full blur-3xl pointer-events-none" style={{ background: 'hsl(100 14% 90% / 0.3)' }} />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center relative z-10">
        <div className="flex items-center gap-5 mb-8 justify-center">
          <div className="h-px w-16 bg-[hsl(var(--stage-support-accent)/0.3)]" />
          <span className="font-sans text-xs font-light tracking-[0.2em] uppercase text-[hsl(var(--stage-support-accent))]">
            A small reminder
          </span>
          <div className="h-px w-16 bg-[hsl(var(--stage-support-accent)/0.3)]" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.8rem] text-foreground mb-6 leading-tight max-w-xl mx-auto">
          You don't have to go through uncertain or difficult moments on your own.
        </h2>

        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-sm mx-auto mb-8">
          Taking one step at a time is enough.
        </p>

        {/* Anchoring stat */}
        <div className="inline-flex items-center gap-3 bg-card border border-[hsl(var(--stage-support-accent)/0.15)] rounded-full px-6 py-3 shadow-card-brand">
          <span className="font-serif text-lg text-[hsl(var(--stage-support-accent))]">♡</span>
          <span className="font-sans text-xs font-light text-muted-foreground">You are not alone in this</span>
        </div>
      </div>
    </section>
  );
};

export default SupportEmotionalReminder;
