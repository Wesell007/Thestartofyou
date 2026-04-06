import pregnancyJourneyImg from "@/assets/pregnancy-journey.jpg";

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
            {/* Caption bar */}
            <div
              className="mt-3 flex items-center gap-3"
            >
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.3)' }} />
              <p className="font-serif italic text-sm text-muted-foreground">
                A quiet space waiting. The journey begins before you realise.
              </p>
            </div>
          </div>

          {/* Copy */}
          <div>
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
            >
              About This Journey
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-6 leading-tight">
              What this journey is
            </h2>
            <div className="space-y-4 font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
              <p>
                Pregnancy often begins before you realise anything has changed.
              </p>
              <p>
                From early biological shifts and implantation through to birth,
                each stage unfolds gradually, physically, emotionally, and
                mentally.
              </p>
              <p>
                Some parts may feel clear, while others feel uncertain or hard to
                interpret. This space is designed to guide you through it step by
                step, without overwhelm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatThisJourneyIs;
