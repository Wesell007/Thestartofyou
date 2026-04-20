import type { MyWeekEntry } from "@/data/myWeekContent";

interface Props {
  content: MyWeekEntry;
  nextWeek: number | null;
}

const SlotWhatsNext = ({ content, nextWeek }: Props) => {
  if (!nextWeek) return null;

  return (
    <section className="py-14 sm:py-18 md:py-24 border-t border-border/30">
      <p
        className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-6 sm:mb-7"
        style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
      >
        What's next
      </p>

      <h2 className="font-serif text-[1.4rem] sm:text-[1.6rem] md:text-[1.8rem] text-foreground leading-snug mb-5 max-w-[28ch]">
        Looking toward week {nextWeek}
      </h2>

      <p className="font-sans text-[15.5px] sm:text-[16px] font-light text-foreground/70 leading-[1.7] max-w-[52ch]">
        {content.nextPreview}
      </p>
    </section>
  );
};

export default SlotWhatsNext;
