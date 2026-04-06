const PostpartumEmotionalReminder = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
        <div className="flex items-center gap-5 mb-10 justify-center">
          <div className="h-px w-16" style={{ backgroundColor: 'hsl(var(--stage-postpartum-accent) / 0.3)' }} />
          <span
            className="font-sans text-xs font-light tracking-[0.2em] uppercase"
            style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
          >
            A small reminder
          </span>
          <div className="h-px w-16" style={{ backgroundColor: 'hsl(var(--stage-postpartum-accent) / 0.3)' }} />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-7 leading-tight">
          This stage can feel overwhelming, even when everything is going well.
        </h2>

        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto">
          Taking things one day at a time is enough.
        </p>
      </div>
    </section>
  );
};

export default PostpartumEmotionalReminder;
