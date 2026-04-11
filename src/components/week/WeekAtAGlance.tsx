import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
}

const WeekAtAGlance = ({ data }: Props) => {
  return (
    <section className="bg-sage-bg/30 py-12 md:py-16">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="bg-card border border-border/40 rounded-xl px-6 py-7 sm:px-8 sm:py-8 md:px-10 md:py-9 shadow-card-brand">
          <p className="stage-label mb-4">
            At a glance
          </p>
          <p className="font-sans text-base sm:text-[17px] font-light text-foreground leading-[1.75]">
            {data.atAGlance}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WeekAtAGlance;
