import preparingJourneyImg from "@/assets/preparing-journey.jpg";

const PreparingWhatThisIs = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Feature image */}
        <div className="mb-14 rounded-2xl overflow-hidden border border-border/40 shadow-card-brand">
          <img
            src={preparingJourneyImg}
            alt="Getting ready together — focusing on what truly matters"
            loading="lazy"
            width={1024}
            height={640}
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
          <p className="px-6 py-3 bg-card font-serif italic text-sm text-muted-foreground">
            — Getting ready together — focusing on what truly matters
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
              Preparing for your baby can feel both exciting and overwhelming.
            </p>
            <p>
              There's often a lot of information — and it's not always clear what's essential and what's optional.
            </p>
            <p>
              This space is here to simplify things, so you can focus on what actually matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreparingWhatThisIs;
