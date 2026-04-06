import { ArrowUpRight } from "lucide-react";
import supportIllustration from "@/assets/support-illustration.png";

const SupportHero = () => {
  return (
    <section className="relative bg-parchment pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Dual ambient glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(260 22% 88% / 0.3), transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(260 22% 92% / 0.2), transparent 70%)' }} />

      {/* Illustration accent */}
      <img
        src={supportIllustration}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-10 -left-10 w-44 md:w-56 opacity-[0.06] pointer-events-none select-none"
        width={512}
        height={640}
      />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
        <div className="text-center mb-10">
          <div className="flex items-center gap-4 justify-center mb-7">
            <div className="h-px w-12 bg-[hsl(var(--stage-support-accent)/0.3)]" />
            <p className="font-sans text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--stage-support-accent))]">
              Support
            </p>
            <div className="h-px w-12 bg-[hsl(var(--stage-support-accent)/0.3)]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.8rem] text-foreground mb-5 animate-fade-up leading-[1.1]">
            You don't need the right words.
            <br />
            <span className="italic text-[hsl(var(--stage-support-accent))]">Start with a feeling.</span>
          </h1>
          <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-lg mx-auto mb-8 animate-fade-up [animation-delay:0.1s]">
            If something feels uncertain, overwhelming, or simply different, this space helps you understand what's going on and guides you gently towards what to do next.
          </p>
        </div>

        {/* Emotional truth card — accent border top */}
        <div className="bg-card border-t-2 border-t-[hsl(var(--stage-support-accent)/0.5)] border border-[hsl(var(--stage-support-accent)/0.15)] rounded-xl p-7 md:p-9 shadow-card-brand mb-8 animate-fade-up [animation-delay:0.15s]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--stage-support-accent))]" />
            <span className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">A gentle truth</span>
          </div>
          <p className="font-serif text-lg md:text-xl text-foreground/85 leading-relaxed max-w-lg">
            You are not alone in feeling this way. Most people don't know exactly what's wrong before they ask for help, and that's completely okay.
          </p>
        </div>

        {/* Stat anchors — tighter */}
        <div className="flex items-center justify-center gap-6 md:gap-10 animate-fade-up [animation-delay:0.2s] mb-10">
          {[
            { num: "1 in 5", label: "experience perinatal anxiety" },
            { num: "80%", label: "don't seek help early enough" },
            { num: "100%", label: "valid, even if unsure" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <span className="font-serif text-2xl md:text-3xl text-[hsl(var(--stage-support-accent))]">{s.num}</span>
              <p className="font-sans text-[10px] md:text-xs font-light text-muted-foreground mt-1 max-w-[110px] mx-auto leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:0.25s]">
          <a
            href="#ai-support"
            className="flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
          >
            Tell us what's been feeling off
            <ArrowUpRight size={16} />
          </a>
          <a
            href="#start-here"
            className="flex items-center gap-2.5 border border-foreground/12 text-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-light hover:bg-parchment-dark transition-all duration-300"
          >
            Explore support paths
          </a>
        </div>
      </div>

      <div className="section-fade-bottom" />
    </section>
  );
};

export default SupportHero;
