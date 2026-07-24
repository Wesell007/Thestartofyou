import MomentCard from "./MomentCard";

interface Props {
  weeks: number[];
  reflectionByWeek: Record<number, { content: string }>;
}

const ReflectionHighlights = ({ weeks, reflectionByWeek }: Props) => {
  if (weeks.length < 2) return null;
  const accent = "hsl(var(--stage-pregnancy-accent))";
  const items = weeks.slice(0, 3);

  return (
    <section className="mb-12 sm:mb-14">
      <div className="mb-5">
        <h2
          className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-2"
          style={{ color: accent }}
        >
          Reflection highlights
        </h2>
        <p className="font-serif text-foreground/75 text-[14.5px] leading-[1.55]">
          A few of the things you've held onto.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((w) => (
          <MomentCard key={w} week={w} reflection={reflectionByWeek[w].content} />
        ))}
      </div>
    </section>
  );
};

export default ReflectionHighlights;
