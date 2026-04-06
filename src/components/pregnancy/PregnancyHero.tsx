import { useNavigate } from "react-router-dom";
import DueDateCalculatorForm from "@/components/shared/DueDateCalculatorForm";

const PregnancyHero = () => {
  const navigate = useNavigate();

  const handleResult = (lmpDate: Date) => {
    navigate(`/due-date-results?lmp=${lmpDate.getTime()}`);
  };

  return (
    <section className="relative bg-parchment overflow-hidden pt-20 pb-14 sm:pt-24 sm:pb-20 md:pt-36 md:pb-28">
      {/* Multi-layer ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[500px] md:w-[700px] h-[400px] md:h-[600px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.45)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.15)' }}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">

          <div className="text-left">
            {/* Stage trail */}
            <div className="flex items-center gap-2 mb-5 md:mb-7">
              <div className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.4)' }} />
              <p
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
              >
                The Pregnancy Journey
              </p>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] text-foreground leading-[1.08] mb-5 md:mb-7 animate-fade-up">
              Your week-by-week guide through pregnancy
            </h1>
            <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed mb-4 md:mb-5 max-w-sm animate-fade-up [animation-delay:0.1s]">
              Understand what's happening, what's normal, and what to focus on,
              from the very first week through to week 40.
            </p>

            {/* Trust markers */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 animate-fade-up [animation-delay:0.2s]">
              {["40 weeks covered", "Updated weekly", "Free to start"].map((item) => (
                <span key={item} className="flex items-center gap-2 font-sans text-xs font-light text-muted-foreground/70">
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.5)' }} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:0.15s]">
            <div
              className="border rounded-2xl p-6 sm:p-8 shadow-card-brand"
              style={{
                backgroundColor: 'hsl(var(--stage-pregnancy) / 0.3)',
                borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.12)',
              }}
            >
              <p
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-2"
                style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
              >
                Due date calculator
              </p>
              <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-1 leading-snug">
                Find your due date
              </h2>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5 sm:mb-7">
                See what stage you're in and get guidance tailored to your week.
              </p>
              <DueDateCalculatorForm onResult={handleResult} compact />
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-parchment-dark to-transparent pointer-events-none" />
    </section>
  );
};

export default PregnancyHero;
