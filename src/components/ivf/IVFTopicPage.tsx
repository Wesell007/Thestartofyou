import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowRight, ArrowUpRight, Check, ChevronRight, Heart, NotebookPen } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import IVFCompanion from "@/components/ivf/IVFCompanion";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import type { IVFDestination, IVFTopicConfig } from "@/data/ivfTopicData";
import { IVF_TOPIC_ORDER, ivfTopicConfigs } from "@/data/ivfTopicData";
import imgIvfTimeline from "@/assets/article-hero-ivf-timeline.jpg";
import imgIvfEmotional from "@/assets/article-hero-ivf-emotional.jpg";
import imgWhatIvf from "@/assets/article-hero-what-ivf-is.jpg";
import imgFunding from "@/assets/article-hero-nhs-ivf-funding.jpg";
import imgOhss from "@/assets/article-hero-ohss-ivf.jpg";
import imgCycle from "@/assets/article-hero-ivf-cycle-not-work.jpg";
import imgIcsi from "@/assets/article-hero-ivf-vs-icsi.jpg";
import imgFresh from "@/assets/article-hero-fresh-vs-frozen.jpg";
import imgChemical from "@/assets/ttc-chemical-pregnancy.jpg";
import imgTests from "@/assets/article-hero-tests-scans.jpg";
import imgEarly from "@/assets/article-hero-early-symptoms.jpg";
import imgSupport from "@/assets/guidance-support.jpg";

const THUMBS: Record<string, string> = {
  "/articles/ivf-timeline-what-to-expect": imgIvfTimeline,
  "/articles/emotional-impact-of-ivf": imgIvfEmotional,
  "/articles/what-ivf-is-uk-guide": imgWhatIvf,
  "/articles/nhs-ivf-funding-and-eligibility": imgFunding,
  "/articles/ohss-and-ivf-side-effects": imgOhss,
  "/articles/when-an-ivf-cycle-does-not-work": imgCycle,
  "/articles/ivf-vs-icsi": imgIcsi,
  "/articles/fresh-vs-frozen-embryo-transfer": imgFresh,
  "/articles/chemical-pregnancy": imgChemical,
  "/articles/pregnancy-after-loss": imgChemical,
  "/articles/tests-and-scans-in-pregnancy": imgTests,
  "/articles/bleeding-in-early-pregnancy": imgEarly,
  "/articles/twins-and-multiples-in-pregnancy": imgTests,
  "/articles/perinatal-anxiety": imgIvfEmotional,
};

const ActionLink = ({ item, children }: { item: IVFDestination; children?: React.ReactNode }) => (
  <Link to={item.href} className="inline-flex items-center gap-2 font-sans text-[13px] font-medium text-stage-ivf-accent hover:text-foreground">
    {children ?? item.label}<ArrowUpRight size={13} aria-hidden="true" />
  </Link>
);

