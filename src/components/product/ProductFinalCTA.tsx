import { ExternalLink, BookOpen, Gift, Heart, Star, Package } from "lucide-react";
import journalCoverHand from "@/assets/journal-cover-hand.jpg";

const ProductFinalCTA = () => {
  return (
    <section className="page-ending frame-corner overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          {/* Left: emotional close + image */}
          <div className="text-center md:text-left">
            <div className="editorial-rule md:editorial-rule-left mb-6" />
            <p className="stage-label mb-3">Worth having now</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.5rem] text-foreground mb-4 leading-tight">
              A place to come back to,{" "}
              <span className="italic">long after</span>
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-md mb-6">
              The thoughts you write now will mean something different in a year. The moments you think you will remember are already fading. Having somewhere to hold them is the gift.
            </p>

            {/* Product image */}
            <div className="rounded-2xl overflow-hidden shadow-elevated mb-6">
              <img
                src={journalCoverHand}
                alt="Hands holding The Start of You journal with pen ready to write"
                className="w-full object-cover aspect-[16/10]"
                loading="lazy"
              />
            </div>

            {/* Value anchors */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {[
                { icon: BookOpen, label: "144 guided pages" },
                { icon: Heart, label: "Emotional keepsake" },
                { icon: Gift, label: "A meaningful gift" },
                { icon: Package, label: "Hardback A5" },
              ].map((v) => (
                <div key={v.label} className="flex items-center gap-2">
                  <v.icon size={13} className="text-sage" />
                  <span className="font-sans text-xs font-light text-muted-foreground">{v.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="card-elevated p-8 text-center" style={{ borderTopColor: 'hsl(var(--terracotta))', borderTopWidth: '2px' }}>
            <div className="flex gap-0.5 justify-center mb-3">
              {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-terracotta fill-terracotta" />)}
            </div>
            <p className="font-serif text-lg text-foreground mb-1">The Start of You Journal</p>
            <p className="font-sans text-xs font-light text-muted-foreground mb-2">Guided pregnancy & postpartum journal</p>
            
            {/* Specs */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {["Hardback", "A5", "144 pages", "Gift-ready"].map((s) => (
                <span key={s} className="bg-sage/8 border border-sage/15 rounded-pill px-3 py-1 font-sans text-[10px] font-light text-foreground/60">
                  {s}
                </span>
              ))}
            </div>

            <a
              href="#"
              className="flex items-center justify-center gap-2.5 w-full bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all mb-3"
            >
              Get the journal on Amazon
              <ExternalLink size={14} />
            </a>
            <p className="font-sans text-[11px] font-light text-muted-foreground mb-4">
              For yourself, or for someone who deserves a place to hold onto their journey.
            </p>

            {/* Gift messaging */}
            <div className="bg-parchment/50 border border-border/20 rounded-xl p-4">
              <p className="font-serif text-xs italic text-foreground mb-1">The most thoughtful gift for an expecting mum</p>
              <p className="font-sans text-[11px] font-light text-muted-foreground">
                Beautiful design combined with practical function. A keepsake she will treasure forever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFinalCTA;
