import supportJourneyImg from "@/assets/support-journey.jpg";

const SupportWhatThisIs = () => {
  return (
    <section className="bg-parchment-dark py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">
          <div className="md:col-span-3">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-4">
              About This Space
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-6 leading-tight">
              What this space is for
            </h2>
            <div className="space-y-4 font-sans text-base font-light text-muted-foreground leading-relaxed mb-8">
              <p>
                Sometimes things don't feel quite right, physically, emotionally, or both. You might not know exactly what you're looking for, only that something feels off.
              </p>
              <p>
                This space helps you make sense of that and guides you gently towards what to do next.
              </p>
            </div>

            {/* Pull-quote */}
            <div className="border-l-3 border-[hsl(var(--stage-support-accent)/0.5)] pl-6 py-3">
              <p className="font-serif italic text-base md:text-lg text-foreground/75 leading-relaxed">
                Uncertainty itself is valid. You don't need to name it to start making sense of it.
              </p>
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-3">
            {/* Compact image */}
            <div className="rounded-xl overflow-hidden border border-[hsl(var(--stage-support-accent)/0.12)] shadow-card-brand mb-1">
              <img
                src={supportJourneyImg}
                alt="It's okay to pause"
                loading="lazy"
                width={512}
                height={320}
                className="w-full h-40 md:h-48 object-cover"
              />
            </div>
            {[
              { label: "No diagnosis", detail: "Just guidance and clarity" },
              { label: "No pressure", detail: "Go at your own pace" },
              { label: "No judgement", detail: "Every feeling is valid" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border/40 rounded-lg px-5 py-4 shadow-card-brand flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--stage-support-accent)/0.5)] flex-shrink-0" />
                <div>
                  <span className="font-serif text-sm text-foreground">{item.label}</span>
                  <span className="font-sans text-xs font-light text-muted-foreground ml-2">{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportWhatThisIs;
