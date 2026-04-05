import { Link } from "react-router-dom";
import ttcImg from "@/assets/guidance-ttc.jpg";
import ivfImg from "@/assets/guidance-ivf.jpg";
import pregnancyImg from "@/assets/guidance-featured-pregnancy.jpg";
import postpartumImg from "@/assets/guidance-postpartum.jpg";
import firstyearImg from "@/assets/guidance-firstyear.jpg";
import supportImg from "@/assets/guidance-support.jpg";
import preparingImg from "@/assets/guidance-preparing.jpg";

const pathways = [
  { label: "Trying to conceive", href: "/trying-to-conceive", description: "Cycles, timing, and support", image: ttcImg },
  { label: "IVF", href: "/ivf", description: "Treatment, timelines, emotions", image: ivfImg },
  { label: "Pregnancy", href: "/pregnancy", description: "Week by week guidance", image: pregnancyImg },
  { label: "Preparing", href: "/preparing-for-baby", description: "Getting ready, practically and emotionally", image: preparingImg },
  { label: "Postpartum", href: "/postpartum", description: "Recovery and adjustment", image: postpartumImg },
  { label: "First year", href: "/first-year", description: "Growth, sleep, milestones", image: firstyearImg },
  { label: "Support", href: "/support", description: "When things feel hard", image: supportImg },
];

const GuidanceJourneyPathways = () => (
  <section className="bg-card/60 py-20 md:py-28">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="text-center mb-12 md:mb-14">
        <p className="stage-label mb-4">Continue your journey</p>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
          Explore by stage
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
          Each stage has its own dedicated hub with guidance, tools, and support.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {pathways.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="group block rounded-2xl bg-parchment border border-border/30 hover:border-sage/20 hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <div className="aspect-[3/2] overflow-hidden">
              <img
                src={item.image}
                alt={item.label}
                loading="lazy"
                width={640}
                height={512}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-4 md:p-5 text-center">
              <span className="font-serif text-sm md:text-base text-foreground group-hover:text-sage transition-colors block mb-1">
                {item.label}
              </span>
              <span className="font-sans text-[11px] font-light text-muted-foreground leading-snug">
                {item.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default GuidanceJourneyPathways;
