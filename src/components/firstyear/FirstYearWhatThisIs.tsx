import firstyearJourneyImg from "@/assets/firstyear-journey.jpg";

const FirstYearWhatThisIs = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-border/40 shadow-card-brand">
              <img
                src={firstyearJourneyImg}
                alt="Discovering the world together, one small moment at a time"
                loading="lazy"
                width={1024}
                height={640}
                className="w-full h-56 sm:h-72 md:h-80 object-cover"
              />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.3)' }} />
              <p className="font-serif italic text-sm text-muted-foreground">
                Discovering the world together. One small moment at a time.
              </p>
            </div>
          </div>

          {/* Copy */}
          <div>
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
            >
              About This Stage
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-6 leading-tight">
              What this stage is
            </h2>
            <div className="space-y-4 font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
              <p>
                The first year is a period of constant change, for both your baby and you.
              </p>
              <p>
                While things may begin to feel more manageable than the early weeks, this stage rarely feels fully settled. Patterns start to form, then shift again.
              </p>
            </div>

            {/* Pull quote */}
            <div
              className="mt-6 pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.3)' }}
            >
              <p className="font-serif italic text-base text-foreground/75 leading-relaxed">
                This space is here to guide you through that, clearly, calmly, and without pressure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstYearWhatThisIs;
