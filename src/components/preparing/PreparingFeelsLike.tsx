const feelings = [
  { text: "Wanting to feel prepared, but unsure how", icon: "↻" },
  { text: "Feeling pressure to get everything right", icon: "↑" },
  { text: "Going back and forth on decisions", icon: "↔" },
  { text: "Questioning what's actually necessary", icon: "?" },
];

const PreparingFeelsLike = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-14 items-start">
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase mb-5"
              style={{ color: "hsl(var(--stage-preparing-accent))" }}>
              Emotionally
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              What this can feel like
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
              Preparation often brings a mix of excitement and uncertainty. Both are completely normal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {feelings.map((item, i) => (
              <div key={i} className="bg-card border border-border/40 rounded-xl px-5 py-5 shadow-card-brand flex items-start gap-4">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
                  style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.7)", color: "hsl(var(--stage-preparing-accent))" }}>
                  {item.icon}
                </span>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreparingFeelsLike;
