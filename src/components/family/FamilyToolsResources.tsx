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
      id="family-start-here"
      className="py-16 md:py-20"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-family) / 0.45) 100%)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="grid gap-5 border-b pb-8 mb-9 md:grid-cols-[1fr_auto] md:items-end md:pb-10 md:mb-12" style={{ borderColor: "hsl(var(--stage-family-accent) / 0.2)" }}>
          <div>
          <span
            className="mx-auto block h-px w-10 mb-6"
            style={{ backgroundColor: accentMid }}
          />
          <p
            className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3"
            style={{ color: accent }}
          >
            Editorial start here
          </p>
          <h2
            className="font-serif text-[2rem] md:text-[2.4rem] mb-4 leading-tight"
            style={{ color: deep }}
          >
            A few thoughtful places to begin
          </h2>
          <p
            className="font-sans text-[15px] font-light max-w-xl mx-auto leading-relaxed"
            style={{ color: deepSoft }}
          >
            Four grounded guides for the questions that often bring families here first.
          </p>
          </div>
          <p className="font-serif italic text-[15px] leading-relaxed md:max-w-[18rem] md:text-right" style={{ color: deepSoft }}>
            Real guidance before browsing the wider collection.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 md:gap-7">
          {featured.map((article, index) => (
            <div key={article.slug} className={index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-6"}>
              <FamilyArticleImageCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FamilyToolsResources;
