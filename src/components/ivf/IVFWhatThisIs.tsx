import ivfJourneyImg from "@/assets/ivf-journey.jpg";

const IVFWhatThisIs = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Feature image */}
        <div className="mb-14 rounded-2xl overflow-hidden border border-border/40 shadow-card-brand">
          <img
            src={ivfJourneyImg}
            alt="Taking it one step at a time, your journey, your pace"
            loading="lazy"
            width={1024}
            height={640}
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
          <p className="px-6 py-3 bg-card font-serif italic text-sm text-muted-foreground">
          , Taking it one step at a time, your journey, your pace
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
              IVF is often more structured than a natural pregnancy journey, with clearly defined steps, medical support, and regular monitoring.
            </p>
            <p>
              At the same time, it can involve waiting, uncertainty, and emotional highs and lows that feel different from other experiences.
            </p>
            <p>
              This space is here to guide you through each stage, clearly and calmly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFWhatThisIs;
