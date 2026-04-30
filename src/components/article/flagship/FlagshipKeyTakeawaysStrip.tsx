import { Sparkles } from "lucide-react";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

// Slim horizontal icon-led strip of key takeaways. Cards, not a text list.
const FlagshipKeyTakeawaysStrip = ({ data }: Props) => {
  const items = data.keyTakeaways ?? [];
  if (items.length === 0) return null;

  return (
    <section className="bg-parchment-dark py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
            Key takeaways
          </p>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-snug mb-8 sm:mb-10 max-w-2xl">
          The essentials, at a glance
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {items.map((item, i) => (
            <li
              key={i}
              className="bg-card border border-border/40 rounded-2xl px-5 py-5 sm:px-6 sm:py-6 flex items-start gap-3.5"
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-sage-bg/40 flex items-center justify-center mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-sage/80" strokeWidth={1.5} />
              </span>
              <p className="font-sans text-[14px] sm:text-[14.5px] font-light text-foreground/85 leading-[1.7]">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FlagshipKeyTakeawaysStrip;
