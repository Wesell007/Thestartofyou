const PreparingEmotionalReminder = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.45)" }}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "hsl(var(--stage-preparing-accent) / 0.08)" }} />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center relative z-10">
        <div className="flanking-lines mb-8">
          <span className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
            A small reminder
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.8rem] text-foreground mb-7 leading-tight">
          You don't need everything figured out before your baby arrives.
        </h2>

        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
          Starting simple is enough. You will learn the rest as you go.
        </p>

        {/* Stat anchors */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { num: "4", label: "core needs" },
            { num: "5", label: "categories" },
            { num: "1", label: "step at a time" },
          ].map((s, i) => (
            <div key={i} className="px-5 py-3 rounded-full border border-border/30 bg-card/60 backdrop-blur-sm">
              <span className="font-serif text-lg font-medium mr-2" style={{ color: "hsl(var(--stage-preparing-accent))" }}>{s.num}</span>
              <span className="font-sans text-[10px] font-light tracking-widest uppercase text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreparingEmotionalReminder;
