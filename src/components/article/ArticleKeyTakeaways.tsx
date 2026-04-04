import type { ArticleData } from "@/data/articleData";
import { CheckCircle } from "lucide-react";

interface Props {
  data: ArticleData;
}

const ArticleKeyTakeaways = ({ data }: Props) => {
  if (!data.keyTakeaways || data.keyTakeaways.length === 0) return null;

  const isDeep = data.isCornerstone;

  return (
    <section className={`py-10 sm:py-14 md:py-20 ${isDeep ? 'bg-sage/[0.04]' : 'bg-sage-bg/30'}`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className={`rounded-xl sm:rounded-2xl px-5 py-6 sm:px-7 sm:py-8 md:px-10 md:py-10 ${
          isDeep
            ? 'bg-card border border-sage/10 shadow-soft'
            : 'bg-white/70 backdrop-blur-sm border border-sage/10'
        }`}>
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-sage/10 flex items-center justify-center">
              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sage" />
            </div>
            <h2 className="font-serif text-lg sm:text-xl text-foreground">Key takeaways</h2>
          </div>

          <ul className={`space-y-3 sm:space-y-4 ${isDeep ? 'sm:ml-11' : ''}`}>
            {data.keyTakeaways.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-sage/40 shrink-0 mt-2" />
                <span className="font-sans text-[13px] sm:text-sm font-light text-foreground/85 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Reading time estimate for deep articles */}
          {isDeep && (
            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-sage/8">
              <p className="font-sans text-[11px] font-light text-muted-foreground/60">
                Comprehensive guide · 8-12 minute read
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArticleKeyTakeaways;
