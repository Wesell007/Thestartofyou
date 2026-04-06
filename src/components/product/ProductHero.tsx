import { ExternalLink, BookOpen } from "lucide-react";
import productHero from "@/assets/product-hero.jpg";

const ProductHero = () => {
  return (
    <section className="relative bg-parchment overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[400px] glow-sage" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Copy */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto md:mx-0">
            <p className="stage-label flanking-lines md:flanking-lines mb-5 animate-fade-up">The Start of You Journal</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] text-foreground leading-[1.08] mb-5 animate-fade-up [animation-delay:0.05s]">
              Hold onto what matters,{" "}
              <span className="italic">before it slips away</span>
            </h1>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8 animate-fade-up [animation-delay:0.1s] max-w-md">
              A guided pregnancy journal for capturing thoughts, feelings, and moments you will want to remember. From the first weeks through to life after birth.
            </p>

            {/* Trust anchors */}
            <div className="flex flex-wrap gap-5 mb-8 animate-fade-up [animation-delay:0.15s] justify-center md:justify-start">
              {[
                { num: "40+", label: "Weeks of prompts" },
                { num: "4", label: "Life stages" },
                { num: "1", label: "Keepsake for life" },
              ].map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <span className="font-serif text-xl text-foreground">{s.num}</span>
                  <p className="font-sans text-[10px] font-light text-muted-foreground tracking-wide uppercase mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="animate-fade-up [animation-delay:0.2s] flex flex-col items-center md:items-start gap-2">
              <a
                href="#"
                className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
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

          {/* Image */}
          <div className="flex justify-center md:justify-end">
            <div className="max-w-sm md:max-w-md w-full relative group">
              <img
                src={productHero}
                alt="A pregnant woman writing in a journal by the window"
                width={1280}
                height={960}
                className="w-full rounded-2xl shadow-elevated object-cover group-hover:shadow-card-hover transition-shadow duration-500"
              />
              {/* Floating pull-quote */}
              <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:left-4 bg-card/90 backdrop-blur-sm rounded-xl p-4 border border-border/30 shadow-soft max-w-[220px]">
                <p className="font-serif text-sm italic text-foreground leading-snug">
                  "A space for what you are feeling right now"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
