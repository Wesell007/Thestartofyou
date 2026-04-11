import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterFocus = ({ data, bg = "bg-parchment" }: Props) => {
  return (
    <section className={`${bg} section-spacing`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
          {/* Left */}
          <div>
            <p className="stage-label mb-4">
              Right Now
            </p>
            <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.25rem] text-foreground leading-tight">
              What to focus on during this stage
            </h2>
          </div>

          {/* Right, list */}
          <div className="space-y-4">
            {data.focus.map((item, i) => (
              <div key={i} className="flex items-start gap-3.5">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                <p className="font-serif italic text-lg text-foreground leading-snug">
                  {item}
                </p>
              </div>
            ))}

            <p className="font-sans text-[15px] font-light text-sage pt-3">
              {data.focusClosing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrimesterFocus;
