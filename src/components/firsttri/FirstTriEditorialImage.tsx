import trimesterFirstImg from "@/assets/trimester-first.jpg";

const FirstTriEditorialImage = () => {
  return (
    <section className="bg-parchment pt-4 pb-8 sm:pt-6 sm:pb-12 md:pb-14">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <figure>
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/30 shadow-card-brand">
            <img
              src={trimesterFirstImg}
              alt="A quiet, warm moment in the early weeks of pregnancy"
              loading="lazy"
              width={1600}
              height={620}
              className="w-full h-[240px] sm:h-[380px] md:h-[500px] lg:h-[560px] object-cover"
            />
            {/* Soft overlay for legibility — stronger on mobile for card legibility */}
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-foreground/40 via-foreground/15 to-transparent pointer-events-none" />

            {/* Quote card overlay */}
            <div className="absolute left-4 right-4 bottom-4 sm:left-10 sm:right-auto sm:bottom-10 sm:max-w-sm md:max-w-md">
              <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-5 sm:p-7 md:p-8 shadow-card-brand border border-border/30">
                <blockquote className="font-serif italic text-[16px] sm:text-[20px] md:text-[22px] text-foreground leading-snug">
                  &ldquo;This is the beginning of everything.&rdquo;
                </blockquote>
                <p className="mt-3 sm:mt-4 font-sans text-[10px] font-medium tracking-[0.28em] uppercase text-sage-muted">
                  You are not alone
                </p>
              </div>
            </div>
          </div>

          <figcaption className="mt-4 sm:mt-5 text-center font-serif italic text-[13px] sm:text-[15px] text-muted-foreground px-4">
            A quiet, powerful stage where so much is already happening.
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default FirstTriEditorialImage;
