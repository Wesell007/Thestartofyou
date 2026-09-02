import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";

type BreadcrumbTone = "article" | "section";

type BreadcrumbColors = {
  base?: string;
  link?: string;
  current?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  tone?: BreadcrumbTone;
  className?: string;
  colors?: BreadcrumbColors;
  showHomeIcon?: boolean;
};

const toneStyles: Record<BreadcrumbTone, { list: string; link: string }> = {
  article: {
    list: "gap-2 text-[11px] font-light uppercase tracking-[0.12em] text-muted-foreground/70",
    link: "py-1 transition-colors hover:text-sage",
  },
  section: {
    list: "gap-1.5 text-[12.5px] font-light text-muted-foreground",
    link: "py-1 transition-colors hover:underline hover:underline-offset-4",
  },
};

const Breadcrumbs = ({ items, tone = "article", className, colors, showHomeIcon = false }: BreadcrumbsProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  const styles = toneStyles[tone];

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn("flex flex-wrap items-center", styles.list)}
        style={colors?.base ? { color: colors.base } : undefined}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={`${item.href}-${index}`}>
              <li className="flex items-center break-words">
                {isLast ? (
                  <span aria-current="page" style={colors?.current ? { color: colors.current } : undefined}>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(styles.link, showHomeIcon && index === 0 && "inline-flex items-center gap-1.5")}
                    style={colors?.link ? { color: colors.link } : undefined}
                  >
                    {showHomeIcon && index === 0 && (
                      <Home size={12} strokeWidth={1.8} aria-hidden="true" />
                    )}
                    {item.label}
                  </Link>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className={cn("flex items-center", tone === "article" ? "px-0" : "px-0")}>
                  {tone === "article" ? (
                    <span aria-hidden="true">·</span>
                  ) : (
                    <ChevronRight size={13} aria-hidden="true" />
                  )}
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
