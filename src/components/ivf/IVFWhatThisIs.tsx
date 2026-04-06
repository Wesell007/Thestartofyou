import ivfJourneyImg from "@/assets/ivf-journey.jpg";

const IVFWhatThisIs = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Image */}
          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden border shadow-card-brand"
              style={{ borderColor: 'hsl(var(--stage-ivf) / 0.3)' }}
            >
              <img
                src={ivfJourneyImg}
                alt="Taking it one step at a time, your journey, your pace"
                loading="lazy"
                width={1024}
                height={640}
                className="w-full h-60 sm:h-72 md:h-80 object-cover"
              />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <p className="font-serif italic text-sm text-muted-foreground">
                Your journey, your pace. One step at a time.
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
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-6 leading-tight">
              What this journey is
            </h2>
            <div className="space-y-4 font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
              <p>
                IVF is a medically structured process with clearly defined stages, regular monitoring, and careful timing. But it is also an emotional experience that moves at its own pace.
              </p>
              <p>
                Between the appointments and procedures, there are long stretches of waiting, moments of hope, and periods of uncertainty that can feel unlike anything else.
              </p>
            </div>

            {/* Pull quote */}
            <div
              className="mt-7 pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.4)' }}
            >
              <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
                This space is here to guide you through each stage clearly, calmly, and without overwhelm.
              </p>
            </div>

            {/* Stat anchors */}
            <div className="mt-7 flex items-center gap-6">
              {[
                { n: "3", label: "stages" },
                { n: "Structured", label: "process" },
                { n: "Guided", label: "support" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-serif text-lg text-foreground">{s.n}</span>
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

export default IVFWhatThisIs;
