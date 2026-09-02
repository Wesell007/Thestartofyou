import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Home, Check, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HubAISupport from "@/components/shared/HubAISupport";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FamilyTopicConfig,
  FAMILY_TOPIC_INDEX,
} from "@/data/familyTopicData";
import { getFamilyArticlesByTopic, type FamilyArticleTopic } from "@/data/familyArticleData";
import FamilyArticleImageCard from "@/components/family/article/FamilyArticleImageCard";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

interface Props {
  config: FamilyTopicConfig;
}

const FamilyTopicPage = ({ config }: Props) => {
  const accent = "hsl(var(--stage-family-accent))";
  const accentSoft = "hsl(var(--stage-family-accent) / 0.08)";
  const accentMid = "hsl(var(--stage-family-accent) / 0.24)";
  const accentBorder = "hsl(var(--stage-family-accent) / 0.22)";
  const accentBorderStrong = "hsl(var(--stage-family-accent) / 0.32)";
  const tintWash = "hsl(var(--stage-family) / 0.7)";
  const deep = "hsl(var(--stage-family-deep))";
  const deepSoft = "hsl(var(--stage-family-deep) / 0.72)";
  const deepMuted = "hsl(var(--stage-family-deep) / 0.55)";

  const related = config.related
    .filter((s) => s !== config.slug)
    .slice(0, 3)
    .map((s) => ({ slug: s, ...FAMILY_TOPIC_INDEX[s] }));

  // ─── Article surfacing ─────────────────────────────────────────
  const readyArticles = getFamilyArticlesByTopic(
    config.slug as FamilyArticleTopic
  ).filter((a) => a.status === "ready");
  const readyBySlug = new Map(readyArticles.map((a) => [a.slug, a]));




  // Grouped guidance: include Start Here slugs too (shown as compact rows
  // rather than large cards, so they serve a different visual purpose).
  // De-duplicate within the grouped panel itself.
  const seenInGroups = new Set<string>();
  const articleGroups = (config.articleGroups ?? [])
    .map((g) => {
      const articles = g.slugs
        .filter((s) => {
          if (seenInGroups.has(s)) return false;
          if (!readyBySlug.has(s)) return false;
          seenInGroups.add(s);
          return true;
        })
        .map((s) => readyBySlug.get(s)!);
      return {
        label: g.label,
        description: g.description,
        articles,
      };
    })
    .filter((g) => g.articles.length > 0);

  // Fallback: any ready article not already in a group.
  const ungrouped = readyArticles.filter((a) => !seenInGroups.has(a.slug));
  if (ungrouped.length > 0) {
    articleGroups.push({
      label: "More on this topic",
      description: undefined,
      articles: ungrouped,
    });
  }

  const hasGuidance = articleGroups.length > 0;


  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-3">
      <span className="h-px w-8" style={{ background: accentMid }} aria-hidden />
      <span
        className="font-sans text-[11px] font-light tracking-[0.3em] uppercase"
        style={{ color: accent }}
      >
        {children}
      </span>
    </div>
  );

  const heroCardShadow =
    "0 36px 80px -50px rgba(70,50,20,0.34), inset 0 1px 0 hsl(0 0% 100% / 0.7)";

  const abstractPanelShadow =
    "0 28px 60px -34px rgba(70,50,20,0.42), inset 0 1px 0 hsl(0 0% 100% / 0.6)";

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main className="overflow-hidden">
        {/* ─── HERO ───────────────────────────────────────────────────── */}
        <section className="relative pt-8 sm:pt-12 md:pt-16 pb-16 md:pb-24">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[420px] md:h-[560px] -z-0"
            style={{
              background: `linear-gradient(180deg, ${tintWash} 0%, hsl(var(--stage-family) / 0.25) 55%, transparent 100%)`,
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -z-0 left-1/2 -translate-x-1/2 top-24 md:top-32 w-[680px] h-[420px] rounded-full blur-3xl opacity-60"
            style={{ background: "hsl(var(--stage-family-accent) / 0.18)" }}
            aria-hidden
          />

          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
            {/* Breadcrumb */}
            <Breadcrumbs
              tone="section"
              showHomeIcon
              className="mb-10 md:mb-12 font-sans"
              colors={{ base: deepSoft, link: accent, current: deep }}
              items={[
                { label: "Home", href: "/" },
                { label: "Family", href: "/family" },
                { label: config.title, href: `/family/${config.slug}` },
              ]}
            />

            {/* Hero card */}
            <div
              className="relative bg-parchment rounded-[28px] border overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12"
              style={{
                borderColor: accentBorder,
                boxShadow: heroCardShadow,
              }}
            >
              <div className="relative grid grid-cols-1 md:grid-cols-12 md:gap-10 lg:gap-14 items-center">
                {/* Hero image (or abstract fallback if missing) */}
                <div className="md:col-span-5 md:order-2 mb-7 md:mb-0">
                  <div
                    className="relative w-full overflow-hidden rounded-[22px] border aspect-[5/4] md:aspect-[4/5]"
                    style={{
                      borderColor: accentBorderStrong,
                      background:
                        "linear-gradient(155deg, hsl(var(--stage-family) / 0.85) 0%, hsl(var(--stage-family-soft) / 0.85) 100%)",
                      boxShadow: abstractPanelShadow,
                    }}
                  >
                    {config.heroImage?.src ? (
                      <>
                        <img
                          src={config.heroImage.src}
                          alt={config.heroImage.alt}
                          width={1024}
                          height={1216}
                          loading="eager"
                          fetchPriority="high"
                          className="absolute inset-0 h-full w-full object-cover"
                          style={{ objectPosition: "50% 40%" }}
                        />
                        {/* Warm buttercream wash overlay */}
                        <span
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(160deg, hsl(var(--stage-family) / 0.18) 0%, transparent 45%, hsl(var(--stage-family-deep) / 0.18) 100%)",
                          }}
                          aria-hidden
                        />
                        {/* Inner highlight frame */}
                        <span
                          className="pointer-events-none absolute inset-2.5 rounded-[18px] border"
                          style={{ borderColor: "hsl(0 0% 100% / 0.28)" }}
                          aria-hidden
                        />
                      </>
                    ) : (
                      <>
                        <span
                          className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full blur-3xl opacity-80"
                          style={{ background: "hsl(var(--stage-family-accent) / 0.28)" }}
                          aria-hidden
                        />
                        <span
                          className="pointer-events-none absolute -bottom-20 -right-16 h-60 w-60 rounded-full blur-3xl opacity-70"
                          style={{ background: "hsl(var(--stage-family-soft) / 0.75)" }}
                          aria-hidden
                        />
                        <span
                          className="pointer-events-none absolute inset-6 rounded-[18px] border"
                          style={{ borderColor: "hsl(var(--stage-family-accent) / 0.18)" }}
                          aria-hidden
                        />
                        <span
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(120% 90% at 50% 50%, transparent 55%, hsl(var(--stage-family-deep) / 0.22) 100%)",
                          }}
                          aria-hidden
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Copy */}
                <div className="md:col-span-7 md:order-1">
                  <span
                    className="block h-px w-8 mb-5"
                    style={{ background: accentMid }}
                    aria-hidden
                  />
                  <p
                    className="font-sans text-[11px] font-light tracking-[0.3em] uppercase"
                    style={{ color: accent }}
                  >
                    Family guide · {config.eyebrow}
                  </p>
                  <h1
                    className="mt-6 font-serif text-[2.1rem] sm:text-[2.5rem] md:text-[2.7rem] lg:text-[3rem] leading-[1.05] tracking-[-0.005em]"
                    style={{ color: deep }}
                  >
                    {config.title}
                  </h1>
                  <p
                    className="mt-6 md:mt-7 font-sans text-[15.5px] md:text-[16px] font-light leading-[1.65] max-w-[34rem]"
                    style={{ color: deepSoft }}
                  >
                    {config.standfirst}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="#family-topic-ai"
                      className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-[13px] font-medium tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(70,50,20,0.38)]"
                      style={{
                        borderColor: accentBorderStrong,
                        backgroundColor: accentSoft,
                        color: deep,
                      }}
                    >
                      <Sparkles size={13} strokeWidth={1.8} style={{ color: accent }} />
                      Ask a question
                    </a>
                    <Link
                      to="/family"
                      className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-[13px] font-medium tracking-wide transition-all hover:-translate-y-0.5"
                      style={{
                        borderColor: accentBorder,
                        color: deep,
                      }}
                    >
                      <Home size={13} strokeWidth={1.8} style={{ color: accent }} />
                      Back to Family Hub
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHAT THIS COVERS ─────────────────────────────────────── */}
        <section
          className="relative pb-16 md:pb-20"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-family) / 0.32) 100%)",
          }}
        >
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
            <div
              className="relative rounded-[26px] border p-7 sm:p-10 md:p-12 overflow-hidden"
              style={{
                borderColor: accentBorderStrong,
                background:
                  "linear-gradient(165deg, hsl(var(--parchment)) 0%, hsl(var(--stage-family) / 0.5) 100%)",
                boxShadow:
                  "0 28px 64px -40px rgba(70,50,20,0.32), inset 0 1px 0 hsl(0 0% 100% / 0.75)",
              }}
            >
              <span
                className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full blur-3xl opacity-60"
                style={{ background: "hsl(var(--stage-family-accent) / 0.18)" }}
                aria-hidden
              />
              <div className="relative">
                <SectionLabel>What this covers</SectionLabel>
                <h2
                  className="mt-5 font-serif text-[1.75rem] md:text-[2rem] leading-tight"
                  style={{ color: deep }}
                >
                  A calm overview
                </h2>

                <div className="mt-5 flex gap-4 max-w-2xl">
                  <span
                    className="mt-1.5 w-[2px] shrink-0 rounded-full"
                    style={{ background: accentMid }}
                    aria-hidden
                  />
                  <p
                    className="font-serif italic text-[15px] leading-[1.7]"
                    style={{ color: deepSoft }}
                  >
                    {config.whatThisCovers.lead}
                  </p>
                </div>

                <ul className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                  {config.whatThisCovers.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3.5">
                      <span
                        className="mt-0.5 grid place-items-center h-5 w-5 rounded-full shrink-0 border"
                        style={{
                          backgroundColor: accentSoft,
                          borderColor: accentBorderStrong,
                        }}
                        aria-hidden
                      >
                        <Check size={11} strokeWidth={2.2} style={{ color: accent }} />
                      </span>
                      <span
                        className="font-sans text-[14.75px] font-light leading-[1.65]"
                        style={{ color: deepSoft }}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>


        {/* ─── GROUPED GUIDANCE ─────────────────────────────────────── */}
        {hasGuidance && (
          <section
            className="relative py-20 md:py-24"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-family) / 0.28) 100%)",
            }}
          >
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
              <div
                className="relative rounded-[28px] border p-6 sm:p-10 md:p-12 overflow-hidden"
                style={{
                  borderColor: accentBorderStrong,
                  background:
                    "linear-gradient(165deg, hsl(var(--parchment)) 0%, hsl(var(--stage-family) / 0.5) 100%)",
                  boxShadow:
                    "0 28px 64px -40px rgba(70,50,20,0.32), inset 0 1px 0 hsl(0 0% 100% / 0.75)",
                }}
              >
                <span
                  className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full blur-3xl opacity-60"
                  style={{ background: "hsl(var(--stage-family-accent) / 0.18)" }}
                  aria-hidden
                />
                <div className="relative">
                  <SectionLabel>Guidance</SectionLabel>
                  <h2
                    className="mt-5 font-serif text-[1.75rem] md:text-[2rem] leading-tight"
                    style={{ color: deep }}
                  >
                    Helpful reads for this part of family life
                  </h2>
                  <p
                    className="mt-4 font-sans text-[14.5px] font-light leading-[1.65] max-w-2xl"
                    style={{ color: deepSoft }}
                  >
                    Choose the guide that best matches what you need today.
                  </p>

                  {(() => {
                    const allSingle =
                      articleGroups.length > 1 &&
                      articleGroups.every((g) => g.articles.length === 1);
                    if (allSingle) {
                      const flat = articleGroups.flatMap((g) => g.articles);
                      return (
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                          {flat.map((a) => (
                            <FamilyArticleImageCard key={a.slug} article={a} />
                          ))}
                        </div>
                      );
                    }
                    return (
                      <div className="mt-10 space-y-10">
                        {articleGroups.map((group) => (
                          <div key={group.label}>
                            <div className="mb-4 flex flex-col gap-1.5">
                              <p
                                className="font-sans text-[11px] font-light tracking-[0.28em] uppercase"
                                style={{ color: accent }}
                              >
                                {group.label}
                              </p>
                              {group.description && (
                                <p
                                  className="font-sans text-[13.5px] font-light leading-[1.65] max-w-2xl"
                                  style={{ color: deepSoft }}
                                >
                                  {group.description}
                                </p>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                              {group.articles.map((a) => (
                                <FamilyArticleImageCard key={a.slug} article={a} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}

                </div>
              </div>
            </div>
          </section>
        )}


        {/* ─── COMMON QUESTIONS ─────────────────────────────────────── */}
        <section
          className="relative py-20 md:py-24"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-family) / 0.32) 50%, hsl(var(--parchment)) 100%)",
          }}
        >
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
            <div className="mb-10 md:mb-12 flex flex-col items-start gap-4">
              <SectionLabel>Common questions</SectionLabel>
              <h2
                className="font-serif text-[1.9rem] md:text-[2.2rem] leading-tight"
                style={{ color: deep }}
              >
                What families quietly wonder
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {config.commonQuestions.map(({ q, a }, i) => (
                <AccordionItem
                  key={i}
                  value={`q${i}`}
                  className="group/q relative rounded-[18px] border bg-parchment/90 px-6 md:px-7 overflow-hidden transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_42px_-26px_rgba(70,50,20,0.3)] data-[state=open]:shadow-[0_22px_50px_-30px_rgba(70,50,20,0.32)] data-[state=open]:border-[hsl(var(--stage-family-accent)/0.34)]"
                  style={{ borderColor: accentBorderStrong }}
                >
                  <span
                    className="pointer-events-none absolute left-0 top-3 bottom-3 w-[2px] rounded-r opacity-0 group-data-[state=open]/q:opacity-100 transition-opacity"
                    style={{ background: accent }}
                    aria-hidden
                  />
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 group-data-[state=open]/q:opacity-100 transition-opacity"
                    style={{ background: "hsl(var(--stage-family-accent) / 0.10)" }}
                    aria-hidden
                  />
                  <AccordionTrigger
                    className="relative text-left font-serif text-[17px] md:text-[18px] py-5 hover:no-underline"
                    style={{ color: deep }}
                  >
                    {q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="relative font-sans text-[15px] font-light leading-[1.7] pb-6 max-w-prose"
                    style={{ color: deepSoft }}
                  >
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ─── AI SUPPORT ───────────────────────────────────────────── */}
        <section
          id="family-topic-ai"
          className="relative py-20 md:py-24 scroll-mt-24"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--stage-family) / 0.6) 0%, hsl(var(--stage-family) / 0.28) 55%, hsl(var(--parchment)) 100%)",
          }}
        >
          <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
            <div className="mb-7 md:mb-8 flex flex-col items-center text-center gap-3">
              <SectionLabel>Ask anything</SectionLabel>
            </div>

            <div
              className="rounded-[28px] border bg-parchment/85 backdrop-blur-sm overflow-hidden"
              style={{
                borderColor: accentBorderStrong,
                boxShadow:
                  "0 36px 80px -46px rgba(70,50,20,0.38), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
              }}
            >
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
            <p
              className="mt-7 text-center font-sans text-[12.5px] font-light tracking-wide max-w-lg mx-auto leading-relaxed"
              style={{ color: deepMuted }}
            >
              A quiet companion for the questions family life quietly raises.
            </p>
          </div>
        </section>


        {/* ─── MORE FAMILY TOPICS ───────────────────────────────────── */}
        {related.length > 0 && (
          <section
            className="relative py-20 md:py-24"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-family) / 0.28) 100%)",
            }}
          >
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
              <div className="mb-9 md:mb-11 flex flex-col items-start gap-3">
                <SectionLabel>More Family topics</SectionLabel>
                <h2
                  className="font-serif text-[1.7rem] md:text-[1.95rem] leading-tight"
                  style={{ color: deep }}
                >
                  Continue exploring
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/family/${r.slug}`}
                    className="group relative flex h-full flex-col justify-between gap-6 rounded-[20px] border px-6 py-6 overflow-hidden transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_22px_50px_-30px_rgba(70,50,20,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-parchment focus-visible:ring-[hsl(var(--stage-family-accent)/0.5)]"
                    style={{
                      borderColor: accentBorderStrong,
                      background:
                        "linear-gradient(160deg, hsl(var(--parchment)) 0%, hsl(var(--stage-family) / 0.5) 100%)",
                      boxShadow:
                        "0 14px 32px -28px rgba(70,50,20,0.24), inset 0 1px 0 hsl(0 0% 100% / 0.65)",
                    }}
                  >
                    <span
                      className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full blur-2xl opacity-60"
                      style={{ background: "hsl(var(--stage-family-accent) / 0.16)" }}
                      aria-hidden
                    />
                    <div className="relative">
                      <p
                        className="font-sans text-[10.5px] font-light tracking-[0.28em] uppercase mb-2"
                        style={{ color: accent }}
                      >
                        {r.eyebrow}
                      </p>
                      <p
                        className="font-serif text-[17px] leading-snug"
                        style={{ color: deep }}
                      >
                        {r.title}
                      </p>
                    </div>
                    <div className="relative flex items-center justify-end">
                      <span
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full border transition-transform group-hover:translate-x-1"
                        style={{
                          borderColor: accentBorderStrong,
                          backgroundColor: accentSoft,
                        }}
                        aria-hidden
                      >
                        <ChevronRight size={15} strokeWidth={1.8} style={{ color: accent }} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── BACK TO HUB CTA ──────────────────────────────────────── */}
        <section className="pb-28 md:pb-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <div
              className="relative rounded-[28px] border px-7 py-10 md:px-12 md:py-12 text-center overflow-hidden"
              style={{
                borderColor: accentBorderStrong,
                background:
                  "linear-gradient(170deg, hsl(var(--parchment)) 0%, hsl(var(--stage-family) / 0.55) 100%)",
                boxShadow:
                  "0 32px 76px -42px rgba(70,50,20,0.34), inset 0 1px 0 hsl(0 0% 100% / 0.75)",
              }}
            >
              <span
                className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-56 w-72 rounded-full blur-3xl opacity-60"
                style={{ background: "hsl(var(--stage-family) / 0.4)" }}
                aria-hidden
              />
              <span
                className="relative mx-auto block h-px w-10 mb-6"
                style={{ backgroundColor: accentMid }}
                aria-hidden
              />
              <p
                className="relative font-serif italic text-[15.5px] mb-7 max-w-md mx-auto leading-relaxed"
                style={{ color: deepSoft }}
              >
                Back to the wider Family hub when you're ready.
              </p>
              <Link
                to="/family"
                className="relative inline-flex items-center gap-2 rounded-full border px-7 py-3 font-sans text-[13px] font-medium tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_46px_-26px_rgba(70,50,20,0.4)]"
                style={{
                  borderColor: accentBorderStrong,
                  backgroundColor: accentSoft,
                  color: deep,
                }}
              >
                Return to Family
                <ArrowRight size={14} strokeWidth={1.8} style={{ color: accent }} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FamilyTopicPage;
