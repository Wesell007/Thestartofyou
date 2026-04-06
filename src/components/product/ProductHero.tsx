import { ExternalLink, BookOpen } from "lucide-react";
import productHero from "@/assets/product-hero.jpg";

const ProductHero = () => {
  return (
    <section className="relative bg-parchment overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Dual ambient glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[400px] glow-sage" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] glow-sage opacity-50" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Copy */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto md:mx-0">
            <p className="stage-label flanking-lines mb-4 animate-fade-up">The Start of You Journal</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] text-foreground leading-[1.08] mb-4 animate-fade-up [animation-delay:0.05s]">
              The journey moves fast.{" "}
              <span className="italic">This helps you hold onto it.</span>
            </h1>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-6 animate-fade-up [animation-delay:0.1s] max-w-md">
              A guided pregnancy journal for the thoughts, feelings, and moments that deserve somewhere to live. From the first weeks through to life after birth.
            </p>

            {/* Urgency truth card */}
            <div className="bg-card/80 border border-border/30 rounded-2xl p-5 mb-7 max-w-md w-full animate-fade-up [animation-delay:0.12s]" style={{ borderTopColor: 'hsl(var(--sage))', borderTopWidth: '2px' }}>
              <p className="font-serif text-sm italic text-foreground leading-relaxed">
                "You will forget more of this than you expect. The feelings shift, the weeks blur, and the details you thought you would always remember quietly fade."
              </p>
            </div>

            {/* Trust anchors */}
            <div className="flex flex-wrap gap-6 mb-7 animate-fade-up [animation-delay:0.15s] justify-center md:justify-start">
              {[
                { num: "40+", label: "Weeks of prompts" },
                { num: "4", label: "Life stages" },
                { num: "1", label: "Keepsake for life" },
              ].map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <span className="font-serif text-2xl text-foreground">{s.num}</span>
                  <p className="font-sans text-[10px] font-light text-muted-foreground tracking-wide uppercase mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="animate-fade-up [animation-delay:0.2s] flex flex-col sm:flex-row items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                Get the journal
                <ExternalLink size={14} />
              </a>
              <span className="inline-flex items-center gap-1.5 bg-card/70 border border-border/30 rounded-pill px-4 py-2.5 font-sans text-xs font-light text-muted-foreground">
                <BookOpen size={12} className="text-sage" />
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
              <div className="absolute -bottom-3 -left-3 sm:bottom-5 sm:left-5 bg-card/90 backdrop-blur-sm rounded-xl p-4 border border-border/30 shadow-soft max-w-[200px]">
                <p className="font-serif text-[13px] italic text-foreground leading-snug mb-1.5">
                  "For the thoughts you do not want to lose"
                </p>
                <p className="font-sans text-[9px] font-light text-muted-foreground">Guided journal, 200+ pages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
