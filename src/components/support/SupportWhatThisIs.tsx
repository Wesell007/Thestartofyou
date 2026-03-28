import supportJourneyImg from "@/assets/support-journey.jpg";

const SupportWhatThisIs = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Feature image */}
        <div className="mb-14 rounded-2xl overflow-hidden border border-border/40 shadow-card-brand">
          <img
            src={supportJourneyImg}
            alt="It's okay to pause — you don't have to have all the answers"
            loading="lazy"
            width={1024}
            height={640}
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
          <p className="px-6 py-3 bg-card font-serif italic text-sm text-muted-foreground">
            — It's okay to pause — you don't have to have all the answers
          </p>
        </div>

        <div className="max-w-2xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            About This Space
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-8 leading-tight">
            What this space is for
          </h2>
          <div className="space-y-5 font-sans text-base font-light text-muted-foreground leading-relaxed">
            <p>
              Sometimes things don't feel quite right — physically, emotionally, or both.
            </p>
            <p>
              You might not know exactly what you're looking for, only that something feels off.
            </p>
            <p>
              This space is here to help you make sense of that, and guide you gently towards what to do next.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportWhatThisIs;
