import React from "react";
import type { FaqSectionContent } from "@/types/home";

export interface FaqHeaderProps {
  content: Pick<
    FaqSectionContent,
    "eyebrow" | "title" | "brandPrimary" | "brandAccent" | "description"
  >;
}

export const FaqHeader: React.FC<FaqHeaderProps> = ({ content }) => {
  return (
    <div className="mb-8 md:mb-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-2 font-jakarta text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#ff861c] dark:text-[#ff861c] sm:text-xs">
          {content.eyebrow}
        </p>

        <h2 className="font-jakarta text-2xl font-extrabold leading-tight tracking-tight text-[#065893] dark:text-slate-100 sm:text-3xl md:text-4xl">
          {content.title}
          <span className="whitespace-nowrap">
            {content.brandPrimary}
            <span className="text-[#ff861c]">{content.brandAccent}</span>
          </span>
        </h2>

        <p className="mt-2.5 font-jakarta text-xs leading-relaxed text-[#64748B] dark:text-slate-400 sm:text-sm md:text-base">
          {content.description}
        </p>
      </div>
    </div>
  );
};

export default FaqHeader;
