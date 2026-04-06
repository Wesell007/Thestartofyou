const cards = [
  { label: "Exhausted", note: "Even when things are going well, fatigue is real and valid." },
  { label: "Overwhelmed", note: "Too many decisions, too little sleep. This is part of the adjustment." },
  { label: "Grateful", note: "Joy and exhaustion can exist at the same time. Both are real." },
];

const PostpartumEmotionalReminder = () => {
  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.15)' }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl"
        style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.15)' }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left — editorial */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-postpartum-accent) / 0.2)' }} />
              <span
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
              >
                A small reminder
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.25rem] text-foreground mb-5 leading-[1.15]">
              This stage can feel overwhelming, even when everything is going well.
            </h2>

            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              Taking things one day at a time is enough. You don't need to have it all figured out.
            </p>

            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-postpartum-accent) / 0.3)' }}
            >
              <p className="font-serif italic text-base text-foreground/60 leading-relaxed">
                "You're doing more than you realise."
              </p>
            </div>
          </div>

          {/* Right — emotional cards */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cards.map((card, i) => (
              <div
                key={i}
                className="rounded-xl p-5 border border-border/20"
                style={{ backgroundColor: `hsl(var(--stage-postpartum) / ${0.18 - i * 0.04})` }}
              >
                <p
                  className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-3"
                  style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
                >
                  {card.label}
                </p>
                <p className="font-sans text-sm font-light text-foreground/75 leading-relaxed">
                  {card.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostpartumEmotionalReminder;
