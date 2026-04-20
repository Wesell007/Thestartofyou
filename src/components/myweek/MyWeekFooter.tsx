import { Link } from "react-router-dom";

interface Props {
  contextual?: string | null;
}

const MyWeekFooter = ({ contextual }: Props) => {
  return (
    <footer className="border-t border-border/30 py-10 sm:py-12">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center space-y-3">
        {contextual && (
          <p className="font-sans text-[13px] font-light text-muted-foreground/80 italic max-w-md mx-auto">
            {contextual}
          </p>
        )}
        <p className="font-sans text-[13px] font-light text-muted-foreground/70">
          Need support?{" "}
          <Link to="/support" className="text-foreground/80 underline underline-offset-4 hover:text-foreground transition-colors">
            Visit our Support hub
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default MyWeekFooter;
