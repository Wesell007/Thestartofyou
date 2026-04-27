import type { TrimesterData } from "@/data/trimesterData";
import botanicalSprig from "@/assets/botanical-branch-bl.png";

interface Props {
  data: TrimesterData;
  bg?: string;
  /** When true, hides the inline feature image (use when a hero-image block already sits above). */
  hideImage?: boolean;
}

const TrimesterAbout = ({ data, bg = "bg-parchment", hideImage = false }: Props) => {
  return (
    <section className={`${bg} section-spacing`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
          {/* Left, title with botanical sprig */}
          <div className="relative">
            <p className="stage-label mb-4">
              This Stage
            </p>
            <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.25rem] text-foreground leading-tight">
              {data.about.title}
            </h2>
            <img
              src={botanicalSprig}
              alt=""
              aria-hidden="true"
              className="hidden md:block absolute -right-4 top-2 w-16 opacity-25 pointer-events-none select-none"
            />
          </div>

          {/* Right, paragraphs */}
          <div className="space-y-4">
            {data.about.paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-sans text-[15px] font-light text-muted-foreground leading-[1.75]"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrimesterAbout;
