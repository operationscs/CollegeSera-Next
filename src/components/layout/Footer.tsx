"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { FOOTER_CONTENT } from "@/data/footer";
import type { FooterProps } from "@/types/layout";
import { FooterBrandColumn } from "@/components/footer-components/FooterBrandColumn";
import { FooterLinksColumn } from "@/components/footer-components/FooterLinksColumn";
import { FooterContactColumn } from "@/components/footer-components/FooterContactColumn";
import { FooterBottomBar } from "@/components/footer-components/FooterBottomBar";

export const Footer: React.FC<FooterProps> = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`${
        pathname === "/" ? "homepage-typography-footer " : ""
      }border-t border-slate-200/80 bg-[#F4F1EC] font-jakarta text-[#64748B] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300`}
    >
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:items-start lg:justify-between lg:gap-8">
          <FooterBrandColumn content={FOOTER_CONTENT.brand} />

          <FooterLinksColumn
            title={FOOTER_CONTENT.topStreams.title}
            links={FOOTER_CONTENT.topStreams.links}
          />

          <FooterLinksColumn
            title={FOOTER_CONTENT.popularDegrees.title}
            links={FOOTER_CONTENT.popularDegrees.links}
          />

          <FooterLinksColumn
            title={FOOTER_CONTENT.examsAndDates.title}
            links={FOOTER_CONTENT.examsAndDates.links}
          />

          <FooterLinksColumn
            title={FOOTER_CONTENT.resources.title}
            links={FOOTER_CONTENT.resources.links}
          />

          <FooterContactColumn content={FOOTER_CONTENT.contact} />
        </div>
      </div>

      <FooterBottomBar
        content={FOOTER_CONTENT.bottomBar}
        currentYear={currentYear}
      />
    </footer>
  );
};

export default Footer;
