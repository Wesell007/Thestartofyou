const approaches = [
  { num: "01", text: "Focus on essentials first", sub: "Cover the four core needs before anything else" },
  { num: "02", text: "Add things gradually", sub: "You'll learn what you need once baby is here" },
  { num: "03", text: "Avoid comparing your setup", sub: "Every family's situation is different" },
  { num: "04", text: "Keep things simple", sub: "Simple doesn't mean less — it means clearer" },
];

const PreparingApproach = () => {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.3)" }}>
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-14 items-start">
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase mb-5"
              style={{ color: "hsl(var(--stage-preparing-accent))" }}>
              Right Now
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              How to approach this stage
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
              A calmer framework for getting ready — without the pressure to get everything perfect.
            </p>
          </div>

          <div className="space-y-4">
            {approaches.map((item) => (
              <div key={item.num} className="bg-card border border-border/40 rounded-xl px-6 py-5 shadow-card-brand flex items-start gap-5">
                <span className="font-serif text-lg font-medium mt-0.5 shrink-0"
                  style={{ color: "hsl(var(--stage-preparing-accent))" }}>{item.num}</span>
                <div>
                  <p className="font-sans text-base font-light text-foreground leading-relaxed mb-1">{item.text}</p>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{item.sub}</p>
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
