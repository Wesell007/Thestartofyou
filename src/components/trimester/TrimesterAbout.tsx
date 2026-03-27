import type { TrimesterData } from "@/data/trimesterData";
import trimesterFirstImg from "@/assets/trimester-first.jpg";
import trimesterSecondImg from "@/assets/trimester-second.jpg";
import trimesterThirdImg from "@/assets/trimester-third.jpg";

const trimesterImages: Record<number, string> = {
  1: trimesterFirstImg,
  2: trimesterSecondImg,
  3: trimesterThirdImg,
};

const trimesterCaptions: Record<number, string> = {
  1: "The quiet beginning — a time of invisible change",
  2: "Growing into visibility — connection deepens",
  3: "The final stretch — preparing to meet your baby",
};

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterAbout = ({ data, bg = "bg-parchment" }: Props) => {
  const image = trimesterImages[data.number];
  const caption = trimesterCaptions[data.number];

  return (
    <section className={`${bg} py-24 md:py-32`}>
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Feature image */}
        <div className="mb-14 rounded-2xl overflow-hidden border border-border/40 shadow-card-brand">
          <img
            src={image}
            alt={caption}
            loading="lazy"
            width={1024}
            height={640}
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
          <p className="px-6 py-3 bg-card font-serif italic text-sm text-muted-foreground">
            — {caption}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* Left — title */}
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              This Stage
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
              {data.about.title}
            </h2>
          </div>

          {/* Right — paragraphs */}
          <div className="space-y-5">
            {data.about.paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-sans text-sm font-light text-muted-foreground leading-relaxed"
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
