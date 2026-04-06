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
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ttc-accent) / 0.3)' }} />
              <p className="font-serif italic text-sm text-muted-foreground">
                A quiet moment of hope. The beginning of a new chapter.
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
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-6 leading-tight">
              What this journey is
            </h2>
            <div className="space-y-4 font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
              <p>
                Trying to conceive can feel both straightforward and uncertain at the same time.
              </p>
              <p>
                While there are clear biological patterns, such as ovulation and fertile windows, the experience itself often involves waiting, timing, and not always knowing exactly what's happening.
              </p>
            </div>

            {/* Pull quote */}
            <div
              className="mt-6 pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-ttc-accent) / 0.3)' }}
            >
              <p className="font-serif italic text-base text-foreground/75 leading-relaxed">
                This space is here to guide you through that process clearly and calmly, without pressure or false certainty.
              </p>
            </div>

            {/* Anchoring stat */}
            <div className="mt-6 flex items-center gap-5">
              {[
                { n: "28", label: "day avg cycle" },
                { n: "5–6", label: "fertile days" },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="font-serif text-xl text-foreground">{s.n}</span>
                  <span className="font-sans text-[10px] font-light text-muted-foreground/60 uppercase tracking-wide">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TTCWhatThisIs;
