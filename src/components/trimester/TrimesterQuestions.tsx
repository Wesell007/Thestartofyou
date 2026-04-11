import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterQuestions = ({ data, bg = "bg-parchment" }: Props) => {
  return (
    <section className={`${bg} section-spacing`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <p className="stage-label mb-3">
            Guidance
          </p>
          <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.25rem] text-foreground leading-tight max-w-lg">
            Common questions in the {data.shortLabel.toLowerCase()} trimester
          </h2>
        </div>

        {/* Questions list */}
        <div className="divide-y divide-border/40">
          {data.questions.map((item, i) => (
            <div
              key={i}
              className="group flex items-center justify-between py-5 cursor-pointer hover:pl-1.5 transition-all"
            >
              <div className="flex flex-col gap-0.5">
                <p className="font-serif text-lg sm:text-xl text-foreground leading-snug group-hover:text-sage transition-colors">
                  {item.q}
                </p>
                <p className="font-sans text-[15px] font-light text-muted-foreground">
                  {item.sub}
                </p>
              </div>
              <span className="text-muted-foreground/30 group-hover:text-sage transition-colors ml-6 shrink-0 font-serif text-xl leading-none">
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrimesterQuestions;
