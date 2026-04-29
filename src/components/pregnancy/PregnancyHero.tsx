import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import DueDateCalculatorForm from "@/components/shared/DueDateCalculatorForm";
import bootiesImg from "@/assets/pregnancy-hero-booties.jpg";

const PregnancyHero = () => {
  const navigate = useNavigate();

  const handleResult = (lmpDate: Date) => {
    navigate(`/due-date-results?lmp=${lmpDate.getTime()}`);
  };
  const handleIVFResult = (transferDate: Date, transferType: string) => {
    navigate(`/ivf-timeline?date=${transferDate.getTime()}&type=${transferType}`);
  };

  return (
    <section className="relative bg-parchment overflow-hidden pt-10 pb-14 sm:pt-14 sm:pb-20 md:pt-16 md:pb-24">
      {/* Decorative lifestyle image — far left edge, desktop only */}
      <div className="hidden md:block absolute top-0 left-0 h-full w-[26%] lg:w-[24%] z-0">
        <img
          src={bootiesImg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        {/* soft fade into parchment on the right edge */}
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-parchment" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        {/* Push content right of the lifestyle image on desktop */}
        <div className="md:pl-[20%] lg:pl-[18%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">

            {/* Left editorial */}
            <div className="text-left pt-2 md:pt-6">
              <p
                className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-5"
                style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
              >
                Your Pregnancy Hub
              </p>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3rem] text-foreground leading-[1.08] mb-5">
                Pregnancy support,{" "}
                <span className="italic font-normal">week by week.</span>
              </h1>

              <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed mb-7 max-w-md">
                Calm, trusted guidance from the first questions to the final
                countdown — so you can feel informed, supported, and confident
                every step of the way.
              </p>

              {/* Stat markers row */}
              <div className="flex items-stretch gap-6 sm:gap-8">
                {[
                  { label: "40+ weeks", sub: "of guidance" },
                  { label: "3 trimesters", sub: "of care" },
                  { label: "Free", sub: "to access" },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex flex-col ${i > 0 ? 'pl-6 sm:pl-8 border-l' : ''}`}
                    style={i > 0 ? { borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.18)' } : undefined}
                  >
                    <span className="font-serif text-lg sm:text-xl text-foreground leading-tight">
                      {item.label}
                    </span>
                    <span className="font-sans text-[11px] font-light text-muted-foreground/70 mt-0.5">
                      {item.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right card */}
            <div>
              <div
                className="bg-card border rounded-2xl p-6 sm:p-7 shadow-card-brand"
                style={{ borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.18)' }}
              >
                <div className="flex items-center gap-2.5 mb-2.5">
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
                    Start with your due date
                  </p>
                </div>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5">
                  We'll personalise your journey and content.
                </p>
                <DueDateCalculatorForm onResult={handleResult} onIVFResult={handleIVFResult} compact />
                <p className="mt-4 font-sans text-[11px] font-light text-muted-foreground/70 leading-relaxed">
                  This tool is a guide only and doesn't replace medical advice.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PregnancyHero;
