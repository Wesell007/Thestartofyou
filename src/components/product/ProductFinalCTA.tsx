import { ExternalLink, BookOpen, Gift, Heart } from "lucide-react";

const ProductFinalCTA = () => {
  return (
    <section className="page-ending frame-corner overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
        <div className="editorial-rule mb-8" />
        <p className="stage-label mb-5">Your Journey</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.8rem] text-foreground mb-5 leading-tight">
          A place to come back to,{" "}
          <span className="italic">long after the journey ends</span>
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto mb-8">
          The thoughts you capture now will mean something different in a year. Having somewhere to hold them is the gift. For yourself, or for someone you love.
        </p>

        {/* Value anchors */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            { icon: BookOpen, label: "Guided prompts" },
            { icon: Heart, label: "Emotional keepsake" },
            { icon: Gift, label: "A meaningful gift" },
          ].map((v) => (
            <div key={v.label} className="flex items-center gap-2 text-center">
              <v.icon size={14} className="text-sage" />
              <span className="font-sans text-xs font-light text-muted-foreground">{v.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-2.5">
          <a
            href="#"
            className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-10 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Get the journal
            <ExternalLink size={14} />
          </a>
          <span className="inline-flex items-center gap-1.5 font-sans text-xs font-light text-muted-foreground">
            <BookOpen size={11} className="text-sage" />
            Available on Amazon
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProductFinalCTA;
