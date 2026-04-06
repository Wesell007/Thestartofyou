import { Check } from "lucide-react";

const items = [
  "You're not the only one feeling this",
  "Not knowing what's normal is very common",
  "It's okay to ask, even if you're unsure",
];

const SupportReassurance = () => {
  return (
    <section className="bg-[hsl(var(--stage-support)/0.35)] py-10 md:py-12">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[hsl(var(--stage-support)/0.6)] flex items-center justify-center flex-shrink-0">
                <Check size={11} className="text-[hsl(var(--stage-support-accent))]" />
              </div>
              <p className="font-sans text-sm font-light text-foreground/75">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportReassurance;
