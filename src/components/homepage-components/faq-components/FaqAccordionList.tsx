"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { HomeFaqItem } from "@/types/home";

export interface FaqAccordionListProps {
  items: readonly HomeFaqItem[];
}

export const FaqAccordionList: React.FC<FaqAccordionListProps> = ({
  items,
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto w-full max-w-4xl space-y-3 sm:space-y-3.5"
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white px-4 shadow-[0_2px_12px_rgba(15,31,61,0.03)] transition-all duration-200 hover:border-[#E2E6F3] hover:shadow-[0_8px_20px_rgba(15,31,61,0.06)] data-[state=open]:border-[#ff861c]/40 data-[state=open]:shadow-[0_10px_24px_rgba(15,31,61,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800/60 dark:data-[state=open]:border-[#ff861c]/50 dark:data-[state=open]:bg-slate-900 sm:px-6"
        >
          <AccordionTrigger className="gap-3.5 py-4 text-left font-jakarta text-xs font-extrabold leading-snug text-[#0F1F3D] hover:no-underline hover:text-[#ff861c] data-[state=open]:text-[#ff861c] dark:text-slate-100 dark:hover:text-[#ff861c] dark:data-[state=open]:text-[#ff861c] sm:py-5 sm:text-sm md:text-[15px]">
            <span className="min-w-0 flex-1">{item.question}</span>
          </AccordionTrigger>

          <AccordionContent className="border-t border-slate-100 pb-5 pr-4 pt-3.5 font-jakarta text-xs tracking-[0.01em] text-[#64748B] !leading-[1.75] dark:border-slate-800/80 dark:text-slate-300 sm:pb-6 sm:pr-8 sm:pt-4 sm:text-sm sm:!leading-[1.8]">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordionList;
