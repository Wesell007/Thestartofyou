import { Link } from "react-router-dom";
import ConsentLink from "@/components/consent/ConsentLink";

export default function HomeFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <span>The Start of You · guidance, journal and Companion from trying to conceive to family life</span>
        <span>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/about">About</Link>
          <Link to="/support">Contact</Link>
          <ConsentLink />
        </span>
      </div>
    </footer>
  );
}
