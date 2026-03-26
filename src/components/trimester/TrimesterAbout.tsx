import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterAbout = ({ data, bg = "bg-parchment" }: Props) => {
  return (
    <section className={`${bg} py-24 md:py-32`}>
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
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
