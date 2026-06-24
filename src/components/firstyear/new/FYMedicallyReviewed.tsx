const FYMedicallyReviewed = () => {
  return (
    <section className="bg-parchment pt-2 pb-6">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div
          className="flex items-center justify-center gap-2.5 py-3 border-y"
          style={{ borderColor: 'hsl(var(--border) / 0.5)' }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent))' }}
          />
          <p className="font-sans text-[11px] font-light tracking-wide text-muted-foreground">
            ✔ Medically reviewed by Jenny Joines · across baby and recovery guidance
          </p>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'hsl(var(--stage-recovery-accent))' }}
          />
        </div>
      </div>
    </section>
  );
};

export default FYMedicallyReviewed;
