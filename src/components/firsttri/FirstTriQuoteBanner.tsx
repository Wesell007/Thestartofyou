const FirstTriQuoteBanner = () => {
  return (
    <section className="bg-sage-bg py-14 sm:py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
        <blockquote className="font-serif italic text-[1.4rem] sm:text-[1.85rem] md:text-[2.35rem] text-foreground leading-[1.3]">
          &ldquo;You don&rsquo;t have to have it all figured out. You just have to
          keep showing up for you.&rdquo;
        </blockquote>
        <p className="mt-6 sm:mt-8 font-sans text-[10px] font-medium tracking-[0.32em] uppercase text-sage">
          The Start of You
        </p>
      </div>
    </section>
  );
};

export default FirstTriQuoteBanner;
