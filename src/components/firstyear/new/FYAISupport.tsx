import AISearchBar from "@/components/shared/AISearchBar";
import AskLink from "@/components/shared/AskLink";

const babyChips = ["Sleep regression", "Feeding cues", "Milestones"];
const recoveryChips = ["Bleeding", "Mood shifts", "6-week check"];

const FYAISupport = () => {
  return (
    <section className="relative bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl relative z-10">
        <div
          className="relative overflow-hidden rounded-[30px] border bg-card shadow-[0_36px_90px_-52px_rgba(20,30,60,0.32)] p-7 sm:p-10 md:p-12"
          style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.16)' }}
        >
          {/* Dual-tone gradient wash */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(135deg, hsl(var(--stage-firstyear-soft) / 0.30) 0%, hsl(var(--stage-firstyear-soft) / 0.06) 50%, hsl(var(--stage-recovery-soft) / 0.30) 100%)',
            }}
            aria-hidden
          />
          {/* Ambient blooms */}
          <div
            className="absolute -top-20 -left-16 w-64 h-64 rounded-full blur-3xl opacity-60 pointer-events-none"
            style={{ backgroundColor: 'hsl(var(--stage-firstyear-soft) / 0.65)' }}
            aria-hidden
          />
          <div
            className="absolute -bottom-24 -right-16 w-64 h-64 rounded-full blur-3xl opacity-50 pointer-events-none"
            style={{ backgroundColor: 'hsl(var(--stage-recovery-soft) / 0.55)' }}
            aria-hidden
          />
          {/* Inner highlight */}
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(to right, transparent, hsl(0 0% 100% / 0.8), transparent)' }}
            aria-hidden
          />

          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.55)' }} />
              <span className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.55)' }} />
              <span className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-foreground/60 ml-1">
                Ask anything
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-[1.85rem] text-foreground leading-tight mb-3">
              Ask whatever's on your mind.
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-7 max-w-xl">
              Questions about your baby or about you, answered in the same place.
            </p>

            <AISearchBar
              placeholder="What's on your mind today?"
              suggestions={[]}
              context="First year hub"
              stage="first-year"
            />

            {/* Chip row — colour carries the meaning */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {babyChips.map((c) => (
                <AskLink
                  key={c}
                  question={c}
                  context="First year hub"
                  journey="firstyear"
                  stage="first-year"
                  className="font-sans text-[12px] font-light px-3.5 py-1.5 rounded-full border bg-card/70 backdrop-blur-sm transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_20px_-14px_rgba(20,30,60,0.5)]"
                  style={{
                    borderColor: 'hsl(var(--stage-firstyear-accent) / 0.28)',
                    color: 'hsl(var(--stage-firstyear-deep))',
                  }}
                >
                  {c}
                </AskLink>
              ))}
              {recoveryChips.map((c) => (
                <AskLink
                  key={c}
                  question={c}
                  context="Postpartum recovery"
                  journey="recovery"
                  stage="recovery"
                  className="font-sans text-[12px] font-light px-3.5 py-1.5 rounded-full border bg-card/70 backdrop-blur-sm transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_20px_-14px_rgba(60,40,55,0.45)]"
                  style={{
                    borderColor: 'hsl(var(--stage-recovery-accent) / 0.28)',
                    color: 'hsl(var(--stage-recovery-deep))',
                  }}
                >
                  {c}
                </AskLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FYAISupport;
