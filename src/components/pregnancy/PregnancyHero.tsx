import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import DueDateCalculatorForm from "@/components/shared/DueDateCalculatorForm";
import bootiesImg from "@/assets/pregnancy-hero-booties.jpg";
import sprigImg from "@/assets/topic-mini-sprig.png";

const PregnancyHero = () => {
  const navigate = useNavigate();

  const handleResult = (lmpDate: Date) => {
    navigate(`/due-date-results?lmp=${lmpDate.getTime()}`);
  };
  const handleIVFResult = (transferDate: Date, transferType: string) => {
    navigate(`/ivf-timeline?date=${transferDate.getTime()}&type=${transferType}`);
  };

  return (
    <section className="relative bg-parchment overflow-hidden pt-[88px] pb-12 sm:pt-[104px] sm:pb-16 md:pt-[120px] md:pb-24 lg:pt-[140px]">
      {/* Soft top wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 md:h-64 -z-0"
        style={{
          background:
            'linear-gradient(180deg, hsl(var(--stage-pregnancy) / 0.55) 0%, transparent 100%)',
        }}
      />

      {/* Decorative lifestyle image — far left edge, desktop only */}
      <div className="hidden md:block absolute top-0 left-0 h-full w-[26%] lg:w-[24%] z-0">
        <img
          src={bootiesImg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-parchment" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        {/* MOBILE: editorial image strip on top */}
        <div className="md:hidden mb-6">
          <div
            className="relative rounded-3xl overflow-hidden border shadow-card-brand"
            style={{ borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.18)' }}
          >
            <img
              src={bootiesImg}
              alt=""
              aria-hidden="true"
              className="w-full h-44 sm:h-56 object-cover"
              style={{ objectPosition: '50% 35%' }}
            />
            {/* Soft inner vignette */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, transparent 55%, hsl(var(--parchment) / 0.7) 100%)',
              }}
            />
            {/* Eyebrow chip floating over image */}
            <div className="absolute left-4 top-4">
              <span
                className="inline-block rounded-full px-3 py-1 font-sans text-[10px] font-light tracking-[0.22em] uppercase backdrop-blur-sm"
                style={{
                  backgroundColor: 'hsl(var(--parchment) / 0.85)',
                  color: 'hsl(var(--stage-pregnancy-accent))',
                }}
              >
                Your Pregnancy Hub
              </span>
            </div>
          </div>
        </div>

        {/* Push content right of the lifestyle image on desktop */}
        <div className="md:pl-[20%] lg:pl-[18%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">

            {/* Left editorial */}
            <div className="text-left pt-2 md:pt-6">
              {/* Desktop eyebrow only (mobile uses chip on image) */}
              <p
                className="hidden md:block font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-5"
                style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
              >
                Your Pregnancy Hub
              </p>

              <h1 className="font-serif text-[1.75rem] sm:text-4xl md:text-[2.75rem] lg:text-[3rem] text-foreground leading-[1.08] mb-4 sm:mb-5">
                Pregnancy support,{" "}
                <span className="italic font-normal">week by week.</span>
              </h1>

              <p className="font-sans text-[14.5px] sm:text-base font-light text-muted-foreground leading-relaxed mb-6 sm:mb-7 max-w-md">
                Calm, trusted guidance from the first questions to the final
                countdown — so you can feel informed, supported, and confident
                every step of the way.
              </p>

              {/* Stat markers row */}
              <div className="flex items-stretch gap-4 sm:gap-8">
                {[
                  { label: "40+ weeks", sub: "of guidance" },
                  { label: "3 trimesters", sub: "of care" },
                  { label: "Free", sub: "to access" },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex flex-col ${i > 0 ? 'pl-4 sm:pl-8 border-l' : ''}`}
                    style={i > 0 ? { borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.18)' } : undefined}
                  >
                    <span className="font-serif text-base sm:text-xl text-foreground leading-tight">
                      {item.label}
                    </span>
                    <span className="font-sans text-[10.5px] sm:text-[11px] font-light text-muted-foreground/70 mt-0.5">
                      {item.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right card */}
            <div className="relative">
              {/* Decorative botanical above card, desktop only */}
              <img
                src={sprigImg}
                alt=""
                aria-hidden="true"
                className="hidden md:block absolute -top-8 -right-4 lg:-right-8 w-16 lg:w-20 opacity-50 pointer-events-none select-none rotate-12"
              />
              <div
                className="bg-card border rounded-[1.25rem] p-6 sm:p-7 relative"
                style={{
                  borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.2)',
                  boxShadow:
                    '0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 22px 50px -28px hsl(var(--stage-pregnancy-accent) / 0.35)',
                }}
              >
                {/* Subtle top accent bar */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-7 right-7 h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, hsl(var(--stage-pregnancy-accent) / 0.4), transparent)',
                  }}
                />
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.14)' }}
                  >
                    <Calendar size={13} style={{ color: 'hsl(var(--stage-pregnancy-accent))' }} />
                  </div>
                  <p
                    className="font-sans text-[11px] font-light tracking-[0.22em] uppercase"
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

      {/* Soft hairline divider */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'hsl(var(--stage-pregnancy-accent) / 0.12)' }}
      />
    </section>
  );
};

export default PregnancyHero;
