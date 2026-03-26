import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
}

const WeekGentleReminder = ({ data }: Props) => {
  return (
    <section className="bg-lavender-section py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-lavender-foreground/60 mb-6">
          A gentle reminder
        </p>
        <p className="font-serif text-xl sm:text-2xl text-lavender-foreground leading-relaxed">
          {data.gentleReminder}
        </p>
      </div>
    </section>
  );
};

export default WeekGentleReminder;
