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
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-4">
          Understanding
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-4 max-w-lg">
          What you might be feeling
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground mb-10 max-w-md">
          These are common experiences. Recognising them is a first step.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-xl p-6 shadow-card-brand flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[hsl(var(--stage-support)/0.5)] flex items-center justify-center">
                  <span className="font-serif text-base text-[hsl(var(--stage-support-accent))]">{cat.icon}</span>
                </div>
                <span className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                  {cat.label}
                </span>
              </div>
              <ul className="space-y-3 mb-6 flex-1">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--stage-support-accent)/0.5)] mt-2 flex-shrink-0" />
                    <span className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-[hsl(var(--stage-support)/0.4)] pt-4">
                <p className="font-serif italic text-sm text-foreground/60 leading-snug">{cat.insight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportWhatFeeling;
