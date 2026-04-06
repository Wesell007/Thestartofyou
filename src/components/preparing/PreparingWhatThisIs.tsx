import preparingJourneyImg from "@/assets/preparing-journey.jpg";

const PreparingWhatThisIs = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Feature image with overlay stats */}
        <div className="relative mb-14 rounded-2xl overflow-hidden border border-border/40 shadow-elevated">
          <img
            src={preparingJourneyImg}
            alt="Getting ready together, focusing on what truly matters"
            loading="lazy"
            width={1024}
            height={640}
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
          {/* Overlay stat badges */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {["Simplify", "Focus", "Breathe"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full text-[10px] font-sans font-light tracking-widest uppercase backdrop-blur-sm border border-border/30"
                style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.85)", color: "hsl(var(--foreground))" }}>
                {tag}
              </span>
            ))}
          </div>
          <p className="px-6 py-3 bg-card font-serif italic text-sm text-muted-foreground">
            Getting ready together — focusing on what truly matters
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 md:gap-14 items-start">
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              About This Stage
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
              What this stage is
            </h2>
          </div>

          <div className="space-y-5 font-sans text-base font-light text-muted-foreground leading-relaxed">
            <p>
              Preparing for your baby can feel both <strong className="font-medium text-foreground">exciting and overwhelming</strong> at the same time.
            </p>
            <p>
              There's a lot of information online, and it's rarely clear what's essential and what's marketing.
            </p>
            <p>
              This space is here to simplify things — so you can focus on what actually matters, and let go of the rest.
            </p>

            {/* Pull-quote */}
            <div className="border-l-2 pl-5 py-2 mt-2"
              style={{ borderColor: "hsl(var(--stage-preparing-accent))" }}>
              <p className="font-serif italic text-base text-foreground/75 leading-relaxed">
                The goal isn't to be perfectly prepared. It's to feel grounded enough to begin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreparingWhatThisIs;
