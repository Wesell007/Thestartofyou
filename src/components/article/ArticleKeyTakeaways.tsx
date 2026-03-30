import type { ArticleData } from "@/data/articleData";
import { CheckCircle } from "lucide-react";

interface Props {
  data: ArticleData;
}

const ArticleKeyTakeaways = ({ data }: Props) => {
  if (!data.keyTakeaways || data.keyTakeaways.length === 0) return null;

  return (
    <section className="bg-sage-bg/30 py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="bg-white/70 backdrop-blur-sm border border-sage/10 rounded-2xl px-7 py-8 md:px-10 md:py-10">
          <h2 className="font-serif text-xl text-foreground mb-6">Key takeaways</h2>
          <ul className="space-y-4">
            {data.keyTakeaways.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4.5 h-4.5 text-sage shrink-0 mt-0.5" />
                <span className="font-sans text-sm font-light text-foreground/85 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ArticleKeyTakeaways;
