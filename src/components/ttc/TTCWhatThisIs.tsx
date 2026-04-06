import ttcJourneyImg from "@/assets/ttc-journey.jpg";

const TTCWhatThisIs = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-border/40 shadow-card-brand">
              <img
                src={ttcJourneyImg}
                alt="A quiet moment of hope, the beginning of a new chapter"
                loading="lazy"
                width={1024}
                height={640}
                className="w-full h-56 sm:h-72 md:h-80 object-cover"
              />
              {/* Stage accent overlay bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(to right, hsl(var(--stage-ttc-accent) / 0.5), hsl(var(--stage-ttc-accent) / 0.1))` }}
              />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-ttc-accent) / 0.4)' }} />
              <p className="font-serif italic text-sm text-muted-foreground/70">
                The beginning is often quieter than you expect.
              </p>
            </div>
          </div>

          {/* Copy */}
          <div>
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-ttc-accent))' }}
            >
              About This Journey
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-5 leading-tight">
              What this journey is
            </h2>
            <div className="space-y-4 font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
              <p>
                Trying to conceive sits at the intersection of biology, timing, and emotional experience. The science is real, but the feelings are often harder to navigate than the process itself.
              </p>
              <p>
                This guide exists to help you understand what's happening in your body, what to focus on, and what to let go of.
              </p>
            </div>

            {/* Pull quote */}
            <div
              className="mt-6 pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-ttc-accent) / 0.35)' }}
            >
              <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
                Not a countdown. Not a checklist. A space that understands that trying is its own experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TTCWhatThisIs;
