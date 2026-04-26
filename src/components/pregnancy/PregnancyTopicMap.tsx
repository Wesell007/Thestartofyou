import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";

interface ArticleLink {
  label: string;
  href: string;
}

interface Topic {
  id: string;
  label: string;
  supportLine: string;
  mainHref: string;
  mainLabel: string;
  articles: ArticleLink[];
}

const topics: Topic[] = [
  {
    id: "body",
    label: "Your body",
    supportLine: "Symptoms and changes, week by week.",
    mainHref: "/pregnancy/body",
    mainLabel: "Explore body & symptoms",
    articles: [
      { label: "Early pregnancy symptoms explained", href: "/articles/early-pregnancy-symptoms-explained" },
      { label: "Complete guide to morning sickness", href: "/articles/complete-guide-morning-sickness" },
      { label: "Nausea in early pregnancy", href: "/articles/nausea-in-early-pregnancy" },
      { label: "Fatigue in early pregnancy", href: "/articles/fatigue-in-early-pregnancy" },
    ],
  },
  {
    id: "baby",
    label: "Your baby",
    supportLine: "How your baby grows, trimester by trimester.",
    mainHref: "/pregnancy/baby",
    mainLabel: "Explore baby development",
    articles: [
      { label: "Week by week", href: "#week-by-week" },
      { label: "First trimester: complete guide", href: "/articles/first-trimester-complete-guide" },
      { label: "Second trimester: complete guide", href: "/articles/second-trimester-complete-guide" },
      { label: "Third trimester: complete guide", href: "/articles/third-trimester-complete-guide" },
    ],
  },
  {
    id: "feelings",
    label: "Your feelings",
    supportLine: "The emotional side of pregnancy, held with care.",
    mainHref: "/guidance?topic=emotional-wellbeing",
    mainLabel: "Explore emotional wellbeing",
    articles: [
      { label: "Emotional wellbeing in pregnancy", href: "/articles/emotional-wellbeing-pregnancy" },
      { label: "Perinatal anxiety", href: "/articles/perinatal-anxiety" },
      { label: "When pregnancy symptoms stop", href: "/articles/symptoms-stopping-early-pregnancy" },
    ],
  },
  {
    id: "health",
    label: "Health and safety",
    supportLine: "Reassurance for the questions that need a steady answer.",
    mainHref: "/guidance?topic=safety-and-support",
    mainLabel: "Explore health & safety",
    articles: [
      { label: "Implantation bleeding", href: "/articles/implantation-bleeding" },
      { label: "When to seek help", href: "/guidance?topic=safety-and-support" },
      { label: "Tests and scans", href: "/guidance?topic=safety-and-support" },
      { label: "Staying well in pregnancy", href: "/guidance?topic=safety-and-support" },
    ],
  },
  {
    id: "diet-exercise",
    label: "Diet and exercise",
    supportLine: "Gentle, everyday ways to look after yourself.",
    mainHref: "/guidance?topic=practical-preparation",
    mainLabel: "Explore diet & exercise",
    articles: [
      { label: "Eating well in pregnancy", href: "/guidance?topic=practical-preparation" },
      { label: "Movement and exercise", href: "/guidance?topic=practical-preparation" },
      { label: "Foods to be careful with", href: "/guidance?topic=practical-preparation" },
    ],
  },
  {
    id: "preparing",
    label: "Preparing for baby",
    supportLine: "Steady ways to get ready, when you feel ready.",
    mainHref: "/guidance?topic=practical-preparation",
    mainLabel: "Explore preparing for baby",
    articles: [
      { label: "Preparing for baby: complete guide", href: "/articles/preparing-for-baby-complete-guide" },
      { label: "Writing a birth plan", href: "/articles/writing-a-birth-plan" },
      { label: "Third trimester: complete guide", href: "/articles/third-trimester-complete-guide" },
      { label: "What to pack", href: "/guidance?topic=practical-preparation" },
      { label: "Setting up at home", href: "/guidance?topic=practical-preparation" },
    ],
  },
];

const PregnancyTopicMap = () => {
  return (
    <section className="py-20 md:py-28 bg-parchment-dark">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <p
            className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            The Pregnancy Map
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 leading-tight max-w-2xl mx-auto">
            What you might want to explore
          </h2>
          <p className="font-sans text-[15px] font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Six gentle ways into pregnancy guidance.
          </p>
        </div>

        {/* Topic grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((topic) => (
            <article
              key={topic.id}
              className="bg-card rounded-2xl border border-border/40 shadow-card-brand flex flex-col transition-colors duration-300 hover:border-border/70"
            >
              {/* Top accent bar */}
              <div
                className="h-0.5 rounded-t-2xl"
                style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.25)" }}
              />

              <div className="p-6 sm:p-7 flex flex-col gap-4 flex-1">
                {/* Label */}
                <p
                  className="font-sans text-[11px] font-light tracking-[0.18em] uppercase"
                  style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                >
                  {topic.label}
                </p>

                {/* Support line */}
                <p className="font-serif text-[15px] text-foreground/85 leading-relaxed">
                  {topic.supportLine}
                </p>

                {/* Article links */}
                <ul className="flex flex-col">
                  {topic.articles.map((article, i) => (
                    <li
                      key={article.href + i}
                      className="border-t"
                      style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.1)" }}
                    >
                      <Link
                        to={article.href}
                        className="group flex items-center justify-between gap-3 py-3 transition-colors hover:text-foreground"
                      >
                        <span className="font-sans text-[13px] font-light text-foreground/75 leading-snug group-hover:text-foreground transition-colors">
                          {article.label}
                        </span>
                        <ChevronRight
                          size={14}
                          className="shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Main explore link */}
                <div
                  className="pt-4 mt-auto border-t"
                  style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.15)" }}
                >
                  <Link
                    to={topic.mainHref}
                    className="group inline-flex items-center gap-1.5 font-sans text-[12px] font-medium tracking-wide transition-all"
                    style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                  >
                    {topic.mainLabel}
                    <ArrowRight
                      size={13}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Quiet footer link */}
        <div className="mt-12 text-center">
          <Link
            to="/guidance"
            className="font-sans text-sm font-light text-sage-muted hover:text-sage transition-colors underline underline-offset-4"
          >
            Browse all guidance →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PregnancyTopicMap;
