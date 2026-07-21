import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "The site guides you",
    desc: "Stage-by-stage support, tools and answers when you need clarity.",
  },
  {
    title: "The journal holds it",
    desc: "A guided pregnancy journal for reflection, keepsakes and memories you can return to later.",
  },
];

const AboutJournalConnection = () => {
  return (
    <section className="relative bg-card py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="editorial-rule mb-6 mx-auto" />
          <p className="stage-label mb-3">Physical and digital</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 leading-snug">
            Some moments need somewhere offline to live
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-lg mx-auto">
            The digital journey helps you understand what is happening. The journal gives you somewhere to hold the thoughts, feelings, scan photos and first memories that matter in a different way.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto mb-10">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-border/30 shadow-card-brand p-6 bg-gradient-to-br from-white via-[#FBF8F1] to-[#F4EFE4]"
            >
              <h3 className="font-serif text-lg text-foreground mb-2 leading-snug">{c.title}</h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 font-sans text-sm font-light text-muted-foreground border-b border-border hover:text-foreground hover:border-foreground transition-all pb-0.5"
          >
            View the journal
            <ArrowRight size={14} className="text-sage" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutJournalConnection;
