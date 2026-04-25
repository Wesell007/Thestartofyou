import pregnancyJourneyImg from "@/assets/pregnancy-journey.jpg";

const principles = [
  { title: "Unique to you", desc: "Each experience varies significantly from person to person." },
  { title: "No fixed pattern", desc: "Symptoms do not follow a set trajectory or timeline." },
  { title: "Shifting emotions", desc: "Emotional responses can change week to week, day to day." },
  { title: "Interpretation over certainty", desc: "Much of the journey is making sense of what's unfolding, not ticking boxes." },
];

const WhatThisJourneyIs = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-border/40 shadow-card-brand">
              <img
                src={pregnancyJourneyImg}
                alt="A quiet moment of reflection at the start of the pregnancy journey"
                loading="lazy"
                width={1024}
                height={640}
                className="w-full h-56 sm:h-72 md:h-80 object-cover"
              />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.3)' }} />
              <p className="font-serif italic text-sm text-muted-foreground">
                One week at a time is enough.
              </p>
            </div>
          </div>

          {/* Copy */}
          <div>
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
            >
              About this journey
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-5 leading-tight">
              A guide that follows your pregnancy, not a checklist.
            </h2>
            <div className="space-y-4 font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
              <p>
                Pregnancy unfolds gradually — physically, emotionally, mentally
                — and rarely in a straight line.
              </p>
              <p>
                This space is shaped to follow your weeks as they happen, with
                room for the parts that feel unclear.
              </p>
            </div>
          </div>
        </div>

        {/* Principles strip — absorbs WhatMakesDifferent */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 pt-10 border-t border-border/40">
          {principles.map((p) => (
            <div key={p.title}>
              <p className="font-serif text-base text-foreground mb-1.5">{p.title}</p>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatThisJourneyIs;
