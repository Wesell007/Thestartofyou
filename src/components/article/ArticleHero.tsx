import { Link } from "react-router-dom";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleHero = ({ data }: Props) => {
  return (
    <section className="bg-parchment pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10 font-sans text-xs font-light text-muted-foreground tracking-wide flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/explore" className="hover:text-foreground transition-colors">Explore</Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">Guidance</span>
        </nav>

        {/* Stage label */}
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          {data.trimester?.map(t => `Trimester ${t}`).join(' · ')} · Guidance
        </p>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-6">
          {data.title}
        </h1>

        {/* Week chips */}
        {data.relatedWeeks && data.relatedWeeks.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.relatedWeeks.slice(0, 5).map((week) => (
              <Link
                key={week}
                to={`/pregnancy/week/${week}`}
                className="font-sans text-xs font-light text-sage-muted border border-sage-light/60 rounded-full px-3 py-1 hover:border-sage hover:text-sage transition-colors"
              >
                Week {week}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleHero;
