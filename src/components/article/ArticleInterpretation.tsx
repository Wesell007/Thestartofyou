import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleInterpretation = ({ data }: Props) => {
  if (!data.whatThisMeans) return null;

  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="bg-sage-bg/30 border border-sage-light/30 rounded-2xl px-8 py-10 md:px-12 md:py-12 relative overflow-hidden">
          {/* Decorative corner glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-sage/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-8 bg-sage/40" />
              <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage">
                What this means
              </p>
            </div>
            <p className="font-serif text-lg md:text-xl text-foreground leading-[1.7] italic">
              {data.whatThisMeans}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleInterpretation;
