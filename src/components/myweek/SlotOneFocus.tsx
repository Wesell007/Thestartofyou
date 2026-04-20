import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
}

const SlotOneFocus = ({ data }: Props) => {
  const focus = data.focusPoints[0];

  return (
    <section className="py-12 sm:py-16 md:py-20 border-t border-border/40">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
        <p
          className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-6 sm:mb-7"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          One focus
        </p>

        <h2 className="font-serif text-[1.65rem] sm:text-[1.9rem] md:text-[2.15rem] text-foreground leading-[1.15] mb-5 sm:mb-6 max-w-xl">
          {focus.action}
        </h2>

        <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed max-w-lg">
          {focus.reason}
        </p>
      </div>
    </section>
  );
};

export default SlotOneFocus;
