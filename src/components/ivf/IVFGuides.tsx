import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import imgTimeline from "@/assets/article-hero-ivf-timeline.jpg";
import imgEmotional from "@/assets/article-hero-ivf-emotional.jpg";
import imgWhat from "@/assets/article-hero-what-ivf-is.jpg";
import imgFunding from "@/assets/article-hero-nhs-ivf-funding.jpg";
import imgOhss from "@/assets/article-hero-ohss-ivf.jpg";
import imgCycle from "@/assets/article-hero-ivf-cycle-not-work.jpg";
import imgIcsi from "@/assets/article-hero-ivf-vs-icsi.jpg";
import imgFresh from "@/assets/article-hero-fresh-vs-frozen.jpg";

export const IVF_HUB_GUIDES = [
  { group: "Start with IVF", title: "What IVF is: a UK guide", href: "/articles/what-ivf-is-uk-guide", image: imgWhat },
  { group: "Start with IVF", title: "IVF timeline, what to expect", href: "/articles/ivf-timeline-what-to-expect", image: imgTimeline },
  { group: "Start with IVF", title: "NHS IVF funding and eligibility", href: "/articles/nhs-ivf-funding-and-eligibility", image: imgFunding },
  { group: "Treatment and decisions", title: "IVF versus ICSI", href: "/articles/ivf-vs-icsi", image: imgIcsi },
  { group: "Treatment and decisions", title: "Fresh versus frozen embryo transfer", href: "/articles/fresh-vs-frozen-embryo-transfer", image: imgFresh },
  { group: "Treatment and decisions", title: "OHSS and IVF side effects", href: "/articles/ohss-and-ivf-side-effects", image: imgOhss },
  { group: "Emotions and outcomes", title: "The emotional impact of IVF", href: "/articles/emotional-impact-of-ivf", image: imgEmotional },
  { group: "Emotions and outcomes", title: "When an IVF cycle doesn't work", href: "/articles/when-an-ivf-cycle-does-not-work", image: imgCycle },
] as const;

const GROUPS = ["Start with IVF", "Treatment and decisions", "Emotions and outcomes"] as const;

const IVFGuides = () => (
  <section className="bg-background py-14 md:py-20" aria-labelledby="ivf-guide-library">
    <div className="container mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
      <p className="mb-3 font-sans text-[11px] font-light uppercase tracking-[0.2em] text-stage-ivf-accent">IVF guidance</p>
      <h2 id="ivf-guide-library" className="mb-3 font-serif text-3xl text-foreground sm:text-4xl">Understand each part of treatment</h2>
      <p className="mb-10 max-w-2xl font-sans text-[15px] font-light leading-relaxed text-muted-foreground">Eight guides for the process, the decisions, and the emotional side of IVF.</p>
      <div className="space-y-12">
        {GROUPS.map((group) => (
          <div key={group}>
            <h3 className="mb-5 border-b border-border/50 pb-3 font-sans text-xs font-medium uppercase tracking-[0.15em] text-stage-ivf-accent">{group}</h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {IVF_HUB_GUIDES.filter((guide) => guide.group === group).map((guide) => (
                <article key={guide.href} className="overflow-hidden rounded-lg border border-border/60 bg-card">
                  <img src={guide.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
                  <div className="p-5"><h4 className="mb-4 font-serif text-xl leading-snug text-foreground">{guide.title}</h4><Link to={guide.href} className="inline-flex items-center gap-2 font-sans text-[13px] font-medium text-stage-ivf-accent hover:text-foreground">Read guide <ArrowUpRight size={13} /></Link></div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default IVFGuides;