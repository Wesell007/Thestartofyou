const FYMedicallyReviewed = () => {
  return (
    <section className="bg-parchment pt-4 pb-8">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div
          className="flex flex-wrap items-center justify-center gap-3 py-4"
          style={{
            borderTop: '1px solid hsl(var(--border) / 0.45)',
            borderBottom: '1px solid hsl(var(--border) / 0.45)',
          }}
        >
          <span className="h-px w-6 hidden sm:block" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.55)' }} />
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent))' }}
          />
          <p className="font-sans text-[11.5px] font-light tracking-[0.02em] text-muted-foreground text-center">
            ✔ Medically reviewed by Jenny Joines · across baby and recovery guidance
          </p>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'hsl(var(--stage-recovery-accent))' }}
          />
          <span className="h-px w-6 hidden sm:block" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.55)' }} />
        </div>
      </div>
    </section>
  );
};

export default FYMedicallyReviewed;
