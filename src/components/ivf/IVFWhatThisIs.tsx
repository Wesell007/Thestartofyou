import ivfJourneyImg from "@/assets/ivf-journey.jpg";

const IVFWhatThisIs = () => {
  return (
    <section className="bg-parchment-dark pt-10 md:pt-16 pb-8 md:pb-12">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          {/* Image */}
          <div>
            <div
              className="relative rounded-2xl overflow-hidden border shadow-card-brand"
              style={{ borderColor: 'hsl(var(--stage-ivf) / 0.25)' }}
            >
              <img
                src={ivfJourneyImg}
                alt="Taking it one step at a time"
                loading="lazy"
                width={1024}
                height={640}
                className="block w-full h-56 sm:h-68 md:h-80 object-cover"
              />
              {/* Gradient overlay at bottom */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-20"
                style={{ background: 'linear-gradient(to top, hsl(var(--stage-ivf) / 0.3), transparent)' }}
              />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-px w-10" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.35)' }} />
              <p className="font-serif italic text-sm text-muted-foreground">
                Your journey, your pace.
              </p>
            </div>
          </div>

          {/* Copy */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                style={{ color: 'hsl(var(--stage-ivf-accent))' }}
              >
                About This Journey
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.2rem] text-foreground mb-5 leading-tight">
              A medically structured process with an emotional pace of its own
            </h2>
            <div className="space-y-4 font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
              <p>
                IVF involves clearly defined stages, regular monitoring, and careful timing. But between the appointments and procedures are stretches of waiting that can feel unlike anything else.
              </p>
            </div>

            {/* Pull quote */}
            <div
              className="mt-6 pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.45)' }}
            >
              <p className="font-serif italic text-[15px] text-foreground/65 leading-relaxed">
                This space guides you through each stage clearly, calmly, and without overwhelm.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-6 flex items-center gap-5">
              {[
                { n: "3", label: "stages" },
                { n: "Structured", label: "process" },
                { n: "Guided", label: "support" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline gap-1.5 rounded-lg px-3 py-2"
                  style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.15)' }}
                >
                  <span className="font-serif text-base text-foreground">{s.n}</span>
                  <span className="font-sans text-[9px] font-light text-muted-foreground/55 uppercase tracking-wide">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFWhatThisIs;
