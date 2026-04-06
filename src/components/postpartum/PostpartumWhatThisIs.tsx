import postpartumJourneyImg from "@/assets/postpartum-journey.jpg";

const PostpartumWhatThisIs = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-border/40 shadow-card-brand">
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
          </div>

          {/* Copy */}
          <div>
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
            >
              About This Stage
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-6 leading-tight">
              What this stage is
            </h2>
            <div className="space-y-4 font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
              <p>
                Postpartum is a period of recovery, adjustment, and change, both physically and emotionally.
              </p>
              <p>
                While there are common patterns, this stage often feels less structured than pregnancy. Days can blur together, routines take time to form, and experiences vary more than expected.
              </p>
            </div>

            {/* Pull quote */}
            <div
              className="mt-6 pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-postpartum-accent) / 0.3)' }}
            >
              <p className="font-serif italic text-base text-foreground/75 leading-relaxed">
                This space is here to guide you through it, clearly, calmly, and without overwhelm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostpartumWhatThisIs;
