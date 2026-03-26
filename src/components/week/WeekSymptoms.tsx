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
          Each symptom includes why it happens, when it typically appears, and what it can actually feel like.
        </p>

        <div className="space-y-5">
          {data.symptoms.map((symptom, i) => (
            <div
              key={i}
              className="bg-card border border-border/50 rounded-lg p-7 md:p-8 shadow-card-brand"
            >
              {/* Symptom name */}
              <p className="font-serif text-base text-foreground mb-4">{symptom.name}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Why */}
                <div>
                  <p className="font-sans text-[10px] font-light tracking-[0.15em] uppercase text-sage-muted mb-1.5">Why it happens</p>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                    {symptom.why}
                  </p>
                </div>

                {/* When */}
                {symptom.when && (
                  <div>
                    <p className="font-sans text-[10px] font-light tracking-[0.15em] uppercase text-sage-muted mb-1.5">When</p>
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                      {symptom.when}
                    </p>
                  </div>
                )}

                {/* What it feels like */}
                {symptom.feelLike && (
                  <div className={symptom.when ? "" : "sm:col-span-2"}>
                    <p className="font-sans text-[10px] font-light tracking-[0.15em] uppercase text-sage-muted mb-1.5">What it can feel like</p>
                    <p className="font-serif italic text-sm text-muted-foreground leading-relaxed">
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
