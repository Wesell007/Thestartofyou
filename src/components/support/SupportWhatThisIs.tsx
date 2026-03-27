const SupportWhatThisIs = () => {
  return (
    <section className="bg-parchment py-28 md:py-36">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          This space
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-8 max-w-lg">
          What this space is for
        </h2>
        <div className="space-y-5">
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
            Sometimes things don't feel quite right — physically, emotionally, or both.
          </p>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
            You might not know exactly what you're looking for, only that something feels off.
          </p>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
            This space is here to help you make sense of that, and guide you gently towards what to do next.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportWhatThisIs;
