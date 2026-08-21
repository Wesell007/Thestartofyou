import { SmallSprig } from "./PregnancyDecor";

interface Props {
  bodyText: string;
}

const SectionBodyThisWeek = ({ bodyText }: Props) => {
  return (
    <section className="relative pt-4 pb-12">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block w-5 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          Your body this week
        </p>
      </div>

      <div className="pregnancy-paper relative overflow-hidden rounded-[22px] px-6 sm:px-8 py-7 sm:py-8">
        <SmallSprig className="-right-3 -bottom-4 w-[92px] rotate-12" opacity={0.32} />
        <p className="relative font-serif text-[1.05rem] sm:text-[1.12rem] text-[hsl(var(--stage-pregnancy-text))] leading-[1.75] max-w-[52ch]">
          {bodyText}
        </p>
      </div>
    </section>
  );
};

export default SectionBodyThisWeek;
