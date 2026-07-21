import PublicReflectionEditor from "@/components/shared/PublicReflectionEditor";

const prompts = ["What feels unclear", "What worries me most", "What I need right now", "What would help"];

const SupportReflection = () => {
  return (
    <section className="bg-parchment-dark py-16 md:py-24">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="bg-card border-t-2 border-t-[hsl(var(--stage-support-accent)/0.4)] border border-border/50 rounded-xl p-7 sm:p-9 md:p-10 shadow-card-brand">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-2">
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-3">
                Take a moment
              </p>
              <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 leading-snug">
                What feels most unclear right now?
              </h2>
              <div className="flex flex-wrap gap-2">
                {prompts.map((prompt, i) => (
                  <span key={i} className="font-sans text-[10px] font-light bg-[hsl(var(--stage-support)/0.3)] text-foreground/60 rounded-full px-3 py-1.5 border border-[hsl(var(--stage-support-accent)/0.1)]">
                    {prompt}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-3 flex flex-col">
              <PublicReflectionEditor
                storageKey="tsoy:support:reflection-draft"
                suggestions={prompts}
                placeholder="Write your thoughts here… this is just for you."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportReflection;
