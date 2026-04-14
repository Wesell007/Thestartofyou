import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import DueDateCalculatorForm from "@/components/shared/DueDateCalculatorForm";

const PregnancyHero = () => {
  const navigate = useNavigate();

  const handleResult = (lmpDate: Date) => {
    navigate(`/due-date-results?lmp=${lmpDate.getTime()}`);
  };

  const handleIVFResult = (transferDate: Date, transferType: string) => {
    navigate(`/ivf-timeline?date=${transferDate.getTime()}&type=${transferType}`);
  };

  return (
    <section className="relative bg-parchment overflow-hidden pt-20 pb-14 sm:pt-24 sm:pb-20 md:pt-36 md:pb-28">
      {/* Multi-layer ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[500px] md:w-[700px] h-[400px] md:h-[600px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.5)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[300px] h-[350px] rounded-full blur-3xl"
          style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.08)' }}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">

          <div className="text-left">
            {/* Trimester colour trail */}
            <div className="flex items-center gap-1.5 mb-5 md:mb-7 animate-fade-up">
              {[
                { var: '--stage-ttc-accent', w: 'w-5' },
                { var: '--stage-pregnancy-accent', w: 'w-8' },
                { var: '--stage-ivf-accent', w: 'w-5' },
              ].map((t, i) => (
                <div
                  key={i}
                  className={`h-0.5 rounded-full ${t.w}`}
                  style={{ backgroundColor: `hsl(var(${t.var}) / ${i === 1 ? '0.6' : '0.25'})` }}
                />
              ))}
              <p
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase ml-2"
                style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
              >
                The Pregnancy Journey
              </p>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] text-foreground leading-[1.08] mb-4 md:mb-6 animate-fade-up">
              Your week-by-week guide{" "}
              <span className="italic">through pregnancy</span>
            </h1>
            <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed mb-5 md:mb-6 max-w-[22rem] animate-fade-up [animation-delay:0.1s]">
              Understand what's happening, what's normal, and what to focus on
              from the very first week through to birth.
            </p>

            {/* Trust markers */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 md:mb-0 animate-fade-up [animation-delay:0.15s]">
              {[
                { label: "40+ weeks", sub: "covered" },
                { label: "3 trimesters", sub: "mapped" },
                { label: "Free", sub: "to start" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span className="font-serif text-lg text-foreground leading-none">{item.label}</span>
                  <span className="font-sans text-[10px] font-light text-muted-foreground/60 tracking-wide uppercase">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:0.15s]">
            <div
              className="border rounded-2xl p-6 sm:p-8 shadow-card-brand backdrop-blur-sm"
              style={{
                backgroundColor: 'hsl(var(--stage-pregnancy) / 0.35)',
                borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.15)',
              }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.12)' }}
                >
                  <Calendar size={13} style={{ color: 'hsl(var(--stage-pregnancy-accent))' }} />
                </div>
                <p
                  className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                  style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
                >
                  Due date calculator
                </p>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-1 leading-snug">
                Find your due date
              </h2>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5 sm:mb-6">
                See what stage you're in and get guidance tailored to your week.
              </p>
              <DueDateCalculatorForm onResult={handleResult} onIVFResult={handleIVFResult} compact />
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-parchment-dark to-transparent pointer-events-none" />
    </section>
  );
};

export default PregnancyHero;
