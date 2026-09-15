import IVFTimelineForm from "@/components/ivf/IVFTimelineForm";
import heroMoment from "@/assets/ivf-hero-moment.jpg";

const IVFHero = () => {
  return (
    <section className="relative bg-parchment overflow-hidden pt-28 md:pt-32 pb-12 md:pb-16">

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left column — utility anchor */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto md:mx-0">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.4)' }} />
              <span
                className="font-sans text-[11px] font-light tracking-[0.25em] uppercase"
                style={{ color: 'hsl(var(--stage-ivf-accent))' }}
              >
                IVF Journey
              </span>
              <div className="h-px w-10" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.4)' }} />
            </div>

            <h1 className="font-serif text-[2.5rem] sm:text-5xl lg:text-[3.75rem] text-foreground leading-[1.06] mb-4 animate-fade-up">
              Understand your stage.<br />
              <span className="italic">Navigate the waiting.</span>
            </h1>

            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-7 animate-fade-up [animation-delay:0.1s] max-w-md">
              Track your timeline, find answers to the questions that come between appointments, and move through each stage with clarity.
            </p>

            {/* Calculator card — one shared implementation (Phase 34F) */}
            <IVFTimelineForm className="animate-fade-up [animation-delay:0.2s]" />
          </div>

          {/* Right column — single photographic moment + quiet truth band */}
          <div className="flex justify-center md:justify-end animate-fade-up [animation-delay:0.15s]">
            <div className="w-full max-w-sm md:max-w-[460px] space-y-5">
              <div
                className="relative rounded-[1.25rem] overflow-hidden ring-1 shadow-[0_40px_100px_-45px_rgba(60,40,90,0.32)]"
                style={{ ['--tw-ring-color' as never]: 'hsl(var(--stage-ivf-accent) / 0.22)' }}
              >
                <img
                  src={heroMoment}
                  alt="A quiet morning moment with lavender and tea, evoking the reflective spaces inside an IVF journey"
                  width={1024}
                  height={1280}
                  className="w-full h-auto max-h-[380px] md:max-h-[520px] object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, transparent 55%, hsl(var(--stage-ivf) / 0.22) 100%)' }}
                />
              </div>

              {/* Emotional truth band */}
              <div
                className="rounded-2xl px-6 py-5 border backdrop-blur-sm"
                style={{
                  backgroundColor: 'hsl(var(--stage-ivf) / 0.14)',
                  borderColor: 'hsl(var(--stage-ivf-accent) / 0.16)',
                }}
              >
                <p className="font-sans text-[10px] font-light tracking-[0.22em] uppercase mb-3" style={{ color: 'hsl(var(--stage-ivf-accent) / 0.9)' }}>
                  What many people feel
                </p>
                <p className="font-serif italic text-[16px] sm:text-[17px] text-foreground/75 leading-relaxed mb-4">
                  "The process has structure. The emotions often don't."
                </p>
                <div
                  className="h-px w-full mb-4"
                  style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.14)' }}
                />
                <div className="flex items-center gap-7">
                  {[
                    { n: "1 in 6", label: "couples" },
                    { n: "Guided", label: "at every step" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-baseline gap-1.5">
                      <span className="font-serif text-[15px] text-foreground/80">{s.n}</span>
                      <span className="font-sans text-[9.5px] font-light text-muted-foreground/60 uppercase tracking-[0.1em]">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default IVFHero;
