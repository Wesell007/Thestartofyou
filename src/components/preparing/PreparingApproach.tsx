const approaches = [
  { num: "01", text: "Focus on essentials first", sub: "Cover the four core needs before anything else", chip: "Priority" },
  { num: "02", text: "Add things gradually", sub: "You'll learn what you need once baby is here", chip: "Patience" },
  { num: "03", text: "Avoid comparing your setup", sub: "Every family's situation is different", chip: "Permission" },
  { num: "04", text: "Keep things simple", sub: "Simple doesn't mean less — it means clearer", chip: "Clarity" },
];

const PreparingApproach = () => {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.3)" }}>
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-14 items-start">
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase mb-5"
              style={{ color: "hsl(var(--stage-preparing-accent))" }}>
              Your framework
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              How to approach this
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-6">
              Four principles for calmer preparation. Not rules — anchors.
            </p>

            {/* Pull-quote */}
            <div className="border-l-2 pl-5 py-2"
              style={{ borderColor: "hsl(var(--stage-preparing-accent))" }}>
              <p className="font-serif italic text-sm text-foreground/65 leading-relaxed">
                The best preparation isn't buying everything — it's feeling grounded about what matters.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {approaches.map((item) => (
              <div key={item.num} className="bg-card border border-border/40 rounded-xl px-6 py-5 shadow-card-brand">
                <div className="flex items-start gap-5">
                  <span className="font-serif text-lg font-medium mt-0.5 shrink-0"
                    style={{ color: "hsl(var(--stage-preparing-accent))" }}>{item.num}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <p className="font-sans text-base font-light text-foreground leading-relaxed">{item.text}</p>
                      <span className="px-2 py-0.5 rounded text-[8px] font-sans font-light tracking-wider uppercase shrink-0"
                        style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.7)", color: "hsl(var(--stage-preparing-accent))" }}>
                        {item.chip}
                      </span>
                    </div>
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{item.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreparingApproach;
