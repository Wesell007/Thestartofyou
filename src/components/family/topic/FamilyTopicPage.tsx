import { ArrowRight, Check, ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HubAISupport from "@/components/shared/HubAISupport";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type FamilyTopicConfig, FAMILY_TOPIC_INDEX } from "@/data/familyTopicData";
import { getFamilyArticlesByTopic, type FamilyArticleTopic } from "@/data/familyArticleData";
import FamilyArticleImageCard from "@/components/family/article/FamilyArticleImageCard";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";

interface Props {
  config: FamilyTopicConfig;
}

const FamilyTopicPage = ({ config }: Props) => {
  const accent = "hsl(var(--stage-family-accent))";
  const accentSoft = "hsl(var(--stage-family-accent) / 0.1)";
  const accentBorder = "hsl(var(--stage-family-accent) / 0.28)";
  const deep = "hsl(var(--stage-family-deep))";
  const deepSoft = "hsl(var(--stage-family-deep) / 0.72)";

  const readyArticles = getFamilyArticlesByTopic(config.slug as FamilyArticleTopic).filter(
    (article) => article.status === "ready",
  );
  const readyBySlug = new Map(readyArticles.map((article) => [article.slug, article]));
  const startHere = (config.startHere ?? [])
    .map((slug) => readyBySlug.get(slug))
    .filter((article): article is (typeof readyArticles)[number] => Boolean(article));
  const startHereSlugs = new Set(startHere.map((article) => article.slug));
  const remainingGuidance = readyArticles.filter((article) => !startHereSlugs.has(article.slug));
  const related = config.related
    .filter((slug) => slug !== config.slug)
    .slice(0, 3)
    .map((slug) => ({ slug, ...FAMILY_TOPIC_INDEX[slug] }));

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Family", href: "/family" },
    { label: config.title, href: `/family/${config.slug}` },
  ];

  const SectionHeading = ({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) => (
    <div className="mb-9 border-b pb-7" style={{ borderColor: "hsl(var(--stage-family-accent) / 0.22)" }}>
      <p className="mb-3 font-sans text-[11px] font-light uppercase tracking-[0.3em]" style={{ color: accent }}>
        {eyebrow}
      </p>
      <h2 className="font-serif text-[1.9rem] leading-tight md:text-[2.25rem]" style={{ color: deep }}>
        {children}
      </h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-parchment font-sans">
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative pb-14 pt-8 sm:pt-12 md:pb-18 md:pt-16">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
            style={{ background: "linear-gradient(to bottom, hsl(var(--stage-family) / 0.62), transparent)" }}
            aria-hidden
          />
          <div className="container relative mx-auto max-w-6xl px-5 sm:px-8 md:px-10">
            <BreadcrumbJsonLd items={breadcrumbItems} />
            <Breadcrumbs
              tone="section"
              showHomeIcon
              className="mb-8 font-sans md:mb-10"
              colors={{ base: deepSoft, link: accent, current: deep }}
              items={breadcrumbItems}
            />

            <div className="grid items-end gap-8 border-b pb-10 md:grid-cols-12 md:gap-12 md:pb-14" style={{ borderColor: accentBorder }}>
              <div className="md:col-span-7">
                <p className="mb-5 font-sans text-[11px] font-light uppercase tracking-[0.3em]" style={{ color: accent }}>
                  Family area · {config.eyebrow}
                </p>
                <h1 className="font-serif text-[2.6rem] leading-[1.03] md:text-[4rem]" style={{ color: deep }}>
                  {config.title}
                </h1>
                <p className="mt-6 max-w-[38rem] font-sans text-[16px] font-light leading-[1.7]" style={{ color: deepSoft }}>
                  {config.standfirst}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#family-topic-start"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-[13px] font-medium"
                    style={{ borderColor: accentBorder, backgroundColor: accentSoft, color: deep }}
                  >
                    Start with guidance
                    <ArrowRight size={14} aria-hidden />
                  </a>
                  <Link
                    to="/family"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-[13px] font-medium"
                    style={{ borderColor: accentBorder, color: deep }}
                  >
                    <Home size={13} aria-hidden />
                    Family hub
                  </Link>
                </div>
              </div>
              <div className="md:col-span-5">
                <div className="relative aspect-[5/4] overflow-hidden md:aspect-[4/5]">
                  <img
                    src={config.heroImage.src}
                    alt={config.heroImage.alt}
                    width={1024}
                    height={1216}
                    loading="eager"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--stage-family-deep) / 0.24), transparent 55%)" }} aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18">
          <div className="container mx-auto grid max-w-5xl gap-10 px-5 sm:px-8 md:grid-cols-12 md:px-10">
            <div className="md:col-span-5">
              <p className="font-sans text-[11px] font-light uppercase tracking-[0.3em]" style={{ color: accent }}>
                What this area helps with
              </p>
              <h2 className="mt-4 font-serif text-[1.9rem] leading-tight" style={{ color: deep }}>
                A grounded place to begin
              </h2>
              <p className="mt-5 font-serif text-[17px] italic leading-[1.7]" style={{ color: deepSoft }}>
                {config.intro}
              </p>
            </div>
            <ul className="grid gap-x-8 gap-y-4 md:col-span-7 md:grid-cols-2">
              {config.whatThisCovers.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 border-t pt-4" style={{ borderColor: accentBorder }}>
                  <Check size={15} className="mt-1 shrink-0" style={{ color: accent }} aria-hidden />
                  <span className="font-sans text-[14px] font-light leading-relaxed" style={{ color: deepSoft }}>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {startHere.length > 0 && (
          <section id="family-topic-start" className="py-14 scroll-mt-24 md:py-18" style={{ backgroundColor: "hsl(var(--stage-family) / 0.28)" }}>
            <div className="container mx-auto max-w-5xl px-5 sm:px-8 md:px-10">
              <SectionHeading eyebrow="Start here">The most useful first reads</SectionHeading>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {startHere.map((article) => <FamilyArticleImageCard key={article.slug} article={article} />)}
              </div>
            </div>
          </section>
        )}

        <section className="py-14 md:py-18">
          <div className="container mx-auto max-w-5xl px-5 sm:px-8 md:px-10">
            <SectionHeading eyebrow="Key situations">The family-life moments inside this area</SectionHeading>
            <div className="grid grid-cols-1 border-y md:grid-cols-2 lg:grid-cols-3" style={{ borderColor: accentBorder }}>
              {config.areasInside.map((area, index) => (
                <article key={area.title} className="border-b px-1 py-6 md:px-6 lg:border-b-0" style={{ borderColor: accentBorder }}>
                  <span className="font-sans text-[10px] font-medium tracking-[0.2em]" style={{ color: accent }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-serif text-[1.25rem] leading-snug" style={{ color: deep }}>{area.title}</h3>
                  <p className="mt-2 font-sans text-[13.5px] font-light leading-relaxed" style={{ color: deepSoft }}>{area.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {remainingGuidance.length > 0 && (
          <section className="py-14 md:py-18" style={{ backgroundColor: "hsl(var(--stage-family) / 0.22)" }}>
            <div className="container mx-auto max-w-5xl px-5 sm:px-8 md:px-10">
              <SectionHeading eyebrow="Relevant guidance">Continue with what fits today</SectionHeading>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {remainingGuidance.map((article) => <FamilyArticleImageCard key={article.slug} article={article} />)}
              </div>
            </div>
          </section>
        )}

        <section className="py-14 md:py-18">
          <div className="container mx-auto max-w-3xl px-5 sm:px-8 md:px-10">
            <SectionHeading eyebrow="Common questions">What families quietly wonder</SectionHeading>
            <Accordion type="single" collapsible className="space-y-2">
              {config.commonQuestions.map(({ q, a }, index) => (
                <AccordionItem key={q} value={`question-${index}`} className="border-b px-1" style={{ borderColor: accentBorder }}>
                  <AccordionTrigger className="min-h-14 py-4 text-left font-serif text-[17px] hover:no-underline" style={{ color: deep }}>
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-prose pb-6 font-sans text-[15px] font-light leading-[1.75]" style={{ color: deepSoft }}>
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="family-topic-ai" className="scroll-mt-24 py-14 md:py-18" style={{ backgroundColor: "hsl(var(--stage-family) / 0.34)" }}>
          <div className="container mx-auto max-w-3xl px-5 sm:px-8 md:px-10">
            <div className="mb-7 text-center">
              <p className="font-sans text-[11px] font-light uppercase tracking-[0.3em]" style={{ color: accent }}>Family Companion</p>
              <h2 className="mt-3 font-serif text-[1.9rem] leading-tight" style={{ color: deep }}>When the edited guidance does not quite fit</h2>
            </div>
            <div className="overflow-hidden border bg-parchment" style={{ borderColor: accentBorder }}>
              <HubAISupport
                heading={config.aiHeading}
                description={config.aiDescription}
                placeholder={config.aiPlaceholder}
                suggestions={config.aiPrompts}
                context={config.title}
                stageBg="--stage-family"
                stageAccent="--stage-family-accent"
                stage="family"
              />
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="py-14 md:py-18">
            <div className="container mx-auto max-w-5xl px-5 sm:px-8 md:px-10">
              <SectionHeading eyebrow="Related Family areas">Continue exploring</SectionHeading>
              <div className="grid grid-cols-1 border-t md:grid-cols-3" style={{ borderColor: accentBorder }}>
                {related.map((area, index) => (
                  <Link key={area.slug} to={`/family/${area.slug}`} className="group flex min-h-32 items-center justify-between gap-4 border-b px-1 py-6 md:px-5" style={{ borderColor: accentBorder }}>
                    <div>
                      <span className="font-sans text-[10px] font-medium tracking-[0.2em]" style={{ color: accent }}>{String(index + 1).padStart(2, "0")}</span>
                      <h3 className="mt-2 font-serif text-[1.2rem]" style={{ color: deep }}>{area.title}</h3>
                    </div>
                    <ChevronRight size={17} className="transition-transform group-hover:translate-x-1" style={{ color: accent }} aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="pb-20 pt-4 md:pb-24">
          <div className="container mx-auto max-w-2xl px-5 text-center sm:px-8 md:px-10">
            <p className="font-serif text-[1.3rem] italic" style={{ color: deepSoft }}>Return to the wider Family collection when you are ready.</p>
            <Link to="/family" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border px-6 py-2.5 font-sans text-[13px] font-medium" style={{ borderColor: accentBorder, backgroundColor: accentSoft, color: deep }}>
              Return to Family
              <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FamilyTopicPage;