import type { ArticleData } from "@/data/articleData";
import { CheckCircle } from "lucide-react";

interface Props {
  data: ArticleData;
}

const ArticleKeyTakeaways = ({ data }: Props) => {
  if (!data.keyTakeaways || data.keyTakeaways.length === 0) return null;

  const isDeep = data.isCornerstone;

  return (
    <section className={`py-16 md:py-20 ${isDeep ? 'bg-sage/[0.04]' : 'bg-sage-bg/30'}`}>
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className={`rounded-2xl px-7 py-8 md:px-10 md:py-10 ${
          isDeep
            ? 'bg-card border border-sage/10 shadow-soft'
            : 'bg-white/70 backdrop-blur-sm border border-sage/10'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-sage" />
            </div>
            <h2 className="font-serif text-xl text-foreground">Key takeaways</h2>
          </div>

          <ul className={`space-y-4 ${isDeep ? 'ml-11' : ''}`}>
            {data.keyTakeaways.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-sage/40 shrink-0 mt-2" />
                <span className="font-sans text-sm font-light text-foreground/85 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Reading time estimate for deep articles */}
          {isDeep && (
            <div className="mt-6 pt-5 border-t border-sage/8">
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
