import React from "react";
import { FAQ_SECTION_CONTENT } from "@/data/faq";
import { FaqHeader } from "@/components/homepage-components/faq-components/FaqHeader";
import { FaqAccordionList } from "@/components/homepage-components/faq-components/FaqAccordionList";
import { FaqSupportCard } from "@/components/homepage-components/faq-components/FaqSupportCard";
import type { FaqSectionContent } from "@/types/home";

export interface FaqSectionProps {
  content?: FaqSectionContent;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  content = FAQ_SECTION_CONTENT,
}) => {
  return (
    <section className="bg-[#FAF8F6] py-8 dark:bg-slate-950 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FaqHeader content={content} />
        <FaqAccordionList items={content.items} />
        <FaqSupportCard content={content.supportCard} />
      </div>
    </section>
  );
};

export default FaqSection;
