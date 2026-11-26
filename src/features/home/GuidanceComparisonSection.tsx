import React from "react";
import { GUIDANCE_COMPARISON_CONTENT } from "@/data/guidance-comparison";
import { ComparisonEngineCard } from "@/components/homepage-components/guidance-components/ComparisonEngineCard";
import { AdvisorCounsellingCard } from "@/components/homepage-components/guidance-components/AdvisorCounsellingCard";
import type { GuidanceComparisonSectionContent } from "@/types/home";

export interface GuidanceComparisonSectionProps {
  content?: GuidanceComparisonSectionContent;
}

export const GuidanceComparisonSection: React.FC<
  GuidanceComparisonSectionProps
> = ({ content = GUIDANCE_COMPARISON_CONTENT }) => {
  return (
    <section className="bg-[#FAF8F6] py-8 dark:bg-slate-950 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ComparisonEngineCard content={content.comparison} />
          </div>

          <div className="lg:col-span-5">
            <AdvisorCounsellingCard content={content.advisor} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidanceComparisonSection;
