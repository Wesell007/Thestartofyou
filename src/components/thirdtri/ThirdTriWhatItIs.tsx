import botanicalSprig from "@/assets/botanical-branch-bl.png";

interface Props {
  paragraphs: string[];
}

const ThirdTriWhatItIs = ({ paragraphs }: Props) => {
  return (
    <section id="what-it-is" className="bg-parchment section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="h-px bg-border/40 mb-12 md:mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="md:col-span-5 relative">
            <p className="stage-label mb-4">This Stage</p>
            <h2 className="font-serif text-[2rem] sm:text-[2.25rem] md:text-[2.6rem] text-foreground leading-[1.1]">
              What the third trimester is
            </h2>
            <img
              src={botanicalSprig}
              alt=""
              aria-hidden="true"
              className="hidden md:block absolute -left-6 -top-8 w-20 opacity-25 pointer-events-none select-none"
            />
          </div>

          <div className="md:col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-sans text-[15px] text-foreground/75 leading-[1.8]"
              >
                {para}
              </p>
            ))}
            <p className="lg:col-span-2 font-serif italic text-[15px] text-sage leading-relaxed pt-2">
              Not everyone arrives at the end of pregnancy feeling ready, and not everyone wants to prepare in the same way. Mixed feelings about birth and finishing pregnancy are part of this stage too.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdTriWhatItIs;
