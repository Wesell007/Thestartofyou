import { PenLine } from "lucide-react";

const prompts = ["What feels unclear", "What worries me most", "What I need right now"];

const SupportReflection = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="bg-card border-t-2 border-t-[hsl(var(--stage-support-accent)/0.4)] border border-border/50 rounded-xl p-7 sm:p-10 md:p-12 shadow-card-brand">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-4">
                Take a moment
              </p>
              <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-5 leading-snug">
                What feels most unclear or difficult right now?
              </h2>
              <div className="flex flex-wrap gap-2">
                {prompts.map((prompt, i) => (
                  <span key={i} className="font-sans text-xs font-light bg-[hsl(var(--stage-support)/0.3)] text-foreground/60 rounded-full px-3 py-1.5 border border-[hsl(var(--stage-support-accent)/0.1)]">
                    {prompt}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-3 flex flex-col">
              <textarea
                rows={5}
                placeholder="Write your thoughts here… this is just for you."
                className="w-full bg-[hsl(var(--stage-support)/0.1)] border border-[hsl(var(--stage-support-accent)/0.15)] rounded-lg px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/40 resize-none focus:outline-none focus:ring-1 focus:ring-[hsl(var(--stage-support-accent)/0.4)] focus:border-[hsl(var(--stage-support-accent)/0.4)] transition-all leading-relaxed flex-1"
              />
              <button className="mt-4 flex items-center gap-2 mx-auto md:mx-0 border border-foreground/20 text-foreground rounded-pill px-6 py-3 font-sans text-sm font-light hover:bg-parchment transition-all">
                <PenLine size={14} />
                Capture this thought
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportReflection;
