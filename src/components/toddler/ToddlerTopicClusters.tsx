import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Heart,
  MessageCircle,
  Moon,
  Shield,
  Sparkles,
  Sprout,
  Sun,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { toddlerTopicConfigs, type ToddlerTopicSlug } from "@/data/toddlerTopicData";

const topicOrder: ToddlerTopicSlug[] = [
  "development-milestones",
  "behaviour-emotions",
  "speech-language",
  "sleep",
  "food-feeding",
  "potty-learning",
  "health-safety",
  "play-connection",
];

const icons: Record<ToddlerTopicSlug, LucideIcon> = {
  "development-milestones": Sparkles,
  "behaviour-emotions": Heart,
  "speech-language": MessageCircle,
  sleep: Moon,
  "food-feeding": Utensils,
  "potty-learning": Sprout,
  "health-safety": Shield,
  "play-connection": Sun,
};

const ToddlerTopicClusters = () => (
  <section id="toddler-topics" className="relative overflow-hidden bg-stage-toddler/30 py-16 md:py-24">
    <div className="container mx-auto max-w-6xl px-5 sm:px-8 md:px-10">
      <header className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
        <span className="mx-auto mb-5 block h-px w-10 bg-stage-toddler-accent/50" aria-hidden />
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-stage-toddler-accent">Toddler topics</p>
        <h2 className="mt-3 font-serif text-[2rem] leading-tight text-stage-toddler-deep md:text-[2.5rem]">Start with what is happening today</h2>
        <p className="mx-auto mt-4 max-w-xl font-sans text-[15px] font-light leading-relaxed text-stage-toddler-deep/70">
          Eight clear ways into the questions that shape family life from one to three.
        </p>
      </header>

      <nav aria-label="Toddler topics" className="grid grid-cols-1 gap-px overflow-hidden border-y border-stage-toddler-accent/25 bg-stage-toddler-accent/25 md:grid-cols-2">
        {topicOrder.map((slug, index) => {
          const topic = toddlerTopicConfigs[slug];
          const Icon = icons[slug];
          return (
            <Link
              key={slug}
              to={`/toddler/${slug}`}
              className="group relative flex min-h-[190px] items-start gap-5 bg-parchment p-6 transition-colors duration-300 motion-reduce:transition-none hover:bg-stage-toddler-soft/55 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-stage-toddler-accent md:p-8"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-stage-toddler-accent/35 bg-stage-toddler/45 text-stage-toddler-accent" aria-hidden>
                <Icon size={18} strokeWidth={1.6} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-sans text-[10.5px] font-medium uppercase tracking-[0.24em] text-stage-toddler-accent">{topic.eyebrow}</span>
                <span className="mt-2 font-serif text-[1.4rem] leading-snug text-stage-toddler-deep">{topic.title}</span>
                <span className="mt-3 max-w-md font-sans text-[14px] font-light leading-relaxed text-stage-toddler-deep/70">{topic.whatThisCovers.lead}</span>
                <span className="mt-auto flex items-center justify-between pt-5 font-sans text-[12.5px] font-medium text-stage-toddler-accent">
                  Explore this topic
                  <ArrowUpRight size={16} className="transition-transform duration-300 motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </span>
              <span className="absolute right-5 top-4 font-serif text-[3.5rem] text-stage-toddler-accent/10" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  </section>
);

export default ToddlerTopicClusters;
