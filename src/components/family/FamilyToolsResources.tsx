import { familyArticles } from "@/data/familyArticleData";
import FamilyArticleImageCard from "@/components/family/article/FamilyArticleImageCard";

const accent = "hsl(var(--stage-family-accent))";
const accentMid = "hsl(var(--stage-family-accent) / 0.5)";
const deep = "hsl(var(--stage-family-deep))";
const deepSoft = "hsl(var(--stage-family-deep) / 0.72)";

const FEATURED_SLUGS = [
  "preparing-for-another-baby",
  "helping-your-child-adjust-to-a-new-sibling",
  "staying-connected-as-parents",
  "building-family-routines",
];

const FamilyToolsResources = () => {
  const featured = FEATURED_SLUGS.map((slug) =>
    familyArticles.find((a) => a.slug === slug && a.status === "ready"),
  ).filter((a): a is (typeof familyArticles)[number] => !!a);

  if (featured.length === 0) return null;

  return (
    <section
      className="py-24 md:py-28"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-family) / 0.45) 100%)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="text-center mb-14 md:mb-16">
          <span
            className="mx-auto block h-px w-10 mb-6"
            style={{ backgroundColor: accentMid }}
          />
          <p
            className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3"
            style={{ color: accent }}
          >
            Featured guidance
          </p>
          <h2
            className="font-serif text-[2rem] md:text-[2.4rem] mb-4 leading-tight"
            style={{ color: deep }}
          >
            Helpful places to begin
          </h2>
          <p
            className="font-sans text-[15px] font-light max-w-xl mx-auto leading-relaxed"
            style={{ color: deepSoft }}
          >
            Start with the family guidance parents often need first.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-7">
          {featured.map((article) => (
            <FamilyArticleImageCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FamilyToolsResources;
