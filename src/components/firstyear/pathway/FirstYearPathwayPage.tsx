import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import AskAboutThis from "@/components/companion/AskAboutThis";
import FirstYearArticleCard from "@/components/firstyear/article/FirstYearArticleCard";
import FYMonthMap from "@/components/firstyear/new/FYMonthMap";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import SeoHead from "@/components/seo/SeoHead";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { phaseData, phaseOrder } from "@/data/firstYearPhaseData";
import {
  firstYearPathways,
  getPathwayGroupedArticles,
  getPathwayStartHere,
  type FirstYearPathway,
} from "@/data/firstYearPathwayData";
import { FIRST_YEAR_TOPIC_INDEX } from "@/data/firstYearTopicData";
import { FIRST_YEAR_CRUMB, HOME_CRUMB } from "@/lib/seo/journeyCrumbs";

type Props = { pathway: FirstYearPathway };

const phaseImages = import.meta.glob("@/assets/firstyear-stage-*.jpg", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

const resolvePhaseImage = (filename?: string) =>
  filename ? Object.entries(phaseImages).find(([key]) => key.endsWith(`/${filename}`))?.[1] : undefined;

const FirstYearPathwayPage = ({ pathway }: Props) => {
  const config = firstYearPathways[pathway];
  const startHere = getPathwayStartHere(config);
  const grouped = getPathwayGroupedArticles(config);
  const tone = config.side === "baby" ? "baby" : "recovery";
  const accent = config.side === "baby" ? "--stage-firstyear" : "--stage-recovery";
  const canonical = `https://thestartofyou.com/first-year/${config.slug}`;
  const breadcrumbs = [
    HOME_CRUMB,
    FIRST_YEAR_CRUMB,
    { label: config.eyebrow, href: `/first-year/${config.slug}` },
  ];

  return (
    <div className="min-h-screen bg-parchment font-sans" data-first-year-pathway={pathway}>
      <SeoHead
        title={`${config.title} | The Start of You`}
        description={config.intro}
        canonical={canonical}
      />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Navbar />
      <main>
        <section className="bg-parchment pb-14 pt-28 md:pb-20 md:pt-32">
          <div className="container mx-auto max-w-6xl px-5 sm:px-8 md:px-10">
            <Breadcrumbs items={breadcrumbs} tone="section" className="mb-8" />
            <div className="grid items-center gap-9 md:grid-cols-[0.92fr_1.08fr] md:gap-14">
              <div>
                <p className="mb-5 font-sans text-[11px] font-light uppercase tracking-[0.24em] text-foreground/60">{config.eyebrow}</p>
                <h1 className="mb-5 max-w-xl font-serif text-4xl leading-[1.06] text-foreground sm:text-5xl">{config.title}</h1>
                <p className="max-w-xl font-sans text-[16px] font-light leading-relaxed text-muted-foreground">{config.intro}</p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <img src={config.heroImage} alt={config.heroAlt} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/50 bg-card py-14 md:py-18" aria-labelledby={`${pathway}-topics`}>
          <div className="container mx-auto max-w-5xl px-5 sm:px-8 md:px-10">
            <p className="mb-3 font-sans text-[11px] font-light uppercase tracking-[0.24em] text-foreground/60">Explore by topic</p>
            <h2 id={`${pathway}-topics`} className="mb-8 font-serif text-3xl text-foreground">Four places to begin.</h2>
            <div className="grid gap-x-8 border-t border-border/60 sm:grid-cols-2">
              {config.topics.map((topic) => (
                <Link key={topic} to={`/first-year/${topic}`} className="group flex min-h-24 items-center justify-between gap-5 border-b border-border/60 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <div>
                    <h3 className="font-serif text-xl text-foreground">{FIRST_YEAR_TOPIC_INDEX[topic].short}</h3>
                    <p className="mt-1 font-sans text-[13px] font-light text-muted-foreground">{FIRST_YEAR_TOPIC_INDEX[topic].title}</p>
                  </div>
                  <ArrowUpRight className="shrink-0 text-foreground/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={17} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-parchment py-14 md:py-20" aria-labelledby={`${pathway}-phases`}>
          <div className="container mx-auto max-w-6xl px-5 sm:px-8 md:px-10">
            <p className="mb-3 font-sans text-[11px] font-light uppercase tracking-[0.24em] text-foreground/60">Across the year</p>
            <h2 id={`${pathway}-phases`} className="mb-8 font-serif text-3xl text-foreground">Four phases, one changing year.</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {phaseOrder.map((slug, index) => {
                const phase = phaseData[slug];
                const image = resolvePhaseImage(phase.heroImage);
                return (
                  <Link key={slug} to={`/first-year/${slug}`} className="group overflow-hidden rounded-lg border border-border/60 bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {image && <img src={image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />}
                    <div className="p-5">
                      <p className="mb-2 text-[10px] font-light uppercase tracking-[0.2em] text-muted-foreground">Phase {index + 1}</p>
                      <h3 className="font-serif text-xl text-foreground">{phase.ageRange}</h3>
                      <p className="mt-2 text-[13px] font-light leading-relaxed text-muted-foreground">
                        {config.side === "baby" ? phase.babyChanges[0]?.body : phase.parentRecovery[0]?.body}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {pathway === "baby" && <FYMonthMap />}

        <section className="bg-parchment py-14 md:py-20" data-primary-editorial-discovery>
          <div className="container mx-auto max-w-6xl px-5 sm:px-8 md:px-10">
            <p className="mb-3 font-sans text-[11px] font-light uppercase tracking-[0.24em] text-foreground/60">Start here</p>
            <h2 className="mb-8 font-serif text-3xl text-foreground">A calm starting point for each topic.</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {startHere.map((article) => <FirstYearArticleCard key={article.slug} article={article} tone={tone} />)}
            </div>
          </div>
        </section>

        <section className="bg-card py-14 md:py-20" aria-labelledby={`${pathway}-library`}>
          <div className="container mx-auto max-w-6xl px-5 sm:px-8 md:px-10">
            <p className="mb-3 font-sans text-[11px] font-light uppercase tracking-[0.24em] text-foreground/60">Complete guidance</p>
            <h2 id={`${pathway}-library`} className="mb-10 font-serif text-3xl text-foreground">Browse by topic.</h2>
            <div className="space-y-14">
              {grouped.map((group) => group.articles.length > 0 && (
                <section key={group.topic} aria-labelledby={`${pathway}-${group.topic}`}>
                  <div className="mb-5 flex items-end justify-between gap-4 border-b border-border/60 pb-4">
                    <h3 id={`${pathway}-${group.topic}`} className="font-serif text-2xl text-foreground">{group.title}</h3>
                    <Link to={`/first-year/${group.topic}`} className="text-[12px] font-medium text-foreground/70 hover:text-foreground">Open topic</Link>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {group.articles.map((article) => <FirstYearArticleCard key={article.slug} article={article} tone={tone} />)}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        {pathway === "postpartum" && (
          <section className="bg-parchment py-14" aria-labelledby="postpartum-support">
            <div className="container mx-auto max-w-4xl px-5 sm:px-8 md:px-10">
              <p className="mb-3 text-[11px] font-light uppercase tracking-[0.24em] text-foreground/60">Support and warning signs</p>
              <h2 id="postpartum-support" className="mb-6 font-serif text-3xl text-foreground">Know where to turn.</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link to="/first-year/checkups-and-warning-signs/postnatal-checks-and-appointments" className="min-h-16 border-y border-border/60 py-4 font-serif text-lg text-foreground">Postnatal checks and appointments</Link>
                <Link to="/first-year/checkups-and-warning-signs/when-to-ask-for-help-after-birth" className="min-h-16 border-y border-border/60 py-4 font-serif text-lg text-foreground">When to ask for help after birth</Link>
              </div>
            </div>
          </section>
        )}

        <section className="bg-parchment py-14 md:py-18" data-pathway-companion={pathway}>
          <div className="container mx-auto max-w-4xl px-5 sm:px-8 md:px-10">
            <div className="border-y border-border/60 py-9">
              <p className="mb-3 text-[11px] font-light uppercase tracking-[0.24em] text-foreground/60">Your Companion</p>
              <h2 className="mb-4 font-serif text-2xl text-foreground">{config.companionTitle}</h2>
              <AskAboutThis
                label={config.companionTitle}
                entry={{ stage: "first-year", journey: "first_year", topic: config.slug, title: config.title }}
                suggestions={config.companionSuggestions}
              />
            </div>
          </div>
        </section>

        <section className="bg-card py-14 md:py-18">
          <div className="container mx-auto max-w-4xl px-5 sm:px-8 md:px-10">
            <p className="mb-3 text-[11px] font-light uppercase tracking-[0.24em]" style={{ color: `hsl(var(${accent}-deep))` }}>{config.crossLink.eyebrow}</p>
            <h2 className="font-serif text-3xl text-foreground">{config.crossLink.title}</h2>
            <p className="mb-6 mt-3 text-[15px] font-light text-muted-foreground">{config.crossLink.body}</p>
            <div className="flex flex-wrap gap-3">
              <Link to={config.crossLink.href} className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2 text-[13px] font-medium" style={{ backgroundColor: `hsl(var(${accent}-deep))`, color: "hsl(var(--card))" }}>{config.crossLink.label}<ArrowUpRight size={14} /></Link>
              <Link to="/first-year" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 py-2 text-[13px] font-medium text-foreground"><ArrowLeft size={14} />Return to First Year</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FirstYearPathwayPage;