import { Link } from "react-router-dom";

interface Props {
  contextual?: string | null;
}

const MyWeekFooter = ({ contextual }: Props) => {
  return (
    <footer className="border-t border-border/30 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[720px] lg:max-w-[880px] px-4 sm:px-8 md:px-10 text-center sm:text-left space-y-3">
        {contextual && (
          <p className="font-sans text-[13px] font-normal text-foreground/70 max-w-md mx-auto sm:mx-0">
            {contextual}
          </p>
        )}
        <p className="font-sans text-[13.5px] font-normal text-foreground/80">
          Need support?{" "}
          <Link
            to="/support"
            className="inline-block py-1 underline underline-offset-4 decoration-[hsl(var(--stage-pregnancy-accent)/0.6)] hover:decoration-[hsl(var(--stage-pregnancy-accent))] transition-colors"
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            Visit our Support hub
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default MyWeekFooter;