const IVFTopicPage = ({ config }: { config: IVFTopicConfig }) => {
  const siblings = IVF_TOPIC_ORDER.filter((slug) => slug !== config.slug).map((slug) => ivfTopicConfigs[slug]);
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    { name: "IVF", url: "/ivf" },
    { name: config.title, url: `/ivf/${config.slug}` },
  ];

  useEffect(() => {
    document.title = `${config.title} | IVF | The Start of You`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", config.intro.slice(0, 158));
    try {
      sessionStorage.setItem("ivf:lastStage", JSON.stringify({ slug: config.slug, title: config.title, href: `/ivf/${config.slug}` }));
    } catch {
      // The page remains usable if session storage is unavailable.
    }
  }, [config]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <main>
        <section className="bg-parchment pt-28 pb-12 md:pt-32 md:pb-16">
          <div className="container mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-7 grid items-center gap-8 md:grid-cols-[1fr_0.8fr] md:gap-14">
              <div>
                <p className="mb-4 font-sans text-[11px] font-light uppercase tracking-[0.22em] text-stage-ivf-accent">{config.stageIndicator}</p>
                <h1 className="mb-5 font-serif text-4xl leading-tight text-foreground sm:text-5xl">{config.title}</h1>
                <p className="max-w-xl font-sans text-base font-light leading-relaxed text-muted-foreground">{config.intro}</p>
              </div>
              <img src={config.heroImage} alt={`${config.title} IVF stage`} className="aspect-[4/3] w-full rounded-lg object-cover" />
            </div>
          </div>
        </section>

        <section className="bg-background py-12 md:py-16">
          <div className="container mx-auto max-w-5xl px-5 sm:px-6 md:px-10">
            <div className="grid gap-7 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
              <div>
                <p className="mb-3 font-sans text-[11px] font-light uppercase tracking-[0.2em] text-stage-ivf-accent">What this covers</p>
                <p className="font-serif text-xl leading-relaxed text-foreground/80">{config.whatThisCovers.lead}</p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {config.whatThisCovers.bullets.map((bullet) => <li key={bullet} className="flex gap-3 font-sans text-sm font-light leading-relaxed text-muted-foreground"><Check size={15} className="mt-1 shrink-0 text-stage-ivf-accent" />{bullet}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-parchment-dark py-14 md:py-20" aria-labelledby="ivf-guides-heading">
          <div className="container mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
            <p className="mb-3 font-sans text-[11px] font-light uppercase tracking-[0.2em] text-stage-ivf-accent">Guidance for this stage</p>
            <h2 id="ivf-guides-heading" className="mb-8 font-serif text-3xl text-foreground">Read when you need it</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {config.guides.map((guide) => (
                <article key={guide.href} className={`overflow-hidden rounded-lg border border-border/60 bg-card ${guide.featured ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                  <img src={THUMBS[guide.href] ?? config.heroImage} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
                  <div className="p-5">
                    <h3 className="mb-2 font-serif text-xl leading-snug text-foreground">{guide.label}</h3>
                    <p className="mb-5 font-sans text-sm font-light leading-relaxed text-muted-foreground">{guide.description}</p>
                    <ActionLink item={guide}>Read guide</ActionLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {config.protocolWeek && (
          <section className="bg-background py-14 md:py-20">
            <div className="container mx-auto max-w-5xl px-5 sm:px-6 md:px-10">
              <h2 className="mb-3 font-serif text-3xl text-foreground">{config.protocolWeek.title}</h2>
              {config.protocolWeek.intro && <p className="mb-8 max-w-2xl font-sans text-sm font-light leading-relaxed text-muted-foreground">{config.protocolWeek.intro}</p>}
              <ol className="border-l border-stage-ivf-accent/25 pl-6">
                {config.protocolWeek.items.map((item) => <li key={item.day} className="relative pb-7 last:pb-0"><span className="absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full bg-stage-ivf-accent" /><h3 className="mb-1 font-sans text-xs font-medium uppercase tracking-[0.15em] text-stage-ivf-accent">{item.day}</h3><p className="font-sans text-sm font-light leading-relaxed text-muted-foreground">{item.body}</p></li>)}
              </ol>
            </div>
          </section>
        )}

        {config.handoverNote && (
          <section className="bg-background py-14 md:py-20">
            <div className="container mx-auto max-w-5xl px-5 sm:px-6 md:px-10">
              <div className="grid gap-8 md:grid-cols-2 md:gap-14">
                <div><p className="mb-3 font-sans text-[11px] uppercase tracking-[0.2em] text-stage-ivf-accent">Moving forward</p><h2 className="mb-4 font-serif text-3xl">{config.handoverNote.title}</h2><p className="mb-5 font-sans text-sm font-light leading-relaxed text-muted-foreground">{config.handoverNote.when}</p><p className="mb-5 font-sans text-sm font-light leading-relaxed text-muted-foreground">{config.handoverNote.who}</p><ActionLink item={config.handoverNote.destination} /></div>
                <ul className="space-y-3">{config.handoverNote.signals.map((signal) => <li key={signal} className="flex gap-3 font-sans text-sm font-light text-muted-foreground"><Check size={15} className="mt-1 shrink-0 text-stage-ivf-accent" />{signal}</li>)}</ul>
              </div>
            </div>
          </section>
        )}

        <section className="bg-stage-ivf/10 py-14 md:py-20">
          <div className="container mx-auto grid max-w-5xl gap-8 px-5 sm:px-6 md:grid-cols-2 md:px-10 md:gap-14">
            <div><div className="mb-4 flex items-center gap-2 text-stage-ivf-accent"><Check size={16} /><h2 className="font-serif text-2xl">What can be common</h2></div><ul className="space-y-3">{config.normalVsSupport.normal.map((item) => <li key={item} className="font-sans text-sm font-light leading-relaxed text-muted-foreground">{item}</li>)}</ul></div>
            <div><div className="mb-4 flex items-center gap-2 text-destructive"><AlertCircle size={16} /><h2 className="font-serif text-2xl text-foreground">When to contact your clinic</h2></div><ul className="space-y-3">{config.normalVsSupport.seek.map((item) => <li key={item} className="font-sans text-sm font-light leading-relaxed text-muted-foreground">{item}</li>)}</ul></div>
          </div>
        </section>

        {config.tool && <section className="bg-background py-10"><div className="container mx-auto max-w-5xl px-5 sm:px-6 md:px-10"><div className="flex flex-col justify-between gap-4 border-y border-border/50 py-7 sm:flex-row sm:items-center"><div><p className="mb-1 font-sans text-[11px] uppercase tracking-[0.2em] text-stage-ivf-accent">Timeline tool</p><h2 className="font-serif text-2xl">{config.tool.label}</h2><p className="mt-1 font-sans text-sm font-light text-muted-foreground">{config.tool.description}</p></div><ActionLink item={config.tool}>Use timeline</ActionLink></div></div></section>}

        <IVFCompanion prompts={config.aiPrompts} context={`${config.title} IVF guidance`} />

        <section className="bg-parchment-dark py-14 md:py-20">
          <div className="container mx-auto grid max-w-5xl gap-8 px-5 sm:px-6 md:grid-cols-2 md:px-10 md:gap-14">
            <div><p className="mb-3 font-sans text-[11px] uppercase tracking-[0.2em] text-stage-ivf-accent">{config.emotionalNote.eyebrow}</p><blockquote className="mb-4 font-serif text-2xl italic leading-snug text-foreground">“{config.emotionalNote.quote}”</blockquote><p className="font-sans text-sm font-light leading-relaxed text-muted-foreground">{config.emotionalNote.body}</p></div>
            <div className="border-l border-stage-ivf-accent/20 pl-6"><NotebookPen className="mb-4 text-stage-ivf-accent" size={20} /><p className="mb-5 font-sans text-sm font-light leading-relaxed text-muted-foreground">{config.journalNote.line}</p><ActionLink item={config.journalNote.destination}>{config.journalNote.cta}</ActionLink>{config.supportAction && <div className="mt-5"><ActionLink item={config.supportAction} /></div>}</div>
          </div>
        </section>

        <section className="bg-background py-12 md:py-16">
          <div className="container mx-auto max-w-5xl px-5 sm:px-6 md:px-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {config.prevTopic && <Link to={config.prevTopic.href} className="rounded-lg border border-border/60 bg-card p-5"><span className="block font-sans text-[10px] uppercase tracking-[0.18em] text-stage-ivf-accent">Previous stage</span><span className="mt-1 flex items-center gap-2 font-serif text-lg"><ChevronRight className="rotate-180" size={15} />{config.prevTopic.label}</span></Link>}
              {config.nextTopic && <Link to={config.nextTopic.href} className="rounded-lg border border-border/60 bg-card p-5 text-right sm:col-start-2"><span className="block font-sans text-[10px] uppercase tracking-[0.18em] text-stage-ivf-accent">Next</span><span className="mt-1 flex items-center justify-end gap-2 font-serif text-lg">{config.nextTopic.label}<ChevronRight size={15} /></span></Link>}
            </div>
            <div className="mt-10 text-center"><Link to="/ivf" className="font-sans text-sm font-light text-muted-foreground hover:text-foreground">Back to the IVF hub</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IVFTopicPage;