import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DueDateCalculatorForm from "@/components/shared/DueDateCalculatorForm";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";

const DueDateCalculator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackEvent(EVENTS.DUE_DATE_CALCULATOR_STARTED);
  }, []);

  const handleResult = (lmpDate: Date) => {
    trackEvent(EVENTS.DUE_DATE_CALCULATOR_COMPLETED);
    navigate(`/due-date-results?lmp=${lmpDate.getTime()}`);
  };

  const handleIVFResult = (transferDate: Date, transferType: string) => {
    trackEvent(EVENTS.DUE_DATE_CALCULATOR_COMPLETED);
    navigate(`/ivf-timeline?date=${transferDate.getTime()}&type=${transferType}`);
  };

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] glow-sage" />
        <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center relative z-10">
          <p className="stage-label mb-5">Tools</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-6 animate-fade-up">
            Pregnancy due date <span className="italic">calculator</span>
          </h1>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-xl mx-auto animate-fade-up [animation-delay:0.1s]">
            Find your due date and understand what stage you're in, with guidance tailored to you.
          </p>
        </div>
      </section>

      {/* Calculator input */}
      <section className="pb-20 md:pb-24">
        <div className="container mx-auto px-6 md:px-10 max-w-xl">
          <div className="card-elevated p-8 md:p-10">
            <DueDateCalculatorForm onResult={handleResult} onIVFResult={handleIVFResult} />
          </div>
        </div>
      </section>

      {/* Designed ending */}
      <section className="page-ending">
        <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
          <p className="font-serif text-sm italic text-foreground/80">
            Your journey starts with one simple date.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DueDateCalculator;
