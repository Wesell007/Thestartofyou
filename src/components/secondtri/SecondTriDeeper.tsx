import { Link } from "react-router-dom";
import {
  Sprout,
  Sparkles,
  ShieldCheck,
  Apple,
  Footprints,
  Brain,
  CalendarDays,
  Baby,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DeeperLink {
  label: string;
  href: string;
  Icon: LucideIcon;
}

const links: DeeperLink[] = [
  { label: "Your body", href: "/pregnancy/body", Icon: Sprout },
  { label: "Your baby", href: "/pregnancy/baby", Icon: Sparkles },
  { label: "Health & safety", href: "/pregnancy/health-and-safety", Icon: ShieldCheck },
  { label: "Eating well", href: "/pregnancy/diet-and-exercise", Icon: Apple },
  { label: "Movement", href: "/articles/moving-your-body-in-pregnancy", Icon: Footprints },
  { label: "Mental health", href: "/articles/anxiety-in-pregnancy", Icon: Brain },
  { label: "Planning ahead", href: "/pregnancy/preparing-for-baby", Icon: CalendarDays },
  { label: "Preparing for birth", href: "/preparing-for-baby", Icon: Baby },
];

const SecondTriDeeper = () => {
  return (
    <section className="bg-parchment-dark pb-16 md:pb-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="mb-8 md:mb-10">
          <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted mb-2">
            Continue exploring
          </p>
          <h2 className="font-serif text-[1.4rem] sm:text-[1.6rem] text-foreground leading-tight">
            Where to go deeper
          </h2>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-6 sm:gap-y-7">
          {links.map(({ label, href, Icon }) => (
            <li key={href}>
              <Link
                to={href}
                className="group flex flex-col items-center gap-2.5 text-center"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-full border border-border/40 bg-card text-sage-muted group-hover:border-sage/50 group-hover:text-sage group-hover:bg-sage-bg/40 transition-all">
                  <Icon size={17} strokeWidth={1.5} />
                </span>
                <span className="font-sans text-[12.5px] text-foreground/70 group-hover:text-foreground transition-colors leading-tight">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SecondTriDeeper;
