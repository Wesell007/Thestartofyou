import { Check } from "lucide-react";

const items = [
  "You're not the only one feeling this",
  "Not knowing what's normal is very common",
  "It's okay to ask, even if you're unsure",
];

const SupportReassurance = () => {
  return (
    <section className="bg-[hsl(var(--stage-support)/0.4)] py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="bg-card border border-[hsl(var(--stage-support-accent)/0.15)] rounded-xl p-8 md:p-10 shadow-card-brand">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6 text-center">
            A quick reassurance
          </p>
          <div className="flex flex-col items-center gap-4">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[hsl(var(--stage-support)/0.6)] flex items-center justify-center flex-shrink-0">
                  <Check size={13} className="text-[hsl(var(--stage-support-accent))]" />
                </div>
                <p className="font-serif text-lg sm:text-xl text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportReassurance;
