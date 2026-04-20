import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
}

// Three editorial points pulled from existing weekData
const SlotWhatMatters = ({ data }: Props) => {
  const points = [
    {
      title: "Your baby",
      body: data.what.baby.what,
    },
    {
      title: "Your body",
      body: data.what.body.what,
    },
    {
      title: "Emotionally",
      body: data.what.emotional.what,
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
        <p
          className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-5 sm:mb-6"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          What matters this week
        </p>

        <p className="font-serif italic text-[1.35rem] sm:text-[1.55rem] md:text-[1.75rem] text-foreground leading-snug mb-9 sm:mb-11 max-w-xl">
          {data.atAGlance.split(".")[0]}.
        </p>

        <ul className="space-y-7 sm:space-y-8">
          {points.map((p, i) => (
            <li key={i} className="flex gap-4 sm:gap-5">
              <span
                aria-hidden="true"
                className="mt-2 shrink-0 w-[3px] h-5 rounded-full"
                style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
              />
              <div>
                <p className="font-sans text-[13px] sm:text-sm font-medium text-foreground mb-1.5 tracking-wide">
                  {p.title}
                </p>
                <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SlotWhatMatters;
