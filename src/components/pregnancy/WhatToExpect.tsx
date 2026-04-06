const cards = [
  {
    id: "body",
    label: "Your body",
    icon: "○",
    intro:
      "Your body may change in ways that feel unpredictable. You might notice:",
    points: [
      "Symptoms that appear and disappear",
      "Days where you feel very different from the day before",
      "Physical changes that don't follow a clear pattern",
      "Moments where you feel completely normal",
    ],
    meaning:
      "Changes don't always follow a steady progression. Variation is a normal part of pregnancy, even when it feels confusing.",
  },
  {
    id: "baby",
    label: "Your baby",
    icon: "◎",
    intro:
      "Your baby is developing continuously, even when nothing feels different to you.",
    points: [
      "Weeks where development feels abstract or hard to visualise",
      "Milestones happening without clear physical signals",
      "A gradual sense of progress rather than sudden change",
    ],
    meaning:
      "A lot is happening behind the scenes, especially in early pregnancy, even when you can't feel it yet.",
  },
  {
    id: "emotional",
    label: "Emotionally",
    icon: "◈",
    intro:
      "This stage can feel less straightforward than expected. You may feel:",
    points: [
      "Excited, but unsure",
      "Reassured one day and questioning things the next",
      "Unsure what is 'normal' for you",
      "A mix of calm, worry, and anticipation",
    ],
    meaning:
      "Emotional shifts are part of how people process change, especially when things are new or uncertain.",
  },
  {
    id: "uncertainty",
    label: "Uncertainty",
    icon: "◇",
    intro:
      "One of the most defining parts of pregnancy is not always knowing what things mean.",
    points: [
      "Wondering if symptoms are normal",
      "Comparing your experience to others",
      "Feeling unsure whether something is 'right'",
      "Wanting reassurance, even when everything is progressing normally",
    ],
    meaning:
      "Pregnancy is not always linear or predictable, and uncertainty is part of the experience, not a sign something is wrong.",
  },
];

const WhatToExpect = () => {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.25)' }}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
            style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
          >
            The Full Picture
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 leading-tight max-w-2xl mx-auto">
            What to expect during pregnancy
          </h2>
          <p className="font-sans text-[15px] font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Across your body, your emotions, and the space in between.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-card rounded-2xl p-7 sm:p-8 shadow-card-brand border border-border/50 flex flex-col gap-4"
            >
              {/* Card header */}
              <div className="flex items-center gap-3">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{
                    backgroundColor: 'hsl(var(--stage-pregnancy) / 0.5)',
                    color: 'hsl(var(--stage-pregnancy-accent))',
                  }}
                >
                  {card.icon}
                </span>
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-foreground/70">
                  {card.label}
                </p>
              </div>

              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                {card.intro}
              </p>

              <ul className="space-y-2">
                {card.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-2 w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.4)' }}
                    />
                    <span className="font-sans text-sm font-light text-foreground leading-relaxed">
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Meaning */}
              <div
                className="pt-4 mt-auto border-t"
                style={{ borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.1)' }}
              >
                <p
                  className="font-sans text-[10px] font-light tracking-[0.1em] uppercase mb-1.5"
                  style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
                >
                  What this means
                </p>
                <p className="font-serif italic text-sm sm:text-base text-foreground/80 leading-relaxed">
                  {card.meaning}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatToExpect;
