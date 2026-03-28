import firstyearJourneyImg from "@/assets/firstyear-journey.jpg";

const FirstYearWhatThisIs = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Feature image */}
        <div className="mb-14 rounded-2xl overflow-hidden border border-border/40 shadow-card-brand">
          <img
            src={firstyearJourneyImg}
            alt="Discovering the world together — one small moment at a time"
            loading="lazy"
            width={1024}
            height={640}
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
          <p className="px-6 py-3 bg-card font-serif italic text-sm text-muted-foreground">
            — Discovering the world together — one small moment at a time
          </p>
        </div>

        <div className="max-w-2xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            About This Stage
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-8 leading-tight">
            What this stage is
          </h2>
          <div className="space-y-5 font-sans text-base font-light text-muted-foreground leading-relaxed">
            <p>
              The first year is a period of constant change — for both your baby and you.
            </p>
            <p>
              While things may begin to feel more manageable than the early weeks, this stage rarely feels fully settled. Patterns start to form, then shift again, and new phases often arrive just as others begin to feel familiar.
            </p>
            <p>
              This space is here to guide you through that — clearly, calmly, and without pressure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstYearWhatThisIs;
