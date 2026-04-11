import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterEmotional = ({ data, bg = "bg-parchment-dark" }: Props) => {
  const { emotional } = data;

  return (
    <section className={`${bg} section-spacing`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
        {/* Decorative line */}
        <div className="flanking-lines mb-8">
          <span className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-sage">
            {emotional.title}
          </span>
        </div>

        <p className="font-sans text-base sm:text-[17px] font-light text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
          {emotional.body}
        </p>

        <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground italic leading-snug">
          "{emotional.quote}"
        </blockquote>
      </div>
    </section>
  );
};

export default TrimesterEmotional;
