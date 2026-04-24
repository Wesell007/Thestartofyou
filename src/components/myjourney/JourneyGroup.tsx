import { ReactNode } from "react";

interface Props {
  title: string;
  framing: string;
  children: ReactNode;
}

const JourneyGroup = ({ title, framing, children }: Props) => {
  const accent = "hsl(var(--stage-pregnancy-accent))";
  return (
    <section className="mb-12 sm:mb-14">
      <div className="mb-3 sm:mb-3.5">
        <h3
          className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-1.5"
          style={{ color: accent }}
        >
          {title}
        </h3>
        <p className="font-serif italic text-foreground/55 text-[14.5px] leading-[1.5]">
          {framing}
        </p>
      </div>
      <ul className="space-y-2.5">{children}</ul>
    </section>
  );
};

export default JourneyGroup;
