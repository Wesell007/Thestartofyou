import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, ShieldCheck, Home, Check } from "lucide-react";
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

interface Props {
  config: ToddlerTopicConfig;
}

const ToddlerTopicPage = ({ config }: Props) => {
  const accent = "hsl(var(--stage-toddler-accent))";
  const accentSoft = "hsl(var(--stage-toddler-accent) / 0.08)";
  const accentMid = "hsl(var(--stage-toddler-accent) / 0.22)";
  const accentBorder = "hsl(var(--stage-toddler-accent) / 0.18)";
  const accentBorderStrong = "hsl(var(--stage-toddler-accent) / 0.28)";
  const tintWash = "hsl(var(--stage-toddler) / 0.7)";
  const deep = "hsl(var(--stage-toddler-deep))";
  const deepSoft = "hsl(var(--stage-toddler-deep) / 0.72)";
  const deepMuted = "hsl(var(--stage-toddler-deep) / 0.55)";

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

  const heroCardShadow =
    "0 36px 80px -50px rgba(70,40,20,0.32), inset 0 1px 0 hsl(0 0% 100% / 0.65)";

  const imagePanelShadow =
    "0 28px 60px -34px rgba(70,40,20,0.42), inset 0 1px 0 hsl(0 0% 100% / 0.55)";

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main className="overflow-hidden">
        {/* ─── HERO ───────────────────────────────────────────────────── */}
        <section className="relative pt-8 sm:pt-12 md:pt-16 pb-16 md:pb-24">
          {/* apricot-to-parchment vertical wash */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[420px] md:h-[560px] -z-0"
            style={{
              background: `linear-gradient(180deg, ${tintWash} 0%, hsl(var(--stage-toddler) / 0.25) 55%, transparent 100%)`,
            }}
            aria-hidden
          />
          {/* soft apricot bloom behind the H1 */}
          <div
            className="pointer-events-none absolute -z-0 left-1/2 -translate-x-1/2 top-24 md:top-32 w-[680px] h-[420px] rounded-full blur-3xl opacity-60"
            style={{ background: "hsl(var(--stage-toddler-accent) / 0.18)" }}
            aria-hidden
          />

          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
            {/* Breadcrumb outside the hero card */}
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

            {/* Parchment hero card — image-led split */}
            <div
              className="relative bg-parchment rounded-[28px] border overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12"
              style={{
                borderColor: accentBorder,
                boxShadow: heroCardShadow,
              }}
            >
              <div className="relative grid grid-cols-1 md:grid-cols-12 md:gap-10 lg:gap-14 items-center">
                {/* Image — stacks on mobile (top), sits right on md+ */}
                <div className="md:col-span-5 md:order-2 mb-7 md:mb-0">
                  {config.heroImage ? (
                    <div
                      className="relative w-full overflow-hidden rounded-[22px] border aspect-[5/4] md:aspect-[4/5]"
                      style={{
                        borderColor: accentBorderStrong,
                        boxShadow: imagePanelShadow,
                      }}
                    >
                      <img
                        src={config.heroImage}
                        alt={`${config.title} — Toddler`}
                        loading="eager"
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ objectPosition: "center 30%" }}
                      />
                      {/* subtle inner highlight */}
                      <span
                        className="pointer-events-none absolute inset-0 rounded-[22px]"
                        style={{
                          boxShadow:
                            "inset 0 1px 0 hsl(0 0% 100% / 0.35), inset 0 0 0 1px hsl(0 0% 100% / 0.08)",
                        }}
                        aria-hidden
                      />
                    </div>
                  ) : (
                    /* TODO: upload hero image */
                    <div
                      className="w-full rounded-[22px] border aspect-[5/4] md:aspect-[4/5] grid place-items-center"
                      style={{
                        borderColor: accentBorder,
                        background:
                          "linear-gradient(160deg, hsl(var(--stage-toddler) / 0.6), hsl(var(--parchment)) 80%)",
                        boxShadow: imagePanelShadow,
                      }}
                      aria-hidden
                    >
                      <span
                        className="font-sans text-[11px] tracking-[0.28em] uppercase"
                        style={{ color: deepMuted }}
                      >
                        Image coming soon
                      </span>
                    </div>
                  )}
                </div>

                {/* Copy column */}
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
                    Toddler guide · {config.eyebrow}
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

                  {config.medicallyReviewed && (
                    <div className="mt-7 md:mt-8">
                      <span
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11.5px] font-light"
                        style={{
                          borderColor: accentBorderStrong,
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
            </div>
          </div>
        </section>

        {/* ─── WHAT THIS COVERS ─────────────────────────────────────── */}
        <section className="pb-16 md:pb-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
            <div
              className="relative bg-parchment rounded-[26px] border p-7 sm:p-10 md:p-12"
              style={{
                borderColor: accentBorder,
                boxShadow:
                  "0 28px 64px -40px rgba(70,40,20,0.28), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
              }}
            >
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
        </section>

        {/* ─── AI SUPPORT (now directly after What this covers) ─────── */}
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
                context={config.title}
                stageBg="--stage-toddler"
                stageAccent="--stage-toddler-accent"
              />
            </div>
            <p
              className="mt-7 text-center font-sans text-[12.5px] font-light tracking-wide max-w-lg mx-auto leading-relaxed"
              style={{ color: deepMuted }}
            >
              A quiet companion for the questions you'd rather not Google at 2am.
            </p>
          </div>
        </section>

        {/* ─── COMMON QUESTIONS ─────────────────────────────────────── */}
        <section className="py-20 md:py-24 bg-parchment">
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
                  className="group/q relative rounded-[18px] border bg-parchment px-6 md:px-7 overflow-hidden transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_42px_-26px_rgba(70,40,20,0.3)] data-[state=open]:shadow-[0_22px_50px_-30px_rgba(70,40,20,0.32)]"
                  style={{ borderColor: accentBorder }}
                >
                  <span
                    className="pointer-events-none absolute left-0 top-3 bottom-3 w-[2px] rounded-r opacity-0 group-data-[state=open]/q:opacity-100 transition-opacity"
                    style={{ background: accent }}
                    aria-hidden
                  />
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 group-data-[state=open]/q:opacity-100 transition-opacity"
                    style={{ background: accentSoft }}
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

        {/* ─── MORE TODDLER TOPICS ──────────────────────────────────── */}
        <section className="py-20 md:py-24 bg-parchment">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            <div className="mb-9 md:mb-11 flex flex-col items-start gap-3">
              <SectionLabel>More toddler topics</SectionLabel>
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
                  to={`/toddler/${r.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 rounded-[20px] border bg-parchment px-6 py-6 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_22px_50px_-30px_rgba(70,40,20,0.32)]"
                  style={{
                    borderColor: accentBorder,
                    boxShadow:
                      "0 14px 32px -28px rgba(70,40,20,0.22), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
                  }}
                >
                  <div>
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
                  <div className="flex items-center justify-end">
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

        {/* ─── BACK TO HUB CTA ──────────────────────────────────────── */}
        <section className="pb-28 md:pb-32">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
          <div
              className="relative rounded-[28px] border bg-parchment px-7 py-10 md:px-12 md:py-12 text-center overflow-hidden"
              style={{
                borderColor: accentBorder,
                boxShadow:
                  "0 32px 76px -42px rgba(70,40,20,0.34), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
              }}
            >
              <span
                className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-56 w-72 rounded-full blur-3xl opacity-60"
                style={{ background: "hsl(var(--stage-toddler) / 0.4)" }}
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
                Back to the wider Toddler hub when you're ready.
              </p>
              <Link
                to="/toddler"
                className="inline-flex items-center gap-2 rounded-full border px-7 py-3 font-sans text-[13px] font-medium tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_46px_-26px_rgba(70,40,20,0.4)]"
                style={{
                  borderColor: accentBorderStrong,
                  backgroundColor: accentSoft,
                  color: deep,
                }}
              >
                Return to Toddler
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

export default ToddlerTopicPage;
