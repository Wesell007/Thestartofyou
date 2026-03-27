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
    <section className="relative min-h-screen bg-parchment overflow-hidden flex flex-col justify-center pt-20 md:pt-24 pb-16">
      {/* Top-right botanical decoration */}
      <img
        src={botanicalCorner}
        alt=""
        aria-hidden="true"
        width={340}
        height={340}
        className="absolute -top-6 -right-10 w-60 md:w-80 opacity-70 pointer-events-none select-none"
      />

      <div className="container mx-auto px-6 md:px-10 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 items-center">

          {/* Left: copy + calculator */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto md:mx-0">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-5 animate-fade-up">
              Your Pregnancy Journey,{" "}
              <span className="italic">Week by Week</span>
            </h1>

            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10 animate-fade-up [animation-delay:0.1s] max-w-md">
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
          <div className="flex justify-center md:justify-end relative">
            <img
              src={heroIllustration}
              alt="Pregnant woman holding flowers, illustrated in sage green line art"
              width={480}
              height={540}
              className="w-64 sm:w-80 md:w-full max-w-sm md:max-w-md animate-float"
            />
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-parchment to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
