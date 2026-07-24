import { format, differenceInCalendarDays } from "date-fns";

interface Props {
  firstName?: string;
  currentWeek: number;
  due: Date;
}

const trimesterOf = (w: number) => (w <= 13 ? "First trimester" : w <= 27 ? "Second trimester" : "Third trimester");

const JourneyHero = ({ firstName, currentWeek, due }: Props) => {
  const accent = "hsl(var(--stage-pregnancy-accent))";
  const daysToGo = Math.max(differenceInCalendarDays(due, new Date()), 0);
  const weeksToGo = Math.max(Math.round(daysToGo / 7), 0);
  const greeting = firstName ? `${firstName}, your journey so far` : "Your journey so far";

  return (
    <header className="mb-10 sm:mb-12">
      <p
        className="font-sans text-[10.5px] font-medium tracking-[0.32em] uppercase mb-5"
        style={{ color: accent }}
      >
        Your saved journey
      </p>
      <h1
        className="font-serif font-medium text-foreground leading-[0.98] tracking-tight mb-5"
        style={{ fontSize: "clamp(2.4rem, 5.4vw, 3.6rem)" }}
      >
        {greeting}
      </h1>
      <p className="font-serif text-foreground/80 text-[1.12rem] sm:text-[1.2rem] leading-[1.55] max-w-[46ch] mb-7">
        Your pregnancy story, taking shape one week at a time.
      </p>
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 max-w-[560px]">
        {[
          { label: "Week", value: `${currentWeek}` },
          { label: "Trimester", value: trimesterOf(currentWeek) },
          { label: "Due", value: format(due, "d MMM yyyy") },
          { label: "Weeks to go", value: weeksToGo > 0 ? `${weeksToGo}` : "Any day" },
        ].map((item) => (
          <div key={item.label}>
            <dt
              className="font-sans text-[9.5px] font-medium tracking-[0.24em] uppercase mb-1.5"
              style={{ color: accent }}
            >
              {item.label}
            </dt>
            <dd className="font-serif text-foreground text-[15px] sm:text-[15.5px] leading-[1.35]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
};

export default JourneyHero;
