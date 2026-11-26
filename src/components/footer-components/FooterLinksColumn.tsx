import React from "react";
import Link from "next/link";
import type { FooterNavLink } from "@/types/layout";
import { FooterSectionHeading } from "./FooterSectionHeading";

export interface FooterLinksColumnProps {
  title: string;
  links: readonly FooterNavLink[];
}

export const FooterLinksColumn: React.FC<FooterLinksColumnProps> = ({
  title,
  links,
}) => {
  return (
    <div className="font-jakarta">
      <FooterSectionHeading title={title} />
      <ul className="space-y-2.5 font-jakarta !text-xs">
        {links.map((link) => {
          const highlightClass =
            link.highlight === "orange-400" || link.highlight === "orange-500"
              ? "font-semibold text-[#ff861c]"
              : "font-medium text-[#64748B] dark:text-slate-400";

          return (
            <li key={link.id}>
              <Link
                href={link.href}
                className={`inline-block font-jakarta !text-xs leading-snug transition-colors duration-200 hover:text-[#ff861c] dark:hover:text-[#ff861c] ${highlightClass}`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterLinksColumn;
