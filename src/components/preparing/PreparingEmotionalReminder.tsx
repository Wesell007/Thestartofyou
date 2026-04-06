const PreparingEmotionalReminder = () => {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden" style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.5)" }}>
      {/* Dual ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: "hsl(var(--stage-preparing-accent) / 0.08)" }} />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[300px] rounded-full blur-3xl"
          style={{ backgroundColor: "hsl(var(--sage-bg) / 0.15)" }} />
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center relative z-10">
        <div className="flanking-lines mb-8">
          <span className="font-sans text-[10px] font-light tracking-[0.25em] uppercase"
            style={{ color: "hsl(var(--stage-preparing-accent))" }}>
            The truth
          </span>
        </div>

        <h2 className="font-serif text-4xl sm:text-[2.8rem] md:text-[3.2rem] text-foreground mb-6 leading-[1.08]">
          You don't need everything figured out.
        </h2>
        <p className="font-serif italic text-lg md:text-xl text-foreground/60 leading-relaxed mb-5">
          Not before baby arrives. Not after. Not ever, really.
        </p>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-12">
          Starting simple is enough. You will learn the rest — one day at a time, one small thing at a time.
        </p>

        {/* Anchoring stats — larger, more confident */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {[
            { num: "4", label: "core needs" },
            { num: "5", label: "categories" },
            { num: "80%", label: "can wait" },
          ].map((s, i) => (
            <div key={i} className="rounded-xl py-5 border border-border/30 bg-card/60 backdrop-blur-sm">
              <span className="font-serif text-3xl font-medium block mb-1" style={{ color: "hsl(var(--stage-preparing-accent))" }}>{s.num}</span>
              <span className="font-sans text-[9px] font-light tracking-widest uppercase text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreparingEmotionalReminder;
