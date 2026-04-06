import supportJourneyImg from "@/assets/support-journey.jpg";

const SupportWhatThisIs = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Feature image with accent border */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-[hsl(var(--stage-support-accent)/0.15)] shadow-card-brand">
          <img
            src={supportJourneyImg}
            alt="It's okay to pause, you don't have to have all the answers"
            loading="lazy"
            width={1024}
            height={640}
            className="w-full h-56 sm:h-72 md:h-80 object-cover"
          />
          <div className="px-6 py-4 bg-card border-t border-border/30">
            <p className="font-serif italic text-sm text-muted-foreground">
              It's okay to pause. You don't have to have all the answers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-4">
              About This Space
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-7 leading-tight">
              What this space is for
            </h2>
            <div className="space-y-4 font-sans text-base font-light text-muted-foreground leading-relaxed">
              <p>
                Sometimes things don't feel quite right, physically, emotionally, or both.
              </p>
              <p>
                You might not know exactly what you're looking for, only that something feels off.
              </p>
              <p>
                This space is here to help you make sense of that, and guide you gently towards what to do next.
              </p>
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-4">
            {[
              { label: "No diagnosis", detail: "Just guidance and clarity" },
              { label: "No pressure", detail: "Go at your own pace" },
              { label: "No judgement", detail: "Every feeling is valid" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border/40 rounded-lg p-5 shadow-card-brand">
                <span className="font-serif text-base text-foreground">{item.label}</span>
                <p className="font-sans text-xs font-light text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportWhatThisIs;
