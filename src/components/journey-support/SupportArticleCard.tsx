import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { SupportArticle } from "@/data/journeySupportArticles";

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";

const SupportArticleCard = ({ article }: { article: SupportArticle }) => {
  return (
    <Link
      to={article.href}
      className="group block h-full transition-shadow hover:shadow-[0_18px_44px_-24px_hsl(var(--stage-pregnancy-accent)/0.24)]"
    >
      <article
        className="h-full rounded-[20px] keepsake-surface px-5 py-6 flex flex-col"
        style={{ borderColor: softBorder }}
      >
        <h3 className="font-serif text-[1.05rem] sm:text-[1.1rem] text-foreground/88 leading-[1.3] mb-2">
          {article.title}
        </h3>
        <p className="font-sans text-[13px] font-light text-foreground/65 leading-[1.65] flex-1">
          {article.caption}
        </p>
        <span
          className="mt-5 inline-flex items-center gap-1.5 font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase"
          style={{ color: accent }}
        >
          Open
          <ArrowRight
            size={11}
            strokeWidth={1.6}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </article>
    </Link>
  );
};

export default SupportArticleCard;
