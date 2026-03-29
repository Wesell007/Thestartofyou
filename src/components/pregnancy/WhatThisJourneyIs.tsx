import pregnancyJourneyImg from "@/assets/pregnancy-journey.jpg";

const WhatThisJourneyIs = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Feature image */}
        <div className="mb-14 rounded-2xl overflow-hidden border border-border/40 shadow-card-brand">
          <img
            src={pregnancyJourneyImg}
            alt="A quiet space waiting, the journey begins before you realise"
            loading="lazy"
            width={1024}
            height={640}
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
          <p className="px-6 py-3 bg-card font-serif italic text-sm text-muted-foreground">
          , A quiet space waiting, the journey begins before you realise
          </p>
        </div>

        <div className="max-w-2xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            About This Journey
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-8 leading-tight">
            What this journey is
          </h2>
          <div className="space-y-5 font-sans text-base font-light text-muted-foreground leading-relaxed">
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
    </section>
  );
};

export default WhatThisJourneyIs;
