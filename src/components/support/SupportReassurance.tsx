import { Check } from "lucide-react";

const items = [
  "You're not the only one feeling this",
  "Not knowing what's normal is very common",
  "It's okay to ask, even if you're unsure",
];

const SupportReassurance = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          A quick reassurance
        </p>
        <div className="flex flex-col items-center gap-4 mt-8">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <Check size={16} className="text-sage flex-shrink-0" />
              <p className="font-serif text-lg sm:text-xl text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportReassurance;
