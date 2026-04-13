import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import DueDateCalculatorForm from "@/components/shared/DueDateCalculatorForm";

const JourneyEntrySection = () => {
  const navigate = useNavigate();

  const handleResult = (lmpDate: Date) => {
    navigate(`/due-date-results?lmp=${lmpDate.getTime()}`);
  };

  const handleIVFResult = (transferDate: Date, transferType: string) => {
    navigate(`/ivf-timeline?date=${transferDate.getTime()}&type=${transferType}`);
  };

  return (
    <section className="bg-parchment-dark section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-xl text-center">
        <p className="stage-label mb-3">Begin here</p>
        <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.25rem] text-foreground mb-3">
          Find your week
        </h2>
        <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto">
          Enter your date and we'll build your personalised pregnancy timeline.
        </p>

        <div className="bg-card border border-border/30 rounded-2xl p-6 sm:p-8 shadow-soft max-w-md mx-auto">
          <DueDateCalculatorForm
            onResult={handleResult}
            onIVFResult={handleIVFResult}
            compact
          />
        </div>
      </div>
    </section>
  );
};

export default JourneyEntrySection;
