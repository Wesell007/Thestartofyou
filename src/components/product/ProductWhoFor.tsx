import { Heart, Camera, Feather, Gift, BookMarked } from "lucide-react";

const audiences = [
  {
    icon: Feather,
    title: "First-time mums",
    desc: "A gentle place to follow each week and notice what is changing.",
  },
  {
    icon: Heart,
    title: "Parents who want to remember",
    desc: "Some moments feel small now, but become precious later.",
  },
  {
    icon: BookMarked,
    title: "When pregnancy feels emotional",
    desc: "Space to write honestly without needing every feeling to be neat.",
  },
  {
    icon: Gift,
    title: "Baby shower gifting",
    desc: "A thoughtful gift that feels personal, useful and lasting.",
  },
  {
    icon: Camera,
    title: "Keepsakes and scan photos",
    desc: "Built-in pockets and pages for the little things you do not want to lose.",
  },
];

const ProductWhoFor = () => {
  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="text-center mb-10 md:mb-12">
          <div className="editorial-rule mx-auto mb-5" />
          <p className="stage-label mb-3">Made for</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-snug mb-4">
            The moments you want somewhere to hold.
          </h2>
          <p className="font-sans text-sm sm:text-base font-light text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Whether pregnancy feels exciting, emotional, overwhelming or all of those things at once, the journal gives you a calm place to write, keep and remember.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="bg-gradient-to-br from-white via-[#FBF8F1] to-[#F4EFE4] border border-border/30 rounded-2xl p-6 shadow-soft"
            >
              <div className="w-9 h-9 rounded-lg bg-sage/15 border border-sage/20 flex items-center justify-center mb-4">
                <a.icon size={15} className="text-sage" />
              </div>
              <h3 className="font-serif text-base text-foreground mb-1.5">
                {a.title}
              </h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductWhoFor;
