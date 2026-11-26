import React from "react";
import Link from "next/link";
import type { FooterBottomBarContent } from "@/types/layout";

export interface FooterBottomBarProps {
  content: FooterBottomBarContent;
  currentYear: number;
}

export const FooterBottomBar: React.FC<FooterBottomBarProps> = ({
  content,
  currentYear,
}) => {
  return (
    <div className="border-t border-slate-200/70 bg-[#F1EDE7] font-jakarta dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 font-jakarta text-xs font-medium text-[#64748B] dark:text-slate-500 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-jakarta">
              {content.copyrightSymbol} {currentYear} {content.copyrightCompany}
            </span>
            <span className="hidden font-jakarta sm:inline">
              {content.dividerSymbol}
            </span>
            <span className="flex items-center gap-1 font-jakarta">
              {content.madeWithPrefix}{" "}
              <span className="animate-pulse text-red-500">
                {content.madeWithHeart}
              </span>{" "}
              {content.madeWithSuffix}
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {content.links.map((link) => {
              const linkClass =
                link.highlight === "orange-400" || link.highlight === "orange-500"
                  ? "font-jakarta font-semibold text-[#ff861c] transition-colors hover:text-[#ff861c]/80"
                  : "font-jakarta font-medium text-[#64748B] transition-colors hover:text-[#065893] dark:text-slate-400 dark:hover:text-white";

              return (
                <Link key={link.id} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottomBar;
