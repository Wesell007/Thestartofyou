import PublicReflectionEditor from "@/components/shared/PublicReflectionEditor";

const prompts = [
  "What has felt most present this cycle?",
  "What are you hoping for right now?",
  "What would you tell yourself at the start of this?",
];

const TTCReflection = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14">
          {/* Left — context */}
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-ttc-accent))' }}
            >
              Take a Moment
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-4">
              Pause and reflect
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5">
              Sometimes the most useful thing you can do is check in with yourself. Choose a prompt, or write freely.
            </p>

            <div className="space-y-2.5">
              {prompts.map((p, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2"
                >
                  <div
                    className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: 'hsl(var(--stage-ttc-accent) / 0.4)' }}
                  />
                  <p className="font-serif italic text-sm text-foreground/55 leading-relaxed">
                    {p}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — writing area */}
          <div className="md:col-span-3">
            <div
              className="relative rounded-2xl p-6 sm:p-8 border"
              style={{
                backgroundColor: 'hsl(var(--stage-ttc) / 0.1)',
                borderColor: 'hsl(var(--stage-ttc-accent) / 0.12)',
              }}
            >
              {/* Decorative corner */}
              <div
                className="absolute top-0 right-0 w-12 h-12 rounded-bl-[1.5rem] hidden md:block"
                style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.15)' }}
              />

              <PublicReflectionEditor
                storageKey="tsoy:ttc:legacy-reflection-draft"
                suggestions={prompts}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TTCReflection;
