const SupportEmotionalReminder = () => {
  return (
    <section className="relative bg-parchment py-20 md:py-28 overflow-hidden">
      {/* Dual ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[250px] rounded-full blur-3xl pointer-events-none" style={{ background: 'hsl(260 22% 88% / 0.35)' }} />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[200px] rounded-full blur-3xl pointer-events-none" style={{ background: 'hsl(260 22% 92% / 0.3)' }} />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center relative z-10">
        <div className="flex items-center gap-5 mb-6 justify-center">
          <div className="h-px w-16 bg-[hsl(var(--stage-support-accent)/0.3)]" />
          <span className="font-sans text-xs font-light tracking-[0.2em] uppercase text-[hsl(var(--stage-support-accent))]">
            A small reminder
          </span>
          <div className="h-px w-16 bg-[hsl(var(--stage-support-accent)/0.3)]" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-[3.2rem] text-foreground mb-5 leading-[1.1] max-w-xl mx-auto">
          You don't have to go through this on your own.
        </h2>

        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-sm mx-auto mb-8">
          Taking one step at a time is enough.
        </p>

        {/* Anchoring stats */}
        <div className="flex items-center justify-center gap-6 md:gap-10">
          {[
            { num: "1", label: "step at a time" },
            { num: "♡", label: "you are not alone" },
            { num: "∞", label: "valid feelings" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <span className="font-serif text-2xl text-[hsl(var(--stage-support-accent))]">{s.num}</span>
              <p className="font-sans text-[10px] font-light text-muted-foreground mt-1 max-w-[100px] mx-auto leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportEmotionalReminder;
