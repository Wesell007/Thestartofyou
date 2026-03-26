import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
}

const WeekSymptoms = ({ data }: Props) => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Header */}
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          Symptoms
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-4">
          Common symptoms this week
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-14 max-w-xl">
          Each symptom below includes why it happens — not just what it is.
        </p>

        <div className="space-y-5">
          {data.symptoms.map((symptom, i) => (
            <div
              key={i}
              className="bg-card border border-border/50 rounded-lg p-7 md:p-8 shadow-card-brand"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
                <div className="sm:w-40 shrink-0 mb-3 sm:mb-0">
                  <p className="font-serif text-base text-foreground">{symptom.name}</p>
                </div>
                <div className="flex-1">
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-2">
                    {symptom.why}
                  </p>
                  {symptom.when && (
                    <p className="font-sans text-xs font-light text-sage-muted tracking-wide">
                      {symptom.when}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeekSymptoms;
