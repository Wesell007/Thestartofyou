import trimesterThirdImg from "@/assets/trimester-third.jpg";

const ThirdTriEditorialImage = () => {
  return (
    <section className="bg-parchment pt-4 pb-8 sm:pt-6 sm:pb-12 md:pb-14">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <figure>
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/30 shadow-card-brand">
            <img
              src={trimesterThirdImg}
              alt="A grounded, calm moment in the final stage of pregnancy"
              loading="lazy"
              width={1600}
              height={620}
              className="w-full h-[300px] sm:h-[420px] md:h-[520px] lg:h-[580px] object-cover object-[55%_22%] sm:object-[50%_24%] md:object-[46%_26%] lg:object-[44%_28%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-foreground/45 via-foreground/15 to-transparent pointer-events-none" />

            <div className="absolute left-4 right-4 bottom-4 sm:left-10 sm:right-auto sm:bottom-10 sm:max-w-sm md:max-w-md">
              <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-5 sm:p-7 md:p-8 shadow-card-brand border border-border/30">
                <blockquote className="font-serif italic text-[16px] sm:text-[20px] md:text-[22px] text-foreground leading-snug">
                  &ldquo;This is the season of carrying more.&rdquo;
                </blockquote>
                <p className="mt-3 sm:mt-4 font-sans text-[10px] font-medium tracking-[0.28em] uppercase text-sage-muted">
                  You are allowed to slow down
                </p>
              </div>
            </div>
          </div>

          <figcaption className="mt-4 sm:mt-5 text-center font-serif italic text-[13px] sm:text-[15px] text-muted-foreground px-4">
            The final stage, where preparation and heaviness often arrive together.
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default ThirdTriEditorialImage;
