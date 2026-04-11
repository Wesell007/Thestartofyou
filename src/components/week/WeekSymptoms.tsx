import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
}

const WeekSymptoms = ({ data }: Props) => {
  return (
    <section className="bg-parchment-dark section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        {/* Header */}
        <p className="stage-label mb-3">
          Symptoms
        </p>
        <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.25rem] text-foreground leading-tight mb-3">
          Common symptoms this week
        </h2>
        <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-10 max-w-xl">
          Each symptom includes why it happens, when it typically appears, and what it can actually feel like.
        </p>

        <div className="space-y-4">
          {data.symptoms.map((symptom, i) => (
            <div
              key={i}
              className="bg-card border border-border/40 rounded-xl p-5 sm:p-6 md:p-7 shadow-card-brand"
            >
              {/* Symptom name */}
              <p className="font-serif text-base sm:text-lg text-foreground mb-3.5">{symptom.name}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Why */}
                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-sage mb-1.5">Why it happens</p>
                  <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
                    {symptom.why}
                  </p>
                </div>

                {/* When */}
                {symptom.when && (
                  <div>
                    <p className="font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-sage mb-1.5">When</p>
                    <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
                      {symptom.when}
                    </p>
                  </div>
                )}

                {/* What it feels like */}
                {symptom.feelLike && (
                  <div className={symptom.when ? "" : "sm:col-span-2"}>
                    <p className="font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-sage mb-1.5">What it can feel like</p>
                    <p className="font-serif italic text-[15px] text-muted-foreground leading-relaxed">
                      {symptom.feelLike}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeekSymptoms;
