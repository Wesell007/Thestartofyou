import { ArrowRight } from "lucide-react";

interface ContinueJourneySectionProps {
  isLoggedIn: boolean;
  currentStage?: string;
  stageDetail?: string;
}

const ContinueJourneySection = ({
  isLoggedIn,
  currentStage = "Week 12",
  stageDetail = "You're in your first trimester. Your 40-week guide is ready.",
}: ContinueJourneySectionProps) => {
  if (!isLoggedIn) return null;

  return (
    <section className="bg-sage-bg/50 py-10 md:py-14">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 bg-card rounded-2xl p-6 md:p-8 border border-border/60 shadow-card-brand">
          {/* Left */}
          <div>
            <p className="font-sans text-xs font-light tracking-widest uppercase text-sage mb-1.5">
              Continue where you left off
            </p>
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1">
              You're in {currentStage}
            </h3>
            <p className="font-sans text-sm font-light text-muted-foreground">{stageDetail}</p>
          </div>

          {/* CTA */}
          <a
            href="#"
            className="shrink-0 inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all self-start sm:self-center"
          >
            Continue your journey
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContinueJourneySection;
