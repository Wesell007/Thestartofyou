import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const pathways = [
  {
    label: "Next Stage",
    title: "First year hub",
    sub: "Growth, milestones, and finding your rhythm",
    href: "/first-year",
  },
  {
    label: "Support",
    title: "Support hub",
    sub: "For moments that feel uncertain, heavy, or hard",
    href: "/support",
  },
  {
    label: "Preparation",
    title: "Preparing for your baby",
    sub: "Looking back at what helped before birth",
    href: "/preparing-for-baby",
  },
  {
    label: "Journey",
    title: "Explore your journey",
    sub: "Return to the full journey overview",
    href: "/explore",
  },
];

const PostpartumPathways = () => {
  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.35)' }}
    >
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="mb-14">
          <p
            className="font-sans text-xs font-light tracking-[0.2em] uppercase mb-5"
            style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
          >
            Continue
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-lg">
            Where to go next
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {pathways.map((p, i) => (
            <Link
              key={i}
              to={p.href}
              className="group bg-card border border-border/50 rounded-lg p-7 shadow-card-brand flex flex-col gap-3 transition-all hover:shadow-soft"
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-postpartum-accent) / 0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
            >
              <span className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                {p.label}
              </span>
              <h3 className="font-serif text-xl text-foreground group-hover:text-sage transition-colors">
                {p.title}
              </h3>
              <p className="font-serif italic text-sm text-foreground/60 leading-snug">
                {p.sub}
              </p>
              <span className="mt-auto pt-3 flex items-center gap-1 font-sans text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'hsl(var(--stage-postpartum-accent))' }}>
                Explore <ArrowUpRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostpartumPathways;
