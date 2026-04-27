import { Link } from "react-router-dom";
import {
  HeartHandshake,
  Flower2,
  Footprints,
  Brain,
  Users,
  Briefcase,
  Sparkles,
  Baby,
  Stethoscope,
  ScanLine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface TrimesterTopicLink {
  label: string;
  href: string;
  hint?: string;
  icon?: keyof typeof iconMap;
}

const iconMap = {
  trying: HeartHandshake,
  fertility: Flower2,
  movement: Footprints,
  mental: Brain,
  partner: Users,
  back: Briefcase,
  postpartum: Sparkles,
  baby: Baby,
  health: Stethoscope,
  scans: ScanLine,
} as const;

interface Props {
  eyebrow?: string;
  title?: string;
  intro?: string;
  topics: TrimesterTopicLink[];
  bg?: string;
}

const TrimesterTopicConnection = ({
  eyebrow,
  title = "Where to go deeper",
  intro,
  topics,
  bg = "bg-parchment",
}: Props) => {
  if (!topics?.length) return null;

  return (
    <section className={`${bg} pt-10 pb-14 sm:pt-12 sm:pb-16`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="mb-7 sm:mb-9">
          {eyebrow && (
            <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted mb-2">
              {eyebrow}
            </p>
          )}
          <h2 className="font-serif text-[1.3rem] sm:text-[1.5rem] text-foreground leading-tight">
            {title}
          </h2>
          {intro && (
            <p className="mt-2 font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed max-w-2xl">
              {intro}
            </p>
          )}
        </div>

        {/* Quiet horizontal icon row — scrolls on mobile, wraps on tablet+ */}
        <ul className="flex gap-x-6 sm:gap-x-8 gap-y-5 overflow-x-auto sm:flex-wrap scrollbar-none -mx-1 px-1">
          {topics.map((topic) => {
            const Icon: LucideIcon = topic.icon ? iconMap[topic.icon] : Sparkles;
            return (
              <li key={topic.href} className="shrink-0">
                <Link
                  to={topic.href}
                  className="group flex flex-col items-center gap-2 text-center min-w-[92px] sm:min-w-[110px]"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full border border-border/40 bg-card text-sage-muted group-hover:border-sage/50 group-hover:text-sage group-hover:bg-sage-bg/30 transition-all">
                    <Icon size={16} strokeWidth={1.5} />
                  </span>
                  <span className="font-sans text-[12px] font-light text-muted-foreground group-hover:text-foreground transition-colors leading-tight whitespace-nowrap">
                    {topic.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default TrimesterTopicConnection;
