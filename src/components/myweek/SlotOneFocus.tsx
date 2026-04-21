import type { MyWeekEntry } from "@/data/myWeekContent";

interface Props {
  content: MyWeekEntry;
}

/**
 * Right-rail slot — One focus this week.
 *
 * Tightened to live as the opening note of the right ritual rail.
 * No heavy top border (the rail surface holds the section), reduced
 * vertical rhythm, and a quieter wash that sits under the rail.
 */
const SlotOneFocus = ({ content }: Props) => {
  return (
    <section className="relative pt-2 pb-2">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block w-5 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] font-light tracking-[0.24em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          One focus this week
        </p>
      </div>

      <h2 className="font-serif text-[1.5rem] sm:text-[1.7rem] text-foreground leading-[1.18] mb-5 max-w-[22ch]">
        {content.focus.headline}
      </h2>

      <div className="relative pl-5">
        <span
          aria-hidden="true"
          className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--stage-pregnancy-accent) / 0.55), hsl(var(--stage-pregnancy-accent) / 0.05))",
          }}
        />
        <p className="font-sans text-[14.5px] sm:text-[15px] font-light text-foreground/72 leading-[1.75] max-w-[44ch]">
          {content.focus.body}
        </p>
      </div>
    </section>
  );
};

export default SlotOneFocus;
