import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
}

const WeekWhat = ({ data }: Props) => {
  const sections = [
    {
      id: "baby",
      label: "Your baby",
      summary: data.what.baby.summary,
      detail: data.what.baby.detail,
      extra: `Size: ${data.what.baby.size}`,
    },
    {
      id: "body",
      label: "Your body",
      summary: data.what.body.summary,
      detail: data.what.body.why,
      extra: null,
    },
    {
      id: "emotional",
      label: "Emotionally",
      summary: data.what.emotional.summary,
      detail: null,
      extra: null,
    },
  ];

  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Header */}
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          This week
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-14">
          What's happening this week
        </h2>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <div
              key={s.id}
              className="bg-card border border-border/50 rounded-lg p-7 md:p-9 shadow-card-brand"
            >
              <div className="flex items-start gap-5">
                {/* Number */}
                <span className="font-serif text-2xl text-sage-muted opacity-50 mt-0.5 select-none shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-3">
                    {s.label}
                  </p>
                  <p className="font-sans text-sm font-light text-foreground leading-relaxed mb-3">
                    {s.summary}
                  </p>
                  {s.detail && (
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                      {s.detail}
                    </p>
                  )}
                  {s.extra && (
                    <p className="mt-4 font-sans text-xs font-light text-sage-muted tracking-wide">
                      {s.extra}
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

export default WeekWhat;
