import { useNavigate } from "react-router-dom";
import botanicalCorner from "@/assets/botanical-corner.png";
import heroIllustration from "@/assets/hero-illustration.png";
import DueDateCalculatorForm from "@/components/shared/DueDateCalculatorForm";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleResult = (lmpDate: Date) => {
    navigate(`/due-date-results?lmp=${lmpDate.getTime()}`);
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-screen bg-parchment overflow-hidden flex flex-col justify-center pt-20 md:pt-32 pb-16 md:pb-24">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[400px] md:w-[600px] h-[300px] md:h-[400px] glow-sage" />

      {/* Botanical accent */}
      <img
        src={botanicalCorner}
        alt=""
        aria-hidden="true"
        width={340}
        height={340}
        className="absolute -top-6 -right-10 w-40 sm:w-60 md:w-80 opacity-50 pointer-events-none select-none"
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10 items-center">

          {/* Left: copy + calculator */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto md:mx-0">
            <p className="stage-label mb-4 md:mb-5 animate-fade-up">Your Pregnancy Journey</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[3.5rem] text-foreground leading-[1.08] mb-5 md:mb-7 animate-fade-up [animation-delay:0.05s]">
              Your Pregnancy Journey,{" "}
              <span className="italic">Week by Week</span>
            </h1>

            <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed mb-8 md:mb-14 animate-fade-up [animation-delay:0.1s] max-w-md">
              A structured system that adapts to your stage. Enter your details
              to begin your personalised{" "}
              <strong className="font-medium text-foreground">40-week guide</strong>.
            </p>

            {/* Calculator form */}
            <div className="w-full animate-fade-up [animation-delay:0.2s]">
              <DueDateCalculatorForm onResult={handleResult} compact />
            </div>
          </div>

          {/* Right: illustration */}
          <div className="flex justify-center md:justify-end relative order-first md:order-last">
            <img
              src={heroIllustration}
              alt="Pregnant woman holding flowers, illustrated in sage green line art"
              width={480}
              height={540}
              className="w-48 sm:w-64 md:w-full max-w-sm md:max-w-md animate-float"
            />
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="section-fade-bottom" />
    </section>
  );
};

export default HeroSection;
