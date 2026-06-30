import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronRight, Home, Heart } from "lucide-react";
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
  ToddlerAgeConfig,
  TODDLER_AGE_INDEX,
  TODDLER_TOPIC_LABELS,
} from "@/data/toddlerAgeData";

interface Props {
  config: ToddlerAgeConfig;
}

const ToddlerAgePage = ({ config }: Props) => {
  const accent = "hsl(var(--stage-toddler-accent))";
  const accentSoft = "hsl(var(--stage-toddler-accent) / 0.08)";
  const accentMid = "hsl(var(--stage-toddler-accent) / 0.22)";
  const accentBorder = "hsl(var(--stage-toddler-accent) / 0.18)";
  const accentBorderStrong = "hsl(var(--stage-toddler-accent) / 0.28)";
  const tintWash = "hsl(var(--stage-toddler) / 0.7)";
  const deep = "hsl(var(--stage-toddler-deep))";
  const deepSoft = "hsl(var(--stage-toddler-deep) / 0.72)";

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

  const cardShadow =
    "0 28px 64px -40px rgba(70,40,20,0.28), inset 0 1px 0 hsl(0 0% 100% / 0.7)";

  const prev = config.previousAge ? TODDLER_AGE_INDEX[config.previousAge] : null;
  const next = config.nextAge ? TODDLER_AGE_INDEX[config.nextAge] : null;

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main className="overflow-hidden">
        {/* ─── HERO ────────────────────────────────────────────────── */}
        <section className="relative pt-8 sm:pt-12 md:pt-16 pb-16 md:pb-24">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[420px] md:h-[560px] -z-0"
            style={{
              background: `linear-gradient(180deg, ${tintWash} 0%, hsl(var(--stage-toddler) / 0.22) 55%, transparent 100%)`,
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -z-0 left-1/2 -translate-x-1/2 top-28 md:top-36 w-[680px] h-[420px] rounded-full blur-3xl opacity-60"
            style={{ background: "hsl(var(--stage-toddler-accent) / 0.16)" }}
            aria-hidden
          />

          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl lg:max-w-6xl relative z-10">
            <nav
              aria-label="Breadcrumb"
              className="mb-10 md:mb-12 font-sans text-[12.5px] font-light"
            >
              <ol
                className="flex items-center gap-1.5 flex-wrap"
                style={{ color: deepSoft }}
              >
                <li>
                  <Link
                    to="/toddler"
                    className="inline-flex items-center gap-1.5 hover:underline underline-offset-4 transition-colors"
                    style={{ color: accent }}
                  >
                    <Home size={12} strokeWidth={1.8} aria-hidden />
                    Toddler
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight size={13} strokeWidth={1.6} />
                </li>
                <li aria-current="page" style={{ color: deep }}>
                  {config.title}
                </li>
              </ol>
            </nav>

            <div
              className="relative bg-parchment rounded-[28px] border p-6 sm:p-8 md:p-10 lg:p-12"
              style={{
                borderColor: accentBorder,
                boxShadow:
                  "0 36px 80px -50px rgba(70,40,20,0.32), inset 0 1px 0 hsl(0 0% 100% / 0.65)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Image panel — stacks above on mobile + iPad, right on desktop */}
                <div className="order-1 lg:order-2 lg:col-span-5">
                  {config.heroImage ? (
                    <div
                      className="relative w-full overflow-hidden rounded-[22px] md:rounded-[24px] border aspect-[5/4] lg:aspect-[4/5]"
                      style={{
                        borderColor: accentBorderStrong,
                        boxShadow:
                          "0 30px 60px -36px rgba(70,40,20,0.38), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
                      }}
                    >
                      <img
                        src={config.heroImage}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ objectPosition: "center 30%" }}
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    /* TODO: upload age hero image */
                    <div
                      className="relative w-full overflow-hidden rounded-[22px] md:rounded-[24px] border aspect-[5/4] lg:aspect-[4/5]"
                      style={{
                        borderColor: accentBorder,
                        backgroundColor: accentSoft,
                        boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.6)",
                      }}
                      aria-hidden
                    />
                  )}
                </div>

                {/* Copy column */}
                <div className="order-2 lg:order-1 lg:col-span-7 text-center lg:text-left">
                  <span
                    className="mx-auto lg:mx-0 block h-px w-10 mb-5"
                    style={{ background: accentMid }}
                    aria-hidden
                  />
                  <p
                    className="font-sans text-[11px] font-light tracking-[0.3em] uppercase"
                    style={{ color: accent }}
                  >
                    Toddler age guide · {config.eyebrow}
                  </p>
                  <h1
                    className="mt-5 font-serif text-[2.1rem] sm:text-[2.5rem] md:text-[2.85rem] lg:text-[3rem] leading-[1.05] tracking-[-0.005em]"
                    style={{ color: deep }}
                  >
                    {config.title}
                  </h1>

                  <div className="mt-5 flex justify-center lg:justify-start">
                    <span
                      className="inline-flex items-center px-3.5 py-1.5 rounded-full border text-[11.5px] font-light tracking-wide"
                      style={{
                        borderColor: accentBorderStrong,
                        backgroundColor: accentSoft,
                        color: deep,
                      }}
                    >
                      {config.ageRangeLabel}
                    </span>
                  </div>

                  <p
                    className="mt-6 mx-auto lg:mx-0 font-sans text-[15.5px] md:text-[16.5px] font-light leading-[1.7] max-w-[34rem]"
                    style={{ color: deepSoft }}
                  >
                    {config.standfirst}
                  </p>

                  {config.stageSummary && (
                    <div
                      className="mt-7 mx-auto lg:mx-0 max-w-[34rem] rounded-[18px] border px-5 py-4"
                      style={{ borderColor: accentBorder, backgroundColor: accentSoft }}
                    >
                      <p
                        className="font-serif italic text-[14.5px] leading-[1.7]"
                        style={{ color: deepSoft }}
                      >
                        {config.stageSummary}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHAT CHANGES ──────────────────────────────────────────── */}
        <section
          className="relative pb-16 md:pb-20"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler) / 0.3) 100%)",
          }}
        >
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
            <div
              className="relative rounded-[26px] border p-7 sm:p-10 md:p-12 overflow-hidden"
              style={{
                borderColor: accentBorderStrong,
                background:
                  "linear-gradient(165deg, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler) / 0.5) 100%)",
                boxShadow:
                  "0 28px 64px -40px rgba(70,40,20,0.32), inset 0 1px 0 hsl(0 0% 100% / 0.75)",
              }}
            >
              <span
                className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full blur-3xl opacity-60"
                style={{ background: "hsl(var(--stage-toddler-accent) / 0.18)" }}
                aria-hidden
              />
              <div className="relative">
              <SectionLabel>What changes around this age</SectionLabel>
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
                  {config.whatChanges.lead}
                </p>
              </div>

              <ul className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {config.whatChanges.items.map((b, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <span
                      className="mt-2 inline-block h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ background: accent }}
                      aria-hidden
                    />
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

        {/* ─── DEVELOPMENT AREAS ─────────────────────────────────────── */}
        <section className="pb-20 md:pb-24">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            <div className="mb-9 md:mb-11 flex flex-col items-start gap-3">
              <SectionLabel>Development areas</SectionLabel>
              <h2
                className="font-serif text-[1.75rem] md:text-[2rem] leading-tight"
                style={{ color: deep }}
              >
                What to gently support
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {config.developmentAreas.map((area) => (
                <Link
                  key={area.key}
                  to={`/toddler/${area.topic}`}
                  className="group relative flex h-full flex-col justify-between gap-5 rounded-[20px] border px-6 py-6 overflow-hidden transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_22px_50px_-30px_rgba(70,40,20,0.32)]"
                  style={{
                    borderColor: accentBorderStrong,
                    background:
                      "linear-gradient(160deg, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler) / 0.5) 100%)",
                    boxShadow:
                      "0 14px 32px -28px rgba(70,40,20,0.22), inset 0 1px 0 hsl(0 0% 100% / 0.65)",
                  }}
                >
                  <span
                    className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full blur-2xl opacity-60"
                    style={{ background: "hsl(var(--stage-toddler-accent) / 0.16)" }}
                    aria-hidden
                  />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: accent }}
                        aria-hidden
                      />
                      <p
                        className="font-sans text-[10.5px] font-light tracking-[0.28em] uppercase"
                        style={{ color: accent }}
                      >
                        {area.heading}
                      </p>
                    </div>
                    <p
                      className="font-sans text-[14.5px] font-light leading-[1.65]"
                      style={{ color: deepSoft }}
                    >
                      {area.body}
                    </p>
                  </div>
                  <div className="relative flex items-center justify-between pt-2">
                    <span
                      className="font-sans text-[12px] tracking-wide"
                      style={{ color: accent }}
                    >
                      {TODDLER_TOPIC_LABELS[area.topic].title}
                    </span>
                    <span
                      className="inline-flex items-center justify-center h-7 w-7 rounded-full border transition-transform group-hover:translate-x-1"
                      style={{
                        borderColor: accentBorderStrong,
                        backgroundColor: accentSoft,
                      }}
                      aria-hidden
                    >
                      <ChevronRight size={13} strokeWidth={1.8} style={{ color: accent }} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── AI SUPPORT ────────────────────────────────────────────── */}
        <section
          className="relative py-20 md:py-24"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--stage-toddler) / 0.6) 0%, hsl(var(--stage-toddler) / 0.28) 55%, hsl(var(--parchment)) 100%)",
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
                  "0 36px 80px -46px rgba(70,40,20,0.38), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
              }}
            >
              <HubAISupport
                heading={config.aiHeading}
                description={config.aiDescription}
                placeholder={config.aiPlaceholder}
                suggestions={config.aiPrompts}
                context={`Toddler · ${config.title}`}
                stageBg="--stage-toddler"
                stageAccent="--stage-toddler-accent"
                stage="toddler"
              />
            </div>
            <p
              className="mt-7 text-center font-sans text-[12.5px] font-light tracking-wide max-w-lg mx-auto leading-relaxed"
              style={{ color: "hsl(var(--stage-toddler-deep) / 0.55)" }}
            >
              A quiet companion for the questions you'd rather not Google at 2am.
            </p>
          </div>
        </section>

        {/* ─── COMMON QUESTIONS ──────────────────────────────────────── */}
        <section
          className="relative py-20 md:py-24"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler) / 0.32) 50%, hsl(var(--parchment)) 100%)",
          }}
        >
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
            <div className="mb-10 md:mb-12 flex flex-col items-start gap-4">
              <SectionLabel>Common questions</SectionLabel>
              <h2
                className="font-serif text-[1.9rem] md:text-[2.2rem] leading-tight"
                style={{ color: deep }}
              >
                What parents quietly wonder
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {config.commonQuestions.map(({ q, a }, i) => (
                <AccordionItem
                  key={i}
                  value={`q${i}`}
                  className="group/q relative rounded-[18px] border bg-parchment/90 px-6 md:px-7 overflow-hidden transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_42px_-26px_rgba(70,40,20,0.3)] data-[state=open]:shadow-[0_22px_50px_-30px_rgba(70,40,20,0.32)] data-[state=open]:border-[hsl(var(--stage-toddler-accent)/0.32)]"
                  style={{ borderColor: accentBorderStrong }}
                >
                  <span
                    className="pointer-events-none absolute left-0 top-3 bottom-3 w-[2px] rounded-r opacity-0 group-data-[state=open]/q:opacity-100 transition-opacity"
                    style={{ background: accent }}
                    aria-hidden
                  />
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 group-data-[state=open]/q:opacity-100 transition-opacity"
                    style={{ background: "hsl(var(--stage-toddler-accent) / 0.12)" }}
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

        {/* ─── GENTLE SUPPORT ────────────────────────────────────────── */}
        <section className="pb-20 md:pb-24 bg-parchment">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
            <div
              className="relative rounded-[24px] border p-7 sm:p-9 md:p-10 flex gap-5 overflow-hidden"
              style={{
                borderColor: accentBorderStrong,
                background:
                  "linear-gradient(160deg, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler) / 0.55) 100%)",
                boxShadow:
                  "0 18px 44px -32px rgba(70,40,20,0.28), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
              }}
            >
              <span
                className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-60"
                style={{ background: "hsl(var(--stage-toddler-accent) / 0.18)" }}
                aria-hidden
              />
              <span
                className="grid place-items-center h-9 w-9 rounded-full shrink-0 border"
                style={{
                  borderColor: accentBorderStrong,
                  backgroundColor: "hsl(var(--parchment))",
                }}
                aria-hidden
              >
                <Heart size={15} strokeWidth={1.8} style={{ color: accent }} />
              </span>
              <div className="relative">
                <p
                  className="font-sans text-[11px] font-light tracking-[0.28em] uppercase mb-2"
                  style={{ color: accent }}
                >
                  A gentle reminder
                </p>
                <p
                  className="font-serif italic text-[15.5px] md:text-[16px] leading-[1.7]"
                  style={{ color: deepSoft }}
                >
                  {config.gentleSupport}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── RELATED TOPICS ────────────────────────────────────────── */}
        <section
          className="relative py-20 md:py-24"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler) / 0.28) 100%)",
          }}
        >
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            <div className="mb-9 md:mb-11 flex flex-col items-start gap-3">
              <SectionLabel>Related toddler topics</SectionLabel>
              <h2
                className="font-serif text-[1.7rem] md:text-[1.95rem] leading-tight"
                style={{ color: deep }}
              >
                Go a little deeper
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {config.relatedTopics.map((slug) => {
                const t = TODDLER_TOPIC_LABELS[slug];
                return (
                  <Link
                    key={slug}
                    to={`/toddler/${slug}`}
                    className="group relative flex h-full flex-col justify-between gap-6 rounded-[20px] border px-6 py-6 overflow-hidden transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_22px_50px_-30px_rgba(70,40,20,0.32)]"
                    style={{
                      borderColor: accentBorderStrong,
                      background:
                        "linear-gradient(160deg, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler) / 0.5) 100%)",
                      boxShadow:
                        "0 14px 32px -28px rgba(70,40,20,0.22), inset 0 1px 0 hsl(0 0% 100% / 0.65)",
                    }}
                  >
                    <span
                      className="pointer-events-none absolute -top-10 -left-10 h-28 w-28 rounded-full blur-2xl opacity-60"
                      style={{ background: "hsl(var(--stage-toddler-accent) / 0.16)" }}
                      aria-hidden
                    />
                    <div className="relative">
                      <p
                        className="font-sans text-[10.5px] font-light tracking-[0.28em] uppercase mb-2"
                        style={{ color: accent }}
                      >
                        {t.eyebrow}
                      </p>
                      <p
                        className="font-serif text-[17px] leading-snug"
                        style={{ color: deep }}
                      >
                        {t.title}
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
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── PREVIOUS / NEXT AGE ───────────────────────────────────── */}
        <section
          className="relative pb-20 md:pb-24"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler) / 0.24) 100%)",
          }}
        >
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {prev ? (
                <Link
                  to={`/toddler/${config.previousAge}`}
                  className="group relative flex items-center justify-between gap-4 rounded-[20px] border px-6 py-5 overflow-hidden transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_22px_50px_-30px_rgba(70,40,20,0.32)]"
                  style={{
                    borderColor: accentBorderStrong,
                    background:
                      "linear-gradient(160deg, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler) / 0.5) 100%)",
                    boxShadow:
                      "0 14px 32px -28px rgba(70,40,20,0.22), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full border shrink-0 transition-transform group-hover:-translate-x-1"
                    style={{
                      borderColor: accentBorderStrong,
                      backgroundColor: accentSoft,
                    }}
                    aria-hidden
                  >
                    <ArrowLeft size={14} strokeWidth={1.8} style={{ color: accent }} />
                  </span>
                  <div className="flex-1 text-right">
                    <p
                      className="font-sans text-[10.5px] font-light tracking-[0.28em] uppercase mb-1"
                      style={{ color: accent }}
                    >
                      Previous age
                    </p>
                    <p className="font-serif text-[16.5px]" style={{ color: deep }}>
                      {prev.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="hidden md:block" />
              )}

              {next ? (
                <Link
                  to={`/toddler/${config.nextAge}`}
                  className="group relative flex items-center justify-between gap-4 rounded-[20px] border px-6 py-5 overflow-hidden transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_22px_50px_-30px_rgba(70,40,20,0.32)]"
                  style={{
                    borderColor: accentBorderStrong,
                    background:
                      "linear-gradient(160deg, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler) / 0.5) 100%)",
                    boxShadow:
                      "0 14px 32px -28px rgba(70,40,20,0.22), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
                  }}
                >
                  <div className="flex-1">
                    <p
                      className="font-sans text-[10.5px] font-light tracking-[0.28em] uppercase mb-1"
                      style={{ color: accent }}
                    >
                      Next age
                    </p>
                    <p className="font-serif text-[16.5px]" style={{ color: deep }}>
                      {next.title}
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full border shrink-0 transition-transform group-hover:translate-x-1"
                    style={{
                      borderColor: accentBorderStrong,
                      backgroundColor: accentSoft,
                    }}
                    aria-hidden
                  >
                    <ArrowRight size={14} strokeWidth={1.8} style={{ color: accent }} />
                  </span>
                </Link>
              ) : (
                <div className="hidden md:block" />
              )}
            </div>

            <div className="mt-10 md:mt-12 text-center">
              <Link
                to="/toddler"
                className="inline-flex items-center gap-2 font-sans text-[13px] tracking-wide hover:underline underline-offset-4"
                style={{ color: accent }}
              >
                <ArrowLeft size={13} strokeWidth={1.8} />
                Back to the Toddler hub
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ToddlerAgePage;
