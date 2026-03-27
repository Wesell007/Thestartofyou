import botanicalSrc from "@/assets/botanical-corner.png";

const BotanicalCorner = () => (
  <img
    src={botanicalSrc}
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute top-0 right-0 z-40 w-[160px] md:w-[260px] lg:w-[320px] h-auto select-none mix-blend-multiply"
  />
);

export default BotanicalCorner;
