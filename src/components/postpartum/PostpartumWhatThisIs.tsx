import postpartumJourneyImg from "@/assets/postpartum-journey.jpg";

const PostpartumWhatThisIs = () => {
  return (
    <section className="bg-parchment-dark py-16 md:py-24">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          {/* Image */}
          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden border shadow-card-brand"
              style={{ borderColor: 'hsl(var(--stage-postpartum) / 0.3)' }}
            >
              <img
                src={postpartumJourneyImg}
                alt="The tender early days, finding your rhythm together"
                loading="lazy"
                width={1024}
                height={640}
                className="w-full h-56 sm:h-72 md:h-80 object-cover"
              />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-postpartum-accent) / 0.3)' }} />
              <p className="font-serif italic text-sm text-muted-foreground">
                The tender early days. Finding your rhythm together.
              </p>
            </div>

            {/* Stat chip overlay */}
            <div
              className="absolute top-4 right-4 rounded-xl px-4 py-2.5 backdrop-blur-sm"
              style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.75)' }}
            >
              <span className="font-serif text-lg text-foreground">12</span>
              <span className="font-sans text-[10px] font-light text-foreground/60 uppercase tracking-wide ml-1.5">weeks of change</span>
            </div>
          </div>

          {/* Copy */}
          <div>
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
            >
              About This Stage
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-5 leading-tight">
              What this stage is
            </h2>
            <div className="space-y-4 font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
              <p>
                Postpartum is one of the most significant transitions you will experience. It is recovery, adjustment, and change, happening physically and emotionally, all at once.
              </p>
              <p>
                It rarely looks like what you expected. Days can blur together, routines take time, and the gap between what you imagined and what you're living can feel disorienting.
              </p>
            </div>

            {/* Pull quote */}
            <div
              className="mt-6 pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-postpartum-accent) / 0.4)' }}
            >
              <p className="font-serif italic text-base text-foreground/75 leading-relaxed">
                This space is here to guide you through it. Clearly, calmly, and without overwhelm.
              </p>
            </div>

            {/* Emotional markers */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["Recovery", "Adjustment", "Tenderness"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-sans text-xs font-light italic"
                  style={{
                    backgroundColor: 'hsl(var(--stage-postpartum) / 0.15)',
                    color: 'hsl(var(--stage-postpartum-accent))',
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: 'hsl(var(--stage-postpartum-accent) / 0.4)' }}
                  />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostpartumWhatThisIs;
