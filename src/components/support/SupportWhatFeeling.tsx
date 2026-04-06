const categories = [
  {
    label: "Emotionally",
    icon: "♡",
    items: [
      "Uncertainty or confusion",
      "Anxiety or persistent worry",
      "Low mood or emotional exhaustion",
      "Feeling disconnected or unlike yourself",
    ],
    insight: "These experiences are more common than people often talk about.",
  },
  {
    label: "Mentally",
    icon: "◎",
    items: [
      "Thoughts going in circles",
      "Difficulty focusing",
      'Constant questioning or "what if" thinking',
    ],
    insight: "Uncertainty can make your mind try to find control.",
  },
  {
    label: "Physically",
    icon: "↕",
    items: ["Tension", "Fatigue", "Difficulty resting"],
    insight: "Your body and mind are closely connected, especially during this time.",
  },
];

const SupportWhatFeeling = () => {
  return (
    <section className="bg-parchment-dark py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="flex items-center gap-4 mb-4">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted">
            Understanding
          </p>
          <div className="h-px flex-1 bg-border/60" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3 max-w-lg">
          What you might be feeling
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground mb-8 max-w-md">
          These are common experiences. Recognising them is a first step.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-xl p-5 shadow-card-brand flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--stage-support)/0.5)] flex items-center justify-center">
                  <span className="font-serif text-sm text-[hsl(var(--stage-support-accent))]">{cat.icon}</span>
                </div>
                <span className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                  {cat.label}
                </span>
              </div>
              <ul className="space-y-2.5 mb-5 flex-1">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--stage-support-accent)/0.5)] mt-1.5 flex-shrink-0" />
                    <span className="font-sans text-sm font-light text-muted-foreground leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-[hsl(var(--stage-support)/0.4)] pt-3">
                <p className="font-serif italic text-xs text-foreground/55 leading-snug">{cat.insight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportWhatFeeling;
