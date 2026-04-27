import { Link } from "react-router-dom";
import {
  HeartHandshake,
  Flower2,
  Apple,
  Footprints,
  Brain,
  Users,
  Briefcase,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DeeperLink {
  label: string;
  href: string;
  Icon: LucideIcon;
}

const links: DeeperLink[] = [
  { label: "Trying to conceive", href: "/trying-to-conceive", Icon: HeartHandshake },
  { label: "Fertility & IVF", href: "/ivf", Icon: Flower2 },
  { label: "Nutrition", href: "/articles/when-you-cant-face-food-in-pregnancy", Icon: Apple },
  { label: "Exercise & movement", href: "/pregnancy/diet-and-exercise", Icon: Footprints },
  { label: "Mental health", href: "/articles/anxiety-in-pregnancy", Icon: Brain },
  { label: "Partner support", href: "/pregnancy/feelings", Icon: Users },
  { label: "Back to work", href: "/articles/working-through-pregnancy", Icon: Briefcase },
  { label: "Postpartum", href: "/postpartum", Icon: Sparkles },
];

const FirstTriDeeper = () => {
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

        <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-7">
          {links.map(({ label, href, Icon }) => (
            <li key={href}>
              <Link
                to={href}
                className="group flex flex-col items-center gap-2.5 text-center"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-full border border-border/40 bg-card text-sage-muted group-hover:border-sage/50 group-hover:text-sage group-hover:bg-sage-bg/40 transition-all">
                  <Icon size={17} strokeWidth={1.5} />
                </span>
                <span className="font-sans text-[12.5px] font-light text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
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

export default FirstTriDeeper;
