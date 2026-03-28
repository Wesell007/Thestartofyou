import postpartumJourneyImg from "@/assets/postpartum-journey.jpg";

const PostpartumWhatThisIs = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Feature image */}
        <div className="mb-14 rounded-2xl overflow-hidden border border-border/40 shadow-card-brand">
          <img
            src={postpartumJourneyImg}
            alt="The tender early days — finding your rhythm together"
            loading="lazy"
            width={1024}
            height={640}
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
          <p className="px-6 py-3 bg-card font-serif italic text-sm text-muted-foreground">
            — The tender early days — finding your rhythm together
          </p>
        </div>

        <div className="max-w-2xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            About This Stage
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-8 leading-tight">
            What this stage is
          </h2>
          <div className="space-y-5 font-sans text-base font-light text-muted-foreground leading-relaxed">
            <p>
              Postpartum is a period of recovery, adjustment, and change — both physically and emotionally.
            </p>
            <p>
              While there are common patterns, this stage often feels less structured than pregnancy. Days can blur together, routines take time to form, and experiences vary more than expected.
            </p>
            <p>
              This space is here to guide you through it — clearly, calmly, and without overwhelm.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostpartumWhatThisIs;
