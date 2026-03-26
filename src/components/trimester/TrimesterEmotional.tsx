import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterEmotional = ({ data, bg = "bg-parchment-dark" }: Props) => {
  const { emotional } = data;

  return (
    <section className={`${bg} py-24 md:py-32`}>
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
        {/* Decorative line */}
        <div className="flex items-center gap-5 mb-10 justify-center">
          <div className="h-px w-16 bg-sage-light" />
          <span className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted">
            {emotional.title}
          </span>
          <div className="h-px w-16 bg-sage-light" />
        </div>

        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
          {emotional.body}
        </p>

        <blockquote className="font-serif text-2xl sm:text-3xl text-foreground italic leading-snug">
          "{emotional.quote}"
        </blockquote>
      </div>
    </section>
  );
};

export default TrimesterEmotional;
