const values = [
  {
    title: "Personalised by stage",
    desc: "Guidance shaped around where you are right now.",
  },
  {
    title: "Calm, clear information",
    desc: "Evidence-informed. Only what matters right now.",
  },
  {
    title: "A space to return to",
    desc: "Reflect, keep the moments that matter, and pick up where you left off.",
  },
];

const ValueProofSection = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {values.map((v, i) => (
            <div key={v.title} className="text-center">
              <div className="editorial-rule mb-5" />
              <h3 className="font-serif text-[1.05rem] text-foreground mb-2">
                {v.title}
              </h3>
              <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed max-w-[14rem] mx-auto">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProofSection;
