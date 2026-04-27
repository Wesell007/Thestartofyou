import type { TrimesterData } from "@/data/trimesterData";
import trimesterFirstImg from "@/assets/trimester-first.jpg";
import trimesterSecondImg from "@/assets/trimester-second.jpg";
import trimesterThirdImg from "@/assets/trimester-third.jpg";
import botanicalSprig from "@/assets/botanical-branch-bl.png";

const trimesterImages: Record<number, string> = {
  1: trimesterFirstImg,
  2: trimesterSecondImg,
  3: trimesterThirdImg,
};

const trimesterCaptions: Record<number, string> = {
  1: "The quiet beginning, a time of invisible change",
  2: "Growing into visibility, connection deepens",
  3: "The final stretch, preparing to meet your baby",
};

interface Props {
  data: TrimesterData;
  bg?: string;
  /**
   * When true, hides the inline feature image — used by First Trimester,
   * which now has a dedicated `TrimesterHeroImage` block above this section.
   */
  hideImage?: boolean;
}

const TrimesterAbout = ({ data, bg = "bg-parchment", hideImage = false }: Props) => {
  const image = trimesterImages[data.number];
  const caption = trimesterCaptions[data.number];

  return (
    <section className={`${bg} section-spacing`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        {!hideImage && (
          <div className="mb-10 md:mb-12 rounded-2xl overflow-hidden border border-border/30 shadow-card-brand">
            <img
              src={image}
              alt={caption}
              loading="lazy"
              width={1024}
              height={640}
              className="w-full h-56 sm:h-72 md:h-80 object-cover"
            />
            <p className="px-5 py-3 bg-card font-serif italic text-sm text-muted-foreground">
              {caption}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
          {/* Left, title with subtle botanical sprig */}
          <div className="relative">
            <p className="stage-label mb-4">This Stage</p>
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
