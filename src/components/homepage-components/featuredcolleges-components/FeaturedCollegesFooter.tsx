import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FeaturedCollegesSectionContent } from "@/types/home";

export interface FeaturedCollegesFooterProps {
  content: FeaturedCollegesSectionContent;
}

export const FeaturedCollegesFooter: React.FC<FeaturedCollegesFooterProps> = ({
  content,
}) => {
  return (
    <div className="mt-8 flex justify-center sm:mt-10">
      <Button
        asChild
        variant="outline"
        className="group h-12 rounded-full border-slate-200/80 bg-white px-7 font-jakarta text-xs font-extrabold text-[#065893] shadow-[0_4px_16px_rgba(6,88,147,0.04)] transition-colors hover:border-slate-200 hover:bg-slate-100 hover:text-[#065893] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white sm:px-8 sm:text-sm"
      >
        <Link href={content.ctaPath} className="inline-flex items-center gap-2.5">
          <span>{content.ctaLabel}</span>
          <ArrowRight className="h-4 w-4 text-[#ff861c] transition-transform duration-200 group-hover:translate-x-1 dark:text-[#ff861c]" />
        </Link>
      </Button>
    </div>
  );
};
