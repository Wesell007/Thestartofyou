import type { ArticleData } from "@/data/articleData";
import { CheckCircle } from "lucide-react";

interface Props {
  data: ArticleData;
}

const ArticleKeyTakeaways = ({ data }: Props) => {
  if (!data.keyTakeaways || data.keyTakeaways.length === 0) return null;

  const isDeep = data.isCornerstone;

  return (
    <section className="bg-parchment py-10 sm:py-14 md:py-16">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="bg-sage/[0.04] border border-sage/10 rounded-xl px-5 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8">
          <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
            <div className="w-6 h-6 rounded-full bg-sage/10 flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-sage" />
            </div>
            <h2 className="font-serif text-base sm:text-lg text-foreground">Key takeaways</h2>
          </div>

          <ul className="space-y-2.5 sm:space-y-3">
            {data.keyTakeaways.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1 h-1 rounded-full bg-sage/40 shrink-0 mt-2" />
                <span className="font-sans text-[13px] sm:text-[14px] font-light text-foreground/80 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {isDeep && (
            <div className="mt-4 pt-3.5 border-t border-sage/8">
              <p className="font-sans text-[11px] font-light text-muted-foreground/50">
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
