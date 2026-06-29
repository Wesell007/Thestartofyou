import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, ShieldCheck, Home } from "lucide-react";
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
  ToddlerTopicConfig,
  TODDLER_TOPIC_INDEX,
} from "@/data/toddlerTopicData";
import {
  DeerMark,
  RabbitMark,
  ButterflyMark,
  LeafSprig,
  BirdMark,
} from "@/components/toddler/ToddlerIllustrations";

interface Props {
  config: ToddlerTopicConfig;
}

const ILLUSTRATION = {
  deer: DeerMark,
  rabbit: RabbitMark,
  butterfly: ButterflyMark,
  leaf: LeafSprig,
  bird: BirdMark,
} as const;

const ToddlerTopicPage = ({ config }: Props) => {
  const accent = "hsl(var(--stage-toddler-accent))";
  const accentSoft = "hsl(var(--stage-toddler-accent) / 0.08)";
  const accentMid = "hsl(var(--stage-toddler-accent) / 0.22)";
  const accentBorder = "hsl(var(--stage-toddler-accent) / 0.18)";
  const tintWash = "hsl(var(--stage-toddler) / 0.6)";
  const deep = "hsl(var(--stage-toddler-deep))";
  const deepSoft = "hsl(var(--stage-toddler-deep) / 0.72)";

  const Illustration = ILLUSTRATION[config.illustration];

  const related = config.related
    .filter((s) => s !== config.slug)
    .slice(0, 3)
    .map((s) => ({ slug: s, ...TODDLER_TOPIC_INDEX[s] }));

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

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main className="overflow-hidden">
        {/* ─── HERO ───────────────────────────────────────────────────── */}
        <section className="relative pt-8 sm:pt-12 md:pt-16 pb-14 md:pb-20">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-48 md:h-72 -z-0"
            style={{
              background: `linear-gradient(180deg, ${tintWash} 0%, transparent 100%)`,
            }}
            aria-hidden
          />

          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl relative z-10">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 md:mb-10 font-sans text-[12.5px] font-light"
            >
              <ol
                className="flex items-center gap-1.5 flex-wrap"
                style={{ color: deepSoft }}
              >
                <li>
                  <Link
                    to="/toddler"
                    className="inline-flex items-center gap-1.5 hover:underline underline-offset-4"
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

            <div className="relative">
              <Illustration
                className="pointer-events-none absolute -top-2 right-0 md:-top-4 md:-right-4 w-24 md:w-32 opacity-[0.32] hidden sm:block"
              />

              <p
                className="font-sans text-[11px] font-light tracking-[0.28em] uppercase"
                style={{ color: accent }}
              >
                Toddler guide · {config.eyebrow}
              </p>
              <h1
                className="mt-5 font-serif text-[2.05rem] sm:text-[2.55rem] md:text-[2.9rem] leading-[1.06]"
                style={{ color: deep }}
              >
                {config.title}
              </h1>
              <p
                className="mt-6 font-sans text-[15.5px] font-light leading-relaxed max-w-2xl"
                style={{ color: deepSoft }}
              >
                {config.standfirst}
              </p>

              {config.medicallyReviewed && (
                <div className="mt-7">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11.5px] font-light"
                    style={{
                      borderColor: accentBorder,
                      backgroundColor: accentSoft,
                      color: deep,
                    }}
                  >
                    <ShieldCheck size={13} strokeWidth={1.8} />
                    Medically reviewed by Jenny Joines
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── WHAT THIS COVERS ─────────────────────────────────────── */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
            <div
              className="relative bg-parchment rounded-[24px] border p-7 sm:p-10 md:p-12"
              style={{
                borderColor: accentBorder,
                boxShadow:
                  "0 24px 56px -36px rgba(60,40,20,0.28), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
              }}
            >
              <SectionLabel>What this covers</SectionLabel>
              <h2
                className="mt-5 font-serif text-[1.7rem] md:text-[1.95rem] leading-tight"
                style={{ color: deep }}
              >
                A calm overview
              </h2>
              <p
                className="mt-4 font-serif italic text-[14.5px] leading-relaxed max-w-2xl"
                style={{ color: deepSoft }}
              >
                {config.whatThisCovers.lead}
              </p>
              <ul className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3.5">
                {config.whatThisCovers.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: accent }}
                      aria-hidden
                    />
                    <span
                      className="font-sans text-[14.5px] font-light leading-relaxed"
                      style={{ color: deepSoft }}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── COMMON QUESTIONS ─────────────────────────────────────── */}
        <section className="pb-20 md:pb-24">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
            <div className="mb-10 md:mb-12 flex flex-col items-start gap-4">
              <SectionLabel>Common questions</SectionLabel>
              <h2
                className="font-serif text-[1.85rem] md:text-[2.15rem] leading-tight"
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
                  className="rounded-2xl border bg-parchment px-6 md:px-7 transition-shadow duration-300 hover:shadow-[0_14px_36px_-22px_rgba(60,40,20,0.28)]"
                  style={{ borderColor: accentBorder }}
                >
                  <AccordionTrigger
                    className="text-left font-serif text-[17px] md:text-lg py-5 hover:no-underline"
                    style={{ color: deep }}
                  >
                    {q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="font-sans text-[15px] font-light leading-relaxed pb-6"
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
          className="relative py-20 md:py-24"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--stage-toddler) / 0.55) 0%, hsl(var(--stage-toddler) / 0.25) 60%, hsl(var(--parchment)) 100%)",
          }}
        >
          <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-4xl">
            <div
              className="rounded-[28px] border bg-parchment/85 backdrop-blur-sm shadow-[0_28px_70px_-40px_rgba(60,40,20,0.35)] overflow-hidden"
              style={{ borderColor: accentBorder }}
            >
              <HubAISupport
                heading={config.aiHeading}
                description={config.aiDescription}
                placeholder={config.aiPlaceholder}
                suggestions={config.aiPrompts}
                context={config.title}
                stageBg="--stage-toddler"
                stageAccent="--stage-toddler-accent"
              />
            </div>
            <p
              className="mt-6 text-center font-sans text-[13px] font-light tracking-wide max-w-lg mx-auto leading-relaxed"
              style={{ color: deepSoft }}
            >
              A quiet companion for the questions you'd rather not Google at 2am.
            </p>
          </div>
        </section>

        {/* ─── RELATED TOPICS ───────────────────────────────────────── */}
        <section className="py-20 md:py-24 bg-parchment">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            <div className="mb-8 md:mb-10">
              <SectionLabel>More toddler topics</SectionLabel>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/toddler/${r.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border bg-parchment px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-30px_rgba(60,40,20,0.28)]"
                  style={{ borderColor: accentBorder }}
                >
                  <div>
                    <p
                      className="font-sans text-[10.5px] font-light tracking-[0.26em] uppercase mb-1"
                      style={{ color: accent }}
                    >
                      {r.eyebrow}
                    </p>
                    <p
                      className="font-serif text-[1rem] leading-snug"
                      style={{ color: deep }}
                    >
                      {r.title}
                    </p>
                  </div>
                  <ChevronRight
                    size={15}
                    strokeWidth={1.8}
                    style={{ color: accent }}
                    className="shrink-0 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BACK TO HUB CTA ──────────────────────────────────────── */}
        <section className="pb-24 md:pb-28">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
            <span
              className="mx-auto block h-px w-10 mb-6"
              style={{ backgroundColor: accentMid }}
              aria-hidden
            />
            <p
              className="font-serif italic text-[15px] mb-6"
              style={{ color: deepSoft }}
            >
              Back to the wider Toddler hub when you're ready.
            </p>
            <Link
              to="/toddler"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-sans text-[13px] font-medium tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-26px_rgba(60,40,20,0.32)]"
              style={{
                borderColor: accentBorder,
                backgroundColor: accentSoft,
                color: deep,
              }}
            >
              Return to Toddler
              <ArrowRight size={14} strokeWidth={1.8} style={{ color: accent }} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ToddlerTopicPage;
