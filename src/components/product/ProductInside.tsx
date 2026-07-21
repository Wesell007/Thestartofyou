import { PenLine, BookOpen, Sparkles, RotateCcw, Camera, Heart } from "lucide-react";
import journalKeepsakes from "@/assets/journal-keepsakes.jpg";

const features = [
  {
    icon: PenLine,
    title: "Thoughtful weekly prompts",
    desc: "Stage-specific questions that meet you where you are — not where you should be. From early pregnancy through the first year.",
  },
  {
    icon: BookOpen,
    title: "Open reflection space",
    desc: "Room to write freely when the prompts are not enough and you need to say more. Lined pages for your own words.",
  },
  {
    icon: Camera,
    title: "Keepsake pockets & photo pages",
    desc: "Built-in pockets and dedicated pages for scan photos, milestone cards, baby shower memories, and treasured mementos.",
  },
  {
    icon: Sparkles,
    title: "Milestone & firsts tracking",
    desc: "Record your first scan, first kick, first time hearing the heartbeat — moments you think you will remember but quietly fade.",
  },
  {
    icon: Heart,
    title: "A gift that keeps giving",
    desc: "Beautiful enough to gift, meaningful enough to keep forever. The most thoughtful gift for an expecting mum.",
  },
  {
    icon: RotateCcw,
    title: "Built to revisit",
    desc: "A format designed to read back in weeks, months, or years and feel something again. A keepsake for life.",
  },
];

const ProductInside = () => {
  return (
    <section id="journal-details" className="relative bg-card py-14 md:py-20 overflow-hidden scroll-mt-24">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">
          {/* Left heading + image */}
          <div className="text-center md:text-left">
            <div className="editorial-rule md:editorial-rule-left mb-5" />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground mb-3 leading-snug">
              What you will find inside
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-sm mx-auto md:mx-0 mb-8">
              144 pages of guided structure, emotional space, and keepsake quality — designed to feel thoughtful, never overwhelming.
            </p>

            {/* Interior image */}
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={journalKeepsakes}
                alt="Journal open to Memories and Keepsakes page with scan photos and mementos"
                className="w-full object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>

            {/* Product specs strip */}
            <div className="mt-5 flex flex-wrap gap-2.5 justify-center md:justify-start">
              {["Hardback", "A5 format", "144 pages", "Gift-ready"].map((spec) => (
                <span key={spec} className="bg-sage/8 border border-sage/15 rounded-pill px-3.5 py-1.5 font-sans text-[11px] font-light text-foreground/70">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Right: feature list */}
          <div className="space-y-3.5">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4 bg-parchment/50 border border-border/20 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-lg bg-sage/10 flex items-center justify-center shrink-0">
                  <f.icon size={15} className="text-sage" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-foreground mb-1">{f.title}</h3>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInside;
