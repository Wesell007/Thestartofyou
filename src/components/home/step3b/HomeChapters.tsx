import { Link } from "react-router-dom";
import fawn380 from "@/assets/home/chapters/fawn-380.png";
import fawn760 from "@/assets/home/chapters/fawn-760.png";
import rabbit380 from "@/assets/home/chapters/rabbit-380.png";
import rabbit760 from "@/assets/home/chapters/rabbit-760.png";
import robin380 from "@/assets/home/chapters/robin-380.png";
import robin760 from "@/assets/home/chapters/robin-760.png";
import squirrel380 from "@/assets/home/chapters/squirrel-380.png";
import squirrel760 from "@/assets/home/chapters/squirrel-760.png";
import duck380 from "@/assets/home/chapters/duck-380.png";
import duck760 from "@/assets/home/chapters/duck-760.png";

const PLATES = [
  {
    journey: "ttc",
    to: "/trying-to-conceive",
    art: [fawn380, fawn760],
    alt: "A young fawn standing beside a eucalyptus sprig",
    num: "Chapter one",
    title: "Trying to conceive",
    body: "Cycles, timing and the two-week wait, without the pressure. IVF and treatment included.",
    where: "Start here",
  },
  {
    journey: "pregnancy",
    to: "/pregnancy",
    art: [rabbit380, rabbit760],
    alt: "A rabbit sitting upright beside a eucalyptus sprig",
    num: "Chapter two",
    title: "Pregnancy",
    body: "Week by week, your baby visibly growing, with a page for every week in your journal.",
    where: "Find your week",
  },
  {
    journey: "first-year",
    to: "/first-year",
    art: [robin380, robin760],
    alt: "A robin perched on a eucalyptus branch",
    num: "Chapter three",
    title: "First year",
    body: "Sleep, feeding, firsts, and the months as they come, with space for your own recovery.",
    where: "Find your month",
  },
  {
    journey: "toddler",
    to: "/toddler",
    art: [squirrel380, squirrel760],
    alt: "A squirrel holding a small acorn",
    num: "Chapter four",
    title: "Toddler",
    body: "Guidance for the walking, talking, no-saying years.",
    where: "Start here",
  },
  {
    journey: "family",
    to: "/family",
    art: [duck380, duck760],
    alt: "A duck with two ducklings among eucalyptus",
    num: "Chapter five",
    title: "Family",
    body: "Partners, siblings, and the next chapter when you are ready.",
    where: "Start here",
  },
];

export default function HomeChapters() {
  return (
    <section className="chapters" id="chapters" aria-labelledby="ch-h">
      <div className="wrap">
        <div className="section-head">
          <span className="label">One story, told in chapters</span>
          <h2 className="display-2" id="ch-h" style={{ marginTop: 12 }}>
            Start wherever you are
          </h2>
          <hr className="title-rule" />
          <p className="deck">
            Trying to conceive, pregnancy, the first year, the toddler years and family life are chapters of one
            story. Each has its own colour, its own pages and its own questions.{" "}
            <em>Everything you keep comes with you to the next.</em>
          </p>
        </div>
        <div className="plates">
          {PLATES.map((plate) => (
            <Link key={plate.journey} to={plate.to} data-journey={plate.journey}>
              <div className="art">
                <img
                  className="plate-art"
                  src={plate.art[0]}
                  srcSet={`${plate.art[0]} 1x, ${plate.art[1]} 2x`}
                  width={760}
                  height={760}
                  alt={plate.alt}
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div className="text">
                <span className="num">{plate.num}</span>
                <h3>{plate.title}</h3>
                <p>{plate.body}</p>
                <span className="where">{plate.where}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="start-line">
          <b>One journey that moves with you.</b>
        </div>
      </div>
    </section>
  );
}
